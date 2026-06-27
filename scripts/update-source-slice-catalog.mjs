import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { createHash } from "node:crypto";

const root = resolve(import.meta.dirname, "..");
const repository = "quinnlivdahl-cmd/Nexus-App";
const sourceRoot = "docs/nexus-game-source/source";
const catalogMdPath = `${sourceRoot}/SOURCE-SLICES.md`;
const catalogJsonPath = `${sourceRoot}/SOURCE-SLICES.json`;
const markerPattern = /^\s*<!--\s*source-slice:\s*([a-z][a-z0-9]*(?:[.-][a-z0-9]+)*)\s*-->\s*$/;
const headingPattern = /^(#{1,6})\s+(.+?)\s*$/;

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
    if (entry.name === "SOURCE-INDEX.md" || entry.name === "SOURCE-SLICES.md") continue;
    files.push(fullPath);
  }

  return files;
}

function headingId(title) {
  return title
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanHeadingTitle(rawTitle) {
  return rawTitle.replace(/\s+\{#[^}]+\}\s*$/, "").trim();
}

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function discoverSlices(filePath) {
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const frontmatter = parseFrontmatter(text);
  const lines = text.split(/\r?\n/);
  const repoPath = toRepoPath(filePath);
  const relativeSourcePath = relative(resolve(root, sourceRoot), filePath).split(sep);
  const [domain = "Unsorted", section = "Unsorted"] = relativeSourcePath;
  const file = relativeSourcePath.at(-1);
  const docId = frontmatter.doc_id || file.replace(/ - .+$/, "").replace(/\.md$/, "");
  const docTitle = frontmatter.title || firstHeading(text) || file.replace(/\.md$/, "");
  const slices = [];
  const errors = [];

  for (let index = 0; index < lines.length; index += 1) {
    const markerMatch = lines[index].match(markerPattern);
    if (!markerMatch) {
      if (/source-slice:/i.test(lines[index])) {
        errors.push(`${repoPath}:${index + 1} has malformed source-slice marker`);
      }
      continue;
    }

    const id = markerMatch[1];
    const headingIndex = index + 1;
    const headingMatch = lines[headingIndex]?.match(headingPattern);

    if (!headingMatch) {
      errors.push(`${repoPath}:${index + 1} source-slice ${id} must be followed immediately by a Markdown heading`);
      continue;
    }

    const headingLevel = headingMatch[1].length;
    const title = cleanHeadingTitle(headingMatch[2]);
    let endIndex = lines.length - 1;

    for (let scan = headingIndex + 1; scan < lines.length; scan += 1) {
      const nextHeading = lines[scan].match(headingPattern);
      if (nextHeading && nextHeading[1].length <= headingLevel) {
        endIndex = scan - 1;
        break;
      }
    }

    const content = lines.slice(headingIndex, endIndex + 1).join("\n").trimEnd();
    slices.push({
      slice_id: id,
      doc_id: docId,
      doc_title: docTitle,
      domain,
      section,
      exact_repo_path: repoPath,
      heading: title,
      heading_level: headingLevel,
      heading_anchor: headingId(title),
      start_line: headingIndex + 1,
      end_line: endIndex + 1,
      content_sha256: sha256(content),
    });
  }

  return { slices, errors };
}

function buildCatalog() {
  const sourceRootPath = resolve(root, sourceRoot);
  if (!existsSync(sourceRootPath)) {
    throw new Error(`Missing Golden Truth source path: ${sourceRoot}`);
  }

  const slices = [];
  const failures = [];

  for (const filePath of discoverMarkdownFiles(sourceRootPath)) {
    const discovered = discoverSlices(filePath);
    slices.push(...discovered.slices);
    failures.push(...discovered.errors);
  }

  const seen = new Map();
  for (const slice of slices) {
    const previous = seen.get(slice.slice_id);
    if (previous) {
      failures.push(
        `Duplicate source slice ID ${slice.slice_id}: ${previous.exact_repo_path}:${previous.start_line} and ${slice.exact_repo_path}:${slice.start_line}`,
      );
      continue;
    }
    seen.set(slice.slice_id, slice);
  }

  slices.sort((a, b) => a.slice_id.localeCompare(b.slice_id));

  if (failures.length > 0) {
    const message = failures.map((failure) => `- ${failure}`).join("\n");
    throw new Error(`[update-source-slice-catalog] Failed\n${message}`);
  }

  const domainCounts = [...slices.reduce((counts, slice) => {
    counts.set(slice.domain, (counts.get(slice.domain) ?? 0) + 1);
    return counts;
  }, new Map())]
    .map(([domain, count]) => ({ domain, slices: count }))
    .sort((a, b) => a.domain.localeCompare(b.domain));

  return {
    catalog_name: "Nexus Golden Truth Source Slice Catalog",
    repository,
    base_path: sourceRoot,
    authority_note:
      "Generated broker-facing catalog of embedded source-slice IDs in Golden Truth Markdown. Source slices are retrievable context units, not new source authority.",
    marker_format: "<!-- source-slice: domain.topic.slice-id --> followed immediately by the indexed Markdown heading",
    update_command: "corepack pnpm run source:slices",
    check_command: "corepack pnpm run source:slices:check",
    slice_count: slices.length,
    domain_counts: domainCounts,
    slices,
  };
}

function escapeTable(value) {
  return String(value ?? "").replaceAll("|", "\\|").replace(/\r?\n/g, " ");
}

function renderMarkdown(catalog) {
  const lines = [
    "# Nexus Golden Truth Source Slice Catalog",
    "",
    `Repository: \`${catalog.repository}\``,
    `Base path: \`${catalog.base_path}\``,
    `Indexed source slices: ${catalog.slice_count}`,
    "",
    "## Authority Note",
    "",
    catalog.authority_note,
    "",
    "The runtime app context pack should reference these slice IDs; this catalog does not decide which slices are selected for a prompt.",
    "",
    "## Maintenance",
    "",
    `Regenerate after embedded source-slice markers change: \`${catalog.update_command}\`.`,
    "",
    `Check that the committed catalog is current: \`${catalog.check_command}\`.`,
    "",
    "Marker format:",
    "",
    "```md",
    "<!-- source-slice: domain.topic.slice-id -->",
    "## Indexed Heading",
    "```",
    "",
    "## Domain Counts",
    "",
    "| Domain | Slices |",
    "|---|---:|",
  ];

  for (const count of catalog.domain_counts) {
    lines.push(`| ${escapeTable(count.domain)} | ${count.slices} |`);
  }

  lines.push(
    "",
    "## Source Slices",
    "",
    "| Slice ID | Document | Heading | Exact repo path | Lines | Content SHA-256 |",
    "|---|---|---|---|---:|---|",
  );

  for (const slice of catalog.slices) {
    lines.push(
      `| \`${escapeTable(slice.slice_id)}\` | ${escapeTable(slice.doc_id)} | ${escapeTable(slice.heading)} | \`${escapeTable(slice.exact_repo_path)}\` | ${slice.start_line}-${slice.end_line} | \`${slice.content_sha256.slice(0, 12)}...\` |`,
    );
  }

  return `${lines.join("\n")}\n`;
}

function renderJson(catalog) {
  return `${JSON.stringify(catalog, null, 2)}\n`;
}

function checkFile(path, expected) {
  const absolutePath = resolve(root, path);
  if (!existsSync(absolutePath)) {
    return [`Missing generated file: ${path}`];
  }

  const actual = readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
  return actual === expected ? [] : [`Generated file is stale: ${path}`];
}

try {
  const catalog = buildCatalog();
  const md = renderMarkdown(catalog);
  const json = renderJson(catalog);

  if (checkOnly) {
    const failures = [...checkFile(catalogMdPath, md), ...checkFile(catalogJsonPath, json)];
    if (failures.length > 0) {
      console.error("[update-source-slice-catalog] Failed");
      for (const failure of failures) console.error(`- ${failure}`);
      console.error(`Run \`${catalog.update_command}\` and review the generated diff.`);
      process.exit(1);
    }

    console.log(`[update-source-slice-catalog] OK (${catalog.slice_count} slices)`);
    process.exit(0);
  }

  mkdirSync(dirname(resolve(root, catalogMdPath)), { recursive: true });
  writeFileSync(resolve(root, catalogMdPath), md, "utf8");
  writeFileSync(resolve(root, catalogJsonPath), json, "utf8");
  console.log(`[update-source-slice-catalog] Wrote ${catalog.slice_count} slices to ${catalogMdPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
