import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceSliceCatalogPath =
  "docs/nexus-game-source/source/SOURCE-SLICES.json";
const contextPackPath =
  "artifacts/nexus-companion/src/data/sourceContextPack.json";
const allowedCategories = new Set([
  "rules",
  "lore",
  "campaign_state",
  "encounter",
  "play_aid",
  "image_guidance",
  "dm_contract",
]);
const allowedVisibility = new Set([
  "player-visible",
  "dm-facing",
  "hidden-permitted",
]);
const quarantineEntryId = "campaign-specific-material-quarantine";
const prototypeLeakPattern =
  /\b(Rook|Voss|E-?43|Nereid-3|Ternary Lock|Heliomed|C-WARDEN|Kallisto|Rill|WARDEN)\b/i;

function readJson(path) {
  const absolutePath = resolve(root, path);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${path}`);
  }

  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function assertString(value, label, failures) {
  if (typeof value !== "string" || value.trim() === "") {
    failures.push(`${label} must be a non-empty string`);
  }
}

function validate() {
  const failures = [];
  const catalog = readJson(sourceSliceCatalogPath);
  const pack = readJson(contextPackPath);
  const sliceMap = new Map(
    (catalog.slices ?? []).map((slice) => [slice.slice_id, slice]),
  );
  const sliceIds = new Set(sliceMap.keys());

  assertString(pack.packId, "packId", failures);
  assertString(pack.version, "version", failures);
  if (!Array.isArray(pack.entries) || pack.entries.length === 0) {
    failures.push("entries must be a non-empty array");
    return failures;
  }

  const entryIds = new Set();
  for (const entry of pack.entries) {
    const label = entry?.id ? `entry ${entry.id}` : "entry <missing id>";
    assertString(entry?.id, `${label}.id`, failures);
    assertString(entry?.title, `${label}.title`, failures);
    assertString(entry?.content, `${label}.content`, failures);

    if (entryIds.has(entry.id)) {
      failures.push(`Duplicate context pack entry ID: ${entry.id}`);
    }
    entryIds.add(entry.id);

    if (!allowedCategories.has(entry.category)) {
      failures.push(`${label}.category is invalid: ${entry.category}`);
    }

    if (!allowedVisibility.has(entry.visibility)) {
      failures.push(`${label}.visibility is invalid: ${entry.visibility}`);
    }

    if (!Number.isInteger(entry.priority)) {
      failures.push(`${label}.priority must be an integer`);
    }

    if (
      !Array.isArray(entry.tags) ||
      entry.tags.some((tag) => typeof tag !== "string" || tag.trim() === "")
    ) {
      failures.push(`${label}.tags must be an array of non-empty strings`);
    }

    if (
      !Array.isArray(entry.sourceSliceIds) ||
      entry.sourceSliceIds.length === 0 ||
      entry.sourceSliceIds.some(
        (id) => typeof id !== "string" || id.trim() === "",
      )
    ) {
      failures.push(
        `${label}.sourceSliceIds must be a non-empty array of strings`,
      );
      continue;
    }

    for (const sourceSliceId of entry.sourceSliceIds) {
      if (!sliceIds.has(sourceSliceId)) {
        failures.push(
          `${label} references missing source slice: ${sourceSliceId}`,
        );
        continue;
      }

      if (sliceMap.get(sourceSliceId)?.slice_origin !== "explicit_marker") {
        failures.push(
          `${label} references generated source slice ${sourceSliceId}; add an explicit source-slice marker before using it in the durable context pack`,
        );
      }

      if (sliceMap.get(sourceSliceId)?.default_game_retrieval === false) {
        failures.push(
          `${label} references ${sourceSliceId}, which is excluded from default game retrieval by its document authority`,
        );
      }
    }

    if (
      !Array.isArray(entry.sourceDocIds) ||
      entry.sourceDocIds.length === 0 ||
      entry.sourceDocIds.some(
        (id) => typeof id !== "string" || id.trim() === "",
      )
    ) {
      failures.push(
        `${label}.sourceDocIds must be a non-empty array of strings`,
      );
    } else {
      const expectedDocs = [
        ...new Set(
          entry.sourceSliceIds
            .map((sourceSliceId) => sliceMap.get(sourceSliceId)?.doc_id)
            .filter(Boolean),
        ),
      ].sort();
      const actualDocs = [...new Set(entry.sourceDocIds)].sort();
      if (expectedDocs.join("|") !== actualDocs.join("|")) {
        failures.push(
          `${label}.sourceDocIds must match referenced slice docs. Expected [${expectedDocs.join(", ")}], got [${actualDocs.join(", ")}]`,
        );
      }
    }

    if (
      entry.id !== quarantineEntryId &&
      prototypeLeakPattern.test(`${entry.title}\n${entry.content}`)
    ) {
      failures.push(
        `${label} appears to leak prototype campaign material outside the quarantine entry`,
      );
    }
  }

  return failures;
}

try {
  const failures = validate();
  if (failures.length > 0) {
    console.error("[validate-context-pack] Failed");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("[validate-context-pack] OK");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
