import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const repository = "quinnlivdahl-cmd/Nexus-App";
const roadmapPath = "docs/nexus-roadmap/ROADMAP.md";
const roadmapReadmePath = "docs/nexus-roadmap/README.md";
const issueIndexPath = "NEXUS_ISSUE_INDEX.md";
const indexMdPath = "docs/nexus-roadmap/ROADMAP-INDEX.md";
const indexJsonPath = "docs/nexus-roadmap/ROADMAP-INDEX.json";

const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");

const laneIssueMap = [
  {
    lane_number: 1,
    lane_title: "Core Game and Play Experience",
    issue_numbers: [4, 5, 12, 13, 14, 15, 19, 20, 33, 34, 35, 36, 38, 39, 40, 41],
  },
  {
    lane_number: 2,
    lane_title: "Runtime and Play Surfaces",
    issue_numbers: [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 20, 21],
  },
  {
    lane_number: 3,
    lane_title: "Source Architecture and Project Memory",
    issue_numbers: [6, 9, 18, 21, 45, 47],
  },
  {
    lane_number: 4,
    lane_title: "Campaign State and Continuity",
    issue_numbers: [8, 11, 12, 14],
  },
  {
    lane_number: 5,
    lane_title: "AI Workflow and Orchestration",
    issue_numbers: [2, 3, 22, 23, 24, 25, 42, 43, 44, 46, 47],
  },
  {
    lane_number: 6,
    lane_title: "Content and Expansion",
    issue_numbers: [17, 26, 27, 28, 29, 30, 31, 32],
  },
];

const fallbackIssueTitles = new Map([
  [47, "Create repo-accessible roadmap mirror and maintained issue index"],
]);

function readRepoFile(path) {
  const absolutePath = resolve(root, path);
  if (!existsSync(absolutePath)) throw new Error(`Missing required file: ${path}`);
  return readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};

  const endMatch = text.slice(3).match(/\r?\n---\r?\n/);
  if (!endMatch) return {};

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

    frontmatter[key] = stripQuotes(rawValue);
    activeArrayKey = null;
  }

  return frontmatter;
}

function firstHeading(text) {
  const match = text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function sectionText(text, heading) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `### ${heading}`);
  if (start === -1) return "";

  const body = [];
  for (const line of lines.slice(start + 1)) {
    if (/^#{2,3}\s+/.test(line)) break;
    body.push(line);
  }

  return body.join("\n").trim();
}

function bulletsFromSection(text, heading) {
  return sectionText(text, heading)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

function paragraphFromSection(text, heading) {
  return sectionText(text, heading)
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .find(Boolean) ?? "";
}

function extractLanes(text) {
  const laneRegex = /^## Lane (\d+) - (.+)$/gm;
  const matches = [...text.matchAll(laneRegex)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const next = matches[index + 1]?.index ?? text.search(/^## Cross-lane milestones$/m);
    const bodyEnd = next > start ? next : text.length;
    const body = text.slice(start, bodyEnd);

    return {
      lane_number: Number(match[1]),
      lane_title: match[2].trim(),
      purpose: paragraphFromSection(body, "Purpose"),
      current: bulletsFromSection(body, "Current"),
      next: bulletsFromSection(body, "Next"),
      near_term_milestones: bulletsFromSection(body, "Near-term milestone stack"),
    };
  });
}

function parseIssues(text) {
  const issues = new Map();
  const rowRegex = /^\|\s*#(\d+)\s*\|\s*([^|]+?)\s*\|/gm;

  for (const match of text.matchAll(rowRegex)) {
    issues.set(Number(match[1]), {
      number: Number(match[1]),
      title: match[2].trim().replace(/`/g, ""),
      url: `https://github.com/${repository}/issues/${match[1]}`,
    });
  }

  for (const [number, title] of fallbackIssueTitles) {
    if (!issues.has(number)) {
      issues.set(number, {
        number,
        title,
        url: `https://github.com/${repository}/issues/${number}`,
      });
    }
  }

  return issues;
}

function linkedIssues(issueNumbers, issues) {
  return issueNumbers.map((number) => {
    const issue = issues.get(number);
    return (
      issue ?? {
        number,
        title: "Title not found in NEXUS_ISSUE_INDEX.md",
        url: `https://github.com/${repository}/issues/${number}`,
      }
    );
  });
}

function compactList(values) {
  if (!values?.length) return "";
  return values.join("; ");
}

function issueLinks(issues) {
  return issues.map((issue) => `[#${issue.number}](${issue.url}) ${issue.title}`).join("<br>");
}

function escapeTable(value) {
  return String(value ?? "").replaceAll("|", "\\|").replace(/\r?\n/g, " ");
}

function buildIndex() {
  const roadmapText = readRepoFile(roadmapPath);
  const issueIndexText = readRepoFile(issueIndexPath);
  const frontmatter = parseFrontmatter(roadmapText);
  const lanes = extractLanes(roadmapText);
  const issues = parseIssues(issueIndexText);

  const indexedLanes = lanes.map((lane) => {
    const laneMap = laneIssueMap.find((item) => item.lane_number === lane.lane_number);
    return {
      ...lane,
      issue_numbers: laneMap?.issue_numbers ?? [],
      linked_issues: linkedIssues(laneMap?.issue_numbers ?? [], issues),
    };
  });

  return {
    repository,
    roadmap_title: frontmatter.title ?? firstHeading(roadmapText) ?? "Nexus Roadmap",
    doc_id: frontmatter.doc_id ?? null,
    doc_status: frontmatter.doc_status ?? null,
    working_state: frontmatter.working_state ?? null,
    canon_status: frontmatter.canon_status ?? null,
    source_role: frontmatter.source_role ?? null,
    original_review_lane: frontmatter.review_lane ?? null,
    base_path: "docs/nexus-roadmap",
    roadmap_path: roadmapPath,
    readme_path: roadmapReadmePath,
    issue_index_path: issueIndexPath,
    authority_note:
      "Repo-accessible planning mirror and index. This is not Nexus source canon and does not replace NEXUS_ISSUE_INDEX.md as the active issue queue.",
    currentness_note:
      frontmatter.doc_status === "historical_evidence"
        ? "The June roadmap is retained as non-controlling historical planning evidence. Use canonical source, accepted ADRs, Spatial Vertical Slice Map #57, and live GitHub Issues for current direction and work."
        : "The mirrored roadmap keeps its declared status until a deliberate review or supersession workflow changes it.",
    update_command: "corepack pnpm run roadmap:index",
    check_command: "corepack pnpm run roadmap:index:check",
    lane_count: indexedLanes.length,
    lanes: indexedLanes,
  };
}

function renderMarkdown(index) {
  const lines = [
    "# Nexus Roadmap Index",
    "",
    `Repository: \`${index.repository}\``,
    `Base path: \`${index.base_path}\``,
    `Roadmap: \`${index.roadmap_path}\``,
    `Roadmap doc id: \`${index.doc_id}\``,
    `Roadmap status: \`${index.doc_status}\`; \`${index.working_state}\`; \`${index.canon_status}\``,
    `Original review lane: \`${index.original_review_lane}\``,
    `Indexed lanes: ${index.lane_count}`,
    "",
    "## Authority Note",
    "",
    index.authority_note,
    "",
    index.currentness_note,
    "",
    "Use `NEXUS_ISSUE_INDEX.md` for the active issue queue. Use this index for roadmap lane context, exact repo paths, and issue linkage.",
    "",
    "## Maintenance",
    "",
    `Regenerate after roadmap, lane mapping, or issue-index changes: \`${index.update_command}\`.`,
    "",
    `Check that committed generated files are current: \`${index.check_command}\`.`,
    "",
    "## Exact Paths",
    "",
    `- Roadmap README: \`${index.readme_path}\``,
    `- Roadmap mirror: \`${index.roadmap_path}\``,
    `- Roadmap index JSON: \`${indexJsonPath}\``,
    `- Issue queue/control index: \`${index.issue_index_path}\``,
    "",
    "## Lane Issue Map",
    "",
    "| Lane | Purpose | Current | Next | Linked GitHub issues |",
    "|---|---|---|---|---|",
  ];

  for (const lane of index.lanes) {
    lines.push(
      `| Lane ${lane.lane_number}: ${escapeTable(lane.lane_title)} | ${escapeTable(lane.purpose)} | ${escapeTable(compactList(lane.current))} | ${escapeTable(compactList(lane.next))} | ${issueLinks(lane.linked_issues)} |`,
    );
  }

  return `${lines.join("\n")}\n`;
}

function renderJson(index) {
  return `${JSON.stringify(index, null, 2)}\n`;
}

function checkFile(path, expected) {
  const absolutePath = resolve(root, path);
  if (!existsSync(absolutePath)) return [`Missing generated file: ${path}`];
  const actual = readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
  return actual === expected ? [] : [`Generated file is stale: ${path}`];
}

const index = buildIndex();
const md = renderMarkdown(index);
const json = renderJson(index);

if (checkOnly) {
  const failures = [...checkFile(indexMdPath, md), ...checkFile(indexJsonPath, json)];
  if (failures.length > 0) {
    console.error("[update-roadmap-index] Failed");
    for (const failure of failures) console.error(`- ${failure}`);
    console.error(`Run \`${index.update_command}\` and review the generated diff.`);
    process.exit(1);
  }

  console.log(`[update-roadmap-index] OK (${index.lane_count} lanes)`);
  process.exit(0);
}

mkdirSync(dirname(resolve(root, indexMdPath)), { recursive: true });
writeFileSync(resolve(root, indexMdPath), md, "utf8");
writeFileSync(resolve(root, indexJsonPath), json, "utf8");
console.log(`[update-roadmap-index] Wrote ${index.lane_count} lanes to ${indexMdPath}`);
