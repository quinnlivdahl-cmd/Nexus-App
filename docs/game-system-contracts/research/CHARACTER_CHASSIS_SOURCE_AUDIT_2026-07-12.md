# Character Chassis and Progression Source Audit

- Date: 2026-07-12
- Status: read-only research complete; reconciliation in progress
- Controlling work: [Define Game Truth, Director, and Context Broker contracts for the slice #4](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/4)
- Frozen contract: `docs/game-system-contracts/drafts/CAMPAIGN_DIRECTOR_HARNESS_CONTRACT_WORKING_DRAFT.md`
- Research boundary: character chassis, progression, traits, Abilities, Starting Crew, Crew Archive, loadout, and former-Player-Character conversion

## Research question

What existing character and progression source detail was not active during the Campaign Director Harness grill, and how does it constrain the frozen decisions about Level 0, Node 0 Advancement, Starting Crew, Ability trees, archive eligibility, and former-Player-Character conversion?

This audit does not change canonical source, accepted ADRs, or the frozen scope. Conflicts are surfaced for controlled reconciliation.

## Authority used

The current authority boundary is not simply newest-file-wins:

1. `CORE-SPATIAL-001` controls revised spatial interpretation and explicitly preserves the Character Build Stack while leaving Growth Trait timing, Campaign Build migration, and Crew Archive edges unresolved (`docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md:34-42`, `103-114`, `123-138`).
2. Character, Skills, and Equipment Canon Homes and Applied Rules remain canonical source for their compatible system detail, though most are marked provisional source.
3. The accepted glossary and ADRs are the revised decision baseline. Conflicts with canonical source must be surfaced and reconciled, not silently overwritten.
4. Repo-side schema contracts and bridge packets provide first-party design evidence but do not independently promote source canon.

## Executive findings

1. The frozen Level-0 decision is structurally compatible with the source, but `pre-node-0 character creation state` is now incomplete wording. Source does not yet say Level 0 is played through Node 0.
2. Canonical source establishes one advancement before every Route Node. Post-research reconciliation confirmed the explicit mapping: Route Nodes 1 through 10 are played at Levels 1 through 10.
3. The older character schema still models separate Ability Points and Skill Focus Points, while newer character source and the Ability schema require one shared progression currency unless explicitly reversed.
4. Existing schema cannot express former-PC conversion safely because persistent Character identity, cross-campaign archive state, run-specific Campaign Build, current Crew membership, and scene Actor state are not cleanly separated.
5. Installed cyberware is the most important unresolved persistence case. It is Equipment-owned as a module and upgrade tree, yet creation-point cyberware derives Chassis and therefore body identity.
6. Aptitude Traits, Growth Traits, Archive Memories, archive eligibility, former-PC provenance, and conversion evidence are accepted revised concepts but have no complete canonical schema.
7. The source provides a much richer build model than the frozen contract currently names: Bioform, Background, Discipline, Attributes, Skills, Skill Focuses, Abilities, Traits/Techniques, cyberware-derived Chassis, equipment/loadout, relationships, and ship function.
8. Node 0 has an unresolved preparation seam: source says a node-specific loadout follows knowledge of the node, while the opening pipeline selects Node 0 before the Node 0 plan consumes finalized starting loadouts.

## Direct conflicts and stale wording

### 1. Level 0 duration and later cadence

Canonical Character source says:

```text
Level 0 is the pre-node-0 character creation state.
Each new route node starts with a level-up or advancement/prep review when advancement is available.
```

Evidence: `docs/nexus-game-source/source/Characters/Canon Homes/CHAR-PROGRESSION-001 - Traits_Feats_and_Progression.md:50-65`.

The older schema hardens this further as `Each new route node starts with a level-up` and models a per-character `RouteNodeLevelUpEvent` (`docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md:746-832`). The Ability schema repeats the same accepted context (`docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md:62-73`).

ADR 0071 instead establishes that characters play Node 0 at Level 0 and advance after Node 0 and the first confirmed Route Choice (`docs/adr/0071-campaigns-start-at-level-zero-and-advance-before-node-one.md:7-9`).

Disposition:

- `pre-node-0` is stale or incomplete wording; Level 0 now begins during creation and remains active through Node 0.
- Node 0 remains outside the ten Route Nodes, so no ordinary Route Node rule needs to be applied to it.
- Post-research reconciliation accepted the existing source cadence explicitly: after Route Node N-1 and confirmation of Route Node N, current campaign characters advance to Level N before Deployment Preparation. Milestone levels add benefits without replacing ordinary advancement.

### 2. Progression currency

The older Character schema contains both `awardedAbilityPoints` and `awardedSkillFocusPoints` in Level and Route Node events (`docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md:761-801`).

Newer Character source explicitly says not to split Ability Points and Skill Focus Points unless later source or balance work approves it (`docs/nexus-game-source/source/Characters/Canon Homes/CHAR-PROGRESSION-001 - Traits_Feats_and_Progression.md:82-101`). The Ability schema says one shared currency can buy an Ability or directly improve a Skill Focus and lists separate currencies as an implementation anti-bug (`docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md:143-165`, `731-747`).

Disposition: Node 0 Advancement must not inherit the two-currency schema. A shared progression award is the current supported baseline unless deliberately reversed.

### 3. Skill hierarchy

The older Skills Canon Homes use a broad top-level `"Ability" / Ability Tree`, with Skills, Skill Focuses, and lower-tier powers beneath it (`docs/nexus-game-source/source/Skills/Canon Homes/SKILL-LIST-001 - SRC-SKILL-002-Skills-List-and-Definitions.md:29-84`; `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-DISCIPLINE-001 - SRC-SKILL-006-Disciplines-Skills-and-Advancement-Links.md:47-100`).

Later Character source uses:

```text
Attribute -> Skill -> Skill Focus -> Ability
```

It explicitly says former `leaves` are now Abilities and broad root items should be called Attributes (`docs/nexus-game-source/source/Characters/Applied Rules/CHAR-ABILITY-001 - Ability_Taxonomy_and_Level_Up_Working_Model.md:32-46`; `docs/nexus-game-source/source/Characters/Canon Homes/CHAR-PROGRESSION-001 - Traits_Feats_and_Progression.md:82-99`).

Disposition: the source corpus contains an internal terminology conflict. Current repo planning treats the later Character relationship as active, but the Skills Canon Homes require controlled reconciliation rather than silent reinterpretation.

### 4. Captain as universal protagonist

July 11 reconciliation notes still say each campaign begins with a new Captain (`docs/nexus-game-source/source/Characters/Canon Homes/CHAR-PROGRESSION-001 - Traits_Feats_and_Progression.md:31-35`; `docs/nexus-game-source/source/Characters/Canon Homes/CHAR-RECOVERY-001 - Recovery_Revival_and_Consequence_Model.md:31-35`).

ADR 0042 makes Captain optional and the Player Character the mandatory group leader (`docs/adr/0042-player-character-and-ship-ownership-are-separate.md:7-9`).

Disposition: these notes require a terminology amendment. Their compatible rule is `each campaign begins with a newly created Player Character`.

### 5. Existing ADR residue

ADR 0010 still says returning Crewmates reset into a level-1 Campaign Build, then notes that Level 0 versus Level 1 requires formalization (`docs/adr/0010-crew-rosters-reset-while-the-crew-archive-persists.md:7-11`). ADR 0071 has already decided the universal Level-0 reset.

ADR 0033 still says Aptitude Traits are selected for a new Captain (`docs/adr/0033-individual-variation-uses-aptitude-and-growth-traits.md:7-9`). This should say newly created Player Character without changing the underlying decision.

## Compatible source detail to preserve

### Complete Character Build Stack

The authoritative build is layered rather than class-based:

```text
Bioform
+ Background / social access
+ Discipline / role emphasis
+ Attributes, Skills, Skill Focuses, and Abilities
+ Traits / feats / techniques
+ cyberware or bioware
+ equipment and loadout
+ crew relationships and ship function
```

Evidence: `docs/nexus-game-source/source/Characters/Canon Homes/CHAR-CHASSIS-001 - Character_Chassis_and_Build_Stack.md:32-50`; preserved spatially at `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md:100-114`.

Implication: `authored build foundations` in former-PC conversion must eventually identify each layer explicitly. It cannot safely be implemented as a generic stat reset.

### Bioform and Chassis are different axes

Bioform is the biological/body-origin substrate. Chassis is cybernetic implantation tier (`CHAR-CHASSIS-001:52-79`). Current Bioform examples are Plain Human DNA, Gene Edited, and Gene Spliced (`CHAR-CHASSIS-001:54-66`).

The Chassis ladder is:

| Tier | Label |
|---|---|
| 0 | Background Implants |
| 1 | Light Implantation |
| 2 | Integrated |
| 3 | Chassis-Dependent |
| 4 | Full Chassis |

Evidence: `CHAR-CHASSIS-001:81-110` and `docs/nexus-game-source/source/Equipment/Canon Homes/EQUIP-CYBER-001 - Cyberware_Bioware_and_Enhancement_Model.md:46-78`.

Chassis is derived from creation-point cyberware rather than selected as a separate Cyborg species. Each selected cyberware piece may become an upgrade tree; new mid-campaign cyberware is rare and gated (`CHAR-CHASSIS-001:81-100`; `EQUIP-CYBER-001:46-64`).

### Body expression still needs a mapping

Character source also lists Designer Humans, Vatborn, Low-G/Adapted Humans, Splicers, Uploads, ape/gorilla bodies, cephalopod forms, flora/mycelial lines, and other body expressions (`docs/nexus-game-source/source/Characters/Canon Homes/CHAR-ORIGIN-001 - Origins_Species_and_Humanity_Frame.md:111-148`; `CHAR-CHASSIS-001:150-166`).

The source does not fully map these expressions into the three Bioform values. Likely mappings such as Designer Human or Vatborn to Gene Edited and ape/gorilla to Gene Spliced remain assumptions until reconciled.

The Bioform/Chassis append also says Plain Human DNA likely has all-tier compatibility, Gene Edited has mixed compatibility, and Gene Spliced is limited by default, but exact tier ranges and overrides remain open (`docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1_BIOFORM_CHASSIS_APPEND.md:64-162`).

### Standard Fit and body hooks

Standard Fit determines whether ordinary human infrastructure, equipment, medicine, seating, tools, and emergency systems work without adaptation (`CHAR-CHASSIS-001:190-215`). Nonstandard bodies and heavy cyberware can require adapted loadouts (`docs/nexus-game-source/source/Equipment/Canon Homes/EQUIP-LOADOUT-001 - Loadout_Core_Rules.md:132-149`).

Implication: complete Level-0 validation must include Bioform/Chassis-to-loadout compatibility, not only possession of a weapon and armor.

### Ability lanes and states

Ability access can come from Skill Focus, Bioform, Chassis, body condition, cyberware, equipment, installed modules, mounted systems, or campaign history (`docs/nexus-game-source/source/Characters/Applied Rules/CHAR-ABILITY-001 - Ability_Taxonomy_and_Level_Up_Working_Model.md:47-66`).

The schema usefully separates:

- selectable;
- acquired;
- equipped, prepared, or slotted where required; and
- usable now after current-state validation.

Evidence: `docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md:167-197`.

Implication: `populated Ability tree` cannot mean every visible starting Ability is acquired. Level 0 must explicitly record which Abilities are authored lane content, visible, selectable, granted, acquired, equipped, and currently usable.

### Loadout and preparation order

The baseline loadout is Primary Weapon, Secondary Weapon, Tool, Protective Gear, Shield/Defense Module, two Accessories, capped consumables, and separately stored credentials (`EQUIP-LOADOUT-001:34-59`).

Compatible source consistently uses:

```text
node known or selected
-> advancement
-> Field Team selection
-> loadout
-> node start
```

Evidence: `EQUIP-LOADOUT-001:75-87`; `docs/nexus-game-source/source/Core/Canon Homes/CORE-SHIP-001 - SRC-CORE-005-Ship-Phase-and-Crew-Operations.md:61-80`; `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md:40-63`.

This strongly supports the frozen Node 0 Advancement timing before Node 1 preparation.

### Crew capability extends beyond the Field Team

Crew records are expected to include body/Chassis, Discipline, Skills, loadout highlights, relationships, continuity, ship function, faction ties, and availability (`docs/nexus-game-source/source/Characters/Applied Rules/CHAR-CREW-001 - Crew_Rosters_and_Relationships.md:35-50`). Crew also matter through ship operations, Downtime, medical support, access, planning, and relationships (`CHAR-CREW-001:52-72`).

Implication: former-PC conversion must preserve enough noncombat and ship-role identity to make the converted Crewmate distinct even after Campaign Build reset.

Post-research reconciliation established that a Crewmate recruited after campaign start enters at the current campaign level with a predetermined legal level-appropriate Campaign Build. The player does not reconstruct missed levels; only future advancement choices become player-controlled.

## Missing definitions and schema gaps

### Persistence layers are conflated

The current schema says `Character` owns persistent identity but also directly references progression and ability state (`docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md:294-348`). `CrewMember` is a campaign-continuity wrapper but also references its own campaign progression profile (`Character_and_Progression...:181-192`, `413-451`).

Post-research reconciliation accepted five distinct ownership layers:

1. Character Profile for persistent identity;
2. Crew Archive Entry for cross-campaign history and eligibility;
3. Campaign Build for run-specific mechanics;
4. CrewMember for current-campaign membership and relationships; and
5. Actor State for live scene state.

This accepted split prevents Campaign Build reset from mutating the historical former-PC record or carrying prior-run progression into a new campaign.

### Crew Archive is not modeled

The schema lacks dedicated objects or rules for:

- Crew Archive entry;
- eligibility state and reason codes;
- former-PC conversion provenance;
- Archive Memories and subjective-memory boundary;
- Continuity Checkpoint;
- Biological Age, retirement, death, and field availability;
- profile-bound Captain Ship linkage;
- duplicate identity handling; and
- atomic conversion.

The current `campaignAvailability` and `RosterStatus` fields are too broad, and `dead_or_lost` conflates states that now have different rules (`Character_and_Progression...:413-445`).

Recommended module boundary: a Crew Archive entry persists independently; selecting it creates a new campaign CrewMember and Level-0 Campaign Build. It should not reuse the archived campaign's CrewMember wrapper.

### Traits are not formalized

Canonical Character source defines only generic Trait, Feat/Technique, Focus, cyberware-tree node, and Discipline feature categories, while stating the content is unfinished (`CHAR-PROGRESSION-001:36-48`). It does not define:

- Aptitude Trait;
- Growth Trait;
- ordinary persistent trait versus run-specific trait;
- personality-derived mechanical trait;
- conversion evidence thresholds;
- conflicting evidence handling; or
- how prior Growth Traits influence a reset character without carrying over the old build.

This is the central formalization gap behind the user's desired former-PC-to-Crewmate growth behavior.

### No exact Node 0 Advancement package

No authoritative source states what Level 1 grants. Open elements include award quantity, currency name, Focus thresholds, Ability catalog, Growth Trait timing, milestone cadence, and whether Level 1 is a milestone.

Post-research scope correction: those reward, economy, cadence, and balance decisions are outside the frozen Campaign Director Harness contract. The contract preserves only advancement timing and the authority and validation boundary for consuming a completed Campaign Build update.

Health only increases when a separately defined milestone level grants it; Level 1 must not silently award Health (`CHAR-CHASSIS-001:128-134`).

The Ability seed is incomplete, including no accepted Defense or Identity/Signal/Horror Abilities (`docs/nexus-game-source/source/Characters/Applied Rules/CHAR-ABILITY-001 - Ability_Taxonomy_and_Level_Up_Working_Model.md:196-262`).

The existing transaction distinction should be preserved:

```text
ProgressionAward = what the campaign grants
ProgressionChoice = what the player selects
ProgressionState = the validated committed result
```

Evidence: `Character_and_Progression...:822-832`.

### Person and Embodiment are separate

Uploads are digital persons embodied through sleeves, drones, shells, servers, or other substrates, while Full Chassis Cyborgs retain a biological person-core (`docs/nexus-game-source/source/Characters/Canon Homes/CHAR-ORIGIN-001 - Origins_Species_and_Humanity_Frame.md:80-101`). Recovery source also allows body replacement and continuity consequences (`docs/nexus-game-source/source/Characters/Canon Homes/CHAR-RECOVERY-001 - Recovery_Revival_and_Consequence_Model.md:76-108`).

Post-research reconciliation accepted an explicit separation: Character Profile owns the continuing person, while a replaceable Embodiment owns the current physical body or platform and applicable Bioform, Chassis tier, Installed Cyberware, durable gene modifications, compatibility, and physical continuity state. During Player Character Creation the player selects an eligible Starting Embodiment, a Starting Crewmate receives a predetermined profile-bound one, and a converted former Player Character retains the current committed Embodiment held at campaign end. Embodiment remains a component referenced by Character Profile rather than a sixth identity or lifecycle layer.

## Former-PC conversion persistence matrix requiring a decision

| Layer | Source signal | Current likely treatment | Decision status |
|---|---|---|---|
| Identity, name, profile, Personal Canon | Persistent person identity | Preserve | Accepted |
| Bioform/body substrate | Character foundation; may change through rare play | Preserve current validated state | Needs exact rule |
| Background/social access | Character Build Stack foundation | Preserve unless superseded by world state | Needs exact rule |
| Discipline/role | Reliable play pattern and crew function | Preserve | Needs exact rule |
| Attributes and base Skills | Build foundation versus accumulated progression not split | Rebase to reviewed Level-0 template | Needs exact rule |
| Skill Focus and Ability lane definitions | Authored foundation | Preserve access structure | Supported |
| Acquired Ability ranks and Focus investment | Run progression | Reset | Accepted in principle |
| Creation-assigned Abilities | Starting identity | Preserve or reassign into Level-0 template | Needs exact rule |
| Aptitude Traits | Persistent variation | Input to one capped Converted Crewmate Package | Accepted after research |
| Growth Traits | Run-specific | Reset, but prior development may inform the converted package | Accepted after research |
| Personality-derived traits | Desired conversion result but no source type | Use authored Campaign-Earned Trait options unlocked by validated evidence and priced inside the same capped package; player reviews and may adjust the discretionary package | Accepted after research; exact catalog pending |
| Carried equipment and loadout | Campaign inventory/build | Reset | Accepted |
| Installed cyberware and derived Chassis | Equipment-owned mechanically; identity-defining physically | Preserve all validated implants, including campaign-added implants, and retain derived Chassis; mandatory cost overage uses only a non-discretionary Legacy Allowance and blocks Starting Crew eligibility | Accepted after research |
| Cyberware upgrade ranks | Run progression inside persistent implant tree | Reset or rebase to the universal Level-0 baseline without removing the implant | Accepted after research |
| Relationships and Archive Memories | Cross-campaign continuity | Preserve permitted subset | Accepted in principle |
| Campaign-history unlock flags | Schema reserves them but grammar is deferred | Preserve facts; do not auto-acquire Abilities | Recommended |

## Node 0 preparation seam

The Campaign Opening Pipeline currently selects Node 0 in call 1 and has call 2 build the Node 0 plan from finalized characters, Starting Crew, and starting loadouts. Source says node-specific loadout choices should happen only after enough node context exists (`EQUIP-LOADOUT-001:69-87`).

Post-research reconciliation established that Starting Crewmates use predetermined profile-bound Starting Loadouts and only the Player Character's Starting Loadout is player-selected. The player makes that selection during Player Character Creation before opening call 1. Both opening calls receive the complete starting deployment, and there is no preparation step between them.

Accepted sequence: Player Character Creation finalizes the Player Character's general legal Level-0 Starting Loadout, selected Starting Crewmates supply their profile-bound Starting Loadouts, opening call 1 selects Node 0, and call 2 plans Node 0 around that already-complete deployment. Destination-specific preparation begins with Route Node 1 rather than interrupting the Node 0 opening.

## Supplementary first-party planning evidence

The Skill/Ability Structure #31 bridge is not canonical source, but it preserves accepted planning that was not active in the harness grill:

- each Skill Focus begins with two or three Tier-1 Ability choices in the playable draft;
- Ability ranks and direct Focus spending both increase Focus Total;
- both spend the same progression currency at a candidate cost of one;
- Tier 2 appears as a full locked preview and Tier 3 initially exposes only its existence;
- Ability-granted checks use the relevant Attribute Modifier plus Skill Focus Modifier;
- exact thresholds, rank caps, modifier formulas, currency name, and milestone cadence remain deferred.

Evidence: `docs/chatgpt-project-bridge/synced-chats/2026-06-28-issue-31-skill-ability-planning-exchange.md:114-137`, `164-228`; summarized in `docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md:27-35`, `55-99`.

This evidence is useful for Node 0 Advancement design, but must not be mistaken for promoted source or implemented app behavior.

## Recommended controlled reconciliation order

1. Preserve all validated Installed Cyberware, including campaign-added implants, and the resulting Chassis through former-Player-Character conversion; reset or rebase upgrade-tree investment without removing the implant. If mandatory persistent modifications exceed the Level-0 allowance, retain the character in the Crew Archive but gate them from Starting Crew and permit later current-level Recruitment eligibility. This decision was accepted after the research pass.
2. Apply the accepted source cadence: one level before every Route Node, with Level N used for Route Node N.
3. Formalize the accepted single capped Converted Crewmate Package and exact Legacy Allowance calculation, including the distinction among Aptitude Traits, Growth Traits, ordinary persistent Traits, and campaign-end evidence.
4. Decide the Node 0 preparation seam: creation-default loadout or deterministic preparation between opening calls.
5. Formalize the persistence architecture: Character/Profile, CrewArchiveEntry, CampaignBuild, CrewMember, and Actor.
6. Define archive eligibility, conversion, and Node 0 Advancement transactions.
7. Reconcile stale canonical wording and older ADR residue without broad source rewriting.
8. Only then finish the exact Character/Progression and Campaign Director schemas.

## Research confidence and limits

- High confidence: Chassis tiers, build-stack composition, Ability lane/state distinctions, loadout order, progression-currency conflict, missing archive schema, and stale Captain terminology.
- Medium confidence: `pre-node-0` is a direct conflict rather than incomplete shorthand; either interpretation still requires a wording repair.
- Medium confidence: installed cyberware should persist as identity. Source clearly makes it identity-defining but does not decide cross-campaign reset behavior.
- The canonical source contains no complete current crew-sheet examples. Rook dashboard characters are explicitly Campaign Fixture evidence rather than revised-product defaults (`docs/nexus-game-source/source/Dashboards/Current State/DASH-CAMPAIGN-001 - Active_Campaign_State_Summary.md:29-64`, `138-158`).
- No source, ADR, app implementation, commit, push, or GitHub issue was changed by the research pass.
