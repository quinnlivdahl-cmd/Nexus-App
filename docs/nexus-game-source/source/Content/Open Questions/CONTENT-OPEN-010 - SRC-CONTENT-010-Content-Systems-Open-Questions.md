---
project: "Nexus"
doc_id: "CONTENT-OPEN-010"
legacy_ids:
  - 'SRC-CONTENT-010'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\13 Content Systems rev0.5\SRC-CONTENT-010 - Content_Systems_Open_Questions.md'
title: "Content_Systems_Open_Questions"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "open_questions"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "open_questions"
topic_family: "content_systems_open_questions"
owns_topics:
  - 'content_systems_open_questions'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language, repaired inherited display corruption, and preserved unresolved content questions without relying on slot-era wording."
---

# Content Systems Open Questions

## High-priority open questions

1. What is the first official enemy roster for v0.1 play?
2. Which RNG test profiles should become actual enemy/content archetypes, if any?
3. What is the minimum enemy stat block DM Mode needs for fast play?
4. How much enemy behavior should be scripted by role vs improvised by DM?
5. What distinguishes a hostile enemy, neutral obstacle NPC, pressure NPC, recruit candidate, contact, and crew member?
6. What is the recruitment procedure for NPCs?
7. How often should route nodes include non-combat bypasses?
8. How many opportunities should a route node reveal by default?
9. Which aftermath categories become dashboard-first state vs narrative notes?
10. What is the first version of reward rarity and salvage value?

## Enemy/NPC questions

- Are enemy roles mostly mechanical, fiction-first, or both?
- Do enemies use the same action economy as PCs, a simplified economy, or role-based actions?
- How do morale, surrender, capture, and legal consequences work?
- What should a "boss" be in Nexus without turning combat into damage sponges?
- How common are machine, drone, biological, human, posthuman, corporate, security, and Signal-linked enemies?

## Mission and route-node questions

- What is the default node size for early campaign play?
- How many route choices should be shown at once?
- How explicit should loadout warnings be before a node?
- How often should nodes have pressure objectives vs a single primary objective?
- How many counters can a normal node carry before display becomes too heavy?

## Hazard questions

- Which hazards need real mechanics first: vacuum, radiation, fire, zero-G, pressure loss, surveillance, software hazards, legal/custody hazards, or Signal anomalies?
- How should hazards tick in and out of combat?
- When should hazards create long-term Health/Morale/Loyalty effects?
- What is the threshold for making a hazard a full counter vs a simple scene tag?

## Reward / loot / salvage questions

- What is the first reward economy: credits, favors, salvage classes, ship parts, access, or mixed?
- How often does a defeated enemy produce usable salvage?
- How should illegal, traceable, or contaminated rewards be marked?
- What belongs in shared armory vs objective state vs open leads?
- How should rewards support planning without creating bookkeeping overload?

## Routing questions

- DM display cards for counters, aftermath, and route-node end reports should be backpatched or verified in `Modes`.
- Enemy behavior overlaps `Combat` and should be checked after this package is uploaded.
- Loot and item-rule overlap with `Equipment` should be checked after both packages are uploaded.
- Campaign-specific Rook content should stay in dashboards/playtest records unless intentionally promoted.
- Future CSV or XLSX data structures should be deferred to `Data` unless the user asks for a working table earlier.

## Mass-intake open questions

- What content tags should become controlled vocabulary first?
- Which encounter patterns need playable examples first?
- What is the minimum content entry format for a TacMap-ready encounter?
- How should System Status encounters avoid making Cyberwarfare universal?
- Which hazards need full counters, and which only need Area, field, object, or status markers?
- How should route-node aftermath create concrete future gameplay effects?
- Should content entries include explicit player-safe and DM-only layer fields?
- Which airlock/pressure-boundary patterns deserve early playtest examples?
- What content-side fields should feed the Route Node End Report by default?
- What belongs in `Content` entries versus `Automation` runtime packets or `Play Aids` displays?

## Resolved or narrowed by Lattice and durability integration - 2026-05-24

These are no longer open at the `Content` level:

- Enemy stat blocks should use Health/System Integrity, Defense/Firewall, Mitigation, and Shield as named fields when those surfaces matter.
- Armor is an equipment/content category, not the active damage-reduction stat. Mitigation is the stat.
- Hazards that call for direct rolls should use Hazard Rating and route to the Lattice Target Score formula.
- Cover values are not open at the content level: Half Cover grants +20 Defense and Full Cover grants +40 Defense after cover permission exists. Cover does not reduce damage.

Still open: exact enemy roster, exact role-profile values, boss design, first v0.1 hazard library, damage/Health tuning through playtest, and how much enemy behavior should be scripted versus improvised.
