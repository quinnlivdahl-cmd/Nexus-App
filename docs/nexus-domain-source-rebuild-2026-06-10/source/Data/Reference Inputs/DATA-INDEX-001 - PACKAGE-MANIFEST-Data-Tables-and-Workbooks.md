---
project: "Nexus"
doc_id: "DATA-INDEX-001"
legacy_ids:
  - 'DATA-001'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\18 Data Tables and Workbooks rev0.1\DATA-001 - PACKAGE_MANIFEST_Data_Tables_and_Workbooks.md'
title: "Data Domain Manifest"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_manifest"
canon_status: "admin_reference"
placement_domain: "Data"
content_role: "reference_input"
topic_family: "data_domain_manifest"
owns_topics:
  - 'data_domain_manifest'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-07"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Data Domain Manifest

## Domain Contents

| Rebuilt doc ID | Legacy ID | Role | Current purpose |
|---|---|---|---|
| `DATA-INDEX-000` | `DATA-000` | Reference input | Domain readme and authority boundary. |
| `DATA-INDEX-001` | `DATA-001` | Reference input | Domain manifest and structured-output map. |
| `DATA-OWNERSHIP-001` | `DATA-002` | Applied rule | Data table ownership and format rules. |
| `DATA-DICTIONARY-001` | `DATA-003` | Canon support | Data dictionary master. |
| `DATA-FORMAT-001` | `DATA-004` | Applied rule | CSV/XLSX/JSON usage guide. |

## Seeded Structured Surfaces

Legacy seeded workbook concepts included:

- equipment inventory workbook;
- skills and progression workbook;
- enemy and NPC roster workbook;
- loot, rewards, and salvage workbook;
- encounter builder workbook;
- faction and location index CSV;
- tags and taxonomy index CSV.

These are future structured-output candidates, not final values.

## Ownership Map

Use this map when structuring data:

- `Characters`: character build meaning and recovery consequences.
- `Skills`: skill hierarchy, focus tiers, resolution meaning, and Lattice fields.
- `Equipment`: gear tags, cyberware, loadouts, defenses, and equipment-side fields.
- `Content`: enemy/NPC rosters, loot, rewards, missions, and encounter payloads.
- `Lore`: factions, locations, timeline, world facts, and setting tags.
- `Automation`: runtime schemas, renderer/export behavior, and companion-tool integration.
- `Data`: field definitions, table containers, dictionary entries, and structured formats.

## Current Build Notes

- No final game values were invented.
- Workbook and CSV concepts remain starter structures.
- JSON is supported as a future structured export/runtime format.
- Data should not become a shadow canon home.

## Validation Needs

Before any structured table becomes operational, verify:

- source domain owner;
- field definitions;
- source coverage;
- import/export behavior;
- Obsidian readability;
- local file placement;
- automation implications.

## Preservation Rule

No old workbook, table, JSON packet, CSV, data experiment, or structured export is deletion-approved by this manifest.


