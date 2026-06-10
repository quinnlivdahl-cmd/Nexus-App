---
name: nexus-handoff-bridge
description: Use when transferring Nexus work between Codex, ChatGPT, Replit, GitHub Issues, or a fresh session.
---

# Nexus Handoff Bridge

Use this skill when work needs to continue across tools or sessions without losing context.

Workflow:

1. Read `NEXUS_HANDOFF_TEMPLATE.md`, `NEXUS_ISSUE_INDEX.md`, and the controlling issue or task packet.
2. If the user references ChatGPT, Stewy, a synced chat, a planning chat, or a non-issue handoff, read `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md` and `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md` before assuming context is missing.
3. Read any specific bridge packet path named by the user or ChatGPT before summarizing readiness.
4. Summarize only operational context:
   - controlling issue;
   - planning anchor;
   - synced-chat or handoff packet path;
   - suggested thread title;
   - files/sources inspected;
   - files changed;
   - decisions made;
   - blockers;
   - unresolved questions;
   - next safe action;
   - what not to redo.
5. Use the thread title convention in `NEXUS_HANDOFF_TEMPLATE.md` for any fresh or continued work thread.
6. If a Codex thread title tool is available, set the title immediately after creating, forking, identifying, or continuing the thread. If the title cannot be set from the current tool, include the title in the handoff as `Suggested thread title`.
7. Include platform-specific continue prompts for Codex, ChatGPT, and Replit when the handoff crosses tools.
8. Keep the handoff short enough to use directly.

Approved ChatGPT bridge lookup paths:

- `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
- `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
- `docs/chatgpt-project-bridge/preservation/`
- `docs/chatgpt-project-bridge/task-packets/`

Routing rule:

- Use ChatGPT Project for broad planning, general design discussion, speculative architecture, issue-shaping, and "what should we do next?" exploration when local repo truth or edits are not yet needed.
- Use Codex for current repo truth, local source inspection, file edits, validation, commits, pushes, issue updates, and source-authority checks.

Do not:

- paste full chat transcripts;
- hide blockers;
- omit what has already been checked.
- omit the suggested thread title when creating or continuing a separate work thread.
- treat synced-chat packets or handoffs as execution approval by themselves.
