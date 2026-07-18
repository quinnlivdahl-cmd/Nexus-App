import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { parseFrontmatter } from "./markdown-frontmatter.mjs";
import {
  applicabilityValues,
  authorityValues,
  explicitlyClassifiedDomains,
} from "./source-retrieval-policy.mjs";

const sourceRootPath = "docs/nexus-game-source/source";
const workflowPaths = {
  repoAgents: "AGENTS.md",
  contextMap: "CONTEXT-MAP.md",
  adrRoot: "docs/adr",
  adrIndex: "docs/adr/README.md",
  planningRoot: "planning",
  planningPointer: "planning/README.md",
  bridgeRoot: "docs/chatgpt-project-bridge",
  bridgeManifest: "docs/chatgpt-project-bridge/BASELINE.json",
  distributedSurfaces: "docs/admin/nexus-distributed-surfaces.md",
  sourceReadme: "docs/nexus-game-source/README.md",
  packageJson: "package.json",
  repoSkillRoot: ".agents/skills",
  repoSkillDefinition: "SKILL.md",
  repoSkillMetadata: "agents/openai.yaml",
  issueTemplateRoot: ".github/ISSUE_TEMPLATE",
  scriptsRoot: "scripts",
  invariantModule: "nexus-workflow-invariants.mjs",
  invariantTests: "validate-nexus-workflow.test.mjs",
  sourceIndex: `${sourceRootPath}/SOURCE-INDEX.json`,
  sliceCatalog: `${sourceRootPath}/SOURCE-SLICES.json`,
};
const repoSkillReferencePattern = /\.agents\/skills\/([a-z0-9-]+)\/SKILL\.md/g;
const requiredBridgeRoles = [
  "authority_currentness",
  "context_packet_requirement",
  "retrieval_routes",
];
const pathRegistryFacts = {
  canonicalSource: "Canonical game source",
  obsidianSource: "Obsidian source navigation",
};
const ignoredDiscoveryDirectories = new Set([
  ".git",
  ".pnpm",
  "node_modules",
  "dist",
  "build",
]);
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

function discoverFiles(dir, predicate = () => true) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory() && !ignoredDiscoveryDirectories.has(entry.name)) {
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
        `source-slices: ${label} points outside ${workflowPaths.sourceIndex}: ${slice.exact_repo_path}`,
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
  const adrRoot = resolve(root, workflowPaths.adrRoot);
  if (!existsSync(adrRoot)) return [`adr: missing ${workflowPaths.adrRoot}`];
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

  const readmePath = resolve(root, workflowPaths.adrIndex);
  if (!existsSync(readmePath))
    failures.push(`adr: missing decision index ${workflowPaths.adrIndex}`);
  else {
    const indexed = new Set();
    for (const match of readText(readmePath).matchAll(
      /\((\d{4}-[^)]+\.md)\)/g,
    )) {
      const targetName = match[1];
      const id = targetName.slice(0, 4);
      indexed.add(id);
      const target = resolve(adrRoot, targetName);
      if (!existsSync(target)) {
        failures.push(
          `adr: decision index points to missing file ${targetName}`,
        );
      } else if (byId.get(id)?.path !== target) {
        failures.push(
          `adr: decision index target ${targetName} does not match ADR-${id}`,
        );
      }
    }
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
  const adrRecords = new Map(
    discoverFiles(resolve(root, workflowPaths.adrRoot), (path) =>
      /[\\/]\d{4}-[^\\/]+\.md$/.test(path),
    ).map((path) => [
      path.split(/[\\/]/).at(-1).slice(0, 4),
      { path, metadata: parseFrontmatter(readText(path)) },
    ]),
  );
  const resolvesToAccepted = (id, seen = new Set()) => {
    if (seen.has(id)) return false;
    seen.add(id);
    const record = adrRecords.get(id);
    if (!record) return false;
    if (record.metadata.status === "accepted") return true;
    if (record.metadata.status !== "superseded") return false;
    const replacementId = String(record.metadata.superseded_by || "").match(
      /(\d{4})/,
    )?.[1];
    return replacementId ? resolvesToAccepted(replacementId, seen) : false;
  };
  const files = discoverFiles(resolve(root, sourceRootPath), (path) =>
    path.endsWith(".md"),
  );
  for (const path of files) {
    const text = readText(path);
    const metadata = parseFrontmatter(text);
    const repoPath = toRepoPath(root, path);
    const isReconciled = metadata.working_state === "revised_vision_reconciled";
    if (isReconciled) {
      if (metadata.metadata_verified !== true)
        failures.push(`reconciliation: ${repoPath} is not metadata_verified`);
      if (!metadata.last_reviewed)
        failures.push(`reconciliation: ${repoPath} is missing last_reviewed`);
      if (!metadata.metadata_notes)
        failures.push(`reconciliation: ${repoPath} is missing metadata_notes`);
    }
    const referencedAdrIds = new Set(
      [...text.matchAll(/ADR-(\d{4})/g)].map((match) => match[1]),
    );
    for (const id of referencedAdrIds) {
      if (!adrRecords.has(id)) {
        failures.push(
          `reconciliation: ${repoPath} references missing ADR-${id}`,
        );
      } else if (isReconciled && !resolvesToAccepted(id)) {
        failures.push(
          `reconciliation: ${repoPath} cites non-controlling ADR-${id}`,
        );
      }
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
  return [...text.matchAll(repoSkillReferencePattern)].map((match) => match[1]);
}

export function validateSkillRouting(root) {
  const failures = [];
  const agentsPath = resolve(root, workflowPaths.repoAgents);
  if (!existsSync(agentsPath)) return ["routing: missing repo-root AGENTS.md"];
  const routedSkills = new Set(repoSkillRefs(readText(agentsPath)));
  const skillRoot = resolve(root, workflowPaths.repoSkillRoot);
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
    const skillPath = resolve(
      skillRoot,
      skill,
      workflowPaths.repoSkillDefinition,
    );
    const metadataPath = resolve(
      skillRoot,
      skill,
      workflowPaths.repoSkillMetadata,
    );
    if (!existsSync(skillPath)) {
      failures.push(
        `routing: dispatched skill is missing ${workflowPaths.repoSkillRoot}/${skill}/${workflowPaths.repoSkillDefinition}`,
      );
      continue;
    }
    if (!existsSync(metadataPath))
      failures.push(
        `routing: ${skill} is missing ${workflowPaths.repoSkillMetadata}`,
      );
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
  const manifestPath = resolve(root, workflowPaths.bridgeManifest);
  if (!existsSync(manifestPath)) return [];
  try {
    const bridgeRoot = resolve(root, workflowPaths.bridgeRoot);
    return normalizedArray(readJson(manifestPath).files)
      .filter(
        (entry) =>
          entry && typeof entry === "object" && typeof entry.path === "string",
      )
      .map((entry) => resolve(bridgeRoot, entry.path))
      .filter(
        (path) =>
          isInside(bridgeRoot, path) &&
          path.endsWith(".md") &&
          existsSync(path),
      );
  } catch {
    return [];
  }
}

export function validateBridgeArchitecture(root) {
  const failures = [];
  const manifestPath = resolve(root, workflowPaths.bridgeManifest);
  if (!existsSync(manifestPath)) {
    return [
      `bridge: missing ownership manifest ${workflowPaths.bridgeManifest}`,
    ];
  }
  let manifest;
  try {
    manifest = readJson(manifestPath);
  } catch (error) {
    return [`bridge: ownership manifest is invalid JSON: ${error.message}`];
  }
  if (manifest.schema_version !== 1) {
    failures.push(
      `bridge: unsupported ownership schema ${manifest.schema_version}`,
    );
  }
  const entries = normalizedArray(manifest.files);
  if (entries.length !== 2) {
    failures.push(
      `bridge: expected two active baseline files; found ${entries.length}`,
    );
  }
  const seenPaths = new Set();
  const roleOwners = new Map(requiredBridgeRoles.map((role) => [role, []]));
  const bridgeRoot = resolve(root, workflowPaths.bridgeRoot);
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") {
      failures.push("bridge: baseline entry must be an object");
      continue;
    }
    if (typeof entry.path !== "string" || !Array.isArray(entry.roles)) {
      failures.push(
        "bridge: baseline entry requires a string path and roles array",
      );
      continue;
    }
    if (!entry.path || seenPaths.has(entry.path)) {
      failures.push(`bridge: duplicate or missing baseline path ${entry.path}`);
      continue;
    }
    seenPaths.add(entry.path);
    const path = resolve(bridgeRoot, entry.path);
    if (!isInside(bridgeRoot, path) || !entry.path.endsWith(".md")) {
      failures.push(`bridge: invalid baseline path ${entry.path}`);
    } else if (!existsSync(path)) {
      failures.push(`bridge: baseline path does not exist ${entry.path}`);
    }
    for (const role of normalizedArray(entry.roles)) {
      if (!roleOwners.has(role)) {
        failures.push(`bridge: unapproved ownership role ${role}`);
      } else {
        roleOwners.get(role).push(entry.path);
      }
    }
  }
  for (const [role, owners] of roleOwners) {
    if (owners.length !== 1) {
      failures.push(
        `bridge: ${role} must have exactly one active baseline owner; found ${owners.length}`,
      );
    }
  }
  return failures;
}

function commandScript(command) {
  return String(command || "").match(/^node\s+([^\s]+\.mjs)(?:\s|$)/)?.[1];
}

export function validateExecutableRoutes(root) {
  const failures = [];
  const packagePath = resolve(root, workflowPaths.packageJson);
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
  const routingFiles = [resolve(root, workflowPaths.repoAgents)];
  for (const skill of repoSkillRefs(
    existsSync(routingFiles[0]) ? readText(routingFiles[0]) : "",
  )) {
    routingFiles.push(
      resolve(
        root,
        workflowPaths.repoSkillRoot,
        skill,
        workflowPaths.repoSkillDefinition,
      ),
    );
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

  const issueTemplateRoot = resolve(root, workflowPaths.issueTemplateRoot);
  const issueTemplates = discoverFiles(issueTemplateRoot, (path) =>
    /\.ya?ml$/.test(path),
  );
  if (issueTemplates.length === 0)
    failures.push("routing: no executable GitHub issue template exists");
  return failures;
}

export function validateAuthorityRouter(root) {
  const failures = [];
  const agentsPath = resolve(root, workflowPaths.repoAgents);
  const contextMapPath = resolve(root, workflowPaths.contextMap);
  if (!existsSync(agentsPath)) return ["authority-router: missing AGENTS.md"];
  if (!readText(agentsPath).includes(workflowPaths.contextMap)) {
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
  const planningRoot = resolve(root, workflowPaths.planningRoot);
  if (!existsSync(planningRoot)) return ["planning: missing pointer surface"];
  const pointerRelativePath = relative(
    planningRoot,
    resolve(root, workflowPaths.planningPointer),
  )
    .split(sep)
    .join("/");
  for (const path of discoverFiles(planningRoot, () => true)) {
    if (toRepoPath(planningRoot, path) !== pointerRelativePath) {
      failures.push(
        `planning: repo pointer surface contains planning state ${toRepoPath(root, path)}`,
      );
    }
  }
  const readmePath = resolve(root, workflowPaths.planningPointer);
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
    resolve(root, workflowPaths.repoAgents),
    resolve(root, workflowPaths.packageJson),
    resolve(root, workflowPaths.sourceReadme),
    resolve(root, workflowPaths.distributedSurfaces),
    resolve(root, workflowPaths.planningPointer),
    resolve(root, workflowPaths.bridgeManifest),
  ]) {
    if (existsSync(path)) files.add(path);
  }
  const canonicalSourceRoot = resolve(root, sourceRootPath);
  for (const path of discoverFiles(root, (path) =>
    path.endsWith(workflowPaths.repoAgents),
  )) {
    if (!isInside(canonicalSourceRoot, path)) files.add(path);
  }
  for (const path of discoverFiles(
    resolve(root, workflowPaths.repoSkillRoot),
    (path) => /\.(?:md|ya?ml)$/.test(path),
  ))
    files.add(path);
  for (const path of discoverFiles(
    resolve(root, workflowPaths.scriptsRoot),
    (path) => path.endsWith(".mjs"),
  )) {
    if (
      !path.endsWith(workflowPaths.invariantModule) &&
      !path.endsWith(workflowPaths.invariantTests)
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
  const stubPath = resolve(root, workflowPaths.distributedSurfaces);
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

function contentWords(text) {
  const withoutFrontmatter = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  return withoutFrontmatter.toLowerCase().match(/[a-z0-9]+/g) || [];
}

function shingleSet(words, size = 5) {
  const shingles = new Set();
  for (let index = 0; index <= words.length - size; index += 1) {
    shingles.add(words.slice(index, index + size).join(" "));
  }
  return shingles;
}

function isNearCopy(leftText, rightText) {
  const leftWords = contentWords(leftText);
  const rightWords = contentWords(rightText);
  if (Math.min(leftWords.length, rightWords.length) < 30) return false;
  const lengthRatio = leftWords.length / rightWords.length;
  if (lengthRatio < 0.75 || lengthRatio > 1.25) return false;
  const leftShingles = shingleSet(leftWords);
  const rightShingles = shingleSet(rightWords);
  let shared = 0;
  for (const shingle of leftShingles) {
    if (rightShingles.has(shingle)) shared += 1;
  }
  return shared / Math.min(leftShingles.size, rightShingles.size) >= 0.85;
}

export function validateObsidianPointerSurface(root, ownerPath = null) {
  const failures = [];
  const explicitOwnerPath = ownerPath !== null;
  if (!ownerPath) {
    const stubPath = resolve(root, workflowPaths.distributedSurfaces);
    if (!existsSync(stubPath)) {
      return [
        `obsidian-pointer: missing owner pointer ${workflowPaths.distributedSurfaces}`,
      ];
    }
    ownerPath = extractRegistryOwnerPath(readText(stubPath));
  }
  if (!ownerPath || !existsSync(ownerPath)) {
    if (
      explicitOwnerPath ||
      (process.platform === "win32" && !process.env.CI)
    ) {
      return [
        `obsidian-pointer: configured owner registry is unavailable: ${ownerPath || "missing path"}`,
      ];
    }
    // Non-Windows CI cannot mount the user's Obsidian vault. Repo-side owner,
    // routing, and canonical-source invariants still run there.
    return failures;
  }
  const ownerText = readText(ownerPath);
  const canonicalPath = tablePath(ownerText, pathRegistryFacts.canonicalSource);
  if (canonicalPath !== sourceRootPath) {
    failures.push(
      `paths: owner registry canonical source is ${canonicalPath || "missing"}; expected ${sourceRootPath}`,
    );
  }
  const pointerRoot = tablePath(ownerText, pathRegistryFacts.obsidianSource);
  if (!pointerRoot || !existsSync(pointerRoot)) {
    failures.push(
      "obsidian-pointer: maintained source-navigation path is missing",
    );
    return failures;
  }
  const pointerAgentsPath = resolve(pointerRoot, workflowPaths.repoAgents);
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
  const canonicalDocuments = canonicalFiles.map((path) => ({
    hash: sha256(path),
    path: toRepoPath(root, path),
    text: readText(path),
  }));
  const canonicalByHash = new Map(
    canonicalDocuments.map((document) => [document.hash, document.path]),
  );
  for (const path of discoverFiles(pointerRoot, (candidate) =>
    candidate.endsWith(".md"),
  )) {
    if (path === pointerAgentsPath) continue;
    const pointerText = readText(path);
    const pointerMetadata = parseFrontmatter(pointerText);
    const canonicalKeys = [
      "doc_id",
      "source_role",
      "canon_status",
      "working_state",
      "owns_topics",
    ].filter((key) => Object.hasOwn(pointerMetadata, key));
    if (canonicalKeys.length > 0) {
      failures.push(
        `obsidian-pointer: ${path} carries canonical-source metadata: ${canonicalKeys.join(", ")}`,
      );
    }
    const copiedFrom = canonicalByHash.get(sha256(path));
    if (copiedFrom)
      failures.push(
        `obsidian-pointer: ${path} duplicates canonical source ${copiedFrom}`,
      );
    else {
      const nearCopy = canonicalDocuments.find((document) =>
        isNearCopy(document.text, pointerText),
      );
      if (nearCopy) {
        failures.push(
          `obsidian-pointer: ${path} substantially copies canonical source ${nearCopy.path}`,
        );
      }
    }
  }
  return failures;
}

function runNodeCheck(root, scriptName, args = []) {
  const packageScripts =
    readJson(resolve(root, workflowPaths.packageJson)).scripts || {};
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

export function validateWorkflowInvariants(root) {
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
    ...validateObsidianPointerSurface(root),
  ];

  const sourceIndexPath = resolve(root, workflowPaths.sourceIndex);
  const sliceCatalogPath = resolve(root, workflowPaths.sliceCatalog);
  let sourceIndex = { files: [] };
  if (!existsSync(sourceIndexPath))
    failures.push(`source-index: missing ${workflowPaths.sourceIndex}`);
  else {
    try {
      sourceIndex = readJson(sourceIndexPath);
      failures.push(...validateSourceIndexData(sourceIndex, root));
    } catch (error) {
      failures.push(
        `source-index: could not parse ${workflowPaths.sourceIndex}: ${error.message}`,
      );
    }
  }
  if (!existsSync(sliceCatalogPath))
    failures.push(`source-slices: missing ${workflowPaths.sliceCatalog}`);
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
        `source-slices: could not parse ${workflowPaths.sliceCatalog}: ${error.message}`,
      );
    }
  }

  failures.push(...runNodeCheck(root, "source:index:check", ["--check"]));
  failures.push(...runNodeCheck(root, "source:slices:check", ["--check"]));
  failures.push(...runNodeCheck(root, "context:pack:check"));
  failures.push(...runNodeCheck(root, "context:runtime:check"));
  failures.push(...runNodeCheck(root, "roadmap:index:check", ["--check"]));
  return [...new Set(failures)];
}
