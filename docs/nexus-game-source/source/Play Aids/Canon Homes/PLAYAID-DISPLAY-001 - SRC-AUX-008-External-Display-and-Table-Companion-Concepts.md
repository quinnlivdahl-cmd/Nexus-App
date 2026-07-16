---
project: "Nexus"
doc_id: "PLAYAID-DISPLAY-001"
legacy_ids:
  - 'SRC-AUX-008'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\15 Auxiliary Play Aids rev0.2\SRC-AUX-008 - External_Display_and_Table_Companion_Concepts.md'
title: "External_Display_and_Table_Companion_Concepts"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Play Aids"
content_role: "canon_home"
topic_family: "external_display_and_table_companion_concepts"
owns_topics:
  - 'external_display_and_table_companion_concepts'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from PLAYAID-CORE-008 to PLAYAID-DISPLAY-001. Phase 10 reviewed the body for domain-first external-display boundaries and companion-routing language."
---

# External Display and Table Companion Concepts

## 1. Purpose

External display and table companion concepts describe future ways to present Nexus state, maps, dashboards, and encounter information outside plain chat.

This doc is exploratory source guidance, not an implementation commitment.

## 2. Current principle

The player should not have to ask for required display structure. When Tactical Pressure begins, the runtime exposes the current Location view, initiative, objectives, hazards, visible actors, and legal control surface automatically.

## 3. Near-term in-chat workflow

Near-term workflow:

1. Tactical Pressure begins inside the current Location.
2. The runtime exposes player-safe tactical state and controls.
3. Derived overlays appear when they improve spatial clarity.
4. Structured Location/objective state remains inspectable for accessibility and diagnostics.
5. Committed state changes update the display.
6. Route Node End Report or result card appears after resolution.

## 4. Long-term companion workflow

Possible future companion workflow:

1. Authored Location data supplies geometry and structured state.
2. Renderer places reusable environment, object, actor, and overlay assets.
3. Display renders player-facing map.
4. Validated player and deterministic system actions update structured state.
5. Renderer regenerates or patches map when state changes.
6. A compact structured-state summary remains exportable and readable.

## 5. Useful display targets

Potential display targets:

- TacMap;
- route-node map;
- current objectives;
- pressure/clocks;
- visible actors;
- crew/ship state;
- loadout/current inventory;
- status/condition list;
- route-node end report;
- faction/route summary.

## 6. Phone and PC usage

Displays should support:

- mobile chat readability;
- Obsidian view mode;
- foldable/callout dashboard patterns;
- optional external screen/table display;
- quick repair during play.

## 7. Local companion concept

A later local companion could read structured Markdown or JSON-like state and render maps or dashboards. `Automation` owns runtime and data strategy. `Play Aids` only records what the display must communicate.

## 8. Fallback principle

If an optional overlay, generated asset, or external display fails, structured local Location and Game Truth state remains available for recovery and deterministic play. A renderer failure must not replace or corrupt authoritative spatial state.

## 9. Non-commitments

This doc does not commit Nexus to:

- a specific app;
- a specific renderer;
- Canva, Figma, Obsidian Canvas, or SVG as the only display path;
- automatic generation without validation;
- final map data schema.


