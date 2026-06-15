---
project: "Nexus"
doc_id: "REF-REFERENCE-118"
legacy_ids:
  - 'REF-118'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\17 Reference Reports and Research rev0.2\02_RNG_and_Balance_Appendices\REF-118 - RNG_Appendix_H_RNG_Implementation_Notes.md'
title: "RNG_Appendix_H_RNG_Implementation_Notes"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "non_authoritative_reference"
placement_domain: "Reference"
content_role: "reference_input"
topic_family: "rng_appendix_h_rng_implementation_notes"
owns_topics:
  - 'rng_appendix_h_rng_implementation_notes'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Body reviewed in Phase 10 for routing and readability. Historical imported reference material may still retain evidence-oriented structure where preserved for traceability."
---

# RNG Appendix H RNG Implementation Notes

## Reference status

Preserved from `03_Reference/rng_appendices/38_RNG_Appendix_H_RNG_Implementation_Notes_rev1.md`. This is RNG/balance reference evidence, not finalized mechanics. Active rules remain in source packages until explicitly promoted.

---

# Nexus RNG Appendix H: RNG Implementation Notes
Revision: 1.0  
Status: Draft  
Last Updated: 2026-05-02

## Purpose

This appendix defines future-facing implementation notes for RNG behavior in Nexus, especially for eventual Replit or digital play.

The tabletop/notebook version can rely on visible rolls and GM procedure. A digital version needs reproducible, testable, debuggable randomness.

## Canon Control

This appendix does not define current tabletop rules or Replit requirements.

Implementation notes become binding only when adopted into Data Model and Content Schemas, UI UX and Accessibility, Replit Prompt Library, or a future implementation brief.

## Tabletop / Notebook Use

For notebook play, RNG should prioritize:

- visible roll procedure
- clear player-facing stakes
- simple reroll and resource tracking
- campaign log entries for major random events
- temporary rulings logged for later review

When ChatGPT acts as GM, major random outcomes should be explainable in plain language.

## Digital Use

For a future software version, RNG should prioritize:

- seedable randomness
- saved RNG state
- replayable combat logs
- separate random streams for different systems
- deterministic simulations for testing
- audit logs for unusual outcomes
- regression tests after balance changes

## Random Stream Separation

Advisory future implementation idea:

Separate RNG streams may be useful for:

| Stream | Example Use |
|---|---|
| Combat rolls | Attacks, defenses, criticals, damage variance. |
| Enemy AI | Target selection, behavior choice. |
| Loot | Rewards, drops, rarity. |
| Route events | Node generation, event selection. |
| Recruit generation | Traits, stat tendencies, complications. |
| World state | Faction activity, escalation, hazards. |

Reason:

If all randomness uses one stream, a small change in loot generation could accidentally change later combat results. Separate streams make testing easier.

## Replayability Requirements

A future digital combat log should ideally capture:

- seed values or seed identifiers
- ruleset version
- content version
- actor states before each action
- selected action
- random draw result
- modifiers applied
- final outcome
- resulting state changes

This makes bugs and surprising outcomes easier to reproduce.

## Pseudo-Random Smoothing

Some video games use smoothing to reduce streaks. For example, the displayed chance and the internal chance may differ, or failed attempts may raise later odds.

Advisory note:

Smoothing may improve player feel but can reduce transparency. If Nexus uses smoothing later, it should be explicitly documented and testable.

## Fairness and Player Trust

Players tend to remember unlikely bad streaks. A system can be mathematically fair and still feel unfair.

Future UX should consider:

- showing odds clearly when useful
- explaining why modifiers applied
- avoiding hidden penalties
- logging rare outcomes
- making mitigation resources visible
- distinguishing bad luck from bad tactical position

## Test Requirements for Digital RNG

A future implementation should test:

1. Are distributions correct?
2. Are seeds reproducible?
3. Are combat replays deterministic?
4. Do separate streams remain separate?
5. Do save/load cycles preserve RNG state?
6. Do balance simulations use the same logic as the playable game?
7. Are rare outcomes possible but not too frequent?
8. Does smoothing, if used, match its documented behavior?

## Update Triggers

Update this appendix when:

- Nexus moves closer to Replit implementation
- a digital prototype is planned
- a data schema for combat logs is created
- simulations become part of the workflow
- hidden or smoothed RNG is considered
- replay, seed, or audit requirements are defined

## Revision Notes

- Rev 1.0: Created initial RNG implementation notes appendix.


