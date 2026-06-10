---
project: "Nexus"
doc_id: "AUTO-DATA-003"
legacy_ids:
  - 'SRC-AUTO-003'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\14 TT VG Automation rev0.2\SRC-AUTO-003 - Data_Model_and_Runtime_Source_Strategy.md'
title: "Data_Model_and_Runtime_Source_Strategy"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "canon_home"
topic_family: "data_model_runtime_source_strategy"
owns_topics:
  - 'data_model_runtime_source_strategy'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first source hierarchy, runtime-packet boundaries, and structured-data routing language."
---

# Data Model and Runtime Source Strategy

## 1. Purpose

This document defines how Nexus should think about source documents, runtime packets, structured data, and automation support.

## 2. Source hierarchy

Current source hierarchy:

1. Active source docs and accepted domain control docs.
2. Current dashboards/state for live campaign or current workflow state.
3. Handoffs, passoffs, memory evidence, and old docs as evidence inputs.
4. Runtime packets, JSON, CSV, app data, and exports as mirrors/support tools.

Runtime data helps execution. It does not become creative authority by accident.

## 3. Structured TacMap truth

A generated image alone is not enough for automation or reliable play.

A playable TacMap instance should eventually have structured truth for:

- nodes;
- paths;
- path costs and restrictions;
- node states;
- path states;
- cover/visibility/line markers;
- actor/token positions;
- objectives;
- hazards;
- interactables;
- hidden versus player-visible information;
- asset references or rendered visual layers.

The image, collage, or visual backdrop is a display layer. The structured node/path/objective/actor/state data is the runtime truth for that instance.

## 4. Creative source versus runtime instance

Markdown/source docs answer:

- what the rules mean;
- what the setting means;
- how a system should be used;
- what unresolved questions remain.

Runtime packets answer:

- where the actors are now;
- which node/path states currently apply;
- which objective is active;
- which data has been revealed to the player;
- what changed since the last state.

A runtime packet can be authoritative for a single active encounter state without becoming canon source doctrine.

## 5. Candidate data surfaces

Nexus automation may eventually need data surfaces for:

- campaign state;
- crew and roster state;
- loadouts and inventory;
- route-node map state;
- mission-node state;
- TacMap state;
- NPC/enemy state;
- clocks and counters;
- player-safe summaries;
- handoff/passoff records;
- source-domain status.

`Automation` records the runtime and export strategy. `Data` may hold actual data tables, schemas, or workbooks once promoted.

## 6. Player-visible and hidden layers

Automation must support the distinction between:

- player-visible data;
- DM-only data;
- hidden data that can later be revealed;
- false, uncertain, or sensor-mediated data.

This matters for TacMaps, route-node maps, faction information, hidden enemies, traps, Signal effects, and investigative scenes.

## 7. Conflict handling

If runtime data and Markdown source conflict:

1. Preserve both.
2. Do not silently overwrite.
3. Route the conflict to Steward/Draft/DM review depending on context.
4. Treat active campaign state as current for the session unless the DM corrects it.
5. Treat source docs as the long-term correction target.


