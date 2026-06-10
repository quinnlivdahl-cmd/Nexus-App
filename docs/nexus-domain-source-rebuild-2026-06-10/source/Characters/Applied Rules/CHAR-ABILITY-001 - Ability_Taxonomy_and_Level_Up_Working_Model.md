---
project: "Nexus"
doc_id: "CHAR-ABILITY-001"
legacy_ids:
  - 'SRC-CHAR-009'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\09 Characters Crew Progression rev0.4\SRC-CHAR-009 - Ability_Taxonomy_and_Level_Up_Working_Model.md'
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
last_updated: "2026-05-21"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary, with historical lineage preserved in legacy fields and reference-input bodies retained where they serve evidence or template continuity."
---

# Ability Taxonomy and Level-Up Working Model

## 1. Current terminology

Use this provisional taxonomy for current ability and level-up work:

```text
Attribute -> Skill -> Skill Focus -> Ability
```

Terminology corrections:

- What earlier chats called **leaves** are now **abilities**.
- Root-level items loosely called abilities should be called **attributes** until renamed permanently.
- A **Skill Focus** is a specialized tree or specialty under a skill.
- An **Ability** is a selectable or rankable capability inside a Skill Focus.

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

## 7. Provisional ability tree seed

This is not the final level-up list. It is the current seed set for the next Seed pass.

### Combat Attack

- **Rifleman / Steady Rifle:** Firearms -> Rifles / Precision Fire. Rifle reliability.
- **Sidearm Specialist / Close Pistol:** Firearms -> Sidearms. Sidearm reliability.
- **Quickdraw Follow-Up / Backup Shot:** Firearms -> Sidearms. Improves equipped sidearm attacks made as Secondary Actions. Does not unlock secondary attacks.
- **Close Strike / Hard Contact:** Melee -> Close Combat. Melee reliability/damage.
- **Heavy Weapons Training / Big Gun Handling:** Heavy Weapons -> Heavy Weapons Use. Unlock/improve heavy weapons.

### Defense

- No accepted abilities yet. This is a priority gap for level-up design.

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

- No accepted abilities yet. This is a priority gap for level-up design.

## 8. Next Seed targets for level-up

The next ability pass should aim at a playable level-up list, not a complete taxonomy.

Priority targets:

1. Build a small level-up set that covers combat, support, technical, mobility, and social pressure.
2. Add at least a few Defense abilities.
3. Add at least a few Identity / Signal / Horror abilities only if they are needed for the test campaign.
4. Decide whether Tier 2 should appear in the immediate playtest or stay parked.
5. Keep ability names and rank text concrete enough for use at the table.


