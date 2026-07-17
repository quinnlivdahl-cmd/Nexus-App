import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import {
  applicabilityValues,
  authorityValues,
  explicitlyClassifiedDomains,
} from "./source-retrieval-policy.mjs";

const sourceRootPath = "docs/nexus-game-source/source";
const acceptedAdrStatuses = new Set([
  "proposed",
  "accepted",
  "deprecated",
  "superseded",
  "historical",
]);
const defaultGameAuthorities = new Set([
  "game_current",
  "game_provisional",
  "runtime_ai_behavior",
]);
const excludedGameAuthorities = new Set([
  "project_operations",
  "historical_reference",
  "non_authoritative",
]);
const retiredSourcePromotionIdentifiers = [
  "source:promote-golden",
  "promote-golden-source.mjs",
  "nexus-golden-source-promoter",
];
const requiredWorkflowCommands = [
  "source:index:check",
  "source:slices:check",
  "context:pack:check",
  "context:runtime:check",
  "roadmap:index:check",
  "validate:workflow",
];

function readText(path) {
  return readFileSync(path, "utf8").replace(/^\uFEFF/, "");
}

function readJson(path) {
  return JSON.parse(readText(path));
}

function toRepoPath(root, path) {
  return relative(root, path).split(sep).join("/");
}

function isInside(root, path) {
  const candidate = relative(resolve(root), resolve(path));
  return (
    candidate === "" ||
    (!candidate.startsWith("..") && !resolve(path).startsWith(".."))
  );
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "[]") return [];
  return trimmed;
}

export function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};
  const endMatch = text.slice(3).match(/\r?\n---\r?\n/);
  if (!endMatch?.index) return {};

  const frontmatter = {};
  let activeArrayKey = null;
  const block = text.slice(3, endMatch.index + 3);
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, "");
    if (!line.trim()) continue;
    const listMatch = line.match(/^\s+-\s*(.*)$/);
    if (listMatch && activeArrayKey) {
      frontmatter[activeArrayKey].push(stripQuotes(listMatch[1]));
      continue;
    }
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyMatch) continue;
    const [, key, rawValue] = keyMatch;
    if (!rawValue.trim()) {
      frontmatter[key] = [];
      activeArrayKey = key;
      continue;
    }
    const value = stripQuotes(rawValue);
    frontmatter[key] = value;
    activeArrayKey = Array.isArray(value) ? key : null;
  }
  return frontmatter;
}

function discoverFiles(dir, predicate = () => true) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (
      entry.isDirectory() &&
      !new Set([".git", ".pnpm", "node_modules", "dist", "build"]).has(
        entry.name,
      )
    ) {
      files.push(...discoverFiles(path, predicate));
    } else if (entry.isFile() && predicate(path)) files.push(path);
  }
  return files;
}

function normalizedArray(value) {
  return Array.isArray(value) ? value : [];
}

function sameValues(left, right) {
  return (
    JSON.stringify(normalizedArray(left)) ===
    JSON.stringify(normalizedArray(right))
  );
}

function expectedDefaultRetrieval(authority) {
  if (!authority) return undefined;
  return defaultGameAuthorities.has(authority);
}

export function validateSourceIndexData(index, root) {
  const failures = [];
  const files = normalizedArray(index.files);
  if (index.file_count !== files.length) {
    failures.push(
      `source-index: file_count ${index.file_count} does not match ${files.length} indexed files`,
    );
  }
  if (!sameValues(index.authority_values, authorityValues)) {
    failures.push(
      "source-index: authority_values do not match the approved retrieval policy",
    );
  }
  if (!sameValues(index.applicability_values, applicabilityValues)) {
    failures.push(
      "source-index: applicability_values do not match the approved retrieval policy",
    );
  }

  const seenPaths = new Set();
  for (const item of files) {
    const label = item.exact_repo_path || "<missing path>";
    if (!item.exact_repo_path) {
      failures.push("source-index: an entry is missing exact_repo_path");
      continue;
    }
    if (seenPaths.has(item.exact_repo_path)) {
      failures.push(`source-index: duplicate path ${item.exact_repo_path}`);
    }
    seenPaths.add(item.exact_repo_path);

    const absolute = resolve(root, item.exact_repo_path);
    const canonicalRoot = resolve(root, sourceRootPath);
    if (!isInside(canonicalRoot, absolute)) {
      failures.push(
        `source-index: path escapes canonical source: ${item.exact_repo_path}`,
      );
    } else if (!existsSync(absolute)) {
      failures.push(
        `source-index: indexed path does not exist: ${item.exact_repo_path}`,
      );
    }

    if (item.authority && !authorityValues.includes(item.authority)) {
      failures.push(
        `source-index: ${label} has invalid authority ${item.authority}`,
      );
    }
    for (const applicability of normalizedArray(item.applicability)) {
      if (!applicabilityValues.includes(applicability)) {
        failures.push(
          `source-index: ${label} has invalid applicability ${applicability}`,
        );
      }
    }
    if (explicitlyClassifiedDomains.has(item.domain)) {
      if (!item.authority || normalizedArray(item.applicability).length === 0) {
        failures.push(
          `source-index: ${label} lacks explicit retrieval classification`,
        );
      }
    }
    const expected = expectedDefaultRetrieval(item.authority);
    if (expected !== undefined && item.default_game_retrieval !== expected) {
      failures.push(
        `source-index: ${label} has default_game_retrieval=${item.default_game_retrieval}; expected ${expected} for ${item.authority}`,
      );
    }
    if (
      excludedGameAuthorities.has(item.authority) &&
      item.default_game_retrieval !== false
    ) {
      failures.push(
        `source-index: ${label} exposes excluded authority ${item.authority} to default game retrieval`,
      );
    }
  }
  return failures;
}

export function validateSliceCatalogData(catalog, sourceIndex, root) {
  const failures = [];
  const slices = normalizedArray(catalog.slices);
  const sourceByPath = new Map(
    normalizedArray(sourceIndex.files).map((item) => [
      item.exact_repo_path,
      item,
    ]),
  );
  if (catalog.slice_count !== slices.length) {
    failures.push(
      `source-slices: slice_count ${catalog.slice_count} does not match ${slices.length} slices`,
    );
  }
  if (
    catalog.coverage_complete !== true ||
    catalog.h2_covered_count !== catalog.h2_section_count
  ) {
    failures.push("source-slices: level-two heading coverage is incomplete");
  }
  if (!sameValues(catalog.authority_values, authorityValues)) {
    failures.push(
      "source-slices: authority_values do not match the approved retrieval policy",
    );
  }
  if (!sameValues(catalog.applicability_values, applicabilityValues)) {
    failures.push(
      "source-slices: applicability_values do not match the approved retrieval policy",
    );
  }

  const seenIds = new Set();
  for (const slice of slices) {
    const label = slice.slice_id || "<missing slice id>";
    if (!slice.slice_id)
      failures.push("source-slices: a slice is missing slice_id");
    else if (seenIds.has(slice.slice_id))
      failures.push(`source-slices: duplicate slice_id ${slice.slice_id}`);
    else seenIds.add(slice.slice_id);

    const source = sourceByPath.get(slice.exact_repo_path);
    if (!source) {
      failures.push(
        `source-slices: ${label} points outside SOURCE-INDEX.json: ${slice.exact_repo_path}`,
      );
      continue;
    }
    if (!existsSync(resolve(root, slice.exact_repo_path))) {
      failures.push(
        `source-slices: ${label} points to missing file ${slice.exact_repo_path}`,
      );
    }
    if (
      !Number.isInteger(slice.start_line) ||
      !Number.isInteger(slice.end_line) ||
      slice.start_line < 1 ||
      slice.end_line < slice.start_line
    ) {
      failures.push(
        `source-slices: ${label} has invalid line range ${slice.start_line}-${slice.end_line}`,
      );
    }
    for (const field of ["authority", "default_game_retrieval"]) {
      if (slice[field] !== source[field]) {
        failures.push(
          `source-slices: ${label} ${field} disagrees with ${slice.exact_repo_path}`,
        );
      }
    }
    if (!sameValues(slice.applicability, source.applicability)) {
      failures.push(
        `source-slices: ${label} applicability disagrees with ${slice.exact_repo_path}`,
      );
    }
  }
  return failures;
}

export function validateAdrState(root) {
  const failures = [];
  const adrRoot = resolve(root, "docs/adr");
  if (!existsSync(adrRoot)) return ["adr: missing docs/adr"];
  const files = discoverFiles(
    adrRoot,
    (path) => path.endsWith(".md") && path !== resolve(adrRoot, "README.md"),
  );
  const byId = new Map();
  for (const path of files) {
    const name = path.split(/[\\/]/).at(-1);
    const match = name.match(/^(\d{4})-[a-z0-9-]+\.md$/);
    if (!match) {
      failures.push(`adr: invalid decision filename ${toRepoPath(root, path)}`);
      continue;
    }
    const id = match[1];
    if (byId.has(id)) failures.push(`adr: duplicate decision id ADR-${id}`);
    const metadata = parseFrontmatter(readText(path));
    byId.set(id, { path, metadata });
    if (!acceptedAdrStatuses.has(metadata.status)) {
      failures.push(
        `adr: ADR-${id} has invalid status ${metadata.status || "<missing>"}`,
      );
    }
    if (!metadata.date) failures.push(`adr: ADR-${id} is missing date`);
    if (!metadata.provenance)
      failures.push(`adr: ADR-${id} is missing provenance`);
    if (metadata.status === "superseded" && !metadata.superseded_by) {
      failures.push(`adr: superseded ADR-${id} is missing superseded_by`);
    }
  }

  for (const [id, { metadata }] of byId) {
    if (!metadata.superseded_by) continue;
    const replacementId = String(metadata.superseded_by).match(/(\d{4})/)?.[1];
    const replacement = replacementId ? byId.get(replacementId) : null;
    if (!replacement)
      failures.push(
        `adr: ADR-${id} names missing replacement ${metadata.superseded_by}`,
      );
    else if (replacement.metadata.status !== "accepted") {
      failures.push(
        `adr: ADR-${id} replacement ADR-${replacementId} is not accepted`,
      );
    }
  }

  const readmePath = resolve(adrRoot, "README.md");
  if (!existsSync(readmePath))
    failures.push("adr: missing decision index docs/adr/README.md");
  else {
    const indexed = new Set(
      [...readText(readmePath).matchAll(/\((\d{4})-[^)]+\.md\)/g)].map(
        (match) => match[1],
      ),
    );
    for (const [id, { metadata }] of byId) {
      if (
        ["accepted", "superseded"].includes(metadata.status) &&
        !indexed.has(id)
      ) {
        failures.push(
          `adr: controlling ADR-${id} is missing from docs/adr/README.md`,
        );
      }
    }
  }
  return failures;
}

export function validateSourceReconciliation(root) {
  const failures = [];
  const adrIds = new Set(
    discoverFiles(resolve(root, "docs/adr"), (path) =>
      /[\\/]\d{4}-[^\\/]+\.md$/.test(path),
    ).map((path) => path.split(/[\\/]/).at(-1).slice(0, 4)),
  );
  const files = discoverFiles(resolve(root, sourceRootPath), (path) =>
    path.endsWith(".md"),
  );
  for (const path of files) {
    const text = readText(path);
    const metadata = parseFrontmatter(text);
    const repoPath = toRepoPath(root, path);
    if (metadata.working_state === "revised_vision_reconciled") {
      if (metadata.metadata_verified !== true)
        failures.push(`reconciliation: ${repoPath} is not metadata_verified`);
      if (!metadata.last_reviewed)
        failures.push(`reconciliation: ${repoPath} is missing last_reviewed`);
      if (!metadata.metadata_notes)
        failures.push(`reconciliation: ${repoPath} is missing metadata_notes`);
    }
    for (const match of text.matchAll(/ADR-(\d{4})/g)) {
      if (!adrIds.has(match[1]))
        failures.push(
          `reconciliation: ${repoPath} references missing ADR-${match[1]}`,
        );
    }
    for (const match of text.matchAll(
      /\[[^\]]*\]\(([^)]+\/adr\/(\d{4})-[^)]+\.md)\)/g,
    )) {
      const target = resolve(dirname(path), match[1]);
      if (!existsSync(target))
        failures.push(
          `reconciliation: ${repoPath} has broken ADR link ${match[1]}`,
        );
    }
  }
  return failures;
}

function repoSkillRefs(text) {
  return [...text.matchAll(/\.agents\/skills\/([a-z0-9-]+)\/SKILL\.md/g)].map(
    (match) => match[1],
  );
}

export function validateSkillRouting(root) {
  const failures = [];
  const agentsPath = resolve(root, "AGENTS.md");
  if (!existsSync(agentsPath)) return ["routing: missing repo-root AGENTS.md"];
  const routedSkills = new Set(repoSkillRefs(readText(agentsPath)));
  const skillRoot = resolve(root, ".agents/skills");
  const actualSkills = existsSync(skillRoot)
    ? readdirSync(skillRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : [];
  const descriptions = new Map();

  for (const skill of actualSkills) {
    if (!routedSkills.has(skill))
      failures.push(
        `routing: repo-local skill ${skill} has no AGENTS.md dispatch route`,
      );
  }
  for (const skill of routedSkills) {
    const skillPath = resolve(skillRoot, skill, "SKILL.md");
    const metadataPath = resolve(skillRoot, skill, "agents/openai.yaml");
    if (!existsSync(skillPath)) {
      failures.push(
        `routing: dispatched skill is missing .agents/skills/${skill}/SKILL.md`,
      );
      continue;
    }
    if (!existsSync(metadataPath))
      failures.push(`routing: ${skill} is missing agents/openai.yaml`);
    const metadata = parseFrontmatter(readText(skillPath));
    if (metadata.name !== skill)
      failures.push(
        `routing: ${skill} frontmatter name does not match its directory`,
      );
    if (!metadata.description)
      failures.push(`routing: ${skill} is missing a trigger description`);
    else if (descriptions.has(metadata.description)) {
      failures.push(
        `routing: ${skill} duplicates ${descriptions.get(metadata.description)} description`,
      );
    } else descriptions.set(metadata.description, skill);
    if (readText(skillPath).includes("TODO"))
      failures.push(`routing: ${skill} contains unresolved TODO text`);
  }
  return failures;
}

function activeBridgeFiles(root) {
  const bridgeRoot = resolve(root, "docs/chatgpt-project-bridge");
  if (!existsSync(bridgeRoot)) return [];
  return readdirSync(bridgeRoot)
    .filter((name) => name.endsWith(".md"))
    .map((name) => resolve(bridgeRoot, name))
    .filter((path) =>
      readText(path).includes("Status: active ChatGPT Project baseline file"),
    );
}

export function validateBridgeArchitecture(root) {
  const failures = [];
  const files = activeBridgeFiles(root);
  if (files.length !== 2)
    failures.push(
      `bridge: expected two active baseline files; found ${files.length}`,
    );
  const headingOwners = (heading) =>
    files.filter((path) =>
      new RegExp(`^##\\s+${heading}\\s*$`, "im").test(readText(path)),
    );
  for (const heading of [
    "Authority And Currentness",
    "Context Packet Requirement",
    "Retrieval Routes",
  ]) {
    const owners = headingOwners(heading);
    if (owners.length !== 1)
      failures.push(
        `bridge: ${heading} must have exactly one active baseline owner; found ${owners.length}`,
      );
  }
  return failures;
}

function commandScript(command) {
  return String(command || "").match(/^node\s+([^\s]+\.mjs)(?:\s|$)/)?.[1];
}

export function validateExecutableRoutes(root) {
  const failures = [];
  const packagePath = resolve(root, "package.json");
  if (!existsSync(packagePath)) return ["execution: missing package.json"];
  const scripts = readJson(packagePath).scripts || {};
  for (const name of requiredWorkflowCommands) {
    if (!scripts[name]) {
      failures.push(`execution: package.json is missing ${name}`);
      continue;
    }
    const referencedScripts = [
      ...String(scripts[name]).matchAll(/(?:^|\s)([^\s]+\.mjs)(?=\s|$)/g),
    ].map((match) => match[1]);
    for (const scriptPath of referencedScripts) {
      if (!existsSync(resolve(root, scriptPath))) {
        failures.push(
          `execution: ${name} points to missing script ${scriptPath}`,
        );
      }
    }
  }
  return failures;
}

export function validateReferencedArtifacts(root) {
  const failures = [];
  const routingFiles = [resolve(root, "AGENTS.md")];
  for (const skill of repoSkillRefs(
    existsSync(routingFiles[0]) ? readText(routingFiles[0]) : "",
  )) {
    routingFiles.push(resolve(root, `.agents/skills/${skill}/SKILL.md`));
  }
  for (const path of routingFiles) {
    if (!existsSync(path)) continue;
    for (const match of readText(path).matchAll(
      /`([^`\r\n]+\.(?:md|mjs|json|ya?ml))`/g,
    )) {
      const referenced = match[1];
      if (
        /[<>*]/.test(referenced) ||
        /^[A-Za-z]+:/.test(referenced) ||
        /^https?:\/\//.test(referenced)
      )
        continue;
      if (!existsSync(resolve(root, referenced))) {
        failures.push(
          `routing: ${toRepoPath(root, path)} points to missing artifact ${referenced}`,
        );
      }
    }
  }

  const issueTemplateRoot = resolve(root, ".github/ISSUE_TEMPLATE");
  const issueTemplates = discoverFiles(issueTemplateRoot, (path) =>
    /\.ya?ml$/.test(path),
  );
  if (issueTemplates.length === 0)
    failures.push("routing: no executable GitHub issue template exists");
  return failures;
}

export function validateAuthorityRouter(root) {
  const failures = [];
  const agentsPath = resolve(root, "AGENTS.md");
  const contextMapPath = resolve(root, "CONTEXT-MAP.md");
  if (!existsSync(agentsPath)) return ["authority-router: missing AGENTS.md"];
  if (!readText(agentsPath).includes("CONTEXT-MAP.md")) {
    failures.push(
      "authority-router: AGENTS.md does not route through CONTEXT-MAP.md",
    );
  }
  if (!existsSync(contextMapPath)) {
    failures.push("authority-router: missing CONTEXT-MAP.md");
    return failures;
  }

  const text = readText(contextMapPath);
  if (!text.includes(sourceRootPath)) {
    failures.push(
      `authority-router: CONTEXT-MAP.md does not name canonical source ${sourceRootPath}`,
    );
  }
  const linkedPaths = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1])
    .filter((path) => !/^(?:https?:|#)/.test(path));
  for (const linkedPath of linkedPaths) {
    if (!existsSync(resolve(dirname(contextMapPath), linkedPath))) {
      failures.push(
        `authority-router: CONTEXT-MAP.md points to missing route ${linkedPath}`,
      );
    }
  }
  if (!linkedPaths.some((path) => /docs\/adr\/README\.md$/.test(path))) {
    failures.push(
      "authority-router: CONTEXT-MAP.md has no accepted-ADR index route",
    );
  }
  return failures;
}

export function validatePlanningOwnership(root) {
  const failures = [];
  const planningRoot = resolve(root, "planning");
  if (!existsSync(planningRoot)) return ["planning: missing pointer surface"];
  for (const path of discoverFiles(planningRoot, () => true)) {
    if (toRepoPath(planningRoot, path) !== "README.md") {
      failures.push(
        `planning: repo pointer surface contains planning state ${toRepoPath(root, path)}`,
      );
    }
  }
  const readmePath = resolve(planningRoot, "README.md");
  if (!existsSync(readmePath)) {
    failures.push("planning: pointer surface is missing README.md");
  } else if (!/^Status:\s*.*pointer only/im.test(readText(readmePath))) {
    failures.push("planning: README.md is not classified as pointer only");
  }
  return failures;
}

function activePolicyFiles(root) {
  const files = new Set();
  for (const path of [
    resolve(root, "AGENTS.md"),
    resolve(root, "package.json"),
    resolve(root, "docs/nexus-game-source/README.md"),
    resolve(root, "docs/admin/nexus-distributed-surfaces.md"),
    resolve(root, "planning/README.md"),
  ]) {
    if (existsSync(path)) files.add(path);
  }
  const canonicalSourceRoot = resolve(root, sourceRootPath);
  for (const path of discoverFiles(root, (path) =>
    path.endsWith("AGENTS.md"),
  )) {
    if (!isInside(canonicalSourceRoot, path)) files.add(path);
  }
  for (const path of discoverFiles(resolve(root, ".agents/skills"), (path) =>
    /\.(?:md|ya?ml)$/.test(path),
  ))
    files.add(path);
  for (const path of discoverFiles(resolve(root, "scripts"), (path) =>
    path.endsWith(".mjs"),
  )) {
    if (
      !path.endsWith("nexus-workflow-invariants.mjs") &&
      !path.endsWith("validate-nexus-workflow.test.mjs")
    )
      files.add(path);
  }
  for (const path of activeBridgeFiles(root)) files.add(path);
  return [...files];
}

export function validateRetiredPromotionReferences(root) {
  const failures = [];
  for (const path of activePolicyFiles(root)) {
    const text = readText(path);
    for (const identifier of retiredSourcePromotionIdentifiers) {
      if (text.includes(identifier))
        failures.push(
          `retired-promotion: ${toRepoPath(root, path)} references ${identifier}`,
        );
    }
  }
  return failures;
}

function extractRegistryOwnerPath(stubText) {
  return (
    stubText.match(
      /`([A-Z]:\\[^`\r\n]+Nexus Distributed Surfaces\.md)`/,
    )?.[1] || null
  );
}

export function validateActivePathReferences(root) {
  const failures = [];
  const stubPath = resolve(root, "docs/admin/nexus-distributed-surfaces.md");
  if (!existsSync(stubPath))
    return ["paths: missing distributed-surface owner pointer"];
  const allowedOwnerPath = extractRegistryOwnerPath(readText(stubPath));
  if (!allowedOwnerPath)
    failures.push(
      "paths: distributed-surface stub does not name its owner note",
    );
  for (const path of activePolicyFiles(root)) {
    const text = readText(path);
    for (const match of text.matchAll(/[A-Z]:\\[^`\r\n|)]+/g)) {
      const value = match[0].trim();
      if (path === stubPath && value === allowedOwnerPath) continue;
      failures.push(
        `paths: ${toRepoPath(root, path)} maintains absolute path outside the owner registry: ${value}`,
      );
    }
  }
  return failures;
}

function tablePath(text, fact) {
  const escaped = fact.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    text.match(
      new RegExp("^\\|\\s*" + escaped + "\\s*\\|\\s*`([^`]+)`", "mi"),
    )?.[1] || null
  );
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

export function validateObsidianPointerSurface(root, ownerPath = null) {
  const failures = [];
  if (!ownerPath) {
    const stubPath = resolve(root, "docs/admin/nexus-distributed-surfaces.md");
    if (!existsSync(stubPath)) return failures;
    ownerPath = extractRegistryOwnerPath(readText(stubPath));
  }
  if (!ownerPath || !existsSync(ownerPath)) return failures;
  const ownerText = readText(ownerPath);
  const canonicalPath = tablePath(ownerText, "Canonical game source");
  if (canonicalPath !== sourceRootPath) {
    failures.push(
      `paths: owner registry canonical source is ${canonicalPath || "missing"}; expected ${sourceRootPath}`,
    );
  }
  const pointerRoot = tablePath(ownerText, "Obsidian source navigation");
  if (!pointerRoot || !existsSync(pointerRoot)) {
    failures.push(
      "obsidian-pointer: maintained source-navigation path is missing",
    );
    return failures;
  }
  const pointerAgentsPath = resolve(pointerRoot, "AGENTS.md");
  if (!existsSync(pointerAgentsPath)) {
    failures.push(
      "obsidian-pointer: 00 Source is missing its scoped AGENTS.md boundary",
    );
  } else {
    const boundary = readText(pointerAgentsPath);
    if (
      !/pointer/i.test(boundary) ||
      !/not (?:a )?(?:copied )?source/i.test(boundary)
    ) {
      failures.push(
        "obsidian-pointer: 00 Source AGENTS.md does not preserve the pointer-only boundary",
      );
    }
  }

  const canonicalFiles = discoverFiles(
    resolve(root, sourceRootPath),
    (path) =>
      path.endsWith(".md") && !/[\\/]SOURCE-(?:INDEX|SLICES)\.md$/.test(path),
  );
  const hashes = new Map(
    canonicalFiles.map((path) => [sha256(path), toRepoPath(root, path)]),
  );
  for (const path of discoverFiles(pointerRoot, (candidate) =>
    candidate.endsWith(".md"),
  )) {
    const copiedFrom = hashes.get(sha256(path));
    if (copiedFrom)
      failures.push(
        `obsidian-pointer: ${path} duplicates canonical source ${copiedFrom}`,
      );
  }
  return failures;
}

function runNodeCheck(root, scriptName, args = []) {
  const packageScripts = readJson(resolve(root, "package.json")).scripts || {};
  const scriptPath = commandScript(packageScripts[scriptName]);
  if (!scriptPath)
    return [`execution: ${scriptName} is not a direct Node validation command`];
  const result = spawnSync(
    process.execPath,
    [resolve(root, scriptPath), ...args],
    {
      cwd: root,
      encoding: "utf8",
    },
  );
  if (result.status === 0) return [];
  return [
    `generated-state: ${scriptName} failed: ${[result.stdout.trim(), result.stderr.trim()].filter(Boolean).join(" ")}`,
  ];
}

export function validateWorkflowInvariants(
  root,
  { runGeneratedChecks = true, ownerPath = null } = {},
) {
  const failures = [
    ...validateExecutableRoutes(root),
    ...validateReferencedArtifacts(root),
    ...validateAuthorityRouter(root),
    ...validatePlanningOwnership(root),
    ...validateSkillRouting(root),
    ...validateBridgeArchitecture(root),
    ...validateRetiredPromotionReferences(root),
    ...validateActivePathReferences(root),
    ...validateAdrState(root),
    ...validateSourceReconciliation(root),
    ...validateObsidianPointerSurface(root, ownerPath),
  ];

  const sourceIndexPath = resolve(root, sourceRootPath, "SOURCE-INDEX.json");
  const sliceCatalogPath = resolve(root, sourceRootPath, "SOURCE-SLICES.json");
  let sourceIndex = { files: [] };
  if (!existsSync(sourceIndexPath))
    failures.push("source-index: missing SOURCE-INDEX.json");
  else {
    try {
      sourceIndex = readJson(sourceIndexPath);
      failures.push(...validateSourceIndexData(sourceIndex, root));
    } catch (error) {
      failures.push(
        `source-index: could not parse SOURCE-INDEX.json: ${error.message}`,
      );
    }
  }
  if (!existsSync(sliceCatalogPath))
    failures.push("source-slices: missing SOURCE-SLICES.json");
  else {
    try {
      failures.push(
        ...validateSliceCatalogData(
          readJson(sliceCatalogPath),
          sourceIndex,
          root,
        ),
      );
    } catch (error) {
      failures.push(
        `source-slices: could not parse SOURCE-SLICES.json: ${error.message}`,
      );
    }
  }

  if (runGeneratedChecks) {
    failures.push(...runNodeCheck(root, "source:index:check", ["--check"]));
    failures.push(...runNodeCheck(root, "source:slices:check", ["--check"]));
    failures.push(...runNodeCheck(root, "context:pack:check"));
    failures.push(...runNodeCheck(root, "context:runtime:check"));
    failures.push(...runNodeCheck(root, "roadmap:index:check", ["--check"]));
  }
  return [...new Set(failures)];
}
