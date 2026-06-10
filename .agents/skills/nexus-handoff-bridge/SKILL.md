---
name: nexus-handoff-bridge
description: Use when transferring Nexus work between Codex, ChatGPT, Replit, GitHub Issues, or a fresh session.
---

# Nexus Handoff Bridge

Use this skill when work needs to continue across tools or sessions without losing context.

Workflow:

1. Read `NEXUS_HANDOFF_TEMPLATE.md`, `NEXUS_ISSUE_INDEX.md`, and the controlling issue or task packet.
2. Summarize only operational context:
   - controlling issue;
   - planning anchor;
   - suggested thread title;
   - files/sources inspected;
   - files changed;
   - decisions made;
   - blockers;
   - unresolved questions;
   - next safe action;
   - what not to redo.
3. Use the thread title convention in `NEXUS_HANDOFF_TEMPLATE.md` for any fresh or continued work thread.
4. If a Codex thread title tool is available, set the title immediately after creating, forking, identifying, or continuing the thread. If the title cannot be set from the current tool, include the title in the handoff as `Suggested thread title`.
5. Include platform-specific continue prompts for Codex, ChatGPT, and Replit when the handoff crosses tools.
6. Keep the handoff short enough to use directly.

Do not:

- paste full chat transcripts;
- hide blockers;
- omit what has already been checked.
- omit the suggested thread title when creating or continuing a separate work thread.
