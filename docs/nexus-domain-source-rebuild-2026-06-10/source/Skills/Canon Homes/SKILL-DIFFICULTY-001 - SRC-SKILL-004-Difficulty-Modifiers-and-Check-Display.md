---
project: "Nexus"
doc_id: "SKILL-DIFFICULTY-001"
legacy_ids:
  - 'SRC-SKILL-004'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\10 Skills Resolution RNG rev0.5\SRC-SKILL-004 - Difficulty_Modifiers_and_Check_Display.md'
title: "Difficulty Modifiers and Check Display"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "canon_home"
topic_family: "difficulty_modifiers_and_check_display"
owns_topics:
  - 'difficulty_modifiers_and_check_display'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Difficulty Modifiers and Check Display

## 1. Purpose

This document gives DM Mode and Draft Mode a usable Lattice-100 check display and modifier-control pattern for provisional playtest.

**Lattice-100 is the active provisional display basis.** This document replaces the older "final math unresolved" display posture with a working d100 Target Score procedure.

## 2. Required compact check call

Use a compact check call when the roll is meaningful:

```text
Check: [Action] - [Capability] vs [Difficulty / Defense]
TS: [final Target Score] | Roll: d100 | Bands: Fail / Partial / Success / Critical Success or scene-specific noncombat bands
Sources: [lane summary]
Stakes: [success result] / [partial cost] / [failure consequence]
```

Combat-facing variation:

```text
Attack: [Attack / Weapon / Technique] vs [Defense]
TS: [final Target Score] | Roll: d100 | Bands: Miss / Graze / Hit / Direct
Sources: [lane summary]
Stakes: [hit effect] / [graze effect] / [miss risk if any]
```

Current formula forms:

```text
TS = 50 + Actor Bonus - (Defense - 15)
Effective Defense = Defense + cover + situational defensive modifiers
TS = 50 + Actor Bonus - (Effective Defense - 15)
TS = 50 + Actor Bonus - (Firewall - 15)
TS = 50 + Actor Bonus - (Hazard Rating - 15)
```

## 3. Roll display syntax

When showing a result, DM Mode should include the roll, Target Score, margin, and band. This file owns the mechanical fields, not the final live narration format.

Compact mechanical form:

```text
d100 [roll] vs TS [TS] | margin [+/-N] | [Band]
```

Do not use HTML shrink tags, emoji, or narrative block styling as the default source rule here. Live DM roll presentation belongs in `MODE-004`; this document only defines the check information that should be available to that display.

## 4. DM Mode required-use rule

DM Mode must not ignore this provisional procedure.

During Nexus playtest, DM Mode should:

- use Lattice-100 for meaningful checks unless a newer source supersedes it;
- display TS, roll, margin, and band when mechanical transparency helps play;
- avoid reverting to d20-style natural-20 language except when explicitly comparing old notes;
- log any Lattice friction instead of silently changing the RNG;
- keep the fiction first, then show mechanics only where useful.

## 5. Modifier provenance rule

Modifiers should come from visible or inferable sources. Avoid arbitrary hidden bonuses except rare DM-discretion adjustments that are explicitly described.

Valid modifier sources include:

- lower-tier power/effect/feature;
- Skill Focus tier;
- parent Skill value;
- derived Ability/Attribute total, if used;
- trait or tag;
- loadout, tool, weapon, cyberware, armor, Shield, Mitigation source, or credential;
- crew assist or ship system;
- position, cover, route, node, hazard, or environment;
- planning, preparation, faction access, dossier, Op Knowledge, or intel;
- Health, Morale, Loyalty, stress, wound, Signal pressure, trace, alarm, or status state.

## 6. Modifier lanes

Use lanes to prevent flat-bonus inflation.

| Lane | Owns | Examples |
|---|---|---|
| **Character** | innate + trained capability | attribute/ability, skill, focus, discipline, ability rank |
| **Gear** | carried tools and hardware | weapon, tool, armor module, cyberware, credential |
| **TacMap** | spatial facts | cover, range, elevation, flank, node, visibility, route |
| **Prep / Intel** | prior knowledge and setup | Op Knowledge, dossier, scan, planning, work order |
| **Team** | other crew support | Assist, crew support, ship support, coordinated setup |
| **Status** | current condition | wound, marked, suppressed, jammed, panicked, signal-touched |
| **Counter / Risk** | scene pressure | Exposure, Disposition, Trace, alarm, suspicion, countdown |

A check does not need every lane. Use only lanes that matter.

## 7. Same-lane consolidation

Do not stack every same-lane bonus as raw TS.

| Situation | Preferred handling |
|---|---|
| Two optics both improve aim | Use best optic; second may reveal info or improve range tag. |
| Cover + smoke + blind angle | Consolidate into TacMap lane; may become permission/visibility rather than three penalties. |
| Dossier + scan + work order | Use strongest Prep/Intel source; extras may reduce Trace, reduce cost, or unlock safer route. |
| Skill focus + discipline trick | Character lane may use one as TS contribution and the other as permission, band effect, or cost rule. |
| Credential + forged work order + uniform | Use one as main Prep/Gear contribution; extras support routine trace, lower Exposure, or option permission. |

## 8. Cross-lane TS guardrails

After lane handling, use these alert ranges.

| Final TS | Status | Handling |
|---:|---|---|
| `< 25` | Frustration alert | Check whether this should be blocked, rerouted, telegraphed as a bad gamble, or converted into a setup requirement. |
| `25-34` | Low chance | Acceptable for desperate or unskilled action; avoid routine gates here. |
| `35-70` | Normal play range | Preferred range for most meaningful rolls. |
| `71-74` | Strong advantage | Acceptable when earned; monitor Direct / critical-success chance. |
| `75-84` | High advantage alert | Strong success likely; convert excess support where appropriate. |
| `85+` | Conversion zone | Excess advantage should usually convert into effect, safety, cost, information, permission, or band shaping. |

These are tuning guardrails, not permanent locked DC policy.

## 9. Conversion rules

When raw TS stacking becomes too strong, convert advantage into another benefit.

| Convert into | Use when |
|---|---|
| Band shaping | The advantage improves quality, not chance. |
| Safer failure | The crew prepared for mistakes. |
| Lower cost | The action becomes faster, quieter, cheaper, or less traceable. |
| Permission | The action becomes possible at all. |
| Information | The crew learns weakness, route, tag, or consequence. |
| Shield/Mitigation interaction | The advantage changes Mitigation or stepdown behavior after connect. |
| Objective progress | The action advances the scene goal without extra damage. |
| Counter control | Exposure, Disposition, Trace, or alarm moves less severely. |

Examples:

| Raw stack problem | Better conversion |
|---|---|
| `+5 optic +5 high ground +5 mark +5 assist` | Best TacMap/Team bonuses apply; extra source upgrades Graze effect or suppresses cover. |
| `+10 dossier +5 credential +5 forged work order` | Roll gets one Prep/Intel contribution; extra sources make Trace routine or reduce Exposure. |
| `+10 cyberware +5 weapon +5 ability` | Gear lane chooses strongest raw contribution; ability grants band effect or tag permission. |

## 10. Numeric bonus constraint

Until more playtest evidence exists:

- **+/-2 to +/-5 TS** = normal small modifier range.
- **+/-6 to +/-10 TS** = strong modifier; should usually be situational, costed, or lane-limited.
- **+/-11+ TS** = rare, expensive, scene-shaping, or converted into non-TS benefit.

Ability and gear design should avoid passive unconditional raw TS stacking.

## 11. Difficulty display surfaces

Difficulty can be shown as:

- a simple named difficulty;
- an opposing actor defense;
- a clock or trace threshold;
- a hazard severity;
- a status severity;
- a node/path tag;
- a system Firewall;
- a social suspicion/access state;
- a Disposition, Exposure, Trace, or alarm pressure state.

## 12. Example check calls

| Check call | Use |
|---|---|
| `Resolve vs Panic` | Fear, coercion, stress, destabilization, or weird resistance checks. |
| `Medicine vs Injury Severity` | Improve recovery quality; not basic stabilization failure when access/tool are present. |
| `Cyberwarfare vs Firewall` | Hack or contest a tech/system surface. |
| `Mobility vs Route Hazard` | Cross dangerous path, breach, drift, climb, or unstable route. |
| `Contact vs Signal Pressure` | Rare/deferred Signal-facing check; not baseline play until campaign-gated. |
| `Engineering vs Structure` | Breach, stabilize, repair, bypass, or jury-rig physical systems. |
| `Faction Procedure vs Suspicion` | Use protocol, credential, or insider knowledge to reduce heat. |

## 13. DM display defaults

In ordinary play, avoid turning every moment into a visible menu of checks. Describe the fiction first, then show mechanics when useful.

Good default:

> The access panel is exposed. A stack of cargo creates a shadowed path past the checkpoint. The guard looks bored and underpaid.

Optional when useful:

```text
Visible hooks: panel access, shadow route, bored guard.
Likely approaches: Computing, Stealth, Rapport/Pressure, credential play, or a freeform plan.
```

## 14. Exceptional-margin principle

The older natural-20/opposing-high-roll note is superseded by a Lattice-facing principle:

- exceptional margins should create visible swing;
- Direct / Critical Success should matter without making every original plan perfect;
- Hard Fail should matter without defaulting to catastrophic character loss;
- Partial / Graze outcomes are important to Nexus pacing;
- high opposing defenses or hard scene states should be visible through lower TS, worse stakes, or sharper consequences.

## 15. Display boundary

Skills owns check callouts, stakes, modifier provenance, Target Score display, margin display, and band reading.

Modes owns broad chat, DM, narrative, and template display patterns. Combat owns tactical turn and TacMap display. Core owns core scene and mission rhythm.

Template pass needed: Modes should receive or cross-reference the Lattice-100 check display pattern so DM Mode does not ignore it.

## 16. When to ask for clarification

DM Mode should not stop for clarification every time a player gives a short command. If target, method, resource, and stakes are reasonably clear, resolve the action. Ask clarification only when ambiguity would materially change risk, cost, target, or consequence.



