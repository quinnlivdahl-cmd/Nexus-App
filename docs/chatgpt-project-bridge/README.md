# ChatGPT Project Bridge

Status: active bridge layer
Repo: `quinnlivdahl-cmd/Nexus-App`
Local path: `C:\Nexus Mother Folder\01 REPOS\03 Nexus App\Nexus-App\Nexus-App\docs\chatgpt-project-bridge`

## Purpose

This folder is the repo-trackable bridge layer for the ChatGPT Nexus Project.

The files here are designed to be uploaded or pasted into the ChatGPT Project as curated project context. The app repo remains the durable source of these bridge files. ChatGPT Project consumes them as external context for discussion, drafting, brainstorming, planning, and playtest support.

ChatGPT Project should be the normal lane for broad planning, general design discussion, speculative architecture, issue-shaping, and next-work exploration when local repo inspection or edits are not yet needed. Codex should be used for current repo truth, local source inspection, file edits, validation, commits, pushes, issue updates, and source-authority checks.

## Upload Set

Upload or paste these files into ChatGPT Project together when refreshing the bridge baseline:

1. `00-BOOTSTRAP.md`
2. `01-SLOT-MAP.md`
3. `02-GLOBAL-PROJECT-INSTRUCTIONS.md`
4. `03-OPERATING-MODEL.md`
5. `04-REFRESH-AND-READINESS-RULES.md`
6. `20-SOURCE-AUTHORITY-SUMMARY.md`
7. `90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md`

`README.md` may be uploaded too, but its main job is repo-side orientation.

Do not upload changing packet indexes as permanent ChatGPT Project Sources. Files such as `synced-chats/SYNC-INDEX.md`, `handoffs/HANDOFF-INDEX.md`, synced-chat packets, handoff packets, preservation packets, task packets, evolving drafts, and source draft candidates live in the GitHub repo as current working artifacts. ChatGPT should use the stable bridge files to learn the exact repo paths, then fetch, request, or ask Codex to inspect the current GitHub files when current packet state matters.

## Synced Chat Destinations

Use these repo destinations when ChatGPT Project needs to send context back to Codex without making the packet its own GitHub issue:

- synced chat index: `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
- synced chat packets: `docs/chatgpt-project-bridge/synced-chats/YYYY-MM-DD-<topic>.md`
- non-issue handoff index: `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
- non-issue handoff packets: `docs/chatgpt-project-bridge/handoffs/YYYY-MM-DD-<topic>.md`
- long-chat preservation packets: `docs/chatgpt-project-bridge/preservation/YYYY-MM-DD-<topic>.md`
- targeted task packets: `docs/chatgpt-project-bridge/task-packets/YYYY-MM-DD-<issue-or-topic>.md`
- evolving game-system drafts: `docs/game-system-contracts/drafts/<TOPIC>_WORKING_DRAFT.md`
- source draft candidates: `docs/source-draft-candidates/YYYY-MM-DD-<domain>-<topic>.md`

ChatGPT should not invent alternate destinations. Synced chat packets and handoffs are context, not execution approval.

ChatGPT should suggest a synced-chat packet or handoff proactively when a Project chat is getting context-heavy. The trigger is context pressure in the active chat, not only a user request for a large handoff prompt.

## Nexus Source Mirror

A repo-side Nexus Source Mirror may exist at:

`docs/nexus-domain-source-rebuild-2026-06-10/source`

The physical path is retained from the 2026-06-10 domain-source rebuild for compatibility. Its current repo role is the ongoing source mirror for richer ChatGPT discussion and exact GitHub retrieval, but it is not automatically live source authority. ChatGPT should use it through explicit indexed paths, source status notes, and currentness caveats.

Because ChatGPT may not reliably enumerate GitHub tree URLs, this source pool should include a deterministic index file such as:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`
- optionally `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.json`

The index should list exact repo paths, source roles, domain ownership, status/currentness notes, and retrieval keywords so ChatGPT can fetch needed files directly instead of relying on broad permanent uploads.

When mirror files change, Codex should regenerate the index with `corepack pnpm run source:index` and validate it with `corepack pnpm run validate:workflow`.

## Nexus Roadmap

The repo-accessible roadmap surface is:

`docs/nexus-roadmap`

Use these exact paths for roadmap retrieval and issue linkage:

- `docs/nexus-roadmap/README.md`
- `docs/nexus-roadmap/ROADMAP.md`
- `docs/nexus-roadmap/ROADMAP-INDEX.md`
- `docs/nexus-roadmap/ROADMAP-INDEX.json`

The roadmap is planning context, not Nexus source canon. `NEXUS_ISSUE_INDEX.md` remains the active issue queue/control surface.

When roadmap lane mapping or issue linkage changes, Codex should regenerate the index with `corepack pnpm run roadmap:index` and validate it with `corepack pnpm run validate:workflow`.

## Authority Boundaries

- Live source authority is `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`.
- App workflow and implementation authority lives in this repo and GitHub Issues.
- ChatGPT Project context is curated, useful, and allowed to be stale when labeled. It is not source authority.
- The Nexus Source Mirror is a repo-side context source for discussion and targeted retrieval. It does not override live local source authority unless the local workflow explicitly promotes or verifies it.
- Upload/searchability checks prove only ChatGPT Project currentness for a named scope. They do not prove live source currentness.

## Refresh Rule

Do not claim ChatGPT Project has been refreshed until the selected files have actually been uploaded/pasted and that action is confirmed or logged.

When the bridge files change, future agents should update this repo first, validate the workflow, then prepare a named upload set for ChatGPT Project.
