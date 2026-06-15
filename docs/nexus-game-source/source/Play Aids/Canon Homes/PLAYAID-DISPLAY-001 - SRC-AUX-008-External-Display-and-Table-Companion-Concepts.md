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
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from PLAYAID-CORE-008 to PLAYAID-DISPLAY-001. Phase 10 reviewed the body for domain-first external-display boundaries and companion-routing language."
---

# External Display and Table Companion Concepts

## 1. Purpose

External display and table companion concepts describe future ways to present Nexus state, maps, dashboards, and encounter information outside plain chat.

This doc is exploratory source guidance, not an implementation commitment.

## 2. Current principle

The player should not have to ask for required display structure. When an encounter begins, the DM should provide the appropriate encounter-start display: TacMap, schematic, node/path list, or equivalent.

## 3. Near-term in-chat workflow

Near-term workflow:

1. Encounter starts.
2. DM outputs encounter-start packet.
3. TacMap spec/display appears if tactical space matters.
4. Node/path/objective list remains available.
5. State changes are updated in text and, when possible, in the display.
6. Route Node End Report or result card appears after resolution.

## 4. Long-term companion workflow

Possible future companion workflow:

1. AI writes structured TacMap data.
2. Renderer places reusable SVG/node/path/icon assets.
3. Display renders player-facing map.
4. DM/player actions update structured state.
5. Renderer regenerates or patches map when state changes.
6. Markdown node/path list remains exportable and readable.

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

If renderer/app/display fails, the Markdown node/path/objective list remains playable. Visual display may enhance the encounter, but it should not be the only representation of tactical truth.

## 9. Non-commitments

This doc does not commit Nexus to:

- a specific app;
- a specific renderer;
- Canva, Figma, Obsidian Canvas, or SVG as the only display path;
- automatic generation without validation;
- final map data schema.



