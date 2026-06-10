---
project: "Nexus"
doc_id: "CHAR-CHASSIS-001"
legacy_ids:
  - 'SRC-CHAR-002'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\09 Characters Crew Progression rev0.4\SRC-CHAR-002 - Character_Chassis_and_Build_Stack.md'
title: "Character_Chassis_and_Build_Stack"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Steward"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Characters"
content_role: "canon_home"
topic_family: "character_chassis"
owns_topics:
  - 'character_chassis'
  - 'build_stack'
  - 'cybernetic_tier_identity'
borrows_topics:
  - 'equipment_cyberware_model'
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language, repaired inherited display corruption, and preserved the active character-chassis decisions without relying on legacy slot wording."
---

# Character Chassis and Build Stack

## 1. Current working principle

A Nexus character is assembled from layered choices rather than a single fantasy-race/class identity.

Working stack:

```text
Base Body / Origin
+ Background / social access
+ Discipline / role emphasis
+ Skills / ability-tree development
+ Traits / feats / techniques
+ Cyberware or bioware choices, if any
+ Equipment and loadout
+ Crew relationships and ship function
= playable character identity
```

Body matters, but build decisions and campaign consequences decide what the character becomes.

## 2. Corrected cyberware creation model

Cyborg identity is usually **derived**, not selected as a default separate starting chassis.

```text
Base Body / Origin
+ creation-point cyberware purchases
= cybernetic integration tier
+ cyberware upgrade trees
+ Firewall / hack-surface / System Integrity consequences
```

Accepted rules:

- Players do **not** pick `Cyborg` as a separate body type by default.
- A character spends creation points on cyberware if desired.
- What cyberware is chosen, and how much is chosen, determines cybernetic integration tier.
- Each selected cyberware piece may become an upgrade tree or progression path.
- Adding entirely new cyberware mid-campaign should be rare.
- Mid-campaign additions require meaningful gates such as clinic access, faction permission, story opportunity, high cost, downtime, surgery risk, rare location, black-market lab, corporate facility, or equivalent.

Provisional cybernetic integration tiers:

| Tier | Label | Character meaning |
|---|---|---|
| Tier 0 | Background Implants | Minor common implants; not a Cyborg identity by default. |
| Tier 1 | Light Implantation | One or a few meaningful systems; still primarily body-origin defined. |
| Tier 2 | Integrated | Cyberware is central to build identity and starts shaping tactics/social risk. |
| Tier 3 | Chassis-Dependent | Body function depends on integrated systems; repair, hacking, and maintenance matter. |
| Tier 4 | Full Chassis | Biological brain/person-core in a mostly mechanical body. Not an Upload. |

### 2.1 Character durability spine

Use this character-facing durability spine when a character sheet, recovery note, or chassis note needs the full defensive/durability line:

```text
Health | System Integrity | Defense | Firewall | Mitigation | Shield
```

Compact display may use:

```text
HP/SI | DEF/FW | MTG | SHD
```

Health is the default body durability surface for organic, mostly organic, and lightly integrated characters. System Integrity is the main durability surface for systems, modules, shells, drones, objects, hackable surfaces, upload/shell bodies, and Tier 3+ cybernetic body-support cases. Defense and Firewall are defensive scores. Mitigation is the damage-reduction stat. Shield is charge-based or source-defined pre-damage protection.

### 2.2 Health baseline and milestone-level increase

Starting Health = 10 + Body modifier + chassis/body modifier + rare feature modifiers.

Health increases at milestone levels. When Health increases at a milestone level, increase Health by 1 + Body modifier, minimum +1 total. If the Body modifier is negative, treat it as 0 for this increase.

Do not define milestone levels in this document. Do not use "Health milestone" or "durability milestone" as formal terms here. Milestone structure belongs with progression rules; this doc only records how Health changes when a milestone level grants an increase.

### 2.3 Health and System Integrity by cybernetic tier

Default rule: a character typically uses one primary durability track: Health or System Integrity. Some abilities, systems, special conditions, or targeted effects may explicitly bridge or interact across both.

| Tier | Primary durability surface | Character-facing rule |
|---|---|---|
| Tier 0 | Health | No hackable System Integrity unless a specific implant, gear item, or scenario says otherwise. |
| Tier 1 | Health | Individual cyberware may be hackable, but the character does not use System Integrity as the main durability track by default. |
| Tier 2 | Health | Major modules may have System Integrity; disabling a module does not Down the character by default. |
| Tier 3 | System Integrity | Machinery supports vital body function; disabling the body-support system can Disabled/Down the character according to recovery rules. |
| Tier 4 | System Integrity | Machinery replaces most body function; the person-core/brain boundary remains more serious than ordinary chassis damage. |

Tier 3+ System Integrity is calculated from the character's base Health-equivalent value, then adds cyberware, chassis, origin, and rare feature bonuses where applicable. Exact cyberware pieces, costs, and module behavior belong to `Equipment`.

## 3. Chassis candidates as DM-usable tags

Current provisional chassis/origin candidates include:

| Candidate | Use now in DM Mode | Required tradeoff |
|---|---|---|
| Regular / near-baseline human | Flexible social access, broad equipment compatibility, normal legal legibility. | Fewer extreme body affordances. |
| Designer human | Minor gene edits, stamina, appearance, access, inherited privilege, or optimized baseline traits. | Tied to class, corporate, legal, or expectation pressures. |
| Splicer | Biological specialization, body-form advantages, sensory/physical adaptation. | Social/legal suspicion, medical complexity, environmental limits, or instability. |
| Ape / gorilla frame | Strength, climbing, load-bearing, intimidation, industrial labor history. | Space, equipment fit, prejudice, finesse/social constraints. |
| Cephalopod / octopoid form | Flexible limbs, infiltration, unusual manipulation, distributed attention. | Dry/open-environment problems, gear incompatibility, social access limits. |
| Flora / mycelial line | Regrowth, environmental interaction, chemical/pheromone hooks, networked biology. | Slow movement, maintenance needs, environmental dependence, fire/contamination risk. |
| Lizard / dormancy-adapted body | Survival, armor-like biology, cold/heat/dormancy hooks. | Temperature sensitivity, tempo constraints, social alienation. |
| Upload embodiment | Digital person in Base Sleeve, Maintenance Drone, or Combat Shell. | Firewall/System Integrity, body replacement, legal/social/personhood risk. |
| Cybernetically integrated character | Defined by selected cyberware and integration tier. | Hack-surface, repair, maintenance, cost, legality, and body-continuity tradeoffs. |

These entries are not final stat blocks. DM Mode may use them as affordance-and-cost guidance.

## 4. DM-usable build reading

When running a provisional character, DM Mode should read the build in this order:

1. What can the body plausibly do that a baseline body cannot?
2. What does the body make harder, more expensive, less legal, less socially safe, or more vulnerable?
3. What skill/discipline does the character use to turn the body into a reliable action?
4. What equipment, cyberware, or crew support is required?
5. What consequence is interesting if the player overuses the advantage?

## 5. Domain boundaries

- `Characters` owns character identity, body-origin logic, crew role, progression framing, and recovery consequences.
- `Skills` owns skills, resolution, focuses, ability-tree math, and check procedure.
- `Equipment` owns cyberware item lists, cyberware costs, equipment tags, loadout, armor, tools, and gear balance.
- `Lore` owns setting taxonomy, law, culture, factions, prejudice, and personhood arguments.
- `Dashboards` owns active campaign state.

## 6. Source handling note

This doc integrates current character source, Memory Overflow migration warnings, Seed handoffs, Full Seed handoff, Seed Harvest Capsules, and relevant dashboard risk notes. Older race-family language is preserved as search/context but corrected here for character creation.

## 7. Standard Fit and body-hook update

### 7.1 Standard Fit

**Standard Fit** is the baseline infrastructure compatibility concept for Nexus characters.

A body has Standard Fit when common human-standard infrastructure usually works without special adaptation:

- pressure suits and emergency suits;
- armor, uniforms, harnesses, and restraints;
- medkits, trauma tools, and ordinary medical access;
- seats, crash couches, ladders, hatches, doors, and handholds;
- common tools, terminals, weapons, gloves, and workstations;
- evacuation, quarantine, and emergency systems.

Working defaults:

- near-baseline humans are Standard Fit;
- Vatborn are Standard Fit;
- Designer Humans are Standard Fit;
- Low-G / Adapted Humans are likely Standard Fit unless a later trait says otherwise;
- light cyberware usually preserves Standard Fit;
- heavy cybernetic body changes may threaten Standard Fit;
- Splicers are not Standard Fit by default.

Standard Fit is not a prestige label. It is a practical advantage: fewer things go wrong by default because the built environment assumes a compatible body.

### 7.2 Body hooks are not a universal matrix

Body/chassis features should not be only narrative permission, but they also should not become a rigid universal tag matrix.

Body hooks may be:

- narrative hooks;
- concrete mechanics;
- social complications;
- map-facing effects;
- equipment/loadout constraints;
- recovery complications;
- advancement or transformation options.

A chassis does not need one hook in every category. Use the categories to notice useful play consequences, not to force symmetry.

### 7.3 Ape/gorilla body fit

Ape/gorilla bodies should have real strength and body-presence advantages. They are not just cosmetic human variants.

Current provisional body-fit anchor:

```text
ape/gorilla-size body is approximately 1.5 baseline-human body fit
```

This is a map/infrastructure heuristic, not a final stat block.

Possible implications to preserve:

- stronger shove/brace/breach/carry affordances;
- physical intimidation bonus when size and presence matter;
- trouble with some Standard Fit infrastructure;
- greater ability to block narrow nodes/paths;
- reduced comfort when sharing cover or cramped nodes;
- difficulty using 1-slot cover positions or tight crawlspaces.

Exact strength math is deferred to later Skill/trait/body-balance work.

### 7.4 Cyberware boundary clarification

`Cyborg` remains derived by default. A player normally buys/selects cyberware, and cyberware amount/type produces a cybernetic integration tier.

`Integrated Tool` is a cyberware or enhancement option, not a universal cyborg feature.


## 8. Durability integration note

This update integrates the approved character-facing portions of the Lattice/durability/chassis intake package. It adds Health and System Integrity baselines, the character durability spine, milestone-level Health increase wording, and the provisional Tier 0-4 Health/System Integrity boundary. It preserves Standard Fit and body-hook flexibility. It does not define cyberware item math, module disable rules, EMP effects, or equipment Shield/Mitigation values; those remain `Equipment` concerns.


