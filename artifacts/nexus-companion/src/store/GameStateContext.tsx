import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { GameState, GameAction } from '../types/game';
import { INITIAL_NEXUS_PRIMER_STATE } from '../data/nexusPrimerCampaign';
import { stripRuntimeFlags } from '../lib/gameStateSave';

const STORAGE_KEY = 'nexus-companion-state';
const PROTOTYPE_ROOK_STORAGE_KEY = 'nexus-companion-prototype-rook-state';

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload };

    case 'SET_MENU_TAB':
      return { ...state, menuTab: action.payload };

    case 'UPDATE_ENCOUNTER':
      return { ...state, encounter: { ...state.encounter, ...action.payload } };

    case 'UPDATE_SCENE':
      return { ...state, scene: { ...state.scene, ...action.payload } };

    case 'UPDATE_CAMPAIGN':
      return { ...state, campaign: { ...state.campaign, ...action.payload } };

    case 'UPDATE_CREW':
      return { ...state, crew: action.payload };

    case 'UPDATE_CREW_MEMBER': {
      const crew = state.crew.map((m) =>
        m.id === action.payload.id ? { ...m, ...action.payload.updates } : m
      );
      return { ...state, crew };
    }

    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
        lastDMDebug:
          action.payload.debugMode === false ? undefined : state.lastDMDebug,
      };

    case 'SET_LAST_DM_DEBUG':
      return { ...state, lastDMDebug: action.payload };

    case 'APPLY_DM_STATE': {
      const p = action.payload;
      return {
        ...state,
        scene: p.scene ? { ...state.scene, ...p.scene } : state.scene,
        encounter: p.encounter ? { ...state.encounter, ...p.encounter } : state.encounter,
        campaign: p.campaign ? { ...state.campaign, ...p.campaign } : state.campaign,
        crew: p.crew ?? state.crew,
      };
    }

    case 'SET_SCENE_IMAGE':
      return { ...state, scene: { ...state.scene, generatedImageUrl: action.payload } };

    case 'SET_GENERATING_IMAGE':
      return { ...state, isGeneratingImage: action.payload };

    case 'SET_AI_THINKING':
      return { ...state, isAiThinking: action.payload };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

function loadStoredState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_NEXUS_PRIMER_STATE;
    const parsed = JSON.parse(raw) as GameState;
    const { lastDMDebug: _lastDMDebug, ...parsedState } = parsed;

    if (parsedState.campaign?.campaignName === 'Nexus: Rook Protocol') {
      localStorage.setItem(PROTOTYPE_ROOK_STORAGE_KEY, JSON.stringify(parsedState));
      return stripRuntimeFlags({
        ...INITIAL_NEXUS_PRIMER_STATE,
        settings: {
          ...INITIAL_NEXUS_PRIMER_STATE.settings,
          ...parsedState.settings,
        },
      });
    }

    return stripRuntimeFlags({
      ...INITIAL_NEXUS_PRIMER_STATE,
      ...parsedState,
    });
  } catch {
    return INITIAL_NEXUS_PRIMER_STATE;
  }
}

interface GameStateContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  resetToNexusPrimer: () => void;
}

const GameStateContext = createContext<GameStateContextValue | null>(null);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadStoredState);

  useEffect(() => {
    try {
      const { lastDMDebug: _lastDMDebug, ...stateToPersist } = state;
      const toStore = stripRuntimeFlags(stateToPersist);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
    }
  }, [state]);

  const resetToNexusPrimer = useCallback(() => {
    dispatch({ type: 'LOAD_STATE', payload: INITIAL_NEXUS_PRIMER_STATE });
  }, []);

  return (
    <GameStateContext.Provider value={{ state, dispatch, resetToNexusPrimer }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState(): GameStateContextValue {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error('useGameState must be used inside GameStateProvider');
  return ctx;
}
