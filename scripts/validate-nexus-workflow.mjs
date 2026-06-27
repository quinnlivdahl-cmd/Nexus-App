import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");

const requiredFiles = [
  "AGENTS.md",
  "NEXUS_ISSUE_INDEX.md",
  "NEXUS_TASK_PACKET_TEMPLATE.md",
  "NEXUS_HANDOFF_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/nexus-task-packet.yml",
  ".github/labels.yml",
  ".agents/skills/nexus-task-intake/SKILL.md",
  ".agents/skills/nexus-source-router/SKILL.md",
  ".agents/skills/nexus-handoff-bridge/SKILL.md",
  ".agents/skills/nexus-session-discipline/SKILL.md",
  ".agents/skills/nexus-source-index-maintainer/SKILL.md",
  ".agents/skills/nexus-golden-source-promoter/SKILL.md",
  ".agents/skills/nexus-roadmap-maintainer/SKILL.md",
  "artifacts/nexus-companion/AGENTS.md",
  "artifacts/api-server/AGENTS.md",
  "lib/AGENTS.md",
  "scripts/AGENTS.md",
  "scripts/promote-golden-source.mjs",
  "docs/admin/nexus-distributed-surfaces.md",
  "docs/nexus-roadmap/README.md",
  "docs/nexus-roadmap/ROADMAP.md",
  "docs/nexus-roadmap/ROADMAP-INDEX.md",
  "docs/nexus-roadmap/ROADMAP-INDEX.json",
  "docs/chatgpt-project-bridge/README.md",
  "docs/chatgpt-project-bridge/00-BOOTSTRAP.md",
  "docs/chatgpt-project-bridge/01-SLOT-MAP.md",
  "docs/chatgpt-project-bridge/02-GLOBAL-PROJECT-INSTRUCTIONS.md",
  "docs/chatgpt-project-bridge/03-OPERATING-MODEL.md",
  "docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md",
  "docs/chatgpt-project-bridge/20-SOURCE-AUTHORITY-SUMMARY.md",
  "docs/chatgpt-project-bridge/90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md",
  "docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md",
  "docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md",
  "docs/chatgpt-project-bridge/preservation/README.md",
  "docs/chatgpt-project-bridge/task-packets/README.md",
  "docs/admin/task-planning/codex-session-discipline-workflow.md",
  "docs/game-system-contracts/drafts/README.md",
  "docs/source-draft-candidates/README.md",
  "docs/nexus-game-source/README.md",
  "docs/nexus-game-source/source/SOURCE-INDEX.md",
  "docs/nexus-game-source/source/SOURCE-INDEX.json",
];

const sectionChecks = [
  {
    file: "NEXUS_TASK_PACKET_TEMPLATE.md",
    includes: [
      "Task name:",
      "Progress notes:",
      "Side items / closeout routing:",
      "Prerequisites / readiness:",
      "Do Not Do:",
      "Validation / review method:",
      "Next action:",
      "Closeout evidence:",
    ],
  },
  {
    file: "NEXUS_HANDOFF_TEMPLATE.md",
    includes: [
      "Controlling issue:",
      "Planning anchor:",
      "Related synced-chat or bridge packet:",
      "## Files / Sources Inspected",
      "## Files Changed",
      "## Progress State",
      "## Closeout Evidence",
      "## Side Items / Closeout Routing",
      "## Next Safe Action",
      "### Codex",
      "### ChatGPT",
      "### Replit",
    ],
  },
  {
    file: "NEXUS_ISSUE_INDEX.md",
    includes: [
      "## Active Issues",
      "## Blocked Issues",
      "## Parked Work",
      "## Completed Issues",
      "## Future Script Hooks",
      "docs/nexus-roadmap/ROADMAP-INDEX.md",
      "docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md",
    ],
  },
  {
    file: "docs/nexus-roadmap/README.md",
    includes: [
      "repo-accessible planning surface",
      "NEXUS_ISSUE_INDEX.md` remains the issue queue/control surface",
      "corepack pnpm run roadmap:index",
      "ChatGPT / Stewy Use",
    ],
  },
  {
    file: "docs/nexus-roadmap/ROADMAP-INDEX.md",
    includes: [
      "Nexus Roadmap Index",
      "Authority Note",
      "Lane Issue Map",
      "Use `NEXUS_ISSUE_INDEX.md` for the active issue queue.",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/README.md",
    includes: [
      "repo-trackable bridge layer",
      "Upload Set",
      "ChatGPT Project consumes them as external context",
      "Nexus Roadmap",
      "Synced Chat Destinations",
      "Do not upload changing packet indexes",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/00-BOOTSTRAP.md",
    includes: [
      "Repo-side roadmap surface",
      "docs/nexus-roadmap/ROADMAP-INDEX.md",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/01-SLOT-MAP.md",
    includes: [
      "Slots are upload/context roles",
      "Future Packet Families",
      "Do not bulk-copy Obsidian `00 Source`",
      "Synced chat packet",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md",
    includes: [
      "verified-current-for-scope",
      "Upload Confirmation Rule",
      "Never use these states as proof of repo source, Obsidian working-copy, or Drive payload currentness.",
      "Roadmap Index Confirmation Rule",
      "Approved ChatGPT Repo Destinations",
      "Shared Session Discipline",
      "Context Window Handoff Trigger",
      "These destinations are GitHub repo paths",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md",
    includes: [
      "ChatGPT Codex Synced Chat Index",
      "ready-for-Codex",
      "Synced chat packets are context, not execution approval.",
      "2026-06-10-issue-43-session-discipline-planning.md",
    ],
  },
  {
    file: "docs/admin/task-planning/codex-session-discipline-workflow.md",
    includes: [
      "Codex Session Discipline Workflow",
      "notice -> classify -> route -> record -> sync",
      "Session Frame",
      "Side-Item Classes",
      "Mirrored Platform Specs",
      "Do Not Automate Yet",
    ],
  },
  {
    file: ".agents/skills/nexus-session-discipline/SKILL.md",
    includes: [
      "name: nexus-session-discipline",
      "compact session frame",
      "side task",
      "side finding",
      "tiny observation",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md",
    includes: [
      "ChatGPT Codex Handoff Index",
      "docs/chatgpt-project-bridge/handoffs/YYYY-MM-DD-<topic>.md",
      "Handoffs are context, not execution approval.",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/20-SOURCE-AUTHORITY-SUMMARY.md",
    includes: [
      "Source Authority Summary",
      "SOURCE-INDEX.md",
      "source-index-needed",
    ],
  },
  {
    file: "docs/nexus-game-source/README.md",
    includes: [
      "Nexus-App Canonical Source",
      "durable repo home",
      "source:promote-golden",
    ],
  },
  {
    file: "docs/nexus-game-source/source/SOURCE-INDEX.md",
    includes: [
      "Nexus-App Canonical Source Index",
      "Indexed Markdown files:",
      "ChatGPT should fetch exact indexed GitHub paths",
      "corepack pnpm run source:index",
    ],
  },
  {
    file: ".agents/skills/nexus-golden-source-promoter/SKILL.md",
    includes: [
      "nexus-golden-source-promoter",
      "canonical source",
      "node scripts/promote-golden-source.mjs",
      "--execute",
    ],
  },
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) {
    failures.push(`Missing required workflow file: ${file}`);
  }
}

for (const check of sectionChecks) {
  const path = resolve(root, check.file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  for (const expected of check.includes) {
    if (!text.includes(expected)) {
      failures.push(`${check.file} is missing required text: ${expected}`);
    }
  }
}

const sourceIndexJsonPath = resolve(
  root,
  "docs/nexus-game-source/source/SOURCE-INDEX.json",
);

if (existsSync(sourceIndexJsonPath)) {
  try {
    const sourceIndex = JSON.parse(
      readFileSync(sourceIndexJsonPath, "utf8").replace(/^\uFEFF/, ""),
    );
    if (typeof sourceIndex.file_count !== "number" || sourceIndex.file_count < 1) {
      failures.push(`SOURCE-INDEX.json has invalid file_count: ${sourceIndex.file_count}`);
    }

    if (sourceIndex.file_count !== (sourceIndex.files ?? []).length) {
      failures.push(
        `SOURCE-INDEX.json file_count ${sourceIndex.file_count} does not match files length ${(sourceIndex.files ?? []).length}`,
      );
    }

    for (const item of sourceIndex.files ?? []) {
      if (!item.exact_repo_path) {
        failures.push("SOURCE-INDEX.json contains an item without exact_repo_path");
        continue;
      }

      if (!existsSync(resolve(root, item.exact_repo_path))) {
        failures.push(`SOURCE-INDEX.json points to a missing file: ${item.exact_repo_path}`);
      }
    }
  } catch (error) {
    failures.push(`SOURCE-INDEX.json could not be parsed: ${error.message}`);
  }
}

const sourceIndexCheck = spawnSync(
  process.execPath,
  [resolve(root, "scripts/update-source-index.mjs"), "--check"],
  {
    cwd: root,
    encoding: "utf8",
  },
);

if (sourceIndexCheck.status !== 0) {
  failures.push(
    [
      "Source index is stale or could not be checked.",
      sourceIndexCheck.stdout.trim(),
      sourceIndexCheck.stderr.trim(),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

const sourceSliceCheck = spawnSync(
  process.execPath,
  [resolve(root, "scripts/update-source-slice-catalog.mjs"), "--check"],
  {
    cwd: root,
    encoding: "utf8",
  },
);

if (sourceSliceCheck.status !== 0) {
  failures.push(
    [
      "Source slice catalog is stale or could not be checked.",
      sourceSliceCheck.stdout.trim(),
      sourceSliceCheck.stderr.trim(),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

const contextPackCheck = spawnSync(
  process.execPath,
  [resolve(root, "scripts/validate-context-pack.mjs")],
  {
    cwd: root,
    encoding: "utf8",
  },
);

if (contextPackCheck.status !== 0) {
  failures.push(
    [
      "Source-backed context pack is invalid.",
      contextPackCheck.stdout.trim(),
      contextPackCheck.stderr.trim(),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

const runtimeContextCheck = spawnSync(
  process.execPath,
  [resolve(root, "scripts/validate-runtime-context-budget.mjs")],
  {
    cwd: root,
    encoding: "utf8",
  },
);

if (runtimeContextCheck.status !== 0) {
  failures.push(
    [
      "Source-backed runtime context budget is invalid.",
      runtimeContextCheck.stdout.trim(),
      runtimeContextCheck.stderr.trim(),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

const roadmapIndexCheck = spawnSync(
  process.execPath,
  [resolve(root, "scripts/update-roadmap-index.mjs"), "--check"],
  {
    cwd: root,
    encoding: "utf8",
  },
);

if (roadmapIndexCheck.status !== 0) {
  failures.push(
    [
      "Roadmap index is stale or could not be checked.",
      roadmapIndexCheck.stdout.trim(),
      roadmapIndexCheck.stderr.trim(),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

if (failures.length > 0) {
  console.error("[validate-nexus-workflow] Failed");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("[validate-nexus-workflow] OK");
