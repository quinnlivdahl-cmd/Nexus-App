---
project: "Nexus"
doc_id: "COMBAT-ENEMY-001"
legacy_ids:
  - 'SRC-COMBAT-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-007 - Enemy_Behavior_and_Tactical_Roles.md'
title: "Enemy_Behavior_and_Tactical_Roles"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "provisional_canon"
placement_domain: "Combat"
content_role: "applied_rule"
topic_family: "combat_enemy_behavior"
owns_topics:
  - 'combat_enemy_behavior'
  - 'tactical_roles'
borrows_topics:
  - 'content_enemy_framework'
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the seeded enemy-behavior guidance without relying on package-era framing."
---

# Enemy Behavior and Tactical Roles

## 1. Purpose

This document seeds the enemy behavior and tactical role layer from current combat source, encounter source, Systems Survey, and the non-canon RNG enemy profile catalog.

It does not define a final enemy roster, faction roster, stat block system, or enemy AI implementation.

## 2. Current principle

Enemies should create tactical problems, not merely HP pools. Enemy behavior should pressure movement, cover, objectives, reactions, information, systems, resources, and morale.

When Tactical Pressure begins, the Model Runtime may propose one bounded, situation-scoped **Tactical Directive** for an enemy group. The directive describes approved goals, posture, priorities, restraints, and authored contingencies. Local deterministic logic then executes legal movement, targeting, actions, reactions, and contingency transitions throughout the situation. Nexus does not call a model for each enemy turn. If the group directive is unavailable or invalid, deterministic fallback behavior governs the situation. The model never moves actors, rolls, spends resources, or writes Game Truth directly. This reconciles [ADR-0038](../../../../adr/0038-enemy-tactical-intent-is-model-proposed-and-locally-executed.md).

## 3. Tactical role surfaces

Useful role surfaces include:

- frontline blocker;
- mobile flanker;
- suppressor / overwatch threat;
- objective runner;
- shielded specialist;
- armored brute;
- light swarm;
- high-evasion target;
- control-resistant elite;
- system-vulnerable machine;
- biological horror;
- hacker / NetSec actor;
- attrition gauntlet pressure;
- reinforcements / alarm response.

## 4. Telegraphed pressure

Enemy pressure should often be visible or inferable before it resolves. Telegraphing creates counterplay.

Examples:

- a guard calls reinforcement request;
- a drone marks an approach;
- NetSec trace increases;
- a heavy unit anchors a passage;
- a runner moves toward an objective;
- an alarm door starts cycling;
- suppressive fire makes a path dangerous.

## 5. Reinforcements and timers

Reinforcements, alarms, trace clocks, extraction timers, pressure locks, and custody heat should be used to make objectives matter. They should be clear enough that the player can respond.

## 6. NetSec and system enemies

Hacking and system opposition should be map-native and mission-native, not a separate minigame unless later design demands one.

System pressure surfaces include:

- access;
- sensors;
- trace;
- lock;
- jam;
- shutdown;
- reroute;
- seize;
- spoof;
- cut link;
- firewall.

## 7. Test profiles from RNG Appendix D

The defense and enemy profile catalog is explicitly non-canon test material, but useful for balance coverage. Preserve its profiles as test surfaces:

1. Light Swarm;
2. Armored Brute;
3. High-Evasion Target;
4. Shielded Specialist;
5. Control-Resistant Elite;
6. System-Vulnerable Machine;
7. Biological Horror;
8. Objective Runner;
9. Attrition Gauntlet.

These profiles become canon only if later approved into Enemy/AI, Combat, Mission, or Lore documents.

## 8. Open needs

Still needed:

- exact role tags;
- enemy action menus;
- enemy durability math;
- morale / surrender / retreat behavior;
- reinforcement procedures;
- special boss / elite controls;
- automated enemy behavior tables, if desired later.
