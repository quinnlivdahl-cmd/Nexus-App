import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateSnapshot } from "./validate-project-snapshot.mjs";
import { freshnessFor, manifestStatusFor, publicationStatusFor, worstFreshness } from "./project-snapshot-contract.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(siteRoot, "app", "data", "project-snapshot.json");
const manifestPath = path.join(siteRoot, "app", "data", "drive-context-bundle-manifest.json");
const repoRoot = path.resolve(siteRoot, "..", "..");
const sourceDefinitions = [
  {
    id: "vision",
    inputs: ["docs/adr/README.md", "docs/nexus-game-source/source/SOURCE-INDEX.json"],
    freshnessBasis: "source-mtime",
  },
  {
    id: "source",
    inputs: ["docs/nexus-game-source/source/SOURCE-INDEX.json"],
    freshnessBasis: "source-mtime",
  },
  {
    id: "issues",
    inputs: ["NEXUS_ISSUE_INDEX.md"],
    freshnessBasis: "known-stale-local-mirror",
  },
  {
    id: "operations",
    inputs: [
      "docs/contexts/nexus-project-operations/CONTEXT.md",
      "docs/contexts/nexus-project-operations/docs/adr/0001-project-control-hub-derives-state.md",
    ],
    freshnessBasis: "source-mtime",
  },
];

function runGit(cwd, args, fallback = null) {
  try {
    return execFileSync("git", args, { cwd, encoding: "utf8", windowsHide: true, stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch {
    return fallback;
  }
}

async function hashInputs(relativePaths) {
  const hash = createHash("sha256");
  const observations = [];
  for (const relativePath of [...relativePaths].sort()) {
    const absolutePath = path.join(repoRoot, relativePath);
    const content = await readFile(absolutePath);
    const info = await stat(absolutePath);
    hash.update(relativePath.replaceAll("\\", "/"));
    hash.update("\0");
    hash.update(content);
    hash.update("\0");
    observations.push(info.mtime);
  }
  return {
    hash: hash.digest("hex").slice(0, 12),
    observedAt: new Date(Math.min(...observations.map((value) => value.getTime()))).toISOString(),
  };
}

function parseWorktreeList() {
  const text = runGit(repoRoot, ["worktree", "list", "--porcelain"], "");
  if (!text) return [];
  return text.split(/\r?\n\r?\n/).filter(Boolean).map((block) => {
    const lines = block.split(/\r?\n/);
    const absolutePath = lines.find((line) => line.startsWith("worktree "))?.slice(9);
    const head = lines.find((line) => line.startsWith("HEAD "))?.slice(5) ?? null;
    const branchRef = lines.find((line) => line.startsWith("branch "))?.slice(7);
    return {
      absolutePath,
      head,
      branch: branchRef ? branchRef.replace("refs/heads/", "") : `detached/${head?.slice(0, 12) ?? "unknown"}`,
    };
  }).filter((entry) => entry.absolutePath);
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "worktree";
}

function humanizeBranch(branch) {
  return branch.replace(/^prototype\//, "").replace(/^clean\//, "").replaceAll("/", " · ").replaceAll("-", " ");
}

function inspectWorktree(actual, declaration, now) {
  const status = runGit(actual.absolutePath, ["status", "--porcelain"], null);
  const upstream = runGit(actual.absolutePath, ["rev-parse", "--abbrev-ref", "@{upstream}"], null);
  const divergence = upstream ? runGit(actual.absolutePath, ["rev-list", "--left-right", "--count", "HEAD...@{upstream}"], null) : null;
  const [ahead, behind] = divergence ? divergence.split(/\s+/).map(Number) : [null, null];
  const commit = runGit(actual.absolutePath, ["log", "-1", "--format=%h%x00%cI%x00%s"], null);
  const [lastCommit, lastCommitAt, subject] = commit ? commit.split("\0") : [null, null, null];
  const inspectionFailed = status === null;
  const dirty = !inspectionFailed && Boolean(status);
  const id = declaration?.id ?? slug(actual.branch);
  return {
    id,
    purpose: declaration?.purpose ?? `${humanizeBranch(actual.branch)} checkout`,
    branch: actual.branch,
    displayPath: declaration?.displayPath ?? `Nexus-App / ${humanizeBranch(actual.branch)}`,
    health: inspectionFailed ? "unknown" : dirty ? "dirty" : "clean",
    ahead: Number.isFinite(ahead) ? ahead : null,
    behind: Number.isFinite(behind) ? behind : null,
    activity: inspectionFailed
      ? `${lastCommit ?? "No commit"}${subject ? ` · ${subject}` : ""} · status inspection failed`
      : `${lastCommit ?? "No commit"}${subject ? ` · ${subject}` : ""}${dirty ? " · local changes present" : " · clean"}`,
    ticketIds: declaration?.ticketIds ?? [],
    owner: "Local Git worktree projection",
    observedAt: now,
    freshness: inspectionFailed ? "unknown" : "fresh",
    present: true,
    declarationStatus: declaration ? "declared" : "discovered",
    upstream,
    lastCommit,
    lastCommitAt,
  };
}

function reconcileWorktrees(existing, now) {
  const declared = existing.filter((entry) => entry.declarationStatus !== "discovered");
  const actual = parseWorktreeList();
  const consumed = new Set();
  const reconciled = declared.map((declaration) => {
    const matchIndex = actual.findIndex((entry, index) => !consumed.has(index) && entry.branch === declaration.branch);
    if (matchIndex >= 0) {
      consumed.add(matchIndex);
      return inspectWorktree(actual[matchIndex], declaration, now);
    }
    return {
      ...declaration,
      health: "unknown",
      ahead: null,
      behind: null,
      activity: "Declared worktree was not present when the snapshot was generated.",
      owner: "Declared worktree mapping",
      observedAt: now,
      freshness: "unknown",
      present: false,
      declarationStatus: "missing",
      upstream: null,
      lastCommit: null,
      lastCommitAt: null,
    };
  });
  actual.forEach((entry, index) => {
    if (!consumed.has(index)) reconciled.push(inspectWorktree(entry, null, now));
  });
  return reconciled;
}

async function refreshContextBundle(manifest, sourceById, now) {
  const entries = await Promise.all(manifest.entries.map(async (entry) => {
    const { hash } = await hashInputs([entry.sourcePath]);
    const source = sourceById.get(entry.sourceId);
    return {
      ...entry,
      freshness: source?.freshness ?? "unknown",
      hash,
      publicationStatus: publicationStatusFor({
        driveId: entry.driveId,
        previousHash: entry.hash,
        nextHash: hash,
        currentStatus: entry.publicationStatus,
      }),
    };
  }));
  const status = manifest.status === "retired" ? "retired" : manifestStatusFor(entries);
  return { ...manifest, generatedAt: now, status, entries };
}

const snapshot = JSON.parse(await readFile(output, "utf8"));
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const nowDate = new Date();
const now = nowDate.toISOString();
const thresholdHours = snapshot.freshness.thresholdHours;
snapshot.schemaVersion = "1.1.0";

for (const definition of sourceDefinitions) {
  const record = snapshot.sources.find((source) => source.id === definition.id);
  if (!record) throw new Error(`Missing declared source record: ${definition.id}`);
  const observation = await hashInputs(definition.inputs);
  let observedAt = observation.observedAt;
  if (definition.id === "issues") {
    const issueIndex = await readFile(path.join(repoRoot, definition.inputs[0]), "utf8");
    const synced = issueIndex.match(/Last synced:\s+(\d{4}-\d{2}-\d{2})/i)?.[1];
    if (synced) observedAt = new Date(`${synced}T00:00:00.000Z`).toISOString();
  }
  record.location = definition.inputs.join(" + ");
  record.inputs = definition.inputs;
  record.hash = observation.hash;
  record.observedAt = observedAt;
  record.freshnessBasis = definition.freshnessBasis;
  record.freshness = freshnessFor(observedAt, nowDate, thresholdHours, definition.freshnessBasis === "known-stale-local-mirror");
}

snapshot.worktrees = reconcileWorktrees(snapshot.worktrees, now);
const sourceById = new Map(snapshot.sources.map((source) => [source.id, source]));

for (const ticket of snapshot.tickets) {
  ticket.owner = "GitHub Issues (local mirror)";
  ticket.sourceId = "issues";
  ticket.freshness = sourceById.get("issues")?.freshness ?? "unknown";
}

for (const decision of snapshot.decisions) {
  decision.owner = "Nexus Game decision baseline";
  decision.sourceId = "vision";
  decision.freshness = sourceById.get(decision.sourceId)?.freshness ?? "unknown";
  if (decision.action === "Review with Codex") decision.action = "Create / Update Ticket with Codex";
}

const refreshedManifest = await refreshContextBundle(manifest, sourceById, now);
snapshot.generatedAt = now;
snapshot.derivation = {
  mode: "declared-mappings-plus-observed-state",
  declaredSections: ["roadmapStages", "tickets", "decisions", "worktree purpose/ticket mappings"],
  note: "Mappings are reviewed declarations preserved from the approved plan; the generator does not claim to parse them from prose. Source provenance, freshness, manifest hashes, and Git worktree state are recomputed.",
};
snapshot.freshness.status = worstFreshness([
  ...snapshot.sources.map((source) => source.freshness),
  ...snapshot.worktrees.map((worktree) => worktree.freshness),
]);
snapshot.freshness.reasons = [
  `Freshness is calculated from observed timestamps using a ${thresholdHours}-hour threshold; aging extends to ${thresholdHours * 2} hours.`,
  "The GitHub issue index explicitly reports an older mirror sync and is therefore stale until verified against GitHub.",
  `Snapshot generated locally at ${now}; it is not a live polling service.`,
];
snapshot.contextBundle = {
  status: refreshedManifest.status === "designed-not-published" ? "designed — not yet published" : refreshedManifest.status,
  manifestVersion: refreshedManifest.version,
  manifestPath: "app/data/drive-context-bundle-manifest.json",
  lastVerified: refreshedManifest.lastVerified,
  entries: refreshedManifest.entries.length,
  manifestEntries: refreshedManifest.entries,
};

snapshot.attention = snapshot.attention.filter((item) => !item.id.startsWith("worktree-") && !item.id.startsWith("dirty-"));
for (const worktree of snapshot.worktrees) {
  if (!worktree.present || worktree.health !== "clean" || (worktree.ahead ?? 0) > 0 || (worktree.behind ?? 0) > 0) {
    snapshot.attention.push({
      id: `worktree-${worktree.id}`,
      severity: !worktree.present || (worktree.behind ?? 0) > 0 ? "attention" : "watch",
      title: !worktree.present ? `${worktree.purpose} is missing` : `${worktree.purpose} needs review`,
      detail: !worktree.present
        ? "This declared worktree was not found locally; its state is unknown."
        : `${worktree.health}; ahead ${worktree.ahead ?? "unknown"} / behind ${worktree.behind ?? "unknown"}; ${worktree.activity}`,
      tab: "worktrees",
    });
  }
}

validateSnapshot(snapshot, refreshedManifest);
await writeFile(manifestPath, `${JSON.stringify(refreshedManifest, null, 2)}\n`);
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Generated ${path.relative(siteRoot, output)} and refreshed the local Drive manifest contract.`);
