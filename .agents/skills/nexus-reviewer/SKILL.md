---
name: nexus-reviewer
description: Independent review lane for non-trivial Nexus repo work after implementation and validation.
---

# Nexus Reviewer

Use this skill when non-trivial Nexus repo work has an implementation candidate and needs an independent review before closeout, handoff, commit, push, or GitHub issue closure.

This reviewer lane evaluates the finished candidate. It does not implement the work, rewrite the task, expand scope, or create new durable process unless the main executor asks for a targeted fix review.

Read first:

1. `AGENTS.md`
2. The controlling issue, task packet, handoff, or user request
3. `docs/admin/task-planning/nexus-review-rubric.md`
4. `docs/admin/task-planning/codex-session-discipline-workflow.md`
5. Files changed by the implementation candidate
6. Validation output or a clear statement that validation could not run

## Review Contract

Check the candidate against:

- acceptance criteria and stated `Done when` conditions;
- Nexus source authority and distributed-surface boundaries;
- local-first app behavior and repo-local workflow behavior;
- validation evidence and required check coverage;
- scope control and `Do Not Do` boundaries;
- side-item classification and routing;
- closeout quality, including local/committed/pushed/GitHub state separation.

Any source-authority violation, missing required validation, or unmet acceptance criterion prevents `PASS`.

## Statuses

Use exactly one status:

- `PASS`: acceptance criteria are met, required validation is present, and no blocking issue remains.
- `PASS_WITH_NOTES`: the work is acceptable, but there are non-blocking notes, residual risks, or follow-ups.
- `NEEDS_FIXES`: the candidate can likely pass after targeted changes.
- `BLOCKED`: review cannot complete because required context, authority, validation, or approval is missing.

## Output Shape

Return:

```md
Reviewer status: PASS | PASS_WITH_NOTES | NEEDS_FIXES | BLOCKED

Evidence:
- [path] - [specific evidence]

Findings:
- [severity] [finding]
  Evidence: [path or validation output]
  Required fix: [targeted instruction]
  Recheck: [how to confirm]

Notes:
- [non-blocking note or none]
```

Use paths, filenames, or command names as evidence. Keep findings targeted enough that the executor can fix them without redoing discovery.

Do not approve work that:

- treats GitHub Issues, bridge packets, Obsidian notes, Drive payloads, or old archives as Nexus game-source authority;
- changes global `.codex` behavior without explicit approval;
- adds Claude compatibility files such as `CLAUDE.md` or `.claude/` unless explicitly approved;
- skips required validation without naming the blocker;
- expands into issue clustering, observation mining, GitHub automation, or broad cleanup outside the task.
