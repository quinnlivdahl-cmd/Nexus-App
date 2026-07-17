import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");

const requiredFiles = [
  "AGENTS.md",
  "CONTEXT-MAP.md",
  "NEXUS_ISSUE_INDEX.md",
  "NEXUS_TASK_PACKET_TEMPLATE.md",
  "NEXUS_HANDOFF_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/nexus-task-packet.yml",
  ".github/labels.yml",
  ".agents/skills/nexus-task-intake/SKILL.md",
  ".agents/skills/nexus-source-router/SKILL.md",
  ".agents/skills/nexus-handoff-bridge/SKILL.md",
  ".agents/skills/nexus-session-discipline/SKILL.md",
  ".agents/skills/nexus-reviewer/SKILL.md",
  ".agents/skills/nexus-source-index-maintainer/SKILL.md",
  ".agents/skills/nexus-roadmap-maintainer/SKILL.md",
  "artifacts/nexus-companion/AGENTS.md",
  "artifacts/api-server/AGENTS.md",
  "lib/AGENTS.md",
  "scripts/AGENTS.md",
  "docs/agents/issue-tracker.md",
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
  "docs/admin/task-planning/nexus-review-rubric.md",
  "docs/game-system-contracts/drafts/README.md",
  "docs/source-draft-candidates/README.md",
  "docs/nexus-game-source/README.md",
  "docs/nexus-game-source/source/SOURCE-INDEX.md",
  "docs/nexus-game-source/source/SOURCE-INDEX.json",
];

const sectionChecks = [
  {
    file: "AGENTS.md",
    includes: [
      "## Stable Startup",
      "## Product and Authority",
      "## Nexus Git Ownership Override",
      "## Workflow Dispatch",
      "## Execution and Validation",
      "docs/agents/issue-tracker.md",
      "docs/admin/task-planning/codex-session-discipline-workflow.md",
      "docs/admin/task-planning/nexus-review-rubric.md",
      "docs/chatgpt-project-bridge/README.md",
      "Codex owns the technical Git choices.",
      "Changing `main` requires Quintin's explicit approval",
    ],
  },
  {
    file: "docs/admin/nexus-distributed-surfaces.md",
    includes: [
      "single owner for maintained absolute Nexus paths",
      "git rev-parse --show-toplevel",
      "current Git checkout",
    ],
  },
  {
    file: "NEXUS_TASK_PACKET_TEMPLATE.md",
    includes: [
      "Task name:",
      "Progress notes:",
      "Review gate:",
      "Reviewer result:",
      "Reviewer feedback / fix status:",
      "Side items / closeout routing:",
      "Prerequisites / readiness:",
      "Do Not Do:",
      "Validation / review method:",
      "Next action:",
      "Closeout evidence:",
    ],
  },
  {
    file: ".github/ISSUE_TEMPLATE/nexus-task-packet.yml",
    includes: [
      "label: Review gate",
      "label: Reviewer result",
      "label: Reviewer feedback / fix status",
      "PASS_WITH_NOTES",
      "NEEDS_FIXES",
      "BLOCKED",
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
      "## Review State",
      "## Unresolved Reviewer Findings",
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
      "historical repo-accessible planning evidence",
      "non-controlling historical planning context",
      "CORE-PILLARS-001",
      "Spatial Vertical Slice Map #57",
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
      "Never use these states as proof of repo source, Obsidian pointer-card freshness, or Drive payload currentness.",
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
      "implement -> validate -> independent review -> targeted fixes -> re-review when needed",
      "PASS_WITH_NOTES",
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
    file: ".agents/skills/nexus-reviewer/SKILL.md",
    includes: [
      "name: nexus-reviewer",
      "Reviewer status: PASS | PASS_WITH_NOTES | NEEDS_FIXES | BLOCKED",
      "Any source-authority violation, missing required validation, or unmet acceptance criterion prevents `PASS`.",
      "targeted fix",
    ],
  },
  {
    file: "docs/admin/task-planning/nexus-review-rubric.md",
    includes: [
      "Nexus Review Rubric",
      "PASS_WITH_NOTES",
      "Any source-authority violation, missing required validation, or unmet acceptance criterion prevents `PASS`.",
      "implement -> validate -> independent review -> targeted fixes -> re-review when needed",
      "Local-First Behavior",
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
      "generated pointer cards",
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

const retiredSourcePromotionFiles = [
  ".agents/skills/nexus-golden-source-promoter/SKILL.md",
  ".agents/skills/nexus-golden-source-promoter/agents/openai.yaml",
  "scripts/promote-golden-source.mjs",
];

for (const file of retiredSourcePromotionFiles) {
  if (existsSync(resolve(root, file))) {
    failures.push(`Retired source-promotion file is active again: ${file}`);
  }
}

const retiredSourcePromotionIdentifiers = [
  "source:promote-golden",
  "promote-golden-source.mjs",
  "nexus-golden-source-promoter",
];

const activeSourceRoutingFiles = [
  "package.json",
  "AGENTS.md",
  ".agents/skills/nexus-source-router/SKILL.md",
  ".agents/skills/nexus-source-index-maintainer/SKILL.md",
  "docs/nexus-game-source/README.md",
  "docs/chatgpt-project-bridge/README.md",
  "docs/chatgpt-project-bridge/00-BOOTSTRAP.md",
  "docs/chatgpt-project-bridge/01-SLOT-MAP.md",
  "docs/chatgpt-project-bridge/02-GLOBAL-PROJECT-INSTRUCTIONS.md",
  "docs/chatgpt-project-bridge/03-OPERATING-MODEL.md",
  "docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md",
  "docs/chatgpt-project-bridge/20-SOURCE-AUTHORITY-SUMMARY.md",
];

for (const file of activeSourceRoutingFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  for (const identifier of retiredSourcePromotionIdentifiers) {
    if (text.includes(identifier)) {
      failures.push(`${file} references retired source promotion: ${identifier}`);
    }
  }
}

const activePathPolicyFiles = [
  "AGENTS.md",
  "README.md",
  "NEXUS_ISSUE_INDEX.md",
  "NEXUS_ISSUE_TRANSITION.md",
  "NEXUS_LOCAL_PLAYABLE_ALPHA.md",
  ".agents/skills/nexus-source-router/SKILL.md",
  ".agents/skills/nexus-source-index-maintainer/SKILL.md",
  "docs/admin/nexus-distributed-surfaces.md",
  "docs/admin/task-planning/repo-first-task-planning-workflow.md",
  "docs/nexus-roadmap/README.md",
  "docs/nexus-game-source/README.md",
  "docs/contexts/nexus-project-operations/CONTEXT.md",
  "docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md",
  "docs/chatgpt-project-bridge/README.md",
  "docs/chatgpt-project-bridge/00-BOOTSTRAP.md",
  "docs/chatgpt-project-bridge/02-GLOBAL-PROJECT-INSTRUCTIONS.md",
  "docs/chatgpt-project-bridge/20-SOURCE-AUTHORITY-SUMMARY.md",
];

// Historical handoffs and source legacy_paths remain outside this active-policy guard.
const disallowedActivePathPatterns = [
  {
    label: "dated clean-review worktree",
    pattern: /Nexus-App-Clean-Review-2026-07-06/,
  },
  {
    label: "hardcoded Nexus worktree path",
    pattern:
      /C:\\Users\\Quintin Livdahl\\Repos\\Nexus-App-Worktrees(?=$|[^-A-Za-z0-9_])/m,
  },
  {
    label: "legacy standalone checkout",
    pattern:
      /C:\\Users\\Quintin Livdahl\\Repos\\Nexus-App(?=$|[^-A-Za-z0-9_])/m,
  },
  {
    label: "retired pre-Obsidian vault root",
    pattern: /C:\\Users\\Quintin Livdahl\\Nexus(?=$|[^-A-Za-z0-9_])/m,
  },
  {
    label: "obsolete Workflow Control path",
    pattern:
      /C:\\Users\\Quintin Livdahl\\Projects\\Codex Workflow Control - 2026-06-14 - Active(?=$|[^-A-Za-z0-9_])/m,
  },
];

for (const file of activePathPolicyFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  for (const { label, pattern } of disallowedActivePathPatterns) {
    const match = text.match(pattern);
    if (match) {
      failures.push(
        `${file} contains retired active path guidance (${label}): ${match[0]}`,
      );
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
