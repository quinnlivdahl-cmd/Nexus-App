---
project: "Nexus"
doc_id: "CORE-DESIGN-001"
legacy_ids:
  - 'SRC-CORE-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\07 Core Game Campaign rev0.3\SRC-CORE-003 - Nexus_Tabletop_First_Design_Principles.md'
title: "Nexus_Spatial_RPG_Design_Principles"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "spatial_rpg_design_principles"
owns_topics:
  - 'spatial_rpg_design_principles'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Nexus Spatial RPG Design Principles

## 1. Product scope

Nexus is a local-first, full 2D spatial party RPG. The player controls one Player Character and a changing crew through persistent explorable Locations, Route Nodes, Tactical Pressure, relationships, growth, faction consequences, and Legacy World continuation.

The earlier tabletop/notebook form remains useful prototype and playtest evidence. It does not define the current product boundary.

## 2. Deterministic authority

Authoritative geometry, rules, Game Truth, and validated state changes are deterministic and local. Generated dialogue, narration, illustrations, and Campaign Director planning support play but cannot invent mechanics, geometry, possessions, legal outcomes, or committed truth.

The Model Runtime is provider-neutral and task-routed. Game Truth and Director State use separate local lanes. Model output is a bounded proposal that must pass deterministic validation before any atomic commit. Detailed boundaries live in `Automation` and reconcile [ADR-0035](../../../../adr/0035-model-runtime-is-provider-neutral-and-task-routed.md), [ADR-0036](../../../../adr/0036-game-truth-and-director-state-use-separate-local-lanes.md), and [ADR-0037](../../../../adr/0037-generated-performance-uses-local-dialogue-sessions-and-bounded-proposals.md).

## 3. In-world interaction

The main interaction surface is the world. Nearby authored Context Actions handle common verbs; a freeform Intent Bar expresses dialogue and unusual intent. Short commands remain valid when intent is clear. Clarification and confirmation are reserved for materially consequential ambiguity, not used as routine friction.

Freeform actions compose existing rules rather than bypassing them. Proximity actions may link movement and interaction in a staged validated commit. `Combat` owns the exact action procedure.

Clear short commands remain useful input, for example:

- hack the door switch;
- climb the wall;
- scan the turret;
- aim at the weak point;
- suppress the sniper;
- dash to the console; or
- anchor the hallway.

## 4. Persistent spatial play

One authoritative Location persists through Free Movement, Tactical Pressure, Turn-Based Mode, and Local Aftermath. Switching time resolution does not create a separate Encounter map or reset actors, objects, hazards, objectives, or consequences.

Continuous positions, navigable geometry, Interaction Positions, Cover Positions, occlusion, and line of fire define spatial truth. Images, overlays, diagrams, and node webs may aid display or diagnostics but cannot define legal movement or cover.

## 5. Meaningful preparation and consequence

Route Choice precedes Deployment Preparation. Skills, crew, equipment, relationships, Ship capabilities when present, and prior choices should change the available approaches and consequences. Good planning may avoid a roll, reduce risk, reveal an option, or change the problem without erasing drama.

The campaign records concrete aftermath. A consequence must change current play, future options, relationships, resources, chronology, or the Legacy World rather than existing only as flavor text.

## 6. Crew and character continuity

The Player Character is not automatically the Captain, Ship owner, or permanent embodiment. Character identity, Embodiment, cross-campaign archive history, Campaign Build, current crew membership, and live Actor State remain separate ownership layers.

Characters begin each campaign at a complete level 0, advance after Node 0 and each subsequent Route Choice, and may carry validated identity and history across campaigns without carrying the entire prior run-specific build.

## 7. Legibility and player agency

The interface must make current state, meaningful choices, known risks, Travel Consequences, objectives, pressure, and committed results legible. Required play structure appears when needed; the player should not have to ask the runtime to reveal the controls or information necessary to act.

Dense state belongs in readable trackers, logs, evidence views, route views, and character panels. Hidden Director information remains hidden without making player-visible outcomes arbitrary.

## 8. Visual and asset boundary

Authoritative Location geometry and structured state determine legal play. Rendered environments, live illustrations, portraits, effects, route views, dashboards, diagrams, and other visual assets communicate or perform that truth; they do not override it.

Art direction and production assets route to `Art`. Derived diagrams and reference displays route to `Play Aids`. Player-facing state presentation routes to the application UI and `Dashboards`. Structured geometry, state, visibility, and runtime traceability route to `Core`, `Automation`, and the relevant rules domain.

## 9. Resilience and repairability

Local state is versioned, auditable, recoverable, and exportable. Invalid model proposals, unavailable providers, interrupted transactions, or exhausted optional model budget must degrade gracefully without corrupting Game Truth or preventing an active scene from reaching coherent completion.

## 10. Source discipline

Domain source docs are the current textual definition of Nexus. Accepted ADRs control the specific decisions they make until those decisions are reconciled into their owning domain docs. Once reconciled, use the domain doc for the current rule and the ADR for rationale and provenance. Unaffected source material remains current.

Playtests and runtime discoveries should route corrections to the owning domain source or an explicit open question. Temporary convenience, generated text, model memory, implementation accident, and fixture state do not silently become game rules.

## 11. Preserved prototype lessons

The spatial RPG preserves the useful lessons of the tabletop prototype: visible Lattice rolls, human-readable state, short natural-language intent, repairability, meaningful planning, tactical and nonviolent spatial clarity, consequences that carry forward, and systems that can be tested in play before unnecessary complexity is added.
