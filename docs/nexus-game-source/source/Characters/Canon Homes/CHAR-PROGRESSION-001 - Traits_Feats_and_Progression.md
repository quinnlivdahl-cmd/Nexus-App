---
project: "Nexus"
doc_id: "CHAR-PROGRESSION-001"
legacy_ids:
  - 'SRC-CHAR-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\09 Characters Crew Progression rev0.4\SRC-CHAR-005 - Traits_Feats_and_Progression.md'
title: "Traits_Feats_and_Progression"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Characters"
content_role: "canon_home"
topic_family: "character_progression"
owns_topics:
  - 'traits'
  - 'feats'
  - 'progression'
borrows_topics:
  - 'equipment_cyberware_model'
  - 'skill_links'
created: "2026-05-13"
last_updated: "2026-06-14"
last_reviewed: "2026-06-14"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the current progression boundary without relying on legacy slot wording. 2026-06-14 source reconciliation added route-node level-up timing and ability-lane boundaries from the character/progression draft sequence."
---

# Traits, Feats, and Progression

## 1. Current status

Traits, feats, powers, techniques, and selectable focuses are not finalized. They are preserved as the likely progression surface for making body/origin, discipline, skill, and cyberware choices concrete.

## 2. Working distinctions

| Term | Working meaning |
|---|---|
| Trait | Persistent character quality, origin feature, or body/culture tag. |
| Feat / Technique | Selectable capability that changes what the character can do. |
| Focus | A specialized skill stem or selectable specialty; `Skills` owns final structure. |
| Cyberware tree node | Upgrade attached to a cyberware piece; `Equipment` owns details. |
| Discipline feature | Role-facing capability that supports party function. |

## 3. Level-up and pre-node timing

Rook campaign corrections suggest level-up/loadout-style choices should occur while preparing for a selected node, not after the node has already started.

Current timing:

```text
node selected
-> crew assesses needs
-> advancement/loadout/prep choices if available
-> node begins
```

This supports the desired feel that preparation matters and that characters grow into the next challenge.

Level 0 is the pre-node-0 character creation state. Each new route node starts with a level-up or advancement/prep review when advancement is available. Some levels may become milestone levels with extra bonuses beyond ordinary Ability Points, Skill Focus improvements, or loadout choices. Exact milestone cadence remains open.

## 4. Cyberware progression

Cyberware selected at creation may become upgrade trees. Adding entirely new cyberware mid-campaign should be rare; improving an existing piece is easier to justify than acquiring a new invasive system.

Deferred to `Equipment`:

- exact cyberware item list
- creation-point costs
- integration weight
- tier thresholds
- tree ranks
- cyberware powers
- splice-cyber drawbacks
- full chassis preservation rules

## 5. Skill-tree correction pending the next `Skills` pass

Use this current source-facing relationship for level-up work:

```text
Attribute -> Skill -> Skill Focus -> Ability
```

Working meanings:

- Attribute or parent capability is the broadest competence surface.
- Skill is the trained area of action.
- Skill Focus is a specialized lane under a skill.
- Ability is a selectable, rankable, granted, equipped, prepared, or otherwise validated capability.

Skill Focuses are one major ability-tree lane type, but not the only valid lane type. Bioform, Chassis, cyberware, equipment, installed modules, mounted systems, and campaign-history unlocks may also create ability access lanes.

`Characters` should preserve progression timing, identity, body, crew, and character-growth implications. `Skills` owns skill/focus math. `Equipment` owns cyberware and gear trees. App-facing rules-core validation owns whether an ability is usable now.

Do not split Ability Points and Skill Focus Points unless later source or balance work explicitly introduces that split.

## 6. DM Mode use

Until final math exists, DM Mode may grant provisional level-up choices as:

- one new capability with a clear trigger;
- one improvement to an existing body/cyberware/discipline/skill lane;
- one consequence or exposure if the improvement is invasive, illegal, unstable, or faction-linked.

Do not invent permanent stat math unless Draft/Steward has promoted it.

## 7. Body-feature progression hooks

Body shaping does not stop at character creation. Body features may be introduced or changed through:

- level-up or feature selection;
- surgery, gene work, cyberware, or bioware;
- faction access or patronage;
- trauma and recovery consequences;
- adaptation to environment or route conditions;
- story consequences, rare facilities, or transformation events.

These hooks should remain visible without forcing a final body-tag matrix.

## 8. Planning Points preservation note

Planning Points are not accepted as a global core system at this time. Preserve them as a possible specialist ability family or campaign-facing tool.

If used later, Planning Points should probably attach to concrete surfaces such as:

- intel quality;
- faction knowledge;
- route preparation;
- objective familiarity;
- known resistance profiles;
- tactical briefings;
- specialist disciplines or crew roles.

Do not make Planning Points a universal character currency without later review.

## 9. Cyberware-tree caution

Cyberware choices may eventually resemble skill/perk trees, especially when individual cyberware pieces unlock upgrades. Do not overbuild this in `Characters` yet.

Routing:

- `Characters` preserves character-facing progression implications.
- `Skills` owns skill/ability/focus math.
- `Equipment` owns cyberware item trees, CP costs, EMP/system-disruption hooks, and module rules.

