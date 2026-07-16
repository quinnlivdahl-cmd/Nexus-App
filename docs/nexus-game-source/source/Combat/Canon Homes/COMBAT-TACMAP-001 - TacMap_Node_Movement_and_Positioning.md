---
project: "Nexus"
doc_id: "COMBAT-TACMAP-001"
legacy_ids:
  - 'SRC-COMBAT-004'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-004 - TacMap_Node_Movement_and_Positioning.md'
title: "Location_Movement_and_Positioning"
doc_status: "working_draft"
working_state: "revised_vision_reconciled"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_canon"
placement_domain: "Combat"
content_role: "canon_home"
topic_family: "location_movement_and_positioning"
owns_topics:
  - 'location_movement_and_positioning'
  - 'turn_based_movement'
  - 'positioning'
borrows_topics:
  - 'character_body_fit'
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Reconciled the TacMap node prototype into the current persistent Location, continuous-position, and authored-position model while retaining stable source-slice IDs for retrieval continuity."
---

# Location Movement and Positioning

<!-- source-slice: combat.tacmap.core-definition -->
## 1. Authoritative spatial model

Combat and other Tactical Pressure occur inside the same persistent Location used by Free Movement. Authoritative geometry, continuous actor positions, objects, hazards, objectives, Interaction Positions, Cover Positions, occlusion, and line of fire determine legal play.

A rendered map, tactical overlay, node web, schematic, or marker layer is a derived display. It cannot override Location truth or create a separate Encounter authority.

<!-- source-slice: combat.tacmap.core-numeric-movement-rule -->
## 2. Turn-Based movement

During Turn-Based Mode, Speed grants MP. Movement spends MP according to the traversed route length and applicable terrain, hazard, status, body, equipment, and ability modifiers. Free Movement uses the same navigable geometry but does not spend combat MP.

Production movement units, Speed-to-MP conversion, diagonal or curved-path handling, and exact distance rounding remain unresolved. Until those are accepted, content must not encode obsolete node-count movement as current math.

<!-- source-slice: combat.tacmap.nodes -->
## 3. Areas and authored positions

**Areas** organize a Location for content, visibility, activity, and state management. They are not discrete movement cells. Actors occupy continuous positions within navigable geometry.

Authored **Interaction Positions** identify valid approach destinations for doors, terminals, characters, objects, and objectives. Authored directional **Cover Positions** identify valid protected placements and intended cover alignment. An authored position grants a valid placement opportunity; final legality still depends on current occupancy, collision, geometry, and state.

<!-- source-slice: combat.tacmap.node-status-and-path-status -->
## 4. Spatial and environmental state

State may attach to an Area, field, surface, passage, door, object, hazard, objective, Interaction Position, Cover Position, or actor. Examples include fire, vacuum, smoke, suppression, Low-G, locked access, compromised cover, unstable machinery, alarm state, or blocked navigation.

State changes persist across Free Movement, Tactical Pressure, Turn-Based Mode, and Local Aftermath until a rule or committed event changes them.

<!-- source-slice: combat.tacmap.paths-and-line-of-sight -->
## 5. Navigation, visibility, and line of fire

Navigation follows authored walkable geometry and current blockers. Automatic pathing may choose a valid route to a selected Interaction Position or movement destination, but pathfinding does not decide whether the intended interaction is legal.

Visibility and line of fire derive from geometry, occlusion, current objects, smoke or concealment, elevation, and relevant rules. Cover is evaluated independently through valid Cover Positions and relative geometry. Derived overlays may explain these results but do not own them.

<!-- source-slice: combat.tacmap.node-capacity-and-character-size -->
## 6. Collision, body fit, and crowding

Actor collision and body footprint govern occupancy. Standard Fit affects infrastructure and equipment compatibility; nonstandard bodies may need more room or special positions.

Crowding occurs when bodies cannot occupy or pass through available space without conflict. The first occupant normally retains position priority unless movement, shove, forced displacement, stance, trait, ability, or scenario rules change control. Exact collision radii, follower spacing, squeeze rules, and Crowded penalties remain unresolved.

## 7. Blocking and forced displacement

Actors, doors, objects, hazards, and geometry may block or constrain movement. Body-blocking should follow physical occupancy and explicit control rules rather than invisible node ownership.

Shove and other forced displacement move a target through legal geometry and must define direction, distance, collision handling, and hazard interaction. Exact shove math remains with action and balance work.

<!-- source-slice: combat.tacmap.in-transit-state -->
## 8. Linked movement and proximity actions

Automatic approach movement and a proximity-bound interaction are linked stages under one Player Intent. Completed movement persists as Location truth. On arrival, the interaction is revalidated and commits only if still legal. Interruption or Tactical Pressure beginning never rolls back completed movement; an uncommitted Free Movement interaction is discarded and requires a fresh choice.

During Turn-Based Mode, movement, interaction, and other costs follow normal AP, MP, reaction, and sequencing rules.

<!-- source-slice: combat.tacmap.map-scale-and-movement-support -->
## 9. Location scale and runtime support

Locations may range from compact rooms to multi-Area sites. Scale must remain legible enough for movement, objectives, hazards, cover, and tactical choices. Inactive Areas may pause rather than simulating the whole Location, but their committed state remains part of Game Truth.

The runtime should support path previews, destination validity, movement cost, collision feedback, visible hazards, Interaction Position affordances, Cover Position alignment, and clear failure reasons.

## 10. Open items

Still open:

- production movement units and Speed-to-MP conversion;
- collision radii, squeeze, body-blocking, and follower behavior;
- navigation failure and unreachable-destination UX;
- Cover Position arcs, tolerances, and alignment;
- flanking, elevation, and distance modifiers;
- path preview and movement-interruption handling; and
- exact forced-displacement and crowding rules.
