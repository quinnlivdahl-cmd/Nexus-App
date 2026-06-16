---
project: "Nexus"
doc_id: "CORE-GLOSSARY-001"
legacy_ids:
  - 'SRC-CORE-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\07 Core Game Campaign rev0.3\SRC-CORE-007 - Core_Terminology_and_Source_Glossary.md'
title: "Core_Terminology_and_Source_Glossary"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "core_terminology_and_source_glossary"
owns_topics:
  - 'core_terminology_and_source_glossary'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Core Terminology and Source Glossary

## 1. Purpose

This glossary defines core campaign terms and routing boundaries for the `Core` domain.

## 2. Core Terms

<!-- source-slice: core.glossary.nexus -->
### Nexus

The project/game: a tabletop-first sci-fi squad RPG about a mobile crew traveling through a dangerous solar-system route structure, resolving tactical missions, crew growth, route pressure, faction consequences, and survival.

### TT

Tabletop/notebook version. The first playable source of truth.

### VG

Later video-game or app implementation. Downstream from tested TT systems.

### PC

Player character. The single main player character who affects starting conditions, background/story goal, faction relationships, equipment, dialogue, recruit options, and campaign framing.

<!-- source-slice: core.glossary.crew -->
### Crew

The shipboard team around the PC. Crew members may be active squad members, ship support, recruits, contacts, or other stateful NPCs depending on rules and campaign state.

<!-- source-slice: core.glossary.ship-phase -->
### Ship Phase

The state-review and preparation layer between active nodes. It includes campaign state, route options, resources, ship condition, crew state, loadouts, advancement/prep, and consequences.

<!-- source-slice: core.glossary.route -->
### Route

The campaign-scale travel structure through the solar system. Routes carry resource pressure, faction pressure, known/hidden options, and consequences forward.

<!-- source-slice: core.glossary.node -->
### Node

A playable ship stop, not merely a map point. A node can be a station, colony, derelict, orbital platform, moon settlement, asteroid site, ship contact, faction checkpoint, distress signal, research site, black-market dock, or anomaly.

<!-- source-slice: core.glossary.pre-node-procedure -->
### Pre-Node Procedure

The process that happens before starting an active node scene. It may include advancement/level-up, crew/team selection, loadout, ship readiness, planning, route forecasting, and support assignments.

<!-- source-slice: core.glossary.mission-node -->
### Mission Node

A node with a defined playable mission, encounter, objective, or scene structure. It may resolve through combat, non-combat checks, a mapped nonviolent/ship-stop TacMap, or a mixed procedure.

<!-- source-slice: core.glossary.tacmap -->
### TacMap

A tactical map made of meaningful nodes and paths. In `Core`, the term is used only at the high level: TacMaps provide spatial clarity for combat and significant nonviolent scenes. Detailed TacMap movement and rules route to `Combat`.

### Combat TacMap

A TacMap used for detailed tactical combat.

### Mapped Nonviolent / Ship-Stop TacMap

A TacMap used for significant non-combat or mixed scenes where spatial clarity matters: markets, rescues, checkpoints, wreckage searches, hearings, station crises, or shipboard emergencies.

### Assessment / Approach Phase

The pre-resolution phase where the player asks questions, uses skills, plans, scans, negotiates, sneaks, hacks, disables systems, prepares an ambush, repositions, retreats, or finds an objective-focused bypass.

### Campaign Tracker

The structured record updated after nodes. It should include PC/crew state, ship state, resources, injuries, equipment changes, faction changes, quest hooks, side leads, known route options, open questions, and consequences.

### Working Truth Candidate

A source doc or review packet that has been consolidated and is intended for durable source use after user review. Until accepted, it remains a candidate.

### Route Node End Report

A compact report shown after a route node resolves and before free ship time resumes. It confirms results, persistent aftermath, counters/clocks, crew/ship/resource changes, open leads, save routing, and next-state options.

### Persistent Aftermath

A consequence that survives the immediate scene and must state a concrete gameplay effect or route to a concrete future effect.

### Requirement Escape

The default formal escape structure when withdrawal itself is the interesting problem. It uses clear requirements and optional pressure counters.

### Quick Exit

A low-stakes exit with one main choice or release point. It should feel like release, not a new extended procedure.

### Set-Piece Escape

A rare expanded escape structure where escape is the core premise of the node.

### Major Time-Consuming Choice

Preferred noncombat pacing phrase for a meaningful choice that consumes time, changes risk, advances a counter, or creates consequence.

<!-- source-slice: core.glossary.encounter-start-packet -->
### Encounter Start Packet

The player-facing start display for a tactical or structured encounter. It may include framing, stakes, TacMap/schematic, node/path/objective data, actors, hazards/pressure, and player options.

<!-- source-slice: core.glossary.structured-tacmap-data -->
### Structured TacMap Data

The authoritative node/path/objective/status data behind a TacMap. Images and visual aids support this data but do not replace it.

### Standard Fit

Baseline infrastructure compatibility assumption for common suits, armor, medkits, restraints, crash couches, tools, doors, emergency systems, and other human-scale equipment. Detailed body/gear implications route to Slots 09 and 11.

## 3. Routing Glossary

### Core

Owns the campaign loop, core pitch, TT-first principle, ship phase overview, route/node structure, and source boundaries.

### Modes

Owns DM execution templates, display patterns, route-node-end display forms, encounter-start packet templates, check/roll blocks, and other mode-facing procedure displays.

### Combat

Owns combat, action economy, reactions, cover, hazards, exposure, TacMap movement, encounter pacing, enemy behavior, and playtest combat rulings.

### Characters

Owns character chassis, origins/species, disciplines, traits, progression, crew rosters, relationships, recovery, and consequences.

### Skills

Owns skills, resolution, difficulty, modifiers, revealed options, and RNG tuning.

### Equipment

Owns loadout slots, weapons, armor, tools, credentials, cyberware, armory, tags, rarity, and balance notes.

### Lore

Owns setting overview, humanity/posthumanity frame, factions, locations, timeline, Signal/Contact mystery, station life, naming, and lore questions.

### Content

Owns enemy/NPC frameworks, mission/job objectives, route-node content, hazards, rewards, loot, salvage, and content libraries.

### Dashboards

Owns campaign dashboards, live play trackers, character display panels, evidence boards, current state displays, Route Node End Report exports, persistent aftermath tracking, and active campaign counters.

### Play Aids and Art

Owns system maps, route-node companions, Canva/PDF aids, and other external play aids.

## 4. Usage Note

When a term appears here with only a high-level definition, do not infer detailed mechanics from the definition alone. Use the routed domain for rules-level answers.

## Source Handling Note

This document is a Core-domain consolidation document in the rebuild repo. It is not a verbatim copy of a single older file. It preserves and reorganizes usable content from the current vault snapshot, Nexus Future patterns, older phone/global backups, the Memory Overflow register, and Rook campaign handoff/dashboard evidence. Older material is treated as evidence. Live `00 Source` remains unchanged until the rebuilt source is accepted and migrated.


