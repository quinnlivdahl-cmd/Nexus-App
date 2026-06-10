---
name: nexus-task-intake
description: Use when turning a Nexus request into a ready-or-blocked task packet before creating or updating a GitHub issue.
---

# Nexus Task Intake

Use this skill when a request needs to become transferable work for Codex, Replit, ChatGPT, or GitHub Issues.

Workflow:

1. Read `NEXUS_ISSUE_INDEX.md`, `NEXUS_TASK_PACKET_TEMPLATE.md`, and the relevant repo/source context.
2. Identify the goal, planning anchor, current known state, validation method, and `Do Not Do` boundaries.
3. Decide readiness:
   - `ready` means the task is scoped, has validation, and has no known blocker.
   - `blocked` means a prerequisite or decision is missing.
   - `parked` means useful but not near-term execution work.
4. Challenge weak, premature, oversized, unsafe, or under-specified tasks.
5. Produce issue-ready Markdown using the shared task packet shape.
6. Show the issue body for review before creating or updating GitHub unless the user explicitly authorizes direct issue changes.

Do not:

- turn broad ideas into executable issues without a readiness gate;
- omit the `Do Not Do` section;
- treat GitHub Issues as Nexus source authority.
