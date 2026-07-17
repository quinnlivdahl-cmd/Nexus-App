---
name: nexus-source-index-maintainer
description: Use when Nexus-App canonical source documents are added, removed, renamed, or changed in the app repo source folder.
---

# Nexus Source Index Maintainer

Use this skill when work touches the repo-side Nexus-App canonical source folder or either index file:

- `docs/nexus-game-source/source/SOURCE-INDEX.md`
- `docs/nexus-game-source/source/SOURCE-INDEX.json`

The source folder was renamed on 2026-06-14 from the dated domain rebuild path to `docs/nexus-game-source/source`. Treat it as the durable canonical source home.

Workflow:

1. Inspect the current task and decide whether canonical source files were added, removed, renamed, or changed.
2. Do not refresh canonical source from Obsidian `00 Source`, Drive, archives, or review candidates unless the user explicitly approves that direction.
3. If Obsidian navigation matters, inspect generated pointer cards under `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game\00 Source` for stale paths. Do not treat those cards as source-content currentness evidence.
4. Regenerate the index from the repo root:
   `corepack pnpm run source:index`
5. Check the generated files:
   `corepack pnpm run source:index:check`
6. Run the workflow validator:
   `corepack pnpm run validate:workflow`
7. Review diffs in both index files before committing. Index diffs should match the source-file changes in the same batch.

Do not:

- hand-edit `SOURCE-INDEX.md` or `SOURCE-INDEX.json` when the generator can produce them;
- overwrite canonical repo source from Obsidian, Drive, or archive material without explicit approval;
- copy canonical source documents into Obsidian as a browsing mirror;
- rename `docs/nexus-game-source` without a reviewed path-migration batch;
- put operational README or skill docs inside the canonical `source` folder unless they are intentionally meant to be indexed as source documents;
- delete, move, or track GPT input/reference artifacts unless the task explicitly approves it.
