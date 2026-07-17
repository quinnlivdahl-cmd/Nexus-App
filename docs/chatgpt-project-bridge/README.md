# ChatGPT Project Bridge

Status: active bridge layer
Repo: `quinnlivdahl-cmd/Nexus-App`
Local path: `C:\Users\Quintin Livdahl\Repos\Nexus-App\docs\chatgpt-project-bridge`

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

Reupload notice rule: whenever any upload-set file above changes, the closeout report must explicitly warn that ChatGPT Project baseline context is stale until those changed files are reuploaded or pasted into the Project and confirmed. The warning should name the changed upload-set files.

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

For long chats with accepted prose, decisions, source-ready language, or system contracts, use the `Long-Chat Preservation Procedure` in `04-REFRESH-AND-READINESS-RULES.md` before relying on a large handoff prompt. Prefer a durable repo artifact plus a short pointer to that artifact.

ChatGPT should suggest a synced-chat packet or handoff proactively when a Project chat is getting context-heavy. The trigger is context pressure in the active chat, not only a user request for a large handoff prompt.

## Nexus-App Canonical Source

The Nexus-App canonical source corpus is:

`docs/nexus-game-source/source`

This path is the durable repo home for the user-designated source corpus for source-backed repo/app work, exact GitHub retrieval, and bridge-indexed ChatGPT discussion. It was renamed from the dated 2026-06-10 rebuild folder on 2026-06-14.

The Obsidian Nexus note/index layer is:

`C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game`

The Obsidian source pointer-card folder is:

`C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game\00 Source`

The Drive payload lane is:

`G:\My Drive\10_Projects\Nexus Game`

When a task depends on Obsidian project-memory or Drive payload state, use local inspection instead of assuming a ChatGPT Project upload proves those surfaces are current. ChatGPT should use the repo canonical source through explicit indexed paths, source status notes, and currentness caveats.

Because ChatGPT may not reliably enumerate GitHub tree URLs, this source pool should include a deterministic index file such as:

- `docs/nexus-game-source/source/SOURCE-INDEX.md`
- optionally `docs/nexus-game-source/source/SOURCE-INDEX.json`

The index should list exact repo paths, source roles, domain ownership, status/currentness notes, and retrieval keywords so ChatGPT can fetch needed files directly instead of relying on broad permanent uploads.

When canonical source files change, Codex should regenerate the index with `corepack pnpm run source:index` and validate it with `corepack pnpm run validate:workflow`.

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

- Nexus-App canonical source is `docs/nexus-game-source/source`.
- Nexus-App repo source is canonical for Nexus source docs.
- Obsidian Nexus notes are an index/current-state layer, with generated source pointer cards under `00 Source`, at `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game`.
- Drive Nexus payloads live at `G:\My Drive\10_Projects\Nexus Game`.
- App workflow and implementation authority lives in this repo and GitHub Issues.
- ChatGPT Project context is curated, useful, and allowed to be stale when labeled. It is not source authority.
- The Nexus-App canonical source is the repo-side source corpus for discussion, targeted retrieval, and app source-pack work. Generated Obsidian cards point back to it; they do not duplicate it.
- Upload/searchability checks prove only ChatGPT Project currentness for a named scope. They do not prove repo source, Obsidian project-memory or pointer-card freshness, or Drive payload currentness.

## Refresh Rule

Do not claim ChatGPT Project has been refreshed until the selected files have actually been uploaded/pasted and that action is confirmed or logged.

When the bridge files change, future agents should update this repo first, validate the workflow, then prepare a named upload set for ChatGPT Project.
