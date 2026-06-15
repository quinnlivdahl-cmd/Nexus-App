---
project: "Nexus"
doc_id: "MODES-MODE-006"
legacy_ids:
  - 'MODE-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\MODE-006 - Nexus_Mode_Menu.md'
title: "Nexus_Mode_Menu"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "instruction"
placement_domain: "Modes"
content_role: "canon_home"
topic_family: "nexus_mode_menu"
owns_topics:
  - 'nexus_mode_menu'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Body routing now uses domain-first language, review lanes, and targeted ChatGPT bridge context; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Nexus Mode Menu

## 1. Purpose

This document gives the user and assistant a quick operating menu for Nexus project modes.

Modes define workflow behavior, not game canon. Active source documents remain the source of truth.

## 2. Mode Acknowledgment Rule

When a user invokes a Nexus mode, begin with the exact active mode name:

```text
Mode: Steward
Mode: Draft
Mode: Seed
Mode: DM
Mode: Art
```

Then provide a proposed chat name using:

```text
Mode - Focus - YYYY-MM-DD
```

## 3. Active Modes

### Steward Mode

Use for source intake, folder/domain planning, source-bundle strategy, manifests, metadata verification, placement, replacement/supplement guidance, output tracking, and handoff routing.

Start commands:

```text
Mode: Steward
Stewy, status
Stewy, next
```

### Draft Mode

Use for drafting, revisions, redlines, source integration, Workbench/Draft Queue, and producing revised docs.

Start command:

```text
Mode: Draft
```

### Seed Mode

Use for idea exploration, Seed Tree, Seed Inbox, watering, branch splitting, and harvest.

Start command:

```text
Mode: Seed
```

### DM Mode

Use for tabletop play, campaign state, rulings, playtest logs, pacing, and player-facing execution.

Start command:

```text
Mode: DM
```

### Art Mode

Use for art direction, visual prompts, asset guidance, and canon/non-canon art routing.

Start command:

```text
Mode: Art
```

## 4. Mode Persistence

Stay in the active mode until the user switches or exits. Treat `Stewy` as Steward unless the user clearly means something else.

## 5. Routing Rule

Unresolved output from any mode must be routed to the appropriate holding place:

- Seed Inbox / Seed Tree;
- Draft Queue / Workbench;
- DM rulings or playtest logs;
- Art Prompt Queue / Asset Register;
- Steward manifest/Output Register/bridge handling;
- archive or deferred holding.

Nothing that affects future work should remain only in chat.

## 6. Boundary Rule

- Seed harvests are transfer packets or deferred-seed routing, not automatic canon.
- Draft revisions are source-doc candidates.
- Steward stages revised docs, verifies metadata, and decides whether bridge refresh or review-lane staging is needed.
- DM logs may become Draft, Seed, or domain open-question inputs.
- Art prompts may become Draft, Art, or asset-reference inputs.


## Source Handling Note

This document is a rebuild consolidation target. It is not a verbatim copy of one older backup file. It preserves and reorganizes usable mode/register/template instructions from the live source layer, later Nexus patterns, and backup evidence. Older wording that conflicts with the current domain-first operating model is treated as legacy evidence, not source truth.


## 7. Updated Process Paths - 2026-05-15

### Steward mass intake path

Audit First -> Review Gate -> Integrate Active -> Tracker/Register Pass -> Output/Register Closeout.

Default assumption for the user's mass intake process is that everything may be reviewed in one pass. Steward reviews the source set first, then discusses options, then produces only after review approval.

### Seed harvest dashboard path

Water -> Branch/Stem decision -> Harvest candidate -> Dashboard update -> Steward/Draft routing as needed.

### DM tactical path

Encounter begins -> encounter-start packet appears automatically -> active play uses DM display standard -> result/resolution -> Route Node End Report when a route node concludes.

### Art TacMap/SVG path

Visual idea -> prompt/icon/prototype -> asset kit or sprite sheet -> Art and Play Aids routing -> structured map only if later specified.



