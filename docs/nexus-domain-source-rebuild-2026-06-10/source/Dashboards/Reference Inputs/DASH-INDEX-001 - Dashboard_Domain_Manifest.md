---
project: "Nexus"
doc_id: "DASH-INDEX-001"
legacy_ids:
  - 'DASH-001'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\16 Current Dashboards State rev0.3\DASH-001 - PACKAGE_MANIFEST_Current_Dashboards_and_State.md'
title: "PACKAGE_MANIFEST_Current_Dashboards_and_State"
doc_status: "active"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "domain_manifest"
canon_status: "tracking"
placement_domain: "Dashboards"
content_role: "reference_input"
topic_family: "dashboard_domain_manifest"
owns_topics:
  - 'dashboard_domain_manifest'
borrows_topics:
  - 'mode_dashboard_state'
created: "2026-05-14"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Dashboards consolidation. Dashboard manifest now uses domain-first routing and keeps legacy lineage as traceability only."
---

# Dashboard Domain Manifest

## Domain identity

- Domain: `Dashboards`
- Rebuild status: `pilot cluster deep-consolidation pass`
- Legacy family: `DASH`
- Current function: live-state inventory, dashboard boundary map, and migration notes

## Domain contents

| Doc ID | Role | Current purpose |
|---|---|---|
| DASH-INDEX-000 | reference_input | Domain readme and ownership summary |
| DASH-INDEX-001 | reference_input | Domain manifest and conflict ledger |
| DASH-STEWARD-001 | current_state | Steward-facing live project dashboard |
| DASH-DRAFT-001 | current_state | Draft workbench live dashboard |
| DASH-SEED-001 | current_state | Seed branching and harvest dashboard |
| DASH-DM-001 | current_state | DM live campaign dashboard |
| DASH-ART-001 | current_state | Art and visual asset dashboard |
| DASH-TASK-001 | current_state | Active project task routing surface |
| DASH-CAMPAIGN-001 | current_state | Active campaign resume summary |
| DASH-PLAYTEST-001 | current_state | Active playtest and rulings summary |
| DASH-ROADMAP-001 | current_state | Active project roadmap |
| DASH-REF-001 | reference_input | Dashboard rebuild change summary |

## Current-state boundary map

- `DASH-DM-001` owns live execution reminders and compact current instruction deltas for active DM work.
- `DASH-CAMPAIGN-001` owns resume-ready campaign facts, not source-rule ownership.
- `DASH-PLAYTEST-001` owns provisional live rulings capture and routing, not final rule adoption.
- `DASH-TASK-001` owns active task routing, not domain-specific canon decisions.
- `DASH-SEED-001` owns unfinished branching work visibility, not polished source wording.

## Cross-domain boundaries

Dashboards do not own:

- template authority; that belongs in `Modes`;
- dashboard update procedure and governance; that belongs in `Admin`;
- final mechanics, lore, or canon wording; those belong in the relevant source domains;
- bridge/bundle policy itself; that belongs in the ChatGPT bridge and source-governance docs.

## Consolidation findings

- The dashboard pilot already understood that dashboards are volatile, but some docs still explained themselves through old source-structure history.
- Dashboard docs are most useful when they stay short, lane-based, and routing-oriented.
- The biggest cleanup need was route normalization: many current-state files pointed to former slot numbers instead of the new domains.
- Companion summaries such as campaign state and playtest notes remain worth keeping separate because they reduce density in the primary live dashboards.

## Current conflict ledger

### C1 - Dashboard usefulness vs canon sprawl

Handling: dashboards stay thin and point outward when content stabilizes enough to deserve a canon home.

### C2 - Live state vs template authority

Handling: `Dashboards` owns live instances. `Modes` owns reusable template and mode-instruction structures.

### C3 - Live routing vs durable source governance

Handling: `Dashboards` can carry current instruction deltas, but lasting governance belongs in `Admin`, canon-home domains, and the ChatGPT bridge.

### C4 - Playtest issue capture vs final rulings

Handling: `DASH-PLAYTEST-001` captures issues and routes them. Final rule adoption belongs in `Draft`, `Steward`, and the affected canon-home domain.

## Future data and bridge notes

Likely future support artifacts:

- concise per-mode refresh packets for external chat use;
- dashboard-to-domain routing cheat sheet;
- compact resume schema for live campaign state;
- task routing conventions aligned with the new domain-first structure.

These should remain support surfaces and not become substitute canon.



