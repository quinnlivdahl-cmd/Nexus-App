import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  exportTreeMarkdown,
  upgradeCandidateEffects,
} from "../src/features/skill-tree-lab/lab-state.ts";
import { ABILITY_RULE_OVERRIDE_NAMES } from "../src/features/skill-tree-lab/rules-impact.ts";
import { seedLabData } from "../src/features/skill-tree-lab/seed-data.ts";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(packageRoot, "../..");
const outputPath = resolve(
  repoRoot,
  "docs/nexus-game-source/source/Skills/Current State/SKILL-TREE-001 - Provisional_Skill_Tree_Playtest_Model.md",
);

const attributeAbilities = seedLabData.attributes.flatMap((attribute) =>
  attribute.skills.flatMap((skill) =>
    skill.focuses.flatMap((focus) => focus.abilities),
  ),
);
const sharedAbilities = seedLabData.sharedBranches.flatMap(
  (branch) => branch.abilities,
);
const allAbilities = [...attributeAbilities, ...sharedAbilities];
const skillCount = seedLabData.attributes.reduce(
  (total, attribute) => total + attribute.skills.length,
  0,
);
const focusCount = seedLabData.attributes.reduce(
  (total, attribute) =>
    total +
    attribute.skills.reduce(
      (skillTotal, skill) => skillTotal + skill.focuses.length,
      0,
    ),
  0,
);

if (allAbilities.length !== 142) {
  throw new Error(`Expected 142 playtest Abilities, found ${allAbilities.length}.`);
}
if (ABILITY_RULE_OVERRIDE_NAMES.size !== 90) {
  throw new Error(
    `Expected 90 audited Ability rule overrides, found ${ABILITY_RULE_OVERRIDE_NAMES.size}.`,
  );
}
const abilityNames = new Set(allAbilities.map((ability) => ability.name));
for (const overrideName of ABILITY_RULE_OVERRIDE_NAMES) {
  if (!abilityNames.has(overrideName)) {
    throw new Error(`Audited rule override has no matching Ability: ${overrideName}`);
  }
}

const ambiguousResultFragments = [
  "normally a bounded +2 TS, band shaping, or a stated permission",
  "whichever the Ability names",
  "choose the one named by the Ability",
  "reduces one qualifying route by 1 MP, reveals one safer route",
  "shifts Disposition or Exposure by one step",
];
for (const ability of allAbilities) {
  if (!ability.candidateEffect.includes("Proposed rules effect:")) {
    throw new Error(`${ability.name} has no proposed rules effect.`);
  }
  if (ability.rulesImpact.stateSurfaces.length === 0) {
    throw new Error(`${ability.name} has no declared rules state surface.`);
  }
  const ambiguous = ambiguousResultFragments.find((fragment) =>
    ability.candidateEffect.includes(fragment),
  );
  if (ambiguous) {
    throw new Error(`${ability.name} still uses ambiguous result text: ${ambiguous}`);
  }
}

const criticalEffects = new Map(
  allAbilities.map((ability) => [ability.name, ability.candidateEffect]),
);
const expectedCriticalTerms: Record<string, string[]> = {
  "Sightline Discipline": ["+2 TS", "next activation"],
  "Take the Hit": ["replace the nearby ally", "Shield and Mitigation"],
  "Command Line": ["+2 TS", "Team lane"],
  "Tether Logic": ["forced-movement result", "recoverable route"],
  "Steady Voice": ["Standard Status", "next recovery check"],
  "Fair Value": ["Op Knowledge", "value or exchange path"],
  "Salvage Broker": ["trade, credit, or requisition permission"],
  "Call in Context": ["scene-access permission", "1 Exposure"],
};
for (const [abilityName, terms] of Object.entries(expectedCriticalTerms)) {
  const effect = criticalEffects.get(abilityName);
  if (!effect || terms.some((term) => !effect.includes(term))) {
    throw new Error(`${abilityName} failed its rules-surface regression check.`);
  }
}

const migrationFixture = structuredClone(seedLabData);
const migrationAbilities = [
  ...migrationFixture.attributes.flatMap((attribute) =>
    attribute.skills.flatMap((skill) =>
      skill.focuses.flatMap((focus) => focus.abilities),
    ),
  ),
  ...migrationFixture.sharedBranches.flatMap((branch) => branch.abilities),
];
const legacyTakeTheHit = migrationAbilities.find(
  (ability) => ability.name === "Take the Hit",
);
const editedSteadyRifle = migrationAbilities.find(
  (ability) => ability.name === "Steady Rifle",
);
if (!legacyTakeTheHit || !editedSteadyRifle) {
  throw new Error("Missing migration regression Ability.");
}
legacyTakeTheHit.candidateEffect = `${legacyTakeTheHit.candidateEffect.split(" Proposed rules effect:")[0]} Proposed rules effect: Success clears or suppresses one stated Standard Status, pauses a Downed/Disabled countdown, or restores one declared limited function—whichever the Ability names.`;
legacyTakeTheHit.rulesImpact.stateSurfaces = ["Health", "Standard Status"];
const userEditedEffect =
  "User-authored aimed-fire variant. Proposed rules effect: Add +3 TS to one rifle attack and gain 1 Exposure.";
editedSteadyRifle.candidateEffect = userEditedEffect;
editedSteadyRifle.rulesImpact.stateSurfaces = ["User-authored test surface"];
const upgradedFixture = upgradeCandidateEffects(migrationFixture, seedLabData);
const upgradedAbilities = [
  ...upgradedFixture.attributes.flatMap((attribute) =>
    attribute.skills.flatMap((skill) =>
      skill.focuses.flatMap((focus) => focus.abilities),
    ),
  ),
  ...upgradedFixture.sharedBranches.flatMap((branch) => branch.abilities),
];
const upgradedTakeTheHit = upgradedAbilities.find(
  (ability) => ability.name === "Take the Hit",
);
const upgradedSteadyRifle = upgradedAbilities.find(
  (ability) => ability.name === "Steady Rifle",
);
if (
  upgradedTakeTheHit?.candidateEffect !== criticalEffects.get("Take the Hit") ||
  upgradedTakeTheHit.rulesImpact.stateSurfaces.includes("Health")
) {
  throw new Error("Legacy generated effects did not migrate to seed mechanics.");
}
if (
  upgradedSteadyRifle?.candidateEffect !== userEditedEffect ||
  !upgradedSteadyRifle.rulesImpact.stateSurfaces.includes(
    "User-authored test surface",
  )
) {
  throw new Error("A user-edited candidate effect was overwritten by migration.");
}

const exportedTree = exportTreeMarkdown(seedLabData);
const catalogStart = exportedTree.indexOf("## Combat");
if (catalogStart < 0) {
  throw new Error("The Skill Tree Lab export did not contain the Combat catalog.");
}

const catalog = exportedTree.slice(catalogStart).trimEnd();
const sourceDocument = `---
project: "Nexus"
doc_id: "SKILL-TREE-001"
title: "Provisional Skill Tree Playtest Model"
doc_status: "working_draft"
working_state: "playtest_ready_provisional"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "current_state"
topic_family: "skill_tree_playtest_model"
owns_topics:
  - 'provisional_skill_tree_playtest_model'
  - 'skill_tree_candidate_ability_catalog'
borrows_topics:
  - 'ability_taxonomy'
  - 'lattice_resolution'
  - 'action_economy'
  - 'durability'
  - 'hacking'
  - 'social_state'
created: "2026-07-16"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Promoted by direct user instruction as the playtest-ready provisional Skill Tree. This document is usable source for playtesting and idea generation, but it does not finalize names, balance, advancement costs, thresholds, or cross-domain rules. The detailed catalog is generated from the bundled Skill Tree Lab seed so the human-readable source snapshot and app seed can be reviewed together."
---

# Provisional Skill Tree Playtest Model

> [!important] Playtest-ready, not final
> This tree is ready for character-build experiments, table playtests, and design iteration. It is provisional Nexus source, not final canon or final balance.

## 1. Authority and intended use

Use this tree now for:

- building provisional characters and campaign builds;
- choosing and ranking abilities during playtests;
- testing whether each ability produces a meaningful decision;
- generating better follow-up ideas from actual play;
- recording concrete balance, clarity, prerequisite, and coverage findings.

This status does not finalize:

- attribute, skill, focus, or ability names;
- tier thresholds, rank costs, level-up budgets, or exact progression cadence;
- numerical balance beyond the stated candidate effect;
- unresolved rules owned by Combat, Equipment, Characters, Core, or other domains;
- a local Skill Tree Lab edit that has not been synchronized back into source.

When this document conflicts with an accepted cross-domain rule, the owning rule remains controlling. Treat the mismatch as a playtest finding to reconcile, not permission to silently override the other rule.

## 2. Adopted playtest structure

The current playtest hierarchy is:

\`\`\`text
Attribute -> Skill -> Skill Focus -> Ability
\`\`\`

The snapshot contains:

- **${seedLabData.attributes.length} Attributes**: Combat, Dexterity, Intelligence, Constitution, Wisdom, and Charisma;
- **${skillCount} Skills**;
- **${focusCount} Skill Focuses**;
- **${attributeAbilities.length + sharedAbilities.length} Abilities**, including ${sharedAbilities.length} shared-branch Abilities;
- **${seedLabData.sharedBranches.length} Shared Branches**.

The six familiar attribute names are the current playtest labels. They are usable and intentional, while still open to evidence-based revision.

## 3. Ability rules contract

An Ability is not just a name or a narrative prompt. Every playtest Ability below declares:

- its action-cost posture;
- the Lattice check or validation surface it acts on;
- the game-state surfaces it may change;
- the result-band interpretation;
- a guardrail that limits the effect;
- prerequisites and validation dependencies;
- a candidate effect that states the proposed mechanical result.

The main established surfaces include:

- Lattice Target Score, margin, and combat or noncombat result bands;
- AP, MP, reactions, preparation, and other action-economy costs;
- Health, System Integrity, Standard Status, Downed/Disabled countdowns, and recovery limits;
- Defense, Effective Defense, cover, Shield, Mitigation, and forced movement;
- Firewall, System Status, Trace, access, link, and hostile-system validation;
- exposure, disposition, leverage, operational knowledge, credentials, routes, materials, and objective state where an owning rule defines them.

Abilities pass through the normal action transaction. They do not directly mutate state or bypass target, range, equipment, timing, resource, visibility, consent, or scene validation.

## 4. Synchronization boundary

This Markdown document is the human-readable provisional source snapshot. Its detailed catalog is generated from:

\`artifacts/nexus-companion/src/features/skill-tree-lab/seed-data.ts\`

The rules-surface derivation used by that seed lives at:

\`artifacts/nexus-companion/src/features/skill-tree-lab/rules-impact.ts\`

Regenerate this source snapshot after an accepted seed change with:

\`corepack pnpm run source:skill-tree\`

The Skill Tree Lab may hold newer local browser edits for review. Those edits remain proposals until they are deliberately synchronized into the app seed and this source snapshot. The Obsidian mobile-review note is a review surface, not source authority.

## 5. Detailed playtest catalog

All entries remain provisional even when their status field says \`proposed\`. “Proposed” means the item is open to revision; the catalog as a whole is still authorized for present playtest use.

${catalog}
`.replaceAll("\r\n", "\n");

if (process.argv.includes("--check")) {
  if (!existsSync(outputPath) || readFileSync(outputPath, "utf8") !== sourceDocument) {
    throw new Error(`Generated source is stale: ${outputPath}`);
  }
  console.log(`OK ${outputPath}`);
} else {
  writeFileSync(outputPath, sourceDocument, "utf8");
  console.log(`Updated ${outputPath}`);
}
console.log(
  `${seedLabData.attributes.length} attributes, ${skillCount} skills, ${focusCount} focuses, ${attributeAbilities.length + sharedAbilities.length} abilities`,
);
