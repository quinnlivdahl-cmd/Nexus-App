---
name: nexus-golden-source-promoter
description: Use when promoting the Nexus-App repo Golden Truth source corpus into the live Obsidian vault source, cleaning duplicate project-folder source residue, refreshing source-path references, or verifying that source promotion and archive safeguards are current.
---

# Nexus Golden Source Promoter

## Overview

Use this skill when the approved source of truth is the repo Golden Truth source home at `docs/nexus-game-source/source` and the live Obsidian source must be refreshed safely.

Read alongside:

1. `AGENTS.md`
2. `.agents/skills/nexus-source-router/SKILL.md`
3. `.agents/skills/nexus-source-index-maintainer/SKILL.md`
4. `docs/admin/task-planning/codex-session-discipline-workflow.md`

## Workflow

1. Confirm the active user request approves source promotion or source cleanup.
2. Treat `docs/nexus-game-source/source` as Golden Truth only when the user or controlling task explicitly says so.
3. Run a dry check first:
   `node scripts/promote-golden-source.mjs`
4. Review the planned archive, delete, move, copy, and rewrite operations.
5. Execute only after the operation is approved:
   `node scripts/promote-golden-source.mjs --execute`
6. Regenerate repo indexes:
   `node scripts/update-source-index.mjs`
   `node scripts/update-roadmap-index.mjs`
7. Validate:
   `node scripts/update-source-index.mjs --check`
   `node scripts/update-roadmap-index.mjs --check`
   `node scripts/validate-nexus-workflow.mjs`
8. Search for stale hard-coded paths before closeout:
   `rg -n --hidden -S "C:\\Nexus Mother Folder\\00 Nexus Obsidian Vault\\00 Source"`

## Safety Rules

- Archive the current vault-root `00 Source` before replacing it.
- Delete old project-folder slot packages only when they hash-match the existing slot archive.
- Move non-matching project source residue into archive rather than deleting it.
- Keep repo-generated `SOURCE-INDEX.md` and `SOURCE-INDEX.json` in the repo source home; do not copy them into live vault source.
- Do not treat archive evidence, bridge packets, or GitHub issues as live source authority.
- Report any remaining source-path references that are intentionally historical.
