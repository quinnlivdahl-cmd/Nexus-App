# Nexus Local Playable Alpha

Status: historical, non-controlling implementation plan
Owner: historical local app workstream
Primary surface: this app repo
Related repo roadmap surface: `docs/nexus-roadmap/ROADMAP.md`

Historical boundary:

- GitHub Issues are the active task queue for `quinnlivdahl-cmd/Nexus-App`.
- This document preserves the former text-RPG/DM-chat implementation scope, gates, and backlog as dated evidence.
- It does not control new work and must not be used as required reading, a task queue, or a product finish line.
- The current finish line is the spatial vertical-slice target in canonical `CORE-PILLARS-001` section 8. Spatial Vertical Slice Map #57 owns readiness decisions, and Integration Contract #30 will define the exact production boundary.
- Use `CONTEXT-MAP.md`, `docs/contexts/nexus-game/CONTEXT.md`, and `docs/adr/README.md` for the revised product baseline; use live GitHub for execution state.

The remaining body is intentionally retained in its original period language so prior implementation assumptions and task evidence stay retrievable.

## Purpose

Make the Nexus app playable from the user's machine as the primary playtest surface.

Local Playable Alpha is complete when the user can launch the app locally, start a new Nexus campaign, play through DM chat, trigger and resolve at least one encounter, save/load the session, and continue without manually reconstructing context in ChatGPT.

## Working Rules

- Local-first is the product priority.
- Replit may implement tasks, but the result must remain runnable from this machine.
- DM chat and encounters are one gameplay flow. Encounters open from narrative play and return results to narrative play.
- ChatGPT remains useful for drafting, brainstorming, and targeted design work; it should not be the runtime memory for normal app play.
- Public release is out of scope until the user explicitly says otherwise.
- Nexus source Markdown in `docs/nexus-game-source/source` is the design authority. This repo is implementation authority for app behavior.
- Lattice-100 is a resolution mechanic, not world lore. Do not present the RNG system as an in-world metaphysical fact unless source docs explicitly say so.

## Source Basis

Read these before changing gameplay, context, or roadmap behavior:

- `docs\nexus-game-source\source`
- `docs\nexus-game-source\source\Admin\Applied Rules\ADMIN-MAP-003 - 03-Slot-Map-rev0-6.md`
- `docs\nexus-game-source\source\Admin\Applied Rules\ADMIN-RUNBOOK-013 - Nexus-Source-First-Routing-Map.md`
- `docs\nexus-roadmap\ROADMAP.md`
- `docs\nexus-game-source\source\Automation\Reference Inputs\AUTO-INDEX-000 - SRC-AUTO-000-README-Source-TT-VG-Automation.md`
- `docs\nexus-game-source\source\Combat\Reference Inputs\COMBAT-INDEX-000 - Combat_Domain_Readme.md`
- `docs\nexus-game-source\source\Content\Reference Inputs\CONTENT-INDEX-000 - SRC-CONTENT-000-README-Source-Content-Systems.md`
- `Nexus Dashboard.md` within the registered Obsidian Nexus hub located through `docs/admin/nexus-distributed-surfaces.md`, only when current human-facing project state matters.

## Current Prototype Inventory

Already present in the app:

- React/Vite companion app under `artifacts/nexus-companion`.
- Express API scaffold under `artifacts/api-server`.
- Browser localStorage state persistence in `GameStateContext.tsx`.
- DM chat hook in `useDMChat.ts`.
- Context selector and lore registry path in `contextSelector.ts` and `loreRegistry.ts`.
- DM `nexus-state` block parsing and state application in `stateParser.ts`.
- Encounter view auto-switch when DM emits an encounter state block.
- TacMap component and backdrop set under `components/tacmap`.
- Scene image generation hook in `useImageGeneration.ts`.
- Rook campaign prototype state in `data/rookCampaign.ts`.

Current blockers and hardening needs:

- `corepack pnpm` is the supported local package runner and was verified on 2026-06-15.
- AI calls still happen from the browser and use a browser-stored API key.
- Persistence is browser localStorage only; no file-backed local save/export flow exists yet.
- Source-backed content is hand-authored/prototype context, not yet generated from the canonical source corpus.
- Current default campaign is Rook resume context; the app-native new campaign seed is not defined yet.
- Rules are mostly prompt-instructed, not app-enforced.

## Local Run Path

Prerequisites:

- Node.js 24 is expected by this workspace.
- pnpm is required. On this machine, use `corepack pnpm ...` because the global pnpm shim could not be enabled.

One-command local dev launch:

```powershell
corepack pnpm install
corepack pnpm run local:dev
```

Default local ports:

- API: `http://127.0.0.1:5000/api/healthz`
- Companion app: `http://127.0.0.1:5173`

Optional port overrides:

```powershell
$env:NEXUS_API_PORT="5000"
$env:NEXUS_COMPANION_PORT="5173"
corepack pnpm run local:dev
```

## Phase Gates

### Gate A - Local Launch Proven

Goal: a fresh local terminal can start the app.

Status: verified locally on 2026-06-15.

Completed:

- Added a root `local:dev` launcher.
- Added local defaults for API and Vite ports.
- Removed the API server's hard requirement for `PORT` during local use.
- Confirmed `corepack pnpm` can run pnpm `11.5.2`.
- Confirmed `corepack pnpm install` succeeds.
- Confirmed `corepack pnpm run typecheck` succeeds.
- Confirmed `corepack pnpm run build` succeeds.
- Confirmed `corepack pnpm run local:dev` starts API and companion app.
- Confirmed API health responds with `{"status":"ok"}` at `http://127.0.0.1:5000/api/healthz`.
- Confirmed companion app returns HTTP 200 at `http://127.0.0.1:5173`.

Remaining tasks: none for Gate A.

### Gate B - Local State Proven

Goal: campaign state survives closing and reopening the app.

Status: prototype present.

Completed:

- Browser localStorage persistence exists.

Remaining tasks:

- Add manual export/import of saves.
- Add file-backed or backend-backed local persistence.
- Store transcript, campaign state, encounter state, settings, and generated image references as one recoverable session object.
- Define crash/refresh recovery behavior.

### Gate C - Source Context Proven

Goal: app context is traceable to Nexus source docs.

Status: not yet proven.

Remaining tasks:

- Build app-ready content packs from source docs.
- Record source document IDs/paths beside loaded context.
- Separate rules, lore, campaign state, play aids, image prompts, and encounter data.
- Quarantine or remove prompt/context text that treats Lattice-100 as world lore.

### Gate D - DM Chat Proven

Goal: narrative play works in the app.

Status: prototype present.

Completed:

- DM chat exists.
- Prompt asks the DM to emit structured state blocks at structural moments.
- Context compression exists.

Remaining tasks:

- Move AI calls from browser to backend/local service.
- Add structured validation for DM state updates.
- Add player-visible versus state-only distinction.
- Add app-native campaign seed.

### Gate E - Encounter Flow Proven

Goal: DM chat can start an encounter, run it, and return to narrative play.

Status: prototype present.

Completed:

- `encounter_start` state block can switch the UI to encounter view.
- `scene_transition` can switch back to scene view.
- TacMap can display nodes, paths, actors, and backdrop.

Remaining tasks:

- Add a repeatable manual encounter test.
- Add encounter result flow back into campaign state.
- Add manual encounter override controls for testing.
- Validate encounter state before applying it.

### Gate F - Local Playable Alpha

Goal: app-native campaign play is possible locally from start through encounter and continuation.

Status: not yet complete.

Remaining tasks:

- Complete Gates A through E.
- Add source-backed new campaign seed.
- Add local save/export.
- Add minimum coded rules authority for checks, damage, resources, encounter turns, and state legality.
- Add playtest acceptance script.

## Replit Task Queue

Use the blocks below as copy-ready Replit tasks. Keep each task scoped. Do not combine them into one large prompt unless the user explicitly requests it.

### NLA-GA-001 - Prove local launch

Title:
Prove Nexus app local launch

Goal:
Make the app start from a fresh local terminal using the documented local run path.

Context:
Use `NEXUS_LOCAL_PLAYABLE_ALPHA.md`, `replit.md`, root `package.json`, `artifacts/api-server`, and `artifacts/nexus-companion`.

Implementation Tasks:

- Confirm `corepack pnpm install` succeeds.
- Confirm `corepack pnpm run local:dev` starts API and companion app.
- Fix any local launch breakage without making the app Replit-only.
- Keep default API port `5000` and companion port `5173` unless there is a conflict.

Done When:

- API health returns `{ "status": "ok" }`.
- Companion app opens locally.
- Launch works from Windows PowerShell.

Do Not Do:

- Do not add public deployment work.
- Do not require Replit-only environment variables for local run.

Validation:

- `corepack pnpm run local:dev`
- Visit `http://127.0.0.1:5000/api/healthz`
- Visit `http://127.0.0.1:5173`

### NLA-GB-001 - Add save export and import

Title:
Add local session export/import

Goal:
Let the user back up and restore a campaign session without depending on browser localStorage alone.

Context:
Use `GameStateContext.tsx`, `types/game.ts`, and this roadmap Gate B.

Implementation Tasks:

- Add an export button in Settings that downloads the current `GameState` as JSON.
- Add an import control in Settings that loads a selected JSON save after validation.
- Preserve transient flags as false on import: AI thinking and image generation.
- Show a clear error if imported JSON is invalid.

Done When:

- A session can be exported, local state reset, imported, and continued.

Do Not Do:

- Do not replace source docs with JSON.
- Do not add cloud sync.

Validation:

- Manual test: chat once, export, reset, import, confirm transcript/state return.

### NLA-GC-001 - Move AI calls behind backend

Title:
Route DM and image AI calls through local backend

Goal:
Remove browser-side OpenAI key handling as the default runtime path.

Context:
Use `useDMChat.ts`, `useImageGeneration.ts`, `api-server`, and Gate C/Gate D.

Implementation Tasks:

- Add backend endpoints for DM chat and scene image generation.
- Read API key from local environment on the server.
- Send only needed state/user input from browser to backend.
- Return narrative output, clean content, state blocks, and image URL or cached image reference.
- Add missing-key and AI-unavailable responses.

Done When:

- The user can play without entering an API key into the browser UI.
- Browser storage no longer holds the OpenAI API key by default.

Do Not Do:

- Do not build public multi-user auth.
- Do not deploy secrets to a public environment.

Validation:

- Manual test with `.env` key present.
- Manual test with key absent.

### NLA-GC-002 - Build source-backed app context pack

Title:
Create source-backed context pack loader

Goal:
Replace hand-authored prototype lore context with source-traceable app context.

Context:
Use the canonical source in `docs\nexus-game-source\source`, `dmSystemPrompt.ts`, `contextSelector.ts`, and `loreRegistry.ts`.

Implementation Tasks:

- Define context categories: rules, lore, campaign state, encounter content, play aids, image prompt guidance.
- Create a local data file or generated pack with source doc IDs/paths for each entry.
- Update context selection to include source IDs.
- Remove or rewrite entries that make Lattice-100 read like world lore rather than a mechanic.

Done When:

- Prompt context can show what source doc each loaded context entry came from.

Do Not Do:

- Do not auto-promote archive material.
- Do not invent canon to fill gaps.

Validation:

- Manual prompt/context debug review.

### NLA-GD-001 - Add app-native campaign seed

Title:
Add new app-native Nexus campaign start

Goal:
Start a new campaign designed for the app instead of depending on Rook resume context.

Context:
Use `types/game.ts`, `data/rookCampaign.ts`, source Slot 07/08/10/13 docs, and Gate D/F.

Implementation Tasks:

- Add a new `INITIAL_APP_NATIVE_STATE`.
- Include player state, opening location, immediate objective, current scene, known lore, pressures, clocks, and starter play aids.
- Add campaign start/reset selection in Settings.
- Mark Rook resume as prototype/legacy start unless the user reopens it.

Done When:

- A new app-native campaign can start with enough context for first scene play.

Do Not Do:

- Do not erase the Rook campaign prototype.

Validation:

- Manual test: reset to new app-native start and send first DM message.

### NLA-GE-001 - Add manual encounter test

Title:
Add manual encounter test harness

Goal:
Let the user trigger a known encounter without relying on DM generation.

Context:
Use `stateParser.ts`, `GameStateContext.tsx`, `TacMap.tsx`, and Gate E.

Implementation Tasks:

- Add a debug/manual action that loads a known encounter state.
- Include nodes, paths, actors, objectives, clocks, and backdrop.
- Add a clear way to resolve/close the test encounter back to scene state.
- Keep it available only as a test/control surface.

Done When:

- The user can open the app, trigger the test encounter, view TacMap, and return to scene.

Do Not Do:

- Do not make manual test content canon.

Validation:

- Manual test: trigger, inspect, resolve, confirm scene state updates.

### NLA-GF-001 - Define minimum rules engine

Title:
Implement minimum mechanical authority

Goal:
Move Local Playable Alpha rules from prompt-only behavior into app code.

Context:
Use Slot 08, Slot 10, Slot 11, `types/game.ts`, and Gate F.

Implementation Tasks:

- Add resolver functions for d100 TS checks, success bands, shield stepdown, mitigation, HP/SI changes, and downed/disabled flags.
- Add state validation for actor health, AP, MP, shield, and encounter active state.
- Use AI narration for fiction, not mechanical legality.
- Log rule conflicts or unsupported rulings visibly in debug mode.

Done When:

- Basic mechanical outcomes can be computed by the app and narrated by the DM.

Do Not Do:

- Do not attempt the full final rules engine in one pass.

Validation:

- Unit/manual tests for miss, graze, hit, direct, shield, mitigation, HP/SI, and downed/disabled.

## Codex Work Session Queue

Use these as focused Codex session goals.

### CODEX-NLA-001 - Local launch verification

Goal:
Verify Gate A after `corepack pnpm` is available.

Deliverable:
Launch report with exact commands, URLs, failures, and next fix.

Acceptance:
The app either runs locally or the remaining blocker is named precisely.

### CODEX-NLA-002 - Source context extraction plan

Goal:
Design source-backed context pack structure before implementation.

Deliverable:
Candidate context pack schema and source extraction task list.

Acceptance:
Replit can implement without deciding what source categories exist.

### CODEX-NLA-003 - Rules minimum extraction

Goal:
Extract Local Playable Alpha minimum rules from source docs.

Deliverable:
Rules engine task spec with source references and acceptance tests.

Acceptance:
Implementation can code mechanics without relying on prompt invention.

### CODEX-NLA-004 - Replit task conversion

Goal:
Convert one roadmap gate into a Replit-ready task prompt.

Deliverable:
One copy-ready Replit task with context, tasks, done-when, do-not-do, and validation.

Acceptance:
The task can be pasted into Replit without re-explaining the project.

## Acceptance Script For Local Playable Alpha

Run this when Gates A through F claim completion:

1. Start from a fresh terminal.
2. Run the documented local launch command.
3. Open the companion app locally.
4. Start the app-native campaign.
5. Send a DM chat message.
6. Confirm narrative response and state update.
7. Trigger or reach an encounter.
8. Confirm encounter screen opens with TacMap, actors, objectives, and clocks.
9. Resolve one mechanical action.
10. Return to narrative play.
11. Export/save session.
12. Close app/browser.
13. Reopen app and continue from saved state.

## Backlog

- File-backed local saves beyond browser export/import.
- Generated scene image caching to local files.
- Rule conflict/rulings register integration.
- Source doc pack generation from the canonical source corpus.
- Rook resume/import pathway after app-native campaign works.
- Navigable non-combat environments.
- Combat animations.
- Public release investigation, only after explicit user approval.
