---
project: "Nexus"
doc_id: "CONTENT-INDEX-000"
legacy_ids:
  - 'SRC-CONTENT-000'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\13 Content Systems rev0.5\SRC-CONTENT-000 - README_Source_Content_Systems.md'
title: "Content Domain Readme"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "reference_input"
topic_family: "content_domain_readme"
owns_topics:
  - 'content_domain_readme'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Content Domain Readme

## Purpose

The `Content` domain owns reusable content frameworks for enemies, NPCs, jobs, route nodes, objectives, hazards, obstacles, rewards, salvage, loot hooks, encounter seeds, tags, rarity, and content balance notes.

Content answers: **what payloads can DM Mode, future tooling, and source workflows use to build missions, encounters, rewards, and reusable play material?**

## Authority Boundary

Content owns content-facing vocabulary and scaffolding.

Content does not own:

- combat resolution, TacMap rules, movement, or action economy;
- loadout slots, cyberware rules, weapons, or item mechanics;
- skill checks, difficulty, Target Score, or RNG math;
- lore/faction/timeline canon unless promoted by `Lore`;
- live dashboards or campaign-state authority;
- final automation schemas or data tables.

## Current Structure

Current Content surfaces include:

- `CONTENT-INDEX-000`: domain readme.
- `CONTENT-INDEX-001`: domain manifest.
- `CONTENT-ENEMY-001`: enemy and NPC content framework.
- `CONTENT-ENEMY-STAT-001`: enemy roles, tags, and stat-block fields.
- `CONTENT-MISSION-001`: mission, job, and objective framework.
- `CONTENT-ROUTE-001`: route-node content framework.
- `CONTENT-HAZARD-001`: hazards, obstacles, and environmental content.
- `CONTENT-REWARD-001`: rewards, loot, and salvage framework.
- `CONTENT-ENCOUNTER-001`: encounter content library.
- `CONTENT-NOTES-009`: content tags, rarity, and balance notes.
- `CONTENT-OPEN-010`: content systems open questions.

## Important Boundaries

- Enemy profile names from test appendices are balance/test models unless promoted.
- Campaign-specific entities such as Rook campaign names are playtest/campaign evidence unless promoted.
- Gear item rules belong to `Equipment`; Content owns reward placement, salvage hooks, and content-side reward use.
- DM display behavior belongs to `Modes` and `Dashboards`; Content owns the content-state concepts that displays may show.
- Hazard Rating and defensive fields should stay compatible with `Skills`, `Combat`, and `Equipment`.

## Cross-Domain Routing

- `Core`: mission-node and route structure.
- `Combat`: combat timing, tactical interactions, statuses, and action economy.
- `Skills`: resolution, Target Score, noncombat checks, and Lattice routing.
- `Equipment`: item rules, gear tags, cyberware, defenses, and loadout.
- `Lore`: faction/world/timeline canon.
- `Dashboards`: live campaign and playtest state.
- `Data`: structured content tables and controlled vocabularies.

## Preservation Rule

No old content source, enemy placeholder, procedural mission doc, loot/equipment file, RNG appendix, dashboard, handoff, playtest file, or backup is deletion-approved by this readme.


