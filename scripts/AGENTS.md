# Nexus Scripts Agent Instructions

## Scope

These instructions apply to repo automation under `scripts`.

## Local Rules

- Prefer scripts that are safe on Windows PowerShell and Replit/Linux.
- Scripts should print clear errors and avoid destructive defaults.
- Do not add network, install, delete, or migration behavior without explicit task scope.
- Keep validation scripts readable and boring so future agents can modify them safely.
- If a script is meant to support workflow files, keep required paths and section names near the top.

## Validation

After changing scripts, run `corepack pnpm run typecheck` when practical.
