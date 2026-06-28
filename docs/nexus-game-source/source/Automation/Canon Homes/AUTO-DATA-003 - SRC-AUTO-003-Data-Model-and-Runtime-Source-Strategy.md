---
project: "Nexus"
doc_id: "AUTO-DATA-003"
legacy_ids:
  - 'SRC-AUTO-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\14 TT VG Automation rev0.2\SRC-AUTO-003 - Data_Model_and_Runtime_Source_Strategy.md'
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
last_updated: "2026-06-14"
last_reviewed: "2026-06-14"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first source hierarchy, runtime-packet boundaries, and structured-data routing language. 2026-06-14 source reconciliation added context-broker, source-slice, and traceability expectations for app context packs."
---

# Data Model and Runtime Source Strategy

## 1. Purpose

This document defines how Nexus should think about source documents, runtime packets, structured data, and automation support.

<!-- source-slice: automation.runtime.source-hierarchy -->
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

<!-- source-slice: automation.runtime.creative-source-versus-runtime-instance -->
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

<!-- source-slice: automation.context-broker.source-backed-packets -->
## 4.1 Context Broker and source-backed packets

An app-side Context Broker may select compact context packets for API DM calls. The Context Broker is not Rules Core, Game State Store, API DM, source canon, a reducer, or a mutation authority.

The Context Broker may select:

- visible state slices;
- permitted internal state slices;
- relevant rules snippets;
- relevant lore snippets;
- recent event summaries;
- actor, crew, route, map, or scene summaries;
- resolved facts after rules resolution;
- hidden-state handling instructions;
- narration boundaries;
- output contracts;
- token-budget limits;
- contradiction rules.

Context packets should be traceable enough for debugging. Where practical, include source document IDs, source slice IDs, selected state version, source/log summary refs, selected rules/lore refs, summary cache refs, visibility policy refs, and the request/transaction reference.

Source slices are retrievable context units, not new source authority. A source slice should point back to a Golden Truth source document and should carry enough metadata to answer why it was selected. Sectioning, indexing, and slice IDs should support source-backed app context without dumping full source docs or full state into every prompt.

The API DM may interpret and narrate from the packet, but final legality, cost, roll, result band, effect, state delta, concealed truth, and committed state remain with the rules/state authorities.

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

<!-- source-slice: automation.context-broker.visibility-layers -->
## 6. Player-visible and hidden layers

Automation must support the distinction between:

- player-visible data;
- DM-only data;
- hidden data that can later be revealed;
- false, uncertain, or sensor-mediated data.

This matters for TacMaps, route-node maps, faction information, hidden enemies, traps, Signal effects, and investigative scenes.

<!-- source-slice: automation.runtime.conflict-handling -->
## 7. Conflict handling

If runtime data and Markdown source conflict:

1. Preserve both.
2. Do not silently overwrite.
3. Route the conflict to Steward/Draft/DM review depending on context.
4. Treat active campaign state as current for the session unless the DM corrects it.
5. Treat source docs as the long-term correction target.
