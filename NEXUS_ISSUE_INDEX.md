# Nexus Issue Index

Status: active Markdown index
Repo: `quinnlivdahl-cmd/Nexus-App`
Path-registry locator: `docs/admin/nexus-distributed-surfaces.md`

## Purpose

This file is the AI-readable issue and work index for the Nexus app repo.

GitHub Issues are the task packets. This Markdown index explains how those packets relate to the roadmap, readiness, blockers, parked ideas, and completed work. It should remain understandable without a GitHub Projects board.

GitHub Projects may be useful later as a visual board. This file is the first shared planning surface because it is plain Markdown, script-friendly, reviewable in the repo, and easy for Codex, ChatGPT, Replit, and humans to read.

## Controlling Planning Context

- GitHub Issue 42: `Plan Codex Agent and Skill Automation Upgrade for Nexus`
- Latest Issue 42 planning handoff comments for agent/skill/task-intake workflow design
- Historical June roadmap mirror: `docs/nexus-roadmap/ROADMAP.md`
- Historical roadmap lane/issue index: `docs/nexus-roadmap/ROADMAP-INDEX.md`
- Current spatial vertical-slice target: `CORE-PILLARS-001` section 8 in `docs/nexus-game-source/source/Core/Canon Homes`
- Spatial implementation-readiness map: Spatial Vertical Slice Map #57
- Nexus-App canonical source: `docs/nexus-game-source/source`
- Accepted source-direction changes: `docs/adr/README.md`
- Deliberate historical retrieval: `docs/archive/README.md`
- Obsidian Nexus note/index layer: maintained path registry reached through `docs/admin/nexus-distributed-surfaces.md`
- Obsidian source pointer-card layer: `00 Source` within that registered Nexus hub
- Drive payload/workbench lane: maintained path registry reached through `docs/admin/nexus-distributed-surfaces.md`
- ChatGPT Project synced-chat index: `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
- ChatGPT Project non-issue handoff index: `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`

Older slot/admin source documents can provide historical context, but they are not controlling authority for the current Codex-driven admin workflow redesign unless the user explicitly restores them.

## Index Rules

- Keep active work tied to GitHub issue numbers when possible.
- List the full known open GitHub issue queue, not only the currently active issue.
- Keep issue packets small enough to execute and verify.
- Mark blocked tasks as blocked instead of forcing an implementation plan.
- Link prerequisite issues from blocked or parked work.
- Move completed work out of active sections after verification.
- Preserve useful parked ideas without treating them as ready execution work.
- Do not use this index as a substitute for Nexus source authority or app implementation truth.
- When GitHub and this index disagree, refresh the index from GitHub or the latest verified transition file before planning new work.
- When the user references ChatGPT, Stewy, a synced chat, a planning chat, or a non-issue handoff, check `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md` and `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md` before assuming there is no task context.
- Route broad planning, general discussion, speculative architecture, issue-shaping, and next-work exploration to ChatGPT Project by default when local repo inspection or edits are not yet needed.

## Readiness States

- `ready`: scoped, has a clear goal, has validation, and has no known blocking prerequisite.
- `blocked`: useful task, but a prerequisite or decision is missing.
- `parked`: worth preserving, but not near-term execution work.
- `in-progress`: actively being worked in Codex, Replit, GitHub, or another named surface.
- `done`: completed and verified enough to leave the active queue.

## Active Issues

Use this section for ready or in-progress issue packets.

| Issue | Title | State | Planning anchor | Depends on | Next action |
|---|---|---|---|---|---|
| #60 | Rebuild Nexus planning controls for the revised vision | in-progress | Revised planning/control reconciliation | #59 and #30 satisfied | Hermes is synchronizing the live queue, residual scope, and repo-readable control surface on `hermes/issue-60-queue-maintenance` |
| #110 | Resolve and persist one authored Context Action | in-progress | Integration Contract #30 implementation | #109 satisfied | Resolve or disposition the unresolved PR #131 durability-messaging P2, revalidate, and return the candidate for Quintin approval |
| #112 | Create a legal Level-0 Player Character draft | ready | Integration Contract #30 implementation | #107 satisfied | Claim by assigning; implement the pinned provisional Skill Tree draft tracer |

## Known Open GitHub Issues

Last synced: 2026-07-23 by Hermes from the live 27-issue queue while Planning Controls #60 was in progress. For exact current state, verify against GitHub.

### Queue Classification Snapshot

- **Current implementation sequence:** 16 of Integration Contract #30's 19 implementation children remain open (#110-#125); #110 is in progress, #112 is the only unassigned ready child, and the other open children remain blocked by native predecessors. Completed children #107-#109 are recorded under Completed Issues.
- **Current design lanes needing residual-scope reconciliation:** #31, #32, and #68 remain useful, but must use current Skill Tree, Character Profile / Embodiment, and source/ADR terminology rather than historical issue wording.
- **Revised workflow/control sequence:** #60 is in progress; #61 is natively blocked by #60; #62 is natively blocked by #61.
- **Closeout-ready map:** #57 has 12/12 closed decision children and reached its declared Integration Contract #30 destination. Formal closure waits for synchronized, reviewed, merged closeout evidence and does not imply that #30's implementation children are complete.
- **Historical/support triage:** #16, #26, and #50 retain useful accessibility, fixture, and capture concerns but are not ready to execute from their legacy Encounter, Rook/E-43, or retired workflow/path wording.
- **Architecture discovery:** #88 is a separate hosted project-control epic with security and external-account implications. It requires bounded child tickets and an approved read/write architecture before implementation.

### Workflow / Control Lane

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #50 | Define Seed Mode substantive-input capture and mining workflow | needs residual-scope triage | Current planning owners and retired paths | Preserve the substantive-input concern without creating a competing task or memory store |
| #60 | Rebuild Nexus planning controls for the revised vision | in-progress | #59 and #30 satisfied | Live queue and planning-control reconciliation claimed by Hermes |
| #61 | Align the Obsidian project front door and planning history | blocked | #60 native blocker | Premature ready label removed; audit completed #74-#85 work before executing residual vault changes |
| #62 | Regenerate and validate Nexus pointer navigation | blocked | #61 native blocker | Preserve generator ownership; execute only after #61 and distinguish active output from archived card history |
| #88 | Epic: Make the Nexus site GitHub-live and able to start tasks | architecture/discovery epic | Security, identity, hosting, and dispatch decisions | Missing from the prior index; split read-only GitHub synchronization from authenticated write/dispatch work before creating bounded children |

### Spatial Vertical Slice Wayfinder

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #57 | Wayfinder: Make the Nexus spatial vertical slice implementation-ready | closeout-ready map | 12/12 decision children satisfied | Integration Contract #30 reached the map destination; close only after reviewed and merged index synchronization, without implying production implementation is complete |
| #68 | Complete Crew Archive pool and former-PC conversion design | blocked grilling reconciliation | #11 satisfied; source/ADR reconciliation missing | Body and later comments disagree on Crew Archive versus Crew Library authority; reconcile canonical source and accepted ADR implications before assignment |

### Spatial Vertical Slice Implementation

All nineteen issues are native sub-issues of Integration Contract #30. Three are complete and recorded under Completed Issues; the table below contains the 16 open children. GitHub's native dependency graph is authoritative; only an unassigned issue whose blockers are closed may carry `status:ready-for-agent`.

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #110 | Resolve and persist one authored Context Action | in-progress | #109 satisfied | Assigned with open PR #131; resolve the non-outdated durability-messaging P2 and rerun review before approval/merge |
| #111 | Resolve Intent Bar and Lattice behavior through the proven transaction | blocked task | #110 | Typed non-authoritative interpretation proposals and Lattice behavior |
| #112 | Create a legal Level-0 Player Character draft | ready-for-agent | #107 satisfied | Pinned provisional Skill Tree selection and validated draft only |
| #113 | Select starting crew and atomically activate the campaign | blocked task | #110, #112 | One atomic PC, crew, preparation, source-version, and durable campaign activation |
| #114 | Complete the richest-derelict exploration presentation | blocked task | #111, #113 | Second human product/art gate before Tactical and campaign expansion |
| #115 | Prove the core Tactical Pressure tracer | blocked task | #114 | Core actor turn, Timing Entry, AP action, trigger clear, and Location return |
| #116 | Add advanced Tactical Pressure participation and continuity | blocked task | #115 | Full Field Team, initiative blocks, pausing, late entry, overlap, and exit invariants |
| #117 | Resolve Route Node 0 through the persistent Ship | blocked task | #114 | First node, selected Ability, report, autosave, and persistent Ship return |
| #118 | Advance to Level 1 and become Node-1 ready | blocked task | #117 | Validated advancement and durable Node-1 readiness |
| #119 | Complete Route Node 1 with Tactical Pressure and recruitment | blocked task | #116, #118 | Advanced Tactical continuity plus campaign-local recruitment |
| #120 | Complete Route Node 2 and the three-node campaign proof | blocked task | #119 | Third acceptance node, deliberate departure, report, Ship, and complete log |
| #121 | Save, quit, and continue from every supported mode | blocked task | #120 | Exact restoration from all five supported modes |
| #122 | Export and import one valid campaign atomically | blocked task | #121 | Portable package validation, migration fixture, and atomic replacement |
| #123 | Recover honestly from persistence failures | blocked task | #121, #122 | Degraded durability plus recovery export/import round trip |
| #124 | Keep generated performance non-authoritative under failure | blocked task | #120 | Shared proposal adapter, Director failure coverage, and deterministic fallbacks |
| #125 | Prove the final tactical, aftermath, recovery, report, and Ship presentation | blocked task | #123, #124 | Final human product/art and full manual campaign-smoke gate |

### Support / Source / Play Documents

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #26 | Draft pre-node crew sheets, level-up, and loadout display for E-43 | historical fixture/play-doc triage | #31 and #32 in body | Decide whether Rook/E-43 fixture support remains intentional before executing legacy DM-facing wording |
| #31 | Formalize skill focus and ability tree structure for playable drafts | residual source/play-doc triage | none strict for #112 | Current provisional source already supplies a broad playable hierarchy; narrow the remaining modifier, cost, threshold, and progression work before assignment |
| #32 | Improve character chassis and origin sheet usability for play | revised source/play-doc triage | #11 related | Retain standard-sheet and quick-view ownership, but restate it with current Character Profile, Bioform, Embodiment, and Chassis vocabulary |
| #16 | UI readability pass — contrast, font sizes, and backdrop scrims | parked legacy support | none listed | Decide whether this remains companion regression maintenance or becomes a separately scoped spatial accessibility task |

## Blocked Issues

Use this section for tasks that should not be executed until a prerequisite is solved.

| Issue | Title | Missing prerequisite | Blocking issue | Recommended action |
|---|---|---|---|---|
| #111–#125 except #112 | Remaining Integration Contract implementation sequence | Native predecessor issues remain open | GitHub native dependency graph after #109 | Leave blocked children unassigned and without `status:ready-for-agent`; promote only the cleared frontier |
| #61 | Align the Obsidian project front door and planning history | Planning Controls #60 remains open | #60 native dependency | Keep unassigned and without `status:ready-for-agent`; audit #74-#85 overlap after #60 closes |
| #62 | Regenerate and validate Nexus pointer navigation | Obsidian Front Door #61 remains open | #61 native dependency | Keep unassigned and without `status:ready-for-agent`; run only through the owning generator workflow after #61 closes |
| #68 | Complete Crew Archive pool and former-PC conversion design | Issue body, later comments, canonical source, and accepted ADRs disagree on terminology and authority | Source/ADR reconciliation task to be shaped | Do not assign from the current body; first define which Crew Archive / Crew Library changes are proposed and which rules survive |

## Parked Work

Use this section for useful ideas that are not ready, not urgent, or too broad for the current batch.

| Item | Reason parked | Revisit trigger |
|---|---|---|
| UI Readability #16 | Current body targets the legacy Encounter/backdrop surface | Revisit for explicit companion regression maintenance or a newly scoped spatial accessibility task |
| E-43 Crew Sheets #26 | Rook/E-43 is fixture/history rather than the default spatial campaign opening | Revisit if resuming the Rook campaign remains an explicit goal after #31/#32 reconciliation |
| Seed Capture #50 | Predates current planning, bridge, retrieval, and durable-note owners | Revisit only after proving current owners cannot preserve the substantive input |
| GitHub-live Site #88 | Broad hosted read/write epic with identity, permission, audit, replay, deployment, and rollback implications | Revisit after a read-only architecture packet and security boundary are approved |
| GitHub Projects board | Markdown index comes first | Add after issue template and label conventions stabilize |
| MCP/subagents | Later workflow expansion, not required for Issue 42 completion | Revisit after the repo-local workflow proves useful on real issues |
| Exact file-location hardening | Mother Folder and GitHub repo structure still settling | Add exact locations and filenames to agent files after structure stabilizes |
| App snapshot `legacy_paths` refresh | Live vault source has been migrated, but the app-side snapshot was created before live migration | Revisit before source-backed context-pack generation if path traceability matters |

## Completed Issues

Move verified completed work here when it no longer belongs in the active queue.

| Issue | Title | Completed evidence | Follow-up |
|---|---|---|---|
| #109 | Traverse the authored three-area derelict | Authored three-area traversal now includes WASD and click pathing, facing, follower relay and wall recovery, 10-degree and 0.82 exploration camera, focus-loss control recovery, full visible-sprite collision against room-side inner wall faces, legal door throats, concave-corner segment containment, and exact typecheck, focused/default spatial tests, production tracer, build, and diff checks; Quintin accepted the result in-browser and PR #129 merged in merge commit `9806b89` after final independent PASS review | #110 is in progress and #112 is the current unassigned ready frontier |
| #108 | Render and approve the production-intent seed | Reusable version 2 raster assets and manifest, modular nine-slice pressure-room shell, enlarged 40-pixel-per-unit desktop overview, deterministic fallbacks, exact desktop/responsive runtime evidence, spatial and workflow validation, independent Standards/Spec PASS results, and Quintin's human product/art PASS merged through PR #128 | #109 is complete; #110 is in progress and #112 is the current unassigned ready frontier; the accepted seed is a production-intent sample and pipeline direction, not final game-wide textures |
| #107 | Launch one spatial-runtime tracer | New independently runnable React/Pixi spatial app; engine-owned command, event, snapshot, frame, revision, camera, selection, and semantic-animation runtime; versioned Campaign/Location codec; validated fixture; immutable projections; migration inventory; focused scenario; independent review; spatial and companion builds; workflow validation; and manual browser reproduction pass | #108 and #109 completed the first authored exploration frontier; #110 is in progress and #112 is the current unassigned ready frontier |
| #30 | Integrate an implementation-ready vertical slice contract | Final contract published to the live issue body after direct user approval; it consolidates the new spatial-app boundary, runtime authority, validated fixtures, three-node campaign proof, provisional Skill Tree, bounded production-intent presentation, persistence and failure semantics, and headless plus manual acceptance seams; five-reviewer specification review found targeted issues that were fixed before publication | Implementation children #107–#125 are live as native sub-issues with 23 dependency edges; #107 through #109 are complete, #110 is in progress, and #112 is the current unassigned ready frontier |
| #28 | Define Local Aftermath, return-to-Ship, and save contracts | Accepted Local Aftermath, Route Node Resolution, recap, persistent Ship return, recruitment/support/Stranded, departed-Location snapshot, and rolling Campaign Autosave contract; ADR-0093 through ADR-0095 and canonical source reconciliation are current; source index, slice catalog, workflow validation, and independent standards/spec reviews pass | Consumed by Integration Contract #30; production backtracking, rescue generation, and departed-Location evolution remain explicitly unresolved |
| #19 | Define Lattice opportunities, ticker, and partial consequences | Accepted decision contract, ADR-0089 through ADR-0092, and canonical Skills/Art reconciliation define knowledge-safe opportunities, adaptive rules-bound Checks, the nonmodal ticker, hidden Passive Check reporting, and prevalidated special-band consequences; source index, slice catalog, workflow validation, and independent standards/spec reviews pass | Consumed by Integration Contract #30; final ticker placement remains deferred |
| #15 | Add HP / SI editing to actor rows so the GM can track damage during a session | Actor rows now provide inline HP/SI number editing with Enter/blur commit and Escape cancel; rules-core clamping, down/revive transitions, normalized event logging, local persistence, encounter smoke tests, typecheck/build, and a live browser playtest all pass | The `nexus-companion` package path remains a legacy implementation identifier for the single Nexus Game product |
| #22 | Add a minimal Nexus repository README entrypoint | Root `README.md` now links the single-product direction, authority router, canonical source, accepted decisions, spatial implementation-readiness map, local application paths, agent instructions, and GitHub task tracker without duplicating their contents | Keep the README concise and update links only when their authoritative destinations change |
| #67 | Align Nexus Game product identity with the preserved companion regression surface | Repo instructions, domain guidance, operator documentation, and Spatial Vertical Slice Map #57 now describe one Nexus Game product evolving from the existing React/Vite implementation; the former side-by-side companion premise is superseded | Legacy `companion` package and environment-variable names may remain as implementation identifiers until a separately scoped rename is worthwhile |
| #66 | Publish Matt tracker and triage configuration | Tracker files merged through Matt Tracker Configuration PR #71 in merge commit `4ad4eab`; all five live Matt-role labels match the documented mapping; workflow validation and independent review passed | Apply the documented triage roles only during deliberate issue triage; no bulk relabeling was performed |
| #75 | Integrate the current source/ADR authority reconciliation | Source/ADR reconciliation merged through Source Authority Reconciliation PR #86 in merge commit `c557db2`; source-index, source-slice, context-pack, and workflow validation pass on integrated `main` | Foundation for Instruction and Authority Consolidation #74 is complete; authority-sensitive child work may proceed |
| #76 | Retire the obsolete Obsidian source-copy promotion system | Pointer-only Obsidian routing and retirement of the promoter skill, script, package commands, and active references merged through Source-Promotion Retirement PR #87 in merge commit `76ba252`; workflow validation guards against reintroduction | Continue the remaining initial-frontier work in Instruction and Authority Consolidation #74 |
| #77 | Establish one canonical path and Git-operation policy | Single-owner path registry, compatible repo/Obsidian guidance, explicit Git override, and reviewed validation merged through Canonical Nexus Path and Git Policy PR #91 in merge commit `57caff7`; closeout also guards against hardcoded paths under the Nexus worktree parent | Pointer Navigation #62 owns generated-card regeneration; #78 remains the next independent frontier |
| #78 | Supersede the text-RPG finish line and required-reading chain | Spatial-RPG orientation, historical DM-chat classification, roadmap index updates, and Obsidian front-door alignment merged through Spatial Finish-Line Authority PR #93 in merge commit `0d40e4e`; workflow validation and independent review passed | Integration Contract #30 now defines the exact production boundary; #79–#83 completed the epic #74 frontier |
| #79 | Reduce Nexus AGENTS.md to stable instructions and dispatch links | Repo-root instructions reduced from 216 to 68 lines, Obsidian entrypoints reduced to routing and boundaries, scoped instructions retained, and stable dispatch validation merged through Stable Agent Instructions PR #95 in merge commit `ca0ae83`; workflow validation, graph integrity, and independent review passed | #80–#83 remain the consolidation frontier; #84 and #85 remain blocked by their declared dependencies |
| #80 | Consolidate the ChatGPT Project bridge baseline | Two-file ChatGPT Project baseline, retrieval-first context behavior, live Project Sources, separate Project Instructions, and direct GitHub retrieval verification merged through Bridge Baseline PR #97 in merge commit `1f55d22`; workflow validation and independent review passed | #81–#83 remain the consolidation frontier; #85 owns later archival of superseded bridge files |
| #81 | Select one planning owner and retire the competing overlay | Four distinct planning owners, a pointer-only repo `planning/` surface, preserved Obsidian planning history, removal of automatic tool-count planning requirements, and workflow validation guards merged through Planning Ownership PR #98 in merge commit `fcf45b4`; workflow validation and independent review passed | #82 and #83 remain the consolidation frontier; #85 owns later archival of superseded workflow material |
| #82 | Consolidate repo-local Nexus skills | Nine overlapping repo-local skills were reduced to four uniquely owned, discoverable workflows for source maintenance, issue lifecycle, ChatGPT bridge work, and roadmap maintenance; duplicate review, planning, and visual wrappers were retired and regression guards added through Skill Consolidation PR #99 in merge commit `75f68e3`; workflow, index, skill-package, TypeScript, and independent review checks passed | #83 remains the consolidation frontier; #85 owns later archival of superseded workflow material |
| #83 | Reclassify canonical Admin and Modes documents for retrieval | All 21 Admin and 23 Modes documents are explicitly classified; 381 related slices are excluded from default game retrieval; retrieval policy, bridge guidance, and the live ChatGPT Project were updated through Retrieval Authority PR #100 in merge commit `0fa5cff`; source, slice, context-pack, workflow, TypeScript, live retrieval, and independent review checks passed | #84 is now the final-integration frontier; #85 remains blocked by #84 |
| #84 | Replace prose-preserving validation with invariant validation | Exact prose and legacy-layout checks were replaced by named authority, routing, retrieval, path, ADR, planning, bridge, and pointer-surface invariants through Invariant Validation PR #101 in merge commit `761f1ff`; 17 representative fixtures, generated-index checks, affected TypeScript validation, and independent standards/spec reviews passed | #85 is the remaining final-integration issue |
| #85 | Archive superseded checkpoints, syntheses, and transition controls | Twenty-one repo documents/packets and 22 Obsidian notes/pointers were moved behind explicit historical retrieval; active repo, bridge, dashboard, planning, and pointer routes now resolve to current GitHub-first authority; the Drive document mirror is retired through Archive Retrieval PR #103; 191 canonical source files, 1,690 slices, workflow validation, TypeScript, dashboard validation, and independent standards/spec reviews pass | Merge closes final-integration issue #85 and completes epic #74 |
| #74 | Consolidate Nexus Instruction, Authority, and Retrieval Layers | Child issues #75-#85 establish one authority hierarchy, pointer-only Obsidian source navigation, canonical source plus ADR precedence, unique planning/skill owners, the two-file ChatGPT bridge, classified retrieval, invariant validation, and deliberate historical archives; final integration lands through Archive Retrieval PR #103 | Continue ordinary Nexus design and implementation through live GitHub Issues; do not restore retired parallel controls |
| #14 | Define Tactical Pressure activation and participation | Live Grill with Docs accepted explicit triggers, projected participation, three-member Field Team auto-inclusion, Lattice Initiative with Shared Initiative Blocks and late entry, Timing Entries, inactive-Area pause, Surprise Evaluation, all-trigger exit, Location-owned Tactical State, and Passive Bystanders; contract and ADRs published in commit `78fcee6`; workflow validation and independent review passed | Derived Attribute-modifier math remains owned by Skill Focus and Ability Tree #31; future manual entry and fuller split-crew policy must reuse the versioned Tactical Rules Policy |
| local | Add approved domain-first source corpus to app repo | `docs/nexus-game-source/source` | The repo path is now the canonical source home; historical app-copy references are archive context |
| local | Historical domain-source live migration | The retired 2026 migration copied domain-first source into Obsidian and archived the old slot source at `99 Archive\01 Superseded Source\00 Source Slots 2026-06-10` | Preserved as migration provenance; current `00 Source` is pointer-only |
| #42 batch 1 | Establish instruction/index layer | `AGENTS.md`, `NEXUS_ISSUE_INDEX.md`, `NEXUS_TASK_PACKET_TEMPLATE.md`, `NEXUS_HANDOFF_TEMPLATE.md` | Use templates on future issues |
| #7 | Prove local launch and runtime foundation | `corepack pnpm install`, `corepack pnpm run typecheck`, `corepack pnpm run build`, `corepack pnpm run local:dev`; API health returned `{"status":"ok"}` and companion app returned HTTP 200 on 2026-06-15 | Gate C / #9 dependency is satisfied |
| #9 | Build source-backed context pack for app DM runtime | Source Context Pack PR #52 merged to `main` on 2026-06-27 with merge commit `4dd084e4054dd8347adf8848f1b5bc8d116e5cbb`; PR branch fix commit `63265bc` addressed runtime budgeting before merge | Backend AI Routing #10, App-Native Campaign Seed #11, Source Lookup #18, and Prompt Debug Panel #20 are eligible for future sequencing but not started by this closeout |
| #11 | Define first-run starting crew and slice recruitment | Live Wayfinder grilling accepted the out-of-play Crew Library, independent campaign instances, seeded starting selection, organic fiction-driven recruitment, bounded Campaign Director discretion, role-fitting current-level recruit builds, completion-gated Library promotion, and a validated campaign-local slice fixture | Full Crew Library/former-PC normalization and terminology reconciliation remain in #68; standard character-sheet and quick-view presentation remain in #32 |
| #5 | Define the spatial action validation and commit transaction | PR #69 published `docs/game-system-contracts/drafts/Spatial_Action_Validation_and_Commit_Transaction_Contract_rev0.1.md`, the Nexus Game `Freeform Action` glossary term, and ADRs 0074–0077; workflow validation and independent reviews passed | Spatial Vertical Slice Map #57 records the accepted child decision; production implementation remains out of scope |
| #20 | Show the DM's assembled system prompt in a debug panel so rules can be verified mid-session | Commit `414c144` on branch `codex/issue-20-prompt-debug-panel` adds a debug-mode-gated, collapsed DM prompt panel with token estimates, response-scoped prompt capture, localStorage prompt exclusion, typecheck/build validation, browser smoke with mocked OpenAI response, and three-lane review (`PASS`, `PASS_WITH_NOTES`, `PASS_WITH_NOTES`) | Close GitHub issue after PR merge and final evidence comment |
| #42 | Complete Codex agent and task-intake workflow setup | Repo/folder `AGENTS.md`, task packet template, handoff template, issue template, label reference, repo-local skills, closeout/progress rules, and `validate:workflow` all exist and validate | Closed on GitHub after final evidence comment; continue live labels/milestones in #25 |
| #44 | Create ChatGPT Project bridge layer docs | `docs/chatgpt-project-bridge` baseline bridge docs, app `AGENTS.md` pointer, and validator coverage added in commit `464eeab`; final index closeout in follow-up commit | Upload the baseline bridge set to ChatGPT Project only when ready; do not call it refreshed until confirmed or logged |
| #45 | Create source mirror index maintenance workflow | Repo-side source index role documented, deterministic index generator/check scripts added, repo-local maintainer skill added, and `validate:workflow` now checks for stale generated index files | Follow-up rename completed by moving the dated rebuild folder to `docs/nexus-game-source` and updating exact indexed paths, bridge references, validators, and promotion scripts |
| #46 | Finalize ChatGPT bridge baseline and thread title convention | `docs/chatgpt-project-bridge` final baseline updates plus handoff/thread-title convention wiring committed in `9df8037`; issue-index closeout follow-up committed separately | ChatGPT Project still needs an actual upload/searchability confirmation before it can be called refreshed |
| #47 | Create repo-accessible roadmap mirror and maintained issue index | `docs/nexus-roadmap` roadmap mirror/index, `scripts/update-roadmap-index.mjs`, `roadmap:index` scripts, maintainer skill, bridge pointers, and `validate:workflow` roadmap-index checks | ChatGPT Project still needs upload or exact-path retrieval confirmation before the roadmap can be called refreshed there |
| #43 | Design Codex Chat Focus and Session Discipline Workflow for Nexus | Discovery report added to Issue #43, session discipline workflow spec added, repo-local session skill added, task/handoff/bridge templates wired, synced-chat index updated, and `validate:workflow` plus `typecheck` passed | Do not build duplicate-check, observation-mining, or packet-index automation until separate follow-up issues scope them |
| #34 | Define API DM / rules-core authority split | `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md` added in commit `a6b2b91`; final GitHub comment records acceptance coverage and routed follow-up dependencies | Continue the child sequence through #35, #36, #38, #39, #40, and #41 |
| #4 | Define Game Truth, Director, and Context Broker contracts for the slice | `CAMPAIGN_DIRECTOR_HARNESS_AI_CONTRACT_rev0.1.md`, decision handoff, ADRs 0035–0073, glossary updates, and Crew Archive Design #68 routing committed in `a075b82`; workflow validation and independent review returned `PASS` | Contract design is complete; numeric profiles and fixture execution remain implementation calibration, not unfinished design |
| #35 | Define turn transaction for API DM + rules-core play | `docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`; acceptance coverage recorded in the draft and prior issue comment | Closed by Steward cleanup after issue-state drift review |
| #36 | Define game state lanes and mutation boundaries | ChatGPT Draft approval / closeout comment records acceptance coverage and user approval | Closed on GitHub as completed |
| #40 | Define effect and state-delta grammar | `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`; closeout evidence comment records acceptance coverage | Closed on GitHub as completed |
| #41 | Define compact DM context broker contract | `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01_ISSUE_41_SPIRITUAL_APPEND.md`; acceptance coverage section records contract/scaffold coverage | Closed by Steward cleanup after issue-state drift review |
| #38 | Define rules object model for actions, checks, effects, and logs | `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`, `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`, and canonical source reconciliation in `docs/nexus-game-source/source` | TypeScript scaffold explicitly deferred to #4 so #38 does not block #9 |
| #39 | Define check family contract | `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md` plus canonical source reconciliation in `SKILL-RESOLUTION-001` | TypeScript scaffold explicitly deferred to #4 so #39 does not block #9 |
| #48 | Revise ChatGPT bridge workflow for long-chat preservation packets | Bridge refresh rules now include an explicit `Long-Chat Preservation Procedure`; ChatGPT project instructions and bridge README point to it; repo-local and workspace-local closeout-scan skills added for future issue sweeps | ChatGPT Project still needs upload or searchability confirmation before the changed bridge baseline can be called refreshed there |
| #51 | Build Codex visual-output starter toolkit | `docs/visual-output-starter/README.md` and lane examples preserve the starter plan and reusable Nexus assets; active skill routing now uses the installed global visual-output workflow | Add concrete dependency-backed lanes only when a future visual artifact needs them |

## Cleanup Notes

- During this cleanup, an accidental file `DO_NOT_CREATE_TEST.md` was created while checking connector behavior, then emptied and deleted in commit `161c8d38`. It has no project meaning and should not be preserved.

## Future Script Hooks

Future scripts should be able to:

- find this file from the repo root;
- list active, blocked, parked, and completed items;
- detect missing task packet fields;
- identify prerequisite links;
- flag issue-index drift;
- verify referenced local paths exist;
- verify task closeout evidence before an issue is marked complete;
- regenerate and check `docs/nexus-roadmap/ROADMAP-INDEX.md` after roadmap lane mapping or issue linkage changes;
- generate a GitHub final comment from commit and validation evidence;
- generate platform-specific continuation prompts from handoff packets.
- list ChatGPT synced-chat and non-issue handoff packets from `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md` and `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`.
