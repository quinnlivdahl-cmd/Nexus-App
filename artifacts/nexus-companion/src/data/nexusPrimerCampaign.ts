import type { GameState } from '../types/game';

export const INITIAL_NEXUS_PRIMER_STATE: GameState = {
  view: 'scene',
  menuTab: 'campaign',
  isGeneratingImage: false,
  isAiThinking: false,
  dmMemory: {
    records: [],
  },

  settings: {
    openaiApiKey: '',
    debugMode: false,
    model: 'gpt-4o',
    compressionThreshold: 20,
  },

  messages: [],

  scene: {
    locationName: 'Nexus Source Primer',
    environmentType: 'ship-phase',
    narrativeContext:
      'A compact source-backed Nexus primer is loaded. No campaign-specific lore is active by default. Use this state to test the DM runtime, source-backed rules/lore context, route-node framing, and encounter-start flow before a new app-native campaign seed is promoted.',
    generatedImageUrl: undefined,
    activeClocks: [
      { name: 'Source Pack Coverage Review', current: 1, max: 4 },
      { name: 'Prototype Context Quarantine', current: 0, max: 3 },
    ],
  },

  encounter: {
    active: false,
    backdropType: 'ship-corridor',
    round: 1,
    currentActorId: null,
    nodes: [],
    paths: [],
    actors: [],
    objectives: [],
    clocks: [],
    title: 'No Active Encounter',
  },

  crew: [
    {
      id: 'player-character',
      name: 'Player Character',
      role: 'Field Lead',
      chassis: 'Standard Fit Human-Scale Body',
      discipline: 'Unassigned',
      origin: 'To be defined by campaign seed',
      health: 10,
      maxHealth: 10,
      systemIntegrity: 0,
      maxSystemIntegrity: 0,
      defense: 10,
      firewall: 10,
      mitigation: 0,
      skills: [
        { name: 'Fieldcraft', level: 2 },
        { name: 'Negotiation', level: 2 },
        { name: 'Close Quarters', level: 2 },
      ],
      loadout: [
        { name: 'Sidearm', type: 'weapon' },
        { name: 'Utility Kit', type: 'gear' },
        { name: 'Light Protective Suit', type: 'armor' },
      ],
      status: 'active',
      campaignNotes:
        'Primer placeholder for local runtime testing. Replace with a source-backed campaign seed when Issue 11 or equivalent campaign-seed work promotes one.',
    },
    {
      id: 'ship-engineer',
      name: 'Ship Engineer',
      role: 'Ship Support / Repairs',
      chassis: 'Standard Fit Human-Scale Body',
      discipline: 'Engineer',
      origin: 'To be defined by campaign seed',
      health: 10,
      maxHealth: 10,
      systemIntegrity: 0,
      maxSystemIntegrity: 0,
      defense: 8,
      firewall: 12,
      mitigation: 0,
      skills: [
        { name: 'Hull Repair', level: 3 },
        { name: 'Ship Systems', level: 3 },
        { name: 'Improvisation', level: 2 },
      ],
      loadout: [
        { name: 'Repair Multi-Tool', type: 'gear' },
        { name: 'Patch Kit', type: 'gear' },
      ],
      status: 'ship-support',
      campaignNotes: 'Primer placeholder for ship-side support and route-pressure testing.',
    },
  ],

  campaign: {
    campaignName: 'Nexus: Source Primer',
    currentArc: 'Source-Backed Runtime Primer',
    mainObjective:
      'Test the source-backed DM runtime with compact rules, lore, route-node, TacMap, play-aid, and image-guidance context before selecting a specific campaign seed.',
    currentLocation: 'Ship Phase / Source Primer',
    nextNode: 'Choose or generate a source-backed route-node seed',
    routeHistory: [
      {
        id: 'source-primer-ship-phase',
        name: 'Source Primer Ship Phase',
        type: 'Ship Phase',
        status: 'current',
        notes: 'Review source-backed context, define crew intent, and choose a route-node seed.',
      },
      {
        id: 'source-backed-route-node',
        name: 'Source-Backed Route Node Seed',
        type: 'Route Node Candidate',
        status: 'next',
        notes:
          'Use route-node framework and encounter patterns to create a non-Rook test node when campaign-seed work is ready.',
      },
    ],
    activePressures: [
      'Keep source-backed rules/lore separate from prototype campaign material',
      'Use Lattice-100 as resolution mechanic, not world lore',
      'Do not promote campaign-specific names into general canon without review',
    ],
    activeClocks: [
      { name: 'Context Pack Coverage Review', current: 1, max: 4 },
      { name: 'Campaign Seed Needed', current: 0, max: 3 },
    ],
    evidenceAndLeads: [
      {
        name: 'Source Slice Catalog',
        notes:
          'Generated broker-facing catalog of embedded source-slice IDs in Golden Truth Markdown.',
      },
      {
        name: 'Runtime Context Pack',
        notes:
          'Compact app context pack that references source slices and excludes Rook Protocol campaign lore by default.',
      },
    ],
    openQuestions: [
      'Which source-backed route-node seed should become the first app-native campaign start?',
      'Which rules should move from prompt guidance into Rules Core first?',
      'Which debug surface should expose selected context traces during playtest?',
    ],
  },
};
