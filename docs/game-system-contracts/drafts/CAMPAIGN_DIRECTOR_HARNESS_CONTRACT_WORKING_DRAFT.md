# Campaign Director Harness Contract Working Draft

- Status: accepted decision record; exact AI contract formalized for review
- Controlling ticket: [Define Game Truth, Director, and Context Broker contracts for the slice #4](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/4)
- Parent map: [Make the Nexus spatial vertical slice implementation-ready #57](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/57)
- Last decision capture: 2026-07-12
- Completion candidate: `CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md`

## Purpose and authority

This working draft preserves decisions approved during the issue #4 Grill with Docs session. It extends the accepted Nexus Game context and ADR baseline without treating unfinished interface details as decided. Canonical source, accepted ADRs, and the Nexus Game glossary remain the authority hierarchy described by `CONTEXT-MAP.md`.

## Scope freeze

As of 2026-07-12, all approved decisions below remain preserved, including the expanded campaign, legacy, character, and conversion decisions reached during the grill. The active completion scope is narrower: finish the Campaign Director Harness and Model Runtime contracts for AI authority, inputs, outputs, call timing, context, proposals, validation, recovery, cost, traces, and evaluation. Accepted game-system decisions are dependencies; their underlying mechanics are not to be deepened here.

Character/chassis research is complete in `docs/game-system-contracts/research/CHARACTER_CHASSIS_SOURCE_AUDIT_2026-07-12.md`. Crew Archive pools, recruitment eligibility, Converted Crewmate Packages, Legacy Allowance, Campaign-Earned Traits, Embodiment selection, and related product design are routed to [Complete Crew Archive pool and former-PC conversion design #68](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/68). Progression economy and balance remain separately out of scope. Reopening either area requires an explicit user decision.

This ticket defines contracts. It does not authorize production implementation, source-canon rewriting, or unrelated product-system design.

## Approved decisions

### Harness and model boundary

- The Campaign Director Harness is deterministic application orchestration, not a mega-agent or autonomous multi-agent system.
- Model calls are specialized and logically stateless. Initial task groups include Director planning, routine dialogue, important dialogue, narration, Player Intent interpretation, summarization, and structural repair.
- A provider-neutral Model Runtime maps task groups to configurable providers, models, reasoning levels, context budgets, and fallback policies.
- Nexus owns conversation history, Game Truth, Director State, validation, recovery, and normalized usage traces. Provider-owned conversation state and model memory are never authoritative.
- OpenAI-specific structured output, reasoning, prompt caching, persisted reasoning, streaming, or similar features may be adapter optimizations but cannot be required by the core contract.
- The architecture must remain ready for a future Ollama adapter and reasonable non-OpenAI models. Initial implementation and parity testing for those providers are deferred.
- The preferred initial operating shape is hybrid model routing rather than using the most expensive model for every call. Exact base-model assignments remain configurable and subject to Campaign Fixture evaluation.

### Context assembly and budgets

- Every Model Task Profile has independently adjustable input-target, input-hard-maximum, reserved-output, and maximum-output token settings. Changing these settings does not require code changes.
- The effective input ceiling is the lowest of the task profile's hard maximum and the selected provider/model's usable context window after its output reservation and a conservative adapter safety margin. Provider token-count differences are normalized or conservatively estimated by the adapter.
- The model's context window is a technical ceiling, not a target. The Context Broker includes relevant material rather than filling all available space, and it may exceed the normal input target up to the profile hard maximum when required context warrants it.
- Context selection order is: governing instructions, schemas, and authority limits; the current task, scene, participants, and request dependencies; permitted character knowledge and directly relevant Game Truth; the active Dialogue Session and recent exchange; then relevant active campaign history and wider lore.
- Lower-priority material is summarized or omitted before higher-priority material. Older conversation, distant lore, unrelated Director plans, and inactive history are the first candidates for removal.
- Mandatory context is never silently truncated. If it cannot fit, the runtime selects a compatible larger profile or fails safely instead of asking a model to act without its required authority, state, or knowledge boundaries.
- Each trace records the configured and effective budgets, estimated and actual usage when available, selected material, summaries, omissions, truncation reasons, and unused headroom.
- Initial numeric defaults are established and tuned per task through Campaign Fixtures and observed traces. The companion app's earlier low limits are not inherited as authoritative defaults.

### Game Truth, change history, and Director State

- Current Game Truth is authoritative. A supporting history of approved changes exists for recovery, audit, regression, and Developer Mode, but the game does not rebuild truth from the complete history.
- Anything that can affect future rules, available choices, character knowledge, or campaign continuity belongs in Game Truth. Pure expression and atmosphere do not.
- Character state uses five ownership layers: Character Profile for persistent identity, Crew Archive Entry for cross-campaign history and eligibility, Campaign Build for run-specific mechanics, CrewMember for current-campaign membership and relationships, and Actor State for live scene resolution. Less-persistent layers reference rather than duplicate the more persistent identity, so reset, conversion, recruitment, and scene transactions cannot overwrite unrelated state.
- Embodiment is a replaceable physical component referenced by the Character Profile rather than a sixth identity or lifecycle layer. It owns the current body or platform and applicable Bioform, Chassis tier, Installed Cyberware, durable gene modifications, compatibility, and physical continuity state. Replacing an Upload sleeve, shell, drone body, or Full Chassis body preserves the Character Profile and Crew Archive Entry. During Player Character Creation the player selects an eligible Starting Embodiment, each Starting Crewmate supplies a predetermined profile-bound Starting Embodiment, and a converted former Player Character retains the current committed Embodiment held at campaign end. `Chassis` remains the cybernetic integration tier, not a synonym for body.
- Director State is a separate local campaign-save lane containing private possible plans, pacing goals, unresolved possibilities, and candidate future developments.
- Director State helps facilitate the campaign but cannot establish that a planned event occurred.
- Model calls may propose Director State updates. Deterministic harness checks validate schema, references, permitted operations, size, current revision, and the prohibition against Game Truth mutation.
- Director State uses explicit lifecycle states such as candidate, active, realized, invalidated, and expired. Committed outcomes reference originating plans so realized plans leave active context deterministically.
- Node transitions remove realized, invalidated, and expired short-term plans; preserve bounded unresolved Campaign Threads and promised payoffs; and build a compact next-node brief. Old history remains retrievable rather than continuously active.

### Director planning cadence

- Director planning is event-triggered at deterministic Planning Checkpoints rather than polled continuously during movement, ordinary interaction, or dialogue.
- Baseline checkpoints are campaign initialization, material scene resolution, Node 0 Resolution, Route Node Resolution, and pre-node preparation. Trivial scene changes do not trigger planning merely because a scene boundary occurred.
- After Player Character Creation and Starting Crew selection, the first Director checkpoint establishes the initial campaign priorities, defines the Main Campaign Thread, and selects Node 0 as the playable introduction to that thread. No Route Prospects are presented before Node 0.
- Pre-node preparation is mandatory after the Director's Node 0 selection and after every later player-committed Route Prospect. It produces a bounded Node Brief against the latest committed Game Truth, selected destination, finalized deployment, active Campaign Threads, and valid Director State.
- At the start of Downtime, the Director proposes Route Prospects and deterministic systems validate and present them. Browsing and preview selection are reversible; an explicit confirmation atomically commits the destination before the player chooses the Field Team, loadout, and Ship Assignments for it.
- A confirmed Route Choice is consequence-preserving and cannot be changed through normal play. The destination commitment persists immediately, while its declared Travel Consequences apply through deterministic Transit rules at their specified triggers.
- After Deployment Preparation is finalized and the crew departs, the pre-node planning sequence normally runs during Transit. This gives it the final deployment context, avoids generating full unchosen Locations, and reduces arrival latency.
- A Planning Checkpoint may run a bounded sequence of specialized, logically stateless calls rather than only one call. Later calls receive explicitly validated artifacts from earlier steps; they do not rely on provider-owned chat memory.
- Each step has a declared task profile, input artifact, output proposal type, validator, maximum call count, and cost admission check. A failed or stale step cannot silently advance the sequence.
- The committed Node Brief guides context selection and performance inside the node without scripting mandatory outcomes or establishing future events as Game Truth. It is resolved, trimmed, or compacted at Route Node Resolution.
- The Player Character is always the group's narrative and decision leader. Captain is an optional Ship-ownership and command role; a Captain starting Crewmate does not replace the Player Character as group leader.
- Node 0 is a Director-selected opening Location outside the ten selectable Route Nodes. Its primary purpose is to introduce the Main Campaign Thread through play. A Player Character with the Captain role begins with a directly selected eligible Ship Frame; a Captain starting Crewmate brings their profile-bound Ship; when neither is a Captain, the Director provides an eligible Ship through Node 0 fiction such as theft, a sympathetic gift, or improvised transport. The ship-provision event does not normally become Node 0's primary premise. Only afterward does Downtime expose the first Route Prospects and Route Choice for Route Node 1.
- Downtime replaces Ship Time as the ownership-neutral phase after Node 0 and between Route Nodes. It retains recovery, equipment, relationships, recruitment, Route Choice, and Deployment Preparation but may occur aboard the Ship or from another suitable staging place.
- A literal open-space Ship Transit normally follows each Route Choice. Same-orbit journeys within one body's Region are common, distant-body journeys are possible, and only rare transitions between distinct Locations inside one enormous structure omit open-space travel.
- Transit and Transit Event are separate: the journey is normal, while a generated or authored Transit Event is optional. Consecutive Route Nodes may share a Region but must use distinct Locations.
- Route Prospects show concrete Travel Consequences rather than requiring literal distance or calendar duration. The model proposes a destination and route reference; deterministic travel rules derive the authoritative consequences from an abstract route-duration category, the player Ship baseline, Navigation capability, relevant Ship Conditions, and active campaign clocks.
- Travel Consequences may advance deadlines, faction activity, Campaign Threads, or other explicit Route Pressure; they may also complete recovery or change Transit Event exposure. The Campaign Director may plan against committed consequences but cannot invent or apply travel mechanics itself.
- Calendar language may appear as fiction, but it has no mechanical authority unless a specific authored scenario or validated clock explicitly uses it.
- Lore Ship Classes may express relative speed, scale, and role for non-player vessels and scenario fiction. They do not automatically become Player Ship Frame speed tiers or modify player Travel Consequences without an explicit validated rule.
- Every Route Prospect set contains at least one path that materially develops the Main Campaign Thread, but several or all prospects may develop it in different ways. Other contributions may prioritize crew, faction, resources, Backstory Threads, or Route Pressure when their outcomes remain consequential to the campaign.
- Main-thread relevance and internal prospect categories are hidden from the normal player interface. The player sees fictional identity, available intelligence, incentives, risks, Travel Consequences, and pressures rather than a `main story` label.
- Every prospect declares a distinct meaningful upside, expected campaign contribution, and Route Opportunity Cost. Deterministic validation rejects missing direct campaign development, materially duplicate choices, absent costs, and structurally dominated or consequence-free filler; Campaign Fixtures and human review evaluate whether the incentives are genuinely appealing.
- Campaign Clocks and Route Pressure continue developing through committed outcomes when the player chooses other priorities. The Director may propose a bounded pressure development tied to an existing source, trigger, clock, and player-visible signal; deterministic systems validate and commit any consequence.
- Pressure coaxes the campaign forward without forcing a single route. It may reshape, worsen, expire, or create opportunities, but it cannot invent retroactive facts, hide arbitrary punishment, remove all meaningful alternatives, or mark one option as the obviously correct story path.
- After a Route Choice is confirmed, unchosen Route Prospects normally become lapsed and leave the active choice pool. The next choice set is generated from current Game Truth and Director State rather than carrying a standing quest list forward.
- Reoffering the same underlying opportunity is exceptional. A resurfaced prospect receives a new ID linked to its prior offer, cites the committed cause of its return, and exposes at least one material reduction in benefit or increase in risk or cost.
- A lapsed prospect's history remains available for targeted recall and Developer Mode but does not remain in active context. The Director cannot recycle identical wording or silently re-present an unchanged option.
- Existing source references that use `Captain` as the universal Player Character term, `Ship Time` as the between-node phase, or every Route Node as a separate travel region require follow-up reconciliation.

### Provisional Route Node transition pipeline

- Campaign opening is a two-call exception. Before call 1, Player Character Creation includes selection of the Player Character's Starting Loadout and each selected Starting Crewmate supplies a predetermined profile-bound Starting Loadout, producing a complete starting deployment. The first call establishes the Main Campaign Thread, initial Director State, and Node 0 selection; after validation, the second builds the Node 0 plan from that finalized Player Character, Starting Crew, and starting deployment. No preparation step occurs between the two calls.
- In a Legacy World, the first opening call also proposes the exact campaign start date after seeing the selected Player Character and Starting Crew. Date selection remains part of that existing call rather than adding a third opening call.
- That same call may propose a small bounded set of Interval Developments occurring between the prior Campaign Resolution and the new start date. Each development cites an existing Setting Pillar, faction, unresolved pressure, Campaign Clock, or Legacy Consequence plus its elapsed-time trigger and permitted world-state effect.
- Deterministic validation applies Interval Developments to a candidate world snapshot before validating the new Main Campaign Thread and Node 0. Forward chronology, current Legacy Consequences, and continued viability and availability of the already selected Starting Crew are mandatory; any invalid component rejects the whole opening proposal for bounded repair rather than silently removing a selected character or partially advancing the world.
- Interval Developments may evolve, supersede, or resolve bounded world state but cannot invent unrelated setting history, erase a Setting Pillar, decide the new campaign's outcome, or create universal character knowledge.
- Node 0 does not use a Route Prospect call or a separate deployment-adaptation call. Its starting deployment is already known, and the standard Route Node transition pipeline begins only after Node 0 Resolution.
- Node 0 Resolution requires the player-facing campaign to have established the central problem, why it matters to the group, and an actionable reason to continue. The deeper cause, antagonist, and full stakes may remain concealed.
- Concealed details are either committed hidden Game Truth or bounded unresolved possibilities in Director State. Generated Performance cannot present a Director possibility as settled hidden fact merely to create mystery.
- The initial baseline between ordinary Route Nodes uses four purposeful Campaign Director calls: campaign update after Route Node Resolution, Route Prospect generation at Downtime start, selected-node planning after Route confirmation, and deployment adaptation after Field Team and loadout finalization.
- Each stage emits its own typed proposal or bounded artifact and passes deterministic validation before a later stage may consume it. The pipeline is not a persistent conversation and no stage gains authority from another model's prose.
- Four calls are a provisional quality-first baseline, not a permanent minimum. Every stage has an independent task profile and trace so models, budgets, reasoning, caching, or the stage itself may be changed without rewriting the pipeline.
- Campaign Fixtures compare the four-stage baseline with merged or omitted-stage variants. Cost, latency, retry/failure rate, redundant output, validation yield, and human-rated improvement determine whether a stage earns its continued call.
- A stage may be merged or removed only when fixture and playtest evidence shows that the cheaper pipeline preserves required state, player information, continuity, and useful creative contribution.

### Climax sequence

- After Route Node 7 resolves and before Route Node 8 is selected, the Campaign Director proposes one Climax Set containing the three distinct Locations that will become Route Nodes 8, 9, and 10.
- The three climax fronts must converge from established Main Campaign Thread developments, factions, pressures, and prior outcomes. The Director cannot introduce three unrelated final objectives merely because the campaign reached Node 8.
- Every Climax Set member records at least one player-observable foreshadowing reference from before Node 8, such as a discovered fact, known faction, prior consequence, character warning, or visible Campaign Clock. A front may become clearly actionable only after Node 7, but it cannot originate solely from unexposed Director State.
- The Climax Set locks the three opportunity identities, not three fully assembled Locations. Each prospect must be independently appealing, strategically distinct, relevant to the Main Campaign Thread, and structurally capable of hosting the Playable Finale if played last.
- When the set locks, the Director also proposes a bounded Climax Plan containing cross-node dependency hooks, possible advantage and pressure lanes, Playable Finale requirements, and allowed order-effect operations. It does not pre-script all six possible orders.
- All three Climax Set members are played exactly once in any player-chosen order. Unselected members remain available as an explicit exception to normal Route Prospect lapse.
- Results from an earlier climax node may grant assets, remove options, change relationships, advance Campaign Clocks, strengthen opposition, alter Travel Consequences, or otherwise change the risk, cost, benefit, and available approaches of the remaining nodes. Order effects must arise from committed state and declared dependencies rather than Director fiat.
- Every completed climax node creates at least one meaningful persistent advantage for later play and worsens, increases the cost or risk of, or closes at least one opportunity or approach elsewhere. The tradeoff may affect parts of a remaining node without invalidating its locked identity.
- After each of the first two climax nodes, the Director updates the remaining prospects against current Game Truth without replacing their locked identities. Material changes are presented before the next confirmed choice.
- Dynamic climax updates cite the completed outcome, affected dependency hook, remaining prospect, permitted effect type, and player-visible signal. The model proposes the update; deterministic validation owns its bounds and atomic commit.
- The last remaining Climax Set member becomes the Finale Node and hosts the Playable Finale: the campaign's final major objective or operation, which may be a confrontation, rescue, sabotage, escape, negotiation, discovery, decision, or another culmination. The Director cannot force an unrelated finale into an unsuitable Location or ignore accumulated order consequences.
- Deterministic systems resolve the Playable Finale and commit Node 10 outcomes before any closing story performance. Campaign Resolution is a separate post-Node-10 phase that may use generated narration or epilogue to express the committed aftermath and close the Main Campaign Thread.
- Campaign Resolution uses two logically stateless calls. First, a Campaign Director closure call produces a structured Resolution Brief from committed Game Truth, approved change history, relevant Campaign Threads, Climax Plan outcomes, crew and faction state, and archive rules. When the Player Character survived, that same call also produces source-referenced conversion evidence and a default Converted Crewmate Package proposal, establishing a validated pending Conversion Review without committing its discretionary selections. After deterministic validation and commit of the closure state, a separate narration call renders the player-facing epilogue from that approved brief. Conversion Review follows the epilogue and deterministic finalization commits the legal package; no third model call is added.
- The Resolution Brief records source references and explicit statuses for the Main Campaign Thread, material side threads, crew and faction consequences, the Ship, and archive candidates. It cannot invent a result merely to make the ending feel complete.
- Every material Campaign Thread receives one closure status: resolved, changed, or unresolved. Campaign Resolution does not fabricate an off-screen answer, success, failure, or reconciliation merely to eliminate an open thread.
- Epilogue selection is narrower than Resolution Brief retention. Closing narration includes only threads that materially shaped the campaign's choices, relationships, pressures, Playable Finale, or lasting aftermath; other unresolved threads remain recorded in campaign history without receiving obligatory prose.
- Every surviving Crew Roster member receives at least one compact ending status in the Resolution Brief. Expanded epilogue coverage is reserved for characters whose relationships, choices, losses, growth, or actions materially shaped the campaign.
- Epilogue narration is Generated Performance only. If narration fails, the committed Resolution Brief remains safe and retryable; no closing prose can change the Playable Finale outcome, thread status, rewards, losses, or archive state.
- Player Character Permanent Loss before Node 10 triggers Early Campaign Resolution rather than discarding the run. The same structured closure and narration separation applies, but the Resolution Brief records the terminal loss and accumulated state without claiming that a Playable Finale occurred.
- Eligible Legacy Consequences from an early ending promote normally, and the Saga Source records the shortened campaign's World Calendar range, terminal cause, surviving crew statuses, unresolved threads, and bounded world changes.
- `Climax Set` and `Finale Node` are internal contract and Developer Mode terms. Normal play presents three fictionally converging fronts, their known incentives and pressures, and their evolving order consequences without a tutorial label stating that these are `the final three` or that `the last becomes the finale`.
- By the transition into Node 8, prior campaign development and current presentation must make it reasonably understandable that all three fronts require resolution and that leaving one until last will make it the site of the final playable culmination. This understanding is earned through campaign state, character dialogue, Route Pressure, and framing rather than meta exposition.
- The exact climax-stage call sequence may specialize the provisional four-stage pipeline, but each update, remaining-prospect revision, Node Brief, and finale integration remains separately traceable and deterministically validated.

### Cross-campaign Saga canon

- At campaign start, the player may select an existing Legacy World or begin a Fresh World. Canon carryover never silently applies across unrelated worlds.
- Campaigns within one Legacy World form a forward Legacy Sequence. Each new campaign begins after every previously completed campaign in that world, and current world state includes their non-superseded Legacy Consequences.
- Parallel campaigns, prequels, timeline branching, and insertion before an existing completed campaign are outside the initial contract.
- Each Legacy World owns one literal World Calendar. Campaign starts, Campaign Resolutions, Saga Sources, and Legacy Consequences receive canonical dates or date ranges so later lore can reason about sequence and elapsed time.
- The World Calendar is an authoritative deterministic chronology service, not model memory. Models may propose a fictionally suitable duration or date constraint, but local rules validate ordering, normalize the calendar representation, and own advancement.
- Literal lore chronology does not replace abstract Campaign Clocks or require Route Prospect UI to display distance and travel math. Abstract route-duration categories may advance the World Calendar through deterministic mappings while the player-facing choice continues to emphasize Travel Consequences.
- Crewmates have both World Calendar age and Biological Age. Calendar age always follows chronology; Biological Age advances only during non-stasis elapsed time.
- Long Ship Transits normally place the crew in stasis, so their calendar dates advance without equivalent biological aging. A Transit Event may wake or interrupt stasis through validated play without retroactively aging the whole journey.
- Campaigns and between-campaign gaps are normally short enough that retirement or age-based unavailability remains possible but uncommon across many campaigns. Only in-world time matters; the game's real-world release lifetime does not advance a Legacy World.
- Age-based availability and death are deterministic rather than Director judgments. The campaign-start validator protects already selected Starting Crew, while Biological Age 100 commits death.
- Age-based field unavailability creates a Retired Crewmate state rather than deleting or killing the character. Retired Crewmates remain living Legacy World people and Crew Archive entries who may serve as contacts, mentors, relationship figures, faction participants, or other NPC roles.
- A retired character persists until an explicit dated death state is validly committed. Retirement, archive status, absence from a campaign, or lack of active context never implies death.
- The Campaign Director cannot kill an archived or retired Crewmate through an Interval Development or off-screen story proposal. The current simple natural-death baseline is deterministic death at Biological Age 100.
- After Campaign Resolution, a completed campaign appends one Saga Source to its selected Legacy World. Its primary content is a compact set of validated Legacy Consequences describing how the world is now different, not a detailed retelling of how the campaign produced them.
- Legacy Consequences that pass scope, authority, source, contradiction, and Setting Pillar validation promote automatically with the committed Campaign Resolution. Normal play does not add a separate approval or veto gate for earned world changes.
- The player may inspect promoted consequences through campaign history, the World Timeline when public, and Developer Mode. Inspection, export, or chronicle regeneration cannot alter canonical entries; repair of corrupt or invalid state follows explicit recovery tooling rather than narrative preference.
- A Saga Source contains machine-readable Legacy Consequences with stable IDs, source references, affected entities, scope, applicability, and any superseded prior state. A short human-readable chronicle may exist for player history, but only validated consequences have authority and future retrieval priority.
- Future Campaign Director and Generated Performance calls may draw from prior Saga Sources through Context Broker retrieval. The broker selects current relevant world consequences by task, entity, Region, faction, character, or Campaign Thread rather than injecting complete prior campaigns or procedural histories.
- Saga retrieval follows normal Context Budget, authority, character-knowledge, omission, and trace rules. A historical fact may be world canon without being known to the current speaker.
- Fresh World campaigns receive no Legacy World Saga context. A Legacy World remains a continuity container, not a provider conversation or globally shared account state.
- Legacy World continuity is not forced into a pre-Node-0 recap. The main menu instead exposes a World Timeline containing the authored setting chronology through the first campaign start and one dated campaign tick for each completed campaign, with its validated major world changes available as reference.
- The World Timeline is a player reference derived from authoritative source data, not the active context packet for every call. Context Broker retrieval remains relevance-based even when a timeline entry is visible to the player.
- World Timeline ticks include only Legacy Consequences marked public. Secret, restricted, or character-specific consequences remain authoritative in Saga Sources and may be retrieved for Campaign Director planning without becoming visible timeline lore.
- The Campaign Director may use relevant secret canon to plan later pressures, mysteries, callbacks, and opportunities. Context Broker packets for dialogue, narration, and other performance still enforce character knowledge and scene permissions, so Director access never grants universal NPC knowledge or permits accidental revelation.
- Saga canonical entries carry an explicit visibility scope and permitted-reveal policy. Developer Mode traces secret retrieval and omission without exposing hidden content through normal play.
- Secret canon becomes public, restricted, or character-known only through a played and validated reveal such as a discovery, confession, leak, or committed consequence. Director planning and Generated Performance cannot change Canon Visibility by themselves.
- A visibility transition is part of the same atomic Proposal Transaction as its revealing event, cites the prior secret entry and reveal source, and updates only the knowledge scopes justified by committed play.
- Campaigns are bounded stories within the setting. Their Main Campaign Threads may alter leadership, influence, territory, relationships, public knowledge, local institutions, resources, or operations, but they do not normally eradicate Setting Pillars such as foundational factions or resolve the world's defining conflicts.
- A Playable Finale targets a campaign-scale problem, faction arm, leader, operation, or regional condition rather than treating `defeat the entire major faction` as a valid default outcome. Wider Setting Pillars persist in changed form for future stories.
- Campaign Reach and Legacy Consequence scope are independent. A campaign may travel across the solar system, involve several Regions, and connect distant operations while its durable consequences remain bounded to the specific factions, institutions, territories, relationships, or conditions actually changed.
- System-wide adventures are valid and need not be artificially localized. Setting-wide Legacy Consequences remain rare because consequence scope follows committed causal impact, not the farthest destination visited.

### Former Player Character conversion

- A surviving Player Character from a completed campaign automatically becomes an eligible Crewmate in the Crew Archive. Player Character Permanent Loss still prevents conversion because the character is dead.
- In a later campaign the former Player Character occupies an ordinary Crewmate role; the newly created Player Character remains the group's narrative and decision leader.
- Conversion preserves identity, Personal Canon, authored build foundations, Aptitude Traits, applicable Archive Memories, and other explicitly persistent character state. The former Player Character retains the current committed Embodiment held at campaign end, including its appearance, all validated Installed Cyberware added at creation or during the campaign, resulting Chassis tier, and validated durable gene modifications. Ordinary carried equipment and loadout, run-specific level, temporary upgrades, Ability ranks, Skill Focus investment, cyberware upgrade-tree investment, and other run-specific Ability development reset or rebase into the appropriate campaign-entry Campaign Build; the Embodiment and persistent physical modifications themselves remain.
- The converted Crew Profile is derived from the original Player Character Profile plus source-referenced evidence from custom dialogue, decisions, relationships, and repeated behavior during play. A model may summarize that evidence, but cannot invent a personality trait unsupported by the campaign record.
- Conversion creates one capped Converted Crewmate Package rather than copying the original level-0 sheet or stacking an extra trait layer. The normal Player Character Creation spend allowance is its target, while its traits, starting Abilities, Installed Cyberware, durable gene modifications, and other selections are rebuilt from source-referenced campaign evidence to best represent the character at campaign end. Authored Campaign-Earned Traits unavailable during normal Player Character Creation may be selected when validated evidence satisfies their unlock requirements, but they consume the same package allowance; Growth Traits may inform evidence but do not automatically persist. Mandatory persistent physical modifications are costed first. If they alone exceed the normal allowance, a Legacy Allowance covers exactly that unavoidable overage, grants no discretionary points, and preserves all associated drawbacks and validation costs.
- If mandatory persistent Installed Cyberware and durable gene modifications exceed the normal level-0 allowance, the former Player Character remains in the Crew Archive but is not eligible for Starting Crew; Legacy Allowance cannot bypass this gate. Once the current campaign level supports a legal level-appropriate Converted Crewmate Package, the character enters the Campaign Director's eligible recruitment candidate pool without receiving a guaranteed appearance. Any remaining Legacy Allowance still covers only irreducible mandatory overage.
- The structured Campaign Resolution call presents the evidence-backed default Converted Crewmate Package for a pending Conversion Review. After the epilogue, the player may adjust discretionary traits and starting Abilities only within validated evidence-unlocked options and the capped allowance. Persistent physical modifications and committed history are fixed; finalization validates and atomically commits one legal package without another model call.
- Raw campaign transcripts are not required in future context calls. The validated converted Crew Profile, persistent traits, Archive Memories, and relevant targeted recall supply continuity without prompt bloat.

### Campaign level-zero opening

- Every newly created Player Character and selected Starting Crewmate begins the campaign at level 0 and plays Node 0 at that level.
- Level 0 is a complete starting build state, not an empty character. Traits, starting abilities, populated ability trees, authored build foundations, and a usable Starting Loadout are already assigned. The player selects the Player Character's Starting Loadout during Player Character Creation before Campaign Opening call 1; each selected Starting Crewmate arrives with a predetermined profile-bound Starting Loadout rather than requiring a pre-campaign rebuild.
- After Node 0 Resolution, the first Route Prospects appear and the player confirms Route Node 1. Before Node 1 Deployment Preparation, every current campaign character advances from level 0 to level 1.
- Node 0 Advancement occurs before the player selects the Node 1 Field Team, loadouts, and Ship Assignments, allowing level-1 preparation for the known destination.
- The same cadence applies throughout the campaign. After Route Node N-1 resolves and the player confirms Route Node N, every current campaign character advances to Level N before that node's Deployment Preparation; Route Nodes 1 through 10 are therefore played at Levels 1 through 10. Milestone levels add defined extra benefits without replacing ordinary advancement.
- A Crewmate recruited after campaign start enters at the campaign's current level with a predetermined legal level-appropriate Campaign Build. The player does not reconstruct the recruit's missed advancement choices; future advancement choices become player-controlled after recruitment.
- The exact benefits, choices, milestone cadence, and presentation of advancement remain progression-design work; this contract fixes its universal timing and the non-empty level-0 baseline.

### Character knowledge

- Important characters have explicit records of what they know, believe, suspect, or mistakenly believe. A recorded belief does not make the belief true about the world.
- Major characters receive persistent detailed records. Recurring minor NPCs receive small relevant records. Incidental NPCs use role, faction, Location, and current-scene knowledge without individual long-term memory.
- An incidental NPC is promoted to a persistent character record when naming, recurrence, relationship, promise, secret, or future relevance makes continuity material.
- Dialogue calls see the speaker's profile, permitted knowledge and beliefs, visible scene facts, recent conversation, and a small performance brief. They do not receive full Director State or unrelated secrets.

### Dialogue Sessions and Generated Performance

- Nexus owns the active Dialogue Session locally. Each NPC response is a new model call supplied with the current session context.
- Free Movement dialogue places consequential simulation in a soft pause while the player or model is responding: ambient animation and audio may continue, but movement, hazards, clocks, and NPC actions do not advance. Dialogue during Turn-Based Mode follows normal turn and action rules.
- Normal-length active conversations retain their full verbatim transcript. Long sessions may summarize older turns while retaining the recent exchange verbatim.
- After a conversation closes, Game Truth changes, character-knowledge changes, and a compact summary remain active as needed. Raw transcripts move to a capped rolling debug archive that may be exported before pruning.
- Routine valid dialogue is presented without prose-quality monitoring in normal play.
- Dialogue proposing a real change, including permission, promise, relationship movement, lead creation, secret revelation, or other continuity-bearing effect, waits for validation before being presented as committed fact.
- Every generated dialogue turn returns a hidden structured envelope containing player-facing performance, relied-upon fact references, proposed Game Truth changes, and proposed character-knowledge changes.
- Bland but valid dialogue is accepted in normal play. Quality retries and comparisons are user-triggered in Developer Mode. Automatic repair or escalation is reserved for structural, authority, knowledge, or validation failures that make the response unsafe to present.

### Structured proposal taxonomy

- Generated systems return named proposal types rather than arbitrary state-path patches.
- Approved proposal families are Player Intent, Dialogue Outcome, Director Plan, Route Prospect, and Tactical Directive proposals.
- Each proposal family receives its own allowed fields, authority boundary, validator, failure behavior, and permitted downstream effects.
- Every proposal records its starting Game Truth revision and the specific facts, entities, permissions, or other preconditions on which it depends.
- A changed global revision triggers deterministic revalidation rather than automatic rejection. The proposal may proceed when its relevant dependencies remain valid; changed dependencies require rejection and rebuilding from current truth.
- Cancelled Dialogue Sessions, late responses, duplicate responses, changed targets, and superseded requests cannot commit or display stale outcomes.
- A validated proposal still does not mutate state directly. Deterministic rules and state services produce and commit the authorized changes.

### Request safety and atomic commit

- Every model call receives a unique request ID, its owning task and session IDs, a monotonically increasing request sequence, its starting Game Truth revision, and its relevant dependency versions.
- Nexus keeps the active request authority locally. Closing a session, changing its target, or issuing a replacement request supersedes the old request immediately. Transport cancellation is best-effort; the local active-request check is authoritative.
- A completion is accepted only when its request is still active, its owner and target still match, and its result has not already been consumed. Late, duplicated, cancelled, and superseded completions are discarded without retry or side effects.
- Schema, reference, authority, character-knowledge, and deterministic-rule checks run before commit. Error feedback supplied to a repair call contains only permitted context plus categorical errors and invalid field paths; validation must not leak hidden facts.
- All linked effects from one generated performance form one Proposal Transaction. Game Truth changes, character-knowledge changes, approved change history, and the releasable performance record commit together or not at all.
- Relevant dependencies are rechecked inside the atomic commit. A changed dependency aborts the entire transaction; no partial state or associated performance is retained.
- The transaction ID is an idempotency key. Reprocessing the same accepted result cannot apply its effects or release its performance twice.
- State-dependent performance is released only from its committed performance record. This preserves recovery after a crash between commit and presentation.
- Malformed or unsafe results receive at most one automatic structural repair or regeneration using current permitted context. A still-active request invalidated by changed dependencies may likewise rebuild once from current truth. The configured task fallback may be used within that same single-recovery ceiling.
- Automatic recovery never loops, never exceeds the configured cost cap, and records every attempt in Developer Mode. If recovery fails, Nexus commits nothing, presents no unsafe generated performance, restores a stable interaction state, and offers a player retry without exposing technical or hidden-state details.

### Cost, routing, and evaluation

- Model selection and reasoning level are configurable by task group without code changes.
- More capable models are used by default for important dialogue and higher-value planning; cheaper models handle high-volume routine work when they pass evaluation.
- Normal play validates response safety and state consistency; it does not continuously grade whether prose is interesting.
- Developer Mode reports provider, exact model or snapshot, task group, prompt/profile version, context packet and selection rationale, omissions and truncation, relevant state revisions, raw and structured output, validation results, retries, latency, token usage, cached usage where available, and estimated cost.
- Developer Mode supports noncommitting replay against the same model, another model, or modified context so model limits, sampling variance, prompt problems, and context-selection failures can be compared.
- Players may configure a model-spend warning and hard cap. The cap contains a protected Scene Completion Reserve; it is not permission to spend beyond the cap.
- Before dispatch, the runtime conservatively prices the assembled input plus the call's maximum output. It dispatches only if that upper bound fits within the remaining appropriate budget lane, preventing output length or delayed usage reporting from exceeding the cap.
- Before beginning a model-dependent scene, Nexus verifies that the remaining budget can cover its calibrated completion reserve. If it cannot, the scene and the next Route Node do not begin.
- At the warning threshold, optional generative work such as Live Illustrations, discretionary narration, and nonessential background planning is disabled first. Configured cheaper task fallbacks may be used when they have passed the relevant fixtures.
- Once the Scene Completion Reserve is active, it funds only calls required to resolve the current dialogue, encounter, or scene and create a durable consequence-preserving checkpoint. Existing deterministic mechanics, including an encounter whose Tactical Directive is already committed, may finish without additional model calls.
- After the active scene reaches that checkpoint, no new model-dependent scene or Route Node begins until the player raises the cap, changes the model configuration, or starts with renewed budget. Save, review, export, and other deterministic management remain available.
- If the provider does not report authoritative usage, the conservative preflight estimate is charged for cap enforcement. Actual or estimated spend and reserve status remain visible in Developer Mode.

### Enemy tactical boundary

- At the start of Tactical Pressure, a model may propose one Tactical Directive containing the enemy group's goal, posture, priorities, restraints, and authored contingencies.
- Executable directive fields use approved machine-readable values and references. A short optional freeform rationale may support Developer Mode explanation but has no execution authority.
- The directive changes deterministic behavior priorities rather than merely changing descriptive flavor.
- Local enemy logic selects all legal movement, targets, actions, reactions, and contingency transitions throughout the situation.
- No per-enemy-turn model call is part of the vertical-slice baseline. Later replanning at major phase changes remains a future experiment.

## Existing implementation conflicts to retire

- The current prototype's model-authored `nexus-state` blocks can still patch scene, campaign, and crew state. This conflicts with the approved proposal and commit boundary.
- Current app state mixes authoritative, UI, transcript, settings, and model-memory concerns in one broad `GameState` surface.
- Current browser-owned API credentials conflict with the accepted provider boundary.
- Current context selection is a useful source-backed prototype but does not yet implement task profiles, character-specific knowledge, proposal-specific packets, or the approved evaluation trace.

These are implementation facts to reconcile later, not reasons to weaken the approved contract.

## Formalization disposition within frozen scope

- `CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md` formalizes the exact provider-neutral task profile, adapter, request, context, response, usage, dependency, proposal, validation, transaction, cancellation, recovery, cost, trace, replay, and Tactical Directive contracts.
- It also fixes the AI-facing Campaign Opening, ordinary node transition, material-scene, dialogue, Tactical Pressure, and Campaign Resolution call sequences while treating the referenced campaign artifacts and mechanics as opaque validated dependencies.
- Provider/model assignments, numeric Context Budgets, timeouts, archive caps, Scene Completion Reserve prices, and fixture thresholds remain calibration values. They are intentionally adjustable by task profile and require fixture evidence rather than additional product-design decisions.

## Deferred beyond frozen scope

- Crew Archive pool, Starting Crew and later Recruitment eligibility, Converted Crewmate Packages, Legacy Allowance, Campaign-Earned Traits, Embodiment selection, recruit build construction, and related UX and schemas are owned by [Crew Archive and Conversion Design #68](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/68). Their accepted decisions remain dependencies of this contract.
- Detailed Campaign Clock bands, Route Opportunity Cost mechanics, Route Prospect lifecycle mechanics, climax order-effect balance, world-calendar rules, timeline UX, interval-development rules, travel-consequence mapping, and other underlying game-system content are not AI-contract work. This contract only defines how the model references or proposes against validated versions of those systems.
- Progression reward amounts, point income, spend costs, milestone cadence and bonuses, Ability balance, and the contents of each level-up package. The frozen contract owns only advancement timing, state authority, validation, and Campaign Build handoff boundaries.
- Detailed aging, retirement, and long-term NPC participation mechanics. The frozen baseline requires only non-stasis Biological Age, deterministic death at 100, and no Director-authored off-screen Crewmate death.
- Server-owned shared timelines across multiple players. Multiplayer authority, moderation, concurrency, canon admission, privacy, rollback, and server governance are outside this local single-player contract.
- A new Tactical Directive at a major encounter phase change. This remains a possible later experiment, not part of the vertical-slice baseline.

## Implementation calibration

- Set and tune the initial numeric Context Budget, output limit, conversation-summary threshold, and targeted-recall threshold for each Model Task Profile using Campaign Fixtures and Developer Mode traces.
- Calibrate the Scene Completion Reserve for each model-dependent scene class from conservative per-task prices and Campaign Fixture call counts.
- Compare the four-stage Route Node transition pipeline against three-, two-, and one-call variants using normalized cost, latency, failure, redundancy, and human-quality evidence.
- Evaluate the two-call Campaign Opening Pipeline separately from ordinary node transitions; do not infer that Node 0 needs Route Prospect or deployment-adaptation stages.
- Fixtures verify that Node 0 communicates an actionable central problem without prematurely exposing or fabricating its deeper explanation.
- Fixtures verify that players can recognize the three-front climax and reason about order without being shown internal Climax Set or Finale Node terminology.
- Fixtures reject Climax Sets whose members cannot be traced to prior player-observable seeds.

## Accepted ADRs created by this session

- `0035-model-runtime-is-provider-neutral-and-task-routed.md`
- `0036-game-truth-and-director-state-use-separate-local-lanes.md`
- `0037-generated-performance-uses-local-dialogue-sessions-and-bounded-proposals.md`
- `0038-enemy-tactical-intent-is-model-proposed-and-locally-executed.md`
- `0039-model-spend-caps-protect-active-scene-completion.md`
- `0040-director-planning-is-checkpoint-triggered-and-prepares-each-node.md`
- `0041-campaigns-open-with-a-director-selected-node-zero.md`
- `0042-player-character-and-ship-ownership-are-separate.md`
- `0043-downtime-is-location-neutral-between-route-nodes.md`
- `0044-transit-normally-connects-distinct-route-node-locations.md`
- `0045-route-prospects-show-deterministic-travel-consequences.md`
- `0046-route-choice-precedes-deployment-preparation.md`
- `0047-four-stage-node-transition-planning-is-provisional.md`
- `0048-route-choices-mix-main-thread-and-consequential-side-paths.md`
- `0049-campaign-pressure-creates-non-obvious-consequential-route-choices.md`
- `0050-unchosen-route-prospects-normally-lapse.md`
- `0051-the-final-three-route-nodes-form-an-order-sensitive-climax-set.md`
- `0052-the-climax-is-communicated-through-diegetic-convergence.md`
- `0053-climax-order-effects-are-dynamically-replanned.md`
- `0054-node-ten-hosts-the-playable-finale-and-resolution-follows.md`
- `0055-campaign-resolution-separates-closure-planning-from-epilogue-performance.md`
- `0056-campaign-resolution-preserves-material-unresolved-threads.md`
- `0057-completed-campaigns-append-retrievable-saga-sources.md`
- `0058-campaigns-create-bounded-world-consequences.md`
- `0059-campaign-reach-and-legacy-consequence-scope-are-separate.md`
- `0060-legacy-world-campaigns-advance-one-forward-sequence.md`
- `0061-legacy-worlds-use-literal-calendar-chronology.md`
- `0062-campaign-start-dates-follow-player-and-crew-selection.md`
- `0063-legacy-worlds-have-bounded-between-campaign-developments.md`
- `0064-world-timeline-is-reference-not-a-forced-recap.md`
- `0065-world-timeline-is-public-while-the-director-can-use-secret-canon.md`
- `0066-crewmates-age-but-stasis-suspends-biological-aging.md`
- `0067-aged-out-crewmates-remain-living-world-characters.md`
- `0068-validated-legacy-consequences-promote-automatically.md`
- `0069-early-campaign-loss-still-enters-the-legacy-world.md`
- `0070-surviving-player-characters-become-archive-crewmates.md`
- `0071-campaigns-start-at-level-zero-and-advance-before-node-one.md`
- `0072-character-state-has-five-persistence-layers.md`
- `0073-character-identity-is-separate-from-embodiment.md`
