# Nexus Roadmap

Status: historical repo-accessible planning evidence
Repo: `quinnlivdahl-cmd/Nexus-App`
Repo path: `docs/nexus-roadmap`

## Purpose

This folder preserves the June text-RPG roadmap and its generated indexes for retrieval, issue-history inspection, and planning provenance.

The repo mirror is:

`docs/nexus-roadmap/ROADMAP.md`

Use the repo mirror only when Codex, ChatGPT/Stewy, Replit, GitHub Issues, or a human reviewer needs the prior planning model by exact GitHub path. It does not control current work.

## Authority Boundary

The roadmap mirror is non-controlling historical planning context. It is not Nexus source canon, current product direction, or the product finish line, and it does not replace `docs/nexus-game-source/source` as the canonical source corpus.

Use canonical `CORE-PILLARS-001` section 8 for the spatial vertical-slice target, Spatial Vertical Slice Map #57 for readiness decisions, and live GitHub Issues for executable work. Revised Vision Planning Controls #60 owns the eventual replacement planning layer.

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

When historical June planning evidence is specifically needed, Stewy may use:

1. `docs/nexus-roadmap/README.md` for boundary rules.
2. `docs/nexus-roadmap/ROADMAP-INDEX.md` for lane and issue lookup.
3. `docs/nexus-roadmap/ROADMAP.md` for the roadmap text.
4. `NEXUS_ISSUE_INDEX.md` and live GitHub only to compare that history with current work.

Do not claim ChatGPT Project has been refreshed until the upload, paste, or retrieval action is confirmed or logged.
