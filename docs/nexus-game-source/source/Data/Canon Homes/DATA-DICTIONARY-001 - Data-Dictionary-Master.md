---
project: "Nexus"
doc_id: "DATA-DICTIONARY-001"
legacy_ids:
  - 'DATA-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\18 Data Tables and Workbooks rev0.1\DATA-003 - Data_Dictionary_Master.md'
title: "Data Dictionary Master"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "admin_reference"
placement_domain: "Data"
content_role: "canon_home"
topic_family: "data_dictionary_master"
owns_topics:
  - 'data_dictionary_master'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from DATA-DATA-003 to DATA-DICTIONARY-001. Phase 10 reviewed the body for domain-first ownership and structured-data routing language."
---

# Data Dictionary Master

## 1. Purpose

This is the starting dictionary for recurring structured-data fields in Nexus.

It should be expanded when real tables/workbooks become active.

## 2. Shared Fields

| Field | Type | Meaning | Owner |
|---|---|---|---|
| `id` | text | Stable row identifier | `Data` |
| `name` | text | Human-readable record name | Relevant source domain |
| `category` | text | Primary grouping | Relevant source domain |
| `status` | text | Draft, seeded, active, retired, needs review | Steward / relevant source domain |
| `source_domain` | text | Domain that owns the meaning of the record | `Data` reference to owning domain |
| `source_doc_id` | text | Specific Markdown source doc ID where meaning is defined | Owning source domain |
| `canon_status` | text | Canon/work-in-progress status for creative content | Owning source domain |
| `notes` | text | Human notes | `Data` / relevant source domain |
| `last_reviewed` | date | Last review date | Steward |
| `verification_notes` | text | Metadata or data validation notes | Steward |

## 3. Package-Specific Field Seeds

### Equipment

Fields likely include `equipment_type`, `slot`, `tags`, `rarity`, `allowed_users`, `source_rule`, `balance_notes`, and `open_questions`.

### Skills

Fields likely include `ability_tree`, `skill`, `skill_focus`, `leaf_type`, `leaf_name`, `tier`, `prerequisite`, `advancement_effect`, and `open_questions`.

### Enemies

Fields likely include `role`, `tier`, `threat_profile`, `defense_profile`, `behavior_tags`, `source_encounter`, and `playtest_notes`.

### Loot

Fields likely include `reward_type`, `source_node`, `rarity`, `faction_context`, `salvage_use`, and `balance_notes`.

### TacMap / Encounter Builder

Fields likely include `node_id`, `node_name`, `links`, `cover`, `hazards`, `actors`, `objectives`, `counters`, and `visibility`.

## 4. Open Dictionary Questions

- Exact status vocabulary still needs consolidation.
- Exact rarity vocabulary is not final.
- Numeric balance fields should wait for source-backed tuning.
- JSON field names should be stabilized after packet schemas mature.



