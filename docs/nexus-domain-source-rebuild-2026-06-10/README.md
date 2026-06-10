# Nexus Source Mirror

Status: active repo-side source mirror compatibility path

This folder was created during the 2026-06-10 domain-source rebuild, but its current repo role is the ongoing Nexus Source Mirror for app and ChatGPT GitHub-context workflows.

The physical path remains:

`docs/nexus-domain-source-rebuild-2026-06-10/source`

Keep this path until a deliberate rename migration updates bridge docs, validation checks, exact indexed GitHub paths, and any app/source-pack references in one reviewed batch.

## Authority Boundary

The mirror is useful repo context. It is not automatic live source authority.

Current Nexus source truth remains:

`C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`

If exact current source matters, inspect live local source before treating mirror content as current.

## Index Maintenance

Regenerate the source index whenever mirrored source documents are added, removed, renamed, or changed:

`corepack pnpm run source:index`

Check that the committed index is current:

`corepack pnpm run source:index:check`

Run the full workflow validator before closeout:

`corepack pnpm run validate:workflow`

Use the repo-local skill `.agents/skills/nexus-source-index-maintainer/SKILL.md` for future source-mirror index work.
