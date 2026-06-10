---
project: "Nexus"
doc_id: "EQUIP-CYBER-001"
legacy_ids:
  - 'SRC-EQUIP-007'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-007 - Cyberware_Bioware_and_Enhancement_Model.md'
title: "Cyberware_Bioware_and_Enhancement_Model"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "canon_home"
topic_family: "equipment_cyberware_model"
owns_topics:
  - 'cyberware_model'
  - 'bioware_model'
  - 'enhancement_model'
borrows_topics:
  - 'character_chassis'
  - 'character_origins'
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active cyberware-module boundary without relying on package-era framing."
---

# Cyberware Bioware and Enhancement Model

## 1. Domain boundary

`Characters` owns character identity, body continuity, origins, and personhood framing.

`Equipment` owns cyberware as:

- equipment/module layer;
- upgrade-tree surface;
- loadout/build component;
- hack-surface source;
- rarity/cost/access gate;
- armor/weapon/tool/body module interaction.

## 2. Corrected character-creation model

Current rule from handoff correction:

```text
Base Body / Origin
+ creation-point cyberware purchases
= derived cybernetic integration tier
+ chosen cyberware upgrade trees
+ Firewall / hack-surface consequences
```

Players do not choose a separate Cyborg body type by default.

Characters may spend creation points on cyberware. What cyberware is chosen, and how much is chosen, determines cybernetic integration tier.

Each selected cyberware piece can become an upgrade tree.

Adding entirely new cyberware mid-campaign should be rare and gated by clinic access, cost, downtime, faction access, risk, story permission, or special services.

## 3. Integration tier ladder

Current provisional tier ladder:

```text
Tier 0 - Background Implants
Tier 1 - Light Implantation
Tier 2 - Integrated
Tier 3 - Chassis-Dependent
Tier 4 - Full Chassis
```

Do not treat this as final balance. It is the best currently recovered source structure.

## 4. Full chassis cyborg distinction

Full Chassis Cyborgs still have a biological brain/person-core.

They are not uploads.

Chassis damage can be repaired or replaced. Brain/person-core damage is much more serious. A simple chassis swap is not enough unless special preservation tech exists.

## 5. Cyberware as module layer

Current equipment direction:

```text
Cybernetic implants should often function like equipment modules or weapon-like body gear.
```

Examples:

- cybernetic arm;
- optic suite;
- neural port;
- reflex rig;
- integrated weapon;
- armor skin;
- subdermal armor;
- smart limb;
- hidden blade arm.

Small medical/cosmetic implants are usually background and should not require tracking.

## 6. Hack surfaces

Any body module or smart item with Hackable / Linked / Smart / Powered tags can be targeted by hostile Tech.

Possible module targeting examples:

| Module | Possible effects |
|---|---|
| Optic Suite | Blinded, Sensor Bloom, False Target, Marked |
| Smart Arm | Grip Lock, Aim Disruption, Forced Drop, Tool Jam |
| Reflex Rig | Reaction Disabled, Staggered, Overheat, Motor Fault |
| Neural Port | Trace, Cognitive Noise, Lockout, Signal Vulnerability |
| Integrated Weapon | Jammed, Safety Lock, Heat Spike, Ammo Misread |
| Subdermal Armor | Armor Tag Disabled, Smartplate Lock, Seal Failure |

These are source-supported examples for future design, not a final status list.

## 7. Bioware and splices

Splice characters may select cyberware, but it costs many points and must have drawbacks. This keeps cyberware from becoming a free universal upgrade on top of already-specialized body features.

Bioware, biotech, and body modifications may share some module logic with cyberware, but their hack surfaces, repair methods, medicine/biotech interactions, and social consequences may differ.

## 8. Cyberware durability tiers

Tier 0: Health main, no hack/System Integrity unless specific.

Tier 1: Health main, individual cyberware hackable, no System Integrity by default.

Tier 2: Health main, major modules may have System Integrity; module disable does not Down the character by default.

Tier 3: System Integrity main; machinery supports vital function.

Tier 4: System Integrity main; machinery replaces most body function.

A cyberware module that can be Disabled without Downing the character is module cyberware. A cyberware module whose Disabled state would Down the character is body-support cyberware and requires Tier 3+ integration.

Calculate Tier 3+ System Integrity from the character's base Health-equivalent value, then add cyberware, chassis, origin, and rare feature bonuses where applicable.

Cyberware with electronic, smart, networked, remote, autonomous, software, or signal-facing functions has Firewall. Important cyberware may have System Integrity. Ordinary Health damage does not reduce cyberware System Integrity unless specifically targeted or a tag/effect says so.

Bioware may grant Health, Mitigation, abilities, or other features but does not automatically have Firewall unless it includes electronic, smart, or control hardware.

## 9. Deferred cyberware work

Deferred:

- exact cyberware tree categories;
- cyberware costs;
- exact creation-point model;
- upgrade tree tiers;
- hack-surface tags;
- full chassis preservation rules;
- clinic/faction access;
- recovery and repair procedures;
- future `Data`-side structured cyberware outputs.

## 10. Mass-intake clarifications

### 10.1 Integrated Tool correction

Integrated Tool is a cyberware/equipment option, not a default cyborg feature.

### 10.2 Cyberware as module model

Cyberware may function as a body module, loadout module, upgrade tree, hack surface, or permission surface. Examples include cybernetic arms, optic suites, neural ports, reflex rigs, integrated weapons, armor skin, subdermal armor, smart limbs, and hidden blade arms.

### 10.3 System Status terminology

Use **System Status** for tech/cyberware/turrets/locks/suits/drones/modules and similar surfaces.

System Status can apply to:

- cyberware;
- smart weapons;
- suits;
- drones;
- upload sleeves;
- modules;
- locks;
- turrets;
- ship systems;
- station systems.

### 10.4 Module targeting

Ordinary hostile Tech should usually affect exposed valid surfaces. Precise implant targeting likely requires a called hack, power, tag, special permission, or established access route.

### 10.5 EMP and cyber-disruption

EMP and system disruption remain open scaling issues. Effects may range from minor System Status to temporary lockout, Suit Fault, Shield loss, Firewall pressure, module degradation, or scene-specific shutdown.

### 10.6 C-POH routing

C-POH ideology and personhood boundaries belong primarily in `Lore`. `Equipment` tracks the equipment implications only: prosthetics, restorative tech, integrated tools, invasive implants, access limits, and faction/legal restrictions.


