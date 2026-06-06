---
name: Nexus Companion architecture
description: Key architectural decisions for the Nexus Companion RPG app at artifacts/nexus-companion
---

## Architecture

- **No backend** — all state in `localStorage` via `GameStateContext` reducer
- **OpenAI calls from browser** — CORS is supported; API key stored in localStorage
- **State parsing** — DM responses contain silent JSON blocks wrapped in triple-backtick fences; `stateParser.ts` extracts and merges them into GameState
- **TacMap** — pure SVG, 18 backdrop SVG components in `src/components/tacmap/backdrops/`
- **Vite port** — 22868 (set in artifact config)
- **Campaign** — Rook Protocol pre-loaded in `src/data/rookCampaign.ts`

**Why:** User wanted a desktop-only, solo-play tool with zero server costs. Direct OpenAI calls from browser avoid any backend complexity.

**How to apply:** If adding features, keep all state in the GameState reducer. Never add a backend. API key lives in `state.settings.openaiApiKey`.

## Key files
- `src/types/game.ts` — all types (GameState, Actor, TacMapNode, etc.)
- `src/store/GameStateContext.tsx` — reducer + localStorage persistence + `resetToRookCampaign()`
- `src/lib/dmSystemPrompt.ts` — GPT-4o system prompt (update when adding new state fields)
- `src/lib/stateParser.ts` — JSON block extractor (fragile: expects ```json fences)
- `src/App.tsx` — ALL UI components (no separate page files)
- `src/index.css` — NASApunk palette + all custom utility classes

## NASApunk palette
- Void: `#060608` / `hsl(230 20% 4%)`
- Amber accent: `#E87722` / `hsl(26 80% 52%)`
- Teal data: `#00b4aa` / `hsl(177 100% 35%)`
- Off-white text: `hsl(220 15% 82%)`
- Panel: `hsl(228 20% 9%)`
