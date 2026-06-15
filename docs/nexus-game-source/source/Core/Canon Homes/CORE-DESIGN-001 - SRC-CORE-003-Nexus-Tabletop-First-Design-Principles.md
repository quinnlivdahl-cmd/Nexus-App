---
project: "Nexus"
doc_id: "CORE-DESIGN-001"
legacy_ids:
  - 'SRC-CORE-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\07 Core Game Campaign rev0.3\SRC-CORE-003 - Nexus_Tabletop_First_Design_Principles.md'
title: "Nexus_Tabletop_First_Design_Principles"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "tabletop_first_design_principles"
owns_topics:
  - 'tabletop_first_design_principles'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Nexus Tabletop-First Design Principles

## 1. Tabletop-First Scope

The first playable form of Nexus is not a coded app. It is a tabletop/notebook RPG ruleset and campaign procedure that can be run in this project notebook.

This ruleset becomes the source of truth for a future Replit app or other digital implementation.

## 2. TT and VG Labels

- **TT** means tabletop/notebook version.
- **VG** means later video-game or app implementation.

The TT version is the authority until a system is tested enough to translate. VG planning may preserve data fields, user interface implications, and automation affordances, but it should not force premature app architecture.

## 3. GM / Notebook Role

The notebook version should support ChatGPT acting as:

- GM;
- rules assistant;
- encounter builder;
- content generator;
- campaign tracker;
- source-routing assistant after playtests.

The assistant should run from source docs, not from memory. When a rule is missing or improvised, it should be logged as a gap rather than silently becoming permanent canon.

## 4. Playable First, Expandable Second, Automatable Third

Core systems should be tested in play before being automated.

A future digital build may be considered only after the campaign loop, TacMaps, action economy, skill visibility, and campaign tracking are fun and trackable in tabletop form.

A small utility prototype may be considered earlier only if it supports TT play without forcing premature app architecture.

## 5. TT Short Commands

TT play must support short natural-language commands. The DM should infer likely intent and ask for clarification only when needed.

Player short commands remain valid when target, risk, and resource are clear. DM Mode should resolve them without requiring over-formal phrasing, while still asking a focused clarification if the command could meaningfully change target, cost, or consequence.

Examples:

- hack door switch
- blast door
- climb wall
- sneak left
- scan turret
- aim weak point
- suppress sniper
- dash to console
- anchor hallway

## 6. Tactical and Nonviolent Spatial Clarity

Structured TacMap data is the source of truth for mapped tactical scenes. Optional images, Canva pages, PDFs, or other visual aids can help players, but they do not override the node/path/objective/status data or the text state.

TacMaps may represent combat scenes or significant nonviolent scenes such as markets, rescues, checkpoints, wreckage exploration, hearings, station crises, or ship stops where spatial position and interactables matter.

Detailed TacMap movement, cover, hazards, node capacity, path widths, and enemy pacing route to `Combat`.

## 7. Required Play Structure

The player should not need to ask for required play structure. If a tactical encounter begins, DM Mode should automatically present the encounter-start packet appropriate to the scene: framing, immediate stakes, TacMap or schematic when needed, node/path/objective data, actors, hazards/pressure, and player-facing options.

This is a core design principle. The exact display template belongs to `Modes` and/or `Dashboards`.

## 8. Player-Facing Display Principle

TT play should stay readable on a phone and usable in chat. Dense displays should be condensed, broken into blocks, or routed to dashboards/reference aids when needed.

Rook playtest evidence reinforced that campaign decisions need readable character trackers, evidence displays, key event logs, and node-to-node pressure tracking. These are `Dashboards` and `Play Aids` concerns, but the core principle is that the TT experience must make state legible enough for meaningful choices.

## 9. Data and Automation Boundary

Future schemas may track campaign state, route-node state, encounters, TacMaps, assets, and campaign saves. Those details belong in `Data` and `Automation`.

At the core level, keep only the principle: data fields should serve TT play and preserve future automation affordances without making the app the source of truth too early.

## 10. Asset and Visual Boundary

Images and visual aids may be useful for important encounters, boss scenes, new locations, set pieces, route maps, dashboards, or player reference sheets. They are optional and illustrative unless a later source doc makes them mechanical.

Asset metadata, art direction, route-node companions, Canva/PDF aids, and auxiliary displays route to `Art` and `Play Aids`.

## 11. Replit Readiness Gate

Replit should not be used for the main game build until TT/notebook MVP play reveals whether the core loop, TacMaps, action economy, skill visibility, and campaign tracking are fun and trackable.

## 12. Source Discipline

When TT play improvises a rule, NPC status, display convention, or pacing correction, route it to the appropriate domain source doc, dashboard, register, or open-question doc. Do not let temporary play convenience silently become global source truth.

## 13. Mass-Intake Source Notes

- Required structure should appear automatically at encounter start.
- Structured text/data state remains authoritative even when images are present.
- Visual aids are valuable, but they must support readable tabletop execution rather than replace structured state.

## Source Handling Note

This document is a Core-domain consolidation document in the rebuild repo. It is not a verbatim copy of a single older file. It preserves and reorganizes usable content from the current vault snapshot, Nexus Future patterns, older phone/global backups, the Memory Overflow register, and Rook campaign handoff/dashboard evidence. Older material is treated as evidence. Live `00 Source` remains unchanged until the rebuilt source is accepted and migrated.



