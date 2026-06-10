---
project: "Nexus"
doc_id: "CORE-OPEN-008"
legacy_ids:
  - 'SRC-CORE-008'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\07 Core Game Campaign rev0.3\SRC-CORE-008 - Core_Open_Questions.md'
title: "Core_Open_Questions"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "open_questions"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "open_questions"
topic_family: "core_open_questions"
owns_topics:
  - 'core_open_questions'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Core Open Questions

## 1. Purpose

This document tracks unresolved or routed questions discovered during Core consolidation.

A question listed here is not automatically a rule. It is a preserved decision point, routing note, or future work item.

## 2. Core Questions

### SRC-CORE-OQ-001 - Exact Travel Resource Model

Travel requires resources, but exact resources and costs are deferred.

Routing: `Core`, `Equipment`, and `Content`.

### SRC-CORE-OQ-002 - Ship Systems and Node Access

Ship upgrades may unlock nodes, reveal risks, or improve outcomes. The exact ship system list and upgrade mechanics are not finalized.

Routing: `Core`, `Equipment`, `Data`, and `Content`.

### SRC-CORE-OQ-003 - Node Taxonomy and Node Type Ratios

Do not define a fixed node type breakdown yet. Future route generation may need taxonomy or sliders, but current source avoids hard percentages.

Routing: `Content`, `Data`, and `Play Aids`.

### SRC-CORE-OQ-004 - Recovery / Revival / Consequence Tradeoffs

Memory Overflow identifies revival/recovery tradeoffs as a review item for campaign/ship source. The current Core domain preserves the need but does not finalize mechanics.

Routing: `Characters` and `Core`.

### SRC-CORE-OQ-005 - Pre-Node Advancement and Loadout Procedure Details

The timing is clarified: advancement/loadout happens before the active node starts. Exact advancement choices, loadout slots, and equipment rules remain unresolved.

Routing: characters, equipment, skills, dashboards.

### SRC-CORE-OQ-006 - Planning / Prep Mechanical Weight

Planning and prep should have serious value. How much mechanical advantage prep provides remains to be tuned.

Routing: core campaign, skills, equipment, combat, DM procedure.

### SRC-CORE-OQ-007 - Campaign Clocks / Counters

Memory Overflow references Pursuit, Countdown, Suspicion, hazard dissipation, and escape framing. These may be useful campaign/DM tools but are not locked as core mechanics here.

Routing: `Modes`, `Combat`, `Content`, and `Dashboards`.

### SRC-CORE-OQ-008 - Requirement Escape as Default Escape Design

Memory Overflow references "Requirement Escape" as an escape design default. This document preserves the cue but does not define it.

Routing: `Modes`, `Combat`, and `Content`.

### SRC-CORE-OQ-009 - Auxiliary Play Aids

System map, route-node companion, Canva/PDF aids, and external displays remain valuable but are not core source mechanics.

Routing: `Play Aids`, `Art`, `Dashboards`, and `Data`.

### SRC-CORE-OQ-010 - Rook Campaign Procedure Corrections

Rook corrections should be reviewed for inclusion in DM rules, dashboard templates, and encounter pacing docs:

- avoid too many gated checks;
- keep routine ship-time handling quick;
- declare objective/counter/encounter structure for set pieces;
- avoid overwhelming options;
- show character tracker/skill sheets;
- support evidence board and clue chain.

Routing: `Modes`, `Dashboards`, `Combat`, and `Content`.

### SRC-CORE-OQ-011 - TT v0.1 Acceptance Criteria Review

The old MVP acceptance criteria remain useful but may need conversion into a current source readiness checklist or playtest plan.

Routing: `Core`, `Admin`, `Dashboards`, and playtest logs.

### SRC-CORE-OQ-012 - First Campaign Seed Status

The whistleblower / implant-network / Jupiter-moon pressure-cooker story remains a strong candidate but is not campaign canon yet.

Routing: Seed workflow, `Lore`, and `Dashboards` only if explicitly promoted.


### SRC-CORE-OQ-013 - Route Node End Report Format

What is the final Route Node End Report format for mobile/chat play?

Routing: `Modes` templates and `Dashboards`.

### SRC-CORE-OQ-014 - Persistent Aftermath Categories

Which aftermath categories become core campaign state categories, and which remain dashboard/display conveniences?

Routing: `Dashboards` and `Modes` templates.

### SRC-CORE-OQ-015 - Escape Frequency and Scope

How often should formal escape structures appear, and what keeps Requirement Escape from becoming overhead?

Routing: `Modes`, `Combat`, and `Content`.

### SRC-CORE-OQ-016 - Encounter-Start Minimum Packet

What is the minimum encounter-start packet for mobile/chat play?

Routing: `Modes` templates, `Combat`, and `Dashboards`.

### SRC-CORE-OQ-017 - Planning Reward Weight

How much planning reward should be core rule versus DM judgment?

Routing: `Core`, `Skills`, and `Modes`.

### SRC-CORE-OQ-018 - Modes Shadow Queue and Tracker Consolidation

The legacy Core review created a Modes shadow queue that must be captured during the tracker/template pass:

- DM encounter-start packet template;
- Route Node End Report template;
- Encounter Result Card template;
- Escape requirement display;
- check display / roll block examples;
- noncombat scene procedure template.

When tracker updates begin, review whether template work, dashboard repair, mode-display fixes, Draft Queue items, and integration tasks can be consolidated into fewer task surfaces. Do not create a new tracker unless an existing tracker cannot hold the item cleanly.

Routing: `Modes` templates/registers, `Dashboards`, and tracker consolidation review.

## 3. Cross-Domain Routing Ledger

| item | current handling |
|---|---|
| TacMap movement, cover, node capacity, verticality, encounter length | Route to `Combat`. |
| Action economy, reactions, stances, enemy behavior | Route to `Combat`. |
| Character build stack, aptitudes, traits, IV/EV-style values | Route to `Characters`. |
| Skill list, resolution, difficulty, modifiers | Route to `Skills`. |
| Loadout slots, tool slot, credentials, shared armory, cyberware | Route to `Equipment`. |
| Signal/Choir, C-POH, polities, station life, naming | Route to `Lore`. |
| Mission/job framework, rewards, salvage, route-node content | Route to `Content`. |
| Route Node End Report, Encounter Result Card, escape requirement display, check display templates | Route to `Modes` and `Dashboards`. |
| Persistent aftermath, active campaign counters, crew state, open leads | Route to `Dashboards`; source-level categories remain cross-domain. |
| Campaign save schemas, route-node JSON, automation | Route to `Data` and `Automation`. |
| System map, route-node companion, Canva/PDF aids | Route to `Play Aids` and `Art`. |

## 4. Deletion / Cleanup Rule

Do not use this open-question doc to delete old material. If an old source contains one of these questions, it should remain preserved until the replacement source coverage and routed target doc are verified.

## Source Handling Note

This document is a Core-domain consolidation document in the rebuild repo. It is not a verbatim copy of a single older file. It preserves and reorganizes usable content from the current vault snapshot, Nexus Future patterns, older phone/global backups, the Memory Overflow register, and Rook campaign handoff/dashboard evidence. Older material is treated as evidence. Live `00 Source` remains unchanged until the rebuilt source is accepted and migrated.


