---
title: "Repo Collaboration Workflow"
project: "Nexus App"
doc_status: "planning"
source_role: "workflow_handoff"
created: "2026-06-08"
created_by: "ChatGPT Steward"
repo_path: ".agents/plans/2026-06-08_repo-collaboration-workflow.md"
intended_use:
  - "Shared workflow model for ChatGPT, Codex, Replit, and GitHub"
  - "Planning input for app-development collaboration"
  - "Not app runtime source"
---

# Repo Collaboration Workflow

## 1. Working principle

The GitHub repository is the shared operational workspace for Nexus app planning, implementation notes, Codex tasks, Replit work, and ChatGPT handoff files.

This workflow is meant to reduce manual copy/paste transfer between tools. When useful, planning and task files should be written directly into the repo so Codex and Replit can consume them in place.

## 2. Platform roles

### ChatGPT / Steward

Primary use:

- review repo structure and architecture;
- prepare implementation plans;
- write repo-readable planning files;
- prepare Codex/Replit task briefs;
- identify source/rules/design dependencies;
- review reports from Codex or Replit;
- preserve decisions in lightweight planning docs.

Default write lane:

```text
.agents/plans/
.agents/tasks/
```

ChatGPT should avoid editing app code unless explicitly instructed.

### Codex

Primary use:

- edit repo files;
- refactor app code;
- create scaffolds;
- run typechecks/tests;
- produce implementation reports;
- convert planning docs into code changes.

Default read lanes:

```text
.agents/plans/
.agents/tasks/
AGENTS.md
```

Default report lane:

```text
.agents/reports/
```

Codex should end tasks with:

- files read;
- files created;
- files modified;
- checks/tests run;
- unresolved conflicts or assumptions;
- recommended next review step.

### Replit

Primary use:

- run and preview the app;
- support live UI/runtime iteration;
- verify app behavior visually;
- make quick app changes when appropriate;
- surface runtime issues back into repo-readable notes.

Replit should treat repo planning/task docs as working instructions when they are explicitly referenced.

### GitHub

Primary use:

- shared source of truth for repo-visible work;
- durable storage for plans, task briefs, code, reports, and commits;
- handoff surface between ChatGPT, Codex, Replit, and the user.

## 3. File lanes

Use these lanes by default:

```text
.agents/plans/   = planning and architecture notes
.agents/tasks/   = specific implementation task briefs
.agents/reports/ = Codex/Replit completion reports
.agents/memory/  = concise repo-local memory or architecture notes
artifacts/nexus-companion/src/ = current Nexus app code
lib/ = shared packages when code stabilizes enough to extract
scripts/ = repo utility scripts
```

## 4. Write rules

- Planning docs may be written directly to `.agents/plans/`.
- Specific implementation briefs may be written to `.agents/tasks/`.
- Completion reports may be written to `.agents/reports/`.
- App code changes should be scoped and checked.
- Legacy files should not be deleted during architecture transitions unless a replacement path is confirmed.
- GPT-DM files should be preserved while the API-DM-plus-rules-core replacement path is being built.
- Broad repo restructures should be planned before implementation.

## 5. Standard handoff pattern

For a new implementation task:

1. ChatGPT/Steward writes a planning or task file into `.agents/`.
2. Codex reads the file and implements a scoped change.
3. Codex runs relevant checks.
4. Codex writes or returns a report with files read/changed and checks run.
5. ChatGPT/Steward reviews the report and recommends the next task.
6. Replit previews or validates runtime/UI behavior when useful.

## 6. Current priority

The immediate app priority is to evolve the alpha from:

```text
API DM as narrator + rules authority + state mutator
```

into:

```text
API DM as narrator / interpreter
+ deterministic rules core as mechanical authority
+ compact context broker for low-cost, high-quality DM calls
```

Related plan:

```text
.agents/plans/2026-06-08_api-dm-rules-core-plan.md
```

## 7. Non-goals

This workflow doc does not define Nexus game rules, lore, ability trees, combat balance, or final app architecture.

It only defines how the active tools should coordinate through the repo.
