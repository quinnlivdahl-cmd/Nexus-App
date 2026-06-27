# Planning-with-Files Rules

These rules keep complex Nexus-App work recoverable across long sessions, handoffs, and fresh agent starts.

## Rule 1: Create Or Update The Plan First

**When**: Starting complex work requiring more than five tool calls, multiple phases, or durable handoff context.

**Requirement**: Create or update `planning/task_plan.md` before beginning substantive work.

**Action**:

1. Read existing `planning/task_plan.md` if it exists.
2. Update or create:
   - goal;
   - current phase;
   - phase checklist;
   - key questions;
   - decisions;
   - errors.
3. Begin work after the plan reflects the current goal.

## Rule 2: 2-Action Rule

**When**: After browser navigation, web searches, screenshot analysis, or visual exploration.

**Requirement**: Save findings to `planning/findings.md` before taking additional unrelated actions.

**Action**:

1. Navigate, search, or inspect.
2. Record the useful finding and source/evidence in `planning/findings.md`.
3. Continue.

## Rule 3: Read Before Major Decisions

**When**: Before changing direction, choosing among implementation approaches, merging/publishing, or closing an issue.

**Requirement**: Refresh relevant planning context before deciding.

**Action**:

1. Read `planning/task_plan.md`.
2. Read `planning/findings.md`.
3. Read `planning/progress.md`.
4. Make the decision.
5. Log the decision in `planning/task_plan.md` if it affects future work.

## Rule 4: Log Errors

**When**: Any command, validation, merge, GitHub, or reasoning path fails or produces an unexpected result.

**Requirement**: Preserve the error and resolution in planning files.

**Action**:

1. Add the error to `planning/task_plan.md` if it affects approach or phase state.
2. Add operational details to `planning/progress.md` when useful.
3. Do not delete error entries after resolving them; append the resolution instead.

## Integration With Task Tracking

- Use `planning/task_plan.md` for project phases, decisions, and durable errors.
- Use `planning/findings.md` for evidence gathered from repo, web, browser, or GitHub checks.
- Use `planning/progress.md` for session logs and validation results.
- Use an agent task tracker for short-lived action items inside the current phase when available.
