import type { Actor, Clock, CoverLevel, EncounterLogEntry, EncounterObjectiveState, EncounterResultSummary, EncounterState, TacMapPath } from '../../types/game';

export interface EncounterRuleEvent {
  type: string;
  message: string;
  actorId?: string;
  targetActorId?: string;
}

export type EncounterRuleResult =
  | { ok: true; encounter: EncounterState; events: EncounterRuleEvent[] }
  | { ok: false; encounter: EncounterState; error: string; events: EncounterRuleEvent[] };

export interface LegalMove {
  nodeId: string;
  pathId: string;
  distance: number;
  status: string;
  tags: string[];
  riskTags: string[];
  isExposed: boolean;
}

export interface LegalAttackTarget {
  actorId: string;
  nodeId: string | null;
  distance: number;
}

export type AttackOutcomeBand = 'miss' | 'graze' | 'hit' | 'direct';

export interface AttackCheckContext {
  attackerId: string;
  targetActorId: string;
  attackerNodeId: string | null;
  targetNodeId: string | null;
  actorBonus: number;
  coverLevel: CoverLevel;
  coverBonus: number;
  effectiveDefense: number;
  targetScore: number;
  roll?: number;
  margin?: number;
  band?: AttackOutcomeBand;
}

interface AdjacentNode {
  nodeId: string;
  distance: number;
}

export interface PathMovementConsequence {
  riskTags: string[];
}

export interface DamageSpec {
  amount?: number;
  track?: 'health' | 'systemIntegrity';
  ignoreMitigation?: boolean;
  ignoreShield?: boolean;
  health?: number;
  systemIntegrity?: number;
}

export interface BasicAttackSpec {
  damage: DamageSpec;
  apCost?: number;
  hit?: boolean;
  label?: string;
  actorBonus?: number;
  roll?: number;
}

const DOWNED_COUNTDOWN_START = 3;
const CLOSED_PATH_STATUSES = new Set(['locked', 'blocked', 'hidden', 'jammed']);
const PATH_RISK_TAGS = new Set(['exposed', 'watched', 'suppressed', 'electrified', 'smoke', 'obscured', 'sensor-watched']);

function cloneEncounter(encounter: EncounterState): EncounterState {
  return JSON.parse(JSON.stringify(encounter)) as EncounterState;
}

function ok(encounter: EncounterState, event: EncounterRuleEvent): EncounterRuleResult {
  return { ok: true, encounter, events: [event] };
}

function fail(encounter: EncounterState, error: string): EncounterRuleResult {
  return { ok: false, encounter, error, events: [] };
}

export function appendEncounterEvents(encounter: EncounterState, events: EncounterRuleEvent[]): EncounterState {
  if (events.length === 0) return encounter;
  const existing = encounter.eventLog ?? [];
  const entries: EncounterLogEntry[] = events.map((event, index) => ({
    id: `evt-${existing.length + index + 1}`,
    type: event.type,
    message: event.message,
    round: encounter.round,
    actorId: event.actorId,
    targetActorId: event.targetActorId,
  }));
  return {
    ...encounter,
    eventLog: [...existing, ...entries],
  };
}

function findActor(encounter: EncounterState, actorId: string): Actor | undefined {
  return encounter.actors.find((actor) => actor.id === actorId);
}

function updateActor(encounter: EncounterState, actorId: string, updater: (actor: Actor) => Actor): EncounterState {
  return {
    ...encounter,
    actors: encounter.actors.map((actor) => (actor.id === actorId ? updater(actor) : actor)),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getActorMpCeiling(actor: Actor): number {
  return actor.maxMp + (actor.turnFlags?.movementBoost ?? 0);
}

function findPathsBetweenNodes(encounter: EncounterState, fromNodeId: string | null, toNodeId: string): TacMapPath[] {
  if (!fromNodeId) return [];
  return encounter.paths.filter(
    (path) =>
      (path.fromId === fromNodeId && path.toId === toNodeId) ||
      (path.toId === fromNodeId && path.fromId === toNodeId)
  );
}

export function getPathAccess(path: TacMapPath): 'open' | 'closed' {
  const status = (path.status ?? 'open').trim().toLowerCase();
  return CLOSED_PATH_STATUSES.has(status) ? 'closed' : 'open';
}

export function getPathRiskTags(path: TacMapPath): string[] {
  const risks = new Set<string>();
  for (const tag of path.tags ?? []) {
    const risk = tag.trim().toLowerCase();
    if (PATH_RISK_TAGS.has(risk)) risks.add(risk);
  }
  const statusRisk = (path.status ?? '').trim().toLowerCase();
  if (PATH_RISK_TAGS.has(statusRisk)) risks.add(statusRisk);
  return [...risks];
}

export function isPathTraversable(path: TacMapPath): boolean {
  return getPathAccess(path) === 'open';
}

export function getPathMovementConsequence(path: TacMapPath): PathMovementConsequence {
  return {
    riskTags: getPathRiskTags(path),
  };
}

function applyDownedState(actor: Actor, isDowned: boolean, round: number): Actor {
  if (!isDowned) {
    return {
      ...actor,
      isDowned: false,
      downedAtRound: undefined,
      downedCountdown: undefined,
      isCritical: undefined,
    };
  }

  return {
    ...actor,
    isActive: false,
    isDowned: true,
    downedAtRound: actor.downedAtRound ?? round,
    downedCountdown: actor.downedCountdown ?? DOWNED_COUNTDOWN_START,
  };
}

function clearCurrentActorIfDowned(encounter: EncounterState): EncounterState {
  const currentActor = encounter.actors.find((actor) => actor.id === encounter.currentActorId);
  if (!currentActor?.isDowned) return encounter;
  return {
    ...encounter,
    currentActorId: null,
    actors: encounter.actors.map((actor) => ({ ...actor, isActive: false })),
  };
}

function markLegacyObjective(encounter: EncounterState, objective: EncounterObjectiveState, done: boolean): string[] {
  if (objective.legacyObjectiveIndex == null) return encounter.objectives;
  const current = encounter.objectives[objective.legacyObjectiveIndex];
  if (current == null) return encounter.objectives;
  const donePrefix = '[done] ';
  const clean = current.startsWith(donePrefix) ? current.slice(donePrefix.length) : current;
  return encounter.objectives.map((candidate, index) =>
    index === objective.legacyObjectiveIndex ? `${done ? donePrefix : ''}${clean}` : candidate
  );
}

function tickDownedCountdown(actor: Actor): { actor: Actor; event?: EncounterRuleEvent } {
  if (!actor.isDowned || actor.isCritical) return { actor };
  const currentCountdown = actor.downedCountdown ?? DOWNED_COUNTDOWN_START;
  const nextCountdown = clamp(currentCountdown - 1, 0, DOWNED_COUNTDOWN_START);
  const nextActor: Actor = {
    ...actor,
    downedCountdown: nextCountdown,
    isCritical: nextCountdown <= 0 ? true : actor.isCritical,
  };
  return {
    actor: nextActor,
    event: nextActor.isCritical && !actor.isCritical
      ? { type: 'actor.critical', message: `${actor.name} reaches critical state.`, actorId: actor.id }
      : { type: 'actor.downed_countdown', message: `${actor.name} downed countdown is ${nextCountdown}.`, actorId: actor.id },
  };
}

const COVER_DEFENSE_BONUS: Record<CoverLevel, number> = {
  none: 0,
  half: 20,
  full: 40,
};

function clampD100(roll: number): number {
  return clamp(Math.floor(roll), 1, 100);
}

function areHostile(a: Actor, b: Actor): boolean {
  const crewSide = new Set(['player', 'ally']);
  const enemySide = new Set(['enemy', 'elite-enemy']);
  return (
    (crewSide.has(a.faction) && enemySide.has(b.faction)) ||
    (enemySide.has(a.faction) && (crewSide.has(b.faction) || b.faction === 'npc'))
  );
}

function getAdjacentOpenNodes(encounter: EncounterState, actor: Actor): AdjacentNode[] {
  if (!actor.nodeId) return [];
  return encounter.paths
    .filter((path) => {
      return isPathTraversable(path) && (path.fromId === actor.nodeId || path.toId === actor.nodeId);
    })
    .map((path) => ({
      nodeId: path.fromId === actor.nodeId ? path.toId : path.fromId,
      distance: Math.max(0, Math.floor(path.distance)),
    }));
}

export function getLegalMoves(encounter: EncounterState, actorId: string): LegalMove[] {
  const actor = findActor(encounter, actorId);
  if (!actor?.nodeId || actor.isDowned) return [];

  return encounter.paths.flatMap((path) => {
    const status = path.status ?? 'open';
    if (!isPathTraversable(path) || (path.fromId !== actor.nodeId && path.toId !== actor.nodeId)) return [];
    const distance = Math.max(0, Math.floor(path.distance));
    if (distance > actor.mp) return [];
    const riskTags = getPathRiskTags(path);
    return [{
      nodeId: path.fromId === actor.nodeId ? path.toId : path.fromId,
      pathId: path.id,
      distance,
      status,
      tags: path.tags ?? [],
      riskTags,
      isExposed: riskTags.includes('exposed'),
    }];
  });
}

export function getBasicAttackTargets(encounter: EncounterState, attackerId: string): LegalAttackTarget[] {
  const attacker = findActor(encounter, attackerId);
  if (!encounter.active || !attacker?.nodeId || attacker.isDowned) return [];

  const adjacent = new Map<string, number>();
  adjacent.set(attacker.nodeId, 0);
  for (const adjacentNode of getAdjacentOpenNodes(encounter, attacker)) {
    adjacent.set(adjacentNode.nodeId, adjacentNode.distance);
  }

  return encounter.actors
    .filter((actor) =>
      actor.id !== attackerId &&
      !actor.isDowned &&
      actor.nodeId != null &&
      adjacent.has(actor.nodeId) &&
      areHostile(attacker, actor)
    )
    .map((actor) => ({
      actorId: actor.id,
      nodeId: actor.nodeId,
      distance: actor.nodeId ? adjacent.get(actor.nodeId) ?? 0 : 0,
    }));
}

export function getRelativeCoverLevel(
  encounter: EncounterState,
  attackerId: string,
  targetActorId: string
): CoverLevel {
  const attacker = findActor(encounter, attackerId);
  const target = findActor(encounter, targetActorId);
  if (!attacker?.nodeId || !target?.nodeId || attacker.nodeId === target.nodeId) return 'none';
  const targetNode = encounter.nodes.find((node) => node.id === target.nodeId);
  return targetNode?.coverEdges?.find((edge) => edge.fromNodeId === attacker.nodeId)?.level ?? 'none';
}

export function resolveLatticeAttackBand(targetScore: number, roll: number): {
  roll: number;
  margin: number;
  band: AttackOutcomeBand;
} {
  const normalizedRoll = clampD100(roll);
  const margin = targetScore - normalizedRoll;
  if (margin < 0) return { roll: normalizedRoll, margin, band: 'miss' };
  if (margin <= 9) return { roll: normalizedRoll, margin, band: 'graze' };
  if (margin <= 69) return { roll: normalizedRoll, margin, band: 'hit' };
  return { roll: normalizedRoll, margin, band: 'direct' };
}

export function buildAttackCheckContext(
  encounter: EncounterState,
  attackerId: string,
  targetActorId: string,
  actorBonus = 0,
  roll?: number
): AttackCheckContext {
  const attacker = findActor(encounter, attackerId);
  const target = findActor(encounter, targetActorId);
  const coverLevel = getRelativeCoverLevel(encounter, attackerId, targetActorId);
  const coverBonus = COVER_DEFENSE_BONUS[coverLevel];
  const effectiveDefense = (target?.defense ?? 0) + coverBonus;
  const cleanActorBonus = Number.isFinite(actorBonus) ? Math.floor(actorBonus) : 0;
  const targetScore = 50 + cleanActorBonus - (effectiveDefense - 15);
  const resolved = roll == null ? undefined : resolveLatticeAttackBand(targetScore, roll);

  return {
    attackerId,
    targetActorId,
    attackerNodeId: attacker?.nodeId ?? null,
    targetNodeId: target?.nodeId ?? null,
    actorBonus: cleanActorBonus,
    coverLevel,
    coverBonus,
    effectiveDefense,
    targetScore,
    roll: resolved?.roll,
    margin: resolved?.margin,
    band: resolved?.band,
  };
}

export function moveActor(encounter: EncounterState, actorId: string, toNodeId: string, pathId?: string): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (current.currentActorId !== actorId) return fail(current, `${actor.name} is not the current actor.`);
  if (actor.isDowned) return fail(current, `${actor.name} is downed and cannot move.`);
  if (!current.nodes.some((node) => node.id === toNodeId)) return fail(current, `Node "${toNodeId}" was not found.`);
  if (actor.nodeId === toNodeId) return ok(current, { type: 'move.noop', message: `${actor.name} holds position.` });

  const directPaths = findPathsBetweenNodes(current, actor.nodeId, toNodeId);
  const candidatePaths = pathId ? directPaths.filter((path) => path.id === pathId) : directPaths;
  if (pathId && candidatePaths.length === 0) {
    return fail(current, `Path "${pathId}" does not connect ${actor.nodeId ?? 'nowhere'} to "${toNodeId}".`);
  }

  const move = getLegalMoves(current, actorId).find((candidate) =>
    candidate.nodeId === toNodeId && (!pathId || candidate.pathId === pathId)
  );
  const path = move ? current.paths.find((candidate) => candidate.id === move.pathId) : undefined;
  if (!move || !path) {
    if (candidatePaths.length === 0) return fail(current, `${actor.name} cannot move directly to "${toNodeId}".`);

    const traversablePaths = candidatePaths.filter(isPathTraversable);
    if (traversablePaths.length > 0) {
      const cheapestDistance = Math.min(...traversablePaths.map((candidate) => Math.max(0, Math.floor(candidate.distance))));
      return fail(current, `${actor.name} needs ${cheapestDistance} MP and has ${actor.mp}.`);
    }

    const blockedPath = candidatePaths[0];
    return fail(current, `${actor.name} cannot use "${blockedPath.id}"; path is ${blockedPath.status}.`);
  }

  const consequence = getPathMovementConsequence(path);
  const updated = updateActor(current, actorId, (a) => ({
    ...a,
    nodeId: toNodeId,
    mp: clamp(a.mp - move.distance, 0, getActorMpCeiling(a)),
  }));
  const node = updated.nodes.find((candidate) => candidate.id === toNodeId);
  const events: EncounterRuleEvent[] = [
    { type: 'actor.moved', message: `${actor.name} moved to ${node?.label ?? toNodeId}.`, actorId },
  ];
  for (const risk of consequence.riskTags) {
    events.push({
      type: `path.${risk}_crossed`,
      message: `${actor.name} crossed ${path.id} (${risk}).`,
      actorId,
    });
  }

  return { ok: true, encounter: updated, events };
}

export function setPathStatus(encounter: EncounterState, pathId: string, status = 'open'): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const path = current.paths.find((candidate) => candidate.id === pathId);
  if (!path) return fail(current, `Path "${pathId}" was not found.`);

  const cleanStatus = status.trim().toLowerCase() || 'open';
  const nextStatus = cleanStatus === 'open' ? undefined : cleanStatus;
  const updated: EncounterState = {
    ...current,
    paths: current.paths.map((candidate) =>
      candidate.id === pathId
        ? {
            ...candidate,
            status: nextStatus,
          }
        : candidate
    ),
  };

  return ok(updated, {
    type: 'path.status_set',
    message: `${path.id} is now ${nextStatus ?? 'open'}.`,
  });
}

export function setCurrentActor(encounter: EncounterState, actorId: string): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (actor.isDowned) return fail(current, `${actor.name} is downed and cannot take the active turn.`);

  return ok(
    {
      ...current,
      currentActorId: actorId,
      actors: current.actors.map((candidate) => ({
        ...candidate,
        isActive: candidate.id === actorId,
        ap: candidate.id === actorId ? candidate.maxAp : candidate.ap,
        mp: candidate.id === actorId ? candidate.maxMp : candidate.mp,
        turnFlags: candidate.id === actorId ? undefined : candidate.turnFlags,
      })),
    },
    { type: 'turn.set', message: `${actor.name} is now active.`, actorId }
  );
}

export function advanceTurn(encounter: EncounterState): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  if (!current.active) return fail(current, 'Encounter is not active.');
  const activeActors = current.actors.filter((actor) => !actor.isDowned);
  if (activeActors.length === 0) return fail(current, 'No active actors remain.');

  const originalCurrentIndex = current.actors.findIndex((actor) => actor.id === current.currentActorId);
  const startingIndex = originalCurrentIndex >= 0 ? originalCurrentIndex : -1;
  let nextActor: Actor | undefined;
  let wrapped = false;

  for (let offset = 1; offset <= current.actors.length; offset += 1) {
    const index = (startingIndex + offset + current.actors.length) % current.actors.length;
    const candidate = current.actors[index];
    if (!candidate.isDowned) {
      nextActor = candidate;
      wrapped = index <= startingIndex && originalCurrentIndex >= 0;
      break;
    }
  }

  if (!nextActor) return fail(current, 'No active actors remain.');
  const nextRound = wrapped && current.currentActorId ? current.round + 1 : current.round;

  const countdownEvents: EncounterRuleEvent[] = [];
  const updatedActors = current.actors.map((actor) => ({
      ...actor,
      isActive: actor.id === nextActor.id,
      ap: actor.id === nextActor.id ? actor.maxAp : actor.ap,
      mp: actor.id === nextActor.id ? actor.maxMp : actor.mp,
      turnFlags: actor.id === nextActor.id ? undefined : actor.turnFlags,
    }));
  const actors =
    nextRound > current.round
      ? updatedActors.map((actor) => {
          const ticked = tickDownedCountdown(actor);
          if (ticked.event) countdownEvents.push(ticked.event);
          return ticked.actor;
        })
      : updatedActors;

  const updated: EncounterState = {
    ...current,
    round: nextRound,
    currentActorId: nextActor.id,
    actors,
  };

  return {
    ok: true,
    encounter: updated,
    events: [
      { type: 'turn.advanced', message: `Turn advanced to ${nextActor.name}.`, actorId: nextActor.id },
      ...countdownEvents,
    ],
  };
}

export function setActorResource(
  encounter: EncounterState,
  actorId: string,
  resource: 'health' | 'systemIntegrity' | 'ap' | 'mp' | 'shield',
  value: number
): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);

  const updated = updateActor(current, actorId, (a) => {
    if (resource === 'health') {
      const health = clamp(value, 0, a.maxHealth);
      const downed = health <= 0 || (a.maxSystemIntegrity != null && a.maxSystemIntegrity > 0 && (a.systemIntegrity ?? 0) <= 0);
      return applyDownedState({ ...a, health }, downed, current.round);
    }
    if (resource === 'systemIntegrity') {
      const maxSystemIntegrity = a.maxSystemIntegrity ?? Math.max(value, a.systemIntegrity ?? 0, 0);
      const systemIntegrity = clamp(value, 0, maxSystemIntegrity);
      const downed = a.health <= 0 || (maxSystemIntegrity > 0 && systemIntegrity <= 0);
      return applyDownedState({ ...a, systemIntegrity, maxSystemIntegrity }, downed, current.round);
    }
    if (resource === 'ap') return { ...a, ap: clamp(value, 0, a.maxAp) };
    if (resource === 'mp') return { ...a, mp: clamp(value, 0, getActorMpCeiling(a)) };
    const maxShield = a.maxShield ?? Math.max(value, a.shield ?? 0, 0);
    return { ...a, shield: clamp(value, 0, maxShield), maxShield };
  });

  return ok(clearCurrentActorIfDowned(updated), { type: 'actor.resource_set', message: `${actor.name} ${resource} set to ${value}.`, actorId });
}

export function editActorResource(
  encounter: EncounterState,
  actorId: string,
  resource: 'health' | 'systemIntegrity' | 'ap' | 'mp' | 'shield',
  delta: number
): EncounterRuleResult {
  const actor = findActor(encounter, actorId);
  if (!actor) return fail(cloneEncounter(encounter), `Actor "${actorId}" was not found.`);
  const current = resource === 'systemIntegrity' ? actor.systemIntegrity ?? 0 : actor[resource] ?? 0;
  return setActorResource(encounter, actorId, resource, current + delta);
}

export function spendActionPoints(encounter: EncounterState, actorId: string, amount: number): EncounterRuleResult {
  return spendActorResource(encounter, actorId, 'ap', amount);
}

export function spendMovementPoints(encounter: EncounterState, actorId: string, amount: number): EncounterRuleResult {
  return spendActorResource(encounter, actorId, 'mp', amount);
}

export function dashActor(encounter: EncounterState, actorId: string, apCost = 1, movementBoost = 3): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (current.currentActorId !== actorId) return fail(current, `${actor.name} is not the current actor.`);
  if (actor.isDowned) return fail(current, `${actor.name} is downed and cannot dash.`);
  if (actor.turnFlags?.dashed) return fail(current, `${actor.name} already dashed this activation.`);

  const cost = Math.max(0, Math.floor(apCost));
  const boost = Math.max(0, Math.floor(movementBoost));
  if (actor.ap < cost) return fail(current, `${actor.name} needs ${cost} AP and has ${actor.ap}.`);
  if (boost <= 0) return fail(current, 'Dash movement boost must be positive.');

  const updated = updateActor(current, actorId, (a) => {
    const nextMovementBoost = (a.turnFlags?.movementBoost ?? 0) + boost;
    return {
      ...a,
      ap: clamp(a.ap - cost, 0, a.maxAp),
      mp: clamp(a.mp + boost, 0, a.maxMp + nextMovementBoost),
      turnFlags: {
        ...a.turnFlags,
        dashed: true,
        movementBoost: nextMovementBoost,
      },
    };
  });

  return ok(updated, {
    type: 'actor.dashed',
    message: `${actor.name} dashed for +${boost} MP.`,
    actorId,
  });
}

export function guardActor(encounter: EncounterState, actorId: string, apCost = 1): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (current.currentActorId !== actorId) return fail(current, `${actor.name} is not the current actor.`);
  if (actor.isDowned) return fail(current, `${actor.name} is downed and cannot guard.`);

  const cost = Math.max(0, Math.floor(apCost));
  if (actor.ap < cost) return fail(current, `${actor.name} needs ${cost} AP and has ${actor.ap}.`);

  const updated = updateActor(current, actorId, (a) => ({
    ...a,
    ap: clamp(a.ap - cost, 0, a.maxAp),
    turnFlags: {
      ...a.turnFlags,
      defending: true,
    },
  }));

  return ok(updated, {
    type: 'actor.guarded',
    message: `${actor.name} guards themself.`,
    actorId,
  });
}

export function useMicroInteraction(encounter: EncounterState, actorId: string, label = 'uses a micro-interaction'): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (current.currentActorId !== actorId) return fail(current, `${actor.name} is not the current actor.`);
  if (actor.isDowned) return fail(current, `${actor.name} is downed and cannot use a micro-interaction.`);
  if (actor.turnFlags?.microInteracted) return fail(current, `${actor.name} already used a micro-interaction this activation.`);

  const cleanLabel = label.trim() || 'uses a micro-interaction';
  const updated = updateActor(current, actorId, (a) => ({
    ...a,
    turnFlags: {
      ...a.turnFlags,
      microInteracted: true,
    },
  }));

  return ok(updated, {
    type: 'actor.micro_interaction',
    message: `${actor.name} ${cleanLabel}.`,
    actorId,
  });
}

export function interactWithObjective(encounter: EncounterState, actorId: string, objectiveId: string): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  const objective = current.objectiveStates?.find((candidate) => candidate.id === objectiveId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!objective) return fail(current, `Objective "${objectiveId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (current.currentActorId !== actorId) return fail(current, `${actor.name} is not the current actor.`);
  if (actor.isDowned) return fail(current, `${actor.name} is downed and cannot work the objective.`);
  if (objective.status !== 'open') return fail(current, `${objective.label} is already ${objective.status}.`);
  if (!objective.nodeId) return fail(current, `${objective.label} is not directly interactable from a TacMap node.`);
  if (actor.nodeId !== objective.nodeId) return fail(current, `${actor.name} must be at ${objective.nodeId} to work ${objective.label}.`);

  const interaction = objective.interaction ?? 'action';
  const apCost = Math.max(0, Math.floor(objective.apCost ?? (interaction === 'action' ? 1 : 0)));
  if (interaction === 'micro' && actor.turnFlags?.microInteracted) {
    return fail(current, `${actor.name} already used a micro-interaction this activation.`);
  }
  if (interaction === 'action' && actor.ap < apCost) {
    return fail(current, `${actor.name} needs ${apCost} AP and has ${actor.ap}.`);
  }

  const updated: EncounterState = {
    ...current,
    actors: current.actors.map((candidate) => {
      if (candidate.id !== actorId) return candidate;
      return {
        ...candidate,
        ap: interaction === 'action' ? clamp(candidate.ap - apCost, 0, candidate.maxAp) : candidate.ap,
        turnFlags: interaction === 'micro'
          ? { ...candidate.turnFlags, microInteracted: true }
          : candidate.turnFlags,
      };
    }),
    objectiveStates: current.objectiveStates?.map((candidate) => {
      if (candidate.id !== objectiveId) return candidate;
      const progress = clamp(candidate.progress + 1, 0, candidate.maxProgress);
      const nextObjective: EncounterObjectiveState = {
        ...candidate,
        progress,
        status: progress >= candidate.maxProgress ? 'complete' : candidate.status,
      };
      return nextObjective;
    }),
  };

  const completedObjective =
    updated.objectiveStates?.find((candidate) => candidate.id === objectiveId && candidate.status === 'complete') ?? null;
  const synced = completedObjective
    ? { ...updated, objectives: markLegacyObjective(updated, completedObjective, true) }
    : updated;

  return ok(synced, {
    type: completedObjective ? 'objective.completed' : 'objective.progressed',
    message: completedObjective
      ? `${actor.name} completed ${completedObjective.label}.`
      : `${actor.name} progressed ${objective.label}.`,
    actorId,
  });
}

export function endActorTurn(encounter: EncounterState, actorId: string): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (current.currentActorId !== actorId) return fail(current, `${actor.name} is not the current actor.`);

  const advanced = advanceTurn(current);
  if (!advanced.ok) return advanced;
  return {
    ok: true,
    encounter: advanced.encounter,
    events: [
      { type: 'turn.ended', message: `${actor.name} ends their turn.`, actorId },
      ...advanced.events,
    ],
  };
}

function spendActorResource(
  encounter: EncounterState,
  actorId: string,
  resource: 'ap' | 'mp',
  amount: number
): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  if (!Number.isFinite(amount) || amount < 0) return fail(current, `${resource.toUpperCase()} spend must be non-negative.`);
  if (actor[resource] < amount) return fail(current, `${actor.name} has ${actor[resource]} ${resource.toUpperCase()} and needs ${amount}.`);
  return setActorResource(current, actorId, resource, actor[resource] - amount);
}

export function setActorStatus(encounter: EncounterState, actorId: string, statusEffects: string[]): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, actorId);
  if (!actor) return fail(current, `Actor "${actorId}" was not found.`);
  const cleaned = Array.from(new Set(statusEffects.map((status) => status.trim()).filter(Boolean)));
  const updated = updateActor(current, actorId, (a) => ({ ...a, statusEffects: cleaned }));
  return ok(updated, { type: 'actor.status_set', message: `${actor.name} status updated.`, actorId });
}

export function applyDamage(encounter: EncounterState, targetActorId: string, damage: DamageSpec): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const actor = findActor(current, targetActorId);
  if (!actor) return fail(current, `Actor "${targetActorId}" was not found.`);

  const mitigation = damage.ignoreMitigation ? 0 : actor.mitigation ?? 0;
  const defaultTrack = actor.maxHealth > 0 ? 'health' : 'systemIntegrity';
  const requestedHealthDamage =
    (damage.track ?? defaultTrack) === 'health' ? damage.amount ?? damage.health ?? 0 : damage.health ?? 0;
  const requestedSystemDamage =
    (damage.track ?? defaultTrack) === 'systemIntegrity'
      ? damage.amount ?? damage.systemIntegrity ?? 0
      : damage.systemIntegrity ?? 0;

  const updated = updateActor(current, targetActorId, (a) => {
    let shield = a.shield ?? 0;
    let remainingHealthDamage = Math.max(0, Math.floor(requestedHealthDamage));
    let remainingSystemDamage = Math.max(0, Math.floor(requestedSystemDamage));

    if (!damage.ignoreShield && shield > 0) {
      const shieldAgainstHealth = Math.min(shield, remainingHealthDamage);
      shield -= shieldAgainstHealth;
      remainingHealthDamage -= shieldAgainstHealth;

      const shieldAgainstSystem = Math.min(shield, remainingSystemDamage);
      shield -= shieldAgainstSystem;
      remainingSystemDamage -= shieldAgainstSystem;
    }

    const healthDamage = Math.max(0, remainingHealthDamage - mitigation);
    const systemDamage = Math.max(0, remainingSystemDamage - mitigation);
    const health = clamp(a.health - healthDamage, 0, a.maxHealth);
    const maxSystemIntegrity = a.maxSystemIntegrity ?? a.systemIntegrity ?? 0;
    const systemIntegrity =
      a.systemIntegrity == null ? undefined : clamp(a.systemIntegrity - systemDamage, 0, maxSystemIntegrity);
    return applyDownedState({
      ...a,
      shield: a.shield == null ? undefined : shield,
      health,
      systemIntegrity,
    }, health <= 0 || (systemIntegrity != null && maxSystemIntegrity > 0 && systemIntegrity <= 0), current.round);
  });

  return ok(clearCurrentActorIfDowned(updated), {
    type: 'actor.damage_applied',
    message: `${actor.name} took damage.`,
    targetActorId,
  });
}

export function performBasicAttack(
  encounter: EncounterState,
  attackerId: string,
  targetActorId: string,
  spec: BasicAttackSpec
): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  const attacker = findActor(current, attackerId);
  const target = findActor(current, targetActorId);
  if (!attacker) return fail(current, `Attacker "${attackerId}" was not found.`);
  if (!target) return fail(current, `Target "${targetActorId}" was not found.`);
  if (!current.active) return fail(current, 'Encounter is not active.');
  if (current.currentActorId !== attackerId) return fail(current, `${attacker.name} is not the current actor.`);
  if (attacker.isDowned) return fail(current, `${attacker.name} is downed and cannot attack.`);
  if (target.isDowned) return fail(current, `${target.name} is already downed.`);
  if (attackerId === targetActorId) return fail(current, `${attacker.name} cannot target themself.`);
  if (attacker.turnFlags?.attacked) return fail(current, `${attacker.name} already made an offensive attack this activation.`);
  if (attacker.turnFlags?.dashed) return fail(current, `${attacker.name} dashed and cannot make an offensive attack later this activation.`);
  if (!getBasicAttackTargets(current, attackerId).some((candidate) => candidate.actorId === targetActorId)) {
    return fail(current, `${target.name} is not a legal target for ${attacker.name}.`);
  }

  const apCost = Math.max(0, Math.floor(spec.apCost ?? 1));
  if (attacker.ap < apCost) return fail(current, `${attacker.name} needs ${apCost} AP and has ${attacker.ap}.`);
  const attackContext = buildAttackCheckContext(current, attackerId, targetActorId, spec.actorBonus, spec.roll);
  const attackConnects = spec.hit ?? (attackContext.roll == null ? true : attackContext.band !== 'miss');
  const eventBand: AttackOutcomeBand =
    spec.hit === true
      ? attackContext.band === 'direct' ? 'direct' : 'hit'
      : spec.hit === false
        ? 'miss'
        : attackContext.band ?? 'hit';
  const forcedOutcome =
    spec.hit === true && attackContext.band === 'miss'
      ? 'hit'
      : spec.hit === false && attackContext.band != null && attackContext.band !== 'miss'
        ? 'miss'
        : undefined;

  const afterSpend = updateActor(current, attackerId, (actor) => ({
    ...actor,
    ap: clamp(actor.ap - apCost, 0, actor.maxAp),
    turnFlags: {
      ...actor.turnFlags,
      attacked: true,
    },
  }));

  if (!attackConnects) {
    return {
      ok: true,
      encounter: afterSpend,
      events: [
        {
          type: 'attack.miss',
          message: formatAttackEventMessage(attacker.name, spec.label ?? 'attacks', target.name, attackContext, eventBand, forcedOutcome),
          actorId: attackerId,
          targetActorId,
        },
      ],
    };
  }

  const damageResult = applyDamage(afterSpend, targetActorId, spec.damage);
  if (!damageResult.ok) return damageResult;
  return {
    ok: true,
    encounter: damageResult.encounter,
    events: [
      {
        type: 'attack.hit',
        message: formatAttackEventMessage(attacker.name, spec.label ?? 'attacks', target.name, attackContext, eventBand, forcedOutcome),
        actorId: attackerId,
        targetActorId,
      },
      ...damageResult.events,
    ],
  };
}

function formatAttackEventMessage(
  attackerName: string,
  label: string,
  targetName: string,
  context: AttackCheckContext,
  band: AttackOutcomeBand,
  forcedOutcome?: 'hit' | 'miss'
): string {
  const rollText =
    context.roll == null
      ? ''
      : forcedOutcome
        ? ` [forced ${forcedOutcome}; roll ${context.roll} vs TS ${context.targetScore} would ${context.band ?? 'resolve'}${context.coverLevel !== 'none' ? `, ${context.coverLevel} cover` : ''}]`
        : ` [roll ${context.roll} vs TS ${context.targetScore}, ${band}${context.coverLevel !== 'none' ? `, ${context.coverLevel} cover` : ''}]`;
  return band === 'miss'
    ? `${attackerName} ${label} ${targetName} and misses.${rollText}`
    : `${attackerName} ${label} ${targetName}.${rollText}`;
}

export function tickClock(encounter: EncounterState, clockName: string, amount: number): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  if (!current.active) return fail(current, 'Encounter is not active.');
  const index = current.clocks.findIndex((clock) => clock.name === clockName);
  if (index < 0) return fail(current, `Clock "${clockName}" was not found.`);
  const clock = current.clocks[index];
  const nextClock: Clock = { ...clock, current: clamp(clock.current + amount, 0, clock.max) };
  const clocks = current.clocks.map((candidate, i) => (i === index ? nextClock : candidate));
  return ok({ ...current, clocks }, { type: 'clock.ticked', message: `${clock.name} is now ${nextClock.current}/${nextClock.max}.` });
}

export function toggleObjectiveDone(encounter: EncounterState, objectiveIndex: number): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  if (!current.active) return fail(current, 'Encounter is not active.');
  const objective = current.objectives[objectiveIndex];
  if (objective == null) return fail(current, `Objective ${objectiveIndex + 1} was not found.`);
  const donePrefix = '[done] ';
  const nextObjective = objective.startsWith(donePrefix)
    ? objective.slice(donePrefix.length)
    : `${donePrefix}${objective}`;
  return ok(
    {
      ...current,
      objectives: current.objectives.map((candidate, index) => (index === objectiveIndex ? nextObjective : candidate)),
      objectiveStates: current.objectiveStates?.map((candidate) =>
        candidate.legacyObjectiveIndex === objectiveIndex
          ? { ...candidate, status: nextObjective.startsWith(donePrefix) ? 'complete' : 'open' }
          : candidate
      ),
    },
    { type: 'objective.toggled', message: `Objective ${objectiveIndex + 1} ${nextObjective.startsWith(donePrefix) ? 'marked done' : 'reopened'}.` }
  );
}

export function buildEncounterResultSummary(encounter: EncounterState, resultNote?: string): EncounterResultSummary {
  const donePrefix = '[done] ';
  const completedObjectives = encounter.objectives
    .filter((objective) => objective.startsWith(donePrefix))
    .map((objective) => objective.slice(donePrefix.length));
  const openObjectives = encounter.objectives
    .filter((objective) => !objective.startsWith(donePrefix));
  const survivingActors = encounter.actors
    .filter((actor) => !actor.isDowned)
    .map((actor) => actor.name);
  const downedActors = encounter.actors
    .filter((actor) => actor.isDowned)
    .map((actor) => actor.name);
  const clockStates = encounter.clocks.map((clock) => `${clock.name}: ${clock.current}/${clock.max}`);
  const notes = resultNote?.trim() || encounter.notes;

  return {
    outcome: notes || 'Encounter resolved.',
    resolvedAtRound: encounter.round,
    survivingActors,
    downedActors,
    completedObjectives,
    openObjectives,
    clockStates,
    notes,
  };
}

export function formatEncounterResultForScene(summary: EncounterResultSummary): string {
  const lines = [
    `Encounter result: ${summary.outcome}`,
    `Resolved at round ${summary.resolvedAtRound}.`,
  ];
  if (summary.completedObjectives.length > 0) {
    lines.push(`Completed: ${summary.completedObjectives.join('; ')}.`);
  }
  if (summary.openObjectives.length > 0) {
    lines.push(`Open: ${summary.openObjectives.join('; ')}.`);
  }
  if (summary.downedActors.length > 0) {
    lines.push(`Downed: ${summary.downedActors.join(', ')}.`);
  }
  if (summary.clockStates.length > 0) {
    lines.push(`Clocks: ${summary.clockStates.join('; ')}.`);
  }
  return lines.join('\n');
}

export function resolveEncounter(encounter: EncounterState, resultNote?: string): EncounterRuleResult {
  const current = cloneEncounter(encounter);
  if (!current.active) return fail(current, 'Encounter is not active.');
  const resultSummary = buildEncounterResultSummary(current, resultNote);
  return ok(
    {
      ...current,
      active: false,
      currentActorId: null,
      actors: current.actors.map((actor) => ({ ...actor, isActive: false })),
      notes: resultSummary.outcome,
      title: current.title ? `${current.title} - Resolved` : 'Encounter Resolved',
      resultSummary,
    },
    { type: 'encounter.resolved', message: resultSummary.outcome }
  );
}
