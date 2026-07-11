import { useEffect, useState } from 'react';
import {
  DEFAULT_ENCOUNTER_FIXTURE_ID,
  ENCOUNTER_FIXTURES,
  cloneEncounterFixture,
  type EncounterFixtureId,
} from '../../data/encounterFixtures';
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
  guardActor,
  interactWithObjective,
  isPathTraversable,
  moveActor,
  performBasicAttack,
  resolveEncounter,
  setActorResource,
  setActorStatus,
  setCurrentActor,
  setPathStatus,
  tickClock,
  toggleObjectiveDone,
  useMicroInteraction,
  type EncounterRuleResult,
} from '../../lib/encounter/encounterRules';
import { runDockNineBreachSmokeSimulation } from '../../lib/encounter/encounterSimulation';
import { formatEncounterValidationIssues, validateEncounterState } from '../../lib/encounter/validateEncounter';
import { useGameState } from '../../store/GameStateContext';

export default function EncounterHarnessControls({
  selectedActorId,
  onSelectActor,
}: {
  selectedActorId: string | null;
  onSelectActor: (actorId: string | null) => void;
}) {
  const { state, dispatch } = useGameState();
  const { encounter } = state;
  const [fixtureId, setFixtureId] = useState<EncounterFixtureId>(DEFAULT_ENCOUNTER_FIXTURE_ID);
  const [statusDraft, setStatusDraft] = useState('');
  const [resultNote, setResultNote] = useState('Encounter resolved through playtest harness.');
  const [targetActorId, setTargetActorId] = useState('');
  const [microDraft, setMicroDraft] = useState('uses a micro-interaction');
  const [attackRollDraft, setAttackRollDraft] = useState('42');
  const [attackBonusDraft, setAttackBonusDraft] = useState('0');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedActor = encounter.actors.find((actor) => actor.id === selectedActorId) ?? null;
  const activeActor = encounter.actors.find((actor) => actor.id === encounter.currentActorId) ?? null;
  const activeLegalMoves = activeActor ? getLegalMoves(encounter, activeActor.id) : [];
  const legalTargets = activeActor ? getBasicAttackTargets(encounter, activeActor.id) : [];
  const targetActor = encounter.actors.find((actor) => actor.id === targetActorId) ?? null;
  const activeObjectives = activeActor
    ? (encounter.objectiveStates ?? []).filter((objective) =>
        objective.status === 'open' &&
        objective.nodeId === activeActor.nodeId &&
        (objective.interaction === 'micro'
          ? !activeActor.turnFlags?.microInteracted
          : activeActor.ap >= (objective.apCost ?? 1))
      )
    : [];
  const attackRoll = Number.parseInt(attackRollDraft, 10);
  const attackBonus = Number.parseInt(attackBonusDraft, 10);
  const activeAttackContext = activeActor && targetActor && legalTargets.some((target) => target.actorId === targetActor.id)
    ? buildAttackCheckContext(
        encounter,
        activeActor.id,
        targetActor.id,
        Number.isFinite(attackBonus) ? attackBonus : 0,
        Number.isFinite(attackRoll) ? attackRoll : undefined
      )
    : null;
  const activeActorCanAttack = Boolean(
    activeActor &&
    targetActor &&
    legalTargets.some((target) => target.actorId === targetActor.id) &&
    activeActor.ap >= 1 &&
    !activeActor.turnFlags?.attacked &&
    !activeActor.turnFlags?.dashed
  );

  useEffect(() => {
    setStatusDraft(selectedActor?.statusEffects.join(', ') ?? '');
  }, [selectedActor?.id]);

  useEffect(() => {
    if (!targetActorId || !legalTargets.some((target) => target.actorId === targetActorId)) {
      setTargetActorId(legalTargets[0]?.actorId ?? '');
    }
  }, [legalTargets, targetActorId]);

  function setValidatedEncounter(candidate: unknown, successMessage: string) {
    const validation = validateEncounterState(candidate);
    if (!validation.ok) {
      setError(formatEncounterValidationIssues(validation.issues));
      setMessage(null);
      return;
    }

    dispatch({ type: 'SET_ENCOUNTER', payload: validation.encounter });
    if (validation.encounter.active) dispatch({ type: 'SET_VIEW', payload: 'encounter' });
    onSelectActor(validation.encounter.currentActorId ?? validation.encounter.actors[0]?.id ?? null);
    setError(null);
    setMessage(successMessage);
  }

  function runRule(result: EncounterRuleResult) {
    if (!result.ok) {
      setError(result.error);
      setMessage(null);
      return;
    }
    setValidatedEncounter(appendEncounterEvents(result.encounter, result.events), result.events.map((event) => event.message).join(' '));
  }

  function loadFixture() {
    setValidatedEncounter(cloneEncounterFixture(fixtureId), `${ENCOUNTER_FIXTURES[fixtureId].label} loaded.`);
  }

  function resolveCurrentEncounter() {
    const result = resolveEncounter(encounter, resultNote);
    if (!result.ok) {
      setError(result.error);
      setMessage(null);
      return;
    }
    const resolvedEncounter = appendEncounterEvents(result.encounter, result.events);
    setValidatedEncounter(resolvedEncounter, result.events[0]?.message ?? 'Encounter resolved.');
    const sceneResult = resolvedEncounter.resultSummary
      ? formatEncounterResultForScene(resolvedEncounter.resultSummary)
      : `Encounter result: ${resultNote}`;
    dispatch({ type: 'UPDATE_SCENE', payload: { narrativeContext: `${state.scene.narrativeContext}\n\n${sceneResult}` } });
    dispatch({ type: 'SET_VIEW', payload: 'scene' });
  }

  function runSmokeSimulation() {
    const result = runDockNineBreachSmokeSimulation();
    if (!result.ok) {
      setError(result.error ?? 'Simulation failed.');
      setMessage(null);
      return;
    }
    setError(null);
    setMessage(`Simulation ok: ${result.events.join(' ')}`);
  }

  return (
    <div className="border-b border-amber-500/20 bg-black/35 p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-amber-400/70 font-mono">Encounter Harness</div>
          <div className="text-[9px] text-white/25 font-mono">Debug playtest controls</div>
        </div>
        <button
          onClick={runSmokeSimulation}
          className="border border-white/15 text-white/45 text-[9px] font-mono rounded px-2 py-1 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
        >
          Sim
        </button>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto] gap-2">
        <select
          value={fixtureId}
          onChange={(event) => setFixtureId(event.target.value as EncounterFixtureId)}
          className="min-w-0 bg-black/40 border border-white/15 rounded text-white/70 text-[10px] font-mono px-2 py-1.5 outline-none"
        >
          {Object.values(ENCOUNTER_FIXTURES).map((fixture) => (
            <option key={fixture.id} value={fixture.id}>{fixture.label}</option>
          ))}
        </select>
        <button
          onClick={loadFixture}
          className="border border-amber-500/40 text-amber-300/80 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-amber-500/10 transition-colors"
        >
          Load
        </button>
        <button
          onClick={loadFixture}
          disabled={!encounter.active}
          className="border border-white/15 text-white/45 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-white/5 disabled:opacity-30 transition-colors"
        >
          Reset
        </button>
      </div>

      {encounter.active && (
        <>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <select
              value={selectedActor?.id ?? ''}
              onChange={(event) => onSelectActor(event.target.value || null)}
              className="min-w-0 bg-black/40 border border-white/15 rounded text-white/70 text-[10px] font-mono px-2 py-1.5 outline-none"
            >
              <option value="">Select actor</option>
              {encounter.actors.map((actor) => (
                <option key={actor.id} value={actor.id}>{actor.name}</option>
              ))}
            </select>
            <button
              onClick={() => selectedActor && runRule(setCurrentActor(encounter, selectedActor.id))}
              disabled={!selectedActor || selectedActor.isDowned}
              className="border border-teal-500/35 text-teal-300/80 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-teal-500/10 disabled:opacity-30 transition-colors"
            >
              Active
            </button>
          </div>

          {activeActor && (
            <div className="border border-teal-500/20 rounded bg-teal-500/5 p-2 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-teal-300/70 font-mono">Active Actor</div>
                  <div className="text-[11px] text-white/75 font-mono">{activeActor.name}</div>
                </div>
                <div className="text-[9px] text-white/35 font-mono">{activeActor.ap}/{activeActor.maxAp} AP | {activeActor.mp}/{activeActor.maxMp + (activeActor.turnFlags?.movementBoost ?? 0)} MP</div>
              </div>
              {(activeActor.turnFlags?.attacked || activeActor.turnFlags?.dashed || activeActor.turnFlags?.defending || activeActor.turnFlags?.microInteracted) && (
                <div className="flex flex-wrap gap-1">
                  {activeActor.turnFlags.attacked && <span className="border border-amber-500/30 text-amber-300/70 text-[8px] font-mono rounded px-1.5 py-0.5">ATTACKED</span>}
                  {activeActor.turnFlags.dashed && <span className="border border-amber-500/30 text-amber-300/70 text-[8px] font-mono rounded px-1.5 py-0.5">DASHED</span>}
                  {activeActor.turnFlags.defending && <span className="border border-teal-500/30 text-teal-300/70 text-[8px] font-mono rounded px-1.5 py-0.5">GUARD</span>}
                  {activeActor.turnFlags.microInteracted && <span className="border border-white/15 text-white/45 text-[8px] font-mono rounded px-1.5 py-0.5">MICRO</span>}
                </div>
              )}

              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => runRule(dashActor(encounter, activeActor.id))}
                  disabled={activeActor.ap < 1 || Boolean(activeActor.turnFlags?.dashed)}
                  className="border border-amber-500/30 text-amber-300/75 text-[9px] font-mono rounded px-2 py-1 hover:bg-amber-500/10 disabled:opacity-30 transition-colors"
                >
                  Dash +3MP
                </button>
                <button
                  onClick={() => runRule(guardActor(encounter, activeActor.id))}
                  disabled={activeActor.ap < 1}
                  className="border border-teal-500/30 text-teal-300/75 text-[9px] font-mono rounded px-2 py-1 hover:bg-teal-500/10 disabled:opacity-30 transition-colors"
                >
                  Guard
                </button>
                <button
                  onClick={() => runRule(endActorTurn(encounter, activeActor.id))}
                  className="border border-white/15 text-white/55 text-[9px] font-mono rounded px-2 py-1 hover:bg-white/5 transition-colors"
                >
                  End Turn
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                {activeLegalMoves.length === 0 ? (
                  <span className="text-[9px] text-white/25 font-mono">No active moves</span>
                ) : activeLegalMoves.map((move) => {
                  const node = encounter.nodes.find((candidate) => candidate.id === move.nodeId);
                  const riskLabel = move.riskTags.length > 0 ? `, ${move.riskTags.join('/')}` : '';
                  return (
                    <button
                      key={move.pathId}
                      onClick={() => runRule(moveActor(encounter, activeActor.id, move.nodeId, move.pathId))}
                      className="border border-white/15 text-white/55 text-[9px] font-mono rounded px-2 py-1 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
                    >
                      {node?.label ?? move.nodeId} ({move.distance}MP{riskLabel})
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <select
                  value={targetActorId}
                  onChange={(event) => setTargetActorId(event.target.value)}
                  disabled={legalTargets.length === 0}
                  className="min-w-0 bg-black/40 border border-white/15 rounded text-white/70 text-[10px] font-mono px-2 py-1.5 outline-none disabled:opacity-40"
                >
                  {legalTargets.length === 0 ? (
                    <option value="">No legal targets</option>
                  ) : legalTargets.map((target) => {
                    const actor = encounter.actors.find((candidate) => candidate.id === target.actorId);
                    const node = encounter.nodes.find((candidate) => candidate.id === target.nodeId);
                    return (
                      <option key={target.actorId} value={target.actorId}>
                        {actor?.name ?? target.actorId} @ {node?.label ?? target.nodeId}
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={() => targetActor && runRule(performBasicAttack(encounter, activeActor.id, targetActor.id, {
                    apCost: 1,
                    damage: { amount: 3, track: 'health' },
                    label: 'makes a test attack against',
                    actorBonus: Number.isFinite(attackBonus) ? attackBonus : 0,
                    roll: Number.isFinite(attackRoll) ? attackRoll : undefined,
                  }))}
                  disabled={!activeActorCanAttack}
                  className="border border-amber-500/35 text-amber-300/80 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-amber-500/10 disabled:opacity-30 transition-colors"
                >
                  Attack
                </button>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-1 items-center">
                <span className="text-[8px] text-white/35 font-mono">Roll</span>
                <input
                  value={attackRollDraft}
                  onChange={(event) => setAttackRollDraft(event.target.value)}
                  className="min-w-0 bg-black/40 border border-white/15 rounded text-white/70 text-[10px] font-mono px-2 py-1 outline-none"
                />
                <span className="text-[8px] text-white/35 font-mono">Bonus</span>
                <input
                  value={attackBonusDraft}
                  onChange={(event) => setAttackBonusDraft(event.target.value)}
                  className="min-w-0 bg-black/40 border border-white/15 rounded text-white/70 text-[10px] font-mono px-2 py-1 outline-none"
                />
              </div>
              {activeAttackContext && (
                <div className="text-[9px] text-white/35 font-mono leading-relaxed">
                  TS {activeAttackContext.targetScore} | DEF {activeAttackContext.effectiveDefense}
                  {activeAttackContext.coverLevel !== 'none' ? ` | ${activeAttackContext.coverLevel} cover +${activeAttackContext.coverBonus}` : ' | no cover'}
                  {activeAttackContext.roll != null && activeAttackContext.band ? ` | ${activeAttackContext.band.toUpperCase()} (${activeAttackContext.margin})` : ''}
                </div>
              )}

              {activeObjectives.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {activeObjectives.map((objective) => (
                    <button
                      key={objective.id}
                      onClick={() => runRule(interactWithObjective(encounter, activeActor.id, objective.id))}
                      className="border border-teal-500/30 text-teal-300/75 text-[9px] font-mono rounded px-2 py-1 hover:bg-teal-500/10 transition-colors"
                    >
                      {objective.label} {objective.interaction === 'micro' ? '(Micro)' : `(${objective.apCost ?? 1}AP)`}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  value={microDraft}
                  onChange={(event) => setMicroDraft(event.target.value)}
                  disabled={Boolean(activeActor.turnFlags?.microInteracted)}
                  className="min-w-0 bg-black/40 border border-white/15 rounded text-white/70 text-[10px] font-mono px-2 py-1.5 outline-none disabled:opacity-40"
                />
                <button
                  onClick={() => runRule(useMicroInteraction(encounter, activeActor.id, microDraft))}
                  disabled={Boolean(activeActor.turnFlags?.microInteracted)}
                  className="border border-white/15 text-white/55 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-white/5 disabled:opacity-30 transition-colors"
                >
                  Micro
                </button>
              </div>
            </div>
          )}

          {selectedActor && (
            <div className="space-y-2">
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono">GM Edit</div>
                <div className="text-[9px] text-white/25 font-mono">{selectedActor.name}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                {[
                  ['HP', 'health', selectedActor.health],
                  ['SI', 'systemIntegrity', selectedActor.systemIntegrity ?? 0],
                  ['AP', 'ap', selectedActor.ap],
                  ['MP', 'mp', selectedActor.mp],
                  ['SHD', 'shield', selectedActor.shield ?? 0],
                ].map(([label, resource, value]) => (
                  <div key={resource} className="border border-white/10 rounded bg-black/25 p-1">
                    <div className="text-[8px] text-white/35 font-mono text-center">{label} {value}</div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <button
                        onClick={() => runRule(setActorResource(encounter, selectedActor.id, resource as 'health' | 'systemIntegrity' | 'ap' | 'mp' | 'shield', Number(value) - 1))}
                        className="border border-white/10 text-white/45 text-[9px] rounded hover:bg-white/5"
                      >
                        -
                      </button>
                      <button
                        onClick={() => runRule(setActorResource(encounter, selectedActor.id, resource as 'health' | 'systemIntegrity' | 'ap' | 'mp' | 'shield', Number(value) + 1))}
                        className="border border-white/10 text-white/45 text-[9px] rounded hover:bg-white/5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                <input
                  value={statusDraft}
                  onChange={(event) => setStatusDraft(event.target.value)}
                  placeholder="status, tags"
                  className="min-w-0 bg-black/40 border border-white/15 rounded text-white/70 text-[10px] font-mono px-2 py-1.5 outline-none"
                />
                <button
                  onClick={() => runRule(setActorStatus(encounter, selectedActor.id, statusDraft.split(',')))}
                  className="border border-white/15 text-white/55 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-white/5 transition-colors"
                >
                  Status
                </button>
                <button
                  onClick={() => runRule(applyDamage(encounter, selectedActor.id, { health: 1, ignoreMitigation: true }))}
                  className="border border-red-500/35 text-red-300/80 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-red-500/10 transition-colors"
                >
                  -1 HP
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => activeActor ? runRule(endActorTurn(encounter, activeActor.id)) : runRule(advanceTurn(encounter))}
              className="border border-teal-500/35 text-teal-300/80 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-teal-500/10 transition-colors"
            >
              End/Next Turn
            </button>
            <button
              onClick={resolveCurrentEncounter}
              className="border border-red-500/35 text-red-300/80 text-[10px] font-mono rounded px-2 py-1.5 hover:bg-red-500/10 transition-colors"
            >
              Resolve
            </button>
          </div>

          {encounter.clocks.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {encounter.clocks.map((clock) => (
                <button
                  key={clock.name}
                  onClick={() => runRule(tickClock(encounter, clock.name, 1))}
                  className="border border-white/15 text-white/50 text-[9px] font-mono rounded px-2 py-1 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
                >
                  {clock.name} +1
                </button>
              ))}
            </div>
          )}

          {encounter.paths.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {encounter.paths.map((path) => {
                const pathOpen = isPathTraversable(path);
                const status = path.status ?? 'open';
                return (
                  <button
                    key={path.id}
                    onClick={() => runRule(setPathStatus(encounter, path.id, pathOpen ? 'locked' : 'open'))}
                    className={`border text-[9px] font-mono rounded px-2 py-1 transition-colors ${
                      pathOpen
                        ? 'border-white/15 text-white/50 hover:border-amber-500/40 hover:text-amber-300'
                        : 'border-red-500/35 text-red-300/80 hover:bg-red-500/10'
                    }`}
                  >
                    {path.id}: {status}
                  </button>
                );
              })}
            </div>
          )}

          {encounter.objectives.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {encounter.objectives.map((objective, index) => (
                <button
                  key={`${index}-${objective}`}
                  onClick={() => runRule(toggleObjectiveDone(encounter, index))}
                  className={`border text-[9px] font-mono rounded px-2 py-1 transition-colors ${
                    objective.startsWith('[done] ')
                      ? 'border-teal-500/35 text-teal-300/80 hover:bg-teal-500/10'
                      : 'border-white/15 text-white/50 hover:border-amber-500/40 hover:text-amber-300'
                  }`}
                >
                  Obj {index + 1}
                </button>
              ))}
            </div>
          )}

          <input
            value={resultNote}
            onChange={(event) => setResultNote(event.target.value)}
            className="w-full bg-black/40 border border-white/15 rounded text-white/60 text-[10px] font-mono px-2 py-1.5 outline-none"
          />
        </>
      )}

      {message && <div className="text-[9px] text-teal-300/80 font-mono leading-relaxed">{message}</div>}
      {error && <pre className="text-[9px] text-red-300/90 font-mono whitespace-pre-wrap leading-relaxed">{error}</pre>}
    </div>
  );
}
