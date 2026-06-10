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
];

const sectionChecks = [
  {
    file: "NEXUS_TASK_PACKET_TEMPLATE.md",
    includes: [
      "Task name:",
      "Prerequisites / readiness:",
      "Do Not Do:",
      "Validation / review method:",
      "Next action:",
    ],
  },
  {
    file: "NEXUS_HANDOFF_TEMPLATE.md",
    includes: [
      "Controlling issue:",
      "Planning anchor:",
      "## Files / Sources Inspected",
      "## Files Changed",
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
