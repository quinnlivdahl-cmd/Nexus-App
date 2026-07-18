import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { freshnessFor, manifestStatusFor, worstFreshness } from "./project-snapshot-contract.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = path.join(siteRoot, "app", "data", "project-snapshot.json");
const validMaturity = new Set(["unframed", "defined", "prototyped", "validated", "integrated", "playable"]);
const validFreshness = new Set(["fresh", "aging", "stale", "unknown"]);
const validFreshnessBasis = new Set(["source-mtime", "known-stale-local-mirror"]);
const validDeclarationStatus = new Set(["declared", "discovered", "missing"]);
const validPublicationStatus = new Set(["pending", "published", "stale", "withdrawn"]);
const validTabs = new Set(["roadmap", "tickets", "worktrees", "vision", "launch"]);

function assertUnique(values, label) {
  assert.equal(new Set(values).size, values.length, `${label} must be unique.`);
}

function assertRelativeProjectPath(value, label) {
  assert.ok(value && !path.isAbsolute(value) && !/^[a-z]:[\\/]/i.test(value), `${label} must be project-relative.`);
  assert.ok(!value.includes(".."), `${label} must not escape the project root.`);
}

export function validateSnapshot(snapshot, manifest = null) {
  assert.equal(snapshot.schemaVersion, "1.1.0", "Snapshot schema version must match the current contract.");
  assert.ok(snapshot.generatedAt, "Snapshot must have a generation timestamp.");
  assert.ok(validFreshness.has(snapshot.freshness.status), "Snapshot freshness must be valid.");
  assert.ok(Number.isFinite(snapshot.freshness.thresholdHours) && snapshot.freshness.thresholdHours > 0, "Snapshot freshness threshold must be positive.");
  assert.equal(snapshot.derivation?.mode, "declared-mappings-plus-observed-state", "Snapshot derivation mode must be explicit.");
  assert.ok(snapshot.derivation?.declaredSections?.length, "Snapshot must identify its declared mapping sections.");
  assert.ok(snapshot.roadmapStages.length > 0, "Snapshot must contain roadmap stages.");
  assert.ok(snapshot.worktrees.length > 0, "Snapshot must contain worktrees.");
  assertUnique(snapshot.sources.map((source) => source.id), "Source IDs");
  assertUnique(snapshot.roadmapStages.map((stage) => stage.id), "Roadmap stage IDs");
  assertUnique(snapshot.tickets.map((ticket) => ticket.id), "Ticket IDs");
  assertUnique(snapshot.worktrees.map((worktree) => worktree.id), "Worktree IDs");
  assertUnique(snapshot.worktrees.map((worktree) => worktree.branch), "Worktree branches");
  assertUnique(snapshot.decisions.map((decision) => decision.id), "Decision IDs");
  const sourceIds = new Set(snapshot.sources.map((source) => source.id));
  const stageIds = new Set(snapshot.roadmapStages.map((stage) => stage.id));
  const ticketIds = new Set(snapshot.tickets.map((ticket) => ticket.id));
  const worktreeIds = new Set(snapshot.worktrees.map((worktree) => worktree.id));
  const decisionIds = new Set(snapshot.decisions.map((decision) => decision.id));
  for (const source of snapshot.sources) {
    assert.ok(source.owner && source.location && source.observedAt && source.hash, `Source ${source.id} is missing provenance.`);
    assert.ok(validFreshness.has(source.freshness), `Source ${source.id} has invalid freshness.`);
    assert.ok(validFreshnessBasis.has(source.freshnessBasis), `Source ${source.id} has invalid freshness basis.`);
    assert.ok(source.inputs?.length, `Source ${source.id} must declare its inputs.`);
    source.inputs.forEach((input) => assertRelativeProjectPath(input, `Source ${source.id} input`));
    assert.equal(source.location, source.inputs.join(" + "), `Source ${source.id} location must match its hashed inputs.`);
    const expectedFreshness = freshnessFor(source.observedAt, snapshot.generatedAt, snapshot.freshness.thresholdHours, source.freshnessBasis === "known-stale-local-mirror");
    assert.equal(source.freshness, expectedFreshness, `Source ${source.id} freshness contradicts its timestamp and basis.`);
  }
  for (const stage of snapshot.roadmapStages) {
    assert.ok(validMaturity.has(stage.maturity), `Stage ${stage.id} has invalid maturity.`);
    stage.ticketIds.forEach((id) => assert.ok(ticketIds.has(id), `Stage ${stage.id} references missing ticket ${id}.`));
    stage.worktreeIds.forEach((id) => assert.ok(worktreeIds.has(id), `Stage ${stage.id} references missing worktree ${id}.`));
    stage.decisionIds.forEach((id) => assert.ok(decisionIds.has(id), `Stage ${stage.id} references missing decision ${id}.`));
    stage.ticketIds.forEach((id) => assert.ok(snapshot.tickets.find((ticket) => ticket.id === id)?.stageIds.includes(stage.id), `Stage ${stage.id} and ticket ${id} must map to each other.`));
    stage.decisionIds.forEach((id) => assert.ok(snapshot.decisions.find((decision) => decision.id === id)?.affectedStageIds.includes(stage.id), `Stage ${stage.id} and decision ${id} must map to each other.`));
  }
  for (const ticket of snapshot.tickets) {
    assert.ok(ticket.owner && sourceIds.has(ticket.sourceId) && validFreshness.has(ticket.freshness), `Ticket ${ticket.id} is missing provenance.`);
    ticket.stageIds.forEach((id) => assert.ok(stageIds.has(id), `Ticket ${ticket.id} references missing stage ${id}.`));
    ticket.worktreeIds.forEach((id) => assert.ok(worktreeIds.has(id), `Ticket ${ticket.id} references missing worktree ${id}.`));
    ticket.stageIds.forEach((id) => assert.ok(snapshot.roadmapStages.find((stage) => stage.id === id)?.ticketIds.includes(ticket.id), `Ticket ${ticket.id} and stage ${id} must map to each other.`));
    ticket.worktreeIds.forEach((id) => assert.ok(snapshot.worktrees.find((worktree) => worktree.id === id)?.ticketIds.includes(ticket.id), `Ticket ${ticket.id} and worktree ${id} must map to each other.`));
    assert.equal(ticket.freshness, snapshot.sources.find((source) => source.id === ticket.sourceId)?.freshness, `Ticket ${ticket.id} freshness must match its source.`);
  }
  for (const worktree of snapshot.worktrees) {
    assert.ok(worktree.owner && worktree.observedAt && validFreshness.has(worktree.freshness), `Worktree ${worktree.id} is missing provenance.`);
    assert.ok(validDeclarationStatus.has(worktree.declarationStatus), `Worktree ${worktree.id} has invalid declaration status.`);
    assert.equal(worktree.present, worktree.declarationStatus !== "missing", `Worktree ${worktree.id} presence contradicts declaration status.`);
    assert.ok(!/^[a-z]:[\\/]/i.test(worktree.displayPath) && !worktree.displayPath.includes("\\Users\\"), `Worktree ${worktree.id} exposes an owner path.`);
    worktree.ticketIds.forEach((id) => assert.ok(ticketIds.has(id), `Worktree ${worktree.id} references missing ticket ${id}.`));
    worktree.ticketIds.forEach((id) => assert.ok(snapshot.tickets.find((ticket) => ticket.id === id)?.worktreeIds.includes(worktree.id), `Worktree ${worktree.id} and ticket ${id} must map to each other.`));
    if (worktree.present) assert.ok(worktree.lastCommit && worktree.lastCommitAt, `Present worktree ${worktree.id} is missing last-commit evidence.`);
    if (worktree.present && worktree.health !== "unknown") assert.equal(worktree.freshness, "fresh", `Observed worktree ${worktree.id} must be fresh at generation.`);
    if (worktree.health === "unknown") assert.equal(worktree.freshness, "unknown", `Uninspected worktree ${worktree.id} must have unknown freshness.`);
    if (!worktree.present) assert.equal(worktree.freshness, "unknown", `Missing worktree ${worktree.id} must have unknown freshness.`);
  }
  for (const decision of snapshot.decisions) {
    assert.ok(decision.owner && sourceIds.has(decision.sourceId) && validFreshness.has(decision.freshness), `Decision ${decision.id} is missing provenance.`);
    decision.affectedStageIds.forEach((id) => assert.ok(stageIds.has(id), `Decision ${decision.id} references missing stage ${id}.`));
    decision.affectedStageIds.forEach((id) => assert.ok(snapshot.roadmapStages.find((stage) => stage.id === id)?.decisionIds.includes(decision.id), `Decision ${decision.id} and stage ${id} must map to each other.`));
    assert.equal(decision.freshness, snapshot.sources.find((source) => source.id === decision.sourceId)?.freshness, `Decision ${decision.id} freshness must match its source.`);
  }
  for (const item of snapshot.attention) {
    assert.ok(validTabs.has(item.tab), `Attention item ${item.id} references an invalid tab.`);
  }
  assert.ok(snapshot.contextBundle?.manifestPath, "Snapshot must identify the context-bundle manifest.");
  assertRelativeProjectPath(snapshot.contextBundle.manifestPath, "Context-bundle manifest path");
  assert.equal(snapshot.contextBundle.entries, snapshot.contextBundle.manifestEntries.length, "Context-bundle entry count must match embedded entries.");
  assert.equal(snapshot.freshness.status, worstFreshness([...snapshot.sources.map((source) => source.freshness), ...snapshot.worktrees.map((worktree) => worktree.freshness)]), "Snapshot freshness must reflect the worst generated input.");
  if (manifest) {
    assert.equal(manifest.projectId, "nexus-game-project-control", "Manifest project ID is invalid.");
    assert.ok(["designed-not-published", "published", "stale", "retired"].includes(manifest.status), "Manifest status is invalid.");
    assert.ok(manifest.purpose && manifest.target && manifest.destinationPlan, "Manifest is missing destination context.");
    assert.ok(manifest.audience && manifest.version && manifest.sourceWorkflow && manifest.runtimeLane, "Manifest is missing routing metadata.");
    assert.equal(manifest.approvalRequired, true, "Drive publication must remain approval-gated.");
    assert.ok(Array.isArray(manifest.boundaries) && manifest.boundaries.length > 0, "Manifest must declare boundaries.");
    assert.ok(Array.isArray(manifest.checks) && manifest.checks.length > 0, "Manifest must declare checks.");
    assertUnique(manifest.entries.map((entry) => entry.id), "Context manifest entry IDs");
    if (manifest.status === "retired") {
      assert.equal(manifest.entries.length, 0, "Retired context bundle must not publish repo-document entries.");
    } else {
      assert.equal(manifest.status, manifestStatusFor(manifest.entries), "Manifest status must reflect its entry lifecycle states.");
    }
    for (const entry of manifest.entries) {
      assert.ok(sourceIds.has(entry.sourceId), `Manifest entry ${entry.id} references missing source ${entry.sourceId}.`);
      assertRelativeProjectPath(entry.sourcePath, `Manifest entry ${entry.id} source path`);
      assert.ok(entry.ownerPath.startsWith("Drive:"), `Manifest entry ${entry.id} must use a logical Drive owner path.`);
      assert.ok(validFreshness.has(entry.freshness), `Manifest entry ${entry.id} has invalid freshness.`);
      assert.ok(entry.hash && entry.authorityRole && entry.retrievalIntent, `Manifest entry ${entry.id} is incomplete.`);
      assert.ok(validPublicationStatus.has(entry.publicationStatus), `Manifest entry ${entry.id} has invalid publication status.`);
      assert.equal(entry.freshness, snapshot.sources.find((source) => source.id === entry.sourceId)?.freshness, `Manifest entry ${entry.id} freshness must match its source.`);
      if (entry.publicationStatus === "published") assert.ok(entry.driveId, `Published manifest entry ${entry.id} requires a Drive ID.`);
      if (!entry.driveId) assert.equal(entry.publicationStatus, "pending", `Unpublished manifest entry ${entry.id} must remain pending.`);
    }
    assert.deepEqual(snapshot.contextBundle.manifestEntries, manifest.entries, "Embedded context manifest entries must match the manifest file.");
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
  const manifestPath = path.join(siteRoot, snapshot.contextBundle?.manifestPath ?? "app/data/drive-context-bundle-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  validateSnapshot(snapshot, manifest);
  console.log("Project snapshot contract is valid.");
}
