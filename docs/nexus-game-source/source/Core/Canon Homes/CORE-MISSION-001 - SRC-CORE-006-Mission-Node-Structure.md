---
project: "Nexus"
doc_id: "CORE-MISSION-001"
legacy_ids:
  - 'SRC-CORE-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\07 Core Game Campaign rev0.3\SRC-CORE-006 - Mission_Node_Structure.md'
title: "Mission_Node_Structure"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "mission_node_structure"
owns_topics:
  - 'mission_node_structure'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Mission Node Structure

## 1. Purpose

This document defines current core-level mission-node structure. It does not replace detailed combat, TacMap, enemy, content, or resolution rules.

## 2. Node Structure

In v0.1, a node generally includes:

- one main encounter;
- possible side effect or opportunity;
- possible mapped ship-stop / nonviolent TacMap when spatial clarity matters;
- possible follow-up side quest at a later node.

Do not define a fixed node type breakdown yet.

## 3. Encounter Presentation Order

A usable node or encounter should generally present:

1. scene title;
2. colorful narrative description;
3. immediate stakes;
4. initial situation view or TacMap if needed;
5. assessment/approach phase;
6. chosen approach;
7. encounter resolution;
8. consequence update.

If a tactical encounter begins, DM Mode should present an encounter-start packet without waiting for the player to ask for the map. At minimum, the packet should include framing, stakes, map/schematic when needed, node/path/objective data, actors, hazards or pressure, and player-facing options. The display template belongs to `Modes` and/or `Dashboards`; the core requirement is preserved here.

## 4. Assessment / Approach Phase

Before combat begins, the player should be able to evaluate the scene and choose an approach. Skills and skill levels affect what the DM presents.

Possible approach actions include:

- scan;
- observe;
- talk;
- negotiate;
- bribe;
- deceive;
- intimidate;
- sneak;
- hack;
- disable systems;
- prepare ambush;
- reposition;
- retreat;
- bypass objective.

The approach phase may avoid combat, trigger combat, change starting positions, reveal hazards, create advantage, open a nonviolent path, or expose a hidden cost.

Current scene/choice structure:

1. present the situation;
2. reveal hooks, options, risks, or questions;
3. player chooses an approach;
4. resolve one meaningful step or major time-consuming choice;
5. update position, clocks, risks, and consequences;
6. present the next choice if the node continues.

Use **major time-consuming choice** rather than **beat** as the default noncombat pacing phrase. This keeps procedure understandable without implying every scene needs formal beat terminology.

## 5. Nonviolent Options

Nonviolent options should be available in some cases. Combat should be common and should take the most player time overall, but individual encounters should not automatically become combat.

Non-combat encounters should generally be quick and branching. Earlier 2-4 check guidance remains useful, but check count should follow scene complexity and player choices rather than becoming a rigid rule.

## 6. Tactical Objective Principle

Killing all enemies is only one possible encounter end goal. Most tactical encounters should have another main objective that can be accomplished through multiple means.

Examples:

- extract VIP;
- hold position;
- survive timer;
- disable system;
- steal data;
- escape;
- reach shuttle;
- rescue crew;
- shut down hazard;
- negotiate ceasefire;
- capture target;
- sabotage equipment;
- delay enemy;
- avoid alarm;
- protect civilians;
- force surrender;
- secure object;
- retreat successfully.

Detailed encounter building and objective mechanics route to `Combat` and `Content`.

## 7. Mapped Ship Stops and Nonviolent TacMaps

A route node can use a TacMap without becoming a combat encounter.

Significant ship stops may be mapped when the scene includes NPC positions, store owners, guards, rescue targets, events, fires, trapped people, terminals, lockers, evidence, hazards, interactables, objective locations, or side opportunities.

Mapped nonviolent nodes should usually stay quicker than combat. They may be freeform, clock-driven, round-driven, or lightly turn-based depending on scene pressure. The map exists to make options and consequences clear, not to force every stop into a long tactical subsystem.

Examples:

- a market deck with vendors, guards, faction watchers, locked kiosks, and a side-objective terminal;
- a rescue scene with smoke, trapped civilians, blocked doors, and failing life support;
- a wreckage search with salvage points, unstable paths, survivor signals, and security drones;
- a tense checkpoint with documents, crowd movement, cameras, and alternate routes.

## 8. Pacing Corrections from Rook Campaign Evidence

Rook playtest corrections that affect core node procedure:

- Do not suffocate the player with too many gated checks to reach one consequence.
- In freeform ship time, resolve routine recruit/crew handling quickly once basic risks are addressed.
- If a moment is intended as a set piece, declare an objective, counter, encounter structure, or other visible frame.
- Crew addition should usually be routine if fiction supports it, not an arduous bespoke challenge every time.
- Characters can become recruitable from a normal waking/encountered state; they do not need special cradle/opening framing.
- Keep options to about four when possible; the issue was too many accumulated opportunities, not too few possibilities in the world.

These corrections should be routed into DM procedure and dashboard design as well.

## 9. Future Node / Content Settings Seeds

Older source notes proposed future controls for campaign/content generation:

- combat vs non-combat ratio;
- hazard density;
- faction appearance rates;
- loot frequency;
- recruit frequency;
- social encounter frequency;
- map flavor frequency;
- clear path frequency;
- mid-path cover frequency;
- difficulty/lethality tone;
- skill-opportunity density.

These are seed ideas, not finalized settings. Route detailed implementation to `Content`, `Dashboards`, and `Automation`.


## 10. Escape and Aftermath Procedure Cue

Dq9 handoff evidence clarifies that escape procedures should appear when withdrawal itself is the interesting problem. They should not be automatically attached to every combat, alarm, failed plan, or extraction.

Default escape structures to preserve for later Draft/template work:

- **Quick Exit** - one choice, low stakes, clean release unless a concrete light aftermath appears.
- **Requirement Escape** - default formal escape structure using a clear checklist of requirements; add a pressure counter only when useful.
- **Set-Piece Escape** - rare expanded structure where escape is the core premise of the node.

Use one escape structure by default. Two structures indicate a high-pressure scene. More than two usually means the scene should be reframed or promoted to a full set piece.

Freeform planning is available inside every escape structure. Strong planning may satisfy requirements, reduce difficulty, reduce consequences, skip unnecessary steps, or end the escape when the plan logically resolves the danger.

Aftermath should be saved into dashboard/state export when persistent consequences matter. Persistent aftermath must state concrete gameplay effect or route to concrete future effect.

## 11. Domain Routing Notes

- Combat rules and TacMap mechanics route to `Combat`.
- Encounter content libraries and mission/job frameworks route to `Content`.
- Skill checks and revealed options route to `Skills`.
- Campaign dashboard presentation routes to `Dashboards`.
- DM execution templates, encounter-start packet display, Route Node End Report display, escape requirement display, and check/roll block examples route to `Modes`.
- Route Node End Report dashboard/state export routes to `Dashboards`.
- Auxiliary map/display aids route to `Play Aids` and `Art`.

## Source Handling Note

This document is a Core-domain consolidation document in the rebuild repo. It is not a verbatim copy of a single older file. It preserves and reorganizes usable content from the current vault snapshot, Nexus Future patterns, older phone/global backups, the Memory Overflow register, and Rook campaign handoff/dashboard evidence. Older material is treated as evidence. Live `00 Source` remains unchanged until the rebuilt source is accepted and migrated.



