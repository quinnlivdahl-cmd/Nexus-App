# ChatGPT Project Bridge Operating Model

Status: superseded bridge baseline; do not upload

> Superseded by `PROJECT-INSTRUCTIONS.md` and `BRIDGE-INDEX.md` through Bridge Consolidation #80. Retained temporarily for provenance until Archival #85. The content below is historical and non-controlling.

## Role

The ChatGPT Project bridge is the repo-trackable layer that prepares and maintains the files ChatGPT Project should know.

The bridge does not replace the app repo, canonical source docs, GitHub Issues, Drive payload lanes, Obsidian index/current-state notes, or Codex/local verification. It translates selected current context into upload-ready project files.

## Lane Model

| Lane | Owns | Does not own |
|---|---|---|
| Nexus-App repo | Canonical source docs, app implementation, repo workflow files, bridge files, validation scripts, source index | Bulky generated payloads unless purpose-built for repo use |
| Obsidian Nexus notes | Reading/index layer, current-state notes, dashboards, links, and generated pointer cards | Copied source corpus or independent source authority over the repo |
| Drive Nexus payloads | Workbench payloads, handoff bundles, exports, zips, candidate runs, Google-native files | Source authority or app implementation |
| GitHub Issues | Task packets, acceptance criteria, progress and closeout evidence | Game/source truth |
| ChatGPT Project | Curated context for discussion, drafting, planning, playtest support | Current source/repo authority |
| Codex/local | Inspection, implementation, validation, bridge updates, issue evidence, source-index generation, distributed-surface checks | Human approval for uploads, publishing, or cross-surface promotion |

## Repo-Side Expanded Source Pool

The canonical repo source pool supports richer ChatGPT discussion at:

`docs/nexus-game-source/source`

This pool is canonical source authority for Nexus text source docs. ChatGPT should still avoid currentness claims unless it fetched exact indexed files or received a current Codex/local check.

Codex/local should maintain a deterministic index so ChatGPT can fetch exact files without relying on GitHub folder enumeration.

Preferred index files:

- `docs/nexus-game-source/source/SOURCE-INDEX.md`
- optional `docs/nexus-game-source/source/SOURCE-INDEX.json`

The index should include exact paths, domains, source roles, status/currentness notes, and retrieval terms.

## Pull Model

Before updating bridge files, Codex should pull from:

- repo canonical source when source truth matters;
- Obsidian Nexus notes when index/current-state or pointer-card navigation matters;
- Drive Nexus payloads when generated/export/workbench material matters;
- app repo files when workflow or implementation context matters;
- GitHub Issues when task state matters;
- existing bridge files when ChatGPT Project expectations matter;
- user instructions for the current task.

## Push Model

Codex should push to:

- repo bridge files for durable upload-ready context;
- repo-side source index files for exact-path ChatGPT retrieval;
- GitHub issue comments for task evidence;
- Obsidian index/current-state notes when the task explicitly needs readable project memory;
- Drive payload lanes for bulky generated artifacts and export/workbench outputs;
- ChatGPT Project only through user-confirmed upload/paste or a recorded refresh action.

Do not claim ChatGPT Project has changed until upload/paste is confirmed or logged.

## Bridge Update Workflow

1. Identify why ChatGPT Project needs refreshed context.
2. Read current source/repo/issue context needed for that scope.
3. Update the smallest bridge file, source index, or packet that solves the context gap.
4. Validate repo workflow.
5. Commit and push repo changes when appropriate.
6. Add GitHub issue evidence when issue-bound.
7. Prepare an upload list for the user or record the confirmed upload.
