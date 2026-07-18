---
project: "Nexus"
doc_id: "CORE-CAMPAIGN-001"
legacy_ids:
  - 'SRC-CORE-004'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\07 Core Game Campaign rev0.3\SRC-CORE-004 - Campaign_Loop_and_Route_Structure.md'
title: "Campaign_Loop_and_Route_Structure"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "campaign_loop_and_route_structure"
owns_topics:
  - 'campaign_loop_and_route_structure'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-07-17"
last_reviewed: "2026-07-17"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Campaign Loop and Route Structure

## 1. Purpose

This document defines the current v0.1 campaign loop and route-node structure for Nexus.

<!-- source-slice: core.campaign.core-loop -->
## 2. Core Loop

The current campaign loop is:

1. Create or select the Player Character and starting crew; Ship ownership and the Captain role are optional and separate.
2. The first Campaign Opening call establishes the Main Campaign Thread and initial Director State, then selects a campaign-opening **Node 0** from the complete starting cast.
3. After deterministic validation, the second opening call builds the Node 0 plan from the finalized Player Character, Starting Crew, and starting loadouts; play then begins at level 0 in the selected opening Location.
4. Choose or confirm the next route node.
5. After Route Choice and before the node starts, complete required Deployment Preparation: advancement if available, Field Team selection, loadout, relevant support/readiness, and approach planning.
6. Start or arrive at the node.
7. Assess the node situation and choose an approach.
8. Explore and resolve the persistent Location through movement, interaction, checks, dialogue, objectives, and any Tactical Pressure that emerges.
9. Apply immediate outcomes.
10. Produce a Route Node End Report when the route node is complete.
11. Update dashboard/state for persistent aftermath, active counters, crew state, inventory, open leads, and campaign consequences.
12. Enter location-neutral Downtime, which may include repair, crew conversation, travel, Ship activity when a Ship exists, or the next Route Choice.

Node 0 sits outside the ten-node Route Map and has no Route Prospect or separate deployment-adaptation call. If neither the Player Character nor a Starting Crewmate is a Captain, validated Node 0 Resolution provides an eligible campaign Ship without normally making Ship acquisition the node's main premise. The opening procedure reconciles [ADR-0041](../../../../adr/0041-campaigns-open-with-a-director-selected-node-zero.md) and [ADR-0042](../../../../adr/0042-player-character-and-ship-ownership-are-separate.md). The ordering reconciles [ADR-0046](../../../../adr/0046-route-choice-precedes-deployment-preparation.md).

<!-- source-slice: core.campaign.pre-node-timing -->
## 3. C1 Clarification - Pre-Node Timing

Current decision: **Route Choice occurs first; Deployment Preparation occurs after that choice and before starting the selected node.**

The runtime must not begin the node's active scene until required post-choice preparation is complete.

This incorporates the Rook campaign pause state: after selecting Relay Cache E-43, play paused until the character chassis update could support character tracker display, level-up/advancement handling, loadout choice, final team choice, and then node start.

<!-- source-slice: core.campaign.route-structure -->
## 4. Route Structure

The player controls a mobile crew traveling through the solar system. A campaign may include a Ship, but a Ship and Captain are not universal requirements. Each Route Node is a playable stop on a consequential journey with a range of potential reasons and outcomes.

The route structure exists to make choice, loss, opportunity, travel resources, faction pressure, and consequence carry forward.

<!-- source-slice: core.campaign.node-definition -->
## 5. Node Definition

A node is a playable Location, not merely a map point or necessarily a Ship stop.

A node may be:

- station;
- colony;
- derelict;
- orbital platform;
- moon settlement;
- asteroid site;
- ship contact;
- faction checkpoint;
- distress signal;
- research site;
- black-market dock;
- anomaly.

No fixed node type percentage or final node taxonomy is defined yet.

## 6. Route Choice Inputs

PC skills, crew skills, ship systems, equipment, faction status, and prior choices can affect:

- visible node options;
- route forecasting;
- risk identification;
- encounter approaches;
- hidden rewards;
- bypass options;
- ship functions;
- non-combat outcomes;
- follow-up opportunities.

<!-- source-slice: core.campaign.route-choice-display -->
## 7. Route Choice Display

Rook playtest evidence indicates that too many accumulated opportunities can reduce decision quality. Core guidance: keep next-node or next-step choices readable and limited when possible.

A default target of around four meaningful choices is useful, but this is a pacing/display guideline rather than a hard world rule.

## 8. Travel Resources

Travel requires resources. Exact resources and costs are deferred.

Travel resources should make route choice matter, but the current Core domain does not define the final resource model.

## 9. Ship Upgrades and Node Access

Certain nodes may require ship upgrades or may be safer, more profitable, or more legible with better ship systems.

Skills, equipment, crew, faction context, and ship systems can reveal hidden nodes, forecast risk, improve approach options, or alter outcomes.

## 10. Campaign Tracker Update

After each node, update:

- PC and crew state;
- ship state;
- resources;
- injuries;
- equipment changes;
- faction changes;
- quest hooks;
- side quest leads;
- known route options;
- open questions;
- consequences.

## 11. Campaign-Scale Consequence Principle

Early campaign play should stay crew-scale, but the route structure should let local actions matter. The crew can affect evidence, people, access, resources, rescue outcomes, faction leverage, station survival, mission timing, and local nodes of control.

Major campaign escalation is possible later, but the first campaign should not require the crew to start as empire-level actors.


<!-- source-slice: core.campaign.route-node-end-report -->
## 12. Route Node End Report and Save Workflow

When a Route Node ends, the runtime produces a compact Route Node End Report before Downtime resumes.

A Route Node End Report appears after immediate Location resolution and before Downtime, repair, crew talk, travel, or the next Route Choice.

Recommended report contents:

- result confirmations;
- objective result;
- loot, rewards, salvage, pickups, clues, and open leads;
- persistent aftermath;
- crew/ship/resource changes;
- active counters, clocks, heat, faction shifts, and unresolved risks;
- inventory/objective condition updates;
- next-state options;
- Save/dashboard export reminder when persistent state changed.

Persistent aftermath must state a concrete gameplay effect or route to a concrete future effect. Avoid vague consequences that do not say what changes in play.

The day-one game maintains one rolling **Campaign Autosave**. Consequence-bearing commits, including actions, Checks, Dialogue Outcomes, recruitment, Route Choice, Permanent Loss, and Route Node Resolution, checkpoint durably before their committed performance is released. Active Location state also flushes at stable boundaries and bounded intervals, including Area changes, pause, Save & Quit, and Location transition; it does not write a new save for every rendered movement frame.

The player may Continue from the latest valid autosave, use Save & Quit to force a final flush, and export or import a save for portability and disaster recovery. The default campaign exposes no ordinary manual save slots or quickload. A prior validated checkpoint may be retained internally for corruption or crash recovery but is not a player-facing consequence-reversal timeline.

When the campaign has a Ship, the Campaign Autosave preserves its persistent Location state, Ship Frame, installed Modules, Systems, Conditions, armory and inventory, resources, crew positions and assignments, and current Downtime state. Returning from a Route Node loads that committed Ship state and applies only validated resolution changes rather than rebuilding or resetting the home Location.

Route Node Resolution must commit its complete durable checkpoint before the read-only Route Node End Report appears. If that save fails, Nexus remains in the Location at a stable pre-transition state and offers recovery or retry without presenting the recap or loading the Ship. Crew Archive persistence remains separate from the campaign save so campaign restore cannot duplicate or roll back cross-run collection history. This reconciles [ADR-0020](../../../../adr/0020-default-campaign-saves-preserve-consequences.md) and [ADR-0095](../../../../adr/0095-day-one-campaigns-use-one-rolling-autosave.md).

In DM Mode, `Save` means producing or updating a durable dashboard/state export, not silently relying on chat memory. Persistent aftermath belongs in `Dashboards`.

This is a procedural source cue, not final campaign math. Detailed dashboard layout remains `Dashboards`. Detailed display templates belong to `Modes` and/or `Dashboards`.

<!-- source-slice: core.campaign.director-planning -->
## 13. Director planning and node transitions

The Campaign Director plans at explicit checkpoints rather than continuously rewriting future play. It prepares the opening, reacts after material committed outcomes, refreshes Route Prospects, prepares the chosen node, and replans the Climax Set when needed. Hidden plans remain in Director State until validated content is promoted into play. This reconciles [ADR-0040](../../../../adr/0040-director-planning-is-checkpoint-triggered-and-prepares-each-node.md).

The current quality-first baseline between ordinary Route Nodes uses four specialized Director calls: update campaign priorities after Route Node Resolution; generate Route Prospects at Downtime start; plan the confirmed destination; and adapt its Node Brief after Deployment Preparation. Each call emits a bounded, validated, independently traceable artifact. The four-call sequence is provisional: fixtures and playtests evaluate cost, latency, retries, redundancy, validation yield, and creative improvement so stages can be merged or removed when they do not justify their cost. Node 0 remains the two-call exception. This reconciles [ADR-0047](../../../../adr/0047-four-stage-node-transition-planning-is-provisional.md).

<!-- source-slice: core.campaign.climax-and-resolution -->
## 14. Climax Set and campaign resolution

In the current ten-node campaign shape, Nodes 8, 9, and 10 form an order-sensitive **Climax Set**. Convergence is communicated through discoveries, faction behavior, pressure, and other diegetic signals rather than an out-of-world warning. The Director replans remaining climax content after committed outcomes so order matters without invalidating prior truth. Node 10 contains the playable finale; campaign resolution begins only after the finale's consequences are committed. This reconciles [ADR-0051](../../../../adr/0051-the-final-three-route-nodes-form-an-order-sensitive-climax-set.md), [ADR-0052](../../../../adr/0052-the-climax-is-communicated-through-diegetic-convergence.md), [ADR-0053](../../../../adr/0053-climax-order-effects-are-dynamically-replanned.md), and [ADR-0054](../../../../adr/0054-node-ten-hosts-the-playable-finale-and-resolution-follows.md).

Resolution first builds a deterministic closure plan from committed campaign state, then performs the epilogue from that plan. It states material unresolved threads honestly rather than forcing false closure. The same structured resolution path applies after an early campaign loss. This reconciles [ADR-0055](../../../../adr/0055-campaign-resolution-separates-closure-planning-from-epilogue-performance.md), [ADR-0056](../../../../adr/0056-campaign-resolution-preserves-material-unresolved-threads.md), and [ADR-0069](../../../../adr/0069-early-campaign-loss-still-enters-the-legacy-world.md).

<!-- source-slice: core.campaign.legacy-world -->
## 15. Legacy World continuation

A completed or lost campaign appends a retrievable **Saga Source** and validated bounded consequences to its **Legacy World**. Campaign reach describes where the crew could act; consequence scope describes what actually changed. Those are evaluated separately. Validated consequences promote automatically after resolution rather than waiting for discretionary canon approval. This reconciles [ADR-0057](../../../../adr/0057-completed-campaigns-append-retrievable-saga-sources.md), [ADR-0058](../../../../adr/0058-campaigns-create-bounded-world-consequences.md), [ADR-0059](../../../../adr/0059-campaign-reach-and-legacy-consequence-scope-are-separate.md), and [ADR-0068](../../../../adr/0068-validated-legacy-consequences-promote-automatically.md).

Legacy World campaigns occupy one forward sequence. After Player Character and crew selection, the next campaign receives a literal calendar start date later than the prior resolved state; bounded between-campaign developments may advance the world without erasing established consequences. `LORE-TIMELINE-001` owns chronology and visibility details. This reconciles [ADR-0060](../../../../adr/0060-legacy-world-campaigns-advance-one-forward-sequence.md), [ADR-0061](../../../../adr/0061-legacy-worlds-use-literal-calendar-chronology.md), [ADR-0062](../../../../adr/0062-campaign-start-dates-follow-player-and-crew-selection.md), and [ADR-0063](../../../../adr/0063-legacy-worlds-have-bounded-between-campaign-developments.md).

## 16. Domain Routing Notes

- Exact travel resource types and costs route to future campaign/equipment/economy work.
- Route-node content generation routes to `Content`.
- System maps and route-node companions route to `Play Aids`.
- Faction consequences route jointly to `Lore` and `Dashboards`.
- Active campaign counters and persistent aftermath route to `Dashboards`.
- Display templates for Route Node End Reports route to `Modes` and `Dashboards`.

## Source Handling Note

This current Core-domain source preserves and reorganizes useful campaign material from prior Nexus work while applying accepted spatial and campaign decisions.
