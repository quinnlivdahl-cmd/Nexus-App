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
   - files/sources inspected;
   - files changed;
   - decisions made;
   - blockers;
   - unresolved questions;
   - next safe action;
   - what not to redo.
3. Include platform-specific continue prompts for Codex, ChatGPT, and Replit when the handoff crosses tools.
4. Keep the handoff short enough to use directly.

Do not:

- paste full chat transcripts;
- hide blockers;
- omit what has already been checked.
