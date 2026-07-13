# Campaign Director Harness AI Contract rev0.1

- Status: locally complete and independently reviewed; awaiting publication and issue-closeout authorization
- Date: 2026-07-12
- Controlling ticket: [Define Game Truth, Director, and Context Broker contracts for the slice #4](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/4)
- Decision record: `CAMPAIGN_DIRECTOR_HARNESS_CONTRACT_WORKING_DRAFT.md`
- Scope handoff: `CAMPAIGN_DIRECTOR_HARNESS_SCOPE_FREEZE_HANDOFF.md`

## 1. Purpose and scope

This contract defines the provider-neutral AI boundary for the Nexus vertical slice: task routing, request assembly, context visibility, normalized responses, structured proposals, validation, atomic commit, recovery, cost admission, traces, replay, and fixture evaluation.

It does not define campaign mechanics, progression economy, Crew Archive pools, former-Player-Character conversion mechanics, authored tactical catalogs, or production implementation. Those systems expose versioned facts, catalogs, commands, and validators that this contract references without redesigning them.

## 2. Non-negotiable invariants

1. Nexus owns Game Truth, Director State, character knowledge, dialogue history, request authority, validation, transactions, and traces.
2. A model call is logically stateless. Provider conversation state, stored prompts, and model memory are optional transport optimizations and never authority.
3. Model output is either Generated Performance or a typed Structured Proposal. It never supplies arbitrary state-path patches.
4. Generated Performance cannot establish Game Truth. Any continuity-bearing claim is released only with the committed record that authorizes it.
5. A changed global Game Truth revision causes relevant-dependency revalidation, not automatic rejection. A changed required dependency rejects the proposal.
6. Late, duplicated, cancelled, superseded, wrong-owner, and wrong-target completions cannot commit or display.
7. One accepted result commits all linked effects and its releasable performance record atomically and idempotently, or commits nothing.
8. Automatic recovery permits at most one additional provider-accepted dispatch. It never loops and never exceeds the applicable spend lane.
9. Mandatory context is never silently removed. The harness selects a compatible larger profile or fails safely.
10. Provider-specific features may improve an adapter but cannot be required by the core contract.

### Relationship to existing contracts

- `DM_Authority_Split_Contract_rev0.1.md` remains the authority baseline. Its historical `API DM` term now maps to the task-routed Model Runtime, and its `DMContextPacket` maps to the task-specific Context Packet defined here.
- `Turn_Transaction_Contract_rev0.1.md` continues to own deterministic action resolution. A Player Intent proposal enters that transaction; once mechanics commit, optional resolved-outcome narration uses a separate zero-effect Proposal Transaction and cannot roll mechanics back.
- A Dialogue Outcome differs because its performance may itself assert the proposed promise, permission, reveal, or relationship change. That performance and those effects therefore commit in one Proposal Transaction before release.
- `Effect_StateDelta_Grammar_Contract_rev0.1.md` owns executable state deltas. Models produce named effect intents; deterministic validators and transaction services alone translate accepted intents into authorized commands and deltas.
- `Rules_Object_Model_rev0.1.md` owns action, check, effect, and rules-object definitions. This contract references their stable IDs and versions without allowing model-authored replacements.
- If an older draft permits model-authored `nexus-state` patches, provider-owned chat state, or narration as mechanical truth, this contract rejects that behavior for AI Contracts #4.

## 3. Initial task inventory

`taskKind` is stable contract vocabulary. A configured Model Task Profile supplies the provider, model, budget, and policy for one or more task kinds.

| Task kind | Required result | Normal significance |
|---|---|---|
| `intent.interpret` | `PlayerIntentProposal` or bounded clarification | routine |
| `dialogue.routine_turn` | `DialogueTurnResult` | routine |
| `dialogue.important_turn` | `DialogueTurnResult` | important |
| `narration.area_introduction` | `PerformanceOnlyResult` | routine |
| `narration.resolved_outcome` | `PerformanceOnlyResult` constrained by resolved facts | important when configured |
| `summary.dialogue` | `SummaryResult` | utility |
| `summary.history` | `SummaryResult` | utility |
| `director.campaign_opening` | `DirectorPlanProposal(campaign_opening)` | critical planning |
| `director.node_zero_plan` | `DirectorPlanProposal(node_brief)` | critical planning |
| `director.campaign_update` | `DirectorPlanProposal(campaign_update)` | planning |
| `director.route_prospects` | `RouteProspectSetProposal` | critical planning |
| `director.selected_node_plan` | `DirectorPlanProposal(node_brief)` | critical planning |
| `director.deployment_adaptation` | `DirectorPlanProposal(node_brief_adaptation)` | planning |
| `director.climax_update` | `DirectorPlanProposal(climax_plan)` | critical planning |
| `director.resolution_brief` | `DirectorPlanProposal(resolution_brief)` | critical planning |
| `narration.epilogue` | `PerformanceOnlyResult` constrained by a committed Resolution Brief | important |
| `tactical.directive` | `TacticalDirectiveProposal` | tactical planning |

Live Illustration generation is not defined by rev0.1. It may reuse cost-admission and trace concepts later, but requires a separately scoped media adapter contract.

Initial profile-class mapping:

| Profile class | Task kinds | Baseline lane-selection policy |
|---|---|---|
| `intent.utility@1` | `intent.interpret` | `normal_then_active_scene_reserve` |
| `dialogue.routine@1` | `dialogue.routine_turn` | `normal_then_active_scene_reserve` |
| `dialogue.important@1` | `dialogue.important_turn` | `normal_then_active_scene_reserve` |
| `narration.routine@1` | `narration.area_introduction` | `normal_only` |
| `narration.important@1` | `narration.resolved_outcome`, `narration.epilogue` | `normal_then_active_scene_reserve` |
| `summary.utility@1` | `summary.dialogue`, `summary.history` | `normal_then_active_scene_reserve` |
| `director.quality@1` | all `director.*` task kinds | `normal_then_active_scene_reserve` |
| `tactical.intent@1` | `tactical.directive` | `normal_then_active_scene_reserve` |
| `repair.compatible@1` | recovery-only; selected route must support the original task kind and result schema | inherits original request eligibility |

These are routing classes, not promises that each class uses a different model. Several classes may resolve to the same configured model, while any one class may later route to another compatible provider without changing task contracts.

## 4. Model Task Profile

```text
ModelTaskProfile
- profileId
- profileVersion
- purpose: primary | recovery | both
- allowedTaskKinds[]
- significance: utility | routine | important | critical
- routeCandidates[]
  - providerAdapterId
  - modelIdOrAlias
  - modelSnapshot, optional
  - requiredCapabilities[]
  - priority
- promptTemplateRef
- outputSchemaRef
- generationSettings
- contextBudget
  - inputTargetTokens
  - inputHardMaximumTokens
  - reservedOutputTokens
  - maximumOutputTokens
  - adapterSafetyMarginTokens
- contextPolicyRef
- visibilityPolicyRef
- timeoutPolicy
  - firstByteMaximumMs, optional
  - completionMaximumMs
- recoveryPolicy
  - allowedFailureCategories[]
  - fallbackProfileRef, optional
  - maximumAdditionalDispatches: 1
- costPolicy
  - allowedBudgetLanes[]: normal | scene_completion_reserve
  - laneSelectionPolicy: normal_only | normal_then_active_scene_reserve | active_scene_reserve_only
  - warningBehavior
  - estimatePolicyRef
- traceLevel: minimal | diagnostic
- streamingPolicy: disabled | buffered | provisional_text
- enabled
```

Rules:

- Configuration changes do not require code changes, but profile versions are immutable once referenced by a trace.
- Route selection uses the first enabled compatible candidate whose conservative cost fits the active budget lane.
- `GenerationSettings.reasoningPreset` is an adapter hint. An adapter may ignore an unsupported preset but must record that omission.
- `provisional_text` streaming may improve perceived latency, but streamed text is never committed or player-visible as factual performance until the full result validates. Dialogue with possible continuity effects defaults to buffered release.
- A fallback profile must accept the same input artifact and return the same normalized result schema.

## 5. Provider adapter contract

Every adapter implements these logical operations:

```text
capabilities() -> ProviderCapabilities
estimate(request, profile) -> ConservativeUsageEstimate
countOrEstimateTokens(content) -> TokenEstimate
dispatch(ProviderRequest, cancellationSignal) -> ProviderCompletion
normalizeUsage(ProviderCompletion, estimate) -> NormalizedUsage
normalizeFailure(error) -> ProviderFailure
```

```text
ProviderCapabilities
- providerAdapterId
- capabilityVersion
- models[]
  - modelIdOrAlias
  - modelSnapshot, optional
  - contextWindowTokens
  - maximumOutputTokens, optional
  - modalities[]
  - structuredOutput: none | json_requested | json_schema
  - streaming: unsupported | supported
  - reasoningControl: unsupported | preset | effort
  - promptCaching: unsupported | opaque | reported
  - usageReporting: none | tokens | tokens_and_cost
  - cancellation: unsupported | best_effort
  - tokenCounting: exact | adapter_estimate
```

```text
TokenEstimate
- tokens
- basis: exact | adapter_estimate | conservative_fallback
- tokenizerRef, optional
- safetyMarginTokens
- contentDigest
```

```text
GenerationSettings
- responseMode: schema_constrained | json_requested | text
- samplingPreset: stable | balanced | varied | provider_default
- reasoningPreset: off | low | medium | high | provider_default
- seed, optional
- stopSequences[], optional
```

```text
ProviderRequest
- requestId
- providerAdapterId
- modelIdOrAlias
- modelSnapshot, optional
- contextPacket
- outputSchema
- maximumOutputTokens
- generationSettings: GenerationSettings
- providerOptimizationHints, optional
```

```text
ProviderFailure
- category: transport | timeout | provider_rejected | content_blocked | malformed | internal
- retryDisposition: same_route | fallback_route | do_not_retry
- providerCode, optional
- safeMessage
- privateDiagnosticRef, optional
```

Unsupported optional capabilities must degrade through the adapter rather than change core semantics. An adapter translates shared sampling and reasoning presets as closely as it can and records any ignored or approximated setting. Provider-specific payloads remain inside `providerOptimizationHints` and adapter traces; they do not add shared authority or required semantics.

The adapter may use provider-native schemas, prompt caching, persisted reasoning, or response identifiers. The normalized completion must remain reproducible from the Nexus-owned request, Context Packet, profile version, and trace; no later call may require provider-held state.

## 6. Request ownership and lifecycle

```text
GenerationOperation
- operationId
- owner
- requestSequence
- initialTaskKind
- activeRequestId
- maximumProviderDispatches: 2
- providerDispatchCount
- state: active | cancelled | superseded | consumed | closed | failed_safe
```

```text
ModelRequest
- requestId
- operationId
- attemptIndex: 0 | 1
- attemptKind: primary | structural_repair | regeneration | fallback
- parentRequestId, required when attemptIndex is 1
- taskKind
- profileRef
- owner
  - saveId
  - campaignId, optional
  - sessionId, optional
  - checkpointId, optional
  - sceneId, optional
  - targetRefs[]
- requestSequence
- startingTruthRevision
- startingDirectorStateRevision, optional
- dependencySet
- inputArtifactRef
- contextBrokerRequest
- contextPacketRef, populated after assembly
- outputSchemaRef
- costAdmissionRef, populated before dispatch
- sceneCompletionRequirementRef, optional
- createdAt
- deadlineAt
```

The harness keeps an `ActiveRequestAuthority` locally:

```text
ActiveRequestAuthority
- ownerKey
- activeOperationId
- activeRequestId
- activeRequestSequence
- activeTargetRefs[]
- state: active | cancelled | superseded | consumed | closed
```

Lifecycle:

```text
assembled
-> admitted
-> dispatched
-> completed
-> normalized
-> validated
-> committed
-> released
-> closed

terminal alternatives:
cancelled | superseded | discarded | failed_safe
```

Rules:

- Every provider dispatch receives a unique `requestId`. The primary and its one permitted recovery share an `operationId` and owner `requestSequence`.
- Issuing a replacement user action supersedes the previous operation for the same owner key before dispatching the replacement.
- Starting a recovery attempt supersedes the primary request locally before dispatch. A late primary completion is therefore discarded even if it arrives before the recovery completes.
- Transport cancellation is best-effort. Local active-request authority decides whether a completion is consumable.
- A provider-accepted dispatch counts as an attempt even if its response times out or is malformed. Local failures before provider acceptance do not consume the single recovery dispatch.
- A completion is normalized only when its request is still active and its owner, sequence, and targets match. Otherwise it is recorded as discarded with no repair, commit, or display.

## 7. Context Broker request, packet, and manifest

```text
ContextBrokerRequest
- requestId
- taskKind
- profileRef
- owner
- startingTruthRevision
- dependencySet
- inputArtifactRef
- requiredSurfaces[]
- optionalSurfaces[]
- visibilityTarget
- contextPolicyRef
- visibilityPolicyRef
- outputSchemaRef
```

```text
ContextPacket
- packetId
- requestId
- taskKind
- profileRef
- authorityInstructions
- taskInstructions
- outputContract
- inputArtifact
- gameTruthSlice, optional
- approvedHistorySlice, optional
- directorStateSlice, optional
- characterKnowledgeSlices[]
- dialogueWindow, optional
- resolvedFacts, optional
- rulesSources[]
- loreSources[]
- campaignSources[]
- constraints[]
- packetDigest
```

```text
ContextManifest
- packetId
- sourceTruthRevision
- sourceDirectorStateRevision, optional
- includedItems[]
  - surfaceKind
  - sourceRef
  - sourceVersionOrRevision
  - visibilityScope
  - selectionReason
  - tokenEstimate
  - mandatory
- summaries[]
  - summaryRef
  - sourceRangeRefs[]
  - summaryVersion
  - factsPreservedRefs[]
- omissions[]
  - surfaceKind
  - sourceRefOrCategory
  - reason
- budgetReport
  - configuredInputTarget
  - configuredInputHardMaximum
  - effectiveInputCeiling
  - estimatedInputTokens
  - reservedOutputTokens
  - unusedHeadroom
- selectionTraceRef
```

Assembly priority is fixed:

1. authority instructions, task instructions, output schema, mandatory constraints, and prohibition rules;
2. current task artifact, owner, participants, targets, and commit dependencies;
3. permitted character knowledge, current visible scene, and directly relevant Game Truth;
4. active Dialogue Session and recent verbatim exchange when applicable;
5. relevant active campaign history, Director State, rules, and lore;
6. optional distant history and atmosphere.

If mandatory items exceed the effective input ceiling, the broker attempts a configured compatible larger profile. If none fits within model and cost limits, it returns `mandatory_context_overflow`; no model call is sent.

Summaries are derived context, not authority. Every summary points to its source range and preserved fact references. A summary may be regenerated or omitted without deleting its source truth.

AI-facing state slices are explicit:

```text
GameTruthSlice
- truthRevision
- factRefs[]
- entitySnapshots[]
  - entityRef
  - entityVersion
  - permittedFields
- visibleRelationshipRefs[]
- activeClockRefs[]
- activeThreadRefs[]
```

```text
ApprovedHistorySlice
- historyRevision
- entries[]
  - historyEntryRef
  - transactionRef
  - truthRevisionCommitted
  - occurredAt
  - summary
  - factRefs[]
```

```text
DirectorStateSlice
- directorStateRevision
- planItems[]
  - directorItemRef
  - itemVersion
  - itemKind
  - lifecycleState
  - boundedPayload
  - sourceRefs[]
  - expiryCheckpointRef, optional
```

```text
CharacterKnowledgeSlice
- characterRef
- knowledgeRevision
- entries[]
  - propositionRef
  - stance: knows | believes | suspects | false_belief
  - confidenceBand, optional non-mechanical
  - sourceRef
  - visibilityScope
  - entryVersion
```

`permittedFields` and `boundedPayload` are produced by task-specific serializers; they are not raw state objects. A character's belief may contradict Game Truth without changing it.

The manifest's local selection trace has this shape:

```text
ContextSelectionTrace
- traceRef
- contextPolicyRef
- candidates[]
  - sourceRefOrCategory
  - priority
  - estimatedTokens
  - disposition: included | summarized | omitted | prohibited
  - reason
- mandatoryTokenTotal
- optionalTokenTotal
- finalTokenEstimate
- overflowAction, optional
```

`prohibited` records only a safe category in ordinary traces. Hidden content itself appears only in an authorized diagnostic trace.

## 8. Dependency contract

```text
DependencySet
- commitDependencies[]
- contextReferences[]
```

```text
DependencyRef
- dependencyKind
- entityOrFactRef
- expectedVersionOrRevision
- expectedPredicateOrDigest, optional
- visibilityScope
- requiredFor: interpretation | performance | proposal | commit
```

`commitDependencies` contain only facts whose change can invalidate the proposal or its performance. `contextReferences` explain provenance but do not block commit merely because unrelated global state advanced.

Supported dependency kinds are stable categories, not arbitrary state paths: fact, entity, relationship, character knowledge, permission, Campaign Thread, Director State item, Route Choice, deployment, scene, Location, rule catalog, lore source, Campaign Clock, and budget state.

## 9. Normalized provider completion

```text
NormalizedModelCompletion
- requestId
- taskKind
- profileRef
- provider
  - adapterId
  - modelId
  - modelSnapshot, optional
  - providerResponseId, optional
- result
- rawOutputTraceRef, optional
- normalizedUsage
- timing
- finishReason
- adapterWarnings[]
```

```text
NormalizedUsage
- inputTokensActual, optional
- outputTokensActual, optional
- cachedInputTokensActual, optional
- reasoningTokensActual, optional
- inputTokensEstimated
- outputTokensEstimated
- costActual, optional
- costEstimatedConservative
- reportingAuthority: provider | adapter_estimate
```

When authoritative usage is unavailable, cap enforcement charges the conservative preflight estimate. Later usage reconciliation may improve reporting but never retroactively permits a dispatch that failed admission.

## 10. Result and proposal taxonomy

All results use this base:

```text
TaskResultBase
- schemaVersion
- requestId
- reliedUponFactRefs[]
- sourceRefs[]
- uncertainties[]
```

```text
PerformanceOnlyResult extends TaskResultBase
- performance
  - format
  - text
  - speakerRef, optional
  - presentationHints, optional non-authoritative
- proposedEffects: []
```

```text
DialogueTurnResult extends TaskResultBase
- performance
- dialogueOutcomeProposal, optional
```

```text
SummaryResult extends TaskResultBase
- summaryText
- preservedFactRefs[]
- unresolvedReferenceRefs[]
- coveredSourceRangeRefs[]
```

Every Structured Proposal uses:

```text
StructuredProposalBase
- proposalId
- proposalType
- schemaVersion
- requestId
- startingTruthRevision
- startingDirectorStateRevision, optional
- commitDependencies[]
- reliedUponFactRefs[]
- evidenceRefs[]
- expiresAtCheckpointRef, optional
```

Allowed proposal families:

```text
PlayerIntentProposal
- exactSpeech, optional
- intendedMessages[]
- proposedActions[]
  - actorRef
  - actionSurfaceRef
  - targetRefs[]
  - boundedParameters
  - ambiguityFlags[]
- targetRefs[]
- ambiguityFlags[]
- clarification, optional
```

```text
DialogueOutcomeProposal
- effectIntents[]
- knowledgeIntents[]
- continuityClaims[]
```

```text
DirectorPlanProposal
- artifactKind
- artifact
- directorStateOperations[]
```

`DirectorPlanProposal.artifactKind` is one of `campaign_opening`, `campaign_update`, `node_brief`, `node_brief_adaptation`, `climax_plan`, or `resolution_brief`. Each artifact is validated by its owning game-system contract. This AI contract controls provenance, authority, dependencies, and transaction behavior; it does not redefine the artifact's underlying campaign mechanics.

```text
DirectorStateOperation
- operation: create_candidate | activate | revise | mark_realized | invalidate | expire | compact_terminal
- directorItemRef
- expectedItemVersion, optional for creation
- itemKind
- boundedPayload, required for creation or revision
- sourceRefs[]
- reasonCode
- expiryCheckpointRef, optional
```

Lifecycle rules:

- creation enters `candidate`;
- `candidate` may become `active`, `invalidated`, or `expired`;
- `active` may become `realized`, `invalidated`, or `expired`;
- `revise` is permitted only for `candidate` or `active` items and increments the item version;
- terminal items cannot reactivate;
- `compact_terminal` removes terminal items from active context but preserves their audit/history refs;
- realizing a plan requires a committed outcome ref and never makes the plan itself the source of Game Truth.

```text
RouteProspectSetProposal
- prospects[]
  - prospectId
  - destinationRef
  - routeRef
  - playerFacingPremise
  - incentiveRefs[]
  - riskRefs[]
  - opportunityCostRef
  - campaignContributionClaims[]
  - pressureRefs[]
  - priorOfferRef, optional
  - returnCauseRef, optional
- setDependencies[]
- setDistinctnessClaims[]
```

`campaignContributionClaims` are hidden validator inputs, not player-facing story labels. A resurfaced prospect must provide `priorOfferRef`, `returnCauseRef`, and a validator-confirmed material reduction in benefit or increase in risk or cost.

Each prospect references the deterministic destination, route, opportunity-cost, pressure, and validation catalogs required by the accepted campaign contract. It does not supply direct state patches.

```text
TacticalDirectiveProposal
- controllerGroupRef
- tacticalSituationRef
- goalRef
- postureRef
- priorityRuleRefs[]
- restraintRuleRefs[]
- contingencies[]
  - triggerRef
  - replacementGoalRef, optional
  - postureRef, optional
  - priorityRuleRefs[]
- rationale, optional non-authoritative
- tacticalCatalogVersion
```

All executable Tactical Directive values are references into authored, versioned catalogs. Deterministic enemy control selects legal movement, targets, actions, reactions, and contingency transitions. The rationale is diagnostic prose only.

`effectIntents`, `knowledgeIntents`, and Director State operations use named commands accepted by their owning validators. They may name subjects, objects, catalog operations, evidence, and bounded parameters; they may not contain JSON Pointer, object paths, executable code, or replacement state blobs.

```text
EffectIntent
- commandKind
- subjectRef
- objectRef, optional
- catalogOperationRef
- boundedParameters
- evidenceRefs[]
```

```text
CharacterKnowledgeIntent
- commandKind: learn_fact | add_belief | add_suspicion | correct_belief | reveal_to_scope
- characterRefs[]
- propositionRef
- expectedKnowledgeVersions[]
- revealSourceRef
- targetVisibilityScope
```

A canon-visibility transition uses a named effect command and must cite the prior canon entry, committed reveal source, prior visibility, and proposed visibility. A planning proposal cannot reveal canon merely by mentioning it.

## 11. AI-facing planning artifacts

The following artifact envelopes define what each Director call may see and propose. Fields ending in `Ref` point to validated objects owned by their game-system contracts.

```text
CampaignOpeningInput
- selectedPlayerCharacterRef
- selectedStartingCrewRefs[]
- startingDeploymentRef
- selectedLegacyWorldRef, optional
- worldSnapshotRef
- chronologyConstraintRef, optional
- settingSourceRefs[]
- eligibleOpeningLocationRefs[]
```

`campaign_opening` output contains a proposed Main Campaign Thread ref or definition, Node 0 selection ref, bounded initial Director State operations, and—only for a Legacy World—a proposed start date plus bounded Interval Development proposals. The whole opening proposal validates atomically against a candidate world snapshot.

```text
NodePlanInput
- selectedLocationRef
- committedRouteChoiceRef, optional for Node 0
- campaignOpeningRef, required for Node 0
- activeThreadRefs[]
- relevantDirectorItemRefs[]
- currentCampaignStateRef
- startingDeploymentRef, required only for Node 0
- planningConstraintRefs[]
```

`node_brief` output proposes one bounded Node Brief. The ordinary selected-node planning call runs after Route Choice confirmation but before the player finalizes Deployment Preparation, so it does not require a finalized deployment.

```text
NodeBriefAdaptationInput
- validatedNodeBriefRef
- committedRouteChoiceRef
- selectedLocationRef
- finalizedDeploymentRef
- currentCampaignStateRef
- deploymentSensitiveConstraintRefs[]
```

`node_brief_adaptation` may revise deployment-sensitive guidance but cannot replace the destination, rewrite committed travel consequences, or establish future events as truth.

```text
CampaignUpdateInput
- checkpointRef
- committedOutcomeRefs[]
- activeThreadRefs[]
- currentDirectorStateRef
- currentNodeBriefRef, optional
- pressureAndClockRefs[]
```

`campaign_update` output proposes bounded Director State lifecycle operations, thread-development commands permitted by the owning validator, and planning-priority updates. It cannot advance a clock or apply pressure by model fiat.

```text
RouteProspectInput
- currentDowntimeRef
- currentCampaignStateRef
- activeThreadRefs[]
- pressureAndClockRefs[]
- candidateDestinationRefs[]
- routeRuleCatalogRef
- travelConsequenceCatalogRef
- currentDirectorStateRef
```

The output is one `RouteProspectSetProposal`; deterministic systems derive authoritative Travel Consequences and enforce distinctness, incentives, costs, and permitted campaign contribution.

```text
ClimaxPlanInput
- nodeEightCheckpointRef
- priorPlayerObservableSeedRefs[]
- activeThreadRefs[]
- committedCampaignOutcomeRefs[]
- currentDirectorStateRef
```

`climax_plan` output proposes the three-member order-sensitive plan and its bounded Director State items. Later `director.climax_update` calls may revise unresolved order effects from committed outcomes but cannot replace completed members or hide the required prior observable seeds.

```text
ResolutionInput
- terminalOutcomeRef
- campaignHistorySliceRef
- materialThreadRefs[]
- climaxPlanRef, optional
- crewStateRefs[]
- factionStateRefs[]
- shipStateRef
- legacyRuleRefs[]
- conversionContractRef, optional
```

`resolution_brief` output classifies every material thread, supplies compact ending-status proposals, identifies subjects for epilogue coverage, and proposes only bounded legacy effects accepted by the owning validator. When applicable it may include conversion evidence and a default converted-package proposal ref governed by Crew Archive and Conversion Design #68; it does not define that package's mechanics.

## 12. Dialogue and performance release

```text
DialogueSession
- sessionId
- sessionVersion
- state: open | closing | closed
- sceneRef
- mode
- participantRefs[]
- primaryTargetRef
- turnSequence
- transcriptTurns[]
  - turnId
  - sequence
  - speakerRef
  - text
  - committedPerformanceRef, optional
  - transactionRef, optional
  - truthRevisionAfterTurn
- olderTurnSummaryRef, optional
- relevantCommittedOutcomeRefs[]
- activeRequestId, optional
- openedAt
- closedAt, optional
```

```text
GeneratedPerformanceRecord
- performanceId
- requestId
- taskKind
- format: dialogue | narration | area_introduction | epilogue | clarification
- speakerRef, optional
- text
- presentationHints, optional non-authoritative
- reliedUponFactRefs[]
- transactionId
- committedTruthRevision
- releaseState: buffered | released
```

- Each dialogue turn is a new request using the active Dialogue Session.
- Free Movement dialogue places consequential simulation in a soft pause while a turn is pending; Turn-Based Mode dialogue remains governed by normal turn and action timing.
- Closing the session, changing its primary target, or advancing its session version supersedes any active turn request immediately.
- Normal sessions retain the full verbatim exchange. When a configured threshold is exceeded, older turns may be replaced in the packet by a source-referenced summary while the recent exchange remains verbatim.
- The speaker receives only permitted knowledge, beliefs, visible facts, recent dialogue, and the performance brief. Full Director State and unrelated secrets are prohibited.
- A valid bland response is releasable in normal play. Prose-quality grading and alternate generations are user-triggered Developer Mode actions.
- Any performance that states or implies a continuity-bearing effect is linked to the corresponding proposal and remains buffered until atomic commit.
- A performance with no effects still creates a zero-effect Proposal Transaction so the validated performance record is durable and idempotently releasable.

## 13. Validation pipeline

Validation runs in this order:

1. active request, owner, sequence, and target check;
2. normalized result and task-specific schema check;
3. reference existence and catalog-version check;
4. visibility, secret, and character-knowledge check;
5. task authority and allowed-command check;
6. deterministic rule and artifact validator;
7. relevant dependency revalidation against current state;
8. transaction construction and final in-transaction dependency check.

```text
ValidationResult
- status: accepted | repairable | rejected_stale | rejected_unsafe | rejected_final
- errors[]
  - category
  - code
  - fieldPath, optional
  - safeMessage
  - privateDiagnosticRef, optional
- validatedProposalRef, optional
- transactionDraftRef, optional
```

Stable failure categories are `transport`, `timeout`, `malformed`, `schema`, `reference`, `authority`, `visibility`, `knowledge`, `rule`, `dependency`, `cost`, and `internal`.

Repair context includes only the original permitted packet, the required schema, categorical errors, safe messages, and invalid field paths. Private diagnostics and hidden expected values are never sent to the model.

## 14. Proposal Transaction

```text
ProposalTransaction
- transactionId
- requestId
- proposalRefs[]
- startingTruthRevision
- commitDependencies[]
- authorizedCommands[]
- characterKnowledgeCommands[]
- directorStateCommands[]
- approvedHistoryEntries[]
- performanceRecord, optional
- status: prepared | committed | released | aborted
- committedTruthRevision, optional
- committedDirectorStateRevision, optional
```

Rules:

- `transactionId` is the idempotency key.
- The transaction layer rechecks commit dependencies while holding the applicable local commit boundary.
- Commands, character-knowledge changes, Director State changes, approved history, and performance record commit together or not at all.
- A crash after commit but before display is recovered by releasing the committed performance record. Reprocessing cannot apply commands or release performance twice.
- Pure Director planning may commit only Director State and its audit record. It cannot mutate Game Truth through that lane.
- A proposal rejected before commit leaves no performance record, partial state, or implicit model memory.

## 15. Recovery and safe failure

The harness selects at most one recovery action:

| Failure | Recovery action |
|---|---|
| malformed or schema-invalid | one structural repair using safe validation feedback |
| reference, authority, visibility, or knowledge violation | one regeneration from current permitted context; use fallback profile when configured |
| changed commit dependency while request remains relevant | rebuild packet from current truth and regenerate once |
| timeout or transport failure after provider acceptance | retry or fallback once according to profile |
| cost rejection, mandatory-context overflow, cancelled/superseded result | no automatic provider dispatch |
| valid but bland performance | no automatic recovery |

The primary dispatch plus recovery dispatch is the absolute ceiling for one Generation Operation. Recovery uses a new request ID, attempt index 1, and the original task's result schema. A user-requested retry creates a new operation and request sequence and receives a new cost-admission decision.

On final failure, Nexus commits nothing unsafe, restores a stable deterministic interaction state, and exposes a nontechnical player retry or management choice. When mechanics already committed before an optional narration request, deterministic logs or authored fallback text present the committed result; narration failure cannot roll it back.

## 16. Call sequences

### Campaign opening

```text
validated Player Character + Starting Crew + complete starting deployment
-> director.campaign_opening
-> validate opening proposal and candidate Legacy World snapshot
-> atomically commit permitted opening truth and Director State
-> director.node_zero_plan using the committed opening artifact
-> validate and commit Node Brief
-> begin Node 0
```

No Route Prospect or deployment-adaptation call occurs before Node 0.

### Ordinary Route Node transition

```text
Route Node Resolution
-> director.campaign_update
-> validate/commit bounded campaign and Director State update
-> director.route_prospects at Downtime start
-> validate/commit prospect set for presentation
-> player confirms one Route Prospect
-> deterministic destination commit and advancement
-> director.selected_node_plan
-> validate Node Brief proposal
-> player finalizes Deployment Preparation: Field Team, loadouts, and Ship Assignments
-> director.deployment_adaptation
-> validate/commit adapted Node Brief
-> run during Transit when practical
-> begin selected node
```

Each arrowed model task is independently admitted, traced, validated, and recoverable. Later tasks consume validated artifacts, never provider chat history.

### Material scene checkpoint

A deterministic checkpoint classifier may dispatch `director.campaign_update` only when the committed scene outcome materially changes a Campaign Thread, promise, pressure, knowledge boundary, faction state, planned payoff, or Node Brief assumption. Ordinary movement and dialogue do not poll the Director.

### Climax planning

After Node 7 Resolution, `director.climax_update` replaces the ordinary campaign-update stage and proposes the initial three-member Climax Plan from prior player-observable seeds. After each of the first two Climax Set members resolves, the same task replaces that transition's ordinary update stage and may revise only the unresolved order effects against committed outcomes. The following Route Prospect call presents the remaining choices diegetically. This specialization does not add a fifth baseline transition call, replace locked member identities, or run after the last member becomes the Finale Node.

### Dialogue turn

```text
player input + active Dialogue Session
-> optional intent.interpret
-> dialogue task selected by importance
-> validate performance and any Dialogue Outcome proposal
-> zero-effect or effect-bearing Proposal Transaction
-> commit
-> release performance
```

The intent call is omitted when the player's exact speech or already-structured selection is unambiguous.

### Tactical Pressure

```text
validated tactical situation begins
-> tactical.directive once
-> validate catalog refs and constraints
-> commit directive
-> deterministic enemy controller executes until Tactical Pressure ends
```

No per-turn model call and no baseline phase-change replanning are permitted.

### Campaign Resolution

```text
committed Playable Finale or terminal early ending
-> director.resolution_brief
-> validate and atomically commit Resolution Brief and permitted legacy outputs
-> narration.epilogue constrained only by committed Resolution Brief
-> validate and release epilogue performance or deterministic fallback
```

The Resolution Brief may carry conversion evidence and a default-package reference required by Crew Archive and Conversion Design #68. This contract does not define or validate conversion mechanics.

## 17. Cost admission and Scene Completion Reserve

```text
ConservativeUsageEstimate
- estimatedInputTokens
- maximumOutputTokens
- estimatedCachedTokens, optional and never assumed for safety
- priceSnapshotRef
- upperBoundCost
- confidence: exact | conservative
```

```text
CostAdmission
- admissionId
- operationId
- requestId
- attemptIndex
- profileRef
- providerRouteCandidate
- priceSnapshotRef
- conservativeUsageEstimate
- requestedBudgetLane: normal | scene_completion_reserve
- activeSceneAdmissionRef, required for reserve use
- budgetSnapshot
  - playerHardCap
  - warningThreshold
  - chargedSpendBefore
  - normalLaneRemainingBefore
  - reserveRemainingBefore
  - activeSceneAdmissionRef, optional
- decision: admitted | rejected
- reasonCode
- maximumChargeAuthorized
- createdAt
```

```text
SceneAdmission
- sceneAdmissionId
- sceneClass
- sceneRef
- checkpointTargetRef
- reserveBundleRef
- requiredTaskKinds[]
- maximumProviderDispatchesByTask
- conservativeBundleCost
- playerHardCap
- chargedSpendBefore
- reserveAvailableBefore
- decision: admitted | rejected
- reasonCode
- createdAt
```

Before every dispatch, the runtime prices assembled input plus maximum output against the chosen route candidate and persists one `CostAdmission`. Dispatch occurs only when its upper bound fits the permitted lane. Each recovery request receives its own admission; the operation ceiling does not bypass cost admission.

Lane selection rules:

- `normal` is the default lane.
- Routine significance alone never qualifies a call for reserve use; only membership in the active Scene Admission's required task bundle does.
- `normal_only` profiles can never consume reserve.
- `normal_then_active_scene_reserve` profiles use normal budget while it is available and may use reserve only for a request carrying a valid `sceneCompletionRequirementRef`.
- `active_scene_reserve_only` is reserved for explicit closing tasks such as protected terminal-resolution work and still requires an active matching Scene Admission.
- Reserve admission requires the request owner and scene to match the active `SceneAdmission`, the task kind to appear in its required task bundle, the attempt to remain within that task's admitted dispatch count, and the call to be necessary to reach the admission's checkpoint target.
- Optional illustration, discretionary narration, background planning, quality comparison, and Developer Mode replay can never be marked scene-completion-required.
- Exhausting normal budget does not by itself grant reserve access. A request without valid scene admission fails cost admission even when its profile could otherwise use reserve.

Before starting a model-dependent scene, the harness persists one `SceneAdmission` against a calibrated reserve bundle for that scene class. A reserve bundle lists the required task kinds, maximum dispatch counts including allowed recovery, route candidates, and conservative cost. Warning-threshold degradation disables optional generation first and may select fixture-approved cheaper profiles.

Before the Playable Finale begins, its reserve bundle also covers `director.resolution_brief` and `narration.epilogue`, including their permitted recovery dispatches. A protected terminal-closure bundle likewise remains available for Early Campaign Resolution after Player Character Permanent Loss. Neither closing bundle can be consumed by optional finale, dialogue, illustration, or background-planning work.

Once reserve use begins, only calls required to finish the active scene and create a consequence-preserving checkpoint may draw from it. After that checkpoint, no new model-dependent scene or Route Node begins until budget availability changes. Deterministic play, save, review, export, and configuration remain available.

## 18. Trace, replay, and retention

```text
ModelTrace
- traceId
- operationId
- attemptIndex
- request
- profileSnapshot
- providerRouteChosen
- contextManifest
- contextPacketRef, when retained
- normalizedCompletion
- validationAttempts[]
- transactionRef, optional
- releaseRef, optional
- costAdmission
- reserveState
- recoveryDecision, optional
- finalStatus
```

Normal play stores minimal trace metadata required for usage, authority, recovery, and audit. Developer Mode diagnostic capture additionally stores the assembled Context Packet, raw provider output, normalized result, validation detail, omissions, and selection rationale in a capped local archive.

Raw diagnostic material is never uploaded as telemetry by this contract. It is exportable before pruning. Pruning raw prompts, outputs, or old dialogue transcripts cannot prune Game Truth, committed history, character knowledge, Director State, or other authoritative evidence.

Developer Mode replay creates a noncommitting request against a retained packet or a newly assembled packet from selected historical revisions. It may change model, profile, or permitted context. Replay results are visually marked, cannot mutate the active save, and report differences in context, model, output, validation, usage, latency, and estimated cost.

Retention duration and byte limits are configuration values established during calibration. A trace must report when exact replay is unavailable because raw diagnostic content or required historical revisions were pruned.

## 19. Campaign Fixtures and acceptance evidence

The initial fixture suite must cover:

1. long dialogue continuity with older-turn summarization and recent verbatim retention;
2. speaker knowledge limits, false beliefs, secret non-disclosure, and validated reveals;
3. stale global revision with unchanged dependencies, and changed required dependency rejection;
4. cancelled, superseded, duplicated, late, wrong-target, and crash-after-commit responses;
5. malformed output, unsafe repair feedback, one-recovery ceiling, and stable final failure;
6. mandatory-context overflow and compatible-profile escalation;
7. provider without native structured output, usage reporting, reasoning control, or prompt caching;
8. warning threshold, conservative cap admission, Scene Completion Reserve entry, and post-scene stop;
9. two-call Campaign Opening, including Legacy World date/development validation;
10. four-stage Route Node transition compared with merged and omitted variants;
11. Node 0 central-problem clarity without fabricated or premature hidden explanation;
12. Route Prospect distinctness, incentives, opportunity costs, pressure, and no obvious story label;
13. Climax Set traceability and player-comprehensible order stakes without internal terminology;
14. Tactical Directive catalog validity and deterministic execution without per-turn calls;
15. Resolution Brief authority, unresolved-thread preservation, epilogue failure, and early resolution;
16. Developer Mode replay comparing same model, alternate model, and modified context.

For each task profile and pipeline variant, capture schema-valid yield, authority violations, knowledge violations, stale rejection, recovery success, latency, input/output tokens, cached usage when reported, estimated and actual cost, and human ratings appropriate to the task. Human quality ratings inform model/profile selection but never become a normal-play automatic retry loop.

## 20. Calibration boundary

The following values are deliberately configurable and are not guessed in this contract:

- provider and exact model assignments;
- reasoning settings;
- temperature or equivalent sampling controls;
- input targets, hard maxima, output reservations, and output maxima;
- dialogue summary and targeted-recall thresholds;
- timeouts;
- trace archive age and byte caps;
- spend warnings, hard caps, and reserve bundle prices;
- fixture pass thresholds and profile promotion criteria.

Calibration may change those values without reopening this architecture. It may merge or remove a provisional pipeline stage only when fixture and playtest evidence shows that required continuity, authority, player information, and useful creative contribution remain intact.

## 21. Rev0.1 completion criteria

This contract is complete when:

- every initial task kind maps to a versioned profile class, with numeric profile instances supplied by calibrated configuration;
- every request carries owner, sequence, truth revision, dependencies, Context Packet, output schema, and cost admission;
- every provider dispatch has a unique request ID while primary and recovery attempts remain bounded by one Generation Operation;
- every provider response normalizes to the same completion and usage surfaces;
- every generated effect uses a typed proposal and owning deterministic validator;
- every effect-bearing or zero-effect performance is atomically and idempotently releasable;
- stale, duplicate, cancelled, unsafe, and over-budget results fail as specified;
- the two-call opening, provisional four-stage node transition, dialogue, tactical, and resolution sequences are fixture-testable;
- Developer Mode can diagnose context, model, validation, cost, and sampling causes without granting replay commit authority.
