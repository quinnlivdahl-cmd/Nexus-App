# Nexus Issue Transition

Status: active transition router with a preserved historical queue snapshot
Scope: Nexus App repo task routing
Primary queue: GitHub Issues for `quinnlivdahl-cmd/Nexus-App`

## Purpose

This document bridges the current local planning surfaces and the GitHub issue queue after the live domain-first source migration.

Use it to answer four questions quickly:

1. Where should a fresh AI look first?
2. What is the active execution queue?
3. How is the queue sequenced?
4. What planning/doc work is still local-only and not yet a standalone issue?

## Current Product Direction

Nexus is a local-first spatial party RPG. The current vertical-slice target is owned by `CORE-PILLARS-001` section 8 in canonical source, implementation-readiness decisions are coordinated by Spatial Vertical Slice Map #57, and Integration Contract #30 will define the exact production boundary.

The former Local Playable Alpha, DM-chat finish line, and Gate A-F queue below are preserved as historical transition evidence. They do not control current product direction or execution order.

## Fresh AI Read Order

For app work, read in this order:

1. `AGENTS.md`
2. `CONTEXT-MAP.md`
3. `docs/contexts/nexus-game/CONTEXT.md`
4. `docs/adr/README.md` and relevant accepted ADRs
5. This file: `NEXUS_ISSUE_TRANSITION.md`
6. Open GitHub issues in `quinnlivdahl-cmd/Nexus-App`
7. Nexus source docs when canonical design authority is needed

Current app-side Golden Truth source:

- `docs/nexus-game-source/source`
- Source home within the current checkout: `docs/nexus-game-source`

Path caveat: this source home was renamed from the dated 2026-06-10 rebuild folder after live migration. Its `legacy_paths` should point at archived slot-source material when path traceability matters.

## Control Model

- GitHub Issues are the active execution queue.
- `CONTEXT-MAP.md`, the Nexus Game context, and `docs/adr/README.md` form the revised decision baseline.
- `NEXUS_LOCAL_PLAYABLE_ALPHA.md` is retained historical planning evidence and is permanently non-controlling.
- `docs/nexus-game-source/source` is the canonical current textual definition of the game. Accepted ADRs control the specific claims they change until those decisions are reconciled into the owning source documents; unaffected source material remains current.
- This transition doc tracks queue shape and local-only planning residue; live GitHub is authoritative for issue state and blockers.

## Queue Rules

Use **Phase Gates + Dependencies**.

Sort work in this order:

1. Gate order
2. dependency depth
3. manual priority inside the same gate

Each issue should state:

- Gate
- Queue role: blocker, dependent, or standalone
- Depends on
- Why now
- Not before

## Historical June Queue Snapshot

The Gate A-F material in this section records the prior implementation sequence. Use live GitHub, Spatial Vertical Slice Map #57, and the current canonical source for present work.

### Workflow and control lane

- `#2` Establish repo collaboration lanes for Nexus App
- `#3` Create GitHub issue and PR templates for Nexus AI collaboration
- `#6` Plan Domain Source text-doc reorganization for repo and GitHub collaboration
  - Status note: the domain-first Golden Truth source home is in the app repo; live vault migration is complete; `legacy_paths` traceability may need future review.

These are active, but they are not the app-runtime critical path.

### App critical path

- Gate A: `#7` Prove local launch and runtime foundation - verified locally and ready to close
- Gate B: `#8` Add recoverable local save export and import flow
- Gate C: Source Context Pack #9 - satisfied by Source Context Pack PR #52 merge
- Gate D: Backend AI Routing #10 - dependent/eligible after Source Context Pack #9, not in progress
- Gate D: App-Native Campaign Seed #11 - dependent/eligible after Source Context Pack #9, not in progress
- Gate E: `#12` Add manual encounter harness and narrative return flow
- Gate F: AI Contracts #4 - closed/satisfied by the reviewed contract package in commit `a075b82`
- Gate F: Spatial Action Transaction #5 - closed/satisfied by the accepted contract published in PR #69

### Existing issue placement

- `#7` Prove local launch and runtime foundation
  Gate: A
  Queue role: satisfied blocker
  Status note: local install, typecheck, build, API health, and companion app launch were verified on 2026-06-15.

- `#8` Add recoverable local save export and import flow
  Gate: B
  Queue role: dependent
  Depends on: `#7`

- Source Context Pack #9
  Gate: C
  Queue role: satisfied
  Depends on: `#7` satisfied
  Status note: Source Context Pack PR #52 merged into `main` on 2026-06-27 with merge commit `4dd084e4054dd8347adf8848f1b5bc8d116e5cbb` after PR branch fix commit `63265bc`.

- Backend AI Routing #10
  Gate: D
  Queue role: dependent/eligible
  Depends on: `#7` satisfied, Source Context Pack #9 satisfied
  Status note: eligible for future sequencing, but not started by Source Context Pack #9 closeout.

- App-Native Campaign Seed #11
  Gate: D
  Queue role: dependent/eligible
  Depends on: `#7` satisfied, Source Context Pack #9 satisfied
  Status note: eligible for future sequencing, but not started by Source Context Pack #9 closeout.

- `#12` Add manual encounter harness and narrative return flow
  Gate: E
  Queue role: dependent
  Depends on: `#7`, `#10`, `#11`

- AI Contracts #4 - Define Game Truth, Director, and Context Broker contracts for the slice
  Gate: F foundation
  Queue role: closed/satisfied blocker
  Status note: provider-neutral AI contracts, ADRs, glossary, handoff, and evaluation boundaries were committed in `a075b82`; validation passed, independent review returned `PASS`, and the issue closed on GitHub after its evidence comment.

- Spatial Action Transaction #5 - Define the spatial action validation and commit transaction
  Gate: F
  Queue role: closed/satisfied
  Depends on: AI Contracts #4 satisfied
  Status note: Grill with Docs decisions were published in PR #69 through `docs/game-system-contracts/drafts/Spatial_Action_Validation_and_Commit_Transaction_Contract_rev0.1.md`, the Nexus Game glossary, and ADRs 0074–0077; validation and independent review passed, and the issue closed after its evidence comment. Production implementation remains separate.

### Newly added issues - curated placement

- `#13` Make the encounter screen actually playable - turn order, movement, and actions
  Gate: F
  Queue role: dependent
  Depends on: `#12`, `#4`, `#5`
  Notes: valid encounter-interaction issue, but not before the manual encounter harness and first rules slice exist

- `#14` Let the AI DM trigger and populate encounters automatically during play
  Gate: E
  Queue role: dependent
  Depends on: `#10`, `#11`, `#12`
  Notes: this is the narrative-to-encounter bridge and belongs on the main path after backend DM routing and the manual harness exist

- `#15` Add HP / SI editing to actor rows so the GM can track damage during a session
  Gate: E support
  Queue role: standalone
  Depends on: `#12`
  Notes: useful playtest support, but not a hard prerequisite for Local Playable Alpha if another encounter-state update path exists

- `#16` UI readability pass - contrast, font sizes, and backdrop scrims
  Gate: support
  Queue role: standalone
  Depends on: none
  Notes: important polish and usability work, but not on the shortest critical path unless readability blocks testing

- `#17` Give each backdrop its own default node web
  Gate: later
  Queue role: standalone
  Depends on: `#12`
  Notes: good encounter quality task, but not needed for first alpha proof

- `#18` Build a searchable index of the Nexus vault for fast rules lookup
  Gate: C extension
  Queue role: dependent/eligible
  Depends on: Source Context Pack #9 satisfied
  Notes: useful extension of source-backed context, but not started by Source Context Pack #9 closeout

- `#19` Tune the DM's noncombat checks so Partial outcomes feel as meaningful as combat Grazes
  Gate: D extension
  Queue role: dependent
  Depends on: `#10`, `#11`
  Notes: good DM quality tuning after the app-native campaign and backend DM path exist

- `#20` Show the DM's assembled system prompt in a debug panel so rules can be verified mid-session
  Gate: C support
  Queue role: standalone/eligible
  Depends on: Source Context Pack #9 satisfied
  Notes: excellent debug surface for validation, but it supports the main path rather than defining it and was not started by Source Context Pack #9 closeout

- `#21` Let the DM look up vault rules mid-session when a specific rule reference is needed
  Gate: C extension
  Queue role: dependent
  Depends on: `#18`, `#10`
  Notes: this is a second-step retrieval feature after a vault index exists and backend DM routing is in place

### Historical critical path vs support vs later

Critical path now reads:

- Gate A: `#7` satisfied
- Gate B: `#8`
- Gate C: Source Context Pack #9 satisfied
- Gate D: Backend AI Routing #10 and App-Native Campaign Seed #11 eligible for future sequencing, not in progress
- Gate E: `#12`, `#14`
- Gate F: AI Contracts #4 and Spatial Action Transaction #5 closed/satisfied; Encounter Interaction #13 remains

Support issues:

- `#2`, `#3`, `#6`, `#15`, `#16`, `#20`

Extension or later issues:

- `#17`, `#18`, `#19`, `#21`

## Local-Only Planning Residue

These items should stay here until they either become issues or become irrelevant:

- Decide whether to promote a GitHub-first queue summary into broader Nexus root/source control docs.
- Decide how much of the older dashboard-era task language should be rewritten versus simply left historical.
- Decide whether the app repo should gain dedicated `.agents/plans`, `.agents/tasks`, and `.agents/reports` conventions now or only after issue/template workflow stabilizes.

## Relationship To Other Local Docs

- `CORE-PILLARS-001` section 8 owns the current spatial vertical-slice target.
- Spatial Vertical Slice Map #57 coordinates the decisions and prototype evidence needed for implementation readiness.
- `NEXUS_LOCAL_PLAYABLE_ALPHA.md` and the June roadmap are historical planning evidence.
- `replit.md` is an optional local operator guide, not required orientation or product authority.
- `AGENTS.md` is the first-entry instruction surface.

For current queue behavior, trust live GitHub. For current game direction, trust canonical source and accepted ADRs. Use the historical queue and roadmap only for provenance.
