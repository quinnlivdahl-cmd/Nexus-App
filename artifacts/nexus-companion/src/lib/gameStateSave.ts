import { INITIAL_NEXUS_PRIMER_STATE } from '../data/nexusPrimerCampaign';
import type { AppView, GameState, MenuTab } from '../types/game';

const APP_VIEWS: AppView[] = ['encounter', 'scene', 'menu'];
const MENU_TABS: MenuTab[] = ['crew', 'campaign', 'route', 'settings'];

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

  if (!isRecord(value.settings)) return 'Save file is missing settings.';
  if (!isBoolean(value.settings.debugMode)) return 'Settings are missing debugMode.';
  if (!isString(value.settings.model)) return 'Settings are missing model.';
  if (!isNumber(value.settings.compressionThreshold)) {
    return 'Settings are missing compressionThreshold.';
  }

  return null;
}

export function stripRuntimeFlags(state: GameState): GameState {
  return {
    ...state,
    isGeneratingImage: false,
    isAiThinking: false,
  };
}

export function createExportableGameState(state: GameState): GameState {
  return {
    ...stripRuntimeFlags(state),
    settings: {
      ...state.settings,
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

  return {
    ok: true,
    state: stripRuntimeFlags({
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
      settings: {
        ...INITIAL_NEXUS_PRIMER_STATE.settings,
        ...parsedState.settings,
      },
    }),
  };
}
