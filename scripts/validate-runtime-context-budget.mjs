import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const contextPackPath = "artifacts/nexus-companion/src/data/sourceContextPack.json";
const contextSelectorPath = "artifacts/nexus-companion/src/lib/contextSelector.ts";
const dmSystemPromptPath = "artifacts/nexus-companion/src/lib/dmSystemPrompt.ts";
const defaultPrimerContextBudgetTokens = 2400;
const minimumTotalPromptBudgetTokens = 4000;
const requiredCategories = new Set([
  "dm_contract",
  "rules",
  "lore",
  "campaign_state",
  "encounter",
  "play_aid",
  "image_guidance",
]);
const requiredEntryIds = new Set([
  "dm-contract-context-broker-boundary",
  "nexus-core-primer",
  "nexus-theme-human-boundary",
  "campaign-specific-material-quarantine",
  "campaign-loop-route-node-flow",
  "route-node-content-frame",
  "lattice-100-core-resolution",
  "lattice-100-bands-and-check-families",
  "planning-and-threshold-principle",
  "combat-start-and-state",
  "combat-durability-and-turn-baseline",
  "tacmap-node-path-grammar",
  "play-aid-authority-and-triggers",
  "image-guidance-nexus-visual-style",
]);

function readJson(path) {
  const absolutePath = resolve(root, path);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${path}`);
  }

  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function renderContext(entries, pack) {
  const order = [
    "dm_contract",
    "rules",
    "lore",
    "campaign_state",
    "encounter",
    "play_aid",
    "image_guidance",
  ];
  const headings = {
    dm_contract: "DM CONTRACT",
    rules: "SOURCE-BACKED RULES",
    lore: "SOURCE-BACKED LORE",
    campaign_state: "CAMPAIGN STATE BOUNDARIES",
    encounter: "ENCOUNTER AND CONTENT GUIDANCE",
    play_aid: "PLAY AID GUIDANCE",
    image_guidance: "IMAGE GUIDANCE",
  };
  const grouped = new Map();

  for (const entry of entries) {
    if (!grouped.has(entry.category)) grouped.set(entry.category, []);
    grouped.get(entry.category).push(entry);
  }

  const lines = ["## SOURCE-BACKED CONTEXT PACK", `Pack: ${pack.packId}@${pack.version}`];
  for (const category of order) {
    const items = grouped.get(category);
    if (!items?.length) continue;

    lines.push("", `### ${headings[category]}`);
    for (const item of items) {
      lines.push("");
      lines.push(`#### ${item.title}`);
      lines.push(`Source docs: ${item.sourceDocIds.map((id) => `\`${id}\``).join(", ")}`);
      lines.push(`Source slices: ${item.sourceSliceIds.map((id) => `\`${id}\``).join(", ")}`);
      lines.push(item.content);
    }
  }

  return lines.join("\n");
}

function validate() {
  const failures = [];
  const pack = readJson(contextPackPath);
  const selectorText = readFileSync(resolve(root, contextSelectorPath), "utf8");
  const promptText = readFileSync(resolve(root, dmSystemPromptPath), "utf8");
  const selectorBudget = Number(selectorText.match(/CONTEXT_TOKEN_BUDGET\s*=\s*(\d+)/)?.[1]);
  const totalPromptBudget = Number(promptText.match(/TOTAL_PROMPT_BUDGET_TOKENS\s*=\s*(\d+)/)?.[1]);
  const entries = Array.isArray(pack.entries) ? pack.entries : [];
  const requiredEntries = entries
    .filter((entry) => entry.tags?.includes("always"))
    .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
  const requiredIds = new Set(requiredEntries.map((entry) => entry.id));
  const requiredCategorySet = new Set(requiredEntries.map((entry) => entry.category));

  for (const id of requiredEntryIds) {
    if (!requiredIds.has(id)) {
      failures.push(`Default primer required context is missing always-tagged entry: ${id}`);
    }
  }

  for (const category of requiredCategories) {
    if (!requiredCategorySet.has(category)) {
      failures.push(`Default primer required context is missing category: ${category}`);
    }
  }

  const renderedRequiredContext = renderContext(requiredEntries, pack);
  const requiredTokenEstimate = estimateTokens(renderedRequiredContext);
  if (requiredTokenEstimate > defaultPrimerContextBudgetTokens) {
    failures.push(
      `Default primer required context costs about ${requiredTokenEstimate} tokens, above budget ${defaultPrimerContextBudgetTokens}`,
    );
  }

  if (!Number.isFinite(selectorBudget) || selectorBudget < defaultPrimerContextBudgetTokens) {
    failures.push(
      `CONTEXT_TOKEN_BUDGET must be at least ${defaultPrimerContextBudgetTokens}; found ${selectorBudget || "missing"}`,
    );
  }

  if (!Number.isFinite(totalPromptBudget) || totalPromptBudget < minimumTotalPromptBudgetTokens) {
    failures.push(
      `TOTAL_PROMPT_BUDGET_TOKENS must be at least ${minimumTotalPromptBudgetTokens}; found ${totalPromptBudget || "missing"}`,
    );
  }

  return failures;
}

try {
  const failures = validate();
  if (failures.length > 0) {
    console.error("[validate-runtime-context-budget] Failed");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("[validate-runtime-context-budget] OK");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
