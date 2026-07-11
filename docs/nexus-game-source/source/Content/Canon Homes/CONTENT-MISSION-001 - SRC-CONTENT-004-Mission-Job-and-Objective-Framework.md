---
project: "Nexus"
doc_id: "CONTENT-MISSION-001"
legacy_ids:
  - 'SRC-CONTENT-004'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\13 Content Systems rev0.5\SRC-CONTENT-004 - Mission_Job_and_Objective_Framework.md'
title: "Mission_Job_and_Objective_Framework"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "canon_home"
topic_family: "mission_job_and_objective_framework"
owns_topics:
  - 'mission_job_and_objective_framework'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from CONTENT-CORE-004 to CONTENT-MISSION-001. Phase 10 consolidated body routing into domain-first language, repaired inherited display corruption, and preserved the active mission and objective framework without relying on slot-era wording."
---

# Mission, Job, and Objective Framework

> [!important] Revised vision reconciliation — 2026-07-11
> Preserve compatible route consequences, objectives, hazards, roles, bypasses, rewards, and modular patterns. A Route Node is one explorable Location; reusable “encounters” are Tactical Pressure patterns within it, not top-level containers. “TacMap-ready” and node-web language is historical where it claims spatial authority.

## Purpose

Mission and job content should give play structure without forcing rigid menus. The player can use short commands or freeform plans; DM Mode interprets intent and asks for clarification only when needed.

## Mission content model

A mission/job seed should eventually define:

```text
Working title:
Node / route context:
Primary objective:
Pressure objective:
Optional objective:
Known opportunity:
Likely opposition:
Hazards / obstacles:
Approach phase affordances:
Nonviolent paths:
TacMap needs:
Counters / clocks:
Aftermath categories:
Reward / salvage / lead outcomes:
Failure / partial-success outcomes:
```

## Objective categories

Tactical encounters should not default to "kill all enemies." Current objective examples include:

- extract VIP;
- hold position;
- survive timer;
- disable system;
- steal data;
- escape;
- reach shuttle;
- rescue crew;
- shut down hazard;
- negotiate ceasefire;
- capture target;
- sabotage equipment;
- delay enemy;
- avoid alarm;
- protect civilians;
- force surrender;
- secure object;
- retreat successfully.

## Process objectives and clocks

Objects, cover, and objectives use a tactical hybrid model.

- Combat-relevant objects use compact stats when damage or targeting matters.
- Process objectives use clocks when progress over time matters.
- Tags define special interaction.
- Objective-progressing Micro-Interact is normally limited; scenario or feature text may expand it.

## Approach phase

Before combat begins, the player should often be able to evaluate the scene and choose an approach. Skills, equipment, crew, and prior information affect what the DM presents.

Approach actions may include:

```text
scan
observe
talk
negotiate
bribe
deceive
intimidate
sneak
hack
disable systems
prepare ambush
reposition
retreat
bypass objective
```

The approach phase may avoid combat, trigger combat, change starting positions, reveal hazards, create advantage, open a nonviolent path, or expose a hidden cost.

## Escape structures

Escape is not automatic. Use the lightest escape structure that fits the scene.

- Quick Exit: one-choice, low-stakes exit.
- Requirement Escape: default formal escape structure; clear checklist of requirements, optional pressure counter.
- Set-Piece Escape: rare expanded structure when escape is the main purpose of the route node.

Freeform planning is available in every escape structure. Reward plausible planning by satisfying requirements, reducing difficulty, reducing consequences, skipping unnecessary beats, or ending the escape when the plan logically resolves the danger.

## Counter categories for mission content

Counters should be campaign-understood categories, not one-off mystery meters.

```text
`Countdown` - a known event will happen when the counter fills.
`Pursuit` - something is trying to find, catch, follow, or intercept the crew.
`Suspicion` - someone is noticing, doubting, or building a case.
`Hazard` - an environment, system, body, weather, pressure, radiation, software, or anomaly is becoming dangerous.
```

Counter display rules belong to DM Mode, but mission content should record what the counter represents, what changes it, what happens at the trigger, and what relief options exist.

## Aftermath categories

Encounter aftermath should state concrete gameplay effects. Useful persistent categories:

```text
Heat / Attention
Damage / Repair Need
Complication / Unresolved Risk
Loss / Spent / Closed
Lead / Opportunity
Objective / Campaign Asset State
Ongoing Counter / Clock State
Loyalty
Morale
Health
```

## Opportunity discipline

Do not accumulate too many opportunities. When new evidence opens a path, usually add one objective and maybe one opportunity, not a long list. Opportunities should steer through reward, shortcut, leverage, or easier objective completion without forcing the party toward them.

## Mass-intake alignment: planning and encounter start fields

Mission content should support the current **planning matters** principle:

- a strong plan may bypass a roll;
- lower difficulty;
- change what defense is targeted;
- satisfy a requirement early;
- reduce alarm, trace, legal, status, or aftermath consequences;
- unlock a cleaner route or better end report.

Content should avoid collapsing meaningful choices into one giant roll when the crew still has useful choices about approach, route, prep, cleanup, barter, takedown, or consequence management.

### Encounter-start content field

When a mission element expects tactical play, the content entry should identify what must be surfaced at encounter start:

- objective or pressure;
- visible hazards;
- relevant actors;
- known routes/exits;
- required TacMap/schematic support;
- player-safe information;
- DM-only hidden layer, if any.

`Content` may request TacMap support, but `Combat` owns the TacMap rules, `Play Aids` owns display-aid specs, `Automation` owns data and renderer implications, and `Art` owns visual and asset direction.


