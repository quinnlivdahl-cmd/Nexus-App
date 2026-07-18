import assert from "node:assert/strict";
import {
  CAMPAIGN_LOCATION_CODEC,
  createSpatialRuntime,
  createTracerFixtureState,
  decodeCampaignLocation,
  encodeCampaignLocation,
  validateCampaignLocationState,
} from "@workspace/spatial-runtime";

const SCENARIO = "launch-one-spatial-runtime-tracer";

function requestedScenario(): string {
  const scenarioIndex = process.argv.indexOf("--scenario");
  return scenarioIndex >= 0 ? (process.argv[scenarioIndex + 1] ?? "") : SCENARIO;
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
    scenario: SCENARIO,
    committedRevision: restored.state.committedRevision,
    durableRevision: restored.state.lastDurableRevision,
    frame: restored.state.frame,
    actorPosition: restored.state.location.actors[0]?.position,
    projections: ["pixi", "react-dom", "developer-mode", "headless"],
  };
}

const scenario = requestedScenario();
if (scenario !== SCENARIO) {
  throw new Error(`Unknown scenario ${JSON.stringify(scenario)}. Expected ${SCENARIO}.`);
}

console.log(JSON.stringify(runTracerScenario(), null, 2));
