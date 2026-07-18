---
project: "Nexus"
doc_id: "CORE-SPATIAL-001"
legacy_ids: []
legacy_paths: []
title: "Spatial_Gameplay_and_Location_Model"
doc_status: "working_draft"
working_state: "revised_vision_reconciled"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_canon"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "spatial_gameplay_and_location_model"
owns_topics:
  - "spatial_gameplay_and_location_model"
  - "location_mode_continuity"
  - "campaign_director_authority_boundary"
  - "campaign_fixture_boundary"
borrows_topics:
  - "lattice_100_resolution"
  - "combat_action_economy"
  - "character_recovery"
  - "character_build_structure"
created: "2026-07-11"
last_updated: "2026-07-17"
last_reviewed: "2026-07-17"
metadata_verified: true
metadata_notes: "Golden Truth Spatial Reconciliation #59. Reconciles the July 2026 accepted spatial-game decisions without inventing unresolved mechanics."
---

# Spatial Gameplay and Location Model

<!-- source-slice: core.spatial.authority-and-purpose -->
## 1. Authority and purpose

This document owns the cross-domain spatial gameplay model for Nexus. It reconciles the canonical source corpus with the accepted July 2026 decision baseline while preserving mechanics and content that the spatial transition does not invalidate.

Nexus is a local-first, spatial party RPG. Text, generated dialogue, live illustrations, dashboards, and developer tools support play; none of them replaces authoritative Location geometry, deterministic rules, or committed Game Truth.

When an older source document conflicts with this model, this document controls the spatial interpretation. The older material remains usable only where it is explicitly preserved, treated as fixture evidence, or does not depend on the superseded Encounter, node-web, DM-chat, or ship-combat assumptions.

<!-- source-slice: core.spatial.campaign-loop -->
## 2. Campaign and Location loop

- Each selected Route Node becomes one persistent, explorable Location of variable size.
- A Route Prospect commits enough identity, risk, and opportunity to support a choice; unchosen prospects do not require prebuilt Locations.
- A normal Location contains connected Areas, authored geometry, objects, actors, interaction points, Cover Positions, hazards, objectives, and state that persists across movement modes.
- Free Movement supports continuous navigation, exploration, in-world interaction, dialogue, checks, and discovery.
- Tactical Pressure begins when position, timing, hazards, objectives, or opposition make sequential action resolution consequential.
- Turn-Based Mode changes time resolution inside the same Location. It does not load a separate Encounter object or encounter map.
- Local Aftermath resolves consequences in place after Tactical Pressure ends. Free Movement may resume with the changed Location state.
- Route Node Resolution occurs when the Field Team departs the Location or returns to the Ship, not when a combat container reports results.

The authoritative Location persists through every transition. Actor positions, object state, hazards, objectives, discoveries, relationships, and committed consequences do not reset when the movement mode changes.

Departure preserves the same spatial truth. Every extracting Crewmate and accepted recruit must be present at the departure point or have a validated safe route for Rally to Extraction; automatic pathing may traverse that route, but no departure rule teleports an actor. Leaving without a living Crewmate requires an explicit player decision and commits them as Stranded with their exact Actor State and last known Location rather than inferring death or Permanent Loss.

<!-- source-slice: core.spatial.movement-and-position -->
## 3. Movement, interaction, and cover

Free Movement uses continuous world positions and navigable geometry. The player normally moves with WASD, selects objects for automatic pathing, and uses automatic facing unless a deliberate control overrides it.

During Turn-Based Mode, movement consumes MP according to the traversed path and applicable modifiers. AP, MP, reactions, the free micro-interaction, and the one-offense default remain in force. Free Movement does not spend combat AP or MP.

Authored **Interaction Positions** give actors valid destinations for using doors, terminals, characters, objects, and other in-world targets. Authored directional **Cover Positions** define cover alignment and usable protection. Occlusion and line of fire are derived independently from authoritative geometry; a decorative image or marker cannot grant cover by itself.

The former TacMap node/path/capacity/in-transit model is historical prototype evidence. Node webs, collages, backdrops, diagrams, and marker layers may remain derived play aids or Developer Mode diagnostics, but they are not spatial truth.

<!-- source-slice: core.spatial.tactical-pressure -->
## 4. Tactical Pressure and initiative

Tactical Pressure may represent combat, pursuit, a dangerous repair, an environmental emergency, a contested interaction, or another time-sensitive objective. It is not synonymous with combat and does not create a top-level Encounter authority.

When Turn-Based Mode begins, every relevant combatant rolls an individual Lattice-100 Initiative Roll. The resulting order remains fixed for that Tactical Pressure period unless a later accepted mechanic explicitly changes it. Relevant hazards and objectives may receive deterministic timing entries. Inactive Areas pause rather than simulating an entire Location.

Exact Initiative modifiers, tie handling, surprise, late entry, participant selection, and Tactical Pressure start/end thresholds remain unresolved. Alternating activation is no longer the baseline.

<!-- source-slice: core.spatial.interaction-and-generated-performance -->
## 5. In-world interaction and generated performance

The primary player-facing interaction loop is in the world, not a DM chat. Nearby targets may expose a Context Action Menu, while an Intent Bar supports freeform dialogue or unusual intent. The runtime interprets intent into structured proposals that deterministic systems validate before committing state.

Generated dialogue, narration, and live illustrations are performance layers. They may express validated state, propose bounded content, and make play feel responsive. They cannot invent mechanics, authoritative geometry, possessions, outcomes, or Game Truth.

<!-- source-slice: core.spatial.campaign-director -->
## 6. Campaign Director boundary

The Campaign Director is a hidden adaptive system inside the Campaign Director Harness. It maintains campaign pressures, factions, mysteries, unresolved threads, future Route Prospects, and dramatic context.

The Context Broker selects compact, traceable context for model calls. The Model Runtime may propose dialogue, description, interpretation, or future content. Deterministic rules and state services validate proposals and own commits. The Campaign Director cannot bypass mechanics, retcon committed truth, improvise authoritative Location geometry, force a predetermined result, or treat model memory as state.

Campaign Save preserves each departed Location's committed snapshot. The day-one game prioritizes new Route Node Locations and does not present a backtracking loop; recovery or development tooling that reloads a departed Location restores that snapshot unchanged. Production backtracking, elapsed-time evolution, and Campaign Director adaptation remain unresolved. This reconciles [ADR-0093](../../../../adr/0093-day-one-departed-locations-restore-committed-snapshots.md).

<!-- source-slice: core.spatial.ship-time -->
## 7. Downtime and the Ship

**Downtime** is the location-neutral interval between Route Nodes. It supports recovery, loadouts, Field Team selection, relationships, recruitment, preparation, and Route Choice through in-world spaces and interactions rather than a mandatory menu or return-to-ship phase. Downtime may occur aboard the Ship or at another suitable Location. This reconciles [ADR-0043](../../../../adr/0043-downtime-is-location-neutral-between-route-nodes.md).

The day-one vertical slice implements the Ship as its post-node Downtime Location. Continuing from the read-only Route Node End Report loads the persistent explorable Ship; this slice boundary does not make Ship return mandatory for later production content.

When the campaign has a Ship, it is a persistent explorable home Location rather than a required identity or universal starting assumption. Player Character identity, the optional Captain role, Ship ownership, and command authority are separate concepts. This reconciles [ADR-0042](../../../../adr/0042-player-character-and-ship-ownership-are-separate.md).

Five staffed Ship Systems provide preparation benefits and limited field support. Scarce Ship Modules change qualitative capability. Ship Conditions represent persistent narrative constraints and are resolved through appropriate characters, checks, resources, equipment, contacts, or opportunities.

Nexus has no separate ship-combat ruleset. Shipboard incursions use normal character-scale Tactical Pressure inside the Ship Location. Other ship threats resolve through validated choices, checks, conditions, and consequences. Additional Ship Frames are cross-campaign unlocks, not an active fleet.

<!-- source-slice: core.spatial.preserved-systems -->
## 8. Preserved systems

The revised spatial model preserves these systems unless a later accepted decision changes them:

- Lattice-100, visible rolls, Target Scores, margins, and result bands;
- deterministic rule validation, state deltas, mutation boundaries, logs, and recovery;
- 2 AP, Speed-derived MP, reactions, the free micro-interaction, and the one-offense default during Turn-Based Mode;
- Health, System Integrity, Defense, Firewall, Mitigation, Shields, statuses, hazards, objectives, enemy roles, and action families;
- downed, stabilization, recovery, rescue, revival, Permanent Loss, and consequence-preserving saves;
- the Character Build Stack: Bioform, Background, Discipline, Attributes, Skills, Skill Focuses, Abilities, Traits or Techniques, cyberware-derived Chassis tier, and equipment;
- shared-armory, loadout, route-choice, faction, resource, reward, and campaign-consequence structures; and
- local-first runtime behavior with model credentials outside browser-owned state.

Preservation does not make every legacy presentation or procedure current. A surviving mechanic must operate inside the persistent Location and deterministic authority model defined here.

<!-- source-slice: core.spatial.campaign-fixtures -->
## 9. Campaign Fixtures

Rook and Nexus Primer are **Campaign Fixtures**: stable regression, playtest, and content-mining inputs. They are not live default campaigns, controlling campaign premises, or complete templates for the revised game.

Fixture material may supply reviewed characters, items, hazards, objectives, locations, encounters-as-patterns, dialogue evidence, and balance lessons. Reuse requires extracting the useful modular source and reconciling it with current authority. Fixture-specific dashboards and saved states are historical evidence.

<!-- source-slice: core.spatial.unresolved -->
## 10. Explicit unresolved questions

This reconciliation does not invent missing mechanics. The following remain open:

- production movement units, MP conversion, collision radii, pathfinding, follower behavior, and navigation-failure handling;
- Location Module schema, assembly validation, connection rules, scale budgets, and production asset-kit budget;
- Cover Position arcs, alignment tolerances, occlusion implementation, flanking, elevation, and distance modifiers;
- Initiative modifiers, ties, surprise, late entry, and deterministic participant selection;
- exact Tactical Pressure start/end thresholds and Local Aftermath duration or interruption rules;
- Interaction Position schema, Context Action Menu schema, Intent Bar interpretation, and auto-path failure UX;
- Campaign Director state, harness interfaces, evaluation, recovery, cost control, and model fallback;
- Growth Trait timing and cost, Campaign Build migration, and Crew Archive edge cases;
- Ship Support charges and range, Ship Condition resolution costs, and Ship Module slot details;
- Live Illustration caching, fallback, style consistency, and content-safety handling; and
- the exact extraction boundary for Rook and Nexus Primer fixture material.

<!-- source-slice: core.spatial.family-reconciliation -->
## 11. Source-family reconciliation

The July 2026 reconciliation reviewed the affected source families with these dispositions:

| Family | Preserved | Replaced or historicalized |
|---|---|---|
| Core | route pressure, consequences, crew, recovery, preparation | tabletop-first identity, menu-like Ship Phase, one-main-Encounter mission structure |
| Combat | AP/MP/reactions, actions, defenses, hazards, objectives, recovery | alternating activation, node-only placement, Encounter start/end authority |
| Automation | deterministic state, validation, packets, logs, local-first boundaries | TacMap companion as authority, model/DM mutation authority, tabletop-first runtime constraint |
| Play Aids | legibility, derived diagrams, markers, player-safe views | collage, backdrop, node web, or external table as spatial truth |
| Ship | preparation, staffed support, modules, conditions | separate ship combat, component attrition simulation, menu-only home phase |
| Characters | Character Build Stack, crew identity, progression, recovery | Rook crew as active default, unresolved initiative assumptions |
| Content | objectives, hazards, enemy roles, bypasses, route consequences | Encounter library as top-level container, TacMap-ready as production spatial definition |
| Modes and dashboards | playtest evidence, state visibility, developer diagnostics | primary DM chat, live Rook campaign authority, mode docs as product runtime authority |
| Art | visual identity, modular production assets, illustrative support | generated backdrop or collage defining geometry, cover, or legal movement |

Reference Inputs may retain historical terminology when their non-controlling role is clear. Canon Homes, Applied Rules, Open Questions, and Current State surfaces must follow this reconciliation when they are used for current work.
