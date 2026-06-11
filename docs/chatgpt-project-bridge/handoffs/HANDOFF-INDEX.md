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
