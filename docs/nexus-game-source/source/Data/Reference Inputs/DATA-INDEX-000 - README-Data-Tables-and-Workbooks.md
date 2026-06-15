---
project: "Nexus"
doc_id: "DATA-INDEX-000"
legacy_ids:
  - 'DATA-000'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\18 Data Tables and Workbooks rev0.1\DATA-000 - README_Data_Tables_and_Workbooks.md'
title: "Data Domain Readme"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "admin_reference"
placement_domain: "Data"
content_role: "reference_input"
topic_family: "data_domain_readme"
owns_topics:
  - 'data_domain_readme'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-07"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Data Domain Readme

## Purpose

The `Data` domain owns structured support surfaces: data dictionaries, workbook conventions, CSV/XLSX/JSON usage guidance, seeded tables, and future import/export containers.

Data answers: **how should source concepts become structured, queryable, or exportable without replacing the source docs that define meaning?**

## Authority Boundary

Markdown source domains own rules, lore, mechanics, design intent, and current canon.

Data owns structure, field definitions, table conventions, workbook containers, and machine-readable support formats.

If a spreadsheet, CSV, JSON packet, or workbook conflicts with a source doc, use the source doc and route the conflict to review.

## Current Structure

Current Data surfaces include:

- `DATA-INDEX-000`: domain readme.
- `DATA-INDEX-001`: domain manifest.
- `DATA-OWNERSHIP-001`: data table ownership and format rules.
- `DATA-DICTIONARY-001`: data dictionary master.
- `DATA-FORMAT-001`: CSV/XLSX/JSON usage guide.

Legacy seeded workbook and CSV paths remain useful evidence for future structured outputs, but the rebuild source currently tracks Markdown surfaces only.

## Data Routes

Route structured needs here when the main question is:

- a field schema;
- a data dictionary entry;
- a workbook/table shape;
- CSV/XLSX usage;
- JSON export/import support;
- structured roster, inventory, loot, tag, faction, location, or encounter data;
- a machine-readable view of source content.

Do not route the concept itself here if another domain owns its meaning.

## Cross-Domain Boundaries

- `Characters` owns character build meaning and recovery consequences.
- `Skills` owns skill hierarchy and resolution meaning.
- `Equipment` owns equipment, loadout, cyberware, defense, and gear rules.
- `Content` owns content-system meaning such as enemies, rewards, missions, and encounters.
- `Automation` owns runtime automation and renderer/export behavior.
- `Data` owns the structured containers and data conventions that represent those concepts.

## Current Maturity

The Data domain is seeded/planned.

It should be treated as a ready container for later structured data work, not as a mature source of final balanced values, costs, damage values, enemy stats, loot economics, or complete taxonomies.

## Preservation Rule

No previous workbook, table, JSON packet, CSV, data experiment, or structured export is deletion-approved by this readme.

Cleanup requires field coverage, source coverage, import/export behavior, local file placement, and explicit user approval.


