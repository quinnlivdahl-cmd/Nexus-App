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
- App transition control: `NEXUS_ISSUE_TRANSITION.md`
- Current spatial vertical-slice target: `CORE-PILLARS-001` section 8 in `docs/nexus-game-source/source/Core/Canon Homes`
- Spatial implementation-readiness map: Spatial Vertical Slice Map #57
- Historical DM-chat alpha plan: `NEXUS_LOCAL_PLAYABLE_ALPHA.md`
- Nexus-App canonical source: `docs/nexus-game-source/source`
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
| #31 | Formalize skill focus and ability tree structure for playable drafts | ready | Source / Play Document Tasks | none strict | Open Draft chat for ability and Skill Focus schema contract |

## Known Open GitHub Issues

Last synced: 2026-07-16 by Codex during the four-issue closeout batch. The queue below reflects the completed status of #66, #67, #22, and #15; for exact current state, verify against GitHub.

### Workflow / Control Lane

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #50 | Define Seed Mode substantive-input capture and mining workflow | workflow/mode behavior | #43 related | Seed-specific capture and mining workflow |
| #60 | Rebuild Nexus planning controls for the revised vision | ready-for-agent | none listed | Revised planning-control work |
| #61 | Align the Obsidian project front door and planning history | ready-for-agent | #60 related | Obsidian planning alignment |
| #62 | Regenerate and validate Nexus pointer navigation | ready-for-agent | #60 and #61 related | Pointer and navigation validation |

### Spatial Vertical Slice Wayfinder

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #57 | Wayfinder: Make the Nexus spatial vertical slice implementation-ready | map | child decisions | Canonical map for the implementation-ready first vertical slice |
| #19 | Define Lattice opportunities, ticker, and partial consequences | grilling | #5 satisfied | Open, unassigned frontier decision |
| #28 | Define Local Aftermath, return-to-Ship, and save contracts | grilling | #4 and #12 satisfied | Open, unassigned frontier decision |
| #30 | Integrate an implementation-ready vertical slice contract | grilling | remaining map decisions | Blocked integration ticket |
| #68 | Complete Crew Archive pool and former-PC conversion design | related grilling | #11 satisfied; #32 related | Must reconcile accepted Crew Library, independent-instance, organic-recruitment, and promotion decisions from #11 |

### Support / Source / Play Documents

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #26 | Draft pre-node crew sheets, level-up, and loadout display for E-43 | source/play doc | none listed | Draft-facing play support |
| #31 | Formalize skill focus and ability tree structure for playable drafts | source/play doc | none listed | Skill/ability structure; recommended next Draft chat |
| #32 | Improve character chassis and origin sheet usability for play | source/play doc | #11 related | Owns the standard sheet and quick-view comparison used by starting-crew selection |
| #16 | UI readability pass — contrast, font sizes, and backdrop scrims | support | none listed | Legacy companion usability work |

## Blocked Issues

Use this section for tasks that should not be executed until a prerequisite is solved.

| Issue | Title | Missing prerequisite | Blocking issue | Recommended action |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Start or update a prerequisite task packet |

## Parked Work

Use this section for useful ideas that are not ready, not urgent, or too broad for the current batch.

| Item | Reason parked | Revisit trigger |
|---|---|---|
| GitHub Projects board | Markdown index comes first | Add after issue template and label conventions stabilize |
| MCP/subagents | Later workflow expansion, not required for Issue 42 completion | Revisit after the repo-local workflow proves useful on real issues |
| Exact file-location hardening | Mother Folder and GitHub repo structure still settling | Add exact locations and filenames to agent files after structure stabilizes |
| App snapshot `legacy_paths` refresh | Live vault source has been migrated, but the app-side snapshot was created before live migration | Revisit before source-backed context-pack generation if path traceability matters |

## Completed Issues

Move verified completed work here when it no longer belongs in the active queue.

| Issue | Title | Completed evidence | Follow-up |
|---|---|---|---|
| #15 | Add HP / SI editing to actor rows so the GM can track damage during a session | Actor rows now provide inline HP/SI number editing with Enter/blur commit and Escape cancel; rules-core clamping, down/revive transitions, normalized event logging, local persistence, encounter smoke tests, typecheck/build, and a live browser playtest all pass | The `nexus-companion` package path remains a legacy implementation identifier for the single Nexus Game product |
| #22 | Add a minimal Nexus repository README entrypoint | Root `README.md` now links the single-product direction, authority router, canonical source, accepted decisions, spatial implementation-readiness map, local application paths, agent instructions, and GitHub task tracker without duplicating their contents | Keep the README concise and update links only when their authoritative destinations change |
| #67 | Align Nexus Game product identity with the preserved companion regression surface | Repo instructions, domain guidance, operator documentation, and Spatial Vertical Slice Map #57 now describe one Nexus Game product evolving from the existing React/Vite implementation; the former side-by-side companion premise is superseded | Legacy `companion` package and environment-variable names may remain as implementation identifiers until a separately scoped rename is worthwhile |
| #66 | Publish Matt tracker and triage configuration | Tracker files merged through Matt Tracker Configuration PR #71 in merge commit `4ad4eab`; all five live Matt-role labels match the documented mapping; workflow validation and independent review passed | Apply the documented triage roles only during deliberate issue triage; no bulk relabeling was performed |
| #75 | Integrate the current source/ADR authority reconciliation | Source/ADR reconciliation merged through Source Authority Reconciliation PR #86 in merge commit `c557db2`; source-index, source-slice, context-pack, and workflow validation pass on integrated `main` | Foundation for Instruction and Authority Consolidation #74 is complete; authority-sensitive child work may proceed |
| #76 | Retire the obsolete Obsidian source-copy promotion system | Pointer-only Obsidian routing and retirement of the promoter skill, script, package commands, and active references merged through Source-Promotion Retirement PR #87 in merge commit `76ba252`; workflow validation guards against reintroduction | Continue the remaining initial-frontier work in Instruction and Authority Consolidation #74 |
| #77 | Establish one canonical path and Git-operation policy | Single-owner path registry, compatible repo/Obsidian guidance, explicit Git override, and reviewed validation merged through Canonical Nexus Path and Git Policy PR #91 in merge commit `57caff7`; closeout also guards against hardcoded paths under the Nexus worktree parent | Pointer Navigation #62 owns generated-card regeneration; #78 remains the next independent frontier |
| #78 | Supersede the text-RPG finish line and required-reading chain | Spatial-RPG orientation, historical DM-chat classification, roadmap index updates, and Obsidian front-door alignment merged through Spatial Finish-Line Authority PR #93 in merge commit `0d40e4e`; workflow validation and independent review passed | Integration Contract #30 still owns the exact production boundary; #79–#83 are now the epic #74 frontier |
| #79 | Reduce Nexus AGENTS.md to stable instructions and dispatch links | Repo-root instructions reduced from 216 to 68 lines, Obsidian entrypoints reduced to routing and boundaries, scoped instructions retained, and stable dispatch validation merged through Stable Agent Instructions PR #95 in merge commit `ca0ae83`; workflow validation, graph integrity, and independent review passed | #80–#83 remain the consolidation frontier; #84 and #85 remain blocked by their declared dependencies |
| #80 | Consolidate the ChatGPT Project bridge baseline | Two-file ChatGPT Project baseline, retrieval-first context behavior, live Project Sources, separate Project Instructions, and direct GitHub retrieval verification merged through Bridge Baseline PR #97 in merge commit `1f55d22`; workflow validation and independent review passed | #81–#83 remain the consolidation frontier; #85 owns later archival of superseded bridge files |
| #81 | Select one planning owner and retire the competing overlay | Four distinct planning owners, a pointer-only repo `planning/` surface, preserved Obsidian planning history, removal of automatic tool-count planning requirements, and workflow validation guards merged through Planning Ownership PR #98 in merge commit `fcf45b4`; workflow validation and independent review passed | #82 and #83 remain the consolidation frontier; #85 owns later archival of superseded workflow material |
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
| #51 | Build Codex visual-output starter toolkit | `docs/visual-output-starter/README.md`, lane examples, and `.agents/skills/codex-visual-output-starter/SKILL.md` provide the starter plan, lane decision guidance, and reusable Codex skill | Add concrete dependency-backed lanes only when a future visual artifact needs them |

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
