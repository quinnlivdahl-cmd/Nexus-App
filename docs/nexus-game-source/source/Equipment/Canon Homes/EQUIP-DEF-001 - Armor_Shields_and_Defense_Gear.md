---
project: "Nexus"
doc_id: "EQUIP-DEF-001"
legacy_ids:
  - 'SRC-EQUIP-004'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-004 - Armor_Shields_and_Defense_Gear.md'
title: "Armor_Shields_and_Defense_Gear"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "canon_home"
topic_family: "equipment_defense"
owns_topics:
  - 'equipment_defense'
  - 'shield_rules'
  - 'mitigation_rules'
  - 'firewall_surface'
borrows_topics:
  - 'combat_core'
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active defense-gear split without relying on package-era framing."
---

# Armor Shields and Defense Gear

## 1. Terminology split

Use this split consistently:

| Term | Meaning |
|---|---|
| Protective Gear | Equipped suit, armor, plating, clothing, rig, or protective item. |
| Mitigation | Numerical damage-reduction stat applied after Shield interaction and final result band are known. |
| Shield | Limited deflection/protection gate. Not extra HP by default. |
| Firewall | Anti-hack value for characters, systems, cyberware, smart gear, drones, suits, and other hackable surfaces. |

## 2. Defensive display line

The preferred compact display line is:

```text
Health | System Integrity | Defense | Firewall | Mitigation | Shield
```

Example from source material:

```text
HP/SI | DEF/FW | MTG | SHD
```

Optional fields:

```text
Hack Surfaces
Tags
```

## 3. Mitigation rule

Armor is an equipment category. Mitigation is the numerical damage-reduction stat.

Base Mitigation rule:

```text
Mitigation reduces incoming Health or System Integrity damage after Shield interaction and final result band are known.
```

Mitigation does not increase hit difficulty by default. Hit difficulty belongs to Defense, cover, stance, movement, status, environment, range, elevation, Guard Self, Screen, reaction play, and other positioning/build factors.

Mitigation may reduce Graze damage to 0. Mitigation cannot reduce Hit or Direct damage below 1 unless a tag, ability, or special rule says so.

Mitigation scale:

- 0: none
- 1: light
- 2: standard
- 3: heavy
- 4+: rare, boss, vehicle, hardpoint, or scenario scale

Protective Gear may grant:

- Defense;
- Mitigation;
- tags;
- modules;
- Shield;
- Firewall;
- Seal;
- environmental tolerances;
- hack surfaces;
- tradeoffs.

## 4. Shield rule

Current shield direction:

```text
Shield X = X charges per encounter.
```

Shield is not extra Health by default. Basic Shield automatically triggers on qualifying incoming effects, including Graze, unless a smarter shield, ability, tag, or scenario rule says otherwise.

Shield stepdown:

- Direct -> Hit
- Hit -> Graze
- Graze -> Miss / 0 Health damage

Tags define what qualifies and whether a shield behaves differently.

## 5. Firewall and System Integrity

Firewall is a major defensive surface, not a minor side stat.

Working rule:

```text
Firewall is the Defense of hackable surfaces.
Tags define what a hack can actually affect.
System Integrity appears only on important systems.
```

Default assumption:

- one character Firewall by default;
- important objects/systems may have their own Firewall and System Integrity;
- minor hackable objects may only need Firewall plus status effects;
- body style, cyberware, smart gear, suit, weapon, drone, and environmental systems define hack surfaces.

## 6. Reset and persistence

After fight:

- shields reset by default unless damaged/overloaded/broken;
- per-encounter cooldowns may reset if used.

Ship time:

- Health generally restores to full by default for PCs/crew unless persistent injury rules apply;
- Mitigation/protective gear resets to functional baseline by default;
- many ordinary tactical statuses clear;
- persistent statuses require healing, repair, recovery, or story resolution.

Consumables do not reset automatically unless resupplied.

## 7. Mass-intake clarifications

### 9.1 Defensive display spine

`Equipment` aligns with the current durability display spine:

```text
Health | System Integrity | Defense | Firewall | Mitigation | Shield
```

Compact display may use:

```text
HP/SI | DEF/FW | MTG | SHD
```

- Health tracks bodily/chassis damage where Health is the primary track.
- System Integrity tracks operational damage for important systems and Tier 3+ cybernetic/chassis bodies.
- Defense is hit avoidance / difficulty-to-hit surface.
- Firewall resists hostile Tech/System intrusion.
- Mitigation reduces qualifying incoming Health/System Integrity damage.
- Shield is limited deflection/protection by tag.

### 9.2 Layer degradation

Do not degrade Mitigation, Shield, or Firewall from ordinary hits by default. Degradation should appear only when a tag, result band, enemy ability, hazard, status, or scenario rule makes tracking worth the table cost.

### 9.3 Shield as limited deflection

Working default:

```text
Shield X = X qualifying deflections per encounter.
```

Shield is not extra HP by default. Shield tags define what qualifies and what happens when the Shield is used.

A later Shield-check model remains possible, but it is not the active default.

### 9.4 Firewall and System Integrity

One character Firewall is the default character-facing model.

Important objects, drones, suits, ship systems, station systems, bosses, and major modules may have separate Firewall and/or System Integrity. Minor hackable gear may only need Firewall plus System Status.


