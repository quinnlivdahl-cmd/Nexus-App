# Nexus Review Rubric

Status: active workflow rubric
Scope: Nexus repo-local Codex review loop
Related skill: installed global `code-review`

## Purpose

This rubric specializes the installed global review workflow for Nexus after implementation and validation. It does not introduce global `.codex` behavior, Claude compatibility files, external automation, or GitHub mutation by itself.

Use it for non-trivial Nexus implementation, workflow, source-routing, bridge, handoff, or issue-closeout work before calling the work complete.

## Statuses

Reviewers must return exactly one status:

- `PASS`: acceptance criteria are met, source authority is respected, required validation is present, and closeout is ready.
- `PASS_WITH_NOTES`: the candidate is acceptable, but non-blocking risks, assumptions, or follow-ups should be recorded.
- `NEEDS_FIXES`: targeted fixes are required before closeout.
- `BLOCKED`: review cannot complete without missing context, authority, validation, approval, or external state.

Any source-authority violation, missing required validation, or unmet acceptance criterion prevents `PASS`.

## Required Lenses

### Acceptance Criteria

- The candidate satisfies the controlling issue, packet, handoff, or user request.
- `Done when` conditions are met or explicitly marked incomplete.
- Out-of-scope and `Do Not Do` boundaries are respected.

Blocking result: unmet acceptance criteria require `NEEDS_FIXES` or `BLOCKED`.

### Source Authority

- Canonical game source changes, when approved, belong in `docs/nexus-game-source/source`.
- Repo implementation and workflow docs do not silently rewrite Nexus rules or lore.
- Obsidian, Drive, GitHub Issues, bridge packets, and archives are not treated as source authority unless the controlling task explicitly promotes their content.
- Source document changes trigger source index maintenance.

Blocking result: a source-authority violation requires `NEEDS_FIXES` or `BLOCKED`.

### Local-First Behavior

- App/runtime changes preserve local launch and local playtest assumptions.
- Replit, hosted, public, auth, monetization, cloud sync, or external-account behavior is not introduced unless explicitly scoped.
- Workflow changes stay repo-local unless the user approved broader behavior.

### Validation Evidence

- Required commands from the controlling packet ran, or the blocker is named precisely.
- Workflow changes run `corepack pnpm run validate:workflow`.
- Non-trivial validator or TypeScript changes run `corepack pnpm run typecheck` when practical.
- Source and roadmap generated indexes remain covered by existing validator checks.

Blocking result: missing required validation requires `NEEDS_FIXES` when runnable or `BLOCKED` when not runnable.

### Scope Control

- The candidate changes only files needed for the active task.
- Pre-existing dirty files are not modified unless they are in scope.
- Claude compatibility files, global `.codex` changes, broad issue clustering, observation mining, and GitHub automation are absent unless explicitly approved.

### Side-Item Routing

- Adjacent discoveries are classified as side task, side finding, or tiny observation when they matter.
- Side items are routed to an approved destination or explicitly left unrouted with rationale.
- The main task is not expanded to solve side items by accident.

### Closeout Quality

- Closeout separates local work, committed state, pushed state, and GitHub issue state.
- Files changed, validation run, unresolved assumptions, and untouched dirty files are named.
- Reviewer status and unresolved findings are included in task packets or handoffs when work transfers.

## Finding Format

Use concise, actionable findings:

```md
- [severity] [finding]
  Evidence: [path, command output, or exact missing field]
  Required fix: [targeted instruction]
  Recheck: [command or review step]
```

Severity guidance:

- `Blocking`: prevents `PASS` or completion.
- `Major`: likely to cause drift, invalid closeout, or rework.
- `Minor`: non-blocking cleanup or clarity issue.

## Feedback Loop

The expected loop is:

```text
implement -> validate -> independent review -> targeted fixes -> re-review when needed -> closeout
```

When reviewer status is `NEEDS_FIXES`, the executor should make only targeted fixes unless the user expands scope. After fixes, run the relevant checks again and request re-review of the changed surface.

When reviewer status is `BLOCKED`, the executor should name the blocker and stop or ask for the missing approval/context.
