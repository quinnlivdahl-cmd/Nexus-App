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
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Core Terminology and Source Glossary

## 1. Purpose

This glossary defines core campaign terms and routing boundaries for the `Core` domain.

## 2. Core Terms

<!-- source-slice: core.glossary.nexus -->
### Nexus

The local-first 2D spatial sci-fi party RPG about a mobile crew traveling through a dangerous solar-system route structure, exploring persistent Locations, resolving Tactical Pressure, growing characters, and carrying consequences into a Legacy World.

### TT

Historical shorthand for the tabletop/notebook prototype. It is evidence, not the current product authority.

### VG

Historical shorthand for a video-game/app implementation. Nexus is now directly designed as a spatial application.

### Player Character

The single player-owned primary character for a campaign. Player Character is an identity/ownership role, not a synonym for Captain, Ship owner, commander, or Embodiment. `PC` is acceptable shorthand after the full term is established.

<!-- source-slice: core.glossary.crew -->
### Crew

The current campaign party and support roster around the Player Character. Crewmates may be active Field Team members, support, recruits, contacts, retired characters, or other stateful characters depending on rules and campaign state. A Crew does not require a Ship.

### Field Team

The deployed party under direct player control, normally the Player Character and two selected Crewmates. An accepted in-Location recruit may replace one non-Player-Character member without expanding the Field Team; the displaced Crewmate remains present in the Location under separate support rules.

### Location Support Assignment

A committed in-Location duty held by a deployed Crewmate outside the active Field Team at their actual position when the assignment begins. The assignment never relocates the Crewmate; they provide only a grounded contextual benefit, retain ordinary actor state, and may become a Tactical Participant if danger reaches them. Changing the Field Team requires physically returning to their position during Free Movement.

### Rally to Extraction

A player-issued Local Aftermath order that sends non-Field-Team deployed actors along a validated safe route to the departure point. It may use automatic pathing but never teleports an actor; an actor without a safe route must be recovered or explicitly left behind with the resulting consequence committed.

### Stranded Crewmate

A living Crewmate deliberately left behind when the Field Team departs a Location. The character leaves the active Crew Roster but retains their identity, exact Actor State, last known Location, and known circumstances until committed evidence establishes rescue, capture, escape, Permanent Loss, or another outcome.

<!-- source-slice: core.glossary.ship-phase -->
### Downtime

The location-neutral interval between Route Nodes. It may include recovery, relationships, inventory, Route Choice, advancement, and Deployment Preparation aboard a Ship or at another suitable Location. `Ship Phase` and `Ship Time` are historical names when used as universal phases.

<!-- source-slice: core.glossary.route -->
### Route

The campaign-scale travel structure through the solar system. Routes carry resource pressure, faction pressure, known/hidden options, and consequences forward.

<!-- source-slice: core.glossary.node -->
### Route Node

A campaign-scale playable stop realized as one persistent explorable Location. A Route Node can be a station, colony, derelict, orbital platform, moon settlement, asteroid site, ship contact, faction checkpoint, distress signal, research site, black-market dock, or anomaly.

### Local Aftermath

The in-Location phase after Tactical Pressure ends and before the Field Team departs. Free Movement resumes against the committed changed Location state; Route Node Resolution waits for deliberate departure or a committed forced-departure outcome.

### Route Node Resolution

The campaign-facing consolidation that occurs when the Field Team departs a Route Node Location. Departure does not require objective success; failed, abandoned, and unresolved objectives persist as committed outcomes alongside every other material consequence.

<!-- source-slice: core.glossary.pre-node-procedure -->
### Deployment Preparation

The preparation after Route Choice and before the selected Route Node begins. It includes advancement, Field Team selection, loadout, relevant readiness, planning, and support assignments.

<!-- source-slice: core.glossary.mission-node -->
### Mission Node

Historical or content-facing label for a Route Node with a defined mission or objective. It does not create a separate spatial or state authority.

<!-- source-slice: core.glossary.tacmap -->
### TacMap

A historical prototype map or a derived tactical overlay. A TacMap may aid display or diagnostics, but authoritative Location geometry, continuous actor positions, Interaction Positions, Cover Positions, and object state determine play.

### Combat TacMap

A derived tactical display for a combat scene; not a separate Encounter authority.

### Mapped Nonviolent / Ship-Stop TacMap

A historical label for using spatial display in significant noncombat or mixed scenes. Current scenes use the same persistent Location runtime.

### Assessment / Approach Phase

The pre-resolution phase where the player asks questions, uses skills, plans, scans, negotiates, sneaks, hacks, disables systems, prepares an ambush, repositions, retreats, or finds an objective-focused bypass.

### Campaign Tracker

The structured record updated after Route Nodes. It includes Player Character and crew state, relevant Ship state, resources, injuries, equipment changes, faction changes, leads, known Route Prospects, open questions, and consequences.

### Working Truth Candidate

A source doc or review packet that has been consolidated and is intended for durable source use after user review. Until accepted, it remains a candidate.

### Route Node End Report

A compact recap shown after a Route Node resolves and before Downtime or the next Route Choice. It presents already-committed results, persistent aftermath, counters/clocks, crew/Ship/resource changes, open leads, save routing, and next-state options; it cannot approve, revise, or defer those outcomes.

### Campaign Autosave

The campaign's single rolling durable checkpoint of committed Game Truth. It updates at consequence-bearing commits and stable active-Location checkpoints; players use Continue, Save & Quit, or export/import rather than selecting ordinary manual save slots or quickloads.

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
### Tactical Pressure Transition

The transition to sequential, consequential action resolution inside the current Location. The runtime presents framing, stakes, relevant geometry and objectives, actors, hazards or pressure, initiative, and player options without loading a separate Encounter object.

<!-- source-slice: core.glossary.structured-tacmap-data -->
### Location State

The authoritative geometry, actor positions, objects, hazards, objectives, discoveries, relationships, and committed consequences for one persistent Location. Images and overlays display this state but do not replace it.

### Standard Fit

Baseline infrastructure compatibility assumption for common suits, armor, medkits, restraints, crash couches, tools, doors, emergency systems, and other human-scale equipment. Detailed body and gear implications route to `Characters` and `Equipment`.

### Game Truth

Committed player-facing world and rules state. Only validated deterministic mutations may change it.

### Director State

The separate hidden local lane for Campaign Director plans, pressures, mysteries, and prepared prospects. It may inform proposals but cannot overwrite Game Truth.

### Model Runtime

The provider-neutral, task-routed service that requests generated proposals and performance. It is not a rules engine, state store, or mutation authority.

### Route Prospect

A prepared possible next Route Node with enough identity, opportunity, risk, and deterministic Travel Consequences to support Route Choice. Unchosen prospects normally lapse when a choice commits.

### Saga Source

The retrievable record appended when a campaign resolves, preserving its validated events, outcomes, unresolved threads, and legacy consequences.

### Legacy World

A continuing world containing a forward literal chronology, Saga Sources, validated campaign consequences, Crew Archive history, and bounded between-campaign developments.

### Character Profile

The persistent identity and Personal Canon of a continuing person, independent of Campaign Build or current body.

### Embodiment

The character's current body or platform and its physical state, including Bioform where applicable, Chassis tier, Installed Cyberware, durable gene modifications, and compatibility consequences.

## 3. Routing Glossary

### Core

Owns the campaign loop, core pitch, spatial product principles, Downtime overview, Route Node structure, and source boundaries.

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

This current Core-domain glossary preserves useful terminology from prior Nexus work while applying accepted spatial, campaign, runtime, and character-continuity decisions.
