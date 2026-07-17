# Nexus-App Canonical Source

Status: active Golden Truth source home

This folder is the durable repo home for Nexus game source documents.

It was originally created during the 2026-06-10 domain-source rebuild, then renamed on 2026-06-14 so the path describes its current authority instead of its migration history.

The canonical source path is:

`docs/nexus-game-source/source`

Do not rename this path casually. Any future rename must update bridge docs, validation checks, exact indexed GitHub paths, generated pointer cards, and app/source-pack references in one reviewed batch.

## Authority Boundary

The repo source folder is the Golden Truth source corpus and canonical Nexus text source authority. Obsidian is a reading/index layer with generated pointer cards, not a copied source tree or an independent authority over this repo source.

Accepted Nexus Game ADRs control the specific domain claims they change. Reconciliation edits the owning source documents so this corpus remains the current textual representation of the game; unaffected source material remains current, and ADRs remain the rationale and provenance for reconciled changes.

Canonical source:

`docs/nexus-game-source/source`

Obsidian Nexus note/index layer:

`C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game`

Obsidian source pointer-card navigation:

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

Use `.agents/skills/nexus-source-index-maintainer/SKILL.md` for future source-index work. Do not copy this corpus into Obsidian; update generated pointer cards when navigation paths change.

Before Retire Source Promotion #76, a one-way repo-to-Obsidian copy workflow supported the 2026 source migration. That workflow is retired; Git history preserves its implementation and migration provenance.
