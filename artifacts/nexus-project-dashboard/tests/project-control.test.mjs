import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  assembleLaunchPacket,
  averageMaturity,
  maturityScores,
  scoreFor,
} from "../app/lib/project-control.ts";
import { validateSnapshot } from "../scripts/validate-project-snapshot.mjs";
import { freshnessFor, manifestStatusFor, publicationStatusFor } from "../scripts/project-snapshot-contract.mjs";

const projectRoot = new URL("../", import.meta.url);

async function readJson(relativePath) {
  return JSON.parse(await readFile(new URL(relativePath, projectRoot), "utf8"));
}

test("uses the approved deterministic maturity scale", () => {
  assert.deepEqual(maturityScores, {
    unframed: 0,
    defined: 20,
    prototyped: 40,
    validated: 60,
    integrated: 80,
    playable: 100,
  });
  assert.equal(scoreFor("validated"), 60);
  assert.equal(averageMaturity([]), 0);
});

test("validates the generated snapshot and Drive manifest together", async () => {
  const snapshot = await readJson("app/data/project-snapshot.json");
  const manifest = await readJson("app/data/drive-context-bundle-manifest.json");
  assert.doesNotThrow(() => validateSnapshot(snapshot, manifest));
  assert.equal(snapshot.worktrees.every((worktree) => worktree.present ? Boolean(worktree.lastCommit && worktree.lastCommitAt) : worktree.health === "unknown"), true);
  assert.equal(snapshot.contextBundle.entries, manifest.entries.length);
  assert.equal(manifest.entries.every((entry) => entry.driveId === null && entry.publicationStatus === "pending"), true);
});

test("marks published Drive context stale when its source hash changes", () => {
  assert.equal(publicationStatusFor({ driveId: "drive-file-1", previousHash: "old", nextHash: "new", currentStatus: "published" }), "stale");
  assert.equal(publicationStatusFor({ driveId: "drive-file-1", previousHash: "same", nextHash: "same", currentStatus: "published" }), "published");
  assert.equal(publicationStatusFor({ driveId: null, previousHash: "old", nextHash: "new", currentStatus: "published" }), "pending");
  assert.equal(manifestStatusFor([{ publicationStatus: "published" }, { publicationStatus: "stale" }]), "stale");
});

test("derives freshness from the recorded generation threshold", () => {
  const generatedAt = "2026-07-12T12:00:00.000Z";
  assert.equal(freshnessFor("2026-07-12T00:00:00.000Z", generatedAt, 24), "fresh");
  assert.equal(freshnessFor("2026-07-11T00:00:00.000Z", generatedAt, 24), "aging");
  assert.equal(freshnessFor("2026-07-09T00:00:00.000Z", generatedAt, 24), "stale");
  assert.equal(freshnessFor(generatedAt, generatedAt, 24, true), "stale");
});

test("assembles a stable, fully labelled ticket launch packet", async () => {
  const snapshot = await readJson("app/data/project-snapshot.json");
  const input = { entryType: "ticket", entryId: "31", intent: "", worktreeId: "clean-review" };
  const first = assembleLaunchPacket(snapshot, input);
  const second = assembleLaunchPacket(snapshot, input);
  assert.deepEqual(first, second);
  assert.match(first.objective, /Formalize skill focus and ability tree structure for playable drafts #31/);
  assert.doesNotMatch(first.prompt, /Issue #31/);
  assert.match(first.prompt, /Acceptance criteria/);
  assert.match(first.prompt, /Validation expectations/);
  assert.match(first.prompt, /Mapped player-loop stage\nAftermath \+ Recruitment/);
});

test("keeps packet approval invalidation and accessible state in the UI contract", async () => {
  const page = await readFile(new URL("app/page.tsx", projectRoot), "utf8");
  assert.match(page, /function updateLaunch[\s\S]*?setApproved\(false\)[\s\S]*?setLaunch\(nextLaunch\)/);
  assert.match(page, /function openLaunchPacket[\s\S]*?updateLaunch\(nextLaunch\)/);
  assert.match(page, /Refresh Snapshot packet<\/button>/);
  assert.match(page, /openLaunchPacket\(\{ entryType: "freeform"[\s\S]*?Refresh the deterministic Nexus Project Snapshot/);
  assert.match(page, /aria-current=/);
  assert.match(page, /aria-pressed=/);
  assert.match(page, /aria-expanded=/);
  assert.match(page, /disabled=\{!approved\}[\s\S]*?Open Codex instructions/);
  assert.doesNotMatch(page, />Issue #\{/);
});
