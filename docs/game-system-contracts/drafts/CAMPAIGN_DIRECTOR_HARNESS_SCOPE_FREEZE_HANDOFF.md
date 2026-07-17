# Campaign Director Harness Scope Freeze and Compaction Handoff

- Date: 2026-07-12
- Status: scope corrected; AI-contract formalization complete locally and independently reviewed
- Controlling ticket: [Define Game Truth, Director, and Context Broker contracts for the slice #4](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/4)
- Parent map: [Make the Nexus spatial vertical slice implementation-ready #57](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/57)
- Working contract: `docs/game-system-contracts/drafts/CAMPAIGN_DIRECTOR_HARNESS_CONTRACT_WORKING_DRAFT.md`
- Completion candidate: `docs/game-system-contracts/drafts/CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md`

## Controlling resume boundary — 2026-07-12 correction

All accepted decisions in the working contract, ADRs, glossary, and research audit remain preserved. The expanded grill legitimately recorded product decisions, but the active completion scope is now narrowed to the original purpose of AI Contracts #4: define the role, authority, inputs, outputs, call timing, validation, recovery, cost, and evaluation contracts for generated systems.

After context compaction, continue only these AI-contract surfaces:

1. Campaign Director Harness and provider-neutral Model Runtime task profiles and adapter boundary.
2. Game Truth, approved history, Director State, character-knowledge, and Context Broker authority and AI-facing slices.
3. Dialogue Sessions, Generated Performance, Structured Proposals, dependency validation, Proposal Transactions, request safety, and recovery.
4. Planning Checkpoint call sequences and the typed AI artifacts they consume or propose, without redesigning the underlying campaign mechanics.
5. Tactical Directive proposal and deterministic enemy-controller boundary.
6. Cost budgets, Scene Completion Reserve, routing, fallbacks, traces, Developer Mode replay, fixtures, and calibration.
7. Resolution Brief, epilogue, Saga visibility, and other closing AI artifacts only to the extent needed to define model authority and call contracts.

Do not continue designing Crew Archive pools, recruitment eligibility, Converted Crewmate Packages, Legacy Allowance, Campaign-Earned Traits, Embodiment selection, recruit build construction, or progression economy in this session. Those accepted decisions are retained as dependencies and have been routed to [Complete Crew Archive pool and former-PC conversion design #68](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/68). Progression rewards, spend costs, milestones, and balance remain outside both the AI contract and Crew Archive Design #68 unless separately scoped.

## Preserved expanded decision boundary

The grill produced and preserves an expanded set of campaign decisions. These remain accepted inputs, but this list no longer defines the work to resume after compaction; the controlling resume boundary above does.

The preserved decision boundary includes:

1. Campaign Director Harness and provider-neutral Model Runtime.
2. Game Truth, approved change history, private Director State, character knowledge, and Context Broker authority.
3. Dialogue Sessions, generated performance, structured proposals, deterministic validation, atomic commit, request safety, recovery, routing, cost controls, and Developer Mode evidence.
4. Enemy tactical intent proposed by a model and executed by deterministic local control.
5. Campaign initialization, optional Captain role, Ship provision, Node 0, level-0 opening, Node 0 Advancement, Downtime, Route Choice, Transit, deployment, and pre-node planning.
6. Campaign pressure, opportunity cost, Route Prospect lifecycle, and the provisional call pipeline.
7. The order-sensitive Nodes 8–10 Climax Set, Playable Finale, Campaign Resolution, and Early Campaign Resolution.
8. Legacy World chronology, Saga Sources, public World Timeline, secret canon, bounded world consequences, character aging baseline, and former-Player-Character conversion.

Within this session, source reconciliation, contradiction repair, exact schemas, state machines, fixtures, calibration, and controlled ADR amendments are permitted only for the AI-contract surfaces listed in the controlling resume boundary. Schemas or state machines for Crew Archive pools, recruitment, former-PC conversion, Embodiment, or progression belong to Crew Archive and Conversion Design #68 or another separately scoped ticket. The preserved decisions below remain inputs; they do not authorize resumed non-AI product design or production implementation.

## Authority and durable artifacts

Resume work from these sources in order:

1. Project and repository `AGENTS.md` instructions.
2. The full `grill-with-docs` skill instructions.
3. This handoff.
4. `docs/game-system-contracts/drafts/CAMPAIGN_DIRECTOR_HARNESS_CONTRACT_WORKING_DRAFT.md`.
5. `docs/game-system-contracts/drafts/CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md`.
6. `docs/contexts/nexus-game/CONTEXT.md` and its authority map.
7. `docs/adr/README.md` and accepted ADRs 0035–0073, plus amended earlier ADRs listed in the working tree.
8. `docs/game-system-contracts/research/CHARACTER_CHASSIS_SOURCE_AUDIT_2026-07-12.md` as completed dependency research, not as permission to continue character-system design.
9. [Complete Crew Archive pool and former-PC conversion design #68](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/68) only as the routing destination for deferred crew/conversion work.

The working contract is the consolidated session record. Accepted ADRs and the glossary remain the durable decision vocabulary. Any conflict discovered in older source must be surfaced rather than silently resolved in favor of whichever file was read last.

## Accepted architecture in compact form

- Nexus uses a deterministic Campaign Director Harness, not a mega-agent. Specialized calls are logically stateless and task-routed through a provider-neutral runtime that can later support OpenAI, Ollama, and reasonable alternative providers.
- Nexus owns authoritative state, context assembly, dialogue history, validation, recovery, and normalized traces. Model output proposes; deterministic systems validate and commit.
- Game Truth is the current authoritative snapshot with approved change history. Private Director State stores bounded possibilities and plans but cannot establish events as facts.
- Dialogue uses a locally owned Dialogue Session and a new call for each NPC response. The active transcript preserves conversational continuity; committed outcomes and compact summaries persist afterward.
- Generated work uses typed proposals with dependency-aware validation and atomic, idempotent Proposal Transactions. Stale, duplicate, cancelled, or unsafe output cannot commit or display.
- Model spend is controlled per task with configurable budgets, conservative preflight pricing, and a protected Scene Completion Reserve. Normal play checks validity, not prose quality; Developer Mode supports explicit replay and comparison.
- Enemy AI receives at most one model-proposed Tactical Directive at Tactical Pressure start. Deterministic local logic executes all legal actions and contingencies.

## Accepted campaign lifecycle in compact form

- The Player Character is always group leader. Captain is an optional Ship ownership and command role.
- Every campaign has a Ship: a Player Character Captain selects one, a Captain Starting Crewmate brings a profile-bound one, or the Director provides one through Node 0 fiction without normally making acquisition the node premise.
- Everyone begins Node 0 at level 0 with a complete usable build. After Node 0 and the first confirmed Route Choice, everyone advances to level 1 before Node 1 Deployment Preparation.
- Node 0 is outside the ten Route Nodes. After Player Character and Starting Crew selection, the opening sequence establishes the Main Campaign Thread, proposes a valid start date and bounded Interval Developments in Legacy Worlds, selects Node 0, and builds its plan.
- Downtime is the location-neutral between-node phase. The player confirms a Route Choice before Field Team, loadout, and Ship Assignment preparation. Literal Ship Transit normally follows, while generated Transit Events are optional.
- Each Route Prospect set contains at least three meaningful, non-dominated choices with incentives, opportunity costs, pressure, and no player-facing main-story label. Unchosen prospects normally lapse; exceptional reoffers must return materially worse or costlier and cite their cause.
- The ordinary quality-first transition baseline is four model calls: campaign update, Route Prospect generation, selected-node plan, and deployment adaptation. This pipeline is provisional and must earn its cost through fixtures and playtests.
- After Node 7, three previously seeded climax fronts lock for Nodes 8–10 and can be played in any order. Order produces persistent advantage and worsens or closes another opportunity. The final remaining node hosts the Playable Finale, which need not be combat.
- After Node 10, one call proposes a validated Resolution Brief and a second performs the narration or epilogue. Material unresolved threads may persist. Early Player Character Permanent Loss instead triggers Early Campaign Resolution.
- A Legacy World advances sequentially on a literal World Calendar. Each campaign adds bounded validated world consequences and one public timeline tick; secret canon remains available only to the Director until validly revealed.
- Surviving former Player Characters enter the Crew Archive while preserving their Character Profile, current committed Embodiment, supported memories, and evidence-backed conversion inputs. Those with a legal level-0 Converted Crewmate Package may be Starting Crew candidates; over-budget characters remain archived and may enter the later current-level recruitment candidate pool without guaranteed appearance. Detailed package and pool rules are owned by Crew Archive and Conversion Design #68. Raw transcripts do not enter future prompts.

## AI-contract formalization disposition

The formalization sequence from the prior compaction is now represented in `CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md`:

- Initial AI task inventory and profile-class mapping.
- Provider adapter, request ownership, lifecycle, Context Packet, manifest, response, usage, cancellation, fallback, and cost-admission envelopes.
- Dependency, proposal, validation, Proposal Transaction, stale-result, idempotency, recovery, and safe-failure schemas.
- Exact AI-facing call sequences for Campaign Opening, ordinary node transitions, material scene checkpoints, dialogue, Tactical Pressure, and Campaign Resolution.
- Tactical Directive and deterministic enemy-controller handoff.
- Trace, replay, retention, Scene Completion Reserve, fixture, and calibration boundaries.

Contract validation and contradiction review against the older authority and transaction drafts are complete. Numeric model assignments, token budgets, timeouts, archive caps, reserve prices, and fixture thresholds remain implementation calibration rather than unfinished product decisions.

## Deferred beyond the freeze

- Crew Archive pool, Starting Crew and later Recruitment eligibility, Converted Crewmate Packages, Legacy Allowance, Campaign-Earned Traits, Embodiment selection, and related player-facing design are routed to [Crew Archive and Conversion Design #68](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/68). Their accepted decisions remain inputs; do not formalize them in AI Contracts #4.
- Progression rewards, point income, spend costs, milestone cadence, Ability balance, and level-up package contents remain separately out of scope.
- Detailed aging, retirement, and long-term NPC simulation beyond the accepted simple baseline.
- Shared public/server timelines, multiplayer canon governance, moderation, privacy, concurrency, and rollback.
- Tactical replanning through new model calls at encounter phase changes.
- Production implementation, migration, or issue closure.

## Next work after AI-contract completion

Character/chassis research and AI-contract formalization are complete as candidate documentation. No additional AI product-design question is known. Work from existing accepted campaign decisions as opaque requirements and identifiers; do not reopen or deepen their product mechanics unless the user explicitly changes scope.

If work resumes, the sequence is:

1. Treat `CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md` as the completed local candidate for AI Contracts #4.
2. Await explicit authorization before commit, push, GitHub evidence, or issue closure.
3. In a separately authorized implementation session, instantiate numeric profiles, implement adapters and validators, and execute the fixture/calibration suite.
4. Route any crew/conversion gap to Crew Archive and Conversion Design #68 rather than reopening it here.

If crew, conversion, recruitment, progression, or Embodiment detail appears necessary, reference the accepted term or identifier and route the missing product decision to Crew Archive and Conversion Design #68 rather than solving it here.

## Workspace and publication state

- Historical session worktree: `C:\Users\Quintin Livdahl\Repos\Nexus-App-Worktrees\Nexus-App-Clean-Review-2026-07-06`. Current local path facts are owned by the registry reached through `docs/admin/nexus-distributed-surfaces.md`.
- The repository contains unrelated modified and untracked user work, especially under `.github`, `artifacts`, `pnpm-lock.yaml`, and project-operation docs. Preserve it and do not clean, revert, stage, or overwrite it.
- This session has made documentation-only changes: amended earlier ADRs, new ADRs 0035–0073, glossary updates, the working contract, the completed AI contract, the completed character/chassis research audit, and this handoff.
- [Crew Archive and Conversion Design #68](https://github.com/quinnlivdahl-cmd/Nexus-App/issues/68) exists live on GitHub as the separate owner for crew-pool and former-PC conversion design. Its `NEXUS_ISSUE_INDEX.md` routing entry and the contract documentation remain local and uncommitted. No commit, push, pull request, production implementation, or other GitHub closeout mutation has been performed.

## Validation state

After formalization and targeted review fixes, `corepack pnpm run validate:workflow`, targeted `git diff --check`, the contract trailing-whitespace check, the balanced-code-fence check, and the stale-field-name check all passed. Final independent review returned `PASS` with no findings. After any continued editing, rerun the same checks before claiming the state is ready.

## Resume instruction

After compaction, reload the required instructions and durable artifacts above and treat the AI-contract completion candidate as locally complete. Do not restart the grill, repeat character/chassis research, or continue Crew Archive, recruitment, conversion, progression, or Embodiment product design. Reference accepted decisions as dependencies and route any missing detail to Crew Archive and Conversion Design #68. Do not implement production code, commit, push, or close AI Contracts #4 without separate authorization.
