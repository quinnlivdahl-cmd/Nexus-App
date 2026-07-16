---
project: "Nexus"
doc_id: "COMBAT-ACTION-001"
legacy_ids:
  - 'SRC-COMBAT-003'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-003 - Action_Economy_and_Reactions.md'
title: "Action_Economy_and_Reactions"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_canon"
placement_domain: "Combat"
content_role: "canon_home"
topic_family: "action_economy"
owns_topics:
  - 'action_economy'
  - 'reactions'
  - 'movement_anchors'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active action-economy baseline without relying on package-era framing."
---

# Action Economy and Reactions

## 1. Current baseline

The current v0.1 combat benchmark is:

- **2 AP** per standard activation;
- **MP from Speed** as free movement points during activation;
- **one reaction permission / prepared reaction surface** when available;
- **one free micro-interaction** for small objective, door, handoff, touch, or quick physical interaction moments by DM judgment.

This supersedes treating full three-action economy as the default. Three-action and major/minor/reaction models remain comparison or fallback structures.

"Default" means upgradeable baseline, not a permanent hard cap. Traits, gear, cyberware, powers, statuses, enemy rules, encounter rules, or scenario procedures may create exceptions when explicitly granted.

## 2. Core movement rule

Speed grants free movement points each activation. A path's base distance converts to MP cost before modifiers.

Characters may spend AP, use skills, use gear, accept risk, exploit traits, or trigger abilities to move farther, reduce path costs, cross dangerous paths, or interact with hazards.

## 3. AP cost spine

| Action family | Draft default cost |
|---|---:|
| Attack | usually 1 AP, once per activation by default |
| Offensive Tech / offensive system action | usually 1 AP, follows attack-style limits unless excepted |
| Aim | 1 AP |
| Suppress | 1 AP |
| Assist | 1 AP |
| Scan | 1 AP |
| Defend / Guard Self | 1 AP |
| Screen Space | 1 AP |
| Stance | 1 AP by default |
| Ready | 1 AP by default, permission-gated |
| Dash | 1 AP |
| Shove | likely 1 AP, tuning pending |
| Utility | tag/context |
| Reset | tag/context |
| Sprint | usually 2 AP / full activation commitment |
| Heavy attack / major ability | may cost 2 AP |

## 4. Attacks and offensive tech parity

Most attacks cost 1 AP, but a character can make only one offensive attack per activation by default. Some weapons, heavy attacks, abilities, statuses, cybernetics, traits, or enemy effects may modify that limit.

Offensive Tech, hostile cyberware actions, turret commands, system attacks, combat hacks, Signal-driven attacks, or similar offensive actions obey the same action-economy limits as attacks unless a rule explicitly says otherwise.

The second AP exists to create tactical choice: aim, move, scan, assist, defend, suppress, interact, reload, prepare, or reposition rather than default double-attacking.

## 5. Sequential actions and simultaneity

Actions are normally sequential. When a character spends AP to shoot, hack, shove, stabilize, move, scan, or interact, that action resolves as an action rather than as several simultaneous full actions.

If a power seems to make two things happen at once, frame it as one of the following unless the rule intentionally breaks the baseline:

- automated process;
- preloaded action;
- triggered effect;
- passive effect;
- prepared stance/reaction;
- gear/cyberware module;
- scenario effect;
- multi-step action with a setup/payoff structure.

## 6. Dash and sprint

Dash is a modifiable flat movement boost. Earlier working example: 1 AP for +3 movement points. By default, a character who Dashes cannot make offensive attacks later in that activation.

Sprint is a major movement commitment, usually 2 AP or a full activation. Sprint is for major repositioning, escape, objective races, dangerous route crossing, chase movement, carry movement, hazard crossing, or extraction. By default, sprinting leaves no additional AP.

Possible future Sprint tags include Objective Sprint, Carry Sprint, Hazard Sprint, Escape Sprint, Chase Sprint, and Zero-G Sprint. These tags are preserved as design hooks, not final rules.

## 7. Movement anchors

Movement anchors are deferred tags that describe when an action can be used relative to movement.

Possible anchor tags:

- **Pre** - must happen before movement;
- **Post** - must happen after movement;
- **Full** - consumes or dominates the activation;
- **No Anchor** - can occur at any legal point in the activation;
- **Conditional** - timing depends on trigger, target, gear, stance, or scenario.

Do not overbuild anchor tags until action cards/templates need them.

## 8. Flexible tactical actions

### Aim

Aim spends action economy to improve attack quality, offset distance, improve line of sight, or prepare a precise shot. Exact numerical effect is pending.

### Suppress

Suppress applies pressure to passages, exposed spaces, targets, or objective interaction. It should create tactical control, not only damage.

### Assist

Assist spends action economy to improve another character's action, protect them, coordinate fire, help with an objective, or support movement.

### Scan

Scan reveals or clarifies targets, hazards, passages, sensors, hidden systems, objective states, enemy roles, or hackable surfaces.

### Utility / reset

Utility and reset actions are tag- and context-dependent. They cover reloads, equipment readiness, stance changes, tool setup, stabilizing, clearing a problem, or similar actions when not handled by micro-interaction.

## 9. Defend, Guard Self, Screen, Protect, and defense stack

`Combat` accepts a restrained version of the defense stack idea.

Working constraint:

- one active personal defense action or stance at a time;
- cover still applies automatically from authored Cover Positions, geometry, occlusion, elevation, and line of attack;
- Guard Self includes active Take Cover behavior;
- Screen Space is the baseline spatial/team defense: it protects an Area, passage, or approach rather than one ally directly;
- ally protection exists through Assist, Protect, Interpose, gear, traits, or abilities when explicitly granted;
- deeper stacked defense math remains unresolved.

Guard Self can layer immediate defense at the cost of offensive momentum, but should not become a bookkeeping-heavy stack until playtested.

## 10. Stances, reactions, and Ready

Stances are the default source of tactical reactions. A stance costs 1 AP by default and defines what triggers and reaction permissions are available until the character's next activation.

| Stance | Identity | Reaction family |
|---|---|---|
| Overwatch | fire / movement control | punish movement, exposure, watched routes, objective interaction |
| Anchor | territory / protection / resistance | hold Areas, passages, objectives; protect nearby allies; resist shove, blast, displacement |
| Skirmish | reactive repositioning | slip away, reposition, retreat from collapse, exploit movement openings |

Stances are not simply reaction versions of active actions. They are prepared combat postures.

A character spends a reaction only when they have permission from a stance, Ready action, feature, gear, cyberware, scenario rule, enemy rule, emergency rule, or other explicit trigger.

Ready remains a possible action surface, but its final procedure is not locked. It should not replace stances wholesale unless later testing proves stances too narrow.

## 11. Micro-interaction

The free micro-interaction is intended for small actions that keep objective play from collapsing under AP cost. Examples include touching a door panel, handoff, grabbing a small item, quick carry adjustment, minor button press, or very simple objective tap.

A micro-interaction is not a full hack, full attack, full scan, complex device operation, forced movement, stabilization, major objective action, or anything that should meaningfully compete with AP.

Objective-progressing micro-interaction should normally be limited and should not bypass AP costs freely. If a tiny objective tap is allowed as a micro-interaction, it should be because the interaction is genuinely small, the encounter was built for it, or a feature/scenario explicitly permits it.

Remote micro-interaction requires permission from a tool, drone, hack, sensor link, remote limb, pre-placed device, authorized system route, body/chassis capability, or Signal/Contact effect.

<!-- source-slice: combat.actions.freeform-and-linked-commits -->
## 12. Freeform and proximity actions

The player may express an action through an authored Context Action or through freeform intent. A freeform action does not create a separate rule system: the interpreter composes existing movement, interaction, check, attack, ability, equipment, resource, and consequence rules into a bounded proposal. During Turn-Based Mode, an improvised consequential action remains subject to the normal AP, MP, offense, reaction, range, target, and legality rules. This reconciles [ADR-0076](../../../../adr/0076-freeform-actions-use-existing-rules-beyond-authored-actions.md).

If an action requires proximity, the runtime stages automatic approach movement and the intended interaction as linked steps under one Player Intent. Movement becomes persistent Location truth as it occurs and is never rolled back. On arrival, the interaction is revalidated and commits atomically only if still valid. Interruption, a stale or blocked target, or Tactical Pressure beginning does not undo completed movement; an uncommitted Free Movement interaction is discarded, and the changed situation requires a fresh player choice. Turn-Based Mode accounts for movement and other costs through normal AP, MP, reaction, and sequencing rules. Only an explicitly defined compound action may make movement and effect genuinely indivisible. This reconciles [ADR-0074](../../../../adr/0074-proximity-actions-use-linked-staged-commits.md).

Clarification is a rare player-agency safeguard, used when materially different legal interpretations would create meaningfully different consequences and the player's intent cannot be safely inferred. The runtime otherwise proceeds with the least surprising valid interpretation. During Free Movement, a routine, reversible interpretation with no meaningful Check, scarce cost, known material risk, or irreversible consequence executes without confirmation. If any of those stakes are present, Nexus previews the acting character, target, approach, costs, applicable Check and Target Score, and known immediate stakes, then requires confirmation. Turn-Based Improvise always previews its interpretation and tactical cost. Hidden information stays hidden. This reconciles [ADR-0075](../../../../adr/0075-clarification-is-a-rare-player-agency-safeguard.md) and [ADR-0077](../../../../adr/0077-freeform-actions-confirm-only-consequential-interpretations.md).

## 13. Open items

Still open:

- exact Dash value;
- exact Sprint procedure;
- final Ready action template;
- final Screen Space numbers and label;
- reaction refresh timing;
- whether objective-progressing micro-interaction needs a per-round limit;
- action-card anchor tags and whether templates should display them.
