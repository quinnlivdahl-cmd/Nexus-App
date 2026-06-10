---
project: Nexus
title: "Nexus_Global_Project_Roadmap"
doc_id: "ROADMAP-2026-06-07-GLOBAL-CANDIDATE"
doc_status: "candidate_review"
working_state: "codex_review_ready"
mode_owner: "Steward"
source_role: "project_roadmap_candidate"
canon_status: "candidate_not_yet_promoted"
rev: "0.1"
created: "2026-06-07"
last_updated: "2026-06-07"
review_lane: "90 Codex Review/01 Review Ready"
intended_use: "global_project_roadmap_for_ai_and_human_guidance"
related_docs:
  - "DASH-010 - Active_Project_Roadmap.md"
  - "DASH-007 - Active_Project_Task_Summary.md"
  - "ADM-013 - Nexus_Source_First_Routing_Map.md"
  - "MODE-008 - Nexus_Command_Key.md"
  - "MODE-FUNC-001_Function_Bindings.md"
notes:
  - "Candidate roadmap only. Do not treat as live source authority until reviewed and promoted."
  - "This roadmap is organized by durable lanes. Each lane contains its own phases and milestones."
---

# Nexus Global Project Roadmap - Candidate

## Purpose

This roadmap is the candidate global planning surface for Nexus.

It is meant to give Quinn and all working AIs one shared project map:

- what Nexus is trying to become;
- what the major durable work lanes are;
- what progress has already been made;
- what is current now;
- what comes next inside each lane.

This roadmap is intentionally organized by long-lived lanes rather than short-lived task clusters.

## Roadmap status

- Status: candidate for review
- Planning model: lane-based roadmap with per-lane phases
- Current audience: Quinn plus working AIs in Codex, ChatGPT project, and Replit
- Runtime direction: local-first application, portable enough for later publishing, not optimized for public release now

## Governing direction

Nexus is a text-based RPG run from an application.

The application should increasingly hold rules, lore implementation, play aids, TacMaps, state handling, and player-facing structure, while AI becomes more focused on narrative, interpretation, and selective support rather than being the home of the whole game.

Narrative DM play and encounters are one continuous play flow.
Encounter mode should emerge from play when needed, then return cleanly into ongoing scene and campaign state.

## Lane 1 - Core Game and Play Experience

### Purpose

Define and refine what Nexus feels like to actually play.

This lane protects the gameplay identity of Nexus across narrative DM flow, tactical encounters, crew/build/loadout play, campaign consequences, and the growing ruleset.

### Long-range outcome

Nexus plays coherently as a rules-supported text RPG inside an application, with narrative play, encounter play, and progression all following the same underlying game logic.

### Major subtracks

- Narrative DM flow and scene structure
- Encounter structure, tempo, and tactical resolution
- Character, crew, build, and loadout gameplay
- Campaign consequences, route/node progression, and post-scene persistence
- Rule clarification, correction, and controlled playtest evolution

### Phase path

- Early: stabilize the current gameplay rules enough to keep implementing while accepting ongoing playtest change
- Mid: align app behavior, DM behavior, encounter logic, and state updates around the same gameplay model
- Later: deepen noncombat play, exploration, richer scene structure, and broader modern-game features without losing the text-RPG core

### Phase 1 target

- Rules are stable enough that narrative DM play, encounter flow, and post-encounter updates can be implemented without the runtime inventing replacement logic.

### Phase 2 target

- The app, source docs, and AI narrative layer all behave as one gameplay system rather than separate interpretations of Nexus.

### Phase 3 target

- The game expands beyond the baseline loop into stronger noncombat and environment play without losing continuity or pacing.

### Completed or already underway

- Core rules, campaign loop, route/node structure, character systems, equipment systems, combat systems, content systems, and lore source docs already exist in substantial form
- Tactical encounter rules, TacMap process docs, DM dashboard/state summaries, and playtest-ruling capture surfaces already exist
- The project has already proven that narrative DM play can produce real campaign momentum in chat-based playtesting

### Current

- Gameplay rules are implementable now, but expected to keep changing through playtest
- Narrative DM play and encounter play need to feel like one continuous system rather than two loosely related surfaces
- The application does not yet reproduce the level of rule/context support that existed in the prior ChatGPT play surface

### Detailed current work

- Keep the established rules authoritative enough for implementation while explicitly expecting continued change through playtest.
- Identify which rules must be hard-coded now versus which can remain AI-mediated narrative judgment for the moment.
- Prevent runtime drift where the app starts treating local implementation shortcuts as if they were Nexus rules.
- Keep encounter pacing, options, and outcomes tied to the actual gameplay model already developed in source.

### Next

- Preserve established gameplay-rule fidelity while continuing to refine through playtest
- Keep app implementation tied to actual Nexus rules rather than invented local app logic
- Define the minimum reliable narrative-to-encounter-to-narrative loop for app-native play

### Near-term milestone stack

- Milestone 1: the app can carry a scene conversation without immediately feeling disconnected from established Nexus rules.
- Milestone 2: the app can transition from narrative play into encounter mode without a manual conceptual reset.
- Milestone 3: encounter results can update party, resources, objectives, and consequence state in a way that supports continued play.
- Milestone 4: the resulting loop feels like Nexus rather than a generic AI chat plus map tool.

## Lane 2 - Runtime and Play Surfaces

### Purpose

Build the actual surfaces where Nexus is played, tested, viewed, and operated.

This lane covers the local app first, portable runtime assumptions, encounter presentation, DM chat flow inside the app, TacMaps, scene companion imagery, and the overall player-facing structure.

### Long-range outcome

Nexus runs as a strong local-first play surface that feels like the evolution of earlier chat play, but with better visuals, better structure, stronger rule handling, and integrated tactical support.

### Major subtracks

- Local runtime and startup reliability
- DM chat surface and scene interaction UX
- Encounter surface and TacMap presentation
- Rule/state support surfaces and player-facing structure
- Visual support including scene companion imagery and play aids
- Portability safeguards for possible later publishing

### Phase path

- Early: local-first app surface that can support meaningful narrative play and tactical encounters
- Mid: stronger play aids, scene support, continuity support, and integrated rule/state handling
- Later: richer navigation, noncombat environments, animations, and broader modern-game presentation features

### Phase 1 target

- The local app runs reliably for Quinn and can host meaningful narrative play plus encounter resolution.

### Phase 2 target

- The app becomes a coherent primary play surface with stronger state handling, visuals, and rules support.

### Phase 3 target

- The app begins growing into a richer modern game presentation without losing the text-RPG core loop.

### Completed or already underway

- A Nexus app repo exists with a front-end companion surface and API shell
- Replit is actively being used as a coding surface
- Manual encounter test work is already underway in the app effort
- Basic app/runtime architecture exploration has already started instead of remaining only theoretical

### Current

- The app is not yet context-rich enough to be a worthwhile replacement for the prior ChatGPT play surface
- Non-encounter DM chat must work properly inside the app, not only the encounter layer
- Encounter mode should open when narrative play triggers tactical resolution, not behave like a disconnected tool
- Local running should be treated as the immediate priority

### Detailed current work

- Improve the app until normal DM chat is worth using, not only the encounter screen.
- Make the encounter screen something DM chat opens as part of play rather than a separate test utility.
- Keep Replit productive as a coding surface while refusing Replit-hosted assumptions that make local-first use awkward.
- Keep the architecture portable enough that later publication remains possible if desired, without optimizing for public release now.
- Increase the app's usable contextual grounding so it is not obviously starved compared to prior chat play.

### Key first milestone

The app can run narrative DM play, open the encounter surface when play triggers combat or tactical resolution, follow established gameplay rules, and preserve updated state back into ongoing play.

### Next

- Keep the runtime local-first
- Keep the architecture portable enough for later publishing if desired
- Avoid locking the product definition to Replit-hosted assumptions
- Treat the app as the primary encounter and growing playtest surface rather than only a companion

### Near-term milestone stack

- Milestone 1: reliable local startup and a repeatable local run flow.
- Milestone 2: DM chat inside the app is usable for scene play without immediately collapsing into low-context behavior.
- Milestone 3: DM chat can trigger encounter mode, hand over enough tactical state, and continue after resolution.
- Milestone 4: the app feels better than prior chat play in structure and visuals, not merely different.

## Lane 3 - Source Architecture and Project Memory

### Purpose

Maintain the project's canonical knowledge layer and make it usable by humans, AIs, scripts, and the application.

In this roadmap, "source" means the project knowledge and planning layer, primarily the Markdown document system, not just application code.

### Long-range outcome

Nexus has a readable, script-friendly, domain-first project knowledge system that supports archive mining, placement logic, AI orientation, application support, and future tooling with minimal friction.

### Major subtracks

- Domain-first rebuild completion
- Metadata, ID, and routing normalization
- Archive mining and placement-script support
- Human readability and maintenance usability
- AI orientation and structured retrieval support
- Application and script ingestion support

### Phase path

- Early: finish the domain-first rebuild and governance-surface cleanup
- Mid: normalize metadata, IDs, routing, and cross-domain boundaries
- Later: validate the structure against archive-mining, placement, ingestion, and future script needs

### Phase 1 target

- The rebuild is complete enough that it can be read as a real domain-first source system instead of a migration scaffold.

### Phase 2 target

- Metadata and routing are consistent enough that scripts do not have to guess ownership or meaning as often.

### Phase 3 target

- The rebuilt system materially reduces friction for archive mining, placement, ingestion, and future automation.

### Completed or already underway

- The domain-first rebuild repo exists
- Full live source migration into the rebuild repo has been completed at the Markdown-document level
- The rebuild repo now represents all 186 live `00 Source` Markdown docs
- Pilot-domain deep consolidation has already started
- Admin, Modes, Skills, Reference, Data, Art, Automation, Core, Content, Lore, and Play Aids now have rewritten control/index surfaces in the rebuild repo

### Current

- The original driver for this lane remains active: improve archive mining and placement scripting
- This lane is also expected to improve long-term readability, AI usability, app/script ingestion, and future tooling in general
- Live `00 Source` remains protected while the rebuild matures
- Remaining work includes Phase 8 cleanup, metadata normalization, and deeper domain-by-domain consolidation

### Detailed current work

- Finish the remaining Phase 8 governance/index cleanup.
- Normalize metadata after the corpus has stabilized enough to avoid churn.
- Deep-consolidate pilot and non-pilot domains where migrated bodies still teach the old slot/package model.
- Keep the rebuild valuable not only for archive mining but also for future app work, AI orientation, and script reliability.
- Avoid promoting unreviewed candidate structure into live source too early.

### Next

- Finish the remaining rebuild governance cleanup
- Normalize metadata and cross-domain routing after the corpus settles
- Continue domain-by-domain consolidation where scaffold migration is not enough
- Keep this lane optimized for minimizing friction and maximizing usability across all downstream consumers

### Near-term milestone stack

- Milestone 1: Phase 8 governance cleanup is complete.
- Milestone 2: Phase 9 metadata and routing normalization is complete enough for reliable machine use.
- Milestone 3: pilot-domain and adjacent-domain consolidation removes the worst old-model body language.
- Milestone 4: archive-mining and placement scripts can use the rebuilt structure with meaningfully lower friction.

## Lane 4 - Campaign State and Continuity

### Purpose

Make campaign state survivable, resumable, and usable across play surfaces.

This lane covers crew/build/loadout state, mission and node state, faction and world consequences, current objectives, play log/history, and the narrative/mechanical context needed to continue play properly.

### Long-range outcome

The application can carry rich campaign continuity well enough to support real ongoing Nexus play, rather than isolated demo scenes or disconnected tests.

### Major subtracks

- Party and crew state
- Loadout, inventory, and resource state
- Objective, node, and route state
- Faction and world consequence state
- Narrative context, recap, and play-history preservation
- Import/resume versus app-native continuity

### Phase path

- Early: define an app-native continuity model strong enough for new playtests
- Mid: prove that narrative scenes, encounters, and post-scene consequences all update a coherent shared state
- Later: handle richer import/resume problems, including harder legacy campaign continuity cases

### Phase 1 target

- A new campaign or fresh playtest can live inside the app with enough continuity to be worth using.

### Phase 2 target

- Narrative scenes and encounters both read from and update one coherent campaign-state model.

### Phase 3 target

- Harder legacy-campaign carryover, including richer continuity imports, becomes feasible without destroying play quality.

### Completed or already underway

- Current campaign state, playtest rulings, and roadmap/task surfaces already exist in the dashboard/state layer
- The Rook test campaign already has a preserved current-state summary and ongoing continuity notes
- The need for stronger continuity has already been exposed clearly through app-vs-chat comparison

### Current

- The app lacks anywhere near enough context compared to the prior ChatGPT play surface
- Context-window and state-transfer limitations are a major active friction point
- The current app data model contains strange mismatches, including confusing treatment of systems like Lattice RNG

### Detailed current work

- Define what minimum context must be present before app-native play is even worth attempting.
- Separate "new app-native playtest continuity" from the much harder "resume any prior campaign cleanly" problem.
- Correct data-model mismatches where implementation assumptions are bleeding into world logic or gameplay meaning.
- Ensure that continuity includes not only mechanical state but also enough narrative and objective context to support actual play.

### Next

- Start with a strong app-native playtest continuity model rather than trying to solve the hardest legacy import case first
- Use new app-native play as the first proving ground
- Treat richer campaign carryover, including harder Rook-style continuity, as a later and more difficult milestone

### Near-term milestone stack

- Milestone 1: define the minimum continuity payload for worth-using app play.
- Milestone 2: support a new app-native playtest/campaign with stable state across narrative scenes and encounters.
- Milestone 3: preserve enough context that post-encounter play can continue without feeling amputated.
- Milestone 4: begin the harder legacy-campaign continuity work only after the app-native model is proven.

## Lane 5 - AI Workflow and Orchestration

### Purpose

Coordinate how Codex, ChatGPT project, Replit, dashboards, command surfaces, handoffs, and planning artifacts work together.

This lane exists to reduce friction, make targeted work sessions easier, and stop project progress from depending on fragile cross-platform improvisation.

### Long-range outcome

Each AI/work surface has a clear job, the project roadmap is shared and respected, and work can move between platforms without losing structure, intent, or usable context.

### Major subtracks

- Roadmap adoption and governance
- Platform role definition
- ChatGPT project session design
- Codex document/source-management integration
- Replit coding coordination
- Command, function, and dashboard-based orchestration

### Phase path

- Early: establish the roadmap as a shared project-control surface
- Mid: sharpen platform roles, targeted session patterns, and context-pack behavior
- Later: integrate roadmap discipline, command/function surfaces, and multi-platform coordination into normal project operation

### Phase 1 target

- The roadmap becomes the shared top-level planning reference.

### Phase 2 target

- Each platform has a clearer working role and handoff/orientation burden is reduced.

### Phase 3 target

- Coordinated multi-platform work becomes normal rather than improvised.

### Completed or already underway

- Source-first routing guidance already exists
- Mode command and function surfaces already exist
- Operating-model redesign work has already pushed toward Codex-led durable routing with ChatGPT as a more targeted support surface
- The ChatGPT project is already being rethought as a place for targeted drafting, brainstorming, plan interpretation, and platform coordination

### Current

- Exact division of labor between Codex and Replit for implementation is still being discovered
- ChatGPT project now has a clearer role: drafting, brainstorming, interpreting the roadmap, and helping coordinate other platforms
- Usage limits and context limits still materially affect workflow design

### Detailed current work

- Make the roadmap something future AIs can actually work from rather than merely summarize.
- Keep ChatGPT focused on drafting, brainstorming, roadmap interpretation, and cross-platform collaboration.
- Let Codex stay strong on document/source management, planning integration, and structured review work.
- Let Replit remain productive for coding, while still auditing whether it is creating assumptions that weaken the local-first goal.
- Keep role definitions provisional where real evidence is still missing.

### Next

- Make this roadmap a shared orientation artifact for all working AIs
- Use the roadmap to facilitate targeted work sessions in the ChatGPT project
- Keep Codex strong on document/source management and planning integration
- Keep Replit productive for coding while avoiding architecture that blocks local-first use or later portability

### Near-term milestone stack

- Milestone 1: roadmap accepted as shared planning surface.
- Milestone 2: ChatGPT sessions become more targeted and lane-aware.
- Milestone 3: Codex, ChatGPT, and Replit each have a working default role that reduces friction.
- Milestone 4: platform coordination is good enough that context loss stops dominating progress.

## Lane 6 - Content and Expansion

### Purpose

Build the content, backlog material, play aids, and longer-term expansion needed for Nexus to become fully playable and then meaningfully larger.

This lane includes both near-term playability backlog and longer-term future expansion.

### Long-range outcome

Nexus has enough encounter content, TacMaps, lore, assets, play aids, and supporting material to sustain real play, then continues growing into a richer and broader game.

### Major subtracks

- Playability backlog needed now
- Encounter and mission content
- TacMaps, scene support, and play aids
- Current-campaign-supporting rules/lore content
- Visual assets and companion imagery support
- Broader future world/content expansion

### Phase path

- Early: close the playability backlog needed to support real app-native playtests
- Mid: expand reusable content libraries and supporting presentation assets
- Later: grow into broader world, mission, environment, visual, and feature depth

### Phase 1 target

- The project has enough content and support material to make app-native playtests feel legitimate.

### Phase 2 target

- Reusable content libraries and play-support assets exist in enough quantity to reduce manual scene prep friction.

### Phase 3 target

- The game can broaden beyond minimum playability into real expansion and richer world support.

### Completed or already underway

- Major source domains for content, equipment, lore, combat, art direction, play aids, and automation already exist
- TacMap workflows, visual direction docs, and encounter-support materials already exist in source
- Significant backlog material is already captured across source, dashboards, and prior work surfaces

### Current

- This lane must include current backlog, not only future dream expansion
- The minimum playability backlog includes encounter-ready content, TacMaps, current campaign-supporting lore/rules, and the assets/play aids needed to actually run scenes

### Detailed current work

- Treat playability backlog as first-class project work, not a secondary polish pass.
- Prioritize the content needed for real narrative scenes and real encounters inside the app.
- Make sure supporting TacMaps, play aids, and visual/context assets keep pace with runtime needs.
- Use actual app-native play pressure to reveal which backlog content must move now versus later.

### Next

- Treat playability backlog as part of becoming usable now
- Use app-native playtest needs to decide which backlog items must move first
- Expand only after baseline play becomes coherent enough to reveal real priorities

### Near-term milestone stack

- Milestone 1: enough encounter-ready content exists for real app-native combat tests.
- Milestone 2: enough scene-supporting lore/rules/assets exist for meaningful narrative play in the app.
- Milestone 3: TacMaps and play aids are good enough that runtime testing reveals gameplay issues instead of only presentation gaps.
- Milestone 4: backlog pressure eases enough that future expansion can be prioritized on real evidence rather than guesswork.

## Cross-lane milestones

### Milestone A - Shared roadmap adoption

This roadmap is accepted as the shared top-level project map for Quinn and working AIs.

### Milestone B - App-native playable loop

The app can support narrative DM play, open encounter mode when needed, run the encounter coherently, and preserve updated state back into play.

### Milestone C - Rebuild usable for scripts

The domain-first source rebuild is complete enough to materially improve archive mining, placement logic, and future script reliability.

### Milestone D - Strong app-native continuity

A new campaign or playtest can live primarily inside the app without feeling dramatically context-starved compared to prior chat play.

## Current roadmap reading

If only one snapshot is needed right now:

- most structurally mature lane: `Source Architecture and Project Memory`
- highest-friction lane: `Campaign State and Continuity`
- most important product-direction lane: `Runtime and Play Surfaces`
- most important experience rule: narrative DM play and encounters are one continuous play flow

## Review questions

- Are the six lanes correct as durable top-level tracks?
- Is the first app-native playable milestone framed correctly?
- Does the continuity lane start in the right place, or should legacy campaign carryover move earlier?
- Should this roadmap eventually replace or supplement the current lighter project roadmap surface?
