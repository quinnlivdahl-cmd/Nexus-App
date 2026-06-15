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
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active encounter procedure without relying on package-era framing."
---

# Encounter Building and Pacing

## 1. Purpose

This document owns combat encounter building and tactical pacing guidance. It covers encounter presentation, approach phase, objectives, scale, map generation, nonviolent tactical scenes, TacMap auto-display, and end states.

## 2. Encounter presentation order

Default order:

1. scene title;
2. short flavorful scene description;
3. immediate stakes;
4. assessment / approach phase;
5. TacMap or tactical sketch when spatial play matters;
6. visible enemies, hazards, objectives, interactables, exits, and pressure;
7. player declaration or menu of possible approaches.

When a tactical encounter begins and the scene needs spatial play, the DM should automatically include a TacMap support packet. The player should not have to ask for the map.

## 3. TacMap packet at encounter start

A complete tactical TacMap packet may include:

- visual or schematic map;
- node list;
- path list;
- objective/interactable list;
- enemies and known NPCs;
- hazards, node status, path status, cover, visibility, and line-of-fire notes;
- clocks/timers/pressure;
- immediate legal approach options.

For fast chat play, a compact map plus node/path table is acceptable. For source or reusable maps, structured node/path/object data should be canonical and the image should be considered a rendered aid.

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

Nonviolent scenes may still use TacMaps when spatial clarity matters. Mapped nonviolent TacMaps can support infiltration, investigation, social positioning, chases, negotiations, emergency engineering, rescue, exploration, market movement, and shipboard crisis.

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

A stable skeleton helps AI produce repairable maps and avoids treating every TacMap as a one-off illustration.

## 8. Generated TacMap trust ladder

Use a trust ladder for AI-generated or semi-generated TacMaps:

1. fixed template + generated dressing;
2. fixed node-web + generated backdrop/hazards/cover;
3. generated node-web from trusted pattern library;
4. fully generated map with validation checklist.

Higher trust levels require stronger validation. If validation fails, fall back to a simpler template or fixed node-web.

## 9. Node-Web Quality Checklist direction

A Node-Web Quality Checklist should eventually validate generated or revised TacMaps. Use statuses such as Required / Optional / N/A.

Direction for Required checks:

- the map has enough nodes/routes for the intended round count;
- the objective is reachable and legible;
- enemies/hazards create tactical pressure without blocking all viable play;
- cover/visibility/line-of-fire are readable;
- movement alternatives exist when a choke point matters;
- node capacity and body fit are not obviously broken;
- path status and node status are distinguishable;
- extraction/escape/end-state route is clear if relevant;
- visual readability passes at intended display scale.

Visual readability is a hard gate. A beautiful map that cannot be read at table scale is not successful.

## 10. Environment-family templates

Useful future encounter/TacMap template families include:

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

Maps should support expected round count and movement pressure. If a scene is meant to last multiple rounds, the map needs enough nodes, routes, objectives, hazards, and repositioning incentives to avoid static attack trading.

Earlier 3-4 round guidance remains useful for quick skirmishes, but standard tactical encounters may need slightly more turns and larger maps once enemy durability and objective timers exist.

## 12. Pre-node preparation

This domain inherits the earlier pre-node correction: loadout, level-up, and preparation happen before starting the node. Encounter design should therefore assume the player may choose crew, equipment, route posture, and prep after node selection but before encounter start, unless the fiction denies that window.

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

Aftermath should be summarized before returning to ship/free time. Persistent aftermath belongs in `Dashboards` or later campaign-state surfaces.

## 15. Open items

Still open:

- final Node-Web Quality Checklist wording;
- final structured TacMap data template;
- exact boundary between combat map rules, `Automation` schemas, `Play Aids`, and `Art` visual assets;
- generated map validation process;
- encounter family template list;
- whether escape structures need a dedicated procedure doc later.


