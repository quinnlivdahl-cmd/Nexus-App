# ChatGPT Codex Handoff Index

Status: active bridge index

## Purpose

This index is the repo-visible lookup point for ChatGPT Project handoffs that are not their own GitHub issue.

Use this lane when ChatGPT has a concrete transfer packet for Codex, Replit, GitHub, or a fresh work session. For normal planning and discussion sync, prefer `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`.

## Approved Handoff Path

ChatGPT handoff packets live at:

`docs/chatgpt-project-bridge/handoffs/YYYY-MM-DD-<topic>.md`

Do not invent alternate handoff destinations. If the handoff is actually an issue-ready task, update or create a GitHub issue and link it here.

## Handoff Rules

- Handoffs are context, not execution approval.
- Each handoff should name one next safe action.
- If a handoff becomes execution-ready, Codex should link it to an existing GitHub issue or create/update an issue before implementation when practical.
- Large accepted prose belongs in an approved preservation or draft path, with the handoff pointing to it.

## Index

| Date | Handoff | Topic | Status | Related issue/lane | Destination file | Next safe action |
|---|---|---|---|---|---|---|
| 2026-06-10 | Nexus self-learning automation research prompt | Safe repo-visible learning automation research | ready-for-Codex-research | none yet; non-issue Codex research handoff | `docs/chatgpt-project-bridge/handoffs/2026-06-10-nexus-self-learning-automation-research-prompt.md` | Codex should run the embedded research prompt and produce `SELF_LEARNING_AUTOMATION_RESEARCH.md` or print the candidate report. |
| 2026-06-12 | Issue #40 effect/state-delta grammar drafting | Continue system-schema draft sequence after #39 | ready-for-next-Draft-chat | #40 / #33 system-schema epic | `docs/chatgpt-project-bridge/handoffs/2026-06-12-issue-40-effect-state-delta-grammar-drafting.md` | Next Draft chat should append Issue #40 to `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`. |
| 2026-06-14 | Source drafting consolidation Codex handoff | Continue source/rules/app drafting review in a fresh Codex chat | ready-for-Codex-review | #9, #31, #36, #38, #39 / source-to-app consolidation | `docs/chatgpt-project-bridge/handoffs/2026-06-14-source-drafting-consolidation-codex-handoff.md` | Fresh Codex chat should summarize readiness and ask whether to produce only the consolidation map, also patch #36 preservation debt, or proceed to #38/#39 scaffold decision. |
| 2026-06-14 | Source migration closeout review | Inspect local Golden Truth source update and broader source-home migration state before commit/push | ready-for-Codex-closeout-review | Golden Truth source workflow / #9 source-backed context prep | `docs/chatgpt-project-bridge/handoffs/2026-06-14-source-migration-closeout-review.md` | Fresh Codex chat should inspect git/source migration state and explain the safest closeout path before staging, committing, pushing, or updating GitHub. |
| 2026-06-21 | Bridge verification next work | Verify ChatGPT bridge baseline anchors and source-index retrieval before expanding bridge packets | verified-current-for-scope | ChatGPT Project bridge readiness / non-issue handoff | `docs/chatgpt-project-bridge/handoffs/2026-06-21-bridge-verification-next-work.md` | Project sources were refreshed from the current repo bridge/source-index paths and verified for the bridge/source-index scope; route broader currentness claims back to Codex/local verification. |

## Handoff Packet Template

```md
# ChatGPT Handoff: <topic>

Date:
Prepared by:
Related issue or roadmap lane:
Status:
Destination file:

## Context Summary

## Files Or Sources Referenced

## Decisions Made

## Blockers

## Unresolved Questions

## What Not To Redo

## Next Safe Action
```
