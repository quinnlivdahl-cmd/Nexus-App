# Nexus Handoff Template

Use this when transferring task context between Codex, ChatGPT, Replit, GitHub Issues, or a fresh work session.

Keep handoffs operational. Do not turn them into full chat transcripts.

## Header

Date:
Prepared by:
Workspace/repo path:
Controlling issue:
Planning anchor:
Suggested thread title:

## Context Summary


## Files / Sources Inspected


## Files Changed


## Progress State


## Closeout Evidence


## Decisions Made


## Blockers


## Unresolved Questions


## What Not To Redo


## Next Safe Action


## Continue Prompts

### Codex

```text

```

### ChatGPT

```text

```

### Replit

```text

```

## Thread Title Convention

Use this convention for Nexus work chat/thread titles when creating or naming a fresh Codex, ChatGPT, Replit, or GitHub-focused work thread:

```text
[Lane] | [Anchor] | [Short Task] | [State]
```

Keep titles short, searchable, and practical. Omit fields that do not add clarity.

When a tool can set a Codex thread title, set the title immediately after creating, forking, identifying, or continuing the thread. If the current tool cannot set the title, fill `Suggested thread title` in the handoff so the receiving session can apply it before continuing work.

Examples:

```text
App | #43 | Chat Focus Workflow
Plan | Issue 42 | Agent Intake Followups
Handoff | Chat Naming Convention | Parked
GitHub | #25 | Labels and Milestones
ChatGPT | Bridge Upload Refresh
Source Mirror | Index Maintenance
Playtest | E-43 Session 01
```

Use these lane tags as the stable vocabulary:

| Lane | Use for |
|---|---|
| `App` | Issue-bound Nexus app implementation |
| `Plan` | Planning-only or architecture/design work |
| `Handoff` | Parked/future transfer threads |
| `GitHub` | Repo, issue, label, milestone, CI/debug, or PR work |
| `Replit` | Replit-specific task execution or sync |
| `ChatGPT` | ChatGPT Project upload, context refresh, or searchability checks |
| `Source` | Live `00 Source` review or candidate source work |
| `Source Mirror` | Repo/app source snapshot and generated index upkeep |
| `Playtest` | Session/playtest state, DM run, or encounter test |
| `Archive` | Archive mining, review packets, or preserved candidates |

Anchor with the most useful identifier: a GitHub issue number, planning issue, roadmap lane, source domain, session name, or plain task label. Add a date only when chronology matters.

Use state suffixes sparingly:

| State | Meaning |
|---|---|
| `Parked` | Do not auto-start; wait for explicit user approval |
| `Active` | Current execution thread when several similar threads exist |
| `Blocked` | Waiting on a decision, auth, dependency, or source conflict |
| `Review` | Candidate output exists and needs user review |
| `Closeout` | Validation, commit, push, comment, or closure remains |

## Minimum Handoff Rules

- Include `Suggested thread title` when the handoff creates or continues work in a fresh chat/thread.
- Name the controlling issue when one exists.
- Name the planning anchor or roadmap lane.
- Separate inspected files from changed files.
- State whether the task is local-only, committed, pushed, ready to close, or closed.
- Include closeout evidence when the handoff ends a task.
- Include blockers and unresolved questions.
- Include one next safe action.
- Include platform-specific continue prompts when the handoff is meant to cross tools.
