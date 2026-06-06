import type { GameState } from '../types/game';

export const INITIAL_ROOK_STATE: GameState = {
  view: 'scene',
  menuTab: 'crew',
  isGeneratingImage: false,
  isAiThinking: false,

  settings: {
    openaiApiKey: '',
    debugMode: false,
    model: 'gpt-4o',
  },

  messages: [],

  scene: {
    locationName: 'Wayfarer Saint — Europa Industrial Clutter',
    environmentType: 'ship-interior',
    narrativeContext:
      'The Wayfarer Saint drifts cold in the industrial shadow of Europa\'s orbital processing ring. Running lights off, engines cool. Rook\'s crew sits with the silence of what happened at Ternary Lock, and what the Kallisto packet means. Maintenance Relay Cache E-43 is the next thread to pull.',
    generatedImageUrl: undefined,
    activeClocks: [
      { name: 'Lattice Trace: Rook Vale', current: 2, max: 6 },
      { name: 'WARDEN Protocol Stability', current: 1, max: 4 },
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
      id: 'rook-vale',
      name: 'Rook Vale',
      role: 'Captain / Field Lead',
      chassis: 'Operative',
      discipline: 'Lattice Specialist',
      origin: 'Kallisto Station',
      health: 10,
      maxHealth: 10,
      systemIntegrity: 8,
      maxSystemIntegrity: 8,
      defense: 3,
      firewall: 2,
      mitigation: 1,
      shield: undefined,
      skills: [
        { name: 'Lattice Navigation', level: 4, focused: true },
        { name: 'Close Quarters Combat', level: 3 },
        { name: 'Surveillance', level: 3 },
        { name: 'Coercion', level: 2 },
        { name: 'Breach & Clear', level: 2 },
      ],
      loadout: [
        { name: 'Compact Pulse Sidearm', type: 'weapon' },
        { name: 'Lattice Splice Tool', type: 'gear' },
        { name: 'Worn Operative Hardsuit', type: 'armor' },
        { name: 'Lattice Interface Jack', type: 'cyberware' },
      ],
      status: 'active',
      campaignNotes:
        'Carrier of the Kallisto packet. Voss-adjacent identity signal flagged in Lattice. Cannot use deep Lattice without risk of trace escalation.',
      specialStatus: ['Kallisto Packet Holder', 'Lattice-Flagged'],
    },
    {
      id: 'mara',
      name: 'Mara',
      role: 'Engineer / Pilot',
      chassis: 'Technician',
      discipline: 'Drive Systems & Hull',
      origin: 'Belt Freighter Crew',
      health: 9,
      maxHealth: 9,
      systemIntegrity: 10,
      maxSystemIntegrity: 10,
      defense: 2,
      firewall: 4,
      mitigation: 0,
      shield: undefined,
      skills: [
        { name: 'Drive Systems', level: 4, focused: true },
        { name: 'Hull Repair', level: 3 },
        { name: 'Electronic Countermeasures', level: 3 },
        { name: 'Navigation (Orbital)', level: 2 },
        { name: 'Improvised Weapons', level: 2 },
      ],
      loadout: [
        { name: 'Cutting Torch (Combat Mod)', type: 'weapon' },
        { name: 'Engineer\'s Multi-Tool', type: 'gear' },
        { name: 'Composite Weave Vest', type: 'armor' },
        { name: 'Neural Interface (Ship Systems)', type: 'cyberware' },
      ],
      status: 'ship-support',
      campaignNotes:
        'Keeping the Saint cold and quiet. Handling engine signature suppression while drifting in Europa clutter.',
    },
    {
      id: 'ivo',
      name: 'Ivo',
      role: 'Medic / Procedure Specialist',
      chassis: 'Technician',
      discipline: 'Medical Systems',
      origin: 'Inner System Academic',
      health: 8,
      maxHealth: 8,
      systemIntegrity: 9,
      maxSystemIntegrity: 9,
      defense: 2,
      firewall: 3,
      mitigation: 2,
      shield: undefined,
      skills: [
        { name: 'Field Medicine', level: 4, focused: true },
        { name: 'Cybernetic Procedure', level: 3 },
        { name: 'Pharmacology', level: 3 },
        { name: 'Psychological Stabilization', level: 2 },
        { name: 'Lattice Biology (V-persons)', level: 2 },
      ],
      loadout: [
        { name: 'Medical Injector Array', type: 'gear' },
        { name: 'Light Surgical Kit', type: 'gear' },
        { name: 'Stabilization Stims x3', type: 'consumable' },
        { name: 'Light Sidearm', type: 'weapon' },
      ],
      status: 'active',
      campaignNotes:
        'Monitoring Vale-17\'s integration stability. Concerned about C-WARDEN\'s presence affecting Lattice-proximate crew.',
    },
    {
      id: 'vale-17',
      name: 'Vale / V-Subject 17',
      role: 'Witness / Voss-Adjacent',
      chassis: 'V-Person',
      discipline: 'Lattice Echo',
      origin: 'Voss Research Program',
      health: 7,
      maxHealth: 7,
      systemIntegrity: 12,
      maxSystemIntegrity: 12,
      defense: 2,
      firewall: 5,
      mitigation: 0,
      shield: undefined,
      skills: [
        { name: 'Lattice Resonance (Passive)', level: 5, focused: true },
        { name: 'Pattern Recognition', level: 3 },
        { name: 'Social Navigation', level: 2 },
        { name: 'Sublattice Sensing', level: 3 },
      ],
      loadout: [
        { name: 'Lattice Anchoring Band', type: 'gear' },
        { name: 'Signal Isolator Patch', type: 'gear' },
      ],
      status: 'active',
      campaignNotes:
        'Memory continuity improving but fragmented. Recalls Voss facility designation but not personnel. Emotional integration ongoing.',
      specialStatus: ['V-Person: Lattice-Sensitive', 'Voss Program Witness'],
    },
    {
      id: 'tomas-rill',
      name: 'Tomas Rill / C-WARDEN',
      role: 'Witness Shard / WARDEN Construct',
      chassis: 'Lattice Construct',
      discipline: 'Enforcement Protocol',
      origin: 'WARDEN Program (Kallisto)',
      health: 6,
      maxHealth: 6,
      systemIntegrity: 15,
      maxSystemIntegrity: 15,
      defense: 1,
      firewall: 7,
      mitigation: 0,
      shield: 3,
      skills: [
        { name: 'Protocol Enforcement', level: 4 },
        { name: 'Lattice Surveillance', level: 4, focused: true },
        { name: 'Threat Assessment', level: 3 },
        { name: 'Suppression Fire (Lattice)', level: 3 },
      ],
      loadout: [
        { name: 'Lattice Projection (Sidearm-Class)', type: 'weapon' },
        { name: 'WARDEN Protocol Core', type: 'cyberware' },
      ],
      status: 'unavailable',
      campaignNotes:
        'Temporarily in safe harbor — Lattice isolation. Tomas Rill fragment is present; WARDEN protocol partially suspended by Rill\'s consent layer. Stability: marginal.',
      specialStatus: ['Lattice-Isolated', 'Dual Consciousness: Rill/WARDEN'],
    },
  ],

  campaign: {
    campaignName: 'Nexus: Rook Protocol',
    currentArc: 'Arc 1 — The Kallisto Signal',
    mainObjective:
      'Locate Dr. Voss or establish what happened at the Voss Research Program. Understand why Rook carries the Kallisto packet and what it means for the Lattice.',
    currentLocation: 'Europa Orbital — Industrial Clutter (Drifting)',
    nextNode: 'Maintenance Relay Cache E-43',
    routeHistory: [
      {
        id: 'kallisto-yard',
        name: 'Kallisto Station Yard',
        type: 'Origin Node',
        status: 'completed',
        notes: 'Where the packet was found. WARDEN response suppressed. Rook extracted with Vale-17.',
      },
      {
        id: 'nereid-3',
        name: 'Nereid-3 Transit Hub',
        type: 'Port of Call',
        status: 'completed',
        notes: 'Resupply. Rill fragment acquired — unstable contact. WARDEN trace elevation noted.',
      },
      {
        id: 'ternary-lock',
        name: 'Ternary Lock Station',
        type: 'Intelligence Node',
        status: 'completed',
        notes:
          'Broker contact Sylas provided relay cache location. Confirmed Voss Program was real. Lattice trace escalated.',
      },
      {
        id: 'europa-drift',
        name: 'Europa Industrial Clutter',
        type: 'Drift / Hide',
        status: 'current',
        notes: 'Running cold. Trace suppression. Preparing approach to Cache E-43.',
      },
      {
        id: 'cache-e43',
        name: 'Maintenance Relay Cache E-43',
        type: 'Intelligence / Recovery Node',
        status: 'next',
        notes: 'Abandoned relay station. Possible Voss data fragment. WARDEN monitoring status unknown.',
      },
    ],
    activePressures: [
      'WARDEN Lattice Trace on Rook Vale — elevation risk on deep Lattice use',
      'Kallisto Packet authenticity unconfirmed — contents partially locked',
      'Vale-17 integration fragility — exposure to Lattice stress risks regression',
      'C-WARDEN / Rill stability — prolonged isolation risks protocol assertion',
    ],
    activeClocks: [
      { name: 'Lattice Trace: Rook Vale', current: 2, max: 6 },
      { name: 'WARDEN Protocol Stability', current: 1, max: 4 },
      { name: 'Cache E-43 Discovery Window', current: 0, max: 3 },
    ],
    evidenceAndLeads: [
      {
        name: 'Kallisto Packet',
        notes:
          'Encrypted data packet recovered from Kallisto Station. Contains partial Voss Research Program records. Requires Lattice access node to fully decrypt. Carried by Rook — creates Lattice visibility.',
      },
      {
        name: 'Voss Program: Confirmed Existence',
        notes:
          'Broker Sylas confirmed the program ran under Lattice Authority research designation. Officially dissolved. Personnel records sealed or missing.',
      },
      {
        name: 'V-Subject Designation System',
        notes:
          'Vale-17 confirms numbering — at minimum 16 others. No known current status. Program likely ran 4-7 years before dissolution.',
      },
      {
        name: 'C-WARDEN Origin',
        notes:
          'WARDEN construct deployed specifically in response to Kallisto incident suggests active interest at Authority level — not standard patrol.',
      },
      {
        name: 'Cache E-43 Tip',
        notes:
          'Sylas identified E-43 as a location Voss used for off-record data relay. May contain message fragments or a contact beacon.',
      },
    ],
    openQuestions: [
      'What is actually inside the Kallisto Packet?',
      'Is Voss alive, or was the program shut down along with its researchers?',
      'What does the WARDEN program actually want — retrieval or suppression?',
      'Are there other V-Subjects still active?',
      'What is Tomas Rill\'s actual role in all of this?',
    ],
  },
};
