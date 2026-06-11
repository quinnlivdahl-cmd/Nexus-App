---
name: nexus-session-discipline
description: Use when framing a non-trivial Nexus work session, classifying side items, deciding split triggers, or preparing closeout routing.
---

# Nexus Session Discipline

Use this skill when a Nexus request could drift across issues, repos, source authority, ChatGPT packets, implementation work, or follow-up ideas.

Read first:

1. `AGENTS.md`
2. The controlling issue, packet, handoff, or user-provided path
3. `docs/admin/task-planning/codex-session-discipline-workflow.md`
4. `NEXUS_ISSUE_INDEX.md` when issue routing or duplicate checks matter
5. `NEXUS_HANDOFF_TEMPLATE.md` when transfer or fresh-session behavior matters

Workflow:

1. State a compact session frame:
   - controlling issue or packet;
   - repo/workspace path;
   - active goal;
   - work mode: discovery, candidate output, live edit, validation, commit/push, or closeout;
   - allowed file/system actions;
   - sources to inspect first;
   - likely checks;
   - split or stop triggers.
2. Work only inside the active goal unless blocked or redirected.
3. When an adjacent item appears, classify it:
   - side task: actionable work needing an issue, task packet, roadmap/index entry, or separate chat;
   - side finding: useful evidence, risk, or relationship to record durably;
   - tiny observation: small note to preserve at closeout if worth keeping.
4. Route side items near closeout unless they block current work.
5. Before creating new issues or major issue comments, check the controlling issue, `NEXUS_ISSUE_INDEX.md`, and repo text search for duplicates or clusters.
6. Close with the active task result, files/issues touched, checks run or skipped, side items routed, records created or updated, and next review step.

Default destinations:

- Actionable side tasks -> existing issue comment, new issue, task packet, or roadmap/index entry.
- ChatGPT-bound exploration -> `docs/chatgpt-project-bridge/synced-chats/` or `docs/chatgpt-project-bridge/task-packets/`.
- Transfer context -> `NEXUS_HANDOFF_TEMPLATE.md` shape or `docs/chatgpt-project-bridge/handoffs/`.
- Source placement questions -> source-router workflow; do not edit live source without approval.
- Tiny observations -> issue closeout, handoff, synced-chat packet, or future observation log.

Do not:

- pursue side items just because they are interesting;
- create new tracking locations when an approved destination exists;
- call a side item recorded if it only appears in chat;
- build duplicate-check, observation-mining, or packet-indexing automation unless a separate issue explicitly scopes it.
