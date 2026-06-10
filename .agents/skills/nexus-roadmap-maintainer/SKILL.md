---
name: nexus-roadmap-maintainer
description: Use when updating the repo-accessible Nexus roadmap mirror, roadmap index, or roadmap-to-issue linkage.
---

# Nexus Roadmap Maintainer

Use this skill when work touches `docs/nexus-roadmap`, roadmap issue linkage, or ChatGPT/Stewy roadmap retrieval.

Workflow:

1. Read `AGENTS.md`, `NEXUS_ISSUE_INDEX.md`, `NEXUS_ISSUE_TRANSITION.md`, and `docs/nexus-roadmap/README.md`.
2. If current source truth is needed, inspect live domain-first source before making claims. The roadmap mirror is planning context, not source canon.
3. Keep `docs/nexus-roadmap/ROADMAP.md` repo-accessible, but do not mutate the original Obsidian review-lane roadmap unless the user explicitly approves it.
4. Update roadmap issue linkage in `scripts/update-roadmap-index.mjs` when lane-to-issue relationships change.
5. Regenerate the index with `corepack pnpm run roadmap:index`.
6. Validate with `corepack pnpm run roadmap:index:check` and `corepack pnpm run validate:workflow`.
7. If the bridge needs ChatGPT/Stewy visibility, name exact paths:
   - `docs/nexus-roadmap/README.md`
   - `docs/nexus-roadmap/ROADMAP.md`
   - `docs/nexus-roadmap/ROADMAP-INDEX.md`
   - `docs/nexus-roadmap/ROADMAP-INDEX.json`
8. Do not claim ChatGPT Project is refreshed until the upload, paste, or retrieval action is confirmed or logged.

Do not:

- promote candidate roadmap content to Nexus source canon;
- turn `ROADMAP-INDEX.md` into the active execution queue;
- bury roadmap planning in the source mirror;
- bulk-copy live `00 Source` into the repo;
- close a roadmap issue until index generation/checks and workflow validation pass.
