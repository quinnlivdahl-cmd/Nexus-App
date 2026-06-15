# Source Authority Summary

Status: upload-ready bridge file

## Purpose

This file tells ChatGPT Project how to use the repo-side Nexus Golden Truth source without confusing it for ChatGPT Project upload currentness or unverified live-vault state.

## Authority Lanes

| Lane | Use for | Authority limit |
|---|---|---|
| Repo-side Nexus Golden Truth source | Source-backed repo/app work, richer ChatGPT discussion, and exact GitHub retrieval | Source corpus authority; does not prove ChatGPT upload currentness or live-vault promotion state by itself |
| Promoted live Obsidian `00 Source` | Obsidian working source after Golden Truth promotion | Requires Codex/local inspection or promotion evidence; not directly proven by ChatGPT upload |
| Repo-side Nexus Roadmap | Shared planning lanes and roadmap-to-issue linkage | Planning context only; does not replace the issue queue or source canon |
| App repo workflow files | Task packets, validation, bridge docs, app planning | Workflow/implementation authority, not game canon |
| GitHub Issues | Acceptance criteria, progress, closeout evidence | Task authority, not source authority |
| ChatGPT Project uploads | Drafting, planning, brainstorming, playtest support | Curated context client; may be stale |

## Indexed Source Retrieval

The repo-side Nexus Golden Truth source is:

`docs/nexus-game-source/source`

This path is the durable repo home for the user-designated Golden Truth source corpus. It was renamed from the dated 2026-06-10 rebuild folder on 2026-06-14 so exact indexed paths and bridge references point at the current source home.

ChatGPT should use the deterministic index instead of relying on a GitHub tree URL:

- `docs/nexus-game-source/source/SOURCE-INDEX.md`
- `docs/nexus-game-source/source/SOURCE-INDEX.json`

Use the index to find exact repo paths, source roles, currentness notes, and retrieval keywords. Then fetch the specific indexed file needed for the task.

When Golden Truth source files change, Codex should regenerate the index with `corepack pnpm run source:index` and validate with `corepack pnpm run validate:workflow`.

## Currentness Rule

The Golden Truth source is the repo source corpus, and the promoted live Obsidian folder is the local working copy. If a task depends on exact current live-vault state, ask Codex/local workflow to inspect:

`C:\Users\Quintin Livdahl\Nexus\00 Source`

Use `source-index-needed` when the index is missing, stale, or not searchable enough for ChatGPT to retrieve exact GitHub paths.

## Indexed Roadmap Retrieval

The repo-side Nexus Roadmap is:

`docs/nexus-roadmap`

Use the deterministic roadmap index instead of relying on a GitHub tree URL:

- `docs/nexus-roadmap/ROADMAP-INDEX.md`
- `docs/nexus-roadmap/ROADMAP-INDEX.json`

Use the roadmap index to find exact roadmap paths, durable lanes, and linked GitHub issues. Then use `NEXUS_ISSUE_INDEX.md` for the active queue/current task state.

Use `roadmap-index-needed` when the roadmap index is missing, stale, or not searchable enough for ChatGPT to retrieve exact GitHub paths.
