---
project: "Nexus"
doc_id: "MODES-TEMPLATE-007"
legacy_ids:
  - 'TPL-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\TPL-007 - Data_Dictionary_Template.md'
title: "Data_Dictionary_Template"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "template"
canon_status: "instruction"
authority: "non_authoritative"
applicability:
  - 'content_authoring_workflow'
  - 'historical_provenance'
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "data_dictionary_template"
owns_topics:
  - 'data_dictionary_template'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Data-dictionary guidance now uses domain-first metadata and source-bundle language; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Data Dictionary Template

Use this template for CSV/XLSX/JSON-adjacent data dictionaries.

Important data files should be paired with a README, data dictionary, or Markdown summary explaining ownership and meaning.

```md
---
project: "Nexus"
title: "Data Dictionary - Dataset Name"
doc_id: "DATA-DICT-000"
doc_status: "working_draft"
working_state: "data_dictionary_ready_for_review"
mode_owner: "Steward"
source_role: "template"
canon_status: "data_reference"
placement_domain: "Data"
content_role: "reference_input"
topic_family: "data_dictionary"
owns_topics:
  - "data_dictionary"
borrows_topics: []
rev: "0.1"
created: 2026-05-13
last_updated: 2026-05-13
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_verified_date: 2026-05-13
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary, with historical lineage preserved in legacy fields and reference-input bodies retained where they serve evidence or template continuity."
obsidian_path: "18_Data/Data_Dictionary_Dataset_Name.md"
project_source_access: "bridge_or_export_after_approval"
source_chat: "Mode - Focus - YYYY-MM-DD"
source_inputs: []
supersedes: []
superseded_by: []
supplements: []
related_docs: []
delete_after_verification:
  - "Do not delete source data files until dictionary coverage and export/import coverage are verified."
tags:
  - "nexus"
  - "data-dictionary"
---

# Data Dictionary - Dataset Name

## 1. Dataset Purpose

## 2. File Ownership

- Owner mode:
- Domain:
- Related source docs:

## 3. File Format

- CSV: simple flat data tables.
- XLSX: multi-sheet editable workbooks.
- JSON: later automation/runtime data, not primary creative source unless specifically requested.

## 4. Columns / Fields

| Field | Type | Required | Meaning | Allowed Values | Notes |
|---|---|---:|---|---|---|
| `id` | text | yes | Unique row identifier. | domain-specific |  |

## 5. Validation Rules

## 6. Relationship to Markdown Source

## 7. Changelog
```


## Source Handling Note

This document is a rebuild consolidation target. It is not a verbatim copy of one older backup file. It preserves and reorganizes usable mode/register/template instructions from the live source layer, later Nexus patterns, and backup evidence. Older wording that conflicts with the current domain-first operating model is treated as legacy evidence, not source truth.


