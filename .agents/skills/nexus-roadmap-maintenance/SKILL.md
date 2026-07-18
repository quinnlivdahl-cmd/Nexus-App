---
name: nexus-roadmap-maintenance
description: Maintain the repo-accessible Nexus roadmap mirror and generated roadmap indexes. Use when editing docs/nexus-roadmap, changing roadmap-to-issue relationships, regenerating roadmap indexes, or preparing exact roadmap retrieval paths for ChatGPT.
---

# Nexus Roadmap Maintenance

## Unique Trigger

Use this workflow only for the repo roadmap mirror, its generated indexes, or roadmap-to-issue linkage. Do not use it for executable issue state, canonical game-source decisions, or general planning notes.

## Owner

This is the sole repo-local skill for `docs/nexus-roadmap`. The roadmap is historical and planning context; GitHub owns executable tasks and canonical source plus accepted ADRs own the game definition.

## Workflow

1. Read `AGENTS.md`, `NEXUS_ISSUE_INDEX.md`, live GitHub issue state, and `docs/nexus-roadmap/README.md`.
2. Inspect canonical source before making current-game claims; do not infer canon from the roadmap.
3. Update `docs/nexus-roadmap/ROADMAP.md` or roadmap linkage only within the requested scope.
4. When lane-to-issue relationships change, update `scripts/update-roadmap-index.mjs`.
5. Run:
   - `corepack pnpm run roadmap:index`
   - `corepack pnpm run roadmap:index:check`
   - `corepack pnpm run validate:workflow`
6. For ChatGPT retrieval, return exact paths under `docs/nexus-roadmap` and use the Nexus ChatGPT Bridge workflow if a packet or handoff is also required.

## Boundaries

- Do not promote roadmap content to source canon.
- Do not turn the roadmap index into the active execution queue.
- Do not mutate the Obsidian roadmap owner without explicit scope.
- Do not claim ChatGPT Project refresh until retrieval or upload is verified for the named scope.
