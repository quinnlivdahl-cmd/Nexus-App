---
project: "Nexus"
doc_id: "DASH-INDEX-000"
legacy_ids:
  - 'DASH-000'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\16 Current Dashboards State rev0.3\DASH-000 - README_Current_Dashboards_and_State.md'
title: "README_Current_Dashboards_and_State"
doc_status: "active"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "tracking"
placement_domain: "Dashboards"
content_role: "reference_input"
topic_family: "dashboard_domain_index"
owns_topics:
  - 'dashboard_domain_index'
borrows_topics:
  - 'mode_dashboard_state'
created: "2026-05-14"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Dashboards consolidation. Dashboard entry surfaces now use domain-first routing and current-state boundaries; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Dashboard Domain Readme

## Purpose

The `Dashboards` domain owns the volatile live-state layer for Nexus: mode dashboards, active task routing, campaign resume state, playtest summary surfaces, and current instruction deltas that keep live work aligned when durable source docs lag behind.

This file is the Dashboard domain entry surface. It explains what dashboards are for, what they must never pretend to own, and how they should remain usable in Obsidian and on mobile.

## Navigation

- Manifest: `DASH-INDEX-001`
- Task surface: `DASH-TASK-001`
- Roadmap: `DASH-ROADMAP-001`

## Domain structure

Current domain folders:

- `Current State` for live mode dashboards, campaign state, task surfaces, and playtest summaries.
- `Reference Inputs` for domain governance, migration notes, and rebuild summaries.

Current `Current State` set:

- `DASH-STEWARD-001` - live project dashboard for stewardship and routing.
- `DASH-DRAFT-001` - draft workbench dashboard.
- `DASH-SEED-001` - seed live dashboard for unfinished branching work.
- `DASH-DM-001` - DM live campaign dashboard.
- `DASH-ART-001` - art and visual asset dashboard.
- `DASH-TASK-001` - active project task routing surface.
- `DASH-CAMPAIGN-001` - current campaign resume summary.
- `DASH-PLAYTEST-001` - active playtest and rulings summary.
- `DASH-ROADMAP-001` - forward-looking roadmap.

## Ownership boundaries

Dashboards own:

- current state snapshots;
- resume-ready campaign and mode context;
- task routing, priority surfaces, and active blockers;
- current instruction deltas that patch stale chat context;
- playtest issue capture before it becomes source work;
- concise lane-based presentation for live use.

Dashboards do not own:

- durable mechanics, lore, or canon definitions;
- templates and dashboard-update procedure;
- long-term archive/history storage;
- final source wording once a topic has stabilized enough for a source home outside Dashboards.

Instead, dashboards borrow from:

- `Modes` for dashboard template and mode-execution rules;
- `Admin` for dashboard update procedure and source-management governance;
- canon-home domains such as `Combat`, `Characters`, `Equipment`, `Core`, and `Lore` for durable truth;
- `ChatGPT Project Bridge` support files for what external chat context is expected to know.

## Operating rules

- Dashboard text is tracking and current-state guidance, not final mechanics.
- Handoffs are evidence, not automatic source truth.
- Do not treat old dashboard snapshots as current merely because they exist.
- Maintain one current copy of each live dashboard surface; older copies belong in history/archive lanes.
- Keep dashboards readable in Obsidian view mode and on narrow/mobile layouts.
- Avoid HTML `<details>` as the default control surface when native headings or callouts are enough.

## Current structure decisions

- Task routing remains consolidated in `DASH-TASK-001`.
- Roadmap remains separate in `DASH-ROADMAP-001` to avoid task/roadmap collision.
- Campaign facts remain summarized in `DASH-CAMPAIGN-001`.
- Playtest findings and unresolved live rulings remain summarized in `DASH-PLAYTEST-001`.
- Mode dashboards remain thin live surfaces and should route durable rule changes outward instead of absorbing them.

## Migration status

This domain is in the first deep-consolidation pass after pilot migration.

Established already:

- dashboards are a separate top-level domain rather than hidden inside mode docs;
- current-state docs have been preserved as distinct live surfaces;
- dashboard/template/procedure separation is now explicit in source.

Still to do:

- verify the Phase 10 dashboard body cleanup before any permanent-source migration;
- keep task and playtest routes pointed at domains rather than former slots;
- decide the permanent vault-vs-external boundary for bridge-adjacent live context files;
- normalize inherited metadata after content structure settles.

## Preservation note

This rebuild repo is the working replacement surface. The legacy `00 Source` tree remains protected until the rebuilt structure is reviewed and accepted.




