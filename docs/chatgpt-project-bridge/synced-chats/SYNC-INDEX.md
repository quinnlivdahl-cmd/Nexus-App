# ChatGPT Codex Synced Chat Index

Status: active bridge index

## Purpose

This index is the repo-visible lookup point for ChatGPT Project planning or discussion packets that are not their own GitHub issue.

Use this lane for normal ChatGPT-to-Codex sync, not only emergency handoff. ChatGPT Project should handle broad planning, brainstorming, issue-shaping, and general discussion when local repo inspection or edits are not yet needed. Codex should read this index when the user references ChatGPT, Stewy, a synced chat, a planning chat, or a non-issue handoff.

ChatGPT should suggest creating a synced-chat packet when a Project chat is getting context-heavy and the discussion should remain discoverable by Codex. The trigger is the active chat becoming large or detail-rich, not the user asking for a big handoff.

## Approved Packet Path

Synced chat packets live at:

`docs/chatgpt-project-bridge/synced-chats/YYYY-MM-DD-<topic>.md`

Do not invent alternate synced-chat destinations. If a packet needs a more specific container, route it through one of the approved bridge destinations named in `docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md`.

## Packet States

- `planning-only`: useful context, not ready for Codex execution.
- `ready-for-issue`: specific enough to become or update a GitHub issue.
- `ready-for-Codex`: ready for Codex to inspect local truth and propose or execute the next approved action.
- `parked`: preserved for later, not current work.

Synced chat packets are context, not execution approval. A receiving Codex session may summarize readiness and next safe action, but must not edit files, run validation, commit, push, update GitHub, or close issues unless the user's current message authorizes that work.

When Codex creates a synced-chat packet for ChatGPT Project or Stewy to pull, Codex should update this index and push the packet to GitHub when the user expects GPT to find it from the repo. Do not create a Codex planning thread as a stand-in for ChatGPT Project sync unless the user explicitly asks for a Codex thread.

## Index

| Date | Packet | Topic | State | Related issue/lane | Next safe action |
|---|---|---|---|---|---|
| 2026-06-12 | `2026-06-12-platform-executable-repo-actions.md` | Platform-executable ChatGPT-to-repo write loop | ready-for-Codex | ChatGPT Project bridge / synced-chat workflow | Codex may inspect this packet and decide whether to formalize a tiny platform repo-write recipe; no automation or source edits without fresh user approval. |
| 2026-06-11 | `2026-06-11-handoff-automation-planning.md` | Handoff/synced-chat packet generator automation planning | planning-only | Workflow automation follow-up to Issue #43 | Planning chat should summarize readiness and shape a narrow implementation issue or task packet before Codex edits files. |
| 2026-06-10 | `2026-06-10-issue-43-session-discipline-planning.md` | Issue #43 ChatGPT-Codex session discipline planning | planning-only | GitHub Issue #43 | Codex read-only discovery, then scoped implementation only after current user approval. |

## Packet Template

```md
# Synced Chat Packet: <topic>

Date:
Chat/topic title:
Prepared by:
Related issue or roadmap lane:
State: planning-only | ready-for-issue | ready-for-Codex | parked

## Current Question Or Decision

## Accepted Decisions

## Open Questions

## Repo Paths Or Source Docs Referenced

## Next Recommended Codex Action

## What Not To Redo

## ChatGPT Opening Prompt

## Notes
```