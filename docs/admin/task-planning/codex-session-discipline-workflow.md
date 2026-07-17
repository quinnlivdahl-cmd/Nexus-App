# Codex Session Discipline Workflow

Status: active workflow spec
Controlling issue: GitHub Issue #43
Supplements:
- `AGENTS.md`
- `NEXUS_TASK_PACKET_TEMPLATE.md`
- `NEXUS_HANDOFF_TEMPLATE.md`
- `docs/admin/task-planning/nexus-review-rubric.md`
- `docs/chatgpt-project-bridge/PROJECT-INSTRUCTIONS.md`
- `.agents/skills/nexus-issue-workflow/SKILL.md`
- `.agents/skills/nexus-chatgpt-bridge/SKILL.md`

## Purpose

This workflow keeps Nexus Codex and ChatGPT work focused without losing useful side discoveries.

It does not replace GitHub Issues, the issue index, handoff template, task packet template, bridge docs, review rubric, or Nexus source authority. It gives those existing surfaces a shared session frame, side-item lifecycle, and independent review loop.

## Planning Ownership

Use exactly one owner for each kind of planning state:

| Information | Owner |
|---|---|
| Executable task state and acceptance criteria | Live GitHub Issues |
| Durable human-facing plans, findings, and progress | Obsidian Nexus hub `02 Planning` |
| Temporary current-session sequencing | The active chat or tool plan |
| Cross-session executable continuity | A linked GitHub Issue comment or approved handoff |

Temporary session plans are disposable coordination aids. Do not copy them into durable planning merely because a session is long or uses many tools. Create or update an Obsidian planning note only when the user requests durable planning or the work produces a human-facing plan, finding, or progress record worth retaining.

The repo `planning/` folder is a retired compatibility pointer, not an active planning overlay. Repo workflow documents may define stable behavior, but they do not own changing project plans or progress.

## Implementation Review Loop

For non-trivial Nexus work, use this loop:

```text
implement -> validate -> independent review -> targeted fixes -> re-review when needed -> closeout
```

Implementation belongs to the executor. Review belongs to an independent reviewer lane using the installed global `code-review` skill and `docs/admin/task-planning/nexus-review-rubric.md`.

The reviewer returns one of `PASS`, `PASS_WITH_NOTES`, `NEEDS_FIXES`, or `BLOCKED`. Any source-authority violation, missing required validation, or unmet acceptance criterion prevents `PASS`.

When the result is `NEEDS_FIXES`, the executor should make targeted fixes, rerun relevant validation, and request re-review of the changed surface. When the result is `BLOCKED`, the executor should name the missing context, authority, validation, approval, or external state before continuing.

## Shared Lifecycle

Use this lifecycle for side items:

```text
notice -> classify -> route -> record -> sync
```

- `notice`: recognize the side item without immediately pursuing it.
- `classify`: decide whether it is a side task, side finding, or tiny observation.
- `route`: choose the current approved destination.
- `record`: write it durably when the current task reaches a safe closeout point, unless it blocks current work.
- `sync`: mention where it went in the final report or handoff.

No useful side item should remain only in chat memory.

## Session Frame

For non-trivial Nexus work, start by identifying:

- controlling issue, packet, handoff, or user request;
- repo or workspace path being used;
- active goal;
- work mode: discovery, candidate output, live edit, validation, commit/push, or closeout;
- allowed file and external-system actions;
- sources to inspect first;
- out-of-scope areas;
- likely validation;
- split or stop conditions.

Keep the frame short. It is a guardrail, not a ceremony.

## On-Task Rule

On-task means advancing the active request, issue, session goal, required verification, or closeout.

Side items may be noticed and recorded. Do not pursue them unless:

- they block the current task;
- the user explicitly redirects;
- the current acceptance criteria require them;
- they are cheap routing or recording work at closeout.

Recording a side item is disciplined work. Solving the side item inside the wrong session is drift.

## Side-Item Classes

### Side Task

Actionable work that may need an existing issue update, a new issue, a task packet, a roadmap/index link, or a separate chat.

Examples:

- "This bridge index needs a validator check."
- "This canonical source path needs a later legacy-path refresh."
- "This issue should become a child issue with separate acceptance criteria."

### Side Finding

Useful evidence, risk, relationship, or planning note that may not need its own issue.

Examples:

- "Issue #42 already solved most of the template work."
- "The canonical source corpus has relevant historical mode discipline, but it is not app workflow authority."
- "This task is using a stale packet index."

### Tiny Observation

A small note worth preserving but not worth interrupting the current task.

Examples:

- "A README phrase is unclear."
- "A future script could check this index."
- "This naming convention should be reused next time."

Until the app repo has a dedicated observation log, route tiny observations to the nearest appropriate durable surface: issue closeout, existing issue comment, handoff, synced-chat packet, or task packet.

## Split Triggers

Recommend a new issue, new chat, or user scope decision when a side item:

- needs different files, source authority, repo, or tool permissions;
- changes the active goal or acceptance criteria;
- requires source placement or promotion decisions;
- would make the final report ambiguous;
- requires a different skill, mode, or platform lane;
- is useful but not necessary for the current deliverable;
- risks turning a small task into broad cleanup.

## Routing Destinations

Use existing destinations before inventing new ones.

| Side item kind | Default destination |
|---|---|
| Actionable side task | Existing issue comment, new GitHub issue, task packet, or roadmap/index entry |
| Executable task or acceptance change | Existing GitHub Issue or a new linked issue when distinct criteria are needed |
| Durable human-facing plan, finding, or progress | Obsidian Nexus hub `02 Planning` |
| Temporary session sequence | Active chat or tool plan; do not preserve by default |
| Cross-session executable continuity | Existing issue comment or approved handoff |
| ChatGPT-bound exploration | `docs/chatgpt-project-bridge/synced-chats/` or `task-packets/` |
| Concrete handoff | `NEXUS_HANDOFF_TEMPLATE.md` shape or `docs/chatgpt-project-bridge/handoffs/` |
| Tiny observation | Issue closeout, handoff, synced-chat packet, or future observation log |
| Source placement question | `.agents/skills/nexus-source-maintenance/SKILL.md`; do not edit canonical source without approval |

If no correct destination is clear, ask for the route in plain language.

## Duplicate And Cluster Check

Before creating a new issue, major issue comment, roadmap restructuring, or epic/child issue routing:

1. Check the controlling issue and recent related comments.
2. Check `NEXUS_ISSUE_INDEX.md`.
3. Search the repo for the key phrase or topic.
4. Prefer updating an existing issue when the work fits.
5. Create a linked child issue only when it needs distinct acceptance criteria.

Minor evidence comments do not need a full duplicate check.

## Mirrored Platform Specs

### Codex

Codex owns repo-current verification, local source inspection, implementation, validation, commits, pushes, issue evidence, and repair.

Codex should:

- frame non-trivial work before acting;
- inspect current repo/source truth before claims;
- keep active work tied to one issue, packet, gate, or user request;
- classify side items without chasing them;
- record side items at closeout when durable routing is needed;
- run relevant checks when practical;
- use the implement -> validate -> independent review -> targeted fixes -> re-review loop for non-trivial work;
- report local, committed, pushed, and GitHub states separately.

### ChatGPT Project

ChatGPT Project supports broad planning, brainstorming, issue shaping, synced-chat packets, task packets, and discussion that does not yet require local repo truth. Durable planning produced there still belongs in Obsidian `02 Planning`; executable work belongs in GitHub Issues.

ChatGPT should:

- use the same side-item classes and lifecycle;
- suggest a synced-chat, handoff, preservation packet, or task packet when context gets heavy;
- use approved bridge destinations and exact repo paths;
- avoid treating uploaded Project context as source or repo currentness;
- hand work back to Codex when repo inspection, validation, commits, pushes, or issue closeout are needed.

## Final Report / Closeout

If side items appeared, closeout should include:

- active task result;
- files or issues touched;
- checks run or skipped;
- reviewer result and unresolved reviewer findings when the review gate applies;
- side items routed;
- records created or updated;
- follow-up chats or issues created or recommended;
- next review step.

Closeout is not always the durable record. It is the index of where durable records went.

## Reusable Prompt Template

```text
Stay focused on this Nexus task.

Goal:
[one-sentence goal]

Controlling context:
[issue, packet, handoff, source doc, or repo path]

Allowed actions:
- [read files / create candidate output / edit repo files / validate / commit / push / update issue]

Scope:
- In scope: [specific files/folders/topics]
- Out of scope: [specific exclusions]

Before acting, state the session frame: repo path, work mode, source of truth, allowed actions, likely checks, and stop/split triggers.

If adjacent issues appear, do not solve them immediately. Classify them as side task, side finding, or tiny observation. Route them at closeout unless they block the current task.

End with:
- files read;
- files created;
- files modified;
- checks run;
- unresolved assumptions;
- side items and where they were routed;
- recommended next review step.
```

## Do Not Automate Yet

Do not build these in Issue #43:

- duplicate or near-duplicate issue checker;
- roadmap or epic clustering helper;
- tiny-observation mining skill;
- side-item closeout recorder;
- ChatGPT packet opener or indexer.

Keep them as future follow-up candidates until the manual workflow proves useful.
