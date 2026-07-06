import type {
  Actor,
  ActorTurnFlags,
  BackdropType,
  CoverEdge,
  CoverLevel,
  EncounterLogEntry,
  EncounterObjectiveInteraction,
  EncounterObjectiveState,
  EncounterObjectiveStatus,
  EncounterResultSummary,
  EncounterState,
  Faction,
  MarkerType,
  TacMapNode,
  TacMapPath,
} from '../../types/game';

export interface EncounterValidationIssue {
  path: string;
  message: string;
}

export type EncounterValidationResult =
  | { ok: true; encounter: EncounterState; issues: [] }
  | { ok: false; encounter: EncounterState; issues: EncounterValidationIssue[] };

const BACKDROP_TYPES = new Set<BackdropType>([
  'ship-corridor',
  'station-dock',
  'asteroid-mine',
  'hab-module',
  'reactor-deck',
  'derelict',
  'airlock',
  'medical-bay',
  'command-deck',
  'surface-exterior',
  'black-market',
  'prison-block',
  'server-room',
  'engineering-crawl',
  'industrial-platform',
  'cargo-hold',
  'research-lab',
  'orbital-approach',
]);

const FACTIONS = new Set<Faction>(['player', 'ally', 'npc', 'enemy', 'elite-enemy']);

const MARKERS = new Set<MarkerType>([
  'half-cover',
  'full-cover',
  'hazard',
  'objective',
  'high-ground',
  'extraction',
  'entry',
  'exit',
  'loot-cache',
  'reinforcement',
  'locked-route',
  'ally-npc',
]);

const COVER_LEVELS = new Set<CoverLevel>(['none', 'half', 'full']);
const OBJECTIVE_STATUSES = new Set<EncounterObjectiveStatus>(['open', 'complete', 'failed']);
const OBJECTIVE_INTERACTIONS = new Set<EncounterObjectiveInteraction>(['micro', 'action']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function asNonNegativeNumber(value: unknown, fallback: number): number {
  return isFiniteNumber(value) ? Math.max(0, value) : fallback;
}

function normalizeTurnFlags(value: unknown): ActorTurnFlags | undefined {
  if (!isRecord(value)) return undefined;

  const flags: ActorTurnFlags = {};
  if (typeof value.attacked === 'boolean') flags.attacked = value.attacked;
  if (typeof value.dashed === 'boolean') flags.dashed = value.dashed;
  if (typeof value.defending === 'boolean') flags.defending = value.defending;
  if (typeof value.microInteracted === 'boolean') flags.microInteracted = value.microInteracted;
  if (isFiniteNumber(value.movementBoost) && value.movementBoost > 0) {
    flags.movementBoost = Math.floor(value.movementBoost);
  }

  return Object.keys(flags).length > 0 ? flags : undefined;
}

function normalizeCoverEdges(value: unknown, nodeIds: Set<string>, path: string, issues: EncounterValidationIssue[]): CoverEdge[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const edges = value
    .filter(isRecord)
    .map((edge, index) => {
      const fromNodeId = typeof edge.fromNodeId === 'string' ? edge.fromNodeId.trim() : '';
      const level = typeof edge.level === 'string' && COVER_LEVELS.has(edge.level as CoverLevel)
        ? edge.level as CoverLevel
        : 'none';
      if (!nodeIds.has(fromNodeId)) {
        issues.push({ path: `${path}[${index}].fromNodeId`, message: `Cover edge node "${fromNodeId}" does not match a node.` });
      }
      if (edge.level != null && !COVER_LEVELS.has(edge.level as CoverLevel)) {
        issues.push({ path: `${path}[${index}].level`, message: `Unknown cover level "${String(edge.level)}".` });
      }
      return {
        fromNodeId,
        level,
        blocksVisibility: typeof edge.blocksVisibility === 'boolean' ? edge.blocksVisibility : undefined,
      };
    });
  return edges.length > 0 ? edges : undefined;
}

function normalizeNode(value: unknown, index: number, nodeIds: Set<string>, issues: EncounterValidationIssue[]): TacMapNode | null {
  if (!isRecord(value)) {
    issues.push({ path: `nodes[${index}]`, message: 'Node must be an object.' });
    return null;
  }

  const id = typeof value.id === 'string' ? value.id.trim() : '';
  const label = typeof value.label === 'string' ? value.label.trim() : id;
  if (!id) issues.push({ path: `nodes[${index}].id`, message: 'Node id is required.' });
  if (!isFiniteNumber(value.x) || !isFiniteNumber(value.y)) {
    issues.push({ path: `nodes[${index}]`, message: 'Node x and y must be finite numbers.' });
  }

  const markers = Array.isArray(value.markers)
    ? value.markers.filter((marker): marker is MarkerType => typeof marker === 'string' && MARKERS.has(marker as MarkerType))
    : undefined;

  return {
    id,
    label,
    x: isFiniteNumber(value.x) ? Math.max(0, Math.min(100, value.x)) : 50,
    y: isFiniteNumber(value.y) ? Math.max(0, Math.min(100, value.y)) : 50,
    capacity: isFiniteNumber(value.capacity) ? Math.max(0, Math.floor(value.capacity)) : undefined,
    status: Array.isArray(value.status) ? value.status.filter((s): s is string => typeof s === 'string') : undefined,
    elevation: isFiniteNumber(value.elevation) ? value.elevation : undefined,
    markers,
    coverEdges: normalizeCoverEdges(value.coverEdges, nodeIds, `nodes[${index}].coverEdges`, issues),
    isObjective: typeof value.isObjective === 'boolean' ? value.isObjective : undefined,
  };
}

function normalizePath(value: unknown, index: number, nodeIds: Set<string>, issues: EncounterValidationIssue[]): TacMapPath | null {
  if (!isRecord(value)) {
    issues.push({ path: `paths[${index}]`, message: 'Path must be an object.' });
    return null;
  }

  const id = typeof value.id === 'string' ? value.id.trim() : '';
  const fromId = typeof value.fromId === 'string' ? value.fromId.trim() : '';
  const toId = typeof value.toId === 'string' ? value.toId.trim() : '';
  if (!id) issues.push({ path: `paths[${index}].id`, message: 'Path id is required.' });
  if (!nodeIds.has(fromId)) issues.push({ path: `paths[${index}].fromId`, message: `Path endpoint "${fromId}" does not match a node.` });
  if (!nodeIds.has(toId)) issues.push({ path: `paths[${index}].toId`, message: `Path endpoint "${toId}" does not match a node.` });

  return {
    id,
    fromId,
    toId,
    distance: Math.max(0, Math.floor(asNonNegativeNumber(value.distance, 1))),
    tags: Array.isArray(value.tags) ? value.tags.filter((tag): tag is string => typeof tag === 'string') : undefined,
    status: typeof value.status === 'string' ? value.status : undefined,
  };
}

function normalizeActor(value: unknown, index: number, nodeIds: Set<string>, issues: EncounterValidationIssue[]): Actor | null {
  if (!isRecord(value)) {
    issues.push({ path: `actors[${index}]`, message: 'Actor must be an object.' });
    return null;
  }

  const id = typeof value.id === 'string' ? value.id.trim() : '';
  const name = typeof value.name === 'string' ? value.name.trim() : id;
  const faction = typeof value.faction === 'string' && FACTIONS.has(value.faction as Faction)
    ? value.faction as Faction
    : 'npc';
  const nodeId = typeof value.nodeId === 'string' ? value.nodeId.trim() : null;

  if (!id) issues.push({ path: `actors[${index}].id`, message: 'Actor id is required.' });
  if (nodeId && !nodeIds.has(nodeId)) {
    issues.push({ path: `actors[${index}].nodeId`, message: `Actor node "${nodeId}" does not match a node.` });
  }

  const maxHealth = asNonNegativeNumber(value.maxHealth, asNonNegativeNumber(value.health, 1));
  const health = Math.min(asNonNegativeNumber(value.health, maxHealth), maxHealth);
  const maxAp = asNonNegativeNumber(value.maxAp, 2);
  const maxMp = asNonNegativeNumber(value.maxMp, 3);
  const turnFlags = normalizeTurnFlags(value.turnFlags);
  const mpCeiling = maxMp + (turnFlags?.movementBoost ?? 0);
  const maxSystemIntegrity =
    value.maxSystemIntegrity == null && value.systemIntegrity == null
      ? undefined
      : asNonNegativeNumber(value.maxSystemIntegrity, asNonNegativeNumber(value.systemIntegrity, 0));
  const systemIntegrity =
    maxSystemIntegrity == null
      ? undefined
      : Math.min(asNonNegativeNumber(value.systemIntegrity, maxSystemIntegrity), maxSystemIntegrity);
  const maxShield =
    value.maxShield == null && value.shield == null
      ? undefined
      : asNonNegativeNumber(value.maxShield, asNonNegativeNumber(value.shield, 0));
  const shield =
    maxShield == null
      ? undefined
      : Math.min(asNonNegativeNumber(value.shield, maxShield), maxShield);
  const durabilityDowned =
    (maxHealth > 0 && health <= 0) ||
    (maxSystemIntegrity != null && maxSystemIntegrity > 0 && systemIntegrity === 0);
  const isDowned = durabilityDowned;
  const downedAtRound =
    !isDowned || value.downedAtRound == null
      ? undefined
      : Math.max(1, Math.floor(asNonNegativeNumber(value.downedAtRound, 1)));
  const downedCountdown =
    !isDowned
      ? undefined
      : value.downedCountdown == null
        ? 3
        : Math.max(0, Math.floor(asNonNegativeNumber(value.downedCountdown, 3)));

  return {
    id,
    name,
    faction,
    nodeId,
    health,
    maxHealth,
    systemIntegrity,
    maxSystemIntegrity,
    defense: asNonNegativeNumber(value.defense, 10),
    firewall: value.firewall == null ? undefined : asNonNegativeNumber(value.firewall, 10),
    mitigation: value.mitigation == null ? undefined : asNonNegativeNumber(value.mitigation, 0),
    shield,
    maxShield,
    ap: Math.min(asNonNegativeNumber(value.ap, maxAp), maxAp),
    maxAp,
    mp: Math.min(asNonNegativeNumber(value.mp, maxMp), mpCeiling),
    maxMp,
    statusEffects: Array.isArray(value.statusEffects) ? value.statusEffects.filter((s): s is string => typeof s === 'string') : [],
    isActive: isDowned ? false : typeof value.isActive === 'boolean' ? value.isActive : false,
    isDowned,
    downedAtRound: isDowned ? downedAtRound : undefined,
    downedCountdown: isDowned ? downedCountdown : undefined,
    isCritical: isDowned && typeof value.isCritical === 'boolean' ? value.isCritical : undefined,
    turnFlags,
  };
}

function findDuplicateIds(items: Array<{ id: string }>, path: string, issues: EncounterValidationIssue[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id) continue;
    if (seen.has(item.id)) issues.push({ path, message: `Duplicate id "${item.id}".` });
    seen.add(item.id);
  }
}

function normalizeEventLog(value: unknown): EncounterLogEntry[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(isRecord)
    .map((entry, index) => ({
      id: typeof entry.id === 'string' && entry.id.trim() ? entry.id : `evt-${index + 1}`,
      type: typeof entry.type === 'string' ? entry.type : 'event',
      message: typeof entry.message === 'string' ? entry.message : '',
      round: Math.max(1, Math.floor(asNonNegativeNumber(entry.round, 1))),
      actorId: typeof entry.actorId === 'string' ? entry.actorId : undefined,
      targetActorId: typeof entry.targetActorId === 'string' ? entry.targetActorId : undefined,
    }))
    .filter((entry) => entry.message.trim().length > 0);
}

function normalizeResultSummary(value: unknown): EncounterResultSummary | undefined {
  if (!isRecord(value)) return undefined;
  return {
    outcome: typeof value.outcome === 'string' ? value.outcome : 'Encounter resolved.',
    resolvedAtRound: Math.max(1, Math.floor(asNonNegativeNumber(value.resolvedAtRound, 1))),
    survivingActors: Array.isArray(value.survivingActors) ? value.survivingActors.filter((item): item is string => typeof item === 'string') : [],
    downedActors: Array.isArray(value.downedActors) ? value.downedActors.filter((item): item is string => typeof item === 'string') : [],
    completedObjectives: Array.isArray(value.completedObjectives) ? value.completedObjectives.filter((item): item is string => typeof item === 'string') : [],
    openObjectives: Array.isArray(value.openObjectives) ? value.openObjectives.filter((item): item is string => typeof item === 'string') : [],
    clockStates: Array.isArray(value.clockStates) ? value.clockStates.filter((item): item is string => typeof item === 'string') : [],
    notes: typeof value.notes === 'string' ? value.notes : undefined,
  };
}

function normalizeObjectiveStates(
  value: unknown,
  nodeIds: Set<string>,
  legacyObjectiveCount: number,
  issues: EncounterValidationIssue[]
): EncounterObjectiveState[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const objectiveStates = value
    .filter(isRecord)
    .map((objective, index) => {
      const id = typeof objective.id === 'string' ? objective.id.trim() : '';
      const label = typeof objective.label === 'string' ? objective.label.trim() : id;
      const status =
        typeof objective.status === 'string' && OBJECTIVE_STATUSES.has(objective.status as EncounterObjectiveStatus)
          ? objective.status as EncounterObjectiveStatus
          : 'open';
      const nodeId = typeof objective.nodeId === 'string' ? objective.nodeId.trim() : undefined;
      const maxProgress = Math.max(1, Math.floor(asNonNegativeNumber(objective.maxProgress, 1)));
      const progress = Math.min(Math.floor(asNonNegativeNumber(objective.progress, 0)), maxProgress);
      const interaction =
        typeof objective.interaction === 'string' && OBJECTIVE_INTERACTIONS.has(objective.interaction as EncounterObjectiveInteraction)
          ? objective.interaction as EncounterObjectiveInteraction
          : undefined;
      const legacyObjectiveIndex =
        objective.legacyObjectiveIndex == null
          ? undefined
          : Math.floor(asNonNegativeNumber(objective.legacyObjectiveIndex, 0));

      if (!id) issues.push({ path: `objectiveStates[${index}].id`, message: 'Objective id is required.' });
      if (nodeId && !nodeIds.has(nodeId)) {
        issues.push({ path: `objectiveStates[${index}].nodeId`, message: `Objective node "${nodeId}" does not match a node.` });
      }
      if (objective.status != null && !OBJECTIVE_STATUSES.has(objective.status as EncounterObjectiveStatus)) {
        issues.push({ path: `objectiveStates[${index}].status`, message: `Unknown objective status "${String(objective.status)}".` });
      }
      if (objective.interaction != null && !OBJECTIVE_INTERACTIONS.has(objective.interaction as EncounterObjectiveInteraction)) {
        issues.push({ path: `objectiveStates[${index}].interaction`, message: `Unknown objective interaction "${String(objective.interaction)}".` });
      }
      if (legacyObjectiveIndex != null && legacyObjectiveIndex >= legacyObjectiveCount) {
        issues.push({ path: `objectiveStates[${index}].legacyObjectiveIndex`, message: `Objective index ${legacyObjectiveIndex} does not match legacy objectives.` });
      }

      return {
        id,
        label,
        status: progress >= maxProgress && status === 'open' ? 'complete' : status,
        nodeId,
        progress,
        maxProgress,
        interaction,
        apCost: objective.apCost == null ? undefined : Math.floor(asNonNegativeNumber(objective.apCost, 0)),
        legacyObjectiveIndex,
        tags: Array.isArray(objective.tags) ? objective.tags.filter((tag): tag is string => typeof tag === 'string') : undefined,
      };
    });

  findDuplicateIds(objectiveStates, 'objectiveStates', issues);
  return objectiveStates.length > 0 ? objectiveStates : undefined;
}

export function validateEncounterState(candidate: unknown): EncounterValidationResult {
  const issues: EncounterValidationIssue[] = [];

  if (!isRecord(candidate)) {
    return {
      ok: false,
      encounter: {
        active: false,
        backdropType: 'ship-corridor',
        round: 1,
        currentActorId: null,
        nodes: [],
        paths: [],
        actors: [],
        objectives: [],
        clocks: [],
      },
      issues: [{ path: 'encounter', message: 'Encounter must be an object.' }],
    };
  }

  const backdropType = typeof candidate.backdropType === 'string' && BACKDROP_TYPES.has(candidate.backdropType as BackdropType)
    ? candidate.backdropType as BackdropType
    : 'ship-corridor';
  if (candidate.backdropType != null && !BACKDROP_TYPES.has(candidate.backdropType as BackdropType)) {
    issues.push({ path: 'backdropType', message: `Unknown backdrop "${String(candidate.backdropType)}".` });
  }

  const rawNodeIds = new Set(
    Array.isArray(candidate.nodes)
      ? candidate.nodes
          .filter(isRecord)
          .map((node) => typeof node.id === 'string' ? node.id.trim() : '')
          .filter(Boolean)
      : []
  );

  const nodes = Array.isArray(candidate.nodes)
    ? candidate.nodes.map((node, index) => normalizeNode(node, index, rawNodeIds, issues)).filter((node): node is TacMapNode => Boolean(node))
    : [];
  if (!Array.isArray(candidate.nodes)) issues.push({ path: 'nodes', message: 'Nodes must be an array.' });
  findDuplicateIds(nodes, 'nodes', issues);
  const nodeIds = new Set(nodes.map((node) => node.id).filter(Boolean));

  const paths = Array.isArray(candidate.paths)
    ? candidate.paths.map((path, index) => normalizePath(path, index, nodeIds, issues)).filter((path): path is TacMapPath => Boolean(path))
    : [];
  if (!Array.isArray(candidate.paths)) issues.push({ path: 'paths', message: 'Paths must be an array.' });
  findDuplicateIds(paths, 'paths', issues);

  const actors = Array.isArray(candidate.actors)
    ? candidate.actors.map((actor, index) => normalizeActor(actor, index, nodeIds, issues)).filter((actor): actor is Actor => Boolean(actor))
    : [];
  if (!Array.isArray(candidate.actors)) issues.push({ path: 'actors', message: 'Actors must be an array.' });
  findDuplicateIds(actors, 'actors', issues);

  const explicitCurrentActorId = typeof candidate.currentActorId === 'string' ? candidate.currentActorId : null;
  const activeActorIds = actors.filter((actor) => actor.isActive).map((actor) => actor.id);
  const currentActorId = explicitCurrentActorId ?? (activeActorIds.length === 1 ? activeActorIds[0] : null);
  if (currentActorId && !actors.some((actor) => actor.id === currentActorId)) {
    issues.push({ path: 'currentActorId', message: `Current actor "${currentActorId}" does not match an actor.` });
  }
  if (currentActorId && actors.some((actor) => actor.id === currentActorId && actor.isDowned)) {
    issues.push({ path: 'currentActorId', message: `Current actor "${currentActorId}" is downed.` });
  }

  const normalizedActors = actors.map((actor) => ({
    ...actor,
    isActive: currentActorId ? actor.id === currentActorId : actor.isActive,
  }));

  const clocks = Array.isArray(candidate.clocks)
    ? candidate.clocks
        .filter(isRecord)
        .map((clock) => ({
          name: typeof clock.name === 'string' ? clock.name : 'Clock',
          current: Math.min(asNonNegativeNumber(clock.current, 0), Math.max(1, asNonNegativeNumber(clock.max, 1))),
          max: Math.max(1, asNonNegativeNumber(clock.max, 1)),
        }))
    : [];
  if (!Array.isArray(candidate.clocks)) issues.push({ path: 'clocks', message: 'Clocks must be an array.' });

  const objectives = Array.isArray(candidate.objectives) ? candidate.objectives.filter((item): item is string => typeof item === 'string') : [];
  const objectiveStates = normalizeObjectiveStates(candidate.objectiveStates, nodeIds, objectives.length, issues);

  const encounter: EncounterState = {
    active: typeof candidate.active === 'boolean' ? candidate.active : false,
    backdropType,
    round: Math.max(1, Math.floor(asNonNegativeNumber(candidate.round, 1))),
    currentActorId,
    nodes,
    paths,
    actors: normalizedActors,
    objectives,
    objectiveStates,
    clocks,
    notes: typeof candidate.notes === 'string' ? candidate.notes : undefined,
    title: typeof candidate.title === 'string' ? candidate.title : undefined,
    eventLog: normalizeEventLog(candidate.eventLog),
    resultSummary: normalizeResultSummary(candidate.resultSummary),
  };

  return issues.length > 0 ? { ok: false, encounter, issues } : { ok: true, encounter, issues: [] };
}

export function formatEncounterValidationIssues(issues: EncounterValidationIssue[]): string {
  return issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n');
}

export const normalizeEncounterState = validateEncounterState;
