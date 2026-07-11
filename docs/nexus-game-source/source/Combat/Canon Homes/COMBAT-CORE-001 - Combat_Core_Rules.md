---
project: "Nexus"
doc_id: "COMBAT-CORE-001"
legacy_ids:
  - 'SRC-COMBAT-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-002 - Combat_Core_Rules.md'
title: "Combat_Core_Rules"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_canon"
placement_domain: "Combat"
content_role: "canon_home"
topic_family: "combat_core"
owns_topics:
  - 'combat_core'
  - 'durability_order'
  - 'combat_result_bands'
borrows_topics:
  - 'recovery_check_calls'
  - 'equipment_defense_spine'
created: "2026-05-13"
last_updated: "2026-06-14"
last_reviewed: "2026-06-14"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active combat core without relying on package-era framing. 2026-06-14 source reconciliation folded app-facing authority, effect, and state-delta boundaries into the combat source home."
---

# Combat Core Rules

> [!important] Revised vision reconciliation — 2026-07-11
> `CORE-SPATIAL-001` controls Location continuity, continuous placement, authored Interaction and Cover Positions, Tactical Pressure, and individual Initiative. Compatible AP, MP, reaction, defense, hazard, objective, action, and recovery rules below survive. Alternating activation, node/path/capacity placement, in-transit nodes, and separate Encounter-map authority are historical.

<!-- source-slice: combat.core.purpose-and-tactical-principles -->
## 1. Purpose
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.

Combat in Nexus is tactical, readable, and meaningful. Combat should occupy a large share of player time, but not every encounter must become combat.

Characters are expected to be relatively squishy. Success should come from planning, lined-up shots, positioning, cover, objective execution, non-attack options, reactions, items, party synergy, and retreat or bypass when appropriate, not simply from trading damage.

<!-- source-slice: combat.core.encounter-start-procedure -->
## 2. Encounter start procedure
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.

Combat encounters should begin with:

1. scene title;
2. brief narrative description;
3. immediate stakes;
4. assessment / approach phase;
5. TacMap or tactical sketch when spatial play matters;
6. visible enemies, hazards, objectives, and interactable objects.

When a tactical encounter requires a TacMap, the DM should produce it automatically. The player should not have to ask for the map after the fiction has reached a map-relevant encounter start.

The structured combat state is the mechanical source of truth. Narrative description provides atmosphere, sensory context, stakes, and tactical framing. A rendered TacMap is a play aid; when a map image and structured node/path/object data disagree, the structured data controls until corrected.

## 3. Approach phase

Before combat begins, the player should be able to evaluate or alter the encounter. Typical approach actions include observing, scanning, talking, negotiating, bribing, deceiving, intimidating, sneaking, hacking, preparing ambushes, repositioning, retreating, disabling systems, or pursuing objective-focused bypasses.

Combat begins when the player attacks, enemies attack, talks fail, stealth fails, alarms trigger, the fiction demands it, or an objective timer forces open conflict.

## 4. Party control

The working combat party baseline is PC + 2 crew. The player controls the PC and active crew in combat. Crew turns are individual, not grouped.

<!-- source-slice: combat.core.turn-and-activation-baseline -->
## 5. Turn and activation baseline
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.

Current v0.1 baseline:

- alternating activations;
- initiative / tempo start system pending;
- each standard activation has MP from Speed, 2 AP, one reaction permission / prepared reaction surface as applicable, and one free micro-interaction;
- actions resolve sequentially unless a feature, prepared process, triggered system, passive effect, automation, or scenario rule explicitly says otherwise;
- exact initiative math is deferred.

<!-- source-slice: combat.core.combat-state-to-track -->
## 6. Combat state to track
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.

Combat state should track:

- round and current activation;
- character node / path / in-transit status;
- AP, MP, reaction readiness, stance, and micro-interaction use;
- Health, System Integrity, Defense, Firewall, Mitigation, and Shield where applicable;
- cover, visibility, line-of-fire, exposure, elevation, hazards, node status, path status, and status effects;
- objectives, clocks, alarms, reinforcements, extraction, and interactables.

<!-- source-slice: combat.core.defensive-display-spine -->
## 7. Defensive display spine
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.
Use this tactical display spine when a combatant needs a full profile:

```text
Health | System Integrity | Defense | Firewall | Mitigation | Shield
```

Use abbreviations only for compact display:

```text
HP/SI | DEF/FW | MTG | SHD
```

Working meanings:

- **Health**: organic, crew, or body tactical durability.
- **System Integrity**: machine, system, networked-body, cybernetic, shipboard, drone, or device tactical durability.
- **Defense**: baseline difficulty to hit or physically affect the target before cover and other situational defensive modifiers.
- **Firewall**: digital, cybernetic, network, system, or cognitive-security defense where relevant.
- **Mitigation**: armor, plating, suit protection, resistance, hardening, dampening, or equivalent harm reduction after Shield is handled.
- **Shield**: buffer, barrier, charge layer, drone shield, bubble, suit shield, or similar first-contact protection.

Not every actor needs every field displayed. Minor objects may only need Firewall plus System Integrity or a status. Disposable enemies may use abbreviated profiles.

## 8. Damage, status, and long-term crew-state grammar

Damage is broad degradation. It can be physical harm, system damage, suit compromise, cybernetic disruption, morale shock, signal contamination, or other fictionally appropriate pressure.

Damage does not automatically create a persistent injury. It may create Standard Status or Persistent consequences only when a tag, defined trigger, critical result, scenario rule, or Downed interaction says so.

Working grammar:

```text
Damage
Status
  Standard Status
  Persistent Status under long-term crew states
    - Persistent Health Status
    - Persistent Morale Status
    - Persistent Loyalty Status
```

Standard Status is the in-encounter status layer. Persistent is not a top-level status category; persistent effects live under long-term crew states such as Health, Morale, and Loyalty.

Confirmed conversion rule:

> If one effect both applies a Standard Status and Downs the target, that status becomes Persistent by default under the relevant long-term crew-state category, unless a specific rule says otherwise.

This conversion rule is strongest for PCs, crew, important NPCs, recurring enemies, captured characters, and other actors who may matter after the encounter.

<!-- source-slice: combat.core.durability-application-order -->
## 9. Durability application order
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.
`Combat` owns tactical application order only. Detailed gear balance belongs to `Equipment`.

Working order:

1. Shield, if present;
2. Mitigation, if applicable;
3. Health or System Integrity harm;
4. Downed, Disabled, Defeated, Routed, Wounded, Injury, permanent-loss, or critical-state procedure, pending actor type and final rules.

At 0 Health or 0 System Integrity:

- the actor enters **Downed** or **Disabled** state as appropriate;
- a **3-round countdown** begins;
- failure of the countdown creates a **critical state**, not automatic permanent death, destruction, or deletion;
- resolving all active threats counts as revival/restoration unless a specific scenario rule says otherwise;
- enemy minions may still be removed as Defeated, Routed, Disabled, or destroyed if the encounter procedure says they are not being tracked beyond the fight;
- boss, elite, crew, PC, important NPC, machine, system, or recurring actor should use the countdown/critical-state procedure unless a specific rule says otherwise.

Firewall is a parallel digital or cybernetic defense track for machines, systems, uploads, networked bodies, and cyber-conflict surfaces. Firewall checks can lead to System Integrity harm or System Status when the fiction and source rules support it.

If one effect both applies a temporary Standard Status and causes Downed or Disabled, that status becomes persistent by default under the relevant long-term category unless a specific rule says otherwise.

<!-- source-slice: combat.core.app-authority-state-mutation-boundary -->
### 9.1 App-facing authority and state mutation boundary
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.

Nexus uses an API DM for interpretation, narration, NPC response, scene feel, and flexible freeform play. The API DM does not become the final authority for combat legality, roll result, effect, state mutation, or committed truth.

Combat-facing authority should follow this boundary:

```text
Player and UI state intent.
API DM may interpret and narrate.
Rules Core validates and resolves mechanics.
Game State Store commits validated state changes.
Context Broker controls what the API DM can see.
UI / App Shell displays committed results.
```

No player statement, UI display, API DM narration, or context packet becomes combat truth until the correct authority validates, resolves, and commits it.

Use this distinction for app-facing rules and source-backed play aids:

```text
Effect = what mechanically happens.
StateDelta = what state changes because of it.
Committed state = validated StateDelta after the commit boundary.
```

An effect may describe damage, healing, movement, status application, resource change, objective progress, trace, exposure, suspicion, disposition, reveal, conceal, route change, map-option change, scheduled consequence, or other mechanical consequence. The effect itself is not committed state.

A state change must identify enough information to validate the mutation: target, state surface, operation, payload, visibility, source, and transaction/log reference where practical. Hidden consequences are still state. If they matter later, preserve them as committed hidden state, a scheduled effect, counter, clock, log, summary, or review flag rather than leaving them only in DM memory.

Draft mutable state surfaces include actor resources, actor health, System Integrity, action economy, position, status, inventory/equipment, Shield, Mitigation, map position, map options, cover/visibility, scene entities, objectives, clocks, counters, exposure, disposition, operational knowledge, relationships, faction state, hidden/internal state, scheduled effects, summaries, logs, and review flags. These names are source-facing categories, not final TypeScript names.

If a proposed state change cannot name an allowed surface, target, operation, and payload, it should not commit.

## 10. Stabilization and recovery boundary

Basic stabilization should not fail by roll when the helper has access, time/position, and the required broad item/tool. The roll, if any, should usually determine complication, speed, quality, cost, trace, exposure, or extra benefit, not whether obvious basic aid randomly does nothing.

Robust tactical healing, revival from Downed, permanent-loss prevention, cybernetic repair, emergency cryo, upload recovery, or Signal-anomaly recovery remain later system work and may require `Characters`, `Equipment`, `Lore`, or `Dashboards` input.

<!-- source-slice: combat.core.end-conditions -->
## 11. Combat end conditions
> [!note] Slice status — interpret under `CORE-SPATIAL-001`. Compatible combat mechanics survive, but Encounter-container, TacMap handoff, and alternating-activation claims in this slice are historical; Tactical Pressure and individual Initiative control.

Combat can end through victory, retreat, surrender, escape, objective completion, negotiation, collapse, timer resolution, enemy withdrawal, system shutdown, reinforcements changing the situation, or other consequences. Killing every enemy is only one possible end condition.

## 12. Display routing

This doc may mention the need to keep tactical state legible. It does not own DM chat formatting. Display rules belong in `Modes` and live tactical state presentation belongs in `Dashboards`.

## 13. Open items
Resolved for current Lattice integration:

- combat attack Target Score against Defense: `TS = 50 + Actor Bonus - (Defense - 15)`;
- Effective Defense: `Effective Defense = Defense + cover + situational defensive modifiers`;
- combat attack Target Score against Effective Defense: `TS = 50 + Actor Bonus - (Effective Defense - 15)`;
- Firewall Target Score: `TS = 50 + Actor Bonus - (Firewall - 15)`;
- result bands: Miss = roll > TS; Graze = margin 0-9; Hit = margin 10-69; Direct = margin 70+;
- durability order: Shield -> Mitigation -> Health/System Integrity;
- Downed/Disabled baseline: 0 Health or System Integrity creates a 3-round countdown; failure creates critical state, not automatic permanent death/destruction.

Still open:

- exact Health and System Integrity scale by actor type;
- exact Standard Status tag list;
- exact status duration and clearance rules;
- exact critical/status interaction rules beyond the Downed/Disabled conversion rule;
- whether "Severe" becomes a defined rule term beyond the Downed/Disabled + status conversion rule.
