# Spatial Runtime Migration Inventory

This inventory belongs to **Launch one spatial-runtime tracer #107**. It records every legacy implementation input inspected or qualified while establishing the production runtime seam. The new runtime and application do not import these legacy modules.

| Legacy input                                                              | Classification               | Qualification behind the new seam                                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `artifacts/nexus-companion/src/store/GameStateContext.tsx`                | replace                      | Its React reducer and automatic local-storage writes remain companion behavior. `@workspace/spatial-runtime` owns command validation, commits, revisions, frames, camera intent, selection, and semantic animation for the spatial application. |
| `artifacts/nexus-companion/src/lib/gameStateSave.ts`                      | reference-only               | Its shape validator informed failure-oriented codec coverage. The versioned Campaign/Location codec is independent and does not accept the companion save format as authoritative spatial state.                                                |
| `artifacts/nexus-companion/src/components/tacmap/TacMap.tsx`              | reference-only               | Its SVG node/path graph remains presentation and prototype evidence. The PixiJS projection consumes engine-owned coordinates and cannot mutate the runtime.                                                                                     |
| `artifacts/nexus-companion/src/lib/encounter/encounterValidation.test.ts` | adapt as test prior art only | Deterministic fixture assertions and explicit rejection checks are retained as a testing pattern. Encounter State, TacMap nodes, paths, and companion reducers are not imported or copied.                                                      |

## New authoritative boundary

- `lib/spatial-runtime` owns the typed Campaign/Location record, command ordering, revisions, deterministic frame progression, camera intent, selection, semantic animation, read-only projections, and the versioned codec.
- `artifacts/nexus-spatial` sends typed commands and consumes read-only React/DOM and PixiJS projections.
- `artifacts/nexus-spatial/scripts/run-scenario.ts` exercises the same runtime command, event, snapshot, frame, projection, and codec interfaces as the application.

No canonical Nexus source document was changed for this implementation tracer.

## Render and approve the production-intent seed #108

No legacy implementation input was touched or reused. The commit-pinned art packet at `2ca033bb81f9b77497a5d420b2584434fa185238` was consulted as review evidence only; its images, branch state, and source documents were not copied into the application or granted runtime authority. The presentation manifest and renderer consume the existing immutable spatial render projection, and missing-asset fallback remains presentation-only.

## Traverse the authored three-area derelict #109

| Legacy input                                                 | Classification | Qualification behind the new seam                                                                                                                                                                                |
| ------------------------------------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `artifacts/nexus-companion/src/components/tacmap/TacMap.tsx` | reference-only | Its node/path graph is explicitly rejected as fixture-version-2 navigation authority. The new deterministic planner only accepts the authored polygon graph embedded in the Location.                            |
| Prototype grid and prototype coordinates                     | replace        | Fixture version 2 validates Blueprint modules, solid geometry, cover sides, portals, and polygon-graph nodes/edges before runtime construction; an unqualified grid or TacMap-shaped authority fails validation. |
| Prototype follower placement                                 | replace        | Leader and followers advance only through `SpatialRuntime.dispatch` and `step`; their committed positions are retained in the Campaign/Location codec and never snapped or teleported.                           |

The #109 additions remain additive inside codec version 1. The original tracer fixture remains valid as fixture version 1, while `createTraversalFixtureState` supplies the strict three-area authored fixture. Navigation planning is a pure, state-free query; only runtime dispatch and frame commits mutate actor state.

Follower formation is derived from the leader's normalized final approach: both followers remain behind the leader with opposite perpendicular offsets for cardinal and diagonal movement. Fixture-version-2 solid polygons are blocking obstacles rather than walkable Area duplicates. Pre-play validation rejects required nodes, joins, graph edges, or positioned entities that intersect them, and runtime dispatch rejects blocked destinations or route segments without changing committed Campaign/Location state.

Short repeated movement commands use a direct segment when the actor and destination share one authored navigable polygon and that segment is clear of solid geometry. Cross-polygon, cross-Area, and obstructed movement still routes through the authored polygon graph; navigation remains a read-only planner and only runtime dispatch/step commits positions.

## Resolve and persist one authored Context Action #110

No legacy implementation input was touched. The relay transaction extends the existing `@workspace/spatial-runtime` public seam and the additive `nexus.campaign-location` v1 payload only. `artifacts/nexus-spatial` owns one rolling browser-local checkpoint adapter and submits typed Context Action requests; React, Pixi, navigation controls, and Developer Mode consume immutable projections and do not receive a mutation path. The focused headless scenario uses deterministic in-memory, fail-first-write, and fail-serialization adapters to prove durable retry and no pre-commit serialization mutation without importing a companion reducer or save format.
