---
project: "Nexus"
doc_id: "CHAR-RECOVERY-001"
legacy_ids:
  - 'SRC-CHAR-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\09 Characters Crew Progression rev0.4\SRC-CHAR-007 - Recovery_Revival_and_Consequence_Model.md'
title: "Recovery_Revival_and_Consequence_Model"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Characters"
content_role: "canon_home"
topic_family: "recovery_rules"
owns_topics:
  - 'recovery_rules'
  - 'downed_disabled'
  - 'revival_consequences'
borrows_topics:
  - 'combat_core'
  - 'resolution_calls'
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language, repaired inherited display corruption, and preserved the active recovery and revival baseline without relying on legacy slot wording."
---

# Recovery, Revival, and Consequence Model

> [!important] Revised vision reconciliation — 2026-07-11
> Recovery, the Character Build Stack, and compatible progression rules below survive under `CORE-SPATIAL-001`. Each campaign begins with a newly created Player Character; Captain is optional. The Crew Archive supplies eligible Starting Crewmates. Rook references are Campaign Fixture evidence.

## 1. Purpose

This doc owns character-facing recovery and revival consequences. Combat procedure belongs to `Combat`; ship and campaign loop timing belong to `Core`; detailed equipment and medical tech belong to `Equipment`; setting ethics and law belong to `Lore`.

## 2. Current recovery principle

Nexus should allow permanent crew loss, but not casually or invisibly.

Design target:

- visible danger;
- clear clocks;
- meaningful rescue chances;
- stabilization options;
- known risks;
- body-type recovery logic;
- rare but real catastrophic outcomes.

## 3. Downed, Disabled, and stabilization direction

Current direction from harvested material and the 2026-05-24 Lattice/durability integration:

- Health at 0 creates the Downed state.
- System Integrity at 0 creates the Disabled state for systems, modules, drones, objects, hackable surfaces, upload/shell bodies, and Tier 3+ body-support cases where System Integrity is the main durability surface.
- Downed/Disabled clocks are visible.
- Downed/Disabled creates a 3-round countdown starting from the round the character, system, or body-support surface reaches 0 Health or 0 System Integrity.
- If the countdown fails, the result is a critical state, not automatic permanent death, destruction, or character deletion.
- Resolving all threats counts as revival/restoration for the immediate encounter state, unless a specific source, tag, hazard, or scenario says otherwise.
- Stabilization should not simply fail by roll when the crew has access and the required broad item/tool is present.
- Rolls, powers, specialist actions, tools, or facilities can improve revival state, reduce long-term harm, speed extraction, preserve gear/body integrity, or lower cost.
- Injury is the umbrella term for consequences such as bleeding, burn, concussion, upper-body injury, lower-body injury, suit breach, contamination, cybernetic fault, or neural trauma.

Use this durability order when recovery notes need to reference the combat damage path:

```text
Shield -> Mitigation -> Health/System Integrity
```

`Equipment` owns exact Shield, Mitigation, armor, repair gear, medical gear, and cyberware equipment behavior.

## 4. Revival and restoration options

Semi-permanent recovery may exist through ship upgrades, rare services, faction contracts, or specialized facilities.

Examples preserved as source candidates:

```text
Clone Tank / Bio-Regen Vat
Memory Backup Vault
Replacement Chassis Bay
Sleeve Printer / Body Bank
Emergency Cryo Recovery
Neural Pattern Archive
Black Clinic Contract
Corporate Insurance Resurrection
Signal-Anomaly Recovery
brain cradle
identity capsule
continuity recorder
personhood black box
```

## 5. Full Chassis Cyborg recovery

Full Chassis Cyborgs retain a biological brain/person-core. Chassis damage can often be repaired or replaced. Brain/person-core damage is much more serious.

A chassis swap is not clean resurrection unless special preservation technology exists.

## 6. Upload and damaged-crew boundary

A biological character might return as upload-like only if memory/personality backup or similar technology exists. This is not clean resurrection. It should create identity, continuity, legal, morale, loyalty, and personhood consequences.

Upload body replacement may be easier mechanically but riskier legally, socially, economically, or psychologically.

## 7. DM Mode use

When a character is downed, killed, damaged, restored, or embodied differently, DM Mode should surface:

```text
What was saved?
What was lost?
Who paid?
What body or substrate is now carrying the person?
What relationship, legal, faction, or selfhood consequence follows?
```

## 8. Open design boundary

Exact revival costs, critical-state tables, continuity rules, preservation tech availability, and full chassis/replacement thresholds remain open. The baseline trigger is no longer open: 0 Health creates Downed, 0 System Integrity creates Disabled, and both use a 3-round countdown unless a specific source, tag, hazard, or scenario modifies the procedure.

## 9. Stabilization and recovery clarification

Basic stabilization should not fail merely because of a roll when the crew has access and the required broad item/tool is present.

Working rule:

- a roll, feature, or specialist action may improve the revival state, reduce harm, speed extraction, preserve gear/body integrity, or lower downstream cost;
- basic stabilization itself should usually work when access + the broad correct tool/item are present;
- resolving all threats counts as revival/restoration for immediate encounter function unless a specific source, tag, hazard, or scenario says otherwise;
- Downed/Disabled clocks appear when ongoing fatal, destructive, unrecoverable, or permanent-loss risk is active; the default countdown is 3 rounds.

This keeps danger visible without making routine first aid feel arbitrary.

## 10. Recovery category split

Use these as current recovery lanes:

| Recovery lane | Use |
|---|---|
| Basic Medicine | Organic trauma, bleeding, shock, burns, infection, ordinary stabilization. |
| Splice Specialty | Nonstandard biology, hybrid anatomy, engineered organs, unusual immune or environmental dependencies. |
| Repair | Mechanical chassis damage, cyberware damage, armor/suit failures, drone or shell work. |
| Continuity Stabilization / Neural Pattern Realignment | Uploads, brain/person-core preservation, memory backup, pattern drift, identity continuity, signal/neurological anomalies. |

Exact skills, tools, and facility requirements route to `Skills` and `Equipment`.

## 11. Downtime recovery split

Default Downtime assumptions, pending later balance:

- Health usually restores during Downtime when available care and the fiction support it, unless blocked by tag or fiction;
- equipment that provides Mitigation resets to functional baseline by default if basic repair access exists;
- ordinary tactical statuses usually clear by tag or scene end;
- persistent statuses and long-term Health/Morale/Loyalty effects require intentional recovery, repair, treatment, social work, downtime, route choices, or resource spend.

## 12. Status persistence and conversion

A standard or temporary status does not automatically become persistent. It becomes persistent when a source, tag, hazard, or scenario explicitly defines it as persistent, when treatment fails to fully clear the condition, when aftermath/recovery converts it, or when the status contributes to or coincides with Downed/Disabled.

If an effect would apply a temporary status and also causes the target to become Downed or Disabled, convert that status into its persistent version unless a specific source, tag, hazard, or scenario says otherwise. Examples:

- temporary Burn -> persistent Burn
- temporary Injury -> persistent Injury
- temporary Bleed -> persistent Injury or persistent Bleed, depending on the source
- temporary System Fault -> persistent system fault

Basic stabilization, repair, reboot, or threat-resolution restoration returns immediate function, but does not guarantee removal of all persistent statuses. Persistent status and Injury require treatment, repair, time, resources, scenario resolution, or specialist handling.

## 13. Revival infrastructure as strategic tradeoff

Revival and restoration should not become a free undo. Recovery facilities may preserve crew but should create route, resource, legal, faction, relationship, body, or identity consequences.

Examples to keep in the candidate pool:

- clone tanks / bio-regen vats;
- memory backup vaults;
- replacement chassis bays;
- sleeve printers / body banks;
- black clinics;
- corporate insurance resurrection;
- emergency cryo recovery;
- neural pattern archive;
- personhood black box;
- Signal-anomaly recovery.

## 14. Permanent Loss and Legacy World handling

Player Character Permanent Loss is a real campaign outcome. It prevents that Player Character from converting into an Archive Crewmate. Surviving Player Characters convert under `CHAR-CREW-001`. An early campaign loss still receives structured resolution and enters the Legacy World with its validated consequences; loss does not erase the campaign from chronology. This reconciles [ADR-0069](../../../../adr/0069-early-campaign-loss-still-enters-the-legacy-world.md) and [ADR-0070](../../../../adr/0070-surviving-player-characters-become-archive-crewmates.md).
