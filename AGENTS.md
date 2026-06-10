# Nexus App Agent Instructions

## Scope

These instructions apply to the Nexus app repo at:

`C:\Nexus Mother Folder\01 REPOS\03 Nexus App\Nexus-App\Nexus-App`

This repo should mirror the GitHub repo `quinnlivdahl-cmd/Nexus-App` after review, commit, and push. Repo-root Markdown workflow files are intended to be shared repo content unless explicitly marked local-only.

## Required Read

Before app work, read:

1. `NEXUS_ISSUE_INDEX.md` when present.
2. `NEXUS_ISSUE_TRANSITION.md`.
3. `NEXUS_LOCAL_PLAYABLE_ALPHA.md`.
4. `replit.md`.
5. The workspace instructions at `C:\Nexus Mother Folder\AGENTS.md`.
6. Relevant Nexus source docs named by the task, roadmap, or app planning files.

## Product Direction

The app is the primary local playtest surface for Nexus.

The target is a local-first text RPG application with DM-led narrative play, integrated encounters, TacMaps, play aids, scene images, and source-backed rules/lore.

Replit may be used to implement tasks, but the app must remain runnable from the user's local machine.

Public release, hosted multi-user play, auth, monetization, and cloud sync are out of scope unless the user explicitly reopens them.

## Gameplay Rules

- DM chat and encounters are one gameplay flow.
- Encounters should arise from narrative play and return their results to narrative play.
- AI should handle narration. App code/data should increasingly hold rules, lore, state, and mechanical authority.
- Lattice-100 is a resolution mechanic. Do not treat it as world lore unless source docs explicitly say so.
- Source Markdown is design authority. This repo is implementation authority for app behavior.

## Task Handling

GitHub Issues are the active task packets for this repo.

`NEXUS_ISSUE_INDEX.md` is the AI-readable queue/control surface for active, blocked, parked, and completed issue work. It is intentionally a Markdown index first; GitHub Projects may be added later as a visual board, but it is not required for batch-one workflow.

Use `NEXUS_ISSUE_TRANSITION.md` to understand current queue order, gate sequencing, and any remaining local-only planning residue until the index fully supersedes that role.

Use `NEXUS_TASK_PACKET_TEMPLATE.md` when shaping new GitHub issues or task-intake outputs.

Use `NEXUS_HANDOFF_TEMPLATE.md` when transferring context between Codex, ChatGPT, Replit, GitHub Issues, or a fresh work session.

When creating Replit tasks, use the task format in `NEXUS_LOCAL_PLAYABLE_ALPHA.md` plus any relevant Replit add-on from the task packet template.

When doing Codex work sessions, keep work tied to one roadmap gate, one explicit task packet, or one GitHub issue when practical.

## Progress and Closeout

For issue-based work, keep progress visible:

- say what is being checked before broad claims;
- name the current phase when work moves from intake to implementation, validation, commit, push, or GitHub closeout;
- distinguish done locally from done on GitHub;
- do not call an issue complete until required repo changes are committed, pushed, validated, and the GitHub issue is ready to close or already closed.

Use this closeout order for GitHub issue tasks:

1. Validate the work locally.
2. Commit and push the relevant repo changes.
3. Update `NEXUS_ISSUE_INDEX.md` so the issue state matches reality.
4. Add a final GitHub issue comment with evidence.
5. Close the GitHub issue when the acceptance criteria are satisfied.

Future scripts may automate this sequence, but the human-readable evidence should stay clear enough to review without a script.

## Repo and Source Boundaries

- Do not bulk-copy Obsidian `00 Source` content into this repo in batch-one workflow work.
- Live vault source is now domain-first at `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`.
- Nexus source has an approved domain-first snapshot in `docs/nexus-domain-source-rebuild-2026-06-10/source`.
- The local app mirror of the same snapshot is `C:\Nexus Mother Folder\03 APP\Nexus AI DM App\app docs\nexus-domain-source-rebuild-2026-06-10`.
- The snapshot was created before live migration, so its `legacy_paths` may still need a downstream refresh.
- Treat the snapshot as app-side source reference for context-pack and rules-core work, but do not treat it as authority to delete or overwrite live vault source.
- Treat ChatGPT project files as curated drafting/playtest context, not as the primary source-management layer.
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
