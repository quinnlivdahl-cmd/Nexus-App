# Nexus Issue Index

Status: active Markdown index
Repo: `quinnlivdahl-cmd/Nexus-App`
Local path: `C:\Nexus Mother Folder\01 REPOS\03 Nexus App\Nexus-App\Nexus-App`

## Purpose

This file is the AI-readable issue and work index for the Nexus app repo.

GitHub Issues are the task packets. This Markdown index explains how those packets relate to the roadmap, readiness, blockers, parked ideas, and completed work. It should remain understandable without a GitHub Projects board.

GitHub Projects may be useful later as a visual board. This file is the first shared planning surface because it is plain Markdown, script-friendly, reviewable in the repo, and easy for Codex, ChatGPT, Replit, and humans to read.

## Controlling Planning Context

- GitHub Issue 42: `Plan Codex Agent and Skill Automation Upgrade for Nexus`
- Latest Issue 42 planning handoff comments for agent/skill/task-intake workflow design
- Roadmap candidate: `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\90 Codex Review\01 Review Ready\2026-06-07_Nexus_Global_Project_Roadmap_Candidate.md`
- Repo-accessible roadmap mirror: `docs/nexus-roadmap/ROADMAP.md`
- Roadmap lane/issue index: `docs/nexus-roadmap/ROADMAP-INDEX.md`
- App transition control: `NEXUS_ISSUE_TRANSITION.md`
- App scope roadmap: `NEXUS_LOCAL_PLAYABLE_ALPHA.md`
- Live domain-first source: `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`
- Nexus Source Mirror: `docs/nexus-domain-source-rebuild-2026-06-10/source` (compatibility path retained from the 2026-06-10 domain-source rebuild)
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
| TBD | TBD | TBD | TBD | TBD | Add the next ready issue after #46 closeout |

## Known Open GitHub Issues

Last synced: 2026-06-11 after Issue 48 closeout. GitHub reported 38 open issues after #48 is closed.

### Workflow / Control Lane

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #2 | Establish repo collaboration lanes for Nexus App | support | none listed | Active workflow/control work |
| #3 | Create GitHub issue and PR templates for Nexus AI collaboration | support | none listed | Overlaps with Issue 42 template/label work |
| #6 | Plan Domain Source text-doc reorganization for repo and GitHub collaboration | support | none listed | Source/repo planning, not app-runtime critical path |
| #22 | Create root README and AGENTS instructions for Nexus App | support | none listed | Partly advanced by repo `AGENTS.md`; README still needs review |
| #23 | Create admin operating model docs for repo-first collaboration | support | none listed | Repo-first collaboration docs |
| #24 | Create initial ADRs for repo authority and AI tool roles | support | none listed | Architecture decision records |
| #25 | Set up GitHub labels and milestones for Nexus App task planning | support | none listed | Label reference exists; live labels/milestones still need setup |

### App Critical Path

| Issue | Title | Gate | Queue role | Depends on | Notes |
|---|---|---|---|---|---|
| #7 | Prove local launch and runtime foundation | A | blocker | none listed | First app runtime gate |
| #8 | Add recoverable local save export and import flow | B | dependent | #7 | Local state/recovery |
| #9 | Build source-backed context pack for app DM runtime | C | dependent | #7 | Source-backed context foundation |
| #10 | Route DM and scene image AI calls through local backend | D | dependent | #7, #9 | Backend/local AI path |
| #11 | Add app-native campaign seed and reset path | D | dependent | #7, #9 | New app-native campaign start |
| #12 | Add manual encounter harness and narrative return flow | E | dependent | #7, #10, #11 | Manual encounter proof |
| #14 | Let the AI DM trigger and populate encounters automatically during play | E | dependent | #10, #11, #12 | Narrative-to-encounter bridge |
| #4 | Prepare API-DM plus deterministic rules-core scaffold | F foundation | blocker | none listed | Rules-core foundation |
| #5 | Define first rules-core vertical slice | F | dependent | #4 | First minimum rules slice |
| #13 | Make the encounter screen actually playable - turn order, movement, and actions | F | dependent | #12, #4, #5 | Encounter interaction after harness/rules slice |

### Support / Extension / Later

| Issue | Title | Gate | Queue role | Depends on | Notes |
|---|---|---|---|---|---|
| #15 | Add HP / SI editing to actor rows so the GM can track damage during a session | E support | standalone | #12 | Playtest support |
| #16 | UI readability pass - contrast, font sizes, and backdrop scrims | support | standalone | none | Usability polish |
| #17 | Give each backdrop its own default node web | later | standalone | #12 | Encounter quality, later |
| #18 | Build a searchable index of the Nexus vault for fast rules lookup | C extension | dependent | #9 | Source lookup extension |
| #19 | Tune the DM's noncombat checks so Partial outcomes feel as meaningful as combat Grazes | D extension | dependent | #10, #11 | DM quality tuning |
| #20 | Show the DM's assembled system prompt in a debug panel so rules can be verified mid-session | C support | standalone | #9 | Debug/validation surface |
| #21 | Let the DM look up vault rules mid-session when a specific rule reference is needed | C extension | dependent | #18, #10 | Second-step retrieval feature |

### Rules-Core / System Design Sequence

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #33 | Epic: Sequence Nexus app-facing game-rule/system design | epic | none listed | Parent/design sequence for rules-core work |
| #34 | Define API DM / rules-core authority split | design | #33 | Authority boundaries between AI DM and rules core |
| #35 | Define turn transaction for API DM + rules-core play | design | #33, #34 | Turn flow contract |
| #36 | Define game state lanes and mutation boundaries | design | #33, #34 | State ownership and mutation rules |
| #38 | Define rules object model for actions, checks, effects, and logs | design | #33, #34 | Core rule object model |
| #39 | Define check family contract | design | #38 | Check contract detail |
| #40 | Define effect and state-delta grammar | design | #38 | Effects and state-change language |
| #41 | Define compact DM context broker contract | design | #34, #35 | Context broker contract |

Note: #37 is closed and is therefore not listed in the open queue.

### Source / Play Document Tasks

| Issue | Title | Queue role | Depends on | Notes |
|---|---|---|---|---|
| #26 | Draft pre-node crew sheets, level-up, and loadout display for E-43 | source/play doc | none listed | Draft-facing play support |
| #27 | Draft DM display backpatch for narrative, rolls, state, and options | source/play doc | none listed | DM display procedure |
| #28 | Draft route-node end report and encounter result templates | source/play doc | none listed | Route/encounter closeout templates |
| #29 | Draft encounter start package template for DM and TacMap setup | source/play doc | none listed | Encounter-start package |
| #30 | Draft check-display examples and noncombat scene procedure template | source/play doc | none listed | Noncombat/check display |
| #31 | Formalize skill focus and ability tree structure for playable drafts | source/play doc | none listed | Skill/ability structure |
| #32 | Improve character chassis and origin sheet usability for play | source/play doc | none listed | Character sheet usability |

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
| local | Add approved domain-first source snapshot to app repo and local mirror | `docs/nexus-domain-source-rebuild-2026-06-10/source` plus local mirror under `03 APP\Nexus AI DM App\app docs` | Use snapshot for Gate C source-backed context pack planning |
| local | Complete domain-source live migration | Live `00 Source` is now domain-first; old slot source is archived at `99 Archive\01 Superseded Source\00 Source Slots 2026-06-10` | Refresh app snapshot `legacy_paths` separately if needed |
| #42 batch 1 | Establish instruction/index layer | `AGENTS.md`, `NEXUS_ISSUE_INDEX.md`, `NEXUS_TASK_PACKET_TEMPLATE.md`, `NEXUS_HANDOFF_TEMPLATE.md` | Use templates on future issues |
| #42 | Complete Codex agent and task-intake workflow setup | Repo/folder `AGENTS.md`, task packet template, handoff template, issue template, label reference, repo-local skills, closeout/progress rules, and `validate:workflow` all exist and validate | Closed on GitHub after final evidence comment; continue live labels/milestones in #25 |
| #44 | Create ChatGPT Project bridge layer docs | `docs/chatgpt-project-bridge` baseline bridge docs, app `AGENTS.md` pointer, and validator coverage added in commit `464eeab`; final index closeout in follow-up commit | Upload the baseline bridge set to ChatGPT Project only when ready; do not call it refreshed until confirmed or logged |
| #45 | Create source mirror index maintenance workflow | Repo-side source mirror role documented, deterministic index generator/check scripts added, repo-local maintainer skill added, and `validate:workflow` now checks for stale generated index files | Physical path rename deferred to a deliberate migration batch because exact indexed paths and bridge references depend on the compatibility path |
| #46 | Finalize ChatGPT bridge baseline and thread title convention | `docs/chatgpt-project-bridge` final baseline updates plus handoff/thread-title convention wiring committed in `9df8037`; issue-index closeout follow-up committed separately | ChatGPT Project still needs an actual upload/searchability confirmation before it can be called refreshed |
| #47 | Create repo-accessible roadmap mirror and maintained issue index | `docs/nexus-roadmap` roadmap mirror/index, `scripts/update-roadmap-index.mjs`, `roadmap:index` scripts, maintainer skill, bridge pointers, and `validate:workflow` roadmap-index checks | ChatGPT Project still needs upload or exact-path retrieval confirmation before the roadmap can be called refreshed there |
| #43 | Design Codex Chat Focus and Session Discipline Workflow for Nexus | Discovery report added to Issue #43, session discipline workflow spec added, repo-local session skill added, task/handoff/bridge templates wired, synced-chat index updated, and `validate:workflow` plus `typecheck` passed | Do not build duplicate-check, observation-mining, or packet-index automation until separate follow-up issues scope them |
| #48 | Revise ChatGPT bridge workflow for long-chat preservation packets | Bridge refresh rules now include an explicit `Long-Chat Preservation Procedure`; ChatGPT project instructions and bridge README point to it; repo-local and workspace-local closeout-scan skills added for future issue sweeps | ChatGPT Project still needs upload or searchability confirmation before the changed bridge baseline can be called refreshed there |

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
