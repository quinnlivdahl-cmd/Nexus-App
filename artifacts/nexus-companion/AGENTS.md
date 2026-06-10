# Nexus Companion Agent Instructions

## Scope

These instructions apply to the React/Vite companion app in `artifacts/nexus-companion`.

## Local Rules

- Preserve local-first play.
- Treat DM chat and encounters as one gameplay flow.
- Do not move browser API-key handling further into the product; it is prototype-only.
- Do not treat prompt text as final game-rule authority.
- Keep UI changes dense, readable, and play-focused rather than marketing-style.
- Verify TypeScript when practical with `corepack pnpm --filter @workspace/nexus-companion run typecheck`.

## Source Boundary

Nexus source Markdown is design authority. This folder is implementation authority for app behavior and UI state.
