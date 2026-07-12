# Movement + Camera Playtest Record

Status: **verdict received 2026-07-11**

This is evidence for Movement and Camera Prototype, not a production specification.

## Question

What walking feel, room scale, camera follow, fixed tilt, camera distance, tactical pullback, and level-obstruction behavior feel readable in a rough three-area derelict Location?

## Provisional baseline

- Walking speed: `220 units/second`
- Camera distance: `1.00x` user multiplier with adaptive area framing
- Follow softness: `5.0`
- Tactical pullback: `1.38x` camera distance, with the viewing angle unchanged
- Fixed view: screen-aligned top-down axes with an adjustable `0-45 degree` depth tilt (`32 degrees` initially)
- Occlusion: optional near-architecture fade, off by default in the corrected top-down view

These values are starting points exposed for comparison. They are not canon and do not choose the production runtime stack.

## Prototype evidence before handoff

- One-command local server returned HTTP 200 with no dependency install.
- The playable route traversed the narrow docking corridor, its debris obstruction, the pressure-door opening into the open cargo bay, cover in the bay, the narrow workshop door, side-room clutter, and the transponder interaction.
- Collision blocked an attempted route beside the workshop door, then permitted movement through the actual opening.
- Testing exposed and fixed an invisible seam between joined floor modules by checking collision against the union of connected walkable shapes.
- Adaptive framing produced distinct normal zooms for corridor, open room, and side room.
- Tactical pullback changed camera distance without changing the fixed view angle.
- Screenshot review exposed and fixed near-wall obstruction so the controlled character remains readable.
- Tight, Balanced, and Wide presets, live sliders, occlusion toggle, reset, and tactical pullback controls responded in-browser.
- Browser console review reported no errors or warnings.

### Projection correction after first playtest feedback

- Removed the 45-degree world-plane rotation that made east appear southeast and made the scene read as full isometric.
- World east/west now maps directly to screen left/right; world north/south maps directly to screen up/down.
- Increased the floor-plane depth scale and reduced visible wall height so the view reads primarily top-down with only slight depth.
- Changed draw ordering to use north/south depth rather than isometric `x + y` depth.
- Made obstruction fading optional and off by default for the corrected view.
- Added a live Depth tilt slider: `0 degrees` is true overhead; increasing the value compresses floor depth and reveals proportionally more vertical wall/object face.

## Questions for Quintin

1. Which preset is closest: Tight, Balanced, or Wide? Which individual slider values improve it?
2. Does normal walking feel deliberate, sluggish, slippery, or too fast in each space?
3. Do the corridor and door widths feel like believable ship/station scale without snagging?
4. Does the cargo bay feel meaningfully open, and does its camera framing reveal enough cover without making the character tiny?
5. Does camera lead/follow softness help motion readability, or does it lag and fight direction changes?
6. Is the tactical pullback large enough to read the room while preserving the same spatial view?
7. Does obstruction fading preserve both character visibility and the feeling of solid walls/corners?

## Verdict

Quintin selected the **Tight** feel with a strong same-angle tactical pullback and a **10 degree** tilt from true overhead. The selected prototype configuration at the verdict was:

- walking speed: `190 prototype units/second`;
- camera distance: `0.82x`;
- follow softness: `3.2`;
- adaptive room framing: on;
- tactical pullback: `1.70x` camera distance;
- fixed production-facing tilt target: `10 degrees` from overhead; and
- obstruction fading: fallback for genuinely tall obstructions, not a routine camera dependency.

The later Tight verdict supersedes the earlier provisional preference for Balanced movement. Arbitrary angle adjustment remains useful only in the disposable prototype or Developer Mode; production should target one fixed angle and revalidate it when representative character and environment art exists.

This decision does not select the production runtime stack, world-unit contract, navigation system, scene graph, or art pipeline. The `190` speed must be translated and revalidated after production spatial scale and world units are defined. The Canvas implementation remains disposable evidence rather than production implementation.
