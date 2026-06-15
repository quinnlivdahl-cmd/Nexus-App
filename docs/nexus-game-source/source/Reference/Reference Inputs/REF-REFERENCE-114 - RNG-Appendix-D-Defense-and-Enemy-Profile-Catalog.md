---
project: "Nexus"
doc_id: "REF-REFERENCE-114"
legacy_ids:
  - 'REF-114'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\17 Reference Reports and Research rev0.2\02_RNG_and_Balance_Appendices\REF-114 - RNG_Appendix_D_Defense_and_Enemy_Profile_Catalog.md'
title: "RNG_Appendix_D_Defense_and_Enemy_Profile_Catalog"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "non_authoritative_reference"
placement_domain: "Reference"
content_role: "reference_input"
topic_family: "rng_appendix_d_defense_and_enemy_profile_catalog"
owns_topics:
  - 'rng_appendix_d_defense_and_enemy_profile_catalog'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Body reviewed in Phase 10 for routing and readability. Historical imported reference material may still retain evidence-oriented structure where preserved for traceability."
---

# RNG Appendix D Defense and Enemy Profile Catalog

## Reference status

Preserved from `03_Reference/rng_appendices/34_RNG_Appendix_D_Defense_and_Enemy_Profile_Catalog_rev1.md`. This is RNG/balance reference evidence, not finalized mechanics. Active rules remain in source packages until explicitly promoted.

---

# Nexus RNG Appendix D: Defense and Enemy Profile Catalog
Revision: 1.0  
Status: Draft  
Last Updated: 2026-05-02

## Purpose

This appendix defines non-canon enemy and defense profiles for RNG and balance testing.

A character system cannot be evaluated against one generic enemy. Different defenses expose different balance problems. This appendix provides standard opposition profiles for testing whether builds have strengths, weaknesses, and counterplay.

## Canon Control

Enemy profiles in this appendix are test models only. They do not define the official enemy roster, factions, species, AI, or combat stat blocks.

A profile becomes canon only if approved into Enemy and AI, Combat System, Mission System, or Lore documents.

## Defense Dimensions

Enemy profiles should be built from these dimensions:

| Dimension | Description |
|---|---|
| Health | Raw capacity to absorb harm. |
| Armor | Flat or scaling reduction against damage. |
| Evasion | Chance to avoid being hit. |
| Shields | Rechargeable, ablative, or special defense layer. |
| Resistance | Reduced effect from damage types, statuses, hacking, toxins, etc. |
| Control resistance | Protection against stun, slow, disable, panic, or forced movement. |
| Mobility | Ability to change range, flank, escape, or pursue. |
| Action pressure | Number and quality of enemy actions. |
| Range pressure | Whether the enemy punishes melee, ranged, or both. |
| Scaling pressure | Whether the enemy gets stronger over time. |
| Attrition pressure | Whether the enemy drains resources across the mission. |

## Draft Test Profiles

### Light Swarm

Purpose: tests volume control, area effects, overkill waste, and action economy.

Expected strong archetypes:

- area damage
- controllers
- volume attackers
- mobile skirmishers

Expected weak archetypes:

- single-shot overkill specialists
- slow defenders without area control

Balance concern:

If precision builds beat swarms as efficiently as area builds, niche protection may be weak.

### Armored Brute

Purpose: tests armor penetration, sustained damage, debuffs, and tanking.

Expected strong archetypes:

- armor-piercers
- debuffers
- durable defenders
- sustained damage builds

Expected weak archetypes:

- low-damage volume attackers
- fragile burst builds that cannot finish quickly

Balance concern:

Flat armor can over-punish multi-hit builds unless armor interaction is carefully designed.

### High-Evasion Target

Purpose: tests accuracy, rerolls, advantage, control, and guaranteed effects.

Expected strong archetypes:

- accuracy specialists
- controllers with non-attack checks
- area or partial-success effects

Expected weak archetypes:

- low-accuracy heavy hitters
- resource-limited burst builds

Balance concern:

If evasion can be bypassed too easily, it stops mattering. If not, some builds may become helpless.

### Shielded Specialist

Purpose: tests shield-breaking, burst windows, timing, and sequencing.

Expected strong archetypes:

- volume attackers
- shield disruptors
- coordinated burst teams

Expected weak archetypes:

- slow single-hit builds if shields refresh too often
- damage-over-time builds if shields block application

Balance concern:

Shields can either create tactical timing or become a second health bar with no decision value.

### Control-Resistant Elite

Purpose: tests whether controllers still contribute when enemies resist hard disables.

Expected strong archetypes:

- debuffers with partial effects
- damage/control hybrids
- support builds

Expected weak archetypes:

- pure stun-lock builds
- single-axis control builds

Balance concern:

Boss resistance should reduce control dominance without making control characters irrelevant.

### System-Vulnerable Machine

Purpose: tests hacking, signal, EMP, drone interaction, and technical playstyles.

Expected strong archetypes:

- hackers
- drone commanders
- signal manipulators
- equipment specialists

Expected weak archetypes:

- purely biological or melee builds if unsupported

Balance concern:

If machines are too common and too hackable, hacking becomes universal. If too rare, hacking becomes niche-only.

### Biological Horror

Purpose: tests toxin, morale, fear, biomass, regeneration, and non-mechanical resistance.

Expected strong archetypes:

- fire/containment builds
- morale-resistant defenders
- scanners or xenobiology specialists

Expected weak archetypes:

- hackers
- low-damage attrition builds if regeneration is high

Balance concern:

Non-machine enemies prevent hacking universality, but should not invalidate technical characters entirely.

### Objective Runner

Purpose: tests mission design where killing everything is not the only goal.

Expected strong archetypes:

- mobility
- stealth
- support
- hacking
- control

Expected weak archetypes:

- slow heavy damage builds
- static defenders

Balance concern:

If all missions are kill races, many non-damage builds become decorative.

### Attrition Gauntlet

Purpose: tests resource economy, healing, ammo, stress, and long-route durability.

Expected strong archetypes:

- efficient fighters
- support/stabilizers
- durable defenders
- flexible generalists

Expected weak archetypes:

- nova burst builds
- fragile high-variance builds

Balance concern:

Attrition is useful for balance but can punish fun if it becomes bookkeeping without meaningful choices.

## Minimum Enemy Test Matrix

Every major archetype should eventually be tested against at least:

1. Light Swarm
2. Armored Brute
3. High-Evasion Target
4. Shielded Specialist
5. Control-Resistant Elite
6. System-Vulnerable Machine
7. Biological Horror
8. Objective Runner
9. Attrition Gauntlet

## Update Triggers

Update this appendix when:

- a new enemy defense type is proposed
- a new mission type changes what combat success means
- an archetype lacks a meaningful counter or target
- simulations show a profile is too punishing or irrelevant
- lore introduces enemies that imply new mechanics
- combat rules become Draft Active

## Revision Notes

- Rev 1.0: Created initial defense and enemy profile catalog.


