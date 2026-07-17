# Source Authority Summary

Status: upload-ready bridge file

## Purpose

This file tells ChatGPT Project how to use the Nexus-App canonical source corpus without confusing it for ChatGPT Project upload currentness, Obsidian pointer-card freshness, or Drive payload state.

## Authority Lanes

| Lane | Use for | Authority limit |
|---|---|---|
| Nexus-App canonical source | Source-backed repo/app work, richer ChatGPT discussion, and exact GitHub retrieval | Source corpus authority; does not prove ChatGPT upload currentness or Obsidian pointer-card freshness by itself |
| Obsidian Nexus notes | Reading/index layer, current-state notes, dashboards, links, and generated pointer cards | Navigation and project memory only; does not override or duplicate repo source |
| Drive Nexus payloads | Bulky payloads, generated outputs, exports, zips, candidate runs, handoff bundles, and Google-native files | Payload/export authority only; not source canon |
| Repo-side Nexus Roadmap | Shared planning lanes and roadmap-to-issue linkage | Planning context only; does not replace the issue queue or source canon |
| App repo workflow files | Task packets, validation, bridge docs, app planning | Workflow/implementation authority, not game canon |
| GitHub Issues | Acceptance criteria, progress, closeout evidence | Task authority, not source authority |
| ChatGPT Project uploads | Drafting, planning, brainstorming, playtest support | Curated context client; may be stale |

## Indexed Source Retrieval

The Nexus-App canonical source corpus is:

`docs/nexus-game-source/source`

This path is the durable repo home for the user-designated source corpus. It was renamed from the dated 2026-06-10 rebuild folder on 2026-06-14 so exact indexed paths and bridge references point at the current source home.

ChatGPT should use the deterministic index instead of relying on a GitHub tree URL:

- `docs/nexus-game-source/source/SOURCE-INDEX.md`
- `docs/nexus-game-source/source/SOURCE-INDEX.json`

Use the index to find exact repo paths, source roles, currentness notes, and retrieval keywords. Then fetch the specific indexed file needed for the task.

When canonical source files change, Codex should regenerate the index with `corepack pnpm run source:index` and validate with `corepack pnpm run validate:workflow`.

## Currentness Rule

The canonical source corpus lives in the repo, and the Obsidian source folder contains generated pointer-card navigation. If a task depends on exact Obsidian navigation, project-memory state, Drive payloads, exports, handoff bundles, or Google-native workbench files, ask Codex/local workflow to locate the relevant surface through the maintained registry reached through `docs/admin/nexus-distributed-surfaces.md` and inspect it directly.

Use `source-index-needed` when the index is missing, stale, or not searchable enough for ChatGPT to retrieve exact GitHub paths.

## Indexed Roadmap Retrieval

The repo-side Nexus Roadmap is:

`docs/nexus-roadmap`

Use the deterministic roadmap index instead of relying on a GitHub tree URL:

- `docs/nexus-roadmap/ROADMAP-INDEX.md`
- `docs/nexus-roadmap/ROADMAP-INDEX.json`

Use the roadmap index to find exact roadmap paths, durable lanes, and linked GitHub issues. Then use `NEXUS_ISSUE_INDEX.md` for the active queue/current task state.

Use `roadmap-index-needed` when the roadmap index is missing, stale, or not searchable enough for ChatGPT to retrieve exact GitHub paths.
