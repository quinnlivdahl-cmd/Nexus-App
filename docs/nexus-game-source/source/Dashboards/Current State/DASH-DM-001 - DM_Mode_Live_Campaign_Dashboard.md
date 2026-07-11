---
project: "Nexus"
doc_id: "DASH-DM-001"
legacy_ids:
  - 'DASH-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\16 Current Dashboards State rev0.3\DASH-005 - DM_Mode_Live_Campaign_Dashboard.md'
title: "DM_Mode_Live_Campaign_Dashboard"
doc_status: "active"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "provisional_source"
placement_domain: "Dashboards"
content_role: "current_state"
topic_family: "dm_dashboard"
owns_topics:
  - 'dm_live_state'
  - 'current_instruction_deltas'
borrows_topics:
  - 'campaign_state_summary'
  - 'mode_execution_delta'
state_scope: "dm_mode"
created: "2026-05-25"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Dashboards consolidation. DM dashboard now uses domain-first routing and current-state boundaries; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# DM Mode Live Campaign Dashboard

> [!important] Revised vision reconciliation — 2026-07-11
> This dashboard is historical playtest/current-state evidence and does not define the revised product. Rook is a Campaign Fixture, DM chat is not the primary runtime surface, and current execution must follow `CORE-SPATIAL-001` plus live planning controls.

> [!summary]+ Snapshot
> - **Mode owner:** DM.
> - **Intended placement:** `01_Admin/Live_Dashboards/`.
> - **Replaces/supplements:** prior `DASH-005` campaign dashboard, with campaign and test state kept together.
> - **Delete rule:** old dashboard files may be deleted only after verification.
> - **Startup note:** on new chat open, request the latest dashboard if it was not provided. If it is provided, scan `Functions`, `Current Campaign/Test State`, `Done Enough`, and `Needs Direction` before substantive work.

## Functions

> [!info]+ Plain-Text Functions
> - `Log Friction()`
> - `Summarize Playtest Issue()`
> - `Route Ruling to Draft()`
> - `Route to Handoff()`

## Current Campaign / Test State

> [!abstract]+ Current State
> - `[ACTIVE]` Rook test campaign remains the live campaign and live test campaign.
> - `[ACTIVE]` current location: Wayfarer Saint hidden in Europa industrial clutter.
> - `[ACTIVE]` next selected node: Maintenance Relay Cache E-43.
> - `[ACTIVE]` do not start E-43 until updated character info, level-up, away team, and loadout are displayed.

> [!example]- Route and Objective Snapshot
> - Completed: Kallisto Yard -> Nereid-3 -> Ternary Lock
> - Current: Wayfarer Saint hidden in Europa industrial clutter
> - Next: Maintenance Relay Cache E-43
> - Main objective: find Voss or a Voss-adjacent explanation for the Kallisto packet and person-steering
> - Protection objective: keep Vale out of Heliomed / Special Review Detachment custody

## Current Party / Ship State

> [!note]+ Party / Ship Snapshot
> - Rook Vale available
> - Mara available as next node or ship support
> - Ivo available as next node or ship support
> - Vale / V-Subject 17 available next node
> - Tomas Rill / C-WARDEN available next node
> - soft pressures remain: custody-loss heat, Special Review orientation risk, Vale implant risk, Rill coherence risk, passive watch risk at E-43

## Open Rulings

> [!warning]+ Open Rulings
> - `[ACTIVE]` crew tracker display format is required before campaign resume
> - `[ACTIVE]` pre-node level-up/loadout procedure is current campaign procedure for E-43
> - `[LONG-RUNNING]` command/reaction distinction must remain clear
> - `[LONG-RUNNING]` melee/engagement rules still need clearer handling

## Friction Log

> [!warning]+ Friction
> - `[ACTIVE]` narrative/mechanics/state formatting must stay separated
> - `[ACTIVE]` options should stay compact, usually about four
> - `[ACTIVE]` Rook Translation remains important when broad intent should be voiced through Rook before resolution
> - `[ACTIVE]` encounter-start and route-node-end support should be additive, not format-breaking

## Mechanics Issues Encountered in Play

> [!todo]+ Live Issues
> - `[ACTIVE]` `RG-RCV-01 - Crew state vs offscreen autonomy / communication-state procedure`
>   - Archive preserved this as unfinished and current source still shows a live gap around crew-state mechanical and narrative effects.
>   - Preserved content: how offscreen crew autonomy works, how communication state affects options/support, and how those states display without becoming a giant tracker.
>   - Current route: DM execution guidance + Draft support + `Characters` clarification.
> - `[ACTIVE]` `RG-RCV-02 - Ship-state / quarantine / repair-opportunity display boundary`
>   - Archive preserved this as unfinished display/rules work.
>   - Preserved content: when ship-state, quarantine, and repair windows enter play and how they should display.
>   - Current route: DM display plus possible `Core` clarification.

## Done Enough

> [!success]+ Done Enough Lane
> Done Enough = usable now, not blocking, not polished, not final.
>
> - `[ACTIVE]` a compact current crew-sheet display is enough to resume campaign prep even if ideal presentation comes later.
> - `[ACTIVE]` one usable ship-state display rule is enough to continue play before broader campaign-loop cleanup.
> - `[ACTIVE]` one clear crew-state communication procedure is enough to test before final source promotion.

## Needs Direction

> [!question]+ Needs Direction
> - `[ACTIVE]` whether `RG-RCV-01` should be solved first as DM execution guidance or first as source-rule clarification.
> - `[ACTIVE]` whether `RG-RCV-02` stays local to E-43 prep or becomes a broader recurring campaign-state rule object.

## Playtest Notes

> [!note]+ Current Playtest Notes
> - 2 AP + MP + Reaction remains a strong readable baseline.
> - objective clocks and cyber pressure worked well.
> - armor/cover handling, reinforcement pressure, and updated character abilities should be tested in the next mission-node pass.

## Handoff Relationship

> [!info]+ When DM Work Becomes a Handoff
> Route to handoff when a playtest issue repeats, materially affects the rules, or creates source-update work.

## Minimal Metadata

- Companion summaries such as campaign-state and playtest/rulings remain useful support files, not the primary live dashboard.
- This dashboard is a live execution surface, not the canon home for combat, character, or campaign-loop rules.

