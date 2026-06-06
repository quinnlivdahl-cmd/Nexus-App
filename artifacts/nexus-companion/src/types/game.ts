export type BackdropType =
  | 'ship-corridor'
  | 'station-dock'
  | 'asteroid-mine'
  | 'hab-module'
  | 'reactor-deck'
  | 'derelict'
  | 'airlock'
  | 'medical-bay'
  | 'command-deck'
  | 'surface-exterior'
  | 'black-market'
  | 'prison-block'
  | 'server-room'
  | 'engineering-crawl'
  | 'industrial-platform'
  | 'cargo-hold'
  | 'research-lab'
  | 'orbital-approach';

export type Faction = 'player' | 'ally' | 'npc' | 'enemy' | 'elite-enemy';

export type MarkerType =
  | 'half-cover'
  | 'full-cover'
  | 'hazard'
  | 'objective'
  | 'high-ground'
  | 'extraction'
  | 'entry'
  | 'exit'
  | 'loot-cache'
  | 'reinforcement'
  | 'locked-route'
  | 'ally-npc';

export interface TacMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  capacity?: number;
  status?: string[];
  elevation?: number;
  markers?: MarkerType[];
  isObjective?: boolean;
}

export interface TacMapPath {
  id: string;
  fromId: string;
  toId: string;
  distance: number;
  tags?: string[];
  status?: string;
}

export interface Actor {
  id: string;
  name: string;
  faction: Faction;
  nodeId: string | null;
  health: number;
  maxHealth: number;
  systemIntegrity?: number;
  maxSystemIntegrity?: number;
  defense: number;
  firewall?: number;
  mitigation?: number;
  shield?: number;
  maxShield?: number;
  ap: number;
  maxAp: number;
  mp: number;
  maxMp: number;
  statusEffects: string[];
  isActive: boolean;
  isDowned: boolean;
}

export interface EncounterState {
  active: boolean;
  backdropType: BackdropType;
  round: number;
  currentActorId: string | null;
  nodes: TacMapNode[];
  paths: TacMapPath[];
  actors: Actor[];
  objectives: string[];
  clocks: Clock[];
  notes?: string;
  title?: string;
}

export interface SceneState {
  locationName: string;
  environmentType: string;
  narrativeContext: string;
  generatedImageUrl?: string;
  activeClocks?: Clock[];
}

export interface Clock {
  name: string;
  current: number;
  max: number;
}

export interface Skill {
  name: string;
  level: number;
  focused?: boolean;
}

export interface LoadoutItem {
  name: string;
  type: 'weapon' | 'armor' | 'gear' | 'cyberware' | 'consumable';
  notes?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  chassis: string;
  discipline: string;
  origin?: string;
  health: number;
  maxHealth: number;
  systemIntegrity?: number;
  maxSystemIntegrity?: number;
  defense: number;
  firewall?: number;
  mitigation?: number;
  shield?: number;
  skills: Skill[];
  loadout: LoadoutItem[];
  status: 'active' | 'ship-support' | 'unavailable' | 'down';
  campaignNotes?: string;
  specialStatus?: string[];
}

export interface RouteNode {
  id: string;
  name: string;
  type: string;
  status: 'completed' | 'current' | 'next' | 'available' | 'hidden';
  notes?: string;
}

export interface Evidence {
  name: string;
  notes: string;
}

export interface CampaignState {
  campaignName: string;
  currentArc: string;
  mainObjective: string;
  currentLocation: string;
  nextNode: string;
  routeHistory: RouteNode[];
  activePressures: string[];
  activeClocks: Clock[];
  evidenceAndLeads: Evidence[];
  openQuestions?: string[];
}

export interface Settings {
  openaiApiKey: string;
  debugMode: boolean;
  model: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  rawContent?: string;
  timestamp: number;
  hasStateBlock?: boolean;
}

export type MenuTab = 'crew' | 'campaign' | 'route' | 'settings';
export type AppView = 'encounter' | 'scene' | 'menu';

export interface GameState {
  view: AppView;
  menuTab: MenuTab;
  scene: SceneState;
  encounter: EncounterState;
  campaign: CampaignState;
  crew: CrewMember[];
  messages: ChatMessage[];
  settings: Settings;
  isGeneratingImage: boolean;
  isAiThinking: boolean;
}

export type GameAction =
  | { type: 'SET_VIEW'; payload: AppView }
  | { type: 'SET_MENU_TAB'; payload: MenuTab }
  | { type: 'UPDATE_ENCOUNTER'; payload: Partial<EncounterState> }
  | { type: 'UPDATE_SCENE'; payload: Partial<SceneState> }
  | { type: 'UPDATE_CAMPAIGN'; payload: Partial<CampaignState> }
  | { type: 'UPDATE_CREW'; payload: CrewMember[] }
  | { type: 'UPDATE_CREW_MEMBER'; payload: { id: string; updates: Partial<CrewMember> } }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'APPLY_DM_STATE'; payload: Partial<Pick<GameState, 'encounter' | 'scene' | 'campaign' | 'crew'>> }
  | { type: 'SET_SCENE_IMAGE'; payload: string }
  | { type: 'SET_GENERATING_IMAGE'; payload: boolean }
  | { type: 'SET_AI_THINKING'; payload: boolean }
  | { type: 'LOAD_STATE'; payload: GameState };
