---
project: "Nexus"
doc_id: "SKILL-TREE-001"
title: "Provisional Skill Tree Playtest Model"
doc_status: "working_draft"
working_state: "playtest_ready_provisional"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "current_state"
topic_family: "skill_tree_playtest_model"
owns_topics:
  - 'provisional_skill_tree_playtest_model'
  - 'skill_tree_candidate_ability_catalog'
borrows_topics:
  - 'ability_taxonomy'
  - 'lattice_resolution'
  - 'action_economy'
  - 'durability'
  - 'hacking'
  - 'social_state'
created: "2026-07-16"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Promoted by direct user instruction as the playtest-ready provisional Skill Tree. This document is usable source for playtesting and idea generation, but it does not finalize names, balance, advancement costs, thresholds, or cross-domain rules. The detailed catalog is generated from the bundled Skill Tree Lab seed so the human-readable source snapshot and app seed can be reviewed together."
---

# Provisional Skill Tree Playtest Model

> [!important] Playtest-ready, not final
> This tree is ready for character-build experiments, table playtests, and design iteration. It is provisional Nexus source, not final canon or final balance.

## 1. Authority and intended use

Use this tree now for:

- building provisional characters and campaign builds;
- choosing and ranking abilities during playtests;
- testing whether each ability produces a meaningful decision;
- generating better follow-up ideas from actual play;
- recording concrete balance, clarity, prerequisite, and coverage findings.

This status does not finalize:

- attribute, skill, focus, or ability names;
- tier thresholds, rank costs, level-up budgets, or exact progression cadence;
- numerical balance beyond the stated candidate effect;
- unresolved rules owned by Combat, Equipment, Characters, Core, or other domains;
- a local Skill Tree Lab edit that has not been synchronized back into source.

When this document conflicts with an accepted cross-domain rule, the owning rule remains controlling. Treat the mismatch as a playtest finding to reconcile, not permission to silently override the other rule.

## 2. Adopted playtest structure

The current playtest hierarchy is:

```text
Attribute -> Skill -> Skill Focus -> Ability
```

The snapshot contains:

- **6 Attributes**: Combat, Dexterity, Intelligence, Constitution, Wisdom, and Charisma;
- **23 Skills**;
- **55 Skill Focuses**;
- **142 Abilities**, including 6 shared-branch Abilities;
- **6 Shared Branches**.

The six familiar attribute names are the current playtest labels. They are usable and intentional, while still open to evidence-based revision.

## 3. Ability rules contract

An Ability is not just a name or a narrative prompt. Every playtest Ability below declares:

- its action-cost posture;
- the Lattice check or validation surface it acts on;
- the game-state surfaces it may change;
- the result-band interpretation;
- a guardrail that limits the effect;
- prerequisites and validation dependencies;
- a candidate effect that states the proposed mechanical result.

The main established surfaces include:

- Lattice Target Score, margin, and combat or noncombat result bands;
- AP, MP, reactions, preparation, and other action-economy costs;
- Health, System Integrity, Standard Status, Downed/Disabled countdowns, and recovery limits;
- Defense, Effective Defense, cover, Shield, Mitigation, and forced movement;
- Firewall, System Status, Trace, access, link, and hostile-system validation;
- exposure, disposition, leverage, operational knowledge, credentials, routes, materials, and objective state where an owning rule defines them.

Abilities pass through the normal action transaction. They do not directly mutate state or bypass target, range, equipment, timing, resource, visibility, consent, or scene validation.

## 4. Synchronization boundary

This Markdown document is the human-readable provisional source snapshot. Its detailed catalog is generated from:

`artifacts/nexus-companion/src/features/skill-tree-lab/seed-data.ts`

The rules-surface derivation used by that seed lives at:

`artifacts/nexus-companion/src/features/skill-tree-lab/rules-impact.ts`

Regenerate this source snapshot after an accepted seed change with:

`corepack pnpm run source:skill-tree`

The Skill Tree Lab may hold newer local browser edits for review. Those edits remain proposals until they are deliberately synchronized into the app seed and this source snapshot. The Obsidian mobile-review note is a review surface, not source authority.

## 5. Detailed playtest catalog

All entries remain provisional even when their status field says `proposed`. “Proposed” means the item is open to revision; the catalog as a whole is still authorized for present playtest use.

## Combat

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal

**Identity:** Deliberate control of violence, protection, and coordinated pressure.

**Gameplay promise:** Combat investment should create distinct ways to attack, protect, and direct a team without making fighting mandatory for every character.

**Coverage notes:** Covers offense, defense, protection, suppression, and small-unit command. Constitution owns endurance and Charisma owns social leadership.

**Historical lineage:**
- Force -> Combat
- Firearms, Heavy Weapons, Melee, Armor, and Tactics preserved as lineage

### Firearms

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Combat

**Definition:** Use carried ranged weapons that depend on sightline, handling, and ammunition rather than heavy mounting.

**Typical checks:**
- place a difficult rifle shot
- control a sidearm in close space
- identify a firearm handling problem

**Boundaries:**
- Heavy Weapons owns crew-served or mounted-scale handling
- Tactics owns coordinated pressure
- Equipment owns weapon statistics

**Historical terms:**
- Firearms
- Rifles
- Sidearms

#### Precision Fire

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Firearms

**Character fantasy:** A patient shooter who turns a narrow sightline into certainty.

**Focus identity:** Rifle reliability, aim, range discipline, and deliberate shot placement.

**Boundary:** Sidearms owns close and secondary-weapon handling. Heavy Weapons owns area pressure.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- aimed attacks
- long sightlines
- called target zones
- cover-aware fire

##### Steady Rifle

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).
- **Rules state surfaces:** Defense and cover, Shield -> Mitigation -> Health/System Integrity, position or route state
- **Result bands:** While aimed, add +2 TS from the Character lane to one valid rifle attack. On a Direct, apply the weapon's Direct result; this Ability adds no separate damage.
- **Guardrail:** Use the normal once-per-activation attack limit. Cover remains part of Effective Defense and cannot be ignored unless another stated effect permits it.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve the reliability of a properly aimed rifle attack without changing the weapon's base profile. Proposed rules effect: While aimed, add +2 TS from the Character lane to one valid rifle attack. On a Direct, apply the weapon's Direct result; this Ability adds no separate damage.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- equipped rifle
- line of sight
- aim or setup state
- range

**Coverage tags:**
- combat-offense
- away-team

##### Sightline Discipline

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).
- **Rules state surfaces:** Defense and cover, Shield -> Mitigation -> Health/System Integrity, position or route state
- **Result bands:** The next valid attack described by this Ability gains +2 TS from the Character lane. Clear the preparation after that attack or at the end of the character's next activation; the weapon's normal result bands still apply.
- **Guardrail:** A valid weapon, target, line of effect, ammunition or power state, and normal once-per-activation attack limit still apply.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a visible lane so the next valid precision attack can better handle cover or range pressure. Proposed rules effect: The next valid attack described by this Ability gains +2 TS from the Character lane. Clear the preparation after that attack or at the end of the character's next activation; the weapon's normal result bands still apply.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- visible lane
- equipped ranged weapon
- timing
- cover state

**Coverage tags:**
- combat-offense
- away-team

##### Converging Fire

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Setup or Assist check vs Effective Defense, Hazard Rating, or tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Team lane, position or route state, objective state, Exposure
- **Result bands:** On Success, grant the declared allied precision attack +2 TS from the Team lane against the same pressured target. Partial grants the bonus and adds 1 Exposure; the ally still spends and resolves the normal attack.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** away-team
- **Prerequisites:** Steady Rifle AND Sightline Discipline
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: coordinate a precision attack with an ally who is already pressuring the same target. Proposed rules effect: On Success, grant the declared allied precision attack +2 TS from the Team lane against the same pressured target. Partial grants the bonus and adds 1 Exposure; the ally still spends and resolves the normal attack.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- ally state
- same target
- line of sight
- timing

**Coverage tags:**
- combat-offense
- command-tactics
- away-team

#### Sidearms

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Firearms

**Character fantasy:** A close-range gunfighter who stays useful when space and time collapse.

**Focus identity:** Ready access, close handling, and secondary-weapon follow-through.

**Boundary:** Precision Fire owns deliberate range. Close Combat owns bodily contact and grappling.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- close pistol attacks
- backup-weapon use
- rapid ready
- confined spaces

##### Close Pistol

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).
- **Rules state surfaces:** Defense and cover, Shield -> Mitigation -> Health/System Integrity, position or route state
- **Result bands:** At Close range or in a confined-space scene, add +2 TS from the Character lane to one valid sidearm attack vs Effective Defense. Use the sidearm's normal Graze, Hit, and Direct results.
- **Guardrail:** This changes attack reliability only. It does not add damage, ignore cover, waive ammunition, or permit an extra attack.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve sidearm reliability when the target is close or the scene is physically constrained. Proposed rules effect: At Close range or in a confined-space scene, add +2 TS from the Character lane to one valid sidearm attack vs Effective Defense. Use the sidearm's normal Graze, Hit, and Direct results.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- equipped sidearm
- range
- target
- scene geometry

**Coverage tags:**
- combat-offense
- away-team

##### Backup Shot

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).
- **Rules state surfaces:** Defense and cover, Shield -> Mitigation -> Health/System Integrity, position or route state
- **Result bands:** Add +2 TS from the Character lane to one valid attack or force check that directly performs this Ability's described effect. Apply the weapon or declared action's normal result bands; this Ability adds no free attack or separate damage.
- **Guardrail:** A valid weapon, target, line of effect, ammunition or power state, and normal once-per-activation attack limit still apply.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve an equipped sidearm attack made through an already valid Secondary Action. This does not unlock the secondary attack itself. Proposed rules effect: Add +2 TS from the Character lane to one valid attack or force check that directly performs this Ability's described effect. Apply the weapon or declared action's normal result bands; this Ability adds no free attack or separate damage.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- equipped sidearm
- Secondary Action available
- ammunition
- target

**Coverage tags:**
- combat-offense
- away-team

### Close Combat

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Combat

**Definition:** Control bodily contact, melee attacks, grapples, and breach-range physical pressure.

**Typical checks:**
- land a melee attack
- grapple or disarm
- control a breach-range target

**Boundaries:**
- Mobility owns reaching contact
- Field Defense owns protection
- Equipment owns weapon profiles

**Historical terms:**
- Melee
- Close Combat

#### Breach Fighting

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Close Combat

**Character fantasy:** A breach fighter who controls the dangerous distance inside arm's reach.

**Focus identity:** Melee reliability, contact control, and physical disruption.

**Boundary:** Mobility owns reaching the target. Field Defense owns protecting an ally once contact begins.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- melee attacks
- grapples
- disarms
- breach entry

##### Hard Contact

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).
- **Rules state surfaces:** Defense and cover, Shield -> Mitigation -> Health/System Integrity, position or route state
- **Result bands:** Add +2 TS from the Character lane to one valid attack or force check that directly performs this Ability's described effect. Apply the weapon or declared action's normal result bands; this Ability adds no free attack or separate damage.
- **Guardrail:** A valid weapon, target, line of effect, ammunition or power state, and normal once-per-activation attack limit still apply.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve the reliability or immediate force of a valid close-combat attack. Proposed rules effect: Add +2 TS from the Character lane to one valid attack or force check that directly performs this Ability's described effect. Apply the weapon or declared action's normal result bands; this Ability adds no free attack or separate damage.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- melee range
- valid weapon or unarmed profile
- target
- timing

**Coverage tags:**
- combat-offense
- away-team

##### Clinch Control

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice force or control check vs Effective Defense or the target's stated resistance.
- **Rules state surfaces:** position or route state, forced movement, Standard Status
- **Result bands:** On Success, bind, turn, or displace the adjacent target by one legal position step instead of dealing damage. Partial achieves the control with 1 Exposure or a weaker position.
- **Guardrail:** This changes only the declared control or position result and does not add weapon damage or bypass size, reach, or target validation.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Gain a structured option to bind, turn, or displace a nearby target instead of dealing direct harm. Proposed rules effect: On Success, bind, turn, or displace the adjacent target by one legal position step instead of dealing damage. Partial achieves the control with 1 Exposure or a weaker position.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- adjacency
- target scale
- free limb or valid tool
- scene geometry

**Coverage tags:**
- combat-offense
- defense-protection
- away-team

### Heavy Weapons

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Combat

**Definition:** Operate weapons whose recoil, mounting, area, or power demands create a distinct action and equipment family.

**Typical checks:**
- operate a heavy weapon
- brace a firing platform
- manage area pressure safely

**Boundaries:**
- Firearms owns personal ranged weapons
- Tactics owns the suppression plan
- Equipment owns mounting and ammunition

**Historical terms:**
- Heavy Weapons
- Support Weapons

#### Heavy Weapons Use

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Heavy Weapons

**Character fantasy:** A crew-served weapons specialist who turns mass and recoil into controlled pressure.

**Focus identity:** Heavy-weapon permission, bracing, and area denial.

**Boundary:** Equipment owns weapon classification and ammunition. Suppression owns team-directed denial patterns.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- heavy attacks
- braced fire
- breaching fire
- area pressure

##### Big Gun Handling

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Effective Defense, weapon result bands, Shield -> Mitigation -> Health/System Integrity
- **Result bands:** When carry, mounting, recoil, and equipment requirements validate, operate the declared heavy weapon without its named handling/setup penalty. Resolve any attack normally.
- **Guardrail:** Normal weapon, target, line-of-effect, ammunition or power, and once-per-activation attack limits still apply; this grants no free attack or damage.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Unlock or improve safe operation of a valid heavy weapon when its carry and mounting requirements are met. Proposed rules effect: When carry, mounting, recoil, and equipment requirements validate, operate the declared heavy weapon without its named handling/setup penalty. Resolve any attack normally.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- heavy weapon
- mount or body requirement
- ammunition
- power state

**Coverage tags:**
- combat-offense
- away-team
- ship-support

##### Area Pressure

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).
- **Rules state surfaces:** position or route state, forced movement, Standard Status
- **Result bands:** On Hit, apply Suppressed to the declared zone or increase its route cost by 1 MP until the end of the target side's next activation; Graze lasts through the current activation and Direct affects one adjacent route.
- **Guardrail:** Normal weapon, target, line-of-effect, ammunition or power, and once-per-activation attack limits still apply; this grants no free attack or damage.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Use a heavy weapon to pressure a declared zone, trading precision for space control. Proposed rules effect: On Hit, apply Suppressed to the declared zone or increase its route cost by 1 MP until the end of the target side's next activation; Graze lasts through the current activation and Direct affects one adjacent route.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- heavy weapon
- declared zone
- ammunition
- line of effect

**Coverage tags:**
- combat-offense
- command-tactics
- away-team

### Field Defense

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** newly-proposed
- **Parent Attribute:** Combat

**Definition:** Create deliberate protection through armor handling, interposition, cover, and defended position.

**Typical checks:**
- hold a route
- protect an ally
- use armor actively
- withdraw without losing protection

**Boundaries:**
- Endurance owns surviving harm
- Mobility owns pure evasion
- Equipment owns armor and shield values

**Historical terms:**
- Armor
- Guard
- Defense
- Screen

#### Armor Handling

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Field Defense

**Character fantasy:** A defender who makes worn protection an active tool instead of a passive number.

**Focus identity:** Bracing, impact management, and trained armored posture.

**Boundary:** Equipment owns armor tags, values, damage, and repair. Endurance owns unarmored bodily resilience.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- resist forced movement
- manage impact
- defensive stance
- armored objective work

##### Brace Protocol

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Use the stated trigger, stance, or Lattice defense check against the incoming effect.
- **Rules state surfaces:** Effective Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** While braced, add +2 TS to resistance against impact, forced movement, or knockdown; if no roll is made, step one qualifying forced-movement result down by one band.
- **Guardrail:** Armor remains equipment and Mitigation remains its stat; the Ability grants only its named posture, Screen, reaction, or resistance result.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Enter a defensive posture that improves resistance to impact, forced movement, or knockdown while maintained. Proposed rules effect: While braced, add +2 TS to resistance against impact, forced movement, or knockdown; if no roll is made, step one qualifying forced-movement result down by one band.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- posture available
- movement state
- timing
- incoming effect

**Coverage tags:**
- defense-protection
- away-team

##### Controlled Impact

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Use the stated trigger, stance, or Lattice defense check against the incoming effect; cover modifies Effective Defense, not base Defense.
- **Rules state surfaces:** Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** Spend the reaction to step the triggering incoming result down one band against the protected target. Shield and Mitigation then resolve normally.
- **Guardrail:** Armor is equipment and Mitigation is its stat; a learned Ability may grant posture, reaction, or permission but does not duplicate gear values.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** When struck, reduce or reshape one immediate physical consequence without negating the attack itself. Proposed rules effect: Spend the reaction to step the triggering incoming result down one band against the protected target. Shield and Mitigation then resolve normally.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- reaction available
- incoming physical harm
- armor or braced state
- timing

**Coverage tags:**
- defense-protection
- away-team

#### Interposition

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Field Defense

**Character fantasy:** A protector who steps into the line of consequence before it reaches someone else.

**Focus identity:** Screening people, routes, and short windows of movement.

**Boundary:** Command coordinates a team-wide plan. Interposition personally creates the protection.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- screen a node
- cover an ally
- protect a passage
- intercept immediate harm

##### Screen Watch

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Effective Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** Establish one Screen over a valid nearby subject, node, or route until the character's next activation; its stated interception trigger may use the character's available reaction.
- **Guardrail:** Armor remains equipment and Mitigation remains its stat; the Ability grants only its named posture, Screen, reaction, or resistance result.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Establish a Screen over a valid node, route, or nearby subject and gain the protection permission defined by that Screen. Proposed rules effect: Establish one Screen over a valid nearby subject, node, or route until the character's next activation; its stated interception trigger may use the character's available reaction.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- declared screen subject
- position
- line of effect
- stance upkeep

**Coverage tags:**
- defense-protection
- command-tactics
- away-team

##### Guarded Passage

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Setup or Assist check vs Effective Defense, Hazard Rating, or tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Effective Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** On Success, establish a short protected route; up to two declared allies crossing it gain +2 Effective Defense until arrival. Partial protects one ally and adds 1 Exposure.
- **Guardrail:** Armor remains equipment and Mitigation remains its stat; the Ability grants only its named posture, Screen, reaction, or resistance result.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Declare a short route or opening that allies can cross under your protection while the passage remains valid. Proposed rules effect: On Success, establish a short protected route; up to two declared allies crossing it gain +2 Effective Defense until arrival. Partial protects one ally and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- declared route
- ally movement
- line of effect
- timing

**Coverage tags:**
- defense-protection
- mobility-exploration
- away-team

##### Take the Hit

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Use the stated trigger, stance, or Lattice defense check against the incoming effect; cover modifies Effective Defense, not base Defense.
- **Rules state surfaces:** Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** Spend the reaction to replace the nearby ally with this character as the legal target of the triggering interceptable effect. Resolve the unchanged incoming result against the new target, including Shield and Mitigation.
- **Guardrail:** Armor is equipment and Mitigation is its stat; a learned Ability may grant posture, reaction, or permission but does not duplicate gear values.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Become the valid target of immediate harm aimed at a nearby ally when position and effect type allow interception. Proposed rules effect: Spend the reaction to replace the nearby ally with this character as the legal target of the triggering interceptable effect. Resolve the unchanged incoming result against the new target, including Shield and Mitigation.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- reaction available
- nearby ally
- interceptable effect
- position

**Coverage tags:**
- defense-protection
- support-recovery
- away-team

##### Defended Corridor

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Use the stated trigger, stance, or Lattice defense check against the incoming effect; cover modifies Effective Defense, not base Defense.
- **Rules state surfaces:** Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** Until this character's next activation, the character or route protected by the stated posture gains +2 Effective Defense against the Ability's declared threat family.
- **Guardrail:** Armor is equipment and Mitigation is its stat; a learned Ability may grant posture, reaction, or permission but does not duplicate gear values.
- **Applicability:** away-team
- **Prerequisites:** Screen Watch AND Guarded Passage
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: maintain a Screen across a route while allowing protected allies to reposition through it. Proposed rules effect: Until this character's next activation, the character or route protected by the stated posture gains +2 Effective Defense against the Ability's declared threat family.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- declared route
- allies
- stance upkeep
- line of effect

**Coverage tags:**
- defense-protection
- command-tactics
- away-team

#### Defensive Positioning

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Field Defense

**Character fantasy:** A tactical anchor who makes important ground costly to take.

**Focus identity:** Cover, controlled withdrawal, and boundary defense.

**Boundary:** Mobility owns fast traversal. Suppression owns ranged area pressure.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- use cover
- hold an objective
- withdraw safely
- deny a crossing

##### Cover Drill

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Effective Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** After entering valid cover or taking the owning defensive action, improve that cover's Effective Defense benefit by +2 against one declared threat family until the next activation.
- **Guardrail:** Armor remains equipment and Mitigation remains its stat; the Ability grants only its named posture, Screen, reaction, or resistance result.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve the normal protection gained from valid cover after moving into it or taking a defensive action. Proposed rules effect: After entering valid cover or taking the owning defensive action, improve that cover's Effective Defense benefit by +2 against one declared threat family until the next activation.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- valid cover
- position
- defensive action or movement
- line of effect

**Coverage tags:**
- defense-protection
- away-team

##### Fighting Withdrawal

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Mobility or traversal check vs Hazard Rating when the route or interruption is uncertain.
- **Rules state surfaces:** Effective Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** On Success, cross one short route away from the threat while preserving the existing cover or Screen benefit through arrival. Partial repositions but ends the posture and adds 1 Exposure.
- **Guardrail:** Armor remains equipment and Mitigation remains its stat; the Ability grants only its named posture, Screen, reaction, or resistance result.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Reposition away from a threat while retaining part of an already established defensive posture. Proposed rules effect: On Success, cross one short route away from the threat while preserving the existing cover or Screen benefit through arrival. Partial repositions but ends the posture and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- valid route
- established posture
- movement available
- threat position

**Coverage tags:**
- defense-protection
- mobility-exploration
- away-team

##### Anchor Point

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Effective Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** Establish a defended boundary until the next activation and gain one reaction trigger when a threat crosses it; resolve the reaction with the declared defense or control action.
- **Guardrail:** Armor remains equipment and Mitigation remains its stat; the Ability grants only its named posture, Screen, reaction, or resistance result.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Guard a node, doorway, route, or objective and gain a reaction when a threat crosses the declared boundary. Proposed rules effect: Establish a defended boundary until the next activation and gain one reaction trigger when a threat crosses it; resolve the reaction with the declared defense or control action.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- declared boundary
- reaction available
- position
- hostile crossing

**Coverage tags:**
- defense-protection
- command-tactics
- away-team

##### Hold the Line

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 3
- **Maximum Rank:** 1
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Use the stated trigger, stance, or Lattice defense check against the incoming effect.
- **Rules state surfaces:** Team lane, position or route state, objective state, Exposure
- **Result bands:** While committed to the declared boundary, prevent one route or objective collapse or grant the crew +2 TS against forced withdrawal once per activation.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** away-team
- **Prerequisites:** Cover Drill AND Anchor Point
- **Prerequisite logic:** AND

**Candidate effect:** Tier 3 seed: turn one defended boundary into a temporary crew anchor that resists collapse while you remain committed to it. Proposed rules effect: While committed to the declared boundary, prevent one route or objective collapse or grant the crew +2 TS against forced withdrawal once per activation.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- declared boundary
- position
- stance upkeep
- crew state

**Coverage tags:**
- defense-protection
- command-tactics
- away-team

### Tactics

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Combat

**Definition:** Read and shape an engagement through suppression, target information, timing, and field direction.

**Typical checks:**
- plan a maneuver
- call a target
- coordinate timing
- create a protected window

**Boundaries:**
- Firearms and Heavy Weapons own attacks
- Rapport owns morale
- Perception discovers the threat picture

**Historical terms:**
- Tactics
- Command
- Suppression
- Target Calling

#### Suppression

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Tactics

**Character fantasy:** A controller who makes enemy movement and exposure costly.

**Focus identity:** Temporary area denial and pressure through valid attacks or systems.

**Boundary:** Heavy Weapons Use owns the weapon. Suppression owns the denial pattern.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- suppress a route
- cover movement
- delay an advance
- force a choice

##### Support Gunner

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).
- **Rules state surfaces:** position or route state, forced movement, Standard Status
- **Result bands:** On Success, apply Suppressed to one declared route or zone until the end of its next activation. Partial applies it through the current activation and adds 1 Exposure; no direct damage is added.
- **Guardrail:** Normal weapon, target, line-of-effect, ammunition or power, and once-per-activation attack limits still apply; this grants no free attack or damage.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Unlock or improve a suppressive action that pressures a valid route or zone without requiring direct damage. Proposed rules effect: On Success, apply Suppressed to one declared route or zone until the end of its next activation. Partial applies it through the current activation and adds 1 Exposure; no direct damage is added.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- valid weapon or system
- declared zone
- ammunition or power
- line of effect

**Coverage tags:**
- command-tactics
- combat-offense
- away-team

##### Denial Pattern

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Setup or Assist check against Effective Defense, Hazard Rating, or the scene's tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Team lane, position or route state, Status, objective state
- **Result bands:** On Success, grant one declared ally +2 TS from the Team lane on the single follow-up that directly uses this Ability's described coordination. Partial grants the bonus and adds 1 Exposure.
- **Guardrail:** The benefit applies to one declared follow-up and does not grant another character a free full action or stack multiple same-lane bonuses.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare overlapping pressure against one route so an ally can act with a clearer movement window. Proposed rules effect: On Success, grant one declared ally +2 TS from the Team lane on the single follow-up that directly uses this Ability's described coordination. Partial grants the bonus and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- declared route
- ally intent
- valid attack source
- timing

**Coverage tags:**
- command-tactics
- defense-protection
- away-team

#### Target Calling

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Tactics

**Character fantasy:** A spotter who turns scattered observations into one shared threat picture.

**Focus identity:** Marks, priority calls, and attack-ready information.

**Boundary:** Perception discovers information. Target Calling makes it tactically actionable for the crew.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- mark a target
- call a route
- identify a threat
- share an opening

##### Call Angle

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Setup or Assist check against Effective Defense, Hazard Rating, or the scene's tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Team lane, position or route state, Status, objective state
- **Result bands:** On Success, grant one declared ally +2 TS from the Team lane on the single follow-up that directly uses this Ability's described coordination. Partial grants the bonus and adds 1 Exposure.
- **Guardrail:** The benefit applies to one declared follow-up and does not grant another character a free full action or stack multiple same-lane bonuses.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Mark a visible target, route, or threat so an ally can act on the shared tactical information. Proposed rules effect: On Success, grant one declared ally +2 TS from the Team lane on the single follow-up that directly uses this Ability's described coordination. Partial grants the bonus and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- visible or sensor-confirmed subject
- communication path
- target state
- timing

**Coverage tags:**
- command-tactics
- combat-offense
- away-team
- ship-support

##### Threat Ledger

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** Maintain one additional confirmed tactical Op Knowledge fact about an active threat; a later target call may reference either maintained fact.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Maintain one additional confirmed tactical fact about an active threat without losing the earlier call. Proposed rules effect: Maintain one additional confirmed tactical Op Knowledge fact about an active threat; a later target call may reference either maintained fact.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- confirmed information
- communication path
- scene state
- attention

**Coverage tags:**
- command-tactics
- perception-cognition-resolve
- away-team
- ship-support

#### Field Direction

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Tactics

**Character fantasy:** A coordinator whose short instruction helps another specialist execute under pressure.

**Focus identity:** Immediate crew direction, repositioning, and tempo recovery.

**Boundary:** Rapport owns morale and trust. Field Direction owns immediate tactical execution.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- direct an ally
- repair a broken plan
- time a crew action
- reposition a specialist

##### Command Line

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Setup or Assist check against Effective Defense, Hazard Rating, or the scene's tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Team lane, position or route state, Status, objective state
- **Result bands:** On Success, grant one declared ally +2 TS from the Team lane on the single follow-up that directly uses this Ability's described coordination. Partial grants the bonus and adds 1 Exposure.
- **Guardrail:** The benefit applies to one declared follow-up and does not grant another character a free full action or stack multiple same-lane bonuses.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Give a concise direction that improves an ally's already valid execution of a declared task. Proposed rules effect: On Success, grant one declared ally +2 TS from the Team lane on the single follow-up that directly uses this Ability's described coordination. Partial grants the bonus and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- willing ally
- communication path
- declared task
- timing

**Coverage tags:**
- command-tactics
- support-recovery
- away-team
- ship-support

##### Split-Second Reposition

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Team lane, position or route state, objective state, Exposure
- **Result bands:** On the unsafe-position trigger, spend the reaction to let one nearby ally cross one short valid route before the consequence resolves. The ally pays normal MP; if the route is hazardous, add 1 Exposure.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** When a nearby ally's position becomes unsafe, signal a short valid reposition before the consequence fully resolves. Proposed rules effect: On the unsafe-position trigger, spend the reaction to let one nearby ally cross one short valid route before the consequence resolves. The ally pays normal MP; if the route is hazardous, add 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- reaction available
- ally movement available
- communication path
- valid route

**Coverage tags:**
- command-tactics
- mobility-exploration
- defense-protection
- away-team

##### Coordinated Tempo

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Setup or Assist check vs Effective Defense, Hazard Rating, or tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Team lane, position or route state, objective state, Exposure
- **Result bands:** On Success, link two declared crew actions in order; the second gains +2 TS from the Team lane only if the first reaches its handoff condition. Partial links them but failure of the first adds 1 Exposure.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** both
- **Prerequisites:** Command Line AND Split-Second Reposition
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: prepare two crew actions as a linked sequence with an explicit handoff and failure boundary. Proposed rules effect: On Success, link two declared crew actions in order; the second gains +2 TS from the Team lane only if the first reaches its handoff condition. Partial links them but failure of the first adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two willing allies
- declared sequence
- communication path
- timing

**Coverage tags:**
- command-tactics
- support-recovery
- away-team
- ship-support

## Dexterity

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal

**Identity:** Control of movement, stealth, and vehicles through timing and physical precision.

**Gameplay promise:** Dexterity should make routes, infiltration, and piloting as decision-rich as direct combat.

**Coverage notes:** Covers personal traversal, concealed access, and piloting. Combat owns attacking; Wisdom owns noticing; Constitution owns enduring hazards.

**Historical lineage:**
- Traverse -> Dexterity
- Mobility, Stealth, Security, Survival, and Vehicles preserved as lineage

### Mobility

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Dexterity

**Definition:** Move through difficult spaces with speed, control, and route awareness.

**Typical checks:**
- cross hazardous terrain
- reach an objective quickly
- control a fall
- maneuver in microgravity

**Boundaries:**
- Field Defense owns protection while holding ground
- Endurance owns prolonged exertion
- Piloting owns vehicle-scale movement

**Historical terms:**
- Mobility
- Survival
- EVA

#### Rapid Transit

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Mobility

**Character fantasy:** A runner who reaches the point that matters before the window closes.

**Focus identity:** Short-burst speed, objective running, and movement efficiency.

**Boundary:** Sustained Exertion owns long-duration effort. Fighting Withdrawal owns defensive retreat.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- dash
- objective run
- crew extraction
- rapid reposition

##### Quick Mover

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** When performing a valid movement action toward a declared objective or position, reduce one qualifying route cost by 1 MP; do not roll the passive separately.
- **Guardrail:** The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve a valid movement action used to reach a declared objective or position. Proposed rules effect: When performing a valid movement action toward a declared objective or position, reduce one qualifying route cost by 1 MP; do not roll the passive separately.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- movement available
- valid route
- declared destination
- scene geometry

**Coverage tags:**
- mobility-exploration
- away-team

##### Momentum Reserve

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** When a movement route is interrupted, spend the reaction to complete one shorter adjacent valid reposition at normal MP cost before the interruption settles.
- **Guardrail:** The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** After a movement route is interrupted, preserve enough momentum to finish a shorter valid reposition. Proposed rules effect: When a movement route is interrupted, spend the reaction to complete one shorter adjacent valid reposition at normal MP cost before the interruption settles.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- interrupted movement
- remaining valid route
- reaction available
- hazard state

**Coverage tags:**
- mobility-exploration
- defense-protection
- away-team

##### Impossible Route

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Mobility or traversal check vs Hazard Rating when the route or interruption is uncertain.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** Attempt one route normally unavailable because of timing or geometry. Success permits the traversal at normal MP; Partial permits it and adds 1 Exposure or one stated Status.
- **Guardrail:** The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.
- **Applicability:** away-team
- **Prerequisites:** Quick Mover AND Momentum Reserve
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: attempt a route normally unavailable because of timing or geometry, provided a plausible physical line exists. Proposed rules effect: Attempt one route normally unavailable because of timing or geometry. Success permits the traversal at normal MP; Partial permits it and adds 1 Exposure or one stated Status.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- plausible route
- scene geometry
- movement available
- hazards

**Coverage tags:**
- mobility-exploration
- away-team

#### Terrain Movement

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Mobility

**Character fantasy:** A climber and pathfinder who treats hostile terrain as a solvable surface.

**Focus identity:** Climbing, difficult terrain, controlled drops, and physical route choice.

**Boundary:** Search and Tracking finds the route. Terrain Movement executes it.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- climb
- cross unstable ground
- descend
- lead a physical route

##### Power Traverse

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** When performing a valid climb or difficult-terrain movement, reduce that route's movement penalty by 1 MP or prevent the first 1 Exposure caused by the terrain; do not roll the passive separately.
- **Guardrail:** The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Reduce the movement penalty or failure exposure of a valid climb or difficult-terrain crossing. Proposed rules effect: When performing a valid climb or difficult-terrain movement, reduce that route's movement penalty by 1 MP or prevent the first 1 Exposure caused by the terrain; do not roll the passive separately.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- terrain feature
- movement route
- body or gear state
- hazard

**Coverage tags:**
- mobility-exploration
- away-team

##### Soft Landing

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Use the stated trigger, stance, or Lattice defense check against the incoming effect.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** On a valid landing option, spend the reaction to step the fall or collision Injury/Status result down one band. This does not cancel an impossible landing or prior damage.
- **Guardrail:** The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Turn a valid fall, drop, or hard descent into a more controlled arrival when a landing option exists. Proposed rules effect: On a valid landing option, spend the reaction to step the fall or collision Injury/Status result down one band. This does not cancel an impossible landing or prior damage.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- fall or descent
- landing surface
- reaction available
- body state

**Coverage tags:**
- mobility-exploration
- defense-protection
- away-team

#### Zero-G Maneuvering

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Mobility

**Character fantasy:** An EVA mover who thinks in vectors instead of floors.

**Focus identity:** Microgravity orientation, tether use, and controlled inertial movement.

**Boundary:** Small Craft owns piloted vehicles. Hazard Adaptation owns environmental survival.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- EVA movement
- tether recovery
- reorientation
- microgravity rescue

##### Vector Tuck

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Use the stated trigger, stance, or Lattice defense check against the incoming effect.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** During microgravity arrival, spend the reaction to add +2 TS against collision or arrival Exposure, or step one qualifying collision result down one band.
- **Guardrail:** The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Adjust body orientation during microgravity movement to reduce collision or exposure at arrival. Proposed rules effect: During microgravity arrival, spend the reaction to add +2 TS against collision or arrival Exposure, or step one qualifying collision result down one band.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- microgravity
- reaction available
- trajectory
- body or suit state

**Coverage tags:**
- mobility-exploration
- defense-protection
- away-team
- ship-support

##### Tether Logic

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** Choose one use when attaching the tether: redirect the user's movement to the anchor, secure one adjacent ally against one forced-movement result, or establish one recoverable route until detached.
- **Guardrail:** The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Use a valid tether or anchor point to redirect movement, secure an ally, or create a recoverable route. Proposed rules effect: Choose one use when attaching the tether: redirect the user's movement to the anchor, secure one adjacent ally against one forced-movement result, or establish one recoverable route until detached.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- tether or anchor
- range
- attachment point
- trajectory

**Coverage tags:**
- mobility-exploration
- support-recovery
- away-team
- ship-support

### Infiltration

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** broad
- **Parent Attribute:** Dexterity

**Definition:** Enter, cross, or leave controlled spaces without creating the expected evidence or alarm.

**Typical checks:**
- move quietly
- bypass a physical lock
- avoid surveillance
- erase a trail

**Boundaries:**
- Computing owns software intrusion
- Perception owns detecting surveillance
- Deception owns social cover stories

**Historical terms:**
- Stealth
- Security
- Infiltration

#### Concealment

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Infiltration

**Character fantasy:** An infiltrator who controls noise, silhouette, heat, and timing.

**Focus identity:** Physical stealth and concealed positioning.

**Boundary:** Counter-Surveillance owns sensors and evidence. Deception owns being seen under a false premise.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- quiet movement
- hide
- ambush position
- avoid visual detection

##### Quiet Approach

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice Stealth check vs the observer, sensor threshold, or Hazard Rating when detection is uncertain.
- **Rules state surfaces:** Exposure, Trace, observer or sensor state, scene-access permission
- **Result bands:** While speed and equipment remain within the controlled profile, reduce Exposure by 1 on one valid stealth movement or add +2 TS against the observing surface.
- **Guardrail:** The effect changes only the named evidence, Exposure, observation, or access state and cannot erase an entire scene or defeat unrelated sensors.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve stealth movement or positioning when speed and equipment state stay within a controlled profile. Proposed rules effect: While speed and equipment remain within the controlled profile, reduce Exposure by 1 on one valid stealth movement or add +2 TS against the observing surface.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- movement speed
- noise state
- visibility
- equipment profile

**Coverage tags:**
- mobility-exploration
- away-team
- noncombat

##### Thermal Patience

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Exposure, Trace, observer or sensor state, scene-access permission
- **Result bands:** While stationary and nonaggressive, gain +2 TS against heat- or motion-based detection and prevent the first 1 Exposure from that sensor family; the stance ends on movement or aggression.
- **Guardrail:** The effect changes only the named evidence, Exposure, observation, or access state and cannot erase an entire scene or defeat unrelated sensors.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Hold a low-signature posture that reduces detection from heat or motion until you move or act aggressively. Proposed rules effect: While stationary and nonaggressive, gain +2 TS against heat- or motion-based detection and prevent the first 1 Exposure from that sensor family; the stance ends on movement or aggression.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- concealment opportunity
- sensor type
- stance upkeep
- body or suit heat

**Coverage tags:**
- mobility-exploration
- away-team
- noncombat

#### Breachcraft

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Infiltration

**Character fantasy:** A quiet entry specialist who opens the boundary instead of destroying it.

**Focus identity:** Physical locks, access barriers, and controlled entry.

**Boundary:** Engineering owns structural repair. Computing owns networked credentials and software access.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- pick or decode a lock
- open a sealed panel
- bypass an alarmed door
- prepare an entry

##### Silent Entry

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Stealth check vs the observer, sensor threshold, or Hazard Rating when detection is uncertain.
- **Rules state surfaces:** Exposure, Trace, observer or sensor state, scene-access permission
- **Result bands:** On Success, gain one bounded physical-barrier access permission and reduce resulting evidence or Exposure by 1. Partial opens the barrier but leaves evidence and adds 1 Exposure.
- **Guardrail:** The effect changes only the named evidence, Exposure, observation, or access state and cannot erase an entire scene or defeat unrelated sensors.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Open or bypass a valid physical barrier while minimizing noise, visible damage, or obvious alarm evidence. Proposed rules effect: On Success, gain one bounded physical-barrier access permission and reduce resulting evidence or Exposure by 1. Partial opens the barrier but leaves evidence and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- physical barrier
- tool access
- time
- alarm state

**Coverage tags:**
- mobility-exploration
- away-team
- noncombat

##### Lock Bypass

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** Lattice Stealth check vs the observer, sensor threshold, or Hazard Rating when detection is uncertain.
- **Rules state surfaces:** Exposure, Trace, observer or sensor state, scene-access permission
- **Result bands:** On Success, use the valid security tool to gain one bounded physical access permission. Partial opens the lock but leaves evidence or consumes the tool and adds 1 Exposure.
- **Guardrail:** The effect changes only the named evidence, Exposure, observation, or access state and cannot erase an entire scene or defeat unrelated sensors.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Use a valid security tool to gain temporary access without rewriting the lock or taking system control. Proposed rules effect: On Success, use the valid security tool to gain one bounded physical access permission. Partial opens the lock but leaves evidence or consumes the tool and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- security tool
- lock type
- access point
- time

**Coverage tags:**
- mobility-exploration
- computing-intrusion
- away-team
- noncombat

#### Counter-Surveillance

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Infiltration

**Character fantasy:** A ghost who knows what the observer expects to see and leaves something else.

**Focus identity:** Sensor avoidance, evidence control, and route hygiene.

**Boundary:** Electronic Warfare disrupts systems. Counter-Surveillance avoids or misdirects them without direct control.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- cross a camera field
- avoid a patrol pattern
- scrub a trail
- spot a blind interval

##### Dead Angle

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Mobility, Stealth, or traversal check vs Hazard Rating when a route, terrain, or exposure risk is meaningful.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** On Success, reduce Exposure by 1 while completing the Ability's described movement/concealment. Partial completes it without reducing Exposure and adds 1 Exposure.
- **Guardrail:** Never converts an unsafe route into free movement or bypasses a required body, gear, tether, access, or environmental condition.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Identify and prepare a short route through a surveillance gap that remains valid until the observation pattern changes. Proposed rules effect: On Success, reduce Exposure by 1 while completing the Ability's described movement/concealment. Partial completes it without reducing Exposure and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- observed surveillance pattern
- route
- timing
- sensor coverage

**Coverage tags:**
- mobility-exploration
- perception-cognition-resolve
- away-team
- noncombat

##### Trail Scrub

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Mobility, Stealth, or traversal check vs Hazard Rating when a route, terrain, or exposure risk is meaningful.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure
- **Result bands:** On Success, reduce Exposure by 1 while completing the Ability's described movement/concealment. Partial completes it without reducing Exposure and adds 1 Exposure.
- **Guardrail:** Never converts an unsafe route into free movement or bypasses a required body, gear, tether, access, or environmental condition.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Remove or confuse one recent physical or routine sensor trace without erasing the entire scene. Proposed rules effect: On Success, reduce Exposure by 1 while completing the Ability's described movement/concealment. Partial completes it without reducing Exposure and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- recent trace
- tool or plausible method
- time
- observer capability

**Coverage tags:**
- mobility-exploration
- away-team
- noncombat

##### Between Sensors

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Stealth check vs the observer, sensor threshold, or Hazard Rating when detection is uncertain.
- **Rules state surfaces:** Exposure, Trace, observer or sensor state, scene-access permission
- **Result bands:** On Success, cross the named handoff gap between two observation systems and reduce Exposure by 1. Partial crosses without the reduction and adds 1 Exposure.
- **Guardrail:** The effect changes only the named evidence, Exposure, observation, or access state and cannot erase an entire scene or defeat unrelated sensors.
- **Applicability:** away-team
- **Prerequisites:** Dead Angle AND Trail Scrub
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: move across two different observation systems by exploiting the handoff gap between them. Proposed rules effect: On Success, cross the named handoff gap between two observation systems and reduce Exposure by 1. Partial crosses without the reduction and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two observation systems
- handoff interval
- route
- timing

**Coverage tags:**
- mobility-exploration
- computing-intrusion
- away-team
- noncombat

### Piloting

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Dexterity

**Definition:** Control vehicles, small craft, and remote platforms through changing routes and system states.

**Typical checks:**
- thread a hazardous route
- dock under pressure
- control a remote platform
- recover from loss of traction

**Boundaries:**
- Engineering repairs the vehicle
- Computing owns software control
- Mobility owns personal movement

**Historical terms:**
- Vehicles
- Drive Systems
- Drone Control

#### Surface Vehicles

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Piloting

**Character fantasy:** A driver who finds a stable line through unstable ground.

**Focus identity:** Ground and surface vehicle control, traction, and hazard routing.

**Boundary:** Terrain Movement owns the same problem at personal scale.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- drive
- recover a skid
- cross rough ground
- vehicle extraction

##### Drift Correction

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Lattice Piloting check vs Hazard Rating, opposing control, or the maneuver's stated threshold.
- **Rules state surfaces:** vehicle route state, System Status, System Integrity, Exposure
- **Result bands:** On the developing skid or traction-loss trigger, spend the reaction to step the vehicle Hazard result down one band or prevent one Skid/Loss-of-Control System Status.
- **Guardrail:** The craft or vehicle must have a valid route, control link, propulsion, crew state, and capacity; this grants no extra movement action.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Recover a valid surface vehicle from a developing skid, slide, or traction loss before the route fully collapses. Proposed rules effect: On the developing skid or traction-loss trigger, spend the reaction to step the vehicle Hazard result down one band or prevent one Skid/Loss-of-Control System Status.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- surface vehicle
- control access
- reaction available
- traction state

**Coverage tags:**
- mobility-exploration
- away-team

##### Hazard Line

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Piloting check vs Hazard Rating, opposing control, or the maneuver's stated threshold.
- **Rules state surfaces:** vehicle route state, System Status, System Integrity, Exposure
- **Result bands:** Before traversal, choose one trade: reduce route cost by 1 MP and accept 1 Exposure or System strain, or keep normal speed and gain +2 TS against the declared hazard. Partial adds the unchosen cost.
- **Guardrail:** The craft or vehicle must have a valid route, control link, propulsion, crew state, and capacity; this grants no extra movement action.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Choose a deliberate vehicle line through visible terrain hazards, trading speed, exposure, or system strain explicitly. Proposed rules effect: Before traversal, choose one trade: reduce route cost by 1 MP and accept 1 Exposure or System strain, or keep normal speed and gain +2 TS against the declared hazard. Partial adds the unchosen cost.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- surface vehicle
- visible route
- hazards
- vehicle state

**Coverage tags:**
- mobility-exploration
- away-team
- noncombat

#### Small Craft

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Piloting

**Character fantasy:** A pilot who treats burns, docking, and relative motion as one continuous problem.

**Focus identity:** Shuttles, cutters, landing craft, and close-range spaceflight.

**Boundary:** Ship systems remain crew-scale operations. Zero-G Maneuvering owns unpiloted personal EVA.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- dock
- land
- pursue
- evade
- match vectors

##### Burn Window

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Piloting check vs Hazard Rating, opposing control, or the maneuver's stated threshold.
- **Rules state surfaces:** vehicle route state, System Status, System Integrity, Exposure
- **Result bands:** On Success, gain +2 TS on the declared craft acceleration or vector-change maneuver. Partial completes it and adds one System strain Status or 1 Exposure.
- **Guardrail:** The craft or vehicle must have a valid route, control link, propulsion, crew state, and capacity; this grants no extra movement action.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a short acceleration or vector-change window so the craft can commit with a known risk boundary. Proposed rules effect: On Success, gain +2 TS on the declared craft acceleration or vector-change maneuver. Partial completes it and adds one System strain Status or 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- small craft
- propulsion state
- trajectory
- crew readiness

**Coverage tags:**
- mobility-exploration
- ship-support
- noncombat

##### Docking Nerve

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice Piloting check vs Hazard Rating, opposing control, or the maneuver's stated threshold.
- **Rules state surfaces:** vehicle route state, System Status, System Integrity, Exposure
- **Result bands:** Add +2 TS from the Character lane to one constrained docking or landing check when space, time, or platform stability creates pressure.
- **Guardrail:** The craft or vehicle must have a valid route, control link, propulsion, crew state, and capacity; this grants no extra movement action.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve close docking or landing control when space, time, or platform stability is constrained. Proposed rules effect: Add +2 TS from the Character lane to one constrained docking or landing check when space, time, or platform stability creates pressure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- small craft
- docking or landing target
- relative motion
- control access

**Coverage tags:**
- mobility-exploration
- ship-support
- noncombat

##### Crew-Coupled Maneuver

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Setup or Assist check vs Effective Defense, Hazard Rating, or tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Team lane, position or route state, objective state, Exposure
- **Result bands:** On Success, the supporting station grants +2 TS from the Team lane to the declared piloting maneuver. Partial grants the bonus and adds 1 Exposure or one supporting-system cost.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** ship-support
- **Prerequisites:** Burn Window AND Docking Nerve
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: link pilot intent with one supporting crew station so both contribute to a single declared maneuver. Proposed rules effect: On Success, the supporting station grants +2 TS from the Team lane to the declared piloting maneuver. Partial grants the bonus and adds 1 Exposure or one supporting-system cost.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- small craft
- supporting crew station
- communication path
- declared maneuver

**Coverage tags:**
- mobility-exploration
- command-tactics
- ship-support

#### Remote Platforms

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Piloting

**Character fantasy:** An operator who acts through machines without confusing remote reach with personal presence.

**Focus identity:** Drones, remote manipulators, and split attention.

**Boundary:** Computing owns intrusion into unowned systems. Engineering owns platform repair and modification.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- pilot a drone
- operate a remote arm
- scout a route
- perform distant tool work

##### Proxy Hands

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** Use the linked remote platform to perform one valid tool or interaction action at its location, paying the platform's normal action, range, link, and tool costs.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Use a linked remote platform to perform a valid tool or interaction task at the platform's location. Proposed rules effect: Use the linked remote platform to perform one valid tool or interaction action at its location, paying the platform's normal action, range, link, and tool costs.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- owned or authorized platform
- link quality
- tool fit
- remote scene state

**Coverage tags:**
- mobility-exploration
- engineering-fabrication
- ship-support
- noncombat

##### Multi-Feed Control

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** Maintain two compatible remote information feeds while retaining basic control of the active platform; once per activation, prevent one Overload or Disrupted Status caused only by the second feed.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Maintain two compatible remote information feeds without losing basic control of the active platform. Proposed rules effect: Maintain two compatible remote information feeds while retaining basic control of the active platform; once per activation, prevent one Overload or Disrupted Status caused only by the second feed.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two compatible feeds
- link quality
- attention
- platform state

**Coverage tags:**
- perception-cognition-resolve
- ship-support
- noncombat

##### No Safe Angle

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 3
- **Maximum Rank:** 1
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Piloting check vs Hazard Rating, opposing control, or the maneuver's stated threshold.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, reposition the linked platform and create one actionable Op Knowledge fact from the combined viewpoint. Partial repositions or creates the fact, not both, and adds 1 Exposure.
- **Guardrail:** The craft or vehicle must have a valid route, control link, propulsion, crew state, and capacity; this grants no extra movement action.
- **Applicability:** both
- **Prerequisites:** Proxy Hands AND Multi-Feed Control
- **Prerequisite logic:** AND

**Candidate effect:** Tier 3 seed: reposition a linked platform and your own viewpoint as one coordinated observation problem. Proposed rules effect: On Success, reposition the linked platform and create one actionable Op Knowledge fact from the combined viewpoint. Partial repositions or creates the fact, not both, and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- linked platform
- communication path
- two valid routes
- scene geometry

**Coverage tags:**
- mobility-exploration
- perception-cognition-resolve
- away-team
- ship-support

## Intelligence

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal

**Identity:** Deliberate understanding and transformation of software, machines, and manufactured systems.

**Gameplay promise:** Intelligence should let technical characters solve urgent problems, create new options, and support ship play without becoming a universal answer stat.

**Coverage notes:** Covers computation, repair, power systems, and making. Wisdom owns interpretation under uncertainty; Dexterity owns operating vehicles.

**Historical lineage:**
- Systems -> Intelligence
- Computing, Engineering, Electronics, and Fabrication preserved as lineage

### Computing

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Intelligence

**Definition:** Read, defend, disrupt, and alter software-controlled systems through authorized or hostile interfaces.

**Typical checks:**
- intrude into a system
- trace a process
- defend a network
- disrupt a hostile signal

**Boundaries:**
- Infiltration owns physical access
- Engineering owns hardware repair
- Networks owns social credentials and contacts

**Historical terms:**
- Computing
- Cyberwarfare
- Electronics

#### Intrusion

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Computing

**Character fantasy:** A system intruder who turns one legitimate foothold into controlled access.

**Focus identity:** Offensive hacking, access escalation, and bounded system control.

**Boundary:** Electronic Warfare disrupts operation without control. Faction Access obtains legitimate pathways.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- gain access
- read protected data
- alter a process
- open a digital route

##### Clean Intrusion

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice system action vs Firewall: TS = 50 + Actor Bonus - (Firewall - 15).
- **Rules state surfaces:** Firewall, access state, System Status, Trace
- **Result bands:** Roll vs the target Firewall. Success grants the one bounded access permission declared before the roll. Partial grants it and adds 1 Trace. Direct grants it and reduces the action's Trace by 1.
- **Guardrail:** A valid hack surface, link, and target tag are required. This Ability cannot bypass equipment ownership, power, range, or a stated access gate.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Perform a basic offensive hack while minimizing trace, noise, or collateral process disruption. Proposed rules effect: Roll vs the target Firewall. Success grants the one bounded access permission declared before the roll. Partial grants it and adds 1 Trace. Direct grants it and reduces the action's Trace by 1.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- interface or link
- target system
- access state
- trace pressure

**Coverage tags:**
- computing-intrusion
- away-team
- ship-support
- noncombat

##### Privilege Step

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice system action vs Firewall: TS = 50 + Actor Bonus - (Firewall - 15).
- **Rules state surfaces:** Firewall, System Integrity, System Status, Trace
- **Result bands:** On Success, gain the single bounded access permission described by this Ability. On Direct, also reduce the action's Trace by 1; on Partial, gain the permission and add 1 Trace.
- **Guardrail:** A valid hack surface, link, and target tag are required. This Ability cannot bypass equipment ownership, power, range, or a stated access gate.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Use an established foothold to request one narrowly higher permission without taking full system ownership. Proposed rules effect: On Success, gain the single bounded access permission described by this Ability. On Direct, also reduce the action's Trace by 1; on Partial, gain the permission and add 1 Trace.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- existing foothold
- target permission
- system state
- trace pressure

**Coverage tags:**
- computing-intrusion
- away-team
- ship-support
- noncombat

##### Cascading Access

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice system action vs Firewall: TS = 50 + Actor Bonus - (Firewall - 15).
- **Rules state surfaces:** Firewall, System Integrity, System Status, Trace
- **Result bands:** On Success, gain the single bounded access permission described by this Ability. On Direct, also reduce the action's Trace by 1; on Partial, gain the permission and add 1 Trace.
- **Guardrail:** A valid hack surface, link, and target tag are required. This Ability cannot bypass equipment ownership, power, range, or a stated access gate.
- **Applicability:** ship-support
- **Prerequisites:** Clean Intrusion AND Privilege Step
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: carry one verified access path into a directly dependent subsystem while preserving a clear trace boundary. Proposed rules effect: On Success, gain the single bounded access permission described by this Ability. On Direct, also reduce the action's Trace by 1; on Partial, gain the permission and add 1 Trace.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- verified access
- dependent subsystem
- trace pressure
- link state

**Coverage tags:**
- computing-intrusion
- ship-support
- noncombat

#### Firewall

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Computing

**Character fantasy:** A defender who contains hostile code before it becomes trusted state.

**Focus identity:** System resistance, quarantine, and recovery from hostile access.

**Boundary:** Engineering repairs physical damage. Resolve resists cognitive or identity pressure.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- resist a hack
- isolate a process
- verify integrity
- restore trusted operation

##### Shielded Kernel

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice resistance against a hostile system action using the protected surface's Firewall.
- **Rules state surfaces:** Firewall, System Integrity, System Status, Trace
- **Result bands:** Once per qualifying hostile effect, add +2 TS from the Character lane to the resistance. A successful resistance prevents the stated System Status; it does not repair prior System Integrity damage.
- **Guardrail:** A valid hack surface, link, and target tag are required. This Ability cannot bypass equipment ownership, power, range, or a stated access gate.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve resistance to a hostile hack or system effect that targets a protected local process. Proposed rules effect: Once per qualifying hostile effect, add +2 TS from the Character lane to the resistance. A successful resistance prevents the stated System Status; it does not repair prior System Integrity damage.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- protected system
- hostile digital effect
- firewall state
- power

**Coverage tags:**
- computing-intrusion
- defense-protection
- away-team
- ship-support

##### Quarantine Thread

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Lattice system-defense check against the hostile effect's Firewall-derived or stated TS.
- **Rules state surfaces:** Firewall, System Integrity, System Status, Trace, access permission
- **Result bands:** On the suspicious-process trigger, spend the reaction to isolate it from one trusted subsystem and apply Quarantined System Status until the end of the next activation. A failed defense leaves the channel open; Partial contains it and adds 1 Trace.
- **Guardrail:** A valid hack surface, link, target tag, access route, and ownership boundary are required; the effect never grants unstated system ownership.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Isolate one suspicious process or data channel before it can propagate into another trusted subsystem. Proposed rules effect: On the suspicious-process trigger, spend the reaction to isolate it from one trusted subsystem and apply Quarantined System Status until the end of the next activation. A failed defense leaves the channel open; Partial contains it and adds 1 Trace.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- reaction available
- suspicious process
- system boundary
- timing

**Coverage tags:**
- computing-intrusion
- defense-protection
- ship-support

#### Electronic Warfare

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Computing

**Character fantasy:** A signal operator who degrades an enemy's picture without pretending disruption is control.

**Focus identity:** Jamming, signal deception, and temporary systems interference.

**Boundary:** Intrusion takes system permissions. Electronic Warfare produces temporary interference only.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- jam a link
- degrade sensors
- delay a command
- mask a transmission

##### Signal Drag

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice system action vs Firewall: TS = 50 + Actor Bonus - (Firewall - 15).
- **Rules state surfaces:** Firewall, signal link state, System Status, targeting or sensor state
- **Result bands:** Roll vs Firewall. Success applies the Jammed System Status to the named link until the end of its next activation. Partial applies it until the end of the current activation and adds 1 Trace. Direct applies it for two activations.
- **Guardrail:** Jamming degrades, delays, or scrambles a tagged link. It never grants shutdown, data theft, permanent disable, or ownership.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Temporarily degrade, delay, or scramble a valid system link without shutting down or taking ownership of it. Proposed rules effect: Roll vs Firewall. Success applies the Jammed System Status to the named link until the end of its next activation. Partial applies it until the end of the current activation and adds 1 Trace. Direct applies it for two activations.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- signal path
- target system
- transmission power
- range

**Coverage tags:**
- computing-intrusion
- command-tactics
- away-team
- ship-support

##### Ghost Channel

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice system action vs Firewall: TS = 50 + Actor Bonus - (Firewall - 15).
- **Rules state surfaces:** Firewall, System Integrity, System Status, Trace
- **Result bands:** On Success, gain the single bounded access permission described by this Ability. On Direct, also reduce the action's Trace by 1; on Partial, gain the permission and add 1 Trace.
- **Guardrail:** A valid hack surface, link, and target tag are required. This Ability cannot bypass equipment ownership, power, range, or a stated access gate.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a low-confidence communications path that can carry one short exchange before it becomes easy to isolate. Proposed rules effect: On Success, gain the single bounded access permission described by this Ability. On Direct, also reduce the action's Trace by 1; on Partial, gain the permission and add 1 Trace.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- communications equipment
- spectrum access
- range
- listener state

**Coverage tags:**
- computing-intrusion
- mobility-exploration
- ship-support
- noncombat

##### Systems Sovereignty

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 3
- **Maximum Rank:** 1
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice system-defense check against the hostile effect's Firewall-derived or stated TS.
- **Rules state surfaces:** Firewall, System Integrity, System Status, Trace, access permission
- **Result bands:** While the stance protects one owned system cluster, add +2 TS to resist intrusion, jamming, or conflicting control; once per activation, Success rejects one such effect and Partial rejects it with 1 Trace.
- **Guardrail:** A valid hack surface, link, target tag, access route, and ownership boundary are required; the effect never grants unstated system ownership.
- **Applicability:** ship-support
- **Prerequisites:** Signal Drag AND Ghost Channel
- **Prerequisite logic:** AND

**Candidate effect:** Tier 3 seed: establish temporary crew authority over one owned system cluster against intrusion, jamming, and conflicting control. Proposed rules effect: While the stance protects one owned system cluster, add +2 TS to resist intrusion, jamming, or conflicting control; once per activation, Success rejects one such effect and Partial rejects it with 1 Trace.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- owned system cluster
- control access
- power
- crew authority

**Coverage tags:**
- computing-intrusion
- defense-protection
- command-tactics
- ship-support

### Engineering

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Intelligence

**Definition:** Diagnose and restore physical systems while respecting load, structure, and safety boundaries.

**Typical checks:**
- repair a damaged system
- reroute power
- diagnose a failure
- stabilize a structure

**Boundaries:**
- Fabrication creates or adapts parts
- Computing owns software state
- Cybernetic Care owns body-machine interfaces

**Historical terms:**
- Engineering
- Electronics
- Field Repair

#### Field Repair

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Engineering

**Character fantasy:** A crisis mechanic who gets one critical function back before ideal parts arrive.

**Focus identity:** Fast repair, component exchange, and temporary restoration.

**Boundary:** Precision Manufacture creates exact parts. Field Repair restores immediate function.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- restore a device
- patch a vehicle
- repair under pressure
- replace a failed component

##### Field Restore

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** On Success, restore one declared damaged technical function until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Restore one valid damaged function temporarily using available tools and compatible materials. Proposed rules effect: On Success, restore one declared damaged technical function until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- damaged system
- tool access
- compatible material
- time

**Coverage tags:**
- engineering-fabrication
- support-recovery
- away-team
- ship-support

##### Hot Swap

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the target system's Firewall when hostile control is involved.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost
- **Result bands:** On Success, restore the one limited technical function named by this Ability until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.
- **Guardrail:** The correct tool, access, parts, power state, and equipment tags still apply. This cannot create permanent gear statistics or bypass a hostile Firewall without a valid system action.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Exchange a compatible component while the larger system remains in a constrained operating state. Proposed rules effect: On Success, restore the one limited technical function named by this Ability until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- compatible component
- system access
- load state
- safety window

**Coverage tags:**
- engineering-fabrication
- support-recovery
- ship-support

##### Restore Under Load

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the target system's Firewall when hostile control is involved.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost
- **Result bands:** On Success, restore the one limited technical function named by this Ability until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.
- **Guardrail:** The correct tool, access, parts, power state, and equipment tags still apply. This cannot create permanent gear statistics or bypass a hostile Firewall without a valid system action.
- **Applicability:** ship-support
- **Prerequisites:** Field Restore AND Hot Swap
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: repair a critical subsystem while it remains active, accepting one declared risk instead of shutting it down. Proposed rules effect: On Success, restore the one limited technical function named by this Ability until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- active subsystem
- declared risk
- tools
- crew coordination

**Coverage tags:**
- engineering-fabrication
- support-recovery
- ship-support

#### Power and Systems

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Engineering

**Character fantasy:** An operator who keeps the whole machine coherent when demand exceeds comfort.

**Focus identity:** Power routing, load management, and emergency bypass.

**Boundary:** Command sets priorities. Power and Systems executes the physical routing safely.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- reroute power
- shed load
- bring a reserve online
- isolate a failing subsystem

##### Load Balance

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** On Success, move one declared unit of available power or load from a donor subsystem to a recipient subsystem until the next reconfiguration. Partial succeeds and adds one System strain Status.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Redistribute available power or system load among valid subsystems without creating additional capacity. Proposed rules effect: On Success, move one declared unit of available power or load from a donor subsystem to a recipient subsystem until the next reconfiguration. Partial succeeds and adds one System strain Status.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- system controls
- available capacity
- subsystem states
- priority order

**Coverage tags:**
- engineering-fabrication
- ship-support
- noncombat

##### Emergency Bypass

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the target system's Firewall when hostile control is involved.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost
- **Result bands:** On Success, restore the one limited technical function named by this Ability until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.
- **Guardrail:** The correct tool, access, parts, power state, and equipment tags still apply. This cannot create permanent gear statistics or bypass a hostile Firewall without a valid system action.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Create a temporary alternate connection around one failed component when the surrounding system can tolerate it. Proposed rules effect: On Success, restore the one limited technical function named by this Ability until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- failed component
- alternate path
- tools
- load tolerance

**Coverage tags:**
- engineering-fabrication
- support-recovery
- away-team
- ship-support

#### Structural Diagnostics

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Engineering

**Character fantasy:** A systems reader who finds the failure chain before the obvious symptom becomes catastrophe.

**Focus identity:** Failure mapping, stress analysis, and damage interpretation.

**Boundary:** Perception notices the symptom. Structural Diagnostics explains the physical system behind it.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- locate a fault
- predict a break
- read structural stress
- prioritize repairs

##### Failure Map

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the target system's Firewall when hostile control is involved.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost
- **Result bands:** On Success, create one actionable Op Knowledge fact about the Ability's named technical subject. Partial creates the fact with one uncertain fault and adds 1 Exposure.
- **Guardrail:** The correct tool, access, parts, power state, and equipment tags still apply. This cannot create permanent gear statistics or bypass a hostile Firewall without a valid system action.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Build a local map of connected failures so the crew can identify which repair would restore the most function. Proposed rules effect: On Success, create one actionable Op Knowledge fact about the Ability's named technical subject. Partial creates the fact with one uncertain fault and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- diagnostic access
- system data
- time
- physical access

**Coverage tags:**
- engineering-fabrication
- perception-cognition-resolve
- ship-support
- noncombat

##### Stress Echo

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, create one actionable Op Knowledge fact locating a hidden load or structural weakness. Partial creates the fact with one uncertain connection and adds 1 Exposure.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Infer a hidden load or structural weakness from repeated vibration, heat, deformation, or performance drift. Proposed rules effect: On Success, create one actionable Op Knowledge fact locating a hidden load or structural weakness. Partial creates the fact with one uncertain connection and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- observable symptoms
- relevant system knowledge
- time
- scene state

**Coverage tags:**
- engineering-fabrication
- perception-cognition-resolve
- away-team
- ship-support
- noncombat

### Fabrication

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Intelligence

**Definition:** Create, adapt, and integrate physical solutions from plans, tools, and available material.

**Typical checks:**
- assemble a field tool
- adapt salvage
- manufacture a precise part
- prepare a modular kit

**Boundaries:**
- Engineering restores existing systems
- Exchange acquires materials
- Equipment owns final item profiles

**Historical terms:**
- Fabrication
- Salvage
- Field Refit

#### Field Assembly

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Fabrication

**Character fantasy:** A maker who converts a clear need into a temporary working object.

**Focus identity:** Rapid jigs, modular builds, and purpose-limited field tools.

**Boundary:** Field Repair fixes something that exists. Field Assembly creates a limited new object.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- assemble a tool
- build a brace
- prepare a kit
- make a temporary fixture

##### Rapid Jig

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.
- **Rules state surfaces:** Team lane, position or route state, objective state, Exposure
- **Result bands:** On Success, the temporary fixture grants +2 TS from the Team lane to the one declared repair, extraction, or handling task while it remains installed. Partial grants the bonus and adds one exposed fault.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Assemble a temporary fixture that makes one declared repair, extraction, or handling task safer or repeatable. Proposed rules effect: On Success, the temporary fixture grants +2 TS from the Team lane to the one declared repair, extraction, or handling task while it remains installed. Partial grants the bonus and adds one exposed fault.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- materials
- tools
- declared task
- time

**Coverage tags:**
- engineering-fabrication
- support-recovery
- away-team
- ship-support
- noncombat

##### Modular Build

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** On Success, create one temporary purpose-limited device with one declared function until the end of the scene. Partial creates it with one exposed fault or extra Material cost.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Combine compatible standard modules into a purpose-limited device with one clear function. Proposed rules effect: On Success, create one temporary purpose-limited device with one declared function until the end of the scene. Partial creates it with one exposed fault or extra Material cost.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- compatible modules
- tools
- declared function
- time

**Coverage tags:**
- engineering-fabrication
- away-team
- ship-support
- noncombat

#### Salvage Integration

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Fabrication

**Character fantasy:** A scavenger-engineer who sees compatibility hiding inside wreckage.

**Focus identity:** Reuse, adaptation, and foreign-component integration.

**Boundary:** Faction Access interprets ownership and provenance. Salvage Integration handles physical compatibility.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- recover a component
- adapt foreign hardware
- bridge incompatible fittings
- extend scarce supplies

##### Useful Ruin

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** On Success, recover one compatible component or reduce one later declared Material requirement by one step. Partial recovers it with one exposed fault.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Recover one functional component or material property from a damaged object without treating the whole object as intact. Proposed rules effect: On Success, recover one compatible component or reduce one later declared Material requirement by one step. Partial recovers it with one exposed fault.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- damaged object
- time
- tools
- recoverable component

**Coverage tags:**
- engineering-fabrication
- away-team
- noncombat

##### Foreign Interface

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** On Success, grant one reversible compatibility permission between the two named systems for the scene. Partial grants it for the current activation and adds one exposed fault.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Create a reversible adapter between two physically incompatible systems without claiming full long-term reliability. Proposed rules effect: On Success, grant one reversible compatibility permission between the two named systems for the scene. Partial grants it for the current activation and adds one exposed fault.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two systems
- adapter materials
- power and signal bounds
- tools

**Coverage tags:**
- engineering-fabrication
- computing-intrusion
- away-team
- ship-support
- noncombat

#### Precision Manufacture

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Fabrication

**Character fantasy:** A fabricator who turns measured tolerances into trustworthy parts.

**Focus identity:** Exact components, controlled process, and repeatable production.

**Boundary:** Field Assembly favors speed and temporary utility. Precision Manufacture favors fit and repeatability.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- manufacture a replacement
- calibrate a part
- produce a small run
- verify material tolerances

##### Clean Tolerance

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** When the verified plan, measurement, material, and process all validate, prevent one exposed fault in the manufactured replacement or add +2 TS to its first validation check.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve the reliability of a manufactured replacement when measurements, material, and process stay within a verified plan. Proposed rules effect: When the verified plan, measurement, material, and process all validate, prevent one exposed fault in the manufactured replacement or add +2 TS to its first validation check.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- verified plan
- material
- fabrication equipment
- measurement data

**Coverage tags:**
- engineering-fabrication
- ship-support
- noncombat

##### Microforge Plan

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, create one fabrication-ready Op Knowledge plan; one qualified station executing it gains +2 TS from the Team lane. Partial creates the plan with one uncertain tolerance or extra Material cost.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Translate a validated component need into a fabrication-ready plan that another qualified station can execute. Proposed rules effect: On Success, create one fabrication-ready Op Knowledge plan; one qualified station executing it gains +2 TS from the Team lane. Partial creates the plan with one uncertain tolerance or extra Material cost.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- component specification
- fabricator capability
- material profile
- design time

**Coverage tags:**
- engineering-fabrication
- ship-support
- noncombat

##### Adaptive Toolchain

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** On Success, waive one declared material or process compatibility gate for the single workflow. Partial permits the substitution and adds one exposed fault, quality loss, or time step.
- **Guardrail:** Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.
- **Applicability:** ship-support
- **Prerequisites:** Clean Tolerance AND Microforge Plan
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: reconfigure one fabrication workflow to accept a constrained substitute material or machine process. Proposed rules effect: On Success, waive one declared material or process compatibility gate for the single workflow. Partial permits the substitution and adds one exposed fault, quality loss, or time step.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- fabrication workflow
- substitute material
- machine capability
- declared tradeoff

**Coverage tags:**
- engineering-fabrication
- ship-support
- noncombat

## Constitution

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal

**Identity:** Sustained viability of bodies, patients, and body-machine systems under hostile conditions.

**Gameplay promise:** Constitution should make endurance and care active play paths, while keeping body modification powerful, legible, and costly enough to create choices.

**Coverage notes:** Covers endurance, medicine, biotechnology, and cybernetic care. Combat owns preventing harm; Wisdom owns psychological continuity.

**Historical lineage:**
- Vital -> Constitution
- Medicine, Biotechnology, Cybernetics, and Adaptation preserved as lineage

### Endurance

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** newly-proposed
- **Parent Attribute:** Constitution

**Definition:** Remain functional through environmental, physical, and workload pressure without treating resilience as immunity.

**Typical checks:**
- endure a hazard
- resist physical shock
- pace sustained work

**Boundaries:**
- Field Defense prevents harm
- Medicine treats injury
- Resolve manages identity and fear pressure

**Historical terms:**
- Adaptation
- Survival
- Vital

#### Hazard Adaptation

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Endurance

**Character fantasy:** A field survivor who learns the environment's rhythm before it breaks the body.

**Focus identity:** Environmental acclimation, suit discipline, and exposure management.

**Boundary:** Engineering maintains life-support systems. Hazard Adaptation manages the body's use of them.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- endure heat or cold
- work in contamination
- manage suit limits
- adapt to gravity

##### Environmental Acclimation

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare the body and routine for one known environmental pressure, reducing exposure risk while conditions remain comparable. Proposed rules effect: On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- known hazard
- preparation time
- body state
- protective equipment

**Coverage tags:**
- support-recovery
- mobility-exploration
- away-team
- noncombat

##### Seal Discipline

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice Endurance check vs Hazard Rating, Injury Severity, or the stated physical-pressure threshold when a roll is meaningful.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state, MP, route cost, hazard state, Exposure
- **Result bands:** While valid sealed gear and procedures are maintained, add +2 TS against decompression, contamination, or reserve-pressure hazards, or prevent the first 1 Exposure from that hazard per scene.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve the safe use of sealed gear, air reserves, and contamination procedures during extended field work. Proposed rules effect: While valid sealed gear and procedures are maintained, add +2 TS against decompression, contamination, or reserve-pressure hazards, or prevent the first 1 Exposure from that hazard per scene.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- sealed equipment
- resource state
- environment
- duration

**Coverage tags:**
- support-recovery
- away-team
- ship-support
- noncombat

##### Hostile World Routine

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice Endurance check vs Hazard Rating, Injury Severity, or the stated physical-pressure threshold when a roll is meaningful.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state, Team lane, position or route state, objective state, Exposure
- **Result bands:** While the declared crew routine remains valid, reduce the crew's accumulated environmental Exposure by 1 per operation phase or grant +2 Team TS against that one pressure.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** away-team
- **Prerequisites:** Environmental Acclimation AND Seal Discipline
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: establish a repeatable crew routine that reduces accumulated exposure during one declared operation. Proposed rules effect: While the declared crew routine remains valid, reduce the crew's accumulated environmental Exposure by 1 per operation phase or grant +2 Team TS against that one pressure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- known hazard
- crew participation
- procedure
- duration

**Coverage tags:**
- support-recovery
- command-tactics
- away-team
- noncombat

#### Trauma Resistance

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Endurance

**Character fantasy:** A survivor who keeps one useful choice available after the body is shocked.

**Focus identity:** Immediate physical shock, pain management, and function under injury.

**Boundary:** Medicine restores or stabilizes damage. Trauma Resistance preserves temporary function only.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- stay conscious
- act while injured
- resist shock
- control pain

##### Stay Functional

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** When trauma would immediately remove all useful action, spend the reaction to take one constrained response before the Downed/Disabled or trauma consequence commits. The response cannot include a full attack unless normally permitted.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** When physical trauma would immediately remove all useful action, preserve one constrained response before the consequence settles. Proposed rules effect: When trauma would immediately remove all useful action, spend the reaction to take one constrained response before the Downed/Disabled or trauma consequence commits. The response cannot include a full attack unless normally permitted.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- incoming trauma
- reaction available
- body state
- consequence timing

**Coverage tags:**
- support-recovery
- defense-protection
- away-team

##### Pain Partition

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Temporarily isolate pain-driven interference from one declared task while tracking the unresolved bodily cost. Proposed rules effect: On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- pain condition
- declared task
- stance upkeep
- body state

**Coverage tags:**
- support-recovery
- away-team
- noncombat

#### Sustained Exertion

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Endurance

**Character fantasy:** A crew member who can keep useful pace through the long middle of an operation.

**Focus identity:** Pacing, workload, fatigue management, and repeated effort.

**Boundary:** Rapid Transit owns bursts of speed. Resolve owns mental persistence under meaning or fear pressure.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- carry a workload
- march or climb for hours
- hold a shift
- pace repeated physical tasks

##### Second Wind

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Endurance check vs Hazard Rating, Injury Severity, or the stated physical-pressure threshold when a roll is meaningful.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** After a valid pause, Success clears or suppresses one Fatigue/Exertion Standard Status until the next recovery check. Partial suppresses it through the next activation and adds 1 Exposure.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Recover a limited amount of short-term exertion capacity by pausing, breathing, and resetting pace when the scene permits. Proposed rules effect: After a valid pause, Success clears or suppresses one Fatigue/Exertion Standard Status until the next recovery check. Partial suppresses it through the next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- short pause
- fatigue state
- safe enough scene
- body state

**Coverage tags:**
- support-recovery
- away-team
- noncombat

##### Work Rhythm

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Reduce accumulated strain from repeating one familiar physical task under stable conditions. Proposed rules effect: On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- repeated task
- stable conditions
- duration
- body state

**Coverage tags:**
- support-recovery
- away-team
- ship-support
- noncombat

##### Remain Viable

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 3
- **Maximum Rank:** 1
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** Second Wind AND Work Rhythm
- **Prerequisite logic:** AND

**Candidate effect:** Tier 3 seed: when exposure, fatigue, and injury converge, keep one declared survival function operating until immediate safety is reached. Proposed rules effect: On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- combined pressures
- declared survival function
- body state
- route to safety

**Coverage tags:**
- support-recovery
- identity-body-signal-first-contact
- away-team

### Medicine

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Constitution

**Definition:** Assess, stabilize, and support recovery of living patients within available care.

**Typical checks:**
- triage an injury
- stabilize a patient
- diagnose a condition
- manage recovery

**Boundaries:**
- Biotechnology manipulates biological processes
- Cybernetics treats installed interfaces
- Endurance belongs to the patient

**Historical terms:**
- Medicine
- Combat Triage
- Field Medicine

#### Combat Triage

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Medicine

**Character fantasy:** A field medic who finds the one intervention that matters in the next minute.

**Focus identity:** Fast assessment, immediate treatment, and condition control under pressure.

**Boundary:** Stabilization owns preventing collapse after triage. Field Recovery owns longer care.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- assess casualties
- apply a fast patch
- control bleeding
- choose treatment priority

##### Fast Patch

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** Roll only when treatment quality, speed, complication, or a status-clear attempt is meaningful. Success suppresses the one named Standard Status until the next recovery check. Partial suppresses it until the end of the patient's next activation and consumes one required supply.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Spend 1 AP on a touch treatment that controls one immediate injury consequence or restores limited function. Proposed rules effect: Roll only when treatment quality, speed, complication, or a status-clear attempt is meaningful. Success suppresses the one named Standard Status until the next recovery check. Partial suppresses it until the end of the patient's next activation and consumes one required supply.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- patient in reach
- medical tool or supply
- 1 AP available
- condition

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- away-team

##### Condition Read

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, ask and receive one actionable medical Op Knowledge answer about the visible patient's immediate risk or triage priority. Partial answers with one uncertainty or time cost.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Ask one actionable triage question about a visible patient's immediate risks before committing treatment. Proposed rules effect: On Success, ask and receive one actionable medical Op Knowledge answer about the visible patient's immediate risk or triage priority. Partial answers with one uncertainty or time cost.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- patient access
- observable condition
- time
- medical context

**Coverage tags:**
- medicine-biotech-cybernetics
- perception-cognition-resolve
- away-team
- noncombat

#### Stabilization

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Medicine

**Character fantasy:** A responder who keeps the patient from crossing the irreversible line.

**Focus identity:** Downed-state control, safe movement, and short-term life support.

**Boundary:** Combat Triage acts fast on the immediate problem. Stabilization preserves the patient across time and movement.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- stabilize
- prepare transport
- maintain airway
- prevent deterioration

##### Keep Them Breathing

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** No roll for basic stabilization when the helper has patient access, time, and a broad medical tool. Use Lattice Medicine vs Injury Severity only for quality, speed, complication, or a special hazard.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** Basic stabilization pauses the Downed/Disabled countdown through the patient's next activation. A successful quality check extends that pause until the next recovery check. This does not revive the patient or erase persistent consequences.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve stabilization quality for a patient at immediate risk of deterioration or death. Proposed rules effect: Basic stabilization pauses the Downed/Disabled countdown through the patient's next activation. A successful quality check extends that pause until the next recovery check. This does not revive the patient or erase persistent consequences.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- patient at risk
- medical access
- time
- care supplies

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- away-team

##### Safe Transfer

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** On Success, pause the one qualifying Downed/Disabled countdown named by this Ability until the end of the subject's next activation. Partial pauses it for the current activation and adds 1 Exposure.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a stabilized patient for movement so the declared transport route is less likely to worsen the condition. Proposed rules effect: On Success, pause the one qualifying Downed/Disabled countdown named by this Ability until the end of the subject's next activation. Partial pauses it for the current activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- stabilized patient
- transport method
- route
- medical support

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- mobility-exploration
- away-team

##### Golden Minute

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** On immediate deterioration, spend the reaction to pause the patient's Downed/Disabled countdown through their next activation or step that deterioration result down one band before normal treatment resumes.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** away-team
- **Prerequisites:** Keep Them Breathing AND Safe Transfer
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: interrupt immediate deterioration with one rapid procedure before normal treatment timing resumes. Proposed rules effect: On immediate deterioration, spend the reaction to pause the patient's Downed/Disabled countdown through their next activation or step that deterioration result down one band before normal treatment resumes.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- reaction available
- immediate deterioration
- patient access
- medical supply

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- away-team

#### Field Recovery

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Medicine

**Character fantasy:** A clinician who turns limited safety into the best possible recovery window.

**Focus identity:** Recovery planning, rest quality, and post-crisis care.

**Boundary:** Sustained Exertion manages active workload. Field Recovery uses downtime and care resources.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- plan recovery
- monitor healing
- manage limited supplies
- return a patient to duty

##### Recovery Plan

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** On Success, record a patient-specific recovery plan that grants +2 TS to the next relevant recovery check or reduces one stated rest, supply, or time requirement by one step. Partial grants the benefit with one added requirement.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Create a patient-specific recovery sequence that names the needed rest, supplies, monitoring, and stop conditions. Proposed rules effect: On Success, record a patient-specific recovery plan that grants +2 TS to the next relevant recovery check or reduces one stated rest, supply, or time requirement by one step. Partial grants the benefit with one added requirement.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- patient assessment
- available supplies
- safe location
- time

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- ship-support
- noncombat

##### Controlled Rest

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** When a valid rest period completes under the stated monitoring and supply conditions, add +2 TS to its recovery check or improve one normal Health/Status recovery result by one step.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Improve the benefit of a valid rest period by managing pain, monitoring, hydration, and interruption boundaries. Proposed rules effect: When a valid rest period completes under the stated monitoring and supply conditions, add +2 TS to its recovery check or improve one normal Health/Status recovery result by one step.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- rest period
- care environment
- medical supplies
- patient state

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- away-team
- ship-support
- noncombat

### Biotechnology

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Constitution

**Definition:** Use engineered biological processes, cultures, and countermeasures as controlled tools.

**Typical checks:**
- prepare a culture
- analyze an organic system
- apply a biological countermeasure

**Boundaries:**
- Medicine treats a patient
- Fabrication creates nonliving devices
- Cybernetics owns body-machine interfaces

**Historical terms:**
- Biotechnology
- Biotech

#### Adaptive Biotech

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Biotechnology

**Character fantasy:** A biosystems specialist who uses living processes as precise tools.

**Focus identity:** Engineered cultures, biological countermeasures, and organic systems handling.

**Boundary:** Medicine treats a patient. Biotechnology manipulates a biological process or tool.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- prepare a culture
- neutralize a biological hazard
- support an organic tool
- analyze a living system

##### Adaptive Culture

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state, Op Knowledge, uncertainty, Exposure, System Integrity, System Status, power or structure state, Material cost, tool permission
- **Result bands:** Choose one declared task when preparing the culture: detection creates one biological Op Knowledge fact, processing reduces one compatible Material/time cost, or remediation suppresses one compatible contaminant Status. Partial adds contamination or supply cost.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a living culture for one declared detection, processing, or remediation task under controlled conditions. Proposed rules effect: Choose one declared task when preparing the culture: detection creates one biological Op Knowledge fact, processing reduces one compatible Material/time cost, or remediation suppresses one compatible contaminant Status. Partial adds contamination or supply cost.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- biological sample
- culture equipment
- time
- containment

**Coverage tags:**
- medicine-biotech-cybernetics
- engineering-fabrication
- ship-support
- noncombat

##### Living Countermeasure

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** equipment-interaction
- **Action cost posture:** Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** On Success, suppress one compatible toxin, contaminant, or hostile-organism Standard Status until the next recovery check. Partial suppresses it through the next activation and consumes one additional supply.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Deploy a prepared biological agent to oppose one compatible toxin, contaminant, or hostile organism process. Proposed rules effect: On Success, suppress one compatible toxin, contaminant, or hostile-organism Standard Status until the next recovery check. Partial suppresses it through the next activation and consumes one additional supply.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- prepared agent
- compatible hazard
- delivery method
- containment

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- away-team
- ship-support

### Cybernetics

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Constitution

**Definition:** Maintain and deliberately operate the coupled system formed by a person and installed machinery.

**Typical checks:**
- diagnose an implant
- manage rejection
- tune a body-machine function
- stabilize feedback

**Boundaries:**
- Engineering repairs the device alone
- Resolve owns subjective identity
- Medicine owns general care

**Historical terms:**
- Cybernetics
- Cybernetic Care
- Body Modulation

#### Cybernetic Care

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Parent Skill:** Cybernetics

**Character fantasy:** An interface medic who treats the place where body and machine disagree.

**Focus identity:** Implant diagnostics, body-machine repair, and interface stabilization.

**Boundary:** Engineering repairs the device alone. Cybernetic Care treats the coupled person-system.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- repair an implant
- clear interface noise
- manage rejection
- restore body-machine function

##### Sleeve Tech

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** System Integrity, cybernetic System Status, Health, Firewall
- **Result bands:** Success restores the one declared body-machine function until normal repair can occur. Partial restores it for the current scene and adds 1 Trace. If the fault is hostile, Firewall validation still applies before treatment can take control of the surface.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Restore or stabilize one body-machine function when both the implant and patient are accessible. Proposed rules effect: Success restores the one declared body-machine function until normal repair can occur. Partial restores it for the current scene and adds 1 Trace. If the fault is hostile, Firewall validation still applies before treatment can take control of the surface.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- patient access
- implant access
- interface tool
- body state

**Coverage tags:**
- medicine-biotech-cybernetics
- support-recovery
- away-team
- ship-support

##### Interface Flush

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Health, System Integrity, Standard Status, Downed/Disabled countdown
- **Result bands:** On a valid trigger, spend the reaction to contain the propagating cybernetic Standard Status to the current implant until the end of the patient's next activation. It cannot reverse System Integrity damage already committed.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Interrupt a harmful feedback, desynchronization, or control loop before it propagates through the coupled system. Proposed rules effect: On a valid trigger, spend the reaction to contain the propagating cybernetic Standard Status to the current implant until the end of the patient's next activation. It cannot reverse System Integrity damage already committed.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- reaction available
- active interface fault
- patient access
- implant state

**Coverage tags:**
- medicine-biotech-cybernetics
- defense-protection
- identity-body-signal-first-contact
- away-team

#### Body Modulation

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Cybernetics

**Character fantasy:** A transhuman operator who changes function deliberately without treating the body as cost-free hardware.

**Focus identity:** Temporary metabolic, sensory, and performance shifts with explicit recovery costs.

**Boundary:** Endurance manages ordinary bodily effort. Body Modulation intentionally changes the operating state.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- shift metabolism
- tune a sense
- overclock an implant
- adapt body function

##### Metabolic Shift

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.
- **Rules state surfaces:** Hazard tolerance, Standard Status, Health recovery, declared after-cost
- **Result bands:** While active, ignore the next Standard Status caused by the one environmental or bodily pressure declared at activation. At expiry, commit the one after-cost Standard Status declared at activation.
- **Guardrail:** This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Temporarily prioritize one bodily demand such as wakefulness, cold response, oxygen use, or recovery while accepting a declared after-cost. Proposed rules effect: While active, ignore the next Standard Status caused by the one environmental or bodily pressure declared at activation. At expiry, commit the one after-cost Standard Status declared at activation.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- body state
- selected demand
- after-cost
- duration

**Coverage tags:**
- medicine-biotech-cybernetics
- identity-body-signal-first-contact
- away-team
- noncombat

##### Controlled Overclock

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or stated Status severity.
- **Rules state surfaces:** body-machine state, System Integrity, Standard Status, Signal pressure
- **Result bands:** While active, grant +2 TS to one declared compatible augmented function. At the end of the declared window, commit the named Body or System Status after-cost; Partial shortens the window or worsens that cost.
- **Guardrail:** Compatible hardware, informed consent, stop conditions, and recovery boundaries remain required; no identity or body rewrite is imposed.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Push one compatible implant or augmented body function beyond its normal safe profile for a short declared window. Proposed rules effect: While active, grant +2 TS to one declared compatible augmented function. At the end of the declared window, commit the named Body or System Status after-cost; Partial shortens the window or worsens that cost.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- compatible augmentation
- declared function
- heat or strain
- duration

**Coverage tags:**
- medicine-biotech-cybernetics
- identity-body-signal-first-contact
- away-team

##### Symbiotic Interface

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or stated Status severity.
- **Rules state surfaces:** body-machine state, System Integrity, Standard Status, Signal pressure
- **Result bands:** On Success, grant one bounded shared sensing or regulation permission between the compatible biological and cybernetic systems until the next recovery check. Partial lasts through the scene and adds one Body/System Status.
- **Guardrail:** Compatible hardware, informed consent, stop conditions, and recovery boundaries remain required; no identity or body rewrite is imposed.
- **Applicability:** ship-support
- **Prerequisites:** Metabolic Shift AND Controlled Overclock
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: allow a compatible biological and cybernetic system to share one bounded sensing or regulation function. Proposed rules effect: On Success, grant one bounded shared sensing or regulation permission between the compatible biological and cybernetic systems until the next recovery check. Partial lasts through the scene and adds one Body/System Status.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- compatible systems
- interface state
- body consent
- duration

**Coverage tags:**
- medicine-biotech-cybernetics
- identity-body-signal-first-contact
- ship-support

## Wisdom

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal

**Identity:** Sound judgment under uncertainty, including perception, interpretation, stress, identity, and contact with the unknown.

**Gameplay promise:** Wisdom should reward careful observation and stable judgment without becoming a vague catch-all for every clue or resistance check.

**Coverage notes:** Covers observation, analysis under uncertainty, resolve, identity continuity, and first-contact grounding. Intelligence owns formal systems work.

**Historical lineage:**
- Insight -> Wisdom
- Cognition, Perception, Willpower, Resolve, and continuity-adjacent effects preserved as lineage

### Perception

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Wisdom

**Definition:** Notice relevant signals, threats, traces, and environmental changes before interpretation becomes certainty.

**Typical checks:**
- spot a hidden threat
- read sensor noise
- track a route
- notice a change in behavior

**Boundaries:**
- Cognition explains patterns
- Target Calling distributes tactical information
- Empathy interprets another person's emotional state

**Historical terms:**
- Perception
- Surveillance
- Tracking

#### Threat Awareness

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Perception

**Character fantasy:** A watchkeeper who notices the attack forming before the first obvious move.

**Focus identity:** Pre-contact cues, ambush awareness, and defensive watch.

**Boundary:** Target Calling turns a noticed threat into crew-ready information. Threat Awareness notices it first.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- detect an ambush
- notice hostile intent
- maintain watch
- identify immediate danger

##### Pre-Contact Read

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** When the scene shifts toward immediate danger, spend the reaction to receive one observable threat cue before choosing the first response; do not roll the reaction separately.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** When a scene shifts toward immediate danger, ask for one observable cue before choosing the first response. Proposed rules effect: When the scene shifts toward immediate danger, spend the reaction to receive one observable threat cue before choosing the first response; do not roll the reaction separately.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- observable cue
- scene transition
- reaction available
- attention

**Coverage tags:**
- perception-cognition-resolve
- defense-protection
- away-team
- noncombat

##### Watchful Rest

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure, Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** While the reduced watch is maintained during a valid rest, add +2 TS to notice one approaching threat without ending Rest state. Direct preserves the full rest benefit; Partial notices it but ends Rest.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Maintain a reduced but meaningful watch during a valid rest period without treating the character as fully active. Proposed rules effect: While the reduced watch is maintained during a valid rest, add +2 TS to notice one approaching threat without ending Rest state. Direct preserves the full rest benefit; Partial notices it but ends Rest.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- rest period
- declared watch area
- attention
- fatigue

**Coverage tags:**
- perception-cognition-resolve
- defense-protection
- away-team
- ship-support
- noncombat

#### Sensor Interpretation

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Perception

**Character fantasy:** A sensor reader who knows when a clean display is lying by omission.

**Focus identity:** Cross-sensor comparison, noise analysis, and uncertain detection.

**Boundary:** Computing changes sensor software. Sensor Interpretation reasons from the output available.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- compare sensors
- separate signal from noise
- read partial contacts
- detect spoofing

##### Cross-Sensor Picture

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Combine two compatible observation sources into one bounded picture that preserves their uncertainty and disagreement. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two observation sources
- time
- data quality
- compatible reference frame

**Coverage tags:**
- perception-cognition-resolve
- ship-support
- noncombat

##### Noise Floor

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, create one actionable Op Knowledge fact distinguishing a weak signal from a changed background-noise pattern. Partial creates it with one uncertainty and adds 1 Exposure.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Recognize when a weak signal is meaningful because the background noise has changed rather than because the signal is strong. Proposed rules effect: On Success, create one actionable Op Knowledge fact distinguishing a weak signal from a changed background-noise pattern. Partial creates it with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- sensor data
- baseline context
- attention
- signal conditions

**Coverage tags:**
- perception-cognition-resolve
- identity-body-signal-first-contact
- away-team
- ship-support
- noncombat

##### Distributed Watch

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure, Team lane, position or route state, objective state, Exposure
- **Result bands:** While the stance is maintained, once per activation combine reports from two compatible crew stations into one actionable Op Knowledge fact; disagreement remains recorded as uncertainty.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** ship-support
- **Prerequisites:** Cross-Sensor Picture AND Noise Floor
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: maintain a coherent watch picture from multiple crew stations without flattening conflicting reports. Proposed rules effect: While the stance is maintained, once per activation combine reports from two compatible crew stations into one actionable Op Knowledge fact; disagreement remains recorded as uncertainty.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- multiple stations
- communication path
- attention
- shared reference frame

**Coverage tags:**
- perception-cognition-resolve
- command-tactics
- ship-support
- noncombat

#### Search and Tracking

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Perception

**Character fantasy:** An investigator who keeps continuity across broken scenes and interrupted trails.

**Focus identity:** Physical search, trace continuity, and route evidence.

**Boundary:** Counter-Surveillance removes or confuses a trace. Search and Tracking recovers the remaining continuity.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- search a scene
- follow a trail
- reconstruct movement
- identify a route change

##### Trace Continuity

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** Maintain one verified connection between separated evidence; the next tracking check may continue across that interruption and gains +2 TS. Partial preserves the link with one uncertainty.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Preserve one meaningful connection between separated pieces of physical or sensor evidence when the trail is interrupted. Proposed rules effect: Maintain one verified connection between separated evidence; the next tracking check may continue across that interruption and gains +2 TS. Partial preserves the link with one uncertainty.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- related evidence
- scene access
- time
- environmental change

**Coverage tags:**
- perception-cognition-resolve
- mobility-exploration
- away-team
- noncombat

##### Route Sign

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Ask one concrete question about how a subject entered, crossed, or left a searched space. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- searched space
- available traces
- time
- subject context

**Coverage tags:**
- perception-cognition-resolve
- mobility-exploration
- away-team
- noncombat

### Cognition

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Wisdom

**Definition:** Build useful models from evidence, memory, and competing explanations while keeping uncertainty visible.

**Typical checks:**
- analyze a failure
- recall a dossier
- connect anomalies
- compare explanations

**Boundaries:**
- Intelligence owns formal technical execution
- Perception gathers observations
- Faction Access owns live social pathways

**Historical terms:**
- Cognition
- Faction Lore
- Culture

#### Analysis

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Cognition

**Character fantasy:** An analyst who turns incomplete evidence into the next useful test.

**Focus identity:** Hypotheses, operational models, and explicit uncertainty.

**Boundary:** Pattern Synthesis connects multiple domains. Analysis works one bounded problem deeply.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- form a hypothesis
- identify a test
- compare explanations
- find a missing variable

##### Failure Hypothesis

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Name one plausible cause for an observed failure and the next observation that would support or weaken it. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- observed failure
- available evidence
- time
- testable next step

**Coverage tags:**
- perception-cognition-resolve
- engineering-fabrication
- ship-support
- noncombat

##### Operational Model

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Create a simplified model of one active situation so the crew can reason about a declared variable or tradeoff. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- bounded situation
- available evidence
- declared variable
- communication path

**Coverage tags:**
- perception-cognition-resolve
- command-tactics
- away-team
- ship-support
- noncombat

#### Recall and Dossiers

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Cognition

**Character fantasy:** A prepared specialist whose stored context makes unfamiliar details actionable.

**Focus identity:** Faction, equipment, cultural, and procedural recall.

**Boundary:** Networks gains current access. Recall and Dossiers provides contextual knowledge that may be stale.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- recall a faction norm
- recognize equipment
- remember a protocol
- place a cultural cue

##### Faction Recall

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Ask one sourced question about a known faction's procedures, incentives, or visible signatures. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- known faction
- relevant dossier
- observable context
- source currency

**Coverage tags:**
- perception-cognition-resolve
- rapport-deception-pressure-networks-exchange
- away-team
- ship-support
- noncombat

##### Equipment Recognition

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Identify the likely class, purpose, or operating assumptions of visible equipment without claiming hidden specifications. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- visible equipment
- relevant knowledge
- time
- condition

**Coverage tags:**
- perception-cognition-resolve
- engineering-fabrication
- away-team
- noncombat

#### Pattern Synthesis

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Cognition

**Character fantasy:** A synthesist who notices when separate anomalies are one system viewed from different angles.

**Focus identity:** Cross-domain patterns, predictive branches, and anomaly chains.

**Boundary:** Analysis stays bounded and testable. Pattern Synthesis ranges wider but must preserve uncertainty.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- connect clues
- forecast a branch
- identify a shared cause
- spot a systemic pattern

##### Anomaly Chain

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Link two or more verified anomalies into one candidate chain while naming the weakest connection explicitly. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- verified anomalies
- available context
- time
- uncertainty record

**Coverage tags:**
- perception-cognition-resolve
- identity-body-signal-first-contact
- away-team
- ship-support
- noncombat

##### Predictive Branch

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** State two plausible near-term branches from the current evidence and name what would distinguish them. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- current evidence
- bounded horizon
- distinguishing signal
- uncertainty

**Coverage tags:**
- perception-cognition-resolve
- command-tactics
- away-team
- ship-support
- noncombat

##### Counterfactual Map

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** general
- **Prerequisites:** Anomaly Chain AND Predictive Branch
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: compare the active model with one explicit alternative and expose which decision changes under each. Proposed rules effect: On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- active model
- alternative model
- decision point
- evidence

**Coverage tags:**
- perception-cognition-resolve
- command-tactics
- noncombat

### Resolve

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Wisdom

**Definition:** Maintain agency, continuity, and chosen priorities under stress, coercion, identity disruption, and first-contact uncertainty.

**Typical checks:**
- resist panic
- hold a chosen priority
- verify identity continuity
- remain grounded during contact

**Boundaries:**
- Endurance owns physical strain
- Firewall owns digital intrusion
- Rapport supports others emotionally

**Historical terms:**
- Willpower
- Resolve
- Identity
- Signal

#### Stress Control

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Resolve

**Character fantasy:** A steady operator who can acknowledge pressure without letting it choose the next action.

**Focus identity:** Panic control, compartmentalization, and immediate emotional regulation.

**Boundary:** Morale supports the group. Stress Control governs the character's own immediate state.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- resist panic
- act under fear
- defer distraction
- recover composure

##### Steady Pulse

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.
- **Rules state surfaces:** Op Knowledge, Status, Exposure, Signal pressure
- **Result bands:** On Success, suppress the one Standard Status or Signal-pressure effect named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.
- **Guardrail:** Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** When stress would force an immediate uncontrolled response, preserve one deliberate constrained choice. Proposed rules effect: On Success, suppress the one Standard Status or Signal-pressure effect named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- reaction available
- acute stress
- chosen response
- scene state

**Coverage tags:**
- perception-cognition-resolve
- identity-body-signal-first-contact
- away-team
- ship-support

##### Compartmentalize

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or stated Status severity.
- **Rules state surfaces:** identity or Contact boundary, Signal pressure, Standard Status, Op Knowledge
- **Result bands:** While the stance supports one declared task, suppress one pressure or distraction Standard Status. The Status returns at the next recovery/reflection boundary; Partial adds 1 Exposure.
- **Guardrail:** The Ability cannot invent Contact authority, rewrite identity, or impose transformation; stated consent, evidence, and campaign gates remain controlling.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Temporarily set aside one distracting pressure while tracking that it must return during later recovery or reflection. Proposed rules effect: While the stance supports one declared task, suppress one pressure or distraction Standard Status. The Status returns at the next recovery/reflection boundary; Partial adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- identified pressure
- declared task
- stance upkeep
- later recovery

**Coverage tags:**
- perception-cognition-resolve
- away-team
- ship-support
- noncombat

#### Identity Continuity

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Resolve

**Character fantasy:** A transhuman self who can tell the difference between change, coercion, and loss of authorship.

**Focus identity:** Memory checks, self-authorship, and continuity across altered body or cognition.

**Boundary:** Biointegration manages body-machine function. Identity Continuity manages subjective authorship and memory trust.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- verify a memory
- resist identity overwrite
- integrate a body change
- name a chosen self

##### Self-Anchor

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** identity or Contact boundary, Signal pressure, Standard Status, Op Knowledge
- **Result bands:** Record one personal continuity anchor; the next identity, memory, or priority check that directly tests it gains +2 TS and may compare the claim against the anchor.
- **Guardrail:** The Ability cannot invent Contact authority, rewrite identity, or impose transformation; stated consent, evidence, and campaign gates remain controlling.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Define a personal continuity anchor that can later help test whether a memory, priority, or identity claim remains self-authored. Proposed rules effect: Record one personal continuity anchor; the next identity, memory, or priority check that directly tests it gains +2 TS and may compare the claim against the anchor.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- chosen anchor
- private or trusted record
- consent
- later comparison

**Coverage tags:**
- identity-body-signal-first-contact
- perception-cognition-resolve
- noncombat

##### Memory Checksum

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure, identity or Contact boundary, Signal pressure, Standard Status, Op Knowledge
- **Result bands:** On Success, create one bounded Op Knowledge finding—consistent, inconsistent, or uncertain—by comparing the contested memory with one independent anchor or trusted witness. Partial leaves one named uncertainty.
- **Guardrail:** The Ability cannot invent Contact authority, rewrite identity, or impose transformation; stated consent, evidence, and campaign gates remain controlling.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Compare a contested memory against one independent anchor or trusted witness without proving every detail true. Proposed rules effect: On Success, create one bounded Op Knowledge finding—consistent, inconsistent, or uncertain—by comparing the contested memory with one independent anchor or trusted witness. Partial leaves one named uncertainty.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- contested memory
- independent anchor
- trusted access
- time

**Coverage tags:**
- identity-body-signal-first-contact
- perception-cognition-resolve
- noncombat

#### First-Contact Grounding

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Resolve

**Character fantasy:** A contact specialist who stays curious without pretending the unknown is harmless or already understood.

**Focus identity:** Unknown-agency protocol, meaning hazards, and safe epistemic restraint.

**Boundary:** Rapport handles recognizable social exchange. First-Contact Grounding begins before shared assumptions exist.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- approach an unknown intelligence
- contain a meaning hazard
- separate observation from interpretation
- maintain consent boundaries

##### Unknown Protocol

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or stated Status severity.
- **Rules state surfaces:** identity or Contact boundary, Signal pressure, Standard Status, Op Knowledge
- **Result bands:** On Success, establish the observation, consent, retreat, and contamination boundaries for one Contact sequence; following them reduces the first resulting Exposure by 1. Partial establishes them with one unresolved boundary.
- **Guardrail:** The Ability cannot invent Contact authority, rewrite identity, or impose transformation; stated consent, evidence, and campaign gates remain controlling.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Establish observation, consent, retreat, and contamination boundaries before engaging an unknown intelligence or agency. Proposed rules effect: On Success, establish the observation, consent, retreat, and contamination boundaries for one Contact sequence; following them reduces the first resulting Exposure by 1. Partial establishes them with one unresolved boundary.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- unknown agency
- crew agreement
- retreat route
- containment boundary

**Coverage tags:**
- identity-body-signal-first-contact
- perception-cognition-resolve
- away-team
- ship-support
- noncombat

##### Meaning Quarantine

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** reaction
- **Action cost posture:** Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.
- **Lattice check surface:** Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or the stated Status severity.
- **Rules state surfaces:** Standard Status, Signal pressure, Op Knowledge, identity or body state
- **Result bands:** On Success, suppress the one Standard Status or Signal-pressure effect named by this Ability until the next recovery check while preserving the Ability's stated consent and identity boundary. Partial lasts until the end of the subject's next activation and adds 1 Exposure.
- **Guardrail:** The Ability cannot invent Contact authority, rewrite identity, or impose body transformation without the stated campaign gate and consent boundary.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Pause the spread of one destabilizing interpretation until the crew can separate observed fact from inferred meaning. Proposed rules effect: On Success, suppress the one Standard Status or Signal-pressure effect named by this Ability until the next recovery check while preserving the Ability's stated consent and identity boundary. Partial lasts until the end of the subject's next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- destabilizing interpretation
- communication path
- reaction available
- crew state

**Coverage tags:**
- identity-body-signal-first-contact
- defense-protection
- perception-cognition-resolve
- away-team
- ship-support

##### Continuity Under Contact

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** identity or Contact boundary, Signal pressure, Standard Status, Op Knowledge, Team lane, position or route state, objective state, Exposure
- **Result bands:** Maintain one shared crew Contact log of observations, interpretations, and identity checks; once per activation, a crew member using a current entry gains +2 Team TS on a continuity check.
- **Guardrail:** The Ability cannot invent Contact authority, rewrite identity, or impose transformation; stated consent, evidence, and campaign gates remain controlling.
- **Applicability:** ship-support
- **Prerequisites:** Unknown Protocol AND Meaning Quarantine
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: maintain a shared crew record of observations, interpretations, and identity checks throughout one contact sequence. Proposed rules effect: Maintain one shared crew Contact log of observations, interpretations, and identity checks; once per activation, a crew member using a current entry gains +2 Team TS on a continuity check.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- contact sequence
- crew record
- communication path
- identity checks

**Coverage tags:**
- identity-body-signal-first-contact
- command-tactics
- perception-cognition-resolve
- ship-support
- noncombat

##### Witness Without Surrender

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 3
- **Maximum Rank:** 1
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or stated Status severity.
- **Rules state surfaces:** identity or Contact boundary, Signal pressure, Standard Status, Op Knowledge
- **Result bands:** On Success, preserve the declared identity boundary while engaging one alien model and gain +2 TS against its next boundary imposition. Partial preserves the boundary through the current activation and adds 1 Exposure.
- **Guardrail:** The Ability cannot invent Contact authority, rewrite identity, or impose transformation; stated consent, evidence, and campaign gates remain controlling.
- **Applicability:** general
- **Prerequisites:** Unknown Protocol AND Meaning Quarantine
- **Prerequisite logic:** AND

**Candidate effect:** Tier 3 seed: remain open to a genuinely alien model while preserving a chosen boundary that the contact cannot define for you. Proposed rules effect: On Success, preserve the declared identity boundary while engaging one alien model and gain +2 TS against its next boundary imposition. Partial preserves the boundary through the current activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- active contact
- chosen boundary
- self-anchor
- consent

**Coverage tags:**
- identity-body-signal-first-contact
- perception-cognition-resolve
- noncombat

## Charisma

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal

**Identity:** The ability to create alignment, pressure, cover, and exchange among people and institutions.

**Gameplay promise:** Charisma should create consequential noncombat options, crew cohesion, and network play without replacing evidence, consent, or material leverage.

**Coverage notes:** Covers rapport, influence, informal networks, and exchange. Wisdom reads; Charisma changes the social situation.

**Historical lineage:**
- Network -> Charisma
- Diplomacy, Deception, Coercion, Empathy, Performance, Streetwise, Culture, Faction Lore, and Commerce preserved as lineage

### Negotiation

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Charisma

**Definition:** Create bounded agreements through terms, interests, leverage, and explicit commitments.

**Typical checks:**
- make a deal
- trade concessions
- clarify terms
- de-escalate a dispute

**Boundaries:**
- Exchange owns valuation
- Pressure narrows a choice
- Empathy reads emotional state

**Historical terms:**
- Diplomacy
- Negotiation

#### Terms and Accord

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Negotiation

**Character fantasy:** A negotiator who finds terms both sides can actually carry into the next scene.

**Focus identity:** Common terms, leverage windows, and explicit commitments.

**Boundary:** Exchange values goods and access. Negotiation builds the agreement around them.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- make a deal
- clarify terms
- trade concessions
- de-escalate a dispute

##### Common Terms

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure, Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, create one negotiation Op Knowledge fact naming an interest or constraint both sides acknowledge; the next bargain that uses it gains +2 TS. Partial creates it with one disputed boundary.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Identify one interest or constraint that both sides can acknowledge as a basis for a bounded agreement. Proposed rules effect: On Success, create one negotiation Op Knowledge fact naming an interest or constraint both sides acknowledge; the next bargain that uses it gains +2 TS. Partial creates it with one disputed boundary.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- communicating parties
- recognizable interest
- time
- good-faith possibility

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- support-recovery
- away-team
- ship-support
- noncombat

##### Leverage Window

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, shift the named target's Disposition one step in the Ability's stated direction. Partial makes the shift temporary until the end of the scene and adds 1 Exposure.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Use real, relevant leverage to improve a proposed bargain while making the consequence of refusal explicit. Proposed rules effect: On Success, shift the named target's Disposition one step in the Ability's stated direction. Partial makes the shift temporary until the end of the scene and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- real leverage
- interested party
- clear terms
- communication path

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- noncombat

##### Bridge the Divide

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, create a negotiation Setup between the named parties that grants +2 TS to the next bounded agreement check. Partial grants it and adds one obligation or 1 Exposure.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** general
- **Prerequisites:** Common Terms AND Leverage Window
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: structure a negotiation between parties whose assumptions or procedures do not align. Proposed rules effect: On Success, create a negotiation Setup between the named parties that grants +2 TS to the next bounded agreement check. Partial grants it and adds one obligation or 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two parties
- identified mismatch
- communication method
- time

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- identity-body-signal-first-contact
- noncombat

### Empathy

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Charisma

**Definition:** Read and support emotional or group state without claiming mind reading or compulsory personality control.

**Typical checks:**
- read the room
- stabilize distress
- restore morale
- notice a relational rupture

**Boundaries:**
- Perception notices cues
- Resolve stabilizes the self
- Tactics directs immediate execution

**Historical terms:**
- Empathy
- Morale
- Rally

#### Emotional Read

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Empathy

**Character fantasy:** A listener who makes another person's state easier to name without claiming mind reading.

**Focus identity:** Emotional reading, stabilizing presence, and motive-aware support.

**Boundary:** Perception notices cues. Empathy interprets them relationally and remains fallible.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- read the room
- support distress
- notice a social rupture
- understand a motive

##### Read the Room

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, receive one bounded Op Knowledge answer about visible emotional pressure or group alignment. Partial answers with one uncertainty or overlooked subgroup.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Ask one bounded question about the visible emotional pressure or social alignment in the current group. Proposed rules effect: On Success, receive one bounded Op Knowledge answer about visible emotional pressure or group alignment. Partial answers with one uncertainty or overlooked subgroup.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- observable group
- time
- social cues
- context

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- perception-cognition-resolve
- noncombat

##### Stabilizing Presence

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, suppress one willing target's immediate emotional-pressure Standard Status until the next recovery check. Partial suppresses it through the next activation and adds 1 Exposure.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Help a willing person name and reduce one immediate social or emotional pressure enough to choose their next action. Proposed rules effect: On Success, suppress one willing target's immediate emotional-pressure Standard Status until the next recovery check. Partial suppresses it through the next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- willing person
- communication path
- time
- immediate pressure

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- support-recovery
- away-team
- ship-support
- noncombat

#### Morale

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Empathy

**Character fantasy:** A crew voice that helps people remember why the next difficult action still belongs to them.

**Focus identity:** Crew pressure relief, shared purpose, and recovery of collective tempo.

**Boundary:** Field Direction gives immediate tactical instruction. Morale supports willingness and cohesion.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- rally an ally
- steady a group
- restore purpose
- mark a shared success

##### Steady Voice

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, suppress the one pressure-related Standard Status named by this Ability until the target's next recovery check. Partial suppresses it until the end of the target's next activation and adds 1 Exposure.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Reduce one immediate ally pressure through a credible reminder, callout, or grounding statement. Proposed rules effect: On Success, suppress the one pressure-related Standard Status named by this Ability until the target's next recovery check. Partial suppresses it until the end of the target's next activation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- willing ally
- communication path
- credible message
- pressure state

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- support-recovery
- command-tactics
- away-team
- ship-support

##### Shared Purpose

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission, Team lane, position or route state, objective state, Exposure
- **Result bands:** On Success, establish the crew's immediate purpose and boundary; one later crew pressure check that invokes it gains +2 TS from the Team lane. Partial grants the bonus and adds 1 Exposure.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Name the crew's immediate purpose and the boundary it will not cross, creating a reference for later pressure checks. Proposed rules effect: On Success, establish the crew's immediate purpose and boundary; one later crew pressure check that invokes it gains +2 TS from the Team lane. Partial grants the bonus and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- crew participation
- declared purpose
- declared boundary
- communication path

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- command-tactics
- identity-body-signal-first-contact
- ship-support
- noncombat

### Deception

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Charisma

**Definition:** Control a social interpretation through cover, selective truth, misdirection, or intentional performance.

**Typical checks:**
- maintain a cover
- misdirect a question
- impersonate a role
- direct attention

**Boundaries:**
- Counter-Surveillance controls evidence
- Pressure uses credible consequences
- Negotiation seeks agreement

**Historical terms:**
- Deception
- Performance
- Cover Identity

#### Cover and Misdirection

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Deception

**Character fantasy:** A cover operator who keeps one false premise coherent under scrutiny.

**Focus identity:** Cover stories, selective truth, and identity performance.

**Boundary:** Counter-Surveillance controls physical evidence. Deception controls the social interpretation offered.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- maintain a cover
- misdirect a question
- impersonate a role
- hide intent

##### Clean Lie

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, preserve the one plausible false premise through the challenge and reduce Exposure by 1. Partial preserves it without reducing Exposure and adds 1 Trace.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Maintain one plausible false premise through a direct challenge when the available facts do not already disprove it. Proposed rules effect: On Success, preserve the one plausible false premise through the challenge and reduce Exposure by 1. Partial preserves it without reducing Exposure and adds 1 Trace.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- plausible premise
- audience
- known facts
- communication path

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- noncombat

##### Layered Cover

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, reduce Exposure by 1 while establishing or preserving the Ability's stated false premise. Partial preserves the premise without reducing Exposure and adds 1 Trace.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a cover identity with one supporting detail, one behavioral rule, and one failure response. Proposed rules effect: On Success, reduce Exposure by 1 while establishing or preserving the Ability's stated false premise. Partial preserves the premise without reducing Exposure and adds 1 Trace.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- preparation time
- supporting detail
- context
- identity boundary

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- away-team
- noncombat

#### Performance

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Deception

**Character fantasy:** A social technician who directs attention and emotional tempo through an intentional persona.

**Focus identity:** Distraction, public presence, impersonation, and morale performance.

**Boundary:** Deception protects a false premise. Performance shapes attention even when the identity is known.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- draw attention
- perform a role
- control a room's tempo
- create a distraction

##### Commanding Persona

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** While the stance addresses the declared audience and purpose, the next attention-control or aligned social Setup check gains +2 TS; contrary evidence or a changed audience ends the stance.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Adopt a deliberate social presence that improves attention control for one declared audience and purpose. Proposed rules effect: While the stance addresses the declared audience and purpose, the next attention-control or aligned social Setup check gains +2 TS; contrary evidence or a changed audience ends the stance.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- audience
- declared purpose
- social context
- stance upkeep

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- command-tactics
- noncombat

##### Directed Distraction

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, grant one declared ally a short scene-access opening or reduce that ally's Exposure by 1 on the immediate action. Partial grants the opening and adds 1 Exposure.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Pull an audience's attention toward one plausible focal point long enough to create a short opening elsewhere. Proposed rules effect: On Success, grant one declared ally a short scene-access opening or reduce that ally's Exposure by 1 on the immediate action. Partial grants the opening and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- audience
- plausible focal point
- opening
- timing

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- mobility-exploration
- away-team
- noncombat

##### Controlled Frame

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, establish one dominant public question or interpretation until contrary evidence breaks it; the next aligned social check gains +2 TS. Partial establishes it and adds 1 Exposure.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** general
- **Prerequisites:** Commanding Persona AND Directed Distraction
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: define which question or interpretation dominates a public exchange until contrary evidence breaks the frame. Proposed rules effect: On Success, establish one dominant public question or interpretation until contrary evidence breaks it; the next aligned social check gains +2 TS. Partial establishes it and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- public exchange
- plausible frame
- audience
- contrary evidence

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- command-tactics
- noncombat

### Pressure

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** legacy-derived
- **Parent Attribute:** Charisma

**Definition:** Make credible consequences legible and narrow a choice through controlled escalation.

**Typical checks:**
- set an ultimatum
- apply a credible threat
- force priority
- expose a cost

**Boundaries:**
- Negotiation trades terms
- Tactics shapes combat tempo
- Deception changes the offered interpretation

**Historical terms:**
- Coercion
- Pressure

#### Credible Threat

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Pressure

**Character fantasy:** An operator who makes consequences legible without confusing fear with trust.

**Focus identity:** Credible threats, constrained choices, and controlled escalation.

**Boundary:** Negotiation trades terms. Pressure narrows the choice through credible consequences.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- coerce
- set an ultimatum
- force priority
- expose a cost

##### Terms of Pressure

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** prior-nexus-proposal
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, the target may take the stated compliance path or accept the declared credible consequence; their Disposition shifts one step toward compliance. Partial makes the shift temporary and adds escalation or 1 Exposure.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** State a credible consequence and a clear path to avoid it, making the pressure explicit rather than implied. Proposed rules effect: On Success, the target may take the stated compliance path or accept the declared credible consequence; their Disposition shifts one step toward compliance. Partial makes the shift temporary and adds escalation or 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- credible consequence
- target understanding
- available alternative
- communication path

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- command-tactics
- noncombat

##### Controlled Threat

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, shift the named target's Disposition one step in the Ability's stated direction. Partial makes the shift temporary until the end of the scene and adds 1 Exposure.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Maintain a threat posture without accidental escalation while the target's response remains within declared bounds. Proposed rules effect: On Success, shift the named target's Disposition one step in the Ability's stated direction. Partial makes the shift temporary until the end of the scene and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- credible capability
- declared bounds
- target response
- stance upkeep

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- defense-protection
- away-team
- noncombat

### Networks

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Origin:** broad
- **Parent Attribute:** Charisma

**Definition:** Navigate informal access, exchange, obligation, and faction pathways in the current social environment.

**Typical checks:**
- find a local channel
- value a trade
- use a credential
- call on a faction pathway

**Boundaries:**
- Cognition recalls stored context
- Computing owns technical access
- Negotiation owns specific agreements

**Historical terms:**
- Streetwise
- Commerce
- Faction Lore
- Culture
- Contact

#### Streetwise

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Networks

**Character fantasy:** A local navigator who knows how informal systems actually move people and favors.

**Focus identity:** Quiet channels, local procedure, and underworld context.

**Boundary:** Faction Access handles named institutions. Streetwise handles local informal practice.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- find a fixer
- read an informal boundary
- avoid a local mistake
- locate an off-book service

##### Quiet Channels

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, grant the single bounded scene-access permission described by this Ability. Partial grants it with one obligation and adds 1 Exposure.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Locate one plausible informal path to information, transport, goods, or introduction in the current community. Proposed rules effect: On Success, grant the single bounded scene-access permission described by this Ability. Partial grants it with one obligation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- local context
- time
- plausible community
- exposure risk

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- mobility-exploration
- noncombat

##### Local Procedure

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** passive
- **Action cost posture:** No AP. Its Character-lane benefit applies only while its stated validation conditions are true.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, create one Op Knowledge fact identifying an unwritten local rule and its access, safety, or reputation consequence before it is violated. Partial identifies the rule with one uncertainty.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Recognize one unwritten local rule that would affect access, safety, or reputation before violating it. Proposed rules effect: On Success, create one Op Knowledge fact identifying an unwritten local rule and its access, safety, or reputation consequence before it is violated. Partial identifies the rule with one uncertainty.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- local context
- observable practice
- relevant experience
- time

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- perception-cognition-resolve
- away-team
- noncombat

#### Exchange

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Networks

**Character fantasy:** A trader who sees value, scarcity, and obligation in the same transaction.

**Focus identity:** Valuation, requisition, salvage conversion, and resource terms.

**Boundary:** Negotiation handles relationship and commitment. Exchange handles value and resource movement.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- value salvage
- trade supplies
- requisition access
- structure compensation

##### Fair Value

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, create one actionable Op Knowledge fact establishing the named value or exchange path. Partial creates it with one obligation and adds 1 Exposure.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** general
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Estimate a defensible value range for a known good, service, risk, or access right in the current market context. Proposed rules effect: On Success, create one actionable Op Knowledge fact establishing the named value or exchange path. Partial creates it with one obligation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- known item or service
- market context
- time
- available comparisons

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- engineering-fabrication
- noncombat

##### Salvage Broker

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, convert verified salvage into one bounded trade, credit, or requisition permission. Partial creates the path with delayed liquidity, one obligation, or 1 Exposure.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** ship-support
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Convert verified salvage into a credible trade, credit, or requisition path without assuming immediate liquidity. Proposed rules effect: On Success, convert verified salvage into one bounded trade, credit, or requisition permission. Partial creates the path with delayed liquidity, one obligation, or 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- verified salvage
- interested channel
- ownership context
- time

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- engineering-fabrication
- ship-support
- noncombat

#### Faction Access

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skill:** Networks

**Character fantasy:** A boundary reader who knows which credential, obligation, or introduction opens the next door.

**Focus identity:** Institutional pathways, credentials, favors, and procedural context.

**Boundary:** Recall and Dossiers knows the faction. Faction Access changes the crew's live relationship to it.

**Tier 2 posture:** Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.

**Tier 3 posture:** Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.

**Typical uses:**
- use a credential
- request access
- call in context
- identify a faction pathway

##### Credential Read

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.
- **Rules state surfaces:** Op Knowledge, uncertainty, Exposure
- **Result bands:** On Success, create one Op Knowledge fact naming what the visible credential plausibly authorizes, who verifies it, and where its authority ends. It grants no access by itself; Partial leaves one boundary uncertain.
- **Guardrail:** The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.
- **Applicability:** away-team
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Determine what one visible credential plausibly authorizes, who can verify it, and where its authority likely ends. Proposed rules effect: On Success, create one Op Knowledge fact naming what the visible credential plausibly authorizes, who verifies it, and where its authority ends. It grants no access by itself; Partial leaves one boundary uncertain.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- visible credential
- faction context
- verification path
- time

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- perception-cognition-resolve
- away-team
- noncombat

##### Call in Context

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 1
- **Maximum Rank:** 3
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, grant the single bounded scene-access permission described by this Ability. Partial grants it with one obligation and adds 1 Exposure.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** both
- **Prerequisites:** None
- **Prerequisite logic:** AND

**Candidate effect:** Invoke a real prior obligation, affiliation, or introduction to request one bounded access or response. Proposed rules effect: On Success, grant the single bounded scene-access permission described by this Ability. Partial grants it with one obligation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- real relationship
- bounded request
- communication path
- reputation state

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- support-recovery
- away-team
- ship-support
- noncombat

##### Reciprocal Network

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, Trace, Op Knowledge, scene-access permission
- **Result bands:** On Success, grant the single bounded scene-access permission described by this Ability. Partial grants it with one obligation and adds 1 Exposure.
- **Guardrail:** A revealed option is not automatic success. The target, method, resource, and scene state must still validate.
- **Applicability:** ship-support
- **Prerequisites:** Credential Read AND Call in Context
- **Prerequisite logic:** AND

**Candidate effect:** Tier 2 seed: create a durable two-way channel by naming what each side can request and what ends the relationship. Proposed rules effect: On Success, grant the single bounded scene-access permission described by this Ability. Partial grants it with one obligation and adds 1 Exposure.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two parties
- reciprocal value
- communication path
- exit terms

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- support-recovery
- ship-support
- noncombat

##### Accord Under Fire

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 3
- **Maximum Rank:** 1
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.
- **Rules state surfaces:** Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, preserve one existing negotiated boundary between the hostile or frightened parties through the immediate crisis. Partial preserves it through the current activation and adds 1 Exposure or escalation.
- **Guardrail:** A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.
- **Applicability:** general
- **Prerequisites:** Credential Read AND Call in Context
- **Prerequisite logic:** AND

**Candidate effect:** Tier 3 seed: preserve one negotiated boundary between hostile or frightened parties through an immediate crisis. Proposed rules effect: On Success, preserve one existing negotiated boundary between the hostile or frightened parties through the immediate crisis. Partial preserves it through the current activation and adds 1 Exposure or escalation.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- existing accord
- immediate crisis
- communication path
- mutual boundary

**Coverage tags:**
- rapport-deception-pressure-networks-exchange
- identity-body-signal-first-contact
- command-tactics
- noncombat

## Shared branches

### Interlock Drill

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skills:** Firearms AND Tactics
- **Skill relationship:** AND

**Rationale:** A true synthesis of individual shot discipline and crew timing. Neither parent alone owns the coordinated effect.

#### Crossing Window

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Setup or Assist check vs Effective Defense, Hazard Rating, or tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Team lane, position or route state, objective state, Exposure
- **Result bands:** After the opener performs the declared setup, the converter's next valid attack against the shared target gains +2 TS from the Team lane. Both actors spend and resolve their normal actions.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** away-team
- **Prerequisites:** Steady Rifle AND Call Angle
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a coordinated firing window in which one character creates the opening and another converts it, while both actions retain standalone utility. Proposed rules effect: After the opener performs the declared setup, the converter's next valid attack against the shared target gains +2 TS from the Team lane. Both actors spend and resolve their normal actions.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two willing actors
- communication path
- shared target or route
- timing

**Coverage tags:**
- combat-offense
- command-tactics
- away-team

### Extraction Window

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skills:** Mobility AND Medicine
- **Skill relationship:** AND

**Rationale:** Combines safe patient handling with route execution. It should not replace either movement or stabilization expertise.

#### Moving Casualty

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** action
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Lattice Mobility or traversal check vs Hazard Rating when the route or interruption is uncertain.
- **Rules state surfaces:** MP, route cost, hazard state, Exposure, Health, Standard Status, Downed/Disabled countdown, recovery state
- **Result bands:** On Success, move the stabilized patient through the named route and preserve the current stabilization/Downed countdown through arrival. Partial completes the move but advances the countdown or adds the declared medical risk.
- **Guardrail:** This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.
- **Applicability:** away-team
- **Prerequisites:** Quick Mover AND Safe Transfer
- **Prerequisite logic:** AND

**Candidate effect:** Move a stabilized patient through one hazardous route while preserving the treatment state and naming the route's medical risk. Proposed rules effect: On Success, move the stabilized patient through the named route and preserve the current stabilization/Downed countdown through arrival. Partial completes the move but advances the countdown or adds the declared medical risk.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- stabilized patient
- valid route
- transport method
- medical support

**Coverage tags:**
- mobility-exploration
- support-recovery
- medicine-biotech-cybernetics
- away-team

### Mutual Cover Protocol

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skills:** Field Defense AND Tactics
- **Skill relationship:** AND

**Rationale:** Combines personal protection with team direction. It exists only when protection and timing are both authored.

#### Leapfrog Guard

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** stance
- **Action cost posture:** 1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.
- **Lattice check surface:** Lattice Setup or Assist check vs Effective Defense, Hazard Rating, or tactical pressure when opposition makes coordination uncertain.
- **Rules state surfaces:** Effective Defense, cover or Screen state, forced movement, Shield/Mitigation interaction
- **Result bands:** Two declared allies may alternate movement and Screen duty across one short route; the active mover gains +2 Effective Defense while the other maintains the Screen, using normal MP and reactions.
- **Guardrail:** The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.
- **Applicability:** away-team
- **Prerequisites:** Screen Watch AND Command Line
- **Prerequisite logic:** AND

**Candidate effect:** Two allies alternate protected movement and screening across a declared short route without granting either a free attack. Proposed rules effect: Two declared allies may alternate movement and Screen duty across one short route; the active mover gains +2 Effective Defense while the other maintains the Screen, using normal MP and reactions.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- two willing allies
- declared route
- valid screens
- movement and reaction state

**Coverage tags:**
- defense-protection
- command-tactics
- mobility-exploration
- away-team

### Borrowed Authority

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skills:** Computing OR Networks
- **Skill relationship:** OR

**Rationale:** Represents one access effect reachable through either a technical foothold or a legitimate social pathway. It is not a hybrid power spike.

#### Provisional Credential

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** permission
- **Action cost posture:** Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.
- **Lattice check surface:** Use Lattice system action vs Firewall for a technical foothold, or a Lattice Gate/Setup check against social resistance for a real-relationship route.
- **Rules state surfaces:** Firewall, System Integrity, System Status, Trace, access permission, Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, gain one bounded access permission until the declared expiry. A technical Partial adds 1 Trace; a social Partial adds one obligation and 1 Exposure. Provenance remains visible.
- **Guardrail:** The chosen technical or social route must independently validate; the credential cannot bypass ownership, verification, expiry, or a stated access gate.
- **Applicability:** general
- **Prerequisites:** Clean Intrusion OR Credential Read
- **Prerequisite logic:** OR

**Candidate effect:** Create or obtain a short-lived credential for one bounded access request while leaving its technical or social provenance visible. Proposed rules effect: On Success, gain one bounded access permission until the declared expiry. A technical Partial adds 1 Trace; a social Partial adds one obligation and 1 Exposure. Provenance remains visible.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- technical foothold or real relationship
- bounded access
- verification path
- expiry

**Coverage tags:**
- computing-intrusion
- rapport-deception-pressure-networks-exchange
- noncombat

### Self-Authored Form

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skills:** Cybernetics AND Resolve
- **Skill relationship:** AND

**Rationale:** A body and identity synthesis that requires both interface competence and explicit continuity safeguards.

#### Consent-Locked Modulation

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or stated Status severity.
- **Rules state surfaces:** body-machine state, System Integrity, Standard Status, Signal pressure, identity or Contact boundary, Signal pressure, Standard Status, Op Knowledge
- **Result bands:** On Success, prepare one declared body-machine operating state with a self-anchor, explicit stop condition, duration, and after-cost. Partial prepares a shorter window or adds one recovery cost; activation remains self-authorized.
- **Guardrail:** Compatible hardware, informed consent, stop conditions, and recovery boundaries remain required; no identity or body rewrite is imposed.
- **Applicability:** general
- **Prerequisites:** Controlled Overclock AND Self-Anchor
- **Prerequisite logic:** AND

**Candidate effect:** Prepare a body-machine operating change with a self-anchor, an explicit stop condition, and a trusted recovery path. Proposed rules effect: On Success, prepare one declared body-machine operating state with a self-anchor, explicit stop condition, duration, and after-cost. Partial prepares a shorter window or adds one recovery cost; activation remains self-authorized.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- compatible augmentation
- informed consent
- self-anchor
- recovery path

**Coverage tags:**
- medicine-biotech-cybernetics
- identity-body-signal-first-contact
- noncombat

### Field Requisition

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Parent Skills:** Fabrication OR Networks
- **Skill relationship:** OR

**Rationale:** Offers two routes to the same prepared capability: build the needed tool or source it through a live exchange network.

#### Right Tool, Right Window

- **Proposal:** yes
- **Status:** proposed
- **Provenance:** new-original
- **Tier:** 2
- **Maximum Rank:** 2
- **Type:** preparation
- **Action cost posture:** 1 AP in Tactical Pressure, or the stated preparation time outside it.
- **Lattice check surface:** Use Lattice Fabrication vs the technical threshold when building, or Lattice Gate/Setup vs social resistance when requisitioning.
- **Rules state surfaces:** System Integrity, System Status, power or structure state, Material cost, tool permission, Disposition, Standard Status, Exposure, obligation, scene-access permission
- **Result bands:** On Success, secure one purpose-limited tool for the declared task until its expiry. Partial secures it with an exposed fault, extra Material, obligation, or delayed availability matching the chosen route.
- **Guardrail:** The tool grants only its declared function; materials or network access, ownership, expiry, equipment tags, and the task's normal action still validate.
- **Applicability:** both
- **Prerequisites:** Modular Build OR Fair Value
- **Prerequisite logic:** OR

**Candidate effect:** Secure one purpose-limited tool for a declared upcoming task through fabrication or requisition, with its expiry and ownership clear. Proposed rules effect: On Success, secure one purpose-limited tool for the declared task until its expiry. Partial secures it with an exposed fault, extra Material, obligation, or delayed availability matching the chosen route.

**Rank development:** Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.

**Design rationale:** Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.

**Playtest notes:** Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.

**Validation dependencies:**
- declared upcoming task
- materials or network access
- time
- ownership and expiry

**Coverage tags:**
- engineering-fabrication
- rapport-deception-pressure-networks-exchange
- away-team
- ship-support
- noncombat
