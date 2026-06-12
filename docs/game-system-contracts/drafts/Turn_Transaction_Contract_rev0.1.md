# Turn_Transaction_Contract_rev0.1

Date: 2026-06-11  
Mode: Draft  
Related issue: Define turn transaction for API DM + rules-core play:#35  
Parent issue: Epic: Sequence Nexus app-facing game-rule/system design:#33  
Depends on: Define API DM / rules-core authority split:#34  
Status: draft contract closure  
Canon status: not source canon; not implementation; not A1 prose; not object-model final schema

## Intended placement

`docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`

This file supplements:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`

Issue #35 suggested `.agents/plans/` as a possible repo lane. This draft uses `docs/game-system-contracts/drafts/` instead, to stay aligned with the issue #34 contract path and avoid duplicate draft authority.

## Replaces

Nothing.

Do not delete, archive, supersede, or replace legacy GPT-DM / DM Mode material, existing gameplay source, or Issue #34 material as part of this pass. This file is a follow-on transaction contract.

## Source/currentness status

This is a repo-side draft contract artifact. It is based on ChatGPT Draft Mode work, uploaded bridge baseline context, Issue #35 requirements, and the committed Issue #34 authority-split draft. It is not verified against live local `00 Source` and is not source canon.

---

# 1. Draft section purpose

This section defines the rev0.1 Nexus turn transaction: the app-facing sequence from a player input to interpreted intent, validated action, deterministic rules resolution, committed state, constrained DM narration, and final UI/log output.

The purpose is not to write final rules prose. The purpose is to lock the app/gameplay transaction boundary tightly enough that later work can define state lanes, action/check/effect objects, context packets, and a thin implementation slice without letting API DM narration become mechanical truth.

Core rule:

```text
Player intent enters the transaction.
API DM may interpret or narrate.
Rules Core validates and resolves.
Game State Store commits validated deltas.
Context Broker controls what the API DM sees.
UI / App Shell displays the result.
Narration never commits state.
```

---

# 2. Rev0.1 controlling decisions

## 2.1 Freeform input decision

Freeform player input goes through API DM intent interpretation before it becomes an action proposal, unless the input is clearly a non-gameplay command such as opening a menu, inspecting already-known UI state, saving, loading, or changing settings.

Freeform input may produce:

1. clarification required;
2. interpreted action proposal;
3. non-mechanical narration request;
4. player-facing option list;
5. rejected or unsupported request.

Freeform input cannot directly mutate state.

## 2.2 Structured UI action decision

Structured UI actions may bypass API DM intent interpretation when the selected option is already mechanically explicit.

Examples:

- movement selection;
- attack button with actor and target;
- ability button with required target fields;
- reload / use item;
- interact with known map objective;
- dialogue option with explicit mechanical handling.

A visible button is not a guarantee of success. Rules Core still validates legality, cost, target, and effect.

## 2.3 Commit timing decision

Mechanical state commits after Rules Core resolution produces validated state deltas and before any later output is treated as current UI/log truth.

API DM narration does not control whether the state commits.

The app may delay final player-facing presentation while waiting for narration or fallback text, but the committed truth comes from Rules Core and Game State Store, not from narration.

## 2.4 Narration contradiction decision

If API DM narration contradicts Rules Core output, pending or committed state, resolved facts, hidden-state visibility, map truth, or mechanical logs, the narration is invalid.

Valid handling:

1. discard narration and show mechanical fallback;
2. retry narration with stricter resolved facts;
3. regenerate a smaller narration request;
4. flag the contradiction for review;
5. continue from committed mechanical truth.

Invalid handling:

- changing a roll, result band, damage value, cost, effect, position, state delta, hidden fact, or committed state to match narration.

## 2.5 Ambiguous input decision

If ambiguity could change legality, cost, target, actor, check family, risk, hidden consequence, irreversible consequence, or state delta, the transaction stops before resolution and asks for clarification.

If ambiguity is minor, reversible, and mechanically safe, the app may infer the likely interpretation or show a small set of options.

## 2.6 Hidden consequence decision

Hidden consequences are stored as state deltas with visibility metadata.

They are not stored as narration, vibes, prose implication, or API DM memory alone.

A hidden consequence may be withheld from the player-facing UI/log while still being committed in the correct hidden or concealed state lane.

## 2.7 Synchronous versus deferred decision

For any state-changing action, validation, resolution, and commit are synchronous transaction steps.

Narration may be synchronous, skipped, retried, replaced by fallback output, or deferred depending on narration significance and app mode.

Deferred narration may append presentation after commit. It may not revise committed truth.

---

# 3. Minimum transaction states

These are transaction states, not final object schemas.

```text
received
→ interpreted or structured
→ proposed
→ validated
→ resolved
→ delta-validated
→ committed
→ narration-requested optional
→ narration-validated or fallback-selected
→ displayed/logged
→ closed or flagged
```

## 3.1 received

The app has received player input or a selected UI action.

No mechanical meaning has been accepted yet.

## 3.2 interpreted or structured

The input is either:

- interpreted by API DM from freeform language; or
- packaged directly by UI / App Shell as a structured action request.

## 3.3 proposed

A possible action exists, but Rules Core has not accepted it.

A proposal may include actor, target, action category, surface category, intent summary, risk hints, and ambiguity flags.

## 3.4 validated

Rules Core has checked whether the action request can be resolved.

Validated does not mean successful. It means legal and resolvable.

## 3.5 resolved

Rules Core has determined the mechanical result.

Resolution may include cost payment, roll or deterministic outcome, result band, effects, state deltas, mechanical log entries, and narration significance.

## 3.6 delta-validated

Game State Store or transaction layer has checked that the produced state deltas are well-formed and target valid state lanes.

The exact state-lane contract belongs to #36. The exact state-delta grammar belongs to #40.

## 3.7 committed

Validated state deltas have been applied to committed game state.

From this point forward, UI, logs, narration, future validation, and context packets must treat the committed result as truth.

## 3.8 narration-requested optional

Context Broker has built a resolved-facts packet and the app has requested API DM narration.

Narration is optional unless the transaction marks it required or the app mode requires it for player-facing flow.

## 3.9 narration-validated or fallback-selected

The app accepts API DM narration only if it conforms to resolved facts and visibility boundaries.

If narration is missing, malformed, contradictory, too revealing, or too expensive/slow for the current mode, fallback output is selected.

## 3.10 displayed/logged

UI / App Shell displays the player-facing result and appends appropriate log entries.

The mechanical log must follow Rules Core output. Narrative log text may be API DM prose or fallback text.

## 3.11 closed or flagged

The transaction is closed when all required mechanical, state, presentation, and log steps are complete.

The transaction is flagged when contradiction, malformed output, state mismatch, temporary ruling, implementation defect, or unresolved ambiguity requires review.

---

# 4. Freeform input path

Use this path when the player types natural-language input.

```text
Player freeform input
→ UI / App Shell creates input envelope
→ Context Broker builds intent context
→ API DM interprets intent
→ API DM returns clarification, proposal, options, or narration-only classification
→ Rules Core validates proposal if mechanics are involved
→ Rules Core resolves valid action
→ transaction layer validates state deltas
→ Game State Store commits validated deltas
→ Context Broker builds resolved-facts packet if narration is needed
→ API DM narrates from resolved facts if called
→ app validates narration or selects fallback
→ UI / App Shell displays state, log, and narration/fallback
```

## 4.1 Input envelope

The UI / App Shell should preserve at least:

- raw player text;
- active actor or speaker if known;
- scene or encounter reference;
- current mode: narrative, tactical, social, menu, debug, or playtest;
- visible selected target, node, NPC, object, or option if any;
- recent context pointer;
- whether the input was typed, dictated, selected, or system-generated.

Exact object shape belongs to #38.

## 4.2 Intent interpretation

API DM may identify:

- likely player goal;
- actor;
- target or missing target;
- proposed action category;
- proposed surface category;
- fictional approach;
- whether a player claim is being made;
- whether the request is non-mechanical narration;
- whether clarification is required;
- confidence and ambiguity notes.

API DM may not decide final legality, cost, roll, effect, state delta, or committed truth.

## 4.3 Clarification required

Clarification is required when unresolved ambiguity affects:

- actor;
- target;
- movement destination;
- resource spending;
- attack or hostile action;
- risk acceptance;
- hidden consequence exposure;
- irreversible choice;
- inventory/loadout change;
- social obligation;
- trace, exposure, suspicion, disposition, clock, HP, SI, status, or position changes.

Clarification produces no mechanical state mutation.

The UI should ask the smallest useful question, preferably with selectable options when the interpretations are obvious.

## 4.4 Player claim handling

When freeform input proposes a possible fact, object, route, feature, or function, it enters as a Player Claim.

The transaction may route the claim through API DM coherence judgment, then Rules Core validation if it could become mechanically relevant.

A Player Claim may become an Action Surface only after classification and validation.

## 4.5 Non-mechanical narration classification

If the input asks for description, recap, tone, NPC color, already-known facts, or scene flavor without changing mechanics, the app may route to narration-only handling.

Narration-only handling may not create costs, checks, effects, hidden facts, or state deltas.

If narration produces a new actionable fact or implied consequence, that new item must enter a later proposal/validation/resolution path before it can affect state.

---

# 5. Structured UI action path

Use this path when the player selects an explicit app action.

```text
Player structured UI action
→ UI / App Shell creates action request
→ Rules Core validates action request
→ Rules Core resolves valid action
→ transaction layer validates state deltas
→ Game State Store commits validated deltas
→ Context Broker builds resolved-facts packet if narration is needed
→ API DM narrates from resolved facts if called
→ app validates narration or selects fallback
→ UI / App Shell displays state, log, and narration/fallback
```

## 5.1 Structured action requirements

A structured action request should already identify the mechanical action being attempted.

Depending on action type, it may include:

- actor reference;
- action category or action id;
- target reference;
- map node, path, cover, objective, or scene entity reference;
- chosen ability, weapon, tool, or item;
- selected cost mode;
- declared approach;
- optional narration preference.

Exact object shape belongs to #38.

## 5.2 Missing required fields

If a structured action lacks required mechanical fields, the app should not ask API DM to guess them.

Valid handling:

1. block the action client-side if obvious;
2. prompt for missing target/actor/cost mode;
3. route to Rules Core validation and return a structured invalid/needs-input response.

## 5.3 Button visibility boundary

The UI may show likely available actions, but only Rules Core validates the action at transaction time.

The UI may be stale, incomplete, or intentionally broad. Rules Core output controls.

## 5.4 Hybrid actions

Some UI actions include freeform text, such as custom dialogue, search phrasing, or improvised use of an object.

Hybrid actions should split the transaction:

```text
structured selected frame
+ freeform player wording
→ API DM interprets only the freeform/fictional portion
→ Rules Core validates the complete action request
```

The UI-provided frame constrains interpretation. API DM does not replace the structured action with an unrelated one.

---

# 6. Validation and resolution

Rules Core controls validation and resolution.

## 6.1 Validation result types

Rules Core should return one of these transaction-level validation results:

- `valid`: action can resolve now;
- `invalid`: action cannot resolve;
- `needs_clarification`: player choice is required before resolution;
- `blocked`: known state prevents the action;
- `unavailable`: actor lacks permission, resource, ability, target, or condition;
- `stale_request`: game state changed since the request was packaged;
- `temporary_ruling_needed`: no contract exists, but playtest may continue if a bounded ruling is logged.

Exact enum/object shape belongs to #38.

## 6.2 Resolution output

Rules Core resolution should produce, when applicable:

- action summary;
- actor and target references;
- paid costs;
- roll or deterministic result;
- result band;
- effects;
- state deltas;
- visible consequence summary;
- hidden consequence summary with visibility metadata;
- mechanical log entry;
- narration significance;
- review flags.

Exact object shape belongs to #38. Exact effect/delta grammar belongs to #40.

## 6.3 Resolution is not presentation

Rules Core output should be clear enough for logs and fallback display, but it does not need to be polished DM prose.

The API DM may improve player-facing presentation only after resolution.

---

# 7. Commit barrier

The commit barrier is the point where validated state deltas become committed game state.

```text
Rules Core resolution
→ state delta validation
→ commit barrier
→ committed state
```

## 7.1 Commit source

The normal source of committed mechanical state is Rules Core output applied by Game State Store.

Other allowed commit sources must be explicit non-mechanical app workflows or marked temporary playtest rulings.

## 7.2 Commit before narration authority

The app should not require API DM narration to approve, deny, or revise a valid mechanical commit.

Narration may be requested after commit using a resolved-facts packet that reflects the resolution and committed truth.

The app may hold final presentation until narration/fallback is ready, but this is presentation timing, not mechanical authority.

## 7.3 Commit failure

If the Game State Store rejects a delta, the transaction must not silently narrate success.

Valid handling:

1. reject the transaction and show a safe error/fallback;
2. rerun validation against current state;
3. flag an implementation defect;
4. route malformed delta to #40 or implementation review.

## 7.4 Turn advancement

Turn order, AP/MP/resource changes, reaction state, encounter clocks, and other action sequencing should advance only from committed state.

If narration is deferred, the next legal transaction may proceed from committed state, but deferred narration must remain attached to the correct prior transaction and cannot revise it.

---

# 8. Narration request and response

API DM narration is a presentation step constrained by resolved facts.

## 8.1 Narration trigger

The app decides whether to call API DM narration.

Narration should normally be requested for:

- major combat outcomes;
- downing, revival, serious injury, shield/mitigation moments worth explaining;
- important NPC reaction;
- social consequence shifts;
- trace, exposure, suspicion, disposition, clock, route, or objective changes;
- important information reveals;
- new scene framing;
- critical or dramatic beats;
- temporary playtest rulings needing player-facing explanation.

Narration may normally be skipped or deferred for:

- routine movement;
- repeated minor attacks;
- menu or inventory browsing;
- already clear mechanical log output;
- low-importance resource changes;
- debug/admin state changes;
- cases where narration would slow play without adding useful fiction.

## 8.2 Resolved-facts packet

Any post-resolution narration request must pass through Context Broker.

The resolved-facts packet should include only the facts required for safe narration.

It should include, when applicable:

- actor;
- action performed;
- target;
- location/map reference;
- paid cost;
- roll or deterministic result;
- result band;
- effects applied;
- state deltas or visible summaries;
- committed state summary after the action;
- visible consequences;
- hidden-consequence visibility rules;
- required omissions;
- facts the API DM must not contradict;
- tone/length constraints.

Exact packet schema belongs to #41.

## 8.3 Narration response validation

The app should validate API DM narration before treating it as displayable result text.

Validation should check whether the response:

- changes mechanical outcome;
- changes actor or target;
- changes cost paid;
- changes damage, healing, status, position, resources, inventory, counters, or clocks;
- reveals hidden information without permission;
- invents new mechanical consequences;
- contradicts map state;
- contradicts committed game state;
- contradicts required resolved facts.

## 8.4 Narration failure fallback

Fallback output should use Rules Core output, committed state, mechanical logs, and templated text.

Fallback can be plain. It is better to be mechanically correct than narratively rich and wrong.

For critical narration significance, the app may retry with a smaller or stricter prompt before fallback, but retries must not block indefinitely.

---

# 9. Ambiguous intent recovery

Ambiguity recovery exists to preserve player agency and prevent API DM from making expensive or irreversible choices for the player.

## 9.1 Hard ambiguity

Hard ambiguity stops the transaction before resolution.

Hard ambiguity includes uncertainty about:

- who acts;
- what target is chosen;
- where the actor moves;
- which limited resource is spent;
- whether danger is accepted;
- whether a hostile action is initiated;
- whether an obligation is accepted;
- which item/loadout/object is affected;
- which hidden-risk path is chosen;
- whether a campaign-significant or irreversible choice is being made.

## 9.2 Soft ambiguity

Soft ambiguity may be resolved by inference or option display when:

- likely intent is obvious;
- the result is reversible or low-stakes;
- no limited resource is spent;
- no hidden consequence is triggered;
- no attack, damage, hostile move, or irreversible commitment occurs;
- Rules Core can safely validate the inferred request.

## 9.3 Clarification prompt shape

A clarification prompt should ask the smallest useful question.

Preferred forms:

```text
Which target do you mean: the guard at the hatch or the technician by the terminal?
```

```text
Do you want to force the door physically, spoof the reader, or look for another route?
```

Clarification prompts should preserve momentum and avoid exposing hidden facts that the player has not earned.

---

# 10. Hidden consequences

Hidden consequences are valid game state when produced by Rules Core and committed through Game State Store.

They are not valid if they exist only in API DM narration.

## 10.1 Visibility metadata

A hidden consequence delta should identify:

- state lane target;
- visible/hidden/concealed status;
- who can know it;
- whether API DM may know it;
- whether API DM may imply it;
- reveal trigger or review route if known;
- persistence scope;
- source transaction id or log reference.

Exact lane ownership belongs to #36. Exact delta grammar belongs to #40.

## 10.2 Player-facing output

A hidden consequence should not appear in player-facing UI/log unless the transaction explicitly creates a visible clue, symptom, warning, partial reveal, or later reveal.

Valid examples:

- hidden trace flag committed, no immediate visible output;
- hidden trace flag committed, visible output says only that the terminal accepted the spoof;
- hidden patrol clock advanced, no immediate visible output;
- hidden suspicion increased, NPC narration shows mild hesitation only if rules permit.

## 10.3 DM visibility

API DM may receive hidden information only when needed to avoid contradiction or produce allowed foreshadowing.

If hidden information is sent, the packet must say what may be narrated and what must remain hidden.

API DM memory alone is not a hidden state lane.

---

# 11. Synchronous and deferred steps

## 11.1 Synchronous steps for state-changing actions

The following must be synchronous for a state-changing transaction:

1. input intake;
2. interpretation or structured action packaging;
3. validation;
4. resolution;
5. state-delta validation;
6. commit or safe rejection;
7. minimum UI/log update or fallback output.

The app should not let state-changing actions float as unresolved prose.

## 11.2 Conditionally synchronous steps

API DM narration is synchronous only when the app mode or narration significance requires it before the player can reasonably continue.

Examples:

- critical outcome narration;
- major NPC response;
- scene transition;
- information reveal that determines next choice;
- social consequence requiring immediate player understanding.

## 11.3 Deferred steps

The following may be deferred if the app preserves transaction identity and committed truth:

- minor flavor narration;
- long recap;
- summary compression;
- post-hoc log beautification;
- image generation;
- source/context enrichment not required for legal resolution;
- review flag triage;
- analytics/debug trace packaging.

Deferred work must not create or revise mechanical truth unless it starts a new transaction.

## 11.4 Deferred hidden consequences

A hidden consequence itself should not be deferred if it is caused by the current action.

Instead, commit a hidden delta or scheduled effect now, then reveal or process it later according to state-lane and effect rules.

---

# 12. Transaction variants

## 12.1 Narration-only transaction

Use when no mechanics are being invoked.

```text
known facts/context
→ Context Broker selects narration context
→ API DM narrates within boundaries
→ app validates no mechanical mutation was added
→ UI displays narration
```

Narration-only output cannot create mechanical truth.

## 12.2 Invalid action transaction

Use when a proposed or structured action cannot resolve.

```text
input/action request
→ validation
→ invalid/blocked/unavailable result
→ UI explains reason or offers valid alternatives
```

Invalid action explanation should be clear, short, and mechanically honest.

API DM may help phrase the explanation only if it is constrained by validation output.

## 12.3 Clarification transaction

Use when player choice is needed before resolution.

```text
input/action request
→ ambiguity detected
→ app asks clarification
→ no mechanical mutation
→ player response starts next transaction or resumes transaction with preserved context
```

Clarification prompts should not leak hidden facts.

## 12.4 Temporary playtest ruling transaction

Use only when no contract exists, stopping play would be worse than making a bounded ruling, and the ruling can be marked for review.

A temporary ruling must record:

- ruling summary;
- why it was needed;
- affected actor/scene/action;
- state delta if any;
- visible/hidden status;
- expiry scope;
- future issue or contract route.

Temporary ruling handling should remain consistent with the Issue #34 boundary: the API DM may explain the ruling, but does not silently create permanent rule authority.

---

# 13. Logs and UI update

## 13.1 Mechanical log

Rules Core should produce the controlling mechanical log entry.

The mechanical log should be sufficient for fallback display and later audit.

It should identify:

- actor;
- action;
- target;
- cost;
- result;
- state deltas or visible summary;
- hidden-delta presence if player-visible debugging allows it;
- transaction id or sequence reference;
- review flags.

Exact object shape belongs to #38.

## 13.2 Narrative log

Narrative log text may come from API DM narration or fallback templates.

Narrative log text must conform to the mechanical log and committed state.

## 13.3 UI update bundle

The UI / App Shell should update from committed state and accepted/fallback presentation.

A UI update bundle may include:

- updated actor rows;
- map/node/token changes;
- resource changes;
- visible status changes;
- visible counters;
- mechanical result line;
- narration text;
- options for next action;
- clarification prompt;
- warning or review flag if needed.

The UI update bundle is presentation. It does not create state.

---

# 14. Dependency routing

## 14.1 Define game state lanes and mutation boundaries:#36

Owns durable state lanes, hidden/concealed state, DM memory, UI-only state, derived state, reset/persistence, and exact mutation authority.

Issue #35 depends on #36 for final lane names but can proceed with the rule that hidden consequences are committed deltas with visibility metadata.

## 14.2 Define rules object model for actions, checks, effects, and logs:#38

Owns final object schemas for input envelope, action request, DM intent proposal, validation result, resolution output, state delta, mechanical log, narration request, narration response, and UI/log update bundle.

Issue #35 defines sequence and responsibility, not final field schema.

## 14.3 Define check family contract:#39

Owns how resolved actions choose Attack Check, Standard Check, Extended Check, or other accepted check families.

Issue #35 only requires that check family selection be validated by Rules Core, not API DM.

## 14.4 Define effect and state-delta grammar:#40

Owns effect vs state delta distinction, mutable surfaces, visibility metadata shape, temporary/persistent deltas, scheduled effects, expiration, and reducer implications.

Issue #35 only requires validated deltas before commit.

## 14.5 Define compact DM context broker contract:#41

Owns exact intent-context and resolved-facts packet design, hidden-state filtering, prompt bloat control, and narration packet boundaries.

Issue #35 only requires that post-resolution narration receives a resolved-facts packet and that Context Broker controls what API DM sees.

---

# 15. Acceptance coverage for Define turn transaction for API DM + rules-core play:#35

This draft covers:

- full transaction sequence;
- freeform input path;
- structured UI action path;
- commit timing;
- contradictory DM narration handling;
- ambiguous player intent handling;
- hidden consequence handling;
- synchronous versus deferred steps;
- dependency routing for object model, state lanes, check families, effect/delta grammar, and context broker.

This draft intentionally does not complete:

- final TypeScript objects;
- final reducer/state-lane implementation;
- final check family registry;
- final effect and state-delta grammar;
- final Context Broker packet schema;
- A1 replacement prose;
- source canon promotion;
- app implementation.
