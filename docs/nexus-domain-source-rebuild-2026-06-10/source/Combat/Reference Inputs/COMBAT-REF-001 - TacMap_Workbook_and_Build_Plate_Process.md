---
project: "Nexus"
doc_id: "COMBAT-REF-001"
legacy_ids:
  - 'SRC-COMBAT-009'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-009 - TacMap_Workbook_and_Build_Plate_Process.md'
title: "TacMap_Workbook_and_Build_Plate_Process"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "provisional_source"
placement_domain: "Combat"
content_role: "reference_input"
topic_family: "tacmap_build_process"
owns_topics:
  - 'tacmap_build_process'
borrows_topics:
  - 'tacmap_rules'
  - 'play_aid_display'
created: "2026-05-21"
last_updated: "2026-05-21"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary, with historical lineage preserved in legacy fields and reference-input bodies retained where they serve evidence or template continuity."
---

# TacMap Workbook and Build Plate Process

## 1. Purpose

This document owns the durable process for converting a Nexus TacMap idea, sketch, CAD/PDF, or screenshot into structured workbook data and build plates suitable for Art Mode, generator prompts, and later playtest overlay.

It does not own final visual style. It owns geometry, node logic, workbook fields, and build-plate preservation rules.

## 2. Source authority ladder

When producing or evaluating TacMap workbook/build plate materials, use this authority order:

1. User-provided current map sketch / CAD / PDF / screenshot.
2. User clarifications in the active chat.
3. Current workbook data.
4. Clean build plate.
5. Annotated build plate.
6. Older handoffs / older art chats as reference only.

The clean build plate is geometry authority for Art/generation. The annotated build plate is an interpretation aid only and is not a license to alter geometry.

## 3. Workbook purpose

The TacMap workbook is the structured source for playable tactical data. It should define:

- node IDs;
- node capacities;
- node categories;
- room / region / level membership;
- cover and obstruction references;
- path / edge data;
- POI flags;
- door / airlock logic;
- elevation and stair links;
- optional structure flags;
- notes needed for Art handoff.

The workbook should be the source of tactical truth. Images, SVGs, and backdrops are output layers.

## 4. Node ID assignment

Current working rules:

- Assistant may assign node IDs unless the user provides them.
- IDs should remain stable once a workbook/backdrop workflow begins.
- Doorway nodes should make room-side separation clear.
- POI nodes are tactical placeholders, not flavor assignments.
- Node IDs should be consistent across workbook, annotated build plate, clean plate, and later overlay.

Recommended ID pattern:

```text
N01, N02, N03...
```

Room/region prefixes may be used only when they improve readability without destabilizing overlay work.

## 5. Node capacity and mat / clearance model

Node capacity affects tactical occupancy and visual clearance. Node circles/mats are not merely decoration.

Working rules:

- Node capacity should be represented consistently in workbook data.
- Future token/node positions need clear floor pockets or mats.
- Mat width should be consistent by system choice, not improvised per node.
- If node size changes, apply the change consistently to all nodes of the same size.
- The central usable node area should remain clear for later overlay.
- Surrounding art may curve around nodes to imply tactical pockets.

Important distinction:

- **Node overlay:** final tactical UI/token layer.
- **Backdrop pocket/mat:** subtle environmental support for where the overlay will later sit.

The backdrop should suggest node logic through geometry without baking in hard UI circles unless the plate explicitly calls for visible node circles.

## 6. Door and airlock nodes

Default tactical doorway topology:

- four 1-capacity nodes per tactical doorway;
- two on one room side;
- two on the other room side;
- each side preserving left/right door positions and room-side separation.

An alternate model of two 2-capacity doorway nodes may be considered for wide or less tactical doors, but the current preferred default is four 1-capacity nodes.

Door nodes must remain visibly tied to doorway separation. They should not drift so far from the opening that the room boundary becomes ambiguous.

Doorways should be visibly open or door-coded on build plates. Green door marks from working plates indicate door/opening logic, not decorative striping.

Airlocks and alternate starts should be clearly marked when present. If multiple starts are possible, the workbook should distinguish structural airlocks from scenario-specific deployment choices.

## 7. POI handling

POI nodes stay generic unless the user explicitly assigns flavor.

Potential objective locations, lockers, terminals, samples, corpses, or other interactables may be marked as POI in the build plate, but the workbook/build plate should not bake in specific POI flavor unless provided.

Backdrops should reserve neutral insertion space for later standard POI vector overlays.

## 8. Cover and structure handling

Current cover concepts:

- full cover;
- half cover;
- impassible decoration or blocked structure;
- room-temperature objects/structures, meaning environmental structure without special tactical label unless later assigned.

Working rules:

- Do not erase or move fixed cover relationships to make the art prettier.
- Preserve central structures and node-to-cover relationships from the source.
- Optional structures should remain optional unless accepted into the workbook.
- Blue/POI/cover marks on annotated plates should be interpreted by function, not copied literally into final art.

Recent build-plate color convention:

- dark blue: impassible decoration / blocked structure;
- light blue: POI locations or reserved neutral floor space;
- green: doors/openings;
- grey hues: full and half cover when used in source markup.

## 9. Elevation, Level 2, and stairs

Elevation must be explicitly marked when it matters tactically.

Working rules:

- Level 2 / raised platforms must be visible in annotated plates.
- Stairs must read as stairs or traversal links, not grating or random texture.
- The stair shape should preserve the intended traversal geometry.
- Second-level nodes against a bannister should remain visually distinct from same-level floor nodes.
- Backdrop generation should use deck edge, railing, shadow line, trim, support structure, or floor-height break to show elevation.

## 10. Edge / path handling

Edges may bend around structures when needed, but paths between node pockets must remain obvious and uncluttered.

The workbook should track:

- from-node;
- to-node;
- base movement cost or distance;
- path tags;
- door/airlock/elevation involvement;
- hazard/cover/exposure notes;
- optional or scenario-specific status.

Do not invent tactically meaningful rooms or paths in the backdrop that are not in the workbook/source geometry.

## 11. Build plate types

### Clean Geometry Plate

Shows the layout as cleanly as possible. It is the geometry authority for Art Mode and generation.

### Annotated Interpretation Plate

Shows labels, node IDs, doors, POIs, cover, elevation, and notes. It is an interpretation aid only.

### Node Clearance Plate

Shows future node centers and capacity-sized clear areas. Used to keep generated backdrops compatible with overlay.

### Generator Prompt Plate

May combine only the information needed by the image generator. It should not introduce new geometry.

## 12. Geometry preservation rules

When making build plates or prompts:

- preserve room shapes;
- preserve wall positions;
- preserve doorway positions;
- preserve hallway widths;
- preserve exterior hull / playable boundary logic;
- preserve stairs and elevation;
- preserve cover relationships;
- preserve node centers and capacity logic;
- do not crop, rotate, mirror, stretch, simplify, beautify, or redesign the layout unless the user explicitly approves.

Scale may be adjusted globally when needed, but not by moving structures independently or changing relationships.

## 13. Handoff requirements to Art Mode

A usable Art handoff should include:

- clean geometry authority plate;
- annotated interpretation plate;
- workbook or workbook excerpt;
- node clearance/mat rules;
- door/airlock notes;
- POI reservation notes;
- cover/elevation notes;
- source authority order;
- explicit list of what the generator must not change.

## 14. Current next use

This process should be used to create one working TacMap for playtest. Playable geometry and overlay compatibility are more important than final art polish.


