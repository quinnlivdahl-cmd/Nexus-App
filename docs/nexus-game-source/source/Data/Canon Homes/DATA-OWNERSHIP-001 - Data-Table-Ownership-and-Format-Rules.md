---
project: "Nexus"
doc_id: "DATA-OWNERSHIP-001"
legacy_ids:
  - 'DATA-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\18 Data Tables and Workbooks rev0.1\DATA-002 - Data_Table_Ownership_and_Format_Rules.md'
title: "Data Table Ownership and Format Rules"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "admin_reference"
placement_domain: "Data"
content_role: "canon_home"
topic_family: "data_table_ownership_and_format_rules"
owns_topics:
  - 'data_table_ownership_and_format_rules'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from DATA-DATA-002 to DATA-OWNERSHIP-001. Phase 10 reviewed the body for domain-first ownership, table-creation, and import/export routing language."
---

# Data Table Ownership and Format Rules

## 1. Ownership Rule

Markdown source docs own rules and meaning. Data files organize repeatable structured records.

Use this split:

- Markdown: design intent, rule text, lore meaning, mechanical rationale, and domain authority.
- CSV: flat lookup lists, IDs, tags, indexes, simple import/export rows.
- XLSX: multi-sheet editable workbooks, rosters, inventories, skill trees, encounter builders, balancing work.
- JSON: structured export/runtime packets, save states, validation, app/companion state transfer.

## 2. Table Creation Rule

Every new data table should have:

- stable ID field;
- human-readable name;
- source domain reference;
- status;
- owner domain;
- notes;
- last reviewed date;
- verification notes.

## 3. Do Not Invent Values

Do not fill costs, damage, rarity, enemy stats, loot values, or progression math unless they are source-backed or explicitly approved for a balancing pass.

## 4. Import / Export Rule

If a table is intended for automation, app use, or JSON export, define the source Markdown domain and source doc that control the meaning of each field.

## 5. Current Data Domain Status

This domain is seeded. It provides containers and field-starting points, not complete data.



