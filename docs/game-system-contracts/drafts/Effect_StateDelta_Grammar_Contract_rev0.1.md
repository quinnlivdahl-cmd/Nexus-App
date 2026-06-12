# Effect_StateDelta_Grammar_Contract_rev0.1

Date: 2026-06-12  
Mode: Draft  
Related issue: Define effect and state-delta grammar:#40  
Parent issue: Epic: Sequence Nexus app-facing game-rule/system design:#33  
Depends on: #38, #39  
Status: draft contract closure  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

`docs/game-system-contracts/drafts/Effect_StateDelta_Grammar_Contract_rev0.1.md`

This file supplements:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- GitHub issue #40

This pass treats #38 and #39 as accepted enough for rev0.1. It does not reopen their foundations unless a direct contradiction or missing contract surface appears.

## Replaces

Nothing.

Do not delete, archive, supersede, or replace legacy GPT-DM / DM Mode material, existing gameplay source, schema working drafts, #38 material, or #39 material as part of this pass. This file is a follow-on grammar contract draft.

## Source/currentness status

This is a repo-side draft contract artifact. It is based on ChatGPT Draft Mode work, uploaded bridge baseline context, Issue #40 sequencing, and prior committed/issue-sequenced work for #34, #35, #38, and #39. It is not verified against live local `00 Source` and is not source canon.

---

# 1. Purpose

This document defines the rev0.1 grammar boundary between `Effect` and `StateDelta` for Nexus app-facing rules-core work.

The purpose is not to finalize every combat, social, exploration, item, ability, or campaign consequence. The purpose is to make the app transaction safe:

```text
Rules Core resolves effects.
Effects generate state deltas.
State deltas are validated.
Game State Store commits validated deltas.
API DM narration explains but never mutates state.
```

Core rule:

```text
Effect = what mechanically happens.
StateDelta = what state lane changes because of it.
Committed state = only validated StateDelta after commit barrier.
```

---

# 2. Accepted controlling decisions

## 2.1 Effect is not committed state

An `Effect` is a mechanical consequence produced by Rules Core resolution.

An `Effect` may describe damage, healing, movement, status application, resource change, objective progress, trace, exposure, suspicion, disposition, reveal, conceal, route change, map-option change, scheduled consequence, or other mechanical consequence.

An `Effect` does not mutate committed game state by itself.

## 2.2 StateDelta is the only normal mutation object

A `StateDelta` is a validated mutation instruction targeting a specific state lane, target, path, and operation.

A `StateDelta` becomes real only after delta validation and commit.

## 2.3 Resolution is not commit

`ResolutionOutput` may contain an `EffectSet` and `StateDeltaSet`, but neither is committed until the transaction layer / Game State Store validates and applies the deltas.

## 2.4 Narration is never a mutation source

API DM narration may describe resolved facts, visible consequences, and allowed hidden-consequence symptoms.

API DM narration must not create, change, cancel, or reinterpret an `Effect`, `StateDelta`, committed value, hidden fact, target, cost, result band, roll, or map truth.

## 2.5 Hidden consequences are state, not vibes

A hidden consequence must be represented as a `StateDelta` with `VisibilityPolicy`.

It must not exist only as DM prose, implication, model memory, tone, or future intent.

## 2.6 Temporary and scheduled consequences need explicit state

If a consequence persists, waits, ticks, expires, or triggers later, it must be represented in committed state.

Valid handling:

- commit an ongoing effect record;
- commit a scheduled effect record;
- commit a clock/counter/timer delta;
- commit an expiration condition;
- commit a reveal trigger or review route.

Invalid handling:

- remember it only in API DM narration;
- assume the app will infer it later from prose;
- defer the actual hidden state mutation when the current action caused it.

---

# 3. Effect grammar rev0.1

## 3.1 Effect definition

`Effect` is the rules-core expression of a mechanical consequence before or alongside state-delta generation.

Minimal shape:

```text
Effect
- EffectRef
- TransactionRef
- SourceRef
- optional ActorRef
- TargetRef
- EffectType
- EffectPayload
- Scope
- optional Duration
- VisibilityPolicy
- DeltaGenerationMode
- optional StateDeltaRef[] after delta generation
- optional ReviewFlag
```

## 3.2 Effect ownership

Owner: Rules Core.

Created by: action resolution, check result, ability, item, hazard, status tick, scheduled trigger, temporary playtest ruling, or explicit app/system workflow.

Stored: transient unless ongoing, scheduled, reactive, review-relevant, or needed for audit/debug.

May mutate state directly: no.

May produce state changes indirectly: yes, through generated `StateDelta`s.

## 3.3 EffectType policy

`EffectType` is a controlled registry surface, but this contract does not finalize the complete registry.

Rev0.1 effect families:

- `damage`
- `healing`
- `mitigation`
- `resource_change`
- `status_apply`
- `status_remove`
- `position_change`
- `inventory_change`
- `objective_progress`
- `counter_shift`
- `clock_change`
- `visibility_change`
- `map_option_change`
- `action_surface_change`
- `information_reveal`
- `scheduled_consequence`
- `temporary_ruling_consequence`
- `log_only_mechanical_note`

Boundary:

- `EffectType` says what family of consequence is being resolved.
- `StateDelta.Operation` says how committed state changes.

## 3.4 EffectPayload policy

`EffectPayload` carries effect-family-specific data without bloating every effect.

Examples:

```text
Damage payload:
- amount
- damage type optional
- mitigation handling optional
- direct/graze/miss source optional

Counter shift payload:
- counter kind
- amount or step
- reason
- visible symptom optional

Information reveal payload:
- fact ref or clue ref
- reveal level
- recipients
- narration permission
```

Effect payloads should be specific enough for deterministic delta generation and mechanical logs, but not polished narrative prose.

## 3.5 DeltaGenerationMode

Every effect must declare how it relates to state deltas.

Allowed rev0.1 modes:

- `generates_delta_now` — produces one or more deltas in the current transaction.
- `generates_scheduled_delta` — creates scheduled state that will produce later deltas.
- `modifies_effect_resolution_only` — changes another effect before delta generation, such as mitigation.
- `log_only` — records a mechanical note without changing state.
- `no_delta` — valid only when Rules Core confirms the effect has no state mutation.

`no_delta` should be rare. If a player-facing or future-facing fact changes, use a delta.

## 3.6 EffectSet

`EffectSet` is the ordered collection of effects produced by a resolution.

Minimal shape:

```text
EffectSet
- TransactionRef
- EffectRef[]
- ordering rule
- optional interaction summary
- optional ReviewFlag
```

Ordering matters when effects interact.

Default rev0.1 ordering:

1. costs already paid or failed before effect resolution;
2. primary action/check consequence;
3. mitigation, shield, prevention, redirection, conversion, or replacement effects;
4. secondary consequences;
5. triggered consequences;
6. scheduled consequences;
7. log-only mechanical notes.

If an ability or rule needs a different order, it must say so explicitly.

---

# 4. StateDelta grammar rev0.1

## 4.1 StateDelta definition

`StateDelta` is the validated mutation instruction that targets committed game state.

Minimal shape:

```text
StateDelta
- StateDeltaRef
- TransactionRef
- SourceRef
- optional EffectRef
- StateLaneRef
- TargetRef
- StatePath
- Operation
- StateDeltaPayload
- optional ExpectedPriorState
- VisibilityPolicy
- Scope
- optional Duration
- CommitPolicy
- ValidationResult
- optional ReviewFlag
```

## 4.2 StateDelta ownership

Produced by: Rules Core or explicit app/system workflow.

Validated by: transaction layer / Game State Store boundary.

Committed by: Game State Store.

Stored: yes, at least as committed state and/or log trail.

May mutate state: yes, only after validation and commit barrier.

## 4.3 StateLaneRef

`StateLaneRef` identifies the broad state lane being changed.

This contract does not reopen the final #36 lane registry. It only requires every delta to name a lane.

Examples of expected lane targets:

- actor resources;
- actor condition/status;
- position / map / encounter state;
- inventory / loadout;
- objective / mission / route state;
- scene entity / action surface / map option state;
- social counters such as disposition, suspicion, exposure, trace, or pressure-like counters;
- clocks / timers / scheduled consequences;
- visibility / knowledge / revealed facts;
- logs / audit / review flags.

If no valid lane exists, the delta is malformed and #36/#40 review is required.

## 4.4 StatePath

`StatePath` identifies the exact field or sub-surface inside the lane.

Examples:

```text
actor.hp.current
actor.ap.current
actor.statuses[status_ref]
encounter.positions[actor_ref].node
scene.counters.exposure
mission.objectives[objective_ref].progress
knowledge.revealed_facts[fact_ref]
schedule.effects[scheduled_effect_ref]
```

`StatePath` must be deterministic enough for a reducer to apply without reading narrative prose.

## 4.5 Operation registry rev0.1

`Operation` is a controlled registry surface.

Allowed rev0.1 operations:

- `set` — replace current value with a new value.
- `adjust` — add/subtract numeric amount within lane rules.
- `increment_step` — move a stepped track up by one or more steps.
- `decrement_step` — move a stepped track down by one or more steps.
- `add` — add an item/status/effect/ref to a collection.
- `remove` — remove an item/status/effect/ref from a collection.
- `replace` — replace one value/ref/object with another.
- `move` — change position/location/path/node.
- `reveal` — change visibility from hidden/concealed/unrevealed to visible/revealed for allowed recipients.
- `conceal` — change visibility from visible/revealed to hidden/concealed for allowed recipients.
- `schedule` — add a future/triggered consequence record.
- `expire` — remove or deactivate an ongoing/scheduled effect due to duration/condition.
- `append_log` — append a mechanical log/audit entry.
- `flag_review` — record a review/temporary-ruling/contradiction flag.

Boundary:

- Do not create ad hoc operation verbs inside payload prose.
- If a needed operation cannot map to this list, mark `ReviewFlag: operation_registry_gap`.

## 4.6 StateDeltaPayload

`StateDeltaPayload` carries operation-specific data.

Examples:

```text
adjust payload:
- amount
- floor/ceiling rule optional
- reason

add payload:
- object/ref to add
- duplicate handling

move payload:
- from position optional
- to position
- movement mode optional

schedule payload:
- scheduled effect ref
- trigger
- expiry
- visibility policy
```

Payload must be machine-checkable enough for reducer application.

## 4.7 ExpectedPriorState

`ExpectedPriorState` is optional but recommended when stale requests, simultaneous updates, or reducer conflicts are plausible.

Uses:

- prevent stale UI actions from overwriting newer state;
- verify resource costs were paid from the expected value;
- avoid double-applying damage, healing, status, or objective progress;
- support audit and rollback during development.

If expected state does not match current state, valid handling is:

1. reject delta as stale;
2. rerun validation/resolution against current state;
3. flag implementation conflict;
4. request player clarification if the changed state affects agency.

## 4.8 CommitPolicy

`CommitPolicy` describes how the delta should commit.

Allowed rev0.1 policies:

- `commit_now` — apply in current transaction.
- `commit_if_valid` — apply only if Game State Store validates target lane/path and prior state.
- `queue_for_trigger` — store as scheduled/triggered consequence.
- `debug_only` — record for debug/audit without changing player-facing state.
- `reject_if_hidden_visibility_invalid` — block if hidden/reveal rules are malformed.

State-changing player actions should normally use `commit_now` or `commit_if_valid`.

---

# 5. Visibility and hidden-state grammar

## 5.1 VisibilityPolicy required for consequential effects/deltas

Any effect or delta that changes hidden state, player-facing information, DM-visible information, UI-visible state, logs, knowledge, trace, suspicion, exposure, disposition, clocks, scheduled consequences, or future reveal conditions must include `VisibilityPolicy`.

`VisibilityPolicy` should cover:

- player visibility;
- UI visibility;
- API DM visibility;
- Rules Core visibility;
- Context Broker visibility;
- hidden/concealed/revealed status;
- reveal rule;
- narration permission;
- required omissions.

## 5.2 Hidden delta rule

A hidden delta may be committed without player-facing display, but it must still be mechanically real.

Valid examples:

```text
Effect: trace generated
StateDelta: scene.trace +1, hidden from player, DM may not narrate exact value
```

```text
Effect: patrol clock advances
StateDelta: hidden patrol clock +1, API DM may narrate only a distant radio burst if permitted
```

Invalid examples:

```text
Narration says security might notice later, but no trace or clock delta is committed.
```

```text
API DM remembers a guard is suspicious, but no suspicion/disposition/scene-state delta exists.
```

## 5.3 Reveal is a state delta

Revealing information is not just narration.

If a fact, clue, route, objective, map option, hidden state, or NPC motive becomes known to the player, the transaction should commit a reveal delta or a visible state/log update.

---

# 6. Duration, expiration, and scheduled effects

## 6.1 Duration

`Duration` describes how long an effect or delta matters.

Allowed rev0.1 duration modes:

- `instant`
- `until_end_of_turn`
- `until_start_of_actor_turn`
- `until_end_of_encounter`
- `until_scene_end`
- `until_route_node_end`
- `until_campaign_removed`
- `timed_ticks`
- `conditional`
- `scheduled_trigger`

## 6.2 Ongoing effects

An ongoing effect must be represented by committed state.

Normal path:

```text
Effect: status_apply
→ StateDelta: add status record to actor.statuses
→ later trigger/tick reads status record
→ later StateDelta applies tick or expiration
```

## 6.3 Scheduled effects

A scheduled effect is a committed future consequence.

Minimal scheduled record:

```text
ScheduledEffect
- scheduled effect ref
- source transaction
- source effect
- trigger condition
- target lane/path
- visibility policy
- expiration or cancellation condition
- review flag optional
```

A scheduled consequence must not live only in DM memory.

## 6.4 Expiration

Expiration is also a state change.

Use `Operation: expire` or `Operation: remove` depending on lane design.

Examples:

- remove a status at end of encounter;
- expire a temporary shield charge rule;
- clear a scene-only revealed option when leaving the scene;
- deactivate a scheduled consequence after its trigger resolves.

---

# 7. Reducer implications

## 7.1 Reducer boundary

A reducer applies validated `StateDelta`s to committed state.

A reducer must not read API DM narration as mutation authority.

A reducer should be deterministic, auditable, and lane-aware.

## 7.2 Delta validation checks

Before commit, the transaction layer / Game State Store should check:

- `StateDeltaRef` exists and is unique within the transaction;
- `TransactionRef` is valid;
- `SourceRef` is valid;
- `StateLaneRef` exists;
- `TargetRef` resolves to a valid target for that lane;
- `StatePath` is valid for the lane;
- `Operation` is allowed for that lane/path;
- payload shape matches operation;
- expected prior state matches if supplied;
- visibility policy is valid for hidden/concealed/revealed content;
- duration/expiration is valid if supplied;
- scheduled/triggered records have valid trigger routes;
- review flags are present when registry gaps or temporary rulings are used.

## 7.3 Commit failure

If a delta fails validation, the app must not narrate success.

Valid handling:

1. reject the transaction safely;
2. rerun validation/resolution against current state;
3. display fallback error or clarification;
4. flag implementation defect;
5. route grammar gap to #40 follow-up or later implementation review.

## 7.4 Idempotency

State-changing deltas should be safe against accidental double application where practical.

Useful handles:

- `StateDeltaRef`;
- `TransactionRef`;
- `ExpectedPriorState`;
- operation-specific duplicate handling;
- log/audit trail.

---

# 8. Logs and presentation

## 8.1 Mechanical log

Rules Core should log the effect/delta summary needed for audit and fallback display.

A mechanical log entry should include:

- transaction ref;
- actor;
- action or validated action;
- target;
- check result if any;
- effect summary;
- state delta summary;
- paid cost if any;
- visible consequence;
- hidden-delta presence if allowed by debug visibility;
- review flags.

## 8.2 Narrative log

Narrative log text may come from API DM narration or fallback templates.

Narrative log text must conform to committed state and mechanical logs.

## 8.3 UI update bundle

UI updates display committed state and accepted/fallback presentation.

UI display does not create or alter effects, deltas, or committed state.

---

# 9. Examples

## 9.1 Combat damage after check

```text
CheckResult: attack direct hit
Effect: damage, amount 5, target enemy actor
StateDelta: actor.hp.current adjust -5
StateDelta visibility: visible to player unless enemy HP is concealed by UI policy
Mechanical log: hit, damage 5, HP changed or visible summary
Narration: may describe impact, may not change damage amount
```

## 9.2 Mitigation changes damage before delta

```text
Effect: damage, amount 5
Effect: mitigation, amount 2, modifies effect resolution only
Final generated StateDelta: actor.hp.current adjust -3
```

Mitigation should not create a second conflicting HP delta unless the lane/rule explicitly represents absorbed damage separately.

## 9.3 Hidden trace from terminal spoof

```text
Effect: counter_shift, trace +1, hidden
StateDelta: scene.counters.trace increment_step +1
VisibilityPolicy: hidden from player; API DM may not reveal exact trace value
Narration: terminal accepts the spoof; no exact trace mention unless permitted
```

## 9.4 Objective progress

```text
Effect: objective_progress, +1 segment
StateDelta: mission.objectives[obj_ref].progress increment_step +1
VisibilityPolicy: visible to player
UI: objective tracker updates
Narration: may describe progress, not invent completion if progress remains incomplete
```

## 9.5 Scheduled patrol consequence

```text
Effect: scheduled_consequence, patrol responds on clock threshold
StateDelta: schedule.effects[scheduled_effect_ref] add scheduled effect
VisibilityPolicy: hidden from player; Context Broker may withhold from API DM unless needed
Later trigger: scheduled effect generates patrol arrival deltas
```

---

# 10. Anti-drift rules

## 10.1 Do not collapse effect and delta

Avoid object shapes where one field tries to be both consequence and committed mutation.

Bad pattern:

```text
result: "The guard takes 4 damage and becomes alerted."
```

Better pattern:

```text
Effect: damage 4
StateDelta: guard.hp adjust -4
Effect: status_apply alerted
StateDelta: guard.statuses add alerted
Narration: describes visible consequence within committed facts
```

## 10.2 Do not store mechanical consequence only as prose

Any consequence that affects future validation, target validity, costs, difficulty, counters, clocks, route state, NPC state, map options, or player knowledge must be represented in state or logs.

## 10.3 Do not let UI infer state mutation

A UI animation, badge, row color, map highlight, or chat line is not a state mutation unless it reflects committed state.

## 10.4 Do not let API DM patch failed commits

If delta validation fails, API DM narration cannot rescue the transaction by describing a softer success.

The transaction must reject, rerun, clarify, fallback, or flag.

---

# 11. Relationship to #38 and #39

## 11.1 #38 relationship

#38 owns the object stack and boundary:

```text
ResolutionOutput
→ Effect
→ StateDelta
→ ResolutionLogEntry
→ DMNarrationRequest / Response
→ UIUpdateBundle
```

#40 owns the grammar inside `Effect`, `EffectSet`, `StateDelta`, `StateDeltaSet`, operation handling, visibility metadata implications, duration/expiration, scheduled effects, and reducer implications.

This pass does not reopen #38.

## 11.2 #39 relationship

#39 owns check family behavior and check result production.

#40 starts after a check or deterministic resolution has produced a result needing consequences.

Check families may influence:

- which effects are generated;
- result band mapping;
- dirty/clean consequences;
- graze/direct/miss consequences;
- extended progress consequences;
- hidden consequence generation.

#40 does not reopen check-family foundations.

---

# 12. Out of scope for #40

This draft intentionally does not finalize:

- final TypeScript interfaces;
- final reducer implementation;
- final state-lane registry from #36;
- final check-family registry from #39;
- full combat damage tables;
- full social counter tables;
- full ability/equipment/status registry;
- final effect-type registry;
- final UI presentation schema;
- final Context Broker packet schema;
- A1 replacement prose;
- source canon promotion;
- app implementation.

---

# 13. Acceptance coverage for Define effect and state-delta grammar:#40

This draft covers:

- distinction between `Effect` and `StateDelta`;
- mutable surface boundary;
- state lane and path targeting requirement;
- operation grammar;
- payload grammar;
- visibility metadata shape and hidden-state rules;
- temporary, persistent, scheduled, triggered, and expiration handling;
- reducer validation implications;
- commit failure handling;
- examples across combat, mitigation, hidden trace, objective progress, and scheduled consequences;
- dependency routing back to #38 and #39 without reopening their foundations.

This draft intentionally remains a contract draft, not source canon or implementation code.
