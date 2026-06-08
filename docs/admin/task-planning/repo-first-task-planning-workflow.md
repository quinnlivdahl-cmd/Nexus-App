---
project: Nexus
title: Repo-First Task Planning Workflow
version: rev0.1
doc_status: candidate
working_state: proposed
source_role: admin_workflow
canon_status: admin_reference_candidate
created: 2026-06-08
last_updated: 2026-06-08
intended_repo_path: docs/admin/task-planning/repo-first-task-planning-workflow.md
mode_owner: Steward
supplements:
  - AGENTS.md
  - docs/admin/operating-model.md
  - docs/admin/ai-workflows.md
  - docs/admin/repo-conventions.md
replaces: []
old_files_deletion_guidance: Existing admin, workflow, dashboard, and source-management files should remain in place unless a separate accepted migration or supersession issue handles them.
notes: Clean-room task-planning proposal for a GitHub-centered Nexus setup using ChatGPT, Codex, and Replit as coordinated assistants.
---

# Repo-First Task Planning Workflow

## 1. Purpose

This document defines a repo-first task-planning model for Nexus work when GitHub, Codex, Replit, and ChatGPT are used together from the start.

It covers project administration, task planning, tool usage, review flow, and app-work coordination. It does not define Nexus game rules, lore, factions, campaign state, or final app behavior.

## 2. Core Principle

GitHub is the canonical project system.

Meaningful project work should leave a GitHub trace:

- decisions become decision records;
- tasks become GitHub Issues;
- work happens on branches;
- proposed changes become Pull Requests;
- review happens through diffs, comments, and checks;
- shipped work is merged, tagged, or released;
- AI instructions live in repo-controlled files.

ChatGPT, Codex, and Replit are project workers or interfaces. They are not the project database.

## 3. Tool Roles

### 3.1 GitHub

GitHub owns canonical source files, app code, documentation, issues, branches, PRs, review history, checks, and release history.

### 3.2 ChatGPT / Steward

ChatGPT supports architecture, task decomposition, issue drafting, acceptance criteria, Codex prompts, Replit prompts, PR review, decision records, and workflow debugging.

Durable decisions and tasks should be routed into repo-controlled docs, issues, PRs, or decision records.

### 3.3 Codex

Codex handles bounded implementation work: specific issues, scoped refactors, tests, documentation edits against repo files, repo inspection, and candidate branch changes.

Codex tasks should be written as scoped tickets with clear acceptance criteria.

### 3.4 Replit

Replit handles fast runtime feedback: running the app, previewing UI behavior, testing prototype flows, lightweight app edits, and deployment previews.

Replit should import from GitHub and push changes back through GitHub.

### 3.5 Obsidian

Obsidian may remain a reading, linking, and thinking interface. Where practical, it should view or mirror repo-controlled Markdown rather than becoming a separate authority layer.

### 3.6 ChatGPT Project Sources

Project Sources are an AI retrieval cache. They should contain thin, high-value operating context such as README, AGENTS, operating model, AI workflow rules, and current source bundles.

## 4. Recommended Repo Structure

```text
nexus/
  README.md
  AGENTS.md
  CHANGELOG.md
  ROADMAP.md

  docs/
    admin/
      operating-model.md
      ai-workflows.md
      repo-conventions.md
      task-planning/
      decision-records/
      prompts/
    product/
      app-overview.md
      feature-specs/
      ux-flows/
    source/
      game/
      lore/
      rules/
      art-direction/
    archive/

  app/
    package.json
    src/
    tests/
    public/

  data/
    schemas/
    seed/
    exports/

  tools/
    scripts/
    validation/

  .github/
    ISSUE_TEMPLATE/
    PULL_REQUEST_TEMPLATE.md
    workflows/
```

## 5. Task System

GitHub Issues are the primary task queue.

Create an issue when work requires code changes, source document changes, workflow changes, implementation-impacting research, design decisions, reviewable AI output, or coordination between tools.

Small chat-only questions can stay in chat unless they create durable project work.

## 6. Issue Template

```markdown
## Goal
What should change?

## Context
What files, decisions, or prior work matter?

## Scope
What is included?

## Out of scope
What is excluded?

## Acceptance criteria
How do we know this is done?

## Suggested files
Likely files to inspect or modify.

## Checks
Tests, lint, build, preview, validation, or manual review.

## AI instructions
Tool-specific instructions for Codex, ChatGPT, or Replit.
```

## 7. Labels

Use a small label set.

Type labels:

```text
type:feature
type:bug
type:docs
type:refactor
type:research
type:admin
type:ai-task
```

Area labels:

```text
area:app
area:docs
area:data
area:workflow
area:rules
area:lore
area:art
```

Status labels:

```text
status:ready
status:blocked
status:needs-review
status:parked
```

## 8. Branch and PR Rules

Work should happen on branches, then move through PR review before merging.

Recommended branch patterns:

```text
feature/<short-task-name>
fix/<short-bug-name>
docs/<short-doc-task>
refactor/<short-refactor-name>
admin/<short-admin-task>
research/<short-research-task>
```

A PR should include:

- what changed;
- why it changed;
- linked issue;
- files touched;
- screenshots or preview notes for UI work;
- checks run;
- unresolved assumptions;
- doc update notes;
- follow-up issues if needed.

AI-generated PRs should stay small and reviewable.

## 9. Standard Work Loop

```text
1. Pick or create one GitHub Issue.
2. Clarify the goal and acceptance criteria.
3. Assign the best tool.
4. Create a branch.
5. Make the change.
6. Run checks.
7. Open a Pull Request.
8. Review the diff.
9. Revise if needed.
10. Merge.
11. Close the issue.
12. Create follow-up issues if needed.
```

## 10. Tool Assignment Rules

Use ChatGPT for planning, architecture, issue drafting, prompt drafting, workflow design, decision framing, source interpretation, and PR review support.

Use Codex for code implementation, test creation, code refactor, documentation edits against repo files, repo inspection, and candidate branch creation.

Use Replit for app preview, UI feel, runtime testing, browser-based editing, and deployment preview.

Use the user for design taste, canon approval, product direction, merge approval, scope decisions, and final acceptance.

## 11. Codex Task Prompt Pattern

```markdown
Read first:
- AGENTS.md
- README.md
- docs/admin/operating-model.md
- docs/admin/ai-workflows.md
- files linked in the issue

Task:
Implement the linked issue: [issue title or number].

Scope:
- [included work]

Out of scope:
- [excluded work]

Constraints:
- Preserve unrelated behavior.
- Keep changes scoped and reviewable.
- Add or update tests when practical.

Checks:
- Run relevant checks when practical.
- Report checks that could not be run.

Final report:
- files read;
- files created;
- files modified;
- checks or tests run;
- unresolved conflicts or assumptions;
- recommended next review step.
```

## 12. Replit Task Prompt Pattern

```markdown
Goal:
Preview or adjust [specific app behavior].

Source authority:
Use the current GitHub branch or linked PR as the source of truth.

Scope:
- [specific UI/runtime behavior]

Out of scope:
- unrelated app restructuring;
- broad design changes outside this task.

Validation:
- Confirm the app runs.
- Note visible errors.
- Capture screenshots or observations if UI changed.
- Push changes back through GitHub if edits are made.
```

## 13. Decision Records

Use lightweight decision records when a choice affects future project behavior.

Decision records belong in:

```text
docs/admin/decision-records/
```

Recommended filename pattern:

```text
ADR-0001-short-decision-name.md
```

Template:

```markdown
# ADR-0001 — Decision Title

## Status
Accepted | Proposed | Superseded

## Date
YYYY-MM-DD

## Context
Why this decision was needed.

## Decision
What was decided.

## Consequences
What changes because of this decision.

## Related issues / PRs
- #123
```

## 14. Definitions

### Definition of Ready

An issue is ready when it has a clear goal, scope, out-of-scope boundary, acceptance criteria, enough source context, and an expected check or review method.

### Definition of Done

A task is done when acceptance criteria are met, relevant checks are run or explicitly reported as skipped, the PR is reviewed, related docs or follow-up issues are handled, assumptions are captured, and the branch is merged or intentionally closed.

## 15. Anti-Patterns

Avoid:

- using ChatGPT memory as project truth;
- treating Replit editor state as canonical;
- giving Codex broad unsupervised cleanup tasks;
- making giant AI PRs;
- using zip packages as the primary project structure;
- creating dashboards before they solve a real coordination problem;
- duplicating task state across chat, Obsidian, GitHub, and local notes;
- merging AI changes without diff review;
- calling work done when checks or review were skipped without saying so.

## 16. Starter Implementation Checklist

Create or verify:

```text
README.md
AGENTS.md
ROADMAP.md
docs/admin/operating-model.md
docs/admin/ai-workflows.md
docs/admin/repo-conventions.md
docs/admin/task-planning/repo-first-task-planning-workflow.md
docs/admin/decision-records/
.github/ISSUE_TEMPLATE/
.github/PULL_REQUEST_TEMPLATE.md
.github/workflows/
```

Initial issues to create:

1. establish repo conventions;
2. establish AI workflow rules;
3. create app shell;
4. connect Replit to GitHub;
5. define first app milestone;
6. create first Codex-ready implementation issue.

## 17. Status and Integration Notes

This document is a candidate planning document.

Recommended placement:

```text
docs/admin/task-planning/repo-first-task-planning-workflow.md
```

It supplements, but does not replace, existing admin operating instructions until accepted.

If this model is accepted, create separate issues for migration, consolidation, or supersession of older workflow material.
