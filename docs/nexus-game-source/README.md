# Nexus-App Canonical Source

Status: active Golden Truth source home

This folder is the durable repo home for Nexus game source documents.

It was originally created during the 2026-06-10 domain-source rebuild, then renamed on 2026-06-14 so the path describes its current authority instead of its migration history.

The canonical source path is:

`docs/nexus-game-source/source`

Do not rename this path casually. Any future rename must update bridge docs, validation checks, exact indexed GitHub paths, promotion scripts, and app/source-pack references in one reviewed batch.

## Authority Boundary

The repo source folder is the Golden Truth source corpus and canonical Nexus text source authority. Obsidian is a reading/index and promoted working-copy layer, not an independent authority over this repo source.

Accepted Nexus Game ADRs control the specific domain claims they change. Reconciliation edits the owning source documents so this corpus remains the current textual representation of the game; unaffected source material remains current, and ADRs remain the rationale and provenance for reconciled changes.

Canonical source:

`docs/nexus-game-source/source`

Obsidian Nexus note/index layer:

`C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game`

Promoted Obsidian source working copy:

`C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game\00 Source`

Drive payload lane:

`G:\My Drive\10_Projects\Nexus Game`

See `docs/admin/nexus-distributed-surfaces.md` before moving or copying material between repo, Obsidian, and Drive.

## Index Maintenance

Regenerate the source index whenever Golden Truth source documents are added, removed, renamed, or changed:

`corepack pnpm run source:index`

Check that the committed index is current:

`corepack pnpm run source:index:check`

Run the full workflow validator before closeout:

`corepack pnpm run validate:workflow`

Promote Golden Truth into the Obsidian source working copy with:

`corepack pnpm run source:promote-golden -- --execute`

or, when `corepack` is not on PATH:

`node scripts/promote-golden-source.mjs --execute`

Use `.agents/skills/nexus-source-index-maintainer/SKILL.md` for future source index work and `.agents/skills/nexus-golden-source-promoter/SKILL.md` for future live-vault promotions.
