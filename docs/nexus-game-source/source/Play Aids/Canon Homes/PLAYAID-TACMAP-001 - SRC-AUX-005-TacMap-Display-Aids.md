---
project: "Nexus"
doc_id: "PLAYAID-TACMAP-001"
legacy_ids:
  - 'SRC-AUX-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\15 Auxiliary Play Aids rev0.2\SRC-AUX-005 - TacMap_Display_Aids.md'
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
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from PLAYAID-CORE-005 to PLAYAID-TACMAP-001. Phase 10 reviewed the body for domain-first TacMap display boundaries, layer-model readability, and support-surface language."
---

# Location and Tactical Display Aids

## 1. Purpose

Location and tactical display aids help players understand movement choices, cover, hazards, objectives, exits, hackable objects, actor positions, and verticality.

`Core` owns Location authority. `Combat` owns tactical rules. `Automation` owns structured Location packets and renderer/data implications. `Play Aids` owns display-aid guidance. `Art` owns visual asset language.

## 2. What a Location display aid should show

A good display aid may show:

- authored geometry, Areas, passages, and movement-cost cues;
- vertical level or elevation tags;
- Cover Positions, protection level, visibility blockers, and line-of-fire cues;
- exposed spaces and suppressed approaches;
- hazards and environmental objects;
- Area, field, passage, surface, and object state such as electrical, smoke, breach, suppression, locked, monitored, depressurized, burning, unstable, or hacked;
- hackable terminals or interactable objects;
- side objectives;
- enemy and ally positions;
- extraction, door, flank, or bypass routes;
- objective timers or counters when player-facing.

## 3. Required distinction

A display aid is not the rules engine. It makes the current situation legible while pointing back to source rules for movement, cover, reactions, hazards, action economy, Tactical Pressure, and current state.

Authoritative **Location geometry and structured state** remain the playable truth. A generated image, collage, diagram, or visual backdrop is a display/performance layer.

## 4. Location render/display direction

The Location display should prioritize tactical readability while supporting the intended visual world.

Working principles:

- walkable geometry and actor placement must remain readable;
- doors, passages, Interaction Positions, and Cover Positions must remain legible when relevant;
- icons and effects must not bury authoritative state;
- elevation and hazard cues should be visible at small scale;
- Developer Mode may expose structured geometry/state diagnostics for accuracy;
- visual layers should be repairable during play.

## 5. Collage / paper-doll workflow

The display uses a layered model:

1. **Environment layer** - rendered authored Location geometry and visual dressing.
2. **Interaction layer** - doors, terminals, objectives, Interaction Positions, and other usable objects.
3. **Tactical overlay** - Cover Positions, hazards, visibility or line cues, movement previews, and player-safe state.
4. **Actor/state layer** - allies, enemies, unknown contacts, objects, statuses, and continuous positions.
5. **Diagnostic layer** - optional Developer Mode geometry, navigation, and structured-state inspection.

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
| Structured state summary | accessibility, debugging, and compact reference. |
| Simple text diagram | quick derived orientation or fallback. |
| SVG/canvas overlay | reusable markers and Developer Mode diagnostics. |
| Generated image | visual play aid, poster, or recap. |
| Obsidian Canvas | manually editable tactical sketch. |
| Local companion display | future play support using structured state. |
| PDF/printable | table-facing or archive-friendly session artifact. |

## 11. Minimal Location display specification

```text
Location Snapshot: [Location / Date]
Visibility: Player-facing or DM-only
Source rules: SRC-COMBAT-004, SRC-COMBAT-005, SRC-COMBAT-006

Areas and geometry:
- Entry Deck | elevation: 0 | objects: door control
- Catwalk | elevation: +1 | state: exposed

Authored positions:
- Interaction Position: Door D1 control
- Cover Position: Catwalk barrier | Half Cover | facing entry approach

Units:
- Rill at A
- Guard at B

State changes:
- Door D1 locked
- Reinforcement clock 2/6
```

## 12. Prototype evidence note

The uploaded 64-node asteroid mine TacMap prototype is useful evidence for visual/display direction: airlock choke points, bypass opportunities, exterior/interior zones, Low-G environment, and atmospheric backdrop.

It is **not** canonical playable Location data. Reuse requires extracting its useful topology and content into authored continuous geometry, objects, objectives, Interaction Positions, Cover Positions, and validated state.

## 13. Display discipline

During play, use the smallest display that clarifies the decision. Do not force a polished map when a path list is enough. Do not bury tactical choices in a decorative image that cannot be edited or queried.

