---
project: "Nexus"
doc_id: "CORE-PILLARS-001"
legacy_ids:
  - 'SRC-CORE-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\07 Core Game Campaign rev0.3\SRC-CORE-002 - Nexus_Core_Game_Pillars.md'
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
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Nexus Core Game Pillars

<!-- source-slice: core.pillars.core-pitch -->
## 1. Core Pitch

Nexus is a local-first 2D spatial sci-fi party RPG where the player controls one primary Player Character, recruits Crewmates, and travels with a mobile crew through a dangerous solar-system route structure inspired by FTL.

Persistent explorable Locations support free movement, in-world interaction, dialogue, and turn-based Tactical Pressure without loading separate Encounter maps. Long-term progression centers on recruits, builds, equipment, relationships, optional Ship state, Route Choices, faction consequences, survival, and Legacy World continuity.

Deterministic local systems own geometry, rules, and committed state. Generated performance and Campaign Director planning make the game responsive without becoming game authority.

## 2. Working Genre Formula

FTL route progression plus XCOM-style tactical missions plus Pokemon-style recruit/team collection plus sci-fi RPG character depth.

<!-- source-slice: core.pillars.setting-boundary -->
## 3. Setting Boundary at Core Level
The game remains within the solar system. The major mystery is extrasolar contact. Conflict arises from the ways solar-system factions react to that contact.

Detailed factions, timeline, locations, and Signal/Choir canon belong in `Lore`. This document only preserves the core boundary needed to keep campaign scope stable.

## 4. Player and Crew Frame

The player has a single main Player Character. At game start, the player creates the Player Character and selects a starting crew. The Player Character affects the opening, background and story goal, initial faction relationships, early recruit options, starting equipment, dialogue/event choices, and campaign framing. Player Character identity is separate from the optional Captain role and Ship ownership.

The player recruits NPC party members who function like space-D&D party members. NPCs should have layered identities and growth variation. Crew use the same broad skill structure as PCs. Which skills they have leveled affects crew action options, passive effects, ability to assist, ability to lead, and options they unlock.

Detailed character chassis, origins, species-facing hooks, skills, disciplines, and progression rules belong in `Characters` and `Skills`.

<!-- source-slice: core.pillars.campaign-structure -->
## 5. Core Campaign Structure
The game progresses through an FTL-style route map. The player travels through the solar system from Route Node to Route Node with a mobile crew; campaigns may include a Ship without requiring one as identity or universal start state.

A node may be a station, colony, derelict, orbital platform, moon settlement, asteroid site, ship contact, faction checkpoint, distress signal, research site, black-market dock, or anomaly.

The core play loop is Node 0 opening -> Location play -> Route Node Resolution -> Route Choice -> advancement and Deployment Preparation -> next persistent Location -> consequences -> tracker update -> location-neutral Downtime.

The practical rhythm is **Route Choice -> advancement and Deployment Preparation -> Route Node Location -> Local Aftermath -> Route Node End Report -> Downtime / next Route Choice**.

<!-- source-slice: core.pillars.design-pillars -->
## 6. Design Pillars
### Playable Spatial Foundation

Every major rule should be understandable, observable, and testable in play. The runtime should expose enough state and outcomes to diagnose and repair behavior.

### Route-Based Survival

The player is always moving through a dangerous route structure where choices, losses, resources, faction hostility, and opportunities carry forward.

### Deep Squad Building

The strongest feature should be the depth of equipment, skills, feats, traits, powers, crew roles, and recruit variation.

### Planning Matters

Good plans should matter before dice are rolled. A strong plan may bypass an unnecessary roll, lower difficulty, change the target defense, satisfy a requirement, reduce consequences, reveal a safer route, or convert a likely failure into a partial success. Planning should not erase drama, but it should change the problem being solved.

### Flavor Changes Playstyle

Character flavor must impact mechanics. Embodiment, Bioform, background, faction tie, equipment, growth tendencies, traits, and personal complications should all affect how a character plays.

### Emergent Tactical Strategy

Build layers should combine in surprising ways, creating strategies for both the player and opponents.

### Modular Locations First

The first playable structure should focus on exploring and resolving modular Locations such as ships, stations, habitats, bases, labs, and outposts before building the entire setting at once.

### Start Small, Expand Forever

The first implementation should prove the campaign loop, tactical combat, and character growth without trying to build the entire RPG at once.

### Deterministic Rules, Bounded Generation

Software implements validated source rules. Model generation may propose bounded content and performance but does not invent or commit game logic.

<!-- source-slice: core.pillars.campaign-scale -->
## 7. Campaign Scale
Nexus campaigns begin with crew-scale action inside a larger multi-polar solar-system crisis. The player crew should not start by controlling empires, commanding major factions, or solving the entire system.

Their early power is local, mobile, and consequential. A crew can affect evidence, people, access, resources, rescue outcomes, faction leverage, station survival, mission timing, and local nodes of control.

Campaigns may escalate. By the end of a major campaign, the crew's actions may feel grand, consequential, and potentially world-altering. They may expose decisive evidence, shift faction legitimacy, prevent or trigger a war, save or doom a habitat, alter control of key infrastructure, reveal a truth about the Choir or Signal, or change how major powers understand the crisis.

The whistleblower / implant-network / Jupiter-moon pressure-cooker story remains a strong possible first-campaign seed, but it is not campaign canon yet. Treat it as a Seed Inbox / first-campaign candidate until explicit campaign work promotes it.

## 8. Vertical Slice Target

The vertical slice should prove that the spatial game, deterministic rules, generated performance, Campaign Director, and campaign continuity can sustain a coherent short campaign.

The vertical slice should be able to:

1. start a new Nexus campaign;
2. create or choose a player character;
3. generate or choose a starting crew;
4. review relevant crew, resource, equipment, loadout, and optional Ship state;
5. generate or present route node choices;
6. resolve at least three nodes or missions;
7. enter and resolve Tactical Pressure inside a persistent Location;
8. use at least one non-attack AP option meaningfully;
9. resolve at least one consequential noncombat interaction in the same spatial runtime;
10. track damage, injuries, rewards, resources, ship state, faction consequences, route state, crew state, and major flags;
11. advance at least one character or recruit;
12. produce a readable campaign log;
13. demonstrate recoverable local state and deterministic fallback when generated performance is unavailable.

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

- Tactical play remains central, but route, prep, escape, aftermath, Downtime, and recovery choices must also be meaningful.
- Strong plans and visible consequences are core campaign features, not only DM improvisation.
- Detailed procedures route to their owning runtime, domain, and display surfaces.

## Source Handling Note

This current Core-domain source preserves useful design pillars from prior Nexus work while applying the accepted spatial RPG product model.
