import {
  createSpatialRuntime,
  createPlayerDraftFixtureState,
  type Direction,
  type ShellProjection,
  type SpatialRuntime,
} from "@workspace/spatial-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SpatialCanvas } from "./SpatialCanvas.js";
import { CharacterCreationPanel } from "./CharacterCreationPanel.js";
import {
  PRODUCTION_SEED_MANIFEST,
  buildProductionSeedScene,
} from "./presentationSeed.js";
import {
  FIXED_CAMERA_FRAMING_SCALE,
  FIXED_CAMERA_TILT_DEGREES,
} from "./productionSeedLayout.js";

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

const MOVEMENT_KEYS = new Set(["KeyW", "KeyA", "KeyS", "KeyD"]);
const DIRECT_INPUT_DISTANCE = 0.75;

function directionFromHeldKeys(keys: ReadonlySet<string>): Direction | null {
  const x = Number(keys.has("KeyD")) - Number(keys.has("KeyA"));
  const y = Number(keys.has("KeyS")) - Number(keys.has("KeyW"));
  if (x === 0 && y === 0) return null;
  if (x === 0) return y > 0 ? "south" : "north";
  if (y === 0) return x > 0 ? "east" : "west";
  if (x > 0) return y > 0 ? "south-east" : "north-east";
  return y > 0 ? "south-west" : "north-west";
}

function playerMovementRejection(reason: string): string {
  if (/leaves authored Location geometry|outside authored Location geometry/i.test(reason))
    return "Route ends at this location boundary.";
  if (/inside authored solid geometry|outside authored navigable polygon geometry|no authored polygon-graph route/i.test(reason))
    return "Route blocked by the surrounding structure.";
  if (/^Follower .*cannot retain formation|^Follower .*has no authored route/i.test(reason))
    return "Your team cannot hold formation on that route.";
  return "That route is unavailable.";
}

function useTraversalControls(
  runtime: SpatialRuntime,
  onMovementFeedback: (message: string | null) => void,
  enabled: boolean,
) {
  const commandSequence = useRef(0);
  const requestFrame = useRef<(() => void) | null>(null);

  useEffect(() => {
    const heldKeys = new Set<string>();
    let frameRequest: number | null = null;
    let lastFrameAt: number | null = null;
    let frame = (_now: number) => {};

    const nextCommandId = (prefix: string) => `${prefix}-${++commandSequence.current}`;
    const reportMovementResult = (result: ReturnType<SpatialRuntime["dispatch"]>) => {
      if (result.accepted) {
        onMovementFeedback(null);
      } else if (result.event.type === "command.rejected") {
        onMovementFeedback(playerMovementRejection(result.event.reason));
      }
    };
    const queueFrame = () => {
      if (frameRequest === null) frameRequest = window.requestAnimationFrame(frame);
    };
    frame = (now: number) => {
      frameRequest = null;
      const deltaMs = Math.max(1, Math.min(100, now - (lastFrameAt ?? now - 16)));
      lastFrameAt = now;
      const direction = directionFromHeldKeys(heldKeys);

      if (direction) {
        const shell = runtime.getShellProjection();
        const result = runtime.dispatch({
          type: "actor.move-direction",
          commandId: nextCommandId("wasd"),
          expectedRevision: shell.revision,
          actorId: shell.selectedActor.id,
          direction,
          distance: DIRECT_INPUT_DISTANCE,
        });
        reportMovementResult(result);
      }

      // Presentation requests only an authoritative frame when a command has
      // active movement. A resting UI never advances the simulation.
      if (runtime.hasActiveMovement()) runtime.step(deltaMs);
      if (direction || runtime.hasActiveMovement()) queueFrame();
    };
    requestFrame.current = queueFrame;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!enabled || !MOVEMENT_KEYS.has(event.code)) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, select, textarea, button, [contenteditable='true']")
      )
        return;
      event.preventDefault();
      if (heldKeys.has(event.code)) return;
      heldKeys.add(event.code);
      queueFrame();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (!MOVEMENT_KEYS.has(event.code)) return;
      if (!heldKeys.has(event.code)) return;
      event.preventDefault();
      heldKeys.delete(event.code);
      if (runtime.hasActiveMovement()) queueFrame();
    };
    const clearHeldMovementKeys = () => {
      heldKeys.clear();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") clearHeldMovementKeys();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearHeldMovementKeys);
    window.addEventListener("pagehide", clearHeldMovementKeys);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearHeldMovementKeys);
      window.removeEventListener("pagehide", clearHeldMovementKeys);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frameRequest !== null) window.cancelAnimationFrame(frameRequest);
      requestFrame.current = null;
    };
  }, [enabled, onMovementFeedback, runtime]);

  const commandPathToObject = useCallback((objectId: string) => {
    if (!enabled) return;
    const shell = runtime.getShellProjection();
    const result = runtime.dispatch({
      type: "actor.path-to-object",
      commandId: `path-object-${++commandSequence.current}`,
      expectedRevision: shell.revision,
      actorId: shell.selectedActor.id,
      objectId,
    });
    if (result.accepted) onMovementFeedback(null);
    else if (result.event.type === "command.rejected")
      onMovementFeedback(playerMovementRejection(result.event.reason));
    requestFrame.current?.();
  }, [enabled, onMovementFeedback, runtime]);

  return { commandPathToObject };
}

export function App() {
  const runtime = useMemo(
    () => createSpatialRuntime(createPlayerDraftFixtureState()),
    [],
  );
  const shell = useShellProjection(runtime);
  const campaignActive = shell.campaignPhase === "active";
  const developer = runtime.getDeveloperProjection();
  const movementFeedback = useRef<string | null>(null);
  const [movementNotice, setMovementNotice] = useState<string | null>(null);
  const reportMovementFeedback = useCallback((message: string | null) => {
    if (movementFeedback.current === message) return;
    movementFeedback.current = message;
    setMovementNotice(message);
  }, []);
  const { commandPathToObject } = useTraversalControls(
    runtime,
    reportMovementFeedback,
    campaignActive,
  );
  const [fallbackPreview, setFallbackPreview] = useState(
    () => new URLSearchParams(window.location.search).get("fallback") === "actor",
  );
  const [failedRasterAssetIds, setFailedRasterAssetIds] = useState<readonly string[]>([]);
  const reportRasterLoadFailure = useCallback((assetIds: readonly string[]) => {
    setFailedRasterAssetIds(assetIds);
  }, []);
  const seedScene = useMemo(
    () => buildProductionSeedScene(runtime.getRenderProjection(), new Set(), shell.selectedActor.id),
    [runtime, shell.revision, shell.selectedActor.id],
  );

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

      {shell.playerCharacterCreation ? (
        <CharacterCreationPanel
          runtime={runtime}
          configuration={shell.playerCharacterCreation}
          committedDraft={shell.playerCharacterDraft}
        />
      ) : null}

      <section
        className={campaignActive ? "play-surface" : "play-surface draft-locked"}
        aria-label="Spatial play surface"
        aria-disabled={!campaignActive}
      >
        {!campaignActive ? (
          <div className="campaign-lock" role="status">
            <strong>CAMPAIGN NOT ACTIVE</strong>
            <span>
              Character Creation is draft-only. Spatial movement and pathing remain locked until #113 atomically activates the campaign.
            </span>
          </div>
        ) : null}
        <div className="viewport-shell">
          <div className="viewport-label" aria-hidden="true">
            <span>LOC / DERELICT RELAY</span>
            <span>REV {shell.revision.toString().padStart(3, "0")}</span>
          </div>
          <SpatialCanvas
            runtime={runtime}
            fallbackPreview={fallbackPreview}
            onRasterLoadFailure={reportRasterLoadFailure}
            selectedActorId={shell.selectedActor.id}
            onPathToObject={commandPathToObject}
          />
          <div className="camera-chip" aria-hidden="true">{shell.camera.tiltDegrees}° FIXED TILT · {shell.camera.framingScale.toFixed(2)} FRAME</div>
        </div>

        <aside className="controls" aria-label="Spatial runtime controls">
          <div className="panel-heading">
            <p>FIELD TELEMETRY</p>
            <span className={shell.saveStatus === "durable" ? "status-dot durable" : "status-dot"} />
          </div>

          <div className="command-stack" aria-label="Keyboard-operable tracer commands">
            <p className="movement-hint">
              {campaignActive
                ? "WASD · normalized eight-direction traversal"
                : "WASD and pathing locked · campaign draft-only"}
            </p>
            {seedScene.interactables.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={!campaignActive}
                onClick={() => commandPathToObject(item.id)}
              >
                Path to {item.label}
              </button>
            ))}
            <button type="button" onClick={() => runtime.checkpoint()}>
              {campaignActive ? "Checkpoint" : "Checkpoint draft state"}
            </button>
            <button
              type="button"
              className={fallbackPreview ? "warning active" : "warning"}
              aria-pressed={fallbackPreview}
              onClick={() => setFallbackPreview((active) => !active)}
            >
              {fallbackPreview ? "Restore actor asset" : "Preview missing asset"}
            </button>
          </div>

          <p className="movement-notice" aria-live="polite" role="status">
            {movementNotice}
          </p>

          <dl aria-live="polite" aria-label="Player-critical spatial status">
            <div><dt>Location</dt><dd>{shell.locationLabel}</dd></div>
            <div><dt>Selected</dt><dd>{shell.selectedActor.label}</dd></div>
            <div><dt>Position</dt><dd>{shell.selectedActor.x.toFixed(2)}, {shell.selectedActor.y.toFixed(2)}</dd></div>
            <div><dt>Facing</dt><dd>{shell.selectedActor.facing}</dd></div>
            <div><dt>Motion</dt><dd>{shell.selectedActor.semanticAnimation}</dd></div>
            <div><dt>Revision</dt><dd>{shell.revision}</dd></div>
            <div><dt>Durability</dt><dd>{shell.saveStatus}</dd></div>
            <div><dt>Camera</dt><dd>{shell.camera.tiltDegrees}° tilt · {shell.camera.framingScale.toFixed(2)} frame</dd></div>
            <div><dt>Camera target</dt><dd>{shell.camera.targetActorId}</dd></div>
          </dl>

          <section className="actor-roster" aria-label="Field team actors">
            <h2>Field team</h2>
            <dl>
              {shell.actors.map((actor) => {
                const selected = actor.id === shell.selectedActor.id;
                return (
                  <div key={actor.id} aria-current={selected ? "true" : undefined}>
                    <dt>{actor.label}{selected ? " · Selected PC" : ""}</dt>
                    <dd>{actor.x.toFixed(2)}, {actor.y.toFixed(2)} · {actor.facing} · {actor.semanticAnimation}</dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <section className="area-readout" aria-label="Authored location areas">
            <h2>Authored areas</h2>
            <ul>
              {seedScene.areas.map((area) => (
                <li key={area.id}><strong>{area.label}</strong><span>{area.x}, {area.y} · {area.width} × {area.height}</span></li>
              ))}
            </ul>
          </section>

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
            fixedCamera: {
              tiltDegrees: FIXED_CAMERA_TILT_DEGREES,
              framingScale: FIXED_CAMERA_FRAMING_SCALE,
            },
            fallbackPreview,
            failedRasterAssetIds,
          }, null, 2)}</pre>
        </div>
      </details>
    </main>
  );
}
