---
project: "Nexus"
doc_id: "MODES-REGISTER-002"
legacy_ids:
  - 'REG-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\REG-002 - Nexus_Source_Status_Register.md'
title: "Nexus_Source_Status_Register"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "register"
canon_status: "admin_reference"
authority: "non_authoritative"
applicability:
  - 'content_authoring_workflow'
  - 'historical_provenance'
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "nexus_source_status_register"
owns_topics:
  - 'nexus_source_status_register'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. This register is now framed as transition evidence from the ChatGPT slot era rather than the controlling live source ledger; legacy package and slot wording is retained where needed for historical traceability."
---

# Nexus Source Status Register

## 1. Purpose

This register tracks transition evidence from the earlier ChatGPT source-slot era alongside key rebuild states.

It preserves older source-status tables during the rebuild. It does not delete or invalidate old status registers by itself.

## 2. Authority Notes

- Confirmed live source and accepted rebuild outputs now outrank this register when determining current authority.
- This register preserves source-slot and source-bundle history; it does not define the current domain-first operating model by itself.
- Old backups remain extraction evidence, not automatic current source.
- Package status is not `current` until content and metadata status are checked.

## 3. Legacy Loose Project Source Layer

| Slot | File | Role | Status | Cleanup Guidance |
|---|---|---|---|---|
| 01 | `00_NEXUS_PROJECT_SOURCE_BOOTSTRAP_2026-05-13_rev0.2.md` | bootstrap | installed/current loose source per user confirmation | keep loose |
| 02 | `01_GLOBAL_Mode_Operations_Rules Rev 1.1.md` | global operations | installed/current loose source | keep loose |
| 03 | `00_STEWY_READ_FIRST_Mode_Rules_AI_rev0.1.md` | Steward/Stewy operations | installed/current loose source | keep loose |
| 04 | `Project_Source_Slot_Map_2026-05-13_rev0.2.md` | package/slot map | installed/current loose source | keep loose |
| 20 temporary | `Nexus_Source_Reorganization_Runbook_2026-05-13_rev0.1.md` | temporary bridge runbook | keep until Slot 05 is uploaded and searchable | no deletion without user approval |

## 4. Legacy Package Slot Status

| Slot | Package | ID Family | Current Status | Notes |
|---|---|---|---|---|
| 05 | `Admin_Runbooks_Source_Management_Package.zip` | ADM | produced / user-corrected frontmatter pending verification | earlier package had frontmatter issue; user corrected locally |
| 06 | `Mode_Operations_Registers_Templates_Package.zip` | MODE / REG / TPL | this package realization | built after Slot 05 correction rule |
| 07 | `Source_Core_Game_and_Campaign_Package.zip` | SRC-CORE | planned / rebuild_needed | not yet realized in this run |
| 08 | `Source_Combat_TacMaps_Encounters_Package.zip` | SRC-COMBAT | planned / rebuild_needed | not yet realized in this run |
| 09 | `Source_Characters_Crew_Progression_Package.zip` | SRC-CHAR | planned / rebuild_needed | not yet realized in this run |
| 10 | `Source_Skills_Resolution_RNG_Package.zip` | SRC-SKILL | planned / rebuild_needed | not yet realized in this run |
| 11 | `Source_Equipment_Loadout_Cyberware_Package.zip` | SRC-EQUIP | planned / rebuild_needed | not yet realized in this run |
| 12 | `Source_Lore_Factions_Timeline_Package.zip` | SRC-LORE | planned / rebuild_needed | not yet realized in this run |
| 13 | `Source_Exploration_Travel_Nodes_Package.zip` | SRC-TRAVEL | planned / rebuild_needed | not yet realized in this run |
| 14 | `Source_Factions_Society_Politics_Package.zip` | SRC-FACTION | planned / rebuild_needed | not yet realized in this run |
| 15 | `Source_Playtest_Rulings_Gaps_Package.zip` | SRC-PLAYTEST | planned / rebuild_needed | not yet realized in this run |
| 16 | `Dashboards_State_Package.zip` | DASH | planned / rebuild_needed | not yet realized in this run |
| 17 | `Reference_Research_Background_Package.zip` | REF | planned / rebuild_needed | not yet realized in this run |
| 18 | `Data_Workbooks_Tables_Package.zip` | DATA | planned / rebuild_needed | not yet realized in this run |
| 19 | `Art_Visual_Direction_Package.zip` | ART | protected planned slot | not yet realized in this run |

## 5. Register Handling Notes

Older registers found during consolidation include Draft Queue, Rules Gap Register, Seed Inbox/Register, Seed Harvest Register, Handoff Register, Art Prompt Queue, and Phase 1 task register.

The legacy Slot 06 surface intentionally retained only:

- `REG-001 - Nexus_Output_Register.md`
- `REG-002 - Nexus_Source_Status_Register.md`
- `REG-003 - Nexus_Open_Questions_Register.md`

Other registers are not deleted. They are routed to later domain work or active dashboards/workbench surfaces as relevant.


## Source Handling Note

This document is a rebuild consolidation target. It is not a verbatim copy of one older backup file. It preserves and reorganizes usable mode/register/template instructions from the historical ChatGPT source layer, later Nexus patterns, and backup evidence. Older wording that conflicts with the current domain-first operating model is treated as legacy evidence, not source truth.


## 6. Mass-Intake Source Update Status - 2026-05-15

The 2026-05-15 mass-intake pass produced restrained update candidates for several earlier Project Source bundles.

Current produced candidates from this pass:

- `PKG07 - Core Game Campaign - Steward - 0515 1326.zip` - produced; upload/searchability pending.
- `08 - Source_Combat_TacMaps_Encounters_Package_rev0.3.zip` - produced before new naming rule; upload/searchability pending.
- `PKG09 - Characters Crew Progression - Steward - 0515 1245.zip` - produced; upload/searchability pending.
- `PKG10 - Skills Resolution RNG - Steward - 0515 1315.zip` - produced; upload/searchability pending.
- `PKG11 - Equipment Loadout Cyberware - Steward - 0515 1259.zip` - produced; upload/searchability pending.
- `PKG12 - Lore Factions Timeline - Steward - 0515 1303.zip` - produced; upload/searchability pending.
- `PKG16 - Current Dashboards State - Steward - 0515 1341.zip` - produced; upload/searchability pending.
- `PKG06 - Mode Ops Registers Templates - Steward - 0515 1348.zip` - this bundle; produced; upload/searchability pending.

Status language for this pass:

- `review approved` means the package/doc disposition was approved for restrained integration; it is not a final doctrine freeze.
- `produced` means a downloadable candidate exists.
- `upload pending` means the user has not yet confirmed the package is installed in Project Sources or Obsidian.
- `searchability pending` means retrieval has not yet been smoke-tested after upload.
- `cleanup not approved` means older packages, handoffs, registers, and backups remain protected.



