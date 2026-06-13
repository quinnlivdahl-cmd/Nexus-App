# Character_and_Progression_Schema_Contract_rev0.1

Date: 2026-06-12  
Mode: Draft  
Related epic: #33 — Epic: Sequence Nexus app-facing game-rule/system design  
Sequence position: after #34, #35, #36, #38, #39, #40, and #41 scaffold work  
Status: draft contract scaffold / accepted by user for repo-side preservation  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

`docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md`

## Supplements

This file supplements:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01_ISSUE_41_SPIRITUAL_APPEND.md`
- `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`
- GitHub Issue #33

## Replaces

Nothing.

Do not delete, overwrite, archive, supersede, or replace prior draft files, source docs, legacy character/progression material, ability-tree material, or gameplay source based on this draft.

## Source/currentness status

This is a repo-side draft contract artifact. It is based on current bridge context, GitHub exact-path retrieval, prior committed game-system contract drafts, and user decisions captured in the 2026-06-12 Draft review. It has not been verified against live local `00 Source` and is not source canon.

---

# 0. Accepted review residue from 2026-06-12

The following user decisions are accepted into this scaffold:

1. `Origin` is scrapped as the term for biological body type in this contract.
2. A new term should define biological type of body. Provisional scaffold term: `Bioform`.
3. Current Bioform examples:
   - Plain Human DNA
   - Gene Edited
   - Gene Spliced
4. `Chassis` defines the level of cybernetic implantation.
5. Chassis tiers are already defined elsewhere and should be source-verified rather than reinvented here.
6. Level 0 is pre-node 0 character creation.
7. Each new route node starts with a level-up.
8. Some levels are milestone levels with extra bonuses beyond Ability Points and Skill Focus Points.
9. Exact milestone level details remain TBD.
10. Skill Focuses are ability tree lanes.
11. Skill Focus level adjusts modifiers based on roll level.
12. Exact focus-level modifier behavior remains TBD.
13. Ability/focus relationship is necessary enough to define hooks now, but final ability schema remains a later contract.

---

# 1. Purpose

This contract defines the rev0.1 app-facing object boundaries for Nexus character and progression data.

The purpose is not to write final player-facing rules prose. The purpose is to name the durable containers, refs, ownership boundaries, validation requirements, and source/context hooks needed before ability schema, A1 replacement docs, and thin rules-core scaffolding can proceed.

Core rule:

```text
Character data defines persistent build identity.
Actor data defines playable/in-scene mechanical presence.
Crew member data defines campaign/party continuity.
Bioform defines biological body type.
Chassis defines cybernetic implantation tier.
Progression data defines route-node level growth and unlock state.
Abilities read from these objects but should be defined in a later ability schema.
```

---

# 2. Contract boundaries

## 2.1 What this contract owns

This contract owns draft object boundaries for:

- `Character`
- `Actor`
- `CrewMember`
- `Bioform`
- `Chassis`
- `AttributeSet`
- `SkillSet`
- `SkillFocusSet`
- `TrainingGateSet`
- `ProgressionProfile`
- `LevelState`
- `RouteNodeLevelUpEvent`
- `MilestoneLevelState`
- `RankState`
- `TierState`
- `LoadoutHook`
- `EquipmentHook`
- `StatusResourceHook`
- `CharacterDisplayProfile`
- `CharacterValidationProfile`
- `CharacterSourceSliceProfile`

## 2.2 What this contract does not own

This contract does not own:

- final player-facing A1 prose;
- final ability list;
- final ability tree structure;
- final ability math;
- final source-canon Bioform prose;
- final Chassis tier definitions;
- final character sheet UI;
- final TypeScript implementation;
- final equipment registry;
- final status registry;
- exact milestone-level bonus schedule;
- exact Skill Focus modifier math;
- exact rules text for every attribute, skill, or focus;
- final campaign import/resume migration.

## 2.3 Relationship to ability schema

Ability schema should be split into a later contract.

This character/progression contract may define ability-facing hooks:

```text
AbilityRef
AbilitySlot
AbilityRankState
AbilityTierRequirement
AbilityPrerequisiteRef
AbilityUnlockRef
AbilitySourceSliceRef
SkillFocusAbilityLaneRef
```

But it should not define final ability trees, final ability effects, or final ability text.

---

# 3. Core object distinction

## 3.1 Character

A `Character` is the persistent build identity of a playable person, NPC, or important entity.

It answers:

- Who is this entity across campaign time?
- What Bioform and Chassis define their body/platform?
- What attributes, skills, focuses, training, and progression do they have?
- What ability unlock state do they carry?
- What loadout/equipment eligibility do they have?
- What source slices define or explain them?

A `Character` is not automatically the same as an active encounter actor.

## 3.2 Actor

An `Actor` is the current rules-facing participant in a scene, encounter, check, or transaction.

It answers:

- Who is acting now?
- What current HP/SI/AP/MP/resources matter now?
- What current position, status, shield, mitigation, or temporary state applies now?
- What action options can Rules Core validate now?
- What current actor slice should Context Broker expose to API DM?

An `Actor` may be backed by a `Character`, generated from an NPC template, or created as a temporary encounter participant.

## 3.3 CrewMember

A `CrewMember` is a campaign-continuity wrapper around a character who belongs to the player party, active crew, reserve crew, or campaign roster.

It answers:

- Is this character in the crew?
- Are they active, inactive, downed, away, unavailable, or reserve?
- What campaign-level obligations, relationships, injuries, logs, or progression history follow them?
- What state must persist between scenes and encounters?

A `CrewMember` may point to one `Character`, but should not duplicate all character data unless a snapshot is required for history/import.

## 3.4 Bioform

A `Bioform` is the biological body type / DNA-body package for a character.

Current examples:

```text
plain_human_dna
gene_edited
gene_spliced
```

Bioform is the replacement scaffold term for the discarded `Origin` slot in this contract.

Bioform answers:

- What biological body type is this?
- Is the body baseline human, edited, or spliced?
- What biological prerequisites, modifiers, constraints, or source slices apply?

Bioform is not final narrative background, social origin, culture, class, faction, or biography unless a later source review deliberately connects those concepts.

## 3.5 Chassis

A `Chassis` defines the level of cybernetic implantation.

Chassis answers:

- What cybernetic implantation tier applies?
- What cybernetic capacity, limits, prerequisites, or hooks are active?
- What character/build options are permitted or blocked by implantation tier?
- What source slices define the tier?

Chassis tiers are already defined elsewhere. This contract should preserve the Chassis hook and route exact tier content to source verification.

---

# 4. Draft object stack

```text
CharacterRef / ActorRef / CrewMemberRef
→ Bioform / Chassis
→ AttributeSet
→ SkillSet
→ SkillFocusSet
→ TrainingGateSet
→ ProgressionProfile
→ LevelState / RouteNodeLevelUpEvent / MilestoneLevelState
→ RankState / TierState
→ AbilityHook refs
→ Loadout / Equipment hooks
→ Status / Resource hooks
→ CharacterDisplayProfile
→ CharacterValidationProfile
→ CharacterSourceSliceProfile
```

---

# 5. Shared refs and identity

## 5.1 Draft refs

```text
CharacterRef
ActorRef
CrewMemberRef
BioformRef
ChassisRef
AttributeRef
SkillRef
SkillFocusRef
TrainingGateRef
AbilityRef
AbilityRankRef
AbilityTierRef
LevelRef
RouteNodeRef
RouteNodeLevelUpEventRef
MilestoneLevelRef
LoadoutRef
EquipmentRef
StatusRef
ResourceRef
SourceSliceRef
ProgressionEventRef
```

## 5.2 Ref rules

- Refs should remain lightweight.
- Refs should be stable enough for logs, state deltas, context packets, and UI display.
- Refs should not contain full object bodies.
- Character-facing refs and actor-facing refs should not be collapsed.
- `ActorRef` should be valid in transactions.
- `CharacterRef` should be valid in campaign/build state.
- `CrewMemberRef` should be valid in roster/party continuity state.

---

# 6. Character draft shape

A future `Character` should include these draft fields:

```text
Character
- characterRef
- displayName
- characterKind
- bioformRef, if applicable
- chassisRef, if applicable
- attributeSetRef
- skillSetRef
- skillFocusSetRef
- trainingGateSetRef
- progressionProfileRef
- abilityUnlockSummaryRef or abilityStateRef
- loadoutEligibilityRef
- equipmentEligibilityRef
- persistentStatusRefs, if any
- persistentResourceRefs, if any
- sourceSliceRefs
- characterDisplayProfileRef
- validationProfileRef
- lifecycleState
- visibilityPolicy
- reviewFlag, if needed
```

## 6.1 CharacterKind draft values

```text
player_character
crew_character
npc_character
enemy_character
ally_character
temporary_character
template_character
```

These are draft scaffold values only, not final source-canon registry names.

## 6.2 Character boundary

A `Character` may define build and persistent identity.

A `Character` should not by itself:

- resolve actions;
- commit state deltas;
- create effects;
- decide current action legality;
- narrate outcomes;
- replace actor state during a transaction.

---

# 7. Actor draft shape

A future `Actor` should include these draft fields:

```text
Actor
- actorRef
- characterRef, if backed by persistent character
- crewMemberRef, if party/crew-backed
- actorKind
- currentMode
- sceneRef or encounterRef
- currentPositionRef, if relevant
- currentResourceStateRef
- currentHealthStateRef
- currentSIStateRef
- currentActionEconomyStateRef
- currentShieldStateRef, if any
- currentMitigationStateRef, if any
- currentStatusRefs
- currentConditionRefs
- currentLoadoutRef, if relevant
- currentEquipmentRefs, if relevant
- visibleActionSurfaceRefs, if relevant
- sourceSliceRefs
- lifecycleState
- visibilityPolicy
- reviewFlag, if needed
```

## 7.1 ActorKind draft values

```text
player_controlled
api_dm_controlled
rules_core_controlled
environmental_actor
summoned_or_spawned
temporary_actor
```

## 7.2 Actor boundary

An `Actor` is transaction-facing.

Rules Core may read `Actor` state for:

- action eligibility;
- cost validation;
- target validation;
- check modifiers;
- ability prerequisites;
- training gate validation;
- status effects;
- resource availability;
- loadout/equipment validity.

An `Actor` does not mutate itself. Any change to actor state must route through `Effect` and `StateDelta` flow.

---

# 8. CrewMember draft shape

A future `CrewMember` should include these draft fields:

```text
CrewMember
- crewMemberRef
- characterRef
- rosterStatus
- partyStatus
- campaignAvailability
- activeLoadoutRef, if assigned
- campaignProgressionProfileRef
- relationshipStateRefs, if any
- injuryOrRecoveryStateRefs, if any
- obligationRefs, if any
- personalLogRefs
- sourceSliceRefs
- visibilityPolicy
- reviewFlag, if needed
```

## 8.1 RosterStatus draft values

```text
active_crew
reserve_crew
guest_ally
unavailable
departed
dead_or_lost
unknown
```

## 8.2 CrewMember boundary

A `CrewMember` stores campaign continuity.

It should not replace `Actor` during resolution. A crew member becomes transaction-facing only through an `Actor` instance or actor slice.

---

# 9. Bioform and Chassis draft shapes

## 9.1 Bioform

A future `Bioform` should include:

```text
Bioform
- bioformRef
- displayName
- shortDescription
- bioformKind
- sourceSliceRefs
- biologicalTraitHooks
- attributeHooks
- skillHooks, if any
- trainingGateHooks, if any
- statusResourceHooks, if any
- progressionHookRefs, if any
- abilityPrerequisiteTags, if any
- displayTags
- validationTags
- scaffoldMaturity
- status
```

Candidate `bioformKind` values for scaffold use:

```text
plain_human_dna
gene_edited
gene_spliced
```

These labels are accepted as examples but should still be source-verified before promotion.

## 9.2 Chassis

A future `Chassis` should include:

```text
Chassis
- chassisRef
- displayName
- shortDescription
- chassisTierRef
- sourceSliceRefs
- cyberneticImplantationTier
- cyberneticCapacityHooks
- baseResourceHooks
- baseHealthOrSIHooks, if applicable
- attributeHooks, if applicable
- skillHooks, if applicable
- trainingGateHooks, if applicable
- equipmentEligibilityHooks
- statusResourceHooks
- progressionHookRefs, if any
- abilityPrerequisiteTags, if any
- displayTags
- validationTags
- scaffoldMaturity
- status
```

## 9.3 Bioform/chassis boundary

Bioform and Chassis answer different validation questions.

```text
Bioform = biological body type / DNA-body package.
Chassis = level of cybernetic implantation.
```

They may create build hooks. They should not directly create arbitrary state mutations during play.

If Bioform or Chassis effects need to change state, they should route through:

```text
character build validation
→ derived actor state
→ effect/state-delta if changed during play
```

---

# 10. Attribute schema boundary

## 10.1 AttributeSet

A future `AttributeSet` should include:

```text
AttributeSet
- attributeSetRef
- characterRef
- attributeValues
- attributeModifierSummary
- sourceRefs
- validationResult
- reviewFlag, if needed
```

## 10.2 AttributeValue

A future `AttributeValue` should include:

```text
AttributeValue
- attributeRef
- baseValue
- derivedValue
- activeModifierRefs
- modifierSources
- derivedModifier
- visibilityPolicy
```

Use `derivedValue` and `activeModifierRefs` by default instead of a free-floating `currentValue`, so temporary effects/statuses remain traceable.

## 10.3 Attribute boundary

Attributes may:

- contribute to checks;
- contribute to derived resources;
- satisfy prerequisites;
- influence progression or ability unlocks when source rules allow.

Attributes should not:

- act as check families;
- replace skills;
- directly create effects without a rule/ability/action source;
- mutate state without a state-delta path.

---

# 11. Skill schema boundary

## 11.1 SkillSet

A future `SkillSet` should include:

```text
SkillSet
- skillSetRef
- characterRef
- skillValues
- sourceRefs
- validationResult
- reviewFlag, if needed
```

## 11.2 SkillValue

A future `SkillValue` should include:

```text
SkillValue
- skillRef
- rankOrValue
- trained yes/no, if applicable
- modifierSources
- relatedAttributeRefs
- relatedSkillFocusRefs
- visibilityPolicy
```

## 11.3 Skill boundary

Skills may:

- provide modifier hooks;
- satisfy prerequisites;
- interact with check inputs;
- appear in app-facing display;
- organize progression options.

Skills are not:

- check families;
- action categories by themselves;
- ability trees by themselves;
- final source prose.

---

# 12. Skill Focus schema boundary

## 12.1 SkillFocusSet

A future `SkillFocusSet` should include:

```text
SkillFocusSet
- skillFocusSetRef
- characterRef
- focusStates
- sourceRefs
- validationResult
- reviewFlag, if needed
```

## 12.2 SkillFocusState

A future `SkillFocusState` should include:

```text
SkillFocusState
- skillFocusRef
- parentSkillRef
- focusLevel
- focusRank, if distinct from focus level
- focusTierState
- abilityLaneRefs
- unlockedAbilityRefs
- availableAbilityRefs
- prerequisiteRefs
- rollLevelModifierHooks
- sourceSliceRefs
- displaySummary
- validationResult
```

## 12.3 Skill Focus boundary

Skill focuses are ability tree lanes.

They may:

- unlock or structure ability lanes;
- determine ability tier access;
- adjust modifiers based on roll level;
- provide narrower modifier hooks;
- support app-facing build display.

They should not directly resolve actions or mutate state.

Exact focus-level modifier behavior remains TBD, but the object model must leave an explicit hook for it now.

---

# 13. Training Gate schema boundary

## 13.1 TrainingGateSet

A future `TrainingGateSet` should include:

```text
TrainingGateSet
- trainingGateSetRef
- characterRef
- trainingGateStates
- sourceRefs
- validationResult
- reviewFlag, if needed
```

## 13.2 TrainingGateState

A future `TrainingGateState` should include:

```text
TrainingGateState
- trainingGateRef
- gateKind
- unlocked yes/no
- unlockSourceRef
- prerequisiteRefs
- appliesToEquipmentRefs
- appliesToActionCategoryRefs
- appliesToAbilityRefs, if any
- displaySummary
- validationResult
```

## 13.3 Training gate boundary

Training gates answer whether a character may equip, use, select, or access a defined equipment/action/ability surface.

If a required TrainingGate is not unlocked, Rules Core should treat the action, equipment use, or ability selection as invalid or unavailable unless a specific override rule applies.

Training gates should not:

- resolve checks;
- replace equipment validation;
- create automatic action success;
- mutate state without a transaction.

---

# 14. Level, route-node, and milestone progression

## 14.1 Level model accepted for scaffold

Nexus progression is route-node based at scaffold level.

Accepted rule:

```text
Level 0 = pre-node 0 character creation.
Each new route node starts with a level-up.
Some levels are milestone levels with additional bonuses beyond Ability Points and Skill Focus Points.
Exact milestone level details remain TBD.
```

## 14.2 LevelState

A future `LevelState` should include:

```text
LevelState
- levelRef
- characterRef
- currentLevelNumber
- currentRouteNodeRef, if applicable
- isMilestoneLevel yes/no
- levelSourceRef
- awardedAbilityPoints
- awardedSkillFocusPoints
- awardedMilestoneChoiceRefs, if any
- pendingProgressionChoiceRefs
- spentProgressionChoiceRefs
- validationResult
```

## 14.3 RouteNodeLevelUpEvent

A future `RouteNodeLevelUpEvent` should include:

```text
RouteNodeLevelUpEvent
- routeNodeLevelUpEventRef
- characterRef or crewMemberRef
- routeNodeRef
- priorLevelNumber
- newLevelNumber
- awardedAbilityPoints
- awardedSkillFocusPoints
- milestoneLevelStateRef, if milestone
- awardedChoiceRefs
- pendingChoiceRefs
- transactionRef or campaignEventRef
- logRef
- visibilityPolicy
- reviewFlag, if needed
```

## 14.4 MilestoneLevelState

A future `MilestoneLevelState` should include:

```text
MilestoneLevelState
- milestoneLevelRef
- characterRef
- levelNumber
- routeNodeRef, if applicable
- availableBonusChoiceRefs
- selectedBonusChoiceRefs
- pendingBonusChoiceRefs
- awardedRefs
- sourceRefs
- validationResult
- reviewFlag, if needed
```

## 14.5 ProgressionAward vs ProgressionChoice vs ProgressionState

Use this distinction to prevent accidental auto-selection:

```text
ProgressionAward = what the campaign grants.
ProgressionChoice = what the player selects.
ProgressionState = the committed result after validation.
```

A level-up may grant points and choices. It should not silently choose how those points are spent.

---

# 15. ProgressionProfile

A future `ProgressionProfile` should include:

```text
ProgressionProfile
- progressionProfileRef
- characterRef
- currentLevelStateRef
- routeNodeLevelUpHistoryRefs
- milestoneLevelStateRefs
- earnedProgressionAwards
- pendingProgressionChoices
- spentProgressionChoices
- unlockedTrainingGateRefs
- unlockedSkillFocusRefs
- unlockedAbilityRefs
- rankStateRefs
- tierStateRefs
- sourceSliceRefs
- validationResult
- reviewFlag, if needed
```

## 15.1 ProgressionEvent

A future `ProgressionEvent` should include:

```text
ProgressionEvent
- progressionEventRef
- characterRef
- eventType
- sourceRef
- routeNodeRef, if applicable
- levelRef, if applicable
- milestoneLevelRef, if applicable
- awardedRefs
- selectedChoiceRefs
- beforeSummary
- afterSummary
- transactionRef, if awarded during play
- logRef
- visibilityPolicy
- reviewFlag, if needed
```

## 15.2 Progression boundary

Progression may modify durable character/build state.

Progression changes should be validated.

If progression happens during active play and changes current actor state, it must produce clear state updates through the normal state-delta boundary or through an approved campaign setup/progression workflow.

---

# 16. Rank and Tier schema boundary

## 16.1 RankState

A future `RankState` should include:

```text
RankState
- rankRef
- owningObjectRef
- rankValue
- rankMax, if known
- rankSourceRef
- unlockState
- prerequisiteRefs
- effectHookRefs, if any
- displaySummary
- validationResult
```

## 16.2 TierState

A future `TierState` should include:

```text
TierState
- tierRef
- owningObjectRef
- tierValue
- tierBand
- unlocked yes/no
- prerequisiteRefs
- availableChoiceRefs
- lockedChoiceRefs
- sourceSliceRefs
- displaySummary
- validationResult
```

## 16.3 Rank/tier boundary

Ranks improve something already known.

Tiers unlock access to broader or deeper options.

Default distinction:

```text
Rank = improvement within an owned thing.
Tier = access band for a family of things.
```

A later ability schema should define exact ability-rank behavior.

Chassis tiers are source-defined cybernetic implantation levels and should not be reinvented by this contract.

---

# 17. Loadout and equipment hooks

## 17.1 LoadoutHook

A future `LoadoutHook` should include:

```text
LoadoutHook
- loadoutRef
- characterRef or actorRef
- equipmentRefs
- slotRefs
- trainingGateRefs
- eligibilitySummary
- validationResult
- visibilityPolicy
```

## 17.2 EquipmentHook

A future `EquipmentHook` should include:

```text
EquipmentHook
- equipmentRef
- owningCharacterRef or actorRef
- equipmentKind
- requiredTrainingGateRefs
- grantedActionSurfaceRefs
- grantedModifierRefs
- grantedResourceRefs, if any
- grantedStatusRefs, if any
- sourceSliceRefs
- validationResult
```

## 17.3 Loadout/equipment boundary

This contract only defines hooks.

Final equipment stats, weapon profiles, armor rules, item lists, and exact loadout UI belong to later equipment/content/app work.

Loadout changes are state changes and must be validated before becoming active.

---

# 18. Status and resource hooks

## 18.1 StatusResourceHook

A future `StatusResourceHook` should include:

```text
StatusResourceHook
- hookRef
- characterRef or actorRef
- sourceRef
- affectedStateLaneRef
- resourceRef or statusRef
- baseValue, if applicable
- derivedValue, if applicable
- currentValue, if actor-facing
- maxValue, if applicable
- refreshRuleRef, if applicable
- visibilityPolicy
- validationResult
```

## 18.2 Boundary

Character/profile data may define base or persistent resources.

Actor state should hold current scene/encounter values.

Examples:

```text
Character defines base HP/SI/resource capacity.
Actor holds current HP/SI/AP/MP/shield/status in scene or encounter.
```

State-changing resource/status updates route through `Effect` and `StateDelta`.

---

# 19. App-facing display needs

The app needs character/progression data in compact display slices.

## 19.1 CharacterDisplayProfile

A future `CharacterDisplayProfile` should include:

```text
CharacterDisplayProfile
- characterRef
- displayName
- shortIdentityLine
- bioformDisplay
- chassisDisplay
- levelOrRouteNodeProgressionDisplay
- attributeSummary
- skillSummary
- skillFocusSummary
- trainingGateSummary
- abilitySummary
- loadoutSummary
- statusResourceSummary
- warningsOrReviewFlags
- sourceSliceRefs for debug/source lookup
```

## 19.2 Display slice types

Do not assume there is one universal character sheet view.

Draft display slices:

```text
PlayerCharacterDisplaySlice
DebugCharacterDisplaySlice
APIDMCharacterSlice
RulesCoreCharacterSlice
ProgressionChoiceDisplaySlice
```

## 19.3 Actor display slice

An actor display slice should include only the current play-facing state needed for a scene, encounter, log, or DM packet:

```text
ActorDisplaySlice
- actorRef
- displayName
- currentHP/SI/resources, if visible
- AP/MP/action economy, if relevant
- position, if relevant
- status/condition summary
- shield/mitigation summary
- active loadout/equipment summary
- visible action options
- hidden/restricted display omissions
```

## 19.4 Progression display slice

A progression display slice should include:

```text
ProgressionDisplaySlice
- characterRef
- current level / route-node progression state
- available Ability Points
- available Skill Focus Points
- available milestone bonus choices, if any
- locked choices with visible reason, if allowed
- newly unlocked gates/focuses/abilities
- pending unspent choices
- warnings/review flags
```

---

# 20. Rules-core validation needs

Rules Core should be able to validate:

- actor exists and is eligible to act;
- actor maps to character/crew member when needed;
- Bioform prerequisites;
- Chassis tier prerequisites;
- action prerequisites;
- training gate requirements;
- loadout/equipment legality;
- ability prerequisites;
- skill focus tier/rank/level prerequisites;
- resource availability;
- status restrictions;
- progression award legality;
- progression choice legality;
- whether a character-derived modifier is allowed in the current check;
- whether Skill Focus level modifier hooks are applicable to the current roll level;
- whether a character progression update can affect current actor state.

Validation should return explicit result states rather than silently accepting malformed build data.

Draft validation statuses:

```text
valid
invalid
needs_clarification
blocked
unavailable
stale_state
temporary_ruling_needed
review_required
```

---

# 21. Source-slice and Context Broker needs

Character/progression objects should expose source-slice refs rather than requiring broad source dumps.

## 21.1 CharacterSourceSliceProfile

A future `CharacterSourceSliceProfile` should include:

```text
CharacterSourceSliceProfile
- characterRef
- bioformSourceSliceRefs
- chassisSourceSliceRefs
- attributeSourceSliceRefs
- skillSourceSliceRefs
- skillFocusSourceSliceRefs
- trainingGateSourceSliceRefs
- progressionSourceSliceRefs
- levelSourceSliceRefs
- routeNodeLevelUpSourceSliceRefs
- milestoneLevelSourceSliceRefs
- abilitySourceSliceRefs
- loadoutSourceSliceRefs
- statusResourceSourceSliceRefs
- playerFacingAllowed
- apiDMAllowed
- rulesCoreOnly
- visibilityDefault
- lastReviewed
```

## 21.2 Context Broker actor/crew slice

The Context Broker should be able to build compact actor/crew slices for API DM calls.

Possible slice types:

```text
actor_state_summary
crew_member_summary
character_build_summary
progression_summary
route_node_level_summary
loadout_summary
visible_ability_summary
training_gate_summary
status_resource_summary
```

## 21.3 Never-send default

Do not send full character sheets, full source docs, full ability trees, full hidden state, full progression history, or complete internal validation details to API DM by default.

Send the smallest actor/character/progression slice needed for the current call type.

---

# 22. Mutation and state-lane relationship

Character/progression data touches several state lanes, but this contract does not define final state-lane names.

Likely lanes include:

```text
character_profile_state
crew_roster_state
actor_current_state
bioform_state
chassis_state
progression_state
level_state
route_node_level_state
milestone_level_state
skill_state
skill_focus_state
training_gate_state
ability_unlock_state
loadout_state
equipment_state
status_resource_state
log_state
review_state
```

Boundary:

```text
Character/progression objects describe build and unlock state.
StateDelta commits actual changes to mutable state.
```

Progression choices, loadout changes, current resource changes, status changes, and ability unlocks must not be applied as loose UI edits or API DM narration.

---

# 23. Required implementation anti-bugs

1. Do not use `CharacterRef` where `ActorRef` is required in a transaction.
2. Do not use `CrewMemberRef` where current actor state is required.
3. Do not let progression awards auto-commit choices.
4. Do not let UI-visible options bypass training gate validation.
5. Do not let API DM infer hidden build/progression facts not present in the context packet.
6. Do not let loadout edits modify current actor state during an active transaction without validation.
7. Do not duplicate current HP/SI/AP/MP on `Character` if `Actor` owns current scene/encounter values.
8. Do not revive `Origin` as a biological-body term in this contract.
9. Do not reinvent Chassis tiers here; source-verify them.
10. Do not encode final Skill Focus modifier math before the ability/focus schema pass.

---

# 24. Stable enough for scaffold notes

Stable enough for rev0.1 scaffold planning:

```text
CharacterRef
ActorRef
CrewMemberRef
BioformRef
ChassisRef
AttributeRef
SkillRef
SkillFocusRef
TrainingGateRef
ProgressionProfileRef
LevelRef
RouteNodeLevelUpEventRef
MilestoneLevelRef
RankRef
TierRef
AbilityRef
LoadoutRef
EquipmentRef
StatusRef
ResourceRef

Character
Actor
CrewMember
Bioform
Chassis
AttributeSet
AttributeValue
SkillSet
SkillValue
SkillFocusSet
SkillFocusState
TrainingGateSet
TrainingGateState
ProgressionProfile
LevelState
RouteNodeLevelUpEvent
MilestoneLevelState
ProgressionEvent
RankState
TierState
LoadoutHook
EquipmentHook
StatusResourceHook
CharacterDisplayProfile
CharacterValidationProfile
CharacterSourceSliceProfile
```

Scaffold guardrails:

- Do not implement TypeScript in this draft.
- Do not encode final ability trees.
- Do not encode final source-canon progression rules.
- Do not collapse `Character`, `Actor`, and `CrewMember`.
- Do not let API DM narration modify character/progression state.
- Do not let UI display become progression truth.
- Do not make skills or domains into check families.
- Keep ability schema separate unless a hook is required.
- Keep Skill Focus as ability-tree lane at scaffold level.
- Keep source slices as context refs, not source authority.
- Keep hidden or internal progression data visibility-scoped.
- Let Codex/local verify actual repo paths before implementation.

---

# 25. Deferred work

Deferred to Ability Schema Contract:

- final ability object;
- ability family/type registry;
- ability lanes from Skill Focuses;
- ability ranks;
- ability tiers;
- ability prerequisites;
- ability effects;
- passive/active/reaction ability distinction;
- focus-level roll modifier behavior;
- ability source-slice requirements;
- ability UI card shape.

Deferred to later source/rules prose:

- final player-facing character creation language;
- final player-facing level-up language;
- final Bioform prose;
- final Chassis tier prose;
- final skill/focus descriptions;
- final training gate explanations;
- final A1 replacement prose.

Deferred to later implementation:

- exact TypeScript paths;
- exact interface names;
- reducer/state-lane implementation;
- validation fixtures;
- character sheet UI;
- progression UI;
- save/load shape;
- migration/import behavior.

Deferred to live source verification:

- exact current Bioform term, if `Bioform` is only provisional;
- exact current Bioform list;
- exact current Chassis tier list;
- exact attributes;
- exact skills;
- exact skill focuses;
- exact training gates;
- exact existing ability-tree decisions;
- exact current character sheet/source doc language.

---

# 26. Acceptance coverage

This scaffold covers:

- character vs actor vs crew member boundary;
- Bioform replacement for the discarded Origin term;
- Chassis boundary as cybernetic implantation tier;
- attribute, skill, and skill focus object boundaries;
- Skill Focus as ability tree lane;
- Skill Focus modifier hook by roll level;
- training gate boundary;
- route-node level-up model;
- Level 0 as pre-node 0 character creation;
- milestone-level hook and TBD details;
- rank/tier distinction;
- progression award/choice/state distinction;
- loadout/equipment hooks;
- status/resource hooks;
- app-facing display needs;
- rules-core validation needs;
- source-slice/context-broker needs;
- mutation/state-delta boundary;
- split recommendation for later ability schema;
- deferred decisions and guardrails.

This remains a repo-side draft scaffold, not source canon, not implementation, and not final player-facing prose.
