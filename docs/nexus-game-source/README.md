# Nexus Golden Truth Source

Status: active Golden Truth source home

This folder is the durable repo home for Nexus game source documents.

It was originally created during the 2026-06-10 domain-source rebuild, then renamed on 2026-06-14 so the path describes its current authority instead of its migration history.

The Golden Truth source path is:

`docs/nexus-game-source/source`

Do not rename this path casually. Any future rename must update bridge docs, validation checks, exact indexed GitHub paths, promotion scripts, and app/source-pack references in one reviewed batch.

## Authority Boundary

The repo source folder is the Golden Truth source corpus. The live Obsidian source is the promoted vault working copy.

Golden Truth source:

`docs/nexus-game-source/source`

Promoted live Obsidian source:

`C:\Users\Quintin Livdahl\Nexus\00 Source`

Project-folder `C:\Users\Quintin Livdahl\Nexus\Nexus\00 Source` is a redirect/residue cleanup location, not active source authority.

## Index Maintenance

Regenerate the source index whenever Golden Truth source documents are added, removed, renamed, or changed:

`corepack pnpm run source:index`

Check that the committed index is current:

`corepack pnpm run source:index:check`

Run the full workflow validator before closeout:

`corepack pnpm run validate:workflow`

Promote Golden Truth into the live Obsidian source with:

`corepack pnpm run source:promote-golden -- --execute`

or, when `corepack` is not on PATH:

`node scripts/promote-golden-source.mjs --execute`

Use `.agents/skills/nexus-source-index-maintainer/SKILL.md` for future source index work and `.agents/skills/nexus-golden-source-promoter/SKILL.md` for future live-vault promotions.
