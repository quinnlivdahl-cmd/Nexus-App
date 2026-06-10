---
project: "Nexus"
doc_id: "ADMIN-MAP-003"
legacy_ids:
  - 'SLOT-001'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\03 Slot Map rev0.6.md'
title: "Legacy Source Routing Map"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "legacy_reference"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "legacy_slot_map_reference"
owns_topics:
  - 'legacy_slot_map_reference'
borrows_topics: []
created: "2026-05-15"
last_updated: "2026-05-26"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this legacy routing artifact. It is preserved for migration traceability, not as the primary operating map for the rebuild."
---

# Legacy Source Routing Map rev0.6

## Purpose

This slot map is the package-first routing index for the live local source lane at `00 Source`.

Use slot number plus slot title as the stable lookup key. Treat folder `rev` as helpful version context, not as the primary identity.

## Root operating layer

Keep the root source-control layer limited to:

1. `[[00 Bootstrap rev0.4]]`
2. `[[01 Global Mode Operations Rules rev1.2]]`
3. `[[02 Steward Mode Rules rev0.2]]`
4. `[[03 Routing Map rev0.6]]`
5. `AGENTS.md`

## Slot routing

### 05 Admin Runbooks Source Management

Folder: `05 Admin Runbooks Source Management rev0.3`

- `[[ADM-000 - README_Admin_Runbooks_Source_Management]]`
- `[[ADM-001 - PACKAGE_MANIFEST_Admin_Runbooks_Source_Management]]`

### 06 Mode Ops Registers Templates

Folder: `06 Mode Ops Registers Templates rev0.5`

- `[[MODE-000 - README_Mode_Operations_Registers_Templates]]`
- `[[MODE-001 - PACKAGE_MANIFEST_Mode_Operations_Registers_Templates]]`

### 07 Core Game Campaign

Folder: `07 Core Game Campaign rev0.3`

- `[[SRC-CORE-000 - README_Source_Core_Game_and_Campaign]]`
- `[[SRC-CORE-001 - PACKAGE_MANIFEST_Source_Core_Game_and_Campaign]]`

### 08 Source Combat TacMaps Encounters

Folder: `08 Source Combat TacMaps Encounters rev0.4`

- `[[SRC-COMBAT-000 - README_Source_Combat_TacMaps_Encounters]]`
- `[[SRC-COMBAT-001 - PACKAGE_MANIFEST_Source_Combat_TacMaps_Encounters]]`

### 09 Characters Crew Progression

Folder: `09 Characters Crew Progression rev0.4`

- `[[SRC-CHAR-000 - README_Source_Characters_Crew_Progression]]`
- `[[SRC-CHAR-001 - PACKAGE_MANIFEST_Source_Characters_Crew_Progression]]`

### 10 Skills Resolution RNG

Folder: `10 Skills Resolution RNG rev0.5`

- `[[SRC-SKILL-000 - README_Source_Skills_Resolution_RNG]]`
- `[[SRC-SKILL-001 - PACKAGE_MANIFEST_Source_Skills_Resolution_RNG]]`

### 11 Equipment Loadout Cyberware

Folder: `11 Equipment Loadout Cyberware rev0.5`

- `[[SRC-EQUIP-000 - README_Source_Equipment_Loadout_Cyberware]]`
- `[[SRC-EQUIP-001 - PACKAGE_MANIFEST_Source_Equipment_Loadout_Cyberware]]`

### 12 Source Lore Factions Timeline

Folder: `12 Source Lore Factions Timeline rev0.2`

- `[[SRC-LORE-000 - README_Source_Lore_Factions_Timeline]]`
- `[[SRC-LORE-001 - PACKAGE_MANIFEST_Source_Lore_Factions_Timeline]]`

### 13 Content Systems

Folder: `13 Content Systems rev0.5`

- `[[SRC-CONTENT-000 - README_Source_Content_Systems]]`
- `[[SRC-CONTENT-001 - PACKAGE_MANIFEST_Source_Content_Systems]]`

### 14 TT VG Automation

Folder: `14 TT VG Automation rev0.2`

- `[[SRC-AUTO-000 - README_Source_TT_VG_Automation]]`
- `[[SRC-AUTO-001 - PACKAGE_MANIFEST_Source_TT_VG_Automation]]`

### 15 Auxiliary Play Aids

Folder: `15 Auxiliary Play Aids rev0.2`

- `[[SRC-AUX-000 - README_Source_Auxiliary_Play_Aids]]`
- `[[SRC-AUX-001 - PACKAGE_MANIFEST_Source_Auxiliary_Play_Aids]]`

### 16 Current Dashboards State

Folder: `16 Current Dashboards State rev0.3`

- `[[DASH-000 - README_Current_Dashboards_and_State]]`
- `[[DASH-001 - PACKAGE_MANIFEST_Current_Dashboards_and_State]]`

### 17 Reference Reports and Research

Folder: `17 Reference Reports and Research rev0.2`

- `[[REF-000 - README_Reference_Reports_and_Research]]`
- `[[REF-001 - PACKAGE_MANIFEST_Reference_Reports_and_Research]]`

### 18 Data Tables and Workbooks

Folder: `18 Data Tables and Workbooks rev0.1`

- `[[DATA-000 - README_Data_Tables_and_Workbooks]]`
- `[[DATA-001 - PACKAGE_MANIFEST_Data_Tables_and_Workbooks]]`

### 19 Art Visual Direction

Folder: `19 Art Visual Direction rev0.3`

- `[[ART-000 - README_Art_Visual_Direction]]`
- `[[ART-001 - PACKAGE_MANIFEST_Art_Visual_Direction]]`

## Structural notes

- Art now uses one visible source root. `_OBSOLETE_EMPTY_WRAPPER_PKG19` is a leftover empty shell that could not be deleted in this environment.
- `DASH-007` remains the task-summary doc ID. The roadmap was separated as `DASH-010` to avoid duplicate-ID collisions.

## Currentness rule

Inside this workspace, the unzipped folders in `00 Source` are the live local source truth unless a document is clearly marked `reference` or `superseded`.

Upload-specific verification is separate downstream work and does not block local use of the source lane.

## Revision notes

### rev0.6 - 2026-05-26

- Renamed the live slot folders into the stable `NN Title revN.N` pattern.
- Recast the slot map to route by slot number and title first.
- Reduced the root operating layer to the four true root docs plus `AGENTS.md`.


