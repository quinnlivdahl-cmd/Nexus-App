---
project: "Nexus"
doc_id: "PLAYAID-STATE-006"
legacy_ids:
  - 'SRC-AUX-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\15 Auxiliary Play Aids rev0.2\SRC-AUX-006 - Player_Facing_Dashboards_and_Handouts.md'
title: "Player_Facing_Dashboards_and_Handouts"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "provisional-source"
placement_domain: "Play Aids"
content_role: "current_state"
topic_family: "player_facing_dashboards_handouts"
owns_topics:
  - 'player_facing_dashboards_handouts'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first player-handout boundaries, current-state routing, and aid-template language."
---

# Player Facing Dashboards and Handouts

## 1. Purpose

Player-facing dashboards and handouts give the player a clean, spoiler-safe view of the current decision space, crew state, objectives, loadout, route options, and tactical situation.

## 2. Common player-facing aid types

Useful player-facing aids include:

- current route-node summary;
- encounter-start packet;
- objective card;
- loadout/current inventory summary when relevant;
- TacMap or schematic;
- known hazards and visible pressures;
- route-node end report;
- crew/ship status snapshot;
- faction access/attitude summary;
- printable quick reference.

## 3. Visibility rule

Player-facing aids must not expose hidden DM information unless it has been discovered.

Keep separate:

- player-safe visible state;
- DM-only hidden state;
- archive/recap state after secrets are no longer active.

## 4. Encounter packet

A player-facing encounter packet should include enough information to begin play without requiring the player to ask for basic structure.

Possible sections:

- scene frame;
- current objective;
- visible pressure or clock;
- known hazards;
- visible enemies/unknown contacts;
- current route options;
- relevant loadout/gear reminders;
- TacMap/schematic/node list when tactical position matters;
- immediate choices.

`Modes` owns display templates. `Core` owns the encounter-start requirement. `Play Aids` owns play-aid guidance.

## 5. Snapshot rule

Dashboards and handouts should state whether they are:

- live current state;
- player-facing snapshot;
- DM-only snapshot;
- post-node recap;
- archive artifact;
- source template.

Avoid maintaining separate player handout state that conflicts with live `Dashboards`. Generate player-facing slices from current state where possible.

## 6. Obsidian and mobile style

Player-facing handouts should be readable in Obsidian view mode and mobile chat.

Guidelines:

- use short headings;
- avoid excessive wide tables;
- avoid unreliable HTML dropdowns;
- use compact bullets for live state;
- keep hidden information out of player-facing sections;
- use callouts for snapshot summaries when useful.

## 7. Character sheet and card boundary

Character cards, crew cards, status cards, and loadout cards may become separate aids later. `Play Aids` tracks display guidance; `Characters`, `Skills`, and `Equipment` own the underlying rules.

## 8. Default handout header

```text
Player Handout: [Title]
Visibility: Player-facing
Snapshot date/time: [Date]
Source/state: [Dashboards surface or source doc]
Hidden layers omitted: yes/no
```


