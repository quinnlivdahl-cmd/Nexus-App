---
project: "Nexus"
doc_id: "DASH-TASK-001"
legacy_ids:
  - 'DASH-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\16 Current Dashboards State rev0.3\DASH-007 - Active_Project_Task_Summary.md'
title: "Active_Project_Task_Summary"
doc_status: "active_candidate"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "tracking"
placement_domain: "Dashboards"
content_role: "current_state"
topic_family: "project_task_summary"
owns_topics:
  - 'project_task_summary'
borrows_topics:
  - 'steward_live_state'
  - 'draft_live_state'
state_scope: "project"
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Dashboards consolidation. Task routing now uses domain-first targets and current-state boundaries; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Active Project Task Summary

## Snapshot

This is the consolidated active task/tracker surface for the current mass-intake pass. A task list already exists here, so no duplicate tracker should be created unless a future review proves this surface cannot hold the work cleanly.

Use this dashboard for active task routing. Use domain open-question docs for domain-specific unresolved design questions.

## Task item format

Recommended compact task wording:

```text
TASK-ID - Verb + object
- Type: Water / Draft / Produce / Integrate / Verify / Repair / Backpatch / Review
- Owner: Steward / Draft / Seed / DM / Art
- Source: file, handoff, source bundle, memory, or chat decision
- Target: domain/doc/dashboard/artifact
- Done when: clear completion condition
```

Examples: `Water Sd1.17e`, `Draft Route Node End Report template`, `Produce SVG node-web set`, `Integrate TacMap collage handoff`, `Verify Combat rebuild acceptance`.

## Current critical path

### TASK-001 - Verify rebuilt source domains for migration readiness

- Type: Verify.
- Owner: Steward.
- Status: current.
- Source: rebuilt domain outputs and prior mass-intake history.
- Target: `Core`, `Combat`, `Characters`, `Skills`, `Equipment`, `Lore`, and `Dashboards`.
- Done when: target domains are reviewed and accepted for permanent-source migration.

### TASK-002 - Continue `Modes` cleanup pass

- Type: Review / Backpatch / Draft.
- Owner: Steward, possibly Draft.
- Status: current next likely domain dependency.
- Source: `Core`, `Skills`, `Dashboards` tracker pass, user corrections.
- Target: `Modes` mode ops/registers/templates.
- Done when: dashboard template, DM additions, Seed-to-Draft routing, mass-intake function notes, and temp grill-me handling are reviewed and either produced or queued.

### TASK-003 - Update dashboard template

- Type: Draft / Repair.
- Owner: Steward/Draft.
- Status: current `Modes` shadow queue.
- Source: user note that HTML dropdowns work in edit but not view.
- Target: `MODES-TEMPLATE-005 - Dashboard-Template.md`.
- Done when: template says dashboards are Obsidian-display-first; branch and stem folds allowed; leaves remain bullets; Seed active branch open and other branches closed.

### TASK-004 - Preserve DM display formats in templates

- Type: Backpatch / Draft.
- Owner: Steward/Draft.
- Status: current `Modes` shadow queue.
- Source: DM playtest formatting handoffs and user correction.
- Target: DM Mode doc and relevant templates.
- Done when: encounter-start and route-node-end additions are added without breaking existing DM narrative/mechanics/roll/state display formats.

### TASK-005 - Keep /grill-me temporary

- Type: Review / Hold.
- Owner: Steward.
- Status: current process rule.
- Source: user correction during tracker pass.
- Target: Mode command key and temporary command doc.
- Done when: `/grill-me` remains marked temporary/workshopped and is not used unless specifically requested.

### TASK-006 - Maintain cumulative Output Register

- Type: Produce / Register.
- Owner: Steward.
- Status: current closeout requirement.
- Source: continuity-aid output memories and generated output files.
- Target: Output Register update when intake pass is ready to close or register pass is requested.
- Done when: cumulative register includes all generated outputs and placement/replacement notes.

## Seed tasks

### TASK-101 - Water Sd1.17e Node-Web Quality Checklist v0.2

- Type: Water.
- Owner: Seed.
- Status: active next Seed branch.
- Source: Seed TacMap/status/cover handoff and dashboard candidate.
- Target: Seed dashboard and future `Combat` / `Content` / `Play Aids` checklist work.
- Done when: Required / Optional / N/A rules are defined for node-web checklist items.

### TASK-102 - Water Sw Weapons Branch

- Type: Water.
- Owner: Seed.
- Status: queued.
- Source: bedtime weapons branch.
- Target: Seed dashboard, later `Equipment` / `Content` source if harvested.
- Done when: many-barrel lock-on weapon, frangible, foam/control, and station-safe weapon ideas are expanded enough for harvest decision.

### TASK-103 - Water Su UFO / Anomaly Branch

- Type: Water.
- Owner: Seed.
- Status: queued.
- Source: user request to water UFO branch.
- Target: Seed dashboard, possible `Lore` / `Reference` follow-up later.
- Done when: branch is expanded while kept distinct from confirmed Signal/Choir lore unless user intentionally merges them.

### TASK-104 - Harvest Seed dashboard after active watering

- Type: Integrate.
- Owner: Seed/Steward.
- Status: standing.
- Source: active Seed sessions.
- Target: `DASH-004 - Seed_Mode_Live_Dashboard.md`.
- Done when: new decisions, proposals, parked items, and branch statuses are reflected in the dashboard.

## Draft tasks

### TASK-201 - Draft Route Node End Report template

- Type: Draft.
- Owner: Draft.
- Status: queued from `Core` / `Modes` shadow queue.
- Target: `Modes` template or DM support doc.
- Done when: concise report template covers objectives, loot/rewards, clocks/counters, persistent aftermath, crew/resource changes, and next options.

### TASK-202 - Draft Encounter Start Packet template

- Type: Draft.
- Owner: Draft/DM.
- Status: queued.
- Target: `Modes` template and DM Mode doc.
- Done when: template supports scene frame, objective, pressure, TacMap/schematic, node/path/objective data, actors, hazards, and immediate options.

### TASK-203 - Draft check-display examples

- Type: Draft.
- Owner: Draft.
- Status: queued from `Skills`.
- Target: `Modes` templates and `Skills` examples.
- Done when: examples show roll/result/stakes and major modifier sources without bloating DM turns.

### TASK-204 - Draft character sheets / level-up display

- Type: Draft.
- Owner: Draft/DM.
- Status: current blocker for campaign resume.
- Target: Rook, Mara, Ivo, Vale, Rill/C-WARDEN current playable sheets.
- Done when: DM can display updated crew sheets, apply level-up, select away team, and choose loadout before E-43.

## Art / play-aid tasks

### TASK-301 - Produce SVG node-web set

- Type: Produce.
- Owner: Art.
- Status: queued/current.
- Source: TacMap collage architecture handoff, Seed TacMap status/cover handoff, icon starter kit.
- Target: `Art` visual asset guidance and `Play Aids` use.
- Done when: node, path, edge-marker, cover/visibility, status, objective, hazard, and actor marker set exists as editable SVG assets or promptable asset spec.

### TASK-302 - Integrate TacMap collage handoff

- Type: Integrate.
- Owner: Steward/Art.
- Status: queued.
- Source: `Nexus_TacMap_Collage_Architecture_Handoff_2026-05-15_rev0.1.md`.
- Target: `Art` and possibly `Play Aids`.
- Done when: SVG sprite sheets, coordinate scaffold, backdrop-engulfing principle, fast state-change requirement, and cover marker logic are represented in the correct source docs.

### TASK-303 - Route uploaded visual references

- Type: Integrate.
- Owner: Steward/Art.
- Status: queued.
- Source: loose uploaded 64-node asteroid mine TacMap prototype and orbital/station exterior image.
- Target: `Art` visual reference; possible `Play Aids` reference.
- Done when: images are cataloged as visual/prototype evidence, not canon source maps.

## Source/domain refinement queue

### TASK-401 - Character domain usability follow-up

- Type: Draft / Review.
- Owner: Draft/Steward.
- Status: queued.
- Target: `Characters` / DM usability.
- Notes: exact character sheets, cyborg/upload/full-chassis distinctions, playable display.

### TASK-402 - Skills/advancement follow-up

- Type: Draft / Seed.
- Owner: Draft/Seed.
- Status: queued.
- Target: `Skills`.
- Notes: tiered selectable focus powers/effects/features, Skill Focus, Skill, and "Ability" cumulative totals.

### TASK-403 - Equipment/catalog/loadout follow-up

- Type: Draft / Seed.
- Owner: Draft/Seed.
- Status: queued.
- Target: `Equipment`.
- Notes: exact items, charges, accessory balance, consumable cap, tool rules, cyberware catalog, weapons branch. No carried inactive gear; pickups go to inventory.

### TASK-404 - Lore/timeline/power-map follow-up

- Type: Draft / Seed.
- Owner: Draft/Seed.
- Status: queued.
- Target: `Lore`.
- Notes: timeline pass, Treaty Power, upload-person polities, Choir/Collective terminology, station life, UAP/anomaly seeds.

### TASK-405 - Content/encounter follow-up

- Type: Draft / DM / Seed.
- Owner: Draft/DM/Seed.
- Status: queued.
- Target: `Content`.
- Notes: starter enemies, encounter templates, route nodes, mission rewards, obstacles/hazards, campaign encounter pool.

## Recently integrated / monitor

- `Core` rebuild update produced.
- `Combat` rebuild update produced.
- `Characters` rebuild update produced.
- `Skills` rebuild update produced.
- `Equipment` rebuild update produced.
- `Lore` rebuild update produced.
- `Dashboards` tracker repair produced by this rebuild surface.

## Standing process tasks

- Frontmatter check before assembly for every staged doc.
- Preserve content by default.
- Do not authorize deletion without explicit user approval.
- Do not call outputs current until metadata/content status is checked.
- Use current chat files and latest source docs over stale backups when conflicts exist.
- Check existing trackers before creating new task lists.


