---
name: nexus-issue-workflow
description: Shape, update, synchronize, and close Nexus GitHub Issues. Use when turning a request into an issue-ready task packet, checking issue readiness, recording progress or acceptance evidence, scanning for near-complete issues, or performing formal issue closeout.
---

# Nexus Issue Workflow

## Unique Trigger

Use this workflow only when Nexus GitHub Issue state or issue-shaped work packets are being created, updated, synchronized, scanned, or closed. Do not use it merely because implementation happens to have an issue number.

## Owner

This is the sole repo-local skill for the Nexus issue lifecycle. GitHub Issues are the live execution packets; `NEXUS_ISSUE_INDEX.md` is a repo-readable map that must be verified against GitHub.

## Intake

1. Read `docs/agents/issue-tracker.md`, `NEXUS_ISSUE_INDEX.md`, `NEXUS_TASK_PACKET_TEMPLATE.md`, and the relevant source or implementation context.
2. Capture the goal, planning anchor, readiness, scope, `Do Not Do` boundaries, acceptance criteria, validation, and review gate.
3. Classify the work as ready, blocked, or parked. Challenge oversized, unsafe, duplicate, or under-specified tasks.
4. Show material issue-body changes for review unless the user has explicitly authorized the exact mutation.
5. Treat GitHub Issue state as task authority, never game-source authority.

## Progress And Closeout

1. Keep local, committed, pushed, reviewed, merged, and GitHub-closed states distinct.
2. For a closeout scan, inspect live GitHub and select only bounded candidates whose remaining work is small.
3. Use the installed global review workflow and `docs/admin/task-planning/nexus-review-rubric.md` when independent review is required.
4. Follow this order: validate -> independently review -> synchronize -> commit and push -> comment -> close.
5. Synchronize `NEXUS_ISSUE_INDEX.md` and any genuinely affected roadmap or bridge status surface before closure.
6. Post evidence naming files, commit or PR, validation, reviewer result, and why acceptance criteria are satisfied; then close and re-fetch the issue.

## Boundaries

- Do not bulk-close, relabel, rewrite, or automate the queue without explicit scope.
- Do not expand a closeout into new design or implementation.
- Do not claim completion when changes remain only local or unmerged.
- Do not duplicate durable planning in the repo; use the owners defined by Planning Ownership #81.
