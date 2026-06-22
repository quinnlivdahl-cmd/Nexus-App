import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const repository = "quinnlivdahl-cmd/Nexus-App";
const sourceRoot = "docs/nexus-game-source/source";
const sourceName = "Nexus-App Canonical Source";
const sourceEstablished = "2026-06-10";
const goldenTruthConfirmed = "2026-06-14";
const sourceHomeRenamed = "2026-06-14";
const obsidianSource = "C:\\Users\\Quintin Livdahl\\Obsidian\\20 Projects\\Nexus Game\\00 Source";
const indexMdPath = `${sourceRoot}/SOURCE-INDEX.md`;
const indexJsonPath = `${sourceRoot}/SOURCE-INDEX.json`;

const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");

function toRepoPath(path) {
  return relative(root, path).split(sep).join("/");
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "[]") return [];
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed;
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};

  const endMatch = text.slice(3).match(/\r?\n---\r?\n/);
  if (!endMatch?.index) return {};

  const block = text.slice(3, endMatch.index + 3);
  const frontmatter = {};
  let activeArrayKey = null;

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
    if (entry.name === "SOURCE-INDEX.md") continue;
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
  return values.filter((value) => value !== undefined && value !== null && value !== "").join("; ");
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
  return String(value ?? "").replaceAll("|", "\\|").replace(/\r?\n/g, " ");
}

function sourceItem(filePath) {
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const frontmatter = parseFrontmatter(text);
  const repoPath = toRepoPath(filePath);
  const relativeSourcePath = relative(resolve(root, sourceRoot), filePath).split(sep);
  const [domain = "Unsorted", section = "Unsorted"] = relativeSourcePath;
  const file = relativeSourcePath.at(-1);
  const docId = frontmatter.doc_id || file.replace(/ - .+$/, "").replace(/\.md$/, "");
  const title = frontmatter.title || firstHeading(text) || file.replace(/\.md$/, "");
  const contentRole = frontmatter.content_role;
  const sourceRole = frontmatter.source_role;
  const docStatus = frontmatter.doc_status;
  const canonStatus = frontmatter.canon_status;
  const workingState = frontmatter.working_state;
  const roleStatus = compactJoin([
    contentRole,
    sourceRole,
    docStatus,
    canonStatus,
    workingState,
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
    use_when: `Use when ChatGPT or app work needs ${domain} ${section.toLowerCase()} source context for ${title}. This repo path is the user-designated canonical source; verify Obsidian working-copy currentness only when local Obsidian state matters.`,
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
  const domainCounts = [...files.reduce((counts, file) => {
    counts.set(file.domain, (counts.get(file.domain) ?? 0) + 1);
    return counts;
  }, new Map())]
    .map(([domain, count]) => ({ domain, files: count }))
    .sort((a, b) => a.domain.localeCompare(b.domain));

  files.sort((a, b) => a.exact_repo_path.localeCompare(b.exact_repo_path));

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
      `Nexus-App canonical source index for exact GitHub retrieval, app source-pack work, and Obsidian working-copy promotion. The Obsidian source working-copy layer is ${obsidianSource}.`,
    update_command: "corepack pnpm run source:index",
    check_command: "corepack pnpm run source:index:check",
    file_count: files.length,
    domain_counts: domainCounts,
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
    `This index covers the Nexus-App canonical source corpus for ChatGPT on-demand context retrieval, app source-pack work, and Obsidian working-copy promotion. The Obsidian source working-copy layer lives at \`${obsidianSource}\`; verify local Obsidian state only when it matters.`,
    "",
    "ChatGPT should fetch exact indexed GitHub paths from this file instead of relying on GitHub folder/tree enumeration.",
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
    "| Title | Exact repo path | Role/status | Use when | Key terms |",
    "|---|---|---|---|---|",
  );

  for (const file of index.files) {
    lines.push(
      `| ${escapeTable(file.title)} | \`${escapeTable(file.exact_repo_path)}\` | ${escapeTable(file.role_status)} | ${escapeTable(file.use_when)} | ${escapeTable(file.key_terms)} |`,
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
  const failures = [...checkFile(indexMdPath, md), ...checkFile(indexJsonPath, json)];
  if (failures.length > 0) {
    console.error("[update-source-index] Failed");
    for (const failure of failures) console.error(`- ${failure}`);
    console.error(`Run \`${index.update_command}\` and review the generated diff.`);
    process.exit(1);
  }

  console.log(`[update-source-index] OK (${index.file_count} files)`);
  process.exit(0);
}

mkdirSync(dirname(resolve(root, indexMdPath)), { recursive: true });
writeFileSync(resolve(root, indexMdPath), md, "utf8");
writeFileSync(resolve(root, indexJsonPath), json, "utf8");
console.log(`[update-source-index] Wrote ${index.file_count} files to ${indexMdPath}`);
