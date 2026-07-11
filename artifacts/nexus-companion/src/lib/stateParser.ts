import type { AppView, GameState, EncounterState, SceneState, CampaignState, CrewMember, Actor } from '../types/game';
import { validateEncounterState } from './encounter/validateEncounter';

export interface ParsedDMBlock {
  type: 'encounter_start' | 'turn_end' | 'scene_transition' | 'route_node_end' | 'campaign_update' | 'crew_update';
  encounter?: Partial<EncounterState>;
  scene?: Partial<SceneState>;
  campaign?: Partial<CampaignState>;
  crew?: Partial<CrewMember>[];
}

export interface ParseResult {
  cleanContent: string;
  stateBlocks: ParsedDMBlock[];
  hasStateBlocks: boolean;
}

const NEXUS_STATE_RE = /```nexus-state\s*([\s\S]*?)```/g;

export function parseDMMessage(rawContent: string): ParseResult {
  const stateBlocks: ParsedDMBlock[] = [];
  let cleanContent = rawContent;

  let match: RegExpExecArray | null;
  NEXUS_STATE_RE.lastIndex = 0;

  const replacements: Array<{ start: number; end: number; parsed: ParsedDMBlock | null }> = [];

  while ((match = NEXUS_STATE_RE.exec(rawContent)) !== null) {
    const jsonStr = match[1].trim();
    try {
      const parsed = JSON.parse(jsonStr) as ParsedDMBlock;
      stateBlocks.push(parsed);
      replacements.push({ start: match.index, end: match.index + match[0].length, parsed });
    } catch {
      replacements.push({ start: match.index, end: match.index + match[0].length, parsed: null });
    }
  }

  let offset = 0;
  for (const r of replacements) {
    cleanContent =
      cleanContent.slice(0, r.start - offset) +
      cleanContent.slice(r.end - offset);
    offset += r.end - r.start;
  }

  cleanContent = cleanContent.replace(/\n{3,}/g, '\n\n').trim();

  return {
    cleanContent,
    stateBlocks,
    hasStateBlocks: stateBlocks.length > 0,
  };
}

/**
 * Deep-merge a list of partial actor updates into the existing full actor list.
 * Only fields present in the partial update are overwritten — all other fields
 * are preserved from the current state. New actors (id not found in current list)
 * are appended.
 */
function mergeActors(currentActors: Actor[], updates: Partial<Actor>[]): Actor[] {
  if (!updates || updates.length === 0) return currentActors;

  const result = currentActors.map((a) => {
    const upd = updates.find((u) => u.id === a.id);
    if (!upd) return a;
    return { ...a, ...upd } as Actor;
  });

  // Append actors that are new (id not in current list)
  for (const upd of updates) {
    if (!upd.id) continue;
    if (!currentActors.find((a) => a.id === upd.id)) {
      result.push(upd as Actor);
    }
  }

  return result;
}

function sanitizeEncounterPatch(
  block: ParsedDMBlock,
  currentEncounter: EncounterState
): Partial<EncounterState> | undefined {
  if (!block.encounter) return undefined;

  const {
    actors: _actors,
    currentActorId: _currentActorId,
    round: _round,
    nodes: _nodes,
    paths: _paths,
    clocks: _clocks,
    objectives: _objectives,
    objectiveStates: _objectiveStates,
    active: _incomingActive,
    eventLog: _eventLog,
    resultSummary: _resultSummary,
    ...nonMechanical
  } = block.encounter;

  if (block.type === 'encounter_start' && !currentEncounter.active) {
    const {
      eventLog: _startEventLog,
      resultSummary: _startResultSummary,
      ...startEncounter
    } = block.encounter;
    return startEncounter;
  }

  return {
    ...nonMechanical,
    notes: [
      typeof nonMechanical.notes === 'string' ? nonMechanical.notes : undefined,
      'DM encounter mechanics ignored; use app encounter controls for movement, turns, resources, damage, clocks, objectives, and resolution.',
    ].filter(Boolean).join('\n'),
  };
}

/**
 * Apply parsed DM state blocks onto the current GameState.
 * Returns only the top-level keys that actually changed.
 *
 * IMPORTANT: encounter.actors updates are ALWAYS deep-merged by actor ID
 * so that partial updates (e.g. just {id, health}) never clobber the rest
 * of an actor's fields.
 */
export function applyStateBlocks(
  currentState: GameState,
  blocks: ParsedDMBlock[]
): Partial<Pick<GameState, 'encounter' | 'scene' | 'campaign' | 'crew'>> {
  let encounter = { ...currentState.encounter };
  let scene = { ...currentState.scene };
  let campaign = { ...currentState.campaign };
  let crew = [...currentState.crew];

  for (const block of blocks) {
    const encounterPatch = sanitizeEncounterPatch(block, encounter);
    if (encounterPatch) {
      const { actors: incomingActors, ...encounterRest } = encounterPatch;

      // Shallow-merge all non-actor encounter fields
      encounter = { ...encounter, ...encounterRest };

      // Deep-merge actors by ID if the block includes actor updates
      if (incomingActors && incomingActors.length > 0) {
        encounter.actors = mergeActors(encounter.actors, incomingActors);
      }
    }

    if (block.scene) {
      scene = { ...scene, ...block.scene };
    }

    if (block.campaign) {
      campaign = { ...campaign, ...block.campaign };
    }

    if (block.crew) {
      for (const update of block.crew) {
        if (!update.id) continue;
        const idx = crew.findIndex((m) => m.id === update.id);
        if (idx >= 0) {
          crew[idx] = { ...crew[idx], ...update } as CrewMember;
        } else {
          // New crew member — only if fully formed
          if (update.name && update.role) {
            crew.push(update as CrewMember);
          }
        }
      }
    }

    if (block.type === 'encounter_start') {
      encounter.active = true;
      encounter.round = encounter.round ?? 1;
      encounter.currentActorId = encounter.currentActorId ?? null;
    }
  }

  const encounterValidation = validateEncounterState(encounter);
  if (encounterValidation.ok) {
    encounter = encounterValidation.encounter;
  } else {
    encounter = {
      ...currentState.encounter,
      notes: [
        currentState.encounter.notes,
        `DM encounter update rejected: ${encounterValidation.issues.map((issue) => `${issue.path}: ${issue.message}`).join('; ')}`,
      ].filter(Boolean).join('\n'),
    };
  }

  return { encounter, scene, campaign, crew };
}

export function getViewForAppliedStateTransition(
  currentState: GameState,
  projectedState: GameState
): AppView | null {
  if (!currentState.encounter.active && projectedState.encounter.active) return 'encounter';
  if (currentState.encounter.active && !projectedState.encounter.active) return 'scene';
  return null;
}
