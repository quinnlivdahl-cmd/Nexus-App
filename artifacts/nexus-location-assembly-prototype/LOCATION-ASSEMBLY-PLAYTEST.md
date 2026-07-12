# Location Assembly Playtest

> **DISPOSABLE PROTOTYPE.** This checkpoint gathers evidence for the Location assembly contract; it is not production implementation.

## Fixed accepted inputs

These are fixed evidence from the completed movement/camera ticket, not variables under review here:

- 10° from true overhead; no 45° world rotation.
- East reads right and north reads up.
- 190 prototype units/second with normalized diagonal movement.
- 0.82× normal framing with adaptive Area factors.
- Follow softness 3.2.
- 1.70× same-angle tactical pullback.
- Occlusion fading only as a fallback for genuinely obstructing architecture.

## Start

From the isolated worktree root:

```powershell
node artifacts/nexus-location-assembly-prototype/server.mjs
```

Open `http://127.0.0.1:4184`.

## Short traversal and diagnostics route

1. Begin in **Scene only**. Confirm the labeled deck, bulkheads, pressure doors, cargo equipment, and workshop fixtures make the three Areas understandable without technical markup.
2. Confirm the valid Blueprint reports `VALIDATION PASS`, then use `WASD` from the Docking Spine, pass the collapsed conduit, and cross the cargo bulkhead into the Cargo Transfer Bay.
3. Walk around the freight cover and cargo indexing rig; inspect the cargo terminal socket and its two Interaction Positions. In **Cover** mode, confirm each cover object exposes reachable positions on all four sides.
4. Return through the cargo seam, enter the narrower workshop pressure-door bridge, and cross into the Signal Workshop without an invisible collision seam.
5. Walk around the shelves, crates, and cable nest to the transponder bench. Confirm the solid bench cannot be walked through and the route ends at its west Interaction Position rather than on the socket.
6. Press `T` once in any Area to verify the 1.70× same-angle tactical pullback, then press it again to restore normal framing.
7. Select one inspection mode at a time. Compare **Occlusion** against **Cover**, and enable foreground-wall fade only while inspecting its fallback behavior.
8. Click **Run guided traversal** for the deterministic all-three-Area route and visited-Area evidence.
9. Switch to **Invalid seam case**. Confirm the workshop moves 35 units south, the two declared seam lines separate, and the validator explains `JOIN_SEAM_MISALIGNED`, failed seam navigation, and disconnected module navigation.

## Automated and browser evidence

| Evidence | Result |
|---|---|
| Pure assembly/navigation check | PASS on 2026-07-11 after review correction: 7 checks; 3 modules; 2 joins; 3 sockets; 5 Interaction Positions; 16 occluders; 24 Cover Positions. The bench socket is non-occupiable and every cover object has validated positions on all four sides. |
| Expected invalid diagnostic | PASS on 2026-07-11: `JOIN_SEAM_MISALIGNED` reported for `corridor-to-workshop` at 35 units. |
| Actor-radius traversal | PASS on 2026-07-11: deterministic route visits Docking Spine, Cargo Transfer Bay, and Signal Workshop without leaving navigable space. |
| HTTP 200 on port 4184 | PASS on 2026-07-11: both `/` and `/healthz` returned HTTP 200; root HTML contained the prototype title. |
| Browser traversal and console | PASS on 2026-07-11 in the in-app browser after the scene-first revision: the 190 u/s guided route completed with `all 3 Areas visited`; 1.70× tactical pullback toggled and restored; warning/error console log query returned `[]`. |
| Focused diagnostics | PASS on 2026-07-11: Scene, Modules + seams, Navigation, Interactions, Occlusion, Cover, and Traversal each became the sole active inspection mode and showed a plain-language legend. The invalid case automatically opened Modules + seams and displayed `JOIN_SEAM_MISALIGNED`. |
| Visual inspection | PASS on 2026-07-11: screenshots of the scene-first Docking Spine, Signal Workshop interaction overlay, and invalid 35-unit seam were reviewed. Labeled deck spaces, bulkheads, doors, cargo/workshop props, sockets/positions, and separated seam marks rendered visibly. Screenshots remain session evidence rather than production assets. |
| Review correction | PASS on 2026-07-11: the guided route ends at the bench-west Interaction Position `(620, 760)`; repeated eastward input stops at `(626, 760)` against the solid workbench. Cover mode visually exposes north/south/east/west positions for each cover object, and browser logs remained empty. |

## Focused verdict questions

1. Does the assembled result read as one derelict Location rather than three visibly stitched test rooms?
2. Can you traverse all three Areas without feeling a collision, navigation, or camera discontinuity at either join?
3. Are module identifiers, compatible connection points, joined seams, and validator reasons understandable enough to diagnose assembly problems?
4. Do interaction sockets and authored Interaction Positions remain spatially credible after their module transforms?
5. Do cover objects clearly provide reachable Cover Positions on every navigable side, without implying the old one-direction tactical-map rule?
6. Does the intentionally offset workshop fail for the right reason, in a way that would prevent a bad Location from entering play?
7. Is this enough evidence to proceed toward a formal Location assembly contract, or what must change before that contract is drafted?

## Verdict

**Verdict: PASS — Quintin, 2026-07-11.**

The prototype supplies enough playable evidence to proceed with validated Location Modules and a Location Blueprint as the assembly direction for the representative derelict. The accepted review correction is part of the result: physical fixtures are not passable, guided interaction traversal ends at an authored Interaction Position, and each cover object exposes validated positions on all four navigable sides rather than a single legacy directional slot.

This verdict does not approve the Canvas test-art as final visual style. Production art direction and FTL-level detail remain separate work.
