# Ability and Skill Focus Schema Contract rev0.1

**Date:** 2026-06-13  
**Mode:** Draft  
**Status:** Additive repo-side contract scaffold  
**Canon status:** Not live source canon, not implementation, not A1 prose, not final balance catalog  
**Related issues:** #33, #31  
**Intended placement:** `docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md`

## Placement and Preservation Notes

This document supplements the current game-system contract draft set. It does not replace, delete, supersede, or archive any prior Nexus document.

Supplemented context includes:

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01_ISSUE_41_SPIRITUAL_APPEND.md`
- `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`
- `docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1_BIOFORM_CHASSIS_APPEND.md`

Known preserved prior commits:

- `1c5479b96c7b1ba379781edaea8de507f532e420` — added #41 companion append artifact.
- `02ea59ccf24ecd910d0b0b28de74a2c10b74c1e9` — added character/progression schema scaffold.
- `c3930c110548bc7a0b5d57679fbeaf4791d093c1` — added Bioform/Chassis append.

Do not delete old files after adding this document. Any future integration into canonical source must be verified through the repo source workflow.

---

## Source and Currentness Status

This is a repo-side draft contract. It is intended to clarify schema construction order, validation boundaries, and ability/progression object relationships. It is not a direct edit to live Nexus source canon.

Canonical source authority remains in the repo. Generated Obsidian pointer-card navigation is located at:

the Obsidian `00 Source` pointer-card surface named by `docs/admin/nexus-distributed-surfaces.md`

Repo-side contract drafts are useful planning and implementation scaffolds, but they must be reviewed and reconciled into `docs/nexus-game-source/source` before being treated as final source truth.

---

## Accepted Context

The current construction order places ability schema after:

1. authority split;
2. turn transaction;
3. state lanes and mutation boundaries;
4. rules object model;
5. check family contract;
6. effect and state-delta grammar;
7. compact DM context broker;
8. character and progression schema;
9. Bioform/Chassis append.

Accepted progression context includes:

- `Origin` has been scrapped as a formal primary object.
- `Bioform` is provisional but useful.
- Current Bioform examples include Plain Human DNA, Gene Edited, and Gene Spliced.
- `Chassis` describes cybernetic implantation / body tech loadout logic.
- Level 0 is pre-node 0.
- Each new route node starts with level-up.
- Milestone bonuses remain available but exact cadence is not final here.
- Skill Focuses are one major ability-tree lane type, but not the only valid lane type.
- Focus level may matter both for checks and for ability prerequisites.
- Final ability catalog, final rank math, final balance, and final A1 language remain downstream work.

---

## Purpose

This contract defines how Abilities, Skill Focuses, body-related lanes, equipment-granted lanes, and campaign-history unlocks should connect to the existing Nexus rules-core contracts without reopening those contracts.

The goal is to make ability design specific enough for later drafting and implementation while avoiding premature balance, prose, or TypeScript decisions.

---

## Core Rule

An Ability is a rules-facing capability that may be unlocked, acquired, granted, equipped, prepared, validated, resolved, narrated, or withheld depending on its lane, prerequisites, cost, timing, actor state, equipment state, scene state, and visibility rules.

Abilities do not mutate game state directly. When used in play, they pass through the existing action transaction pipeline:

`Intent -> StructuredActionRequest -> Validation -> ValidatedAction -> CheckInput / CheckModifier / Effect -> StateDelta -> Commit -> ResolvedFactsPacket -> Narration / UI`

The API DM may interpret, frame, and narrate ability use, but final legality, cost, targeting, check selection, modifiers, effects, and state deltas belong to rules-core validation and resolution.

---

## Contract Defaults Locked by Draft Review

### 1. Ability lanes are plural and equally valid

Skill Focus lanes are not the only normal ability-tree lane. A character may receive, unlock, acquire, or advance abilities through several equally valid lane types.

Valid lane types include, at minimum:

- Skill Focus lanes;
- Bioform lanes;
- Chassis lanes;
- body-origin / body-condition lanes;
- equipment lanes;
- installed module lanes;
- mounted-system lanes;
- campaign-history lanes.

No lane type is inherently more canonical than another. The difference is cadence, prerequisite structure, source authority, and availability rules.

### 2. Lane sources differ by advancement cadence

Skill Focus lanes are expected to advance more regularly through normal character progression.

Bioform, Chassis, and other body-related lanes are usually chosen, assigned, constrained, or discovered at character creation or early identity definition. Later advancement in these lanes is allowed, but should be rarer than Skill Focus advancement unless a specific campaign route, procedure, upgrade path, or source document says otherwise.

Equipment, module, and mounted-system lanes may grant abilities while the relevant object is owned, installed, equipped, powered, loaded, linked, slotted, deployed, or otherwise available.

### 3. Equipment can provide ability lanes or ability access

Equipment-granted abilities are not lesser than character-sheet abilities. Their availability may depend on equipment state.

Examples include:

- mounted launcher systems;
- underbarrel launcher equivalents;
- drone racks;
- deployable tool cartridges;
- sensor packages;
- smart ammunition interfaces;
- breaching modules;
- hardpoint utility systems;
- orbital-link or local-network fire-support tools;
- other grounded tactical sci-fi modules.

Equipment ability language should stay compatible with the same validation pipeline as character abilities. The equipment source changes prerequisites and availability; it does not bypass rules-core validation.

### 4. Ability progression and Skill Focus progression use the same advancement currency

This scaffold should not assume separate Ability Points and Skill Focus Points.

The same progression currency may be spent to:

- acquire abilities;
- improve Skill Focuses;
- potentially purchase ranks, unlocks, or other progression choices later.

Exact currency name, award rate, spend economy, refund rules, and conversion details remain deferred.

### 5. Spending directly on a Skill Focus is valid

A player may spend progression currency directly on a Skill Focus because:

- they need a higher Focus score for skill checks;
- they need a Focus threshold for ability prerequisites;
- they are max rank in currently available abilities for that tier, level, lane, or branch;
- they want to build toward future lane access;
- they want general character competence rather than a new discrete ability.

The schema must support Focus advancement as a valid spend outcome, not merely as a hidden prerequisite tracker.

### 6. Selectable, acquired, equipped/prepared, and usable-now are separate states

An ability is **selectable** when its prerequisites are met.

Prerequisites may include:

- character level;
- Attribute level;
- Skill level;
- Skill Focus level;
- Bioform;
- Chassis;
- body state;
- equipment state;
- installed module state;
- prior ability selections;
- route state;
- campaign-history unlock flags;
- a required combination of any of the above.

An ability is **acquired** when the player spends the required progression cost to take it.

An ability is **equipped**, **prepared**, or **slotted** only if its type requires a loadout, preparation, stance, installation, mount, slot, or ready state.

An ability is **usable now** only when it is acquired or granted and the current action validation passes all required checks, including cost, timing, target, range, equipment state, scene state, status restrictions, cooldowns, ammunition, charges, visibility, and other rules-core constraints.

### 7. Campaign-history unlocks are allowed but deferred

Some abilities may become selectable through repeated campaigns, legacy state, route history, faction history, scars, prior endings, failure records, survivor records, unlock flags, or other durable campaign records.

The exact campaign-history unlock grammar is deferred, but the ability schema must reserve a prerequisite hook for it.

---

## Primary Object Stack

The ability schema should define the following object families.

### AbilityLane

A lane is an organized source of ability access.

Required fields:

- `laneId`
- `laneName`
- `laneType`
- `sourceRef`
- `visibilityPolicy`
- `advancementCadence`
- `prerequisiteProfileRef`
- `unlockProfileRef`
- `abilityRefs`
- `contextBrokerProfileRef`

Draft `laneType` values:

- `skill_focus`
- `bioform`
- `chassis`
- `body_origin`
- `equipment`
- `module`
- `mounted_system`
- `campaign_history`
- `special_case`

`AbilityLane` is not itself an ability. It is a source, grouping, and prerequisite container.

### SkillFocusState

A Skill Focus is both:

1. a character competence object that may modify checks; and
2. one possible ability lane source.

Required fields:

- `focusId`
- `focusName`
- `owningSkillRef`
- `focusLevel`
- `focusRankState`
- `checkModifierProfileRef`
- `abilityLaneRefs`
- `spendState`
- `sourceRef`

Skill Focus must remain valid even if no ability is purchased from it. A Focus can matter for checks and prerequisites independently of ability acquisition.

### Ability

An Ability is a selectable/acquirable rules object that may be active, passive, reaction-based, toggle-based, prepared, triggered, equipment-granted, or special-case.

Required fields:

- `abilityId`
- `abilityName`
- `abilityFamilyRef`
- `laneRefs`
- `rankProfileRef`
- `tierProfileRef`
- `prerequisiteProfileRef`
- `selectionStateRef`
- `acquisitionCostProfileRef`
- `modeProfileRef`
- `timingProfileRef`
- `targetingProfileRef`
- `validationProfileRef`
- `checkHookRefs`
- `effectHookRefs`
- `stateDeltaPolicyRef`
- `displayCardRef`
- `sourceSliceProfileRef`
- `contextBrokerProfileRef`

An Ability may belong to more than one lane if a source later requires cross-lane access. For rev0.1, multi-lane support should be allowed, but single-lane ownership should remain the default implementation simplification.

### AbilityFamily

An AbilityFamily groups abilities by broad mechanical behavior, source family, or UI category.

Possible families:

- attack;
- movement;
- defense;
- support;
- hacking;
- social;
- stealth;
- survival;
- command;
- sensing;
- engineering;
- equipment system;
- body system;
- campaign legacy.

Families are for classification and discoverability. They do not replace CheckFamily, Effect, or StateDelta contracts.

### AbilityRank

Rank is improvement within an owned ability.

Required fields:

- `rankNumber`
- `rankName`
- `rankPrerequisites`
- `rankCost`
- `rankEffectHookRefs`
- `rankDisplayDelta`
- `rankSourceRef`

Rank must not be confused with Tier. Rank upgrades an owned thing. Tier controls access band.

### AbilityTier

Tier is an access band for ability availability.

Required fields:

- `tierId`
- `tierName`
- `tierPrerequisites`
- `availableRankCeiling`
- `levelBandRef`
- `sourceRef`

A Tier can gate ability selection, rank ceiling, lane access, or branch availability. Exact balance values remain deferred.

### AbilityPrerequisiteProfile

Prerequisites determine whether an ability is selectable.

Possible prerequisite fields:

- `characterLevelMin`
- `attributeRequirements`
- `skillRequirements`
- `skillFocusRequirements`
- `bioformRequirements`
- `chassisRequirements`
- `bodyStateRequirements`
- `trainingGateRequirements`
- `equipmentRequirements`
- `moduleRequirements`
- `mountedSystemRequirements`
- `priorAbilityRequirements`
- `campaignHistoryRequirements`
- `routeStateRequirements`
- `exclusionRules`
- `sourceRef`

Prerequisites should support both strict requirements and alternative requirement groups.

Example pattern:

`Requires Character Level 3 and either Rifle Focus 2 or Tactics Focus 2.`

### AbilitySelectionState

Selection state tracks whether an ability can be selected or has been selected.

Required states:

- `hidden`
- `visible_locked`
- `selectable`
- `acquired`
- `unavailable_due_to_exclusion`
- `temporarily_unavailable`

Selection state does not decide current action legality. It only describes progression/access state.

### AbilitySpendState

Spend state tracks progression currency use.

Required fields:

- `spendId`
- `currencyType`
- `costAmount`
- `costReason`
- `purchasedObjectRef`
- `refundPolicy`
- `sourceRef`

At rev0.1, `currencyType` should allow a single shared progression currency.

Do not split Ability Points and Skill Focus Points unless later source or balance work explicitly introduces that split.

---

## Ability Mode and Timing

### AbilityModeProfile

Draft mode values:

- `active`
- `passive`
- `reaction`
- `toggle`
- `prepared`
- `triggered`
- `equipment_granted`
- `campaign_granted`

Mode affects validation and UI presentation, but it does not bypass transaction rules.

### AbilityTimingProfile

Possible timing fields:

- `actionCost`
- `apCost`
- `mpCost`
- `reactionCost`
- `secondaryActionUse`
- `freeActionFlag`
- `oncePerTurnFlag`
- `oncePerRoundFlag`
- `cooldownProfile`
- `setupRequirement`
- `readyRequirement`
- `interruptWindow`
- `triggerConditionRefs`

Timing validation belongs to rules core.

---

## Ability Targeting and Validation

### AbilityTargetingProfile

Possible fields:

- `targetType`
- `targetCount`
- `rangeProfile`
- `lineOfSightRequirement`
- `lineOfEffectRequirement`
- `nodeRequirement`
- `coverInteraction`
- `flankingInteraction`
- `areaProfile`
- `selfTargetAllowed`
- `allyTargetAllowed`
- `enemyTargetAllowed`
- `objectTargetAllowed`
- `sceneTargetAllowed`

Targeting profiles feed validation. They do not create results by themselves.

### AbilityValidationProfile

Possible validation checks:

- actor owns or is granted the ability;
- ability is acquired or currently granted;
- ability is equipped/prepared/slotted if required;
- actor has required resources;
- actor has required weapon/tool/module/system state;
- target is legal;
- scene supports the action;
- status effects do not block the action;
- cooldowns/charges/ammunition allow the action;
- timing window is valid;
- hidden rules-core constraints pass.

Validation output should remain compatible with the existing `ValidationResult` and `ValidatedAction` objects.

---

## Ability Hooks Into Existing Contracts

### AbilityCheckHook

Abilities may:

- request a CheckFamily;
- modify a CheckInput;
- add CheckModifiers;
- alter result-band interpretation;
- provide reroll or floor/ceiling behavior;
- convert one check family into another only if rules core validates that conversion.

Ability hooks do not replace the CheckFamily contract.

### AbilityRollModifierHook

Roll modifiers may come from:

- Skill Focus level;
- Attribute level;
- Skill level;
- ability rank;
- Bioform;
- Chassis;
- equipment/module state;
- target state;
- scene state;
- campaign-history flags;
- temporary effects.

The schema must allow Focus level to modify checks even when no new ability has been purchased from that Focus.

Exact modifier values remain deferred.

### AbilityEffectHook

Abilities may produce Effects, but Effects remain governed by the existing Effect grammar.

Possible effect-hook categories:

- damage;
- mitigation;
- shield interaction;
- movement;
- forced movement;
- status application;
- status removal;
- resource change;
- exposure/trace/suspicion/disposition change;
- reveal/conceal information;
- object interaction;
- scene fact update;
- summon/deploy/create object;
- grant temporary action option;
- trigger follow-up validation.

### AbilityStateDeltaPolicy

Abilities do not commit state directly.

If an ability produces state change, that change must become one or more validated StateDeltas before crossing the commit barrier.

Possible affected lanes include:

- actor resources;
- HP/SI;
- AP/MP/reaction state;
- shield/mitigation state;
- position/node/path/cover state;
- status effects;
- inventory/loadout/equipment state;
- exposure/trace/suspicion/disposition/clocks;
- revealed information;
- scene facts;
- NPC state;
- campaign-history flags.

---

## Equipment and Module Ability Rules

Equipment, module, and mounted-system ability lanes need explicit state dependencies.

Required equipment ability fields:

- `equipmentRef`
- `installationRequirement`
- `equippedRequirement`
- `poweredRequirement`
- `loadedRequirement`
- `ammoOrChargeProfile`
- `mountRequirement`
- `operatorRequirement`
- `trainingGateRequirement`
- `lossOrDamageBehavior`
- `sourceRef`

Equipment-granted abilities should support temporary loss when the item is removed, disabled, damaged, out of ammo, unpowered, hacked, jammed, or otherwise unavailable.

The schema should distinguish:

- ability permanently acquired by character progression;
- ability temporarily granted by equipment;
- ability selectable because equipment exists;
- ability usable now because equipment state passes validation.

---

## Bioform, Chassis, and Body-Related Ability Rules

Body-related lanes include Bioform, Chassis, cybernetics, implanted systems, gene edits, gene splices, scars, and other body-state sources.

Required body-lane fields:

- `bodyLaneType`
- `bioformRequirement`
- `chassisRequirement`
- `compatibilityProfileRef`
- `creationSelectionFlag`
- `assignedAtCreationFlag`
- `laterAdvancementAllowedFlag`
- `laterAdvancementCadence`
- `procedureOrRouteRequirement`
- `sourceRef`

Default rule:

Body-related abilities are often chosen or assigned at creation. Later advancement is valid but rarer than ordinary Skill Focus advancement unless a route, procedure, campaign event, or source file creates an exception.

---

## Campaign-History Ability Rules

Campaign-history ability hooks are allowed but intentionally deferred.

Reserved fields:

- `campaignHistoryRequirementRefs`
- `legacyUnlockFlagRefs`
- `routeHistoryRequirementRefs`
- `factionHistoryRequirementRefs`
- `priorEndingRequirementRefs`
- `scarRequirementRefs`
- `survivorRecordRequirementRefs`
- `failureRecordRequirementRefs`

These fields should remain inert until a campaign-history contract or source document defines their grammar.

---

## Display and UI Requirements

### AbilityDisplayCard

Ability display should separate progression state from current-use validation.

Suggested card sections:

- name;
- lane/source;
- family;
- mode;
- tier/rank;
- prerequisite summary;
- acquisition cost;
- current state: hidden / locked / selectable / acquired / equipped / usable now / blocked;
- action cost;
- targeting summary;
- effect summary;
- source hint;
- validation warning if blocked.

Do not show hidden prerequisites, concealed consequences, or GM-only unlock logic unless the visibility policy allows it.

### UIUpdateBundle Relationship

Ability UI should be generated from committed state and permitted visibility. UI presentation must not create authority over legality.

Visible button does not guarantee success. A visible button may still fail current validation because of target, timing, resources, status, equipment, or scene state.

---

## Context Broker and Source-Slice Requirements

Ability content must be sliceable for compact DM context.

### AbilitySourceSliceProfile

Suggested fields:

- `sourceRef`
- `sourceTitle`
- `sourceType`
- `laneRefs`
- `abilityRefs`
- `rulesSummary`
- `playerVisibleSummary`
- `dmVisibleSummary`
- `hiddenSummary`
- `validationNotes`
- `effectNotes`
- `stateDeltaNotes`
- `visibilityPolicy`
- `stalenessStatus`

### AbilityContextBrokerProfile

Suggested fields:

- `sendWhenActorHasAbility`
- `sendWhenAbilitySelectable`
- `sendWhenAbilityAcquired`
- `sendWhenAbilityUsableNow`
- `sendWhenAbilityRelevantToScene`
- `sendWhenAbilityAffectsValidation`
- `neverSendHiddenPrereqsUnlessRevealed`

Context Broker selects and packages context. It does not validate, resolve, mutate, or narrate final mechanics.

---

## API DM Narration Boundary

The API DM may:

- explain that a character appears able or unable to use an ability based on visible facts;
- frame ability intent in scene language;
- ask for clarification when a selected ability has ambiguous target or mode;
- narrate resolved ability outcomes from a ResolvedFactsPacket;
- preserve concealed mechanics when required.

The API DM must not:

- invent final ability legality;
- invent hidden prerequisite satisfaction;
- decide final cost payment;
- decide final target validity;
- invent check modifiers;
- invent effects;
- mutate state;
- expose hidden campaign-history unlock logic without permission;
- turn equipment-granted ability flavor into mechanics without rules-core validation.

---

## Implementation Anti-Bugs

The schema should prevent these common failures:

1. Treating Skill Focus as the only ability lane.
2. Treating Bioform or Chassis abilities as flavor instead of valid lanes.
3. Treating equipment-granted abilities as lesser or non-schema abilities.
4. Splitting Ability Points and Skill Focus Points without source approval.
5. Treating Focus improvement as invalid unless it purchases an ability.
6. Treating selectable as already acquired.
7. Treating acquired as currently usable without validation.
8. Treating equipped/prepared as universal for all abilities.
9. Allowing API DM narration to mutate state.
10. Allowing a UI button to bypass rules-core validation.
11. Allowing equipment abilities to remain usable after equipment loss/damage/disablement unless a source says they persist.
12. Hardcoding final tier/rank math in this scaffold.
13. Hiding campaign-history hooks so later repeated-campaign unlocks require schema surgery.

---

## Stable Enough for rev0.1

Stable enough:

- plural ability lanes;
- equally valid lane types;
- different advancement cadence by lane;
- shared progression currency at scaffold level;
- direct Skill Focus spending;
- selectable/acquired/equipped-or-prepared/usable-now distinction;
- equipment-granted ability support;
- body-origin/Bioform/Chassis ability support;
- campaign-history prerequisite hook reservation;
- ability hooks into validation/check/effect/state-delta pipeline;
- context-broker/source-slice requirements;
- API DM narration boundary.

Not stable enough:

- final currency name;
- final award rate;
- final Focus modifier values;
- final ability catalog;
- final tier/rank math;
- final body-lane advancement cadence;
- final equipment module list;
- final campaign-history unlock grammar;
- final A1 prose;
- TypeScript interfaces;
- database schemas;
- UI components.

---

## Deferred Work

Future drafts may split or append:

1. final Ability catalog;
2. Skill Focus lane list;
3. Bioform/Chassis ability lane list;
4. equipment/module/mounted-system ability examples;
5. final progression currency name and economy;
6. Focus-level check modifier math;
7. rank/tier balance table;
8. campaign-history unlock grammar;
9. UI card templates;
10. implementation-facing TypeScript interfaces.

---

## Acceptance Coverage

This rev0.1 contract is acceptable if it supports the following without contradiction:

- A character spends the same progression currency either to improve a Focus or acquire an ability.
- A Focus can matter for checks even if no ability is purchased from it.
- An ability can be selectable because prerequisites are met, but not yet acquired.
- An acquired ability can still fail current-use validation.
- Bioform and Chassis abilities can be represented as normal ability lanes.
- Equipment and mounted systems can grant normal ability access with equipment-state dependencies.
- Campaign-history unlock hooks can exist without defining the final campaign-history grammar.
- API DM narration can describe ability outcomes only after rules-core resolution.
- Rules core remains the authority for legality, cost, checks, effects, deltas, and committed state.

---

## Handoff Note

This document is ready as an additive repo-side draft scaffold. It should not be treated as source canon until reviewed and integrated into `docs/nexus-game-source/source`.
