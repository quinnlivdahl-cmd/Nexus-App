# Nexus Interaction + Followers Prototype

> **DISPOSABLE PROTOTYPE — do not promote directly to production.**

This artifact extends the accepted movement/camera feel-test to answer **Prototype interaction, auto-pathing, facing, and simple followers**: whether world-object selection, compact Context Action Menus, automatic approach to authored Interaction Positions, readable facing, control swapping, and deliberately simple followers feel clear during Free Movement.

The dependency-free Canvas 2D renderer and provisional grid navigation are evidence mechanisms only. They do **not** choose a production runtime, scene graph, navigation system, animation pipeline, or world-unit contract.

## Run

From `C:\Users\Quintin Livdahl\Repos\Nexus-App-Worktrees\Nexus-App-Prototype-Movement-Camera-13`:

```powershell
node artifacts/nexus-movement-camera-prototype/server.mjs
```

Open `http://127.0.0.1:4183`.

## Controls

- `WASD`: direct screen-aligned movement; immediately cancels an active auto-path.
- Click a person, press `1`, `2`, `3`, or use `Tab`: take direct control of that person; the bright dashed ring shows who receives `WASD`.
- Click a cyan/red world object: select it and open its Context Action Menu.
- `IP1`/`IP2` circles: diagnostic Interaction Positions, not click-to-move commands. Cyan positions are valid; the red blocked-test IP is intentionally unreachable.
- `T`: toggle the accepted same-angle `1.70×` tactical pullback.
- `P`: capture exact A/B/C Tactical Pressure starting positions and pause; press again to resume.
- `G`: toggle path, Interaction Position, follower-target, and capture diagnostics.
- `R`: reset the artifact to the accepted Tight baseline.

See `INTERACTION-PLAYTEST.md` for the intended route and verdict questions.
