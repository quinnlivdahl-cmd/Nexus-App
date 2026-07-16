---
project: "Nexus"
doc_id: "COMBAT-ENV-001"
legacy_ids:
  - 'SRC-COMBAT-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-005 - Cover_Hazards_Exposure_and_Environmental_Rules.md'
title: "Cover_Hazards_Exposure_and_Environmental_Rules"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_canon"
placement_domain: "Combat"
content_role: "canon_home"
topic_family: "combat_environment"
owns_topics:
  - 'cover_rules'
  - 'hazards'
  - 'exposure'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active cover, hazard, and exposure grammar without relying on package-era framing."
---

# Cover, Hazards, Exposure, and Environmental Rules

## 1. Purpose

This document defines the current source surface for cover, half cover, full cover, exposure, hazards, elevation, distance, flanking, status families, geometry-facing environment effects, visibility, line of fire, and environment-facing tactical rules inside persistent Locations.

Cover and hazard Target Score rules below are current for the Lattice integration pass. Other environmental numbers remain open unless specifically resolved here.

## 2. Status grammar boundary

`Combat` uses this working grammar:

```text
Damage
Status
  Standard Status
  Persistent Status under long-term crew states
    - Persistent Health Status
    - Persistent Morale Status
    - Persistent Loyalty Status
```

Standard Status is the in-encounter status layer. Persistent is not a top-level status category; persistent effects live under long-term crew states.

The Standard Status types must remain explicitly defined enough that mechanics can act on them. Abilities, gear, traits, hazards, enemies, objectives, icons, and map surfaces need named targets.

Confirmed conversion rule:

> If one effect both applies a Standard Status and Downs the target, that status becomes Persistent by default under the relevant long-term crew-state category, unless a specific rule says otherwise.

## 3. Current status families

The exact final list remains open, but useful status families currently include:

- Exposure / environmental harm;
- System Status;
- Health / Injury;
- Morale / mental pressure;
- Loyalty / relationship pressure;
- Signal / Contact;
- Position / movement;
- Engagement / control;
- Objective / carry.

Examples of encounter-facing Standard Status include Exposed, Suppressed, Marked, Jammed, Traced, Shield-Stripped, On Fire, Unstable, Slowed, Pinned, Hidden, Detected, Grappled, Carrying, Objective-Bound, Stunned, Disabled, Panicked, Suit Breach, and Downed.

### System Status

Use **System Status** for tech/cyberware/device/system surfaces, including cyberware, turrets, locks, drones, pressure suits, modules, terminals, sensors, doors, ship systems, hostile systems, networked bodies, and hackable objects.

System Status lets the same tag grammar cover characters and environmental objects without pretending every target has biological injuries.

### Signal / Contact

Signal effects should not be pervasive at the start of the game. They are later-game, discovery-gated, node-specific, encounter-specific, or special-case effects unless a scenario says otherwise. Signal may later use a Resolve-like surface. Morale or Loyalty effects may create Signal check penalties. Full Signal subsystem design remains parked.

## 4. Cover / Visibility / Line-of-Fire umbrella

Use **Cover / Visibility / Line-of-Fire** as the umbrella for tactical display and icon families.

- **Cover** = physical protection.
- **Visibility** = can a character see, target, scan, react to, or observe through the relation?
- **Line-of-Fire** = broader relationship for cover, visibility, suppression, watched approaches, firing lanes, and sightline constraints.

Smoke is not physical cover, but it can protect by breaking targeting, scanning, or visibility.

Visibility is assumed by default unless marked unavailable, blocked, obscured, or restricted. This avoids cluttering maps with "visibility yes" symbols.

## 5. Cover levels
Core cover levels:

- **No Cover**: no Defense modifier from cover.
- **Half Cover**: `+20 Defense`.
- **Full Cover**: `+40 Defense`.

Cover modifies Defense only. It does not create damage reduction and does not apply as Mitigation.

Current attack formula with cover:

```text
Effective Defense = Defense + cover + situational defensive modifiers
TS = 50 + Actor Bonus - (Effective Defense - 15)
```

Extensions such as soft/hard cover, concealment, directional cover, elevated cover, one-way cover, or destructible cover may come later, but the three core levels are enough for current system foundation.

Cover should interact with:

- attack accuracy through Effective Defense;
- exposure;
- Aim;
- Suppress;
- flanking;
- elevation;
- visibility;
- line-of-fire;
- movement through exposed space;
- destructible, movable, or breachable objects if later added.

## 6. Relative cover
Cover is relative. An Area or object does not simply "have cover" against everything.

Authored directional **Cover Positions** identify valid protected placements and their intended protection. Authoritative geometry, occlusion, and line of fire determine whether that protection applies between a shooter and target. A surface may provide Half Cover from one approach, Full Cover from another, no cover from a third, a visibility block without physical protection, or physical protection without blocking all visibility.

Shooter and target on the same side of a surface may not grant cover. Shooter and target on opposite sides may grant cover. One-sided, directional, elevated, or destructible protection must be represented by authored data and geometry. Exact arcs, tolerances, and angle calculations remain unresolved; node/path relationships are not spatial authority.

## 7. Cover Position display model

The Location view should make authored Cover Positions, protection level, directional alignment, visibility blocks, and important line-of-fire constraints readable without presenting a giant relation matrix. Derived markers or overlays may explain this state, but they cannot create protection that authoritative geometry and the Cover Position do not support.

## 8. Cover sharing

Cover sharing is governed by authored Cover Positions and physical space.

Working rule shape:

- if two human-scale characters can occupy valid protected positions without collision, both may benefit from supported cover;
- if a large body plus a human-scale body exceeds the available protected space, the position may become Crowded;
- the first occupant keeps position priority unless fiction, shove, movement, stance, trait, or scenario procedure changes control;
- over-capacity users may downgrade cover, lose cover, create exposure, or contest position depending on final Crowded rules.

This keeps the system universal instead of requiring individual capacity math for every cover object.

## 9. Walls, blockers, and breach surfaces

Working distinction:

- **Full Wall** blocks visibility and movement by default unless a door, breach, window, vent, ladder, special sensor, or scenario rule says otherwise.
- **Half Wall** may allow visibility and targeting while providing cover.
- **Visibility blocker** blocks sight/targeting/scanning without necessarily providing physical protection.
- **Line blocker** may restrict shots, reactions, scans, suppression, or firing lanes depending on type.

Wall breach and destructible wall procedures are preserved as a parked branch. Do not assume all cover is destructible by default.

## 10. Exposure

Exposure is the state of being tactically vulnerable because of position, movement, line of sight, lack of cover, crossing suppressed space, elevation disadvantage, objective interaction under fire, or hazard pressure.

Exposure should be readable in the Location view and should create reasons to use cover, smoke, suppression, scans, speed, alternate approaches, teamwork, or equipment.

On Fire is an Exposure-facing Standard Status. Burned/Burn as a persistent aftermath effect should be treated as Persistent Health Status when it survives the encounter.

## 11. Distance, flanking, and elevation

Locations should support modifiers based on distance, flanking, and elevation. Exact numbers remain open.

Design direction:

- longer range may impose penalties or require Aim;
- flanking can reduce cover or improve attack quality;
- high ground can improve line of sight, attack quality, or target visibility;
- low exposed areas can increase danger;
- elevation paths may require climb, jump, lift, ladder, stairs, ramp, or gear use.

## 12. Verticality

Verticality is a standard design consideration when plausible, not a rare special case.

Examples:

- gantries, rooftops, pits, ramps, stairs, ladders, platforms;
- balconies, high cover, lower exposed areas, elevators, shafts, catwalks.

Verticality enables level-based modifiers, line-of-sight changes, climb routes, falling hazards, overwatch angles, hidden routes, and skill opportunities.

## 13. Hazards and environment
Hazards can be static, active, timed, triggered, hidden, telegraphed, or player-created.

Current hazard surfaces include:

- debris / difficult terrain;
- coolant, fire, radiation, vacuum, breach, pressure, smoke, darkness;
- electrified floors, exposed machinery, moving industrial equipment;
- alarmed passages, sensor cones, locked doors, unstable lifts;
- hostile network surfaces, trace, lock, shutdown, jam, system counterpressure;
- Area, object, passage, and field states such as Signal Echo, Sensor Fog, Suppressed, Hacked Lighting, No Atmosphere, Pressurized, Low-G, or Maintenance Access.

Hazards should produce meaningful tactical decisions rather than mere punishment.

When a hazard calls for a Lattice check against its rating, use:

```text
TS = 50 + Actor Bonus - (Hazard Rating - 15)
```

Hazard Rating is the defensive difficulty surface for environmental threats. Exact consequences of success, Graze, Hit, Direct, and failure remain scenario- or hazard-specific unless defined by another source doc.

## 14. Open numerical questions
Resolved for current Lattice integration:

- Half Cover = `+20 Defense`;
- Full Cover = `+40 Defense`;
- cover modifies Defense only;
- cover does not provide damage reduction or Mitigation;
- continuous Location geometry is authoritative; exact cover arcs and angle tolerances remain unresolved;
- hazard Target Score formula: `TS = 50 + Actor Bonus - (Hazard Rating - 15)`.

Still open:

- exposure consequences;
- flanking math;
- high-ground modifiers;
- falling / breach / vacuum hazard consequences;
- status duration and clearance rules;
- exact Crowded cover downgrade;
- exact Cover Position and directional overlay grammar;
- final wall breach procedure.
