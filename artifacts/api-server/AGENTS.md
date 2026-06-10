# Nexus API Server Agent Instructions

## Scope

These instructions apply to the local Express API scaffold in `artifacts/api-server`.

## Local Rules

- Keep the API usable from the user's local machine.
- Prefer local environment variables for secrets.
- Do not introduce public hosting, auth, cloud sync, or multi-user assumptions unless explicitly requested.
- Server defaults may support local development, but invalid explicit environment values should still fail clearly.
- Verify TypeScript when practical with `corepack pnpm --filter @workspace/api-server run typecheck`.

## Boundary

The API may mediate AI calls and local services. It should not become the source of Nexus lore or rules truth.
