---
project: "Nexus"
doc_id: "PLAYAID-TACMAP-001"
legacy_ids:
  - 'SRC-AUX-005'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\15 Auxiliary Play Aids rev0.2\SRC-AUX-005 - TacMap_Display_Aids.md'
title: "TacMap_Display_Aids"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Play Aids"
content_role: "canon_home"
topic_family: "tacmap_display_aids"
owns_topics:
  - 'tacmap_display_aids'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from PLAYAID-CORE-005 to PLAYAID-TACMAP-001. Phase 10 reviewed the body for domain-first TacMap display boundaries, layer-model readability, and support-surface language."
---

# TacMap Display Aids

## 1. Purpose

TacMap display aids help players understand tactical space, movement choices, cover, hazards, objectives, exits, hackable objects, enemy positions, and verticality.

`Combat` owns combat and TacMap rules. `Automation` owns possible structured TacMap state packets and renderer/data implications. `Play Aids` owns display-aid guidance. `Art` owns the visual asset language.

## 2. What a TacMap display aid should show

A good TacMap display aid may show:

- nodes;
- paths and movement cost cues;
- vertical level or elevation tags;
- cover, half cover, full cover, visibility blockers, and line-of-fire modifiers;
- exposed paths or exposed nodes;
- hazards and environmental objects;
- path status such as electrical, smoke, breach, suppression, locked route, or blocked route;
- node status such as overwatch, monitored, depressurized, burning, unstable, or hacked;
- hackable terminals or interactable objects;
- side objectives;
- enemy and ally positions;
- extraction, door, flank, or bypass routes;
- objective timers or counters when player-facing.

## 3. Required distinction

A TacMap aid is not the rules engine. It should make the current tactical situation legible while pointing back to source rules for movement, cover, reactions, hazards, action economy, encounter pacing, and current state.

The **structured node/path/objective data** remains the playable map truth. A generated image, collage, or visual backdrop is a display layer.

## 4. TacMap render/display spec direction

TacMap display should prioritize tactical readability over illustration quality.

Working principles:

- node-web diagram first, atmosphere second;
- numbered nodes must remain readable;
- path connections must remain clear;
- icons must not bury node/path truth;
- elevation and hazard cues should be visible at small scale;
- external truth table or node/path list remains available for accuracy;
- visual layers should be repairable during play.

## 5. Collage / paper-doll workflow

The preferred near-term workflow is a layered collage model:

1. **Backdrop layer** - station, mine, ship, asteroid, hab, exterior, or other environment image.
2. **Node-web layer** - circles, paths, labels, and movement or connection structure.
3. **Icon/marker layer** - cover, hazards, terminals, objectives, path status, node status, visibility or line modifiers.
4. **Token/state layer** - allies, enemies, unknown contacts, objects, downed markers, current positions.
5. **External truth table** - node, path, and objective data that remains queryable and editable.

This supports the "paper doll" concept: reusable components are placed and rearranged rather than regenerated from scratch every time.

## 6. Backdrop engulfing principle

The environment should engulf and flavor the tactical skeleton, but never hide it.

Good:

- backdrop makes the map feel like a mine, airlock, ship bay, reactor deck, or habitat corridor;
- nodes and paths remain clear;
- visual density surrounds the tactical structure.

Bad:

- decorative detail hides paths;
- the image looks atmospheric but cannot be used for decisions;
- tactical state cannot be repaired quickly.

## 7. Fast state-change requirement

If a TacMap aid cannot be updated quickly when play changes, it fails its core purpose.

Required fast updates may include:

- unit movement;
- objective status;
- path locked/unlocked;
- hazard appears/clears;
- cover/visibility status changes;
- door/airlock state changes;
- reinforcement markers;
- Downed/disabled status;
- extraction route opens/closes.

## 8. Node-edge and path-marker display support

Node-edge / line markers may show relative cover, visibility, or line-of-fire modifiers.

Current display principle:

- node = circle;
- path = line;
- node-edge marker = relationship into that node from the adjacent direction;
- path line may carry route/path status such as electrical, smoke, suppression, breach, or locked;
- marker should be placed at branch/stem-level display in source diagrams, not as a hidden rule matrix.

Cover is relative and visual, not a displayed cover matrix.

## 9. Player-facing versus DM-only versions

Player-facing TacMap displays should omit hidden enemy triggers, unrevealed reinforcements, concealed objectives, and private clocks.

DM-only displays may include spoiler layers, reinforcement triggers, hidden objective states, enemy AI plans, or concealed route tags.

A future renderer or Obsidian workflow should support player-safe and DM-only layers.

## 10. Display formats

| Format | Best use |
|---|---|
| Markdown node/path list | fast chat or phone-readable play. |
| Simple text diagram | quick tactical orientation. |
| SVG collage / sprite placement | reusable node-web and icon workflow. |
| Generated image | visual play aid, poster, or recap. |
| Obsidian Canvas | manually editable tactical sketch. |
| Local companion display | future play support using structured state. |
| PDF/printable | table-facing or archive-friendly session artifact. |

## 11. Minimal TacMap display specification

```text
TacMap Snapshot: [Encounter / Date]
Visibility: Player-facing or DM-only
Source rules: SRC-COMBAT-004, SRC-COMBAT-005, SRC-COMBAT-006

Nodes:
- A: Entry | cover: half from B | elevation: 0 | objects: door control
- B: Catwalk | cover: none | elevation: +1 | tag: exposed

Paths:
- A-B | cost: normal | tag: exposed

Units:
- Rill at A
- Guard at B

State changes:
- Door D1 locked
- Reinforcement clock 2/6
```

## 12. Prototype evidence note

The uploaded 64-node asteroid mine TacMap prototype is useful evidence for the desired visual/display direction: node-web overlay, airlock choke points, bypass opportunities, exterior/interior zones, low-G environment, and atmospheric backdrop.

It is **not** clean canonical playable map data yet. It should not be promoted as a finalized 64-node encounter until node IDs, paths, objectives, layers, and truth tables are structured and verified.

## 13. Display discipline

During play, use the smallest display that clarifies the decision. Do not force a polished map when a path list is enough. Do not bury tactical choices in a decorative image that cannot be edited or queried.



