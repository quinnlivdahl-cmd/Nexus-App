# Spatial_Action_Validation_and_Commit_Transaction_Contract_rev0.1

Status: accepted design contract
Controlling issue: Spatial Action Transaction #5
Parent map: Spatial Vertical Slice Map #57
Date opened: 2026-07-12
Date accepted: 2026-07-13
Scope: design contract only; no production implementation

## 1. Purpose

This contract specializes the settled Turn Transaction, Rules Object Model, Effect/StateDelta grammar, and Campaign Director Harness contracts for player actions inside one persistent Location. It defines how Context Action Menu selections, Intent Bar input, and Turn-Based Improvise become validated actions, authorized state changes, atomic commits, and truthful presentation across Free Movement, Tactical Pressure, Turn-Based Mode, and Local Aftermath.

It does not create a second rules authority, a mode-local copy of Location state, or a new model/runtime contract.

## 2. Settled dependencies

The following remain controlling and are not reopened here:

- `CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md`
- `CAMPAIGN_DIRECTOR_HARNESS_CONTRACT_WORKING_DRAFT.md`
- `DM_Authority_Split_Contract_rev0.1.md`
- `Turn_Transaction_Contract_rev0.1.md`
- `Effect_StateDelta_Grammar_Contract_rev0.1.md`
- `Rules_Object_Model_rev0.1.md`
- relevant canonical source indexed by `docs/nexus-game-source/source/SOURCE-INDEX.md`
- accepted ADRs indexed by `docs/adr/README.md`

Binding consequences include:

- UI captures and presents; it does not decide legality or mutate state.
- Interpretation may propose an action; it does not validate or resolve it.
- Rules Core alone validates and resolves.
- `Effect` describes mechanical consequence; `StateDelta` is the normal mutation instruction.
- Only validated deltas cross the commit barrier.
- Generated Performance cannot create or revise Game Truth.
- Mechanical commit is not blocked by optional generation.

## 3. Canonical transaction shape

```text
Player Intent or structured selection
  -> InputEnvelope
  -> optional interpretation proposal
  -> ActionRequest
  -> deterministic ValidationResult
  -> optional clarification or confirmation
  -> ValidatedAction
  -> ResolutionOutput
  -> ordered EffectSet
  -> validated StateDeltaSet
  -> atomic mechanical commit
  -> deterministic presentation
  -> optional Generated Performance or deterministic fallback
```

`ActionRequest` is the canonical action boundary. This contract does not introduce a competing `SpatialActionProposal` authority.

Each request records its entry surface as provenance without giving that surface different rules authority.

## 4. Input surfaces

### 4.1 Context Action Menu

A mechanically complete menu selection may populate an `ActionRequest` directly. Menu visibility never guarantees current validity.

A proximity-bound selection may start approach movement toward an authored Interaction Position. Approach and interaction follow the staged-commit rule in section 10.

Known actions blocked by a visible, potentially correctable condition may remain visible as unavailable with a concise player-safe reason. Secret, undiscovered, or character-unknown actions remain hidden.

### 4.2 Intent Bar

The Intent Bar captures unrestricted Player Intent. Interpretation may produce:

- a typed intent/action proposal for deterministic normalization;
- a non-mechanical speech/performance request;
- a finite set of materially different interpretations;
- one focused clarification request;
- a goal-preserving alternative grounded in visible Game Truth; or
- a player-safe rejection when no legal rules-native reading exists.

Interpretation must prefer a plausible legal reading over rejection or unnecessary clarification.

A deterministic transaction service accepts and normalizes an interpretation proposal into the canonical `ActionRequest`. Interpretation cannot construct or authorize that request directly.

### 4.3 Improvise

Improvise remains the Turn-Based Mode action that opens the Intent Bar to enter a Freeform Action. It always previews its interpreted action and applicable tactical cost before execution.

## 5. Action ownership and coordinated intent

Every committed action has exactly one primary acting character. Validation uses that actor's identity, embodiment, control authority, position, knowledge, capabilities, resources, statuses, and mode-local action economy.

A coordinated Player Intent may include:

- actions owned by different Field Team members;
- one lead actor with qualified assistance;
- speech and physical action in one natural-language submission; and
- a sequence of actions forming a larger plan.

Each actual action remains owned by its acting character. Assistance does not silently become another character's action. Distinct costs, timing windows, interruption points, or resolution dependencies produce distinct linked actions.

## 6. Freeform Action

A Freeform Action is a physically plausible rules-native action derived from Player Intent when no authored action matches exactly.

Interpretation may reference or propose approved rules-native action and effect-intent identifiers. Deterministic Rules Core services alone compose the legal action, resolve Effects, and construct or authorize StateDeltas from existing:

- actor capabilities and equipment;
- Location entities, geometry, Interaction Positions, hazards, and objectives;
- Costs and action-economy rules;
- Check families, modifiers, Target Scores, and outcome bands;
- Effects and StateDeltas; and
- visibility and knowledge constraints.

They may not invent mechanics, possessions, permissions, geometry, knowledge, effect types, or state that does not exist in authoritative inputs.

Routine Freeform Actions do not require a Check merely because they are freeform. Uncertainty and meaningful stakes determine whether Lattice-100 resolution applies.

## 7. Clarification and goal-preserving alternatives

Clarification is non-mutating and exceptional.

It is required only when unresolved ambiguity would materially change one or more of:

- primary actor;
- target;
- approach;
- action cost or scarce resource expenditure;
- Check family or Target Score;
- known immediate risk;
- irreversible consequence; or
- authorized outcome.

Material ambiguity affecting a hidden authorized consequence also stops resolution. Its player-facing clarification must remain neutral and must not reveal the consequence or confirm that hidden state exists.

When reliable finite interpretations exist, Nexus presents them as explicit choices using player-known mechanics. Otherwise it asks one focused freeform question.

If the exact action is impossible but its goal has a nearby plausible alternative grounded in visible Game Truth, Nexus may offer that alternative. A materially different alternative always requires confirmation and never executes as an inferred substitution.

Execution detail: a clarification response creates a new causally linked `ActionRequest` with a fresh request identity and dependency snapshot. The prior request terminates non-mutating as `needs_clarification`.

## 8. Confirmation boundary

During Free Movement, an interpreted Freeform Action may execute without another confirmation only when it is routine, reversible, and carries no meaningful Check, scarce cost, known material risk, or irreversible consequence.

Otherwise Nexus presents a concise confirmation preview containing the player-known portion of:

- acting character;
- target and approach;
- action and resource costs;
- Check family and Target Score, when applicable;
- known immediate stakes; and
- any goal-preserving substitution.

The preview cannot reveal hidden modifiers, undiscovered consequences, secret state, or knowledge the acting character lacks.

Turn-Based Improvise always requires this preview and confirmation.

## 9. Deterministic validation

Validation runs against current committed truth and the request's declared dependencies. At minimum it checks:

1. request identity, lifecycle, and idempotency;
2. acting-character existence, embodiment, control, and eligibility;
3. active Location and mode ownership;
4. target existence, identity, state, visibility, and character knowledge;
5. action definition or legal Freeform Action composition;
6. Interaction Position, path, range, line-of-sight, line-of-fire, and other spatial preconditions when relevant;
7. AP, MP, reactions, Micro-Interaction, one-offense, equipment, charge, and other cost constraints when relevant;
8. status, hazard, objective, access, and timing preconditions;
9. Check and modifier construction;
10. Effect and StateDelta authority; and
11. dependency freshness before resolution and again inside the commit boundary.

Player-facing outcomes use the settled action-validation statuses:

- `valid`
- `invalid`
- `needs_clarification`
- `blocked`
- `unavailable`
- `stale_request`
- `temporary_ruling_needed`

Validation reasons must be player-safe. Hidden truth may determine a status without being disclosed.

Safe execution policy:

- inconsequential dependency drift may be revalidated automatically;
- drift affecting actor, target, cost, Check, known risk, irreversibility, or outcome requires a new preview or player choice;
- commit never proceeds from a stale validation snapshot.

## 10. Approach movement and proximity actions

Automatic approach and the intended interaction are linked stages under one Player Intent, not one rollback-capable commit.

- Movement commits as persistent Location truth as it occurs.
- Arrival does not guarantee that the interaction remains legal.
- At the Interaction Position, the interaction receives fresh deterministic validation.
- The interaction commits atomically only if that validation still passes.
- Completed movement is not rolled back when the target becomes stale, blocked, unavailable, or interrupted.
- Direct player movement input or explicit cancellation ends remaining auto-path execution.
- A genuinely indivisible movement-plus-effect behavior requires an explicit compound-action rule.

If Turn-Based Mode begins before the interaction commits, the pending Free Movement interaction is discarded. The player receives no carried intent, reserved action, or automatic execution in the new mode.

## 11. Multi-step Free Movement plans

A Player Intent may describe a multi-step plan. During Free Movement, Nexus may auto-execute the plan while every action or consequential step validates and commits separately against current Location truth.

Free Movement does not calculate hypothetical AP or MP totals for the plan.

If Turn-Based Mode is triggered:

- completed steps remain committed;
- the current uncommitted step is discarded;
- every remaining planned step is discarded; and
- continued pursuit requires fresh player choices under Turn-Based rules.

The plan never pre-authorizes future outcomes. Failure, cancellation, target loss, or other material truth changes cause the next step to revalidate, change through confirmed interpretation, or stop.

## 12. Resolution and ordered effects

A `ValidatedAction` is the only normal input to resolution. Resolution may produce:

- no Check for an established routine outcome;
- one applicable Lattice-100 Check and outcome band;
- an ordered `EffectSet` including costs, movement or position consequences, damage, conditions, objective changes, knowledge changes, revealed state, scheduled consequences, or mode/sequencing requests; and
- player-safe resolved facts for presentation.

Speech and physical action may originate in one Player Intent. If they share one mechanical resolution, their authorized mechanical consequences may remain linked. If they have distinct costs, actors, timing, or interruption points, they become ordered linked actions rather than an opaque compound mutation.

Generated wording is never an Effect.

## 13. Atomic mechanical commit

One mechanical action commit is all-or-nothing for every delta authorized by that action's resolved stage. Its commit set includes, when applicable:

- resource and action-economy costs;
- committed roll and resolution record;
- actor and object state changes;
- position changes produced by the resolved action stage;
- damage, healing, conditions, mitigation, and equipment changes;
- hazard and objective changes;
- knowledge and visibility changes;
- scheduled or hidden consequences;
- turn, reaction, and sequencing consumption;
- approved mechanical history; and
- durable resolved facts and presentation references from which downstream UI updates are derived.

The commit boundary rechecks expected prior state and relevant dependency revisions. Any rejected delta rejects the whole stage commit. No cost, effect, turn advancement, log claim, or success presentation may escape a failed commit.

`UIUpdateBundle` remains downstream, non-authoritative presentation. It is not itself part of the mechanical mutation set.

Approach movement already committed in an earlier stage is not part of the later interaction rollback set.

## 14. Mode-transition ownership

A mode transition is deterministic system state, never narration.

When an action's committed result itself triggers Tactical Pressure, the action's authorized effects commit first and the transition observes that new truth through an immediately following deterministic system transaction. When Tactical Pressure is triggered before an uncommitted action stage resolves, that stage is cancelled and Turn-Based Mode begins from current committed Location truth.

Turn-Based Mode does not copy the Location. It changes time resolution and sequencing over the same actors, objects, hazards, objectives, positions, and consequences.

Ending Tactical Pressure and entering Local Aftermath likewise operate on current committed Location truth. They cannot reconstruct outcomes from Generated Performance or a mode-local summary.

## 15. Presentation and Generated Performance

Every committed action immediately produces sufficient deterministic presentation to make the result legible without generation. It includes the relevant visible roll, cost, outcome band, visible state change, and concise authored action/effect feedback.

Routine movement, attacks, abilities, and interactions do not request Generated Performance merely because a model is available.

Generated Performance is reserved principally for:

- Freeform Dialogue;
- Freeform Actions whose expression exceeds authored mechanical feedback;
- discoveries; and
- narratively significant outcomes.

For deterministic player actions, generation occurs after mechanical commit as a separate zero-effect Proposal Transaction. It may describe only committed resolved facts and character-safe context.

If generation is unavailable, invalid, late, or fails its one allowed repair/regeneration attempt, Nexus uses an authored deterministic fallback in the same presentation surface. The fallback is truth-derived, contains no apology or model error language, and never blocks continued play.

A fallback release supersedes a late generated result for that presentation slot.

## 16. Failure and recovery invariants

- Invalid, blocked, unavailable, stale, cancelled, or clarification-pending requests commit no action state.
- Failed Checks are resolved actions, not validation failures; their authorized costs and consequences commit atomically.
- Duplicate request or commit identities cannot apply effects twice.
- Commit rejection cannot be narrated or animated as success.
- UI interruption cannot manufacture or erase committed Location truth.
- A crash after commit but before presentation recovers from the committed transaction record and releases deterministic presentation exactly once.
- A crash before commit leaves no partial action effects.
- Generated Performance failure never rolls back mechanics.

## 17. Cross-mode invariant matrix

| Concern | Free Movement | Tactical Pressure / Turn-Based Mode | Local Aftermath |
|---|---|---|---|
| Location authority | Same persistent Location | Same persistent Location | Same persistent Location |
| Position truth | Continuous committed position | Preserved position; MP uses path distance | Final committed position persists |
| Action economy | No AP/MP | AP, MP, reactions, Micro-Interaction, offense limits | No tactical spend unless pressure resumes |
| Freeform entry | Intent Bar / contextual input | Improvise opens Intent Bar | Intent Bar / contextual input |
| Multi-step auto-execution | Allowed with per-step validation | Not carried in; fresh choices required | May begin only from current aftermath truth |
| Commit authority | Rules/state services | Rules/state services | Rules/state services |
| Generation authority | Performance only | Performance only | Performance only |

## 18. Acceptance scenarios

### 18.1 Context action with approach

The player selects `Access terminal`. Movement commits during approach. Power fails before arrival. At the Interaction Position the action revalidates as unavailable, explains the visible power condition, and does not roll back movement.

### 18.2 Surprise during approach

The player approaches a hatch to seal it. Hidden opposition triggers Turn-Based Mode before arrival. Completed movement persists; the pending hatch action is discarded; initiative and fresh tactical choice govern what happens next.

### 18.3 Routine Freeform Action

The player enters `Move the loose chair away from the door`. The chair is visible, movable, uncontested, and consequence-light. Nexus interprets and executes the action without a Check or extra confirmation, committing the chair's new state.

### 18.4 Consequential Freeform Action

The player enters `Bridge the damaged contacts with my multitool`. Nexus previews the actor, terminal, tool use, applicable Check and Target Score, known shock risk, and intended outcome. Nothing resolves until confirmation.

### 18.5 Goal-preserving alternative

The player asks to weld a door without a welder. Visible debris supports a barricade instead. Nexus offers barricading with its different cost and known strength; it does not silently substitute or execute it.

### 18.6 Multi-character plan

The player asks one Crewmate to cut power while another opens a manual bypass. Each step belongs to its acting character and commits separately. If the first step triggers Turn-Based Mode, the remaining plan is discarded.

### 18.7 Generated performance failure

A narratively significant discovery commits its knowledge and Location consequences. Generation fails. Nexus immediately releases a deterministic discovery fallback derived from the committed facts and play continues.

## 19. Anti-drift rules

- Do not recreate Encounter state beside Location truth.
- Do not let input surface determine rules authority.
- Do not treat menu visibility as validation.
- Do not make all Freeform Actions require a Check or confirmation.
- Do not carry Free Movement plans into Turn-Based Mode.
- Do not roll back committed traversal because a later interaction fails.
- Do not let freeform wording bypass action economy, actor ownership, or state authority.
- Do not convert clarification into the normal Freeform Action experience.
- Do not expose hidden information through previews or validation reasons.
- Do not wait for Generated Performance before committing or presenting mechanics.

## 20. Spatial specialization fields

The spatial slice extends settled objects through composed payload parts; it does not replace them with a competing object family.

### 20.1 InputEnvelope spatial context

Required when applicable:

| Field | Contract meaning |
|---|---|
| `entrySurface` | `context_action_menu`, `intent_bar`, or `improvise` |
| `LocationRef` | Active authoritative Location |
| `spatialMode` | `free_movement`, `turn_based`, or `local_aftermath` |
| `tacticalPressureActive` | Whether the condition requiring ordered Turn-Based resolution is active at capture |
| `truthRevision` | Committed truth revision observed at capture |
| `ActorRef` | Acting character when already selected |
| `TargetRef` | Target selected or otherwise known at capture; interpreted targets belong to the later proposal and ActionRequest |
| `ActionSurfaceRef` | Originating authored action surface when applicable |
| `InteractionPositionRef` | Intended proximity destination when applicable |
| `intentLineageRef` | Stable correlation across interpretation, clarification, confirmation, and linked stages |
| `planRef` / `planStepIndex` | Optional multi-step Free Movement plan identity and ordered step |

### 20.2 ActionRequest spatial intent payload

The canonical `ActionRequest.IntentPayload` carries only candidate intent:

| Field | Contract meaning |
|---|---|
| `desiredAction` | Authored action identifier or approved Freeform Action category |
| `desiredOutcome` | Player goal stated without asserting success |
| `approach` | Relevant method, tool, speech, positioning, or tactic |
| `targetRefs` | Primary target plus bounded secondary participants or objects |
| `entrySurface` | Preserved provenance; never authority |
| `requestedSequence` | Optional non-binding ordered plan description |
| `confirmationRef` | Required when a consequential preview was accepted |
| `dependencyRefs` | Scoped truth dependencies used for validation and commit recheck |

An `ActionRequest` never contains executable Effects, StateDeltas, a model-selected result, or an assertion that validation has passed.

### 20.3 ValidatedAction spatial parts

In addition to the settled object model, a spatial `ValidatedAction` records:

- validated acting character and target set;
- validated Location and mode;
- validated action or Freeform Action category;
- validated Interaction Position, path endpoint, range, and spatial predicates when applicable;
- validated cost and action-economy classification;
- validated Check construction or explicit no-Check reason;
- validated confirmation or clarification lineage when required;
- validated dependency snapshot; and
- authorized effect-intent families available to resolution.

## 21. Scoped spatial dependency set

Transactions use scoped revisions rather than making every action stale after any unrelated Location change.

| Dependency | Required when | Recheck rule |
|---|---|---|
| Location identity/lifecycle revision | Always | Same active Location; not unloaded, replaced, or resolved |
| Spatial mode/sequencing revision | Always; especially Turn-Based | Mode and legal timing still permit the action |
| Actor revision | Always | Identity, embodiment, control, position, resources, equipment, statuses, and eligibility used by validation remain compatible |
| Target revision | Targeted action | Target still exists and relevant state remains compatible |
| ActionSurface/InteractionPosition revision | Authored proximity action | Surface, offered action, destination, access, and occupancy remain valid |
| Navigation/geometry revision | Movement, range, LOS, LOF, cover, or reach | Validated spatial predicate still holds against authoritative geometry |
| Hazard/objective revision | Action depends on one | Relevant trigger, progress, ownership, or active state remains compatible |
| Knowledge/visibility revision | Availability or preview depends on knowledge | Actor still has the knowledge and visibility used without exposing hidden truth |
| Rules/action-definition version | Always | Resolver uses the same accepted rule definition or fully revalidates under the new one |
| Cost/turn/reaction revision | Resource-bearing or Turn-Based action | Resources and sequencing rights remain available at commit |

Dependency drift handling:

- compatible drift permits deterministic revalidation without another prompt;
- drift that changes player-known actor, target, cost, Check, immediate risk, irreversibility, or outcome requires a new preview or choice;
- hidden-sensitive drift may stop or neutrally revalidate without revealing hidden state;
- no drift may be ignored inside the final commit boundary.

## 22. Validation status behavior

| Status | Mutation | Player-facing behavior | Retry/resume rule |
|---|---|---|---|
| `valid` | None yet | Proceed to required confirmation or resolution | Same request may advance once |
| `invalid` | None | Concise reason when player-safe; no success performance | New intent required unless a offered alternative is confirmed |
| `needs_clarification` | None | Finite interpretations or one focused question | New causally linked request with fresh dependencies |
| `blocked` | None | Explain visible blocking state and, when useful, how it may be changed | Retry only after truth changes; always revalidate |
| `unavailable` | None | Explain known missing permission, resource, ability, target, or condition | New request or truth change required |
| `stale_request` | None | Silent automatic revalidation when agency-neutral; otherwise refreshed preview | Never resume from old validation snapshot |
| `temporary_ruling_needed` | None in normal play | Deterministic safe limitation plus supported alternatives; Developer Mode records the contract gap | No ad hoc player-facing mutation; bounded playtest ruling requires explicit authorized workflow |

Invalidity is not a failed Check. Once a valid action resolves a Check, every outcome band—including failure—follows normal atomic commit behavior.

## 23. Effect-to-StateDelta authorization table

Only Rules Core resolution may produce the Effect families below. The transaction/state boundary constructs or validates deltas using the existing operation registry.

| Resolved Effect family | Normal StateDelta operation/lane | Required guards |
|---|---|---|
| Pay AP, MP, charge, item, or resource cost | `adjust`, `remove`; actor resource/inventory lane | Expected prior amount or possession; floors; action-economy legality |
| Change actor or object position | `move`; authoritative spatial lane | From/to position, navigation/geometry revision, occupancy and mode rules |
| Damage, healing, repair, or numeric pressure | `adjust`; actor/object resource lane | Target, mitigation/result math, bounds, expected prior value |
| Add or remove status/condition | `add`, `remove`, `expire`; condition lane | Status registry, stacking, duration, immunity, source |
| Change door, terminal, fixture, or action surface | `set`, `replace`, `add`, `remove`; scene entity/action-surface lane | Target revision, valid state transition, access and visibility |
| Advance or regress objective/hazard | `increment_step`, `decrement_step`, `set`; objective/hazard lane | Active objective/hazard, bounds, trigger ownership |
| Reveal or conceal fact/state | `reveal`, `conceal`; knowledge/visibility lane | Recipient policy, character knowledge authority, no secret leakage |
| Create ongoing or future consequence | `schedule`; schedule/clock lane | Trigger, expiry, scope, visibility, duplicate handling |
| End an ongoing consequence | `expire`, `remove`; schedule/status lane | Matching active ref and expiry authority |
| Record mechanical history | `append_log`; audit/history lane | Transaction identity, resolved facts, visibility policy |
| Flag unsupported contract/ruling | `flag_review`; review lane | No player-state mutation implied |
| Request a mode transition | No direct action-owned mode mutation | Record the resolved transition request; an immediately following deterministic system transaction validates and commits mode/sequencing state |

If a resolved consequence cannot map to an allowed Effect family, state lane, path, and operation without prose interpretation, it cannot commit and must return `temporary_ruling_needed` or an implementation/contract defect.

## 24. Deterministic presentation and fallback contract

Every committed action produces a deterministic result presentation record before optional generation. Every player-facing noncommitting terminal status produces a deterministic validation, limitation, or retry presentation without claiming that an action resolved.

Required fields:

- transaction and action references;
- acting character and player-visible targets;
- authored action label or player-safe Freeform Action summary;
- visible cost paid;
- visible roll, modifiers, Target Score, and outcome band when applicable;
- visible committed changes;
- player-safe failure, blocking, or partial-outcome reason;
- presentation family and authored template identifier;
- optional generation significance and performance slot reference; and
- release state proving the slot has displayed exactly once.

Minimum authored fallback families:

- movement/position;
- attack/damage/defense;
- ability/status/resource;
- interaction/objective/hazard;
- Freeform Action;
- discovery/knowledge reveal;
- dialogue/performance unavailable; and
- safe transaction rejection or stale retry.

Fallback text is assembled only from player-visible resolved facts. It contains no model/runtime apology, hidden consequence, guessed causality, or uncommitted outcome. Once fallback occupies a performance slot, a late generated result is superseded and cannot replace or append contradictory performance.

## 25. Contract hardening disposition

The user-facing action, clarification, plan, and presentation boundaries are resolved. Exact runtime type declarations, registry contents, algorithms, UX layout, balance numbers, Tactical Pressure thresholds, Initiative details, and production implementation remain outside this design contract.

No remaining hardening item currently requires a player-facing decision. Any later implementation conflict that would change agency, visible rules behavior, persistent Location truth, or established Nexus terminology must return to design review rather than being decided as an implementation shortcut.
