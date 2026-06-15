---
project: "Nexus"
doc_id: "EQUIP-INDEX-000"
legacy_ids:
  - 'SRC-EQUIP-000'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-000 - README_Source_Equipment_Loadout_Cyberware.md'
title: "README_Source_Equipment_Loadout_Cyberware"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "reference_input"
topic_family: "equipment_domain_index"
owns_topics:
  - 'equipment_domain_index'
borrows_topics:
  - 'equipment_loadout'
  - 'equipment_cyberware_model'
created: "2026-05-14"
last_updated: "2026-05-24"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Equipment Domain Readme

## Purpose

The `Equipment` domain owns the current Nexus source for loadout structure, weapons, protective gear, tools, credentials, cyberware, shared inventory rules, equipment tags, and the open-question queue that still surrounds those systems.

This file is the Equipment domain entry surface. It describes where equipment concepts now live, what this domain owns, and what must stay elsewhere.

## Domain structure

Current domain folders:

- `Canon Homes` for durable definitions and ownership.
- `Applied Rules` for procedures that use equipment canon in live play.
- `Open Questions` for unresolved balance, table, and routing work.
- `Reference Inputs` for migration notes, manifests, and domain governance.

Current canon-home set:

- `EQUIP-LOADOUT-001` - active loadout structure and slot logic.
- `EQUIP-WEAPON-001` - weapon principles, tags, and damage-model direction.
- `EQUIP-DEF-001` - armor, shields, Mitigation, Firewall, and defense gear boundaries.
- `EQUIP-TOOL-001` - tools, accessories, consumables, and utility surfaces.
- `EQUIP-CRED-001` - credentials, access gear, and social-equipment handling.
- `EQUIP-CYBER-001` - cyberware, bioware, enhancement modules, and integration tiers.

Current applied-rule set:

- `EQUIP-INVENTORY-001` - ship inventory, requisition, pickups, and shared armory use.
- `EQUIP-TAGS-001` - current tag, rarity, and balance vocabulary pending later data formalization.

## Ownership boundaries

Equipment owns:

- equipped gear and loadout slots;
- weapons, tools, accessories, consumables, and credentials as equipment surfaces;
- armor as an equipment category;
- Mitigation as the damage-reduction stat used by protective gear;
- Shield as the equipment-side deflection/protection layer;
- Firewall as the defensive surface for hackable equipment and cyberware;
- cyberware as module/loadout/upgrade-tree/hack-surface structure;
- shared armory, requisition, and no-carried-inactive-gear baseline;
- provisional equipment tags, rarity notes, and balance placeholders.

Equipment borrows rather than owns:

- `Characters` for identity, origins, personhood, chassis continuity, and recovery doctrine;
- `Combat` for tactical sequencing, encounter use, and timing logic;
- `Skills` for check calls, advancement links, and training interactions;
- `Lore` for legal, social, factional, and personhood doctrine surrounding gear;
- `Dashboards` for current campaign state, examples, and live execution surfaces.

## Current stable direction

The current stable equipment baseline remains:

```text
Primary Weapon
Secondary Weapon
Tool
Protective Gear
Shield / Defense Module
two Accessory slots
capped consumables
credentials stored separately
shared armory aboard ship
```

Additional preserved direction that this domain must continue to carry:

- armor is an equipment category, not the same thing as Mitigation;
- Shield is limited deflection and not extra Health by default;
- durability order is `Shield -> Mitigation -> Health/System Integrity`;
- Firewall is the Lattice defensive surface for hackable gear, cyberware, and systems;
- Tool remains a major build/loadout anchor rather than just a charge sink;
- no carried inactive gear is the current default, with pickups routing through inventory.

The older simple model `Weapon 1 / Weapon 2 / Armor / Accessory 1 / Accessory 2` is preserved only as superseded ancestor language.

## Migration status

This domain is in the first deep-consolidation pass after pilot migration.

Established already:

- new `DOMAIN-TOPIC-###` IDs;
- role buckets;
- legacy traceability in metadata;
- initial ownership metadata for scriptable placement.

Still to do:

- remove remaining old routing phrasing from surviving docs;
- decide where one-to-one migrated docs should merge or split;
- tighten cross-domain references so placement scripts can route with less ambiguity;
- determine which provisional applied-rule or open-question material should become canon homes, data docs, or bridge summaries later.

## Preservation note

This rebuild repo is the working replacement surface. The legacy `00 Source` tree remains protected until the rebuilt structure is reviewed and accepted.




