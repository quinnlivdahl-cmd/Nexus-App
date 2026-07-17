import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");

const retainedRepoSkills = [
  "nexus-source-maintenance",
  "nexus-issue-workflow",
  "nexus-chatgpt-bridge",
  "nexus-roadmap-maintenance",
];

const requiredFiles = [
  "AGENTS.md",
  "CONTEXT-MAP.md",
  "NEXUS_ISSUE_INDEX.md",
  "NEXUS_TASK_PACKET_TEMPLATE.md",
  "NEXUS_HANDOFF_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/nexus-task-packet.yml",
  ".github/labels.yml",
  ...retainedRepoSkills.flatMap((skill) => [
    `.agents/skills/${skill}/SKILL.md`,
    `.agents/skills/${skill}/agents/openai.yaml`,
  ]),
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
  "docs/chatgpt-project-bridge/PROJECT-INSTRUCTIONS.md",
  "docs/chatgpt-project-bridge/BRIDGE-INDEX.md",
  "docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md",
  "docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md",
  "docs/chatgpt-project-bridge/preservation/README.md",
  "docs/chatgpt-project-bridge/task-packets/README.md",
  "docs/admin/task-planning/codex-session-discipline-workflow.md",
  "docs/admin/task-planning/nexus-review-rubric.md",
  "docs/admin/task-planning/repo-first-task-planning-workflow.md",
  "planning/README.md",
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
      ".agents/skills/nexus-source-maintenance/SKILL.md",
      ".agents/skills/nexus-issue-workflow/SKILL.md",
      ".agents/skills/nexus-chatgpt-bridge/SKILL.md",
      ".agents/skills/nexus-roadmap-maintenance/SKILL.md",
      "installed global `code-review` skill",
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
      "## Two-File Baseline",
      "PROJECT-INSTRUCTIONS.md",
      "BRIDGE-INDEX.md",
      "Changing a rule should update its single owner",
      "## Superseded Baseline",
      "Archival #85",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/PROJECT-INSTRUCTIONS.md",
    includes: [
      "Status: active ChatGPT Project baseline file",
      "## Authority And Currentness",
      "Accepted ADRs control affected claims until reconciliation",
      "## Context Packet Requirement",
      "Request the smallest relevant context packet",
      "Do not guess, continue from memory",
      "Brainstorming may proceed from incomplete or stale context",
      "## Clarification And Response Behavior",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/BRIDGE-INDEX.md",
    includes: [
      "Status: active ChatGPT Project baseline file",
      "## Baseline Package",
      "## Retrieval Routes",
      "## Packet Routes",
      "task-packets/YYYY-MM-DD-<issue-or-topic>.md",
      "synced-chats/YYYY-MM-DD-<topic>.md",
      "handoffs/YYYY-MM-DD-<topic>.md",
      "preservation/YYYY-MM-DD-<topic>.md",
      "## Refresh And Upload Evidence",
      "Follow the upload-currentness rule in `PROJECT-INSTRUCTIONS.md`",
      "verified-current-for-scope",
      "Record actual upload confirmation outside the uploaded baseline",
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
      "## Planning Ownership",
      "Durable human-facing plans, findings, and progress",
      "Temporary current-session sequencing",
      "Cross-session executable continuity",
      "do not preserve by default",
      "Do Not Automate Yet",
    ],
  },
  {
    file: "planning/README.md",
    includes: [
      "Status: pointer only; not a planning-state owner",
      "Live GitHub Issues",
      "Obsidian Nexus hub `02 Planning`",
      "active chat or tool plan",
      "GitHub Issue comment or approved handoff",
      "Do not recreate `task_plan.md`",
    ],
  },
  {
    file: "docs/admin/task-planning/repo-first-task-planning-workflow.md",
    includes: [
      "Status: superseded workflow candidate; historical pointer only",
      "Planning Ownership #81",
      "docs/admin/task-planning/codex-session-discipline-workflow.md",
      "Do not restore its repo planning overlay",
    ],
  },
  {
    file: "docs/contexts/nexus-project-operations/CONTEXT.md",
    includes: [
      "**Durable Planning Note**:",
      "**Session Plan**:",
      "**Executable Continuity**:",
    ],
  },
  {
    file: ".agents/skills/nexus-source-maintenance/SKILL.md",
    includes: [
      "name: nexus-source-maintenance",
      "## Unique Trigger",
      "## Owner",
      "docs/nexus-game-source/source",
      "corepack pnpm run source:index",
      "corepack pnpm run source:index:check",
      "corepack pnpm run validate:workflow",
    ],
  },
  {
    file: ".agents/skills/nexus-issue-workflow/SKILL.md",
    includes: [
      "name: nexus-issue-workflow",
      "## Unique Trigger",
      "## Owner",
      "GitHub Issues are the live execution packets",
      "NEXUS_TASK_PACKET_TEMPLATE.md",
      "validate -> independently review -> synchronize -> commit and push -> comment -> close",
    ],
  },
  {
    file: ".agents/skills/nexus-chatgpt-bridge/SKILL.md",
    includes: [
      "name: nexus-chatgpt-bridge",
      "## Unique Trigger",
      "## Owner",
      "docs/chatgpt-project-bridge",
      "NEXUS_HANDOFF_TEMPLATE.md",
      "Do not claim ChatGPT Project refresh",
    ],
  },
  {
    file: ".agents/skills/nexus-roadmap-maintenance/SKILL.md",
    includes: [
      "name: nexus-roadmap-maintenance",
      "## Unique Trigger",
      "## Owner",
      "docs/nexus-roadmap",
      "corepack pnpm run roadmap:index",
      "corepack pnpm run roadmap:index:check",
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

const repoSkillRoot = resolve(root, ".agents/skills");
const actualRepoSkills = readdirSync(repoSkillRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const expectedRepoSkills = [...retainedRepoSkills].sort();

if (JSON.stringify(actualRepoSkills) !== JSON.stringify(expectedRepoSkills)) {
  failures.push(
    `Repo-local skills must be exactly: ${expectedRepoSkills.join(", ")}; found: ${actualRepoSkills.join(", ") || "none"}`,
  );
}

const retainedSkillDescriptions = new Set();

for (const skill of retainedRepoSkills) {
  const skillPath = resolve(root, `.agents/skills/${skill}/SKILL.md`);
  const metadataPath = resolve(
    root,
    `.agents/skills/${skill}/agents/openai.yaml`,
  );
  if (!existsSync(skillPath) || !existsSync(metadataPath)) continue;

  const skillText = readFileSync(skillPath, "utf8");
  const metadataText = readFileSync(metadataPath, "utf8");
  const description = skillText.match(/^description:\s*(.+)$/m)?.[1]?.trim();

  if (!description || !description.includes("Use when")) {
    failures.push(
      `${skill} must have a trigger-rich description containing "Use when".`,
    );
  } else if (retainedSkillDescriptions.has(description)) {
    failures.push(`${skill} duplicates another retained skill description.`);
  } else {
    retainedSkillDescriptions.add(description);
  }

  if (skillText.includes("TODO")) {
    failures.push(`${skill} contains unresolved skill-template TODO text.`);
  }

  for (const expected of [
    "display_name:",
    "short_description:",
    `default_prompt: \"Use $${skill}`,
  ]) {
    if (!metadataText.includes(expected)) {
      failures.push(
        `${skill}/agents/openai.yaml is missing discoverability metadata: ${expected}`,
      );
    }
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

const retiredRepoPlanningOverlayFiles = [
  "planning/task_plan.md",
  "planning/findings.md",
  "planning/progress.md",
  "planning/planning-rules.md",
];

for (const file of retiredRepoPlanningOverlayFiles) {
  if (existsSync(resolve(root, file))) {
    failures.push(
      `Retired repo planning overlay file is active again: ${file}`,
    );
  }
}

const historicalPlanningFiles = [
  ".agents/plans/2026-06-08_repo-collaboration-workflow.md",
];

for (const file of historicalPlanningFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  if (
    !text.includes('doc_status: "superseded"') ||
    !text.includes("Planning Ownership #81") ||
    !text.includes("historical and non-controlling")
  ) {
    failures.push(
      `${file} must remain explicitly historical and non-controlling.`,
    );
  }
}

const bridgeRoot = resolve(root, "docs/chatgpt-project-bridge");
const activeBridgeBaselineMarker =
  "Status: active ChatGPT Project baseline file";
const expectedBridgeBaselineFiles = [
  "BRIDGE-INDEX.md",
  "PROJECT-INSTRUCTIONS.md",
];
const activeBridgeBaselineFiles = readdirSync(bridgeRoot)
  .filter((file) => file.endsWith(".md"))
  .filter((file) =>
    readFileSync(resolve(bridgeRoot, file), "utf8").includes(
      activeBridgeBaselineMarker,
    ),
  )
  .sort();

if (
  JSON.stringify(activeBridgeBaselineFiles) !==
  JSON.stringify(expectedBridgeBaselineFiles)
) {
  failures.push(
    `ChatGPT Project must have exactly two active baseline files: ${expectedBridgeBaselineFiles.join(", ")}; found: ${activeBridgeBaselineFiles.join(", ") || "none"}`,
  );
}

const authorityAndCurrentnessOwners = activeBridgeBaselineFiles.filter((file) =>
  readFileSync(resolve(bridgeRoot, file), "utf8").includes(
    "## Authority And Currentness",
  ),
);

if (
  authorityAndCurrentnessOwners.length !== 1 ||
  authorityAndCurrentnessOwners[0] !== "PROJECT-INSTRUCTIONS.md"
) {
  failures.push(
    "PROJECT-INSTRUCTIONS.md must be the single active baseline owner for authority and currentness language.",
  );
}

const supersededBridgeBaselineFiles = [
  "00-BOOTSTRAP.md",
  "01-SLOT-MAP.md",
  "02-GLOBAL-PROJECT-INSTRUCTIONS.md",
  "03-OPERATING-MODEL.md",
  "04-REFRESH-AND-READINESS-RULES.md",
  "20-SOURCE-AUTHORITY-SUMMARY.md",
  "90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md",
];

for (const file of supersededBridgeBaselineFiles) {
  const path = resolve(bridgeRoot, file);
  if (!existsSync(path)) {
    failures.push(
      `${file} must remain present until Archival #85 explicitly replaces this preservation invariant.`,
    );
    continue;
  }
  const text = readFileSync(path, "utf8");
  if (!text.includes("do not upload") || !text.includes("non-controlling")) {
    failures.push(
      `${file} must remain explicitly superseded and non-controlling until archival.`,
    );
  }
}

const uploadCurrentnessRule =
  "Do not claim that the ChatGPT Project was refreshed or verified unless an external upload or searchability check confirms the named scope.";
const uploadCurrentnessOwners = activeBridgeBaselineFiles.filter((file) =>
  readFileSync(resolve(bridgeRoot, file), "utf8").includes(
    uploadCurrentnessRule,
  ),
);

if (
  uploadCurrentnessOwners.length !== 1 ||
  uploadCurrentnessOwners[0] !== "PROJECT-INSTRUCTIONS.md"
) {
  failures.push(
    "PROJECT-INSTRUCTIONS.md must be the single active baseline owner for the upload-currentness rule.",
  );
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
  ".agents/skills/nexus-source-maintenance/SKILL.md",
  "docs/nexus-game-source/README.md",
  "docs/chatgpt-project-bridge/README.md",
  "docs/chatgpt-project-bridge/PROJECT-INSTRUCTIONS.md",
  "docs/chatgpt-project-bridge/BRIDGE-INDEX.md",
];

for (const file of activeSourceRoutingFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  for (const identifier of retiredSourcePromotionIdentifiers) {
    if (text.includes(identifier)) {
      failures.push(
        `${file} references retired source promotion: ${identifier}`,
      );
    }
  }
}

const activePathPolicyFiles = [
  "AGENTS.md",
  "README.md",
  "NEXUS_ISSUE_INDEX.md",
  "NEXUS_ISSUE_TRANSITION.md",
  "NEXUS_LOCAL_PLAYABLE_ALPHA.md",
  ".agents/skills/nexus-source-maintenance/SKILL.md",
  "docs/admin/nexus-distributed-surfaces.md",
  "docs/admin/task-planning/repo-first-task-planning-workflow.md",
  "docs/nexus-roadmap/README.md",
  "docs/nexus-game-source/README.md",
  "docs/contexts/nexus-project-operations/CONTEXT.md",
  "docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md",
  "docs/chatgpt-project-bridge/README.md",
  "docs/chatgpt-project-bridge/PROJECT-INSTRUCTIONS.md",
  "docs/chatgpt-project-bridge/BRIDGE-INDEX.md",
];

const retiredRepoSkillIdentifiers = [
  "codex-visual-output-starter",
  "nexus-handoff-bridge",
  "nexus-issue-closeout-scan",
  "nexus-reviewer",
  "nexus-roadmap-maintainer",
  "nexus-session-discipline",
  "nexus-source-index-maintainer",
  "nexus-source-router",
  "nexus-task-intake",
];

const activeSkillReferenceFiles = [
  "AGENTS.md",
  "NEXUS_TASK_PACKET_TEMPLATE.md",
  "docs/admin/task-planning/codex-session-discipline-workflow.md",
  "docs/admin/task-planning/nexus-review-rubric.md",
  "docs/nexus-game-source/README.md",
  "docs/visual-output-starter/README.md",
];

for (const file of activeSkillReferenceFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  for (const identifier of retiredRepoSkillIdentifiers) {
    if (text.includes(identifier)) {
      failures.push(
        `${file} references retired repo-local skill: ${identifier}`,
      );
    }
  }
}

// Dated handoffs and synced-chat packets preserve exact provenance, including
// paths retired later. They are historical evidence, not active skill routing.

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
    if (
      typeof sourceIndex.file_count !== "number" ||
      sourceIndex.file_count < 1
    ) {
      failures.push(
        `SOURCE-INDEX.json has invalid file_count: ${sourceIndex.file_count}`,
      );
    }

    if (sourceIndex.file_count !== (sourceIndex.files ?? []).length) {
      failures.push(
        `SOURCE-INDEX.json file_count ${sourceIndex.file_count} does not match files length ${(sourceIndex.files ?? []).length}`,
      );
    }

    const approvedAuthorityValues = new Set([
      "game_current",
      "game_provisional",
      "runtime_ai_behavior",
      "project_operations",
      "historical_reference",
      "non_authoritative",
    ]);
    const approvedApplicabilityValues = new Set([
      "player_game_rules",
      "campaign_director_runtime",
      "content_authoring_workflow",
      "project_operations",
      "historical_provenance",
    ]);

    for (const item of sourceIndex.files ?? []) {
      if (!item.exact_repo_path) {
        failures.push(
          "SOURCE-INDEX.json contains an item without exact_repo_path",
        );
        continue;
      }

      if (!existsSync(resolve(root, item.exact_repo_path))) {
        failures.push(
          `SOURCE-INDEX.json points to a missing file: ${item.exact_repo_path}`,
        );
      }

      if (item.authority && !approvedAuthorityValues.has(item.authority)) {
        failures.push(
          `SOURCE-INDEX.json has invalid authority for ${item.exact_repo_path}: ${item.authority}`,
        );
      }
      for (const applicability of item.applicability ?? []) {
        if (!approvedApplicabilityValues.has(applicability)) {
          failures.push(
            `SOURCE-INDEX.json has invalid applicability for ${item.exact_repo_path}: ${applicability}`,
          );
        }
      }
      if (item.domain === "Admin" || item.domain === "Modes") {
        if (
          !item.authority ||
          !Array.isArray(item.applicability) ||
          item.applicability.length === 0
        ) {
          failures.push(
            `SOURCE-INDEX.json lacks explicit retrieval classification for ${item.exact_repo_path}`,
          );
        }
        if (item.default_game_retrieval !== false) {
          failures.push(
            `SOURCE-INDEX.json includes operational or historical material in default game retrieval: ${item.exact_repo_path}`,
          );
        }
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
