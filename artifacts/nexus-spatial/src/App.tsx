import {
  createSpatialRuntime,
  createTracerFixtureState,
  type ShellProjection,
  type SpatialRuntime,
} from "@workspace/spatial-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SpatialCanvas } from "./SpatialCanvas.js";
import {
  PRODUCTION_SEED_MANIFEST,
  buildProductionSeedScene,
} from "./presentationSeed.js";

const markerPresentation = {
  interactable: { symbol: "⌜⌟", className: "brackets", description: "corner brackets" },
  hazard: { symbol: "!", className: "triangle", description: "warning triangle" },
  objective: { symbol: "◆", className: "diamond", description: "diamond target" },
} as const;

function useShellProjection(runtime: SpatialRuntime): ShellProjection {
  const [projection, setProjection] = useState(() => runtime.getShellProjection());
  useEffect(
    () => runtime.subscribe(() => setProjection(runtime.getShellProjection())),
    [runtime],
  );
  return projection;
}

export function App() {
  const runtime = useMemo(() => createSpatialRuntime(createTracerFixtureState()), []);
  const shell = useShellProjection(runtime);
  const developer = runtime.getDeveloperProjection();
  const [fallbackPreview, setFallbackPreview] = useState(
    () => new URLSearchParams(window.location.search).get("fallback") === "actor",
  );
  const [failedRasterAssetIds, setFailedRasterAssetIds] = useState<readonly string[]>([]);
  const reportRasterLoadFailure = useCallback((assetIds: readonly string[]) => {
    setFailedRasterAssetIds(assetIds);
  }, []);
  const seedScene = useMemo(
    () => buildProductionSeedScene(runtime.getRenderProjection()),
    [runtime, shell.revision],
  );

  const issueMove = () => {
    runtime.dispatch({
      type: "actor.move",
      commandId: `ui-move-${shell.revision + 1}`,
      expectedRevision: shell.revision,
      actorId: shell.selectedActor.id,
      destination: { x: 10, y: 5 },
    });
  };

  return (
    <main>
      <header className="mission-header">
        <div>
          <p className="eyebrow">Production-intent seed · canon candidate</p>
          <h1>Derelict relay / technical mosaic</h1>
        </div>
        <div className="manifest-stamp" aria-label="Presentation manifest status">
          <span>SEED MANIFEST</span>
          <strong>v{PRODUCTION_SEED_MANIFEST.version}</strong>
          <small>baseline 2ca033b</small>
        </div>
      </header>

      <section className="play-surface" aria-label="Spatial play surface">
        <div className="viewport-shell">
          <div className="viewport-label" aria-hidden="true">
            <span>LOC / DERELICT RELAY</span>
            <span>REV {shell.revision.toString().padStart(3, "0")}</span>
          </div>
          <SpatialCanvas
            runtime={runtime}
            fallbackPreview={fallbackPreview}
            onRasterLoadFailure={reportRasterLoadFailure}
          />
          <div className="camera-chip" aria-hidden="true">10° FIXED ORTHO · 0.82× FRAME</div>
        </div>

        <aside className="controls" aria-label="Spatial runtime controls">
          <div className="panel-heading">
            <p>FIELD TELEMETRY</p>
            <span className={shell.saveStatus === "durable" ? "status-dot durable" : "status-dot"} />
          </div>

          <div className="command-stack" aria-label="Keyboard-operable tracer commands">
            <button type="button" onClick={issueMove}>Move east</button>
            <button type="button" onClick={() => runtime.step(750)}>Step 750 ms</button>
            <button type="button" onClick={() => runtime.checkpoint()}>Checkpoint</button>
            <button
              type="button"
              className={fallbackPreview ? "warning active" : "warning"}
              aria-pressed={fallbackPreview}
              onClick={() => setFallbackPreview((active) => !active)}
            >
              {fallbackPreview ? "Restore actor asset" : "Preview missing asset"}
            </button>
          </div>

          <dl aria-live="polite" aria-label="Player-critical spatial status">
            <div><dt>Selected</dt><dd>{shell.selectedActor.label}</dd></div>
            <div><dt>Position</dt><dd>{shell.selectedActor.x.toFixed(2)}, {shell.selectedActor.y.toFixed(2)}</dd></div>
            <div><dt>Facing</dt><dd>{shell.selectedActor.facing}</dd></div>
            <div><dt>Motion</dt><dd>{shell.selectedActor.semanticAnimation}</dd></div>
            <div><dt>Revision</dt><dd>{shell.revision}</dd></div>
            <div><dt>Durability</dt><dd>{shell.saveStatus}</dd></div>
          </dl>

          <section className="marker-key" aria-label="Non-color-only marker key">
            <h2>Player-known markers</h2>
            <ul>
              {seedScene.markers.map((marker) => {
                const presentation = markerPresentation[marker.kind];
                return (
                  <li key={marker.id}>
                    <span className={`marker ${presentation.className}`} aria-hidden="true">{presentation.symbol}</span>
                    <span>
                      <strong>{marker.label}</strong>
                      <small>{marker.kind} · {presentation.description}</small>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <p className="fallback-status" aria-live="polite">
            Presentation fallback: <strong>{fallbackPreview ? "preview active for nexus.seed.actor.field-silhouette.v1" : "preview standby"}</strong>.{" "}
            {failedRasterAssetIds.length > 0 && <>Raster load fallback active for failed asset ID{failedRasterAssetIds.length === 1 ? "" : "s"}: <strong>{failedRasterAssetIds.join(", ")}</strong>.{" "}</>}
            Game Truth revision remains {shell.revision}.
          </p>
        </aside>
      </section>

      <details>
        <summary>Developer Mode / immutable presentation contract</summary>
        <div className="developer-grid">
          <pre>{JSON.stringify(developer, null, 2)}</pre>
          <pre>{JSON.stringify({
            manifestId: PRODUCTION_SEED_MANIFEST.manifestId,
            version: PRODUCTION_SEED_MANIFEST.version,
            outputStatus: PRODUCTION_SEED_MANIFEST.outputStatus,
            semanticAssetCount: Object.keys(PRODUCTION_SEED_MANIFEST.assets).length,
            fallbackPreview,
            failedRasterAssetIds,
          }, null, 2)}</pre>
        </div>
      </details>
    </main>
  );
}
