import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  CAMPAIGN_LOCATION_CODEC,
  createSpatialRuntime,
  createTracerFixtureState,
  decodeCampaignLocation,
  encodeCampaignLocation,
  validateCampaignLocationState,
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
const PRODUCTION_SEED_SCENARIO = "render-and-approve-the-production-intent-seed";
const ROOM_SHELL_ASSET = "nexus.seed.wall.pressure-room-shell.v2";
const ROOM_SHELL_HASH = "2b0e5656ab382921eab12f57dc3b42df8d3bf398db8dac06a11aee2c2550f971";

function requestedScenario(): string {
  const scenarioIndex = process.argv.indexOf("--scenario");
  return scenarioIndex >= 0 ? (process.argv[scenarioIndex + 1] ?? "") : TRACER_SCENARIO;
}

function runTracerScenario() {
  const fixture = createTracerFixtureState();
  assert.deepEqual(validateCampaignLocationState(fixture), { ok: true, issues: [] });

  const encodedFixture = encodeCampaignLocation(fixture, { "ticket-107": { fixture: true } });
  const decodedFixture = decodeCampaignLocation(encodedFixture);
  if (!decodedFixture.ok) assert.fail(decodedFixture.error);
  assert.equal(JSON.parse(encodedFixture).format, CAMPAIGN_LOCATION_CODEC);
  assert.deepEqual(decodedFixture.state, fixture);
  assert.deepEqual(decodedFixture.extensions, { "ticket-107": { fixture: true } });

  const runtime = createSpatialRuntime(decodedFixture.state);
  const events: string[] = [];
  runtime.subscribe((event) => events.push(`${event.sequence}:${event.type}:${event.revision}`));

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
  assert.match(stale.event.type === "command.rejected" ? stale.event.reason : "", /Stale command/);
  assert.equal(runtime.getSnapshot().committedRevision, 2);

  const checkpoint = runtime.checkpoint();
  const restored = decodeCampaignLocation(checkpoint);
  if (!restored.ok) assert.fail(restored.error);
  assert.equal(restored.state.committedRevision, 2);
  assert.equal(restored.state.lastDurableRevision, 2);
  assert.deepEqual(events, [
    "1:command.committed:1",
    "2:frame.committed:2",
    "3:command.rejected:2",
    "4:command.rejected:2",
    "5:checkpoint.committed:2",
  ]);

  const unsupported = JSON.parse(checkpoint) as { version: number };
  unsupported.version = 2;
  const unsupportedResult = decodeCampaignLocation(JSON.stringify(unsupported));
  assert.equal(unsupportedResult.ok, false);
  if (!unsupportedResult.ok) assert.match(unsupportedResult.error, /Unsupported/);

  return {
    scenario: TRACER_SCENARIO,
    committedRevision: restored.state.committedRevision,
    durableRevision: restored.state.lastDurableRevision,
    frame: restored.state.frame,
    actorPosition: restored.state.location.actors[0]?.position,
    projections: ["pixi", "react-dom", "developer-mode", "headless"],
  };
}

function runProductionSeedScenario() {
  const runtime = createSpatialRuntime(createTracerFixtureState());
  const truthBeforePresentation = runtime.getSnapshot();
  const semanticAssetIds = Object.keys(PRODUCTION_SEED_MANIFEST.assets)
    .filter((assetId) => assetId !== MISSING_ASSET_FALLBACK_ID)
    .sort();

  const scene = buildProductionSeedScene(runtime.getRenderProjection());
  const desktopOverview = deriveProductionSeedLayout(1374, 522, scene.areas, true);
  const responsiveOverview = deriveProductionSeedLayout(678, 616, scene.areas, false);
  assert.deepEqual(desktopOverview, { unit: 40, left: -33, top: 71 });
  assert.deepEqual(responsiveOverview, { unit: 17, left: 33, top: 233 });
  assert.ok(scene.areas[0] && scene.areas[0].height * desktopOverview.unit >= 0.76 * 522);
  assert.deepEqual(runtime.getSnapshot(), truthBeforePresentation);
  assert.equal(PRODUCTION_SEED_MANIFEST.outputStatus, "canon candidate");
  assert.equal(PRODUCTION_SEED_MANIFEST.version, "2.0.0");
  assert.deepEqual(Object.keys(PRODUCTION_SEED_RASTER_MANIFEST).sort(), semanticAssetIds);
  assert.ok("nexus.seed.wall.pressure-bulkhead.v1" in PRODUCTION_SEED_MANIFEST.assets);
  assert.ok("nexus.seed.wall.pressure-bulkhead.v1" in PRODUCTION_SEED_RASTER_MANIFEST);
  assert.ok(ROOM_SHELL_ASSET in PRODUCTION_SEED_MANIFEST.assets);
  assert.ok(ROOM_SHELL_ASSET in PRODUCTION_SEED_RASTER_MANIFEST);
  assert.equal(PRODUCTION_SEED_MANIFEST.assets[ROOM_SHELL_ASSET].version, "2.0.0");
  assert.deepEqual(PRODUCTION_SEED_MANIFEST.assets[ROOM_SHELL_ASSET].provenance.referenceAssets, [
    "production-intent-user-selected-target-2026-07-19.png",
  ]);
  assert.ok(PRODUCTION_SEED_MANIFEST.provenance.referenceAssets.includes(
    "production-intent-user-selected-target-2026-07-19.png",
  ));
  const roomShellRaster = PRODUCTION_SEED_RASTER_MANIFEST[ROOM_SHELL_ASSET];
  assert.deepEqual(roomShellRaster.map((entry) => ({
    state: entry.state,
    layer: entry.layer,
    nativePixels: entry.nativePixels,
    hasAlpha: entry.hasAlpha,
    path: entry.source.path,
    sha256: entry.source.sha256,
  })), [{
    state: "default",
    layer: "wall",
    nativePixels: [1102, 888],
    hasAlpha: true,
    path: "assets/production-seed/v2/environment/pressure-room-shell-frame.png",
    sha256: ROOM_SHELL_HASH,
  }]);
  for (const assetId of semanticAssetIds) {
    const semantic = PRODUCTION_SEED_MANIFEST.assets[assetId as keyof typeof PRODUCTION_SEED_MANIFEST.assets];
    const raster = PRODUCTION_SEED_RASTER_MANIFEST[assetId as keyof typeof PRODUCTION_SEED_RASTER_MANIFEST];
    assert.deepEqual(raster.map((entry) => entry.state).sort(), [...semantic.states].sort());
    assert.ok(Object.isFrozen(raster));
    assert.ok(raster.every((entry) => Object.isFrozen(entry) && Object.isFrozen(entry.source) && Object.isFrozen(entry.anchor)));
  }
  for (const entry of PRODUCTION_SEED_RASTER_ENTRIES) {
    const bytes = readFileSync(resolve("artifacts/nexus-spatial/src", entry.source.path));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), entry.source.sha256);
    if (entry.source.path.endsWith(".png")) {
      assert.equal(bytes.toString("ascii", 1, 4), "PNG");
      assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], entry.nativePixels);
      assert.equal([4, 6].includes(bytes[25] ?? -1), entry.hasAlpha);
    } else {
      const source = bytes.toString("utf8");
      const viewBox = "viewBox=[\\\"']0 0 " + entry.nativePixels[0] + " " + entry.nativePixels[1] + "[\\\"']";
      assert.match(source, new RegExp(viewBox));
    }
  }
  assert.equal(scene.areas.length, 3);
  assert.deepEqual(
    scene.areas.map(({ id, x, y, width, height }) => ({ id, x, y, width, height })),
    runtime.getRenderProjection().areas.map((area) => ({ id: area.id, ...area.bounds })),
  );
  assert.ok(scene.areas.every((area) => area.wallAssetId === ROOM_SHELL_ASSET));
  assert.equal(scene.doors.length, 2);
  assert.equal(scene.actors[0]?.assetId, "nexus.seed.actor.field-silhouette.v1");
  assert.equal(scene.interactables[0]?.assetId, "nexus.seed.prop.relay-console.v1");
  assert.deepEqual(
    scene.hazardSubstrates.map(({ x, y, state, assetId }) => ({ x, y, state, assetId })),
    [{ x: 18, y: 3, state: "service-channel", assetId: "nexus.seed.floor.industrial-mosaic.v1" }],
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
  assert.ok(forcedRoomShellFallback.areas.every((area) => area.wallAssetId === MISSING_ASSET_FALLBACK_ID));
  assert.deepEqual(
    forcedRoomShellFallback.areas.map(({ id, floorAssetId }) => ({ id, floorAssetId })),
    scene.areas.map(({ id, floorAssetId }) => ({ id, floorAssetId })),
  );
  assert.deepEqual(forcedRoomShellFallback.fallbackActivations, scene.areas.map(() => ({
    requestedAssetId: ROOM_SHELL_ASSET,
    fallbackAssetId: MISSING_ASSET_FALLBACK_ID,
  })));
  assert.deepEqual(runtime.getSnapshot(), truthBeforePresentation);
  assert.equal(runtime.getDeveloperProjection().committedRevision, 0);

  for (const requestedAssetId of semanticAssetIds) {
    const fallbackScene = buildProductionSeedScene(runtime.getRenderProjection(), new Set([requestedAssetId]));
    assert.equal(
      fallbackScene.fallbackActivations.some((activation) => activation.requestedAssetId === requestedAssetId),
      boundAssetIds.has(requestedAssetId as keyof typeof PRODUCTION_SEED_MANIFEST.assets),
    );
    assert.deepEqual(runtime.getSnapshot(), truthBeforePresentation);
  }

  const encodedTruth = encodeCampaignLocation(truthBeforePresentation, { "issue-108": { rasterManifest: true } });
  const decodedTruth = decodeCampaignLocation(encodedTruth);
  if (!decodedTruth.ok) assert.fail(decodedTruth.error);
  assert.deepEqual(decodedTruth.state, truthBeforePresentation);
  assert.deepEqual(decodedTruth.extensions, { "issue-108": { rasterManifest: true } });

  assert.throws(() => {
    (PRODUCTION_SEED_MANIFEST.assets["nexus.seed.actor.field-silhouette.v1"].states as string[]).push("invalid");
  }, TypeError);
  assert.throws(() => {
    (PRODUCTION_SEED_RASTER_MANIFEST["nexus.seed.actor.field-silhouette.v1"] as unknown as unknown[]).push({});
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
} else if (scenario === PRODUCTION_SEED_SCENARIO) {
  console.log(JSON.stringify(runProductionSeedScenario(), null, 2));
} else {
  throw new Error(
    `Unknown scenario ${JSON.stringify(scenario)}. Expected ${TRACER_SCENARIO} or ${PRODUCTION_SEED_SCENARIO}.`,
  );
}
