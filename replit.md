# Nexus Local Playable App

Nexus is a local-first 2D spatial sci-fi party RPG with a fixed Tilted Top-Down presentation. The existing React/Vite implementation is evolving into the spatial game and primary playtest surface for persistent Locations, in-world interaction, Tactical Pressure, play aids, and source-backed rules and lore.

Status: optional local operator reference. This file is not required reading, product authority, or the current finish line.

Current authority and task routing:

- `AGENTS.md`
- `CONTEXT-MAP.md`
- `CORE-PILLARS-001` section 8 in canonical source for the spatial vertical-slice target
- Spatial Vertical Slice Map #57 for implementation-readiness decisions
- Live GitHub Issues for executable work

## Run And Operate

Local one-command development:

```powershell
corepack pnpm install
corepack pnpm run local:dev
```

Default local URLs:

- API health: `http://127.0.0.1:5000/api/healthz`
- Nexus game app: `http://127.0.0.1:5173`

Run one side only:

```powershell
corepack pnpm run local:dev:api
corepack pnpm run local:dev:app
```

Optional local port overrides:

```powershell
$env:NEXUS_API_PORT="5000"
$env:NEXUS_COMPANION_PORT="5173"
corepack pnpm run local:dev
```

Checks:

```powershell
corepack pnpm run typecheck
corepack pnpm run build
```

Required local tooling:

- Node.js 24
- pnpm

Current local blocker noted by Codex on 2026-06-08:

- Node exists locally as `v24.16.0`.
- `corepack pnpm` works and reports pnpm `11.5.2`.
- The plain `pnpm` shim could not be globally enabled because Windows denied writing to `C:\Program Files\nodejs\pnpm`.
- Use `corepack pnpm ...` unless the user later installs/enables a normal pnpm shim.

## Stack

- Workspace: pnpm workspaces
- Runtime: Node.js 24
- Language: TypeScript
- Nexus game app: React + Vite (`artifacts/nexus-companion` is the legacy package path)
- API scaffold: Express
- Validation: Zod and generated API types
- Database scaffold: Drizzle/PostgreSQL, but the local runtime must not become Replit/Postgres-only

## Where Things Live

- `NEXUS_ISSUE_INDEX.md` - repo-readable task map; live GitHub Issues own current task state
- `docs/archive/README.md` - deliberate retrieval route for historical transition and DM-chat alpha evidence
- `AGENTS.md` - app-local instructions for Codex/Replit/agents
- `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` - canonical spatial vertical-slice target
- `artifacts/nexus-companion` - React/Vite Nexus game app under its legacy package path
- `artifacts/nexus-companion/src/store/GameStateContext.tsx` - current browser localStorage persistence
- `artifacts/nexus-companion/src/lib/useDMChat.ts` - current DM chat runtime
- `artifacts/nexus-companion/src/lib/stateParser.ts` - `nexus-state` block parsing/application
- `artifacts/nexus-companion/src/lib/contextSelector.ts` - current context selection
- `artifacts/nexus-companion/src/lib/useImageGeneration.ts` - current scene image generation
- `artifacts/nexus-companion/src/data/rookCampaign.ts` - current Rook prototype state
- `artifacts/nexus-companion/src/components/tacmap` - TacMap display
- `artifacts/api-server` - Express API scaffold
- `lib/api-spec` and `lib/api-zod` - generated API contract surfaces

## Architecture Decisions

- Local-first is the product target.
- GitHub Issues are the active execution queue; local docs provide scope and transition context.
- Replit may implement tasks, but the app must remain runnable from the user's machine.
- Free Movement, in-world interaction, Tactical Pressure, Turn-Based Mode, and Local Aftermath operate inside persistent Locations.
- The existing DM-chat shell is legacy implementation evidence and may contribute diagnostics to Developer Mode; it is not the target player interface.
- Browser-side OpenAI key handling is prototype-only and should be replaced by a backend/local-service path.
- Source Markdown remains design authority. This repo is implementation authority for app behavior.
- Public release is out of scope until the user explicitly says otherwise.

## Product Direction

The current finish line is the canonical spatial vertical-slice target in `CORE-PILLARS-001` section 8. It proves a coherent short campaign through persistent explorable Locations, in-world noncombat interaction, Tactical Pressure in the same spatial runtime, deterministic rules and state, progression or recruitment, recoverable local saves, and generated-performance fallback.

Spatial Vertical Slice Map #57 coordinates the required decisions and prototype evidence. Integration Contract #30 will define the exact production implementation boundary; this operator guide must not invent that contract.

## User Preferences

- The app should feel like prior ChatGPT playtesting, but with better structure, visuals, and app-held state.
- The app should not require ChatGPT to reconstruct campaign context during normal play.
- The first app-native campaign can be new; resuming Rook is deferred until the local play loop is stable.
- Lattice-100 should be treated as a resolution mechanic, not world lore.
- Keep public/publishing assumptions out of implementation until explicitly approved.

## Gotchas

- `pnpm` is mandatory because root `preinstall` rejects npm/yarn installs. On this machine, prefer `corepack pnpm ...`.
- Replit-style environment assumptions can break local Windows launch if defaults are missing.
- Current persistence is browser localStorage only.
- Current AI calls are browser-side and should be moved behind the API.
- Historical planning documents still contain Replit-first, DM-chat, and top-level Encounter language. Treat those documents as dated evidence rather than current product direction.

## Replit Task Format

Use the current GitHub Issue and `NEXUS_TASK_PACKET_TEMPLATE.md`. Historical task blocks in the archive may be mined deliberately for implementation evidence but must not control scope.

Each task should include:

- Title
- Goal
- Context
- Implementation Tasks
- Done When
- Do Not Do
- Validation
