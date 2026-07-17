import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import {
  applicabilityValues,
  authorityValues,
  retrievalMetadata,
} from "./source-retrieval-policy.mjs";
import { parseFrontmatter } from "./markdown-frontmatter.mjs";

const root = resolve(import.meta.dirname, "..");
const repository = "quinnlivdahl-cmd/Nexus-App";
const sourceRoot = "docs/nexus-game-source/source";
const sourceName = "Nexus-App Canonical Source";
const sourceEstablished = "2026-06-10";
const goldenTruthConfirmed = "2026-06-14";
const sourceHomeRenamed = "2026-06-14";
const indexMdPath = `${sourceRoot}/SOURCE-INDEX.md`;
const indexJsonPath = `${sourceRoot}/SOURCE-INDEX.json`;

const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");

function toRepoPath(path) {
  return relative(root, path).split(sep).join("/");
}

function firstHeading(text) {
  const match = text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function discoverMarkdownFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...discoverMarkdownFiles(fullPath));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    if (entry.name === "SOURCE-INDEX.md" || entry.name === "SOURCE-SLICES.md")
      continue;
    files.push(fullPath);
  }

  return files;
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function compactJoin(values) {
  return values
    .filter((value) => value !== undefined && value !== null && value !== "")
    .join("; ");
}

function useWhenForRetrieval(retrieval, domain, section, title) {
  if (retrieval.authority === "project_operations") {
    return `Use only when work needs Nexus ${domain} ${section.toLowerCase()} project or content-authoring operations for ${title}. Exclude from default game-rule and lore retrieval.`;
  }
  if (retrieval.authority === "historical_reference") {
    return `Use deliberately for legacy workflow, prototype behavior, or provenance involving ${title}. Do not treat it as current game or runtime authority.`;
  }
  if (retrieval.authority === "non_authoritative") {
    return `Use deliberately as a non-authoritative template, register, manifest, or structural reference for ${title}. Exclude from default game retrieval.`;
  }
  return `Use when ChatGPT or app work needs ${domain} ${section.toLowerCase()} source context for ${title}. This repo path is the user-designated canonical source; Obsidian pointer cards provide navigation only.`;
}

function titleTerms(title) {
  return title
    .replace(/[_-]/g, " ")
    .split(/\s+/)
    .map((term) => term.replace(/[^A-Za-z0-9]/g, ""))
    .filter(Boolean);
}

function uniqueTerms(values) {
  const seen = new Set();
  const terms = [];

  for (const value of values.flat()) {
    if (value === undefined || value === null || value === "") continue;
    const text = String(value);
    if (seen.has(text)) continue;
    seen.add(text);
    terms.push(text);
  }

  return terms.join(", ");
}

function escapeTable(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replace(/\r?\n/g, " ");
}

function sourceItem(filePath) {
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const frontmatter = parseFrontmatter(text);
  const repoPath = toRepoPath(filePath);
  const relativeSourcePath = relative(
    resolve(root, sourceRoot),
    filePath,
  ).split(sep);
  const [domain = "Unsorted", section = "Unsorted"] = relativeSourcePath;
  const file = relativeSourcePath.at(-1);
  const docId =
    frontmatter.doc_id || file.replace(/ - .+$/, "").replace(/\.md$/, "");
  const title =
    frontmatter.title || firstHeading(text) || file.replace(/\.md$/, "");
  const contentRole = frontmatter.content_role;
  const sourceRole = frontmatter.source_role;
  const docStatus = frontmatter.doc_status;
  const canonStatus = frontmatter.canon_status;
  const workingState = frontmatter.working_state;
  const retrieval = retrievalMetadata(frontmatter, domain, repoPath);
  const roleStatus = compactJoin([
    contentRole,
    sourceRole,
    docStatus,
    canonStatus,
    workingState,
    retrieval.authority,
  ]);

  return {
    domain,
    section,
    file,
    exact_repo_path: repoPath,
    title,
    doc_id: docId,
    placement_domain: frontmatter.placement_domain || domain,
    role_status: roleStatus,
    ...retrieval,
    use_when: useWhenForRetrieval(retrieval, domain, section, title),
    key_terms: uniqueTerms([
      docId,
      asArray(frontmatter.legacy_ids),
      domain,
      section,
      contentRole,
      sourceRole,
      docStatus,
      canonStatus,
      workingState,
      retrieval.authority,
      retrieval.applicability,
      frontmatter.topic_family,
      asArray(frontmatter.owns_topics),
      titleTerms(title),
    ]),
  };
}

function buildIndex() {
  const sourceRootPath = resolve(root, sourceRoot);
  if (!existsSync(sourceRootPath)) {
    throw new Error(`Missing canonical source path: ${sourceRoot}`);
  }

  const files = discoverMarkdownFiles(sourceRootPath).map(sourceItem);
  const domainCounts = [
    ...files.reduce((counts, file) => {
      counts.set(file.domain, (counts.get(file.domain) ?? 0) + 1);
      return counts;
    }, new Map()),
  ]
    .map(([domain, count]) => ({ domain, files: count }))
    .sort((a, b) => a.domain.localeCompare(b.domain));

  files.sort((a, b) => a.exact_repo_path.localeCompare(b.exact_repo_path));

  const authorityCounts = authorityValues.map((authority) => ({
    authority,
    files: files.filter((file) => file.authority === authority).length,
  }));
  const unclassifiedCount = files.filter((file) => !file.authority).length;

  return {
    source_name: sourceName,
    source_established: sourceEstablished,
    golden_truth_confirmed: goldenTruthConfirmed,
    source_home_renamed: sourceHomeRenamed,
    repository,
    base_path: sourceRoot,
    path_status:
      "Durable repo source home renamed from the dated 2026-06-10 domain-source rebuild folder on 2026-06-14; user-designated canonical source path for game source documents.",
    authority_note:
      "Nexus-App canonical source index for exact GitHub retrieval and app source-pack work. The maintained Obsidian pointer-card route is owned by docs/admin/nexus-distributed-surfaces.md and is not a source copy.",
    authority_values: authorityValues,
    applicability_values: applicabilityValues,
    default_game_retrieval_policy:
      "Include game_current, game_provisional, and runtime_ai_behavior. Exclude project_operations, historical_reference, and non_authoritative. Documents outside the explicitly classified Admin and Modes domains retain legacy inclusion until classified.",
    update_command: "corepack pnpm run source:index",
    check_command: "corepack pnpm run source:index:check",
    file_count: files.length,
    domain_counts: domainCounts,
    authority_counts: [
      ...authorityCounts,
      { authority: "unclassified", files: unclassifiedCount },
    ],
    files,
  };
}

function renderMarkdown(index) {
  const lines = [
    "# Nexus-App Canonical Source Index",
    "",
    `Source name: ${index.source_name}`,
    `Source established: ${index.source_established}`,
    `Repo source confirmed: ${index.golden_truth_confirmed}`,
    `Source home renamed: ${index.source_home_renamed}`,
    `Repository: \`${index.repository}\``,
    `Base path: \`${index.base_path}\``,
    `Path status: ${index.path_status}`,
    `Indexed Markdown files: ${index.file_count}`,
    "",
    "## Authority Note",
    "",
    "This index covers the Nexus-App canonical source corpus for ChatGPT on-demand context retrieval and app source-pack work. The generated Obsidian pointer-card route is owned by `docs/admin/nexus-distributed-surfaces.md`; those cards navigate to repo files and do not form a second source corpus.",
    "",
    "ChatGPT should fetch exact indexed GitHub paths from this file instead of relying on GitHub folder/tree enumeration.",
    "",
    `Default game retrieval policy: ${index.default_game_retrieval_policy}`,
    "",
    "## Maintenance",
    "",
    `Regenerate after canonical source docs are added, removed, renamed, or changed: \`${index.update_command}\`.`,
    "",
    `Check that the committed index is current: \`${index.check_command}\`.`,
    "",
    "## Domain Counts",
    "",
    "| Domain | Files |",
    "|---|---:|",
  ];

  for (const count of index.domain_counts) {
    lines.push(`| ${escapeTable(count.domain)} | ${count.files} |`);
  }

  lines.push(
    "",
    "## Source Files",
    "",
    "| Title | Exact repo path | Authority | Applicability | Default game retrieval | Role/status | Use when | Key terms |",
    "|---|---|---|---|---|---|---|---|",
  );

  for (const file of index.files) {
    lines.push(
      `| ${escapeTable(file.title)} | \`${escapeTable(file.exact_repo_path)}\` | ${escapeTable(file.authority ?? "unclassified")} | ${escapeTable((file.applicability ?? []).join(", "))} | ${file.default_game_retrieval !== false ? "yes" : "no"} | ${escapeTable(file.role_status)} | ${escapeTable(file.use_when)} | ${escapeTable(file.key_terms)} |`,
    );
  }

  return `${lines.join("\n")}\n`;
}

function renderJson(index) {
  return `${JSON.stringify(index, null, 2)}\n`;
}

function checkFile(path, expected) {
  const absolutePath = resolve(root, path);
  if (!existsSync(absolutePath)) {
    return [`Missing generated file: ${path}`];
  }

  const actual = readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
  return actual === expected ? [] : [`Generated file is stale: ${path}`];
}

const index = buildIndex();
const md = renderMarkdown(index);
const json = renderJson(index);

if (checkOnly) {
  const failures = [
    ...checkFile(indexMdPath, md),
    ...checkFile(indexJsonPath, json),
  ];
  if (failures.length > 0) {
    console.error("[update-source-index] Failed");
    for (const failure of failures) console.error(`- ${failure}`);
    console.error(
      `Run \`${index.update_command}\` and review the generated diff.`,
    );
    process.exit(1);
  }

  console.log(`[update-source-index] OK (${index.file_count} files)`);
  process.exit(0);
}

mkdirSync(dirname(resolve(root, indexMdPath)), { recursive: true });
writeFileSync(resolve(root, indexMdPath), md, "utf8");
writeFileSync(resolve(root, indexJsonPath), json, "utf8");
console.log(
  `[update-source-index] Wrote ${index.file_count} files to ${indexMdPath}`,
);
