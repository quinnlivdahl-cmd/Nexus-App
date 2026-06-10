# ChatGPT Project Bridge

Status: active bridge layer
Repo: `quinnlivdahl-cmd/Nexus-App`
Local path: `C:\Nexus Mother Folder\01 REPOS\03 Nexus App\Nexus-App\Nexus-App\docs\chatgpt-project-bridge`

## Purpose

This folder is the repo-trackable bridge layer for the ChatGPT Nexus Project.

The files here are designed to be uploaded or pasted into the ChatGPT Project as curated project context. The app repo remains the durable source of these bridge files. ChatGPT Project consumes them as external context for discussion, drafting, brainstorming, planning, and playtest support.

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
