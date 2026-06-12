# DM_Authority_Split_Contract_rev0.1

Date: 2026-06-11  
Mode: Draft  
Related issue: Define API DM / rules-core authority split:#34  
Parent issue: Epic: Sequence Nexus app-facing game-rule/system design:#33  
Status: draft contract closure  
Canon status: not source canon; not implementation; not A1 prose; not ability-tree design

## Intended placement

`docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`

This file supplements `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`.

## Replaces

Nothing.

Do not delete, archive, supersede, or replace legacy GPT-DM / DM Mode material as part of this contract pass. Legacy material is preserved during transition.

## Source/currentness status

This is a repo-side draft contract artifact. It is based on ChatGPT Draft Mode closure work, uploaded bridge baseline context, and GitHub issue context. It is not verified against live local `00 Source` and is not source canon.

---

# 1. Contract purpose

Nexus keeps an API DM for interpretation, narration, scene feel, NPC response, and flexible freeform play.

Nexus also needs deterministic app authority for mechanics.

This contract defines which component is allowed to decide which kind of truth.

Core rule:

```text
API DM interprets and narrates.
Rules Core validates and resolves mechanics.
Game State Store preserves committed truth.
Context Broker controls DM visibility.
UI / App Shell collects input and presents output.
Player owns intent.
```

No player statement, UI display, API DM narration, or context packet becomes mechanical truth until the correct authority validates, resolves, and commits it.

---

# 2. Authority roles

## 2.1 Player — intent authority

The Player owns intent.

The Player may state goals, desired outcomes, acting actor, visible target/option, and fictional approach.

The Player does not decide action legality, final action type, check family, cost, modifier, roll, result band, effect, state delta, hidden fact, or committed truth.

Player input is an input to interpretation and validation, not a state mutation.

## 2.2 UI / App Shell — input and presentation authority

The UI / App Shell owns input collection and presentation.

The UI / App Shell may collect player input, expose structured action buttons, show visible options, show map state, show logs, show committed state, show resolved mechanical outputs, and package structured action requests.

The UI / App Shell must not resolve mechanics, invent effects, apply unvalidated state deltas, override Rules Core output, or treat display text, button visibility, or animation as committed state.

Structured UI actions may bypass API DM intent interpretation when the selected action is already mechanically explicit.

## 2.3 API DM — interpretation and narration authority

The API DM owns interpretation and narration.

The API DM may interpret natural-language player intent, identify ambiguity, propose action meaning, propose visible or plausible options, frame scenes, speak for NPCs, describe sensory fiction, narrate resolved mechanical facts, and generate coherent non-mechanical fiction inside validated constraints.

The API DM must not decide final action legality, final action cost, final target validity, final check family, final modifiers, rolls, result bands, final effects, final state deltas, Game State Store mutation, or committed truth.

API DM output that touches mechanics is a proposal until validated by Rules Core.

API DM narration after resolution is descriptive, not authoritative.

## 2.4 Rules Core — mechanical authority

Rules Core owns mechanical truth.

Rules Core decides action legality, actor eligibility, target validity, cost, cost payment, check family, modifiers, roll or deterministic resolution, result band, effects, state deltas, and mechanical log entries.

Rules Core may consume API DM proposals, Player intent, UI-selected actions, Context Broker packets, and current Game State.

Rules Core is not required to accept API DM interpretation.

Rules Core output is the controlling mechanical result.

## 2.5 Game State Store — state-custody authority

Game State Store owns committed state custody.

Game State Store may store committed state, expose state to authorized consumers, preserve durable game truth, preserve logs, enforce state shape, and reject malformed or unauthorized mutation requests.

Game State Store must not invent substitute outcomes, resolve mechanics, reinterpret player intent, accept API DM narration as mutation, accept UI display text as mutation, or accept unvalidated player claims as mutation.

Game State Store commits validated state deltas. It does not decide what those deltas should be.

## 2.6 Context Broker — context visibility authority

Context Broker owns context selection.

Context Broker may decide what state slice the API DM sees, what resolved facts the API DM sees, what recent events are summarized, what rules/lore snippets are included, what hidden information is withheld, and what narration boundaries are included.

Context Broker must not resolve mechanics, mutate state, decide legality, decide effects, or create committed truth.

Context Broker output shapes API DM visibility. It does not create mechanical authority.

---

# 3. Proposal, validation, and resolution

## 3.1 Proposal

A proposal is a suggested interpretation or classification.

The API DM may propose action meaning, action type, target, check family, stakes, risk or consequence type, relevant tags, visible options, and plausible alternatives.

A proposal is not binding.

## 3.2 Validation

Validation determines whether a proposal is mechanically usable.

Rules Core validates legal action, valid actor, valid target, valid cost, valid check family, valid modifier sources, valid effect surfaces, and valid state-delta surfaces.

Validation may accept, revise, or reject a proposal.

## 3.3 Resolution

Resolution determines what mechanically happens.

Rules Core resolves cost payment, roll or deterministic outcome, result band, effects, state deltas, and mechanical logs.

Resolution output controls later narration, display, and commit.

---

# 4. Minimum operation paths

This contract defines only the minimum operation paths needed to enforce authority. Full transaction details belong to Define turn transaction for API DM + rules-core play:#35.

## 4.1 Freeform action path

Use when the Player enters natural-language input instead of selecting an explicit UI action.

```text
Player freeform input
→ API DM interprets intent
→ API DM returns proposal, ambiguity flag, or non-mechanical narration classification
→ Rules Core validates proposal when mechanics are involved
→ Rules Core resolves mechanics if valid
→ Rules Core produces pending state delta and mechanical log
→ Context Broker packages resolved facts when narration is needed
→ API DM narrates from resolved facts when narration is called
→ Game State Store commits validated delta according to transaction rules
→ UI / App Shell displays updated state, log, and/or narration
```

Freeform input cannot directly resolve mechanics. API DM interpretation produces proposal shape only. Rules Core decides whether the proposal is legal and what happens. API DM narration does not mutate state.

For freeform input, API DM must return one of:

1. clarification required;
2. interpreted action proposal;
3. non-mechanical narration request.

### Ambiguous freeform input

If ambiguity could change legality, cost, target, check family, risk, result stakes, or state delta, the flow stops and clarification is required.

If ambiguity has a small number of clear interpretations, UI / App Shell may show interpreted options for the Player to choose.

API DM may choose the best interpretation only when likely intent is obvious, no major cost/attack/irreversible choice/hidden consequence/state mutation depends on the distinction, the interpretation can be logged or lightly corrected later, and Rules Core can validate the resulting proposal safely.

The app must not let API DM choose automatically when ambiguity affects target selection in combat, movement into danger, spending limited resources, triggering hostile response, accepting obligation, changing inventory/loadout, revealing hidden information, making irreversible campaign choices, or applying damage/status/trace/exposure/suspicion/disposition changes.

## 4.2 Structured action path

Use when the Player selects an explicit UI action.

Examples include attack button, movement selection, ability button, interact button, reload/use item command, take cover command, mapped objective interaction, or explicit dialogue option with known mechanical handling.

```text
Player structured input
→ UI / App Shell creates action request
→ Rules Core validates action request
→ Rules Core resolves mechanics if valid
→ Rules Core produces pending state delta and mechanical log
→ Context Broker packages resolved facts when narration is needed
→ API DM narrates from resolved facts when narration is called
→ Game State Store commits validated delta according to transaction rules
→ UI / App Shell displays updated state, log, and/or narration
```

Structured actions may bypass API DM interpretation. UI / App Shell packages the selected action. Rules Core validates and resolves. API DM may narrate only after resolution. Visible structured options are not guarantees of success.

## 4.3 Narration-only path

Use when mechanics are already resolved or no mechanics are being invoked.

```text
Known facts or resolved facts
→ Context Broker selects narration context
→ API DM narrates within provided boundaries
→ UI / App Shell displays narration
```

Narration-only output cannot create effects, costs, result bands, hidden facts, or state deltas. If narration implies a new mechanical consequence, that consequence must route through proposal, validation, resolution, and commit.

---

# 5. Basic mechanic boundary rules

## 5.1 Player intent does not equal action validity

A Player can attempt anything that is fictionally expressible. Rules Core decides whether the attempt is mechanically valid, invalid, impossible, unavailable, blocked, or requires clarification.

## 5.2 Plausible fiction does not equal mechanical permission

API DM may describe plausible fiction. Plausible fiction does not grant action access, modifier access, target access, or effect access unless Rules Core validates it.

## 5.3 Visible option does not equal guaranteed success

UI / App Shell and API DM may expose visible or plausible options. An exposed option may still require cost, check, risk, consequence, or failure handling.

## 5.4 Map truth constrains tactical action

In mapped tactical play, the map is the primary action surface.

API DM may describe tactical fiction, but cannot override map-defined position, range, cover, adjacency, pathing, node occupancy, or visible tactical options.

If tactical narration conflicts with map state, map state controls.

## 5.5 Rules Core output constrains narration

After resolution, API DM narration must follow resolved result band, pending or committed state delta, valid target, valid actor, paid cost, applied effects, revealed information, and hidden-state visibility limits.

API DM may choose tone, pacing, and description. It may not change the mechanical outcome.

---

# 6. Mutation and commit authority

Only validated state deltas may become committed game state.

A validated state delta may come from:

1. Rules Core resolution;
2. explicitly approved non-mechanical app workflow;
3. marked temporary playtest ruling.

No other output may mutate committed game state.

Rules Core is the normal source of mechanical state deltas. Rules Core may generate deltas for HP/SI, AP/MP/reaction, shield/mitigation, statuses, position, node/path/cover/marker state, inventory/loadout, exposure/trace/suspicion/disposition/clocks, revealed information, scene facts, NPC state, and campaign route state.

Rules Core output must identify what changed, why it changed, and whether the delta is visible, hidden, temporary, or persistent.

Exact effect and delta grammar belongs to Define effect and state-delta grammar:#40.

API DM narration, UI display, Player claims, and Context Broker packets do not mutate game state.

If narration implies a new mechanical consequence, that consequence must route through proposal, validation, resolution, and commit.

---

# 7. API DM narration gate

Post-resolution API DM narration is optional unless the action requires narrative handling.

Rules Core may resolve an action and produce a mechanical log without requesting API DM narration.

If API DM narration is requested after resolution, a resolved-facts packet is mandatory.

API DM narration should be required for major combat outcomes, damage/downing/revival/serious injury, important NPC reactions, social consequence shifts, new scene framing, entering a new area, important information reveals, trace/exposure/suspicion/disposition/clock changes, hidden consequences needing careful player-facing presentation, temporary playtest rulings needing explanation, and dramatic beats where plain log output would underserve play.

API DM narration may be optional for routine attacks, routine movement, routine ability use, minor NPC reactions, partial successes, colorful action confirmation, short scene continuity, and player-requested description.

API DM narration should normally be skipped for menus, UI settings, character stats, inventory browsing, already displayed information, routine resource updates, repeated low-importance movement, cases where mechanical log is clearer, or cases where narration slows play without adding useful fiction.

The app owns the narration trigger. API DM does not decide whether it gets called.

Final narration-call policy belongs to Define turn transaction for API DM + rules-core play:#35 and Define compact DM context broker contract:#41.

---

# 8. Narration significance flag

Rules Core may flag how much narration an outcome deserves. The flag does not give API DM authority. It only helps route presentation.

Suggested levels:

- `none`: no narrative handling; log/UI/state display only.
- `minor`: narration may add flavor but is not required.
- `major`: narration recommended.
- `critical`: narration required unless the app is in a low/no-DM fallback mode.

Rules Core may assign the narration significance flag because Rules Core knows the mechanical result.

The app transaction layer decides whether to call API DM. Context Broker packages the resolved-facts packet. API DM narrates only within packet boundaries. UI / App Shell displays the selected output.

Object details belong to Define rules object model for actions, checks, effects, and logs:#38.

---

# 9. Resolved-facts packet requirement

Any API DM narration after mechanical resolution must receive a resolved-facts packet.

API DM may narrate from the packet. API DM may not revise the packet. API DM may not add mechanical consequences not present in the packet.

A resolved-facts packet should include, when applicable: acting actor, action performed, target, location or map reference, cost paid, roll or deterministic result, result band, effects applied, state deltas produced, visible consequences, hidden consequences only if needed for safe narration, narration boundaries, and facts API DM must not contradict.

If the packet includes hidden information, it must clearly mark what is hidden from the Player. API DM may use hidden facts only to avoid contradiction and must not reveal hidden facts unless the packet marks them as player-visible.

Exact schema belongs to Define compact DM context broker contract:#41 and Define rules object model for actions, checks, effects, and logs:#38.

---

# 10. API DM narration failure fallback

Rules Core resolution remains valid even if API DM narration fails.

A resolved action may still commit and display through UI / App Shell using mechanical logs, templated text, compact result lines, or state summaries.

Use fallback output when API DM narration times out, fails to return, returns malformed output, contradicts Rules Core output, contradicts committed Game State, reveals hidden information improperly, adds unauthorized mechanical consequences, or is unavailable due to cost/mode/technical failure.

Fallback output must use Rules Core output and committed state as truth.

For `critical` narration significance, the app should try harder to obtain valid narration, including retry with stricter resolved-facts packet, smaller prompt, templated critical-result text, mechanical log plus state summary, or review flag. Critical narration importance does not give API DM authority over mechanics.

---

# 11. Context Broker boundary

There is one Context Broker authority.

The app may use multiple targeted context packet builders, but they all operate under the same Context Broker authority boundary. Targeted packet builders do not create separate authority lanes.

Allowed targeted context packets include intent interpretation context, post-resolution narration context, tactical map context, social scene context, NPC context, rules snippet context, lore/source snippet context, recent event summary, resolved facts, hidden-state filtering, and allowed narration boundaries.

Context Broker may decide what facts are relevant, summarized, withheld, what rules/lore snippet is relevant, what resolved facts must constrain narration, what hidden state may or may not be exposed, and what prior events are needed for continuity.

Context Broker must not decide action legality, action cost, target validity, check family, modifiers, rolls, result bands, effects, state deltas, committed truth, or whether API DM narration becomes true.

Full packet design belongs to Define compact DM context broker contract:#41.

---

# 12. Temporary playtest ruling boundary

Temporary playtest rulings are allowed, but they must be marked, logged, scoped, and routed for review.

A temporary ruling is not source canon, permanent implementation authority, or precedent by default.

Every temporary playtest ruling must record ruling summary, reason needed, affected actor/scene/action/mechanic, state delta if any, visible/hidden status, whether it affected cost/roll/result band/effect/state, future issue or contract for review, and expiry scope.

Temporary rulings may be used when no contract exists yet, a contract is incomplete, a playtest edge case exposes a missing rule, stopping play would cost more than making a bounded ruling, and the ruling can be logged cleanly for later review.

Temporary rulings must not bypass known Rules Core authority, let API DM narration silently mutate state, avoid writing needed contracts, override committed state without record, create permanent abilities/effects/rules without review, or patch implementation bugs without identifying them.

A temporary ruling may later become permanent only after review. Review may promote, revise, reject, or route the ruling.

Promotion must identify the destination issue or source path.

---

# 13. Contradiction handling

When authorities conflict, use this priority order:

1. source-approved rules and active contracts;
2. Rules Core resolved output;
3. Game State Store committed truth;
4. validated pending state deltas;
5. Context Broker visibility packet;
6. API DM narration;
7. UI / App Shell presentation;
8. player-facing prose.

Lower-priority outputs must conform to higher-priority truth.

If API DM narration contradicts Rules Core output or committed Game State, the narration is invalid. Valid handling options are discard, regenerate with stricter resolved facts, display mechanical log instead, or flag for review.

Invalid handling includes changing roll result, damage/effects, position, or state deltas to match narration, or treating contradiction as a new fact.

If UI display contradicts committed state, committed state controls.

If Context Broker omits or misstates required context, the fix is context repair, not expanding API DM authority.

If Rules Core output conflicts with committed Game State, the app must not silently patch around it. Valid handling includes rejecting the action as no longer valid, rerunning validation, rejecting malformed state delta, routing to state-lane review, or flagging implementation defect.

Detailed handling belongs to Define turn transaction for API DM + rules-core play:#35 and Define game state lanes and mutation boundaries:#36.

---

# 14. Legacy DM Mode preservation

Legacy GPT-DM / DM Mode material remains preserved during transition.

Legacy DM Mode is a behavior and quality reference. Legacy DM Mode is not final mechanical authority.

The app should preserve DM Mode strengths where possible, including strong scene framing, responsive narration, player-intent interpretation, NPC voice and reaction, tactical situation description, consequence presentation, pacing support, playtest improvisation, hidden-state-aware narration, continuity across choices, and useful explanation of resolved outcomes.

The app must remove or constrain legacy DM behavior where it acts as final authority for legality, costs, modifiers, rolls, result bands, damage, effects, state deltas, inventory changes, position changes, hidden fact creation, campaign consequence creation, or mechanical logs.

Legacy DM files must not be deleted during this contract pass.

They should be preserved until a verified migration identifies what behavior is retained, replaced, routed to Rules Core, routed to Context Broker, becomes UI presentation, or is retired.

Contract rule:

```text
Do not throw away the DM.
Keep the DM feel.
Move mechanics to Rules Core.
Move committed truth to Game State Store.
Move visibility control to Context Broker.
Keep API DM focused on interpretation, narration, and play-facing quality.
```

---

# 15. Non-mechanical app workflows

Some app workflows may update state without Rules Core resolution.

Allowed examples include settings changes, save/load operations, UI preference changes, admin/debug migration tools, non-mechanical journal or note updates, and campaign setup workflows explicitly approved by later contract.

These workflows must not be used as a back door for combat, checks, abilities, inventory, hidden consequences, progression, or campaign outcomes.

---

# 16. What belongs outside Define API DM / rules-core authority split:#34

## Define turn transaction for API DM + rules-core play:#35

Owns complete player input to UI/log transaction, exact commit timing, freeform vs structured path details, synchronous vs deferred steps, ambiguous input recovery sequence, contradictory narration recovery sequence, narration trigger implementation, and retry/fallback timing.

## Define game state lanes and mutation boundaries:#36

Owns durable campaign state, encounter state, actor state, scene state, rules/session log, DM context memory, hidden/concealed state, UI-only state, settings, derived state, persistence behavior, reset behavior, and exact mutation boundaries.

## Define rules object model for actions, checks, effects, and logs:#38

Owns ActionRequest, ActionCost, TargetRef, ActorRef, CheckFamily, CheckInput, CheckModifier, CheckResult, ResultBand, Effect, StateDelta, ResolutionLogEntry, DMIntentProposal, DMNarrationRequest, DMNarrationResponse, and narration significance field.

## Define check family contract:#39

Owns Attack Check, Standard Check, Extended Check, check family selection rules, and distinction between check family and fictional domain.

## Define effect and state-delta grammar:#40

Owns Effect vs StateDelta, mutable state surfaces, hidden vs visible deltas, temporary vs persistent deltas, effect expiration, ongoing display, and reducer/state application implications.

## Define compact DM context broker contract:#41

Owns always-included DM context, dynamic context selection, targeted packet builders, summary rules, never-send context, intent prompt vs narration prompt context, resolved-facts packet schema, hidden-state handling, and prompt bloat/cost control.

---

# 17. Open questions for later issues

These are not blockers for Define API DM / rules-core authority split:#34.

1. Exact commit timing before or after narration — route to Define turn transaction for API DM + rules-core play:#35.
2. Exact narration significance field shape — route to Define rules object model for actions, checks, effects, and logs:#38.
3. Exact resolved-facts packet schema — route to Define compact DM context broker contract:#41.
4. Exact temporary ruling log object — route to Define rules object model for actions, checks, effects, and logs:#38.
5. Exact state lane ownership for hidden facts and DM memory — route to Define game state lanes and mutation boundaries:#36.
6. Exact distinction between effect and state delta — route to Define effect and state-delta grammar:#40.
7. Exact check family classifier — route to Define check family contract:#39.

---

# 18. Acceptance coverage for Define API DM / rules-core authority split:#34

This draft covers:

- current working assumptions;
- API DM authority;
- Rules Core authority;
- Context Broker authority;
- Game State Store authority;
- UI / App Shell authority;
- Player authority;
- proposal vs validation vs resolution;
- high-level state mutation boundary;
- legacy GPT-DM / DM Mode preservation during transition;
- follow-up dependencies for turn transaction and object model.

This draft intentionally does not cover full turn transaction, full state lane contract, full object schema, check family definitions, effect/state-delta grammar, full context broker packet schema, A1 prose, ability trees, or implementation.
