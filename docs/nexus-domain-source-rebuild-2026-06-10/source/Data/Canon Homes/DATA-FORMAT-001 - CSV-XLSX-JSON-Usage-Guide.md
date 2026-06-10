---
project: "Nexus"
doc_id: "DATA-FORMAT-001"
legacy_ids:
  - 'DATA-004'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\18 Data Tables and Workbooks rev0.1\DATA-004 - CSV_XLSX_JSON_Usage_Guide.md'
title: "CSV XLSX JSON Usage Guide"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "admin_reference"
placement_domain: "Data"
content_role: "canon_home"
topic_family: "csv_xlsx_json_usage_guide"
owns_topics:
  - 'csv_xlsx_json_usage_guide'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from DATA-DATA-004 to DATA-FORMAT-001. Phase 10 reviewed the body for domain-first authority and structured-format routing language."
---

# CSV, XLSX, and JSON Usage Guide

## 1. Markdown First

Creative and mechanical source truth belongs in Markdown.

Structured data should reference Markdown, not replace it.

## 2. CSV Use

Use CSV for:

- flat lookup lists;
- tags and taxonomy indexes;
- faction/location indexes;
- simple import/export rows;
- one-record-per-row datasets.

Do not use CSV for multi-tab balance work or nested runtime state unless there is a clear export need.

## 3. XLSX Use

Use XLSX for:

- equipment inventories;
- skill tree planning;
- enemy and NPC rosters;
- loot/salvage tables;
- encounter builders;
- balance work that benefits from multiple sheets, formulas, filters, and notes.

## 4. JSON Use

Use JSON for:

- structured export packets;
- runtime/app state;
- TacMap state packets;
- campaign save snapshots;
- validation-friendly automation;
- companion-tool import/export.

JSON is useful long-term, but it is not the creative source. Markdown remains the authority.

## 5. Current Package Decision

No standalone JSON files are included yet. `Automation` owns runtime/export principles, while `Data` can later hold actual JSON schema or data files once the structures stabilize.



