import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  ACTOR_VISUAL_COLLISION_FOOTPRINT,
  CAMPAIGN_LOCATION_CODEC,
  type CampaignCheckpointAdapter,
  createSpatialRuntime,
  createTracerFixtureState,
  createTraversalFixtureState,
  decodeCampaignLocation,
  encodeCampaignLocation,
  validateCampaignLocationState,
  planAuthoredPolygonGraphRoute,
  ROOM_SHELL_VISIBLE_INNER_FACE_INSET,
  segmentStaysInPolygon,
  TRAVERSAL_DOOR_THROAT,
} from "@workspace/spatial-runtime";
import {
  MISSING_ASSET_FALLBACK_ID,
  PRODUCTION_SEED_MANIFEST,
  buildProductionSeedScene,
} from "../src/presentationSeed.js";
import {
  PRODUCTION_SEED_RASTER_ENTRIES,
  PRODUCTION_SEED_RASTER_MANIFEST,
} from "../src/productionSeedRasterManifest.js";
import { deriveProductionSeedLayout } from "../src/productionSeedLayout.js";

const TRACER_SCENARIO = "launch-one-spatial-runtime-tracer";
const PRODUCTION_SEED_SCENARIO =
  "render-and-approve-the-production-intent-seed";
const TRAVERSAL_SCENARIO = "traverse-the-authored-three-area-derelict";
const CONTEXT_ACTION_SCENARIO = "resolve-and-persist-one-authored-context-action";
const ROOM_SHELL_ASSET = "nexus.seed.wall.pressure-room-shell.v2";
const ROOM_SHELL_HASH =
  "2b0e5656ab382921eab12f57dc3b42df8d3bf398db8dac06a11aee2c2550f971";

function requestedScenario(): string {
  const scenarioIndex = process.argv.indexOf("--scenario");
  return scenarioIndex >= 0
    ? (process.argv[scenarioIndex + 1] ?? "")
    : TRACER_SCENARIO;
}

function runTracerScenario() {
  const fixture = createTracerFixtureState();
  assert.deepEqual(validateCampaignLocationState(fixture), {
    ok: true,
    issues: [],
  });

  const encodedFixture = encodeCampaignLocation(fixture, {
    "ticket-107": { fixture: true },
  });
  const decodedFixture = decodeCampaignLocation(encodedFixture);
  if (!decodedFixture.ok) assert.fail(decodedFixture.error);
  assert.equal(JSON.parse(encodedFixture).format, CAMPAIGN_LOCATION_CODEC);
  assert.deepEqual(decodedFixture.state, fixture);
  assert.deepEqual(decodedFixture.extensions, {
    "ticket-107": { fixture: true },
  });

  const runtime = createSpatialRuntime(decodedFixture.state);
  const events: string[] = [];
  runtime.subscribe((event) =>
    events.push(`${event.sequence}:${event.type}:${event.revision}`),
  );

  const command = runtime.dispatch({
    type: "actor.move",
    commandId: "scenario-move-1",
    expectedRevision: 0,
    actorId: "field-lead",
    destination: { x: 10, y: 5 },
  });
  assert.equal(command.accepted, true);
  assert.equal(command.snapshot.committedRevision, 1);
  assert.equal(command.snapshot.location.actors[0]?.semanticAnimation, "walk");
  assert.equal(command.snapshot.location.camera.targetActorId, "field-lead");

  const frame = runtime.step(750);
  assert.equal(frame.committedRevision, 2);
  assert.equal(frame.frame, 1);
  assert.deepEqual(frame.location.actors[0]?.position, { x: 10, y: 5 });
  assert.equal(frame.location.actors[0]?.semanticAnimation, "idle");

  const render = runtime.getRenderProjection();
  const shell = runtime.getShellProjection();
  const developer = runtime.getDeveloperProjection();
  assert.equal(render.revision, 2);
  assert.equal(shell.revision, 2);
  assert.equal(developer.committedRevision, 2);
  assert.equal(developer.lastEvent?.type, "frame.committed");
  assert.deepEqual(render.actors[0], {
    id: "field-lead",
    label: "Field Lead",
    x: 10,
    y: 5,
    facing: "east",
    semanticAnimation: "idle",
  });
  assert.throws(() => {
    (render.actors[0] as { x: number }).x = 999;
  }, TypeError);
  assert.equal(runtime.getSnapshot().location.actors[0]?.position.x, 10);

  const unsupportedCrossAreaMove = runtime.dispatch({
    type: "actor.move",
    commandId: "scenario-cross-area-1",
    expectedRevision: 2,
    actorId: "field-lead",
    destination: { x: 18, y: 5 },
  });
  assert.equal(unsupportedCrossAreaMove.accepted, false);
  assert.match(
    unsupportedCrossAreaMove.event.type === "command.rejected"
      ? unsupportedCrossAreaMove.event.reason
      : "",
    /current authored Area/,
  );
  assert.equal(runtime.getSnapshot().committedRevision, 2);

  const stale = runtime.dispatch({
    type: "actor.select",
    commandId: "scenario-stale-1",
    expectedRevision: 0,
    actorId: "field-lead",
  });
  assert.equal(stale.accepted, false);
  assert.match(
    stale.event.type === "command.rejected" ? stale.event.reason : "",
    /Stale command/,
  );
  assert.equal(runtime.getSnapshot().committedRevision, 2);

  const checkpoint = runtime.checkpoint();
  assert.equal(checkpoint.saved, true);
  assert.equal(checkpoint.snapshot.committedRevision, 2);
  assert.equal(checkpoint.snapshot.lastDurableRevision, 2);
  assert.deepEqual(events, [
    "1:command.committed:1",
    "2:frame.committed:2",
    "3:command.rejected:2",
    "4:command.rejected:2",
    "5:checkpoint.committed:2",
  ]);

  const unsupported = JSON.parse(encodeCampaignLocation(checkpoint.snapshot)) as { version: number };
  unsupported.version = 2;
  const unsupportedResult = decodeCampaignLocation(JSON.stringify(unsupported));
  assert.equal(unsupportedResult.ok, false);
  if (!unsupportedResult.ok)
    assert.match(unsupportedResult.error, /Unsupported/);

  return {
    scenario: TRACER_SCENARIO,
    committedRevision: checkpoint.snapshot.committedRevision,
    durableRevision: checkpoint.snapshot.lastDurableRevision,
    frame: checkpoint.snapshot.frame,
    actorPosition: checkpoint.snapshot.location.actors[0]?.position,
    projections: ["pixi", "react-dom", "developer-mode", "headless"],
  };
}

function memoryCheckpointAdapter(): CampaignCheckpointAdapter & { readonly writes: () => number } {
  let value: string | null = null;
  let writes = 0;
  return {
    load: () => value,
    serialize: (state) => encodeCampaignLocation(state),
    write: (serialized) => { writes += 1; value = serialized; },
    writes: () => writes,
  };
}

function failFirstCheckpointAdapter(): CampaignCheckpointAdapter & { readonly writes: () => number } {
  const memory = memoryCheckpointAdapter();
  let first = true;
  return {
    load: memory.load,
    serialize: memory.serialize,
    write: (serialized) => {
      if (first) {
        first = false;
        throw new Error("Injected first checkpoint failure.");
      }
      memory.write(serialized);
    },
    writes: memory.writes,
  };
}

function failSerializationAdapter(): CampaignCheckpointAdapter {
  return {
    load: () => null,
    serialize: () => { throw new Error("Injected serialization failure."); },
    write: () => assert.fail("A failed serialization must not write a checkpoint."),
  };
}

function arriveAtRelay(runtime: ReturnType<typeof createSpatialRuntime>) {
  const start = runtime.getShellProjection();
  const path = runtime.dispatch({
    type: "actor.path-to-object",
    commandId: "context-path-relay",
    expectedRevision: start.revision,
    actorId: start.selectedActor.id,
    objectId: "relay-console",
  });
  assert.equal(path.accepted, true);
  while (runtime.hasActiveMovement()) runtime.step(1_000);
  assert.deepEqual(runtime.getShellProjection().selectedActor, {
    id: "player-character",
    label: "Player Character",
    x: 29,
    y: 5,
    facing: "east",
    semanticAnimation: "idle",
  });
}

function relayInput(
  runtime: ReturnType<typeof createSpatialRuntime>,
  actionId: "relay.isolate-cable-feed" | "relay.activate",
  inputId: string,
  truthRevision = runtime.getShellProjection().revision,
) {
  const shell = runtime.getShellProjection();
  return {
    actionId,
    inputId,
    intentLineageId: `intent:${inputId}`,
    entrySurface: "context_action_menu" as const,
    truthRevision,
    locationId: runtime.getSnapshot().location.id,
    actorId: shell.selectedActor.id,
    targetObjectId: "relay-console",
    actionSurfaceId: actionId,
    interactionPositionId: "relay-console-use",
  };
}

function relayRequest(
  runtime: ReturnType<typeof createSpatialRuntime>,
  actionId: "relay.isolate-cable-feed" | "relay.activate",
  inputId: string,
) {
  return runtime.resolveContextAction(relayInput(runtime, actionId, inputId));
}

function runContextActionScenario() {
  const adapter = failFirstCheckpointAdapter();
  const runtime = createSpatialRuntime(createTraversalFixtureState(), { checkpointAdapter: adapter });
  const events: string[] = [];
  runtime.subscribe((event) => events.push(`${event.type}:${event.revision}`));
  arriveAtRelay(runtime);
  const initialMenu = runtime.getContextActionMenu(
    "player-character",
    "relay-console",
  );
  assert.ok(initialMenu);
  assert.deepEqual(
    initialMenu.actions.map((action) => [
      action.actionId,
      action.status,
      action.reason,
    ]),
    [
      ["relay.isolate-cable-feed", "available", null],
      [
        "relay.activate",
        "blocked",
        "Isolate the exposed cable feed before activating the relay.",
      ],
    ],
  );

  const truthBeforeBlocked = runtime.getSnapshot();
  const blocked = relayRequest(runtime, "relay.activate", "relay-activate-blocked");
  assert.equal(blocked.accepted, false);
  assert.equal(blocked.message, "Isolate the exposed cable feed before activating the relay.");
  assert.deepEqual(runtime.getSnapshot(), truthBeforeBlocked);

  const beforeIsolate = runtime.getSnapshot();
  const isolateInput = relayInput(
    runtime,
    "relay.isolate-cable-feed",
    "relay-isolate",
  );
  const isolate = runtime.resolveContextAction(isolateInput);
  assert.equal(isolate.accepted, true);
  assert.equal(isolate.status, "committed");
  assert.equal(
    isolate.message,
    "Cable feed isolated. Active in this session, but not saved.",
  );
  assert.equal(isolate.transaction?.check, "not-required");
  assert.deepEqual(isolate.transaction?.effects, [
    { type: "hazard.isolated", hazardId: "exposed-cable" },
  ]);
  assert.deepEqual(isolate.transaction?.stateDeltas, [
    {
      operation: "hazard.set-active",
      targetId: "exposed-cable",
      expectedBefore: true,
      value: false,
    },
  ]);
  assert.equal(runtime.getSnapshot().committedRevision, beforeIsolate.committedRevision + 1);
  assert.equal(runtime.getSnapshot().lastDurableRevision, beforeIsolate.lastDurableRevision);
  assert.equal(
    runtime.getSnapshot().location.hazards.find(
      (hazard) => hazard.id === "exposed-cable",
    )?.active,
    false,
  );
  assert.equal(runtime.getShellProjection().saveStatus, "degraded");
  assert.equal(
    runtime.getShellProjection().durabilityMessage,
    "Saving is degraded. Retry the checkpoint before activating the relay.",
  );
  const beforeDuplicate = runtime.getSnapshot();
  const duplicate = runtime.resolveContextAction(isolateInput);
  assert.equal(duplicate.accepted, true);
  assert.equal(duplicate.status, "duplicate");
  assert.equal(duplicate.message, "Cable feed isolated.");
  assert.deepEqual(runtime.getSnapshot(), beforeDuplicate);
  const mismatchedDuplicate = runtime.resolveContextAction({
    ...isolateInput,
    actionId: "relay.activate",
    actionSurfaceId: "relay.activate",
  });
  assert.equal(mismatchedDuplicate.accepted, false);
  assert.equal(
    mismatchedDuplicate.message,
    "That action identity is already committed to a different request.",
  );
  assert.deepEqual(runtime.getSnapshot(), beforeDuplicate);
  const blockedWhileDegraded = relayRequest(runtime, "relay.activate", "relay-activate-degraded");
  assert.equal(blockedWhileDegraded.accepted, false);
  assert.equal(
    blockedWhileDegraded.message,
    "Saving is degraded. Retry the checkpoint before activating the relay.",
  );

  const retry = runtime.retryCheckpoint();
  assert.equal(retry.saved, true);
  assert.equal(runtime.getShellProjection().saveStatus, "durable");
  assert.equal(runtime.getShellProjection().actionMessage, "Cable feed isolated.");
  assert.equal(runtime.getSnapshot().lastDurableRevision, runtime.getSnapshot().committedRevision);
  assert.equal(
    runtime.getRenderProjection().hazards.find(
      (hazard) => hazard.id === "exposed-cable",
    )?.active,
    false,
  );
  assert.equal(
    runtime.getRenderProjection().objectives.find(
      (objective) => objective.id === "activate-relay",
    )?.active,
    true,
  );
  assert.equal(adapter.writes(), 1);

  const activate = relayRequest(runtime, "relay.activate", "relay-activate");
  assert.equal(activate.accepted, true);
  assert.equal(activate.transaction?.check, "not-required");
  assert.equal(runtime.getSnapshot().location.objectives.find((objective) => objective.id === "activate-relay")?.status, "complete");
  assert.equal(
    runtime.getRenderProjection().objectives.find(
      (objective) => objective.id === "activate-relay",
    )?.active,
    false,
  );
  assert.equal(adapter.writes(), 2);
  assert.equal(events.filter((event) => event.startsWith("context-action.committed")).length, 2);
  assert.throws(() => {
    (runtime.getShellProjection().relay as { activated: boolean }).activated = false;
  }, TypeError);

  const restored = createSpatialRuntime(createTraversalFixtureState(), { checkpointAdapter: adapter });
  const restoredEvents: string[] = [];
  restored.subscribe((event) => restoredEvents.push(event.type));
  const continued = restored.continueFromCheckpoint();
  assert.equal(continued.saved, true);
  assert.equal(restored.getShellProjection().actionMessage, "Relay activated.");
  assert.equal(restored.getSnapshot().location.objectives.find((objective) => objective.id === "activate-relay")?.status, "complete");
  assert.equal(
    restoredEvents.includes("context-action.committed"),
    false,
  );

  const staleState = restored.getSnapshot();
  const stale = restored.resolveContextAction(
    relayInput(
      restored,
      "relay.activate",
      "relay-stale",
      staleState.committedRevision - 1,
    ),
  );
  assert.equal(stale.accepted, false);
  assert.deepEqual(restored.getSnapshot(), staleState);

  const serializationRuntime = createSpatialRuntime(createTraversalFixtureState(), { checkpointAdapter: failSerializationAdapter() });
  arriveAtRelay(serializationRuntime);
  const beforeSerializationFailure = serializationRuntime.getSnapshot();
  const serializationFailure = relayRequest(serializationRuntime, "relay.isolate-cable-feed", "relay-serialization-failure");
  assert.equal(serializationFailure.accepted, false);
  assert.equal(serializationFailure.message, "Injected serialization failure.");
  assert.deepEqual(serializationRuntime.getSnapshot(), beforeSerializationFailure);

  const invalidInputState = serializationRuntime.getSnapshot();
  const invalidInput = serializationRuntime.resolveContextAction({
    ...relayInput(
      serializationRuntime,
      "relay.isolate-cable-feed",
      "relay-invalid-target",
    ),
    targetObjectId: "missing-relay",
  });
  assert.equal(invalidInput.accepted, false);
  assert.deepEqual(serializationRuntime.getSnapshot(), invalidInputState);

  const oldPayload = JSON.parse(encodeCampaignLocation(createTracerFixtureState()));
  delete oldPayload.payload.location.contextActionTransactions;
  const oldPayloadResult = decodeCampaignLocation(JSON.stringify(oldPayload));
  if (!oldPayloadResult.ok) assert.fail(oldPayloadResult.error);
  assert.deepEqual(oldPayloadResult.state.location.contextActionTransactions, []);

  return {
    scenario: CONTEXT_ACTION_SCENARIO,
    committedRevision: runtime.getSnapshot().committedRevision,
    durableRevision: runtime.getSnapshot().lastDurableRevision,
    writes: adapter.writes(),
    outcome: "relay activated and restored without replay",
  };
}

function runTraversalScenario() {
  const fixture = createTraversalFixtureState();
  assert.deepEqual(validateCampaignLocationState(fixture), {
    ok: true,
    issues: [],
  });
  const invalidAuthority = JSON.parse(JSON.stringify(fixture));
  invalidAuthority.location.navigation = {
    authority: "prototype-grid",
    cells: [],
  };
  assert.equal(validateCampaignLocationState(invalidAuthority).ok, false);
  const invalidGraphEdge = JSON.parse(JSON.stringify(fixture));
  invalidGraphEdge.location.navigation.edges[1].fromNodeId = "missing-node";
  assert.equal(validateCampaignLocationState(invalidGraphEdge).ok, false);
  const invalidSolid = JSON.parse(JSON.stringify(fixture));
  invalidSolid.location.blueprint.solids = [];
  assert.equal(validateCampaignLocationState(invalidSolid).ok, false);
  const invalidModule = JSON.parse(JSON.stringify(fixture));
  invalidModule.location.blueprint.modules = [];
  assert.equal(validateCampaignLocationState(invalidModule).ok, false);
  const invalidJoin = JSON.parse(JSON.stringify(fixture));
  invalidJoin.location.joins = [];
  assert.equal(validateCampaignLocationState(invalidJoin).ok, false);
  const invalidCover = JSON.parse(JSON.stringify(fixture));
  invalidCover.location.blueprint.coverSides = [];
  assert.equal(validateCampaignLocationState(invalidCover).ok, false);
  const nodeInsideSolid = JSON.parse(JSON.stringify(fixture));
  nodeInsideSolid.location.navigation.nodes[0].position = { x: 9, y: 2 };
  const nodeInsideSolidValidation =
    validateCampaignLocationState(nodeInsideSolid);
  assert.equal(nodeInsideSolidValidation.ok, false);
  assert.ok(
    nodeInsideSolidValidation.issues.some((issue) =>
      /node .* inside solid geometry/i.test(issue),
    ),
  );
  assert.throws(
    () => createSpatialRuntime(nodeInsideSolid),
    /inside solid geometry/,
  );
  const requiredPointInsideSolid = JSON.parse(JSON.stringify(fixture));
  requiredPointInsideSolid.location.interactionPositions[0].position = {
    x: 32,
    y: 2,
  };
  const requiredPointValidation = validateCampaignLocationState(
    requiredPointInsideSolid,
  );
  assert.equal(requiredPointValidation.ok, false);
  assert.ok(
    requiredPointValidation.issues.some((issue) =>
      /relay-console-use .* inside solid geometry/i.test(issue),
    ),
  );

  const blockedRuntime = createSpatialRuntime(fixture);
  const truthBeforeBlockedMove = blockedRuntime.getSnapshot();
  const blockedMove = blockedRuntime.dispatch({
    type: "actor.move",
    commandId: "blocked-by-authored-solid",
    expectedRevision: 0,
    actorId: "player-character",
    destination: { x: 9, y: 2.5 },
  });
  assert.equal(blockedMove.accepted, false);
  assert.match(
    blockedMove.event.type === "command.rejected"
      ? blockedMove.event.reason
      : "",
    /inside authored solid geometry/,
  );
  assert.deepEqual(blockedRuntime.getSnapshot(), truthBeforeBlockedMove);

  const reverseFromWallFixture = JSON.parse(JSON.stringify(fixture));
  const reverseFromWallPlayer = reverseFromWallFixture.location.actors.find(
    (actor: { id: string }) => actor.id === "player-character",
  );
  assert.ok(reverseFromWallPlayer);
  const visualFloor = {
    left:
      ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
      ACTOR_VISUAL_COLLISION_FOOTPRINT.horizontalClearance,
    right:
      ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
      ACTOR_VISUAL_COLLISION_FOOTPRINT.horizontalClearance,
    top:
      ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
      ACTOR_VISUAL_COLLISION_FOOTPRINT.topClearance,
    bottom:
      ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
      ACTOR_VISUAL_COLLISION_FOOTPRINT.bottomClearance,
  };
  assert.ok(Math.abs(TRAVERSAL_DOOR_THROAT.top - 4.395) < 0.000001);
  assert.ok(Math.abs(TRAVERSAL_DOOR_THROAT.bottom - 5.995) < 0.000001);
  assert.ok(
    TRAVERSAL_DOOR_THROAT.top - ACTOR_VISUAL_COLLISION_FOOTPRINT.topClearance >=
      5 - TRAVERSAL_DOOR_THROAT.visualHalfHeight,
  );
  assert.ok(
    TRAVERSAL_DOOR_THROAT.bottom + ACTOR_VISUAL_COLLISION_FOOTPRINT.bottomClearance <=
      5 + TRAVERSAL_DOOR_THROAT.visualHalfHeight,
  );
  reverseFromWallPlayer.position = { x: 4, y: visualFloor.top };
  const reverseFromWallRuntime = createSpatialRuntime(reverseFromWallFixture);
  const followersBeforeReverse = reverseFromWallRuntime
    .getSnapshot()
    .location.actors.filter((actor) => actor.partyRole === "follower")
    .map((actor) => ({ id: actor.id, position: actor.position }));
  const reverseFromWall = reverseFromWallRuntime.dispatch({
    type: "actor.move-direction",
    commandId: "reverse-from-wall",
    expectedRevision: 0,
    actorId: "player-character",
    direction: "south",
    distance: 0.75,
  });
  assert.equal(reverseFromWall.accepted, true);
  assert.deepEqual(validateCampaignLocationState(reverseFromWall.snapshot), {
    ok: true,
    issues: [],
  });
  assert.deepEqual(
    reverseFromWall.snapshot.location.actors
      .filter((actor) => actor.partyRole === "follower")
      .map((actor) => ({
        id: actor.id,
        position: actor.position,
        moveTarget: actor.moveTarget,
      })),
    followersBeforeReverse.map((actor) => ({ ...actor, moveTarget: null })),
  );
  const reverseFromWallFinal = reverseFromWallRuntime.step(100);
  assert.deepEqual(
    reverseFromWallFinal.location.actors.find(
      (actor) => actor.id === "player-character",
    )?.position,
    { x: 4, y: visualFloor.top + 0.75 },
  );
  assert.deepEqual(validateCampaignLocationState(reverseFromWallFinal), {
    ok: true,
    issues: [],
  });

  const outerWallFixture = JSON.parse(JSON.stringify(reverseFromWallFixture));
  const outerWallRuntime = createSpatialRuntime(outerWallFixture);
  const truthBeforeOuterWall = outerWallRuntime.getSnapshot();
  const outerWallMove = outerWallRuntime.dispatch({
    type: "actor.move-direction",
    commandId: "reject-through-outer-wall",
    expectedRevision: 0,
    actorId: "player-character",
    direction: "north",
    distance: 0.75,
  });
  assert.equal(outerWallMove.accepted, false);
  assert.match(
    outerWallMove.event.type === "command.rejected"
      ? outerWallMove.event.reason
      : "",
    /outside authored navigable polygon geometry/,
  );
  assert.deepEqual(outerWallRuntime.getSnapshot(), truthBeforeOuterWall);

  const playerAt = (position: { x: number; y: number }, areaId = "sealed-corridor") => {
    const candidate = JSON.parse(JSON.stringify(fixture));
    const player = candidate.location.actors.find(
      (actor: { id: string }) => actor.id === "player-character",
    );
    assert.ok(player);
    player.position = position;
    player.areaId = areaId;
    return candidate;
  };
  const rejectVisibleWall = (
    label: string,
    position: { x: number; y: number },
    direction: "north" | "south" | "east" | "west",
    areaId?: string,
  ) => {
    const wallRuntime = createSpatialRuntime(playerAt(position, areaId));
    const result = wallRuntime.dispatch({
      type: "actor.move-direction",
      commandId: `visible-wall-${label}`,
      expectedRevision: 0,
      actorId: "player-character",
      direction,
      distance: 0.01,
    });
    assert.equal(result.accepted, false, `${label} must reject wall entry`);
    assert.match(
      result.event.type === "command.rejected" ? result.event.reason : "",
      /outside authored navigable polygon geometry/,
    );
  };
  rejectVisibleWall("north", { x: 4, y: visualFloor.top }, "north");
  rejectVisibleWall("south", { x: 4, y: 10 - visualFloor.bottom }, "south");
  rejectVisibleWall("west", { x: visualFloor.left, y: 5 }, "west");
  rejectVisibleWall(
    "east",
    { x: 36 - visualFloor.right, y: 5 },
    "east",
    "cluttered-side-area",
  );
  rejectVisibleWall("interior-away-from-door", { x: 12 - visualFloor.right, y: 2.5 }, "east");

  const doorRuntime = createSpatialRuntime(
    playerAt({ x: 12 - visualFloor.right, y: 5 }),
  );
  const crossDoor = doorRuntime.dispatch({
    type: "actor.move",
    commandId: "cross-visible-door-throat",
    expectedRevision: 0,
    actorId: "player-character",
    destination: { x: 12 + visualFloor.left, y: 5 },
  });
  assert.equal(crossDoor.accepted, true);
  for (let index = 0; index < 10 && doorRuntime.hasActiveMovement(); index++)
    doorRuntime.step(1000);
  assert.equal(doorRuntime.hasActiveMovement(), false);
  assert.deepEqual(validateCampaignLocationState(doorRuntime.getSnapshot()), {
    ok: true,
    issues: [],
  });

  const concaveCornerFixture = playerAt({ x: 4, y: visualFloor.top });
  const concaveCornerRuntime = createSpatialRuntime(concaveCornerFixture);
  const concaveNavigation = fixture.location.navigation;
  if (!("authority" in concaveNavigation))
    assert.fail("Traversal fixture must use authored polygon-graph navigation.");
  const concaveCornerMove = concaveCornerRuntime.dispatch({
    type: "actor.move",
    commandId: "route-around-concave-visible-wall-corner",
    expectedRevision: 0,
    actorId: "player-character",
    destination: { x: 12, y: TRAVERSAL_DOOR_THROAT.top },
  });
  assert.equal(concaveCornerMove.accepted, true);
  const concaveCornerPlayer = concaveCornerMove.snapshot.location.actors.find(
    (actor) => actor.id === "player-character",
  );
  assert.ok(concaveCornerPlayer?.movement);
  const concaveCornerPath = [
    { x: 4, y: visualFloor.top },
    ...concaveCornerPlayer.movement.path,
  ];
  for (let index = 1; index < concaveCornerPath.length; index += 1)
    assert.ok(
      concaveNavigation.polygons.some((polygon) =>
        segmentStaysInPolygon(
          concaveCornerPath[index - 1]!,
          concaveCornerPath[index]!,
          polygon.vertices,
        ),
      ),
      "Every accepted movement segment must stay inside one authored polygon.",
    );

  const truthBeforePlanning = JSON.parse(JSON.stringify(fixture));
  const navigation = fixture.location.navigation;
  if (!("authority" in navigation))
    assert.fail(
      "Traversal fixture must use authored polygon-graph navigation.",
    );
  const route = planAuthoredPolygonGraphRoute(
    navigation,
    fixture.location.actors[0]!.position,
    fixture.location.actors[0]!.areaId,
    fixture.location.interactionPositions[0]!.position,
    fixture.location.interactionPositions[0]!.areaId,
  );
  assert.ok(route);
  assert.deepEqual(route![0], { x: 4, y: 5 });
  assert.deepEqual(route![route!.length - 1], { x: 29, y: 5 });
  assert.deepEqual(fixture, truthBeforePlanning);

  const runtime = createSpatialRuntime(fixture);
  assert.equal(runtime.hasActiveMovement(), false);
  assert.deepEqual(runtime.getRenderProjection().camera, {
    mode: "follow-selected",
    targetActorId: "player-character",
    tiltDegrees: 10,
    framingScale: 0.82,
  });
  assert.equal(runtime.getShellProjection().actors.length, 3);
  const direction = runtime.dispatch({
    type: "actor.move-direction",
    commandId: "traverse-direction",
    expectedRevision: 0,
    actorId: "player-character",
    direction: "east",
    distance: 4,
  });
  assert.equal(direction.accepted, true);
  assert.equal(runtime.hasActiveMovement(), true);
  runtime.step(500);
  assert.deepEqual(runtime.getSnapshot().location.actors[0]!.position, {
    x: 8,
    y: 5,
  });
  const path = runtime.dispatch({
    type: "actor.path-to-object",
    commandId: "traverse-relay",
    expectedRevision: 2,
    actorId: "player-character",
    objectId: "relay-console",
  });
  assert.equal(path.accepted, true);
  for (let index = 0; index < 10 && runtime.hasActiveMovement(); index++)
    runtime.step(1000);
  assert.equal(runtime.hasActiveMovement(), false);
  const actors = runtime.getSnapshot().location.actors;
  const leader = actors.find((actor) => actor.id === "player-character")!;
  const followerOne = actors.find((actor) => actor.id === "follower-one")!;
  const followerTwo = actors.find((actor) => actor.id === "follower-two")!;
  assert.deepEqual(leader.position, { x: 29, y: 5 });
  assert.equal(leader.areaId, "cluttered-side-area");
  assert.equal(leader.facing, "east");
  assert.equal(followerOne.areaId, "cluttered-side-area");
  assert.equal(followerTwo.areaId, "cluttered-side-area");
  assert.notDeepEqual(followerOne.position, followerTwo.position);
  assert.deepEqual(followerOne.position, { x: 27, y: 4 });
  assert.deepEqual(followerTwo.position, { x: 27, y: 6 });

  const runDirectionalFormation = (
    direction: "west" | "north-east",
    distance: number,
    forward: { readonly x: number; readonly y: number },
  ) => {
    const directionalRuntime = createSpatialRuntime(
      createTraversalFixtureState(),
    );
    const before = directionalRuntime.getSnapshot();
    const result = directionalRuntime.dispatch({
      type: "actor.move-direction",
      commandId: `formation-${direction}`,
      expectedRevision: 0,
      actorId: "player-character",
      direction,
      distance,
    });
    assert.equal(result.accepted, true);
    for (
      let index = 0;
      index < 10 && directionalRuntime.hasActiveMovement();
      index++
    ) {
      directionalRuntime.step(1000);
    }
    assert.equal(directionalRuntime.hasActiveMovement(), false);
    const finalActors = directionalRuntime.getSnapshot().location.actors;
    const finalLeader = finalActors.find(
      (actor) => actor.id === "player-character",
    )!;
    const finalFollowers = finalActors.filter(
      (actor) => actor.partyRole === "follower",
    );
    assert.equal(finalFollowers.length, 2);
    assert.notDeepEqual(
      finalFollowers[0]!.position,
      finalFollowers[1]!.position,
    );
    for (const follower of finalFollowers) {
      const leaderToFollower = {
        x: follower.position.x - finalLeader.position.x,
        y: follower.position.y - finalLeader.position.y,
      };
      assert.ok(
        leaderToFollower.x * forward.x + leaderToFollower.y * forward.y < 0,
        `${follower.id} must finish behind the ${direction}-moving leader.`,
      );
    }
    return { before, leader: finalLeader, followers: finalFollowers };
  };

  const westFormation = runDirectionalFormation("west", 2, { x: -1, y: 0 });
  assert.deepEqual(westFormation.leader.position, { x: 2, y: 5 });
  const diagonalUnit = 1 / Math.sqrt(2);
  const diagonalFormation = runDirectionalFormation("north-east", 2, {
    x: diagonalUnit,
    y: -diagonalUnit,
  });
  const diagonalDisplacement = {
    x:
      diagonalFormation.leader.position.x -
      diagonalFormation.before.location.actors[0]!.position.x,
    y:
      diagonalFormation.leader.position.y -
      diagonalFormation.before.location.actors[0]!.position.y,
  };
  assert.ok(
    Math.abs(Math.hypot(diagonalDisplacement.x, diagonalDisplacement.y) - 2) <
      0.000001,
  );
  assert.ok(Math.abs(diagonalDisplacement.x - Math.SQRT2) < 0.000001);
  assert.ok(Math.abs(diagonalDisplacement.y + Math.SQRT2) < 0.000001);

  const heldEastRuntime = createSpatialRuntime(createTraversalFixtureState());
  const heldEastStart =
    heldEastRuntime.getSnapshot().location.actors[0]!.position.x;
  let previousEastX = heldEastStart;
  for (let frame = 0; frame < 24; frame += 1) {
    const heldCommand = heldEastRuntime.dispatch({
      type: "actor.move-direction",
      commandId: `held-east-${frame}`,
      expectedRevision: heldEastRuntime.getSnapshot().committedRevision,
      actorId: "player-character",
      direction: "east",
      distance: 0.75,
    });
    assert.equal(heldCommand.accepted, true);
    heldEastRuntime.step(16);
    const currentX =
      heldEastRuntime.getSnapshot().location.actors[0]!.position.x;
    assert.ok(
      currentX > previousEastX,
      `Held east input must progress monotonically on frame ${frame}.`,
    );
    previousEastX = currentX;
  }
  assert.ok(
    previousEastX - heldEastStart > 3,
    "Held east input must produce meaningful net displacement.",
  );
  for (
    let frame = 0;
    frame < 20 && heldEastRuntime.hasActiveMovement();
    frame += 1
  ) {
    heldEastRuntime.step(100);
  }
  assert.equal(heldEastRuntime.hasActiveMovement(), false);
  assert.ok(
    heldEastRuntime.getSnapshot().location.actors[0]!.position.x >
      previousEastX,
    "The final held-key destination must complete after release.",
  );

  const heldDiagonalRuntime = createSpatialRuntime(
    createTraversalFixtureState(),
  );
  const heldDiagonalStart =
    heldDiagonalRuntime.getSnapshot().location.actors[0]!.position;
  let previousDiagonal = heldDiagonalStart;
  for (let frame = 0; frame < 12; frame += 1) {
    const heldCommand = heldDiagonalRuntime.dispatch({
      type: "actor.move-direction",
      commandId: `held-north-east-${frame}`,
      expectedRevision: heldDiagonalRuntime.getSnapshot().committedRevision,
      actorId: "player-character",
      direction: "north-east",
      distance: 0.5,
    });
    assert.equal(heldCommand.accepted, true);
    heldDiagonalRuntime.step(16);
    const current =
      heldDiagonalRuntime.getSnapshot().location.actors[0]!.position;
    assert.ok(current.x > previousDiagonal.x);
    assert.ok(current.y < previousDiagonal.y);
    previousDiagonal = current;
  }
  assert.ok(
    Math.hypot(
      previousDiagonal.x - heldDiagonalStart.x,
      previousDiagonal.y - heldDiagonalStart.y,
    ) > 1,
    "Held diagonal input must retain normalized net progress.",
  );
  for (
    let frame = 0;
    frame < 20 && heldDiagonalRuntime.hasActiveMovement();
    frame += 1
  ) {
    heldDiagonalRuntime.step(100);
  }
  assert.equal(heldDiagonalRuntime.hasActiveMovement(), false);
  const encoded = encodeCampaignLocation(runtime.getSnapshot(), {
    "issue-109": { traversal: true },
  });
  const decoded = decodeCampaignLocation(encoded);
  if (!decoded.ok) assert.fail(decoded.error);
  assert.deepEqual(decoded.state, runtime.getSnapshot());
  assert.deepEqual(decoded.extensions, { "issue-109": { traversal: true } });
  const legacyEnvelope = JSON.parse(
    encodeCampaignLocation(createTracerFixtureState()),
  );
  delete legacyEnvelope.payload.location.camera.tiltDegrees;
  delete legacyEnvelope.payload.location.camera.framingScale;
  const legacyDecoded = decodeCampaignLocation(JSON.stringify(legacyEnvelope));
  if (!legacyDecoded.ok) assert.fail(legacyDecoded.error);
  assert.equal(legacyDecoded.state.location.camera.tiltDegrees, 10);
  assert.equal(legacyDecoded.state.location.camera.framingScale, 0.82);

  return {
    scenario: TRAVERSAL_SCENARIO,
    committedRevision: runtime.getSnapshot().committedRevision,
    actors: actors.map((actor) => ({
      id: actor.id,
      areaId: actor.areaId,
      position: actor.position,
      facing: actor.facing,
    })),
    camera: runtime.getRenderProjection().camera,
  };
}

function runProductionSeedScenario() {
  const runtime = createSpatialRuntime(createTracerFixtureState());
  const truthBeforePresentation = runtime.getSnapshot();
  const semanticAssetIds = Object.keys(PRODUCTION_SEED_MANIFEST.assets)
    .filter((assetId) => assetId !== MISSING_ASSET_FALLBACK_ID)
    .sort();

  const scene = buildProductionSeedScene(runtime.getRenderProjection());
  const desktopOverview = deriveProductionSeedLayout(
    1374,
    522,
    scene.areas,
    true,
  );
  const responsiveOverview = deriveProductionSeedLayout(
    678,
    616,
    scene.areas,
    false,
  );
  assert.deepEqual(desktopOverview, { unit: 40, left: -33, top: 71 });
  assert.deepEqual(responsiveOverview, { unit: 17, left: 33, top: 233 });
  assert.ok(
    scene.areas[0] &&
      scene.areas[0].height * desktopOverview.unit >= 0.76 * 522,
  );
  assert.deepEqual(runtime.getSnapshot(), truthBeforePresentation);
  assert.equal(PRODUCTION_SEED_MANIFEST.outputStatus, "canon candidate");
  assert.equal(PRODUCTION_SEED_MANIFEST.version, "2.0.0");
  assert.deepEqual(
    Object.keys(PRODUCTION_SEED_RASTER_MANIFEST).sort(),
    semanticAssetIds,
  );
  assert.ok(
    "nexus.seed.wall.pressure-bulkhead.v1" in PRODUCTION_SEED_MANIFEST.assets,
  );
  assert.ok(
    "nexus.seed.wall.pressure-bulkhead.v1" in PRODUCTION_SEED_RASTER_MANIFEST,
  );
  assert.ok(ROOM_SHELL_ASSET in PRODUCTION_SEED_MANIFEST.assets);
  assert.ok(ROOM_SHELL_ASSET in PRODUCTION_SEED_RASTER_MANIFEST);
  assert.equal(
    PRODUCTION_SEED_MANIFEST.assets[ROOM_SHELL_ASSET].version,
    "2.0.0",
  );
  assert.deepEqual(
    PRODUCTION_SEED_MANIFEST.assets[ROOM_SHELL_ASSET].provenance
      .referenceAssets,
    ["production-intent-user-selected-target-2026-07-19.png"],
  );
  assert.ok(
    PRODUCTION_SEED_MANIFEST.provenance.referenceAssets.includes(
      "production-intent-user-selected-target-2026-07-19.png",
    ),
  );
  const roomShellRaster = PRODUCTION_SEED_RASTER_MANIFEST[ROOM_SHELL_ASSET];
  assert.deepEqual(
    roomShellRaster.map((entry) => ({
      state: entry.state,
      layer: entry.layer,
      nativePixels: entry.nativePixels,
      hasAlpha: entry.hasAlpha,
      path: entry.source.path,
      sha256: entry.source.sha256,
    })),
    [
      {
        state: "default",
        layer: "wall",
        nativePixels: [1102, 888],
        hasAlpha: true,
        path: "assets/production-seed/v2/environment/pressure-room-shell-frame.png",
        sha256: ROOM_SHELL_HASH,
      },
    ],
  );
  for (const assetId of semanticAssetIds) {
    const semantic =
      PRODUCTION_SEED_MANIFEST.assets[
        assetId as keyof typeof PRODUCTION_SEED_MANIFEST.assets
      ];
    const raster =
      PRODUCTION_SEED_RASTER_MANIFEST[
        assetId as keyof typeof PRODUCTION_SEED_RASTER_MANIFEST
      ];
    assert.deepEqual(
      raster.map((entry) => entry.state).sort(),
      [...semantic.states].sort(),
    );
    assert.ok(Object.isFrozen(raster));
    assert.ok(
      raster.every(
        (entry) =>
          Object.isFrozen(entry) &&
          Object.isFrozen(entry.source) &&
          Object.isFrozen(entry.anchor),
      ),
    );
  }
  for (const entry of PRODUCTION_SEED_RASTER_ENTRIES) {
    const bytes = readFileSync(
      resolve("artifacts/nexus-spatial/src", entry.source.path),
    );
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      entry.source.sha256,
    );
    if (entry.source.path.endsWith(".png")) {
      assert.equal(bytes.toString("ascii", 1, 4), "PNG");
      assert.deepEqual(
        [bytes.readUInt32BE(16), bytes.readUInt32BE(20)],
        entry.nativePixels,
      );
      assert.equal([4, 6].includes(bytes[25] ?? -1), entry.hasAlpha);
    } else {
      const source = bytes.toString("utf8");
      const viewBox =
        "viewBox=[\\\"']0 0 " +
        entry.nativePixels[0] +
        " " +
        entry.nativePixels[1] +
        "[\\\"']";
      assert.match(source, new RegExp(viewBox));
    }
  }
  assert.equal(scene.areas.length, 3);
  assert.deepEqual(
    scene.areas.map(({ id, x, y, width, height }) => ({
      id,
      x,
      y,
      width,
      height,
    })),
    runtime
      .getRenderProjection()
      .areas.map((area) => ({ id: area.id, ...area.bounds })),
  );
  assert.ok(scene.areas.every((area) => area.wallAssetId === ROOM_SHELL_ASSET));
  assert.equal(scene.doors.length, 2);
  assert.equal(
    scene.actors[0]?.assetId,
    "nexus.seed.actor.field-silhouette.v1",
  );
  assert.equal(
    scene.interactables[0]?.assetId,
    "nexus.seed.prop.relay-console.v1",
  );
  assert.deepEqual(
    scene.hazardSubstrates.map(({ x, y, state, assetId }) => ({
      x,
      y,
      state,
      assetId,
    })),
    [
      {
        x: 18,
        y: 3,
        state: "service-channel",
        assetId: "nexus.seed.floor.industrial-mosaic.v1",
      },
    ],
  );
  assert.deepEqual(
    scene.markers.map((marker) => [marker.kind, marker.glyph, marker.label]),
    [
      ["interactable", "brackets", "Relay Console available"],
      ["hazard", "warning-triangle", "Live Conduit"],
      ["objective", "diamond-target", "Reach the relay"],
    ],
  );
  assert.equal(scene.fallbackActivations.length, 0);
  const boundAssetIds = new Set([
    ...scene.areas.flatMap((area) => [area.floorAssetId, area.wallAssetId]),
    ...scene.doors.map((door) => door.assetId),
    ...scene.actors.map((actor) => actor.assetId),
    ...scene.interactables.map((item) => item.assetId),
    ...scene.hazardSubstrates.map((substrate) => substrate.assetId),
    ...scene.markers.map((marker) => marker.assetId),
  ]);

  const forcedFallback = buildProductionSeedScene(
    runtime.getRenderProjection(),
    new Set(["nexus.seed.actor.field-silhouette.v1"]),
  );
  assert.equal(forcedFallback.actors[0]?.assetId, MISSING_ASSET_FALLBACK_ID);
  assert.deepEqual(forcedFallback.fallbackActivations, [
    {
      requestedAssetId: "nexus.seed.actor.field-silhouette.v1",
      fallbackAssetId: MISSING_ASSET_FALLBACK_ID,
    },
  ]);
  const forcedRoomShellFallback = buildProductionSeedScene(
    runtime.getRenderProjection(),
    new Set([ROOM_SHELL_ASSET]),
  );
  assert.ok(
    forcedRoomShellFallback.areas.every(
      (area) => area.wallAssetId === MISSING_ASSET_FALLBACK_ID,
    ),
  );
  assert.deepEqual(
    forcedRoomShellFallback.areas.map(({ id, floorAssetId }) => ({
      id,
      floorAssetId,
    })),
    scene.areas.map(({ id, floorAssetId }) => ({ id, floorAssetId })),
  );
  assert.deepEqual(
    forcedRoomShellFallback.fallbackActivations,
    scene.areas.map(() => ({
      requestedAssetId: ROOM_SHELL_ASSET,
      fallbackAssetId: MISSING_ASSET_FALLBACK_ID,
    })),
  );
  assert.deepEqual(runtime.getSnapshot(), truthBeforePresentation);
  assert.equal(runtime.getDeveloperProjection().committedRevision, 0);

  for (const requestedAssetId of semanticAssetIds) {
    const fallbackScene = buildProductionSeedScene(
      runtime.getRenderProjection(),
      new Set([requestedAssetId]),
    );
    assert.equal(
      fallbackScene.fallbackActivations.some(
        (activation) => activation.requestedAssetId === requestedAssetId,
      ),
      boundAssetIds.has(
        requestedAssetId as keyof typeof PRODUCTION_SEED_MANIFEST.assets,
      ),
    );
    assert.deepEqual(runtime.getSnapshot(), truthBeforePresentation);
  }

  const encodedTruth = encodeCampaignLocation(truthBeforePresentation, {
    "issue-108": { rasterManifest: true },
  });
  const decodedTruth = decodeCampaignLocation(encodedTruth);
  if (!decodedTruth.ok) assert.fail(decodedTruth.error);
  assert.deepEqual(decodedTruth.state, truthBeforePresentation);
  assert.deepEqual(decodedTruth.extensions, {
    "issue-108": { rasterManifest: true },
  });

  assert.throws(() => {
    (
      PRODUCTION_SEED_MANIFEST.assets["nexus.seed.actor.field-silhouette.v1"]
        .states as string[]
    ).push("invalid");
  }, TypeError);
  assert.throws(() => {
    (
      PRODUCTION_SEED_RASTER_MANIFEST[
        "nexus.seed.actor.field-silhouette.v1"
      ] as unknown as unknown[]
    ).push({});
  }, TypeError);

  return {
    scenario: PRODUCTION_SEED_SCENARIO,
    manifestVersion: PRODUCTION_SEED_MANIFEST.version,
    outputStatus: PRODUCTION_SEED_MANIFEST.outputStatus,
    semanticAssets: Object.keys(PRODUCTION_SEED_MANIFEST.assets).length,
    sceneCounts: {
      areas: scene.areas.length,
      doors: scene.doors.length,
      actors: scene.actors.length,
      interactables: scene.interactables.length,
      hazardSubstrates: scene.hazardSubstrates.length,
      markers: scene.markers.length,
    },
    fallbackAssetId: MISSING_ASSET_FALLBACK_ID,
    overviewFrame: {
      desktopUnit: desktopOverview.unit,
      responsiveUnit: responsiveOverview.unit,
    },
    gameTruthRevisionAfterFallback: runtime.getSnapshot().committedRevision,
  };
}

const scenario = requestedScenario();
if (scenario === TRACER_SCENARIO) {
  console.log(JSON.stringify(runTracerScenario(), null, 2));
} else if (scenario === TRAVERSAL_SCENARIO) {
  console.log(JSON.stringify(runTraversalScenario(), null, 2));
} else if (scenario === PRODUCTION_SEED_SCENARIO) {
  console.log(JSON.stringify(runProductionSeedScenario(), null, 2));
} else if (scenario === CONTEXT_ACTION_SCENARIO) {
  console.log(JSON.stringify(runContextActionScenario(), null, 2));
} else {
  throw new Error(
    `Unknown scenario ${JSON.stringify(scenario)}. Expected ${TRACER_SCENARIO}, ${TRAVERSAL_SCENARIO}, ${PRODUCTION_SEED_SCENARIO}, or ${CONTEXT_ACTION_SCENARIO}.`,
  );
}
