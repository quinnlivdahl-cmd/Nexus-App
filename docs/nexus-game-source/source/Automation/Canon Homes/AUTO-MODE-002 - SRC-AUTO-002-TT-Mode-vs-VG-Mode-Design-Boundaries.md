---
project: "Nexus"
doc_id: "AUTO-MODE-002"
legacy_ids:
  - 'SRC-AUTO-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\14 TT VG Automation rev0.2\SRC-AUTO-002 - TT_Mode_vs_VG_Mode_Design_Boundaries.md'
title: "TT_Mode_vs_VG_Mode_Design_Boundaries"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "canon_home"
topic_family: "tt_mode_vg_mode_design_boundaries"
owns_topics:
  - 'tt_mode_vg_mode_design_boundaries'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first TT versus VG boundaries, encounter-start packet language, and cross-domain ownership notes."
---

# Runtime and Automation Design Boundaries

> [!important] Spatial RPG reconciliation — 2026-07-16
> Nexus is now a local-first spatial party RPG. The tabletop lineage remains valuable design evidence, but it is not the current product boundary. `CORE-SPATIAL-001` controls spatial play; accepted ADRs control the runtime decisions cited below.

## 1. Current priority

Nexus is a local-first spatial party RPG. Current domain source documents define the game, deterministic systems own rules and committed state, and generated performance supports the experience without becoming authority.

Automation and model-assisted performance must not outrank:

- the current source docs;
- deterministic rules and validated outcomes;
- committed Game Truth;
- player-facing clarity;
- preservation of unresolved options.

## 2. What automation may assist

Automation can assist with:

- encounter-start packets;
- TacMap rendering or schematic display;
- Location geometry, object, and objective state;
- actor and token position updates;
- state deltas such as hazards, locks, statuses, and objective progress;
- Route Node End Report generation;
- dashboard/state summaries;
- export/import packets;
- validation checklists.

Automation should make play faster, clearer, and more responsive without making the game less recoverable or auditable.

## 3. Tactical encounter automation rule

When Tactical Pressure begins, the runtime continues inside the same authoritative Location and presents the controls and information needed for turn-based resolution. The player should not need to request a separate encounter map.

The transition packet may include:

- scene frame;
- objective and pressure;
- the current Location view or derived tactical overlay;
- geometry, movement, cover, interaction, and objective data;
- actor positions and visible hazards;
- player-safe information layer;
- DM-only notes or hidden data where needed.

`Core` owns Location continuity and Tactical Pressure. `Combat` owns turn-based rules. `Play Aids` owns derived display formats. `Automation` owns runtime packets, state routing, validation support, and tooling implications.

## 4. Runtime boundary

The application expresses current source rules through local runtime objects. App implementation may not silently redefine those rules.

Current constraints:

- short player commands remain valid when intent, target, risk, and resource are clear;
- the in-world interface supports authored actions and freeform intent;
- authoritative geometry and structured state, not a generated image, determine spatial truth;
- domain source remains the textual definition of the game;
- runtime packets carry current play state without replacing source docs;
- Game Truth and Director State remain separate local lanes; and
- model output is a bounded proposal, never a direct mutation.

These boundaries reflect [ADR-0035](../../../../adr/0035-model-runtime-is-provider-neutral-and-task-routed.md), [ADR-0036](../../../../adr/0036-game-truth-and-director-state-use-separate-local-lanes.md), and [ADR-0037](../../../../adr/0037-generated-performance-uses-local-dialogue-sessions-and-bounded-proposals.md).

## 5. Current application surfaces

The application may use:

- continuous movement over authored Location geometry;
- object interactions for terminals, doors, hazards, and objectives;
- structured route-node maps;
- player-safe and hidden-state layers;
- exportable campaign and Location-state packets;
- task-routed, provider-neutral model calls; and
- local Dialogue Sessions for generated performance.

Enemy decisions may use a model-proposed, bounded Tactical Directive, but legal actions, target validation, movement, rolls, costs, effects, and commits remain deterministic. This reconciles [ADR-0038](../../../../adr/0038-enemy-tactical-intent-is-model-proposed-and-locally-executed.md).

## 6. Non-commitments

This source does not commit to:

- fully automated tactical adjudication;
- final JSON schemas;
- a specific model provider;
- cloud-owned game state;
- model-authored geometry or mechanics; or
- model authority over committed state.
