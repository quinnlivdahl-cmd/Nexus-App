---
name: nexus-source-index-maintainer
description: Use when mirrored Nexus source documents are added, removed, renamed, or changed in the app repo source mirror.
---

# Nexus Source Index Maintainer

Use this skill when work touches the repo-side Nexus source mirror or either index file:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.json`

The physical folder name is a compatibility path from the 2026-06-10 domain-source rebuild. Its current role is the ongoing repo-side Nexus Source Mirror until a deliberate rename migration updates exact indexed paths and bridge references.

Workflow:

1. Inspect the current task and decide whether mirrored source files were added, removed, renamed, or changed.
2. Do not bulk-copy live `00 Source` into this repo unless the user explicitly approves that refresh.
3. If current source truth matters, inspect live local source first:
   `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`
4. Regenerate the index from the repo root:
   `corepack pnpm run source:index`
5. Check the generated files:
   `corepack pnpm run source:index:check`
6. Run the workflow validator:
   `corepack pnpm run validate:workflow`
7. Review diffs in both index files before committing. Index diffs should match the source-file changes in the same batch.

Do not:

- hand-edit `SOURCE-INDEX.md` or `SOURCE-INDEX.json` when the generator can produce them;
- treat the repo mirror as live source authority without a current-source verification workflow;
- rename `docs/nexus-domain-source-rebuild-2026-06-10` silently;
- put operational README or skill docs inside the mirror `source` folder unless they are intentionally meant to be indexed as source documents;
- delete, move, or track GPT input/reference artifacts unless the task explicitly approves it.
