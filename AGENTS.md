# Nexus App Agent Instructions

## Scope

These instructions apply to the Nexus app repo at:

`C:\Users\Quintin Livdahl\Repos\Nexus-App`

This repo should mirror the GitHub repo `quinnlivdahl-cmd/Nexus-App` after review, commit, and push. Repo-root Markdown workflow files are intended to be shared repo content unless explicitly marked local-only.

## Global Rule Inheritance

This repo follows the global Codex agent rules at:

`C:\Users\Quintin Livdahl\.codex\AGENTS.md`

The Codex Workflow Control project mirrors and expands those reusable workflow rules at:

`C:\Users\Quintin Livdahl\Projects\Codex Workflow Control - 2026-06-14 - Active\AGENTS.md`

Local Nexus rules may specialize those global rules, but should not silently contradict them.

If a Nexus-specific rule must override a global rule, make the override explicit and preserve the reason in the relevant repo or workflow-control surface.

## Required Read

Before app work, read:

1. `CONTEXT-MAP.md`, the relevant context, and `docs/adr/README.md`.
2. `NEXUS_ISSUE_INDEX.md` when present.
3. `NEXUS_ISSUE_TRANSITION.md`.
4. `replit.md`.
5. `docs/admin/nexus-distributed-surfaces.md`.
6. `docs/nexus-game-source/README.md`.
7. Relevant Nexus source docs named by the task, roadmap, or app planning files.
8. `NEXUS_LOCAL_PLAYABLE_ALPHA.md` only as historical planning evidence until the revised implementation contract and finish line are integrated.
9. `docs/admin/task-planning/codex-session-discipline-workflow.md` for non-trivial planning, handoff, issue, or multi-step Codex work.

## Product Direction

Nexus Game is the primary local playtest and product surface. The application historically described as the "companion app" is becoming the game itself; `companion` is legacy implementation naming, not the product's role.

The target is a local-first, polished 2D/slight-isometric indie RPG/roguelike with spatial exploration and non-combat play, integrated tactical encounters, play aids, scene imagery, and source-backed rules and lore. Text supports the experience rather than constituting the whole game.

Replit may be used to implement tasks, but the app must remain runnable from the user's local machine.

Public release, hosted multi-user play, auth, monetization, and cloud sync are out of scope unless the user explicitly reopens them.

## Gameplay Rules

- DM chat and encounters are one gameplay flow.
- Encounters should arise from narrative play and return their results to narrative play.
- AI should handle narration. App code/data should increasingly hold rules, lore, state, and mechanical authority.
- Lattice-100 is a resolution mechanic. Do not treat it as world lore unless source docs explicitly say so.
- Source Markdown in `docs/nexus-game-source/source` is design authority. This repo is also implementation authority for app behavior.

## Task Handling

GitHub Issues are the active task packets for this repo.

Refer to every GitHub Issue by a short human-readable name followed by its number, for example `Local Save Export #17`.

Do not refer to issues by number alone. If the official title is unknown, too long, or awkward in running chat, make up a concise working name and keep the issue number after it.

Apply the same rule to pull requests and other numbered GitHub artifacts. Say `Source Context Pack PR #52`, `Issue 9 Source Context Pack #9`, or another short name plus number. Do not write bare references like `#9`, `Issue 9`, `PR #52`, or `52?` unless quoting a literal GitHub UI label or command output.

`NEXUS_ISSUE_INDEX.md` is the AI-readable queue/control surface for active, blocked, parked, and completed issue work. It is intentionally a Markdown index first; GitHub Projects may be added later as a visual board, but it is not required for batch-one workflow.

Use `NEXUS_ISSUE_TRANSITION.md` to understand current queue order, gate sequencing, and any remaining local-only planning residue until the index fully supersedes that role.

Use `NEXUS_TASK_PACKET_TEMPLATE.md` when shaping new GitHub issues or task-intake outputs.

Use `NEXUS_HANDOFF_TEMPLATE.md` when transferring context between Codex, ChatGPT, Replit, GitHub Issues, or a fresh work session.

Use the thread title convention in `NEXUS_HANDOFF_TEMPLATE.md` when creating, forking, sending, or naming fresh Nexus work threads. If a Codex thread title tool is available, set the title immediately after creating or identifying the thread. If the title cannot be set from the current tool, include the suggested thread title in the handoff.

Fresh handoff chats must not auto-start app work merely because a handoff, continue prompt, issue packet, or next-safe-action exists. A receiving chat may read and summarize the handoff, but it must wait for explicit current user approval before moving queue files, editing repo files, running implementation/validation commands, committing, pushing, updating issues, or closing anything.

For ChatGPT Project sync, treat broad planning, general design discussion, speculative architecture, issue-shaping, and "what should we do next?" work as normal ChatGPT Project work unless current local repo truth, source inspection, file edits, validation, commits, pushes, issue updates, or source-authority checks are needed. Codex should actively suggest moving that kind of discussion to ChatGPT Project to conserve Codex usage.

When the user asks Codex to create a synced chat, planning chat, or ChatGPT Project context for GPT/Stewy to pull, do not create a Codex thread unless the user explicitly asks for a Codex thread. The correct Codex action is to create or update the repo-side bridge packet, update the matching bridge index, validate the workflow when practical, commit and push the repo change if the user expects GPT to find it from GitHub, and return the exact GitHub/repo path plus a copy-ready ChatGPT prompt. A Codex thread is not a substitute for a ChatGPT Project synced-chat packet.

When the user references ChatGPT, Stewy, a synced chat, a planning chat, or a non-issue handoff, check these repo bridge locations before assuming context is missing:

1. `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
2. `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
3. Any specific bridge packet path named by the user or ChatGPT under `docs/chatgpt-project-bridge/`

When creating Replit tasks, use the task format in `NEXUS_LOCAL_PLAYABLE_ALPHA.md` plus any relevant Replit add-on from the task packet template.

When doing Codex work sessions, keep work tied to one roadmap gate, one explicit task packet, or one GitHub issue when practical.

## Agent skills

### Issue tracker

GitHub Issues in `quinnlivdahl-cmd/Nexus-App` are the live execution tracker. External pull requests are not a request or triage surface. Preserve Nexus issue naming and supporting planning surfaces. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the Nexus status-prefixed mapping for Matt Pocock's five triage roles. See `docs/agents/triage-labels.md`.

### Domain docs

Use a multi-context layout with `Nexus Game` and `Nexus Project Operations`. See `docs/agents/domain.md`.

## Session Discipline

For non-trivial Nexus work, use `docs/admin/task-planning/codex-session-discipline-workflow.md` and `.agents/skills/nexus-session-discipline/SKILL.md`.

For complex multi-step work that needs durable cross-session context, use the repo planning-with-files overlay in `planning/`:

- `planning/task_plan.md` for phase tracking, decisions, and errors.
- `planning/findings.md` for research and verification findings.
- `planning/progress.md` for session logs and validation results.
- `planning/planning-rules.md` for the reusable planning rules.

Start with a compact session frame when the task is not a simple answer:

- controlling issue, packet, handoff, or user request;
- repo/workspace path;
- active goal;
- work mode: discovery, candidate output, live edit, validation, commit/push, or closeout;
- allowed file and external-system actions;
- sources to inspect first;
- out-of-scope areas;
- likely validation;
- split or stop conditions.

Side items may be noticed and recorded, but should not be pursued unless they block current work, are explicitly requested, or are needed for acceptance criteria. Classify side items as:

- side task: actionable work that may need an issue, task packet, roadmap/index entry, or separate chat;
- side finding: useful evidence, risk, or relationship to record durably;
- tiny observation: a small note to preserve at closeout if worth keeping.

Route side items to existing approved destinations: GitHub issue/comment, `NEXUS_ISSUE_INDEX.md`, roadmap/index, synced-chat packet, task packet, handoff, or source-router workflow. If no destination is clear, ask for the route in plain language.

## Independent Review

For non-trivial Nexus implementation, workflow, source-routing, bridge, handoff, or issue-closeout work, run an independent review after implementation and local validation and before calling the work complete. Use `.agents/skills/nexus-reviewer/SKILL.md` and `docs/admin/task-planning/nexus-review-rubric.md`.

Reviewer statuses are `PASS`, `PASS_WITH_NOTES`, `NEEDS_FIXES`, and `BLOCKED`. Any source-authority violation, missing required validation, or unmet acceptance criterion prevents `PASS`.

The normal loop is: implement -> validate -> independent review -> targeted fixes -> re-review when needed -> closeout. Reviewer findings should cite evidence with paths or command output and give targeted fix instructions.

## Progress and Closeout

For issue-based work, keep progress visible:

- say what is being checked before broad claims;
- name the current phase when work moves from intake to implementation, validation, commit, push, or GitHub closeout;
- distinguish done locally from done on GitHub;
- include side items and closeout routing when side items appeared;
- do not call an issue complete until required repo changes are committed, pushed, validated, and the GitHub issue is ready to close or already closed.

Use this closeout order for GitHub issue tasks:

1. Validate the work locally.
2. Commit and push the relevant repo changes.
3. Update `NEXUS_ISSUE_INDEX.md` so the issue state matches reality.
4. Add a final GitHub issue comment with evidence.
5. Close the GitHub issue when the acceptance criteria are satisfied.

Future scripts may automate this sequence, but the human-readable evidence should stay clear enough to review without a script.

## Repo, Vault, and Source Boundaries

- This repo is the canonical Nexus source and app implementation surface, including text source docs.
- The Nexus-App canonical source path is `docs/nexus-game-source/source`. It is the durable repo home for game source documents.
- The Obsidian note/index layer is `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game`.
- The Obsidian source folder is `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game\00 Source`; treat it as generated pointer-card navigation only, never as a copied source tree or independent source authority.
- The Drive payload home is `G:\My Drive\10_Projects\Nexus Game`.
- Keep bulky generated artifacts, handoff bundles, zips, candidate runs, and workbench outputs in Drive or purpose-built repo paths, not in the Obsidian note layer.
- Link between repo docs, Obsidian notes, and Drive payloads where useful, but do not bulk-copy one surface into another.

- Do not bulk-copy Obsidian `00 Source`, Drive payloads, or archive material into this repo unless the user explicitly approves that direction.
- Treat the canonical repo source as the app/ChatGPT source corpus for context-pack and rules-core work. Do not overwrite it from Obsidian, Drive, or archive material unless explicitly approved.
- Do not compare Obsidian pointer cards as if they were a second source corpus. Inspect the canonical repo source directly; report stale or broken cards as navigation drift.
- When canonical source docs are added, removed, renamed, or changed, use `.agents/skills/nexus-source-index-maintainer/SKILL.md` and regenerate the index with `corepack pnpm run source:index` or `node scripts/update-source-index.mjs`.
- Do not copy canonical source documents into Obsidian for browsing. Refresh generated pointer cards through the Obsidian navigation workflow when repo paths change.
- Treat ChatGPT project files as curated drafting/playtest context, not as the primary source-management layer.
- The repo-trackable ChatGPT Project bridge layer lives at `docs/chatgpt-project-bridge`. Those files are upload-ready context for the ChatGPT Nexus Project, but upload is not complete until the user confirms it or a refresh ledger records it.
- ChatGPT Project synced-chat, handoff, preservation, and task packets must use approved repo destinations under `docs/chatgpt-project-bridge` unless a more specific repo path is explicitly approved by the user or a controlling issue.
- Do not treat GitHub Issues as game/source authority; issues transfer work, context, and acceptance criteria.
- Do not treat local implementation shortcuts as Nexus rules.
- If source docs and app implementation disagree, report the mismatch and avoid silent rule rewrites.

## Code Work

For code work:

- inspect the current implementation before making claims;
- preserve local-first behavior;
- prefer small verifiable changes;
- run checks when dependencies are available;
- if `pnpm` is unavailable, report that as a Gate A blocker rather than guessing test results.

## Important Current Blockers

- Local pnpm availability must be proven.
- Browser-side API key storage is prototype-only and should not remain the default runtime path.
- Persistence is browser localStorage only until save export/import or file-backed local saves are implemented.
- The app still needs a new app-native campaign seed.
- Rules enforcement is mostly prompt-driven and needs code-backed minimum mechanics.
