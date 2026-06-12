# DM_Context_Broker_Contract_rev0.1

Date: 2026-06-12  
Mode: Draft  
Related issue: Define compact DM context broker contract:#41  
Parent issue: Epic: Sequence Nexus app-facing game-rule/system design:#33  
Depends on: #34, #35, #36, #38, #39, #40  
Status: draft contract closure  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

`docs/game-system-contracts/drafts/DM_Context_Broker_Contract_rev0.1.md`

This file supplements:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- `docs/game-system-contracts/drafts/Effect_StateDelta_Grammar_Contract_rev0.1.md`
- GitHub issue #41

Issue #41 suggested `.agents/plans/` as a possible repo lane. This draft uses `docs/game-system-contracts/drafts/` to stay aligned with the existing game-system contract draft lane and avoid duplicate draft authority.

## Replaces

Nothing.

Do not delete, archive, supersede, or replace legacy GPT-DM / DM Mode material, existing gameplay source, schema working drafts, #34, #35, #36, #38, #39, or #40 material as part of this pass. This file is a follow-on Context Broker contract draft.

## Source/currentness status

This is a repo-side draft contract artifact. It is based on ChatGPT Draft Mode work, uploaded bridge baseline context, Issue #41 requirements, and prior committed/issue-sequenced work for #34, #35, #38, #39, and #40. It is not verified against live local `00 Source` and is not source canon.

Implementation note: Issue #41 names `contextSelector.ts` and `dmSystemPrompt.ts` as existing or expected implementation surfaces. GitHub connector search did not locate those exact file names during this pass. Codex/local should verify exact current paths before implementation work.

---

# 1. Purpose

This document defines the rev0.1 compact DM Context Broker contract for Nexus app-facing play.

The purpose is to keep the API DM strong while preventing prompt bloat, visibility leaks, authority drift, and mechanical truth being created from narration.

Core rule:

```text
Context Broker selects what the API DM may see.
API DM interprets and narrates from that packet.
Rules Core validates and resolves mechanics.
Game State Store commits validated state.
Context Broker does not mutate state or resolve rules.
```

The Context Broker is not necessarily a separate service. It may be implemented as app-side functions, retrieval rules, prompt builders, summary caches, source indexes, and visibility filters.

---

# 2. Authority boundary

## 2.1 Context Broker role

Context Broker owns context selection and prompt packet construction.

It may:

- select visible state slices;
- select allowed internal state slices;
- select relevant rules snippets;
- select relevant lore snippets;
- select recent event summaries;
- select resolved-facts packets after Rules Core resolution;
- apply visibility rules;
- enforce prompt budgets;
- include required narration boundaries;
- withhold never-send context;
- mark missing context or stale summaries for review.

It must not:

- interpret freeform player intent as final truth;
- decide action legality;
- select final check family;
- resolve rolls, result bands, effects, or state deltas;
- mutate Game State Store;
- treat API DM memory as state;
- expose concealed state without visibility permission;
- invent source canon, rule authority, map truth, or committed consequences.

## 2.2 Packet authority

A context packet is visibility authority, not mechanical authority.

A packet may tell API DM what it can know, infer, imply, narrate, avoid, or ask about.

A packet does not create a legal action, valid target, successful check, effect, state delta, or committed fact.

## 2.3 DM quality goal

The Context Broker should preserve the useful quality of prior project-chat DM play:

- strong scene continuity;
- character-aware narration;
- compact but specific rules awareness;
- tactical/narrative continuity;
- consequence awareness;
- ability to ask clean clarifying questions;
- ability to narrate resolved mechanical results without rewriting them.

It should do this with selected context, not by dumping the whole source/state/history into every call.

---

# 3. DM call types

Different API DM calls need different context. The Context Broker must identify the call type before packet construction.

Rev0.1 call types:

1. `intent_interpretation`
2. `narration_only`
3. `resolved_outcome_narration`
4. `clarification_prompt`
5. `option_presentation`
6. `scene_framing`
7. `summary_compression`
8. `temporary_playtest_ruling_explanation`

## 3.1 intent_interpretation

Use when player freeform input needs interpretation before Rules Core validation.

Goal: translate messy input into a proposed action meaning or identify ambiguity.

Needs:

- current input;
- active actor/speaker;
- current scene or encounter slice;
- visible targets/options;
- relevant action surfaces;
- relevant rules snippets for classification only;
- visibility constraints needed to avoid illegal inference;
- output schema for `DMIntentProposal`, clarification, or narration-only classification.

Must not include:

- internal facts the DM does not need;
- full source dumps;
- final result instructions;
- authority to choose expensive or irreversible options for the player.

## 3.2 narration_only

Use when no mechanics are being invoked.

Goal: describe, recap, answer visible factual questions, or produce scene flavor without creating mechanical truth.

Needs:

- known facts;
- visible scene slice;
- current tone/length constraints;
- narration boundaries;
- recent relevant event summary.

Must not include:

- concealed state unless needed and permitted;
- rules packets beyond basic authority reminders;
- state mutation instructions.

## 3.3 resolved_outcome_narration

Use after Rules Core resolution and state-delta validation/commit path has produced resolved facts.

Goal: narrate what mechanically happened without changing it.

Needs:

- resolved-facts packet;
- actor, target, location;
- paid cost;
- check result or deterministic result;
- result band;
- effects applied;
- visible state deltas or summaries;
- allowed concealed-consequence hints;
- required omissions;
- contradiction rules.

Must not include:

- alternate possible outcomes;
- concealed values unless visibility allows;
- broad source context that may invite contradiction;
- permission to alter effect/delta/log truth.

## 3.4 clarification_prompt

Use when ambiguity blocks validation/resolution.

Goal: ask the smallest useful player-facing question.

Needs:

- raw input;
- ambiguity summary;
- valid visible interpretations/options;
- omission rules;
- exact required missing field if known.

Must not include:

- concealed option existence unless revealed;
- speculative new mechanics;
- long explanation unless player confusion needs it.

## 3.5 option_presentation

Use when the app wants API DM help phrasing visible valid or likely options.

Goal: present player-facing choices clearly.

Needs:

- options already validated or marked as provisional;
- visible action surfaces;
- cost/risk summary if visible;
- boundary that visible options are not success guarantees unless validated.

Must not include:

- invalid concealed options;
- concealed risks unless the player has a visible clue;
- invented map geometry or new action surfaces.

## 3.6 scene_framing

Use when entering or reframing a scene.

Goal: set player-facing scene context without inventing mechanical surfaces beyond allowed setup.

Needs:

- scene premise;
- prepared map/source/app details;
- visible NPC/entity/route/objective highlights;
- allowed DM dressing authority;
- tactical map boundary if mapped play is active or likely.

Must not include:

- unrevealed facts;
- full encounter solution;
- concealed state unless the DM needs it to avoid contradiction.

## 3.7 summary_compression

Use to turn event/log history into compact future context.

Goal: preserve important continuity at lower token cost.

Needs:

- source log entries;
- visibility target;
- summary scope;
- facts that must be preserved exactly;
- facts that may be generalized.

Must not include:

- unsupported reinterpretation;
- visibility leakage into player-visible summaries;
- mechanical changes not present in the source logs.

## 3.8 temporary_playtest_ruling_explanation

Use only when a bounded temporary playtest ruling was produced by the transaction path.

Goal: explain the temporary ruling without turning it into source canon.

Needs:

- ruling summary;
- why it was needed;
- affected action/state;
- visible result;
- expiry/review route if player-facing;
- boundary that it is temporary.

Must not include:

- permanent rule claims;
- source-canon language;
- unreviewed expansion beyond the current ruling.

---

# 4. Packet taxonomy rev0.1

Issue #41 requires these packet types:

```text
Core DM behavior
Current scene slice
Actor/crew slice
Relevant rules snippet
Relevant lore snippet
Recent event summary
Resolved facts packet
Allowed narration boundaries
```

Rev0.1 adds routing wrappers around those packets.

## 4.1 ContextBrokerRequest

Purpose: app request for a DM-ready context packet.

Minimal shape:

```text
ContextBrokerRequest
- TransactionRef optional
- CallType
- CurrentMode
- ActorRef optional
- SceneRef or EncounterRef optional
- RawInput optional
- ActionRequestRef optional
- ValidatedActionRef optional
- ResolutionOutputRef optional
- VisibilityTarget
- TokenBudget
- RequiredPacketTypes
- OptionalPacketTypes
- ReviewFlag optional
```

Owner: UI / App Shell, Rules Core, or transaction layer depending on call type.

May mutate state: no.

## 4.2 DMContextPacket

Purpose: final packet sent to API DM.

Minimal shape:

```text
DMContextPacket
- PacketRef
- ContextBrokerRequestRef
- CallType
- AuthorityReminder
- CoreDMBehaviorPacket
- CurrentSceneSlice optional
- ActorCrewSlice optional
- RelevantRulesSnippet[] optional
- RelevantLoreSnippet[] optional
- RecentEventSummary optional
- ResolvedFactsPacket optional
- AllowedNarrationBoundaries
- VisibilityInstructions optional
- NeverSendOmissionsSummary optional
- OutputContract
- TokenBudgetReport optional
- ReviewFlag optional
```

Owner: Context Broker.

May mutate state: no.

## 4.3 PacketRef and traceability

Every context packet should be traceable enough for debugging.

Recommended refs:

- source transaction;
- source scene/encounter;
- selected state version or state snapshot ref;
- source log summary refs;
- selected source/rules/lore refs;
- summary cache refs;
- visibility policy ref.

Traceability is for debugging and audit. It does not make the packet authoritative over state.

---

# 5. Always-included DM context

Always-included context should be small, stable, and high-value.

It should not become a full source dump.

## 5.1 Always include: authority reminder

Every packet should include a compact authority reminder:

```text
You interpret and narrate. You do not decide final legality, cost, roll, result band, effect, state delta, concealed truth, or committed state. Follow the provided packet and output contract.
```

For post-resolution narration, include:

```text
Resolved facts are fixed. Do not change mechanics, target, cost, result, effect, state delta, concealed information, map truth, or committed state.
```

## 5.2 Always include: current call type

The DM must know what kind of work it is doing.

Examples:

- interpret intent;
- narrate resolved outcome;
- ask clarification;
- frame scene;
- compress summary.

## 5.3 Always include: current mode

Current mode tells the DM which constraints matter.

Examples:

- narrative;
- tactical;
- social;
- exploration;
- menu;
- debug;
- playtest.

## 5.4 Always include: active player/actor handle when relevant

Include the active actor/speaker when the call concerns a character action, narration, or choice.

Do not include the full crew sheet unless needed.

## 5.5 Always include: minimal visible scene anchor

The DM needs a compact anchor for where play is happening.

Minimum:

- scene/encounter name or ref;
- location type;
- current immediate situation;
- visible active entities/options only as needed;
- tactical map boundary if relevant.

## 5.6 Always include: output contract

The DM must know the required output shape.

Examples:

- return `DMIntentProposal` fields;
- return clarification question only;
- return short narration only;
- return summary with exact preserved facts;
- return refusal-to-infer due to missing or invalid context.

## 5.7 Always include: required omissions when relevant

When constrained context exists, the packet should explicitly state what not to mention.

Examples:

- do not reveal exact trace value;
- do not imply unrevealed location data;
- do not invent cover;
- do not describe objective completion unless packet says completed.

---

# 6. Dynamic context selection

Dynamic context is selected based on call type, mode, actor, target, action surface, rules need, lore need, recent history, and visibility policy.

## 6.1 Selection inputs

Context Broker may use:

- current mode;
- current transaction state;
- active actor;
- selected target;
- current scene/encounter;
- visible map options;
- visible action surfaces;
- current action category;
- current surface category;
- check family if known;
- result band if resolved;
- effect/state-delta types if resolved;
- recent event refs;
- active statuses, counters, clocks, objectives, and route state;
- visibility policy;
- token budget.

## 6.2 Selection rule: current task first

The packet should answer the current DM call, not prepare for every possible next call.

Bad pattern:

```text
Send all actor sheets, all rules, all lore, all recent session history, full map state, and all internal state every turn.
```

Better pattern:

```text
Send the actor/action/scene slices needed for the current interpretation or narration call, plus compact refs/summaries for continuity.
```

## 6.3 Selection rule: local relevance before global lore

Prefer immediate scene, action, actor, and rule relevance before broad worldbuilding.

Lore should be selected when it changes:

- NPC voice;
- faction response;
- location logic;
- allowed fiction;
- stakes;
- consequence interpretation;
- continuity.

Do not include lore only because it is interesting.

## 6.4 Selection rule: rules snippets by mechanical surface

Relevant rules snippets should be chosen from the action/check/effect surfaces involved.

Inputs may include:

- ActionCategory;
- SurfaceCategory;
- CheckFamily;
- ResultBand;
- EffectType;
- StateLaneRef;
- status/ability/item refs;
- current mode.

The rules snippet should be just enough for API DM to interpret or narrate safely.

The API DM should not receive a rules packet that invites it to resolve mechanics instead of Rules Core.

## 6.5 Selection rule: lore snippets by narrative surface

Relevant lore snippets should be selected by:

- faction;
- location;
- NPC identity/type;
- mission/route node;
- technology/system being referenced;
- prior established facts;
- tone constraints.

Lore snippets should not override current committed state.

## 6.6 Selection rule: recent history by consequence relevance

Recent events should be summarized or selected when they affect:

- current player choice;
- NPC response;
- legal action options;
- active counters/clocks;
- unresolved objectives;
- scene continuity;
- revealed knowledge boundary;
- current emotional/tactical stakes.

Routine logs should be compressed.

---

# 7. Summary behavior

## 7.1 Summary purpose

Summaries reduce token cost while preserving continuity and mechanical truth.

A summary is not source canon and not a state mutation.

## 7.2 Summary types

Rev0.1 summary types:

- `recent_event_summary`
- `scene_state_summary`
- `actor_state_summary`
- `objective_summary`
- `relationship_counter_summary`
- `internal_state_summary`
- `resolved_facts_summary`
- `session_recap_summary`

## 7.3 Summary visibility

Every summary needs a visibility target.

Examples:

- player-visible summary;
- API DM permitted internal summary;
- internal/debug summary;
- Rules Core-only summary;
- Context Broker-only summary.

Do not reuse an internal summary as player-facing narration.

## 7.4 Summary fidelity rules

Summaries must preserve exact facts for:

- actor HP/SI/AP/MP/resources when relevant;
- positions and map truth when tactical;
- active statuses;
- active objectives;
- committed counters/clocks;
- revealed facts;
- internal facts if summary visibility permits;
- unresolved obligations or promises;
- temporary rulings and review flags.

Summaries may compress:

- repeated flavor narration;
- routine movement;
- minor repeated action narration after logs preserve mechanics;
- long NPC chatter without mechanical consequence;
- old scene dressing no longer relevant.

## 7.5 Summary refresh triggers

Refresh or rebuild summaries when:

- scene changes;
- encounter starts or ends;
- actor state changes significantly;
- objective state changes;
- internal state changes that affect future narration or choices;
- a temporary ruling is made;
- a contradiction/review flag occurs;
- summary age or token budget makes it stale.

## 7.6 Summary provenance

A summary should retain refs to the source logs/state slices it compresses when practical.

This enables later review when the DM contradicts state or the app needs to rebuild context.

---

# 8. Never-send context

Some context should not be sent to the API DM unless a narrower exception applies.

## 8.1 Never send as default

Default never-send categories:

- full Game State Store dump;
- full source corpus;
- full rules corpus;
- full lore corpus;
- unrelated campaign history;
- internal state irrelevant to the current call;
- unrevealed map information irrelevant to safe narration;
- future route spoilers;
- source/admin workflow details irrelevant to play;
- local machine credentials or access tokens;
- raw debug traces not needed for the DM call;
- implementation internals that invite the DM to reason as the app.

## 8.2 Concealed state exception

Concealed state may be sent only when one of these is true:

1. API DM needs it to avoid contradiction.
2. API DM is allowed to foreshadow a visible symptom.
3. API DM is writing internal-only summary with matching visibility.
4. API DM needs it to phrase a non-revealing response safely.
5. The player has earned a reveal and the packet includes reveal permission.

Even then, the packet must say what may be narrated and what must remain concealed.

## 8.3 Source/lore exception

A larger source/lore snippet may be sent when:

- it is needed for a major scene or NPC voice;
- the action involves a specific domain/system;
- a source-backed answer is required;
- previous compact context caused drift or contradiction.

The default remains compact selected snippets.

---

# 9. Intent prompt vs narration prompt

## 9.1 Intent prompt packet

Intent interpretation packet should help the API DM classify what the player means.

It should include:

- raw player input;
- active actor/speaker;
- current visible scene/options;
- possible relevant ActionSurface and MapOption refs;
- action/surface category hints if already known;
- relevant rules snippets for classification;
- ambiguity rules;
- output contract for proposal / clarification / narration-only classification.

It should not include:

- final resolved facts;
- result-band tables unless classification requires them;
- concealed outcomes;
- broad lore unrelated to interpreting the action.

Expected output:

```text
DMIntentProposal
or needs_clarification
or narration_only_classification
or unsupported_request
```

## 9.2 Narration prompt packet

Narration packet should help the API DM describe fixed results.

It should include:

- resolved-facts packet;
- committed or commit-ready visible state summary;
- actor/target/location;
- effect and delta summary;
- visibility rules;
- tone/length constraints;
- contradiction rules;
- required omissions.

It should not include:

- alternate legal interpretations;
- unresolved proposals;
- concealed state not allowed for narration;
- broad rules snippets not needed for prose.

Expected output:

```text
NarrationPayload only.
No mechanics changed.
No new consequences added.
No concealed facts revealed unless permitted.
```

## 9.3 Clarification prompt packet

Clarification packets are narrower than intent prompts.

They should include:

- ambiguity summary;
- exact missing choice;
- visible options;
- omission rules;
- short style constraint.

Expected output:

```text
One small player-facing question, optionally with selectable choices.
```

---

# 10. Resolved-facts packet requirements

`ResolvedFactsPacket` is the most important post-resolution DM packet.

It tells API DM what is fixed and what may be narrated.

Minimal shape:

```text
ResolvedFactsPacket
- TransactionRef
- CallType: resolved_outcome_narration
- ActorRef
- TargetRef optional
- SceneRef or EncounterRef
- ValidatedAction summary
- PaidCost summary optional
- CheckResult summary optional
- ResultBand optional
- Effect summary
- StateDelta summary
- VisibleConsequenceSummary
- ConcealedConsequenceInstructions optional
- CommittedStateSummary or CommitReadyStateSummary
- RequiredNarrationFacts
- RequiredOmissions
- ContradictionRules
- ToneLengthConstraints
- ReviewFlag optional
```

## 10.1 Required fixed facts

If present, these are fixed and may not be changed by narration:

- actor;
- target;
- action;
- paid cost;
- roll/deterministic result;
- result band;
- damage/healing/resource amount;
- status applied/removed;
- movement/position;
- objective progress;
- counter/clock shift;
- reveal/conceal result;
- state delta target/path/operation;
- visibility instructions.

## 10.2 Concealed consequence instructions

Concealed consequence instructions should say:

- whether concealed consequence exists;
- whether API DM may know it;
- whether API DM may imply it;
- exact facts/values that must not be revealed;
- allowed symptom or foreshadowing text type;
- reveal trigger if known.

## 10.3 Contradiction handling

If API DM narration contradicts resolved facts, the app should:

1. reject narration;
2. retry with stricter packet if useful;
3. fallback to mechanical text;
4. flag contradiction for review;
5. continue from committed mechanical truth.

Never change state to match narration.

---

# 11. Visibility handling

## 11.1 Visibility levels

Rev0.1 visibility levels:

- `visible_to_player`
- `visible_to_ui_only`
- `visible_to_api_dm`
- `visible_to_context_broker_only`
- `visible_to_rules_core_only`
- `concealed_from_player`
- `unrevealed_until_trigger`
- `debug_only`

These may later be refactored into a final enum by implementation work.

## 11.2 Concealed state packet modes

When concealed state exists, the Context Broker chooses one mode:

- `withhold` — do not send to API DM.
- `send_no_narrate` — DM may know to avoid contradiction, but may not mention.
- `send_symptom_only` — DM may narrate limited visible symptom.
- `send_partial_reveal` — DM may reveal bounded information.
- `send_full_reveal` — DM may narrate because the state is now revealed.
- `internal_summary_only` — DM may summarize for internal continuity, not player output.

## 11.3 Examples

Trace not visible to player:

```text
State: trace +1
Packet mode: send_no_narrate or withhold
Allowed narration: terminal accepts spoof
Forbidden narration: exact trace value or explicit future response
```

Suspicion with visible symptom:

```text
State: NPC suspicion increases
Packet mode: send_symptom_only
Allowed narration: NPC pauses briefly before continuing
Forbidden narration: exact suspicion step
```

Revealed clue:

```text
State: clue becomes revealed
Packet mode: send_full_reveal
Allowed narration: describe the clue and what the character can understand
```

## 11.4 API DM memory boundary

API DM memory is not a concealed-state lane.

If something must matter later, commit it as state, log, summary, scheduled effect, counter, clock, or review flag.

---

# 12. Prompt-bloat and cost-control strategy

## 12.1 Budget model

Every ContextBrokerRequest should carry or infer a token budget.

Rev0.1 budget tiers:

- `tiny` — clarification, simple option phrasing, small narration.
- `small` — ordinary intent interpretation or routine outcome narration.
- `medium` — important scene beat, social response, meaningful encounter result.
- `large` — scene opening, major reveal, complicated recap, important NPC/faction moment.
- `debug_override` — temporary developer/debug use only.

## 12.2 Compression priority

When budget pressure exists, preserve in this order:

1. authority/output contract;
2. current player input or resolved facts;
3. required visibility rules;
4. current scene/actor/target slice;
5. relevant rules snippet;
6. recent consequence summary;
7. relevant lore snippet;
8. style/tone refinements;
9. older history.

## 12.3 Avoid duplicate context

Do not send the same fact in multiple long forms.

Prefer:

- stable system prompt for durable DM behavior;
- compact packet for current call;
- refs/summaries for prior state;
- selected snippets for rules/lore.

## 12.4 Prompt bloat flags

Set a review flag when:

- packet exceeds budget;
- needed rules/lore cannot be selected narrowly;
- visibility filtering is uncertain;
- summary is stale;
- DM output drifts due to missing context;
- repeated retries are needed;
- call type is too broad.

---

# 13. Preserving DM quality from project chats

## 13.1 What should be preserved

The app DM should preserve:

- narrative continuity;
- vivid but controlled scene description;
- concise mechanical awareness;
- strong consequence carryover;
- flexible freeform interpretation;
- ability to turn messy player wording into clear proposals;
- ability to ask specific clarifying questions;
- ability to narrate tactical outcomes without inventing mechanics;
- ability to maintain NPC voice and faction logic.

## 13.2 How to preserve it without prompt bloat

Use:

- stable compact DM behavior prompt;
- scene-specific slices;
- actor/crew summaries instead of full sheets;
- relevant rule snippets, not full rules docs;
- relevant lore snippets, not broad lore dumps;
- recent event summaries with exact mechanical facts preserved;
- resolved-facts packets after Rules Core resolution;
- explicit boundaries and omissions.

## 13.3 What not to preserve

Do not preserve the old chat surface's weaknesses:

- relying on model memory as state;
- letting narration become rules;
- broad context dumps;
- drifting from exact map/state truth;
- informal concealed-state handling;
- unclear distinction between temporary rulings and durable rules.

---

# 14. Implementation implications

## 14.1 contextSelector.ts implications

Issue #41 names `contextSelector.ts` as an implementation surface. Exact current path needs Codex/local verification.

Expected responsibilities:

- accept a `ContextBrokerRequest`;
- determine `CallType` if not already provided;
- select required packet types;
- select dynamic state/rules/lore/log slices;
- apply `VisibilityPolicy`;
- enforce token budget tier;
- choose summary vs raw snippet;
- build `DMContextPacket`;
- emit `TokenBudgetReport` and `ReviewFlag`s when needed.

Suggested function surfaces:

```text
buildDMContextPacket(request)
selectSceneSlice(request)
selectActorCrewSlice(request)
selectRulesSnippets(request)
selectLoreSnippets(request)
selectRecentEventSummary(request)
buildResolvedFactsPacket(request)
applyVisibilityPolicy(packet, visibilityTarget)
trimToBudget(packet, tokenBudget)
```

## 14.2 dmSystemPrompt.ts implications

Issue #41 names `dmSystemPrompt.ts` as an implementation surface. Exact current path needs Codex/local verification.

Expected responsibilities:

- hold stable DM behavior rules;
- hold authority boundaries;
- hold output discipline;
- stay compact;
- avoid per-scene/per-turn bloat;
- defer variable state/rules/lore/history to Context Broker packets.

The system prompt should not contain:

- full source docs;
- full state dumps;
- current scene details;
- current concealed state;
- long rulebooks;
- implementation-only debug details unless in debug mode.

## 14.3 Existing implementation caution

Because exact file names were not found by GitHub connector search during this pass, implementation should begin by locating or creating the correct surfaces rather than assuming paths.

Valid next Codex/local action:

1. verify whether `contextSelector.ts` exists under `src`, `app`, `server`, `lib`, or similar;
2. verify whether `dmSystemPrompt.ts` exists under current DM/API prompt code;
3. if not present, identify the nearest existing context/prompt assembly files;
4. wire this contract to those files or create new files with clear ownership;
5. do not implement broad retrieval until #41 contract is reviewed enough.

---

# 15. Examples

## 15.1 Intent interpretation packet

Player input:

```text
I try to talk the checkpoint operator into letting us through before the patrol loops back.
```

Useful packet:

```text
CallType: intent_interpretation
Actor: active speaker
Scene: checkpoint, visible operator, sealed hatch
Visible action surfaces: social gate, route gate
Relevant rules: social/check-family classification only
Recent summary: patrol timing is a visible concern if already established
Visibility rule: do not reveal exact concealed patrol clock
Output: proposal or clarification
```

Expected DM output:

```text
Proposed ActionCategory: Persuade
SurfaceCategory: Gate / Route
Target: checkpoint operator
Possible risk: patrol timing pressure, if visible
Clarification: only if approach or target is ambiguous
```

## 15.2 Resolved narration packet

Resolved facts:

```text
Action: spoof credential reader
CheckResult: partial success
Effect: hatch opens
StateDelta: hatch gate unlocked/open
Concealed StateDelta: trace +1
VisibilityPolicy: trace concealed; no exact mention
```

Useful packet:

```text
CallType: resolved_outcome_narration
Resolved facts fixed
Allowed narration: hatch cycles open; terminal accepts spoof with slight delay
Forbidden: trace value, future response, changing partial to clean success
```

Expected narration:

```text
The reader hesitates, then the hatch seals break with a soft pressure sigh. The way through is open.
```

## 15.3 Clarification packet

Player input:

```text
I target the nearest console.
```

Ambiguity:

```text
Two visible consoles are in reach.
```

Useful packet:

```text
CallType: clarification_prompt
Question needed: target choice
Visible options: wall console, portable service terminal
Omissions: do not mention unrevealed systems
```

Expected output:

```text
Which console are you using: the wall console or the portable service terminal?
```

## 15.4 Narration-only packet

Player input:

```text
What does the corridor look like?
```

Useful packet:

```text
CallType: narration_only
Scene slice: visible corridor description, lighting, hatch, terminal, no mechanics
Boundary: do not create new action surfaces unless clearly marked as flavor
```

Expected output:

```text
A narrow service corridor runs under exposed cable trays, its off-white panels browned around the vents. The hatch ahead is marked with orange pressure warnings, and the terminal beside it is still powered.
```

---

# 16. Relationship to prior contracts

## 16.1 #34 authority split

#34 establishes that API DM interprets/narrates, Rules Core validates/resolves, Game State Store commits, and Context Broker controls DM visibility.

#41 defines how that visibility packet is built.

## 16.2 #35 turn transaction

#35 establishes where Context Broker appears in the transaction:

- before intent interpretation;
- after resolution for resolved-facts narration;
- when narration-only handling is requested;
- when summary/fallback/clarification needs context.

#41 defines packet contents for those moments.

## 16.3 #38 rules object model

#38 owns object boundaries such as `DMIntentProposal`, `DMNarrationRequest`, `DMNarrationResponse`, and `UIUpdateBundle`.

#41 defines the Context Broker packet feeding those objects.

## 16.4 #39 check family contract

#39 owns check family behavior.

#41 may select check-family snippets for interpretation or narration but does not let API DM resolve checks.

## 16.5 #40 effect/state-delta grammar

#40 owns effects, deltas, visibility metadata implications, scheduled effects, and reducer implications.

#41 must respect #40 by treating concealed consequences as committed state/deltas, not prose memory.

---

# 17. Out of scope for #41

This draft intentionally does not finalize:

- final TypeScript interfaces;
- final retrieval/index implementation;
- final source-lore chunking strategy;
- final token-counting implementation;
- final context cache design;
- final vector/RAG system;
- final prompt text for every call type;
- final UI debug panel;
- final source canon promotion;
- app implementation.

---

# 18. Acceptance coverage for Define compact DM context broker contract:#41

This draft covers:

- always-included DM context;
- dynamic context selection rules;
- summary behavior;
- never-send context;
- intent-prompt versus narration-prompt differences;
- resolved-facts packet requirements;
- visibility/concealed-state handling;
- prompt-bloat and cost-control strategy;
- preservation of strong DM quality from project chats;
- implementation implications for issue-named `contextSelector.ts` and `dmSystemPrompt.ts` surfaces;
- dependency routing back to #34, #35, #38, #39, and #40 without reopening their foundations.

This draft intentionally remains a contract draft, not source canon or implementation code.
