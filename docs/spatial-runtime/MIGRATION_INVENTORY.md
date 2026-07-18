# Spatial Runtime Migration Inventory

This inventory belongs to **Launch one spatial-runtime tracer #107**. It records every legacy implementation input inspected or qualified while establishing the production runtime seam. The new runtime and application do not import these legacy modules.

| Legacy input | Classification | Qualification behind the new seam |
| --- | --- | --- |
| `artifacts/nexus-companion/src/store/GameStateContext.tsx` | replace | Its React reducer and automatic local-storage writes remain companion behavior. `@workspace/spatial-runtime` owns command validation, commits, revisions, frames, camera intent, selection, and semantic animation for the spatial application. |
| `artifacts/nexus-companion/src/lib/gameStateSave.ts` | reference-only | Its shape validator informed failure-oriented codec coverage. The versioned Campaign/Location codec is independent and does not accept the companion save format as authoritative spatial state. |
| `artifacts/nexus-companion/src/components/tacmap/TacMap.tsx` | reference-only | Its SVG node/path graph remains presentation and prototype evidence. The PixiJS projection consumes engine-owned coordinates and cannot mutate the runtime. |
| `artifacts/nexus-companion/src/lib/encounter/encounterValidation.test.ts` | adapt as test prior art only | Deterministic fixture assertions and explicit rejection checks are retained as a testing pattern. Encounter State, TacMap nodes, paths, and companion reducers are not imported or copied. |

## New authoritative boundary

- `lib/spatial-runtime` owns the typed Campaign/Location record, command ordering, revisions, deterministic frame progression, camera intent, selection, semantic animation, read-only projections, and the versioned codec.
- `artifacts/nexus-spatial` sends typed commands and consumes read-only React/DOM and PixiJS projections.
- `artifacts/nexus-spatial/scripts/run-scenario.ts` exercises the same runtime command, event, snapshot, frame, projection, and codec interfaces as the application.

No canonical Nexus source document was changed for this implementation tracer.
