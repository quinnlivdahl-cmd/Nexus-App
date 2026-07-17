---
project: "Nexus"
doc_id: "MODES-TEMPLATE-005"
legacy_ids:
  - 'TPL-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\TPL-005 - Dashboard_Template.md'
title: "Dashboard_Template"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "template"
canon_status: "instruction"
authority: "non_authoritative"
applicability:
  - 'content_authoring_workflow'
  - 'historical_provenance'
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "dashboard_template"
owns_topics:
  - 'dashboard_template'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-26"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary, with historical lineage preserved in legacy fields and reference-input bodies retained where they serve evidence or template continuity."
---

# TPL-005 - Dashboard Template

Use this template for live dashboards. It updates the shared dashboard template rather than creating a separate dashboard system.

## Required design rules

- functions near the top as short fenced `text` lines
- compact time-bearing metadata
- plugin-compatible callouts that remain readable without plugins
- narrow-layout safe for Minimal settings
- lane-shaped sections instead of long narrative blocks
- `Done Enough` lane
- `Needs Direction` lane
- queue tags
- compact handoff relationship note
- strict validation checklist

## Plugin-aware notes

- `callout-manager`: use stable native callout anchors so styling can be layered later without rewriting dashboards
- `cmdr`: expose future-friendly function labels, but do not require config
- `obsidian-kanban`: keep queue lanes convertible later without using `.kanban` artifacts
- `obsidian-minimal-settings` and `obsidian-style-settings`: optimize for folded sections, compact blocks, and narrow line widths

## Review template

```md
---
doc_id: "DASH-000"
title: "Dashboard_Title"
doc_status: "active"
rev: "0.x"
last_updated: "YYYY-MM-DD"
intended_placement: "03 Live Dashboards/"
source_chat: "Mode - Focus - YYYY-MM-DD"
---
# DASH-000 - Dashboard_Title

> [!summary]+ [MODE] Snapshot
> - Mode: [mode]
> - Role: [live purpose]
> - Startup: request latest dashboard if missing, then scan Functions, active lanes, Done Enough, and Needs Direction

## Functions

```text
Function One(item)
Function Two(item)
Function Three(item)
```

> [!note]+ [LANE] Active Work
> - `[ACTIVE]` item

> [!success]+ [GATE] Done Enough
> - `[DONE ENOUGH]` item

> [!question]+ [HOLD] Needs Direction
> - `[NEEDS DIRECTION]` item

> [!info]+ Handoff Relationship
> Dashboard tracks planned or in-progress work. Handoff packages completion or transfer.

> [!note]- Metadata
> - Replaces or supplements: [target]
> - Delete rule: old files may be deleted only after verification and user approval
```

## Queue tags

- `[ACTIVE]`
- `[INTEGRATED]`
- `[STALE]`
- `[LONG-RUNNING]`
- `[DONE ENOUGH]`
- `[NEEDS DIRECTION]`

## Mode visual identity notes

- Steward: `[CTL]` `[RISK]` `[LANE]`
- Draft: `[WRK]` `[REV]` `[OUT]`
- Seed: `[TREE]` `[ROUTE]` `[SHIFT]`
- DM: `[PLAY]` `[RULE]` `[FRIC]`
- Art: `[ART]` `[STYLE]` `[PIPE]`

## Validation checklist

- functions near top
- functions as code lines
- time-bearing `last_updated`
- visually distinct mode structure
- `Done Enough` present
- `Needs Direction` present
- handoff relationship present
- narrow-view safe
- no mangled symbol encoding
- still feels like a dashboard, not a compact essay


