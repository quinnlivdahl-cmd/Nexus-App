---
project: "Nexus"
doc_id: "MODES-INDEX-000"
legacy_ids:
  - 'MODE-000'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\MODE-000 - README_Mode_Operations_Registers_Templates.md'
title: "README_Mode_Operations_Registers_Templates"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "admin_reference"
authority: "non_authoritative"
applicability:
  - 'project_operations'
  - 'historical_provenance'
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "modes_domain_readme"
owns_topics:
  - 'modes_domain_readme'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Body routing now uses domain-first language; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Modes Domain Readme

## Purpose

The `Modes` domain owns reusable Nexus operating behavior: Draft, Seed, DM, and Art mode rules; command references; launch/menu surfaces; registers; property schema; and reusable templates for dashboards, handoffs, source docs, and data dictionaries.

This file is the domain-facing replacement for the old mode/register/template readme. It separates durable mode behavior from live dashboard state and from Admin governance.

## Domain structure

Current domain folders:

- `Canon Homes` for mode rules, command references, launch/menu behavior, and function bindings.
- `Reference Inputs` for templates, registers, manifests, and property/schema references.
- `Open Questions` for mode/register/template issues still awaiting resolution.

Current high-level surfaces:

- `MODES-MODE-*` docs for mode rules, menu, launch cards, command key, and function bindings.
- `MODES-TEMPLATE-*` docs for reusable templates.
- `MODES-REGISTER-*` docs for output/source/open-question registers.
- `MODES-INDEX-*` docs for domain readme and manifest.

## Ownership boundaries

Modes owns:

- reusable behavior for Draft, Seed, DM, and Art;
- mode launch/menu and command-key behavior;
- dashboard, handoff, source-doc, source-bundle, and data-dictionary templates;
- project registers as reusable tracking forms;
- mode function-binding labels used by dashboard surfaces.

Modes does not own:

- current live dashboard state;
- Admin source-governance procedure;
- canon mechanics, lore, content, or art direction;
- final data tables.

Instead, Modes borrows from:

- `Dashboards` for current live instances;
- `Admin` for governance and placement procedure;
- domain canon homes when a mode needs to summarize current rules for execution.

## Operating rules

- Mode docs should be reusable instructions, not live-state dumps.
- Dashboard templates should stay Obsidian-friendly and narrow-view safe.
- DM display formats should preserve narrative, mechanics, options, and state separation.
- Seed routes mature wording-heavy work to Draft.
- Templates and registers support work; they do not replace domain canon homes.

## Migration status

This domain has completed structural import into the rebuild repo. Phase 10 has now cleaned the main mode bodies, while some historical registers and template examples still preserve older wording as transition evidence.

Established already:

- all live mode/register/template source files are represented in the rebuild;
- mode behavior is separate from live dashboard state;
- dashboard template authority is distinct from dashboard bodies.

Still to do:

- validate the Phase 10 mode-body cleanup before any permanent-source migration;
- normalize register roles under the new dashboard/task/bridge model;
- decide whether templates stay under `Modes` or some move into `Admin`, `Data`, or `Dashboards` after consolidation;
- normalize final Mode IDs after body consolidation.


