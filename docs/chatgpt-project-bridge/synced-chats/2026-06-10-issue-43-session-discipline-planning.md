# Synced Chat Packet — Issue #43 ChatGPT-Codex Session Discipline

Date: 2026-06-10  
State: planning-only  
Mode: Steward  
Created chat title: Steward — Issue 43 Session Discipline Planning — 2026-06-10  
Related issue: GitHub Issue #43, “Design Codex Chat Focus and Session Discipline Workflow for Nexus”  
Repo: quinnlivdahl-cmd/Nexus-App  
Local repo path: C:\Users\Quintin Livdahl\Repos\Nexus-App

## Intended Placement

Path:

`docs/chatgpt-project-bridge/synced-chats/2026-06-10-issue-43-session-discipline-planning.md`

This packet supplements Issue #43. It does not replace the issue, bridge baseline, roadmap, AGENTS.md, skills, source docs, or workflow docs.

No old files should be deleted based on this packet. Any replacement/supersession decision requires repo review and explicit implementation approval.

## Purpose

This packet preserves ChatGPT-side planning decisions for Issue #43 before Codex performs discovery or repo edits.

The goal is to design a shared ChatGPT-Codex session-discipline workflow for Nexus that keeps active work focused while preserving useful side discoveries.

## Current User-Verified Context

- Issue #43 is open as of 2026-06-10.
- First pass is discovery/design only.
- Do not modify AGENTS.md, skills, source docs, bridge docs, or repo files in the first pass.
- Codex should inspect current repo operations before designing anything new.
- ChatGPT and Codex both write to repo/issues in actual current workflow, but Codex remains stronger for repo-current verification, validation, implementation, and repair.

## Locked Direction

Issue #43 should produce:

1. Mirrored ChatGPT/Codex discipline specs.
2. Shared side-item lifecycle model.
3. On-task / off-task rule.
4. Tracking-location discovery findings.
5. Future automation follow-up list.
6. Recommended repo placement.
7. Implementation issue list, if needed.

## Core Model

Use two mirrored specs, not one flat rulebook.

Shared lifecycle:

`notice → classify → route → record → sync`

Platform emphasis:

- ChatGPT: planning, side discovery, issue shaping, synced-chat packets, repo/issue writing with caution.
- Codex: repo truth, duplicate checks, implementation, validation, issue/roadmap updates.

Both platforms should write toward the same side-item tracking locations.

## On-Task Rule

On-task means advancing the active request, issue, session goal, or required verification/closeout.

Side items may be noticed and recorded, but not pursued unless they become blocking or the user explicitly redirects.

Side items are project fuel, not distractions. Pursuing side items without routing is the distraction. Recording side items is part of disciplined work.

## Side-Item Classes

Use a simple three-layer model:

1. Side task  
   Actionable work. May become or update a GitHub issue, roadmap entry, epic link, or task packet.

2. Side finding  
   Useful evidence, risk, relationship, or planning note. Should be recorded durably but may not need its own issue.

3. Tiny observation  
   Notable small observation. Should go to a durable observation-log system once existing repo patterns are discovered.

No side item should remain only in chat memory.

No “parked but unrecorded” category.

## Side-Item Timing

Default flow:

1. Notice side item.
2. Briefly notify user when noticed.
3. Include one-line summary and likely lane only if obvious.
4. Continue active task.
5. Batch durable routing/recording near closeout unless blocking, urgent, or scope-changing.
6. Include Side Items / Closeout Routing section if any side items appeared.

## Closeout Rule

If side items appear, closeout must include:

- active task result;
- files/issues touched;
- validation run or skipped;
- side items routed;
- records created or updated;
- follow-up chats/issues created or recommended.

Closeout is not the durable record by itself. It is the index of where records went.

## Routing And Recording Rule

#43 should not define final side-item file paths from memory.

Before defining final tracking locations, ChatGPT/Codex must inspect existing repo patterns and determine whether comparable issue, packet, log, roadmap, or workflow systems already exist.

Default routing families:

- Actionable side tasks → issues/comments.
- Planning structure → roadmap/epic links.
- ChatGPT-bound exploration → synced-chat/task packet.
- Tiny observations → discovered observation-log system.
- Session closeout → index of where records went.

## Duplicate / Cluster Discipline

Duplicate or cluster checks are required before:

- new issue creation;
- major issue comments;
- roadmap restructuring;
- epic/child issue routing.

A major issue comment is one that changes task scope, adds a new side task, affects roadmap/epic/issue clustering, records cross-issue dependency, changes acceptance criteria, or could create duplicate work if placed wrong.

Minor evidence comments do not need full duplicate/cluster ceremony.

If a near-duplicate exists:

- update/comment existing issue when the side item fits;
- create linked child issue when it needs distinct acceptance criteria;
- cluster under an epic when part of a broader workstream.

## ChatGPT-Bound Side Items

When a side item belongs in ChatGPT:

- create or update a synced-chat/task packet;
- include intended mode: Steward, Draft, Seed, DM, or Art;
- apply existing Cody/Codex chat naming convention;
- include exact relevant repo/source/issue paths;
- include self-contained chat-opening context;
- include “what not to do” only for risky/source-sensitive tasks.

ChatGPT should pull packet context from the GitHub repo by exact path when available.

## Repo / Issue Writing Rule

Both ChatGPT and Codex may write side-item records to repo/issues when tooling and permission allow.

Shared requirements:

- do not write to guessed locations;
- run duplicate/cluster checks when needed;
- use existing approved destinations or discovered repo patterns;
- notify what was recorded and where.

ChatGPT does not need an extra “ask before GitHub write” rule beyond connector permission, but it should verify exact target path/issue where practical.

## Existing-Operations Review Requirement

Before proposing new implementation, Codex must review existing operations to avoid duplicating completed goals or rebuilding systems already available.

Discovery should inspect:

- current issue workflow;
- existing chat naming convention;
- current synced-chat / packet patterns;
- roadmap and issue index behavior;
- existing scripts/skills that already solve part of this;
- existing observation or parking-lot files, if any;
- existing duplicate-check or issue-clustering mechanisms, if any.

Core question:

“Is this already solved, partially solved, or supported by an existing mechanism?”

## Future Automation / Skill Plan

#43 should include a future automation section for:

- duplicate / near-duplicate issue checker;
- roadmap / epic clustering helper;
- tiny-observation mining skill;
- side-item closeout recorder;
- ChatGPT packet opener / indexer.

These should not be built in #43 unless explicitly scoped later. #43 should define the need and identify follow-up issues if warranted.

## Recommended Codex First Pass

Codex should perform read-only discovery and produce:

1. Existing-operations review.
2. Current side-item / packet / issue-routing patterns.
3. Mirrored ChatGPT/Codex discipline spec draft.
4. Side-item lifecycle model.
5. On-task / off-task rule.
6. Tracking-location recommendation.
7. Future automation recommendations.
8. Duplicate/cluster check recommendation.
9. Implementation issue list, if needed.

No repo edits during first pass unless explicitly approved after discovery.

## Open Questions For Codex Discovery

- What existing files or scripts already support side-item capture?
- Is there already a tiny-observation log or comparable file?
- What is the current Cody/Codex chat naming convention?
- Where should shared side-item tracking actually live?
- How should `NEXUS_ISSUE_INDEX.md` be updated when side-work issues are created or rerouted?
- Which parts belong in AGENTS.md, skills, bridge docs, issue templates, or standalone workflow docs?
- What duplicate/cluster check can be scripted without excessive ceremony?

## Status

Planning-only packet. Ready for Codex read-only discovery if approved.
