---
project: "Nexus"
doc_id: "CORE-SHIP-001"
legacy_ids:
  - 'SRC-CORE-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\07 Core Game Campaign rev0.3\SRC-CORE-005 - Ship_Phase_and_Crew_Operations.md'
title: "Ship_Phase_and_Crew_Operations"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Core"
content_role: "canon_home"
topic_family: "ship_phase_and_crew_operations"
owns_topics:
  - 'ship_phase_and_crew_operations'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 Core consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Ship and Downtime Operations

## 1. Purpose

Downtime is the location-neutral interval between Route Nodes. It is where the player may review state, manage crew and loadouts, handle recovery and consequences, choose a Route Prospect, and prepare for the selected node. These activities may occur aboard a Ship or at another suitable Location; returning to a Ship is not mandatory. This reconciles [ADR-0043](../../../../adr/0043-downtime-is-location-neutral-between-route-nodes.md).

## 2. Ship Layer

When the campaign has a Ship, it is a major explorable home Location. Ship ownership and the Captain role are optional and separate from Player Character identity. This reconciles [ADR-0042](../../../../adr/0042-player-character-and-ship-ownership-are-separate.md).

The ship stores equipment, supports loadout decisions, consumes travel resources, carries ship systems/upgrades, and may gate or improve route access.

## 3. Ship State Checklist

At the start of Downtime, or after a Route Node End Report, review the relevant available state:

- PC state;
- crew state;
- ship condition;
- resources;
- equipment inventory;
- current loadouts;
- ship systems/upgrades;
- active goals;
- faction pressure/consequences;
- visible route options;
- side quest leads;
- open questions or unresolved clocks;
- persistent aftermath and active counters that survived the prior node;
- inventory changes, including pickups added to ship/crew inventory.

## 4. Crew and Loadout Procedure

After Route Choice and before an active node begins, the player reviews available crew, selects the Field Team, chooses or adjusts loadouts, and considers relevant support or readiness.

This Deployment Preparation happens after selecting a node and before the node starts. This reconciles [ADR-0046](../../../../adr/0046-route-choice-precedes-deployment-preparation.md).

Node 0 is the exception: Player Character Creation and Starting Crew selection provide complete starting Embodiments, builds, and loadouts before the two-call Campaign Opening Pipeline, so there is no additional Deployment Preparation step between those calls.

## 5. Advancement / Level-Up Timing

The Rook campaign established a useful procedure: proverbial level-ups or advancement choices should occur during pre-node loadout/crew selection rather than interrupting the middle of a node.

Current procedural default:

1. Display current crew tracker / character info.
2. Apply available level-up, advancement, or chassis updates.
3. Choose the node team.
4. Choose equipment/loadout.
5. Confirm ship support and readiness.
6. Start the node only after the above are clear.

Campaigns begin at level 0. The first advancement occurs after Node 0 and before Node 1; later advancement follows the accepted per-node cadence. This reconciles [ADR-0071](../../../../adr/0071-campaigns-start-at-level-zero-and-advance-before-node-one.md).

Detailed character advancement rules belong to `Characters`. Detailed loadout/equipment rules belong to `Equipment`.

## 6. Planning and Prep Value

Planning and prep should have serious value. Downtime is not only inventory cleanup; route forecasting, faction pressure, crew skills, equipment, available Ship systems, and player plans should improve options or reduce risk.

Prep may reveal routes, identify risks, create approach options, satisfy requirements, set support roles, reduce consequences, or change starting conditions. Planning Points are not a global default system here, but planning still has serious core value.

## 7. Ship Support

Some crew may participate as ship support rather than joining the active node team. Ship support can matter for communications, engineering, medical support, scans, routing, countermeasures, or other scene-specific support.

Detailed support actions remain undeveloped and should be routed to character/ship/equipment systems when defined.

## 8. Recovery and Consequence Handling

Recovery, revival, injury, and consequence tradeoffs are flagged for future source work. The current Core domain establishes how they connect to Downtime and available facilities without finalizing detailed recovery math.

Current cross-domain recovery split:

- ordinary HP restoration may happen by default during Downtime when the fiction and available care support it;
- armor may reset to functional baseline during Downtime when ordinary repair/resupply is available;
- ordinary tactical statuses usually clear by tag or scene end;
- Persistent statuses and long-term Health, Morale, or Loyalty effects require intentional recovery, consequence handling, downtime action, resource spend, or later source-specific procedure.

Downtime should support repair, crew talk, recovery, inventory/armory updates, advancement, Route Choice, and consequence processing. Ship-specific facilities apply only when the crew has access to them.

Pickups go to inventory. They are not carried inactive equipment and do not create extra equipment slots by default. Detailed inventory/loadout rules belong to `Equipment`.

Do not finalize revival/recovery mechanics from this document alone.

## 9. Dashboard Needs from Playtest Evidence

Rook playtest material showed that live play needs:

- a character tracker / skill sheet so the player can remember who is good at what;
- a campaign log / key events panel;
- an evidence board or clue chain;
- current pressures and opportunities that do not overwhelm choice.

These belong primarily to `Dashboards`, but they are preserved here because they affect Downtime and campaign-state visibility.

## 10. Domain Routing Notes

- Character sheets, chassis, advancement, and recovery route to `Characters`.
- Skill lists and resolution route to `Skills`.
- Loadout slots, equipment, tools, credentials, armory, and cyberware route to `Equipment`.
- Dashboard implementations route to `Dashboards`.
- Route Node End Report and Downtime display templates route to `Modes` and `Dashboards`.
- Persistent Health, Morale, and Loyalty consequences route to `Characters` and `Dashboards`.

## Source Handling Note

This current Core-domain source preserves useful Ship and crew-operation material from prior Nexus work while applying accepted Downtime and campaign decisions.
