---
project: "Nexus"
doc_id: "CONTENT-REWARD-001"
legacy_ids:
  - 'SRC-CONTENT-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\13 Content Systems rev0.5\SRC-CONTENT-007 - Rewards_Loot_and_Salvage_Framework.md'
title: "Rewards_Loot_and_Salvage_Framework"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "canon_home"
topic_family: "rewards_loot_and_salvage_framework"
owns_topics:
  - 'rewards_loot_and_salvage_framework'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from CONTENT-CORE-007 to CONTENT-REWARD-001. Phase 10 consolidated body routing into domain-first language and preserved the active reward and salvage framework without relying on slot-era wording."
---

# Rewards, Loot, and Salvage Framework

## Boundary with `Equipment`

`Equipment` owns equipment, loadout, item categories, weapons, armor, tools, accessories, consumables, credentials, cyberware, and shared armory rules.

`Content` owns how rewards appear in content:

- what a route node can pay out;
- what salvage hooks a scene contains;
- how a reward changes future choices;
- how loot links to objectives, heat, complications, contacts, and route opportunities;
- what reward outcomes should be saved to dashboards.

## Reward categories

Useful reward categories:

- Gear: weapon, armor, tool, accessory, consumable, shield/defense module.
- Credential: badge, token, access permission, code, license, identity shell, procedural right.
- Information: clue, map, archive, contact route, blackmail, truth, warning.
- Route access: shortcut, safer path, new node, bypass, hidden route.
- Faction leverage: favor, debt, heat reduction, protection, reputation.
- Crew benefit: loyalty, morale, health, recruit, specialist help.
- Ship benefit: upgrade path, repair, part, fuel, system patch, bay access.
- Salvage: scrap, machine parts, biological sample, data core, drone frame, sensor package.
- Story asset: custody, objective object, protected witness, rescued person, proof.

## Salvage content fields

A salvage hook should define:

```text
Source:
Visible or hidden:
Required access:
Risk:
Time cost:
Skill/tool options:
What it becomes:
Equipment item link if any:
Aftermath risk:
```

## Rewards and consequences

Rewards should often create choice, not just accumulation.

Examples of meaningful cost surfaces:

- taking salvage costs time and worsens a pursuit counter;
- selling data creates faction heat;
- keeping an objective object requires repair or concealment;
- using a credential may leave logs;
- saving a person costs route time but adds a contact or crew-state benefit;
- stripping a machine gives parts but closes a future nonviolent evidence path.

## Credentials

Credentials are not slotted. If the crew has a credential, they have it. Content should treat credentials as access state, not carried gear, unless a specific physical token matters.

## Shared armory link

Most physical gear rewards route into the ship shared armory. The crew then chooses what to equip before later nodes. Avoid assuming every acquired item is active in the field immediately.

## Loot display and save routing

Persistent reward outcomes should route to one of:

- shared armory;
- credential/access state;
- open leads;
- objective/campaign asset state;
- faction/heat state;
- ship inventory/repair/upgrades;
- crew state;
- complication log.

## Mass-intake additions: pickup and salvage hooks

Pickups route to inventory. They are not inactive carried gear and do not modify equipment slots unless a scene-specific rule says so.

Additional salvage/reward hooks:

- damaged gear;
- contaminated salvage;
- traceable data;
- custody or restricted equipment;
- illegal cyberware component;
- system-corrupted device;
- locked smart weapon;
- firmware key;
- drone part;
- route access token;
- repairable suit or module;
- evidence that creates legal or faction consequences.

`Equipment` owns item rules and loadout use. `Content` owns where, why, and with what consequence rewards or salvage appear.



