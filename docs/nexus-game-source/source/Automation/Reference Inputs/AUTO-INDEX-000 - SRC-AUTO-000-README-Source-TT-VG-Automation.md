---
project: "Nexus"
doc_id: "AUTO-INDEX-000"
legacy_ids:
  - 'SRC-AUTO-000'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\14 TT VG Automation rev0.2\SRC-AUTO-000 - README_Source_TT_VG_Automation.md'
title: "Automation Domain Readme"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "reference_input"
topic_family: "automation_domain_readme"
owns_topics:
  - 'automation_domain_readme'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-07"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Automation Domain Readme

## Purpose

The `Automation` domain owns tabletop/video-game boundaries, runtime data strategy, JSON/export principles, companion-tool backlog, renderer implications, and TacMap companion data-model concepts.

Automation answers: **what should be structured, exported, rendered, automated, or reserved for future tools without replacing tabletop-first play?**

## Authority Boundary

Automation owns runtime and tooling implications.

Automation does not own:

- core game loop, mission-node structure, or route-node reports;
- combat rules, TacMap movement, cover, hazards, action economy, or encounter rules;
- player/DM-facing display aids;
- live dashboards, current tasks, or campaign state;
- visual style, SVG asset style, prompt patterns, or concept-art indexing;
- actual CSV/XLSX workbooks or final data tables;
- automated rule adjudication that replaces DM judgment.

## Current Structure

Current Automation surfaces include:

- `AUTO-INDEX-000`: domain readme.
- `AUTO-INDEX-001`: domain manifest.
- `AUTO-MODE-002`: tabletop mode vs video-game mode design boundaries.
- `AUTO-DATA-003`: data model and runtime source strategy.
- `AUTO-DATA-004`: JSON export and automation principles.
- `AUTO-NOTES-005`: companion tool and app feature backlog.
- `AUTO-DATA-006`: TacMap companion local data model.
- `AUTO-OPEN-007`: automation open questions.

## Cross-Domain Routing

- `Core`: core play flow, mission-node structure, route-node reports, and encounter-start requirements.
- `Combat`: TacMap rules, cover, movement, hazards, statuses, and encounter pacing.
- `Play Aids`: fallback player/DM display principles and user-facing aid specs.
- `Dashboards`: live state, task trackers, and current work status.
- `Data`: actual CSV/XLSX/JSON data containers, field dictionaries, and structured tables.
- `Art`: visual direction, SVG style, prompt patterns, and concept-art indexing.

Automation can define how these surfaces might be represented or exported, but it should not become their canon home.

## Current Maturity

Automation is a working draft.

It records automation and rendering implications from TacMap/source work without starting an app build, finalizing a schema, or reorganizing TacMap authority.

## Preservation Rule

No older automation material, runtime manifest, schema draft, app note, TT/VG document, or TacMap workflow handoff is deletion-approved by this readme.

Cleanup requires coverage verification and explicit user approval.


