# Tactical_Pressure_Activation_and_Participation_Contract_rev0.1

Controlling issue: Define Tactical Pressure activation and participation #14
Parent map: Spatial Vertical Slice Map #57
Date opened: 2026-07-15
Scope: design contract only; no production implementation or canonical-source rewrite

## 1. Purpose

This contract defines how one persistent Location enters ordered time, selects relevant actors and timed pressures, establishes Initiative, changes participation, and applies the initial Surprise Evaluation and Surprised baseline without creating an Encounter container or copying Location state.

It specializes the accepted Nexus Game glossary and ADR baseline for the first spatial vertical slice. Rules Core and committed Game Truth remain authoritative; Generated Performance may propose bounded inputs but cannot activate Tactical Pressure, select participants, roll Initiative, or mutate sequencing state by narration.

## 2. Settled dependencies

The following remain controlling:

- Persistent Location continuity across Free Movement, Tactical Pressure, Turn-Based Mode, and Local Aftermath.
- Turn-Based Mode retains actor-owned AP, MP, reactions, and Micro-Interactions.
- Spatial actions use validated staged commits and observe mode changes only through deterministic system transactions.
- Every participating actor with a standard activation rolls individual Initiative.
- Enemy Tactical Directives may be proposed once at Tactical Pressure start, while deterministic local logic executes legal actions.
- Relevant canonical source indexed by `docs/nexus-game-source/source/SOURCE-INDEX.md` provides current product terminology, while accepted ADRs indexed by `docs/adr/README.md` preserve controlling decisions and rationale.

This contract does not rewrite `docs/nexus-game-source/source`. Conflicting source wording requires a separately authorized source-alignment task.

## 3. Activation authority

Tactical Pressure begins only when a validated authored or rules-derived Tactical Pressure Trigger changes from inactive to active in committed Game Truth.

A trigger belongs to an actor, hazard, objective, or committed state change and defines a concrete condition in which position, timing, or action order has become consequential. Generated Performance may propose a trigger for validation but cannot activate one through narration, inferred tension, or a generic declaration of danger.

When a committed action creates the trigger, that action commits first and the mode transition follows as its own deterministic system transaction. When the trigger becomes active before an uncommitted interaction stage resolves, the pending stage is cancelled and Turn-Based Mode begins from current committed Location truth.

### 3.1 Vertical-slice entry surface

The vertical slice exposes no manual Turn-Based Mode entry. Every transition into ordered play begins through a validated Tactical Pressure Trigger.

Any later manual entry feature must create a rules-native trigger and reuse this activation, participation, Initiative, timing, pause, exit, and save contract rather than add a second mode-transition path.

## 4. Tactical Participation

Active Tactical Pressure Triggers evaluate deterministic participant selectors against current Location truth. The resulting Tactical Participation is a projection containing:

- references to participating Location actors;
- deterministic timing entries for participating hazards; and
- deterministic timing entries for participating objectives.

Positions, resources, statuses, object state, hazard state, objective state, and other authority remain on their existing Location entities. Tactical Participation never copies them into a second roster or Encounter authority.

Proximity may be one authored selector, but proximity alone never enrolls every nearby entity. A sealed, unaware, causally disconnected actor remains outside Tactical Participation until a committed state change satisfies a selector.

Selectors are re-evaluated after committed transactions, never continuously from rendering frames. An entity joins when committed truth makes a selector include it. It leaves only when no active trigger selects it and it owns no unresolved timed effect or reaction.

### 4.1 Vertical-slice Field Team policy

When any Tactical Pressure Trigger becomes active, every deployed member of the three-character Field Team joins Tactical Participation regardless of their current Area. This prevents an unnoticed split from trapping the player in ordered play without a deployed Crewmate.

Field Team auto-inclusion is a replaceable participant-selection policy, not a second roster or a permanent prohibition on split-crew play. The same late-entry contract remains available for reinforcements and for a future split-crew policy.

### 4.2 Overlapping triggers

Every active Tactical Pressure Trigger inside one Location contributes to one continuous Tactical Pressure period. Tactical Participation and Timing Entries are the de-duplicated union of all active trigger selections.

Activating another trigger never creates a second Encounter-like sequence, restarts the round, rerolls existing Initiative, restores spent resources, or runs another Surprise Evaluation for existing participants. Newly selected actors use the late-entry rule and receive a Surprise Evaluation when the new trigger and their committed awareness state require one.

### 4.3 Passive bystanders

A Passive Bystander remains outside Tactical Participation and receives no Initiative or activation. The default presentation is to cower in place. The bystander remains an authoritative Location entity that can be targeted and affected by rules-native effects. An authored interaction such as rescue may commit the bystander's escape or removal from danger without first adding it to Tactical Participation. This contract does not require a general civilian movement, panic, or escort simulation.

## 5. Individual Initiative

Every participating actor with a standard activation makes one individual Lattice-100 Initiative Roll for the current Tactical Pressure. The d100 result maps to a four-step value: 01–25 = 4, 26–50 = 3, 51–75 = 2, and 76–100 = 1. The actor's Initiative Score equals that value plus its Dexterity modifier and Initiative bonuses. Actors are ranked from highest Initiative Score to lowest. This conversion keeps lower Lattice rolls favorable while preserving the compact Initiative range and Dexterity emphasis of the adopted team-initiative model.

The Dexterity modifier is consumed as derived rules data from the actor's Character Build Stack. Tactical State records the Initiative inputs and result required for deterministic resume but does not own or independently derive the actor's Attribute modifier.

An opposing tie favors higher Dexterity. If Dexterity is also equal, the tied opposing actors make visible unmodified d100 tie-break rolls. The lower tie-break result acts first; only an exact tie rerolls.

Consecutive same-alliance actors form a Shared Initiative Block. Their controller may interleave their individual movement and actions before advancing beyond the block. The rule applies symmetrically to every alliance. Each actor retains its own AP, MP, reactions, activation completion, and other resources. A Shared Initiative Block cannot cross another alliance or a hazard or objective timing entry.

A late entrant rolls Initiative when it joins and enters the existing order at its normal ranked slot. Joining never interrupts or replays the current activation. If the ranked slot remains ahead of the current turn cursor, the entrant may act in the current round; otherwise its first activation occurs in the next round. Joining alone grants no immediate action outside normal reactions or an explicit interrupt rule.

Hazards and objectives never make Initiative Rolls. Their authored Timing Entries participate in the same ordered sequence.

## 6. Hazard and objective Timing Entries

Only hazards and objectives that change with ordered time receive Timing Entries. A Timing Entry references the authoritative Location entity and declares its rank or phase, cadence, and existing rules-native effect or state advance.

The default Timing Entry resolves at the end of each round. An authored rule may instead place it at a fixed rank or make it one-shot, repeating, or conditional on a validated trigger. Passive objectives and hazards with no autonomous ordered-time behavior remain ordinary Location state without a Timing Entry.

Timing Entries make no Initiative Roll and receive no AP, MP, reaction, or other actor action resources. Their results pass through existing validation, Effects, StateDeltas, system transactions, and atomic commits. A committed timing result may cause Tactical Participation to be re-evaluated before the sequence continues.

## 7. Inactive Area pause

An Area is active during Turn-Based Mode when it contains a participating actor or falls within the active scope of a Timing Entry. Every other Area is inactive and holds its consequential simulation at committed Game Truth:

- nonparticipating actors do not move, choose actions, or advance local AI;
- local hazards, objectives, clocks, patrols, and interactions do not advance;
- ambient animation and audio may continue but cannot commit state; and
- an explicit Location-wide Timing Entry may still target the Area through normal rules.

Because all three deployed Field Team members auto-participate in the vertical slice, their occupied Areas remain active. If a committed change or Timing Entry makes another Area relevant, that Area resumes from its exact committed state and participation selectors are re-evaluated.

## 8. Surprise Evaluation and Surprised baseline

A Surprise Evaluation occurs when a Tactical Pressure Trigger first selects an actor. It compares the trigger with committed awareness state and immediately applies Surprised when the actor did not detect or anticipate the pressure. The actor still joins Tactical Participation and rolls Initiative. From condition application until the end of its skipped first activation, it cannot act or react; the condition expires when that activation ends.

Awareness, traits, equipment, or explicit immunity may prevent Surprised. Surprise Evaluation is never inferred from narration and never becomes a side-wide round that omits individual Initiative.

## 9. Deterministic exit

Every Tactical Pressure Trigger declares a rules-evaluable clear condition. After each committed transaction, Rules Core re-evaluates all active triggers against the new Location truth.

Tactical Pressure ends at the first post-commit evaluation where every trigger is clear. The current atomic transaction and any already-fired reactions finish first. Remaining unused activations and pressure-bound Timing Entries are cancelled, then a deterministic system transaction moves the same Location into Local Aftermath.

The exit rule does not require victory, defeated opposition, or completion of a conventional objective. Escape, negotiation, stabilization, surrender, objective completion, or another committed result may clear pressure. Hostilities ending does not clear a still-active environmental emergency, pursuit, countdown, or contested objective.

An independently scheduled consequence that survives beyond Tactical Pressure remains in Location truth under its existing rules; cancelling pressure-bound sequence entries does not erase committed state or unrelated schedules.

If a Tactical Pressure Trigger activates after every prior trigger has cleared, it begins a new Tactical Pressure period rather than resuming the closed sequence. Rules Core rebuilds participation from current committed Location truth, every participating actor rolls fresh Initiative, the sequence starts at round 1, and a fresh Surprise Evaluation uses the new trigger and current awareness state.

## 10. State and save ownership

Campaign Save owns the serialized session envelope. The active Location owns one Tactical State component containing:

- active Tactical Pressure Trigger references;
- Tactical Participation references;
- Initiative results, ordered entries, Shared Initiative Blocks, round, and cursor;
- Timing Entry references and sequence progress;
- active and inactive Area references; and
- the applicable rules-policy revision.

Rules Core reads and updates Tactical State through validated system transactions. Actor positions, health, resources, statuses, knowledge, and activation resources remain actor state; hazards and objectives retain their own state; objects and geometry remain Location entities; consequences and schedules retain their existing owners.

Campaign Save serializes Tactical State as part of the active Location snapshot. Tactical State is neither a standalone save nor a runtime-only cache, and it never becomes an Encounter container or copied world model.

## 11. Replaceable rule policies

The vertical-slice Field Team auto-inclusion, inactive-Area evaluation, Surprise Evaluation and Surprised behavior, Initiative procedures, and Timing Entry defaults are supplied through a versioned Tactical Rules Policy consumed by Rules Core rather than scattered combat-specific conditionals. The policy provides deterministic inputs and outputs for participant selection, Initiative ranking and tie resolution, Shared Initiative Blocks, late entry, Area activation, Surprise Evaluation and the Surprised lifecycle, and Timing Entry defaults. Implementations may group these seams and need not create a separate abstraction for every rule.

Changing a policy cannot create a competing state authority, reinterpret committed history, or silently alter an in-progress save. Persisted play records the applicable rules-policy revision required to resume and replay the sequence deterministically.

## 12. Acceptance scenario

The vertical slice must support this complete sequence through ordinary validated commits:

1. A hostile trigger activates while the deployed three-character Field Team is split across Areas. All three join Tactical Participation, while a nearby Passive Bystander cowers without entering Initiative.
2. Participating actors roll individual Initiative and consecutive same-alliance entries form Shared Initiative Blocks.
3. A reactor-failure trigger activates during the fight. It joins the same Tactical Pressure period, contributes an end-of-round Timing Entry, and does not reroll existing Initiative.
4. A reinforcement becomes relevant after a committed change, rolls as a late entrant, and joins without interrupting or replaying the current activation.
5. Enemy surrender clears the hostile trigger, but the reactor trigger remains active, so Tactical Pressure continues.
6. Stabilizing the reactor clears the last trigger. The current atomic transaction and already-fired reactions finish, unused activations and pressure-bound Timing Entries cancel, and the Location enters Local Aftermath.
7. A later ambush activates a new Tactical Pressure period with rebuilt participation, fresh Initiative, round 1, and a fresh Surprise Evaluation.
