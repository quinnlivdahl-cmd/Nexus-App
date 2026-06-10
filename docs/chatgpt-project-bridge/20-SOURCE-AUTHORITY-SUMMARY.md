# Source Authority Summary

Status: upload-ready bridge file

## Purpose

This file tells ChatGPT Project how to use the repo-side expanded source pool without confusing it for live Nexus source authority.

## Authority Lanes

| Lane | Use for | Authority limit |
|---|---|---|
| Live local `00 Source` | Current Nexus source truth | Requires Codex/local inspection; not directly proven by ChatGPT upload |
| Repo-side expanded source pool | Richer ChatGPT discussion and exact GitHub retrieval | Context source only; does not override live local source |
| App repo workflow files | Task packets, validation, bridge docs, app planning | Workflow/implementation authority, not game canon |
| GitHub Issues | Acceptance criteria, progress, closeout evidence | Task authority, not source authority |
| ChatGPT Project uploads | Drafting, planning, brainstorming, playtest support | Curated context client; may be stale |

## Indexed Source Retrieval

The repo-side expanded source pool is:

`docs/nexus-domain-source-rebuild-2026-06-10/source`

ChatGPT should use the deterministic index instead of relying on a GitHub tree URL:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.json`

Use the index to find exact repo paths, source roles, currentness notes, and retrieval keywords. Then fetch the specific indexed file needed for the task.

## Currentness Rule

The expanded source pool is useful for discussion, but it is not automatic live source authority. If a task depends on exact current source, ask Codex/local workflow to inspect:

`C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`

Use `source-index-needed` when the index is missing, stale, or not searchable enough for ChatGPT to retrieve exact GitHub paths.

