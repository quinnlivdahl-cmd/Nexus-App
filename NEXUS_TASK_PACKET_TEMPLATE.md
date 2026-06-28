# Nexus Task Packet Template

Use this template to shape GitHub issues, Codex tasks, Replit tasks, and cross-platform work packets.

GitHub Issues are the task packets. The issue body should be shown for review before Codex creates or updates an issue unless the user explicitly approves direct issue changes.

## Shared Core

```md
# Nexus Task Packet

Task name:
Task type:
Request summary:
Goal:
Why this matters:
Planning anchor:
Relevant sources/files:
Current known state:
Progress notes:
Review gate:
Reviewer result:
Reviewer feedback / fix status:

Prerequisites / readiness:
- Ready now: yes/no
- Missing prerequisites:
- Blocking issue to create/update:
- Recommended action:

Done when:
In scope:
Out of scope:
Do Not Do:
Platform owner:
Handoff target:
Validation / review method:
Risks / challenge:
Side items / closeout routing:
Open questions:
Next action:
Closeout evidence:
```

## Readiness Rule

If `Ready now` is `no`, do not force an implementation plan. Explain the missing prerequisite and recommend the next task packet or issue to create/update.

Every task packet should include a `Do Not Do` section, even when it is short.

## Progress Updates

For active issue work, progress updates should be short but concrete. Use them to say:

- what phase the task is in;
- what files, issue comments, or source docs are being checked;
- whether work is local-only, committed, pushed, or closed on GitHub;
- whether side items were noticed and where they will be routed;
- what validation is still pending.
- whether the independent review gate is pending, passed, passed with notes, needs fixes, or blocked.

Avoid saying a task is complete when the precise state is only "implemented locally", "committed but not pushed", or "ready to close".

## Review Gate

Non-trivial Nexus work should include an independent review after implementation and validation. Use `.agents/skills/nexus-reviewer/SKILL.md` and `docs/admin/task-planning/nexus-review-rubric.md`.

Allowed reviewer results are `PASS`, `PASS_WITH_NOTES`, `NEEDS_FIXES`, and `BLOCKED`.

Use `Reviewer feedback / fix status` to record unresolved reviewer findings, targeted fixes made, re-review status, or the reason review is blocked.

Any source-authority violation, missing required validation, or unmet acceptance criterion prevents `PASS`.

## Closeout Rule

An issue can be called complete when the task's `Done when` condition is satisfied and the closeout evidence names:

- files changed or intentionally unchanged;
- checks or validation run;
- side items routed or explicitly dismissed;
- commit pushed, when repo files changed;
- GitHub issue comment added, when applicable;
- GitHub issue closed, when the issue itself is complete.
- reviewer result and unresolved reviewer findings, when the review gate applies.

## Code Implementation Add-On

```md
Repo:
Likely files:
Commands/checks:
Dependency/install risk:
Rollback/undo notes:
```

## Source Document Add-On

```md
Live source path or domain:
Repo snapshot path, if used:
Authority docs:
Edit mode: direct approved edit / redline / candidate
Promotion path:
Metadata/rev impact:
```

Use live domain-first source for current source truth. Use the app-side source snapshot for repo-local context-pack and rules-core planning when live currentness is not being changed.

## Replit Task Add-On

```md
Copy-ready Replit task:
Do Not Do:
Validation:
Local-first constraints:
```

## Handoff Add-On

```md
Context summary:
Decisions made:
Files inspected/touched:
What not to redo:
Next safe prompt:
```

## Future Validation Expectations

Future scripts should be able to check whether a packet includes:

- task name;
- task type;
- goal;
- planning anchor;
- readiness;
- done-when condition;
- in-scope and out-of-scope boundaries;
- `Do Not Do`;
- validation method;
- review gate;
- reviewer result;
- reviewer feedback / fix status;
- progress notes;
- side items / closeout routing;
- next action;
- closeout evidence.
