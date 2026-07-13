import { INITIAL_NEXUS_PRIMER_STATE } from '../data/nexusPrimerCampaign';
import { normalizeDMMemory } from './dmMemory';
import { validateEncounterState } from './encounter/validateEncounter';
import type { AppView, DMMemoryKind, GameState, MenuTab } from '../types/game';

const APP_VIEWS: AppView[] = ['encounter', 'scene', 'menu', 'skill-tree-lab'];
const MENU_TABS: MenuTab[] = ['crew', 'campaign', 'route', 'settings'];
const DM_MEMORY_KINDS = new Set<DMMemoryKind>([
  'session_summary',
  'decision',
  'unresolved_thread',
  'npc_fact',
  'location_fact',
  'consequence',
]);

type SaveParseResult =
  | { ok: true; state: GameState }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isDMMemoryKind(value: unknown): value is DMMemoryKind {
  return typeof value === 'string' && DM_MEMORY_KINDS.has(value as DMMemoryKind);
}

function validateGameStateShape(value: unknown): string | null {
  if (!isRecord(value)) return 'Save file must contain a JSON object.';

  if (!APP_VIEWS.includes(value.view as AppView)) {
    return 'Save file is missing a valid app view.';
  }

  if (!MENU_TABS.includes(value.menuTab as MenuTab)) {
    return 'Save file is missing a valid menu tab.';
  }

  if (!isRecord(value.scene)) return 'Save file is missing scene state.';
  if (!isString(value.scene.locationName)) return 'Scene state is missing locationName.';
  if (!isString(value.scene.environmentType)) return 'Scene state is missing environmentType.';
  if (!isString(value.scene.narrativeContext)) return 'Scene state is missing narrativeContext.';

  if (!isRecord(value.encounter)) return 'Save file is missing encounter state.';
  if (!isBoolean(value.encounter.active)) return 'Encounter state is missing active flag.';
  if (!Array.isArray(value.encounter.nodes)) return 'Encounter state is missing nodes.';
  if (!Array.isArray(value.encounter.paths)) return 'Encounter state is missing paths.';
  if (!Array.isArray(value.encounter.actors)) return 'Encounter state is missing actors.';
  if (!Array.isArray(value.encounter.objectives)) return 'Encounter state is missing objectives.';
  if (!Array.isArray(value.encounter.clocks)) return 'Encounter state is missing clocks.';

  if (!isRecord(value.campaign)) return 'Save file is missing campaign state.';
  if (!isString(value.campaign.campaignName)) return 'Campaign state is missing campaignName.';
  if (!isString(value.campaign.currentArc)) return 'Campaign state is missing currentArc.';
  if (!isString(value.campaign.mainObjective)) return 'Campaign state is missing mainObjective.';
  if (!isString(value.campaign.currentLocation)) return 'Campaign state is missing currentLocation.';
  if (!Array.isArray(value.campaign.routeHistory)) return 'Campaign state is missing routeHistory.';
  if (!Array.isArray(value.campaign.activePressures)) return 'Campaign state is missing activePressures.';
  if (!Array.isArray(value.campaign.activeClocks)) return 'Campaign state is missing activeClocks.';
  if (!Array.isArray(value.campaign.evidenceAndLeads)) return 'Campaign state is missing evidenceAndLeads.';

  if (!Array.isArray(value.crew)) return 'Save file is missing crew state.';
  if (!Array.isArray(value.messages)) return 'Save file is missing transcript messages.';
  if ('dmMemory' in value) {
    if (!isRecord(value.dmMemory)) return 'DM memory must be a JSON object.';
    if (!Array.isArray(value.dmMemory.records)) return 'DM memory is missing records.';

    for (const record of value.dmMemory.records) {
      if (!isRecord(record)) return 'DM memory records must be JSON objects.';
      if (!isString(record.id)) return 'DM memory record is missing id.';
      if (!isDMMemoryKind(record.kind)) return 'DM memory record is missing valid kind.';
      if (!isString(record.title)) return 'DM memory record is missing title.';
      if (!isString(record.content)) return 'DM memory record is missing content.';
      if (record.status !== 'active' && record.status !== 'superseded') {
        return 'DM memory record is missing valid status.';
      }
      if (!isNumber(record.createdAt)) return 'DM memory record is missing createdAt.';
      if (!isNumber(record.updatedAt)) return 'DM memory record is missing updatedAt.';
    }
  }

  if (!isRecord(value.settings)) return 'Save file is missing settings.';
  if (!isBoolean(value.settings.debugMode)) return 'Settings are missing debugMode.';
  if (!isString(value.settings.model)) return 'Settings are missing model.';
  if (!isNumber(value.settings.compressionThreshold)) {
    return 'Settings are missing compressionThreshold.';
  }

  return null;
}

export function stripRuntimeFlags(state: GameState): GameState {
  const { lastDMDebug: _lastDMDebug, ...persistableState } = state;

  return {
    ...persistableState,
    isGeneratingImage: false,
    isAiThinking: false,
  };
}

export function createExportableGameState(state: GameState): GameState {
  const exportableState = stripRuntimeFlags(state);

  return {
    ...exportableState,
    settings: {
      ...exportableState.settings,
      openaiApiKey: '',
    },
  };
}

export function parseGameStateSave(raw: string): SaveParseResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Save file is not valid JSON.',
    };
  }

  const validationError = validateGameStateShape(parsed);
  if (validationError) return { ok: false, error: validationError };

  const parsedState = parsed as GameState;
  const mergedState = stripRuntimeFlags({
    ...INITIAL_NEXUS_PRIMER_STATE,
    ...parsedState,
    scene: {
      ...INITIAL_NEXUS_PRIMER_STATE.scene,
      ...parsedState.scene,
    },
    encounter: {
      ...INITIAL_NEXUS_PRIMER_STATE.encounter,
      ...parsedState.encounter,
    },
    campaign: {
      ...INITIAL_NEXUS_PRIMER_STATE.campaign,
      ...parsedState.campaign,
    },
    dmMemory: normalizeDMMemory(parsedState.dmMemory),
    settings: {
      ...INITIAL_NEXUS_PRIMER_STATE.settings,
      ...parsedState.settings,
    },
  });

  const encounterValidation = validateEncounterState(mergedState.encounter);
  if (!encounterValidation.ok) {
    return {
      ok: false,
      error: `Encounter state is invalid: ${encounterValidation.issues.map((issue) => `${issue.path}: ${issue.message}`).join('; ')}`,
    };
  }

  return {
    ok: true,
    state: {
      ...mergedState,
      encounter: encounterValidation.encounter,
    },
  };
}
