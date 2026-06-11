# Nexus Game System Schema Definition Working Draft

Status: working draft / preservation + contract scaffold  
Date created: 2026-06-10  
Origin chat: `Draft — Game Systems Construction Order — 2026-06-10`  
Primary mode: Draft  
Repository role: app-facing game-system contract staging document  
Canon status: not source canon; not live `00 Source`; not final implementation contract  

## 0. Purpose

This document is the evolving draft workspace for Nexus app-facing game-system schema and contract definition.

It exists because the game system design sequence will require multiple Draft/Steward chats. Future chats should update this file rather than creating separate one-off preservation packets for each chat.

Later, Codex may use this document as a staging artifact to update proper source files and/or implementation contract files. Until then, this document preserves accepted working prose, open questions, and schema sequence decisions.

## 1. Placement / routing

Intended placement:

- Repo draft path: `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- Future source routing: Draft/Steward Review before promotion into live domain-first source.
- Related issue sequence: #33, #34, #35, #36, #38, #39, #40, #41.

What this supplements:

- GitHub issue #33: game-rule/system sequencing epic.
- GitHub issue #34: API DM / rules-core authority split.
- GitHub issue #38: rules object model.
- Existing noncombat scene, TacMap, content, and skill/revealed-option source context.

What this replaces:

- Nothing yet.

Deletion / archive guidance:

- Do not delete, overwrite, or supersede prior Nexus source based on this file alone.
- This file is a staging draft and preservation artifact.
- Old files may only be replaced after Codex/local source workflow verifies coverage and promotes changes deliberately.

## 2. Construction sequence scaffold

Current schema/contract construction order:

```text
Authority split
→ turn transaction
→ state lanes
→ rules object contracts
→ check families
→ effect/state-delta grammar
→ context broker
→ character/progression schema
→ ability schema
→ A1 replacement docs
→ thin implementation slice
→ content systems
```

### 2.1 Current position

Current position: **Authority Split / Rules Object Contract prework**.

We began with the API DM / rules-core authority split. The discussion showed that the authority split cannot be written cleanly without first naming how DM fiction, player claims, scene entities, action surfaces, map options, and action tags enter play.

This document therefore contains early object-model material that belongs near #34 and #38, but it does not complete either issue.

### 2.2 Not yet completed

The following are not complete:

- API DM / rules-core authority split.
- Turn transaction.
- State lanes / mutation boundaries.
- Full rules object model.
- Check family contract.
- Effect / state-delta grammar.
- Context broker contract.
- Character/progression schema.
- Ability schema.
- A1 replacement structure.

## 3. Current accepted working decisions

### 3.1 API DM / rules-core authority

Accepted working rule:

> The API DM may interpret player intent, frame scenes, invent narrative detail, create NPC speech/reactions, and introduce locations or fictional elements within defined scenario/rules boundaries. It may not create final mechanical truth. The app rules core remains sole authority for legality, cost, modifiers, rolls, result bands, effects, state deltas, and mechanical logs.

Key distinction:

- DM-created fiction = narrative, description, NPC behavior, room flavor, local complications, improvised scene dressing.
- Rules-core mechanical truth = position, node access, HP/SI/AP/MP, exposure changes, inventory changes, statuses, clocks, damage, check results, legal action options.

### 3.2 Combat/tactical space authority

Accepted working rule:

> Combat/tactical spaces use pre-generated base maps. The API DM may flavor those maps, describe them, and narratively dress them, but may not create new tactical nodes, cover, routes, hazards, objectives, or mechanically usable combat geometry unless the app/rules layer provides or validates them.

Tactical mapped play boundary:

- Map Options dominate.
- The map/source/app presents the primary available options.
- DM narration should clarify and flavor those options, not multiply them.
- The DM should not create a second invisible map through narration.
- Cover, line-of-fire, hazards, objectives, and major tactical options should be predefined by the TacMap/base-map/dressed-map or validated before encounter play.

### 3.3 Noncombat text-space authority

Accepted working rule:

> Noncombat spaces are looser for now. The API DM may invent coherent text-based spaces, rooms, corridors, offices, crowds, shops, alleys, etc., provided they remain consistent with the scene, source constraints, and prior established facts. Any DM-invented object, person, route, clue, terminal, lock, hazard, or opportunity that becomes mechanically relevant must resolve through defined rules or systems.

### 3.4 Player Claims

Accepted working rule:

> The DM does not merely classify things it already described. The player may assert a plausible object, feature, route, or function. If it is reasonable that the thing would exist, the DM must judge coherence and classify it if possible, rather than requiring the thing to have been pre-described.

Player Claims are allowed in both noncombat text play and mapped play. Mapped tactical play is stricter because the map should provide the main option surface.

A Player Claim does not automatically become mechanically real. It must be classified and validated before it can affect game state.

## 4. Accepted vocabulary

### 4.1 Scene Detail

A **Scene Detail** is fictional description.

- May be DM-invented.
- Does not imply mechanical permission.
- Example: `The corridor smells like hot insulation.`

### 4.2 Player Claim

A **Player Claim** is a player-proposed possible fact, object, route, feature, or function.

Examples:

- `Is there a service panel here?`
- `Would this kind of station have maintenance lockers?`
- `Can I find a staff-only route?`

The DM may accept, deny, narrow, or classify a Player Claim based on coherence and rule/system support.

### 4.3 Scene Entity

A **Scene Entity** is a thing in fiction/map.

Examples:

- terminal
- guard
- door
- locker
- vent
- pipe
- drone
- crowd
- fire
- locked path

### 4.4 Action Surface

An **Action Surface** is a specific rules-valid way to act on a Scene Entity.

Examples:

- unlock door
- scan logs
- spoof credential reader
- disable alarm
- search locker
- persuade guard
- use vent route

Boundary:

> The entity is not “interactable.” The entity may expose specific Action Surfaces.

### 4.5 Map Option

A **Map Option** is a player-facing option already represented by the tactical or nonviolent map.

Examples:

- node
- path
- cover marker
- terminal
- door
- hazard
- objective
- NPC position
- route marker
- evidence marker
- side opportunity marker

In mapped tactical situations, Map Options dominate. DM narration should clarify them, not multiply them.

## 5. Action Surface trigger

Accepted working rule:

> A Scene Detail, Player Claim, or Map Option becomes an Action Surface only when it can affect player choice through a defined action, skill hook, check, cost, risk, route, objective, reward, clue, status, counter, or state change.

Clarifications:

- Decorative map/background detail does not automatically become an Action Surface.
- Deliberately presented Map Options usually are Action Surfaces because they affect movement, cover, visibility, objective work, hazards, routing, or tactical decisions.
- DM narration should not create a hidden second map.
- In tactical mapped play, the map remains the primary option surface.

## 6. Origin and validation metadata

“Authority State” was rejected as too weak.

Replacement:

```text
Origin
Validation State
```

These are **transaction/log metadata**, not gameplay tags.

### 6.1 Origin

Origin records where the Action Surface entered play.

Examples:

- Prepared — came from source/app/mission/map content.
- DM-Established — DM created it during narration.
- Player-Claimed — player proposed it as a plausible thing.
- Derived — created by a prior rule result, check, effect, or state delta.

### 6.2 Validation State

Validation State records how mechanically real the surface is right now.

Examples:

- Fictional Only — exists in narration, no mechanics yet.
- Proposed — may become actionable, pending classification.
- Classified — assigned to a system surface/action route.
- Validated — rules/app accepts it as usable.
- Committed — it changed durable/encounter state.

Accepted boundary:

> Origin and Validation State are transaction/log metadata, not gameplay tags. They track how a proposed Action Surface entered play and when it became mechanically usable. They do not live as permanent player-facing tags unless needed for debugging, replay, audit, or contradiction handling.

## 7. Internal hierarchy

Accepted internal hierarchy:

```text
Scene Entity
→ Surface Category
→ Local Surface Detail
→ Action Attempt
```

This hierarchy is an internal classification model, not a player-facing or DM-facing checklist.

### 7.1 Layer meanings

- Scene Entity = thing in scene/map.
- Surface Category = broad rules-facing interaction family.
- Local Surface Detail = fictional/content expression of that surface.
- Action Attempt = what the player tries now.

### 7.2 Anti-bloat rule

During play, DM Mode should usually compress the model into natural language.

Internal model example:

```text
Scene Entity: Security Terminal
Surface Categories:
- Gate Surface
- Information Surface
- Record / Surveillance Surface
- System Status Surface

Local Surface Details:
- pressure-door permissions
- patrol schedule
- camera feed
```

Player-facing example:

> The security terminal is live. It looks like it controls the pressure door, local camera feed, and station access records.

The player does not need to see the taxonomy unless mechanical clarity is needed.

## 8. Closed registries, flexible play

Accepted working rule:

> Closed registry applies to Surface Categories and Action Categories. Player wording stays freeform, but it must map to a defined Action Category.

Closed:

- Surface Categories.
- Action Categories.

Flexible:

- Scene Entities.
- Local Surface Details.
- Player Claims.
- Action Attempts.

Surface Categories define what the action affects. Action Categories define what kind of action is being attempted. Player wording maps onto those categories rather than creating ad hoc actions.

A terminal should not always be limited to a fixed set of actions, but player attempts should fall into defined tagged categories that can be modified by abilities, effects, tools, counters, or conditions.

## 9. Provisional registry policy

Accepted working rule:

> We may create provisional category registries now. A later pass must add, merge, remove, rename, and refine them after testing against actual scenes, abilities, and app implementation.

The current category axes are provisional rev0.1.

## 10. Tag category axes rev0.1

Accepted axes:

```text
Entity Class
Entity Type
Entity Properties
Surface Category
Action Category
Skill / Ability Hooks
```

Important note:

- We are defining category axes, not every tag yet.
- Stress tests only check whether these axes work.

### 10.1 Entity Class

Accepted definition:

> Entity Class = the broad family of scene/map thing being referenced. It tells the app, DM, and rules layer what kind of object/person/system/location feature this is before narrower type or properties are applied.

Examples:

- Barrier
- Interface
- NPC

### 10.2 Entity Type

Accepted definition:

> Entity Type = the specific kind of thing within an Entity Class. It narrows the broad family into a usable object/person/system subtype.

Examples:

```text
Entity Class: Barrier
Entity Type: Door / Hatch / Bulkhead / Gate

Entity Class: Interface
Entity Type: Terminal / Console / Control Panel / Credential Reader

Entity Class: NPC
Entity Type: Guard / Clerk / Patrol / Witness / Technician
```

### 10.3 Entity Properties

Accepted definition:

> Entity Properties = traits or conditions on a Scene Entity that constrain what surfaces/actions are plausible, available, hidden, risky, easier, harder, or blocked.

Examples:

- Locked
- Sealed
- Networked
- Alarmed
- Watched
- Logged
- Credential-Gated
- Damaged
- Jammed
- Hostile
- Portable
- Reinforced

Boundary:

> Entity Properties do not define actions by themselves. They shape eligibility, difficulty, visibility, risk, and consequences.

### 10.4 Surface Category

Accepted definition:

> Surface Category = the kind of game outcome or system surface an interaction touches.

Examples:

- Gate
- Route
- Information
- Record
- Surveillance
- Alarm
- Pressure
- Hazard
- Objective
- System Status
- Resource
- After Effect

Boundary:

> Surface Category answers “what part of the game can change?” Action Category answers “what is the player trying to do?”

### 10.5 Action Category

Accepted definition:

> Action Category = the defined rules-facing action type that a freeform player attempt maps onto.

Examples:

- Access
- View
- Search
- Edit
- Spoof
- Disable
- Repair
- Force
- Bypass
- Persuade
- Deceive
- Intimidate
- Trade / Bribe
- Move / Traverse
- Secure / Carry
- Treat / Stabilize
- Damage / Destroy

Boundary:

> Player wording can be flexible, but resolution must map to an Action Category so abilities, penalties, tools, counters, and effects have defined handles.

### 10.6 Skill / Ability Hooks

Status: not accepted yet.

This was raised but paused because it may be jumping the gun. It should be reconsidered only after deciding whether it is needed to close the tag-axis model or whether authority split should be completed first.

## 11. Stress tests accepted as stress tests only

These stress tests were used to validate the axes. They are not final registry definitions.

### 11.1 Barrier stress test

Status: accepted as good rev0.1 pressure test.

Entity split:

```text
Entity Class
→ Entity Type
→ Entity Properties
→ Surface Categories
→ Action Categories
```

Entity Class:

- Barrier

Barrier Types:

- Door
- Hatch
- Bulkhead
- Gate
- Barricade
- Panel
- Wall
- Window
- Checkpoint

Barrier Properties:

- Locked
- Sealed
- Manual
- System-Controlled
- Reinforced
- Pressure-Rated
- Transparent
- Alarmed
- Watched
- Jammed
- Breachable
- One-Way

These inform possible surfaces/actions, but are not actions themselves.

Eligible Surface Categories:

- Gate
- Route
- System Status
- Hazard
- Alarm
- Record
- Objective

Action Categories:

- Access
- Force
- Bypass
- Disable
- Repair
- Spoof
- Secure
- Damage
- Scan/View
- Traverse

Cover correction:

> Cover should not be casually generated from barrier classification. Cover is a TacMap-defined relationship, not a free inference from any barrier. A barrier may be cover only when the TacMap/base map/dressed map explicitly defines it as cover or line-of-fire modifier.

Do not use Line/Cover Surface as a default Barrier surface.

Use map-level relationships instead:

- No Cover
- Half Cover
- Full Cover
- Visibility Block
- Line-of-Fire Block

That belongs to the map, not the barrier registry by default.

Freeform to encounter transition:

> A scene may begin as freeform exploration on a pre-dressed TacMap. If combat or a formal encounter triggers, the already-dressed map becomes the encounter map. Cover, routes, hazards, objectives, and important Map Options should already be defined or validated before the encounter begins.

This prevents:

```text
DM freeforms room
→ combat triggers
→ DM suddenly invents cover geometry
```

Instead:

```text
base TacMap
→ DM/source dressing
→ freeform exploration
→ encounter trigger
→ same map becomes tactical
```

### 11.2 Terminal / Interface stress test

Status: accepted as good rev0.1 pressure test.

Entity Class:

- Interface

Entity Types:

- Terminal
- Console
- Control Panel
- Access Kiosk
- Security Station
- Medical Station
- Engineering Panel
- Ship System Interface
- Network Node
- Credential Reader

Entity Properties:

- Networked
- Local-Only
- Credential-Gated
- Admin-Gated
- Read-Only
- Write-Capable
- Alarmed
- Watched
- Logged
- Encrypted
- Damaged
- Jammed
- Firewalled
- Hostile
- Portable
- Public
- Restricted

Eligible Surface Categories:

- Gate
- Information
- Record
- Surveillance
- Alarm
- System Status
- Objective
- Resource
- Pressure
- Hazard

Action Categories:

- Access
- View
- Search
- Copy
- Edit
- Spoof
- Disable
- Repair
- Trace
- Lockout
- Reroute
- Authorize
- Trigger

Stress finding:

> “Hack” should not be the action category. It is probably a method/skill lane. The actual action category is more like Access / View / Edit / Spoof / Disable / Copy / Trace / Lockout. That gives abilities real handles.

### 11.3 Guard / NPC stress test

Status: accepted as good rev0.1 pressure test.

Entity Class:

- NPC

Entity Types:

- Guard
- Gatekeeper
- Clerk
- Technician
- Patrol
- Witness
- Authority Figure
- Civilian
- Faction Agent
- Prisoner / Captive

Entity Properties:

- Armed
- Alert
- Distracted
- Hostile
- Routine
- Suspicious
- Bribable
- Intimidatable
- Credential-Checking
- Witness-Capable
- Radio-Linked
- Patrol-Linked
- Faction-Tied
- Injured
- Scared
- Busy

Eligible Surface Categories:

- Gate
- Information
- Pressure
- Record / Witness
- Alarm
- Objective
- Route
- Resource
- After Effect

Action Categories:

- Talk
- Persuade
- Deceive
- Intimidate
- Bribe / Trade
- Distract
- Observe
- Question
- Command
- Bypass
- Subdue
- Threaten
- Recruit
- Escort

Stress finding:

> NPCs expose social and procedural surfaces, not just “conversation.”

### 11.4 Discarded drift

The Container / Locker / Cache pass was a drift.

Status:

- Do not treat it as accepted.
- Do not preserve it as a decision.
- It may be revisited later only if needed for a formal registry stress test.

## 12. Open issues / next decision

### 12.1 Immediate open question

Skill / Ability Hooks remains unaccepted.

Question for next chat:

Should the next step be:

A. finish the API DM / rules-core authority split contract now; or  
B. finish the final axis definition for Skill / Ability Hooks only enough to close the tag-axis model, then return to authority split?

Recommended handling:

> Finish the API DM / rules-core authority split first, unless Skill / Ability Hooks is required to prevent ambiguity in the authority contract.

### 12.2 Future update rule

Future chats should update this file directly rather than creating a new preservation file for the same schema-definition effort.

Each update should add:

- date
- mode/chat name
- accepted decisions
- rejected/drifted material
- open questions
- intended next decision

## 13. Next-chat operating notes

- Be concise.
- One decision at a time.
- Do not continue broad registry drafting.
- Do not treat stress tests as final definitions.
- Do not draft A1 replacement yet.
- Do not draft ability trees yet.
- Do not draft final source docs until the contract shape is stable.
- Prod mushy wording.
- When the user expands, use it as context for the next narrow decision.

## 14. Update log — 2026-06-10 — Draft — Game System Schema Continuation

### 14.1 Accepted sequencing decision

Accepted decision: proceed with **A. finish the API DM / rules-core authority split contract now**.

Reason:

- Skill / Ability Hooks is not required to finish the authority split.
- The authority split only needs a placeholder boundary for hooks: the API DM may suggest that a skill, ability, tool, or character feature seems relevant, but the app/rules core decides whether that hook is valid and what mechanical effect it has.
- Defining a hook registry now risks jumping into ability schema before turn transaction, state lanes, rules object contracts, check families, and effect/state-delta grammar are stable.

Status notes:

- This supplements #34 and #38.
- It does not replace existing source files.
- Skill / Ability Hooks remains unaccepted as a registry axis definition beyond the placeholder authority boundary above.
- Old files may not be deleted or superseded based on this update alone.

### 14.2 Intended next decision

Next narrow decision: define the authority split in terms of **who may propose, who may validate, who may resolve, and who may mutate state**.

### 14.3 Accepted Context Broker boundary

Accepted decision: include **Context Broker** as a fifth authority-role in the authority split, but only as context authority.

Working definition:

> The Context Broker decides what context the API DM sees. It does not decide legality, rolls, effects, state deltas, or final truth.

Implementation note:

- Context Broker does not have to be a separate external API.
- It may be app-side scripts/functions, indexes and retrieval rules, cached summaries, prompt assembly logic, or later a separate service/API if useful.
- Its expected value is to reduce prompt bloat and likely reduce API cost by sending compact relevant context instead of broad game state, rules, lore, and history.

Status notes:

- This supplements #34 and later #41.
- It does not replace existing source files.
- Context Broker is not mechanical authority.
- Old files may not be deleted or superseded based on this update alone.

### 14.4 Accepted Game State Store term and boundary

Accepted decision: use **Game State Store** as the authority-role term for state custody.

Working definition:

> Game State Store is the app-owned custody layer for current and historical game state. It stores committed state, exposes allowed state slices to the UI, Rules Core, and Context Broker, and records validated state deltas and logs. It does not resolve rules or create mechanical truth.

Authority boundary:

- Game State Store holds and exposes state.
- Game State Store does not decide legality, costs, modifiers, rolls, result bands, effects, or state deltas.
- Game State Store may not mutate state directly from API DM narration.
- Game State Store may expose hidden state only through allowed app/context rules.

Status notes:

- This supplements #34 and #36.
- It does not replace existing source files.
- Game State Store is custody authority, not mechanical authority.
- Old files may not be deleted or superseded based on this update alone.

### 14.5 Accepted Player authority role

Accepted decision: define **Player** first in the authority-role split.

Working definition:

> Player is the intent authority. The Player declares what their character attempts, asks clarifying questions, chooses from presented options, and may make plausible Player Claims about the scene. The Player does not create final mechanical truth. Player intent must be interpreted, classified, validated, and resolved through the API DM, Rules Core, and Game State Store.

Authority boundary:

- Player may declare character intent.
- Player may choose from UI, map, or DM-presented options.
- Player may ask what is visible, reachable, plausible, risky, or known.
- Player may make Player Claims.
- Player may select resources, tools, abilities, targets, or approaches when available.
- Player may accept, revise, or cancel an action before committed resolution.
- Player may not directly mutate state, decide legality, decide check family, force a Player Claim to become true, override map geometry, expose hidden state, or override resolved mechanical logs.

Short boundary:

> Player says what they are trying to do. The system decides what that means mechanically.

Formatting note:

- Future proposed contract text should avoid horizontal-scroll code blocks. Use wrapped quote blocks or short bullets unless exact machine-readable syntax is required.

Status notes:

- This supplements #34 and #38.
- It does not replace existing source files.
- Player is intent authority, not mechanical authority.
- Old files may not be deleted or superseded based on this update alone.

### 14.6 Accepted API DM authority role

Accepted decision: define **API DM** as interpretation and narration authority.

Working definition:

> API DM is interpretation and narration authority. It interprets player intent, asks clarifying questions when needed, frames scenes, presents fiction, portrays NPCs, proposes classifications, and narrates resolved outcomes. It may propose what an action appears to mean, but it does not create final mechanical truth. Legality, cost, check family, modifiers, result bands, effects, state deltas, and mechanical logs belong to the Rules Core.

Playtest exception:

> During playtest only, the API DM may propose temporary rulings when rules are missing or unclear. Those rulings must be marked temporary, logged, and routed for review before becoming durable rules. In the eventual app-facing rules contract, if an action cannot be validated, the system should reject it, ask for clarification, or suggest nearby valid options.

Authority boundary:

- API DM may interpret messy player intent.
- API DM may translate natural language into a proposed action attempt.
- API DM may ask clarifying questions before resolution.
- API DM may frame scene description.
- API DM may portray NPC speech, reaction, mood, and behavior.
- API DM may present or propose visible/plausible options, but may not create final valid options.
- API DM may propose Scene Entity / Action Surface classification.
- API DM may narrate resolved mechanical outcomes after the Rules Core resolves them.
- API DM may not directly mutate game state, decide final legality, decide final cost/modifier/roll/result/effect/state delta, override the Game State Store, invent tactical map geometry, expose hidden state unless provided/allowed, or make a Player Claim mechanically true without validation.

Short boundary:

> API DM says what the action seems to mean. Rules Core decides what the action mechanically is.

Status notes:

- This supplements #34 and #38.
- It does not replace existing source files.
- API DM is interpretation/narration/proposal authority, not mechanical authority.
- Old files may not be deleted or superseded based on this update alone.

### 14.7 Accepted input-to-response transaction spine

Accepted decision: use the following app-facing order of operations for receiving and responding to user input.

Transaction spine:

> Player input → UI packages → Context Broker assembles → API DM interprets → Rules Core validates → invalid/unclear branch if needed → Rules Core resolves → Game State Store commits → API DM narrates → UI displays.

Expanded flow:

1. Player input received.
2. UI / App Shell packages input with actor, scene, selected target if any, map position, current turn/phase, and raw player wording.
3. Context Broker assembles relevant visible state, allowed hidden/internal state, recent history, rules packets, source excerpts, and current constraints.
4. API DM interprets intent into proposed meaning, including intended action, target, possible Action Surface, possible Action Category, and whether clarification is needed.
5. Rules Core validates whether the proposed action is legal.
6. If invalid or unclear, the system rejects, asks clarification, or suggests nearby valid options. During playtest only, temporary rulings may be proposed and must be logged/routed.
7. Rules Core resolves cost, check family, modifiers, roll/result if needed, result band, effects, and state deltas.
8. Game State Store commits validated state changes and mechanical log.
9. API DM narrates resolved outcome from committed/resolved facts.
10. UI / App Shell displays narration, mechanics, resource changes, updated options, map/state changes, and next prompt.

Status notes:

- This supplements #34, #35, #38, and later #41.
- It does not replace existing source files.
- This is a transaction scaffold, not final implementation code.
- Old files may not be deleted or superseded based on this update alone.

### 14.8 Accepted Rules Core authority role

Accepted decision: define **Rules Core** as mechanical authority.

Working definition:

> Rules Core is mechanical authority. It validates whether a proposed action is legal, determines costs, selects or confirms the check family, applies modifiers, resolves rolls/results, produces effects, creates state deltas, and writes the mechanical log. It does not interpret freeform player intent, invent fiction, narrate outcomes, or directly decide what context the API DM sees.

Authority boundary:

- Rules Core may validate action legality.
- Rules Core may determine costs, check family, modifiers, result bands, effects, and state deltas.
- Rules Core may resolve rolls/results and write the mechanical log.
- Rules Core may reject invalid proposed actions.
- Rules Core may return nearby valid options when an action is invalid or unclear.
- Rules Core may not interpret freeform player intent, invent fiction, narrate outcomes, decide what context the API DM receives, or directly present player-facing prose except through structured outputs.

Short boundary:

> Rules Core decides what mechanically happens. It does not decide how the outcome is narrated.

Status notes:

- This supplements #34, #35, #38, #39, and #40.
- It does not replace existing source files.
- Rules Core is mechanical authority, not narration or context authority.
- Old files may not be deleted or superseded based on this update alone.

### 14.9 Accepted Game State Store authority role refinement

Accepted decision: refine **Game State Store** as state-custody authority.

Working definition:

> Game State Store is state-custody authority. It stores committed game state, exposes allowed state slices to the UI, Rules Core, and Context Broker, and records validated state deltas and mechanical logs. It does not validate actions, resolve checks, create effects, interpret intent, invent fiction, or narrate outcomes.

Authority boundary:

- Game State Store may store durable campaign state.
- Game State Store may store encounter, scene, and turn state.
- Game State Store may store actor resources, statuses, position, inventory, clocks, counters, and logs.
- Game State Store may expose visible state to UI.
- Game State Store may expose permitted state slices to Context Broker.
- Game State Store may provide current state to Rules Core.
- Game State Store may preserve hidden/internal state when needed.
- Game State Store may not mutate state from API DM narration, decide legality, decide rolls/modifiers/costs/result bands/effects, expose hidden state unless allowed, or rewrite committed logs except through explicit correction/versioning.

Short boundary:

> Game State Store remembers what is true. Rules Core decides what becomes true.

Status notes:

- This supplements #34 and #36.
- It refines the earlier 14.4 Game State Store boundary; it does not replace source files.
- Game State Store is custody authority, not mechanical authority.
- Old files may not be deleted or superseded based on this update alone.

### 14.10 Accepted UI / App Shell authority role

Accepted decision: define **UI / App Shell** as input and presentation authority.

Working definition:

> UI / App Shell is input and presentation authority. It receives player input, presents available controls/options/state, displays narration and mechanical results, and packages user actions into structured requests for the transaction pipeline. It does not interpret intent, resolve rules, create fiction, mutate state, or decide hidden truth.

Authority boundary:

- UI / App Shell may capture freeform text input.
- UI / App Shell may capture clicks, selections, map interactions, and target choices.
- UI / App Shell may display visible state, resources, map position, options, logs, and prompts.
- UI / App Shell may package raw input with actor, scene, phase, target, and selected option metadata.
- UI / App Shell may present clarification prompts, rejection messages, and nearby valid options.
- UI / App Shell may display resolved narration and mechanical output.
- UI / App Shell may not decide action legality, decide costs/rolls/modifiers/result bands/effects/state deltas, expose hidden state unless allowed, treat displayed narration as state mutation, or invent options not supplied or validated by the app/rules layer.

Short boundary:

> UI / App Shell shows and collects. Rules Core resolves. Game State Store remembers. API DM narrates.

Status notes:

- This supplements #34, #35, #38, and #41.
- It does not replace existing source files.
- UI / App Shell is presentation/input authority, not mechanical or narrative authority.
- Old files may not be deleted or superseded based on this update alone.
