---
project: "Nexus"
doc_id: "DASH-STEWARD-001"
legacy_ids:
  - 'DASH-002'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\16 Current Dashboards State rev0.3\DASH-002 - Steward_Live_Project_Dashboard.md'
title: "Steward_Live_Project_Dashboard"
doc_status: "active"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "provisional_source"
placement_domain: "Dashboards"
content_role: "current_state"
topic_family: "steward_dashboard"
owns_topics:
  - 'steward_live_state'
borrows_topics:
  - 'admin_routing'
  - 'mode_execution_delta'
state_scope: "project"
created: "2026-05-25"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Dashboards consolidation. Steward dashboard now uses domain-first routing and current-state boundaries; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Steward Live Project Dashboard

> [!summary]+ Snapshot
> - **Mode owner:** Steward.
> - **Intended placement:** `01_Admin/Live_Dashboards/`.
> - **Replaces/supplements:** prior `DASH-002` plus embedded Global/Roadmap duties formerly split into `DASH-007`.
> - **Delete rule:** old dashboard files may be deleted only after verification.
> - **Startup note:** on new chat open, request the latest dashboard if it was not provided. If it is provided, scan `Functions`, `Active Work`, `Done Enough`, and `Needs Direction` before substantive work.

## Functions

> [!info]+ Plain-Text Functions
> - `Print Source Doc()` - print a named source document in clean review-safe form.
> - `Apply Redline()` - show the current wording, proposed wording, and short rationale.
> - `Route to Handoff()` - convert a stable item into a handoff-ready packet.
> - `Check Source Confidence()` - classify source confidence as `HIGH`, `UNKNOWN`, or `LOW`.
> - `Route Queue Item()` - decide whether an item belongs in dashboard, register, handoff, or source update.
> - `Build Codex Prompt()` - produce a Codex execution prompt from current dashboard state.

## Global / Roadmap

> [!abstract]+ Current Project Phase
> - **Current phase:** dashboard rebuild and source-first continuity pass after archive cleanup.
> - **Cross-mode priority:** keep active source authoritative, use dashboards as live operational surfaces, and route recovered inactive work back into usable lanes.
> - **Operating line:** `1 is infinity relative to 0. Ship 1.`

> [!todo]+ Cross-Mode Priorities
> - `[ACTIVE]` complete dashboard rebuild and verify live usability.
> - `[ACTIVE]` continue the `Modes` cleanup pass for mode ops, templates, and dashboard support.
> - `[ACTIVE]` prepare the test campaign to resume at E-43 with updated crew sheets and loadout procedure.
> - `[ACTIVE]` preserve Lattice-100 provisional math/system integration while routing remaining gaps.
> - `[LONG-RUNNING]` create one playable TacMap with readable node/path/cover logic.

## Source Confidence

> [!example]+ Current Confidence
> - `HIGH` - `Dashboards` live surfaces, current DM state, current Seed state, and recovered review files were retrieved in chat on 2026-05-25.
> - `HIGH` - `Skills` / `Equipment` open-question surfaces were retrieved in chat on 2026-05-25.
> - `UNKNOWN` - any named source file not retrieved during this rebuild.
> - `LOW` - duplicated or conflicting old dashboard copies in archive history.

## Active Workstreams

> [!todo]+ Steward Queue
> - `[ACTIVE]` `SW-01 - Dashboard rebuild and stabilization`
>   - Owner: Steward / Codex.
>   - Scope: rebuild all live dashboards with functions, tags, Done Enough, Needs Direction, and candidate routing.
>   - Done when: dashboards read cleanly in narrow view and recovered items are not stranded in raw candidate files.
> - `[ACTIVE]` `SW-02 - Modes cleanup pass`
>   - Scope: dashboard template repair, DM display protection, Seed-to-Draft routing, mass-intake function notes, and temp `/grill-me` handling.
> - `[ACTIVE]` `SW-03 - Campaign resume readiness`
>   - Scope: support DM/Draft/Seed dependencies needed before E-43 begins.
> - `[ACTIVE]` `SW-04 - Output/register closeout planning`
>   - Scope: cumulative register handling after current dashboard/source state stabilizes.

## Promotion Candidates

> [!tip]+ Source / Rules Promotion Candidates
> - `[ACTIVE]` `RG-RCV-01 - Crew state vs offscreen autonomy / communication-state procedure`
>   - Archive basis: old Draft queue `Dq11`.
>   - Current-source basis: `RG-CURRENT-07`.
>   - Why here: this is now a cross-mode source/rules issue, not only a dashboard note.
>   - Needs: ownership decision between Draft, DM, and `Characters` state handling.
> - `[ACTIVE]` `RG-RCV-02 - Ship-state / quarantine / repair-opportunity display boundary`
>   - Archive basis: old Draft queue `Dq14`.
>   - Current-source basis: `SRC-CORE-005`, current DM campaign state.
>   - Why here: likely needs source-facing clarification before stable template or DM execution work.

## Done Enough

> [!success]+ Done Enough Lane
> Done Enough = usable now, not blocking, not polished, not final.
>
> - `[ACTIVE]` current dashboard rebuild can be used before every companion summary is perfectly normalized.
> - `[ACTIVE]` current pre-node level-up/loadout procedure is usable enough to unblock campaign prep even though broader character-sheet polish remains open.
> - `[LONG-RUNNING]` one playable TacMap is enough to resume testing; it does not need final art polish.

## Needs Direction

> [!question]+ Needs Direction
> - `[ACTIVE]` `AQ-01 - High-risk plan beat-resolution procedure`
>   - Archive content says this remains unfinished and current source only partly covers strong-plan rewards, scene beats, and when a plan should bypass or require a roll.
>   - Direction needed: should this live under Draft / `Modes` procedure support, or `Core` scene rules?
> - `[ACTIVE]` `AQ-02 - Ship-state, quarantine, and repair opportunity display rules`
>   - Archive content says this is still relevant and current source has ship/campaign references without a clearly owned live procedure.
>   - Direction needed: DM display concern only, or broader campaign-loop rules object?

## Codex / Reorg Lane

> [!note]+ Codex and Reorganization Work
> - `[ACTIVE]` archive flattening complete enough for current use; no deletion authorized.
> - `[ACTIVE]` recovered candidate files have been routed into live dashboards and remain preserved as review artifacts.
> - `[STALE]` separate Global dashboard behavior.
>   - Preserved for compatibility in old package structure, but Global/Roadmap now belongs at the top of this dashboard.

## Protected / Do-Not-Touch

> [!warning]+ Protected Items
> - active source set
> - placement lineage and migration traceability
> - Lattice-100 provisional math/system integration
> - current dashboards under rebuild
> - archive contents pending later review

## Risks and Uncertainty

> [!warning]+ Risks
> - duplicated old dashboard files and archive wrappers can still confuse retrieval if future work does not stay source-first.
> - there is still a duplicated `DASH-007` ID in the current package.
> - some rules gaps remain real source-work candidates, not only dashboard notes.

## Recently Resolved / This Changed Things

> [!example]+ This Changed Things
> - archive cleanup surfaced a small set of still-relevant inactive work instead of broad missing source content.
> - dashboard rebuild now routes those items into live lanes instead of leaving them in raw recovery notes.
> - the roadmap is now embedded here instead of treated as a separate required dashboard.

## Handoff Relationship

> [!info]+ When Steward Work Becomes a Handoff
> Route to handoff when a decision affects source structure, source placement, or integration routing and is stable enough for another process to act on.

## Minimal Metadata

- Existing dashboard ID mismatch preserved: Steward remains `DASH-002`.
- Existing separate roadmap file preserved for compatibility, but no longer the primary live control surface.


