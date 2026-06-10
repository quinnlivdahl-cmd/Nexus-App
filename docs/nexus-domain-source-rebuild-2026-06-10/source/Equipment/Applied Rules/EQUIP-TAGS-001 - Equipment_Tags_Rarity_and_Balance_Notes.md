---
project: "Nexus"
doc_id: "EQUIP-TAGS-001"
legacy_ids:
  - 'SRC-EQUIP-009'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-009 - Equipment_Tags_Rarity_and_Balance_Notes.md'
title: "Equipment_Tags_Rarity_and_Balance_Notes"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "applied_rule"
topic_family: "equipment_tags"
owns_topics:
  - 'equipment_tags'
  - 'rarity_and_balance'
borrows_topics:
  - 'equipment_weapons'
  - 'equipment_defense'
  - 'equipment_tools'
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active tag, rarity, and balance vocabulary without relying on package-era framing."
---

# Equipment Tags Rarity and Balance Notes

## 1. Tags as planning information

Tags are planning information, not only combat math.

They help players infer whether gear is useful before the scene begins and help DM Mode adjudicate outcomes quickly.

Tags may apply to:

- weapons;
- armor;
- shields;
- tools;
- cyberware;
- accessories;
- credentials;
- enemies;
- factions;
- hazards;
- station systems;
- ship systems;
- routes;
- objectives;
- body/chassis types;
- legal/custody procedures.

## 2. Core and expandable tags

Current source-supported working tags:

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

This is not a final controlled vocabulary. It is a working list for source retrieval and future data design.

## 3. Degradation only when useful

Armor, Shield, and Firewall degradation exists, but only when tags or effects make it worth tracking.

Examples:

```text
Shred -> Armor Compromised or Armor -1 until repaired
EMP -> Shield deflection loss, Firewall strain, Suit Fault risk
Corrosive -> Armor/Sealed tag compromised
Cyber intrusion -> Firewall breach, System Integrity damage, Locked Out
Overload -> Shield burns out for stronger deflection
```

Do not degrade every layer from ordinary hits by default.

## 4. Rarity and access

Rarity can come from more than price:

- restricted legal status;
- faction control;
- required credential;
- hazardous habitat risk;
- maintenance burden;
- cyberware clinic access;
- black-market access;
- ship compatibility;
- body/chassis compatibility;
- traceability;
- social stigma;
- supply chain scarcity.

## 5. Balance notes

Equipment should not erase character identity. It should create tradeoffs and permissions.

Useful gear can:

- reveal options;
- let a weak skill attempt an approach;
- make a strong skill shine;
- add risk or hack surface;
- impose legality or faction consequences;
- occupy a slot;
- require a credential;
- cost time, heat, charge, or consumables;
- require ship storage or crew planning.

## 6. Data routing

Final equipment lists, tags, costs, rarity, legal status, cyberware categories, and inventory rows likely belong in future `Data`-side tables or workbook outputs.

`Equipment` owns the source meaning and routing logic first.

## 7. Mass-intake tag additions

The following tags are approved as provisional vocabulary for tech/equipment/cyberware discussion:

```text
Hackable
Linked
Powered
Integrated
Smart
Analog
Sealed
Seal
EMP
Custody
Legal
Restricted
System
Module
Standard Fit
Adapted Fit
```

These tags are planning vocabulary, not final data-table locks.

Additional rarity/access factors to preserve:

- body compatibility;
- Standard Fit assumptions;
- clinic access;
- black-market access;
- faction permission;
- maintenance burden;
- traceability;
- legal/custody status;
- hack-surface risk.

Equipment should create tradeoffs and permissions, not erase character identity.


## 8. Lattice and durability balance notes

Balance language should use Mitigation as the stat and armor as an equipment category. Tags such as AP, Shred, EMP, Hack, Smart, Analog, Sealed, Energy, Kinetic, and Shield-facing tags may alter the normal durability order:

```text
Shield -> Mitigation -> Health/System Integrity
```

Shield should not be treated as extra Health. Shield effects should normally step down an incoming result band or cancel a Graze according to Shield tags/rules.

Mitigation should not routinely reduce Hit or Direct damage to 0. A tag, ability, or special rule must explicitly permit that exception.


