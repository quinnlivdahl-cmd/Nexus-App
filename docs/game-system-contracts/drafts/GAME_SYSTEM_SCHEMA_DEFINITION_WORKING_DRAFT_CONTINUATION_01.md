# GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01

Date: 2026-06-12  
Mode: Draft  
Related epic: #33 — Epic: Sequence Nexus app-facing game-rule/system design  
Starting issue in this continuation: #39 — Define check family contract  
Status: working draft continuation  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

`docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`

## Supplements

This file supplements:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`
- GitHub Issue #33
- GitHub Issue #39 and later system-schema epic issues

## Replaces

Nothing.

Do not delete, archive, supersede, or replace the original grand schema working draft, #38 artifacts, legacy GPT-DM / DM Mode material, existing source docs, or gameplay source based on this continuation.

## Continuation rule

This file is the new running continuation container for the system-schema issue sequence after the original grand schema working draft became too long.

Subsequent Draft chats for #39, #40, #41, and remaining schema-epic issues should append to this file until another split is needed.

If another split becomes necessary, create a later continuation file rather than overwriting or deleting this one.

## Source/currentness status

This is a repo-side draft artifact based on ChatGPT Draft Mode work, the active bridge baseline, GitHub Issue #39, and existing committed #38 artifacts. It has not been verified against live local `00 Source` and is not source canon.

---

# Issue #39 — Check Family Contract

## 39.1 Purpose

This section defines the rev0.1 contract for Nexus check families.

The goal is to prevent check labels from becoming mushy gameplay categories.

A check family is an engine-behavior contract. It tells Rules Core how a validated action should be resolved.

It does not define final math, final source prose, ability trees, UI cards, complete TypeScript schemas, or all final result bands.

Core rule:

```text
ValidatedAction selects check behavior.
CheckFamily defines resolution shape.
Domain tags describe fiction, skill, surface, target, or UI context.
ResultBand expresses outcome inside the selected check family.
```

## 39.2 What a CheckFamily is

A `CheckFamily` is a named resolution behavior profile used by Rules Core after an action has already become a `ValidatedAction`.

It answers questions such as:

- Is this a one-roll immediate outcome?
- Is this attack-like impact against a target defense surface?
- Is this progress over time, staged work, a clock, or accumulated advantage?
- Which broad result-band set applies?
- Which modifier lanes may be relevant?
- Which target/surface/context inputs are expected?
- What broad kind of output can resolution produce?

For rev0.1, the working check families are:

```text
attack
standard
extended
```

These names are stable enough for contract drafting, but not final source-canon prose.

## 39.3 What a CheckFamily is not

A `CheckFamily` is not:

- a skill;
- an attribute;
- a character ability;
- a fictional activity domain;
- a UI category;
- a scene tag;
- a target type;
- a surface category;
- an action category;
- a source-canon rules chapter;
- a damage type;
- a final math package.

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

Those should usually be modeled as one or more of:

- `ActionCategory`
- `SurfaceCategory`
- `TargetRef` shape
- scene/entity/surface tags
- skill or ability hooks
- modifier sources
- effect profiles
- UI display groups
- Context Broker narration context
- source prose categories

Example:

```text
Persuade a guard in one exchange
→ standard check with social/domain tags

Run a social pressure scene over several exchanges
→ extended check with social/domain tags

Exploit a turret firewall to disable it immediately
→ standard check with hacking/systems tags

Crash a drone's control firewall during combat to apply impact/status
→ attack check with hacking/systems tags
```

## 39.4 Family selection from ValidatedAction

Rules Core selects the `CheckFamily` after `ActionRequest` validation and before `CheckInput` is finalized.

Normal flow:

```text
InputEnvelope
→ DMIntentProposal optional
→ ActionRequest
→ ValidationResult
→ ValidatedAction
→ CheckFamily selection
→ CheckInput
→ CheckResult
→ ResolutionOutput
```

Selection must not occur from raw player wording alone.

The player, UI, or API DM may propose action meaning. They may not create final check-family truth.

### Draft selection order

Rules Core should use this draft order unless later source or implementation review revises it:

1. **Explicit source/ability override**  
   A rule, ability, item, hazard, encounter object, or action surface explicitly requires a family.

2. **Resolution behavior requirement**  
   The validated action requires attack-like, immediate, or staged/progress resolution.

3. **Target/surface requirement**  
   The target or action surface requires a certain family shape.

4. **Default behavior**  
   Use `standard` for bounded immediate actions when no attack or extended behavior is required.

5. **Temporary ruling needed**  
   If the family cannot be selected safely, Rules Core should return a review/temporary-ruling path instead of resolving a fake check.

This is a contract-level selection order, not a final engine algorithm.

## 39.5 Attack Check

An `attack` check is used when resolution is about applying impact against a target through a defense-like surface.

Attack checks may involve:

- hit/miss/graze/direct-style outcome;
- physical defense;
- cover;
- shields;
- mitigation;
- armor/plating;
- firewall-like defense;
- hazard rating;
- damage;
- HP/SI/resource impact;
- combat status effects;
- forced movement or positional consequence;
- hostile system impact.

Attack is not limited to weapons. A hacking action can be an attack check if it is resolved like impact against a defended target.

Select `attack` when one or more are true:

- the action attempts to hit, strike, shoot, blast, breach, crash, jam, disable, or otherwise impact a target through a defense surface;
- the result can produce damage, shield behavior, mitigation, HP/SI change, or combat-like status;
- cover, defense, shield, mitigation, armor/plating, firewall, or hazard rating is mechanically relevant;
- the target has an attack-facing defense profile;
- the source rule or ability says this resolves as an attack.

Attack `CheckInput` usually needs:

- `ValidatedActionRef`
- `ActorRef`
- `TargetRef`
- selected `CheckFamily: attack`
- relevant attack/accuracy modifier lanes
- relevant defense/cover/shield/mitigation references
- attack source reference
- target defense surface reference
- visibility policy
- optional weapon/system/power/hazard/effect payload

Candidate attack result bands for contract-shape testing:

```text
miss
graze
hit
direct
critical
```

These are examples only. They are not locked source-canon band names or final math.

## 39.6 Standard Check

A `standard` check is used when the resolution is a bounded immediate action.

It resolves a question like:

```text
Does this action succeed now, fail now, or succeed with a bounded complication?
```

Standard checks include actions such as:

- bypass a lock;
- persuade a guard in one exchange;
- stabilize an ally;
- scan a room;
- repair a damaged panel quickly;
- identify a threat;
- climb a short obstacle;
- spoof a credential for immediate access.

Select `standard` when one or more are true:

- the action has an immediate bounded outcome;
- progress tracking is not the main mechanic;
- attack-facing damage/defense/mitigation behavior is not central;
- the action can be resolved with one check and one immediate `ResolutionOutput`;
- no source rule or surface requires `attack` or `extended`.

Standard `CheckInput` usually needs:

- `ValidatedActionRef`
- `ActorRef`
- optional `TargetRef`
- selected `CheckFamily: standard`
- relevant skill/approach/tool/context modifier lanes
- target score or difficulty source if applicable
- surface or scene context reference
- visibility policy
- optional domain-specific payload

Candidate standard result bands for contract-shape testing:

```text
fail
dirty_success
clean_success
strong_success
```

These are examples only. They are not locked source-canon band names or final math.

## 39.7 Extended Check

An `extended` check is used when the resolution is progress over time, staged work, clocks, repeated effort, accumulated advantage, or scene pressure.

It resolves a question like:

```text
How much progress, risk, exposure, cost, or advantage changes after this step?
```

Extended checks include:

- long repair;
- infiltration route;
- investigation chain;
- social pressure scene;
- hacking sequence;
- medical procedure;
- research project;
- staged extraction;
- multi-step objective work.

Select `extended` when one or more are true:

- the action advances a clock, track, counter, route, project, or staged objective;
- repeated attempts are expected;
- partial progress matters;
- accumulated advantage matters;
- risk/exposure/cost can change without the entire objective resolving immediately;
- the action is one step inside a larger structured scene;
- a source rule, surface, or objective says progress is tracked.

Extended `CheckInput` usually needs:

- `ValidatedActionRef`
- `ActorRef`
- optional `TargetRef`
- selected `CheckFamily: extended`
- progress target or clock reference
- current progress/counter state reference
- relevant modifier lanes
- risk/exposure/cost references if applicable
- visibility policy
- optional project/scene/stage payload

Candidate extended result bands for contract-shape testing:

```text
setback
no_progress
progress_with_cost
progress
major_progress
breakthrough
```

These are examples only. They are not locked source-canon band names or final math.

## 39.8 Required check-family definition metadata

A future `CheckFamilyDefinition` should include these fields at draft level:

```text
CheckFamilyDefinition
- id
- displayName
- purpose
- selectionTriggers
- exclusionRules
- expectedValidatedActionFields
- expectedTargetRefShape
- expectedCheckPayloadShape
- allowedModifierLanes
- defaultResultBandSetRef
- allowedEffectProfiles
- allowedStateDeltaProfiles
- logSummaryShape
- uiSummaryHints
- dmNarrationHints
- scaffoldMaturity
- owningIssue
- status
```

This is metadata shape only. It does not lock final TypeScript property syntax.

## 39.9 How CheckInput uses selected CheckFamily

`CheckInput` should carry a selected `CheckFamily`.

A `CheckInput` without a selected family is incomplete unless the action does not require a check.

Rules Core builds `CheckInput` by combining:

```text
ValidatedAction
+ selected CheckFamily
+ relevant target/surface/state context
+ CheckModifierSet
+ family-specific CheckPayload
+ visibility policy
```

Contract rule:

```text
CheckFamily constrains CheckInput.
CheckInput does not invent CheckFamily.
```

If `CheckInput` cannot satisfy the selected family’s required shape, Rules Core should return a validation/review problem rather than resolving a fake check.

## 39.10 ResultBand relationship

`ResultBand` belongs to check resolution output, but its meaning depends on the selected `CheckFamily`.

Contract rule:

```text
ResultBand is interpreted inside a CheckFamily.
```

Examples:

```text
attack + graze
→ partial attack impact profile

standard + dirty_success
→ immediate success with bounded cost/trace/residue

extended + progress_with_cost
→ progress increases and a risk/cost counter also moves
```

This section does not finalize:

- Lattice-100 thresholds;
- target score math;
- exact hit bands;
- exact standard success bands;
- exact extended progress bands;
- final dirty-success labels;
- final crit/direct language;
- exact modifier stacking;
- exact probability targets.

## 39.11 Stable enough for TypeScript scaffold notes

Stable enough for rev0.1 scaffold planning:

```text
CheckFamilyId
CheckFamilyDefinition
CheckFamilySelectionInput
CheckFamilySelectionResult
ResultBandSetRef
```

Possible draft id shape:

```text
attack
standard
extended
```

Scaffold guardrails:

- Do not encode final math.
- Do not encode final result thresholds.
- Do not treat Hacking/Social/Medical/etc. as family ids.
- Do not allow API DM narration to select final family.
- Do not allow raw `ActionRequest` into check resolution.
- Do not allow `CheckInput` without selected family unless no check is required.
- Keep result-band sets extensible.
- Keep payloads provisional where #40/#41 dependencies still own details.

## 39.12 Deferred work

Deferred to later tuning / rules math:

- exact RNG implementation;
- exact Target Score formula placement;
- exact family-specific thresholds;
- exact attack hit/graze/direct/crit math;
- exact standard dirty/clean result splits;
- exact extended clock/progress increments;
- final modifier lane values and stacking interactions.

Deferred to #40:

- final effect grammar;
- final state-delta grammar;
- effect-to-delta conversion;
- temporary vs persistent effect expiration;
- reducer implications;
- visibility and hidden-state delta treatment.

Deferred to #41:

- exact DM narration packet schema;
- compact DM context broker rules;
- what resolved facts are sent to API DM;
- narration omissions;
- contradiction validation.

Deferred to later source/rules prose:

- A1 replacement prose;
- player-facing check explanations;
- final combat/noncombat chapter wording;
- examples in final source voice;
- ability and progression interactions.

Deferred to Codex/local:

- inspect current repo architecture for TypeScript type lanes;
- decide exact scaffold path;
- run validation;
- commit only after review/approval or explicit implementation instruction.

---

# Issue #40 — Effect / StateDelta Grammar

## 40.1 Purpose

This section defines the rev0.1 contract for `Effect` and `StateDelta` grammar.

The goal is to prevent abilities, checks, API DM narration, UI display, or loose prose from producing bespoke state changes.

Core rule:

```text
Resolution may produce Effects.
Effects may generate StateDeltas.
Only validated StateDeltas may cross the commit barrier.
Narration never mutates state.
```

This section does not define final TypeScript schemas, final reducer code, final source-canon wording, final ability lists, final status registry, or final tuning values.

## 40.2 Core distinction

An `Effect` is a mechanical consequence expression.

A `StateDelta` is a validated state mutation instruction.

Short boundary:

```text
Effect = what the rules say should happen.
StateDelta = the exact state change to commit.
```

Example:

```text
Effect:
Apply 4 damage to target after mitigation.

StateDelta:
actor.hp current 8 -> 4.
```

Another example:

```text
Effect:
Open the hatch and add concealed trace.

StateDeltas:
hatch.state closed -> open.
trace.counter +1, concealed_from_player.
```

An `Effect` may be transient, ongoing, scheduled, conditional, hidden, or visible.

A `StateDelta` is commit-facing. It must name the target, state lane, operation, payload, visibility, source, transaction, and validation result.

## 40.3 What an Effect is

An `Effect` is a structured mechanical consequence produced by Rules Core after action validation and resolution.

Effects answer:

- What consequence was generated?
- Who or what does it affect?
- Is it immediate, ongoing, scheduled, triggered, or conditional?
- Does it create one or more `StateDelta`s?
- Is it visible, concealed, UI-only, DM-visible, or rules-core-only?
- Does it require expiration, display, or future trigger handling?

Effects are not:

- narration;
- UI text;
- source prose;
- player intent;
- API DM memory;
- raw ability description;
- committed game state;
- reducer code;
- unvalidated mutation authority.

Contract rule:

```text
Effect describes consequence.
Effect does not directly commit state.
```

## 40.4 What a StateDelta is

A `StateDelta` is a validated change to one state lane.

StateDeltas answer:

- Which state lane changes?
- Which target or object changes?
- What operation is applied?
- What payload is committed?
- Which transaction caused it?
- Which source rule, effect, action, or system produced it?
- Is it visible or concealed?
- Is it immediate, scheduled, temporary, or persistent?
- Did validation pass?

StateDeltas are not:

- narration;
- logs by themselves;
- UI bundles;
- proposed consequences;
- freeform patches;
- API DM suggestions;
- broad update game instructions;
- unchecked JSON blobs.

Contract rule:

```text
StateDelta is the only normal object accepted by commit reducers for state mutation.
```

## 40.5 Draft resolution-to-commit flow

Normal flow:

```text
ValidatedAction
→ CheckInput, if needed
→ CheckResult, if needed
→ ResolutionOutput
→ EffectSet
→ StateDeltaSet
→ delta validation
→ commit barrier
→ Game State Store update
→ ResolutionLogEntry
→ ResolvedFactsPacket
→ API DM narration
→ UIUpdateBundle
```

Rules Core owns effect creation.

Rules Core or the transaction layer may derive `StateDelta`s from effects.

Game State Store commits validated deltas.

API DM narration receives resolved facts after resolution and may not alter effects, deltas, committed state, hidden consequences, or mechanical logs.

## 40.6 Effect grammar rev0.1

A future `Effect` should include these draft fields:

```text
Effect
- effectRef
- transactionRef
- sourceRef
- validatedActionRef, if action-sourced
- checkResultRef, if check-sourced
- actorRef, if any
- targetRef
- effectType
- effectProfile
- effectPayload
- scope
- duration, if any
- timing
- triggerCondition, if any
- stackingRule, if ongoing or repeated
- visibilityPolicy
- createsStateDelta yes/no
- generatedStateDeltaRefs, if created
- displayHint, if visible
- narrationHint, if narratable
- validationResult
- reviewFlag, if needed
```

This is shape language, not final property syntax.

## 40.7 Effect timing types

Draft timing types:

```text
immediate
ongoing
scheduled
triggered
conditional
reaction
expiration
```

Meanings:

- `immediate` — resolves now during the current transaction.
- `ongoing` — remains active until duration, condition, or removal.
- `scheduled` — creates a future check, event, expiration, or delta.
- `triggered` — waits for a defined event.
- `conditional` — applies only while a condition remains true.
- `reaction` — resolves in response to another action or event.
- `expiration` — removes or modifies a temporary effect when its duration ends.

Timing does not make the effect authoritative by itself. Any actual state change still requires `StateDelta` validation and commit.

## 40.8 Candidate effect profile families

Draft effect profile families:

```text
damage
healing
resource_change
status_apply
status_remove
status_modify
movement
position_change
forced_movement
shield_change
mitigation_change
objective_progress
clock_change
counter_change
surface_state_change
scene_entity_change
map_option_change
inventory_change
equipment_change
visibility_change
reveal
conceal
summon_or_spawn
remove_or_despawn
scheduled_event
log_or_flag
temporary_ruling_flag
```

These are candidate profile families only. They are not final source-canon registry names.

Profile families exist to keep result bands and abilities from inventing arbitrary outcomes.

Examples:

```text
attack + direct
→ damage effect profile
→ hp StateDelta

standard + dirty_success
→ surface_state_change + counter_change profile
→ hatch open StateDelta + concealed trace StateDelta

extended + progress_with_cost
→ objective_progress + clock_change profile
→ progress StateDelta + exposure/risk StateDelta
```

## 40.9 Effect failure after check resolution

Effects should not casually fail again after a check has already resolved.

Default rule:

```text
If a check succeeds and produces an effect, the effect should either generate valid StateDeltas or produce a clear validation/review problem.
```

Effects may be blocked, reduced, converted, or rejected after resolution only when a defined rule or current state requires it.

Allowed reasons:

- target state changed before commit;
- target no longer exists or is no longer valid;
- immunity, shield, mitigation, cover, firewall, or protection rule applies;
- stacking rule prevents application;
- duration or timing condition is invalid;
- state lane rejects the operation;
- stale transaction/version conflict;
- visibility or hidden-state rule blocks disclosure, not the underlying delta;
- temporary ruling/review path is required.

When an effect cannot produce the expected delta, the result must be logged as one of:

```text
effect_applied
effect_partially_applied
effect_blocked
effect_converted
effect_rejected
effect_needs_review
```

Do not silently drop effects.

## 40.10 StateDelta grammar rev0.1

A future `StateDelta` should include these draft fields:

```text
StateDelta
- stateDeltaRef
- transactionRef
- sourceRef
- effectRef, if effect-sourced
- validatedActionRef, if action-sourced
- stateLaneRef
- targetRef
- operation
- statePath or stateKey
- beforeSnapshotRef or expectedBeforeValue, when needed
- payload
- scope
- duration, if temporary
- visibilityPolicy
- validationResult
- commitStatus
- committedAt, if committed
- logRef, if logged
- reviewFlag, if needed
```

This is shape language, not final property syntax.

## 40.11 StateDelta operations rev0.1

Draft operation set:

```text
set
add
subtract
increment
decrement
apply
remove
replace
move
create
delete_or_remove
reveal
conceal
schedule
cancel
expire
append_log
flag_review
```

Operation meanings:

- `set` — assign a known value.
- `add` / `subtract` — numeric or collection change where supported.
- `increment` / `decrement` — counter/clock shorthand.
- `apply` — add a status, condition, modifier, or ongoing effect.
- `remove` — remove a status, condition, modifier, or ongoing effect.
- `replace` — swap one defined value/object for another.
- `move` — change position, node, zone, route, or map location.
- `create` — create a stateful object, surface, option, timer, or scheduled event.
- `delete_or_remove` — remove a stateful object when the lane allows it.
- `reveal` — change visibility from concealed/unrevealed to visible/known.
- `conceal` — mark hidden/internal state or withhold player visibility.
- `schedule` — create a future trigger, expiration, check, or delta.
- `cancel` — cancel scheduled/ongoing effect when valid.
- `expire` — end a temporary effect or status.
- `append_log` — add audit/log entry without mutating gameplay state.
- `flag_review` — mark temporary ruling, contradiction, invalid delta, or design gap.

Final reducer implementation may split or rename these operations. The contract point is that operations must be constrained and validated, not arbitrary patches.

## 40.12 Mutable state lanes rev0.1

Draft mutable surfaces include:

```text
actor_resources
actor_health
actor_si
actor_action_economy
actor_position
actor_status
actor_condition
actor_inventory
actor_equipment
shield_state
mitigation_state
map_position
map_option_state
cover_or_visibility_state
scene_entity_state
action_surface_state
objective_state
clock_state
counter_state
exposure_state
disposition_state
op_knowledge_state
relationship_state
faction_state
hidden_internal_state
scheduled_effect_state
summary_state
log_state
review_state
```

These are draft lane names only. They are not final source-canon or implementation names.

Boundary:

```text
If a state change cannot name an allowed lane, target, operation, and payload, it should not commit.
```

## 40.13 Rules-core-only and hidden state surfaces

Some state surfaces may be rules-core-only, context-broker-only, or concealed from the player.

Examples:

- hidden trace;
- concealed alert level;
- unrevealed patrol clock;
- undiscovered objective branch;
- enemy intent state;
- pending consequence;
- internal cooldown;
- scheduled ambush;
- temporary ruling review flag.

Hidden state is still state.

Contract rule:

```text
Hidden consequences must be stored as committed state, scheduled effects, counters, clocks, logs, summaries, or review flags.
They must not live only in API DM memory or narration.
```

Visibility controls who can see or narrate the consequence. Visibility does not decide whether the consequence exists.

## 40.14 VisibilityPolicy requirement

Every `Effect` and `StateDelta` needs a `VisibilityPolicy`.

Draft visibility outcomes:

```text
visible_to_player
visible_to_ui_only
visible_to_api_dm
visible_to_context_broker_only
visible_to_rules_core_only
concealed_from_player
unrevealed_until_trigger
debug_only
```

Draft concealed handling:

```text
withhold
send_no_narrate
send_symptom_only
send_partial_reveal
send_full_reveal
internal_summary_only
```

Examples:

```text
Trace +1 from dirty success
→ StateDelta committed to exposure/trace lane
→ concealed_from_player
→ API DM may receive send_no_narrate or symptom_only depending on packet rules

Hatch opens
→ StateDelta committed to scene/map surface
→ visible_to_player
→ API DM may narrate hatch opening
```

## 40.15 Temporary and ongoing effects

Temporary effects require an expiration path.

A temporary effect should define at least one of:

- round count;
- turn count;
- scene duration;
- encounter duration;
- clock expiration;
- trigger condition;
- removal condition;
- source cancellation;
- manual review/cleanup condition.

Contract rule:

```text
Temporary state must either schedule its own expiration or point to a lifecycle rule that will expire it.
```

Examples:

```text
Apply Jammed for 2 rounds
→ StateDelta apply status: jammed
→ scheduled expiration delta at round end +2

Apply Hidden Until Revealed
→ StateDelta conceal state
→ RevealRule defines trigger
→ future reveal StateDelta when trigger fires
```

Ongoing effects should be stored only if they matter after the current resolution transaction.

## 40.16 Stacking and replacement

Ongoing or repeated effects need a `StackingRule`.

Draft stacking rules:

```text
replace_existing
refresh_duration
increase_stack_count
increase_magnitude
keep_highest
keep_lowest
coexist_if_distinct_source
reject_duplicate
convert_to_other_effect
```

Stacking is an effect-level rule that determines what deltas are generated.

Example:

```text
Apply Burning again
→ stackingRule: refresh_duration
→ StateDelta replace duration
```

Not:

```text
API DM says the fire is worse
→ state changes
```

## 40.17 CheckFamily relationship

`CheckFamily` constrains which effect and delta profiles may be produced.

Draft relationship:

```text
CheckFamily
→ ResultBand
→ allowed EffectProfiles
→ allowed StateDeltaProfiles
```

Examples:

```text
attack
→ miss/graze/hit/direct/critical style bands
→ damage, shield, mitigation, forced movement, combat status, resource impact

standard
→ fail/dirty_success/clean_success/strong_success style bands
→ surface state, reveal/conceal, resource cost, trace/residue, immediate status, inventory change

extended
→ setback/no_progress/progress/progress_with_cost/breakthrough style bands
→ progress, clocks, counters, accumulated advantage, exposure/risk, staged objective state
```

This section does not finalize exact band names or math.

## 40.18 Reducer validation rules

Before commit, every `StateDelta` should be checked for:

- valid transaction;
- valid source;
- valid target;
- valid state lane;
- allowed operation for that lane;
- valid payload shape for that operation;
- current-state compatibility;
- stacking/expiration compatibility;
- visibility policy;
- scope;
- duration or trigger rule if temporary/scheduled;
- stale state/version conflict;
- review flag requirements.

Reducer boundary:

```text
Reducers accept validated StateDeltas.
Reducers do not accept API DM narration, raw Effects, raw ActionRequests, or freeform patches as mutation authority.
```

## 40.19 Atomicity and partial commit

Default rule:

```text
A resolution transaction should commit its validated StateDeltaSet atomically when the deltas are mutually dependent.
```

Partial commit is allowed only when the `ResolutionOutput` or effect profile explicitly marks deltas as independently committable.

Examples:

```text
Dependent:
Damage + downed status from the same attack.
If HP delta fails, downed status should not commit independently.

Independent:
Open hatch + concealed trace.
If trace lane validation fails, hatch may still open only if the effect profile marks trace as non-blocking and logs the rejected trace delta.
```

No silent partial commits.

## 40.20 Logs and resolved facts

Effect and delta resolution should produce loggable mechanical truth.

`ResolutionLogEntry` should preserve:

- validated action summary;
- check family, if any;
- result band, if any;
- effect summary;
- delta summary;
- visible consequence;
- concealed consequence marker, if allowed;
- blocked/rejected/converted effect or delta notes;
- review flags;
- temporary ruling markers.

The API DM should narrate from `ResolvedFactsPacket`, not from raw reducers or hidden state dumps.

## 40.21 DM narration boundary

API DM may narrate:

- visible effects;
- visible deltas;
- visible symptoms of hidden deltas when allowed;
- resolved consequences;
- fixed costs and outcomes;
- visible state changes.

API DM may not:

- add new effects;
- remove effects;
- change delta magnitude;
- change delta target;
- reveal concealed deltas without permission;
- convert a dirty success into clean success;
- invent uncommitted future consequences;
- treat prose memory as state;
- alter map geometry, resources, statuses, clocks, counters, or logs.

Contract rule:

```text
Narration explains committed or commit-ready mechanical truth.
Narration does not create mechanical truth.
```

## 40.22 Examples

### Attack example

```text
ValidatedAction:
Rifle attack against drone.

CheckFamily:
attack.

ResultBand:
direct.

Effect:
damage profile, target drone, magnitude 6 before mitigation.

StateDeltas:
shield or mitigation delta if applicable.
drone HP/SI delta.
status/destroyed delta if threshold reached.
log delta or log entry.

Narration:
May describe impact after resolved facts are fixed.
```

### Standard dirty success example

```text
ValidatedAction:
Spoof credential reader.

CheckFamily:
standard.

ResultBand:
dirty_success.

Effects:
open gate.
add concealed trace.

StateDeltas:
credential reader / hatch state changes to open or unlocked.
trace counter increments by 1 with concealed visibility.

Narration:
May say the hatch opens after a slight delay.
May not reveal the trace unless visibility rules allow it.
```

### Extended progress example

```text
ValidatedAction:
Work through a multi-step repair.

CheckFamily:
extended.

ResultBand:
progress_with_cost.

Effects:
increase repair progress.
increase pressure clock or spend resource.

StateDeltas:
objective progress +1.
pressure clock +1 or resource -1.

Narration:
May describe progress and visible cost.
May not change the amount of progress.
```

## 40.23 Stable enough for TypeScript scaffold notes

Stable enough for rev0.1 scaffold planning:

```text
Effect
EffectSet
EffectProfile
EffectTiming
EffectApplicationStatus
StateDelta
StateDeltaSet
StateLaneRef
StateDeltaOperation
StateDeltaCommitStatus
StateDeltaValidationResult
```

Scaffold guardrails:

- Do not encode final source-canon effect registry.
- Do not encode final ability trees.
- Do not encode final result-band math.
- Keep payloads typed but extensible.
- Do not let reducers accept narration text.
- Do not let API DM packets create mutation authority.
- Require state lane, target, operation, payload, and visibility policy.
- Preserve hidden-state handling as committed state, not DM memory.
- Keep scheduled/temporary effect expiration explicit.

## 40.24 Deferred work

Deferred to later source/rules prose:

- final player-facing explanation of effects;
- final status/effect naming;
- final source-canon examples;
- A1 replacement prose;
- combat/noncombat chapter wording.

Deferred to later implementation:

- exact TypeScript interfaces;
- exact reducer file paths;
- exact payload discriminated unions;
- exact state lane names;
- exact operation enum names;
- validation test fixtures;
- migration from draft names to app code.

Deferred to later tuning:

- damage values;
- healing values;
- trace/exposure increments;
- progress amounts;
- clock speeds;
- duration lengths;
- stacking values.

Deferred to #41 / Context Broker:

- exact `ResolvedFactsPacket` shape;
- exact API DM narration packet;
- exact hidden consequence narration rules;
- exact contradiction retry/fallback behavior.

## 40.25 Acceptance coverage for #40

This section covers:

- distinction between `Effect` and `StateDelta`;
- what rules are allowed to change;
- effect grammar;
- state-delta grammar;
- mutable state surfaces;
- hidden effect/state handling;
- temporary and ongoing effect expiration;
- effect failure/block/partial-application handling;
- reducer validation and commit boundary;
- DM narration boundary;
- relationship to #39 check families and result bands;
- scaffold implications without implementing code.

This remains running-draft content, not source canon or implementation code.
