# Nexus Game App Agent Instructions

## Scope

These instructions apply to the React/Vite Nexus Game app in the legacy `artifacts/nexus-companion` package path. `Companion` is an implementation name, not a separate product or current product direction.

## Local Rules

- Preserve local-first play.
- Build toward persistent spatial Locations that carry Free Movement, in-world interaction, Tactical Pressure, Turn-Based Mode, and Local Aftermath without a separate Encounter world.
- Preserve useful DM-chat and encounter-shell code as regression or Developer Mode evidence, but do not extend it as the primary player interface.
- Do not move browser API-key handling further into the product; it is prototype-only.
- Do not treat prompt text as final game-rule authority.
- Keep UI changes dense, readable, and play-focused rather than marketing-style.
- Verify TypeScript when practical with `corepack pnpm --filter @workspace/nexus-companion run typecheck`.

## Source Boundary

Nexus source Markdown is design authority. This folder is implementation authority for app behavior and UI state.
