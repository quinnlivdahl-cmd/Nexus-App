import assert from 'node:assert/strict';
import { cloneEncounterFixture } from '../../data/encounterFixtures';
import { INITIAL_NEXUS_PRIMER_STATE } from '../../data/nexusPrimerCampaign';
import { parseGameStateSave } from '../gameStateSave';
import { applyStateBlocks, getViewForAppliedStateTransition } from '../stateParser';
import {
  advanceTurn,
  applyDamage,
  appendEncounterEvents,
  buildAttackCheckContext,
  dashActor,
  endActorTurn,
  formatEncounterResultForScene,
  getBasicAttackTargets,
  getLegalMoves,
  getPathAccess,
  getPathRiskTags,
  guardActor,
  interactWithObjective,
  isPathTraversable,
  moveActor,
  performBasicAttack,
  resolveEncounter,
  resolveLatticeAttackBand,
  setActorResource,
  setCurrentActor,
  setPathStatus,
  tickClock,
  toggleObjectiveDone,
  useMicroInteraction,
} from './encounterRules';
import { runEncounterSimulation, runDockNineBreachSmokeSimulation } from './encounterSimulation';
import { validateEncounterState } from './validateEncounter';

function expectOk<T extends { ok: boolean }>(result: T): Extract<T, { ok: true }> {
  assert.equal(result.ok, true);
  return result as Extract<T, { ok: true }>;
}

function expectNotOk<T extends { ok: boolean }>(result: T): Extract<T, { ok: false }> {
  assert.equal(result.ok, false);
  return result as Extract<T, { ok: false }>;
}

const fixture = expectOk(validateEncounterState(cloneEncounterFixture('dock-nine-breach'))).encounter;

assert.equal(fixture.active, true);
assert.equal(fixture.nodes.length, 5);
assert.equal(fixture.paths.length, 5);
assert.equal(fixture.actors.length, 4);
assert.equal(fixture.currentActorId, 'pc-field-lead');
assert.equal(fixture.objectiveStates?.length, 3);
assert.deepEqual(fixture.paths.find((path) => path.id === 'transfer-control')?.tags, ['exposed']);
assert.equal(fixture.paths.find((path) => path.id === 'cargo-inner')?.status, 'locked');
assert.equal(getPathAccess(fixture.paths.find((path) => path.id === 'cargo-inner')!), 'closed');
assert.equal(isPathTraversable(fixture.paths.find((path) => path.id === 'cargo-inner')!), false);
assert.deepEqual(getPathRiskTags(fixture.paths.find((path) => path.id === 'transfer-control')!), ['exposed']);

const badActorNode = validateEncounterState({
  ...fixture,
  actors: fixture.actors.map((actor) =>
    actor.id === 'pc-field-lead' ? { ...actor, nodeId: 'missing-node' } : actor
  ),
});
assert.match(expectNotOk(badActorNode).issues.map((issue) => issue.message).join('\n'), /missing-node/);

const badPathEndpoint = validateEncounterState({
  ...fixture,
  paths: fixture.paths.map((path) =>
    path.id === 'outer-transfer' ? { ...path, fromId: 'missing-node' } : path
  ),
});
assert.match(expectNotOk(badPathEndpoint).issues.map((issue) => issue.message).join('\n'), /missing-node/);

const badCoverEdge = validateEncounterState({
  ...fixture,
  nodes: fixture.nodes.map((node) =>
    node.id === 'control-plinth' ? { ...node, coverEdges: [{ fromNodeId: 'missing-node', level: 'half' }] } : node
  ),
});
assert.match(expectNotOk(badCoverEdge).issues.map((issue) => issue.message).join('\n'), /Cover edge node "missing-node"/);

const badObjectiveNode = validateEncounterState({
  ...fixture,
  objectiveStates: fixture.objectiveStates?.map((objective) =>
    objective.id === 'recover-manifest-fragment' ? { ...objective, nodeId: 'missing-node' } : objective
  ),
});
assert.match(expectNotOk(badObjectiveNode).issues.map((issue) => issue.message).join('\n'), /Objective node "missing-node"/);

const duplicateObjectiveId = validateEncounterState({
  ...fixture,
  objectiveStates: [
    ...(fixture.objectiveStates ?? []),
    { ...(fixture.objectiveStates?.[0] ?? { id: 'secure-inner-lock', label: 'Duplicate', status: 'open', progress: 0, maxProgress: 1 }) },
  ],
});
assert.match(expectNotOk(duplicateObjectiveId).issues.map((issue) => issue.message).join('\n'), /Duplicate id "secure-inner-lock"/);

const downedNormalization = expectOk(validateEncounterState({
  ...fixture,
  actors: fixture.actors.map((actor) =>
    actor.id === 'rival-cutter' ? { ...actor, health: 0, isDowned: false } : actor
  ),
})).encounter;
assert.equal(downedNormalization.actors.find((actor) => actor.id === 'rival-cutter')?.isDowned, true);
assert.equal(downedNormalization.actors.find((actor) => actor.id === 'rival-cutter')?.downedCountdown, 3);

const staleDownedFlagCleared = expectOk(validateEncounterState({
  ...fixture,
  actors: fixture.actors.map((actor) =>
    actor.id === 'rival-cutter' ? { ...actor, health: 1, isDowned: true, downedCountdown: 2 } : actor
  ),
})).encounter;
assert.equal(staleDownedFlagCleared.actors.find((actor) => actor.id === 'rival-cutter')?.isDowned, false);
assert.equal(staleDownedFlagCleared.actors.find((actor) => actor.id === 'rival-cutter')?.downedCountdown, undefined);

const currentActorCannotValidateDowned = validateEncounterState({
  ...fixture,
  actors: fixture.actors.map((actor) =>
    actor.id === 'pc-field-lead' ? { ...actor, health: 0 } : actor
  ),
});
assert.match(expectNotOk(currentActorCannotValidateDowned).issues.map((issue) => issue.message).join('\n'), /is downed/);

const legalMoves = getLegalMoves(fixture, 'pc-field-lead');
assert.deepEqual(
  legalMoves.map((move) => move.nodeId).sort(),
  ['cargo-shadow', 'control-plinth', 'outer-lock'].sort()
);
const exposedMove = legalMoves.find((move) => move.nodeId === 'control-plinth');
assert.equal(exposedMove?.pathId, 'transfer-control');
assert.equal(exposedMove?.distance, 2);
assert.equal(exposedMove?.isExposed, true);
assert.deepEqual(exposedMove?.riskTags, ['exposed']);
assert.deepEqual(
  getBasicAttackTargets(fixture, 'pc-field-lead').map((target) => target.actorId).sort(),
  ['rival-cutter'].sort()
);

const halfCoverAttackContext = buildAttackCheckContext(fixture, 'pc-field-lead', 'rival-cutter', 0, 42);
assert.equal(halfCoverAttackContext.coverLevel, 'half');
assert.equal(halfCoverAttackContext.coverBonus, 20);
assert.equal(halfCoverAttackContext.effectiveDefense, 29);
assert.equal(halfCoverAttackContext.targetScore, 36);
assert.equal(halfCoverAttackContext.band, 'miss');
assert.equal(halfCoverAttackContext.margin, -6);
assert.deepEqual(resolveLatticeAttackBand(36, 36), { roll: 36, margin: 0, band: 'graze' });
assert.deepEqual(resolveLatticeAttackBand(36, 12), { roll: 12, margin: 24, band: 'hit' });
assert.deepEqual(resolveLatticeAttackBand(100, 1), { roll: 1, margin: 99, band: 'direct' });

const movedResult = expectOk(moveActor(fixture, 'pc-field-lead', 'control-plinth'));
const moved = movedResult.encounter;
const movedActor = moved.actors.find((actor) => actor.id === 'pc-field-lead');
assert.equal(movedActor?.nodeId, 'control-plinth');
assert.equal(movedActor?.mp, 1);
assert.equal(movedActor?.ap, fixture.actors.find((actor) => actor.id === 'pc-field-lead')?.ap);
assert.equal(movedActor?.health, fixture.actors.find((actor) => actor.id === 'pc-field-lead')?.health);
assert.deepEqual(movedActor?.statusEffects, fixture.actors.find((actor) => actor.id === 'pc-field-lead')?.statusEffects);
assert.deepEqual(moved.clocks, fixture.clocks);
assert.deepEqual(
  moved.objectiveStates?.map((objective) => ({
    id: objective.id,
    status: objective.status,
    progress: objective.progress,
  })),
  fixture.objectiveStates?.map((objective) => ({
    id: objective.id,
    status: objective.status,
    progress: objective.progress,
  }))
);
assert.deepEqual(
  movedResult.events.map((event) => event.type),
  ['actor.moved', 'path.exposed_crossed']
);
assert.equal(getLegalMoves(moved, 'pc-field-lead').length, 0);

const illegalMove = moveActor(moved, 'pc-field-lead', 'inner-lock');
assert.equal(illegalMove.ok, false);

const cargoLocked = expectOk(validateEncounterState({
  ...fixture,
  actors: fixture.actors.map((actor) => ({
    ...actor,
    isActive: actor.id === 'pc-field-lead',
    nodeId: actor.id === 'pc-field-lead' ? 'cargo-shadow' : actor.nodeId,
  })),
})).encounter;
assert.match(expectNotOk(moveActor(cargoLocked, 'pc-field-lead', 'inner-lock')).error, /path is locked/);
assert.deepEqual(
  getBasicAttackTargets(cargoLocked, 'pc-field-lead').map((target) => target.actorId),
  []
);
const openedCargo = expectOk(setPathStatus(cargoLocked, 'cargo-inner', 'open'));
assert.equal(openedCargo.encounter.paths.find((path) => path.id === 'cargo-inner')?.status, undefined);
assert.equal(openedCargo.events[0]?.type, 'path.status_set');
assert.equal(getLegalMoves(openedCargo.encounter, 'pc-field-lead').some((move) => move.pathId === 'cargo-inner'), true);
const movedThroughOpenedCargo = expectOk(moveActor(openedCargo.encounter, 'pc-field-lead', 'inner-lock', 'cargo-inner')).encounter;
assert.equal(movedThroughOpenedCargo.actors.find((actor) => actor.id === 'pc-field-lead')?.nodeId, 'inner-lock');
assert.equal(movedThroughOpenedCargo.actors.find((actor) => actor.id === 'pc-field-lead')?.mp, 1);
const relockedCargo = expectOk(setPathStatus(openedCargo.encounter, 'cargo-inner', 'locked')).encounter;
assert.equal(relockedCargo.paths.find((path) => path.id === 'cargo-inner')?.status, 'locked');
assert.equal(getLegalMoves(relockedCargo, 'pc-field-lead').some((move) => move.pathId === 'cargo-inner'), false);
assert.match(expectNotOk(setPathStatus(fixture, 'missing-path', 'open')).error, /was not found/);

const statusExposed = expectOk(validateEncounterState({
  ...fixture,
  paths: fixture.paths.map((path) =>
    path.id === 'transfer-control' ? { ...path, tags: [], status: 'exposed' } : path
  ),
})).encounter;
const statusExposedMove = getLegalMoves(statusExposed, 'pc-field-lead').find((move) => move.nodeId === 'control-plinth');
assert.equal(statusExposedMove?.status, 'exposed');
assert.equal(statusExposedMove?.isExposed, true);
assert.equal(isPathTraversable(statusExposed.paths.find((path) => path.id === 'transfer-control')!), true);
assert.deepEqual(expectOk(moveActor(statusExposed, 'pc-field-lead', 'control-plinth')).events.map((event) => event.type), [
  'actor.moved',
  'path.exposed_crossed',
]);

const parallelPaths = expectOk(validateEncounterState({
  ...fixture,
  paths: [
    { id: 'locked-control-parallel', fromId: 'transfer-spine', toId: 'control-plinth', distance: 1, status: 'locked' },
    ...fixture.paths,
  ],
})).encounter;
assert.deepEqual(
  getLegalMoves(parallelPaths, 'pc-field-lead').filter((move) => move.nodeId === 'control-plinth').map((move) => move.pathId),
  ['transfer-control']
);
const parallelFallbackMove = expectOk(moveActor(parallelPaths, 'pc-field-lead', 'control-plinth'));
assert.equal(parallelFallbackMove.encounter.actors.find((actor) => actor.id === 'pc-field-lead')?.mp, 1);
assert.deepEqual(
  parallelFallbackMove.events.map((event) => event.type),
  ['actor.moved', 'path.exposed_crossed']
);
const parallelExplicitMove = expectOk(moveActor(parallelPaths, 'pc-field-lead', 'control-plinth', 'transfer-control'));
assert.equal(parallelExplicitMove.events[1]?.message, 'Field Lead crossed transfer-control (exposed).');
assert.match(
  expectNotOk(moveActor(parallelPaths, 'pc-field-lead', 'control-plinth', 'locked-control-parallel')).error,
  /path is locked/
);

assert.match(
  expectNotOk(interactWithObjective(fixture, 'pc-field-lead', 'recover-manifest-fragment')).error,
  /must be at control-plinth/
);

const recoveredManifest = expectOk(interactWithObjective(moved, 'pc-field-lead', 'recover-manifest-fragment')).encounter;
const manifestObjective = recoveredManifest.objectiveStates?.find((objective) => objective.id === 'recover-manifest-fragment');
assert.equal(manifestObjective?.status, 'complete');
assert.equal(manifestObjective?.progress, 1);
assert.equal(recoveredManifest.objectives[1].startsWith('[done] '), true);
assert.equal(recoveredManifest.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.microInteracted, true);
assert.match(
  expectNotOk(interactWithObjective(recoveredManifest, 'pc-field-lead', 'recover-manifest-fragment')).error,
  /already complete/
);

const atInnerLock = expectOk(validateEncounterState({
  ...fixture,
  currentActorId: 'ally-engineer',
  actors: fixture.actors.map((actor) => ({
    ...actor,
    isActive: actor.id === 'ally-engineer',
    nodeId: actor.id === 'ally-engineer' ? 'inner-lock' : actor.nodeId,
  })),
})).encounter;
const securedInnerLock = expectOk(interactWithObjective(atInnerLock, 'ally-engineer', 'secure-inner-lock')).encounter;
assert.equal(securedInnerLock.objectiveStates?.find((objective) => objective.id === 'secure-inner-lock')?.status, 'complete');
assert.equal(securedInnerLock.objectives[0].startsWith('[done] '), true);
assert.equal(securedInnerLock.actors.find((actor) => actor.id === 'ally-engineer')?.ap, 1);

assert.match(
  expectNotOk(moveActor(fixture, 'ally-engineer', 'transfer-spine')).error,
  /not the current actor/
);

assert.match(
  expectNotOk(moveActor({ ...fixture, active: false }, 'pc-field-lead', 'control-plinth')).error,
  /not active/
);

const damaged = expectOk(applyDamage(fixture, 'rival-breacher', { amount: 5, track: 'health' })).encounter;
const damagedActor = damaged.actors.find((actor) => actor.id === 'rival-breacher');
assert.equal(damagedActor?.shield, 0);
assert.equal(damagedActor?.health, 10);

const attacked = expectOk(performBasicAttack(fixture, 'pc-field-lead', 'rival-cutter', {
  apCost: 1,
  damage: { amount: 3, track: 'health' },
  label: 'test-strikes',
})).encounter;
assert.equal(attacked.actors.find((actor) => actor.id === 'pc-field-lead')?.ap, 1);
assert.equal(attacked.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.attacked, true);
assert.equal(attacked.actors.find((actor) => actor.id === 'rival-cutter')?.health, 5);
const attackWithLog = appendEncounterEvents(attacked, [
  { type: 'attack.hit', message: 'Field Lead test-strikes Rival Cutter.', actorId: 'pc-field-lead', targetActorId: 'rival-cutter' },
]);
assert.equal(attackWithLog.eventLog?.[0]?.type, 'attack.hit');
assert.equal(attackWithLog.eventLog?.[0]?.round, 1);

assert.match(
  expectNotOk(performBasicAttack(attacked, 'pc-field-lead', 'rival-cutter', {
    apCost: 1,
    damage: { amount: 3, track: 'health' },
  })).error,
  /already made an offensive attack/
);

const missed = expectOk(performBasicAttack(fixture, 'pc-field-lead', 'rival-cutter', {
  apCost: 1,
  hit: false,
  damage: { amount: 3, track: 'health' },
})).encounter;
assert.equal(missed.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.attacked, true);
assert.equal(
  missed.actors.find((actor) => actor.id === 'rival-cutter')?.health,
  fixture.actors.find((actor) => actor.id === 'rival-cutter')?.health
);

const rolledMiss = expectOk(performBasicAttack(fixture, 'pc-field-lead', 'rival-cutter', {
  apCost: 1,
  roll: 42,
  actorBonus: 0,
  damage: { amount: 3, track: 'health' },
}));
assert.equal(rolledMiss.encounter.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.attacked, true);
assert.equal(
  rolledMiss.encounter.actors.find((actor) => actor.id === 'rival-cutter')?.health,
  fixture.actors.find((actor) => actor.id === 'rival-cutter')?.health
);
assert.match(rolledMiss.events[0]?.message ?? '', /roll 42 vs TS 36, miss, half cover/);

const rolledHit = expectOk(performBasicAttack(fixture, 'pc-field-lead', 'rival-cutter', {
  apCost: 1,
  roll: 12,
  actorBonus: 0,
  damage: { amount: 3, track: 'health' },
}));
assert.equal(rolledHit.encounter.actors.find((actor) => actor.id === 'rival-cutter')?.health, 5);
assert.match(rolledHit.events[0]?.message ?? '', /roll 12 vs TS 36, hit, half cover/);

const forcedHitOverMissRoll = expectOk(performBasicAttack(fixture, 'pc-field-lead', 'rival-cutter', {
  apCost: 1,
  hit: true,
  roll: 42,
  actorBonus: 0,
  damage: { amount: 3, track: 'health' },
}));
assert.equal(forcedHitOverMissRoll.events[0]?.type, 'attack.hit');
assert.equal(forcedHitOverMissRoll.encounter.actors.find((actor) => actor.id === 'rival-cutter')?.health, 5);
assert.match(forcedHitOverMissRoll.events[0]?.message ?? '', /forced hit; roll 42 vs TS 36 would miss/);

const forcedMissOverHitRoll = expectOk(performBasicAttack(fixture, 'pc-field-lead', 'rival-cutter', {
  apCost: 1,
  hit: false,
  roll: 12,
  actorBonus: 0,
  damage: { amount: 3, track: 'health' },
}));
assert.equal(forcedMissOverHitRoll.events[0]?.type, 'attack.miss');
assert.equal(
  forcedMissOverHitRoll.encounter.actors.find((actor) => actor.id === 'rival-cutter')?.health,
  fixture.actors.find((actor) => actor.id === 'rival-cutter')?.health
);
assert.match(forcedMissOverHitRoll.events[0]?.message ?? '', /forced miss; roll 12 vs TS 36 would hit/);

assert.match(
  expectNotOk(performBasicAttack(fixture, 'ally-engineer', 'rival-cutter', {
    apCost: 1,
    damage: { amount: 3, track: 'health' },
  })).error,
  /not the current actor/
);

assert.match(
  expectNotOk(performBasicAttack(fixture, 'pc-field-lead', 'rival-breacher', {
    apCost: 1,
    damage: { amount: 3, track: 'health' },
  })).error,
  /not a legal target/
);
assert.equal(fixture.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.attacked, undefined);

assert.match(
  expectNotOk(performBasicAttack({ ...fixture, active: false }, 'pc-field-lead', 'rival-cutter', {
    apCost: 1,
    damage: { amount: 3, track: 'health' },
  })).error,
  /not active/
);

assert.match(
  expectNotOk(performBasicAttack({ ...fixture, actors: fixture.actors.map((actor) => actor.id === 'pc-field-lead' ? { ...actor, ap: 0 } : actor) }, 'pc-field-lead', 'rival-cutter', {
    apCost: 1,
    damage: { amount: 3, track: 'health' },
  })).error,
  /needs 1 AP/
);

const downed = expectOk(setActorResource(fixture, 'rival-cutter', 'health', 0)).encounter;
assert.equal(downed.actors.find((actor) => actor.id === 'rival-cutter')?.isDowned, true);
assert.equal(downed.actors.find((actor) => actor.id === 'rival-cutter')?.downedAtRound, 1);
assert.equal(downed.actors.find((actor) => actor.id === 'rival-cutter')?.downedCountdown, 3);
const revived = expectOk(setActorResource(downed, 'rival-cutter', 'health', 1)).encounter;
assert.equal(revived.actors.find((actor) => actor.id === 'rival-cutter')?.isDowned, false);
assert.equal(revived.actors.find((actor) => actor.id === 'rival-cutter')?.downedCountdown, undefined);

const nextTurn = expectOk(advanceTurn(fixture)).encounter;
assert.equal(nextTurn.currentActorId, 'ally-engineer');
assert.equal(nextTurn.actors.find((actor) => actor.id === 'ally-engineer')?.isActive, true);
assert.equal(nextTurn.actors.find((actor) => actor.id === 'ally-engineer')?.turnFlags, undefined);
assert.match(expectNotOk(advanceTurn({ ...fixture, active: false })).error, /not active/);

const downedCurrentActor = expectOk(setActorResource(fixture, 'pc-field-lead', 'health', 0)).encounter;
assert.equal(downedCurrentActor.currentActorId, null);
assert.equal(downedCurrentActor.actors.find((actor) => actor.id === 'pc-field-lead')?.isActive, false);
const afterDownedCurrentAdvance = expectOk(advanceTurn(downedCurrentActor)).encounter;
assert.equal(afterDownedCurrentAdvance.currentActorId, 'ally-engineer');
assert.equal(afterDownedCurrentAdvance.round, 1);

let countdownEncounter = downed;
let countdownEvents: string[] = [];
for (let i = 0; i < 9; i += 1) {
  const result = expectOk(advanceTurn(countdownEncounter));
  countdownEncounter = result.encounter;
  countdownEvents = [...countdownEvents, ...result.events.map((event) => event.type)];
}
const criticalCutter = countdownEncounter.actors.find((actor) => actor.id === 'rival-cutter');
assert.equal(countdownEncounter.round, 4);
assert.equal(criticalCutter?.downedCountdown, 0);
assert.equal(criticalCutter?.isCritical, true);
assert.ok(countdownEvents.includes('actor.downed_countdown'));
assert.ok(countdownEvents.includes('actor.critical'));

const resetCurrentActor = expectOk(setCurrentActor(attacked, 'pc-field-lead')).encounter;
assert.equal(resetCurrentActor.actors.find((actor) => actor.id === 'pc-field-lead')?.ap, 2);
assert.equal(resetCurrentActor.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags, undefined);

let fullRound = fixture;
for (let i = 0; i < fixture.actors.length; i += 1) {
  fullRound = expectOk(advanceTurn(fullRound)).encounter;
}
assert.equal(fullRound.currentActorId, 'pc-field-lead');
assert.equal(fullRound.round, 2);
assert.equal(fullRound.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags, undefined);
assert.equal(expectOk(performBasicAttack(fullRound, 'pc-field-lead', 'rival-cutter', {
  apCost: 1,
  damage: { amount: 1, track: 'health' },
})).ok, true);

const dashed = expectOk(dashActor(fixture, 'pc-field-lead')).encounter;
const dashedActor = dashed.actors.find((actor) => actor.id === 'pc-field-lead');
assert.equal(dashedActor?.ap, 1);
assert.equal(dashedActor?.mp, 6);
assert.equal(dashedActor?.turnFlags?.dashed, true);
assert.equal(dashedActor?.turnFlags?.movementBoost, 3);
assert.match(
  expectNotOk(performBasicAttack(dashed, 'pc-field-lead', 'rival-cutter', {
    apCost: 1,
    damage: { amount: 3, track: 'health' },
  })).error,
  /dashed/
);
assert.match(expectNotOk(dashActor(dashed, 'pc-field-lead')).error, /already dashed/);

const guarded = expectOk(guardActor(fixture, 'pc-field-lead')).encounter;
assert.equal(guarded.actors.find((actor) => actor.id === 'pc-field-lead')?.ap, 1);
assert.equal(guarded.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.defending, true);

const micro = expectOk(useMicroInteraction(fixture, 'pc-field-lead', 'taps the lock release')).encounter;
assert.equal(micro.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.microInteracted, true);
assert.match(
  expectNotOk(useMicroInteraction(micro, 'pc-field-lead')).error,
  /already used a micro-interaction/
);

const endedTurn = expectOk(endActorTurn(fixture, 'pc-field-lead'));
assert.equal(endedTurn.encounter.currentActorId, 'ally-engineer');
assert.equal(endedTurn.events[0].type, 'turn.ended');

const ticked = expectOk(tickClock(fixture, 'Boarders Reinforce', 1)).encounter;
assert.equal(ticked.clocks.find((clock) => clock.name === 'Boarders Reinforce')?.current, 1);

const objectiveDone = expectOk(toggleObjectiveDone(fixture, 0)).encounter;
assert.equal(objectiveDone.objectives[0].startsWith('[done] '), true);
assert.equal(expectOk(toggleObjectiveDone(objectiveDone, 0)).encounter.objectives[0], fixture.objectives[0]);

const scripted = runEncounterSimulation(fixture, [
  { type: 'move', actorId: 'pc-field-lead', toNodeId: 'control-plinth' },
  { type: 'basicAttack', attackerId: 'pc-field-lead', targetActorId: 'rival-cutter', attack: { apCost: 1, damage: { amount: 3, track: 'health' } } },
  { type: 'objectiveInteraction', actorId: 'pc-field-lead', objectiveId: 'recover-manifest-fragment' },
  { type: 'endTurn', actorId: 'pc-field-lead' },
  { type: 'guard', actorId: 'ally-engineer' },
  { type: 'tickClock', clockName: 'Boarders Reinforce', amount: 1 },
  { type: 'toggleObjective', objectiveIndex: 0 },
  { type: 'resolve', resultNote: 'Simulation resolved.' },
]);
assert.equal(scripted.ok, true);
assert.equal(scripted.encounter.active, false);
assert.equal(scripted.encounter.notes, 'Simulation resolved.');
assert.equal(scripted.encounter.resultSummary?.outcome, 'Simulation resolved.');
assert.equal(scripted.encounter.resultSummary?.resolvedAtRound, 1);
assert.equal(scripted.trace.length, 8);
assert.equal(scripted.trace[0]?.stepIndex, 0);
assert.equal(scripted.trace[0]?.before.currentActorId, 'pc-field-lead');
assert.equal(scripted.trace[0]?.after.actors.find((actor) => actor.id === 'pc-field-lead')?.nodeId, 'control-plinth');
assert.equal(scripted.trace[0]?.after.eventLogLength, 2);
assert.equal(scripted.trace.at(-1)?.after.active, false);
assert.equal(scripted.trace[1]?.after.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.attacked, true);
assert.ok(scripted.encounter.resultSummary?.completedObjectives.length);
assert.ok(scripted.encounter.objectiveStates?.some((objective) => objective.id === 'recover-manifest-fragment' && objective.status === 'complete'));
assert.ok(scripted.encounter.eventLog?.some((entry) => entry.type === 'encounter.resolved'));
assert.match(formatEncounterResultForScene(scripted.encounter.resultSummary!), /Encounter result: Simulation resolved/);
assert.ok(scripted.events.some((event) => event.type === 'attack.hit'));
assert.ok(scripted.events.some((event) => event.type === 'actor.damage_applied'));
assert.ok(scripted.events.some((event) => event.type === 'objective.completed'));
assert.ok(scripted.events.some((event) => event.type === 'turn.ended'));
assert.ok(scripted.events.some((event) => event.type === 'actor.guarded'));
assert.ok(scripted.events.some((event) => event.type === 'encounter.resolved'));

const pathStatusScript = runEncounterSimulation(cargoLocked, [
  { type: 'setPathStatus', pathId: 'cargo-inner', status: 'open' },
  { type: 'move', actorId: 'pc-field-lead', toNodeId: 'inner-lock', pathId: 'cargo-inner' },
]);
assert.equal(pathStatusScript.ok, true);
assert.equal(pathStatusScript.encounter.paths.find((path) => path.id === 'cargo-inner')?.status, undefined);
assert.equal(pathStatusScript.encounter.actors.find((actor) => actor.id === 'pc-field-lead')?.nodeId, 'inner-lock');
assert.deepEqual(pathStatusScript.trace[0]?.before.closedPathIds, ['cargo-inner']);
assert.deepEqual(pathStatusScript.trace[0]?.after.closedPathIds, []);
assert.ok(pathStatusScript.events.some((event) => event.type === 'path.status_set'));

const shieldTraceScript = runEncounterSimulation(fixture, [
  { type: 'setResource', actorId: 'pc-field-lead', resource: 'shield', value: 0 },
]);
assert.equal(shieldTraceScript.ok, true);
assert.equal(shieldTraceScript.trace[0]?.before.actors.find((actor) => actor.id === 'pc-field-lead')?.shield, 1);
assert.equal(shieldTraceScript.trace[0]?.after.actors.find((actor) => actor.id === 'pc-field-lead')?.shield, 0);

const repeatedAttackScript = runEncounterSimulation(fixture, [
  { type: 'basicAttack', attackerId: 'pc-field-lead', targetActorId: 'rival-cutter', attack: { apCost: 1, damage: { amount: 1, track: 'health' } } },
  { type: 'basicAttack', attackerId: 'pc-field-lead', targetActorId: 'rival-cutter', attack: { apCost: 1, damage: { amount: 1, track: 'health' } } },
]);
assert.equal(repeatedAttackScript.ok, false);
assert.equal(repeatedAttackScript.failedStepIndex, 1);
assert.equal(repeatedAttackScript.trace.length, 2);
assert.equal(repeatedAttackScript.trace[1]?.ok, false);
assert.equal(repeatedAttackScript.trace[1]?.before.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.attacked, true);
assert.equal(repeatedAttackScript.trace[1]?.after.actors.find((actor) => actor.id === 'pc-field-lead')?.turnFlags?.attacked, true);
assert.match(repeatedAttackScript.trace[1]?.error ?? '', /already made an offensive attack/);
assert.match(repeatedAttackScript.error ?? '', /already made an offensive attack/);

assert.equal(runDockNineBreachSmokeSimulation().ok, true);

const stateAfterInvalidDM = applyStateBlocks(INITIAL_NEXUS_PRIMER_STATE, [
  {
    type: 'encounter_start',
    encounter: {
      ...cloneEncounterFixture('dock-nine-breach'),
      actors: [{ id: 'bad-actor', nodeId: 'missing-node' }],
    },
  },
]);
assert.equal(stateAfterInvalidDM.encounter?.active, false);
assert.match(stateAfterInvalidDM.encounter?.notes ?? '', /DM encounter update rejected/);

const stateAfterDMLogInjection = applyStateBlocks(
  { ...INITIAL_NEXUS_PRIMER_STATE, encounter: fixture },
  [
    {
      type: 'turn_end',
      encounter: {
        eventLog: [{ id: 'dm-event', type: 'dm.injected', message: 'Injected', round: 99 }],
        resultSummary: {
          outcome: 'DM injected result',
          resolvedAtRound: 99,
          survivingActors: [],
          downedActors: [],
          completedObjectives: [],
          openObjectives: [],
          clockStates: [],
        },
        notes: 'Allowed DM note',
      },
    },
  ]
);
assert.equal(stateAfterDMLogInjection.encounter?.eventLog, fixture.eventLog);
assert.equal(stateAfterDMLogInjection.encounter?.resultSummary, fixture.resultSummary);
assert.equal(stateAfterDMLogInjection.encounter?.active, true);
assert.match(stateAfterDMLogInjection.encounter?.notes ?? '', /Allowed DM note/);
assert.match(stateAfterDMLogInjection.encounter?.notes ?? '', /DM encounter mechanics ignored/);

const stateAfterDMMechanicalBypass = applyStateBlocks(
  { ...INITIAL_NEXUS_PRIMER_STATE, encounter: fixture },
  [
    {
      type: 'turn_end',
      encounter: {
        currentActorId: 'rival-cutter',
        round: 99,
        actors: [{ id: 'rival-cutter', nodeId: 'outer-lock', health: 0, ap: 0, isDowned: false }],
        clocks: [{ name: 'Reserve Air', current: 6, max: 6 }],
        objectives: ['[done] DM-completed objective'],
        objectiveStates: [{ id: 'recover-manifest-fragment', label: 'DM completed', status: 'complete', progress: 1, maxProgress: 1 }],
      },
    },
  ]
);
assert.equal(stateAfterDMMechanicalBypass.encounter?.currentActorId, fixture.currentActorId);
assert.equal(stateAfterDMMechanicalBypass.encounter?.active, true);
assert.equal(stateAfterDMMechanicalBypass.encounter?.round, fixture.round);
assert.equal(stateAfterDMMechanicalBypass.encounter?.actors.find((actor) => actor.id === 'rival-cutter')?.nodeId, 'control-plinth');
assert.equal(stateAfterDMMechanicalBypass.encounter?.actors.find((actor) => actor.id === 'rival-cutter')?.health, 7);
assert.equal(stateAfterDMMechanicalBypass.encounter?.actors.find((actor) => actor.id === 'rival-cutter')?.isDowned, false);
assert.equal(stateAfterDMMechanicalBypass.encounter?.clocks.find((clock) => clock.name === 'Reserve Air')?.current, 1);
assert.deepEqual(stateAfterDMMechanicalBypass.encounter?.objectives, fixture.objectives);
assert.deepEqual(stateAfterDMMechanicalBypass.encounter?.objectiveStates, fixture.objectiveStates);
assert.match(stateAfterDMMechanicalBypass.encounter?.notes ?? '', /DM encounter mechanics ignored/);
assert.equal(
  getViewForAppliedStateTransition(
    { ...INITIAL_NEXUS_PRIMER_STATE, encounter: fixture },
    { ...INITIAL_NEXUS_PRIMER_STATE, encounter: stateAfterDMMechanicalBypass.encounter! }
  ),
  null
);

const stateAfterSceneTransitionClose = applyStateBlocks(
  { ...INITIAL_NEXUS_PRIMER_STATE, encounter: fixture },
  [{ type: 'scene_transition', encounter: { active: false } }]
);
assert.equal(stateAfterSceneTransitionClose.encounter?.active, true);
assert.equal(
  getViewForAppliedStateTransition(
    { ...INITIAL_NEXUS_PRIMER_STATE, encounter: fixture },
    { ...INITIAL_NEXUS_PRIMER_STATE, encounter: stateAfterSceneTransitionClose.encounter! }
  ),
  null
);

const invalidSave = parseGameStateSave(JSON.stringify({
  ...INITIAL_NEXUS_PRIMER_STATE,
  encounter: {
    ...cloneEncounterFixture('dock-nine-breach'),
    paths: [{ id: 'bad-path', fromId: 'missing-node', toId: 'outer-lock', distance: 1 }],
  },
}));
assert.equal(invalidSave.ok, false);
if (!invalidSave.ok) assert.match(invalidSave.error, /Encounter state is invalid/);

const normalizedLoggedEncounter = expectOk(validateEncounterState({
  ...fixture,
  eventLog: [{ id: '', type: 'custom', message: 'Logged event', round: 2 }],
  resultSummary: {
    outcome: 'Complete',
    resolvedAtRound: 2,
    survivingActors: ['Field Lead'],
    downedActors: [],
    completedObjectives: ['Secure lock'],
    openObjectives: [],
    clockStates: ['Reserve Air: 2/6'],
  },
})).encounter;
assert.equal(normalizedLoggedEncounter.eventLog?.[0]?.id, 'evt-1');
assert.equal(normalizedLoggedEncounter.resultSummary?.outcome, 'Complete');

console.log('Encounter validation smoke passed');
