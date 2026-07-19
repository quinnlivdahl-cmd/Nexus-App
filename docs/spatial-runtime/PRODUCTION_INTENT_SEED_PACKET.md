# Production-Intent Modular Raster Seed Review Packet

Controlling task: Render and approve the production-intent seed #108

Runtime baseline: db51cec8b5062ea2e1341c4b109fe2e1ec3ac144 from origin/main

Art review baseline: 2ca033bb81f9b77497a5d420b2584434fa185238

Candidate manifest: nexus.production-intent-seed version 2.0.0

Output status: canon candidate

Human gate: version 2 has fresh runtime evidence, completed local validation, independent Standards `PASS`, and independent Spec/player-facing `PASS`. It must not merge before Quintin records `PASS`.

## Decision being requested

Judge whether this is a convincing, reusable, production-caliber gameplay-scale sample set and pipeline direction for Nexus:

- industrial floor and reusable pressure-room shell;
- closed pressure-door slab;
- Field Lead actor sprite;
- relay-console prop;
- live-conduit substrate;
- interactable, hazard, and objective markers that do not depend on color alone.

This is not a claim that Nexus now has final game-wide textures. It is not a finished location kit, animation family, complete state family, palette lock, or canonical source change.

## Prior candidate disposition

The version 1.0 procedural presentation received NEEDS_FIXES on 2026-07-19 because it demonstrated technical composition but did not answer the intended art-quality question. Version 1.1 replaced the procedural surfaces with isolated raster assets, but its thin repeated perimeter and dashboard-heavy composition still fell short of the strongest full-scene treatment.

On 2026-07-19, Quintin identified one image as the best direction. That selection is preserved as non-canon target evidence, not treated as `PASS` and not baked into the runtime. Version 2 keeps the reusable floor, door, actor, console, conduit, and marker assets; adds one transparent nine-slice pressure-room shell derived from the selected material grammar; and makes the Location dominant at the desktop breakpoint while retaining the responsive telemetry panel.

## Runtime evidence

- [User-selected full-scene target](evidence/issue-108/art-direction/production-intent-user-selected-target-2026-07-19.png)
- [1440 × 900 version 2 normal presentation](evidence/issue-108/production-seed-v2-1440x900.png)
- [1374 × 522 playfield-only review crop](evidence/issue-108/production-seed-v2-playfield-1374x522.png)
- [1024 × 768 version 2 responsive presentation](evidence/issue-108/production-seed-v2-1024x768.png)
- [1440 × 900 version 2 missing-actor fallback](evidence/issue-108/production-seed-v2-missing-actor-fallback-1440x900.png)
- [Asset provenance, prompts, dimensions, and hashes](evidence/issue-108/ASSET_PROVENANCE.md)

All three full-interface captures come from the running Pixi application. The normal captures show the same deterministic fixture at committed Game Truth revision 0. At 1440 × 900 the Location uses the full desktop width and telemetry becomes a compact rail below it. At 1024 × 768 the playfield, controls, selected-actor telemetry, marker key, fallback status, and collapsed developer footer remain visible without overlap. The 1024 evidence was normalized by removing one browser-host pixel from the right and bottom edges; no application content was altered.

The fallback capture forces only nexus.seed.actor.field-silhouette.v1 unavailable. A magenta hatched question-mark block replaces the actor presentation, the DOM reports the failed asset identity, and Game Truth remains at revision 0.

## Visual direction represented

- The primary material grammar comes from comparison C: dark modular pressure construction, broad technical-mosaic masses, restrained orange service detail, and selective cyan diagnostics.
- Comparison B contributes only its clearer floor-plane value separation and gameplay-scale readability.
- Quintin's selected full-scene target supplies the version 2 architectural comparison: substantial perimeter mass, coherent corners and service runs, quiet floor fields, and sparse cyan/amber emphasis. Its embedded composition does not define the runtime fixture.
- The camera remains screen-axis aligned and near overhead. Nothing uses a diamond-isometric floor plane.
- Fine detail is concentrated on the actor, console, door hardware, conduit, and wall edge. The floor stays comparatively calm.
- The sole live-conduit substrate is derived from the authoritative hazard projection and rendered beneath its warning marker; side rooms do not imply additional live hazards.
- Decorative paneling and hardware are presentation only. They do not create collision, navigation, cover, routes, doors, interactables, or other Game Truth.

The exact references, generation prompts, post-processing path, native dimensions, and SHA-256 values are recorded in the provenance evidence. The seven generated rasters remain canon candidates. The three marker SVGs are deterministic presentation assets.

## Runtime asset contract

The candidate semantic manifest registers ten identities: floor, retained version 1 wall strip, version 2 room shell, pressure door, actor, relay console, three marker roles, and the code-drawn missing-asset fallback. The normal running scene binds eight distinct identities; the version 1 wall strip remains registered only so the earlier evidence is reproducible, and the missing-asset fallback is bound only when requested or a load fails.

The paired raster manifest adds:

- one explicit authored path and SHA-256 identity per state binding;
- native pixel dimensions, alpha behavior, layer, and anchor;
- independent loading so one failed asset falls back without blanking the scene;
- nearest-neighbor Pixi sampling;
- exhaustive state coverage checked by the scenario runner.

Version 2 intentionally reuses the version 1 focal/static assets across several declared states. It proves asset identity, modular shell composition, scale, placement, state binding, fallback, and review quality; it does not pretend to supply animation frames or visually distinct open, locked, active, and disabled variants.

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

All six commands passed for version 2 on 2026-07-19. The Vite build emitted its existing advisory that the main JavaScript chunk exceeds 500 kB; it completed successfully.

The production-seed scenario checks manifest version 2.0.0, canon-candidate status, the 1102 × 888 alpha room-shell path/hash, retained version 1 registration, all semantic and raster state bindings, exact projection-to-Area topology, deep immutability, per-asset fallback, fixture counts, codec continuity, and Game Truth revision 0 after fallback activation.

The browser playtest also exercised Preview/Restore missing asset, Move east, Step 750 ms, and Checkpoint. Movement reached `10.00, 5.00`, revision advanced to `2`, durability remained `durable`, the fallback state remained presentation-only, and no browser console warnings or errors were present.

## Authority boundary

No legacy implementation input was changed. No canonical Nexus source document was changed. Human PASS authorizes this issue's production-intent sample and pipeline direction; it does not silently promote every raster to a canon visual source or approve final textures for the whole game.
