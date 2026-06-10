---
project: "Nexus"
doc_id: "CONTENT-ENEMY-STAT-001"
legacy_ids:
  - 'SRC-CONTENT-003'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\13 Content Systems rev0.5\SRC-CONTENT-003 - Enemy_Roles_Tags_and_Stat_Blocks.md'
title: "Enemy_Roles_Tags_and_Stat_Blocks"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "canon_home"
topic_family: "enemy_roles_tags_and_stat_blocks"
owns_topics:
  - 'enemy_roles_tags_and_stat_blocks'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 9 normalized doc_id and placement metadata from CONTENT-CORE-003 to CONTENT-ENEMY-STAT-001. Phase 10 consolidated body routing into domain-first language and preserved the seeded enemy stat-block framework without relying on slot-era wording."
---

# Enemy Roles, Tags, and Stat Blocks

## Canon caution

The profile names below are test and balance scaffolds unless promoted later. They do not define the official enemy roster, species, factions, AI, or lore.

## Defense dimensions

Enemy profiles may be built from these dimensions:

- Health: capacity to absorb harm.
- Mitigation: damage reduction after Shield and before Health/System Integrity loss. Armor is an equipment category that may provide Mitigation.
- Defense: difficulty to hit or affect with physical/combat actions.
- Firewall: difficulty to affect with hacking, intrusion, spoofing, hostile system actions, and other technical attacks.
- Shield: limited deflection layer that steps down qualifying incoming effects before Mitigation is applied.
- Resistance: reduced effect from damage types, statuses, hacking, toxins, signal, morale, or environment.
- Control resistance: protection against stun, slow, disable, panic, forced movement, or hard lockdown.
- Mobility: ability to change range, flank, escape, climb, jump, fly, drift, or pursue.
- Action pressure: number and quality of enemy actions.
- Range pressure: whether the enemy punishes melee, ranged, close quarters, or open lanes.
- Scaling pressure: whether the enemy becomes worse over time.
- Attrition pressure: whether the enemy drains resources across the mission.

## Lattice/durability content alignment

Enemy stat blocks use the same content-facing durability terms as the current combat, character, skill, and equipment packages:

```text
Health | System Integrity | Defense | Firewall | Mitigation | Shield
```

Use **Health** for biological, organic, or character-facing harm. Use **System Integrity** when the target is primarily machine, drone, system, cybernetic chassis, software-bound, or otherwise better represented by technical degradation. Minor enemies do not need both tracks unless both tracks create a real decision.

Use **Defense** for combat/physical attack targeting and **Firewall** for hacking or technical intrusion targeting. Use **Mitigation** as the damage-reduction stat. Use **Shield** only when the target has a limited deflection layer that matters in play. Armor remains an equipment/content tag and may be the fictional source of Mitigation, but Armor is not the damage-reduction stat in active stat blocks.

Content entries may include role-profile ranges or examples, but should not silently bake duplicate durability mechanics into role text. A Brute can have high Health or Mitigation. A Shielded Specialist can have Shield. A System-Vulnerable Machine can have System Integrity and Firewall. Do not also add hidden reductions, hidden extra Health, or untracked shield-like effects unless the entry names them as content-specific traits.

For checks that resolve directly against an enemy defensive surface, route the mechanic to the Lattice package rather than redefining math here:

```text
TS = 50 + Actor Bonus - (Defense - 15)
TS = 50 + Actor Bonus - (Firewall - 15)
```

If cover or other situational defensive modifiers apply, `Combat` and `Skills` own the Effective Defense calculation. `Content` only names the content profile and any relevant tags.

## Test profile families

Use these as balance tests, not canon enemy names:

- Light Swarm: tests area effects, overkill waste, and action economy.
- Armored Brute: tests armor penetration, sustained damage, debuffs, and tanking.
- High-Evasion Target: tests accuracy, rerolls, advantage, control, and guaranteed effects.
- Shielded Specialist: tests shield-breaking, burst windows, timing, and sequencing.
- Control-Resistant Elite: tests whether controllers still contribute when enemies resist hard disables.
- System-Vulnerable Machine: tests hacking, Signal, EMP, drone interaction, and technical playstyles.
- Biological Horror: tests toxin, morale, fear, biomass, regeneration, and non-mechanical resistance.
- Objective Runner: tests missions where killing everything is not the only goal.
- Attrition Gauntlet: tests resource economy, healing, ammo, stress, and long-route durability.

## Role tags

Current useful enemy role tags:

```text
Swarm
Brute
Elite
Skirmisher
Objective Runner
Controller
Suppressor
Guard
Sniper
Breacher
Hacker
Drone
Machine
Biological
Shielded
Armored
High-Evasion
Control-Resistant
System-Vulnerable
Morale-Pressure
Attrition-Pressure
Scaling-Pressure
Hazard-Linked
```

## Defeat-state tags

Use defeat tags to keep DM Mode fast while preserving consequences:

```text
Lethal
Nonlethal
Stun
Disable
Hack
Capture
Custody
Morale
Suppression
Explosive
Fire
EMP
Signal
Legal
Witness
Alarm
Salvageable
Data-Rich
Contaminated
```

## Compact stat-block fields

A v0.1 enemy stat block should be compact enough for DM Mode to use quickly.

```text
Name:
Role:
Profile:
Health / System Integrity:
Defense:
Firewall:
Mitigation:
Shield / special layer:
Mobility:
Primary action:
Secondary action:
Reaction / trigger:
Objective behavior:
Weakness / bypass:
Tags:
Defeat consequences:
Reward / salvage / information hooks:
```

## DM Mode usability note

Enemy content should tell the DM what the enemy does under pressure. Avoid pure stat bricks. Include objective behavior, trigger behavior, and likely retreat/surrender/escalation behavior where relevant.

## Balance matrix rule

Major archetypes should eventually be tested against the profile families above. If a build has no meaningful strong target, weak target, counterplay, or mission niche, the enemy/content matrix is too flat.

## Mass-intake tag support

Additional role/tag support from the current source updates:

```text
System-Vulnerable
Firewall-bearing
System-Integrity
Shielded
Drone
Turret
Lockdown Controller
Objective Runner
Hazard-Linked
Capture/Custody
Legal Pressure
Player-Safe
DM-Only
```

Use Firewall/System Integrity only when a tech surface is tactically meaningful. Minor devices may only need a tag or System Status hook; major systems, bosses, drones, locked doors, turrets, suits, or station systems may need explicit fields.

Stat blocks should not grow just because a tag exists. Add a field only when it changes a decision, target, vulnerability, reward, or consequence.



