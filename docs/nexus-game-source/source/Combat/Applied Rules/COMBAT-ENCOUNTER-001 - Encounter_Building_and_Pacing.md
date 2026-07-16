---
project: "Nexus"
doc_id: "COMBAT-ENCOUNTER-001"
legacy_ids:
  - 'SRC-COMBAT-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-006 - Encounter_Building_and_Pacing.md'
title: "Encounter_Building_and_Pacing"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "provisional_canon"
placement_domain: "Combat"
content_role: "applied_rule"
topic_family: "encounter_pacing"
owns_topics:
  - 'encounter_pacing'
  - 'escape_structures'
borrows_topics:
  - 'combat_core'
  - 'content_enemy_roles'
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active encounter procedure without relying on package-era framing."
---

# Encounter Building and Pacing

> [!important] Revised vision reconciliation — 2026-07-11
> Treat the reusable pacing, objective, role, hazard, and exit guidance below as Tactical Pressure authoring inside a persistent Location. A top-level Encounter container, encounter-start map handoff, or encounter-results authority is historical; Local Aftermath resolves in place and Route Node Resolution occurs on departure.

## 1. Purpose

This document owns combat-situation building and tactical pacing guidance inside persistent Locations. It covers presentation, approach, objectives, scale, Location realization, nonviolent Tactical Pressure, required display, and end states.

## 2. Encounter presentation order

Default order:

1. scene title;
2. short flavorful scene description;
3. immediate stakes;
4. assessment / approach phase;
5. current Location view and relevant spatial state;
6. visible enemies, hazards, objectives, interactables, exits, and pressure;
7. player declaration or menu of possible approaches.

When Tactical Pressure begins, the runtime automatically exposes the current Location view, relevant spatial state, objectives, hazards, actors, initiative, and control surface. The player should not have to ask for required display.

## 3. Tactical Pressure display at transition

A complete player-safe tactical display may include:

- visual or schematic map;
- node list;
- path list;
- objective/interactable list;
- enemies and known NPCs;
- hazards, node status, path status, cover, visibility, and line-of-fire notes;
- clocks/timers/pressure;
- immediate legal approach options.

Authoritative Location geometry and structured state remain canonical. Compact diagrams, overlays, and structured summaries are derived aids for clarity, accessibility, or debugging.

## 4. Assessment / approach phase

Approach phase is important enough to preserve as a procedure. Players should be able to gather information or choose an entry posture before the fight hard-starts.

Approach actions may include observation, scan, stealth, talk, negotiation, intimidation, deception, bribery, hack, disable, ambush, retreat, reposition, or objective bypass.

## 5. Objective-first encounter design

Objectives are first-class combat surfaces. Killing every enemy is not the default objective unless the scenario says so.

Useful objective states include:

- breach;
- scan;
- carry;
- hold;
- upload;
- disable;
- rescue;
- extract;
- jam;
- cut link;
- stabilize;
- protect;
- retrieve;
- escape.

The mock combat handoff reinforces this: opening a door, jamming reinforcement request, cutting a link, extracting a handler, and preserving a manifest all created meaningful non-damage victory surfaces.

## 6. Nonviolent and mixed encounters

Nonviolent scenes remain spatial when position matters. The persistent Location can support infiltration, investigation, social positioning, chases, negotiations, emergency engineering, rescue, exploration, market movement, and Shipboard crisis.

## 7. Encounter skeleton + AI flavor

An encounter can be designed as a skeleton plus flavor:

- tactical goal;
- map shape;
- pressure source;
- enemies / obstacles;
- hazards;
- objectives;
- fail-forward consequence;
- possible bypasses;
- escalation or timer;
- faction / location flavor.

A stable Location skeleton helps the Director propose repairable content without treating every site as a one-off illustration.

## 8. Generated Location-content trust ladder

Use a trust ladder for model-proposed or procedurally assembled Location content:

1. fixed template + generated dressing;
2. authored geometry + model-proposed dressing, hazards, objects, and objectives;
3. modular Location assembled from validated Location Modules;
4. generated candidate geometry and content that passes the full deterministic Location validation checklist.

Higher trust levels require stronger validation. If validation fails, fall back to a simpler authored template or validated module assembly.

## 9. Location Quality Checklist direction

A Location Quality Checklist should validate generated or revised Location content. Use statuses such as Required / Optional / N/A.

Direction for Required checks:

- the Location has enough navigable space, alternatives, and objective distance for the intended pressure and round count;
- the objective is reachable and legible;
- enemies/hazards create tactical pressure without blocking all viable play;
- cover/visibility/line-of-fire are readable;
- movement alternatives exist when a choke point matters;
- collision, body fit, Interaction Positions, and Cover Positions are valid;
- Area, passage, field, object, and actor states are distinguishable;
- extraction/escape/end-state route is clear if relevant;
- visual readability passes at intended display scale.

Visual readability is a hard gate. A beautiful map that cannot be read at table scale is not successful.

## 10. Environment-family templates

Useful future Location and tactical-content template families include:

- Space Station;
- Asteroid Surface;
- Science Hab;
- Mining Interior;
- Shipboard;
- Corporate Habitat;
- Cargo Yard / Dock;
- EVA / Low-G Exterior;
- Industrial Processing;
- Habitat Market / Social Space.

These are template families, not finalized map catalogs.

## 11. Encounter scale

Locations should support expected round count and movement pressure. If a situation is meant to last multiple rounds, its geometry needs enough movement alternatives, objectives, hazards, and repositioning incentives to avoid static attack trading.

Earlier 3-4 round guidance remains useful for quick skirmishes, but standard tactical situations may need more turns and larger navigable spaces once enemy durability and objective timers exist.

## 12. Pre-node preparation

Loadout, advancement, and preparation happen after Route Choice and before starting the selected Route Node. Location and tactical-content design should assume the player may choose crew, equipment, route posture, and prep in that window unless the fiction explicitly denies an option.

## 13. Playtest lessons integrated

Rook / Ternary Lock / E-43 and mock combat evidence support these encounter lessons:

- do not overload the player with too many opportunities at once;
- a revealed objective or one strong lead can be better than three competing branches;
- objective action should sometimes be more valuable than attacking;
- next-node setup should show character info and handle level-up/loadout before the node begins;
- counterpressure such as trace, alarms, reinforcements, custody heat, or timers creates tactical stakes;
- dashboard state is needed for live campaigns but belongs to `Dashboards`, not this domain doc.

## 14. Escape Structures and Aftermath

Dq9 handoff evidence adds an encounter-procedure cue: escape is used when withdrawal is the interesting tactical problem, not as an automatic appendage to every fight.

Default escape structures:

- **Quick Exit:** short withdrawal resolution when the escape is not the main scene.
- **Requirement Escape:** the crew must satisfy one or more visible requirements before leaving.
- **Set-Piece Escape:** expanded escape scene with route segments, hazards, vehicle action, clocks, or multiple requirement groups. Use when escape is the premise of the node.

An encounter normally chooses one escape structure. Two structures signal high pressure. More than two should be treated as a full set piece or reframed.

Aftermath should be summarized before location-neutral Downtime or the next Route Choice. Persistent aftermath belongs in `Dashboards` or later campaign-state surfaces.

## 15. Open items

Still open:

- final Location Quality Checklist wording;
- final structured Location data template;
- exact boundary between combat spatial rules, `Automation` schemas, `Play Aids`, and `Art` visual assets;
- generated map validation process;
- encounter family template list;
- whether escape structures need a dedicated procedure doc later.
