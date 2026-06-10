---
project: "Nexus"
doc_id: "COMBAT-TACMAP-001"
legacy_ids:
  - 'SRC-COMBAT-004'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-004 - TacMap_Node_Movement_and_Positioning.md'
title: "TacMap_Node_Movement_and_Positioning"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_canon"
placement_domain: "Combat"
content_role: "canon_home"
topic_family: "tacmap_rules"
owns_topics:
  - 'tacmap_rules'
  - 'node_movement'
  - 'positioning'
borrows_topics:
  - 'character_body_fit'
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active TacMap grammar without relying on package-era framing."
---

# TacMap Node Movement and Positioning

## 1. Core TacMap definition
A TacMap is a simplified tabletop encounter map made of meaningful **nodes** connected by **paths**. It is a node-web, not a full grid and not a single abstract zone.

Hard current boundary:

- TacMaps use **nodes and edges/paths only** as placement and movement units.
- There is no standalone area placement unit.
- A room, cargo bay, platform, pit, or broad space may be represented by a high-capacity node or by a dense cluster of nodes, but it is still resolved through nodes and paths.

TacMaps may include positions, routes, cover, hazards, objectives, elevation, NPCs, enemies, events, points of interest, and interactable objects.

## 2. Core numeric movement rule

Working rule:

> 1 distance unit = 1 movement point before modifiers.  
> Speed = free movement points during activation.

Example:

```text
Character Speed: 5
Free movement points this activation: 5

Path A distance: 5 units
Cost: 5 MP

Path B distance: 3 units + debris modifier 2
Cost: 5 MP

Path C distance: 6 units
Cost: 6 MP
Requires Speed 6+, AP movement boost, skill/gear reduction, accepted risk, or ending in transit.
```

## 3. Nodes

Nodes are meaningful positions. A node may represent cover, a doorway, a gantry section, a terminal, a balcony, a cargo stack, a medbay threshold, an airlock, an objective point, or any tactical location that matters.

A node should clearly communicate:

- what it is;
- why it matters;
- what routes connect to it;
- what cover, elevation, hazards, node status, or objectives it contains;
- what can be done there.

## 4. Node status and path status

Node Status and Path Status are environmental/tactical status surfaces.

- **Node Status** = condition on a place.
- **Path Status** = condition on movement or interaction between places.

Use Node Status when the place itself changes what happens to characters inside it or acting through it. Examples: Fire, Vacuum, Smoke, Radiation, Alarmed, Watched, Low-G, Sensor Fog, Signal Echo, Hacked Lighting, Broken Rail, Pressurized, No Atmosphere.

Use Path Status when the movement connection changes cost, risk, access, visibility, required checks, or traversal permission. Examples: Locked, Blocked, Jammed, Electrified, Suppressed, Exposed, Smoke/Obscured, Maintenance Route, Cargo Tram Route, Low-G Jump, Climb, Crawl, Vent, Breached, Sensor-Watched.

If an alternate route is the only option, do not show a "blocked path" as a normal available path. A blocked path means the route exists but needs action, tool, key, force, hacking, repair, accepted risk, or scenario permission to use.

## 5. Paths and line of sight

Paths are connections between nodes. A path has a distance and may have tags or modifiers such as debris, climb, exposed, narrow, smoke, low gravity, vent, ladder, lift, hatch, broken rail, vacuum risk, or sensor-watched.

Path connection does not equal line of sight.

- Two nodes may connect for movement but not visibility.
- Two nodes may have line of sight without a movement path.
- Visibility is assumed by default unless marked unavailable, obstructed, obscured, or blocked by geometry/status.

Cover, visibility, line-of-fire, and movement path data should be represented distinctly enough that players know what their characters can do.

## 6. Node capacity and character size

Nodes have character capacity.

Working character size values:

| Character size | Use case |
|---:|---|
| 0.5 | small character, drone, compact body, swarm element |
| 1.0 | standard human-scale character |
| 1.5 | large/heavy character, bulky armor, heavy exosuit, large enemy |

Node capacity is numeric. A normal human-scale character usually counts as 1. A large body or bulky frame may count as 1.5. These values should remain universal enough to apply across body types before species/chassis exceptions are added.

## 7. Soft cap, hard cap, and Crowded

Working distinction:

- **Comfort capacity**: the node can function normally at or below this body-size total.
- **Soft cap / Crowded**: the node can be exceeded, but movement, cover use, attacks, reactions, shove resistance, or objective work may suffer.
- **Hard cap**: the node cannot accept more bodies unless fiction, forced movement, swarm rules, squeezing rules, special gear, or a scenario exception allows it.

Exact Crowded penalties are unresolved. Treat Crowded as a named pressure state for now, not final math.

## 8. Cover sharing by node capacity

Cover sharing is governed by node capacity, not a separate cover-slot count by default.

Working rule shape:

- two human-scale characters may both use available cover when the node capacity supports them;
- one large body plus one human-scale body may exceed comfort capacity and become Crowded;
- the first occupant at a node keeps cover-use priority unless fiction, shove, movement, stance, trait, or scenario procedure changes control;
- over-capacity users may downgrade cover, lose cover, create exposure, or contest position depending on final Crowded rules.

Do not split every cover object into separate capacity math unless a specific encounter needs that detail.

## 9. High-capacity nodes vs dense clusters
High-capacity nodes and dense clusters are display conveniences inside the node/path model. They are not separate area-placement rules.

Use high-capacity nodes for big rooms, cargo bays, wide platforms, open pits, and large control areas when precise internal positioning does not matter. Use dense clusters when position within the space still matters tactically.

Current boundary:

- high-capacity node = still one node;
- dense cluster = several connected nodes;
- neither creates a standalone area, zone, or free-placement unit.

## 10. In-transit state

When a character cannot fully complete a route, the character may be in transit if the map supports it. In-transit status should usually imply increased exposure, uncertain cover, or risk from reactions / hazards.

A character may end activation mid-path when the route, map scale, fiction, or scenario supports it. The character's in-transit state should be clearly tracked and should not become invisible bookkeeping.

## 11. Pathblocking and body-blocking

Characters, enemies, doors, wreckage, hazards, suppression, shields, drones, and large bodies can block or tax paths. Heavy frames may have special authority to hold or contest paths.

Body-blocking should interact with node capacity, size, Anchor stance, forced movement, shove, path width, and scenario geometry.

## 12. Shove and forced displacement

Shove and forced movement are supported, but not automatic. Shove likely costs AP and should interact with size, stance, heavy frame, path width, node capacity, hazards, cover, and elevation.

## 13. Map scale and movement support

Encounter maps should support movement across multiple turns. A good TacMap creates reasons to advance, retreat, flank, reposition, climb, cross exposed routes, interact with objectives, and protect vulnerable nodes.

Older 3-4 round guidance may be too short for standard tactical encounters once enemy durability is included. Use expected round count to size map movement pressure.

## 14. Open items

Still open:

- exact Crowded penalties;
- exact hard-cap vs squeeze procedure;
- exact in-transit penalties;
- body-blocking math;
- shove/forced movement rules;
- path status icon grammar;
- dense cluster display standard;
- structured TacMap data template ownership with `Automation` and `Play Aids`.


