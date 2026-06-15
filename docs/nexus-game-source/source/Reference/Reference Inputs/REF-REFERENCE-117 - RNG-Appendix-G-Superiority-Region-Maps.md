---
project: "Nexus"
doc_id: "REF-REFERENCE-117"
legacy_ids:
  - 'REF-117'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\17 Reference Reports and Research rev0.2\02_RNG_and_Balance_Appendices\REF-117 - RNG_Appendix_G_Superiority_Region_Maps.md'
title: "RNG_Appendix_G_Superiority_Region_Maps"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "non_authoritative_reference"
placement_domain: "Reference"
content_role: "reference_input"
topic_family: "rng_appendix_g_superiority_region_maps"
owns_topics:
  - 'rng_appendix_g_superiority_region_maps'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Body reviewed in Phase 10 for routing and readability. Historical imported reference material may still retain evidence-oriented structure where preserved for traceability."
---

# RNG Appendix G Superiority Region Maps

## Reference status

Preserved from `03_Reference/rng_appendices/37_RNG_Appendix_G_Superiority_Region_Maps_rev1.md`. This is RNG/balance reference evidence, not finalized mechanics. Active rules remain in source packages until explicitly promoted.

---

# Nexus RNG Appendix G: Superiority Region Maps
Revision: 1.0  
Status: Draft  
Last Updated: 2026-05-02

## Purpose

This appendix defines a method for checking whether each major playstyle has a reason to exist.

A superiority region is the set of situations where an archetype is strong, best, or near-best. Balanced variety does not mean every archetype is equally good at everything. It means each has meaningful strengths and weaknesses.

## Canon Control

This appendix is a balance audit tool. It does not define final classes, enemies, missions, or mechanics.

Any map generated here is a draft testing artifact unless later adopted by relevant project documents.

## Core Principle

A healthy system should avoid both:

1. Dominant strategies: one option is best or near-best almost everywhere.
2. Dead options: one option is rarely or never meaningfully useful.

## Map Structure

Rows represent situations, enemy profiles, or mission pressures. Columns represent archetypes.

Use simple labels at first:

| Label | Meaning |
|---|---|
| Strong | Expected to perform well. |
| Neutral | Expected to contribute normally. |
| Weak | Expected to struggle. |
| Risky | High upside but unstable. |
| Untested | Needs simulation or playtest. |

## Draft Starting Matrix

| Situation / Profile | Precision | Volume | Defender | Skirmisher | Controller | Support | Drone | Gambler | Hacker |
|---|---|---|---|---|---|---|---|---|---|
| Light Swarm | Weak | Strong | Neutral | Neutral | Strong | Neutral | Strong | Risky | Weak |
| Armored Brute | Strong | Weak | Strong | Neutral | Neutral | Strong | Neutral | Risky | Weak |
| High-Evasion Target | Neutral | Weak | Neutral | Neutral | Strong | Strong | Weak | Risky | Neutral |
| Shielded Specialist | Neutral | Strong | Neutral | Strong | Neutral | Neutral | Strong | Risky | Strong |
| Control-Resistant Elite | Strong | Neutral | Strong | Neutral | Weak | Strong | Neutral | Risky | Neutral |
| System-Vulnerable Machine | Neutral | Neutral | Neutral | Neutral | Strong | Neutral | Strong | Risky | Strong |
| Biological Horror | Neutral | Neutral | Strong | Strong | Neutral | Strong | Weak | Risky | Weak |
| Objective Runner | Weak | Neutral | Weak | Strong | Strong | Strong | Strong | Risky | Strong |
| Attrition Gauntlet | Neutral | Neutral | Strong | Neutral | Neutral | Strong | Risky | Weak | Neutral |

This matrix is intentionally provisional. It exists to illustrate the method, not to define final Nexus balance.

## Dominance Test

An archetype is at risk of dominance if it is Strong or Neutral across nearly all situations and rarely Weak.

Questions:

1. Does it have a real counter-profile?
2. Does it pay a cost for flexibility?
3. Does it outperform specialists in their own niches?
4. Does it gain more from future content than other archetypes?
5. Does it combine too well with common support effects?

## Dead Option Test

An archetype is at risk of being dead if it is Weak across most situations and rarely Strong.

Questions:

1. Is its intended niche missing from the game?
2. Is another archetype doing the same job better?
3. Is its resource cost too high?
4. Is its success chance too unreliable?
5. Are its best encounters too rare?

## Region Revision Procedure

When a new mechanic is proposed:

1. Identify which archetypes benefit.
2. Identify which profiles it changes.
3. Update expected map labels.
4. Run simulations for changed cells.
5. Compare simulated results to expected labels.
6. If simulation and expectation diverge, revise either the mechanic or the map.

## Campaign Design Use

This appendix can also help build mission variety.

A campaign route should not only contain fights that reward one build type. Over a sector, the player should face a mix of:

- damage races
- survival fights
- objective missions
- hacking opportunities
- control-resistant enemies
- swarm pressure
- elite threats
- attrition pressure
- movement challenges

## Update Triggers

Update this appendix when:

- an archetype is added or removed
- an enemy profile is added or removed
- simulations reveal unexpected dominance
- playtests show an archetype has no niche
- mission design becomes Draft Active
- a resource or action-economy change shifts multiple cells

## Revision Notes

- Rev 1.0: Created initial superiority region map method and provisional matrix.


