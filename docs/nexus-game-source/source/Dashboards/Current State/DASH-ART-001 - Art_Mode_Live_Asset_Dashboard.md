---
project: "Nexus"
doc_id: "DASH-ART-001"
legacy_ids:
  - 'DASH-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\16 Current Dashboards State rev0.3\DASH-006 - Art_Mode_Live_Asset_Dashboard.md'
title: "Art_Mode_Live_Asset_Dashboard"
doc_status: "active"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "provisional_source"
placement_domain: "Dashboards"
content_role: "current_state"
topic_family: "art_dashboard"
owns_topics:
  - 'art_live_state'
borrows_topics:
  - 'mode_execution_delta'
state_scope: "art_mode"
created: "2026-05-25"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Dashboards consolidation. Art dashboard now uses domain-first routing and current-state boundaries; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Art Mode Live Asset Dashboard

> [!summary]+ Snapshot
> - **Mode owner:** Art.
> - **Intended placement:** `01_Admin/Live_Dashboards/`.
> - **Replaces/supplements:** prior `DASH-006`.
> - **Delete rule:** old dashboard files may be deleted only after verification.
> - **Startup note:** on new chat open, request the latest dashboard if it was not provided. If it is provided, scan `Functions`, `Style Lock`, `In Progress`, `Done Enough`, and `Needs Direction` before substantive work.

## Functions

> [!info]+ Plain-Text Functions
> - `Build Prompt()`
> - `Review External Output()`
> - `Update Style Lock()`
> - `Route Asset Status()`

## Hard Rule

> [!warning]+ Generation Rule
> No image generation inside Nexus project chats. Ever.

## Style Lock

> [!abstract]+ Current Approved Style Direction
> - NASApunk sci-fi tabletop RPG
> - near-future solar-system grit, cyberpunk density, dieselpunk wear
> - modular spacecraft, exposed mechanics, pressure suits, patched hulls, analog switches, glowing diagnostics, thick cables, industrial warning labels
> - orbital stations, asteroid mines, corporate habitats, black-box alien signal mystery

> [!note]- Banned Drift / Allowed Variation
> - avoid glossy Star Trek cleanliness
> - avoid pure military realism
> - avoid overdesigned anime armor
> - avoid medieval motifs
> - avoid cluttered unreadable UI
> - allowed variation: backdrop mood tests, readable icon grammar, controlled color/value changes, consistent industrial station language

## Concepts

> [!example]+ Current Concepts
> - `[ACTIVE]` node-web marker set for TacMaps
> - `[ACTIVE]` TacMap icon/sprite kit refinement
> - `[ACTIVE]` TacMap collage workflow support
> - `[ACTIVE]` route-node map companion and system/faction display
> - `[ACTIVE]` character sheet / crew card visual support

## In Progress Prompts / Directions

> [!todo]+ In Progress
> - `[ACTIVE]` `ART-CURRENT-01 - Produce SVG node-web set`
> - `[ACTIVE]` `ART-CURRENT-02 - TacMap icon/sprite kit refinement`
> - `[ACTIVE]` `ART-CURRENT-03 - TacMap collage workflow support`
> - `[ACTIVE]` `ART-CURRENT-06 - Character sheet / crew card visual`

## Generated Externally

> [!note]+ External-Only Lane
> - external generation packets are allowed
> - generated outputs remain non-canon by default
> - route prompt sets, reviews, and asset-status decisions here, not image generation itself

## Canon Approved

> [!success]+ Canon-Approved Lane
> - none confirmed in this rebuild pass

## Non-Canon / Scrap

> [!note]+ Non-Canon or Scrap
> - `[STALE]` 64-node asteroid mine TacMap prototype as a visual ambition reference, not a canonical playable map
> - `[LONG-RUNNING]` orbital/station exterior reference remains visual direction evidence, not source canon by itself

## TacMap Workflow

> [!tip]+ TacMap Workflow
> - use structured collage logic rather than one opaque generated image
> - prioritize readable node/path/cover/elevation meaning
> - prioritize fast state-change support
> - route visual changes that affect lore/mechanics through Seed/Draft/Steward before treating them as source

## Done Enough

> [!success]+ Done Enough Lane
> Done Enough = usable now, not blocking, not polished, not final.
>
> - `[ACTIVE]` one readable editable SVG marker set is enough to start testing.
> - `[ACTIVE]` one compact character-sheet visual is enough to support campaign restart before full polish.
> - `[ACTIVE]` one stable production packet is enough to send external generation work out of project chat.

## Needs Direction

> [!question]+ Needs Direction
> - `[ACTIVE]` whether current character-sheet visual support should remain Art-owned or move to Draft once wording and layout stabilize.
> - `[ACTIVE]` exact boundary between TacMap art direction and canonical play-aid/source structure.

## Handoff Relationship

> [!info]+ When Art Work Becomes a Handoff
> Route to handoff when a prompt set, asset review, or visual direction packet is ready to route outside the project or into canon/non-canon tracking.

## Minimal Metadata

- Art dashboard tracks prompts, review, direction, and asset status.
- Generation happens outside the Nexus project.


