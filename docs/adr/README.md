# Nexus Decision Index

Status: active decision index
Baseline date: 2026-07-10
Provenance: accepted July 2026 Grill with Docs revised-vision decision session; published as a discoverable package by Revised Vision Decision Baseline #58

## Authority

This directory, [`CONTEXT-MAP.md`](../../CONTEXT-MAP.md), and the [Nexus Game context](../contexts/nexus-game/CONTEXT.md) form the revised product decision baseline. Accepted decisions control product language and planning when they conflict with legacy roadmap, Local Playable Alpha, DM-chat, or Encounter-screen assumptions.

The baseline does not silently rewrite Golden Truth. `docs/nexus-game-source/source` remains canonical game-source authority until Golden Truth Spatial Reconciliation #59 reviews and reconciles the affected source families. Application code remains implementation authority. Conflicts must be reported rather than resolved by implication.

## Conventions

- Decision filenames use a four-digit sequence and descriptive slug: `NNNN-decision-slug.md`.
- Every decision records `status`, `date`, and `provenance` in YAML frontmatter.
- Valid statuses are `proposed`, `accepted`, `deprecated`, `superseded`, and `historical`. A superseded record names its replacement in `superseded_by`.
- Only `accepted` decisions belong to the controlling baseline. Proposed and historical records remain inputs, not authority.
- New decisions append the next sequence number; existing numbers are never reused.
- Initial ADRs #24 is closed, superseded setup history. Minimal Project Operations Context #49 owns separate operations-language work and is not implemented here.

## Accepted decisions

All decisions below were accepted on 2026-07-10 from the Grill with Docs revised-vision decision session and published through Revised Vision Decision Baseline #58.

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
| [0034](0034-every-combatant-rolls-individual-initiative.md) | Every combatant rolls individual Initiative |
