import type {
  Ability,
  CoverageTag,
  LabData,
  NodeRef,
  ProposalStatus,
} from "./types";
import { hasConcreteCandidateEffect } from "./rules-impact";

export const COVERAGE_LABELS: Record<CoverageTag, string> = {
  "combat-offense": "Combat offense",
  "defense-protection": "Defense and protection",
  "support-recovery": "Support and recovery",
  "command-tactics": "Command and tactics",
  "mobility-exploration": "Mobility and exploration",
  "computing-intrusion": "Computing and intrusion",
  "engineering-fabrication": "Engineering and fabrication",
  "medicine-biotech-cybernetics": "Medicine, biotech, and cybernetics",
  "perception-cognition-resolve": "Perception, cognition, and resolve",
  "rapport-deception-pressure-networks-exchange":
    "Rapport, deception, pressure, networks, and exchange",
  "identity-body-signal-first-contact":
    "Identity, body, Signal, and first contact",
  "away-team": "Away-team play",
  "ship-support": "Ship-support play",
  noncombat: "Noncombat play",
};

export const ALL_COVERAGE_TAGS = Object.keys(COVERAGE_LABELS) as CoverageTag[];

export interface CoverageCount {
  tag: CoverageTag;
  label: string;
  count: number;
}

export interface Diagnostic {
  id: string;
  severity: "critical" | "warning" | "info" | "pass";
  title: string;
  detail: string;
  nodeId?: string;
}

export function allAbilities(data: LabData): Ability[] {
  return [
    ...data.attributes.flatMap((attribute) =>
      attribute.skills.flatMap((skill) =>
        skill.focuses.flatMap((focus) => focus.abilities),
      ),
    ),
    ...data.sharedBranches.flatMap((branch) => branch.abilities),
  ];
}

export function flattenNodes(data: LabData): NodeRef[] {
  const refs: NodeRef[] = [];
  for (const attribute of data.attributes) {
    refs.push({ kind: "attribute", id: attribute.id, name: attribute.name });
    for (const skill of attribute.skills) {
      refs.push({
        kind: "skill",
        id: skill.id,
        name: skill.name,
        parentId: attribute.id,
      });
      for (const focus of skill.focuses) {
        refs.push({
          kind: "focus",
          id: focus.id,
          name: focus.name,
          parentId: skill.id,
        });
        for (const ability of focus.abilities) {
          refs.push({
            kind: "ability",
            id: ability.id,
            name: ability.name,
            parentId: focus.id,
          });
        }
      }
    }
  }
  for (const branch of data.sharedBranches) {
    refs.push({ kind: "shared-branch", id: branch.id, name: branch.name });
    for (const ability of branch.abilities) {
      refs.push({
        kind: "ability",
        id: ability.id,
        name: ability.name,
        parentId: branch.id,
      });
    }
  }
  return refs;
}

export function coverageCounts(data: LabData): CoverageCount[] {
  const abilities = allAbilities(data);
  return ALL_COVERAGE_TAGS.map((tag) => ({
    tag,
    label: COVERAGE_LABELS[tag],
    count: abilities.filter((ability) => ability.coverageTags.includes(tag))
      .length,
  }));
}

function duplicateNames(data: LabData): string[] {
  const counts = new Map<string, number>();
  for (const node of flattenNodes(data)) {
    const key = node.name.trim().toLocaleLowerCase();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([name]) => name);
}

export function diagnostics(data: LabData): Diagnostic[] {
  const results: Diagnostic[] = [];
  const abilities = allAbilities(data);
  const nodeRefs = flattenNodes(data);
  const abilityById = new Map(
    abilities.map((ability) => [ability.id, ability]),
  );
  const skillIds = new Set(
    data.attributes.flatMap((attribute) =>
      attribute.skills.map((skill) => skill.id),
    ),
  );
  const idCounts = new Map<string, number>();

  for (const node of nodeRefs)
    idCounts.set(node.id, (idCounts.get(node.id) ?? 0) + 1);
  for (const [id, count] of idCounts) {
    if (count > 1) {
      results.push({
        id: `duplicate-id-${id}`,
        severity: "critical",
        title: "Duplicate node ID",
        detail: `${id} is used by ${count} nodes. IDs must be unique for editing and prerequisites.`,
        nodeId: id,
      });
    }
  }

  const proposalNodes = [
    ...data.attributes.flatMap((attribute) => [
      attribute,
      ...attribute.skills.flatMap((skill) => [
        skill,
        ...skill.focuses.flatMap((focus) => [focus, ...focus.abilities]),
      ]),
    ]),
    ...data.sharedBranches.flatMap((branch) => [branch, ...branch.abilities]),
  ];
  for (const node of proposalNodes) {
    if (node.proposal !== true) {
      results.push({
        id: `proposal-flag-${node.id}`,
        severity: "critical",
        title: "Proposal flag missing",
        detail: `${node.name} is not explicitly marked as a proposal.`,
        nodeId: node.id,
      });
    }
  }

  for (const attribute of data.attributes) {
    if (attribute.skills.length < 2) {
      results.push({
        id: `sparse-attribute-${attribute.id}`,
        severity: "warning",
        title: "Sparse Attribute",
        detail: `${attribute.name} has fewer than two Skills.`,
        nodeId: attribute.id,
      });
    }
    for (const skill of attribute.skills) {
      if (skill.parentAttributeId !== attribute.id) {
        results.push({
          id: `skill-parent-${skill.id}`,
          severity: "critical",
          title: "Skill parent mismatch",
          detail: `${skill.name} points to ${skill.parentAttributeId} instead of ${attribute.name}.`,
          nodeId: skill.id,
        });
      }
      if (skill.focuses.length === 0) {
        results.push({
          id: `empty-skill-${skill.id}`,
          severity: "warning",
          title: "Skill has no Focuses",
          detail: `${skill.name} has no identity lane or Ability package yet.`,
          nodeId: skill.id,
        });
      } else if (skill.focuses.length === 1) {
        results.push({
          id: `single-focus-skill-${skill.id}`,
          severity: "info",
          title: "Single-Focus Skill",
          detail: `${skill.name} currently has one Focus. Confirm the hierarchy adds a real choice or mark this as expansion space.`,
          nodeId: skill.id,
        });
      }
      if (skill.focuses.length > 4) {
        results.push({
          id: `overloaded-skill-${skill.id}`,
          severity: "warning",
          title: "Overloaded Skill",
          detail: `${skill.name} has ${skill.focuses.length} Focuses. Consider a split or tighter boundary.`,
          nodeId: skill.id,
        });
      }
      for (const focus of skill.focuses) {
        if (focus.parentSkillId !== skill.id) {
          results.push({
            id: `focus-parent-${focus.id}`,
            severity: "critical",
            title: "Focus parent mismatch",
            detail: `${focus.name} points to ${focus.parentSkillId} instead of ${skill.name}.`,
            nodeId: focus.id,
          });
        }
        const tierOneCount = focus.abilities.filter(
          (ability) => ability.tier === 1,
        ).length;
        if (tierOneCount < 2 || tierOneCount > 3) {
          results.push({
            id: `tier-one-count-${focus.id}`,
            severity: "critical",
            title: "Tier 1 count outside candidate rule",
            detail: `${focus.name} has ${tierOneCount} Tier 1 Abilities. The candidate rule calls for two or three.`,
            nodeId: focus.id,
          });
        }
        if (!focus.abilities.some((ability) => ability.tier > 1)) {
          results.push({
            id: `no-higher-seed-${focus.id}`,
            severity: "info",
            title: "No higher-tier seed",
            detail: `${focus.name} intentionally has only Tier 1 content so far.`,
            nodeId: focus.id,
          });
        }
        for (const ability of focus.abilities) {
          if (
            ability.parentFocusId !== focus.id ||
            ability.sharedBranchId !== undefined
          ) {
            results.push({
              id: `focus-ability-owner-${ability.id}`,
              severity: "critical",
              title: "Ability ownership mismatch",
              detail: `${ability.name} must belong only to ${focus.name}.`,
              nodeId: ability.id,
            });
          }
        }
      }
    }
  }

  for (const ability of abilities) {
    if (!hasConcreteCandidateEffect(ability.candidateEffect)) {
      results.push({
        id: `vague-candidate-effect-${ability.id}`,
        severity: "critical",
        title: "Candidate Effect is not mechanically concrete",
        detail: `${ability.name} must state a proposed effect on a named Nexus rules surface, not only describe intent or fantasy.`,
        nodeId: ability.id,
      });
    }
    if (
      ability.candidateEffect.trim().length < 28 ||
      ability.designRationale.trim().length < 24
    ) {
      results.push({
        id: `thin-ability-${ability.id}`,
        severity: "warning",
        title: "Thin Ability definition",
        detail: `${ability.name} may lack a clear benefit, permission, or design rationale.`,
        nodeId: ability.id,
      });
    }
    const rulesImpact = ability.rulesImpact;
    if (
      !rulesImpact.checkSurface.trim() ||
      !rulesImpact.actionEconomy.trim() ||
      !rulesImpact.resultBands.trim() ||
      !rulesImpact.guardrail.trim() ||
      rulesImpact.stateSurfaces.length === 0
    ) {
      results.push({
        id: `missing-rules-impact-${ability.id}`,
        severity: "critical",
        title: "Ability lacks a rules impact",
        detail: `${ability.name} must identify its Lattice check surface, action-economy use, state surfaces, result-band behavior, and guardrail.`,
        nodeId: ability.id,
      });
    }
    for (const prerequisiteId of ability.prerequisiteIds) {
      const prerequisite = abilityById.get(prerequisiteId);
      if (!prerequisite) {
        results.push({
          id: `broken-prereq-${ability.id}-${prerequisiteId}`,
          severity: "critical",
          title: "Broken prerequisite",
          detail: `${ability.name} references missing node ${prerequisiteId}.`,
          nodeId: ability.id,
        });
      } else if (prerequisite.tier > ability.tier) {
        results.push({
          id: `tier-inversion-${ability.id}-${prerequisiteId}`,
          severity: "warning",
          title: "Prerequisite tier inversion",
          detail: `${ability.name} at Tier ${ability.tier} depends on ${prerequisite.name} at Tier ${prerequisite.tier}.`,
          nodeId: ability.id,
        });
      }
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const cycleMembers = new Set<string>();
  const visitPrerequisites = (abilityId: string) => {
    if (visiting.has(abilityId)) {
      cycleMembers.add(abilityId);
      return;
    }
    if (visited.has(abilityId)) return;
    visiting.add(abilityId);
    const ability = abilityById.get(abilityId);
    for (const prerequisiteId of ability?.prerequisiteIds ?? []) {
      if (abilityById.has(prerequisiteId)) visitPrerequisites(prerequisiteId);
    }
    visiting.delete(abilityId);
    visited.add(abilityId);
  };
  for (const ability of abilities) visitPrerequisites(ability.id);
  for (const abilityId of cycleMembers) {
    const ability = abilityById.get(abilityId);
    if (!ability) continue;
    results.push({
      id: `prerequisite-cycle-${abilityId}`,
      severity: "critical",
      title: "Prerequisite cycle",
      detail: `${ability.name} participates in a circular prerequisite path.`,
      nodeId: ability.id,
    });
  }

  for (const branch of data.sharedBranches) {
    if (branch.skillIds.length < 2) {
      results.push({
        id: `thin-shared-branch-${branch.id}`,
        severity: "warning",
        title: "Shared branch needs two Skills",
        detail: `${branch.name} references ${branch.skillIds.length} Skill. Shared branches should connect two Skills.`,
        nodeId: branch.id,
      });
    }
    for (const skillId of branch.skillIds) {
      if (!skillIds.has(skillId)) {
        results.push({
          id: `broken-shared-skill-${branch.id}-${skillId}`,
          severity: "critical",
          title: "Broken shared Skill reference",
          detail: `${branch.name} references missing Skill ${skillId}.`,
          nodeId: branch.id,
        });
      }
    }
    for (const ability of branch.abilities) {
      if (
        ability.sharedBranchId !== branch.id ||
        ability.parentFocusId !== undefined
      ) {
        results.push({
          id: `shared-ability-owner-${ability.id}`,
          severity: "critical",
          title: "Shared Ability ownership mismatch",
          detail: `${ability.name} must belong only to ${branch.name}.`,
          nodeId: ability.id,
        });
      }
    }
  }

  for (const name of duplicateNames(data)) {
    results.push({
      id: `duplicate-${name}`,
      severity: "warning",
      title: "Duplicate concept name",
      detail: `More than one node is named “${name}”. Confirm shared ownership or rename one.`,
    });
  }

  for (const item of coverageCounts(data)) {
    if (item.count === 0) {
      results.push({
        id: `missing-coverage-${item.tag}`,
        severity: "critical",
        title: "Missing gameplay coverage",
        detail: `${item.label} has no tagged Ability.`,
      });
    }
  }

  if (!results.some((result) => result.severity === "critical")) {
    results.push({
      id: "critical-pass",
      severity: "pass",
      title: "No blocking consistency errors",
      detail:
        "IDs are unique, ownership and parent pointers resolve, all items remain proposals, coverage is present, and Ability prerequisites are structurally valid.",
    });
  }

  return results;
}

export function statusLabel(status: ProposalStatus): string {
  return status.replaceAll("-", " ");
}
