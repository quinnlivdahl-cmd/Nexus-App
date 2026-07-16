---
project: "Nexus"
doc_id: "AUTO-DATA-006"
legacy_ids:
  - 'SRC-AUTO-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\14 TT VG Automation rev0.2\SRC-AUTO-006 - TacMap_Companion_Local_Data_Model.md'
title: "Location_Runtime_Local_Data_Model"
doc_status: "working_draft"
working_state: "revised_vision_reconciled"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "canon_home"
topic_family: "location_runtime_local_data_model"
owns_topics:
  - 'location_runtime_local_data_model'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Reconciled the former TacMap companion packet into the current local persistent-Location runtime model."
---

# Location Runtime Local Data Model

## 1. Purpose

This document defines local data-model concepts for persistent Location play, derived tactical display, traceability, and recoverable state. It does not make a renderer, image, model provider, or Campaign Director authoritative over geometry or Game Truth.

## 2. Authority boundary

Domain source defines what Location and rules concepts mean. Authored Location data defines geometry and valid authored positions. Game Truth owns committed runtime state. Director State remains separate and hidden. The Model Runtime and renderers consume bounded packets and return proposals or displays; they do not directly mutate either state lane.

## 3. Candidate Location packet

A local Location packet may include:

```text
location_identity
area_index
navigable_geometry
collision_and_blockers
doors_passages_and_objects
interaction_positions
cover_positions
hazards_and_fields
objectives_and_interactables
actors_and_continuous_positions
visibility_and_discovery_state
player_safe_view
derived_display_refs
state_version_and_transaction_ref
```

Exact schemas remain implementation work.

## 4. Geometry and authored positions

Geometry data should represent walkable surfaces, solid boundaries, occluders, elevation, doors, passages, and other navigation constraints. Interaction Positions and Cover Positions are authored semantic anchors attached to that geometry, not replacements for it.

Derived navigation meshes, path previews, visibility results, and tactical overlays may be cached for performance. They must be reproducible from authoritative geometry and state or invalidated when those inputs change.

## 5. Actor and object state

Actor data may include stable identity reference, current Embodiment reference, continuous position, facing when relevant, collision footprint, movement state, AP, MP, reactions, durability, statuses, visibility, and current action transaction.

Object data may include identity, geometry reference, state, durability when relevant, interaction permissions, visibility, ownership, hazard or objective relationship, and committed deltas.

## 6. Visibility layers

Packets and displays distinguish:

- player-visible truth;
- discovered but currently out-of-view truth;
- hidden Game Truth;
- Director-only planning state; and
- uncertain, false, or sensor-mediated information presented intentionally.

A player-safe packet never exposes hidden truth merely because the local store contains it.

## 7. Derived display and assets

Rendered environments, overlays, icons, portraits, illustrations, and effects reference current state. They may improve clarity or performance but cannot define legal geometry, cover, movement, or outcomes.

Asset references should identify purpose, version, source, layer, cache status, and fallback. A missing or stale asset must not prevent text/state fallback or deterministic play.

## 8. Delta updates and transactions

State changes use validated typed deltas with state version and transaction references. A delta may change actor position, AP or MP, object state, hazard state, objective progress, visibility, or another committed field.

Proximity actions use linked staged commits: completed movement persists, then the interaction is revalidated and commits atomically if still legal. Invalid or interrupted interactions do not roll back completed movement.

## 9. Traceability and recovery

Runtime records should make it possible to answer which source slices, state version, visibility policy, rules result, model proposal, validation result, and transaction produced a displayed or committed outcome. Local snapshots, logs, and deterministic revalidation support recovery after interruption or failure.

## 10. Fallback principle

If generated performance, a model provider, renderer, or optional asset is unavailable, Nexus continues from structured local Location and Game Truth state. Fallback may reduce presentation quality; it must not corrupt state or make an active scene impossible to complete.
