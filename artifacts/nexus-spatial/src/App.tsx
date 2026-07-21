import {
  createSpatialRuntime,
  createTraversalFixtureState,
  decodeCampaignLocation,
  encodeCampaignLocation,
  type CampaignCheckpointAdapter,
  type ContextActionId,
  type Direction,
  type ShellProjection,
  type SpatialRuntime,
} from "@workspace/spatial-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SpatialCanvas } from "./SpatialCanvas.js";
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
const SPATIAL_CHECKPOINT_KEY = "nexus.spatial-runtime.rolling-checkpoint.v1";

function createBrowserCheckpointAdapter(
  failFirstWrite: boolean,
): CampaignCheckpointAdapter {
  let shouldFail = failFirstWrite;
  return {
    load: () => window.localStorage.getItem(SPATIAL_CHECKPOINT_KEY),
    serialize: (state) => encodeCampaignLocation(state),
    write: (serialized) => {
      if (shouldFail) {
        shouldFail = false;
        throw new Error("Injected first checkpoint failure.");
      }
      window.localStorage.setItem(SPATIAL_CHECKPOINT_KEY, serialized);
    },
  };
}

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
      if (!MOVEMENT_KEYS.has(event.code)) return;
      event.preventDefault();
      if (heldKeys.has(event.code)) return;
      heldKeys.add(event.code);
      queueFrame();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (!MOVEMENT_KEYS.has(event.code)) return;
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
  }, [onMovementFeedback, runtime]);

  const commandPathToObject = useCallback((objectId: string) => {
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
  }, [onMovementFeedback, runtime]);

  return { commandPathToObject };
}

export function App() {
  const failFirstCheckpoint = useMemo(
    () =>
      new URLSearchParams(window.location.search).get("failCheckpoint") ===
      "once",
    [],
  );
  const checkpointAdapter = useMemo(
    () => createBrowserCheckpointAdapter(failFirstCheckpoint),
    [failFirstCheckpoint],
  );
  const initialRuntime = useMemo(() => {
    try {
      const saved = checkpointAdapter.load();
      if (!saved)
        return {
          runtime: createSpatialRuntime(createTraversalFixtureState(), {
            checkpointAdapter,
          }),
          loadError: null,
          startupMessage: null,
        };
      const restored = decodeCampaignLocation(saved);
      if (!restored.ok)
        return {
          runtime: createSpatialRuntime(createTraversalFixtureState(), {
            checkpointAdapter,
          }),
          loadError: "Saved checkpoint is invalid and was not activated or deleted.",
          startupMessage: null,
        };
      return {
        runtime: createSpatialRuntime(restored.state, { checkpointAdapter }),
        loadError: null,
        startupMessage: `Continued from durable revision ${restored.state.lastDurableRevision}.`,
      };
    } catch {
      return {
        runtime: createSpatialRuntime(createTraversalFixtureState(), {
          checkpointAdapter,
        }),
        loadError: "Saved checkpoint could not be read and was not changed.",
        startupMessage: null,
      };
    }
  }, [checkpointAdapter]);
  const [runtime, setRuntime] = useState(initialRuntime.runtime);
  const [checkpointLoadError, setCheckpointLoadError] = useState(
    initialRuntime.loadError,
  );
  const [startupMessage] = useState(initialRuntime.startupMessage);
  const shell = useShellProjection(runtime);
  const developer = runtime.getDeveloperProjection();
  const movementFeedback = useRef<string | null>(null);
  const [movementNotice, setMovementNotice] = useState<string | null>(null);
  const reportMovementFeedback = useCallback((message: string | null) => {
    if (movementFeedback.current === message) return;
    movementFeedback.current = message;
    setMovementNotice(message);
  }, []);
  const { commandPathToObject } = useTraversalControls(runtime, reportMovementFeedback);
  const [selectedContextTargetId, setSelectedContextTargetId] = useState<
    string | null
  >(null);
  const selectContextTarget = useCallback(
    (objectId: string) => {
      setSelectedContextTargetId(objectId);
      commandPathToObject(objectId);
    },
    [commandPathToObject],
  );
  const contextActionMenu = selectedContextTargetId
    ? runtime.getContextActionMenu(
        shell.selectedActor.id,
        selectedContextTargetId,
      )
    : null;
  const contextActionSequence = useRef(0);
  const resolveRelayAction = useCallback((actionId: ContextActionId) => {
    if (!contextActionMenu) return;
    const current = runtime.getShellProjection();
    const result = runtime.resolveContextAction({
      actionId,
      inputId: `relay-action-${++contextActionSequence.current}`,
      intentLineageId: `relay-selection-${selectedContextTargetId}`,
      entrySurface: "context_action_menu",
      truthRevision: current.revision,
      locationId: contextActionMenu.locationId,
      actorId: current.selectedActor.id,
      targetObjectId: contextActionMenu.targetObjectId,
      actionSurfaceId: actionId,
      interactionPositionId: contextActionMenu.interactionPositionId,
    });
    reportMovementFeedback(result.message);
  }, [contextActionMenu, reportMovementFeedback, runtime, selectedContextTargetId]);
  const retryCheckpoint = useCallback(() => {
    const result = runtime.retryCheckpoint();
    reportMovementFeedback(result.message);
  }, [reportMovementFeedback, runtime]);
  const continueFromCheckpoint = useCallback(() => {
    const result = runtime.continueFromCheckpoint();
    reportMovementFeedback(result.message);
  }, [reportMovementFeedback, runtime]);
  const startFreshFixture = useCallback(() => {
    setRuntime(
      createSpatialRuntime(createTraversalFixtureState(), {
        checkpointAdapter,
      }),
    );
    setCheckpointLoadError(null);
    setSelectedContextTargetId(null);
    reportMovementFeedback("Started a fresh fixture. The stored checkpoint was not deleted.");
  }, [checkpointAdapter, reportMovementFeedback]);
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
            selectedActorId={shell.selectedActor.id}
            onPathToObject={selectContextTarget}
          />
          <div className="camera-chip" aria-hidden="true">{shell.camera.tiltDegrees}° FIXED TILT · {shell.camera.framingScale.toFixed(2)} FRAME</div>
        </div>

        <aside className="controls" aria-label="Spatial runtime controls">
          <div className="panel-heading">
            <p>FIELD TELEMETRY</p>
            <span className={shell.saveStatus === "durable" ? "status-dot durable" : "status-dot"} />
          </div>

          <div className="command-stack" aria-label="Keyboard-operable tracer commands">
            <p className="movement-hint">WASD · normalized eight-direction traversal</p>
            {seedScene.interactables.map((item) => (
              <button key={item.id} type="button" onClick={() => selectContextTarget(item.id)}>
                Path to {item.label}
              </button>
            ))}
            <button type="button" onClick={() => reportMovementFeedback(runtime.checkpoint().message)}>Checkpoint</button>
            <button type="button" onClick={continueFromCheckpoint}>Continue</button>
            {shell.canRetryCheckpoint && <button type="button" className="warning active" onClick={retryCheckpoint}>Retry checkpoint</button>}
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
            {movementNotice ?? startupMessage}
          </p>

          {checkpointLoadError && (
            <section className="actor-roster" role="alert" aria-label="Checkpoint recovery">
              <h2>Checkpoint recovery</h2>
              <p>{checkpointLoadError}</p>
              <button type="button" onClick={startFreshFixture}>Start fresh fixture</button>
            </section>
          )}

          {contextActionMenu && (
            <section className="actor-roster" aria-label={`Context Action Menu for ${contextActionMenu.targetLabel}`}>
              <h2>{contextActionMenu.targetLabel} · Context Actions</h2>
              <div className="command-stack">
                {contextActionMenu.actions.map((action) => (
                  <div key={action.actionId}>
                    <button
                      type="button"
                      disabled={action.status !== "available"}
                      aria-describedby={`${action.actionId}-reason`}
                      onClick={() => resolveRelayAction(action.actionId)}
                    >
                      {action.label}{action.status === "completed" ? " · Complete" : ""}
                    </button>
                    <p id={`${action.actionId}-reason`} className="movement-hint">
                      {action.reason ?? "Available · no Check required"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <dl aria-live="polite" aria-label="Player-critical spatial status">
            <div><dt>Location</dt><dd>{shell.locationLabel}</dd></div>
            <div><dt>Selected</dt><dd>{shell.selectedActor.label}</dd></div>
            <div><dt>Position</dt><dd>{shell.selectedActor.x.toFixed(2)}, {shell.selectedActor.y.toFixed(2)}</dd></div>
            <div><dt>Facing</dt><dd>{shell.selectedActor.facing}</dd></div>
            <div><dt>Motion</dt><dd>{shell.selectedActor.semanticAnimation}</dd></div>
            <div><dt>Revision</dt><dd>{shell.revision}</dd></div>
            <div><dt>Durable revision</dt><dd>{shell.durableRevision}</dd></div>
            <div><dt>Durability</dt><dd>{shell.saveStatus}</dd></div>
            <div><dt>Cable feed</dt><dd>{shell.relay.cableFeedIsolated ? "isolated" : "exposed"}</dd></div>
            <div><dt>Relay</dt><dd>{shell.relay.activated ? "active" : "offline"}</dd></div>
            <div><dt>Latest action</dt><dd>{shell.actionMessage ?? "none"}</dd></div>
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
              {seedScene.markers.filter((marker) => marker.active).map((marker) => {
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
          {shell.durabilityMessage && <p className="movement-notice" aria-live="polite" role="status">{shell.durabilityMessage}</p>}
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
            failFirstCheckpoint,
            checkpointLoadError,
            failedRasterAssetIds,
          }, null, 2)}</pre>
        </div>
      </details>
    </main>
  );
}
