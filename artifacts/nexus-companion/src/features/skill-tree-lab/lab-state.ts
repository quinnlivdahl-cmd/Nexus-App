import type {
  Ability,
  Attribute,
  LabData,
  NodeKind,
  ProposalStatus,
  SharedBranch,
  Skill,
  SkillFocus,
} from "./types";
import {
  concretizeCandidateEffect,
  deriveRulesImpact,
  sourceActionCost,
} from "./rules-impact";

export const LAB_STORAGE_KEY = "nexus-skill-tree-lab-v1";
export const NONCANONICAL_NOTICE =
  "The bundled tree is playtest-ready provisional Nexus source, not final. Local edits remain proposals and do not change source, character data, or GitHub state until synchronized.";
export const PLAYTEST_MODEL_DECISION =
  "This concrete roll-facing tree is ready for provisional playtest use. Its names, effects, balance, prerequisites, and progression remain open to evidence-based revision.";

export type EditableNode =
  | Attribute
  | Skill
  | SkillFocus
  | Ability
  | SharedBranch;

export interface NodeLocation {
  node: EditableNode;
  kind: NodeKind;
  parentId?: string;
  array: EditableNode[];
  index: number;
}

const uniqueSuffix = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function cloneData(data: LabData): LabData {
  return structuredClone(data);
}

function abilitiesIn(data: LabData): Ability[] {
  return [
    ...data.attributes.flatMap((attribute) =>
      attribute.skills.flatMap((skill) =>
        skill.focuses.flatMap((focus) => focus.abilities),
      ),
    ),
    ...data.sharedBranches.flatMap((branch) => branch.abilities),
  ];
}

const LEGACY_GENERATED_EFFECT_FRAGMENTS = [
  "On a successful system action, apply only the permitted access, interference, or status result",
  "Miss, Graze, Hit, and Direct use the weapon or declared action profile",
  "Success clears or suppresses one stated Standard Status",
  "On the stated trigger, spend the reaction",
  "While the stated posture or condition is valid",
  "Success reduces one qualifying route by 1 MP",
  "Success creates one actionable Op Knowledge fact or adds +2 TS",
  "Success restores one declared limited function, clears one qualifying System Status",
  "Success grants one ally +2 TS from the Team lane",
  "Success prevents or suppresses one named Standard Status",
  "Success shifts Disposition or Exposure by one step",
  "Success creates one bounded access or process change",
  "Success applies a temporary Jammed or Degraded Link status",
  "Success controls one stated Standard Status or restores the declared limited function",
  "A successful quality check improves the recovery window or transport safety",
  "Success restores the declared body-machine function or clears one stated cybernetic Standard Status",
  "prevent one propagating cybernetic Standard Status or contain it to the current implant",
  "commit that cost as a stated status, recovery need, or resource consequence",
];

const candidateConcept = (effect: string) =>
  effect.replace(/\s*Proposed rules effect:.*$/s, "").trim();

const hasLegacyGeneratedEffect = (effect: string) =>
  LEGACY_GENERATED_EFFECT_FRAGMENTS.some((fragment) => effect.includes(fragment));

export function upgradeCandidateEffects(
  data: LabData,
  reference: LabData,
): LabData {
  const next = cloneData(data);
  const referenceById = new Map(
    abilitiesIn(reference).map((ability) => [ability.id, ability]),
  );
  for (const ability of abilitiesIn(next)) {
    const referenceAbility = referenceById.get(ability.id);
    if (
      referenceAbility &&
      hasLegacyGeneratedEffect(ability.candidateEffect) &&
      candidateConcept(ability.candidateEffect) ===
        candidateConcept(referenceAbility.candidateEffect)
    ) {
      ability.candidateEffect = referenceAbility.candidateEffect;
      ability.rulesImpact = structuredClone(referenceAbility.rulesImpact);
      ability.actionCost = referenceAbility.actionCost;
      continue;
    }
    ability.candidateEffect = concretizeCandidateEffect(
      ability.candidateEffect,
      referenceAbility?.rulesImpact ?? ability.rulesImpact,
    );
  }
  return next;
}

export function locateNode(data: LabData, id: string): NodeLocation | null {
  const attributeArray = data.attributes as EditableNode[];
  for (
    let attributeIndex = 0;
    attributeIndex < data.attributes.length;
    attributeIndex += 1
  ) {
    const attribute = data.attributes[attributeIndex];
    if (attribute.id === id) {
      return {
        node: attribute,
        kind: "attribute",
        array: attributeArray,
        index: attributeIndex,
      };
    }
    const skillArray = attribute.skills as EditableNode[];
    for (
      let skillIndex = 0;
      skillIndex < attribute.skills.length;
      skillIndex += 1
    ) {
      const skill = attribute.skills[skillIndex];
      if (skill.id === id) {
        return {
          node: skill,
          kind: "skill",
          parentId: attribute.id,
          array: skillArray,
          index: skillIndex,
        };
      }
      const focusArray = skill.focuses as EditableNode[];
      for (
        let focusIndex = 0;
        focusIndex < skill.focuses.length;
        focusIndex += 1
      ) {
        const focus = skill.focuses[focusIndex];
        if (focus.id === id) {
          return {
            node: focus,
            kind: "focus",
            parentId: skill.id,
            array: focusArray,
            index: focusIndex,
          };
        }
        const abilityArray = focus.abilities as EditableNode[];
        for (
          let abilityIndex = 0;
          abilityIndex < focus.abilities.length;
          abilityIndex += 1
        ) {
          const ability = focus.abilities[abilityIndex];
          if (ability.id === id) {
            return {
              node: ability,
              kind: "ability",
              parentId: focus.id,
              array: abilityArray,
              index: abilityIndex,
            };
          }
        }
      }
    }
  }

  const branchArray = data.sharedBranches as EditableNode[];
  for (
    let branchIndex = 0;
    branchIndex < data.sharedBranches.length;
    branchIndex += 1
  ) {
    const branch = data.sharedBranches[branchIndex];
    if (branch.id === id) {
      return {
        node: branch,
        kind: "shared-branch",
        array: branchArray,
        index: branchIndex,
      };
    }
    const abilityArray = branch.abilities as EditableNode[];
    for (
      let abilityIndex = 0;
      abilityIndex < branch.abilities.length;
      abilityIndex += 1
    ) {
      const ability = branch.abilities[abilityIndex];
      if (ability.id === id) {
        return {
          node: ability,
          kind: "ability",
          parentId: branch.id,
          array: abilityArray,
          index: abilityIndex,
        };
      }
    }
  }
  return null;
}

export function getNode(data: LabData, id: string): EditableNode | null {
  return locateNode(data, id)?.node ?? null;
}

export function patchNode(
  data: LabData,
  id: string,
  patch: Partial<EditableNode>,
): LabData {
  const next = cloneData(data);
  const location = locateNode(next, id);
  if (!location) return data;
  Object.assign(location.node, patch);
  return next;
}

export function deleteNode(data: LabData, id: string): LabData {
  const next = cloneData(data);
  const location = locateNode(next, id);
  if (!location) return data;
  const removedIds = new Set<string>();
  const removedSkillIds = new Set<string>();

  const collectRemovedIds = (node: EditableNode) => {
    removedIds.add(node.id);
    if (node.kind === "attribute") {
      node.skills.forEach(collectRemovedIds);
    } else if (node.kind === "skill") {
      removedSkillIds.add(node.id);
      node.focuses.forEach(collectRemovedIds);
    } else if (node.kind === "focus" || node.kind === "shared-branch") {
      node.abilities.forEach(collectRemovedIds);
    }
  };

  collectRemovedIds(location.node);
  location.array.splice(location.index, 1);

  for (const attribute of next.attributes) {
    for (const skill of attribute.skills) {
      for (const focus of skill.focuses) {
        for (const ability of focus.abilities) {
          ability.prerequisiteIds = ability.prerequisiteIds.filter(
            (prerequisiteId) => !removedIds.has(prerequisiteId),
          );
        }
      }
    }
  }
  for (const branch of next.sharedBranches) {
    branch.skillIds = branch.skillIds.filter(
      (skillId) => !removedSkillIds.has(skillId),
    );
    for (const ability of branch.abilities) {
      ability.prerequisiteIds = ability.prerequisiteIds.filter(
        (prerequisiteId) => !removedIds.has(prerequisiteId),
      );
    }
  }
  return next;
}

function refreshAbility(
  ability: Ability,
  parentId: string,
  shared: boolean,
  suffix: string,
): Ability {
  return {
    ...ability,
    id: `${ability.id}-copy-${suffix}`,
    name: `${ability.name} Copy`,
    parentFocusId: shared ? undefined : parentId,
    sharedBranchId: shared ? parentId : undefined,
    status: "proposed",
    prerequisiteIds: [...ability.prerequisiteIds],
  };
}

function duplicateEditable(
  node: EditableNode,
  parentId: string | undefined,
): EditableNode {
  const suffix = uniqueSuffix();
  if (node.kind === "ability") {
    return refreshAbility(
      node,
      parentId ?? "unassigned",
      parentId?.startsWith("shared-") ?? false,
      suffix,
    );
  }
  if (node.kind === "focus") {
    const id = `${node.id}-copy-${suffix}`;
    return {
      ...node,
      id,
      name: `${node.name} Copy`,
      parentSkillId: parentId ?? node.parentSkillId,
      status: "proposed",
      abilities: node.abilities.map((ability) =>
        refreshAbility(ability, id, false, suffix),
      ),
    };
  }
  if (node.kind === "skill") {
    const id = `${node.id}-copy-${suffix}`;
    return {
      ...node,
      id,
      name: `${node.name} Copy`,
      parentAttributeId: parentId ?? node.parentAttributeId,
      status: "proposed",
      focuses: node.focuses.map((focus) => {
        const focusId = `${focus.id}-copy-${suffix}`;
        return {
          ...focus,
          id: focusId,
          parentSkillId: id,
          status: "proposed" as ProposalStatus,
          abilities: focus.abilities.map((ability) =>
            refreshAbility(ability, focusId, false, suffix),
          ),
        };
      }),
    };
  }
  if (node.kind === "attribute") {
    const id = `${node.id}-copy-${suffix}`;
    return {
      ...node,
      id,
      name: `${node.name} Copy`,
      status: "proposed",
      skills: node.skills.map((skill) => duplicateEditable(skill, id) as Skill),
    };
  }
  const id = `${node.id}-copy-${suffix}`;
  return {
    ...node,
    id,
    name: `${node.name} Copy`,
    status: "proposed",
    abilities: node.abilities.map((ability) =>
      refreshAbility(ability, id, true, suffix),
    ),
  };
}

function remapDuplicatePrerequisites(
  source: EditableNode,
  duplicate: EditableNode,
): void {
  const idMap = new Map<string, string>();
  const abilityPairs: Array<[Ability, Ability]> = [];

  const visit = (sourceNode: EditableNode, duplicateNode: EditableNode) => {
    idMap.set(sourceNode.id, duplicateNode.id);
    if (sourceNode.kind !== duplicateNode.kind) return;
    if (sourceNode.kind === "ability" && duplicateNode.kind === "ability") {
      abilityPairs.push([sourceNode, duplicateNode]);
      return;
    }
    if (sourceNode.kind === "attribute" && duplicateNode.kind === "attribute") {
      sourceNode.skills.forEach((skill, index) => {
        const copiedSkill = duplicateNode.skills[index];
        if (copiedSkill) visit(skill, copiedSkill);
      });
      return;
    }
    if (sourceNode.kind === "skill" && duplicateNode.kind === "skill") {
      sourceNode.focuses.forEach((focus, index) => {
        const copiedFocus = duplicateNode.focuses[index];
        if (copiedFocus) visit(focus, copiedFocus);
      });
      return;
    }
    if (sourceNode.kind === "focus" && duplicateNode.kind === "focus") {
      sourceNode.abilities.forEach((ability, index) => {
        const copiedAbility = duplicateNode.abilities[index];
        if (copiedAbility) visit(ability, copiedAbility);
      });
      return;
    }
    if (
      sourceNode.kind === "shared-branch" &&
      duplicateNode.kind === "shared-branch"
    ) {
      sourceNode.abilities.forEach((ability, index) => {
        const copiedAbility = duplicateNode.abilities[index];
        if (copiedAbility) visit(ability, copiedAbility);
      });
    }
  };

  visit(source, duplicate);
  for (const [sourceAbility, duplicateAbility] of abilityPairs) {
    duplicateAbility.prerequisiteIds = sourceAbility.prerequisiteIds.map(
      (prerequisiteId) => idMap.get(prerequisiteId) ?? prerequisiteId,
    );
  }
}

export function duplicateNode(
  data: LabData,
  id: string,
): { data: LabData; newId?: string } {
  const next = cloneData(data);
  const location = locateNode(next, id);
  if (!location) return { data };
  const duplicate = duplicateEditable(location.node, location.parentId);
  remapDuplicatePrerequisites(location.node, duplicate);
  location.array.splice(location.index + 1, 0, duplicate);
  return { data: next, newId: duplicate.id };
}

export function reorderNode(
  data: LabData,
  id: string,
  direction: -1 | 1,
): LabData {
  const next = cloneData(data);
  const location = locateNode(next, id);
  if (!location) return data;
  const destination = location.index + direction;
  if (destination < 0 || destination >= location.array.length) return data;
  const [node] = location.array.splice(location.index, 1);
  location.array.splice(destination, 0, node);
  return next;
}

export function validParentOptions(
  data: LabData,
  kind: NodeKind,
): Array<{ id: string; label: string }> {
  if (kind === "skill") {
    return data.attributes.map((attribute) => ({
      id: attribute.id,
      label: attribute.name,
    }));
  }
  if (kind === "focus") {
    return data.attributes.flatMap((attribute) =>
      attribute.skills.map((skill) => ({
        id: skill.id,
        label: `${attribute.name} / ${skill.name}`,
      })),
    );
  }
  if (kind === "ability") {
    return [
      ...data.attributes.flatMap((attribute) =>
        attribute.skills.flatMap((skill) =>
          skill.focuses.map((focus) => ({
            id: focus.id,
            label: `${attribute.name} / ${skill.name} / ${focus.name}`,
          })),
        ),
      ),
      ...data.sharedBranches.map((branch) => ({
        id: branch.id,
        label: `Shared / ${branch.name}`,
      })),
    ];
  }
  return [];
}

export function moveNode(
  data: LabData,
  id: string,
  targetParentId: string,
): LabData {
  const next = cloneData(data);
  const source = locateNode(next, id);
  if (!source || source.parentId === targetParentId) return data;
  const [node] = source.array.splice(source.index, 1);

  if (source.kind === "skill") {
    const attribute = next.attributes.find(
      (item) => item.id === targetParentId,
    );
    if (!attribute) return data;
    const skill = node as Skill;
    skill.parentAttributeId = targetParentId;
    attribute.skills.push(skill);
    return next;
  }
  if (source.kind === "focus") {
    const skill = next.attributes
      .flatMap((attribute) => attribute.skills)
      .find((item) => item.id === targetParentId);
    if (!skill) return data;
    const focus = node as SkillFocus;
    focus.parentSkillId = targetParentId;
    skill.focuses.push(focus);
    return next;
  }
  if (source.kind === "ability") {
    const focus = next.attributes
      .flatMap((attribute) => attribute.skills)
      .flatMap((skill) => skill.focuses)
      .find((item) => item.id === targetParentId);
    const branch = next.sharedBranches.find(
      (item) => item.id === targetParentId,
    );
    const ability = node as Ability;
    if (focus) {
      ability.parentFocusId = focus.id;
      ability.sharedBranchId = undefined;
      focus.abilities.push(ability);
      return next;
    }
    if (branch) {
      ability.parentFocusId = undefined;
      ability.sharedBranchId = branch.id;
      branch.abilities.push(ability);
      return next;
    }
  }
  return data;
}

export function createNode(
  data: LabData,
  kind: NodeKind,
  parentId?: string,
): { data: LabData; newId?: string } {
  const next = cloneData(data);
  const suffix = uniqueSuffix();
  if (kind === "attribute") {
    const attribute: Attribute = {
      id: `attribute-proposal-${suffix}`,
      kind: "attribute",
      name: "New Attribute Proposal",
      proposal: true,
      status: "proposed",
      provenance: "new-original",
      identity: "Describe what this Attribute means.",
      gameplayPromise: "Describe the decisions this Attribute should create.",
      historicalLineage: [],
      coverageNotes: "Add coverage notes and neighboring boundaries.",
      skills: [],
    };
    next.attributes.push(attribute);
    return { data: next, newId: attribute.id };
  }
  if (kind === "skill" && parentId) {
    const attribute = next.attributes.find((item) => item.id === parentId);
    if (!attribute) return { data };
    const skill: Skill = {
      id: `skill-proposal-${suffix}`,
      kind: "skill",
      name: "New Skill Proposal",
      proposal: true,
      status: "proposed",
      provenance: "new-original",
      parentAttributeId: parentId,
      definition: "Define the repeatable competency this Skill owns.",
      typicalChecks: [],
      boundaries: [],
      origin: "newly-proposed",
      legacyTerms: [],
      focuses: [],
    };
    attribute.skills.push(skill);
    return { data: next, newId: skill.id };
  }
  if (kind === "focus" && parentId) {
    const skill = next.attributes
      .flatMap((attribute) => attribute.skills)
      .find((item) => item.id === parentId);
    if (!skill) return { data };
    const focus: SkillFocus = {
      id: `focus-proposal-${suffix}`,
      kind: "focus",
      name: "New Focus Proposal",
      proposal: true,
      status: "proposed",
      provenance: "new-original",
      parentSkillId: parentId,
      characterFantasy: "Describe the character fantasy.",
      identity: "Describe the Focus identity.",
      typicalUses: [],
      boundary: "Describe the nearest neighboring Focus boundary.",
      tier2Posture: "Describe the Tier 2 unlock posture.",
      tier3Posture: "Describe the Tier 3 reveal and capstone posture.",
      abilities: [],
    };
    skill.focuses.push(focus);
    return { data: next, newId: focus.id };
  }
  if (kind === "ability" && parentId) {
    const ability: Ability = {
      id: `ability-proposal-${suffix}`,
      kind: "ability",
      name: "New Ability Proposal",
      proposal: true,
      status: "proposed",
      provenance: "new-original",
      parentFocusId: parentId.startsWith("shared-") ? undefined : parentId,
      sharedBranchId: parentId.startsWith("shared-") ? parentId : undefined,
      tier: 1,
      maxRank: 3,
      abilityType: "permission",
      actionCost: sourceActionCost("permission"),
      rulesImpact: deriveRulesImpact("permission", []),
      applicability: "general",
      candidateEffect:
        "Describe the fiction-facing capability and its proposed effect on a named Nexus rules surface.",
      rankDirection: "Describe how later ranks deepen the same effect.",
      prerequisiteIds: [],
      prerequisiteLogic: "AND",
      validationDependencies: [],
      designRationale: "Explain why this deserves its own Ability.",
      playtestNotes: "Record what should be observed in play.",
      coverageTags: [],
    };
    const focus = next.attributes
      .flatMap((attribute) => attribute.skills)
      .flatMap((skill) => skill.focuses)
      .find((item) => item.id === parentId);
    const branch = next.sharedBranches.find((item) => item.id === parentId);
    if (focus) focus.abilities.push(ability);
    else if (branch) branch.abilities.push(ability);
    else return { data };
    return { data: next, newId: ability.id };
  }
  if (kind === "shared-branch") {
    const branch: SharedBranch = {
      id: `shared-proposal-${suffix}`,
      kind: "shared-branch",
      name: "New Shared Branch Proposal",
      proposal: true,
      status: "proposed",
      provenance: "new-original",
      skillIds: [],
      prerequisiteLogic: "AND",
      rationale: "Explain why neither parent Skill can own the concept alone.",
      abilities: [],
    };
    next.sharedBranches.push(branch);
    return { data: next, newId: branch.id };
  }
  return { data };
}

function inlineMarkdown(value: string): string {
  return value.replaceAll("\r", "").replaceAll("\n", " ").trim();
}

function appendList(lines: string[], label: string, values: string[]): void {
  lines.push(`**${label}:**`);
  if (values.length === 0) {
    lines.push("- None recorded");
  } else {
    lines.push(...values.map((value) => `- ${inlineMarkdown(value)}`));
  }
  lines.push("");
}

export function exportTreeMarkdown(data: LabData): string {
  const nodeNames = new Map<string, string>();
  for (const attribute of data.attributes) {
    nodeNames.set(attribute.id, attribute.name);
    for (const skill of attribute.skills) {
      nodeNames.set(skill.id, skill.name);
      for (const focus of skill.focuses) {
        nodeNames.set(focus.id, focus.name);
        for (const ability of focus.abilities)
          nodeNames.set(ability.id, ability.name);
      }
    }
  }
  for (const branch of data.sharedBranches) {
    nodeNames.set(branch.id, branch.name);
    for (const ability of branch.abilities)
      nodeNames.set(ability.id, ability.name);
  }

  const resolveNames = (ids: string[], logic: "AND" | "OR") =>
    ids.length === 0
      ? "None"
      : ids
          .map((id) => nodeNames.get(id) ?? `Missing reference (${id})`)
          .join(` ${logic} `);

  const lines: string[] = [
    `# ${data.title}`,
    "",
    `> ${NONCANONICAL_NOTICE}`,
    "",
    `**Candidate structural model:** ${data.candidateModel}`,
    "",
    data.modelDecision,
    "",
  ];

  const appendAbility = (ability: Ability, headingLevel: number) => {
    lines.push(
      `${"#".repeat(headingLevel)} ${ability.name}`,
      "",
      `- **Proposal:** yes`,
      `- **Status:** ${ability.status}`,
      `- **Provenance:** ${ability.provenance}`,
      `- **Tier:** ${ability.tier}`,
      `- **Maximum Rank:** ${ability.maxRank}`,
      `- **Type:** ${ability.abilityType}`,
      `- **Action cost posture:** ${inlineMarkdown(ability.actionCost)}`,
      `- **Lattice check surface:** ${inlineMarkdown(ability.rulesImpact.checkSurface)}`,
      `- **Rules state surfaces:** ${ability.rulesImpact.stateSurfaces.map(inlineMarkdown).join(", ")}`,
      `- **Result bands:** ${inlineMarkdown(ability.rulesImpact.resultBands)}`,
      `- **Guardrail:** ${inlineMarkdown(ability.rulesImpact.guardrail)}`,
      `- **Applicability:** ${ability.applicability}`,
      `- **Prerequisites:** ${resolveNames(ability.prerequisiteIds, ability.prerequisiteLogic)}`,
      `- **Prerequisite logic:** ${ability.prerequisiteLogic}`,
      "",
      `**Candidate effect:** ${inlineMarkdown(ability.candidateEffect)}`,
      "",
      `**Rank development:** ${inlineMarkdown(ability.rankDirection)}`,
      "",
      `**Design rationale:** ${inlineMarkdown(ability.designRationale)}`,
      "",
      `**Playtest notes:** ${inlineMarkdown(ability.playtestNotes)}`,
      "",
    );
    appendList(
      lines,
      "Validation dependencies",
      ability.validationDependencies,
    );
    appendList(lines, "Coverage tags", ability.coverageTags);
  };

  for (const attribute of data.attributes) {
    lines.push(
      `## ${attribute.name}`,
      "",
      `- **Proposal:** yes`,
      `- **Status:** ${attribute.status}`,
      `- **Provenance:** ${attribute.provenance}`,
      "",
      `**Identity:** ${inlineMarkdown(attribute.identity)}`,
      "",
      `**Gameplay promise:** ${inlineMarkdown(attribute.gameplayPromise)}`,
      "",
      `**Coverage notes:** ${inlineMarkdown(attribute.coverageNotes)}`,
      "",
    );
    appendList(lines, "Historical lineage", attribute.historicalLineage);

    for (const skill of attribute.skills) {
      lines.push(
        `### ${skill.name}`,
        "",
        `- **Proposal:** yes`,
        `- **Status:** ${skill.status}`,
        `- **Provenance:** ${skill.provenance}`,
        `- **Origin:** ${skill.origin}`,
        `- **Parent Attribute:** ${attribute.name}`,
        "",
        `**Definition:** ${inlineMarkdown(skill.definition)}`,
        "",
      );
      appendList(lines, "Typical checks", skill.typicalChecks);
      appendList(lines, "Boundaries", skill.boundaries);
      appendList(lines, "Historical terms", skill.legacyTerms);

      for (const focus of skill.focuses) {
        lines.push(
          `#### ${focus.name}`,
          "",
          `- **Proposal:** yes`,
          `- **Status:** ${focus.status}`,
          `- **Provenance:** ${focus.provenance}`,
          `- **Parent Skill:** ${skill.name}`,
          "",
          `**Character fantasy:** ${inlineMarkdown(focus.characterFantasy)}`,
          "",
          `**Focus identity:** ${inlineMarkdown(focus.identity)}`,
          "",
          `**Boundary:** ${inlineMarkdown(focus.boundary)}`,
          "",
          `**Tier 2 posture:** ${inlineMarkdown(focus.tier2Posture)}`,
          "",
          `**Tier 3 posture:** ${inlineMarkdown(focus.tier3Posture)}`,
          "",
        );
        appendList(lines, "Typical uses", focus.typicalUses);
        for (const ability of focus.abilities) appendAbility(ability, 5);
      }
    }
  }

  lines.push("## Shared branches", "");
  for (const branch of data.sharedBranches) {
    lines.push(
      `### ${branch.name}`,
      "",
      `- **Proposal:** yes`,
      `- **Status:** ${branch.status}`,
      `- **Provenance:** ${branch.provenance}`,
      `- **Parent Skills:** ${resolveNames(branch.skillIds, branch.prerequisiteLogic)}`,
      `- **Skill relationship:** ${branch.prerequisiteLogic}`,
      "",
      `**Rationale:** ${inlineMarkdown(branch.rationale)}`,
      "",
    );
    for (const ability of branch.abilities) appendAbility(ability, 4);
  }
  return lines.join("\n");
}

type JsonRecord = Record<string, unknown>;

const PROPOSAL_STATUSES = [
  "proposed",
  "under-review",
  "accepted-later",
  "deferred",
  "rejected",
] as const;
const PROVENANCE_CATEGORIES = [
  "existing-nexus-rule",
  "prior-nexus-proposal",
  "external-pattern",
  "new-original",
] as const;
const ABILITY_TYPES = [
  "action",
  "reaction",
  "passive",
  "stance",
  "permission",
  "equipment-interaction",
  "preparation",
  "other",
] as const;
const APPLICABILITY_VALUES = [
  "away-team",
  "ship-support",
  "both",
  "general",
] as const;
const PREREQUISITE_LOGIC = ["AND", "OR"] as const;
const SKILL_ORIGINS = ["broad", "legacy-derived", "newly-proposed"] as const;
const COVERAGE_TAGS = [
  "combat-offense",
  "defense-protection",
  "support-recovery",
  "command-tactics",
  "mobility-exploration",
  "computing-intrusion",
  "engineering-fabrication",
  "medicine-biotech-cybernetics",
  "perception-cognition-resolve",
  "rapport-deception-pressure-networks-exchange",
  "identity-body-signal-first-contact",
  "away-team",
  "ship-support",
  "noncombat",
] as const;

function importError(path: string, detail: string): never {
  throw new Error(`Invalid Skill Tree Lab export at ${path}: ${detail}.`);
}

function requireRecord(value: unknown, path: string): JsonRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return importError(path, "expected an object");
  }
  return value as JsonRecord;
}

function requireArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) return importError(path, "expected an array");
  return value;
}

function requireString(record: JsonRecord, key: string, path: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    return importError(`${path}.${key}`, "expected a non-empty string");
  }
  return value;
}

function requireNumber(record: JsonRecord, key: string, path: string): number {
  const value = record[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return importError(`${path}.${key}`, "expected a finite number");
  }
  return value;
}

function requireStringArray(
  record: JsonRecord,
  key: string,
  path: string,
): string[] {
  return requireArray(record[key], `${path}.${key}`).map((value, index) => {
    if (typeof value !== "string")
      return importError(`${path}.${key}[${index}]`, "expected a string");
    return value;
  });
}

function requireEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  path: string,
): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    return importError(path, `expected one of ${allowed.join(", ")}`);
  }
  return value as T;
}

function validateBase(
  record: JsonRecord,
  expectedKind: string,
  path: string,
  ids: Set<string>,
): string {
  const id = requireString(record, "id", path);
  if (ids.has(id)) importError(`${path}.id`, `duplicate id ${id}`);
  ids.add(id);
  requireString(record, "name", path);
  if (record.proposal !== true)
    importError(
      `${path}.proposal`,
      "every editable item must remain a proposal",
    );
  requireEnum(record.status, PROPOSAL_STATUSES, `${path}.status`);
  requireEnum(record.provenance, PROVENANCE_CATEGORIES, `${path}.provenance`);
  if (record.kind !== expectedKind)
    importError(`${path}.kind`, `expected ${expectedKind}`);
  return id;
}

function validateAbility(
  value: unknown,
  path: string,
  ids: Set<string>,
  abilityIds: Set<string>,
  expectedParentId: string,
  shared: boolean,
): JsonRecord {
  const record = requireRecord(value, path);
  const id = validateBase(record, "ability", path, ids);
  abilityIds.add(id);
  if (shared) {
    if (
      record.sharedBranchId !== expectedParentId ||
      record.parentFocusId !== undefined
    ) {
      importError(path, "shared Ability ownership does not match its branch");
    }
  } else if (
    record.parentFocusId !== expectedParentId ||
    record.sharedBranchId !== undefined
  ) {
    importError(path, "Focus Ability ownership does not match its parent");
  }
  const tier = requireNumber(record, "tier", path);
  if (![1, 2, 3].includes(tier))
    importError(`${path}.tier`, "expected 1, 2, or 3");
  const maxRank = requireNumber(record, "maxRank", path);
  if (!Number.isInteger(maxRank) || maxRank < 1)
    importError(`${path}.maxRank`, "expected a positive integer");
  requireEnum(record.abilityType, ABILITY_TYPES, `${path}.abilityType`);
  requireEnum(
    record.applicability,
    APPLICABILITY_VALUES,
    `${path}.applicability`,
  );
  requireEnum(
    record.prerequisiteLogic,
    PREREQUISITE_LOGIC,
    `${path}.prerequisiteLogic`,
  );
  requireString(record, "actionCost", path);
  requireString(record, "candidateEffect", path);
  requireString(record, "rankDirection", path);
  requireString(record, "designRationale", path);
  requireString(record, "playtestNotes", path);
  requireStringArray(record, "prerequisiteIds", path);
  requireStringArray(record, "validationDependencies", path);
  const tags = requireStringArray(record, "coverageTags", path);
  tags.forEach((tag, index) =>
    requireEnum(tag, COVERAGE_TAGS, `${path}.coverageTags[${index}]`),
  );
  if (record.rulesImpact === undefined) {
    record.rulesImpact = deriveRulesImpact(
      record.abilityType as Ability["abilityType"],
      tags as Ability["coverageTags"],
    );
  }
  const rulesImpact = requireRecord(record.rulesImpact, `${path}.rulesImpact`);
  requireString(rulesImpact, "checkSurface", `${path}.rulesImpact`);
  requireString(rulesImpact, "actionEconomy", `${path}.rulesImpact`);
  requireStringArray(rulesImpact, "stateSurfaces", `${path}.rulesImpact`);
  requireString(rulesImpact, "resultBands", `${path}.rulesImpact`);
  requireString(rulesImpact, "guardrail", `${path}.rulesImpact`);
  return record;
}

export function parseImportedLabData(text: string): LabData {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("This file is not valid JSON.");
  }

  const root = requireRecord(parsed, "root");
  if (root.schemaVersion !== 1)
    importError("root.schemaVersion", "expected schema version 1");
  requireString(root, "title", "root");
  requireString(root, "candidateModel", "root");
  requireString(root, "modelDecision", "root");
  requireString(root, "generatedAt", "root");

  const ids = new Set<string>();
  const skillIds = new Set<string>();
  const abilityIds = new Set<string>();
  const prerequisiteReferences: Array<{ path: string; ids: string[] }> = [];

  requireArray(root.attributes, "root.attributes").forEach(
    (attributeValue, attributeIndex) => {
      const path = `root.attributes[${attributeIndex}]`;
      const attribute = requireRecord(attributeValue, path);
      const attributeId = validateBase(attribute, "attribute", path, ids);
      requireString(attribute, "identity", path);
      requireString(attribute, "gameplayPromise", path);
      requireString(attribute, "coverageNotes", path);
      requireStringArray(attribute, "historicalLineage", path);
      requireArray(attribute.skills, `${path}.skills`).forEach(
        (skillValue, skillIndex) => {
          const skillPath = `${path}.skills[${skillIndex}]`;
          const skill = requireRecord(skillValue, skillPath);
          const skillId = validateBase(skill, "skill", skillPath, ids);
          skillIds.add(skillId);
          if (skill.parentAttributeId !== attributeId)
            importError(
              `${skillPath}.parentAttributeId`,
              "does not match parent Attribute",
            );
          requireString(skill, "definition", skillPath);
          requireStringArray(skill, "typicalChecks", skillPath);
          requireStringArray(skill, "boundaries", skillPath);
          requireStringArray(skill, "legacyTerms", skillPath);
          requireEnum(skill.origin, SKILL_ORIGINS, `${skillPath}.origin`);
          requireArray(skill.focuses, `${skillPath}.focuses`).forEach(
            (focusValue, focusIndex) => {
              const focusPath = `${skillPath}.focuses[${focusIndex}]`;
              const focus = requireRecord(focusValue, focusPath);
              const focusId = validateBase(focus, "focus", focusPath, ids);
              if (focus.parentSkillId !== skillId)
                importError(
                  `${focusPath}.parentSkillId`,
                  "does not match parent Skill",
                );
              requireString(focus, "characterFantasy", focusPath);
              requireString(focus, "identity", focusPath);
              requireString(focus, "boundary", focusPath);
              requireString(focus, "tier2Posture", focusPath);
              requireString(focus, "tier3Posture", focusPath);
              requireStringArray(focus, "typicalUses", focusPath);
              requireArray(focus.abilities, `${focusPath}.abilities`).forEach(
                (abilityValue, abilityIndex) => {
                  const abilityPath = `${focusPath}.abilities[${abilityIndex}]`;
                  const ability = validateAbility(
                    abilityValue,
                    abilityPath,
                    ids,
                    abilityIds,
                    focusId,
                    false,
                  );
                  prerequisiteReferences.push({
                    path: `${abilityPath}.prerequisiteIds`,
                    ids: requireStringArray(
                      ability,
                      "prerequisiteIds",
                      abilityPath,
                    ),
                  });
                },
              );
            },
          );
        },
      );
    },
  );

  requireArray(root.sharedBranches, "root.sharedBranches").forEach(
    (branchValue, branchIndex) => {
      const path = `root.sharedBranches[${branchIndex}]`;
      const branch = requireRecord(branchValue, path);
      const branchId = validateBase(branch, "shared-branch", path, ids);
      requireEnum(
        branch.prerequisiteLogic,
        PREREQUISITE_LOGIC,
        `${path}.prerequisiteLogic`,
      );
      requireString(branch, "rationale", path);
      const branchSkillIds = requireStringArray(branch, "skillIds", path);
      branchSkillIds.forEach((skillId) => {
        if (!skillIds.has(skillId))
          importError(`${path}.skillIds`, `missing Skill ${skillId}`);
      });
      requireArray(branch.abilities, `${path}.abilities`).forEach(
        (abilityValue, abilityIndex) => {
          const abilityPath = `${path}.abilities[${abilityIndex}]`;
          const ability = validateAbility(
            abilityValue,
            abilityPath,
            ids,
            abilityIds,
            branchId,
            true,
          );
          prerequisiteReferences.push({
            path: `${abilityPath}.prerequisiteIds`,
            ids: requireStringArray(ability, "prerequisiteIds", abilityPath),
          });
        },
      );
    },
  );

  prerequisiteReferences.forEach((reference) => {
    reference.ids.forEach((id) => {
      if (!abilityIds.has(id))
        importError(reference.path, `missing Ability prerequisite ${id}`);
    });
  });

  requireArray(root.research, "root.research").forEach((entryValue, index) => {
    const path = `root.research[${index}]`;
    const entry = requireRecord(entryValue, path);
    [
      "id",
      "source",
      "genre",
      "mechanic",
      "pattern",
      "strength",
      "risk",
      "nexusAdaptation",
      "avoid",
      "candidateApplication",
      "citationLabel",
      "citationUrl",
    ].forEach((key) => requireString(entry, key, path));
    requireEnum(
      entry.sourceType,
      ["official", "primary", "secondary"] as const,
      `${path}.sourceType`,
    );
  });
  requireArray(root.structuralComparison, "root.structuralComparison").forEach(
    (rowValue, index) => {
      const path = `root.structuralComparison[${index}]`;
      const row = requireRecord(rowValue, path);
      [
        "criterion",
        "broadDomains",
        "legacyGranular",
        "candidateReading",
      ].forEach((key) => requireString(row, key, path));
    },
  );
  requireArray(root.rulesMap, "root.rulesMap").forEach((entryValue, index) => {
    const path = `root.rulesMap[${index}]`;
    const entry = requireRecord(entryValue, path);
    ["id", "title", "detail", "sourcePath"].forEach((key) =>
      requireString(entry, key, path),
    );
    requireEnum(
      entry.classification,
      ["accepted", "existing-rule", "prior-proposal", "open-question"] as const,
      `${path}.classification`,
    );
  });
  const theme = requireRecord(root.theme, "root.theme");
  [
    "preset",
    "canvas",
    "surface",
    "surfaceStrong",
    "text",
    "textMuted",
    "line",
    "accent",
    "accentStrong",
    "glow",
  ].forEach((key) => requireString(theme, key, "root.theme"));
  requireNumber(theme, "radius", "root.theme");
  requireNumber(theme, "density", "root.theme");

  return {
    ...root,
    noncanonicalNotice: NONCANONICAL_NOTICE,
    modelDecision: PLAYTEST_MODEL_DECISION,
  } as unknown as LabData;
}
