---
name: nexus-source-index-maintainer
description: Use when Nexus Golden Truth source documents are added, removed, renamed, or changed in the app repo source folder.
---

# Nexus Source Index Maintainer

Use this skill when work touches the repo-side Nexus Golden Truth source folder or either index file:

- `docs/nexus-game-source/source/SOURCE-INDEX.md`
- `docs/nexus-game-source/source/SOURCE-INDEX.json`

The source folder was renamed on 2026-06-14 from the dated domain rebuild path to `docs/nexus-game-source/source`. Treat it as the durable Golden Truth source home.

Workflow:

1. Inspect the current task and decide whether Golden Truth source files were added, removed, renamed, or changed.
2. Do not refresh Golden Truth from live `00 Source`, archives, or review candidates unless the user explicitly approves that direction.
3. If local vault currentness matters, inspect the promoted live source:
   `C:\Users\Quintin Livdahl\Nexus\00 Source`
4. Regenerate the index from the repo root:
   `corepack pnpm run source:index`
5. Check the generated files:
   `corepack pnpm run source:index:check`
6. Run the workflow validator:
   `corepack pnpm run validate:workflow`
7. Review diffs in both index files before committing. Index diffs should match the source-file changes in the same batch.

Do not:

- hand-edit `SOURCE-INDEX.md` or `SOURCE-INDEX.json` when the generator can produce them;
- overwrite Golden Truth from vault/archive material without explicit approval;
- rename `docs/nexus-game-source` without a reviewed path-migration batch;
- put operational README or skill docs inside the Golden Truth `source` folder unless they are intentionally meant to be indexed as source documents;
- delete, move, or track GPT input/reference artifacts unless the task explicitly approves it.
