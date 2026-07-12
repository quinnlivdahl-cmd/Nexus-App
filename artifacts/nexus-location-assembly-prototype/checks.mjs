import assert from "node:assert/strict";
import {
  ACTOR_RADIUS,
  INVALID_BLUEPRINT,
  VALID_BLUEPRINT,
  assembleLocation,
  canOccupy,
  lookupWorldMetadata,
} from "./assembly.mjs";
import { buildReviewTraversal, tracePath } from "./navigation.mjs";

const checks = [];
function check(name, action) {
  action();
  checks.push({ name, pass: true });
}

const valid = assembleLocation(VALID_BLUEPRINT);
const invalid = assembleLocation(INVALID_BLUEPRINT);

check("valid Blueprint assembles successfully", () => {
  assert.equal(valid.validation.pass, true, valid.validation.failures.map((failure) => failure.message).join("\n"));
  assert.equal(valid.modules.length, 3);
  assert.equal(valid.joins.length, 2);
});

check("invalid diagnostic fails for the expected seam error", () => {
  assert.equal(invalid.validation.pass, false);
  const expected = invalid.validation.failures.find(
    (failure) => failure.code === INVALID_BLUEPRINT.diagnosticExpectation.code && failure.subject === INVALID_BLUEPRINT.diagnosticExpectation.joinId,
  );
  assert.ok(expected, "Expected workshop seam misalignment was not reported.");
  const join = invalid.joins.find((candidate) => candidate.id === "corridor-to-workshop");
  assert.equal(Math.round(join.seamOffset), 35);
});

check("actor-radius navigation crosses all three assembled Areas", () => {
  const traversal = buildReviewTraversal(valid);
  assert.equal(traversal.trace.pass, true);
  assert.deepEqual(
    new Set(traversal.trace.visitedAreas),
    new Set(["area-docking-spine", "area-cargo-transfer-bay", "area-signal-workshop"]),
  );
  assert.ok(traversal.trace.distance > 1500, "Traversal was too short to exercise the representative route.");
  assert.equal(tracePath(valid, traversal.path, { radius: ACTOR_RADIUS }).pass, true);
});

check("joined seams preserve continuous union-based occupancy", () => {
  for (const join of valid.joins) {
    assert.ok(join.navSamples.length > 0, `${join.id} did not expose navigation seam samples.`);
    assert.ok(join.navSamples.every((sample) => sample.pass), `${join.id} contains an invisible seam.`);
    assert.ok(join.navSamples.every((sample) => canOccupy(valid, sample.center, ACTOR_RADIUS)));
  }
});

check("interaction sockets and Interaction Positions retain module transforms", () => {
  const transponder = lookupWorldMetadata(valid, "workshop:transponder-bench");
  assert.deepEqual(transponder.socket, { x: 700, y: 760 });
  assert.equal(canOccupy(valid, transponder.socket, ACTOR_RADIUS), false, "The physical bench must not be passable.");
  const westPosition = lookupWorldMetadata(valid, "workshop:transponder-bench:bench-west");
  assert.equal(westPosition.x, 620);
  assert.equal(westPosition.y, 760);
  assert.equal(canOccupy(valid, westPosition, ACTOR_RADIUS), true);
});

check("occluders retain module transforms independently of cover", () => {
  const northWall = lookupWorldMetadata(valid, "corridor:north-wall");
  assert.deepEqual(northWall.a, { x: 0, y: 250 });
  assert.deepEqual(northWall.b, { x: 900, y: 250 });
  assert.ok(valid.occluders.length >= 16);
});

check("Cover Positions retain authored locations and protected arcs", () => {
  const cratesCover = lookupWorldMetadata(valid, "workshop:crates-west");
  assert.equal(cratesCover.x, 590);
  assert.equal(cratesCover.y, 572.5);
  assert.equal(cratesCover.arc.centerDeg, 0);
  assert.equal(cratesCover.arc.spanDeg, 100);
  assert.equal(canOccupy(valid, cratesCover, ACTOR_RADIUS), true);
  assert.equal(valid.coverPositions.length, 24);
  for (const obstacle of valid.obstacles.filter((candidate) => candidate.role === "cover")) {
    const positions = valid.coverPositions.filter(
      (cover) => cover.placementId === obstacle.placementId && cover.obstacleId === obstacle.sourceId,
    );
    assert.ok(positions.some((position) => position.y < obstacle.y), `${obstacle.sourceId} missing north cover.`);
    assert.ok(positions.some((position) => position.y > obstacle.y + obstacle.h), `${obstacle.sourceId} missing south cover.`);
    assert.ok(positions.some((position) => position.x < obstacle.x), `${obstacle.sourceId} missing west cover.`);
    assert.ok(positions.some((position) => position.x > obstacle.x + obstacle.w), `${obstacle.sourceId} missing east cover.`);
  }
});

const summary = {
  status: "PASS",
  checks: checks.length,
  modules: valid.modules.length,
  joins: valid.joins.length,
  sockets: valid.interactions.length,
  interactionPositions: valid.interactionPositions.length,
  occluders: valid.occluders.length,
  coverPositions: valid.coverPositions.length,
  invalidExpectedFailure: INVALID_BLUEPRINT.diagnosticExpectation.code,
};

for (const result of checks) console.log(`PASS  ${result.name}`);
console.log(JSON.stringify(summary, null, 2));
