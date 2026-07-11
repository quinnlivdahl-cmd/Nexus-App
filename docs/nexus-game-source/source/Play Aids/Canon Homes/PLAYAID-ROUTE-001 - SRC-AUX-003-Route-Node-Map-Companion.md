---
project: "Nexus"
doc_id: "PLAYAID-ROUTE-001"
legacy_ids:
  - 'SRC-AUX-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\15 Auxiliary Play Aids rev0.2\SRC-AUX-003 - Route_Node_Map_Companion.md'
title: "Route_Node_Map_Companion"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Play Aids"
content_role: "canon_home"
topic_family: "route_node_map_companion"
owns_topics:
  - 'route_node_map_companion'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from PLAYAID-CORE-003 to PLAYAID-ROUTE-001. Phase 10 reviewed the body for domain-first route-map display boundaries and report-linkage language."
---

# Route Node Map Companion

> [!important] Revised vision reconciliation — 2026-07-11
> This aid represents campaign-scale Route Prospects and Route Choices only. It does not define movement or geometry inside a selected Route Node Location; `CORE-SPATIAL-001` owns that spatial boundary.

## 1. Purpose

Route-node map companions help display campaign, mission, pursuit, escape, clue-chain, and travel choices. They are distinct from TacMaps.

- Route-node map = campaign/mission navigation and choice structure.
- TacMap = tactical encounter space.

## 2. Use cases

Route-node map companions may be useful during:

- route choice;
- mission approach planning;
- escape or pursuit;
- faction lead branching;
- clue-chain branching;
- ship travel;
- route-node end recap;
- campaign archive review.

## 3. Recommended visible fields

A route-node map may show:

- current node;
- known exits/routes;
- route requirements;
- visible pressure or clocks;
- known rewards/objectives;
- known faction presence;
- known hazards;
- resource risks;
- discovered shortcuts or bypasses;
- hidden/unknown branches as vague markers if player-facing.

## 4. Hidden or DM-only fields

DM-only route-node displays may include:

- hidden branches;
- unrevealed faction clocks;
- concealed reinforcements;
- unresolved consequence triggers;
- future route locks/unlocks;
- hidden costs;
- campaign secrets.

Player-facing versions should not reveal hidden information unless discovery has occurred.

## 5. Route Node End Report linkage

After a route node resolves, the Route Node End Report should update route-map knowledge when appropriate.

Potential route-map changes after the report:

- route opened;
- route locked;
- route collapsed;
- faction route revealed;
- pursuit route activated;
- recovery/ship-time route selected;
- hidden branch discovered;
- previous route becomes unsafe or unavailable.

`Core` owns the route-node end report requirement. `Play Aids` owns route-map display aid guidance.

## 6. Snapshot types

Route-node map companions may exist as:

- player-facing known map;
- DM-only hidden-layer map;
- post-node snapshot;
- session archive snapshot;
- planning aid;
- printable route sheet;
- Obsidian Canvas or Markdown node list.

## 7. Minimal route-node map format

```text
Route Map Snapshot: [Mission / Date]
Visibility: Player-facing or DM-only
Current node: R3 - Dockside Transfer

Known Routes:
- R4 Cargo Lift | requirement: access chit or Security check | risk: patrol clock
- R5 Maintenance Crawl | requirement: small body or tool | risk: exposed path
- R6 Public Concourse | requirement: none | risk: faction scrutiny

Current Pressures:
- Patrol clock: 2/6
- Crew fatigue: Rill marked
```

## 8. Rook playtest carry-forward

The Rook-style route-node lessons remain relevant: route displays should make choices concrete, but not collapse the whole route into a decorative map with no actionable structure.


