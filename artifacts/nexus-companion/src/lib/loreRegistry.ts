/**
 * Lore Registry — Nexus: Rook Protocol
 *
 * Each entry has:
 *   id          — unique string key
 *   category    — 'world' | 'faction' | 'location' | 'crew'
 *   tags        — selection signals:
 *                   'always'           → force-include every turn (any category)
 *                   '<arc-slug>'       → include when this arc is active (world/faction)
 *                   '<location-slug>'  → include when this location is active (world)
 *   linkedEntityId — crew member id / route node id used for entity-linking
 *                    (crew and location entries use this, not tags, for activation)
 *
 * Selection rules (see contextSelector.ts):
 *   world   → tag match (always / arc slug / location slug)
 *   faction → tag match OR encounter faction match
 *   crew    → entity linking only (linkedEntityId matches active/ship-support crew)
 *   location → entity linking only (linkedEntityId matches current/next route node)
 *
 * NOTE: Mechanical reference tables (weapon damage, enemy stats, cyberware tiers,
 * disciplines) live in TIER1_CORE of dmSystemPrompt.ts — not here. This registry
 * is for narrative/contextual lore only.
 */

export type LoreCategory = 'crew' | 'location' | 'faction' | 'world';

export interface LoreEntry {
  id: string;
  category: LoreCategory;
  tags: string[];
  content: string;
  linkedEntityId?: string;
}

export const LORE_REGISTRY: LoreEntry[] = [
  // ─── ALWAYS-ON MECHANICAL REFERENCE (moved from TIER1_CORE to save budget) ─
  // These are short, always-injected reference tables the DM needs each turn.

  {
    id: 'ref-weapon-damage',
    category: 'world',
    tags: ['always'],
    content: `Weapon damage (Graze/Hit/Direct): SMG 2/4/5 | Rifle 2/5/7 | Shotgun 1/5/8 | Sniper 1/6/9 | Heavy 3/7/10
Enemy baselines: Grunt DEF6 HP6–8 | Trooper DEF8 MTG1 HP10–12 | Heavy DEF6 SHD1 MTG2 HP16–18 | Elite DEF12 SHD1 HP14–16 | Drone DEF10 SI10–12 FW15 | Boss DEF15+
Cyberware tiers: T0 background (HP) | T1 light (HP) | T2 integrated (HP/SI mix) | T3 chassis-dependent (SI main) | T4 full chassis (SI only).
Disciplines: Vanguard (breach/protect) | Ghost (stealth/bypass) | Operator (systems) | Medic (recovery) | Envoy (social) | Engineer (repair) | Gunner (firepower) | Adaptant (body/environment).`,
  },

  // ─── WORLD / ARC ENTRIES ─────────────────────────────────────────────────
  // 'always' tag = critical orientation context included every turn.
  // 'arc-1' tag  = included when arc-1 is the current arc (injected via world tag match).

  {
    id: 'world-arc-overview',
    category: 'world',
    tags: ['always', 'arc-1', 'kallisto-signal'],
    content: `Campaign: Nexus: Rook Protocol — Arc 1: The Kallisto Signal
Main Objective: Locate Dr. Voss or establish what happened at the Voss Research Program. Understand why Rook carries the Kallisto packet and what it means for the Lattice.
Route History: Kallisto Station Yard (origin) → Nereid-3 Transit Hub → Ternary Lock Station → Europa Industrial Clutter (current) → Cache E-43 (next).`,
  },

  {
    id: 'world-open-questions',
    category: 'world',
    tags: ['arc-1'],
    content: `Open Questions:
- What is actually inside the Kallisto Packet?
- Is Voss alive, or was the program shut down along with its researchers?
- What does the WARDEN program actually want — retrieval or suppression?
- Are there other V-Subjects still active?
- What is Tomas Rill's actual role?
- What did person-steering at the Voss Program actually do?`,
  },

  {
    id: 'world-evidence-leads',
    category: 'world',
    tags: ['arc-1'],
    content: `Evidence & Leads:
• Kallisto Packet — Encrypted data recovered from Kallisto Station. Implant telemetry / behavioral audit. Checksum anomaly behaves like a Voss knock. Points toward E-43. Carried by Rook — Lattice visibility risk.
• Voss Program — Broker Sylas confirmed: ran under Lattice Authority research designation. Officially dissolved. Personnel records sealed/missing.
• V-Subject Designation — Vale-17 confirms numbering; at minimum 16 others. Program likely ran 4–7 years before dissolution.
• C-WARDEN Origin — Deployed specifically for Kallisto incident: active Authority-level interest, not standard patrol.
• Rill / Nereid-3 — Confirms person-steering experiments. Malk may be recoverable or know more.
• Cradle Records (Copied) — Vale moved as V-person / no public registry. Receiving authority: Heliomed Personhood Risk Office / Special Review Detachment. Compliance continuity phrase preserved. Cradle remote authority disabled.
• Cache E-43 Tip — Sylas identified E-43 as Voss off-record data relay. May contain message fragments or a contact beacon.`,
  },

  {
    id: 'world-useful-items',
    category: 'world',
    tags: ['arc-1'],
    content: `Items Previously Acquired: Kallisto packet copy, copied cradle records, hardline access tether, camera service cap, three-bar access card, sterile coat / privacy veil, transfer chit, compact medical kit, portable quarantine tags, false maintenance tags.`,
  },

  // ─── CREW ENTRIES (linked by crew member id) ─────────────────────────────
  // Default activation: entity linking only — included when the crew member
  // is active or ship-support in the current GameState.
  // To force-inject a crew entry regardless of status, add an explicit
  // override tag ('always', or a location slug like 'europa') that will
  // match against derived scene tags.

  {
    id: 'crew-rook-vale',
    category: 'crew',
    tags: [],
    linkedEntityId: 'rook-vale',
    content: `Rook Vale (Captain / Field Lead): Tier 1 cyberware (Lattice Interface Jack). Standard Fit. Carrier of the Kallisto packet — creates Lattice trace visibility on deep use. Voss-adjacent identity signal flagged in Lattice. Cannot use deep Lattice without trace escalation risk.`,
  },

  {
    id: 'crew-mara',
    category: 'crew',
    tags: [],
    linkedEntityId: 'mara',
    content: `Mara (Engineer / Pilot): Tier 1 cyberware (Neural Interface, Ship Systems). Standard Fit. Currently ship-side keeping the Saint cold and quiet. Handling engine signature suppression while drifting in Europa clutter.`,
  },

  {
    id: 'crew-ivo',
    category: 'crew',
    tags: [],
    linkedEntityId: 'ivo',
    content: `Ivo (Medic / Procedure Specialist): Tier 0 cyberware. Standard Fit. Monitoring Vale-17's integration stability. Concerned about C-WARDEN's presence affecting Lattice-proximate crew.`,
  },

  {
    id: 'crew-vale-17',
    category: 'crew',
    tags: [],
    linkedEntityId: 'vale-17',
    content: `Vale / V-Subject 17 (Witness / Voss-Adjacent): Upload embodiment (Base Sleeve). Tier 3–4 equivalent — SI primary durability track, not HP. High Firewall. Lattice-sensitive: Lattice stress risks integration regression. Memory continuity improving but fragmented. Recalls Voss facility designation but not personnel.`,
  },

  {
    id: 'crew-tomas-rill',
    category: 'crew',
    tags: [],
    linkedEntityId: 'tomas-rill',
    content: `Tomas Rill / C-WARDEN (Witness Shard / WARDEN Construct): Full Chassis upload (Lattice Construct). Tier 4 SI primary. Very high Firewall (WARDEN architecture). SHD 3 charges per encounter. Lattice-isolated in safe harbor. Tomas Rill fragment present; WARDEN protocol partially suspended by Rill's consent layer. Stability: marginal.`,
  },

  // ─── LOCATION ENTRIES ─────────────────────────────────────────────────────
  // Default activation: entity linking only — included when linkedEntityId
  // matches current or next route node id.
  // Tags on location entries serve as manual override signals. 'europa' would
  // match the location slug when the scene is set in Europa, etc.

  {
    id: 'location-europa-drift',
    category: 'location',
    tags: ['europa'],
    linkedEntityId: 'europa-drift',
    content: `Location: Europa Industrial Clutter (Drifting)
Wayfarer Saint running cold — lights off, engines cool — hidden in the industrial shadow of Europa's orbital processing ring. The silence of Ternary Lock hangs over the crew. Trace suppression active. Pre-node preparation window before Cache E-43.`,
  },

  {
    id: 'location-cache-e43',
    category: 'location',
    tags: [],
    linkedEntityId: 'cache-e43',
    content: `Location: Maintenance Relay Cache E-43 (Next Node)
Abandoned relay station. Possible Voss data fragment — Sylas identified it as a location Voss used for off-record data relay. May contain message fragments or a contact beacon. WARDEN monitoring status unknown. Passive watch risk present.
Pre-node requirement: Do not start E-43 until crew sheets, level-up, away team, and loadout are displayed and confirmed.
Suggested away team: Rook, Vale/V-17, Rill/C-WARDEN. Ship support: Mara (keeps Saint mobile/masked), Ivo (monitors implant/personhood risk unless selected).`,
  },

  {
    id: 'location-kallisto-yard',
    category: 'location',
    tags: ['kallisto'],
    linkedEntityId: 'kallisto-yard',
    content: `Kallisto Station Yard (Completed): Where the Kallisto packet was found. WARDEN response suppressed. Rook extracted with Vale-17.`,
  },

  {
    id: 'location-ternary-lock',
    category: 'location',
    tags: [],
    linkedEntityId: 'ternary-lock',
    content: `Ternary Lock Station (Completed): Broker Sylas provided relay cache location. Confirmed Voss Program was real. Lattice trace escalated.`,
  },

  // ─── FACTION ENTRIES ──────────────────────────────────────────────────────
  // 'always' tag on the two central antagonist factions so they are always
  // available to the DM regardless of scene.

  {
    id: 'faction-warden',
    category: 'faction',
    tags: ['arc-1', 'always'],
    content: `C-WARDEN / WARDEN Program: Lattice Authority enforcement construct deployed specifically in response to the Kallisto incident — not standard patrol. Tomas Rill fragment partially suspends the protocol via consent layer. Stability marginal. Active Lattice trace on Rook Vale — elevation risk on deep Lattice use.`,
  },

  {
    id: 'faction-voss-program',
    category: 'faction',
    tags: ['arc-1', 'always'],
    content: `Voss Research Program: Ran under Lattice Authority research designation. Officially dissolved. Personnel records sealed/missing. V-Subject numbering (Vale = 17) implies at minimum 16 subjects. Likely ran 4–7 years before dissolution. Person-steering experiments confirmed.`,
  },

  {
    id: 'faction-heliomed',
    category: 'faction',
    tags: ['arc-1'],
    content: `Heliomed Special Review Detachment: Receiving authority on Vale's cradle records. Orientation risk for Vale — compliance continuity phrase exists. Cradle remote authority has been disabled.`,
  },
];
