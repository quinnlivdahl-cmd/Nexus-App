export const maturityScores = {
  unframed: 0,
  defined: 20,
  prototyped: 40,
  validated: 60,
  integrated: 80,
  playable: 100,
} as const;

export type Maturity = keyof typeof maturityScores;
export type Freshness = "fresh" | "aging" | "stale" | "unknown";
export type VisionAlignment = "aligned" | "needs-revision" | "superseded" | "needs-decision" | "operational";

export type SourceRecord = {
  id: string;
  owner: string;
  location: string;
  observedAt: string;
  hash: string;
  freshness: Freshness;
  authorityRole: string;
  inputs: string[];
  freshnessBasis: "source-mtime" | "known-stale-local-mirror";
};

export type RoadmapStage = {
  id: string;
  name: string;
  summary: string;
  maturity: Maturity;
  ticketIds: number[];
  worktreeIds: string[];
  decisionIds: string[];
  evidence: string;
};

export type Ticket = {
  id: number;
  title: string;
  state: string;
  alignment: VisionAlignment;
  stageIds: string[];
  worktreeIds: string[];
  note: string;
  githubUrl: string;
  owner: string;
  sourceId: string;
  freshness: Freshness;
};

export type Worktree = {
  id: string;
  purpose: string;
  branch: string;
  displayPath: string;
  health: "clean" | "dirty" | "unknown";
  ahead: number | null;
  behind: number | null;
  activity: string;
  ticketIds: number[];
  owner: string;
  observedAt: string;
  freshness: Freshness;
  present: boolean;
  declarationStatus: "declared" | "discovered" | "missing";
  upstream: string | null;
  lastCommit: string | null;
  lastCommitAt: string | null;
};

export type Decision = {
  id: string;
  title: string;
  priority: "P0" | "P1" | "P2";
  affectedStageIds: string[];
  blocker: string;
  evidence: string;
  action: "Grill with Docs" | "Plan with GPT" | "Prototype with Codex" | "Create / Update Ticket with Codex";
  owner: string;
  sourceId: string;
  freshness: Freshness;
};

export type AttentionItem = { id: string; severity: "attention" | "watch"; title: string; detail: string; tab: string };

export type ContextBundleManifestEntry = {
  id: string;
  driveId: string | null;
  ownerPath: string;
  sourcePath: string;
  sourceId: string;
  freshness: Freshness;
  hash: string;
  authorityRole: string;
  retrievalIntent: string;
  publicationStatus: "pending" | "published" | "stale" | "withdrawn";
};

export type ContextBundleManifest = {
  projectId: string;
  audience: string;
  status: "designed-not-published" | "published" | "stale";
  version: string;
  sourceWorkflow: string;
  runtimeLane: string;
  purpose: string;
  target: string;
  boundaries: string[];
  checks: string[];
  risks: string[];
  destinationPlan: string;
  approvalRequired: boolean;
  generatedAt: string;
  lastVerified: string;
  entries: ContextBundleManifestEntry[];
};

export type ProjectSnapshot = {
  schemaVersion: string;
  generatedAt: string;
  freshness: { status: Freshness; thresholdHours: number; reasons: string[] };
  sources: SourceRecord[];
  roadmapStages: RoadmapStage[];
  tickets: Ticket[];
  worktrees: Worktree[];
  decisions: Decision[];
  attention: AttentionItem[];
  derivation: {
    mode: "declared-mappings-plus-observed-state";
    declaredSections: string[];
    note: string;
  };
  contextBundle: {
    status: string;
    manifestVersion: string;
    manifestPath: string;
    lastVerified: string;
    entries: number;
    manifestEntries: ContextBundleManifestEntry[];
  };
};

export type LaunchInput = { entryType: "ticket" | "stage" | "freeform"; entryId: string; intent: string; worktreeId: string };

export function scoreFor(maturity: Maturity) {
  return maturityScores[maturity];
}

export function displayMaturity(maturity: Maturity) {
  return `${maturity[0].toUpperCase()}${maturity.slice(1)}`;
}

export function averageMaturity(stages: RoadmapStage[]) {
  if (stages.length === 0) return 0;
  return Math.round(stages.reduce((total, stage) => total + scoreFor(stage.maturity), 0) / stages.length);
}

export function assembleLaunchPacket(snapshot: ProjectSnapshot, input: LaunchInput) {
  const ticket = input.entryType === "ticket" ? snapshot.tickets.find((item) => String(item.id) === input.entryId) : undefined;
  const stage = input.entryType === "stage" ? snapshot.roadmapStages.find((item) => item.id === input.entryId) : undefined;
  const worktree = snapshot.worktrees.find((item) => item.id === input.worktreeId) ?? snapshot.worktrees[0];
  const objective = input.entryType === "freeform"
    ? input.intent.trim() || "Define a focused Nexus development task."
    : ticket
      ? `${ticket.title} #${ticket.id}`
      : stage
        ? `Advance ${stage.name} from ${displayMaturity(stage.maturity)} (${scoreFor(stage.maturity)}%).`
        : "Define a focused Nexus development task.";
  const sourceList = snapshot.sources.map((source) => `- ${source.owner}: ${source.location} (${source.freshness}; observed ${source.observedAt})`).join("\n");
  const scope = ticket ? ticket.note : stage ? stage.summary : "Constrain work to the stated intent and surface unknowns before widening scope.";
  const mappedStages = ticket?.stageIds.map((id) => snapshot.roadmapStages.find((item) => item.id === id)?.name ?? id) ?? (stage ? [stage.name] : []);
  const prompt = `# Nexus Codex Launch Packet\n\nObjective\n${objective}\n\nTarget worktree\n${worktree.purpose} — ${worktree.branch} (${worktree.displayPath})\nObserved: ${worktree.observedAt}; ${worktree.health}; ahead ${worktree.ahead ?? "unknown"}, behind ${worktree.behind ?? "unknown"}\n\nMapped player-loop stage\n${mappedStages.length ? mappedStages.join(" · ") : "No stage mapping declared; establish one before widening scope."}\n\nAuthoritative context\n${sourceList}\n\nIn scope\n${scope}\n\nOut of scope\n- Do not treat the dashboard snapshot as live GitHub state.\n- Do not change canonical game truth without a source-authority decision.\n- Do not mutate GitHub or Drive without explicit approval.\n\nAcceptance criteria\n- Verify the relevant live GitHub task packet before editing when this packet starts from a mirrored ticket.\n- Implement only the approved slice and preserve the declared player-loop mapping.\n- Preserve source authority and report conflicts.\n\nValidation expectations\n- Run the affected surface's documented checks.\n- Report the commands, results, remaining risks, and any source or snapshot drift.\n\nStart by reading the worktree status, the listed sources, and the relevant GitHub task packet before editing.`;
  return { objective, worktree, mappedStages, scope, prompt };
}
