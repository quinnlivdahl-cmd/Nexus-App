# GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01_ISSUE_41_SPIRITUAL_APPEND

Date: 2026-06-12  
Mode: Draft  
Related epic: #33 — Epic: Sequence Nexus app-facing game-rule/system design  
Related issue: #41 — Define compact DM context broker contract  
Status: committed companion append artifact  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

This file is a safe companion append artifact for:

`docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`

It is intended to be folded into the running continuation file after local/Codex append verification, or retained as a companion artifact if the running file remains too large for safe connector replacement.

## Supplements

This file supplements:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`
- GitHub Issue #33
- GitHub Issue #41
- Issue #34 authority split material
- Issue #35 turn transaction material
- Issue #38 object model material
- Issue #39 check family contract material
- Issue #40 effect / state-delta grammar material

## Replaces

Nothing.

Do not delete, archive, supersede, or replace the running continuation file, prior #39/#40 draft material, primary schema working draft, object-model artifacts, legacy GPT-DM / DM Mode material, existing source docs, or gameplay source based on this companion append.

## Connector note

This artifact exists because the available GitHub connector write path can create or replace files, but does not provide a safe atomic append operation. To preserve the user instruction to delete nothing, this file commits the #41 append material without risking accidental replacement of the 1,372-line running continuation draft.

---

# Issue #41 — Compact DM Context Broker Contract

## 41.1 Purpose

This section defines the rev0.1 compact DM context broker contract.

The goal is to keep API DM calls useful, bounded, and mechanically safe without dumping full game state, full rules, full lore, or hidden information into every prompt.

Core rule:

```text
Context Broker selects what the API DM may see.
API DM interprets and narrates from that packet.
Rules Core validates and resolves mechanics.
Game State Store commits validated state.
Context Broker does not mutate state or resolve rules.
```

This section does not define final TypeScript, final prompt text, final source-canon prose, final implementation paths, or full retrieval/index behavior.

## 41.2 What the Context Broker is

The Context Broker is the app-side authority for selecting compact context packets for API DM calls.

It may select:

- visible state slices;
- permitted internal state slices;
- relevant rules snippets;
- relevant lore snippets;
- recent event summaries;
- actor or crew summaries;
- map or scene slices;
- resolved facts after Rules Core resolution;
- hidden-state handling instructions;
- narration boundaries;
- output contracts;
- token-budget limits;
- contradiction rules.

Short boundary:

```text
Context Broker decides what context the DM receives.
It does not decide what mechanically happens.
```

## 41.3 What the Context Broker is not

The Context Broker is not:

- Rules Core;
- Game State Store;
- API DM;
- UI / App Shell;
- source canon;
- a reducer;
- a check resolver;
- a state mutation authority;
- a narration generator;
- a full memory dump;
- a replacement for live source verification.

It must not:

- decide final action legality;
- select final check family;
- decide modifiers, rolls, result bands, effects, or state deltas;
- mutate Game State Store;
- convert API DM memory into state;
- expose concealed state without permission;
- invent map truth;
- invent source canon;
- change committed logs;
- treat broad prose summaries as mutation authority.

## 41.4 Relationship to prior contracts

### #34 authority split

#34 establishes that API DM interprets/narrates, Rules Core validates/resolves, Game State Store preserves committed truth, and Context Broker controls DM visibility.

#41 defines the packet-level shape of that visibility control.

### #35 turn transaction

#35 establishes where Context Broker appears in the transaction:

```text
Before intent interpretation.
After Rules Core resolution for narration.
During narration-only handling.
During clarification, option presentation, summary, and fallback flows.
```

#41 defines the compact packets used in those positions.

### #38 object model

#38 establishes object boundaries such as:

```text
DMIntentProposal
ActionRequest
ValidatedAction
CheckInput
ResolutionOutput
Effect
StateDelta
ResolutionLogEntry
DMNarrationRequest
DMNarrationResponse
UIUpdateBundle
VisibilityPolicy
```

#41 defines how selected subsets of those objects, summaries, and refs become API DM context.

### #39 check family contract

#39 establishes that check family belongs to Rules Core resolution, not API DM narration.

#41 may send check-family snippets to API DM for interpretation or narration, but only as context. It does not let API DM choose final check family.

### #40 effect / state-delta grammar

#40 establishes that effects and state deltas are mechanical truth objects, and that hidden consequences must be stored as committed state, scheduled effects, counters, clocks, logs, summaries, or review flags.

#41 defines how those visible or concealed facts are filtered before API DM narration.

## 41.5 DM call types

Context packets should be built around the current API DM call type.

Rev0.1 call types:

```text
intent_interpretation
narration_only
resolved_outcome_narration
clarification_prompt
option_presentation
scene_framing
summary_compression
temporary_playtest_ruling_explanation
```

### intent_interpretation

Used when freeform player input needs to become a proposed meaning before Rules Core validation.

The packet should help the API DM identify likely intent, ambiguity, possible target, possible action surface, possible action category, and whether clarification is required.

It must not include final resolved facts, concealed outcomes, or broad unrelated lore.

### narration_only

Used when the player asks for description, recap, visible fact clarification, NPC speech, or scene color without invoking mechanics.

The packet should include visible scene truth and boundaries that prevent the API DM from inventing mechanical surfaces accidentally.

### resolved_outcome_narration

Used after Rules Core has resolved mechanics.

The packet must include fixed resolved facts and contradiction rules.

API DM may narrate those facts. It may not revise them.

### clarification_prompt

Used when ambiguity blocks validation or resolution.

The packet should produce the smallest useful player-facing question.

It must not reveal hidden information while asking the question.

### option_presentation

Used when the system needs to phrase visible options.

Options may be validated, provisional, or nearby legal alternatives, but the packet must clearly distinguish those states.

### scene_framing

Used to establish or reframe a scene.

The packet may include lore, scene setup, NPC voice, map anchors, and current constraints.

It must not create mechanical map options, hazards, rewards, routes, or objectives unless those are prepared or validated.

### summary_compression

Used to compress logs, history, scene state, or internal continuity into future context.

The summary must preserve mechanical truth and visibility target.

### temporary_playtest_ruling_explanation

Used only when a temporary playtest ruling has been made or needs explanation.

The packet must mark the ruling as temporary, scoped, logged, and review-routed.

## 41.6 Packet taxonomy

The Context Broker should assemble named packet surfaces instead of dumping broad context.

Required rev0.1 packet surfaces:

```text
Core DM behavior
Current scene slice
Actor / crew slice
Relevant rules snippet
Relevant lore snippet
Recent event summary
Resolved facts packet
Allowed narration boundaries
Visibility instructions
Output contract
Token budget report
Context selection trace
Review flags
```

## 41.7 Source document slicing requirement

The Context Broker will only work well if source documents are sectioned into small, coded, retrievable slices.

Source documents should be structured so the app, Codex, retrieval scripts, and Context Broker can identify and distribute exactly the needed rule/lore/play slice without sending entire chapters or loosely named prose blobs.

Working requirement:

```text
Source docs should be sectioned into stable coded slices.
Each slice should have enough metadata for context selection, visibility filtering, and traceable prompt assembly.
```

Candidate slice metadata:

```text
sourceSliceId
sourceDocId
domain
sectionPath
canonicalTitle
shortPurpose
rulesSurfaceRefs
actionCategoryRefs
surfaceCategoryRefs
checkFamilyRefs
effectProfileRefs
stateLaneRefs
modeApplicability
visibilityDefault
contextBrokerUse
summaryAllowed yes/no
playerFacingAllowed yes/no
apiDMAllowed yes/no
rulesCoreOnly yes/no
lastReviewed
sourceStatus
```

Practical examples:

```text
A long combat chapter should not be one promptable blob.
It should split into slices such as cover rule, attack roll rule, shield handling, mitigation handling, downed handling, and narration display guidance.

A lore document should not be dumped because a faction is mentioned.
It should split into slices such as faction voice, known public facts, hidden internal facts, location behavior, current relationship posture, and spoiler-locked future material.
```

This requirement belongs to future source architecture and context-pack work, but #41 should record it now because compact Context Broker behavior depends on it.

Do not restructure live source based on this note alone. Route any source-sectioning work through Steward/Codex/local verification.

## 41.8 Wrapper objects

Rev0.1 wrapper objects:

```text
ContextBrokerRequest
DMContextPacket
ResolvedFactsPacket
NarrationBoundary
TokenBudgetReport
ContextSelectionTrace
```

These are scaffold-level object names only. They are stable enough for contract discussion, not final TypeScript.

## 41.9 ContextBrokerRequest draft shape

A `ContextBrokerRequest` is the app request for a DM-ready context packet.

Suggested fields:

```text
ContextBrokerRequest
- requestRef
- transactionRef, if any
- callType
- currentMode
- actorRef, if any
- sceneRef or encounterRef
- targetRef, if any
- rawInputRef, if relevant
- actionRequestRef, if relevant
- validatedActionRef, if relevant
- resolutionOutputRef, if relevant
- visibilityTarget
- tokenBudgetTier
- requiredPacketSurfaces
- optionalPacketSurfaces
- summaryPolicy
- concealmentPolicy
- outputContractRef
- reviewFlag, if needed
```

This shape should preserve enough traceability for debugging without sending unnecessary state to the API DM.

## 41.10 DMContextPacket draft shape

A `DMContextPacket` is the final context packet sent to API DM.

Suggested fields:

```text
DMContextPacket
- packetRef
- sourceRequestRef
- callType
- authorityReminder
- coreDMBehavior
- currentSceneSlice
- actorCrewSlice
- relevantRulesSnippets
- relevantLoreSnippets
- recentEventSummary
- resolvedFactsPacket, when applicable
- allowedNarrationBoundaries
- visibilityInstructions
- requiredOmissions
- outputContract
- tokenBudgetReport
- contextSelectionTrace
- reviewFlag, if needed
```

Traceability rule:

```text
Every context packet should be traceable enough for debugging, including source transaction, scene/encounter, selected state version, source log summary refs, selected rules/lore refs, summary cache refs, and visibility policy refs where practical.
```

Traceability is for audit/debug. It does not make the packet authoritative over state.

## 41.11 Always-included DM context

Every API DM context packet should include a small stable core, then add dynamic context only as needed.

Always include:

- compact authority reminder;
- current call type;
- current mode;
- active player/actor handle when relevant;
- minimal visible scene anchor;
- output contract;
- required omissions when relevant.

Authority reminder baseline:

```text
You interpret and narrate. You do not decide final legality, cost, roll, result band, effect, state delta, concealed truth, or committed state. Follow the provided packet and output contract.
```

Resolved-outcome reminder:

```text
Resolved facts are fixed. Do not change mechanics, target, cost, result, effect, state delta, concealed information, map truth, or committed state.
```

## 41.12 Dynamic context selection rules

Dynamic context is selected by current task, not by broad availability.

Selection inputs may include:

- current mode;
- transaction state;
- active actor;
- selected target;
- current scene or encounter;
- visible map options;
- visible action surfaces;
- action category;
- surface category;
- check family, if known;
- result band, if resolved;
- effect or state-delta types, if resolved;
- recent event refs;
- active statuses, counters, clocks, objectives, and route state;
- visibility policy;
- token budget.

Selection rules:

- Current task first.
- Local relevance before global lore.
- Rules snippets should be selected by mechanical surface: action category, surface category, check family, result band, effect type, state lane, status, ability, item, and current mode.
- Lore snippets should be selected only when they affect NPC voice, faction response, location logic, allowed fiction, stakes, consequence interpretation, or continuity.
- Recent history should be included when it affects current player choice, NPC response, legal options, counters/clocks, objectives, continuity, revealed knowledge boundaries, or current stakes.
- Routine logs should be compressed.

Anti-bloat rule:

```text
Do not send all actor sheets, all rules, all lore, full session history, full map state, and all internal state every turn.
Send the actor/action/scene slices needed for the current interpretation or narration call, plus compact summaries for continuity.
```

## 41.13 Summary behavior

Summaries reduce token cost while preserving continuity and mechanical truth.

A summary is not source canon and not state mutation.

Rev0.1 summary types:

```text
recent_event_summary
scene_state_summary
actor_state_summary
objective_summary
relationship_counter_summary
internal_state_summary
resolved_facts_summary
session_recap_summary
```

Summary visibility rule:

```text
Every summary needs a visibility target.
Do not reuse an internal summary as player-facing narration.
```

Facts that summaries must preserve exactly when relevant:

- actor HP/SI/AP/MP/resources;
- positions and map truth;
- active statuses;
- active objectives;
- committed counters/clocks;
- revealed facts;
- permitted internal facts;
- unresolved obligations or promises;
- temporary rulings and review flags.

Summary refresh triggers:

- scene changes;
- encounter starts or ends;
- actor state changes significantly;
- objective state changes;
- internal state changes that affect future narration or choices;
- temporary ruling is made;
- contradiction or review flag occurs;
- summary age or token budget makes it stale.

## 41.14 Visibility and never-send handling

The Context Broker must define default never-send categories and narrow exceptions.

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

Concealed state may be sent only when:

1. API DM needs it to avoid contradiction.
2. API DM is allowed to foreshadow a visible symptom.
3. API DM is writing an internal-only summary with matching visibility.
4. API DM needs it to phrase a non-revealing response safely.
5. The player has earned a reveal and the packet includes reveal permission.

Even then, the packet must say what may be narrated and what must remain concealed.

Rev0.1 visibility levels:

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

Concealed-state packet modes:

```text
withhold
send_no_narrate
send_symptom_only
send_partial_reveal
send_full_reveal
internal_summary_only
```

Memory boundary:

```text
API DM memory is not a concealed-state lane.
If something must matter later, commit it as state, log, summary, scheduled effect, counter, clock, or review flag.
```

## 41.15 Intent prompt versus narration prompt

Intent prompts and narration prompts need different context packets.

Intent interpretation packet should include:

- raw player input;
- active actor/speaker;
- current visible scene/options;
- possible relevant ActionSurface and MapOption refs;
- action/surface category hints if known;
- relevant rules snippets for classification;
- ambiguity rules;
- output contract for proposal, clarification, or narration-only classification.

Intent interpretation packet should not include:

- final resolved facts;
- result-band tables unless classification requires them;
- concealed outcomes;
- broad lore unrelated to interpreting the action.

Narration packet should include:

- resolved-facts packet;
- committed or commit-ready visible state summary;
- actor/target/location;
- effect and delta summary;
- visibility rules;
- tone/length constraints;
- contradiction rules;
- required omissions.

Narration packet should not include:

- alternate legal interpretations;
- unresolved proposals;
- concealed state not allowed for narration;
- broad rules snippets not needed for prose.

## 41.16 ResolvedFactsPacket

`ResolvedFactsPacket` is the key post-resolution DM packet.

It tells API DM what is fixed and what may be narrated.

Suggested fields:

```text
ResolvedFactsPacket
- transactionRef
- callType: resolved_outcome_narration
- actorRef
- targetRef, if any
- sceneRef or encounterRef
- validatedActionSummary
- paidCostSummary, if any
- checkResultSummary, if any
- checkFamily, if any
- resultBand, if any
- effectSummary
- stateDeltaSummary
- visibleConsequenceSummary
- concealedConsequenceInstructions, if any
- committedStateSummary or commitReadyStateSummary
- requiredNarrationFacts
- requiredOmissions
- contradictionRules
- toneLengthConstraints
- reviewFlag, if any
```

Fixed facts may not be changed by narration:

- actor;
- target;
- action;
- paid cost;
- roll or deterministic result;
- result band;
- damage/healing/resource amount;
- status applied or removed;
- movement or position;
- objective progress;
- counter or clock shift;
- reveal/conceal result;
- state delta target/path/operation;
- visibility instructions.

Contradiction handling:

```text
If API DM narration contradicts resolved facts, the app should reject narration, retry with stricter context if useful, fallback to mechanical text, flag the contradiction for review, and continue from committed mechanical truth.
Never change state to match narration.
```

## 41.17 NarrationBoundary

`NarrationBoundary` defines what the API DM may and may not do with a packet.

Suggested fields:

```text
NarrationBoundary
- allowedTone
- allowedLength
- allowedPerspective
- allowedMechanicalMentions
- requiredFacts
- requiredOmissions
- concealedFactsPolicy
- playerVisibleRevealPolicy
- contradictionRules
- fallbackIfInvalid
```

Narration boundary examples:

```text
May describe hatch opening.
May not reveal trace +1.
May mention slight delay if compatible with resolved facts.
May not imply the trace was avoided.
May not add new guards, alarms, damage, or future consequences.
```

## 41.18 Token budget and compression

Every Context Broker request should carry or infer a token-budget tier.

Rev0.1 budget tiers:

```text
tiny
small
medium
large
debug_override
```

Meanings:

- `tiny` — clarification, simple option phrasing, small narration.
- `small` — ordinary intent interpretation or routine outcome narration.
- `medium` — important scene beat, social response, meaningful encounter result.
- `large` — scene opening, major reveal, complicated recap, important NPC/faction moment.
- `debug_override` — temporary developer/debug use only.

Compression priority under budget pressure:

1. authority/output contract;
2. current player input or resolved facts;
3. required visibility rules;
4. current scene/actor/target slice;
5. relevant rules snippet;
6. recent consequence summary;
7. relevant lore snippet;
8. style/tone refinements;
9. older history.

Prompt-bloat review flags should trigger when:

- packet exceeds budget;
- needed rules/lore cannot be selected narrowly;
- visibility filtering is uncertain;
- summary is stale;
- DM output drifts due to missing context;
- repeated retries are needed;
- call type is too broad.

## 41.19 Stable system prompt versus dynamic packet

The stable API DM system prompt should stay compact.

It should hold:

- core DM behavior;
- authority boundaries;
- output discipline;
- contradiction discipline;
- reminder that mechanics come from Rules Core;
- reminder that hidden information may not be revealed unless packet allows it.

It should not hold:

- full source docs;
- full state dumps;
- current scene details;
- current concealed state;
- long rulebooks;
- implementation-only debug details;
- per-turn history.

Dynamic state, rules, lore, summaries, resolved facts, and visibility rules belong in `DMContextPacket`.

## 41.20 Examples

### Intent interpretation example

Player input:

```text
I try to talk the checkpoint operator into letting us through before the patrol loops back.
```

Useful packet:

- call type;
- active speaker;
- checkpoint scene;
- visible operator;
- sealed hatch;
- visible social/route surfaces;
- relevant social/check-family classification rules;
- visible patrol-timing concern if established;
- visibility rule not to reveal exact concealed patrol clock.

Expected API DM output:

```text
Proposed persuade / gate-route interpretation, or clarification if approach or target is ambiguous.
```

### Resolved narration example

Resolved facts:

```text
Spoof credential reader.
Result: dirty success.
Hatch opens.
Trace +1 concealed.
```

Useful packet:

- resolved facts fixed;
- allowed narration that hatch cycles open after slight delay;
- forbidden narration of trace value;
- forbidden conversion of dirty success into clean success;
- forbidden invention of future alarm response unless already committed or allowed as symptom.

Expected API DM output:

```text
Narrate the hatch opening without revealing the concealed trace.
```

### Clarification example

Player input:

```text
I target the nearest console.
```

Ambiguity:

```text
Two visible consoles are in reach.
```

Expected output:

```text
Ask one short question identifying the visible console choices without mentioning unrevealed systems.
```

### Narration-only example

Player input:

```text
What does the corridor look like?
```

Useful packet:

- visible corridor description;
- lighting;
- hatch;
- terminal;
- already visible hazards/options;
- boundary not to create new action surfaces unless clearly marked as flavor.

Expected output:

```text
Describe visible fiction only.
```

## 41.21 Stable enough for scaffold notes

Stable enough for rev0.1 scaffold planning:

```text
ContextBrokerRequest
DMContextPacket
ResolvedFactsPacket
NarrationBoundary
TokenBudgetReport
ContextSelectionTrace
ContextCallType
TokenBudgetTier
ConcealedStatePacketMode
SourceSliceRef
SourceSliceMetadata
```

Scaffold guardrails:

- Do not implement TypeScript in this draft.
- Do not encode final source-canon packet names.
- Do not make Context Broker a mechanical authority.
- Do not let API DM packets mutate state.
- Do not store hidden consequences only in API DM memory.
- Do not send broad full-state/full-source context by default.
- Keep summaries visibility-scoped.
- Keep resolved facts fixed after Rules Core resolution.
- Keep contradiction fallback tied to committed mechanical truth.
- Treat source slices as retrievable context units, not as new source authority.
- Let Codex/local verify actual repo implementation paths before writing code.

## 41.22 Deferred work

Deferred to later implementation:

- exact TypeScript interface names;
- exact file paths such as `contextSelector.ts` or `dmSystemPrompt.ts`;
- exact prompt builder architecture;
- exact retrieval/index integration;
- exact token counting;
- exact summary cache structure;
- exact debug panel display;
- validation tests.

Deferred to later source architecture:

- source document sectioning into stable coded slices;
- slice metadata convention;
- source slice IDs;
- source slice visibility defaults;
- rules/lore/context broker retrieval index integration;
- chunk-size and summary policy;
- source-slice validation against live `00 Source`.

Deferred to later source/rules prose:

- player-facing explanation of API DM limits;
- final game-manual language;
- final examples in source voice;
- final treatment of hidden information in play-facing docs.

Deferred to later app workflow:

- local verification of current implementation paths;
- issue-linked implementation task;
- validation scripts;
- contradiction test fixtures;
- prompt budget telemetry;
- UI/debug affordances.

## 41.23 Acceptance coverage for #41

This section covers:

- compact Context Broker authority boundary;
- DM call types;
- packet taxonomy;
- source document slicing requirement;
- `ContextBrokerRequest` scaffold;
- `DMContextPacket` scaffold;
- `ResolvedFactsPacket` scaffold;
- always-included context;
- dynamic context selection rules;
- summary behavior;
- visibility and never-send handling;
- concealed-state packet modes;
- intent prompt versus narration prompt distinction;
- narration boundaries;
- contradiction fallback behavior;
- prompt-bloat and token-budget strategy;
- stable system prompt versus dynamic packet split;
- examples;
- scaffold implications without implementing TypeScript.

This remains running-draft content, not source canon or implementation code.
