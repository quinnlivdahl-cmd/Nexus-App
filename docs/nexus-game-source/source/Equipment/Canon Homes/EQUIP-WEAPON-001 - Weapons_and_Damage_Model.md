---
project: "Nexus"
doc_id: "EQUIP-WEAPON-001"
legacy_ids:
  - 'SRC-EQUIP-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-003 - Weapons_and_Damage_Model.md'
title: "Weapons_and_Damage_Model"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "canon_home"
topic_family: "equipment_weapons"
owns_topics:
  - 'weapon_model'
  - 'weapon_tags'
  - 'damage_model'
borrows_topics:
  - 'combat_result_bands'
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active weapon and damage-model direction without relying on package-era framing."
---

# Weapons and Damage Model

## 1. Status

This is a seeded source-realization doc. Current sources define weapon principles and tag surfaces better than they define a final weapon catalog.

Do not invent a complete weapon list here. Use this doc to keep DM play consistent until Draft produces a true weapon/equipment catalog.

## 2. Weapon role in Nexus

Weapons are not only damage numbers. A weapon can define:

- range and position pressure;
- tactical control;
- noise and legality;
- hackability;
- armor/shield interaction;
- status effects;
- route/objective interaction;
- faction identity;
- environment risk in fragile habitats.

## 3. Ammo and readiness

Do not track ordinary bullets by default.

Track only when tactically, economically, legally, factionally, or fictionally relevant:

- special ammo;
- reload/readiness state;
- charge;
- heat;
- battery;
- magazine state;
- legality/custody trace;
- scarce mission resources.

## 4. Weapon tags

Seed/source-supported tag examples include:

```text
Ballistic
Energy
Melee
Explosive
Thermal
Chemical
EMP
Impact
Hack
Signal
Exposure
Piercing
AP
Shred
Silent
Noisy
Smart
Analog
Sealed
Corrosive
Radiation
Contamination
Stun
Suppression
Toxic
Cryo
Plasma
Laser
Kinetic
Legal
Custody
Biohazard
```

These are not yet final taxonomy. They are a working vocabulary for DM rulings, Draft refinement, and future data tables.

## 5. Mechanical vs smart weapons

Mechanical or analog weapons may have little or no hack surface.

Advanced smart or energy weapons may have hack surfaces because they depend on:

- targeting firmware;
- battery control;
- heat regulation;
- smartlink;
- authorization lock;
- sensor feed;
- safety firmware.

Example source distinction:

```text
Space AK / mechanical firearm: no or minimal hack surface.
Advanced laser weapon: hackable because of firmware, battery, heat, or smartlink.
```

## 6. Result-band interaction

Combat uses the current Lattice result bands:

```text
Miss: roll > TS
Graze: margin 0-9
Hit: margin 10-69
Direct: margin 70+
```

Equipment tags may modify these bands after the attack result is known:

- Shield can step a result down before damage is applied.
- Mitigation reduces Health or System Integrity damage after Shield interaction and final result band are known.
- AP changes Mitigation interaction.
- Shred can compromise Mitigation if its condition is met.
- Burn or similar status can apply through tag/rule text, not only Direct results.

## 7. Lattice-100 weapon damage profiles

Accepted fixed type profiles use Graze / Hit / Direct damage values:

- SMG: 2 / 4 / 5
- Assault rifle: 2 / 5 / 7
- Shotgun: 1 / 5 / 8
- Precision rifle: 1 / 6 / 9
- Heavy weapon: 3 / 7 / 10

Accepted range states are Normal, Impaired, Capped, and Unavailable.

Type baseline defines standard range behavior. Individual weapon matrices show actual values. Show a modifier beside a value only when the individual weapon differs from its type/range baseline. Use Traits / Rules for weapon abilities, passives, and tags.

Weapon matrices are equipment/source-reference format. They are not live DM roll display.

## 8. Open catalog work

Deferred:

- exact weapon categories;
- damage values;
- rarity and cost;
- license/legal tags;
- special ammo rules;
- faction weapon lists;
- integrated weapon rules for cyberware;
- nonlethal weapon defaults;
- safe-vs-habitat weapon expectations.

## 9. Mass-intake clarifications

### 8.1 Weapon tags and action economy

Early second attacks, if allowed by a later rule, should usually be restricted by weapon tag rather than becoming a universal option. Candidate enabling tags include:

```text
Light
Sidearm
CQ
Paired
Compact
Integrated
Fast
```

This remains a design direction, not a finalized second-attack rule.

### 8.2 Analog, smart, powered, and hackable weapons

Analog or mostly mechanical weapons have little or no hack surface by default. Smart, powered, linked, energy, sensor-integrated, or authorization-locked weapons may expose one or more system surfaces:

- firmware;
- battery/power cell;
- heat regulation;
- smartlink;
- authorization lock;
- sensor feed;
- safety interlock;
- targeting assistance.

### 8.3 EMP and weapon/equipment effects

EMP is a possible weapon/equipment route rather than only a narrative hazard. Depending on tags and scale, EMP may affect Shield, Firewall, Suit Fault, System Status, powered gear, drones, locks, turrets, cyberware, or station systems.

Exact EMP scaling remains open in `EQUIP-OPEN-001`.

### 8.4 Status on crit

Armor may reduce incoming HP damage but should not automatically prevent a crit-applied status unless a tag or rule says so.

Shield interaction remains unresolved when the Shield fully turns the hit into a miss or deflection. That question is tracked in `EQUIP-OPEN-001` and future `Combat` status/cover rulings.


