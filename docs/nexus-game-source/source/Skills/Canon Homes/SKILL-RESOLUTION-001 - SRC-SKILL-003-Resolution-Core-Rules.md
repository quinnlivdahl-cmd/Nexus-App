---
project: "Nexus"
doc_id: "SKILL-RESOLUTION-001"
legacy_ids:
  - 'SRC-SKILL-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\10 Skills Resolution RNG rev0.5\SRC-SKILL-003 - Resolution_Core_Rules.md'
title: "Resolution Core Rules"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "canon_home"
topic_family: "resolution_core_rules"
owns_topics:
  - 'resolution_core_rules'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-17"
last_reviewed: "2026-07-17"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths. 2026-06-14 source reconciliation added check-family boundaries from the app-facing rules-core draft sequence. 2026-07-17 issue #19 reconciliation added prevalidated special bands, adaptive Check proposals, lead selection, and retry boundaries."
---

# Resolution Core Rules

> [!important] Revised vision reconciliation — 2026-07-11
> Lattice-100 remains authoritative and visible. DM Mode language below is tabletop/prototype workflow history; the spatial runtime and deterministic rules layer apply Lattice-100 under `CORE-SPATIAL-001`.

<!-- source-slice: skills.resolution.purpose-and-scope -->
## 1. Purpose

This document defines the current Nexus resolution substrate for playtest.

**Lattice-100 is the active provisional working kernel.** It is not final locked math, but it is the default procedure DM Mode and Draft Mode should use unless a newer source supersedes it.

This document owns:

- the core roll call;
- combat outcome bands and noncombat outcome interpretation;
- when checks are called;
- how competence thresholds relate to rolls;
- how resolution routes into adjacent combat, equipment, character, and noncombat systems.

It does not own final advancement math, final enemy math, full combat procedure, full equipment rules, or campaign-state consequences.

## 2. Current operating decision

Current RNG handling:

| Candidate | Current handling |
|---|---|
| **Lattice-100** | Default working kernel for provisional source docs and playtest. |
| **Edge-d20** | Simplicity benchmark only. Use for comparison, not as active default. |
| **Bell-20** | Parked. Preserve for historical/reference comparison only. |

The project should not continue broad three-way RNG redesign unless playtest or source integration exposes a concrete failure.

<!-- source-slice: skills.resolution.lattice-100-core-roll-call -->
## 3. Lattice-100 core roll call

Lattice-100 uses a d100 roll against a **Target Score**.

```text
Roll d100.
If roll <= TS, the action connects or succeeds.
Margin = TS - roll.
If roll > TS, the action misses or fails.
Failure Margin = roll - TS.
```

`TS` means the final target score after relevant capability, difficulty, defense, scene pressure, and modifier-lane handling are applied.

Target Score is a table-facing play value, not a permanent promise that all future formulas are locked.

Current formula forms:

```text
TS = 50 + Actor Bonus - (Defense - 15)
Effective Defense = Defense + cover + situational defensive modifiers
TS = 50 + Actor Bonus - (Effective Defense - 15)
TS = 50 + Actor Bonus - (Firewall - 15)
TS = 50 + Actor Bonus - (Hazard Rating - 15)
```

Use this notation as the active table-facing form. Do not prefer older inverted or compressed notation as the source form, even when algebraically equivalent.

<!-- source-slice: skills.resolution.combat-outcome-bands -->
## 4. Combat / attack outcome bands

Use these bands for attacks and attack-like effects.

| Roll result | Band | Working meaning |
|---|---|---|
| `roll > TS` | **Miss** | No connect. Possible narrative pressure only if an ability, weapon tag, scene rule, or hazard says so. |
| `margin 0-9` | **Graze** | Partial connect, chip, pressure, low damage, positional effect, soft success, or tag-specific minor effect. |
| `margin 10-69` | **Hit** | Standard successful attack or effect. |
| `margin 70+` | **Direct** | High-quality success. Enables strong weapon tags, critical effects, bypass tags, superior consequence, or higher effect. |

Direct should not automatically mean "ignore all defenses." Weapon, Mitigation, Shield, cover, and ability tags decide what Direct improves.

<!-- source-slice: skills.resolution.noncombat-outcome-bands -->
## 5. Noncombat / general check outcome bands

Noncombat keeps its original provisional bands for now. Do not automatically replace these with the combat-tuned Graze / Hit / Direct ranges. Combat should be more predictable; noncombat may preserve wider room for cost, trace, leverage, scene pressure, Op Knowledge, counters, and negotiated consequence.

Use these bands for social, infiltration, technical, medical, survival, recovery, research, route, and other noncombat checks unless a later scene-specific rule supersedes them.

| Roll result | Band | Working meaning |
|---|---|---|
| `failure margin 15+` | **Hard Fail** | The action fails and creates serious cost, exposure, complication, lost opportunity, worse state, or stronger opposition. |
| `failure margin 1-14` | **Fail** | The action fails, but consequences are limited, recoverable, or mostly informational. |
| `margin 0-14` | **Partial / Compromised Success** | The action succeeds with one grounded adverse After Effect such as cost, trace, time loss, counter movement, route change, or narrower information. |
| `margin 15-39` | **Success** | The action succeeds cleanly under expected conditions. |
| `margin 40+` | **Critical Success / Direct** | The action succeeds with superior effect, extra information, lower cost, cleaner trace, bypass, stronger leverage, or added opening. |

The same d100 Target Score structure supports both combat and noncombat, but the band ladder is not universal. Noncombat results should match the action's stakes, active counters, trace pressure, and available setup.

<!-- source-slice: skills.resolution.check-families-and-domain-tags -->
## 5.1 Check families and domain tags

Use check families as resolution-behavior categories, not as fiction labels.

Current working check families:

| Check family | Use |
|---|---|
| **attack** | Immediate attack-like resolution against a defensive surface, usually using Miss / Graze / Hit / Direct bands. |
| **standard** | One-roll immediate noncombat or mixed-scene resolution where the result can be read from one check. |
| **extended** | Multi-step work, clocks, progress tracks, staged operations, accumulating advantage, or scenes where the result should unfold over several meaningful beats. |

The family tells Rules Core how to resolve the check. Domain tags describe what the fiction is about.

The following are not check families by default:

```text
hacking
social
medical
stealth
engineering
investigation
traversal
```

Those terms usually belong as skills, action categories, target/surface tags, scene tags, ability hooks, modifier sources, effect profiles, UI display groups, or narration context.

Examples:

```text
Persuade a guard in one exchange
-> standard check with social tags

Run a pressure scene across several exchanges
-> extended check with social tags

Exploit a turret firewall to disable it immediately
-> standard or attack-like check with technical/system tags

Trade fire with a drone
-> attack check against Defense, Firewall, or another defined defensive surface
```

### 5.2 Prevalidated special bands

The five-band noncombat ladder is the default result-band set, not a demand to invent five distinct effects for every Check. Before rolling, Rules Core validates the effect attached to each special band.

- Strong Success without a meaningful added benefit resolves as ordinary Success.
- Partial Success without one grounded adverse After Effect resolves as ordinary Success.
- Hard Failure without a grounded serious adverse After Effect resolves as ordinary Failure.
- Ordinary Success achieves the objective; ordinary Failure does not. Neither requires an added After Effect.

This collapse happens when the Check is prepared, so every displayed band has a valid rules-native meaning. If a prepared Partial After Effect fails final validation and no replacement was already validated, the Check resolves as Success and records the validation failure for Developer Mode. Rules Core never invents a replacement after seeing the roll.

This rule does not alter combat Graze or other attack result bands. It implements [ADR-0092](../../../../adr/0092-special-result-bands-require-prevalidated-effects.md).

<!-- source-slice: skills.resolution.core-check-flow -->
## 6. Core check flow

1. DM describes the situation narratively.
2. Relevant skills, focuses, powers/effects, traits, crew, ship systems, equipment, cyberware, Op Knowledge, and context may reveal options, risks, weaknesses, permissions, or consequences.
3. Player chooses a presented option or proposes a freeform action.
4. DM identifies the check family, relevant capability, difficulty/defense, stakes, domain tags, and modifier lanes.
5. DM produces a compact check call when the roll is meaningful.
6. Roll d100 against the final Target Score.
7. Read the outcome band and apply the effect, cost, counter movement, damage, state change, or future option.
8. DM presents the changed situation and next meaningful choice.

### 6.1 Deliberate lead, assistance, and retry

A deliberate Check uses one selected eligible lead. The currently controlled eligible character is the default, but the player may select another eligible lead. The system never silently substitutes the character with the best odds. Qualified assistance is an optional player choice under the applicable assistance rule, not an automatic party bonus.

A failed deliberate Check cannot be repeated merely by switching characters. Another attempt requires a materially different method, tool, information state, time commitment, or world state.

An Extended Check is staged progress, not an exception to this boundary. Each authorized roll resolves a new meaningful beat with changed progress, pressure, risk, or state. If nothing relevant changed, there is no new roll.

### 6.2 Adaptive Check proposals

The Campaign Director may propose a situation-specific Check for a grounded player action that authored options did not anticipate. The proposal may name an approach or Skill and propose stakes and outcome meanings, but Rules Core must map it to existing Check families, Target Score rules, result bands, Effects, and StateDeltas and validate it against current Game Truth before rolling.

The proposal cannot create a new mechanic, state type, object, item, ability, permission, or effect. Generated Performance may describe only the validated committed result. This applies [ADR-0076](../../../../adr/0076-freeform-actions-use-existing-rules-beyond-authored-actions.md) and [ADR-0091](../../../../adr/0091-adaptive-checks-compose-existing-mechanics.md).

<!-- source-slice: skills.resolution.thresholds-for-competence -->
## 7. Thresholds for competence, rolls for uncertainty

Approved principle:

> Thresholds for competence; rolls for uncertainty.

Thresholds may automatically:

- reveal options;
- reduce costs;
- bypass simple penalties;
- identify safer paths;
- reveal risks;
- improve partial-success outcomes;
- negate minor modifiers;
- authorize routine actions under calm conditions;
- turn a risky Trace into a routine record when the cover plausibly fits.

Rolls/RNG are used when action is risky, contested, time-sensitive, unstable, hazardous, cinematic, opposed, or beyond normal competence.

## 8. Revealed options are not successes

A skill, focus, power/effect, threshold, item, credential, or piece of Op Knowledge can reveal a possible action or check, but revealing the option does not mean the check has been passed.

The player must still attempt and pass the relevant check unless the DM rules that the plan, equipment, prior setup, threshold, or context bypasses the roll.

<!-- source-slice: skills.resolution.gate-pressure-setup-split -->
## 9. Gate / Pressure / Setup check split

For noncombat and mixed scenes, classify checks by function.

| Check type | Function |
|---|---|
| **Gate Check** | Resolves the actual blocker or objective. |
| **Pressure Check** | Adjusts scene pressure such as Exposure, Disposition, Trace risk, alarm, or countdown. |
| **Setup Check** | Gains leverage, options, Op Knowledge, positioning, permission, or safer consequences. |

A Pressure Check does not automatically resolve the Gate. A Gate Check does not automatically erase pressure. A Setup Check changes future options or stakes.

## 10. Simple difficulty vs named defense

Use static difficulty or generic defense for simple challenges. Use named defenses for important enemies, NPCs, objects, obstacles, and systems when useful.

Examples:

- Sneak vs Awareness
- Cyberwarfare vs Firewall
- Medicine vs Injury Severity
- Resolve vs Panic
- Mobility vs Route Hazard
- Deception vs Insight
- Coercion vs Discipline
- Engineering vs Structure
- Faction procedure vs Suspicion or Access Control
- Contact vs Signal Pressure, rare/deferred and campaign-gated

A minor obstacle can use one Difficulty or Defense value. A more important guard, lock, station system, drone, or hazard can have multiple named defenses.

## 11. Stabilization and recovery checks

Basic stabilization does not fail because of a roll when all of the following are true:

- the character has access to the target;
- the character has a broadly correct item, tool, kit, system, or specialist route;
- the fiction allows the attempt.

In that case, a Lattice-100 roll may still matter, but it should determine recovery quality rather than whether basic stabilization works.

A stabilization/recovery roll can affect:

- revival state;
- lingering injury or Persistent Status severity;
- resource cost;
- time cost;
- need for ship or clinic follow-up;
- whether a status is suppressed, downgraded, or delayed;
- whether stabilization can happen at range, under fire, through a drone/tool, or in a hostile environment.

Characters owns recovery/revival consequences. Skills owns how the check is called when a check is needed.

## 12. Status resistance and clear checks

Not every Standard Status needs a resistance or clear roll. A roll happens when a status, scene, hazard, power, consequence, or tag says it happens.

Useful check types include:

- resistance check when the status first hits;
- clear check at end of turn or scene;
- action-based clear check;
- assist or tool-enabled clear check;
- recovery/Downtime check;
- special Signal/Contact pressure check when campaign-gated.

When a status calls for a roll, resolve it through the Lattice-100 noncombat/general bands unless the status defines a special combat-facing band result.

Combat owns status taxonomy and combat timing. Skills owns the resolution call when a status requires a check.

## 13. Freeform actions remain valid

Players are never limited to presented options. They may propose freeform actions, including short commands when target/risk/resource are clear, and the DM determines the relevant Skill, Focus, power/effect, defense, difficulty, risks, and possible outcomes.

The system should reward genuinely clever, grounded, or well-supported plans without converting every idea into a permanent menu item.

<!-- source-slice: skills.resolution.dm-mode-required-use -->
## 14. DM Mode required-use note
> [!note] Slice status — preserved mechanic, historical operator. Lattice-100 remains required, but the deterministic spatial runtime—not a primary DM-chat mode—owns its mechanical application under `CORE-SPATIAL-001`.

DM Mode must not treat Lattice-100 as optional background reading.

Until superseded, DM Mode should:

- use Lattice-100 for meaningful checks during playtest;
- display compact Target Score, roll, margin, band, and stakes when mechanics are shown;
- log confusion, pacing friction, band mismatch, or math failure as playtest evidence;
- make temporary rulings when needed, but route rule gaps to Draft/Steward instead of silently reverting to another RNG.

## 15. Scene-beat routing note

Full scene-beat procedure belongs in Core and Modes templates. Skills preserves the resolution principle only: complex plans should resolve in meaningful beats when there are real choices, costs, risks, and consequences.
