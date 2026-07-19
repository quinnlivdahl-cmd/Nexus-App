# Production-Intent Raster Seed Review Packet

Controlling task: Render and approve the production-intent seed #108

Runtime baseline: db51cec8b5062ea2e1341c4b109fe2e1ec3ac144 from origin/main

Art review baseline: 2ca033bb81f9b77497a5d420b2584434fa185238

Candidate manifest: nexus.production-intent-seed version 1.1.0

Output status: canon candidate

Human gate: revised candidate awaiting PASS or NEEDS_FIXES. It must not merge before PASS.

## Decision being requested

Judge whether this is a convincing, reusable, production-caliber gameplay-scale sample set and pipeline direction for Nexus:

- industrial floor and pressure-bulkhead wall;
- closed pressure-door slab;
- Field Lead actor sprite;
- relay-console prop;
- live-conduit substrate;
- interactable, hazard, and objective markers that do not depend on color alone.

This is not a claim that Nexus now has final game-wide textures. It is not a finished location kit, animation family, complete state family, palette lock, or canonical source change.

## Prior candidate disposition

The version 1.0 procedural presentation received NEEDS_FIXES on 2026-07-19 because it demonstrated technical composition but did not answer the intended art-quality question. Its screenshots are superseded. Version 1.1 replaces the procedural gameplay surfaces with isolated raster assets, integrates them through an explicit asset manifest, and retains the semantic fallback and accessibility contract.

## Runtime evidence

- [1440 × 900 normal presentation](evidence/issue-108/production-seed-1440x900.png)
- [1024 × 768 responsive presentation](evidence/issue-108/production-seed-1024x768.png)
- [1440 × 900 missing-actor fallback](evidence/issue-108/production-seed-missing-actor-fallback-1440x900.png)
- [Asset provenance, prompts, dimensions, and hashes](evidence/issue-108/ASSET_PROVENANCE.md)

All three captures come from the running Pixi application. The normal captures show the same deterministic fixture at committed Game Truth revision 0. At 1024 × 768 the playfield, controls, selected-actor telemetry, marker key, and fallback status remain visible without overlap; the collapsed developer footer may continue below the critical interface.

The fallback capture forces only nexus.seed.actor.field-silhouette.v1 unavailable. A magenta hatched question-mark block replaces the actor presentation, the DOM reports the failed asset identity, and Game Truth remains at revision 0.

## Visual direction represented

- The primary material grammar comes from comparison C: dark modular pressure construction, broad technical-mosaic masses, restrained orange service detail, and selective cyan diagnostics.
- Comparison B contributes only its clearer floor-plane value separation and gameplay-scale readability.
- The camera remains screen-axis aligned and near overhead. Nothing uses a diamond-isometric floor plane.
- Fine detail is concentrated on the actor, console, door hardware, conduit, and wall edge. The floor stays comparatively calm.
- The sole live-conduit substrate is derived from the authoritative hazard projection and rendered beneath its warning marker; side rooms do not imply additional live hazards.
- Decorative paneling and hardware are presentation only. They do not create collision, navigation, cover, routes, doors, interactables, or other Game Truth.

The exact references, generation prompts, post-processing path, native dimensions, and SHA-256 values are recorded in the provenance evidence. The six generated rasters remain canon candidates. The three marker SVGs are deterministic presentation assets.

## Runtime asset contract

The immutable semantic manifest contains nine identities: floor, wall, pressure door, actor, relay console, three marker roles, and the code-drawn missing-asset fallback.

The paired raster manifest adds:

- one explicit authored path and SHA-256 identity per state binding;
- native pixel dimensions, alpha behavior, layer, and anchor;
- independent loading so one failed asset falls back without blanking the scene;
- nearest-neighbor Pixi sampling;
- exhaustive state coverage checked by the scenario runner.

Version 1.1 intentionally reuses selected static art across several declared states. It proves asset identity, scale, placement, state binding, fallback, and review quality; it does not pretend to supply animation frames or visually distinct open, locked, active, and disabled variants.

## Accessibility and marker evidence

- Interactable: cyan corner brackets; DOM text says Relay Console available.
- Hazard: amber warning triangle with internal exclamation mark; DOM text says Live Conduit.
- Objective: light diamond target with cyan center; DOM text says Reach the relay.
- Shape, internal glyph, text, and placement distinguish every role. Color is supplementary.
- The Pixi canvas is aria-hidden. A Player-known markers DOM list exposes label, role, and shape.
- Runtime and fallback controls are keyboard-operable native buttons with visible focus treatment.
- Fallback changes are announced in an aria-live region.

## Reproduction

~~~powershell
corepack pnpm run spatial:dev
~~~

Open the reported local URL for the normal candidate. Add ?fallback=actor or use Preview missing asset for the forced missing-actor path. The fallback toggle is presentation-only: it does not issue a command, advance a frame, write a checkpoint, or change a codec payload.

## Required verification

~~~powershell
corepack pnpm run spatial:typecheck
corepack pnpm run spatial:build
corepack pnpm run spatial:test -- --scenario render-and-approve-the-production-intent-seed
corepack pnpm run spatial:test -- --scenario launch-one-spatial-runtime-tracer
corepack pnpm run validate:workflow
git diff --check
~~~

All six commands passed at the final fixed review point on 2026-07-19. The Vite build emitted its existing advisory that the main JavaScript chunk exceeds 500 kB; it completed successfully.

The production-seed scenario checks manifest version 1.1.0, canon-candidate status, all semantic and raster state bindings, deep immutability, per-asset fallback, fixture counts, codec continuity, and Game Truth revision 0 after fallback activation.

## Authority boundary

No legacy implementation input was changed. No canonical Nexus source document was changed. Human PASS authorizes this issue's production-intent sample and pipeline direction; it does not silently promote every raster to a canon visual source or approve final textures for the whole game.
