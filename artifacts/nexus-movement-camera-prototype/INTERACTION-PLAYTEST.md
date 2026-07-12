# Interaction + Followers Playtest Record

Status: **passed review 2026-07-11**

This is playable evidence for **Prototype interaction, auto-pathing, facing, and simple followers**, not a production specification.

## Fixed input from the accepted movement/camera verdict

- walking speed: `190 prototype units/second`;
- normal camera distance: `0.82×` with adaptive room framing;
- follow softness: `3.2`;
- fixed view: `10°` from true overhead, east/right and north/up;
- tactical pullback: `1.70×` at the same angle; and
- occlusion fading: optional fallback only.

## Suggested playtest route

1. Confirm A, B, and C read as people with a head, torso, arms, legs, facing, and walk motion.
2. Walk A east through the corridor, around the debris, and through the cargo door. Watch B and C traverse the same opening without blocking A.
3. Click the pressure-door panel. Try **Tag for the crew**, then **Cycle pressure door**. Interrupt the automatic approach with `WASD`, then retry it.
4. Cross the cargo room around cover and use both actions on the cargo routing terminal.
5. Return to the corridor, take the narrow south workshop door, thread through the clutter, and use both transponder actions.
6. Click A, B, and C (or use `1`–`3`/`Tab`) in each room. Confirm the dashed ring and Controlled readout make the direct-control target obvious; `WASD` moves that person and the other two resume modest following.
7. Treat the IP circles as diagnostics, not click-to-move commands. Cyan markers say `VALID`. Select the red **Blocked-path test (diagnostic)** and choose **Test unreachable IP1**; confirm it reports `EXPECTED FAILURE` and nobody teleports.
8. Press `P` at an awkward doorway/corner moment. Confirm the three captured markers exactly match the visible people, then resume.
9. Toggle `T` and confirm the strong pullback preserves the fixed view and current positions.

## Questions for Quintin

1. Does clicking an object and choosing from the compact Context Action Menu feel clear without the menu taking over the spatial view?
2. Does automatic approach feel helpful, and is `WASD` cancellation immediate enough to preserve control?
3. Are authored Interaction Positions understandable in diagnostics, and does arriving without visible tile snapping feel natural?
4. Is automatic facing readable at 10°, both during direct movement and on interaction arrival?
5. Is control swapping among the three people clear, including which person is currently controlled?
6. Are the followers modest enough—useful and inspectable, but not fussy—and do they avoid routine snagging or leader blocking?
7. Do their actual Free Movement positions look usable as Tactical Pressure starting positions?
8. Does the visible unreachable-path failure feel honest and understandable?

## Automated/local evidence before handoff

- Accepted projection/static check passes for the Tight values and screen-aligned cardinal axes.
- Local server returns HTTP 200 without dependency installation.
- Browser traversal covered the corridor, cargo opening, cargo cover route, narrow workshop door, and side-room clutter.
- Browser checks exercised all three control swaps, immediate and proximity actions, authored sockets, automatic facing, follower targets, position capture/pause, pullback, and visible path failure.
- Browser console review reported no errors or warnings.

## Verdict

Quintin passed the prototype for immediate gameplay. Object interaction, automatic approach, facing, control swapping, simple follower behavior, and Tactical Pressure position capture are clear enough to carry forward.

Production implementation must remain easy to modify and upgrade as further playtesting identifies improvements. This is an implementation-quality constraint, not approval to promote the disposable Canvas renderer or provisional grid navigation directly into production.
