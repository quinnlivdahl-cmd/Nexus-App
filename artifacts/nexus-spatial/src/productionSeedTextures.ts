import { Assets, type Texture } from "pixi.js";
import floorUrl from "./assets/production-seed/v1/environment/industrial-floor-tile.png";
import wallUrl from "./assets/production-seed/v1/environment/pressure-bulkhead-wall.png";
import doorUrl from "./assets/production-seed/v1/environment/pressure-door-slab.png";
import serviceChannelUrl from "./assets/production-seed/v1/environment/service-channel-live-conduit.png";
import actorUrl from "./assets/production-seed/v1/focal/field-lead-east-idle.png";
import consoleUrl from "./assets/production-seed/v1/focal/relay-console.png";
import hazardMarkerUrl from "./assets/production-seed/v1/markers/marker-hazard.svg";
import interactableMarkerUrl from "./assets/production-seed/v1/markers/marker-interactable.svg";
import objectiveMarkerUrl from "./assets/production-seed/v1/markers/marker-objective.svg";
import {
  PRODUCTION_SEED_RASTER_ENTRIES,
  rasterEntryKey,
  type ProductionSeedRasterAssetId,
  type ProductionSeedRasterEntry,
} from "./productionSeedRasterManifest.js";

const urlsByPath: Readonly<Record<string, string>> = {
  "assets/production-seed/v1/environment/industrial-floor-tile.png": floorUrl,
  "assets/production-seed/v1/environment/pressure-bulkhead-wall.png": wallUrl,
  "assets/production-seed/v1/environment/pressure-door-slab.png": doorUrl,
  "assets/production-seed/v1/environment/service-channel-live-conduit.png": serviceChannelUrl,
  "assets/production-seed/v1/focal/field-lead-east-idle.png": actorUrl,
  "assets/production-seed/v1/focal/relay-console.png": consoleUrl,
  "assets/production-seed/v1/markers/marker-hazard.svg": hazardMarkerUrl,
  "assets/production-seed/v1/markers/marker-interactable.svg": interactableMarkerUrl,
  "assets/production-seed/v1/markers/marker-objective.svg": objectiveMarkerUrl,
};

export interface ProductionSeedTextureLoad {
  readonly textures: ReadonlyMap<string, Texture>;
  readonly failedAssetIds: readonly ProductionSeedRasterAssetId[];
}

export async function loadProductionSeedTextures(): Promise<ProductionSeedTextureLoad> {
  const textures = new Map<string, Texture>();
  const failedAssetIds = new Set<ProductionSeedRasterAssetId>();

  await Promise.all(PRODUCTION_SEED_RASTER_ENTRIES.map(async (entry) => {
    try {
      const texture = await Assets.load<Texture>({
        alias: rasterEntryKey(entry),
        src: urlsByPath[entry.source.path],
        data: { scaleMode: "nearest" },
      });
      texture.source.style.scaleMode = "nearest";
      textures.set(rasterEntryKey(entry), texture);
    } catch {
      failedAssetIds.add(entry.assetId);
    }
  }));

  return {
    textures,
    failedAssetIds: Object.freeze([...failedAssetIds].sort()),
  };
}

export function textureFor(
  textures: ReadonlyMap<string, Texture>,
  entry: Pick<ProductionSeedRasterEntry, "assetId" | "state">,
): Texture | undefined {
  return textures.get(rasterEntryKey(entry));
}
