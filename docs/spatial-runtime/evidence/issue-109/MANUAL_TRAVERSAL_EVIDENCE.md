# Issue #109 manual traversal evidence

Captured from the final local candidate in a fresh Microsoft Edge Chromium session at an exact `1440 × 900` viewport. The session used the running application and shared runtime seam; no gameplay state or mock data was injected.

## Reproduction

1. Start the task-specific spatial Vite server on `127.0.0.1:5181`.
2. Open `http://127.0.0.1:5181/` in a fresh Edge Chromium profile at `1440 × 900`, device scale factor `1`.
3. Confirm the initial DOM projection reports Player Character at `4.00, 5.00`, facing east, idle, committed revision `0`, durability `durable`.
4. Hold `D` for 900 ms. While held, the DOM reports Player Character at `10.56, 5.00`, facing east, walking, revision `80`. After release and settling, it reports `11.31, 5.00`, idle, revision `89`.
5. Click the rendered Relay Console in the Pixi playfield at viewport coordinate `1192.5, 389.109375`. Pathing begins at revision `91` with Player Character walking.
6. Allow the shared movement seam to settle, then open Developer Mode and compare its committed revision to the player-critical DOM projection.

## Final player-facing projection

- Location: `Authored Three-Area Derelict`
- Selected: `Player Character`
- Player Character: `29.00, 5.00 · east · idle`
- Follower One: `27.00, 4.00 · north-east · idle`
- Follower Two: `27.00, 6.00 · south-east · idle`
- Revision: `285`
- Durability: `not-yet-durable`
- Camera: `10° tilt · 0.82 frame`
- Camera target: `player-character`
- Areas shown in Pixi and the DOM: `Sealed Corridor`, `Open Cover Bay`, `Cluttered Side Area`
- Pixi canvas count: `1`
- Raster fallback failures: none

The Field Team DOM roster is read-only: it labels the selected Player Character and projects both followers without follower command controls.

## Matching Developer projection

- `committedRevision`: `285` — matches the DOM revision
- `lastDurableRevision`: `0`
- `frame`: `243`
- `selectedActorId`: `player-character`
- camera: `follow-selected`, target `player-character`, tilt `10`, framing scale `0.82`
- last event: `frame.committed`, revision `285`, sequence `285`

## Focused deterministic scenario

Command:

```powershell
corepack pnpm run spatial:test -- --scenario traverse-the-authored-three-area-derelict
```

Result: pass. Scenario revision `7`; Player Character finishes at `29, 5` facing east, Follower One at `27, 4` facing north-east, and Follower Two at `27, 6` facing south-east. The scenario camera reports `10` degrees and `0.82` framing.

## Captures

- [Final three-Area traversal view](issue-109-traversal-final-1440x900.png)
- [Matching DOM and Developer revision](issue-109-developer-final-1440x900.png)
