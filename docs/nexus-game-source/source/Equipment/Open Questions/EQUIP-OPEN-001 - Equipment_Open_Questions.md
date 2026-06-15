---
project: "Nexus"
doc_id: "EQUIP-OPEN-001"
legacy_ids:
  - 'SRC-EQUIP-010'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-010 - Equipment_Open_Questions.md'
title: "Equipment_Open_Questions"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "open_questions"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "open_questions"
topic_family: "equipment_open_questions"
owns_topics:
  - 'equipment_open_questions'
borrows_topics:
  - 'equipment_cyberware_model'
  - 'equipment_defense'
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved unresolved equipment questions without relying on package-era framing."
---

# Equipment Open Questions

## 1. Loadout and inventory

Open questions:

- Exact consumable cap model.
- Whether two flexible consumable slots are default or a later power/gear option.
- Whether some body/chassis types modify slot count.
- Whether any class/discipline can hold two primaries.
- How often mission overlay can be changed inside a node.

## 2. Weapons

Open questions:

- Final weapon categories.
- Damage values and result-band math.
- Special ammo handling.
- Reload/readiness/heat rules.
- Nonlethal defaults.
- Habitat-safe vs habitat-risk weapon categories.
- Weapon legality and faction tags.

## 3. Armor, Shield, and Firewall

Open questions:

- Exact Shield check model.
- Whether Shield is a resource, automatic defensive check, or both depending tag.
- Whether shield deflection erases crits.
- Exact Armor/AP/Shred interaction.
- Firewall scale and second pass after offensive hacking abilities develop.
- Whether key smart gear has separate System Integrity.

## 4. Cyberware

Open questions:

- Exact creation-point costs.
- Exact cyberware upgrade trees.
- How much cyberware changes integration tier.
- Full chassis preservation rules.
- Clinic/faction/economy requirements for adding new cyberware mid-campaign.
- Bioware/cyberware separation.
- Repair, replacement, and hack-surface balance.

## 5. Credentials and social gear

Open questions:

- Credential durability, revocation, trace, and spoof detection.
- Whether credentials can be shared by the whole crew or assigned to individuals.
- How forged credentials interact with factions and legal/custody tags.
- How social equipment appears in DM display.

## 6. Future data work

Future `Data`-side support likely needs:

- equipment inventory workbook;
- weapon tag table;
- armor/shield/protective gear table;
- cyberware module and tree table;
- credential/access table;
- consumables list;
- rarity and legality data dictionary.

## 7. Cross-domain follow-up candidates

Potential cross-domain follow-ups after this domain pass is reviewed:

- `Modes`: DM-mode display rules should include compact current loadout and inventory shortcut displays.
- `Core`: campaign loop guidance should include loadout and advancement review before node start consistently.
- `Combat`: combat docs should crosslink equipment-owned Shield, armor, Mitigation, and Firewall detail rather than re-owning it.
- `Characters`: character docs should link cyberware module rules without reverting to cyborg-as-default body assumptions.
- `Skills`: skill docs should reference gear and cyberware as auxiliary access channels and modifier sources.

## 8. Mass-intake open questions

- Exact consumable cap model.
- Whether two flexible consumable slots are default or later power/gear option.
- Integrated Tool slot logic.
- Integrated Weapon slot logic.
- Exact Shield check model, if any.
- Whether Shield erases crit-applied status if it fully turns the hit into a miss.
- Firewall vs System Integrity thresholds.
- EMP scaling across cyberware, drones, suits, locks, turrets, smart weapons, station systems, and ship systems.
- Exact cyberware costs and upgrade-tree depth.
- How Standard Fit affects gear availability.
- Whether heavy cyberware threatens Standard Fit.
- future `Data`-side equipment and cyberware tables.
- Pickup timing: when a pickup can be used immediately as a scene object versus added to inventory for later preparation.

Resolved during review:

```text
No carried inactive gear.
Pickups are added to inventory.
Pickups are not related to equipment slots by default.
```


## 9. Lattice and durability resolution update

Resolved for this package pass:

- Armor is an equipment category; Mitigation is the numerical damage-reduction stat.
- Shield is limited deflection, not extra Health by default.
- Basic Shield uses per-encounter charges and current stepdown behavior unless a smarter shield, tag, ability, or scenario rule says otherwise.
- Current durability order is Shield -> Mitigation -> Health/System Integrity.
- Firewall is the Lattice defensive surface for hackable equipment/cyberware/system targets.

Still open / routed for later:

- exact cyberware costs and upgrade tree categories;
- exact EMP and system disruption scaling;
- exact AP/Shred/anti-Mitigation tag values;
- exact smart shield variants and shield-check alternatives;
- final equipment workbook/data-table balance.


