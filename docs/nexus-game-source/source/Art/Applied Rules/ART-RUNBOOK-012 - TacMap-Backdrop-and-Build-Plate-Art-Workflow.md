---
project: "Nexus"
doc_id: "ART-RUNBOOK-012"
legacy_ids:
  - 'ART-012'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\19 Art Visual Direction rev0.3\ART-012 - TacMap_Backdrop_and_Build_Plate_Art_Workflow.md'
title: "TacMap_Backdrop_and_Build_Plate_Art_Workflow"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Art"
source_role: "applied_rule"
canon_status: "visual-direction"
placement_domain: "Art"
content_role: "applied_rule"
topic_family: "tacmap_backdrop_and_build_plate_art_workflow"
owns_topics:
  - 'tacmap_backdrop_and_build_plate_art_workflow'
borrows_topics: []
created: "2026-05-21"
last_updated: "2026-05-21"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 complete for the Art domain. TacMap backdrop workflow language now follows domain-first boundaries and preserves geometry-first visual guidance."
---

# TacMap Backdrop and Build Plate Art Workflow

> [!important] Revised vision reconciliation — 2026-07-11
> TacMap backdrops and build plates are historical concept/prototype evidence, not production spatial truth. Validated Location Modules own geometry, navigation, occlusion, interactions, and Cover Positions; generated or composited art may illustrate but cannot define legal play.

## 1. Purpose

This document gives Art Mode and prompt work the durable TacMap visual workflow. It should prevent endless redesign loops by making geometry preservation and overlay compatibility the first priority.

## 2. Art source order

1. Clean build plate / source geometry.
2. Annotated build plate for labels and interpretation.
3. Workbook data for node IDs, capacities, paths, cover, POIs, elevation, and doors.
4. Current user corrections in the active chat.
5. Older art handoffs and prompt experiments as reference only.

Do not average multiple plates into a new layout. If sources conflict, preserve geometry from the clean authority plate and use annotations only to interpret meaning.

## 3. Backdrop role

The backdrop is the flavor/art layer under a later tactical overlay.

It should:

- preserve the exact playable floorplan;
- support future node overlay;
- keep node pockets clear enough for tokens/circles;
- suggest node circularity with architecture, mats, lighting, or negative space;
- keep paths readable;
- reserve POI spaces for later vector overlays;
- avoid inventing extra rooms, corridors, doors, tactical platforms, or interactable-looking areas.

## 4. Node visibility rule

There are two different outputs:

- **Tactical display / SVG / tabletop plate:** node circles may be visible because circles are final tactical display grammar.
- **Flavor backdrop:** node circles should usually be subtle or absent because the overlay will add tactical UI later.

For flavor backdrops, suggest node positions through:

- floor pockets;
- curved surrounding equipment;
- local lighting;
- soft mats;
- negative space;
- wall/cover cuts that imply tactical use.

Do not make obvious hard UI circles unless the user requests a tactical display plate.

## 5. POI and prop rule

POI zones should remain generic unless explicitly assigned.

For generator/backdrop work, treat POI spaces as reserved sockets for later icons or vector overlays. Do not bake in terminals, lockers, corpses, samples, or objective flavor unless the current source says so.

## 6. Door and airlock art rule

Door openings must remain obvious and aligned with tactical doorway nodes.

Green or door-colored marks in build plates mean \"door/opening,\" not decorative striping. Backdrop art may reinterpret color marks as believable door lights, threshold frames, open pressure doors, or hazard trim, but must preserve the doorway location and tactical separation.

Airlocks and alternate starts should be visually legible without forcing a scenario-specific deployment unless the workbook says so.

## 7. Elevation and stairs art rule

Stairs and Level 2 regions must be visually legible.

Use:

- real stair treads or clear traversal forms;
- deck edge;
- railing/bannister;
- shadow line;
- trim;
- support structure;
- floor-height break.

A stair cannot read as grating, wall texture, or decorative clutter if it is tactically used.

## 8. Style anchor

Default TacMap backdrop style:

- square 1:1 top-down tactical video game backdrop;
- mostly top-down, with slight depth acceptable only if coordinate alignment remains stable;
- near-future industrial science vessel / NASApunk;
- utilitarian, lived-in, readable;
- ship exterior or void outside playable room boundaries when the map is a vessel cross-section;
- worn gray/off-white metal decking, dark hull framing, exposed conduits, pressure doors, blue diagnostics, orange hazard markings.

Avoid glossy Star Trek cleanliness, pure military bunker language, overdesigned anime armor motifs, medieval motifs, and clutter that makes paths unclear.

## 9. Prompt discipline

A good TacMap backdrop prompt should say:

- which plate is geometry authority;
- which plate is annotation only;
- no crop/rotate/mirror/stretch/redesign;
- preserve room shapes, walls, doors, corridors, cover, stairs, elevations, node pocket positions, and exterior hull/playable boundary;
- no new rooms, corridors, platforms, tactical objects, or obvious occupancy markers;
- reinterpret planning colors as environmental materials, not literal flat blocks;
- keep future overlay areas clear.

## 10. Current production target

The next Art/TacMap goal is one working TacMap for playtest. The output should prioritize:

1. source-truth geometry;
2. readable paths;
3. clear elevation/stairs;
4. overlay-compatible node pockets;
5. enough NASApunk vessel flavor to play.

Style polish can come later.

