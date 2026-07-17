import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { createHash } from "node:crypto";

const root = resolve(import.meta.dirname, "..");
const repository = "quinnlivdahl-cmd/Nexus-App";
const sourceRoot = "docs/nexus-game-source/source";
const catalogMdPath = `${sourceRoot}/SOURCE-SLICES.md`;
const catalogJsonPath = `${sourceRoot}/SOURCE-SLICES.json`;
const markerPattern =
  /^\s*<!--\s*source-slice:\s*([a-z][a-z0-9]*(?:[.-][a-z0-9]+)*)\s*-->\s*$/;
const headingPattern = /^(#{1,6})\s+(.+?)\s*$/;
const automaticHeadingLevel = 2;

const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");

const authorityValues = [
  "game_current",
  "game_provisional",
  "runtime_ai_behavior",
  "project_operations",
  "historical_reference",
  "non_authoritative",
];
const applicabilityValues = [
  "player_game_rules",
  "campaign_director_runtime",
  "content_authoring_workflow",
  "project_operations",
  "historical_provenance",
];
const defaultGameAuthorities = new Set([
  "game_current",
  "game_provisional",
  "runtime_ai_behavior",
]);
const explicitlyClassifiedDomains = new Set(["Admin", "Modes"]);

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

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function retrievalMetadata(frontmatter, domain, repoPath) {
  const authority = frontmatter.authority || null;
  const applicability = asArray(frontmatter.applicability);

  if (explicitlyClassifiedDomains.has(domain) && !authority) {
    throw new Error(`${repoPath} must declare authority`);
  }
  if (authority && !authorityValues.includes(authority)) {
    throw new Error(`${repoPath} has invalid authority: ${authority}`);
  }
  if (explicitlyClassifiedDomains.has(domain) && applicability.length === 0) {
    throw new Error(`${repoPath} must declare applicability`);
  }
  for (const value of applicability) {
    if (!applicabilityValues.includes(value)) {
      throw new Error(`${repoPath} has invalid applicability: ${value}`);
    }
  }

  if (!authority) return {};

  return {
    authority,
    applicability,
    default_game_retrieval: defaultGameAuthorities.has(authority),
  };
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

function headingId(title) {
  return title
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generatedHeadingId(title) {
  return headingId(title.replace(/^\d+(?:\.\d+)*[.)]?\s+/, "")) || "section";
}

function cleanHeadingTitle(rawTitle) {
  return rawTitle.replace(/\s+\{#[^}]+\}\s*$/, "").trim();
}

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function endIndexForHeading(lines, headingIndex, headingLevel) {
  let endIndex = lines.length - 1;

  for (let scan = headingIndex + 1; scan < lines.length; scan += 1) {
    const nextHeading = lines[scan].match(headingPattern);
    if (nextHeading && nextHeading[1].length <= headingLevel) {
      endIndex = scan - 1;
      break;
    }
  }

  return endIndex;
}

function trimLineRange(lines, startIndex, endIndex) {
  while (startIndex <= endIndex && !lines[startIndex]?.trim()) startIndex += 1;
  while (endIndex >= startIndex && !lines[endIndex]?.trim()) endIndex -= 1;
  return startIndex <= endIndex ? { startIndex, endIndex } : null;
}

function discoverSlices(filePath) {
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const frontmatter = parseFrontmatter(text);
  const lines = text.split(/\r?\n/);
  const repoPath = toRepoPath(filePath);
  const relativeSourcePath = relative(
    resolve(root, sourceRoot),
    filePath,
  ).split(sep);
  const [domain = "Unsorted", section = "Unsorted"] = relativeSourcePath;
  const file = relativeSourcePath.at(-1);
  const docId =
    frontmatter.doc_id || file.replace(/ - .+$/, "").replace(/\.md$/, "");
  const docTitle =
    frontmatter.title || firstHeading(text) || file.replace(/\.md$/, "");
  const retrieval = retrievalMetadata(frontmatter, domain, repoPath);
  const slices = [];
  const errors = [];
  const explicitIdsByHeadingIndex = new Map();
  const headings = [];

  for (let index = 0; index < lines.length; index += 1) {
    const markerMatch = lines[index].match(markerPattern);
    if (!markerMatch) {
      if (/source-slice:/i.test(lines[index])) {
        errors.push(
          `${repoPath}:${index + 1} has malformed source-slice marker`,
        );
      }
      continue;
    }

    const id = markerMatch[1];
    const headingIndex = index + 1;
    const headingMatch = lines[headingIndex]?.match(headingPattern);

    if (!headingMatch) {
      errors.push(
        `${repoPath}:${index + 1} source-slice ${id} must be followed immediately by a Markdown heading`,
      );
      continue;
    }

    explicitIdsByHeadingIndex.set(headingIndex, id);
  }

  for (let index = 0; index < lines.length; index += 1) {
    const headingMatch = lines[index].match(headingPattern);
    if (!headingMatch) continue;

    headings.push({
      index,
      headingLevel: headingMatch[1].length,
      title: cleanHeadingTitle(headingMatch[2]),
    });
  }

  const generatedIds = new Map();
  for (const heading of headings) {
    const explicitId = explicitIdsByHeadingIndex.get(heading.index);
    if (!explicitId && heading.headingLevel !== automaticHeadingLevel) continue;

    let id = explicitId;
    if (!id) {
      const baseGeneratedId = `auto.${headingId(docId)}.${generatedHeadingId(heading.title)}`;
      const generatedIdCount = (generatedIds.get(baseGeneratedId) ?? 0) + 1;
      generatedIds.set(baseGeneratedId, generatedIdCount);
      id =
        generatedIdCount === 1
          ? baseGeneratedId
          : `${baseGeneratedId}-${generatedIdCount}`;
    }
    const endIndex = endIndexForHeading(
      lines,
      heading.index,
      heading.headingLevel,
    );
    const content = lines
      .slice(heading.index, endIndex + 1)
      .join("\n")
      .trimEnd();

    slices.push({
      slice_id: id,
      slice_origin: explicitId ? "explicit_marker" : "generated_heading",
      doc_id: docId,
      doc_title: docTitle,
      domain,
      section,
      exact_repo_path: repoPath,
      heading: heading.title,
      heading_level: heading.headingLevel,
      heading_anchor: headingId(heading.title),
      start_line: heading.index + 1,
      end_line: endIndex + 1,
      content_sha256: sha256(content),
      source_role: frontmatter.source_role ?? null,
      canon_status: frontmatter.canon_status ?? null,
      doc_status: frontmatter.doc_status ?? null,
      working_state: frontmatter.working_state ?? null,
      topic_family: frontmatter.topic_family ?? null,
      ...retrieval,
    });
  }

  const titleHeading = headings.find((heading) => heading.headingLevel === 1);
  const firstH2 = headings.find(
    (heading) => heading.headingLevel === automaticHeadingLevel,
  );
  if (titleHeading && firstH2 && firstH2.index > titleHeading.index + 1) {
    let contextEndIndex = firstH2.index - 1;
    if (markerPattern.test(lines[contextEndIndex] ?? "")) contextEndIndex -= 1;
    const contextRange = trimLineRange(
      lines,
      titleHeading.index + 1,
      contextEndIndex,
    );

    if (contextRange) {
      const content = lines
        .slice(contextRange.startIndex, contextRange.endIndex + 1)
        .join("\n")
        .trimEnd();
      slices.push({
        slice_id: `auto.${headingId(docId)}.document-context`,
        slice_origin: "generated_document_context",
        doc_id: docId,
        doc_title: docTitle,
        domain,
        section,
        exact_repo_path: repoPath,
        heading: "Document Context",
        heading_level: 1,
        heading_anchor: "document-context",
        start_line: contextRange.startIndex + 1,
        end_line: contextRange.endIndex + 1,
        content_sha256: sha256(content),
        source_role: frontmatter.source_role ?? null,
        canon_status: frontmatter.canon_status ?? null,
        doc_status: frontmatter.doc_status ?? null,
        working_state: frontmatter.working_state ?? null,
        topic_family: frontmatter.topic_family ?? null,
        ...retrieval,
      });
    }
  }

  const h2Count = headings.filter(
    (heading) => heading.headingLevel === automaticHeadingLevel,
  ).length;
  const coveredH2Count = slices.filter(
    (slice) => slice.heading_level === automaticHeadingLevel,
  ).length;
  if (coveredH2Count !== h2Count) {
    errors.push(
      `${repoPath} covers ${coveredH2Count} of ${h2Count} level-two headings`,
    );
  }

  return { slices, errors, h2Count, coveredH2Count };
}

function buildCatalog() {
  const sourceRootPath = resolve(root, sourceRoot);
  if (!existsSync(sourceRootPath)) {
    throw new Error(`Missing Golden Truth source path: ${sourceRoot}`);
  }

  const slices = [];
  const failures = [];
  let documentCount = 0;
  let h2Count = 0;
  let coveredH2Count = 0;

  for (const filePath of discoverMarkdownFiles(sourceRootPath)) {
    const discovered = discoverSlices(filePath);
    documentCount += 1;
    h2Count += discovered.h2Count;
    coveredH2Count += discovered.coveredH2Count;
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

  const domainCounts = [
    ...slices.reduce((counts, slice) => {
      const count = counts.get(slice.domain) ?? {
        slices: 0,
        documents: new Set(),
      };
      count.slices += 1;
      count.documents.add(slice.doc_id);
      counts.set(slice.domain, count);
      return counts;
    }, new Map()),
  ]
    .map(([domain, count]) => ({
      domain,
      documents: count.documents.size,
      slices: count.slices,
    }))
    .sort((a, b) => a.domain.localeCompare(b.domain));

  const originCounts = [
    ...slices.reduce((counts, slice) => {
      counts.set(slice.slice_origin, (counts.get(slice.slice_origin) ?? 0) + 1);
      return counts;
    }, new Map()),
  ]
    .map(([origin, count]) => ({ origin, slices: count }))
    .sort((a, b) => a.origin.localeCompare(b.origin));

  return {
    catalog_name: "Nexus Golden Truth Source Slice Catalog",
    repository,
    base_path: sourceRoot,
    authority_note:
      "Generated broker-facing catalog of source slices in Golden Truth Markdown. Source slices are retrievable context units, not new source authority.",
    authority_values: authorityValues,
    applicability_values: applicabilityValues,
    default_game_retrieval_policy:
      "Include game_current, game_provisional, and runtime_ai_behavior. Exclude project_operations, historical_reference, and non_authoritative. Documents outside the explicitly classified Admin and Modes domains retain legacy inclusion until classified.",
    slice_policy:
      "Explicit source-slice markers keep their curated IDs. Every otherwise-unmarked level-two heading receives a deterministic generated ID, and meaningful document preambles receive a document-context slice.",
    generated_id_note:
      "Generated IDs remain stable while the owning doc_id and heading remain stable. Add an explicit source-slice marker before using a generated ID in a durable runtime contract.",
    marker_format:
      "<!-- source-slice: domain.topic.slice-id --> followed immediately by the indexed Markdown heading",
    update_command: "corepack pnpm run source:slices",
    check_command: "corepack pnpm run source:slices:check",
    document_count: documentCount,
    slice_count: slices.length,
    h2_section_count: h2Count,
    h2_covered_count: coveredH2Count,
    coverage_complete: h2Count === coveredH2Count,
    domain_counts: domainCounts,
    origin_counts: originCounts,
    slices,
  };
}

function escapeTable(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replace(/\r?\n/g, " ");
}

function renderMarkdown(catalog) {
  const lines = [
    "# Nexus Golden Truth Source Slice Catalog",
    "",
    `Repository: \`${catalog.repository}\``,
    `Base path: \`${catalog.base_path}\``,
    `Indexed source documents: ${catalog.document_count}`,
    `Indexed source slices: ${catalog.slice_count}`,
    `Level-two section coverage: ${catalog.h2_covered_count}/${catalog.h2_section_count}`,
    "",
    "## Authority Note",
    "",
    catalog.authority_note,
    "",
    catalog.slice_policy,
    "",
    catalog.generated_id_note,
    "",
    "The runtime app context pack should reference these slice IDs; this catalog does not decide which slices are selected for a prompt.",
    "",
    `Default game retrieval policy: ${catalog.default_game_retrieval_policy}`,
    "",
    "## Maintenance",
    "",
    `Regenerate after source documents or embedded source-slice markers change: \`${catalog.update_command}\`.`,
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
    "| Domain | Documents | Slices |",
    "|---|---:|---:|",
  ];

  for (const count of catalog.domain_counts) {
    lines.push(
      `| ${escapeTable(count.domain)} | ${count.documents} | ${count.slices} |`,
    );
  }

  lines.push("", "## Slice Origins", "", "| Origin | Slices |", "|---|---:|");

  for (const count of catalog.origin_counts) {
    lines.push(`| ${escapeTable(count.origin)} | ${count.slices} |`);
  }

  lines.push(
    "",
    "## Source Slices",
    "",
    "| Slice ID | Origin | Document | Heading | Exact repo path | Lines | Content SHA-256 |",
    "|---|---|---|---|---|---:|---|",
  );

  for (const slice of catalog.slices) {
    lines.push(
      `| \`${escapeTable(slice.slice_id)}\` | ${escapeTable(slice.slice_origin)} | ${escapeTable(slice.doc_id)} | ${escapeTable(slice.heading)} | \`${escapeTable(slice.exact_repo_path)}\` | ${slice.start_line}-${slice.end_line} | \`${slice.content_sha256.slice(0, 12)}...\` |`,
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
    const failures = [
      ...checkFile(catalogMdPath, md),
      ...checkFile(catalogJsonPath, json),
    ];
    if (failures.length > 0) {
      console.error("[update-source-slice-catalog] Failed");
      for (const failure of failures) console.error(`- ${failure}`);
      console.error(
        `Run \`${catalog.update_command}\` and review the generated diff.`,
      );
      process.exit(1);
    }

    console.log(
      `[update-source-slice-catalog] OK (${catalog.slice_count} slices)`,
    );
    process.exit(0);
  }

  mkdirSync(dirname(resolve(root, catalogMdPath)), { recursive: true });
  writeFileSync(resolve(root, catalogMdPath), md, "utf8");
  writeFileSync(resolve(root, catalogJsonPath), json, "utf8");
  console.log(
    `[update-source-slice-catalog] Wrote ${catalog.slice_count} slices to ${catalogMdPath}`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
