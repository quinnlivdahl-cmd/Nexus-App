# Nexus-App Canonical Source

Status: active Golden Truth source home

This folder is the durable repo home for Nexus game source documents.

It was originally created during the 2026-06-10 domain-source rebuild, then renamed on 2026-06-14 so the path describes its current authority instead of its migration history.

The canonical source path is:

`docs/nexus-game-source/source`

Do not rename this path casually. Any future rename must update bridge docs, validation checks, exact indexed GitHub paths, generated pointer cards, and app/source-pack references in one reviewed batch.

## Authority Boundary

The repo source folder is the Golden Truth source corpus and canonical Nexus text source authority. Obsidian is a reading/index layer with generated pointer cards, not a copied source tree or an independent authority over this repo source.

The corpus also preserves explicitly labeled operational and historical documents. Their document-level `authority` and `applicability` metadata controls retrieval and prevents their location inside the corpus from promoting them into current game truth.

Accepted Nexus Game ADRs control the specific domain claims they change. Reconciliation edits the owning source documents so this corpus remains the current textual representation of the game; unaffected source material remains current, and ADRs remain the rationale and provenance for reconciled changes.

Canonical source:

`docs/nexus-game-source/source`

The maintained Obsidian and Drive paths and their roles have one owner: the routing note reached through `docs/admin/nexus-distributed-surfaces.md`. See it before moving or copying material between repo, Obsidian, and Drive.

## Retrieval Authority Metadata

Source location does not decide whether a document belongs in default game retrieval. Documents may declare:

- `authority`: `game_current`, `game_provisional`, `runtime_ai_behavior`, `project_operations`, `historical_reference`, or `non_authoritative`;
- `applicability`: one or more of `player_game_rules`, `campaign_director_runtime`, `content_authoring_workflow`, `project_operations`, and `historical_provenance`.

Default game retrieval includes `game_current`, `game_provisional`, and `runtime_ai_behavior`. It excludes `project_operations`, `historical_reference`, and `non_authoritative` while keeping those documents and slices available for deliberate operational or historical retrieval.

`runtime_ai_behavior` is reserved for current behavior of the hidden Campaign Director or another game-runtime model role. Instructions for ChatGPT, Codex, drafting, source maintenance, project roles, or prototype DM chat are project operations or historical reference, not runtime AI behavior.

## Index Maintenance

Regenerate the source index whenever Golden Truth source documents are added, removed, renamed, or changed:

`corepack pnpm run source:index`

Check that the committed index is current:

`corepack pnpm run source:index:check`

Run the full workflow validator before closeout:

`corepack pnpm run validate:workflow`

Use `.agents/skills/nexus-source-maintenance/SKILL.md` for future source routing and source-index work. Do not copy this corpus into Obsidian; update generated pointer cards when navigation paths change.

Before Retire Source Promotion #76, a one-way repo-to-Obsidian copy workflow supported the 2026 source migration. That workflow is retired; Git history preserves its implementation and migration provenance.
