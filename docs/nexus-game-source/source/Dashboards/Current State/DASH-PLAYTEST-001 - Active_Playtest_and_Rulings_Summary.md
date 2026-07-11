---
project: "Nexus"
doc_id: "DASH-PLAYTEST-001"
legacy_ids:
  - 'DASH-009'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\16 Current Dashboards State rev0.3\DASH-009 - Active_Playtest_and_Rulings_Summary.md'
title: "Active_Playtest_and_Rulings_Summary"
doc_status: "active_candidate"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "tracking"
placement_domain: "Dashboards"
content_role: "current_state"
topic_family: "playtest_rulings_summary"
owns_topics:
  - 'playtest_rulings_summary'
borrows_topics:
  - 'combat_open_questions'
  - 'mode_execution_delta'
state_scope: "playtest"
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Dashboards consolidation. Playtest summary now uses domain-first routing and current-state boundaries; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Active Playtest and Rulings Summary

> [!important] Revised vision reconciliation — 2026-07-11
> This dashboard is historical playtest/current-state evidence and does not define the revised product. Rook is a Campaign Fixture, DM chat is not the primary runtime surface, and current execution must follow `CORE-SPATIAL-001` plus live planning controls.

## Snapshot

This doc summarizes playtest findings and unresolved rulings from available DM handoffs and dashboards. It is not final rules source. Route rules changes to Draft/Steward and the relevant domain canon home.

## Major playtest sources considered

- Nereid-3 / Ternary Lock DM playtest handoffs and dashboards.
- Rook campaign dashboard and transfer notes.
- Mock Combat Encounter handoff, 2026-05-13.
- Draft/Steward handoffs related to DM display formatting.
- Memory Overflow and Compression Register cues.

## Formatting and display rulings to preserve

- Narrative should appear in narrative block format, not as mechanics/state text.
- Mechanics, rolls, options, and state should be separated from narrative.
- Resource changes should use arrow notation, e.g. `MP: 5/5 -> 3/5` or proper arrow symbol when platform supports it.
- The first text block after a turn identifier is narrative in DM display if the turn includes narrative.
- Avoid duplicate recap blocks after action-result narrative.
- Show hypothetical abilities when useful in playtest/character testing.
- Keep options manageable, usually about four.
- Use Rook Translation when the player gives broad intent and wants the command translated through Rook before resolution.
- Session closeouts should produce a handoff and updated output/register handling when appropriate.

## Combat/action rulings from mock combat

### Worked well

- 2 AP + MP + Reaction felt fast and readable.
- Separate MP made chassis movement identity visible.
- Reactions created strong tactical moments.
- Objective clocks made combat more than damage.
- Cyber pressure integrated well with physical TacMap play.
- Chassis identities came through clearly.
- Command Mark and Guard Other made commander play distinct.
- Capture/restraint finish created story hooks.

### Needs rules development

- Armor may be too flat or too suppressive against low-damage weapons if purely flat.
- Cyber effect duration and recovery need formal rules.
- Alarm/reinforcement pressure should be tested harder.
- Objective-clock multi-tick advancement on strong success felt good but needs formal support.
- Melee/engagement needs clear rules for breaking contact, point-blank firearms, shove, pin/restrain, and cover interaction.
- Command/reaction distinction must remain clear: a commander order should not grant an ally a reaction they already spent unless a rule says so.

## Active provisional rulings from Rook campaign

- Cradle beacon/reporting suppression occurred and should be routed as a ruling.
- Routine recruit wake/opening can be resolved quickly when fiction supports it.
- Rill/C-WARDEN temporary safe harbor is current campaign state.
- Immediate next-node recruit availability is allowed unless contradicted by level-up/loadout process.
- Pre-node level-up/loadout procedure is now campaign procedure for E-43.
- Crew tracker display format is required before campaign resume.

## Active rules gap register - compact

### RG-CURRENT-01 - Initiative formula and modifiers

- Priority: critical.
- Route: `Combat` / Draft.

### RG-CURRENT-02 - PCC partial activation rules

- Priority: high.
- Route: DM / `Combat` / `Characters`.

### RG-CURRENT-03 - Dash/Sprint distance and movement values

- Priority: high.
- Route: `Combat`.

### RG-CURRENT-04 - Skill/check DC model

- Priority: critical.
- Route: `Skills`.

### RG-CURRENT-05 - Damage/Armor/Status rules

- Priority: high.
- Route: `Combat`, `Characters`, and `Equipment`.

### RG-CURRENT-06 - Save/export minimum schema

- Priority: high.
- Route: `Automation` and `Dashboards`.

### RG-CURRENT-07 - Crew state mechanical/narrative effects

- Priority: medium-high.
- Route: `Characters` and DM dashboards.

### RG-CURRENT-08 - Inventory/loadout weight in TT play

- Priority: medium.
- Route: `Equipment`.

### RG-CURRENT-09 - Objective/open-thread terminology

- Priority: medium.
- Route: `Core` / `Content` / `Dashboards`.

### RG-CURRENT-10 - Node terminology overload

- Priority: medium.
- Route: `Core` / `Combat`.

### RG-CURRENT-11 - Hostile symbol/icon canonicalization

- Priority: medium-high.
- Route: `Art`, DM, and `Modes`.

### RG-CURRENT-12 - Auxiliary play-aid state boundary

- Priority: medium.
- Route: `Play Aids` / `Dashboards` / future `Art` work.

## Recommended next test

Run a second combat/mission-node test after pre-node character sheets exist. Include:
- reinforcements actually entering;
- dangerous NetSec opponent with at least one action while engaged unless link is cut;
- explicit armor/cover rule;
- clear exit pressure;
- updated character ability templates.

## Routing rule

When DM creates a provisional ruling during play, preserve it here or in the next handoff, then route it to Draft/Steward only if it needs a source-rule change. Do not let dashboard text silently become final mechanics.

## Mass-intake tracker pass additions

### DM display protection

`Modes` template updates should preserve existing DM display formats. New encounter-start, route-node-end, check-display, and result-card templates should be additive and should not flatten narrative/mechanics/state separation.

### New template/ruling support needed

- Encounter Start Packet.
- Route Node End Report.
- Encounter Result Card.
- Escape Requirement display.
- Check-display examples.
- Noncombat major-time-consuming-choice procedure.

These are tracked in `DASH-007 - Active_Project_Task_Summary.md` rather than in a separate shadow queue.

