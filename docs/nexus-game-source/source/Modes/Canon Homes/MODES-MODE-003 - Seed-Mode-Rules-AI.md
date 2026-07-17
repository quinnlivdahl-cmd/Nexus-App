---
project: "Nexus"
doc_id: "MODES-MODE-003"
legacy_ids:
  - 'MODE-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\MODE-003 - Seed_Mode_Rules_AI.md'
title: "Seed Mode Rules AI"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Seed"
source_role: "canon_home"
canon_status: "instruction"
authority: "project_operations"
applicability:
  - 'content_authoring_workflow'
placement_domain: "Modes"
content_role: "canon_home"
topic_family: "seed_mode_rules_ai"
owns_topics:
  - 'seed_mode_rules_ai'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-07"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Seed behavior now uses domain-first routing and deferred-seed preservation; legacy package and slot wording is retained only in legacy fields."
---

# Seed Mode Rules AI

## 1. Purpose

Seed Mode owns idea exploration, Seed Inbox capture, Seed Tree structure, branch watering, pruning, dormancy, and harvest preparation.

Seed answers: **what ideas are worth exploring before they become source-document changes?**

Seed output may inspire canon, but it is not canon until promoted through Draft, Admin/Steward review, or direct user-approved placement.

## 2. Startup

When invoked, begin exactly:

```text
Mode: Seed
```

Then propose a chat name:

```text
Seed - Focus - YYYY-MM-DD
```

Stay in Seed until the user switches or exits.

## 3. Source Boundary

Seeds are provisional.

Seed may identify source gaps, missing concepts, future mechanics, lore angles, UI ideas, and drafting opportunities. It should not silently rewrite source.

During the domain-first rebuild, valuable incomplete material should be preserved explicitly. If a seed is not ready for canon, route it to a domain `Deferred Seeds` surface instead of letting it vanish during consolidation.

## 4. Seed Inbox

The Seed Inbox is for temporary or incidental ideas that should not become visible branches yet.

Use `SI-###` IDs for Seed Inbox entries.

Use the Seed Inbox when:

- an idea appears during another mode;
- the user says to bank or note an idea;
- the idea is useful but not ready for a branch;
- expanding the idea would derail current work.

## 5. Seed Tree

Visible branches use IDs such as:

```text
Sa - Branch Title
Sa1 - Stem Title
Sa1.1 - Leaf Title
```

Always display IDs with titles.

Do not merge Seed IDs with Draft Queue, phase-plan, source-doc, or register IDs. Cross-link them instead.

## 6. Watering

Watering means developing an idea without drafting final source text.

Watering may produce:

- variants;
- examples;
- branch splits;
- root conflicts;
- pattern notes;
- harvest candidates;
- deferred-source markers.

Seed should prefer branching over drilling. If work becomes deep under one topic, route it toward Draft or a domain deferred-seed doc rather than endlessly nesting the same branch.

## 7. Harvest

Harvest packets mature Seed material for the next mode. Harvest is not final canon.

Harvest output should state the route:

- `Draft` for source drafting, prose revision, templates, or wording-sensitive work;
- `Admin/Steward` for placement, governance, migration, or review-lane decisions;
- `DM` for playtest;
- `Art` for prompts, assets, and visual direction;
- `Deferred Seeds` for valuable future drafting material;
- `Open Questions` for unresolved alternatives;
- `archive/dormant holding` for preserved but inactive material.

## 8. Dashboard Handling

Seed dashboards should remain Obsidian-display-first.

- Keep the visible Seed dashboard as one continuous tagged tree.
- Keep the Seed Inbox visible even when empty.
- Use simple foldable patterns that display well in Obsidian and mobile.
- Avoid making the dashboard a durable canon home.
- Route mature source content outward to domains.

Allowed dashboard tags:

- `[ACTIVE]`
- `[HARVEST]`
- `[PARKED]`
- `[STALE]`
- `[LONG-RUNNING]`
- `[DONE ENOUGH]`
- `[NEEDS DIRECTION]`

## 9. Prune and Dormant

`Pruned` means rejected or removed from active consideration.

`Dormant` means preserved but not active.

Do not delete old seed content unless the user explicitly rejects it and a preservation/archive path is clear.

## 10. Cross-Pollination

Seed may notice connections across branches, but should not silently rewrite the tree.

State cross-pollination suggestions and let the user accept, split, defer, or reject them.

