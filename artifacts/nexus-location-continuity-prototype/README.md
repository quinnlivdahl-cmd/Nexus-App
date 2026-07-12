# Location Continuity Prototype

Throwaway evidence for `Prototype persistent Location continuity through Tactical Pressure`.

Question: does one representative Location preserve entity identity, exact positions, relevant object/hazard/objective state, and camera meaning while moving from Free Movement through Tactical Pressure and Turn-Based Mode to Local Aftermath and back?

Run with:

```powershell
corepack pnpm install
corepack pnpm dev
```

This is not production implementation. An engine-owned in-memory runtime accepts commands and publishes snapshots to React; Pixi renders those snapshots imperatively. The tactical sequence is intentionally scripted so the continuity boundary remains visible.
