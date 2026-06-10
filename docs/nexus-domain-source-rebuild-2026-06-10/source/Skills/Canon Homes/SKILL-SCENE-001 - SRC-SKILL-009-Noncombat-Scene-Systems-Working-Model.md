---
project: "Nexus"
doc_id: "SKILL-SCENE-001"
legacy_ids:
  - 'SRC-SKILL-009'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\10 Skills Resolution RNG rev0.5\SRC-SKILL-009 - Noncombat_Scene_Systems_Working_Model.md'
title: "Noncombat_Scene_Systems_Working_Model"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "canon_home"
topic_family: "noncombat_scene_systems_working_model"
owns_topics:
  - 'noncombat_scene_systems_working_model'
borrows_topics: []
created: "2026-05-21"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Noncombat Scene Systems Working Model

## 1. Purpose

This document installs the current working model for Nexus non-combat, social, infiltration, access, and pressure scenes into the Skills domain. It is not final math. It is the current working substrate for Seed ability work, DM playtest, and later Draft cleanup.

## 2. High-level model

A non-combat scene is organized around an actual blocker or goal, not around forcing a formal minigame onto every conversation.

```text
Mission / Node
-> objective
-> route structure
-> scene or interaction
-> Gate
-> ambient position systems
-> Op Knowledge
-> checks
-> costs / after effects
-> outcome
```

Primary scene objects:

- **Gate:** the actual blocker or interaction goal.
- **Disposition:** social/relationship/attitude pressure around a subject or group.
- **Exposure:** environmental, public, procedural, or formal visibility risk.
- **Op Knowledge:** acquired actionable information about how a subject, route, system, risk, or obstacle operates.
- **Costs / After Effects:** the lingering consequence or opportunity created by how the action was resolved.

## 3. Core rule: counters are ambient

Disposition and Exposure are always-present pressure systems, not mandatory mini-games.

Players may ignore them, reduce them, exploit them, trade against them, push through them, or route around them with Op Knowledge.

A scene Gate may usually be attempted at any counter state unless the fiction says otherwise. Counters modify risk, difficulty, options, cost, consequence, and cleanness of success. Counter reduction is one tactic, not a required step.

## 4. Check type separation

Outcome bands apply to the active check.

| Check type | Function |
|---|---|
| Gate Check | Resolves the objective or blocker. |
| Pressure Check | Resolves counter state, such as lowering Exposure or improving Disposition. |
| Setup Check | Resolves leverage, options, risk discovery, or Op Knowledge. |

A Pressure Check does not automatically resolve the Gate. A Gate Check does not automatically clear pressure.

## 5. Disposition

Disposition uses a 5-step scale for current playtest work.

```text
0 Open / Favorable
1 Neutral / Routine
2 Guarded
3 Suspicious / Resistant
4 Hostile / Opposed
```

Rules:

- Lower Disposition pressure improves options, difficulty, costs, and cleanness.
- Higher Disposition pressure worsens options, difficulty, costs, and cleanness.
- Hostile/Opposed does not automatically trigger escalation by itself.
- A hostile subject can usually still be walked away from if the crew has only talked.
- A suspicious subject can still be lied to, persuaded, bypassed, or leveraged; counter state shapes risk, not permission.

## 6. Exposure

Exposure uses a 5-step scale.

```text
0 Covered
1 Clean
2 Visible
3 Noticed / Questioned
4 Flagged / Triggering
```

Rules:

- Lower Exposure means better cover or lower formal consequence risk.
- Higher Exposure means greater chance of formal consequence.
- Exposure can change scene state when the fiction and system state support it.
- **Covered** may reduce Gate difficulty when the cover directly helps accomplish the action, not only when it hides consequences.
- The top end may trigger authority/security escalation when appropriate, such as a "cops are here" moment.

## 7. Exposure Tags / risk surfaces

Exposure Tags are broad scene risk surfaces, not skill lanes.

Current provisional tags:

- **Authorization:** whether the crew is allowed to be here, do this, carry this, access this, or pass this point.
- **Surveillance:** whether the scene can observe, identify, track, or reconstruct what the crew did.
- **Record:** whether the scene creates reviewable evidence after the moment has passed.
- **Witness:** whether people can remember, report, identify, misinterpret, or testify about what happened.
- **Patrol:** whether mobile or periodic attention can enter the scene, discover the action, or change timing.

Design rule:

> Exposure Tags should be broad enough that multiple skills, focuses, abilities, Op Knowledge routes, and planning approaches can interact with them.

Routine Patrol is not hostile by default. Routine Patrol becomes relevant through player action, Tempo, failed/partial checks, triggered attention, or scene advancement. Searching Patrol is different and may directly force response, raise pressure, or change state.

## 8. Risk discovery and Op Knowledge

Initial Exposure risk assessment is passive.

- All characters may be checked against all prepared risks, regardless of build.
- Obvious risks should almost always be detected cleanly.
- Subtle risks rely more on Perception or relevant expertise, but should not be so hard that low-Perception characters never discover the system.
- In ordinary scenes, most exposure risks should be spotted in some capacity during passive assessment.
- Difficult partial reveals should be reserved for deliberate exposure-subterfuge scenes.

Discovery is Op Knowledge when it gives actionable operating information.

Op Knowledge can:

1. skip a check;
2. lower difficulty;
3. open a new option;
4. reduce counter risk;
5. reduce or change cost.

Op Knowledge should scale by subject importance. Small, temporary subjects can stay as scene cues. Durable subjects such as major factions, locations, institutions, ships, or recurring actors can support visible dossiers.

## 9. Mission-scale planning

Planning can operate above a single scene.

A full planning/perception/Op Knowledge stack can attack the mission chain itself: learn custody, learn who can move the objective, learn what authority triggers transfer, create the right pressure, make the handoff routine, and have the objective delivered to the crew.

Guardrail:

> The player does not bypass because they say "I planned well." They bypass because they acquired and applied enough mission-scale Op Knowledge to account for blockers and exposure risks.

## 10. Cost slots

Current cost slots:

| Cost | Working meaning |
|---|---|
| Tempo | State may drift; the scene after the action is not guaranteed to match the state before it. |
| Material | A concrete resource is spent, lost, consumed, risked, damaged, or committed. |
| Obligation | Usually an upfront do-this-first trade. Future debt is rare and should have planned scope. |
| Trace | An adverse operational fact left behind by play that matters only when later player action intersects it. |

Tempo is not real time. It is state drift. Spending Tempo may make patrols relevant, let a subject reconsider, close/open an opportunity, or activate a latent risk.

## 11. Trace, Residue, and Opening

Trace is not "a record exists." A trail may support cover rather than hurt it.

Example of cover, not Trace:

```text
Crew is entered in the system as Heliomed maintenance.
Later they tell another guard they are Heliomed maintenance.
The record supports the claim.
```

Example of Trace:

```text
Crew is entered as Heliomed maintenance with an irregular override and no matching work order.
Later they rely on that cover where the irregularity can be checked.
The prior fact bites through Authorization or Record.
```

Trace only matters with:

```text
Holder
Fact
Later player-action intersection
Scope
Mechanical effect
```

Residue is a low-impact fact left in the scene that may matter later only if a later player action intersects it. Residue is not Trace yet, not fractional Exposure, and not half a tracker.

Player-facing phrasing should describe what the crew did, not what an NPC supposedly heard.

Example:

```text
Residue:
- Surface: Witness / Authorization
- Fact: We told this checkpoint guard we were Heliomed maintenance.
- Scope: this guard / this checkpoint / this node
- Trigger: we return to this guard, contradict the claim, ask the guard to support the claim, or use this claim where this guard is directly involved.
```

Opening is a changed opportunity or state the crew can use. Opening is not the same as Op Knowledge, though an Opening can generate Op Knowledge if it teaches a reusable fact.

## 12. After Effects and outcomes

After Effects are the lingering results of a check that are not the main Gate result.

Gate result asks: did you get the thing?

After Effects ask: what changed because of how you got it?

Positive After Effects include Opening, crew Op Knowledge, Covered state, improved Disposition, or a route opened.

Adverse After Effects include Residue, Trace, Exposure increase, worsened Disposition, route complication, cost bite, or tag bite.

Current 5-band outcome scale:

```text
Strong Success
Success
Partial Success
Failure
Hard Failure
```

Meanings:

- **Strong Success:** objective achieved plus positive After Effect.
- **Success:** objective achieved; no meaningful tracked downside.
- **Partial Success:** objective achieved plus one adverse After Effect.
- **Failure:** objective not achieved; scene remains playable and may have a light After Effect.
- **Hard Failure:** objective not achieved plus serious adverse After Effect or state change.

## 13. Bite families

A Bite is the adverse After Effect source that makes an outcome messy.

- **Tag Bite:** an active Exposure Tag becomes the source of complication.
- **Cost Bite:** Tempo, Material, Obligation, or Trace attaches.
- **Counter Bite:** Disposition worsens or Exposure rises.
- **Route Bite:** the Gate succeeds, but the route changes, narrows, delays, or creates a side Gate.
- **Op / Adverse Operating Bite:** an adverse entity now holds or embodies actionable operating information that makes later action harder if player action intersects it.

Use **Op** as Operating / Operational, not Opposition.

## 14. Playtest guardrails

- Do not imply real-time tracking.
- Do not let Routine Patrol punish mere presence.
- Do not trigger Residue or Trace through arbitrary offscreen DM decisions.
- Do not make Dirty/Partial results feel like constant penalties.
- Do not make player actions formal tags.
- Do not make Exposure Tags map one-to-one to skill branches.
- Do not make every lingering fact into Trace.
- Do not balloon play into endless follow-up encounters. Cost and trace mechanisms should remain bounded and serve a small number of major set pieces.

## 15. Parked items

- Exact roll math and threshold formulas.
- Ability rank structure where rank examples feel like separate abilities.
- Exact final Exposure Tag taxonomy.
- Player-facing scene-card format.

## 18. Lattice-100 noncombat resolution patch

Lattice-100 is the active provisional roll substrate for this working model.

Use the same Gate / Pressure / Setup split already defined in this document, then resolve the active check with the noncombat Lattice bands:

| Roll result | Band | Noncombat use |
|---|---|---|
| `failure margin 15+` | **Hard Fail** | The action fails and creates serious cost, exposure, complication, lost opportunity, worse state, or stronger opposition. |
| `failure margin 1-14` | **Fail** | The action fails, but consequences are limited, recoverable, or mostly informational. |
| `margin 0-14` | **Partial / Compromised Success** | The action succeeds with cost, trace, time loss, reduced effect, counter movement, narrower information, or a forced choice. |
| `margin 15-39` | **Success** | The action succeeds cleanly under expected conditions. |
| `margin 40+` | **Critical Success / Direct** | The action succeeds with superior effect, extra information, lower cost, cleaner trace, bypass, stronger leverage, or added opening. |

### 18.1 Counter interaction

Disposition, Exposure, Trace, and Op Knowledge do not have to become raw Target Score modifiers.

They may instead change:

- available options;
- permission;
- stakes;
- consequence severity;
- cost slots;
- risk visibility;
- whether a roll is needed;
- what a Partial or Hard Fail means.

### 18.2 DM Mode note

DM Mode must use this Lattice-facing interpretation during noncombat playtest. If the band language feels wrong in play, DM Mode should log the issue for Draft/Steward instead of silently reverting to another RNG.




