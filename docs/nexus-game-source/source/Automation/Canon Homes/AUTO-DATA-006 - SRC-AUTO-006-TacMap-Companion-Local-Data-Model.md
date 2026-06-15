---
project: "Nexus"
doc_id: "AUTO-DATA-006"
legacy_ids:
  - 'SRC-AUTO-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\14 TT VG Automation rev0.2\SRC-AUTO-006 - TacMap_Companion_Local_Data_Model.md'
title: "TacMap_Companion_Local_Data_Model"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "canon_home"
topic_family: "tacmap_companion_local_data_model"
owns_topics:
  - 'tacmap_companion_local_data_model'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first TacMap companion boundaries, packet terminology, and layer-model readability."
---

# TacMap Companion Local Data Model

## 1. Purpose

This document defines future-friendly local data-model concepts for a TacMap companion or renderer. It does not require building the companion now.

The lowest-risk v0.1 concept remains local copy/paste or file import. No API is required for v0.1.

## 2. Source authority

The mechanical TacMap rules remain in `Combat`. Display and play-aid requirements remain in `Play Aids`. Visual asset direction remains in `Art`.

A companion data packet mirrors a specific map instance for display, import, validation, or continuity. It does not own movement, cover, hazards, action economy, or encounter rules.

## 3. Candidate packet sections

A TacMap companion packet should eventually be able to represent:

- `tacmap_id`;
- scene/map title;
- scene type or map subtype;
- encounter-start metadata;
- round and turn state when relevant;
- nodes;
- paths;
- actors/tokens;
- hazards;
- objectives;
- interactables;
- clocks/counters;
- visible notes;
- hidden/DM notes;
- start positions;
- extraction nodes;
- cover/visibility/line markers;
- elevation, distance, and path tags;
- layer and asset references;
- delta/update operations when only changes are needed.

## 4. Layer model

A renderable TacMap may use layers such as:

1. **Backdrop layer** - environment image, station deck, asteroid mine, ship bay, exterior, habitat, corridor, or abstract schematic.
2. **Node-web layer** - nodes, labels, paths, movement connections, elevation cues.
3. **Marker/status layer** - cover, line-of-fire, visibility, hazards, path states, node states, terminals, exits, locks, objectives.
4. **Token/state layer** - player characters, enemies, drones, unknown contacts, downed markers, objective tokens.
5. **Hidden/DM layer** - unrevealed actors, traps, hidden routes, clocks, secret notes, false or uncertain sensor information.

A renderer may display all layers to the DM while showing only player-safe layers to players.

## 5. Node data

Nodes may include:

- stable node ID;
- display name;
- position/coordinate if rendered;
- tags;
- elevation;
- capacity if used;
- current node state;
- hazard status;
- interactables;
- objective/extraction markers;
- visibility/revealed status;
- player-safe note;
- DM-only note.

## 6. Path data

Paths may include:

- stable path ID;
- from-node and to-node IDs;
- movement cost;
- width or capacity constraint;
- path tags;
- hazard tags;
- climb/jump/crawl/door/elevator/maintenance tags;
- lock status;
- visibility/revealed status;
- current path state.

## 7. Marker data

Markers may include:

- marker ID;
- marker type;
- affected node, path, or node-path relationship;
- marker orientation;
- marker source/reason;
- player-visible or DM-only flag;
- asset reference;
- active/inactive state;
- notes for rules lookup.

Important marker families include:

- node-edge cover markers;
- visibility blocker markers;
- line-of-fire modifiers;
- path-status markers;
- hazards;
- terminals/interactables;
- objectives;
- exits and entry points.

## 8. Actor data

Actors may include:

- actor ID;
- display label;
- side/faction;
- current node or path position;
- token asset reference;
- statuses;
- HP or condition if needed;
- AP/MP/reaction state if needed;
- visible/hidden status;
- objective relevance;
- DM-only notes.

## 9. Asset reference model

A renderable map should be able to reference reusable assets without embedding all visual detail into the source data.

Candidate fields:

- SVG icon ID;
- sprite sheet reference;
- sprite symbol ID;
- placement coordinate;
- node/path anchoring;
- rotation;
- scale;
- layer;
- visibility;
- tint/state variant if later supported.

## 10. Delta updates

TacMap packets may eventually support delta updates rather than full replacements.

Delta categories may include:

- actor moved;
- actor status changed;
- node state changed;
- path state changed;
- hazard appeared or cleared;
- objective revealed or completed;
- marker added, rotated, hidden, or removed;
- clock advanced;
- reinforcement added;
- extraction route changed;
- hidden layer revealed.

Fast state-change support is a core requirement for useful TacMap automation.

## 11. Fallback principle

If the renderer fails, the structured table/list must still support play.

A minimum fallback should preserve:

- node IDs;
- path list;
- actor positions;
- objectives;
- hazards;
- current visible statuses;
- player-safe route options.


