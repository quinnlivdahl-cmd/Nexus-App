export function freshnessFor(observedAt, generatedAt, thresholdHours, forcedStale = false) {
  if (forcedStale) return "stale";
  const observed = Date.parse(observedAt);
  const generated = generatedAt instanceof Date ? generatedAt.getTime() : Date.parse(generatedAt);
  if (!Number.isFinite(observed) || !Number.isFinite(generated)) return "unknown";
  const ageHours = Math.max(0, generated - observed) / 3_600_000;
  if (ageHours <= thresholdHours) return "fresh";
  if (ageHours <= thresholdHours * 2) return "aging";
  return "stale";
}

export function worstFreshness(values) {
  const rank = { fresh: 0, aging: 1, unknown: 2, stale: 3 };
  return values.reduce((worst, value) => rank[value] > rank[worst] ? value : worst, "fresh");
}

export function publicationStatusFor({ driveId, previousHash, nextHash, currentStatus }) {
  if (!driveId) return "pending";
  if (currentStatus === "withdrawn") return "withdrawn";
  if (currentStatus === "stale") return "stale";
  if (currentStatus === "published" && previousHash !== nextHash) return "stale";
  return currentStatus === "published" ? "published" : "stale";
}

export function manifestStatusFor(entries) {
  if (entries.some((entry) => entry.publicationStatus === "stale")) return "stale";
  if (entries.length > 0 && entries.every((entry) => entry.publicationStatus === "published")) return "published";
  return "designed-not-published";
}
