---
project: "Nexus"
doc_id: "CONTENT-HAZARD-001"
legacy_ids:
  - 'SRC-CONTENT-006'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\13 Content Systems rev0.5\SRC-CONTENT-006 - Hazards_Obstacles_and_Environmental_Content.md'
title: "Hazards_Obstacles_and_Environmental_Content"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "canon_home"
topic_family: "hazards_obstacles_and_environmental_content"
owns_topics:
  - 'hazards_obstacles_and_environmental_content'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from CONTENT-CORE-006 to CONTENT-HAZARD-001. Phase 10 consolidated body routing into domain-first language, repaired inherited display corruption, and preserved the active hazard framework without relying on slot-era wording."
---

# Hazards, Obstacles, and Environmental Content

## Purpose

Hazards and obstacles create tactical decisions that are not only enemy HP. They can pressure movement, timing, resources, tools, objectives, and route decisions.

## Hazard content model

A hazard entry should include:

```text
Name / working handle:
Hazard type:
Trigger:
Node / path / object or system affected:
Counter or clock if any:
Effect now:
Relief / Mitigation or bypass:
Skill options:
Tool / gear options:
Escalation:
Aftermath if unresolved:
Tags:
```

## Hazard categories

Useful provisional categories:

- atmosphere / pressure / vacuum;
- radiation;
- fire / heat / cold;
- corrosion / contamination;
- electrical discharge;
- gravity / thrust / inertia;
- debris / collapse;
- surveillance / alarm;
- software / network / hostile system;
- social-procedural hazard;
- legal / custody hazard;
- biological / toxin / infection;
- Signal / anomaly hazard.

## Obstacles

Obstacles are content that blocks or complicates progress without necessarily being a damaging hazard.

Examples:

- locked hatch;
- authority checkpoint;
- jammed lift;
- sealed vault;
- unstable bridge;
- hostile credential reader;
- pressure door;
- sensor grid;
- crowd, strike, evacuation, or panic;
- drone patrol route;
- moral/legal complication.

## Cover and objects

Accepted object/cover guidance:

- Objects, cover, and objectives use a tactical hybrid model.
- Combat-relevant objects use compact stats when damage/targeting matters.
- Tags define special interaction.
- Cover applies only after a TacMap line, node/path relationship, or other attack permission exists.
- Cover modifies Defense only; it does not provide damage reduction and does not add Mitigation.
- Half Cover grants +20 Defense.
- Full Cover grants +40 Defense.
- Relative cover is resolved by node/path relationship, attack line, or clear cover-facing note. Do not use continuous angle calculation.
- Valid cover is non-destructible by default.
- If it breaks easily, it should not usually count as reliable cover.
- Destroying or degrading cover requires special permission: Breach, Shred, Explosive, heavy weapon, environmental hazard, scripted effect, object weakness, special ability, or intentional cover-destruction action.


## Hazard Rating and Lattice routing

Hazards that call for a direct roll should list a **Hazard Rating** instead of an ad hoc DC. Route the roll through the Lattice resolution package:

```text
TS = 50 + Actor Bonus - (Hazard Rating - 15)
```

Hazard Rating is the content-facing defensive surface for environmental danger, procedural pressure, hostile systems, unstable terrain, toxins, radiation, vacuum, fire, alarm structures, and similar hazards. `Content` defines the hazard, its affected node, path, object, or system, relief options, escalation, and aftermath. `Combat`, `Skills`, `Equipment`, and `Automation` decide detailed combat, resolution, equipment, or automation behavior when needed.

Hazard content should not create a standalone area placement unit. Use nodes, paths, objects, or systems as the attachment surface. Large environmental conditions may cover many nodes or paths, but they should still be represented by affected node/path/object/system entries for play.

## Hazard counters

Hazards may use `Hazard` counters. Content should record:

- what counts;
- what changes it;
- what happens at the trigger;
- effect now;
- relief options.

Display format belongs to DM Mode, not this doc.

## Skill and tool hooks

A good hazard should often provide more than one answer surface:

- Mobility can move through, around, over, or away.
- Engineering/Fabrication can repair, brace, patch, or build.
- Security/Computing/Electronics can disable, spoof, reroute, or isolate.
- Medicine/Biotechnology/Cybernetics can manage body exposure.
- Tactics/Perception/Survival can identify safe timing, lines, or paths.
- Equipment can convert danger into cost, delay, or opportunity.

## Aftermath hooks

Persistent hazard aftermath should be concrete: heat, damage, complication, loss, ongoing counter, crew Health/Morale/Loyalty effect, route closure, repair need, or objective-state change. If a temporary hazard status is present when a character becomes Downed or Disabled, route persistence/consequence handling to the character recovery package rather than inventing a separate hazard-only rule.

## Mass-intake additions: Node, Path, and System Status hooks

Hazards may attach to different content surfaces:

- **Node Status:** a tactical node has a condition such as vacuum, fire, radiation, smoke, low-G, suppression, surveillance, contamination, unstable footing, exposed, locked-down, or unsafe.
- **Path Status:** a route/path between nodes has a condition such as electrical, blocked, breached, smoke-filled, pressure-leaking, watched, jammed, locked, hazardous, or suppressive.
- **Object/System Status:** a terminal, turret, door, drone, suit, cyberware module, ship system, or station system has a tech condition such as jammed, firewalled, spoofed, rebooting, corrupted, EMP-hit, overheated, locked, or compromised.

`Content` names the content hook and fictional pressure. `Combat`, `Skills`, `Equipment`, and `Automation` decide how it resolves mechanically.

### Wall/breach preservation

Wall breach and destructible-wall content remains a parked content branch. Do not assume all walls or cover are destructible by default. A content entry may explicitly include breach permissions, breach costs, tools, consequences, and marker/display needs.

### Marker routing

Hazard content may request icons or map markers, but display grammar belongs to `Play Aids` and visual or icon direction belongs to `Art`.



