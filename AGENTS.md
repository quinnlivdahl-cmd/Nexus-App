# Nexus App Agent Instructions

## Scope

These instructions apply throughout `quinnlivdahl-cmd/Nexus-App` unless a nearer `AGENTS.md` adds implementation-specific rules.

- Inherit global Codex and workspace safety rules; this file only specializes Nexus behavior.
- Resolve the active checkout with `git rev-parse --show-toplevel` instead of inferring it from a folder name.
- Treat repo-root Markdown workflow files as shared repo content unless explicitly marked local-only.
- Use `docs/admin/nexus-distributed-surfaces.md` to find the single owner for maintained absolute Nexus paths.

## Stable Startup

Before substantive work, read only the context needed for the task:

1. `CONTEXT-MAP.md`, relevant canonical source, and applicable accepted ADRs.
2. The controlling user request or live GitHub Issue; use `NEXUS_ISSUE_INDEX.md` as a repo-readable map, not live status authority.
3. Relevant canonical source, implementation, or workflow files named by the task.
4. The nearest scoped `AGENTS.md` for any folder being changed.

Do not load transition records, historical plans, bridge packets, or old roadmaps by default. Read them only when the task needs their provenance or their owning workflow points to them.

## Product and Authority

Nexus is a local-first 2D spatial sci-fi party RPG with a fixed Tilted Top-Down presentation, persistent explorable Locations, in-world interaction, and Turn-Based Mode inside one spatial runtime. `Companion` is legacy package naming, not a separate product.

- `docs/nexus-game-source/source` is the canonical current textual game definition.
- Accepted ADRs control affected claims until reconciliation; unaffected source remains current. After reconciliation, use the domain document for the current rule and the ADR for rationale.
- Application code is implementation authority. Report source/code mismatches instead of silently rewriting either side.
- GitHub Issues transfer work and acceptance criteria; they do not create game canon.
- Historical DM-chat, alpha, and roadmap material remains retrievable but is non-controlling.

## Repository Boundaries

- Keep app code, scripts, package configuration, repo-local workflows, issue support, bridge packets, and canonical source in this repo.
- Obsidian owns human-facing project memory, planning, dashboards, and generated pointer navigation.
- Drive owns bulky materials, workbench outputs, exports, and handoff bundles.
- Obsidian `00 Source` cards are navigation only; never treat them as a second source corpus or hand-edit them as source.
- Do not bulk-copy material between repo, Obsidian, and Drive without explicit task scope.
- Preserve local-first behavior. Public hosting, auth, monetization, multi-user play, and cloud sync require explicit scope.

## Nexus Git Ownership Override

- A current user request authorizes routine task-scoped Git work on a task branch: inspect, isolate when useful, stage relevant files, commit, validate, push, and prepare a pull request.
- Codex owns the technical Git choices. Do not ask Quintin to choose branches, commits, rebases, or worktree mechanics.
- Changing `main` requires Quintin's explicit approval of the produced result. After approval, perform and verify ordinary integration and closeout.
- Pause before discarding uncertain work, materially rewriting shared history, bypassing protections or failed checks, affecting credentials or accounts, deploying, or selecting between competing product outcomes.
- Inspect branch, worktree, dirty, and upstream state before mutation, and preserve unrelated work.

## Workflow Dispatch

| Need | Owning surface |
|---|---|
| Product language and authority | `CONTEXT-MAP.md`, `docs/nexus-game-source/README.md`, relevant canonical source, and `docs/adr/README.md` |
| Issues, task intake, naming, and closeout | `.agents/skills/nexus-issue-workflow/SKILL.md`, `docs/agents/issue-tracker.md`, `NEXUS_ISSUE_INDEX.md`, and the task/handoff templates |
| Session focus, side items, temporary planning, and independent review | `docs/admin/task-planning/codex-session-discipline-workflow.md`, the active chat/tool planner under Planning Ownership #81, the installed global `code-review` skill, and `docs/admin/task-planning/nexus-review-rubric.md` |
| Source routing and generated indexes | `.agents/skills/nexus-source-maintenance/SKILL.md` and `docs/nexus-game-source/README.md` |
| ChatGPT Project bridge and handoffs | `.agents/skills/nexus-chatgpt-bridge/SKILL.md` and `docs/chatgpt-project-bridge/README.md` |
| Roadmap mirror and generated indexes | `.agents/skills/nexus-roadmap-maintenance/SKILL.md` and `docs/nexus-roadmap/README.md` |
| Non-image visual output | The installed global `codex-visual-output-workflow` skill; `docs/visual-output-starter` is reusable historical seed material |
| Maintained local paths and cross-surface roles | `docs/admin/nexus-distributed-surfaces.md` |

## Execution and Validation

- Keep work tied to one explicit request or issue when practical; route adjacent discoveries instead of expanding scope silently.
- Inspect current implementation before making claims and prefer small, reversible, verifiable changes.
- Run checks named by the nearest scoped instructions. Workflow changes must run `corepack pnpm run validate:workflow`.
- Canonical source changes must also regenerate and check the source index as directed by `docs/nexus-game-source/README.md`.
- Non-trivial work requires independent review before closeout; use the installed global `code-review` skill and the Nexus review rubric rather than duplicating their procedure here.
- Do not change global `.codex` behavior, publish/deploy, or mutate external accounts unless the user explicitly scopes it.
