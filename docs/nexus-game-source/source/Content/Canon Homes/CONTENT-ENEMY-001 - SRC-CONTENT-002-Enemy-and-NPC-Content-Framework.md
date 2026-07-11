---
project: "Nexus"
doc_id: "CONTENT-ENEMY-001"
legacy_ids:
  - 'SRC-CONTENT-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\13 Content Systems rev0.5\SRC-CONTENT-002 - Enemy_and_NPC_Content_Framework.md'
title: "Enemy_and_NPC_Content_Framework"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "canon_home"
topic_family: "enemy_and_npc_content_framework"
owns_topics:
  - 'enemy_and_npc_content_framework'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from CONTENT-CORE-002 to CONTENT-ENEMY-001. Phase 10 consolidated body routing into domain-first language and preserved the seeded enemy and NPC framework without relying on slot-era wording."
---

# Enemy and NPC Content Framework

> [!important] Revised vision reconciliation — 2026-07-11
> Preserve compatible route consequences, objectives, hazards, roles, bypasses, rewards, and modular patterns. A Route Node is one explorable Location; reusable “encounters” are Tactical Pressure patterns within it, not top-level containers. “TacMap-ready” and node-web language is historical where it claims spatial authority.

## Current status

Enemy and recruit-NPC source coverage was thin in the active old source. The old enemy and recruit docs were placeholders. This package therefore creates a seeded framework rather than a finalized roster.

The framework is source-ready, but the roster is not final canon.

## What this doc owns

This doc owns enemy/NPC content structure:

- how an enemy or NPC content entry should be framed;
- how enemies connect to encounter objectives and route nodes;
- how ordinary defeat is handled;
- how non-combat avoidance or bypass can interact with enemy content;
- how recruitable, temporary, neutral, hostile, and pressure NPCs should be separated;
- what must be routed to combat, lore, skills, equipment, or dashboards.

## Enemy content entry model

A reusable enemy/NPC entry should eventually include:

```text
Name / working handle:
Content status: test / provisional / canon candidate / active campaign only
Faction or source context:
Role:
Defense profile:
Primary pressure:
Secondary pressure:
TacMap behavior:
Non-combat bypasses:
Defeat tags:
Relevant skills:
Relevant gear/tools:
Rewards, salvage, leads, or risks:
Lore notes:
Do-not-assume notes:
```

## Ordinary defeat rule

Current accepted handling:

- Ordinary enemy `0 HP = Defeated` by default.
- Defeated is abstract unless exact aftermath matters.
- Player intent affects outcome mostly through tool, loadout, action, and tag choice, not repeated lethal/nonlethal confirmation.
- Tags such as `Lethal`, `Nonlethal`, `Stun`, `Disable`, `Hack`, `Morale`, `Capture`, `Explosive`, `Fire`, `EMP`, `Signal`, `Legal`, `Custody`, and `Suppression` shape defeated state.

This supports fast DM Mode play while preserving meaningful consequences when the scene cares about custody, witnesses, injury, legal exposure, salvage, interrogation, or alarms.

## Avoiding fights

Nexus must support not getting into the fight at all. Enemy/NPC content should often include at least one plausible bypass or pre-combat pressure valve.

Common bypass families:

- stealth;
- social cover;
- bribery;
- blackmail;
- spoofed credentials;
- hacking;
- route discovery;
- distractions;
- patrol rerouting;
- faction procedure;
- environmental use;
- surrender, negotiation, or ceasefire.

Combat should remain common and should take the most player time overall, but individual encounters should not automatically become combat.

## NPC content types

Use distinct content labels where possible:

- Hostile enemy: combat or opposition piece.
- Neutral obstacle NPC: not automatically hostile but blocks, witnesses, delays, or negotiates.
- Pressure NPC: creates clocks, heat, suspicion, pursuit, or social constraints.
- Recruit candidate: potential long-term or temporary crew/advisor/source.
- Faction face: represents an institution without becoming a full enemy roster.
- Campaign-specific NPC: belongs to a playtest or campaign dashboard until promoted.

## Recruit NPC status

The old recruit NPC system was a placeholder. Do not invent a recruitment system here. Preserve the need for future work:

- what makes an NPC recruitable;
- temporary vs permanent recruitment;
- loyalty and morale hooks;
- cost, risk, faction consequence, or ship capacity;
- how a recruit becomes a crew member, contact, specialist, passenger, or asset.

## Routing notes

- Combat stat mechanics route to `Combat`.
- Character and crew loyalty, morale, and health route to `Characters` and `Dashboards`.
- Gear rewards and equipment rules route to `Equipment`.
- Faction identity, lore, and named power structures route to `Lore`.
- Display behavior for enemy cards and combat state routes to `Modes` and DM mode handling.

## Mass-intake additions: System Status and NPC content hooks

Content entries may reference **System Status** when an enemy, NPC, object, drone, turret, suit, cyberware module, smart weapon, lock, terminal, ship system, station system, or other technical surface can be degraded, jammed, spoofed, EMP-disrupted, firewalled, or disabled.

`Content` should name the content hook and desired fictional pressure. `Combat`, `Skills`, `Equipment`, and `Automation` define the rules and implementation boundaries.

Useful NPC/content distinctions:

- **Hostile enemy:** actively opposes the crew.
- **Neutral obstacle NPC:** blocks, delays, questions, escorts, searches, or routes the crew without necessarily fighting.
- **Pressure NPC:** creates time, legal, social, alarm, custody, or mission pressure.
- **Contact:** provides access, information, route, faction position, or trade.
- **Recruit candidate:** may become crew or asset after specific play.
- **Crew member:** belongs in campaign state once active.

Content entries may reference Standard Status, System Status, morale pressure, surrender, capture, legal or custody complications, or faction outcomes, but those rules remain outside `Content`.


