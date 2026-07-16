---
project: "Nexus"
doc_id: "PLAYAID-OVERVIEW-001"
legacy_ids:
  - 'SRC-AUX-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\15 Auxiliary Play Aids rev0.2\SRC-AUX-002 - Auxiliary_Play_Aids_Overview.md'
title: "Auxiliary_Play_Aids_Overview"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Play Aids"
content_role: "canon_home"
topic_family: "auxiliary_play_aids_overview"
owns_topics:
  - 'auxiliary_play_aids_overview'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from PLAYAID-CORE-002 to PLAYAID-OVERVIEW-001. Phase 10 reviewed the body for domain-first display boundaries, packet language, and source-pointer routing."
---

# Auxiliary Play Aids Overview

<!-- source-slice: playaid.overview.definition -->
## 1. Definition

Auxiliary play aids are supporting materials that make Nexus easier to play, display, share, teach, archive, or run. They include route maps, derived Location/tactical displays, handouts, quick references, dashboards, printable sheets, and external-display concepts.

They are **not** automatically source truth. They must point back to the appropriate source docs for rules, state, lore, or art direction.

<!-- source-slice: playaid.overview.non-authority-rule -->
## 2. Non-authority rule

A polished aid is not automatically more authoritative than a Markdown source doc. If an aid conflicts with source rules or campaign state, the source/state document wins until the conflict is resolved.

Required distinction:

- source rule = persistent design truth;
- live dashboard = current state/tracker truth;
- play aid = display or usability layer;
- visual prototype = reference or inspiration;
- raw asset = reusable component;
- renderer/export = implementation layer.

## 3. Design goals

Good Nexus play aids should be:

- fast to read;
- useful on phone and in Obsidian;
- easy to repair during play;
- clear about player-facing vs DM-only information;
- compatible with Markdown fallback;
- compatible with future structured data/renderer workflows;
- visually consistent with Nexus art direction without hiding tactical data.

<!-- source-slice: playaid.overview.aid-categories -->
## 4. Aid categories

Current aid categories include:

- Route-node map companions.
- Solar-system and faction displays.
- Location and tactical display aids.
- Player-facing dashboards and handouts.
- Printable / PDF / Canva / Figma style aids.
- External display and table companion concepts.
- Status/icon/legend references.
- Encounter-start and route-node-end packets.

<!-- source-slice: playaid.overview.trigger-rules -->
## 5. Trigger rules

A play aid should appear when it reduces friction or prevents confusion.

Strong triggers:

- tactical encounter starts;
- route choice opens;
- escape/pursuit structure begins;
- route node ends and consequences must be summarized;
- player-facing state changes significantly;
- complex objective/hazard/status information must stay visible;
- a printable/session artifact is needed.

The player should not have to ask for required tactical display when Tactical Pressure begins.

<!-- source-slice: playaid.overview.encounter-start-packet -->
## 6. Tactical Pressure display bundle

A Tactical Pressure display bundle is the player-safe aid set exposed when sequential consequential resolution begins inside the current Location.

Minimum expected components:

- scene frame;
- immediate objective or pressure;
- visible actors and hazards;
- current Location view or derived tactical overlay;
- relevant geometry, objectives, Interaction Positions, Cover Positions, and visible state;
- current visible statuses and spatial conditions;
- immediate player options;
- hidden/DM-only layers kept separate.

`Modes` owns display template execution. `Core` owns the core requirement. `Combat` owns tactical rules. `Play Aids` owns play-aid display guidance.

## 7. Obsidian display rule

Dashboards and Markdown aids should be designed to display correctly in Obsidian view mode. Avoid relying on behavior that works only in edit mode.

For dashboards and structured aids:

- prefer Obsidian-native headings, callouts, and folds;
- keep live state visible enough to scan;
- do not bury important current state in unreliable HTML dropdowns;
- avoid wide tables on mobile unless the information truly benefits from tabular layout.

<!-- source-slice: playaid.overview.required-source-pointers -->
## 8. Required source pointers

Each substantial play aid should state or imply the relevant owners:

- Core loop and mission structure: `Core`.
- Combat and Turn-Based spatial rules: `Combat`.
- Skills and checks: `Skills`.
- Equipment and loadout: `Equipment`.
- Content and encounter libraries: `Content`.
- Automation and data model implications: `Automation`.
- Dashboards and current state: `Dashboards`.
- Art and visual direction: `Art`.
