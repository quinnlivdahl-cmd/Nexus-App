# Nexus Location Assembly Prototype

> **DISPOSABLE PROTOTYPE — DO NOT PROMOTE THIS SHELL OR SCHEMA DIRECTLY INTO PRODUCTION.**

## Exact question

Can validated Location Modules and a Location Blueprint assemble the representative three-area derelict Location while preserving navigation, connections, interaction sockets, Interaction Positions, occlusion, and authored Cover Positions?

This is a logic-first spatial prototype. `assembly.mjs` owns the pure module placement, metadata transforms, assembly, and validation logic. `app.mjs` is a thin dependency-free Canvas shell for walking the result and inspecting the complete relevant state.

The Canvas now uses recognizable, labeled derelict test-art cues—deck plating, bulkheads, pressure doors, cargo pallets, machinery, shelving, parts crates, cable clutter, and consoles—so reviewers can understand the place before reading its metadata. This dressing is strictly a legibility aid, not a proposed final art style or an art-direction decision.

## Run — one command

From the repository root:

```powershell
node artifacts/nexus-location-assembly-prototype/server.mjs
```

Open `http://127.0.0.1:4184`.

The server binds only to `127.0.0.1` and uses dedicated port `4184` so it does not collide with the movement/interaction prototype on `4183`.

## What is represented

- Three reusable module definitions authored in local coordinates: Docking Spine, Cargo Transfer Bay, and Signal Workshop.
- One valid Location Blueprint that places the modules and explicitly joins two compatible connection pairs.
- One intentionally invalid Blueprint that moves the workshop 35 units south of its declared seam.
- Actor-radius navigation against the union of all transformed floor rectangles, avoiding collision seams inside valid joins.
- Transformed interaction sockets and authored Interaction Positions.
- Transformed occlusion segments kept distinct from cover metadata.
- Transformed Cover Positions on all four navigable sides of every cover object, with each position retaining its obstacle-facing protected arc.
- Physical fixtures such as the transponder workbench are collision obstacles; guided traversal ends at an authored Interaction Position rather than passing through the socket fixture.
- Fixed accepted movement/camera inputs from the completed movement prototype.

## Controls and diagnostics

- `WASD`: normalized eight-direction movement.
- `T`: same-angle 1.70× tactical pullback.
- **Run guided traversal**: walks the actor at 190 prototype units/second through the corridor, cargo bay, and workshop using the assembled navigation result.
- **Valid Blueprint / Invalid seam case**: switches between the passing representative assembly and the expected failure.
- The default **Scene only** mode hides technical markup. Select one inspection mode at a time to expose module bounds and joined seams, navigable floor, sockets and Interaction Positions, occlusion geometry, Cover Positions and protected arcs, or the traversal route.
- Each inspection mode includes a plain-language legend explaining its marks.
- Occlusion fade is an off-by-default diagnostic fallback, not a requirement for ordinary readability.

Automated logic check:

```powershell
node artifacts/nexus-location-assembly-prototype/checks.mjs
```

## Deliberate boundaries and shortcuts

- This does not select a production runtime, scene graph, navigation library, schema, world-unit contract, or asset pipeline.
- Module floors and obstacles use rectangles; navigation uses deterministic sampling and A* only to make the assembly contract playable.
- The representative Blueprint is fixed and authored. There is no procedural generation and no Campaign Director geometry generation.
- Cover arcs are visible metadata evidence, not a combat or line-of-fire resolver.
- Occluders are diagnostic line geometry, not final render meshes.
- There are no followers, interaction menus, Tactical Pressure rules, production art, persistence, or companion-app integration.
- Numeric movement speed remains prototype evidence, not a production unit contract.

When the review question is answered, capture the verdict and delete this prototype or deliberately absorb only the validated decision.
