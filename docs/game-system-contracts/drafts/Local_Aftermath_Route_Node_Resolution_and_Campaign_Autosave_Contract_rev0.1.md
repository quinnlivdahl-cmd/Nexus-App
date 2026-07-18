# Local_Aftermath_Route_Node_Resolution_and_Campaign_Autosave_Contract_rev0.1

Controlling issue: Define Local Aftermath, return-to-Ship, and save contracts #28
Parent map: Spatial Vertical Slice Map #57
Date opened: 2026-07-17
Scope: day-one spatial vertical-slice behavior and canonical-source reconciliation; no production implementation

## 1. Purpose

This contract defines how the first spatial vertical slice:

- enters and leaves Local Aftermath without resetting its persistent Location;
- permits deliberate departure without requiring objective success;
- commits recruitment, Field Team, Location Support Assignment, and Stranded Crewmate state;
- resolves a Route Node through one atomic, durable transaction;
- presents a read-only Route Node End Report from committed player-safe facts;
- continues into the explorable Ship for day-one Downtime; and
- maintains one rolling consequence-preserving Campaign Autosave.

Rules Core and committed Game Truth remain authoritative. Generated Performance and the Campaign Director may propose or describe bounded content but cannot resolve a Route Node, change roster authority, manufacture extraction, edit a recap, or commit a save.

## 2. Settled dependencies and boundaries

The following remain controlling:

- One Route Node is one persistent explorable Location.
- Free Movement, Tactical Pressure, Turn-Based Mode, and Local Aftermath operate on the same Location truth.
- Tactical Pressure ends only after every active Tactical Pressure Trigger clears through committed results.
- The ordinary action, Effect, StateDelta, and system-transaction contracts own validated state mutation.
- Campaign Save serializes active Location-owned Tactical State when ordered play is active.
- The normal campaign preserves consequences through autosave and offers no routine quickload.
- Game Truth, Director State, and Crew Archive persistence use distinct authority lanes.
- Downtime is location-neutral in the production game, although the day-one slice implements the Ship as its only post-node Downtime Location.

This contract does not define:

- a production backtracking loop;
- Campaign Director-driven evolution of departed Locations;
- rescue generation or off-Location simulation for Stranded Crewmates;
- multiple Downtime Locations for the day-one slice;
- a reload-friendly/manual-checkpoint mode;
- final recap layout, animation, or visual styling; or
- production persistence technology, file format, database, or cloud synchronization.

## 3. Phase and transition model

The day-one phase sequence is:

```text
Free Movement
-> Tactical Pressure, when a validated trigger activates
-> Local Aftermath, when every trigger clears
-> Route Node Resolution, when the player deliberately departs
-> Route Node End Report, after durable resolution commit
-> Ship Downtime, after the player continues from the report
```

One phase never copies or reconstructs the authoritative Location. Each transition reads the latest committed truth.

A committed forced-departure outcome may remove ordinary player discretion about whether departure occurs, but it still uses the same Local Aftermath, resolution, durable-save, recap, and next-Location contracts. It does not create a combat-results shortcut.

## 4. Local Aftermath

### 4.1 Entry

At the first post-commit evaluation where every Tactical Pressure Trigger is clear:

1. the current atomic transaction and already-fired reactions finish;
2. pressure-bound unused activations and Timing Entries cancel under the Tactical Pressure contract;
3. the deterministic mode transition commits Local Aftermath; and
4. Free Movement resumes in the same changed Location.

Actor positions, Health, resources, statuses, object state, hazards, objectives, discoveries, inventory, relationships, Recruitment Results, Location Support Assignments, schedules, and consequences remain exactly as committed. Entering Local Aftermath grants no healing, resource reset, loot sweep, roster reset, or objective result by itself.

### 4.2 Continued play

During Local Aftermath the player may continue ordinary grounded Location play, including:

- movement, inspection, dialogue, and validated actions;
- collecting reachable items or leaving them behind;
- resolving remaining non-pressure objectives or accepting that they remain incomplete;
- accepting recruitment;
- changing the Field Team through the physical swap rule;
- assigning or revisiting Location Support Assignments; and
- preparing or attempting departure.

If a new Tactical Pressure Trigger activates, a new Tactical Pressure period begins from current committed Location truth. Local Aftermath does not grant immunity from later danger.

### 4.3 Departure availability

Objective success is not a departure requirement. The player may attempt departure whenever:

- a rules-valid departure point or forced-departure outcome exists;
- the departure interaction is reachable by the active Field Team;
- no active Tactical Pressure Trigger currently requires ordered resolution; and
- every actor intended to extract is present or has a validated safe route for Rally to Extraction.

Completed, failed, abandoned, and unresolved objectives remain distinct committed outcomes. An unresolved hazard, pursuit, countdown, or contested extraction may activate or retain Tactical Pressure rather than being bypassed through a menu.

## 5. Recruitment, Field Team changes, and Location support

### 5.1 Recruitment Result

An accepted Recruitment Result commits immediately through its own atomic transaction. It:

- preserves the recruit's Character Profile and existing Actor State;
- creates or activates the campaign CrewMember reference;
- attaches the predetermined legal current-level Campaign Build;
- retains the recruit's actual Health, statuses, resources, equipment, position, knowledge, and relationships; and
- records the offer, acceptance, source Location, and commit transaction.

Recruitment provides no free healing, rearm, equipment replacement, teleportation, or state normalization. The later recap confirms the committed addition but does not create or approve it.

### 5.2 In-Location Field Team swap

The day-one Field Team remains the Player Character plus two non-Player-Character members. After recruitment, the player may immediately replace either non-Player-Character member with the recruit.

The swap:

- commits the revised Field Team references atomically;
- never increases the directly controlled Field Team beyond three;
- preserves every involved actor's current state and position; and
- creates a Location Support Assignment for the displaced Crewmate at their actual committed position.

The swap itself never moves an actor. Establishing support at another position requires ordinary movement and a later validated assignment change.

The player may reverse or change the swap only by physically returning to the support position during Free Movement. There is no remote roster menu, teleporting exchange, or default party-composition change during Tactical Pressure.

### 5.3 Location Support Assignment

A Location Support Assignment records:

- the assigned Crewmate and Location;
- the actual committed position or Interaction Position where the assignment begins;
- the grounded task, object, Area, or objective being supported;
- the authorized contextual benefit and its existing rule source;
- interruption, completion, or invalidation conditions; and
- the transaction that created or last revised the assignment.

The assigned Crewmate remains an authoritative Location actor. They do not follow as an autonomous fourth Field Team member. If danger reaches them or their task, existing Tactical Participation rules determine whether they join ordered play.

### 5.4 Rally to Extraction

Rally to Extraction is a player-issued Local Aftermath order for deployed actors outside the active Field Team. It may use automatic pathing only when deterministic navigation validates a safe route to the departure point.

Rally does not teleport an actor or ignore hazards, locked paths, active Tactical Pressure, incapacitation, hostile control, or another committed obstruction. A failed or invalid Rally returns a truthful reason and leaves actor state unchanged.

### 5.5 Stranded Crewmate

If the player explicitly departs without a living Crewmate or accepted recruit, Route Node Resolution commits that character as Stranded regardless of whether a safe Rally route existed. Safe reachability controls whether Rally is available; it does not erase the consequence of deliberately leaving without the actor.

The Stranded record preserves references to:

- Character Profile, Crew Archive Entry, and Campaign Build;
- exact Actor State at departure;
- last known Location, Area, and position;
- known surrounding actors, hazards, objectives, and conditions relevant to the separation;
- player knowledge and hidden-state visibility boundaries; and
- the departure and Route Node Resolution transactions.

The character leaves the active Crew Roster but is not inferred dead, captured, escaped, or Permanently Lost. Day one stores the record only. Rescue generation, elapsed-time evolution, and later resolution are deferred.

## 6. Route Node Resolution transaction

### 6.1 Authority and trigger

Route Node Resolution begins only from:

- a player-confirmed departure interaction during Local Aftermath; or
- a committed forced-departure outcome authorized by existing rules.

Generated Performance cannot infer departure from narration. The recap cannot trigger or approve resolution.

### 6.2 Validation

Before commit, Rules Core validates:

- current Game Truth and revision;
- Route Node and Location identity;
- phase and active-trigger state;
- departure point and method;
- extracting actor set;
- Rally paths and arrival results;
- every explicit leave-behind decision;
- objective, hazard, schedule, and counter disposition;
- inventory transfers and items remaining in the Location;
- Recruitment Results, Field Team state, support assignments, and Stranded records;
- campaign-facing Effects and StateDeltas; and
- the complete durable save draft.

If any required dependency changes before commit, the transaction aborts and rebuilds from current truth. No partial Route Node Resolution is retained.

### 6.3 Atomic commit

One Route Node Resolution transaction references prior committed outcomes and commits only new departure-time state. It atomically:

1. references final in-Location actions and Rally results without replaying them;
2. establishes the final extracting actor set;
3. commits explicit Stranded records;
4. commits only objective disposition changes caused by departure, such as abandonment, while referencing previously committed completions and failures;
5. commits the final departed Location snapshot from current truth;
6. references collected inventory and resources, leaves uncollected items in Location truth, and commits only departure-triggered transfers;
7. references prior Recruitment Results and roster changes while committing only departure-time roster or support-assignment closure state;
8. commits only departure-triggered campaign counter, clock, faction, relationship, knowledge, route, and pressure changes while referencing earlier effects;
9. creates the Route Node Resolution record and route-history entry;
10. creates a player-safe Route Node End Report projection;
11. sets the next flow state to `route_node_end_report`, with the Ship as the day-one next Location; and
12. writes the new rolling Campaign Autosave checkpoint.

The commit occurs before recap presentation. A crash after commit but before presentation resumes at the recap from the committed projection and does not repeat any effect.

### 6.4 Resolution record

The durable Route Node Resolution record contains at minimum:

```text
RouteNodeResolutionRecord
- id
- campaignId
- routeNodeRef
- departedLocationRef
- departureTransactionRef
- departureMethod
- resolvedAtGameTruthRevision
- resolvedAtWorldTime, when world time exists
- extractingActorRefs[]
- strandedCharacterRefs[]
- objectiveDispositionRefs[]
- persistentConsequenceRefs[]
- recruitmentResultRefs[]
- rosterChangeRefs[]
- inventoryAndResourceDeltaRefs[]
- campaignEffectRefs[]
- departedLocationSnapshotRef
- playerSafeReportRef
- nextFlowState
- nextLocationRef
```

The record references authoritative committed state rather than duplicating every object payload.

## 7. Departed Location snapshot

The departure snapshot is the day-one restoration baseline and contains or references:

- Location identity, authored Blueprint/module revisions, Areas, geometry, navigation, Interaction Positions, and Cover Positions;
- actor identities, positions, Health, resources, statuses, awareness, relationships, knowledge, and presence state;
- objects, doors, terminals, containers, fixtures, inventory, damage, access, and interaction state;
- hazards, objectives, triggers, schedules, counters, clocks, discoveries, and persistent consequences;
- collected versus remaining items and resources;
- unresolved or abandoned objective state;
- Location Support Assignment terminal state;
- Stranded actor state;
- final Location and rules-policy revisions; and
- the transaction and snapshot integrity metadata required for validation and recovery.

Expired presentation state, completed animations, transient path previews, hover state, and cancelled pressure-bound sequence entries do not persist as Location truth.

Day one does not build Director-driven elapsed-time evolution or a rescue/backtracking loop. If development or recovery tooling reloads a departed Location, it restores this committed snapshot unchanged.

## 8. Campaign Autosave

### 8.1 One rolling save per campaign

Each campaign owns one rolling Campaign Autosave. It is not a list of player-selected save slots and does not expose routine quickload.

The save envelope contains or references:

```text
CampaignSave
- saveFormatVersion
- campaignId
- gameTruthRevision
- rulesPolicyRevisions
- lastCommittedTransactionRef
- currentFlowState
- activeLocationRef, when present
- activeLocationSnapshotRef, when present
- departedLocationSnapshotRefs[]
- activeRouteNodeRef, when present
- latestRouteNodeResolutionRef, when present
- shipStateRef, when the campaign has a Ship
- campaignStateRef
- routeHistoryRef
- rosterAndCharacterStateRefs
- inventoryAndResourceStateRefs
- relationshipAndKnowledgeStateRefs
- objectiveHazardCounterClockRefs
- recruitmentAndStrandedStateRefs
- recapProjectionRef, when currentFlowState is route_node_end_report
- nextLocationRef, when a transition is pending
- directorStateSaveRef
- integrityAndRecoveryMetadata
```

Director State persists through a separate local lane referenced by the campaign save. Crew Archive state persists separately and is not rolled back, duplicated, or overwritten by campaign import or recovery.

The Ship state reference preserves the Ship Location snapshot, Ship Frame, installed Ship Modules, Ship Systems, Ship Conditions, accessible armory and inventory, resources, crew positions, support assignments, and current Downtime state. Leaving a Route Node does not rebuild or reset the Ship; the handoff loads its latest committed state and applies only validated Route Node Resolution changes.

### 8.2 Checkpoint policy

The rolling save checkpoints immediately after consequence-bearing commits, including:

- validated actions, Effects, and StateDeltas;
- Lattice Checks and Dialogue Outcomes;
- recruitment and Field Team changes;
- Route Choice;
- Permanent Loss or Stranded state;
- Tactical Pressure mode and sequencing changes required for deterministic resume; and
- Route Node Resolution and post-recap Ship activation.

Continuous navigation does not require a durable write every rendered frame. Active Location state flushes at bounded intervals and stable boundaries, including Area changes, pause, Save & Quit, and Location transition. A checkpoint never captures a half-applied transaction.

### 8.3 Player controls

The day-one player-facing save controls are:

- **Continue**: resume the latest valid rolling Campaign Autosave;
- **Save & Quit**: finish or cancel current uncommitted work safely, flush the latest fully committed state, then exit; and
- **Export / Import**: create or restore a portable campaign-save package for portability and disaster recovery.

Save & Quit is available during Free Movement, Tactical Pressure, Local Aftermath, the recap, and Ship Downtime. During an in-flight transaction it waits for the current authorized commit or returns to the last stable committed state; it never serializes an ambiguous middle state.

No ordinary manual save slots, save-scumming quickload, or exposed checkpoint history exist in the default day-one campaign. The optional reload-friendly mode from ADR-0020 is deferred.

### 8.4 Recovery checkpoint

The runtime may retain the prior validated checkpoint or equivalent recovery data to repair corruption or recover from an interrupted write. This data is not presented as a selectable earlier timeline and cannot be used to reverse a valid consequence.

Import validates format, integrity, references, rules compatibility, Game Truth ownership, Director State boundaries, and Crew Archive separation before activation. Invalid imports cannot partially replace active state.

## 9. Route Node End Report

The Route Node End Report is a read-only, player-safe projection of the committed Route Node Resolution record. It may summarize:

- objective dispositions;
- recruitment and roster changes;
- extracting and Stranded characters;
- collected loot, rewards, salvage, resources, clues, and open leads;
- player-known persistent aftermath;
- crew, Ship, faction, relationship, counter, and clock changes;
- unresolved known risks; and
- the successful autosave state and next destination.

The report:

- cannot approve, revise, defer, reroll, or recommit an outcome;
- cannot reveal hidden Game Truth, Director State, secret causes, or undiscovered information;
- is reproducible from committed references after reload; and
- remains the current flow state until the player continues.

Exact layout, card order, animation, iconography, and wording belong to later UI work.

## 10. Day-one Ship handoff

Continuing from the recap commits a second deterministic transition that:

- closes the recap flow state;
- restores and activates the latest committed persistent Ship Location and Ship state;
- applies only validated Route Node Resolution changes to Ship inventory, resources, systems, conditions, and crew state;
- places all successfully extracting characters at validated Ship arrival positions;
- retains Stranded characters in the departed Location snapshot and outside the active Crew Roster;
- enters Ship-based Downtime; and
- writes the next Campaign Autosave checkpoint.

This Ship destination is a day-one slice boundary. Production Downtime remains location-neutral and may later activate another suitable staging Location without changing the resolution, recap, or save contracts.

## 11. Failure and recovery behavior

### 11.1 Ordinary checkpoint failure

If a background or boundary checkpoint fails:

- the in-memory committed state remains authoritative for the active session;
- Nexus reports that durability is degraded without exposing hidden diagnostics;
- another consequence-bearing transition that would make recovery ambiguous is blocked until retry or safe export succeeds; and
- no failed write is reported as saved.

### 11.2 Route Node Resolution failure

If validation, serialization, integrity checking, or durable write fails before Route Node Resolution commits:

- the entire resolution transaction aborts;
- the player remains in the Location at the last stable committed state;
- no recap is released;
- the Ship does not load;
- no roster, objective, reward, Stranded, or route-history result partially applies; and
- the player receives a safe retry or export/recovery path.

If the atomic commit succeeds but presentation fails, reload resumes the committed recap. If the Ship activation commit succeeds but Ship rendering fails, reload resumes from the committed Ship state rather than replaying Route Node Resolution.

## 12. Authority matrix

| Concern | Owner |
| --- | --- |
| Action, Effect, StateDelta, objective, hazard, extraction, and Rally validation | Rules Core |
| Actor, object, geometry, Location Support Assignment, and departed snapshot truth | Location and existing entity owners |
| Character identity, Campaign Build, CrewMember, Field Team, and Stranded references | Character and crew state owners |
| Route Node Resolution transaction and flow-state transition | Deterministic campaign rules and transaction layer |
| Rolling checkpoint orchestration, integrity, recovery, export, and import | Campaign Save |
| Hidden future planning | Director State local lane |
| Cross-campaign collection and eligibility | Crew Archive separate lane |
| Player-safe recap projection and Ship/Downtime presentation | React/app shell from committed records |
| Bounded adaptive proposals and Generated Performance | Campaign Director / Model Runtime, subject to validation |

The Campaign Director cannot mutate any owner in this table directly.

## 13. Day-one acceptance scenarios

### 13.1 Successful departure

1. The final trigger clears and Local Aftermath begins.
2. The player collects reachable salvage and deliberately departs.
3. Rules Core validates extraction and atomically commits resolution plus autosave.
4. The read-only recap appears.
5. Continue loads the Ship and writes the Ship checkpoint.

### 13.2 Departure with unfinished objectives

1. Local Aftermath begins with an optional objective incomplete.
2. The player departs anyway.
3. Resolution records the objective as abandoned or unresolved according to its rules.
4. The recap reports only the player-known disposition and consequences.

### 13.3 Recruitment and physical swap

1. An NPC accepts recruitment and the Recruitment Result commits.
2. The player swaps the recruit for one non-Player-Character Field Team member.
3. The displaced Crewmate holds a Location Support Assignment.
4. Returning physically to that position permits another Free Movement swap.
5. Save & Quit and Continue restore the exact roster, assignments, positions, and actor state.

### 13.4 Rally and Stranded state

1. A support Crewmate has a validated safe route to extraction and Rally succeeds through automatic pathing.
2. Another Crewmate is cut off with no safe route.
3. The player explicitly leaves without that Crewmate.
4. Resolution commits the character as Stranded with exact state and Location evidence, not dead or Permanently Lost.
5. Day one generates no rescue content or elapsed-time evolution.

### 13.5 Save during Tactical Pressure

1. The player invokes Save & Quit during ordered play.
2. The current atomic action finishes or uncommitted work safely cancels.
3. Campaign Save serializes the active Location and Location-owned Tactical State.
4. Continue restores actors, triggers, Initiative, round, cursor, Timing Entries, active Areas, and current committed resources without rerolling or replaying effects.

### 13.6 Resolution save failure

1. The player confirms departure.
2. The durable Route Node Resolution write fails.
3. No resolution effect, recap, or Ship transition appears.
4. The player remains at the last stable committed Location state and may retry or use the safe recovery/export path.

## 14. Implementation handoff

Integration Contract #30 may choose concrete modules, schemas, storage adapters, checkpoint cadence values, and UI components, but it must preserve these invariants:

- Local Aftermath remains in the same Location.
- Departure is deliberate and does not require objective success.
- Recruitment, physical swaps, support assignments, Rally, and Stranded state are consequence-preserving.
- Route Node Resolution is atomic and durably saved before recap presentation.
- The recap is read-only and player-safe.
- The day-one recap continues to the explorable Ship.
- The default campaign uses one rolling autosave with Continue, Save & Quit, and export/import.
- Save & Quit can resume exact Tactical State.
- No default quickload, manual save-slot timeline, future rescue system, or Director-driven revisit evolution is introduced by this contract.
