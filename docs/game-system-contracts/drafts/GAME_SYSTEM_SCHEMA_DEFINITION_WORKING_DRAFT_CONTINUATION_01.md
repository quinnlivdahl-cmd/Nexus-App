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
