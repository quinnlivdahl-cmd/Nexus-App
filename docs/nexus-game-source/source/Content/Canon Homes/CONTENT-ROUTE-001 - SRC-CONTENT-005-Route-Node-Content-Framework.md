---
project: "Nexus"
doc_id: "CONTENT-ROUTE-001"
legacy_ids:
  - 'SRC-CONTENT-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\13 Content Systems rev0.5\SRC-CONTENT-005 - Route_Node_Content_Framework.md'
title: "Route_Node_Content_Framework"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "canon_home"
topic_family: "route_node_content_framework"
owns_topics:
  - 'route_node_content_framework'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from CONTENT-CORE-005 to CONTENT-ROUTE-001. Phase 10 consolidated body routing into domain-first language, repaired inherited display corruption, and preserved the active route-node framework without relying on slot-era wording."
---

# Route Node Content Framework

<!-- source-slice: content.route-node.purpose -->
## Purpose

Route Nodes are the campaign-scale content unit that link travel, Downtime, explorable Locations, objectives, and consequences.

A route node is not always a fight. It may be a tactical mission, investigation, social pressure point, hazard crossing, salvage opportunity, recovery stop, faction checkpoint, dead drop, or choice fork.

<!-- source-slice: content.route-node.content-fields -->
## Node content fields

A Route Node seed should include:

```text
Node name:
Node type:
Location / route layer:
Why go:
Primary objective:
Pressure objective:
Optional objective or opportunity:
Known risk:
Likely opposition:
Hazards:
Skill-revealed options:
Loadout considerations:
Entry state:
Location realization needs:
Counters / clocks:
Exit states:
Persistent aftermath:
Reward / lead / salvage outcomes:
```

<!-- source-slice: content.route-node.pre-node-procedure -->
## Pre-node procedure

Route Choice occurs before Deployment Preparation. Crew and loadout selection then occur before starting the selected node. Advancement choices occur during this window when available.

Pre-node questions should be practical:

- who goes;
- who supports from the ship;
- what loadout each active crew member carries;
- what known risks the loadout should answer;
- what objective or opportunity the crew is prioritizing.

<!-- source-slice: content.route-node.objectives-and-opportunities -->
## Objectives and opportunities

Separate objectives from opportunities.

- Objective: the thing the crew is trying to accomplish or preserve.
- Pressure objective: what must be prevented or managed while pursuing the main objective.
- Opportunity: optional reward, shortcut, leverage, clue, ally, or safer route.

The Rook handoff produced a useful discipline: when a lead opens, do not create too many parallel options. Add one objective and maybe one opportunity unless the player explicitly asks for a broader survey.

<!-- source-slice: content.route-node.node-end-report -->
## Node end report

At Route Node end, the runtime produces a Route Node End Report before Downtime or the next Route Choice.

Content-side structure:

```text
Result Confirmations:
Persistent Updates:
Save Routing:
Next State:
```

Persistent updates may include heat, damage, complications, opportunities, objectives, active counters, and crew state.

## Route Prospect selection and lapse

The Director presents a bounded set of meaningful **Route Prospects**. A set may mix main-thread opportunities with consequential side paths; no display label is required to declare which is which. Campaign pressure should create non-obvious tradeoffs without hiding the concrete stakes the crew could reasonably perceive. This reconciles [ADR-0048](../../../../adr/0048-route-choices-mix-main-thread-and-consequential-side-paths.md) and [ADR-0049](../../../../adr/0049-campaign-pressure-creates-non-obvious-consequential-route-choices.md).

Unchosen Route Prospects normally lapse when a choice commits. A later prospect may revisit related people, places, or pressures, but it is a newly prepared opportunity shaped by elapsed time and prior consequences, not an unchanged menu item held open indefinitely. This reconciles [ADR-0050](../../../../adr/0050-unchosen-route-prospects-normally-lapse.md).

## Transit and Travel Consequences

Literal **Transit** normally connects distinct Route Node Locations. Local movement within one Location is not Transit merely because it crosses distance. Exceptions must be explicit. This reconciles [ADR-0044](../../../../adr/0044-transit-normally-connects-distinct-route-node-locations.md).

Before Route Choice commits, each prospect exposes deterministic **Travel Consequences** that the crew can evaluate, such as time, resource use, known hazards, access requirements, or pressure changes. Generated description may explain those consequences but cannot invent or alter them. This reconciles [ADR-0045](../../../../adr/0045-route-prospects-show-deterministic-travel-consequences.md).

## Save routing

"Save" means producing an updated dashboard file or export, not merely updating internal state. `Content` owns the categories to save; `Modes` and `Dashboards` own display and export procedure.

<!-- source-slice: content.route-node.campaign-specific-node-caution -->
## Campaign-specific node caution

Playtest nodes such as Ternary Lock and Maintenance Relay Cache E-43 are useful examples of node structure, but they are campaign state until promoted. Do not treat them as default canonical route-node content.

<!-- source-slice: content.route-node.route-consequences -->
## Node content and route consequences

Route nodes may cost or create:

- time;
- fuel or ship resources;
- crew Health, Morale, Loyalty, or injury state;
- faction heat;
- access credentials;
- route opportunities;
- salvage;
- information;
- repair needs;
- ship upgrade pressure;
- future objective availability.

<!-- source-slice: content.route-node.route-node-end-report-fields -->
## Mass-intake alignment: Route Node End Report fields

Route-node content should identify what may be summarized in the Route Node End Report:

- completed objectives;
- failed or partial objectives;
- inventory additions;
- rewards, salvage, data, access, favors, or leads;
- persistent aftermath;
- Health, Morale, or Loyalty effects;
- active counters/clocks;
- unlocked route options;
- blocked/changed route options;
- follow-up tasks;
- state changes that must be saved before Downtime or the next Route Choice.

### Pickup correction

Pickups are added to inventory. They are not carried inactive equipment by default and do not imply extra equipment slots. If a pickup changes immediate loadout use, the content entry must state the special rule or scene permission explicitly.
