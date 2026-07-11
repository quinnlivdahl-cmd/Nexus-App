import { cloneEncounterFixture } from '../../data/encounterFixtures';
import type { EncounterState } from '../../types/game';
import {
  advanceTurn,
  applyDamage,
  appendEncounterEvents,
  dashActor,
  endActorTurn,
  editActorResource,
  guardActor,
  interactWithObjective,
  isPathTraversable,
  moveActor,
  performBasicAttack,
  resolveEncounter,
  setActorResource,
  setActorStatus,
  setPathStatus,
  spendActionPoints,
  spendMovementPoints,
  tickClock,
  toggleObjectiveDone,
  useMicroInteraction,
  type DamageSpec,
  type BasicAttackSpec,
  type EncounterRuleEvent,
  type EncounterRuleResult,
} from './encounterRules';
import { validateEncounterState } from './validateEncounter';

export interface EncounterSimulationSummary {
  ok: boolean;
  events: string[];
  finalRound?: number;
  activeActorId?: string | null;
  error?: string;
}

export type EncounterSimulationStep =
  | { type: 'move'; actorId: string; toNodeId: string; pathId?: string }
  | { type: 'setPathStatus'; pathId: string; status?: string }
  | { type: 'dash'; actorId: string; apCost?: number; movementBoost?: number }
  | { type: 'guard'; actorId: string; apCost?: number }
  | { type: 'microInteraction'; actorId: string; label?: string }
  | { type: 'objectiveInteraction'; actorId: string; objectiveId: string }
  | { type: 'advanceTurn' }
  | { type: 'endTurn'; actorId: string }
  | { type: 'setResource'; actorId: string; resource: 'health' | 'systemIntegrity' | 'ap' | 'mp' | 'shield'; value: number }
  | { type: 'editResource'; actorId: string; resource: 'health' | 'systemIntegrity' | 'ap' | 'mp' | 'shield'; delta: number }
  | { type: 'spendAp'; actorId: string; amount: number }
  | { type: 'spendMp'; actorId: string; amount: number }
  | { type: 'damage'; targetActorId: string; damage: DamageSpec }
  | { type: 'basicAttack'; attackerId: string; targetActorId: string; attack: BasicAttackSpec }
  | { type: 'status'; actorId: string; statusEffects: string[] }
  | { type: 'tickClock'; clockName: string; amount: number }
  | { type: 'toggleObjective'; objectiveIndex: number }
  | { type: 'resolve'; resultNote?: string };

export interface EncounterSimulationRun {
  ok: boolean;
  encounter: EncounterState;
  events: EncounterRuleEvent[];
  trace: EncounterSimulationTraceEntry[];
  failedStepIndex?: number;
  error?: string;
}

export interface EncounterSimulationStateSummary {
  active: boolean;
  round: number;
  currentActorId: string | null;
  actors: Array<{
    id: string;
    nodeId: string | null;
    health: number;
    systemIntegrity?: number;
    shield?: number;
    ap: number;
    mp: number;
    isDowned: boolean;
    turnFlags?: Record<string, boolean | number>;
    statusEffects: string[];
  }>;
  clocks: Array<{ name: string; current: number; max: number }>;
  objectives: Array<{ id: string; status: string; progress: number; maxProgress: number }>;
  openPathIds: string[];
  closedPathIds: string[];
  eventLogLength: number;
}

export interface EncounterSimulationTraceEntry {
  stepIndex: number;
  step: EncounterSimulationStep;
  ok: boolean;
  before: EncounterSimulationStateSummary;
  after: EncounterSimulationStateSummary;
  events: EncounterRuleEvent[];
  error?: string;
}

export function summarizeEncounterForSimulation(encounter: EncounterState): EncounterSimulationStateSummary {
  return {
    active: encounter.active,
    round: encounter.round,
    currentActorId: encounter.currentActorId,
    actors: encounter.actors.map((actor) => ({
      id: actor.id,
      nodeId: actor.nodeId,
      health: actor.health,
      systemIntegrity: actor.systemIntegrity,
      shield: actor.shield,
      ap: actor.ap,
      mp: actor.mp,
      isDowned: actor.isDowned,
      turnFlags: actor.turnFlags ? { ...actor.turnFlags } : undefined,
      statusEffects: [...actor.statusEffects],
    })),
    clocks: encounter.clocks.map((clock) => ({ name: clock.name, current: clock.current, max: clock.max })),
    objectives: (encounter.objectiveStates ?? []).map((objective) => ({
      id: objective.id,
      status: objective.status,
      progress: objective.progress,
      maxProgress: objective.maxProgress,
    })),
    openPathIds: encounter.paths.filter(isPathTraversable).map((path) => path.id),
    closedPathIds: encounter.paths.filter((path) => !isPathTraversable(path)).map((path) => path.id),
    eventLogLength: encounter.eventLog?.length ?? 0,
  };
}

function runStep(encounter: EncounterState, step: EncounterSimulationStep): EncounterRuleResult {
  switch (step.type) {
    case 'move':
      return moveActor(encounter, step.actorId, step.toNodeId, step.pathId);
    case 'setPathStatus':
      return setPathStatus(encounter, step.pathId, step.status);
    case 'dash':
      return dashActor(encounter, step.actorId, step.apCost, step.movementBoost);
    case 'guard':
      return guardActor(encounter, step.actorId, step.apCost);
    case 'microInteraction':
      return useMicroInteraction(encounter, step.actorId, step.label);
    case 'objectiveInteraction':
      return interactWithObjective(encounter, step.actorId, step.objectiveId);
    case 'advanceTurn':
      return advanceTurn(encounter);
    case 'endTurn':
      return endActorTurn(encounter, step.actorId);
    case 'setResource':
      return setActorResource(encounter, step.actorId, step.resource, step.value);
    case 'editResource':
      return editActorResource(encounter, step.actorId, step.resource, step.delta);
    case 'spendAp':
      return spendActionPoints(encounter, step.actorId, step.amount);
    case 'spendMp':
      return spendMovementPoints(encounter, step.actorId, step.amount);
    case 'damage':
      return applyDamage(encounter, step.targetActorId, step.damage);
    case 'basicAttack':
      return performBasicAttack(encounter, step.attackerId, step.targetActorId, step.attack);
    case 'status':
      return setActorStatus(encounter, step.actorId, step.statusEffects);
    case 'tickClock':
      return tickClock(encounter, step.clockName, step.amount);
    case 'toggleObjective':
      return toggleObjectiveDone(encounter, step.objectiveIndex);
    case 'resolve':
      return resolveEncounter(encounter, step.resultNote);
  }
}

export function runEncounterSimulation(
  initialEncounter: EncounterState,
  steps: EncounterSimulationStep[]
): EncounterSimulationRun {
  const validation = validateEncounterState(initialEncounter);
  let encounter = validation.encounter;
  const events: EncounterRuleEvent[] = [];
  const trace: EncounterSimulationTraceEntry[] = [];

  if (!validation.ok) {
    return {
      ok: false,
      encounter,
      events,
      trace,
      failedStepIndex: -1,
      error: validation.issues.map((issue) => `${issue.path}: ${issue.message}`).join('; '),
    };
  }

  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];
    const before = summarizeEncounterForSimulation(encounter);
    const result = runStep(encounter, step);
    encounter = result.ok ? appendEncounterEvents(result.encounter, result.events) : result.encounter;
    trace.push({
      stepIndex: index,
      step,
      ok: result.ok,
      before,
      after: summarizeEncounterForSimulation(encounter),
      events: result.events,
      error: result.ok ? undefined : result.error,
    });
    events.push(...result.events);
    if (!result.ok) {
      return { ok: false, encounter, events, trace, failedStepIndex: index, error: result.error };
    }
  }

  return { ok: true, encounter, events, trace };
}

export function runDockNineBreachSmokeSimulation(): EncounterSimulationSummary {
  const validation = validateEncounterState(cloneEncounterFixture('dock-nine-breach'));
  if (!validation.ok) {
    return { ok: false, events: [], error: validation.issues.map((issue) => `${issue.path}: ${issue.message}`).join('; ') };
  }

  const events: string[] = [];
  let encounter = validation.encounter;

  for (const action of [
    () => performBasicAttack(encounter, 'pc-field-lead', 'rival-cutter', {
      apCost: 1,
      actorBonus: 0,
      roll: 12,
      damage: { health: 3 },
    }),
    () => moveActor(encounter, 'pc-field-lead', 'control-plinth'),
    () => interactWithObjective(encounter, 'pc-field-lead', 'recover-manifest-fragment'),
    () => applyDamage(encounter, 'rival-cutter', { health: 3 }),
    () => endActorTurn(encounter, 'pc-field-lead'),
    () => guardActor(encounter, 'ally-engineer'),
    () => tickClock(encounter, 'Boarders Reinforce', 1),
  ]) {
    const result = action();
    if (!result.ok) {
      return { ok: false, events, finalRound: encounter.round, activeActorId: encounter.currentActorId, error: result.error };
    }
    encounter = appendEncounterEvents(result.encounter, result.events);
    events.push(...result.events.map((event) => event.message));
  }

  return {
    ok: true,
    events,
    finalRound: encounter.round,
    activeActorId: encounter.currentActorId,
  };
}
