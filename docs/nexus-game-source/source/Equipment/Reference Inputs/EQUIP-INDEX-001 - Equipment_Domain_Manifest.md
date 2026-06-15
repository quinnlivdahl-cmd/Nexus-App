---
project: "Nexus"
doc_id: "EQUIP-INDEX-001"
legacy_ids:
  - 'SRC-EQUIP-001'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-001 - PACKAGE_MANIFEST_Source_Equipment_Loadout_Cyberware.md'
title: "PACKAGE_MANIFEST_Source_Equipment_Loadout_Cyberware"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "domain_manifest"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "reference_input"
topic_family: "equipment_domain_manifest"
owns_topics:
  - 'equipment_domain_manifest'
borrows_topics:
  - 'equipment_loadout'
  - 'equipment_defense'
created: "2026-05-14"
last_updated: "2026-05-24"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Equipment Domain Manifest

## Domain identity

- Domain: `Equipment`
- Rebuild status: `pilot cluster deep-consolidation pass`
- Legacy family: `SRC-EQUIP`
- Current function: domain inventory, ownership map, conflicts, and migration notes

## Domain contents

| Doc ID | Role | Current purpose |
|---|---|---|
| EQUIP-INDEX-000 | reference_input | Domain readme and boundary summary |
| EQUIP-INDEX-001 | reference_input | Domain manifest and conflict ledger |
| EQUIP-LOADOUT-001 | canon_home | Active loadout structure and slot ownership |
| EQUIP-WEAPON-001 | canon_home | Weapon principles, tags, and damage direction |
| EQUIP-DEF-001 | canon_home | Armor, Shield, Mitigation, Firewall, and defense gear |
| EQUIP-TOOL-001 | canon_home | Tools, accessories, consumables, and utility surfaces |
| EQUIP-CRED-001 | canon_home | Credentials, access gear, and social-equipment handling |
| EQUIP-CYBER-001 | canon_home | Cyberware, bioware, enhancement modules, and integration tiers |
| EQUIP-INVENTORY-001 | applied_rule | Shared armory, requisition, pickups, and no-carried-inactive-gear procedure |
| EQUIP-TAGS-001 | applied_rule | Tag, rarity, legality, economy, and balance vocabulary |
| EQUIP-OPEN-001 | open_question | Deferred math, data work, unresolved rules, and routing notes |

## Canon-home boundary map

- `EQUIP-LOADOUT-001` owns active loadout structure, slot categories, and what counts as equipped.
- `EQUIP-DEF-001` owns the equipment-side meaning of armor, Shield, Mitigation, Firewall, and durability order.
- `EQUIP-CYBER-001` owns cyberware as equipment/module/loadout/upgrade-tree/hack-surface structure.
- `EQUIP-CRED-001` owns credentials as equipment-side access assets rather than campaign-state records.
- `EQUIP-INVENTORY-001` applies equipment canon to ship inventory, pickups, requisition, and preparation flow.
- `EQUIP-TAGS-001` applies current canon to provisional tag, rarity, legality, and balance vocabulary until later data formalization.

## Cross-domain boundaries

Equipment does not own:

- identity, origins, personhood, chassis continuity, or recovery doctrine; those belong in `Characters`;
- tactical sequencing, cover timing, encounter pacing, or live combat procedure; those belong in `Combat`;
- skill check calls, advancement math, or training structures; those belong in `Skills`;
- legal doctrine, caste meaning, faction ideology, or personhood philosophy; those belong in `Lore`;
- live campaign examples, current player state, or execution reminders; those belong in `Dashboards`.

## Consolidation findings

- Legacy docs mixed history notes with the actual current equipment model.
- Cyberware carried heavy slot-boundary wording even where the content itself already fit a canon-home doc.
- Open-question routing still pointed to legacy slots instead of current domains.
- Inventory logic already behaves more like an applied-rule document than a canon-home document.
- Tags and rarity remain useful but are still too provisional to pretend they are settled data.

## Current conflict ledger

### C1 - Simple old loadout vs richer current baseline

Handling: newer baseline stays primary. The old simple model remains ancestor language only.

### C2 - Cyberware identity vs module behavior

Handling: `Characters` owns identity and body-continuity doctrine. `Equipment` owns cyberware as an equipment/module system.

### C3 - Shield, Mitigation, and Firewall split

Handling: keep the current separation. `EQUIP-DEF-001` owns definitions; `Combat` later applies them procedurally.

### C4 - Pickups and carried gear

Handling: the current baseline remains no carried inactive gear. Pickups route into inventory unless a later rule explicitly grants immediate scene use.

### C5 - Campaign-specific equipment examples

Handling: preserve them as examples, dashboard context, or bridge summaries rather than allowing them to become universal canon by accident.

## Future data and bridge notes

Likely future `Data`-side outputs or bridge support artifacts:

- equipment inventory table;
- weapon tag table;
- protective gear / Shield / Mitigation table;
- cyberware module and tree table;
- credential and access table;
- consumables list;
- rarity, legality, and economy tables.

These should become structured downstream surfaces after the domain boundaries are stable, not before.




