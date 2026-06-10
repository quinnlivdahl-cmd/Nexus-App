import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

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
  "artifacts/nexus-companion/AGENTS.md",
  "artifacts/api-server/AGENTS.md",
  "lib/AGENTS.md",
  "scripts/AGENTS.md",
  "docs/chatgpt-project-bridge/README.md",
  "docs/chatgpt-project-bridge/00-BOOTSTRAP.md",
  "docs/chatgpt-project-bridge/01-SLOT-MAP.md",
  "docs/chatgpt-project-bridge/02-GLOBAL-PROJECT-INSTRUCTIONS.md",
  "docs/chatgpt-project-bridge/03-OPERATING-MODEL.md",
  "docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md",
  "docs/chatgpt-project-bridge/90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md",
];

const sectionChecks = [
  {
    file: "NEXUS_TASK_PACKET_TEMPLATE.md",
    includes: [
      "Task name:",
      "Progress notes:",
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
      "## Files / Sources Inspected",
      "## Files Changed",
      "## Progress State",
      "## Closeout Evidence",
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
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/README.md",
    includes: [
      "repo-trackable bridge layer",
      "Upload Set",
      "ChatGPT Project consumes them as external context",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/01-SLOT-MAP.md",
    includes: [
      "Slots are upload/context roles",
      "Future Packet Families",
      "Do not bulk-copy live `00 Source`",
    ],
  },
  {
    file: "docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md",
    includes: [
      "verified-current-for-scope",
      "Upload Confirmation Rule",
      "Never use these states as proof of live source currentness.",
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

if (failures.length > 0) {
  console.error("[validate-nexus-workflow] Failed");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("[validate-nexus-workflow] OK");
