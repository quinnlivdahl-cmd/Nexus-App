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
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first TT versus VG boundaries, encounter-start packet language, and cross-domain ownership notes."
---

# TT Mode vs VG Mode Design Boundaries

## 1. Tabletop-first priority

Nexus remains tabletop-first. DM Mode and source documents are the design authority for current play.

Automation may support play, but it should not outrank:

- the current source docs;
- the DM's tactical and narrative judgment;
- active campaign state;
- player-facing clarity;
- preservation of unresolved options.

## 2. What automation may assist

Automation can assist with:

- encounter-start packets;
- TacMap rendering or schematic display;
- node/path/objective tables;
- actor and token position updates;
- state deltas such as hazards, locks, statuses, and objective progress;
- Route Node End Report generation;
- dashboard/state summaries;
- export/import packets;
- validation checklists.

Automation should make the table faster and clearer, not make the game less repairable.

## 3. Tactical encounter automation rule

When a tactical encounter begins and a TacMap is required, the system/DM should present TacMap support automatically. The player should not need to ask for the map or node/path structure.

The automation-adjacent encounter-start packet may include:

- scene frame;
- objective and pressure;
- TacMap image, schematic, or node-web list;
- node/path/objective data;
- actor positions and visible hazards;
- player-safe information layer;
- DM-only notes or hidden data where needed.

`Modes` owns DM execution templates. `Core` owns the core requirement. `Play Aids` owns display-aid format. `Automation` owns the data and tooling implications.

## 4. TT/VG boundary

A future VG or companion may translate tabletop structures into runtime objects, but current tabletop play should not be constrained by app assumptions.

Working TT-first constraints:

- short player commands remain valid when intent, target, risk, and resource are clear;
- DM Mode may summarize and resolve complex actions without requiring app-like inputs;
- visual maps are aids, not sole source truth;
- Markdown source remains creative authority;
- runtime packets mirror current play state rather than replacing source docs.

## 5. Future VG translation

Future VG or app work may use:

- node-web movement rather than grid movement;
- object interactions for terminals, doors, hazards, and objectives;
- structured route-node maps;
- player-safe and hidden-state layers;
- exportable campaign and TacMap packets.

These remain future translation paths, not current development commitments.

## 6. Non-commitments

This source does not commit to:

- a live app;
- a Replit build;
- API-based synchronization;
- fully automated tactical adjudication;
- final JSON schemas;
- mobile app UI architecture;
- replacing DM Mode.


