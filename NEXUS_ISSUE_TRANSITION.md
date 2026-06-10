# Nexus Issue Transition

Status: active transition control surface
Scope: Nexus App repo task routing
Primary queue: GitHub Issues for `quinnlivdahl-cmd/Nexus-App`

## Purpose

This document bridges the current local planning surfaces and the GitHub issue queue while the migration is still in progress.

Use it to answer four questions quickly:

1. Where should a fresh AI look first?
2. What is the active execution queue?
3. How is the queue sequenced?
4. What planning/doc work is still local-only and not yet a standalone issue?

## Fresh AI Read Order

For app work, read in this order:

1. `AGENTS.md`
2. This file: `NEXUS_ISSUE_TRANSITION.md`
3. Open GitHub issues in `quinnlivdahl-cmd/Nexus-App`
4. `NEXUS_LOCAL_PLAYABLE_ALPHA.md`
5. Nexus source docs linked from the roadmap when design authority is needed

Current app-side source snapshot:

- `docs/nexus-domain-source-rebuild-2026-06-10/source`
- Local mirror: `C:\Nexus Mother Folder\03 APP\Nexus AI DM App\app docs\nexus-domain-source-rebuild-2026-06-10`

## Control Model

- GitHub Issues are the active execution queue.
- `NEXUS_LOCAL_PLAYABLE_ALPHA.md` holds app scope, phase gates, backlog detail, and task context.
- Nexus `00 Source` remains design/source authority.
- This transition doc tracks the queue shape and any remaining local-only planning residue.

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

## Current Queue

### Workflow and control lane

- `#2` Establish repo collaboration lanes for Nexus App
- `#3` Create GitHub issue and PR templates for Nexus AI collaboration
- `#6` Plan Domain Source text-doc reorganization for repo and GitHub collaboration
  - Status note: domain-first source snapshot has been added to the app repo and local mirror; live vault migration is still separate.

These are active, but they are not the app-runtime critical path.

### App critical path

- Gate A: `#7` Prove local launch and runtime foundation
- Gate B: `#8` Add recoverable local save export and import flow
- Gate C: `#9` Build source-backed context pack for app DM runtime
- Gate D: `#10` Route DM and scene image AI calls through local backend
- Gate D: `#11` Add app-native campaign seed and reset path
- Gate E: `#12` Add manual encounter harness and narrative return flow
- Gate F: `#4` Prepare API-DM plus deterministic rules-core scaffold
- Gate F: `#5` Define first rules-core vertical slice

### Existing issue placement

- `#7` Prove local launch and runtime foundation
  Gate: A
  Queue role: blocker

- `#8` Add recoverable local save export and import flow
  Gate: B
  Queue role: dependent
  Depends on: `#7`

- `#9` Build source-backed context pack for app DM runtime
  Gate: C
  Queue role: dependent
  Depends on: `#7`

- `#10` Route DM and scene image AI calls through local backend
  Gate: D
  Queue role: dependent
  Depends on: `#7`, `#9`

- `#11` Add app-native campaign seed and reset path
  Gate: D
  Queue role: dependent
  Depends on: `#7`, `#9`

- `#12` Add manual encounter harness and narrative return flow
  Gate: E
  Queue role: dependent
  Depends on: `#7`, `#10`, `#11`

- `#4` Prepare API-DM plus deterministic rules-core scaffold
  Gate: F foundation
  Queue role: blocker

- `#5` Define first rules-core vertical slice
  Gate: F
  Queue role: dependent
  Depends on: `#4`

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
  Queue role: dependent
  Depends on: `#9`
  Notes: useful extension of source-backed context, but not required before the first source-backed pack exists

- `#19` Tune the DM's noncombat checks so Partial outcomes feel as meaningful as combat Grazes
  Gate: D extension
  Queue role: dependent
  Depends on: `#10`, `#11`
  Notes: good DM quality tuning after the app-native campaign and backend DM path exist

- `#20` Show the DM's assembled system prompt in a debug panel so rules can be verified mid-session
  Gate: C support
  Queue role: standalone
  Depends on: `#9`
  Notes: excellent debug surface for validation, but it supports the main path rather than defining it

- `#21` Let the DM look up vault rules mid-session when a specific rule reference is needed
  Gate: C extension
  Queue role: dependent
  Depends on: `#18`, `#10`
  Notes: this is a second-step retrieval feature after a vault index exists and backend DM routing is in place

### Critical path vs support vs later

Critical path now reads:

- Gate A: `#7`
- Gate B: `#8`
- Gate C: `#9`
- Gate D: `#10`, `#11`
- Gate E: `#12`, `#14`
- Gate F: `#4`, `#5`, `#13`

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

- `NEXUS_LOCAL_PLAYABLE_ALPHA.md` is still the best detailed roadmap for app work.
- `replit.md` is the short operator guide.
- `AGENTS.md` is the first-entry instruction surface.

If this file and the roadmap disagree about current queue behavior, trust this file for queue behavior and the roadmap for scope/task detail.
