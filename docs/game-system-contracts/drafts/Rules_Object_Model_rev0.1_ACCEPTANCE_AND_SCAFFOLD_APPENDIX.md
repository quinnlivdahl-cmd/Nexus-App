# Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX

Date: 2026-06-12  
Mode: Draft  
Related issue: Define rules object model for actions, checks, effects, and logs:#38  
Parent issue: Epic: Sequence Nexus app-facing game-rule/system design:#33  
Primary draft supplemented: `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`  
Status: working draft appendix / acceptance and scaffold review  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

`docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`

## Replaces

Nothing.

This appendix supplements `Rules_Object_Model_rev0.1.md`. Do not delete, archive, supersede, or replace the primary #38 object-model draft, schema working draft, #34 authority split draft, #35 turn transaction draft, #36 state-lane draft, legacy GPT-DM / DM Mode material, or existing gameplay source based on this appendix.

## Source/currentness status

This is a repo-side draft appendix based on ChatGPT Draft Mode work, the active bridge baseline, GitHub Issue #38, and the existing committed #38 draft artifact. It has not been verified against live local `00 Source` and is not source canon.

## Locked decision

`ValidatedAction` remains a named object in the #38 rev0.1 contract.

Reason: `ActionRequest` must not mean both “the player/API/UI proposed this” and “Rules Core approved this.” Keeping `ValidatedAction` prevents app-flow bugs where proposed intent is accidentally treated as mechanically valid action truth.

## Acceptance review

### Acceptance criteria status

- Core object list is confirmed or revised: mostly satisfied.
  - Revision accepted: include `ValidatedAction` as a named object.
  - Revision accepted: include scene-interaction contract objects as reference-bearing objects, not final registries.

- Each object has a purpose definition: satisfied in primary draft.

- Mandatory vs optional fields are identified at draft level: mostly satisfied.
  - Current draft uses composed-from lists with optional fields identified.
  - Future Codex/TypeScript pass may convert these into exact required/optional property syntax.

- DM-facing vs rules-core-only objects are distinguished: partially satisfied.
  - This appendix adds the compact routing summary needed for implementation planning.

- Stored vs transient objects are distinguished: satisfied in primary draft; compact summary below.

- Log/UI objects are distinguished from state mutation objects: satisfied.
  - `StateDelta` is the only object that may directly mutate committed game state, and only after validation and commit.
  - `ResolutionLogEntry`, `DMNarrationResponse`, and `UIUpdateBundle` are presentation/log objects, not mutation authority.

- TypeScript scaffold implications are stated: satisfied by this appendix at rev0.1 planning level.

- Follow-up dependencies for check families and effect/state-delta grammar are identified: satisfied.
  - #39 owns check-family behavior and selection rules.
  - #40 owns effect/state-delta grammar.
  - #41 owns compact DM context broker / narration packet details.

## Scaffold maturity categories

### Safe to scaffold as rev0.1 TypeScript object shapes

These objects have stable enough boundaries for draft interfaces or type aliases. Codex may adjust field names and repo conventions, but should preserve boundaries.

- `InputEnvelope`
- `DMIntentProposal`
- `ActionRequest`
- `ValidationResult`
- `ValidatedAction`
- `CheckInput`
- `CheckModifierSet`
- `CheckModifier`
- `CheckResult`
- `ResolutionOutput`
- `Effect`
- `StateDelta`
- `ResolutionLogEntry`
- `DMNarrationRequest`
- `DMNarrationResponse`
- `UIUpdateBundle`

### Safe to scaffold as lightweight refs / shared parts

These should begin as simple references, metadata objects, or constrained string unions where appropriate. Do not turn them into heavy registries yet.

- `ActorRef`
- `TargetRef`
- `SceneRef`
- `EncounterRef`
- `TransactionRef`
- `ActionRef`
- `ActionRequestRef`
- `ValidatedActionRef`
- `CheckRef`
- `EffectRef`
- `StateDeltaRef`
- `LogRef`
- `SourceRef`
- `SceneEntityRef`
- `ActionSurfaceRef`
- `MapOptionRef`
- `StateLaneRef`
- `Origin`
- `LifecycleState`
- `VisibilityPolicy`
- `ReviewFlag`

### Do not finalize as registries in #38

These names may appear as placeholders, but their final registries or grammars belong to later work.

- `CheckFamily` — #39
- `ResultBand` — #39 / check-resolution tuning
- `EffectPayload` — #40
- `StateDeltaPayload` — #40
- `ActionCategory` — later action registry
- `SurfaceCategory` — later surface registry
- `EntityClass` — later scene/entity registry
- `EntityType` — later scene/entity registry
- `EntityProperties` — later scene/entity registry
- `Skill / Ability Hooks` — later character/progression/ability schema
- exact `DMNarrationRequest` context packet details — #41

## Compact object boundary summary

### Proposal / request layer

#### `InputEnvelope`

- Owner: UI / App Shell
- Stored: transient; optional audit/debug
- DM-facing: only when interpretation is needed
- UI/log-facing: yes as input history/debug
- Mutates state: no
- Scaffold status: stable draft object

#### `DMIntentProposal`

- Owner: API DM proposes; Rules Core validates
- Stored: transient; optional audit/debug
- DM-facing: yes
- UI/log-facing: usually no, except debug/review
- Mutates state: no
- Scaffold status: stable draft object

#### `ActionRequest`

- Owner: UI / App Shell or API DM creates; Rules Core validates
- Stored: transient unless logged
- DM-facing: possible, but not authoritative
- UI/log-facing: optional request history
- Mutates state: no
- Scaffold status: stable draft object

#### `ValidationResult`

- Owner: Rules Core
- Stored: transient; optional log/debug
- DM-facing: only if needed for clarification/narration
- UI/log-facing: yes for blocked/clarification states
- Mutates state: no
- Scaffold status: stable draft object

#### `ValidatedAction`

- Owner: Rules Core
- Stored: transient; log reference allowed
- DM-facing: only through constrained resolved context
- UI/log-facing: summary only
- Mutates state: no
- Scaffold status: stable draft object
- Decision: keep as named #38 object

### Resolution layer

#### `CheckInput`

- Owner: Rules Core
- Stored: transient; summarized in log
- DM-facing: no by default
- UI/log-facing: summary only
- Mutates state: no
- Scaffold status: stable draft object

#### `CheckModifierSet`

- Owner: Rules Core
- Stored: transient; summary may be logged
- DM-facing: no by default
- UI/log-facing: summary only
- Mutates state: no
- Scaffold status: stable draft object

#### `CheckModifier`

- Owner: Rules Core
- Stored: transient unless persistent source/effect/equipment
- DM-facing: no by default
- UI/log-facing: visible only if player-facing
- Mutates state: no
- Scaffold status: stable draft object

#### `CheckResult`

- Owner: Rules Core
- Stored: mechanical log summary; full detail optional
- DM-facing: constrained resolved fact only
- UI/log-facing: yes
- Mutates state: no
- Scaffold status: stable draft object

#### `ResolutionOutput`

- Owner: Rules Core
- Stored: transient until log/deltas commit
- DM-facing: no raw access; routed through `DMNarrationRequest`
- UI/log-facing: summary only
- Mutates state: no directly
- Scaffold status: stable draft object

#### `Effect`

- Owner: Rules Core
- Stored: only if ongoing/scheduled
- DM-facing: constrained summary only
- UI/log-facing: visible effects only
- Mutates state: no directly; may generate `StateDelta`
- Scaffold status: boundary stable; grammar deferred to #40

### Commit / presentation layer

#### `StateDelta`

- Owner: Rules Core produces; Game State Store validates/commits
- Stored: yes
- DM-facing: only filtered committed facts
- UI/log-facing: visible changes only
- Mutates state: yes, after commit barrier
- Scaffold status: boundary stable; grammar deferred to #40

#### `ResolutionLogEntry`

- Owner: Rules Core creates; Game State Store records
- Stored: yes
- DM-facing: filtered by Context Broker
- UI/log-facing: yes
- Mutates state: no
- Scaffold status: stable draft object

#### `DMNarrationRequest`

- Owner: Context Broker / App Shell
- Stored: optional debug/audit
- DM-facing: yes
- UI/log-facing: no, except debug
- Mutates state: no
- Scaffold status: boundary stable; exact packet deferred to #41

#### `DMNarrationResponse`

- Owner: API DM produces; app validates
- Stored: accepted narrative log
- DM-facing: yes
- UI/log-facing: yes
- Mutates state: no
- Scaffold status: stable draft object

#### `UIUpdateBundle`

- Owner: UI / App Shell
- Stored: no, except history/logs as needed
- DM-facing: no
- UI/log-facing: yes
- Mutates state: no
- Scaffold status: stable draft object

## TypeScript scaffold notes

### Recommended scaffold shape

Codex may create draft TypeScript types in a later implementation pass, but should avoid turning #38 into final game data.

Recommended split:

```text
rules-core/types/refs.ts
rules-core/types/lifecycle.ts
rules-core/types/visibility.ts
rules-core/types/actions.ts
rules-core/types/checks.ts
rules-core/types/effects.ts
rules-core/types/state-deltas.ts
rules-core/types/logs.ts
rules-core/types/narration.ts
rules-core/types/ui-updates.ts
```

Exact paths may vary based on current repo architecture. Codex should inspect the repo before creating files.

### Scaffold rules

- Prefer explicit interface/type names over anonymous object blobs.
- Keep refs lightweight.
- Keep payload fields extensible but named.
- Use `unknown` or narrow placeholder payload types where the owning issue has not finalized grammar.
- Do not encode final check-family behavior in #38 scaffold.
- Do not encode final effect/state-delta grammar in #38 scaffold.
- Do not let narration response types contain mutation authority.
- Do not let UI bundle types contain mutation authority.
- Preserve proposal/validation/resolution/commit/presentation separation.

### Useful implementation guardrails

- `ActionRequest` should not be accepted by reducers as a committed action.
- `ValidatedAction` should be the earliest action object allowed into resolution.
- `ResolutionOutput` should not directly mutate game state.
- `StateDelta` should be the only object accepted by commit reducers for state mutation.
- `DMNarrationResponse` should be rejected or flagged if it contradicts resolved facts.
- `ResolutionLogEntry` should retain mechanical truth even if narration is regenerated later.

## Closeout recommendation

Do not close #38 yet.

Recommended next step:

1. Have Codex/local inspect repo architecture for existing TypeScript type lanes.
2. Decide whether to create only type stubs or also lightweight test fixtures.
3. If no conflict is found, scaffold rev0.1 types from the stable object boundaries above.
4. After scaffold or explicit deferral, add a #38 closeout comment summarizing which acceptance criteria are satisfied and which issues own deferred details.
