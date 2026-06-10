---
project: "Nexus"
doc_id: "CORE-PILLARS-001"
legacy_ids:
  - 'SRC-CORE-002'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\07 Core Game Campaign rev0.3\SRC-CORE-002 - Nexus_Core_Game_Pillars.md'
title: "Nexus_Core_Game_Pillars"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "core_game_pillars"
owns_topics:
  - 'core_game_pillars'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Nexus Core Game Pillars

## 1. Core Pitch

Nexus is a turn-based sci-fi squad RPG where the player controls one primary player character, recruits NPC party members, and travels with a mobile crew on a ship through a dangerous solar-system route structure inspired by FTL.

Individual missions use tactical squad combat, while long-term progression centers on recruits, builds, equipment, ship state, route choices, faction consequences, and survival.

The project is developed first as a playable tabletop/notebook RPG before any Replit or video-game implementation. The notebook version should be complete enough to run an actual campaign with ChatGPT acting as GM, rules assistant, encounter builder, content generator, and campaign tracker.

## 2. Working Genre Formula

FTL route progression plus XCOM-style tactical missions plus Pokemon-style recruit/team collection plus sci-fi RPG character depth.

## 3. Setting Boundary at Core Level

The game remains within the solar system. The major mystery is extrasolar contact. Conflict arises from the ways solar-system factions react to that contact.

Detailed factions, timeline, locations, and Signal/Choir canon belong in `Lore`. This document only preserves the core boundary needed to keep campaign scope stable.

## 4. Player and Crew Frame

The player has a single main player character. At game start, the player creates the PC and a starting crew. The PC affects starting conditions, background and story goal, initial faction relationships, early recruit options, starting equipment, dialogue/event choices, campaign framing, and tabletop-facing hooks.

The player recruits NPC party members who function like space-D&D party members. NPCs should have layered identities and growth variation. Crew use the same broad skill structure as PCs. Which skills they have leveled affects crew action options, passive effects, ability to assist, ability to lead, and options they unlock.

Detailed character chassis, origins, species-facing hooks, skills, disciplines, and progression rules belong in `Characters` and `Skills`.

## 5. Core Campaign Structure

The game progresses through an FTL-style route map. The player travels through the solar system from node to node with a mobile crew on a ship.

A node may be a station, colony, derelict, orbital platform, moon settlement, asteroid site, ship contact, faction checkpoint, distress signal, research site, black-market dock, or anomaly.

The core play loop is ship state -> route/node choice -> pre-node planning/loadout/advancement as needed -> assessment/approach -> encounter or mapped ship stop -> consequences -> tracker update -> return to ship state.

Current mass-intake refinement: the practical rhythm should remain visible as **route choice -> pre-node prep -> mission node -> encounter/result -> Route Node End Report -> ship time / next route**. The Route Node End Report belongs after immediate node resolution and before free ship time resumes.

## 6. Design Pillars

### Playable Tabletop Foundation

Every major rule should be understandable, runnable, and testable in the notebook before it is converted into software.

### Route-Based Survival

The player is always moving through a dangerous route structure where choices, losses, resources, faction hostility, and opportunities carry forward.

### Deep Squad Building

The strongest feature should be the depth of equipment, skills, feats, traits, powers, crew roles, and recruit variation.

### Planning Matters

Good plans should matter before dice are rolled. A strong plan may bypass an unnecessary roll, lower difficulty, change the target defense, satisfy a requirement, reduce consequences, reveal a safer route, or convert a likely failure into a partial success. Planning should not erase drama, but it should change the problem being solved.

### Flavor Changes Playstyle

Character flavor must impact mechanics. Species/origin, background, faction tie, equipment, growth tendencies, traits, and personal complications should all affect how a character plays.

### Emergent Tactical Strategy

Build layers should combine in surprising ways, creating strategies for both the player and opponents.

### Procedural Missions First

The first playable structure should focus on fighting through procedurally generated mission sites such as ships, stations, habitats, bases, labs, and outposts before building a larger quest system.

### Start Small, Expand Forever

The first implementation should prove the campaign loop, tactical combat, and character growth without trying to build the entire RPG at once.

### Automate Only After Validation

Replit or other digital tools should implement tested tabletop systems rather than inventing game logic from scratch.

## 7. Campaign Scale

Nexus campaigns begin with crew-scale action inside a larger multi-polar solar-system crisis. The player crew should not start by controlling empires, commanding major factions, or solving the entire system.

Their early power is local, mobile, and consequential. A crew can affect evidence, people, access, resources, rescue outcomes, faction leverage, station survival, mission timing, and local nodes of control.

Campaigns may escalate. By the end of a major campaign, the crew's actions may feel grand, consequential, and potentially world-altering. They may expose decisive evidence, shift faction legitimacy, prevent or trigger a war, save or doom a habitat, alter control of key infrastructure, reveal a truth about the Choir or Signal, or change how major powers understand the crisis.

The whistleblower / implant-network / Jupiter-moon pressure-cooker story remains a strong possible first-campaign seed, but it is not campaign canon yet. Treat it as a Seed Inbox / first-campaign candidate until explicit campaign work promotes it.

## 8. TT v0.1 Target

Nexus TT v0.1 should create enough rules, procedures, and starter content that a short Nexus campaign can be run in the project notebook with ChatGPT acting as GM, rules assistant, encounter builder, and campaign tracker.

TT v0.1 should be able to:

1. start a new Nexus campaign;
2. create or choose a player character;
3. generate or choose a starting crew;
4. review ship state, resources, equipment, and loadouts;
5. generate or present route node choices;
6. resolve at least three nodes or missions;
7. run at least one tactical combat encounter using a Combat TacMap;
8. use at least one non-attack AP option meaningfully;
9. resolve at least one quick branching non-combat encounter and one mapped nonviolent/ship-stop scene if starter content supports it;
10. track damage, injuries, rewards, resources, ship state, faction consequences, route state, crew state, and major flags;
11. advance at least one character or recruit;
12. produce a readable campaign log;
13. identify which systems are ready for later digital implementation and which need more TT testing.

## 9. Domain Routing Notes

- Detailed combat math and tactical rules route to `Combat`.
- Detailed character and progression rules route to `Characters`.
- Detailed skill and resolution rules route to `Skills`.
- Detailed equipment, loadout slots, credentials, and cyberware route to `Equipment`.
- Detailed setting, canon, and lore route to `Lore`.
- Mission-generation payloads route to `Content`.
- Live state routes to `Dashboards`; durable visual/display aids route to `Play Aids` and `Art`.
- Automation implications route to `Automation`; tables and structured data route to `Data`.

## 10. Mass-Intake Source Notes

- Tactical play remains central, but route, prep, escape, aftermath, ship time, and recovery choices must also be meaningful.
- Strong plans and visible consequences are core campaign features, not only DM improvisation.
- Detailed procedures still route to DM Mode/templates and dashboards where display/execution is needed.

## Source Handling Note

This document is a Core-domain consolidation document in the rebuild repo. It is not a verbatim copy of a single older file. It preserves and reorganizes usable content from the current vault snapshot, Nexus Future patterns, older phone/global backups, the Memory Overflow register, and Rook campaign handoff/dashboard evidence. Older material is treated as evidence. Live `00 Source` remains unchanged until the rebuilt source is accepted and migrated.



