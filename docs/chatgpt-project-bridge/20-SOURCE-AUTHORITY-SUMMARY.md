# Source Authority Summary

Status: upload-ready bridge file

## Purpose

This file tells ChatGPT Project how to use the repo-side Nexus Source Mirror without confusing it for live Nexus source authority.

## Authority Lanes

| Lane | Use for | Authority limit |
|---|---|---|
| Live local `00 Source` | Current Nexus source truth | Requires Codex/local inspection; not directly proven by ChatGPT upload |
| Repo-side Nexus Source Mirror | Richer ChatGPT discussion and exact GitHub retrieval | Context source only; does not override live local source |
| Repo-side Nexus Roadmap | Shared planning lanes and roadmap-to-issue linkage | Planning context only; does not replace the issue queue or source canon |
| App repo workflow files | Task packets, validation, bridge docs, app planning | Workflow/implementation authority, not game canon |
| GitHub Issues | Acceptance criteria, progress, closeout evidence | Task authority, not source authority |
| ChatGPT Project uploads | Drafting, planning, brainstorming, playtest support | Curated context client; may be stale |

## Indexed Source Retrieval

The repo-side Nexus Source Mirror is:

`docs/nexus-domain-source-rebuild-2026-06-10/source`

The physical path is retained from the 2026-06-10 domain-source rebuild for compatibility. Its current repo role is the ongoing source mirror unless a future rename migration updates exact indexed paths and bridge references in one reviewed batch.

ChatGPT should use the deterministic index instead of relying on a GitHub tree URL:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.json`

Use the index to find exact repo paths, source roles, currentness notes, and retrieval keywords. Then fetch the specific indexed file needed for the task.

When mirror files change, Codex should regenerate the index with `corepack pnpm run source:index` and validate with `corepack pnpm run validate:workflow`.

## Currentness Rule

The source mirror is useful for discussion, but it is not automatic live source authority. If a task depends on exact current source, ask Codex/local workflow to inspect:

`C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`

Use `source-index-needed` when the index is missing, stale, or not searchable enough for ChatGPT to retrieve exact GitHub paths.

## Indexed Roadmap Retrieval

The repo-side Nexus Roadmap is:

`docs/nexus-roadmap`

Use the deterministic roadmap index instead of relying on a GitHub tree URL:

- `docs/nexus-roadmap/ROADMAP-INDEX.md`
- `docs/nexus-roadmap/ROADMAP-INDEX.json`

Use the roadmap index to find exact roadmap paths, durable lanes, and linked GitHub issues. Then use `NEXUS_ISSUE_INDEX.md` for the active queue/current task state.

Use `roadmap-index-needed` when the roadmap index is missing, stale, or not searchable enough for ChatGPT to retrieve exact GitHub paths.
