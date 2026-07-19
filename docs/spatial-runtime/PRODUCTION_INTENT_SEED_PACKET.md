# Production-Intent Seed Review Packet

Controlling task: Render and approve the production-intent seed #108

Runtime baseline: `db51cec8b5062ea2e1341c4b109fe2e1ec3ac144` from current `origin/main`

Art review baseline: `2ca033bb81f9b77497a5d420b2584434fa185238`

Candidate manifest: `nexus.production-intent-seed` version `1.0.0`, output status `canon candidate`

## Runtime screenshots

- [1440 × 900 normal presentation](evidence/issue-108/production-seed-1440x900.png)
- [1024 × 768 responsive presentation](evidence/issue-108/production-seed-1024x768.png)
- [1440 × 900 missing-actor fallback](evidence/issue-108/production-seed-missing-actor-fallback-1440x900.png)

The normal captures show the same deterministic fixture at committed revision `0`. The fallback capture forces only `nexus.seed.actor.field-silhouette.v1` unavailable through `?fallback=actor`; the magenta hatched `?` block replaces the actor presentation while the DOM reports that Game Truth remains at revision `0`.

## Manifest excerpt

```json
{
  "manifestId": "nexus.production-intent-seed",
  "version": "1.0.0",
  "outputStatus": "canon candidate",
  "provenance": {
    "baselineCommit": "2ca033bb81f9b77497a5d420b2584434fa185238",
    "createdForIssue": 108,
    "sourceDocs": ["ART-REFERENCE-010", "ART-ENVIRONMENT-001", "ART-RUNBOOK-008"],
    "referenceAssets": [
      "nexus-hybrid-pixel-grammar-comparison-2026-07-18.png",
      "nexus-terminal-popup-over-live-location-concept-2026-07-17.png"
    ]
  },
  "scale": {
    "worldUnitPixelsAtReference": 24,
    "referenceViewport": { "width": 1440, "height": 900 },
    "camera": "fixed-orthographic-10-degrees-from-overhead"
  },
  "assetExample": {
    "assetId": "nexus.seed.actor.field-silhouette.v1",
    "version": "1.0.0",
    "outputStatus": "canon candidate",
    "scale": { "worldUnits": 1.4, "mosaicPixelStep": 3 },
    "anchor": {
      "horizontal": "center",
      "vertical": "bottom",
      "offsetWorldUnits": { "x": 0, "y": 0.25 }
    },
    "states": ["idle", "walk", "selected"],
    "fallbackAssetId": "nexus.seed.fallback.missing-asset.v1"
  }
}
```

The immutable manifest contains nine semantic assets: floor, wall, pressure door, actor silhouette, relay-console interactable, three marker roles, and the code-drawn missing-asset fallback. Every record includes provenance, semantic version, scale, anchor, states, and fallback identity using ART-RUNBOOK-008-compatible `canon candidate` status vocabulary.

## Baseline comparison notes

- The base grammar follows comparison C: large calm pixel groupings, quiet material fields, readable construction, and axis-aligned technical assemblies carry the environment before surface noise.
- Selective comparison-A density appears only at intended focal points: the actor faceplate, active relay display, console controls, pressure-door warning bands, and marker internals.
- The scene keeps the accepted fixed orthographic view at 10 degrees from overhead. It does not use a rotated diamond floor plane or a conventional isometric room.
- Floor panels, shallow pressure-wall borders, service channels, and pressure doors establish an industrial maintenance setting without adding authoritative collision, navigation, cover, or game state.
- The candidate is an in-runtime presentation seed, not a finished location kit, sprite family, palette lock, canonical source change, or authorization to normalize sprites.

## Marker accessibility notes

- Interactable: cyan corner brackets plus the DOM label `Relay Console available`.
- Hazard: amber warning triangle with an internal `!` plus the DOM label `Live Conduit`.
- Objective: light diamond target with a cyan center plus the DOM label `Reach the relay`.
- Shape, internal glyph, text, and placement distinguish all three roles; color is supplementary.
- The Pixi canvas is intentionally `aria-hidden`. A `Player-known markers` DOM list exposes the corresponding entity label, role, and shape description.
- Runtime and fallback controls are native keyboard-operable buttons with visible focus treatment. Fallback state is announced in an `aria-live` region.
- The 1024 × 768 capture verifies that the playfield and all critical DOM status remain visible without overlap.

## Reproduction and focused evidence

```powershell
corepack pnpm run spatial:dev
```

Open `http://127.0.0.1:5174/` for the normal candidate and `http://127.0.0.1:5174/?fallback=actor` for the forced missing-asset path. The fallback toggle in the control panel exercises the same presentation-only state without a command, frame, checkpoint, or codec write.

```text
scenario: render-and-approve-the-production-intent-seed
manifestVersion: 1.0.0
outputStatus: canon candidate
semanticAssets: 9
sceneCounts: areas 3, doors 2, actors 1, interactables 1, markers 3
fallbackAssetId: nexus.seed.fallback.missing-asset.v1
gameTruthRevisionAfterFallback: 0
```

No legacy implementation input was touched. No canonical Nexus source document was changed.
