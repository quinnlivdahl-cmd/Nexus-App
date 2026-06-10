---
project: "Nexus"
doc_id: "REF-REFERENCE-111"
legacy_ids:
  - 'REF-111'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\17 Reference Reports and Research rev0.2\02_RNG_and_Balance_Appendices\REF-111 - RNG_Appendix_A_Probability_Solver.md'
title: "RNG_Appendix_A_Probability_Solver"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "non_authoritative_reference"
placement_domain: "Reference"
content_role: "reference_input"
topic_family: "rng_appendix_a_probability_solver"
owns_topics:
  - 'rng_appendix_a_probability_solver'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-14"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Body reviewed in Phase 10 for routing and readability. Historical imported reference material may still retain evidence-oriented structure where preserved for traceability."
---

# RNG Appendix A Probability Solver

## Reference status

Preserved from `03_Reference/rng_appendices/31_RNG_Appendix_A_Probability_Solver_rev1.md`. This is RNG/balance reference evidence, not finalized mechanics. Active rules remain in source packages until explicitly promoted.

---

# Nexus RNG Appendix A: Probability Solver and Exact Math Workbook
Revision: 1.0  
Status: Draft  
Last Updated: 2026-05-02

## Purpose

This appendix defines the probability-solving reference structure for candidate Nexus resolution systems.

It exists to answer questions such as:

- What is the chance of success?
- How much does a bonus change success chance?
- How much does an extra die change success chance?
- How strong is advantage, disadvantage, a reroll, or exploding dice?
- How steep is the difference between novice, trained, expert, and legendary performance?
- Does a proposed mechanic break the intended probability band?

## Canon Control

This appendix does not select the official Nexus RNG system.

It may compare d20, bell-curve, dice-pool, card, pseudo-random, and hybrid systems. Those comparisons are exploratory unless later approved in the Core Rules document.

## Core Outputs

For any candidate system, the solver should be able to produce:

| Output | Description |
|---|---|
| Success chance | Probability that an action succeeds. |
| Critical chance | Probability of exceptional success, if the system supports it. |
| Failure chance | Probability that an action fails. |
| Severe failure chance | Probability of exceptional failure, if supported. |
| Expected value | Average expected damage, effect value, or net outcome. |
| Variance | How swingy the result is. |
| Marginal bonus value | How much one more point, die, reroll, or resource changes the outcome. |
| Breakpoint alerts | Points where small bonuses cause unusually large jumps. |

## Candidate System Families

### Single Die Linear Roll

Example family: roll one die, add a modifier, compare to a target number.

Established:

```text
Success when R + M >= T
Needed raw roll = T - M
P(success) = count(successful die faces) / S
```

For a d20:

```text
P(success) = clamp(21 - (T - M), 0, 20) / 20
```

Plain-English meaning:

A one-point bonus on a d20 usually changes success chance by 5 percentage points, except near automatic success or automatic failure.

Design implication:

- Easy to explain.
- Very swingy.
- Every +1 has predictable linear value.
- Large modifier stacks can overpower the die.

Status: Mathematical reference only.

### Bell-Curve Sum Roll

Example family: roll 2d6, 3d6, 2d10, or similar and add the dice together.

Established:

The probability of each total depends on how many combinations produce that total. Middle results are more common than extremes.

Plain-English meaning:

A small bonus near the middle of the curve is more powerful than the same bonus near the edges.

Design implication:

- Stable and predictable.
- Rewards expertise.
- Reduces wild outcomes.
- Can make large skill gaps feel very large near the center of the curve.

Status: Mathematical reference only.

### Dice Pool Success-Count Roll

Example family: roll N dice. Each die that meets or beats a threshold is one success. The action succeeds if the number of successes is at least K.

Established:

If each die has independent success chance p, dice rolled = N, and required successes = K:

```text
P(success) = sum from i = K to N of [ C(N, i) * p^i * (1-p)^(N-i) ]
```

Plain-English meaning:

More dice usually increase both average success and consistency, but the exact value depends on the threshold and number of required successes.

Design implication:

- Modular.
- Good for varied characters and layered bonuses.
- Can support partial success.
- Needs guardrails so adding dice does not become the best answer to everything.

Status: Mathematical reference only.

### Advantage and Disadvantage

Example family: roll multiple dice but keep the best or worst result.

Established for best-of-two on a single die:

```text
P(success with advantage) = 1 - P(failure)^2
```

Established for worst-of-two:

```text
P(success with disadvantage) = P(success)^2
```

Plain-English meaning:

Advantage helps most when the original chance is near the middle. It helps less when the action is already very easy or nearly impossible.

Design implication:

- Easy to understand.
- Good for situational modifiers.
- Can be too strong if freely stacked.
- Better as a named state than as a frequently stackable numeric bonus.

Status: Mathematical reference only.

### Rerolls

Established:

If a character may reroll a failed attempt once and keep the reroll:

```text
P(success after fail-reroll) = P(success) + P(failure) * P(success on reroll)
```

If the reroll uses the same probability p:

```text
P(success) = p + (1-p)p = 1 - (1-p)^2
```

Plain-English meaning:

A failed-roll reroll has the same success probability shape as advantage, but it can feel different at the table because the player sees the first failure.

Design implication:

- Strong luck mitigation.
- Increases reliability.
- Can reduce tension if too common.
- Should usually cost a meaningful resource, risk, condition, or opportunity.

Status: Mathematical reference only.

### Exploding Dice

Example family: when a die rolls its maximum result, roll again and add or count additional successes.

Plain-English meaning:

Exploding dice create rare extreme outcomes and long tails.

Design implication:

- Exciting.
- Good for high-volatility powers or dangerous technology.
- Harder to balance.
- Can create unexpected outlier damage or effect chains.

Status: Mathematical reference only.

## Probability Band Worksheet

Use this worksheet when evaluating any candidate system.

| Test Case | Intended Difficulty | Target Success Band | Candidate Result | Notes |
|---|---|---:|---:|---|
| Untrained easy task | Easy | TBD | TBD | Should not block play. |
| Untrained normal task | Normal | TBD | TBD | Defines baseline character competence. |
| Trained normal task | Normal | TBD | TBD | Shows value of training. |
| Expert hard task | Hard | TBD | TBD | Tests specialist identity. |
| Expert extreme task | Extreme | TBD | TBD | Tests ceiling without auto-success. |
| Weakness matchup | Hard/Bad fit | TBD | TBD | Tests whether weaknesses matter. |
| Favored matchup | Good fit | TBD | TBD | Tests whether strengths matter. |

## Bonus Sensitivity Worksheet

Use this worksheet to test each bonus type.

| Bonus Type | Example | Expected Effect | Risk |
|---|---|---|---|
| Flat modifier | +1, +2, +3 | Shifts threshold. | Stacking may overwhelm target numbers. |
| Extra die | +1 die to pool | Raises chance and reliability. | May dominate other bonuses. |
| Advantage | roll twice keep best | Strong midrange boost. | Can replace detailed tactical modifiers. |
| Reroll | retry failed roll | Raises reliability. | Can erase failure if too common. |
| Threshold reduction | success on 4+ instead of 5+ | Changes every die. | Very powerful in large pools. |
| Required success reduction | need 2 successes instead of 3 | Major breakpoint. | Can be stronger than it appears. |
| Effect multiplier | double damage/effect | Does not change hit chance. | Explodes when stacked with accuracy. |

## Recommended Use

Before approving a new mechanic, answer:

1. What exact probability does it change?
2. Does it affect success chance, output, reliability, or all three?
3. Does it stack with other common bonuses?
4. Does it create a breakpoint?
5. Does it make a non-specialist too reliable?
6. Does it make a specialist nearly automatic?
7. Is the mechanic still interesting if its numeric value is reduced?

## Update Triggers

Update this appendix when:

- a new candidate RNG system is added
- an RNG system is rejected or promoted
- target probability bands are chosen
- a new bonus type appears
- a new resource affects rerolls or success chance
- simulations reveal unexpected breakpoints

## Revision Notes

- Rev 1.0: Created initial probability solver appendix with candidate system families and worksheets.


