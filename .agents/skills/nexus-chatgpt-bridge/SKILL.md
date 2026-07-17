---
name: nexus-chatgpt-bridge
description: Maintain Nexus ChatGPT Project bridge packets and cross-tool handoffs. Use when preparing, updating, locating, or validating ChatGPT synced chats, task packets, preservation packets, Project context routes, or handoffs between ChatGPT, Codex, Replit, GitHub Issues, and fresh sessions.
---

# Nexus ChatGPT Bridge

## Unique Trigger

Use this workflow only when Nexus context must cross ChatGPT Project, Codex, Replit, GitHub Issues, or sessions through a bridge artifact or handoff. Do not use it for ordinary issue updates, roadmap maintenance, or canonical source edits.

## Owner

This is the sole repo-local skill for `docs/chatgpt-project-bridge` packet routing and `NEXUS_HANDOFF_TEMPLATE.md` transfers. The bridge translates and routes context; it does not become source, implementation, issue, or project-currentness authority.

## Workflow

1. Read `docs/chatgpt-project-bridge/PROJECT-INSTRUCTIONS.md`, `docs/chatgpt-project-bridge/BRIDGE-INDEX.md`, the relevant packet index, `NEXUS_HANDOFF_TEMPLATE.md` when transferring work, and the controlling issue when one exists.
2. Choose one artifact:
   - `synced-chats/` for useful discussion context that is not an issue;
   - `task-packets/` for focused work prepared for another agent;
   - `handoffs/` for concrete executable continuity;
   - `preservation/` for material retained without making it current.
3. Record authority role, exact source paths, decisions, blockers, what was verified, what not to redo, and the next safe action.
4. Update the matching index and validate the bridge when files change.
5. If ChatGPT is expected to fetch from GitHub, commit and push first, then return the exact GitHub path and a copy-ready retrieval prompt.
6. Do not claim ChatGPT Project refresh, upload, or searchability unless that named scope was actually verified.

## Boundaries

- Keep packets concise; do not paste full transcripts.
- Treat synced chats and handoffs as context, not execution approval.
- Use ChatGPT Project for discussion and drafting; return to Codex for live repo truth, edits, validation, Git, and issue state.
- Do not mutate ChatGPT Project settings or sources unless the user explicitly scopes that external action.
