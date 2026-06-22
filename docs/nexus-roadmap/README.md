# Nexus Roadmap

Status: active repo-accessible planning surface
Repo: `quinnlivdahl-cmd/Nexus-App`
Local path: `C:\Users\Quintin Livdahl\Repos\Nexus-App\docs\nexus-roadmap`

## Purpose

This folder makes the Nexus global roadmap available from the app repo and GitHub.

The repo mirror is:

`docs/nexus-roadmap/ROADMAP.md`

Use the repo mirror when Codex, ChatGPT/Stewy, Replit, GitHub Issues, or a human reviewer needs a shared roadmap reference by exact GitHub path.

## Authority Boundary

The roadmap mirror is planning context. It is not Nexus source canon, and it does not replace `docs/nexus-game-source/source` as the canonical source corpus.

`NEXUS_ISSUE_INDEX.md` remains the issue queue/control surface. The roadmap explains project lanes, direction, and milestone context; it should not become a competing task tracker.

## Roadmap Index

Use these generated files for exact retrieval and issue linkage:

- `docs/nexus-roadmap/ROADMAP-INDEX.md`
- `docs/nexus-roadmap/ROADMAP-INDEX.json`

Regenerate after `ROADMAP.md`, roadmap issue mapping, or `NEXUS_ISSUE_INDEX.md` changes:

`corepack pnpm run roadmap:index`

Check that committed generated files are current:

`corepack pnpm run roadmap:index:check`

Run the full workflow validation before closeout:

`corepack pnpm run validate:workflow`

## ChatGPT / Stewy Use

After this folder is pushed and the ChatGPT Project bridge is refreshed or given exact repo paths, Stewy should use:

1. `docs/nexus-roadmap/README.md` for boundary rules.
2. `docs/nexus-roadmap/ROADMAP-INDEX.md` for lane and issue lookup.
3. `docs/nexus-roadmap/ROADMAP.md` for the roadmap text.
4. `NEXUS_ISSUE_INDEX.md` for the active issue queue.

Do not claim ChatGPT Project has been refreshed until the upload, paste, or retrieval action is confirmed or logged.
