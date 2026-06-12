# Rules_Object_Model_rev0.1

Date: 2026-06-12  
Mode: Draft  
Related issue: Define rules object model for actions, checks, effects, and logs:#38  
Parent issue: Epic: Sequence Nexus app-facing game-rule/system design:#33  
Depends on: #34, #35, #36  
Status: working draft / compact continuation artifact  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

`docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`

This file supplements:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`
- GitHub issue #38

Issue #38 suggested `.agents/plans/` as a possible repo lane. This draft uses `docs/game-system-contracts/drafts/` to stay aligned with the existing game-system contract draft lane and avoid duplicate draft authority.

## Replaces

Nothing.

Do not delete, archive, supersede, or replace legacy GPT-DM / DM Mode material, existing gameplay source, the schema working draft, Issue #34 material, Issue #35 material, or Issue #36 material as part of this pass. This file is a follow-on object-model contract draft.

## Source/currentness status

This is a repo-side draft contract artifact. It is based on ChatGPT Draft Mode work, uploaded bridge baseline context, Issue #38 requirements, and prior committed/issue-commented work for #34, #35, and #36. It is not verified against live local `00 Source` and is not source canon.

## Preservation / drafting notes

User instructions captured during this drafting sequence:

- Before drafting, ask only questions needed for decisions that affect gameplay, gameplay app flow, or project workflow.
- Do not ask the user for semantic decisions unless they directly affect play or execution.
- Make architectural/schema decisions without user input unless they are genuinely game-changing.
- When user input is needed for a game-changing decision, explain it with a simple analogy, such as LEGO-style composition.
- This draft should preserve accepted substance. Codex/local may adjust headings, placement, cross-links, and repo formatting as needed, but should not rewrite gameplay/app-flow decisions unless a concrete conflict is found.

---

# 1. Purpose

This document defines the rev0.1 app-facing object model for Nexus actions, checks, effects, state deltas, logs, DM intent handling, and UI presentation.

The purpose is not to define every final registry, ability list, surface list, or TypeScript implementation. The purpose is to lock object boundaries tightly enough that Codex/local can scaffold later work without letting API DM narration, UI display, or loose prose become mechanical truth.

Core rule:

```text
Player / UI / API DM may propose.
Rules Core validates and resolves.
Game State Store commits validated deltas.
Context Broker controls what the API DM sees.
UI / App Shell displays.
Narration never commits state.
```

---

# 2. Accepted architecture decisions

## 2.1 Layered object model

Use a layered object model, not a flat object list.

```text
Layer 0 — Shared parts / refs
Layer 1 — Scene interaction objects
Layer 2 — Request / proposal objects
Layer 3 — Validation / resolution objects
Layer 4 — Mutation / commit objects
Layer 5 — Log / presentation objects
```

## 2.2 Composition by default

Objects are LEGO-style builds. Larger objects should reuse shared parts by default. Deviations are allowed when forcing composition would make the object worse.

Example:

```text
ActionRequest =
ActorRef + TargetRef + ActionCategory + SourceRef + Origin + TransactionRef + IntentPayload + CostIntent
```

## 2.3 Proposal is not validation

A proposed action is not a valid action.

API DM, UI, or player input may produce a proposal. Only Rules Core can validate that proposal. A proposal may be wrong, incomplete, ambiguous, illegal, stale, blocked, or unsupported.

## 2.4 Resolution is not mutation

A resolved effect is not committed state until it becomes a validated `StateDelta` and crosses the commit barrier.

## 2.5 Presentation is not truth

Narration, UI display, and narrative logs explain state. They do not create state.

## 2.6 Scene-interaction objects are contract objects, not final registries

`SceneEntity`, `SceneDetail`, `PlayerClaim`, `ActionSurface`, and `MapOption` belong in #38 because they feed `TargetRef`, `ActionRequest`, and `DMIntentProposal`.

They should be defined as reference-bearing contract objects. They should not finalize every Entity Class, Entity Type, Entity Property, Surface Category, Action Category, or Skill / Ability Hook.

---

# 3. Shared parts bin rev0.1

The shared parts bin is tiered. Objects use only the parts they need.

## 3.1 Identity refs

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

### TargetRef boundary

`TargetRef` is polymorphic. It may point to an actor, scene entity, action surface, map node, path, inventory item, objective, or rules-visible hidden state. It is a wrapper/ref, not only an enemy/combat target.

## 3.2 Lifecycle / authority parts

- `Origin`
- `LifecycleState`
- `ValidationResult`
- `AuthorityRole`
- `ReviewFlag`
- `CreatedAt`
- `CreatedBy`

### LifecycleState boundary

`LifecycleState` records where an object is in the transaction or object lifecycle: received, proposed, classified, validated, resolved, committed, displayed, closed, flagged, etc.

It should not be confused with `ValidationResult`.

### ValidationResult boundary

`ValidationResult` records Rules Core’s answer to whether an action can proceed.

Valid statuses for rev0.1:

- `valid`
- `invalid`
- `needs_clarification`
- `blocked`
- `unavailable`
- `stale_request`
- `temporary_ruling_needed`

## 3.3 Rules parts

- `ActionCategory`
- `SurfaceCategory`
- `CheckFamily`
- `ResultBand`
- `CostIntent`
- `ValidatedCost`
- `PaidCost`
- `Scope`
- `Duration`
- `ModifierLane`
- `StackingRule`
- `Operation`
- `Magnitude`

### Cost boundary

Cost should use separate lifecycle forms:

```text
ActionRequest → CostIntent
ValidatedAction → ValidatedCost
ResolutionOutput → PaidCost
```

An unvalidated request should not contain final paid cost.

## 3.4 Visibility / routing parts

Use a consolidated `VisibilityPolicy` instead of scattered visibility fields.

`VisibilityPolicy` may include:

- player visibility
- UI visibility
- API DM visibility
- Rules Core visibility
- Context Broker visibility
- hidden/concealed status
- reveal rule
- narration permission
- required omissions

Additional routing parts:

- `RevealRule`
- `NarrationPermission`
- `ContextPermission`

## 3.5 Payload parts

- `IntentPayload`
- `TargetPayload`
- `CheckPayload`
- `EffectPayload`
- `StateDeltaPayload`
- `NarrationPayload`
- `UIPayload`
- `ResolvedFactsPayload`

Payload parts carry domain-specific detail without bloating every top-level object.

---

# 4. Layer 1 — Scene interaction objects

Scene interaction objects define what the player can see, ask about, claim, target, or act on before Rules Core validates an action.

## 4.1 SceneDetail

Purpose: fictional description that may inform play but does not create mechanical permission by itself.

Composed from:

- `SceneRef`
- `SourceRef`
- `Origin`
- `VisibilityPolicy`
- description payload
- optional related `SceneEntityRef`
- optional `ReviewFlag`

Owner: API DM, source content, or app-authored scene setup.

Stored: optional. Store only if it becomes established scene context, loggable description, or future reference.

DM-visible: yes when relevant.

UI-visible: yes if presented to player.

May mutate state: no.

Boundary: `SceneDetail` can describe the world, but it cannot create costs, checks, effects, state deltas, valid targets, or mechanical options without later classification and validation.

## 4.2 PlayerClaim

Purpose: player-proposed possible fact, object, route, feature, or function.

Composed from:

- `TransactionRef`
- `ActorRef` or player/speaker ref
- `SceneRef` or `EncounterRef`
- raw claim text
- optional `TargetRef`
- `SourceRef`
- `Origin: player-claimed`
- `LifecycleState`
- `VisibilityPolicy`
- optional coherence judgment
- optional `ReviewFlag`

Owner: Player creates; API DM may interpret/coherence-check; Rules Core validates if mechanically relevant.

Stored: transient unless accepted, rejected with useful reason, or logged for review.

DM-visible: yes.

UI-visible: yes.

May mutate state: no.

Boundary: A `PlayerClaim` may become a `SceneEntity`, `ActionSurface`, `MapOption`, or narration-only detail only after classification and validation. The claim itself does not make the thing true.

## 4.3 SceneEntity

Purpose: a thing in the scene or map that can be referenced, described, targeted, or exposed as one or more `ActionSurface`s.

Composed from:

- `SceneEntityRef`
- `SceneRef` or `EncounterRef`
- `SourceRef`
- `Origin`
- `EntityClass`
- optional `EntityType`
- optional `EntityProperties`
- `VisibilityPolicy`
- `LifecycleState`
- optional related `MapOptionRef`
- optional related `ActionSurfaceRef[]`
- optional `ReviewFlag`

Owner: source content, app setup, API DM when allowed, or validated `PlayerClaim`.

Stored: yes if it remains part of scene, encounter, map, hidden state, or durable campaign state. Otherwise transient.

DM-visible: yes if allowed by Context Broker.

UI-visible: only if visible/revealed to player.

May mutate state: no by itself.

Boundary: `SceneEntity` is not automatically interactable. It must expose specific `ActionSurface`s or be used as a `TargetRef` in a validated `ActionRequest`.

## 4.4 ActionSurface

Purpose: a rules-valid or potentially rules-valid way to act on a `SceneEntity`, `MapOption`, or accepted `PlayerClaim`.

Composed from:

- `ActionSurfaceRef`
- `SceneEntityRef` or `MapOptionRef`
- `SceneRef` or `EncounterRef`
- `SourceRef`
- `Origin`
- `SurfaceCategory`
- allowed `ActionCategory[]`
- optional required `TargetRef` shape
- optional required actor/ability/tool conditions
- optional risk/consequence hints
- `VisibilityPolicy`
- `LifecycleState`
- optional `ReviewFlag`

Owner: source/app content or Rules Core after validation. API DM may propose classification but does not finalize it.

Stored: yes if it remains available in scene/map state. Transient if it exists only inside one proposal.

DM-visible: yes when needed for interpretation or narration.

UI-visible: yes if revealed as an option.

May mutate state: no.

Boundary: `ActionSurface` creates a valid handle for action. It does not resolve the action and does not guarantee success.

## 4.5 MapOption

Purpose: player-facing option represented by the tactical or nonviolent map.

Composed from:

- `MapOptionRef`
- `SceneRef` or `EncounterRef`
- map/location ref
- `SourceRef`
- `Origin`
- option kind: node, path, cover marker, terminal, door, hazard, objective, NPC position, route marker, evidence marker, side opportunity, etc.
- optional related `SceneEntityRef`
- optional related `ActionSurfaceRef[]`
- `VisibilityPolicy`
- `LifecycleState`
- optional `ReviewFlag`

Owner: app/map/source content. API DM may describe or clarify it but should not freely invent new tactical `MapOption`s during resolved encounter play.

Stored: yes while the map/scene/encounter is active.

DM-visible: yes when relevant.

UI-visible: yes if revealed on map or scene display.

May mutate state: no.

Boundary: `MapOption` is an option surface, not a state mutation. Movement, cover, objective progress, hazards, and interactions still require validated actions and committed deltas.

## 4.6 Scene interaction integration rule

Normal path:

```text
PlayerClaim or MapOption or SceneEntity
→ possible ActionSurface
→ ActionRequest
→ ValidationResult
→ ValidatedAction
→ ResolutionOutput
→ StateDelta commit if state changes
```

No scene interaction object commits state by itself.

---

# 5. Layer 2 — Request / proposal objects

## 5.1 InputEnvelope

Purpose: preserve the raw player input or structured UI action context before interpretation or validation.

Composed from:

- `TransactionRef`
- raw input text or structured selection payload
- `ActorRef` optional if known
- `SceneRef` or `EncounterRef`
- current mode: narrative, tactical, social, menu, debug, playtest, etc.
- selected `TargetRef`, `MapOptionRef`, `SceneEntityRef`, or `ActionSurfaceRef` optional
- recent context pointer optional
- input source: typed, dictated, selected, system-generated
- `VisibilityPolicy`
- optional `ReviewFlag`

Owner: UI / App Shell.

Stored: transient; may be logged for audit/debug.

May mutate state: no.

## 5.2 DMIntentProposal

Purpose: API DM interpretation of freeform player input.

Composed from:

- `TransactionRef`
- optional `ActorRef`
- optional `TargetRef`
- `SceneRef` or `EncounterRef`
- proposed `ActionCategory`
- proposed `SurfaceCategory`
- `IntentPayload`
- `SourceRef`
- `Origin`
- `LifecycleState`
- `VisibilityPolicy`
- ambiguity/confidence notes
- optional `PlayerClaimRef`
- optional `ReviewFlag`

Owner: API DM proposes; Rules Core accepts, rejects, or asks for clarification.

Stored: transient; may be logged for audit/debug.

May mutate state: no.

Boundary: API DM says what the action seems to mean. Rules Core decides what the action mechanically is.

## 5.3 ActionRequest

Purpose: structured request to attempt an action.

Composed from:

- `TransactionRef`
- `ActorRef`
- optional `TargetRef`
- `SceneRef` or `EncounterRef`
- `ActionCategory`
- optional `SurfaceCategory`
- `SourceRef`
- `Origin`
- `LifecycleState`
- `IntentPayload`
- optional `CostIntent`
- optional `ReviewFlag`

Owner: UI / App Shell or API DM may create; Rules Core validates.

Stored: transient unless logged.

May mutate state: no.

Boundary: `ActionRequest` is not valid action truth. It is only the candidate package submitted for validation.

## 5.4 ValidationResult

Purpose: Rules Core answer to whether an action can proceed.

Composed from:

- `TransactionRef`
- `ActionRequestRef`
- `ValidationStatus`
- optional required input
- optional invalid reason
- optional blocked reason
- optional nearby valid options
- optional `ReviewFlag`

Valid statuses:

- `valid`
- `invalid`
- `needs_clarification`
- `blocked`
- `unavailable`
- `stale_request`
- `temporary_ruling_needed`

Owner: Rules Core.

Stored: transient, but may be logged.

May mutate state: no.

## 5.5 ValidatedAction

Purpose: Rules Core-approved action ready for resolution.

Composed from:

- `ValidatedActionRef`
- `ActionRequestRef`
- `TransactionRef`
- `ActorRef`
- `TargetRef` when required by action
- `ActionCategory`
- optional `SurfaceCategory`
- optional `CheckFamily`
- `ValidatedCost`
- `ValidationResult`
- `VisibilityPolicy`
- optional `ReviewFlag`

Owner: Rules Core.

Stored: transient; log reference allowed.

May mutate state: no.

Boundary: `ValidatedAction` exists because `ActionRequest` should not mean both proposed and approved. This is required for clean app flow and bug prevention.

---

# 6. Layer 3 — Validation / resolution objects

## 6.1 CheckInput

Purpose: complete package sent into check resolution.

Composed from:

- `CheckRef`
- `TransactionRef`
- `ValidatedActionRef`
- `ActorRef`
- optional `TargetRef`
- `CheckFamily`
- `CheckModifierSet`
- `VisibilityPolicy`
- optional `CheckPayload`
- `SourceRef`

Owner: Rules Core.

Stored: transient; summarized in log.

May mutate state: no.

## 6.2 CheckModifierSet

Purpose: collect and resolve modifier contributions.

Composed from:

- raw `CheckModifier[]`
- applied `CheckModifier[]`
- optional rejected modifiers
- stacking summary
- optional `ReviewFlag`

Owner: Rules Core.

Stored: transient; summary stored in mechanical log.

May mutate state: no.

Boundary: preserve both raw and applied modifiers. Raw modifiers explain what attempted to apply. Applied modifiers show final lane/stacking result.

## 6.3 CheckModifier

Purpose: one modifier contribution.

Composed from:

- `SourceRef`
- `ModifierLane`
- `Operation`
- `Magnitude`
- `Scope`
- optional `Duration`
- `StackingRule`
- `VisibilityPolicy`
- optional `ReviewFlag`

Owner: Rules Core.

Stored: transient unless the modifier comes from a persistent effect/status/equipment/source.

May mutate state: no.

Boundary: `CheckModifier` is not special. It follows the same composition rule as other objects.

## 6.4 CheckResult

Purpose: final resolved check output.

Composed from:

- `CheckRef`
- `TransactionRef`
- `ValidatedActionRef`
- `CheckFamily`
- roll result or deterministic result
- optional target score
- `ResultBand`
- applied modifiers summary
- `VisibilityPolicy`
- optional `ReviewFlag`

Owner: Rules Core.

Stored: summarized in mechanical log; full detail optional for debug/audit.

May mutate state: no.

## 6.5 ResolutionOutput

Purpose: full mechanical result before commit.

Composed from:

- `TransactionRef`
- `ValidatedActionRef`
- `PaidCost`
- optional `CheckResult`
- `EffectSet`
- `StateDeltaSet`
- visible consequence summary
- optional hidden consequence summary
- draft `ResolutionLogEntry`
- narration significance
- optional `ReviewFlag`

Owner: Rules Core.

Stored: transient until log/deltas commit.

May mutate state: no by itself.

Boundary: `ResolutionOutput` proposes the mechanical result. `StateDelta` commit makes state change real.

## 6.6 Effect

Purpose: mechanical consequence generated by resolution.

Composed from:

- `EffectRef`
- `SourceRef`
- optional `ActorRef`
- `TargetRef`
- effect type
- `EffectPayload`
- `Scope`
- optional `Duration`
- `VisibilityPolicy`
- creates-state-delta yes/no marker
- optional `ReviewFlag`

Owner: Rules Core.

Stored: if ongoing/scheduled; otherwise transient.

May mutate state: no directly.

Boundary: Issue #40 owns final effect/state-delta grammar. Issue #38 only defines the object boundary.

---

# 7. Layer 4 — Mutation / commit objects

## 7.1 StateDelta

Purpose: validated change to a state lane.

Composed from:

- `StateDeltaRef`
- `TransactionRef`
- `SourceRef`
- `StateLaneRef`
- `TargetRef`
- `Operation`
- `StateDeltaPayload`
- `VisibilityPolicy`
- `Scope`
- optional `Duration`
- `ValidationResult`
- optional `ReviewFlag`

Owner: Rules Core produces; transaction layer / Game State Store validates and commits.

Stored: yes, at least as committed state/log trail.

May mutate state: yes, only after delta validation and commit barrier.

Boundary: State changes cannot be produced from API DM narration, UI display, or narrative log text.

---

# 8. Layer 5 — Log / presentation objects

## 8.1 ResolutionLogEntry

Purpose: mechanical truth record for audit, fallback display, and future context.

Composed from:

- `LogRef`
- `TransactionRef`
- `ActorRef`
- `ActionRef` or `ValidatedActionRef`
- optional `TargetRef`
- optional `PaidCost`
- optional `CheckResult` summary
- optional `Effect` summary
- optional `StateDelta` summary
- `VisibilityPolicy`
- optional `ReviewFlag`

Owner: Rules Core creates; Game State Store records.

Stored: yes.

May mutate state: no.

## 8.2 DMNarrationRequest

Purpose: constrained packet asking API DM to narrate resolved facts.

Composed from:

- `TransactionRef`
- `ResolutionOutputRef`
- `ResolvedFactsPayload`
- `VisibilityPolicy`
- `NarrationPermission`
- tone/length constraints
- required omissions
- contradiction rules

Owner: Context Broker / App Shell.

Stored: optional debug/audit.

May mutate state: no.

## 8.3 DMNarrationResponse

Purpose: API DM prose response to resolved facts.

Composed from:

- `TransactionRef`
- `NarrationPayload`
- `VisibilityPolicy`
- narration validation result
- optional `ReviewFlag`

Owner: API DM produces; app validates.

Stored: narrative log if accepted.

May mutate state: no.

Boundary: Narration is invalid if it changes mechanical outcome, target, cost, damage, healing, status, position, resources, hidden info, map state, or committed facts.

## 8.4 UIUpdateBundle

Purpose: presentation bundle for the player-facing app.

Composed from:

- `TransactionRef`
- visible state changes
- mechanical result line
- optional `NarrationPayload`
- optional updated options
- optional clarification prompt
- optional warning/review flag
- `UIPayload`

Owner: UI / App Shell.

Stored: no, except logs/history as needed.

May mutate state: no.

Boundary: The UI update bundle displays state. It does not create state.

---

# 9. Current object stack

```text
Shared parts
→ SceneDetail / PlayerClaim / SceneEntity / ActionSurface / MapOption
→ InputEnvelope
→ DMIntentProposal
→ ActionRequest
→ ValidationResult
→ ValidatedAction
→ CheckInput
→ CheckModifierSet
→ CheckModifier
→ CheckResult
→ ResolutionOutput
→ Effect
→ StateDelta
→ ResolutionLogEntry
→ DMNarrationRequest
→ DMNarrationResponse
→ UIUpdateBundle
```

---

# 10. Storage / mutation boundary summary

## May directly mutate committed game state

- `StateDelta`, only after validation and commit barrier.

## May produce state changes indirectly

- `ResolutionOutput`, by carrying `StateDeltaSet` to the commit path.
- `Effect`, only through generated or scheduled `StateDelta`s.

## May never mutate state

- `SceneDetail`
- `PlayerClaim`
- `SceneEntity`
- `ActionSurface`
- `MapOption`
- `InputEnvelope`
- `DMIntentProposal`
- `ActionRequest`
- `ValidationResult`
- `ValidatedAction`
- `CheckInput`
- `CheckModifierSet`
- `CheckModifier`
- `CheckResult`
- `ResolutionLogEntry`
- `DMNarrationRequest`
- `DMNarrationResponse`
- `UIUpdateBundle`

---

# 11. Out of scope for #38

This draft intentionally does not finalize:

- final TypeScript interfaces;
- final reducers/state-lane implementation;
- final check-family behavior;
- final check-family registry;
- final effect/state-delta grammar;
- full Surface Category registry;
- full Action Category registry;
- full Entity Class / Entity Type / Entity Property registries;
- Skill / Ability Hook registry;
- final Context Broker packet schema;
- A1 replacement prose;
- source canon promotion;
- app implementation.

---

# 12. Follow-up dependencies

- #39 owns check family behavior and selection rules.
- #40 owns effect versus state-delta grammar, mutable surfaces, visibility metadata, temporary/persistent deltas, expiration, and reducer implications.
- #41 owns exact intent-context and resolved-facts packet design, hidden-state filtering, prompt bloat control, and narration packet boundaries.
- Later character/progression/ability schema work owns ability hooks and full ability data.

---

# 13. Continuation context

Next useful #38 work:

1. Review this draft against Issue #38 acceptance criteria.
2. Decide whether `ValidatedAction` should remain a named object in the final #38 contract. Current recommendation: yes.
3. Add a compact object summary matrix if useful for Codex implementation.
4. Add TypeScript scaffold notes without writing final code.
5. Add an Issue #38 closeout comment only after user approval.

Current user-approved architecture:

- Use layered object model.
- Use shared parts bin first.
- Use composition by default.
- Deviations allowed when composition makes the object worse.
- Scene-interaction objects belong in #38 as reference-bearing contract objects, not final registries.
- `CheckModifier` is composed, but not uniquely so; other objects are also composed.
- Ask the user only for gameplay, gameplay app-flow, or project-workflow decisions.
