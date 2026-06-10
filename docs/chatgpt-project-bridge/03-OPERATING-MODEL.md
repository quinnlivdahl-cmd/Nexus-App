# ChatGPT Project Bridge Operating Model

Status: upload-ready bridge file

## Role

The ChatGPT Project bridge is the repo-trackable layer that prepares and maintains the files ChatGPT Project should know.

The bridge does not replace live source, the app repo, GitHub Issues, or Codex/local verification. It translates selected current context into upload-ready project files.

## Lane Model

| Lane | Owns | Does not own |
|---|---|---|
| Live source | Nexus game/source truth in domain-first `00 Source` | App implementation, GitHub issue state, ChatGPT upload status |
| App repo | App implementation, repo workflow files, bridge files, validation scripts, repo-side expanded source index | Live source authority |
| GitHub Issues | Task packets, acceptance criteria, progress and closeout evidence | Game/source truth |
| ChatGPT Project | Curated context for discussion, drafting, planning, playtest support | Current source/repo authority |
| Codex/local | Inspection, implementation, validation, bridge updates, issue evidence, source-index generation | Human approval for uploads or source promotions |

## Repo-Side Expanded Source Pool

A repo-side expanded source pool may support richer ChatGPT discussion at:

`docs/nexus-domain-source-rebuild-2026-06-10/source`

This pool should be treated as indexed context, not automatic source authority.

Codex/local should maintain a deterministic index so ChatGPT can fetch exact files without relying on GitHub folder enumeration.

Preferred index files:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`
- optional `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.json`

The index should include exact paths, domains, source roles, status/currentness notes, and retrieval terms.

## Pull Model

Before updating bridge files, Codex should pull from:

- live `00 Source` when source truth matters;
- app repo files when workflow or implementation context matters;
- repo-side expanded source files when ChatGPT needs richer context and exact indexed paths exist;
- GitHub Issues when task state matters;
- existing bridge files when ChatGPT Project expectations matter;
- user instructions for the current task.

## Push Model

Codex should push to:

- repo bridge files for durable upload-ready context;
- repo-side source index files for exact-path ChatGPT retrieval;
- GitHub issue comments for task evidence;
- review lanes for candidate source/admin documents;
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
