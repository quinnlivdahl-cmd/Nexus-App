import assert from "node:assert/strict";
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

const TRACER_SCENARIO = "launch-one-spatial-runtime-tracer";
const PRODUCTION_SEED_SCENARIO = "render-and-approve-the-production-intent-seed";

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

  const scene = buildProductionSeedScene(runtime.getRenderProjection());
  assert.equal(PRODUCTION_SEED_MANIFEST.outputStatus, "canon candidate");
  assert.equal(PRODUCTION_SEED_MANIFEST.version, "1.0.0");
  assert.equal(scene.areas.length, 3);
  assert.equal(scene.doors.length, 2);
  assert.equal(scene.actors[0]?.assetId, "nexus.seed.actor.field-silhouette.v1");
  assert.equal(scene.interactables[0]?.assetId, "nexus.seed.prop.relay-console.v1");
  assert.deepEqual(
    scene.markers.map((marker) => [marker.kind, marker.glyph, marker.label]),
    [
      ["interactable", "brackets", "Relay Console available"],
      ["hazard", "warning-triangle", "Live Conduit"],
      ["objective", "diamond-target", "Reach the relay"],
    ],
  );
  assert.equal(scene.fallbackActivations.length, 0);

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
  assert.deepEqual(runtime.getSnapshot(), truthBeforePresentation);
  assert.equal(runtime.getDeveloperProjection().committedRevision, 0);

  assert.throws(() => {
    (PRODUCTION_SEED_MANIFEST.assets["nexus.seed.actor.field-silhouette.v1"].states as string[]).push("invalid");
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
      markers: scene.markers.length,
    },
    fallbackAssetId: MISSING_ASSET_FALLBACK_ID,
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
