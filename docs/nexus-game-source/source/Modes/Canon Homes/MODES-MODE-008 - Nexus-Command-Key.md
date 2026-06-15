---
project: "Nexus"
doc_id: "MODES-MODE-008"
legacy_ids:
  - 'MODE-008'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\MODE-008 - Nexus_Command_Key.md'
title: "Nexus Command Key"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "instruction"
placement_domain: "Modes"
content_role: "canon_home"
topic_family: "nexus_command_key"
owns_topics:
  - 'nexus_command_key'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-07"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Command-key behavior now uses domain-first source routing, review lanes, and bridge-aware terminology; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Nexus Command Key

## 1. Purpose

This document defines quick commands, mode commands, shorthand, and word equivalents for operating Nexus across Steward, Draft, Seed, DM, and Art modes.

Commands are helpers. Source documents remain source truth.

## 2. Global Commands

- `Menu`: show the current mode menu.
- `Status`: show current session or project status.
- `Queue`: show the relevant queue for the current mode.
- `ToC`: show table of contents where supported.
- `View [file]`: write or summarize the requested file for review when available.
- `Warp` / `Warp Speed`: move quickly with compact replies, stronger defaults, fewer questions, and direct batching. Slow down for source-boundary, deletion, migration, or high-impact choices.
- `Pause`: pause the current thread.
- `Resume`: resume the paused thread with a recap.
- `Stop`: stop the current operation.
- `Note`: add the item to the relevant note, idea ledger, review packet, or queue.
- `Route this`: identify the correct mode, source domain, review lane, dashboard, bridge, or holding path.

## 3. Mode Start Commands

- `Mode: Steward`
- `Mode: Draft`
- `Mode: Seed`
- `Mode: DM`
- `Mode: Art`

## 4. ID Systems

- `P1-...`: plan/task execution anchor.
- `S...`: Seed Tree branch/stem/leaf anchor.
- `SI-###`: Seed Inbox temporary capture anchor.
- `D...` or `Dq...`: Draft/Workbench revision anchor.
- `DOMAIN-TOPIC-###`: domain-first source document ID.
- Legacy `ADM`, `MODE`, `REG`, `TPL`, and `SRC-*` IDs: retained as traceability metadata, not preferred primary IDs.

These IDs may cross-link but should not be merged.

## 5. Steward Commands

- `Inventory`: review current project resources, source docs, review outputs, or uploaded materials.
- `Domain Map`: show domain ownership and placement rules.
- `Review Gate`: stop for disposition approval before source-affecting output.
- `Verify cleanup`: check metadata/source/review state before old file cleanup.
- `Bridge Check`: decide whether ChatGPT needs dashboard, deferred/open, canon summary, or direct-source context.
- `Close Steward`: summarize changes, outputs, checks, unresolved items, and next review step.

## 6. Draft Commands

- `Draft Queue`: show the current Draft Queue or workbench surface.
- `Redline`: show revision-marked text before final clean output.
- `Apply Redline(target)`: use Current, Proposed, Rationale, Placement / Owner, Approval status.
- `Print Source Doc(target)`: print or present the named source doc rather than silently summarizing it.
- `Approve [ID]`: approve a draft or review item.
- `Revise [ID]`: rework a draft or review item.
- `Close Draft`: prepare review-ready output and placement handoff.

## 7. Seed Commands

- `Tree`: show the visible Seed Tree.
- `Inbox` / `Seed Inbox`: show temporary `SI-###` captures.
- `Capture Seed: {idea}`: add a Seed Inbox item without derailing.
- `Open [ID or title]`: focus a branch, stem, or leaf.
- `Water [ID or title]`: develop the idea without drafting final source.
- `Harvest [ID or title]`: prepare mature material for routing.
- `Harvest Dashboard`: convert mature Seed material into an updated Seed dashboard/tree.
- `Dormant [ID or title]`: preserve but deprioritize.
- `Prune [ID or title]`: reject/remove from active consideration.

## 8. DM Commands

- `Start Session`: begin or resume campaign play.
- `State`: show campaign, party, ship, and session state.
- `TacMap`: show current tactical map or position block.
- `Options`: show current player-facing options.
- `Ruling`: log a temporary ruling or rules gap.
- `Encounter Start`: present the encounter-start packet when available.
- `Route Node End Report`: summarize node outcome, rewards, consequences, clocks, and next options.
- `Result Card`: produce a compact result/aftermath display when a full report is unnecessary.
- `Session Log`: summarize play session for later review.

## 9. Art Commands

- `Prompt`: generate a concept-art prompt.
- `Variant`: create prompt variants.
- `Style Lock`: restate current art direction.
- `Art Pack`: collect related prompts into a set.
- `Icon Pack`: collect icon prompt/concepts into a set where supported.
- `TacMap Prototype`: create a visual demonstration that is not automatically canon map data.
- `Handoff`: prepare Art-to-Steward handoff when assets need placement.

## 10. Temporary / Workshopped Command

- `Grill Me` / `/grill-me`: temporary game-design challenge command. Do not run automatically. Do not use for generic doc-status or admin review. Use only when the user specifically requests grilling.

