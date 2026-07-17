# Nexus Local Playable App

Nexus is a local-first 2D/slight-isometric RPG/roguelike application. The existing React/Vite implementation is evolving into the spatial game and primary playtest surface for exploration, narrative play, integrated encounters, play aids, scene imagery, and source-backed rules/lore.

Read first:

- `NEXUS_ISSUE_TRANSITION.md`
- `NEXUS_LOCAL_PLAYABLE_ALPHA.md`
- `AGENTS.md`

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
- Database scaffold: Drizzle/PostgreSQL, but Local Playable Alpha should not become Replit/Postgres-only

## Where Things Live

- `NEXUS_ISSUE_TRANSITION.md` - GitHub-first queue control surface during migration
- `NEXUS_LOCAL_PLAYABLE_ALPHA.md` - active app roadmap, Replit tasks, Codex work-session queue
- `AGENTS.md` - app-local instructions for Codex/Replit/agents
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
- DM chat and encounters are one gameplay flow.
- Browser-side OpenAI key handling is prototype-only and should be replaced by a backend/local-service path.
- Source Markdown remains design authority. This repo is implementation authority for app behavior.
- Public release is out of scope until the user explicitly says otherwise.

## Product Direction

Local Playable Alpha is complete when the user can:

1. Launch the app locally.
2. Start a new app-native Nexus campaign.
3. Play through DM chat.
4. Trigger and resolve an encounter from narrative play.
5. Use TacMap/play aids during the encounter.
6. Save/export, close/reopen, and continue.

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
- The current source docs still contain older language treating Replit/VG implementation as downstream; the user's June 2026 instruction explicitly reopens app implementation as active work.

## Replit Task Format

Use the task blocks in `NEXUS_LOCAL_PLAYABLE_ALPHA.md`.

Each task should include:

- Title
- Goal
- Context
- Implementation Tasks
- Done When
- Do Not Do
- Validation
