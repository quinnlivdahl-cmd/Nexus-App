import type { ProductionSeedAssetId } from "./presentationSeed.js";

export type ProductionSeedRasterAssetId = Exclude<
  ProductionSeedAssetId,
  "nexus.seed.fallback.missing-asset.v1"
>;

export type ProductionSeedRasterLayer =
  | "floor"
  | "wall"
  | "service-channel"
  | "door"
  | "actor"
  | "console"
  | "marker";

export interface ProductionSeedRasterEntry {
  readonly assetId: ProductionSeedRasterAssetId;
  readonly state: string;
  readonly layer: ProductionSeedRasterLayer;
  readonly nativePixels: readonly [width: number, height: number];
  readonly hasAlpha: boolean;
  readonly anchor: {
    readonly horizontal: "left" | "center";
    readonly vertical: "top" | "center" | "bottom";
  };
  readonly source: {
    readonly path: string;
    readonly sha256: string;
  };
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const nested of Object.values(value as Record<string, unknown>)) deepFreeze(nested);
  }
  return value;
}

function raster(
  assetId: ProductionSeedRasterAssetId,
  state: string,
  layer: ProductionSeedRasterLayer,
  nativePixels: ProductionSeedRasterEntry["nativePixels"],
  hasAlpha: boolean,
  anchor: ProductionSeedRasterEntry["anchor"],
  path: string,
  sha256: string,
): ProductionSeedRasterEntry {
  return { assetId, state, layer, nativePixels, hasAlpha, anchor, source: { path, sha256 } };
}

const floorPath = "assets/production-seed/v1/environment/industrial-floor-tile.png";
const wallPath = "assets/production-seed/v1/environment/pressure-bulkhead-wall.png";
const doorPath = "assets/production-seed/v1/environment/pressure-door-slab.png";
const serviceChannelPath = "assets/production-seed/v1/environment/service-channel-live-conduit.png";
const actorPath = "assets/production-seed/v1/focal/field-lead-east-idle.png";
const consolePath = "assets/production-seed/v1/focal/relay-console.png";
const interactableMarkerPath = "assets/production-seed/v1/markers/marker-interactable.svg";
const hazardMarkerPath = "assets/production-seed/v1/markers/marker-hazard.svg";
const objectiveMarkerPath = "assets/production-seed/v1/markers/marker-objective.svg";

export const PRODUCTION_SEED_RASTER_MANIFEST = deepFreeze({
  "nexus.seed.floor.industrial-mosaic.v1": [
    raster("nexus.seed.floor.industrial-mosaic.v1", "default", "floor", [1254, 1254], false, { horizontal: "left", vertical: "top" }, floorPath, "2c91cb4502bd40c38eaac05c1f5e9831beca7825ee2407fbdacda4866f768589"),
    raster("nexus.seed.floor.industrial-mosaic.v1", "worn-panel", "floor", [1254, 1254], false, { horizontal: "left", vertical: "top" }, floorPath, "2c91cb4502bd40c38eaac05c1f5e9831beca7825ee2407fbdacda4866f768589"),
    raster("nexus.seed.floor.industrial-mosaic.v1", "service-channel", "service-channel", [1322, 377], true, { horizontal: "left", vertical: "top" }, serviceChannelPath, "5f118722e0ad19f78e7b9ee9ed879ed6ca1613654191e6fccb69cba214003e77"),
  ],
  "nexus.seed.wall.pressure-bulkhead.v1": [
    raster("nexus.seed.wall.pressure-bulkhead.v1", "default", "wall", [1717, 158], true, { horizontal: "left", vertical: "top" }, wallPath, "62cbaf9b515f6f9c9b9037db1b682b14303618d5352a80b89545a7f2a82f9a5b"),
    raster("nexus.seed.wall.pressure-bulkhead.v1", "warning-band", "wall", [1717, 158], true, { horizontal: "left", vertical: "top" }, wallPath, "62cbaf9b515f6f9c9b9037db1b682b14303618d5352a80b89545a7f2a82f9a5b"),
    raster("nexus.seed.wall.pressure-bulkhead.v1", "service-run", "wall", [1717, 158], true, { horizontal: "left", vertical: "top" }, wallPath, "62cbaf9b515f6f9c9b9037db1b682b14303618d5352a80b89545a7f2a82f9a5b"),
  ],
  "nexus.seed.door.pressure-slab.v1": [
    raster("nexus.seed.door.pressure-slab.v1", "open", "door", [377, 1453], true, { horizontal: "center", vertical: "center" }, doorPath, "aabb78b8fd419cbbbc23c04afe41b8dd1ad2be8e8b92b5142629bb87d69ce3a4"),
    raster("nexus.seed.door.pressure-slab.v1", "closed", "door", [377, 1453], true, { horizontal: "center", vertical: "center" }, doorPath, "aabb78b8fd419cbbbc23c04afe41b8dd1ad2be8e8b92b5142629bb87d69ce3a4"),
    raster("nexus.seed.door.pressure-slab.v1", "locked", "door", [377, 1453], true, { horizontal: "center", vertical: "center" }, doorPath, "aabb78b8fd419cbbbc23c04afe41b8dd1ad2be8e8b92b5142629bb87d69ce3a4"),
  ],
  "nexus.seed.actor.field-silhouette.v1": [
    raster("nexus.seed.actor.field-silhouette.v1", "idle", "actor", [271, 459], true, { horizontal: "center", vertical: "bottom" }, actorPath, "519b00410d35f71030bba96a241c9a0392717ce913563a3970f429ed0e00d137"),
    raster("nexus.seed.actor.field-silhouette.v1", "walk", "actor", [271, 459], true, { horizontal: "center", vertical: "bottom" }, actorPath, "519b00410d35f71030bba96a241c9a0392717ce913563a3970f429ed0e00d137"),
    raster("nexus.seed.actor.field-silhouette.v1", "selected", "actor", [271, 459], true, { horizontal: "center", vertical: "bottom" }, actorPath, "519b00410d35f71030bba96a241c9a0392717ce913563a3970f429ed0e00d137"),
  ],
  "nexus.seed.prop.relay-console.v1": [
    raster("nexus.seed.prop.relay-console.v1", "idle", "console", [808, 622], true, { horizontal: "center", vertical: "bottom" }, consolePath, "1993f46f8b66ce431f2344384207e78dbf1c5ac5b2f7af091d12d2ef9558cbe4"),
    raster("nexus.seed.prop.relay-console.v1", "available", "console", [808, 622], true, { horizontal: "center", vertical: "bottom" }, consolePath, "1993f46f8b66ce431f2344384207e78dbf1c5ac5b2f7af091d12d2ef9558cbe4"),
    raster("nexus.seed.prop.relay-console.v1", "active", "console", [808, 622], true, { horizontal: "center", vertical: "bottom" }, consolePath, "1993f46f8b66ce431f2344384207e78dbf1c5ac5b2f7af091d12d2ef9558cbe4"),
    raster("nexus.seed.prop.relay-console.v1", "disabled", "console", [808, 622], true, { horizontal: "center", vertical: "bottom" }, consolePath, "1993f46f8b66ce431f2344384207e78dbf1c5ac5b2f7af091d12d2ef9558cbe4"),
  ],
  "nexus.seed.marker.interactable.v1": [
    raster("nexus.seed.marker.interactable.v1", "available", "marker", [96, 96], true, { horizontal: "center", vertical: "center" }, interactableMarkerPath, "2e548270d7b21e0d01e71bbba6609740b20b8899dc10143493db2ceeaa999f94"),
    raster("nexus.seed.marker.interactable.v1", "blocked", "marker", [96, 96], true, { horizontal: "center", vertical: "center" }, interactableMarkerPath, "2e548270d7b21e0d01e71bbba6609740b20b8899dc10143493db2ceeaa999f94"),
    raster("nexus.seed.marker.interactable.v1", "focused", "marker", [96, 96], true, { horizontal: "center", vertical: "center" }, interactableMarkerPath, "2e548270d7b21e0d01e71bbba6609740b20b8899dc10143493db2ceeaa999f94"),
  ],
  "nexus.seed.marker.hazard.v1": [
    raster("nexus.seed.marker.hazard.v1", "active", "marker", [96, 96], true, { horizontal: "center", vertical: "center" }, hazardMarkerPath, "28f471899eee5ec37cfcbca866da26f1c344618e5fc4523e5a98d834c5b52e5c"),
    raster("nexus.seed.marker.hazard.v1", "inactive", "marker", [96, 96], true, { horizontal: "center", vertical: "center" }, hazardMarkerPath, "28f471899eee5ec37cfcbca866da26f1c344618e5fc4523e5a98d834c5b52e5c"),
  ],
  "nexus.seed.marker.objective.v1": [
    raster("nexus.seed.marker.objective.v1", "active", "marker", [96, 96], true, { horizontal: "center", vertical: "center" }, objectiveMarkerPath, "bebb2e5d0551958ee8d02fdff5a1de2c6c60c9e40a705d5f53c9b2d02af2264e"),
    raster("nexus.seed.marker.objective.v1", "complete", "marker", [96, 96], true, { horizontal: "center", vertical: "center" }, objectiveMarkerPath, "bebb2e5d0551958ee8d02fdff5a1de2c6c60c9e40a705d5f53c9b2d02af2264e"),
  ],
} satisfies Record<ProductionSeedRasterAssetId, readonly ProductionSeedRasterEntry[]>);

export const PRODUCTION_SEED_RASTER_ENTRIES = deepFreeze(
  Object.values(PRODUCTION_SEED_RASTER_MANIFEST).flat(),
);

export function rasterEntryKey(entry: Pick<ProductionSeedRasterEntry, "assetId" | "state">): string {
  return `${entry.assetId}:${entry.state}`;
}
