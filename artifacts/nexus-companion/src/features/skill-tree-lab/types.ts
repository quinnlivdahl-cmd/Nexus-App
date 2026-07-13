export type ProposalStatus =
  | "proposed"
  | "under-review"
  | "accepted-later"
  | "deferred"
  | "rejected";

export type ProvenanceCategory =
  | "existing-nexus-rule"
  | "prior-nexus-proposal"
  | "external-pattern"
  | "new-original";

export type AbilityType =
  | "action"
  | "reaction"
  | "passive"
  | "stance"
  | "permission"
  | "equipment-interaction"
  | "preparation"
  | "other";

export type SkillOrigin = "broad" | "legacy-derived" | "newly-proposed";
export type PrerequisiteLogic = "AND" | "OR";

export interface AbilityRulesImpact {
  checkSurface: string;
  actionEconomy: string;
  stateSurfaces: string[];
  resultBands: string;
  guardrail: string;
}

export type CoverageTag =
  | "combat-offense"
  | "defense-protection"
  | "support-recovery"
  | "command-tactics"
  | "mobility-exploration"
  | "computing-intrusion"
  | "engineering-fabrication"
  | "medicine-biotech-cybernetics"
  | "perception-cognition-resolve"
  | "rapport-deception-pressure-networks-exchange"
  | "identity-body-signal-first-contact"
  | "away-team"
  | "ship-support"
  | "noncombat";

export interface ProposalBase {
  id: string;
  name: string;
  proposal: true;
  status: ProposalStatus;
  provenance: ProvenanceCategory;
}

export interface Ability extends ProposalBase {
  kind: "ability";
  parentFocusId?: string;
  sharedBranchId?: string;
  tier: 1 | 2 | 3;
  maxRank: number;
  abilityType: AbilityType;
  actionCost: string;
  rulesImpact: AbilityRulesImpact;
  applicability: "away-team" | "ship-support" | "both" | "general";
  candidateEffect: string;
  rankDirection: string;
  prerequisiteIds: string[];
  prerequisiteLogic: PrerequisiteLogic;
  validationDependencies: string[];
  designRationale: string;
  playtestNotes: string;
  coverageTags: CoverageTag[];
}

export interface SkillFocus extends ProposalBase {
  kind: "focus";
  parentSkillId: string;
  characterFantasy: string;
  identity: string;
  typicalUses: string[];
  boundary: string;
  tier2Posture: string;
  tier3Posture: string;
  abilities: Ability[];
}

export interface Skill extends ProposalBase {
  kind: "skill";
  parentAttributeId: string;
  definition: string;
  typicalChecks: string[];
  boundaries: string[];
  origin: SkillOrigin;
  legacyTerms: string[];
  focuses: SkillFocus[];
}

export interface Attribute extends ProposalBase {
  kind: "attribute";
  identity: string;
  gameplayPromise: string;
  historicalLineage: string[];
  coverageNotes: string;
  skills: Skill[];
}

export interface SharedBranch extends ProposalBase {
  kind: "shared-branch";
  skillIds: string[];
  prerequisiteLogic: PrerequisiteLogic;
  rationale: string;
  abilities: Ability[];
}

export interface StructuralModelRow {
  criterion: string;
  broadDomains: string;
  legacyGranular: string;
  candidateReading: string;
}

export interface ResearchEntry {
  id: string;
  source: string;
  genre: string;
  mechanic: string;
  pattern: string;
  strength: string;
  risk: string;
  nexusAdaptation: string;
  avoid: string;
  candidateApplication: string;
  citationLabel: string;
  citationUrl: string;
  sourceType: "official" | "primary" | "secondary";
}

export interface RuleMapEntry {
  id: string;
  classification:
    | "accepted"
    | "existing-rule"
    | "prior-proposal"
    | "open-question";
  title: string;
  detail: string;
  sourcePath: string;
}

export interface ThemeTokens {
  preset: string;
  canvas: string;
  surface: string;
  surfaceStrong: string;
  text: string;
  textMuted: string;
  line: string;
  accent: string;
  accentStrong: string;
  glow: string;
  radius: number;
  density: number;
}

export interface LabData {
  schemaVersion: 1;
  title: string;
  noncanonicalNotice: string;
  candidateModel: string;
  modelDecision: string;
  generatedAt: string;
  attributes: Attribute[];
  sharedBranches: SharedBranch[];
  research: ResearchEntry[];
  structuralComparison: StructuralModelRow[];
  rulesMap: RuleMapEntry[];
  theme: ThemeTokens;
}

export type NodeKind =
  | "attribute"
  | "skill"
  | "focus"
  | "ability"
  | "shared-branch";

export interface NodeRef {
  kind: NodeKind;
  id: string;
  name: string;
  parentId?: string;
}
