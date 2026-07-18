# Nexus Decision Index

Status: active decision index
Baseline date: 2026-07-10
Provenance: accepted July 2026 Grill with Docs revised-vision decision session; published as a discoverable package by Revised Vision Decision Baseline #58

## Authority

`docs/nexus-game-source/source` is the canonical current textual definition of Nexus. Accepted records in this directory are controlling decisions: when an ADR changes a domain-source claim, the ADR controls that affected claim until the owning source document is reconciled, while unrelated source material remains current.

Reconciliation updates the owning domain document to express the accepted decision and cite the relevant ADR. After reconciliation, the domain document is the primary current-game reference and the ADR remains the durable explanation and provenance for the change. Canonical domain source supplies shared product language; the archived July 2026 synthesis remains decision provenance rather than a parallel glossary. Application code remains implementation authority, and source/code mismatches must be reported rather than resolved by implication.

## Conventions

- Decision filenames use a four-digit sequence and descriptive slug: `NNNN-decision-slug.md`.
- Every decision records `status`, `date`, and `provenance` in YAML frontmatter.
- Valid statuses are `proposed`, `accepted`, `deprecated`, `superseded`, and `historical`. A superseded record names its replacement in `superseded_by`.
- Only `accepted` decisions belong to the controlling baseline. Proposed and historical records remain inputs, not authority.
- New decisions append the next sequence number; existing numbers are never reused.
- Initial ADRs #24 is closed, superseded setup history. Minimal Project Operations Context #49 owns separate operations-language work and is not implemented here.

## Accepted decisions

ADRs 0001–0034 were accepted on 2026-07-10 from the Grill with Docs revised-vision decision session and published through Revised Vision Decision Baseline #58. Later accepted records preserve their own date and provenance.

| ADR | Decision |
|---|---|
| [0001](0001-persistent-locations-use-mode-transitions.md) | Persistent locations use seamless mode transitions |
| [0002](0002-continuous-movement-uses-authored-cover-positions.md) | Continuous movement uses authored cover positions |
| [0003](0003-in-world-interaction-replaces-dm-chat.md) | In-world interaction replaces DM chat |
| [0004](0004-one-route-node-is-one-explorable-location.md) | One Route Node is one explorable Location |
| [0005](0005-hidden-campaign-director-drives-the-adaptive-arc.md) | A hidden Campaign Director drives the adaptive arc |
| [0006](0006-locations-assemble-from-validated-spatial-modules.md) | Locations assemble from validated spatial modules |
| [0007](0007-route-node-locations-are-explorable-places.md) | Route Node Locations are explorable places |
| [0008](0008-ship-time-is-an-explorable-home-phase.md) | Ship Time is an explorable home phase |
| [0009](0009-a-normal-run-builds-a-seven-character-roster.md) | A normal run builds a seven-character Crew Roster |
| [0010](0010-crew-rosters-reset-while-the-crew-archive-persists.md) | Crew Rosters reset while the Crew Archive persists |
| [0011](0011-lattice-100-and-visible-rolls-remain-core.md) | Lattice-100 and visible rolls remain core |
| [0012](0012-turn-based-mode-retains-ap-mp-and-reactions.md) | Turn-Based Mode retains AP, MP, and reactions |
| [0013](0013-preserve-systems-unless-spatial-play-invalidates-them.md) | Preserve systems unless spatial play invalidates them |
| [0014](0014-use-a-fixed-tilted-top-down-camera.md) | Use a fixed Tilted Top-Down camera |
| [0015](0015-characters-use-modular-animated-2d-world-sprites.md) | Characters use modular animated 2D World Sprites |
| [0016](0016-generated-dialogue-and-narration-remain-unvoiced.md) | Generated dialogue and narration remain unvoiced |
| [0017](0017-live-images-illustrate-but-never-define-play.md) | Live images illustrate but never define play |
| [0018](0018-irreversible-captain-loss-ends-the-campaign.md) | Irreversible Captain loss ends the campaign |
| [0019](0019-permanently-lost-crewmates-remain-archived-but-unavailable.md) | Permanently lost Crewmates remain archived but unavailable |
| [0020](0020-default-campaign-saves-preserve-consequences.md) | Default campaign saves preserve consequences |
| [0021](0021-gameplay-is-local-first-but-generative-features-require-a-model.md) | Gameplay is local-first but generative features require a model |
| [0022](0022-context-broker-evolves-into-a-campaign-director-harness.md) | The Context Broker evolves into a Campaign Director Harness |
| [0023](0023-free-movement-uses-wasd-object-clicks-and-automatic-facing.md) | Free Movement uses WASD, object clicks, and Automatic Facing |
| [0024](0024-current-chat-and-dashboard-evolve-into-developer-mode.md) | Current chat and dashboard evolve into Developer Mode |
| [0025](0025-staffed-ship-systems-provide-preparation-and-field-support.md) | Staffed Ship Systems provide preparation and Field Team support |
| [0026](0026-ship-systems-change-through-scarce-modules.md) | Ship Systems change through scarce modules |
| [0027](0027-ship-conflict-does-not-use-a-separate-combat-system.md) | Ship conflict does not use a separate combat system |
| [0028](0028-ship-damage-is-a-persistent-narrative-condition.md) | Ship damage is a persistent narrative condition |
| [0029](0029-additional-ships-are-cross-campaign-frame-unlocks.md) | Additional Ships are cross-campaign frame unlocks |
| [0030](0030-prototype-campaigns-become-fixtures-and-modular-source.md) | Prototype campaigns become fixtures and modular source |
| [0031](0031-each-campaign-begins-with-a-new-player-created-captain.md) | Each campaign begins with a new player-created Captain |
| [0032](0032-character-profiles-create-backstory-threads.md) | Character Profiles create Backstory Threads |
| [0033](0033-individual-variation-uses-aptitude-and-growth-traits.md) | Individual variation uses Aptitude and Growth Traits |
| [0035](0035-model-runtime-is-provider-neutral-and-task-routed.md) | The Model Runtime is provider-neutral and task-routed |
| [0036](0036-game-truth-and-director-state-use-separate-local-lanes.md) | Game Truth and Director State use separate local lanes |
| [0037](0037-generated-performance-uses-local-dialogue-sessions-and-bounded-proposals.md) | Generated Performance uses local Dialogue Sessions and bounded proposals |
| [0038](0038-enemy-tactical-intent-is-model-proposed-and-locally-executed.md) | Enemy tactical intent is model-proposed and locally executed |
| [0039](0039-model-spend-caps-protect-active-scene-completion.md) | Model spend caps protect active-scene completion |
| [0040](0040-director-planning-is-checkpoint-triggered-and-prepares-each-node.md) | Director planning is checkpoint-triggered and prepares each node |
| [0041](0041-campaigns-open-with-a-director-selected-node-zero.md) | Campaigns open with a Director-selected Node 0 |
| [0042](0042-player-character-and-ship-ownership-are-separate.md) | Player Character identity and Ship ownership are separate |
| [0043](0043-downtime-is-location-neutral-between-route-nodes.md) | Downtime is location-neutral between Route Nodes |
| [0044](0044-transit-normally-connects-distinct-route-node-locations.md) | Transit normally connects distinct Route Node Locations |
| [0045](0045-route-prospects-show-deterministic-travel-consequences.md) | Route Prospects show deterministic Travel Consequences |
| [0046](0046-route-choice-precedes-deployment-preparation.md) | Route Choice precedes Deployment Preparation |
| [0047](0047-four-stage-node-transition-planning-is-provisional.md) | Four-stage node-transition planning is provisional |
| [0048](0048-route-choices-mix-main-thread-and-consequential-side-paths.md) | Route Choices mix main-thread and consequential side paths |
| [0049](0049-campaign-pressure-creates-non-obvious-consequential-route-choices.md) | Campaign pressure creates non-obvious consequential Route Choices |
| [0050](0050-unchosen-route-prospects-normally-lapse.md) | Unchosen Route Prospects normally lapse |
| [0051](0051-the-final-three-route-nodes-form-an-order-sensitive-climax-set.md) | The final three Route Nodes form an order-sensitive Climax Set |
| [0052](0052-the-climax-is-communicated-through-diegetic-convergence.md) | The climax is communicated through diegetic convergence |
| [0053](0053-climax-order-effects-are-dynamically-replanned.md) | Climax order effects are dynamically replanned |
| [0054](0054-node-ten-hosts-the-playable-finale-and-resolution-follows.md) | Node 10 hosts the Playable Finale and Campaign Resolution follows |
| [0055](0055-campaign-resolution-separates-closure-planning-from-epilogue-performance.md) | Campaign Resolution separates closure planning from epilogue performance |
| [0056](0056-campaign-resolution-preserves-material-unresolved-threads.md) | Campaign Resolution preserves material unresolved threads |
| [0057](0057-completed-campaigns-append-retrievable-saga-sources.md) | Completed campaigns append retrievable Saga Sources |
| [0058](0058-campaigns-create-bounded-world-consequences.md) | Campaigns create bounded world consequences |
| [0059](0059-campaign-reach-and-legacy-consequence-scope-are-separate.md) | Campaign Reach and Legacy Consequence scope are separate |
| [0060](0060-legacy-world-campaigns-advance-one-forward-sequence.md) | Legacy World campaigns advance one forward sequence |
| [0061](0061-legacy-worlds-use-literal-calendar-chronology.md) | Legacy Worlds use literal calendar chronology |
| [0062](0062-campaign-start-dates-follow-player-and-crew-selection.md) | Campaign start dates follow player and crew selection |
| [0063](0063-legacy-worlds-have-bounded-between-campaign-developments.md) | Legacy Worlds have bounded between-campaign developments |
| [0064](0064-world-timeline-is-reference-not-a-forced-recap.md) | World Timeline is reference, not a forced recap |
| [0065](0065-world-timeline-is-public-while-the-director-can-use-secret-canon.md) | World Timeline is public while the Director can use secret canon |
| [0066](0066-crewmates-age-but-stasis-suspends-biological-aging.md) | Crewmates age but Stasis suspends biological aging |
| [0067](0067-aged-out-crewmates-remain-living-world-characters.md) | Aged-out Crewmates remain living world characters |
| [0068](0068-validated-legacy-consequences-promote-automatically.md) | Validated Legacy Consequences promote automatically |
| [0069](0069-early-campaign-loss-still-enters-the-legacy-world.md) | Early campaign loss still enters the Legacy World |
| [0070](0070-surviving-player-characters-become-archive-crewmates.md) | Surviving Player Characters become Archive Crewmates |
| [0071](0071-campaigns-start-at-level-zero-and-advance-before-node-one.md) | Campaigns start at level 0 and advance before Node 1 |
| [0072](0072-character-state-has-five-persistence-layers.md) | Character state has five persistence layers |
| [0073](0073-character-identity-is-separate-from-embodiment.md) | Character identity is separate from Embodiment |
| [0074](0074-proximity-actions-use-linked-staged-commits.md) | Proximity actions use linked staged commits |
| [0075](0075-clarification-is-a-rare-player-agency-safeguard.md) | Clarification is a rare player-agency safeguard |
| [0076](0076-freeform-actions-use-existing-rules-beyond-authored-actions.md) | Freeform Actions use existing rules beyond authored actions |
| [0077](0077-freeform-actions-confirm-only-consequential-interpretations.md) | Freeform Actions confirm only consequential interpretations |
| [0078](0078-tactical-pressure-begins-from-explicit-validated-triggers.md) | Tactical Pressure begins from explicit validated triggers |
| [0079](0079-tactical-participation-projects-existing-location-truth.md) | Tactical Participation projects existing Location truth |
| [0080](0080-tactical-participation-changes-only-at-commit-boundaries.md) | Tactical Participation changes only at commit boundaries |
| [0081](0081-every-participating-actor-rolls-individual-initiative.md) | Every participating actor rolls individual Initiative |
| [0082](0082-late-entrants-join-initiative-without-interrupting.md) | Late entrants join Initiative without interrupting |
| [0083](0083-lattice-initiative-uses-descending-team-flexible-order.md) | Lattice Initiative uses descending team-flexible order |
| [0084](0084-nexus-uses-familiar-attributes-with-combat-replacing-strength.md) | Nexus uses familiar Attributes with Combat replacing Strength |
| [0085](0085-timed-hazards-and-objectives-use-rules-native-entries.md) | Timed hazards and objectives use rules-native entries |
| [0086](0086-tactical-pressure-ends-when-every-trigger-clears.md) | Tactical Pressure ends when every trigger clears |
| [0087](0087-overlapping-triggers-compose-one-tactical-pressure-period.md) | Overlapping triggers compose one Tactical Pressure period |
| [0088](0088-campaign-saves-serialize-location-owned-tactical-state.md) | Campaign Saves serialize Location-owned Tactical State |
| [0089](0089-lattice-ticker-placement-is-deferred.md) | Lattice Ticker placement is deferred |
| [0090](0090-check-opportunities-are-team-aware-and-knowledge-safe.md) | Check Opportunities are team-aware and knowledge-safe |
| [0091](0091-adaptive-checks-compose-existing-mechanics.md) | Adaptive Checks compose existing mechanics |
| [0092](0092-special-result-bands-require-prevalidated-effects.md) | Special result bands require prevalidated effects |
| [0093](0093-day-one-departed-locations-restore-committed-snapshots.md) | Day-one departed Locations restore committed snapshots |
| [0094](0094-in-location-recruitment-preserves-a-three-character-field-team.md) | In-Location recruitment preserves a three-character Field Team |
| [0095](0095-day-one-campaigns-use-one-rolling-autosave.md) | Day-one campaigns use one rolling autosave |

## Superseded decisions

| ADR | Decision | Replacement |
|---|---|---|
| [0034](0034-every-combatant-rolls-individual-initiative.md) | Every combatant rolls individual Initiative | [0081](0081-every-participating-actor-rolls-individual-initiative.md) |
