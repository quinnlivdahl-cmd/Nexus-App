---
project: "Nexus"
doc_id: "CHAR-ABILITY-001"
legacy_ids:
  - 'SRC-CHAR-009'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\09 Characters Crew Progression rev0.4\SRC-CHAR-009 - Ability_Taxonomy_and_Level_Up_Working_Model.md'
title: "Ability_Taxonomy_and_Level_Up_Working_Model"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "provisional_source"
placement_domain: "Characters"
content_role: "applied_rule"
topic_family: "character_ability_model"
owns_topics:
  - 'ability_taxonomy'
  - 'level_up_working_model'
borrows_topics:
  - 'character_progression'
  - 'skill_links'
created: "2026-05-21"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary, with historical lineage preserved in legacy fields and reference-input bodies retained where they serve evidence or template continuity. 2026-06-14 source reconciliation added ability-lane and validation boundaries from the app-facing rules draft sequence."
---

# Ability Taxonomy and Level-Up Working Model

## 1. Current terminology

Use this provisional taxonomy for current ability and level-up work:

```text
Attribute -> Skill -> Skill Focus -> Ability
```

`SKILL-TREE-001` is the complete playtest-ready provisional implementation of this taxonomy. It is authorized for present character-build and playtest use, while names, balance, prerequisites, ranks, and progression costs remain revisable.

Terminology corrections:

- What earlier chats called **leaves** are now **abilities**.
- Root-level items loosely called abilities should be called **attributes** until renamed permanently.
- A **Skill Focus** is a specialized tree or specialty under a skill.
- An **Ability** is a selectable or rankable capability inside a Skill Focus.

### 1.1 Ability lanes and validation

Skill Focus lanes are not the only valid source of ability access.

Valid ability lane sources may include:

- Skill Focus lanes;
- Bioform lanes;
- Chassis lanes;
- body-origin or body-condition lanes;
- cyberware, equipment, module, or mounted-system lanes;
- campaign-history lanes.

No lane type is inherently more canonical than another. The difference is cadence, prerequisite structure, source authority, and availability rules.

Skill Focus lanes are expected to advance most regularly through normal character progression. Bioform, Chassis, and other body-related lanes are usually chosen, assigned, constrained, or discovered at character creation or early identity definition. Equipment, module, cyberware, and mounted-system lanes may grant abilities while the relevant object is owned, installed, equipped, powered, loaded, linked, slotted, deployed, or otherwise available.

An ability is **selectable** when prerequisites are met. It is **acquired** when the player spends the required progression cost or receives it from a valid source. It is **usable now** only when the current action validation passes timing, cost, target, range, equipment state, scene state, status restrictions, cooldowns, ammunition, charges, visibility, and other rules-core constraints.

Abilities do not mutate game state directly. When used in play, they pass through the action transaction: intent, structured action request, validation, check/effect resolution, state delta, commit, resolved facts, narration, and UI/log display.

## 2. Tier, Rank, and Focus Total

**Tier** is tree position and access layer.

```text
Tier 1 = entry abilities in a Skill Focus
Tier 2 = intermediate abilities unlocked after investment
Tier 3 = advanced abilities unlocked after deeper investment
```

**Rank** is investment within one specific ability.

```text
Rank 1 = unlock the ability or grant the baseline passive
Rank 2 = improve that same ability
Rank 3 = improve that same ability again
```

**Focus Total** is the total investment inside a Skill Focus.

```text
Selecting a new Tier 1 ability = +1 Focus Total
Ranking a Tier 1 ability from Rank 1 to Rank 2 = +1 Focus Total
Ranking it from Rank 2 to Rank 3 = +1 Focus Total
```

Higher-tier abilities unlock when Focus Total reaches thresholds. Exact thresholds are parked.

## 3. Rank design rule

Ranks should mostly improve the same ability rather than broaden into neighboring riders.

Avoid using Rank 2 or Rank 3 to add unrelated riders. Possible riders can return later as separate abilities, higher-tier unlocks, or capstone upgrades.

Examples:

- Intrusion improves a basic offensive hack; Jam, Shutdown, Corrupt, and Control should be separate abilities.
- Fleet Foot improves movement bonus; route tricks should be separate movement abilities later.
- Suppressive Fire improves suppression; advanced route denial or fear effects should be separate abilities later.
- Screen improves Screen Node / Screen Route; ally-protection riders or reaction tricks should be separate abilities later.

## 4. Current action category assumptions

Primary Action examples:

- primary weapon attack;
- melee attack with primary melee weapon;
- heavy weapon attack;
- offensive hack or major intrusion;
- major skill action;
- Dash / Sprint;
- major objective interaction;
- major tool use;
- major medical treatment;
- major repair / restore action;
- deploy major device;
- use major ability / power;
- full defense / defensive stance;
- major drone command, not yet developed.

Secondary Action examples:

- secondary weapon attack;
- tool use;
- Combat Triage touch treatment;
- Interface Medic touch repair / restore;
- Screen Node;
- Screen Route;
- Scan;
- Aim / setup;
- Reload / ready;
- Assist;
- Move / reposition;
- interact with simple object;
- quick hack / minor intrusion;
- Command mark / callout;
- prepare reaction;
- minor defensive action;
- stance shift / stance prep;
- use minor ability / power;
- minor drone command placeholder.

Drone use is important and should not be trapped as a minor/secondary action only. Drone actions may include both Primary Action and Secondary Action options.

## 5. Secondary weapon rule

Keep the loadout stack intact:

```text
Primary Weapon stays.
Secondary Weapon stays.
Tool stays.
```

Secondary weapon balance logic:

1. It competes with other valuable secondary actions.
2. Secondary weapons are naturally lower-output than primary weapons.
3. Investment makes secondary weapons better; penalties should not make them feel bad.

Do not frame sidearm use as requiring permission to follow a primary attack. By default, a character with an equipped secondary weapon can use it as a Secondary Action. It is simply often not valuable without investment.

Some secondary weapons may require a perk, focus, cyberware, gear permission, or loadout permission to carry/use as secondary weapons.

## 6. Provisional parent ability trees

```text
Combat Attack
Defense
Support
Tactics
Technical & Systems
Mobility & Exploration
Social & Network
Identity / Signal / Horror
```

Working meanings:

- **Combat Attack:** weapon use, personal attack, damage, direct offense, attack handling.
- **Defense:** personal protection, armor use, guard stances, resistance, survivability, shield use, defensive reactions.
- **Support:** healing, stabilization, assist, buffs, recovery, keeping allies functional.
- **Tactics:** overwatch, screen, suppression, marks, direction, route/node control, battlefield coordination.
- **Technical & Systems:** hacking, engineering, cybernetics, drones, devices, interfaces.
- **Mobility & Exploration:** movement, terrain, stealth, traversal, positioning.
- **Social & Network:** social leverage, trust, command presence, morale, rapport, faction/crew dynamics.
- **Identity / Signal / Horror:** body identity, origin weirdness, Signal pressure, fear, alien/contact effects.

## 7. Provisional ability tree playtest set

The full current set lives in `SKILL-TREE-001`: six Attributes, 23 Skills, 55 Skill Focuses, 142 Abilities, and six Shared Branches. That document carries the detailed action cost, Lattice check surface, state surfaces, result bands, guardrail, prerequisites, validation dependencies, and candidate effect for each Ability.

The examples below are retained as lineage and quick orientation. They are not the complete list; where wording differs, `SKILL-TREE-001` controls the current playtest version.

### Combat Attack

- **Rifleman / Steady Rifle:** Firearms -> Rifles / Precision Fire. Rifle reliability.
- **Sidearm Specialist / Close Pistol:** Firearms -> Sidearms. Sidearm reliability.
- **Quickdraw Follow-Up / Backup Shot:** Firearms -> Sidearms. Improves equipped sidearm attacks made as Secondary Actions. Does not unlock secondary attacks.
- **Close Strike / Hard Contact:** Melee -> Close Combat. Melee reliability/damage.
- **Heavy Weapons Training / Big Gun Handling:** Heavy Weapons -> Heavy Weapons Use. Unlock/improve heavy weapons.

### Defense

- **Brace Protocol / Controlled Impact:** Field Defense -> Armor Handling. Armor-use posture and impact handling.
- **Screen Watch / Guarded Passage:** Field Defense -> Interposition. Ally and route protection.
- **Cover Drill / Fighting Withdrawal:** Field Defense -> Defensive Positioning. Effective Defense and protected repositioning.

### Support

- **Combat Triage / Fast Patch:** Medicine -> Combat Triage. Secondary touch healing/condition control.
- **Stabilize / Keep Them Breathing:** Medicine -> Stabilization. Stabilization quality.
- **Assist / Field Assist:** Field Support. Improves basic Assist.

### Tactics

- **Suppressive Fire / Support Gunner:** Suppression. Unlock/improve suppress action.
- **Screen / Screen Watch:** Screen. Screen Node / Screen Route.
- **Snap Mark / Call Angle:** Target Calling. Mark visible target, route, or threat as Secondary Action.
- **Direct / Command Line:** Direction. Improve ally execution.

### Technical & Systems

- **Intrusion / Clean Intrusion:** Computing -> Intrusion. Basic offensive hack.
- **Reflex Firewall / Shielded Kernel:** Computing -> Firewall. Hack/system resistance.
- **Jam / Signal Drag:** Computing -> Electronic Warfare. Temporary disruptive systems effect.
- **Quick Fix / Field Restore:** Engineering -> Field Repair. Field repair/restore.
- **Interface Medic / Sleeve Tech:** Cybernetics -> Cybernetic Care. Body-machine repair/care.

Jam means temporary disruption that degrades, delays, scrambles, or interferes with a target system without taking control of it. Jam is not full shutdown, permanent disable, corruption, control, ownership, or data theft.

### Mobility & Exploration

- **Fleet Foot / Quick Mover:** Mobility -> Basic Movement / Objective Running. +MP movement.
- **Hard Climb / Power Traverse:** Mobility -> Terrain Movement. Reduce terrain penalties.
- **Soft Step / Quiet Approach:** Stealth -> Infiltration. Stealth movement/positioning reliability.

### Social & Network

- **Rally / Steady Voice:** Command. Reduce ally pressure.
- **Read the Room / Social Insight:** Insight. Social pressure read.
- **Leverage / Terms of Pressure:** Negotiation. Bargain when useful leverage exists.
- **Plausible Cover / Clean Lie:** Deception. Maintain a false premise.

### Identity / Signal / Horror

- **Self-Anchor / Memory Checksum:** Resolve -> Identity Continuity. Identity and continuity safeguards.
- **Unknown Protocol / Meaning Quarantine:** Resolve -> First-Contact Grounding. Bounded response to unknown-contact pressure.

## 8. Playtest targets for level-up

The current pass should use the provisional tree rather than wait for final taxonomy.

Priority observations:

1. Record whether each chosen Ability changes an established rules surface clearly enough to resolve without improvising a new subsystem.
2. Record which Abilities are never chosen, mandatory-feeling, ambiguous, redundant, or stronger than their tier peers.
3. Test Tier 2 and Tier 3 entries only when prerequisites and Focus Total support them; exact thresholds remain parked.
4. Capture friction in action cost, Lattice check, result bands, state change, validation, and cross-domain ownership.
5. Revise the tree from evidence while preserving ordinary baseline actions for characters without the Ability.
