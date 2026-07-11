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
  coverEdges?: CoverEdge[];
  isObjective?: boolean;
}

export type CoverLevel = 'none' | 'half' | 'full';

export interface CoverEdge {
  fromNodeId: string;
  level: CoverLevel;
  blocksVisibility?: boolean;
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
  downedAtRound?: number;
  downedCountdown?: number;
  isCritical?: boolean;
  turnFlags?: ActorTurnFlags;
}

export interface ActorTurnFlags {
  attacked?: boolean;
  dashed?: boolean;
  defending?: boolean;
  microInteracted?: boolean;
  movementBoost?: number;
}

export interface EncounterLogEntry {
  id: string;
  type: string;
  message: string;
  round: number;
  actorId?: string;
  targetActorId?: string;
}

export interface EncounterResultSummary {
  outcome: string;
  resolvedAtRound: number;
  survivingActors: string[];
  downedActors: string[];
  completedObjectives: string[];
  openObjectives: string[];
  clockStates: string[];
  notes?: string;
}

export type EncounterObjectiveStatus = 'open' | 'complete' | 'failed';
export type EncounterObjectiveInteraction = 'micro' | 'action';

export interface EncounterObjectiveState {
  id: string;
  label: string;
  status: EncounterObjectiveStatus;
  nodeId?: string;
  progress: number;
  maxProgress: number;
  interaction?: EncounterObjectiveInteraction;
  apCost?: number;
  legacyObjectiveIndex?: number;
  tags?: string[];
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
  objectiveStates?: EncounterObjectiveState[];
  clocks: Clock[];
  notes?: string;
  title?: string;
  eventLog?: EncounterLogEntry[];
  resultSummary?: EncounterResultSummary;
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
  compressionThreshold: number;
}

export type DMMemoryKind =
  | 'session_summary'
  | 'decision'
  | 'unresolved_thread'
  | 'npc_fact'
  | 'location_fact'
  | 'consequence';

export type DMMemoryStatus = 'active' | 'superseded';

export interface DMMemoryRecord {
  id: string;
  kind: DMMemoryKind;
  title: string;
  content: string;
  status: DMMemoryStatus;
  createdAt: number;
  updatedAt: number;
  sourceMessageIds?: string[];
  supersededBy?: string;
}

export interface DMMemoryState {
  records: DMMemoryRecord[];
  lastUpdatedAt?: number;
}

export interface DMMemoryDebugRecord {
  id: string;
  kind: DMMemoryKind;
  title: string;
  status: DMMemoryStatus;
  updatedAt: number;
}

export interface DMDebugSnapshot {
  messageId: string;
  createdAt: number;
  model: string;
  systemPrompt: string;
  tokenEstimate: {
    system: number;
    history: number;
    user: number;
    total: number;
  };
  compression: {
    historyTurns: number;
    threshold: number;
  };
  retrievedSource?: {
    status: 'available' | 'unavailable';
    authority: string;
    query: string;
    terms: string[];
    resultCount: number;
    results: Array<{
      sliceId: string;
      docId: string;
      heading: string;
      exactRepoPath: string;
      lineRange: string;
      score: number;
    }>;
    error?: string;
  };
  suppliedMemory?: {
    status: 'available';
    recordCount: number;
    activeCount: number;
    records: DMMemoryDebugRecord[];
  };
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
  dmMemory: DMMemoryState;
  settings: Settings;
  lastDMDebug?: DMDebugSnapshot;
  isGeneratingImage: boolean;
  isAiThinking: boolean;
}

export type GameAction =
  | { type: 'SET_VIEW'; payload: AppView }
  | { type: 'SET_MENU_TAB'; payload: MenuTab }
  | { type: 'SET_ENCOUNTER'; payload: EncounterState }
  | { type: 'UPDATE_ENCOUNTER'; payload: Partial<EncounterState> }
  | { type: 'UPDATE_SCENE'; payload: Partial<SceneState> }
  | { type: 'UPDATE_CAMPAIGN'; payload: Partial<CampaignState> }
  | { type: 'UPDATE_CREW'; payload: CrewMember[] }
  | { type: 'UPDATE_CREW_MEMBER'; payload: { id: string; updates: Partial<CrewMember> } }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'SET_LAST_DM_DEBUG'; payload?: DMDebugSnapshot }
  | { type: 'APPLY_DM_STATE'; payload: Partial<Pick<GameState, 'encounter' | 'scene' | 'campaign' | 'crew'>> }
  | {
      type: 'REFRESH_DM_MEMORY';
      payload: {
        records: DMMemoryRecord[];
        activeRecordIds: string[];
        supersededAt: number;
      };
    }
  | { type: 'SET_SCENE_IMAGE'; payload: string }
  | { type: 'SET_GENERATING_IMAGE'; payload: boolean }
  | { type: 'SET_AI_THINKING'; payload: boolean }
  | { type: 'LOAD_STATE'; payload: GameState };
