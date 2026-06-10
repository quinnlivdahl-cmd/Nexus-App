---
project: "Nexus"
doc_id: "REF-REFERENCE-112"
legacy_ids:
  - 'REF-112'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\17 Reference Reports and Research rev0.2\02_RNG_and_Balance_Appendices\REF-112 - RNG_Appendix_B_Simulation_Protocol.md'
title: "RNG_Appendix_B_Simulation_Protocol"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "non_authoritative_reference"
placement_domain: "Reference"
content_role: "reference_input"
topic_family: "rng_appendix_b_simulation_protocol"
owns_topics:
  - 'rng_appendix_b_simulation_protocol'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Body reviewed in Phase 10 for routing and readability. Historical imported reference material may still retain evidence-oriented structure where preserved for traceability."
---

# RNG Appendix B Simulation Protocol

## Reference status

Preserved from `03_Reference/rng_appendices/32_RNG_Appendix_B_Simulation_Protocol_rev1.md`. This is RNG/balance reference evidence, not finalized mechanics. Active rules remain in source packages until explicitly promoted.

---

# Nexus RNG Appendix B: Simulation Protocol
Revision: 1.0  
Status: Draft  
Last Updated: 2026-05-02

## Purpose

This appendix defines how Nexus should use simulation to test RNG systems, combat mechanics, resources, archetypes, enemies, and future content expansion.

Exact probability math is ideal for isolated rolls. Simulation is needed when many mechanics interact over turns, encounters, missions, or campaign routes.

## Canon Control

Simulation results are empirical evidence under stated assumptions. They are not canon mechanics.

A simulation can reveal that a mechanic is risky, dominant, weak, or stable, but a rule only becomes official when approved into the relevant project document.

## Simulation Levels

| Level | Scope | Example Use |
|---|---|---|
| Roll-level | One action or check. | Test hit chance, reroll value, critical frequency. |
| Turn-level | One character turn. | Test action economy, combo output, resource spending. |
| Encounter-level | Full fight or challenge. | Test party survival, damage race, control reliability. |
| Mission-level | Multiple encounters. | Test attrition, ammo, wounds, healing, stress. |
| Route-level | Campaign sequence. | Test long-run progression, reward scaling, unlock pacing. |

## Required Metadata

Every simulation should record:

- simulation name
- appendix revision
- ruleset or candidate system version
- random seed or seed policy
- number of trials
- tested archetypes
- tested enemy profiles
- assumed stats
- assumed actions
- assumed AI behavior
- resource refresh assumptions
- excluded mechanics
- known simplifications

## Core Metrics

### Combat Metrics

| Metric | Meaning |
|---|---|
| Win rate | How often a side wins. |
| Survival rate | How often an archetype survives. |
| Time to win | Average turns or rounds needed to win. |
| Damage per round | Average output per round. |
| Effective damage | Damage adjusted for miss chance, armor, shields, resistance, or uptime. |
| Overkill waste | Damage that exceeds remaining enemy health. |
| Control uptime | Percentage of turns an enemy is impaired. |
| Resource exhaustion rate | How often the build runs out of key resources. |
| Recovery burden | Healing, repair, or rest needed after the encounter. |

### Balance Metrics

| Metric | Meaning |
|---|---|
| Mean performance | Average performance over trials. |
| Variance | How swingy performance is. |
| Worst-case performance | How punishing bad luck is. |
| Best-case performance | How explosive good luck is. |
| Matchup spread | Difference between best and worst enemy matchup. |
| Dominance score | How often one build beats others across profiles. |
| Niche coverage | Whether each archetype has favorable situations. |
| Scaling slope | How fast a build improves when content expands. |

## Simulation Procedure

1. Define the question.
2. Select candidate systems or mechanics.
3. Select archetypes from the Archetype Catalog.
4. Select enemy profiles from the Defense and Enemy Profile Catalog.
5. Define assumptions.
6. Run enough trials to make noise visible.
7. Record mean, variance, outliers, and failure cases.
8. Compare results to intended design bands.
9. Flag dominant strategies, dead options, or excessive variance.
10. Decide whether to reject, revise, retest, or promote the mechanic.

## Recommended Trial Counts

These counts are starting points, not hard rules.

| Test Type | Suggested Trials |
|---|---:|
| Simple roll probability check | Exact math preferred |
| Turn-level action comparison | 10,000+ |
| Encounter-level balance check | 10,000+ |
| Mission attrition check | 5,000+ |
| Route-level campaign check | 1,000+ |
| Regression test after small rule change | 1,000+ to 10,000+ |

## Minimum Simulation Output Table

| Test | Candidate | Archetype | Enemy Profile | Trials | Mean Result | Variance | Flag |
|---|---|---|---|---:|---:|---:|---|
| TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## Dominance Alert

A mechanic should be flagged if it does any of the following:

1. Wins across most enemy profiles.
2. Performs above average while also having low variance and low resource cost.
3. Improves multiple axes at once without enough trade-off.
4. Makes another archetype obsolete.
5. Scales better as more content is added.
6. Converts weakness matchups into neutral or favorable matchups too easily.

## Dead Option Alert

A mechanic should be flagged if it does any of the following:

1. Underperforms in almost every profile.
2. Needs unrealistic setup to work.
3. Has high variance but no higher upside.
4. Consumes resources for effects that other mechanics get for free.
5. Is only useful when the GM designs encounters around it.

## Regression Testing

Whenever a core rule changes, rerun saved tests.

Regression tests should answer:

- Did the change break a previously balanced archetype?
- Did it buff a strategy that was already strong?
- Did it create a new dominant strategy?
- Did it make an enemy profile too punishing?
- Did it change the intended feel of randomness?

## Update Triggers

Update this appendix when:

- simulation scope changes
- new metrics are needed
- archetypes or enemy profiles are added
- a candidate RNG system becomes the main candidate
- a combat or resource subsystem becomes Draft Active
- playtests reveal repeated mismatch with simulations

## Revision Notes

- Rev 1.0: Created initial simulation protocol appendix.


