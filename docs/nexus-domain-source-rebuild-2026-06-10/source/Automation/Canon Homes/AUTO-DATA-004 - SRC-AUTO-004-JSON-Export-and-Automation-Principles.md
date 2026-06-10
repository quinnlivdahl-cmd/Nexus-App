---
project: "Nexus"
doc_id: "AUTO-DATA-004"
legacy_ids:
  - 'SRC-AUTO-004'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\14 TT VG Automation rev0.2\SRC-AUTO-004 - JSON_Export_and_Automation_Principles.md'
title: "JSON_Export_and_Automation_Principles"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "canon_home"
topic_family: "json_export_automation_principles"
owns_topics:
  - 'json_export_automation_principles'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first JSON, export, and schema-routing language."
---

# JSON Export and Automation Principles

## 1. Purpose

This document preserves JSON/export principles for Nexus without making JSON the main creative source.

## 2. JSON is subordinate

JSON, CSV, XLSX, and other structured formats are useful when Nexus needs:

- runtime state;
- import/export;
- validation;
- app prototypes;
- renderer inputs;
- dashboard transforms;
- batch lookup tables;
- save packets.

Markdown remains the primary authority for lore, mechanics, rationale, and design intent unless the user explicitly promotes a structured format for a specific purpose.

## 3. TacMap JSON/export candidate

TacMap packets are a strong future JSON candidate, but they should not be finalized prematurely.

A future TacMap packet may include:

- map identity and title;
- scene type;
- node list;
- path list;
- node states;
- path states;
- marker list;
- actor/token positions;
- objectives;
- hazards;
- interactables;
- visible/hidden layer tags;
- asset/sprite references;
- delta updates.

This pass records the candidate. It does not create the schema.

## 4. Other export candidates

Future export candidates include:

- encounter-start packet;
- Route Node End Report packet;
- route-node map state;
- player-safe encounter summary;
- DM-only encounter state;
- asset manifest or sprite-sheet reference;
- campaign save packet;
- dashboard/task export if needed later.

## 5. Promotion gate

Do not generate or freeze JSON schemas for unstable mechanics.

Promote structured exports only when:

- source docs have enough stability;
- the data will support actual play or useful review;
- ownership is clear;
- the export can be validated against current source;
- a fallback Markdown/plain-text representation remains available.

## 6. Schema handling

When actual schemas are created, they should route to `Data` or another explicitly designated data/schema location, paired with Markdown documentation explaining:

- ownership;
- meaning;
- source relationship;
- update cadence;
- validation expectations;
- deprecation/replacement notes.


