import type { RenderProjection } from "@workspace/spatial-runtime";

export const MISSING_ASSET_FALLBACK_ID = "nexus.seed.fallback.missing-asset.v1" as const;

export type ProductionSeedAssetId =
  | "nexus.seed.floor.industrial-mosaic.v1"
  | "nexus.seed.wall.pressure-bulkhead.v1"
  | "nexus.seed.wall.pressure-room-shell.v2"
  | "nexus.seed.door.pressure-slab.v1"
  | "nexus.seed.actor.field-silhouette.v1"
  | "nexus.seed.prop.relay-console.v1"
  | "nexus.seed.marker.interactable.v1"
  | "nexus.seed.marker.hazard.v1"
  | "nexus.seed.marker.objective.v1"
  | typeof MISSING_ASSET_FALLBACK_ID;

export type AssetCanonStatus =
  | "canon visual source"
  | "canon candidate"
  | "session visual"
  | "prompt exploration"
  | "non-canon reference"
  | "asset index only";

export interface ProductionSeedAsset {
  readonly assetId: ProductionSeedAssetId;
  readonly role:
    | "floor"
    | "wall"
    | "door"
    | "actor"
    | "interactable"
    | "marker"
    | "fallback";
  readonly outputStatus: AssetCanonStatus;
  readonly version: "1.1.0" | "2.0.0";
  readonly provenance: {
    readonly baselineCommit: "2ca033bb81f9b77497a5d420b2584434fa185238";
    readonly createdForIssue: 108;
    readonly sourceDocs: readonly string[];
    readonly referenceAssets: readonly string[];
  };
  readonly scale: {
    readonly worldUnits: number;
    readonly mosaicPixelStep: number;
  };
  readonly anchor: {
    readonly horizontal: "left" | "center";
    readonly vertical: "top" | "center" | "bottom";
    readonly offsetWorldUnits: { readonly x: number; readonly y: number };
  };
  readonly states: readonly string[];
  readonly fallbackAssetId: typeof MISSING_ASSET_FALLBACK_ID;
  readonly palette: {
    readonly ink: number;
    readonly base: number;
    readonly mid: number;
    readonly highlight: number;
    readonly accent: number;
  };
}

const baselineSourceDocs = [
  "ART-REFERENCE-010",
  "ART-ENVIRONMENT-001",
  "ART-RUNBOOK-008",
] as const;

const baselineReferenceAssets = [
  "nexus-hybrid-pixel-grammar-comparison-2026-07-18.png",
  "nexus-terminal-popup-over-live-location-concept-2026-07-17.png",
] as const;

const selectedRoomShellReference = "production-intent-user-selected-target-2026-07-19.png" as const;

const v1Provenance = {
  baselineCommit: "2ca033bb81f9b77497a5d420b2584434fa185238",
  createdForIssue: 108,
  sourceDocs: baselineSourceDocs,
  referenceAssets: baselineReferenceAssets,
} as const;

const roomShellProvenance = {
  ...v1Provenance,
  referenceAssets: [selectedRoomShellReference] as const,
} as const;

const manifestProvenance = {
  ...v1Provenance,
  referenceAssets: [...baselineReferenceAssets, selectedRoomShellReference] as const,
} as const;

function asset(
  value: Omit<ProductionSeedAsset, "outputStatus" | "version" | "provenance" | "fallbackAssetId">,
  version: ProductionSeedAsset["version"] = "1.1.0",
  provenance: ProductionSeedAsset["provenance"] = v1Provenance,
): ProductionSeedAsset {
  return {
    ...value,
    outputStatus: "canon candidate",
    version,
    provenance,
    fallbackAssetId: MISSING_ASSET_FALLBACK_ID,
  };
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const nested of Object.values(value as Record<string, unknown>)) deepFreeze(nested);
  }
  return value;
}

const industrialPalette = {
  ink: 0x05090b,
  base: 0x151d20,
  mid: 0x293338,
  highlight: 0x697174,
  accent: 0xd46a24,
} as const;

const cyanPalette = {
  ink: 0x061015,
  base: 0x173039,
  mid: 0x2c626a,
  highlight: 0xb7eef0,
  accent: 0x47d7db,
} as const;

export const PRODUCTION_SEED_MANIFEST = deepFreeze({
  manifestId: "nexus.production-intent-seed",
  version: "2.0.0",
  outputStatus: "canon candidate" as AssetCanonStatus,
  immutableAfterApproval: ["assetId", "fallbackAssetId", "anchor", "saveFacingMeaning"],
  provenance: manifestProvenance,
  scale: {
    worldUnitPixelsAtReference: 24,
    referenceViewport: { width: 1440, height: 900 },
    camera: "fixed-orthographic-10-degrees-from-overhead",
  },
  assets: {
    "nexus.seed.floor.industrial-mosaic.v1": asset({
      assetId: "nexus.seed.floor.industrial-mosaic.v1",
      role: "floor",
      scale: { worldUnits: 12, mosaicPixelStep: 4 },
      anchor: { horizontal: "left", vertical: "top", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["default", "worn-panel", "service-channel"],
      palette: industrialPalette,
    }),
    "nexus.seed.wall.pressure-bulkhead.v1": asset({
      assetId: "nexus.seed.wall.pressure-bulkhead.v1",
      role: "wall",
      scale: { worldUnits: 1, mosaicPixelStep: 4 },
      anchor: { horizontal: "left", vertical: "top", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["default", "warning-band", "service-run"],
      palette: industrialPalette,
    }),
    "nexus.seed.wall.pressure-room-shell.v2": asset({
      assetId: "nexus.seed.wall.pressure-room-shell.v2",
      role: "wall",
      scale: { worldUnits: 12, mosaicPixelStep: 4 },
      anchor: { horizontal: "left", vertical: "top", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["default"],
      palette: industrialPalette,
    }, "2.0.0", roomShellProvenance),
    "nexus.seed.door.pressure-slab.v1": asset({
      assetId: "nexus.seed.door.pressure-slab.v1",
      role: "door",
      scale: { worldUnits: 2, mosaicPixelStep: 4 },
      anchor: { horizontal: "center", vertical: "center", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["open", "closed", "locked"],
      palette: industrialPalette,
    }),
    "nexus.seed.actor.field-silhouette.v1": asset({
      assetId: "nexus.seed.actor.field-silhouette.v1",
      role: "actor",
      scale: { worldUnits: 1.4, mosaicPixelStep: 3 },
      anchor: { horizontal: "center", vertical: "bottom", offsetWorldUnits: { x: 0, y: 0.25 } },
      states: ["idle", "walk", "selected"],
      palette: cyanPalette,
    }),
    "nexus.seed.prop.relay-console.v1": asset({
      assetId: "nexus.seed.prop.relay-console.v1",
      role: "interactable",
      scale: { worldUnits: 1.8, mosaicPixelStep: 3 },
      anchor: { horizontal: "center", vertical: "bottom", offsetWorldUnits: { x: 0, y: 0.2 } },
      states: ["idle", "available", "active", "disabled"],
      palette: cyanPalette,
    }),
    "nexus.seed.marker.interactable.v1": asset({
      assetId: "nexus.seed.marker.interactable.v1",
      role: "marker",
      scale: { worldUnits: 2.2, mosaicPixelStep: 3 },
      anchor: { horizontal: "center", vertical: "center", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["available", "blocked", "focused"],
      palette: cyanPalette,
    }),
    "nexus.seed.marker.hazard.v1": asset({
      assetId: "nexus.seed.marker.hazard.v1",
      role: "marker",
      scale: { worldUnits: 1.4, mosaicPixelStep: 3 },
      anchor: { horizontal: "center", vertical: "center", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["active", "inactive"],
      palette: { ...industrialPalette, accent: 0xf0a233 },
    }),
    "nexus.seed.marker.objective.v1": asset({
      assetId: "nexus.seed.marker.objective.v1",
      role: "marker",
      scale: { worldUnits: 1.4, mosaicPixelStep: 3 },
      anchor: { horizontal: "center", vertical: "center", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["active", "complete"],
      palette: { ...cyanPalette, accent: 0xe8e2bd },
    }),
    [MISSING_ASSET_FALLBACK_ID]: asset({
      assetId: MISSING_ASSET_FALLBACK_ID,
      role: "fallback",
      scale: { worldUnits: 1.4, mosaicPixelStep: 4 },
      anchor: { horizontal: "center", vertical: "center", offsetWorldUnits: { x: 0, y: 0 } },
      states: ["missing"],
      palette: { ink: 0x130916, base: 0x321637, mid: 0x8d3c87, highlight: 0xffd7f8, accent: 0xe552d5 },
    }),
  } satisfies Record<ProductionSeedAssetId, ProductionSeedAsset>,
});

interface SceneAssetBinding {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly assetId: ProductionSeedAssetId;
}

export interface ProductionSeedScene {
  readonly revision: number;
  readonly manifestVersion: string;
  readonly camera: RenderProjection["camera"];
  readonly areas: readonly {
    readonly id: string;
    readonly label: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly floorAssetId: ProductionSeedAssetId;
    readonly wallAssetId: ProductionSeedAssetId;
  }[];
  readonly doors: readonly SceneAssetBinding[];
  readonly actors: readonly (SceneAssetBinding & {
    readonly state: string;
    readonly facing: RenderProjection["actors"][number]["facing"];
    readonly isSelected: boolean;
    readonly presentationRole: "player-character" | "follower";
  })[];
  readonly interactables: readonly SceneAssetBinding[];
  readonly hazardSubstrates: readonly (SceneAssetBinding & { readonly state: "service-channel" })[];
  readonly markers: readonly (SceneAssetBinding & {
    readonly kind: "interactable" | "hazard" | "objective";
    readonly glyph: "brackets" | "warning-triangle" | "diamond-target";
    readonly active: boolean;
  })[];
  readonly fallbackActivations: readonly {
    readonly requestedAssetId: ProductionSeedAssetId;
    readonly fallbackAssetId: typeof MISSING_ASSET_FALLBACK_ID;
  }[];
}

export function buildProductionSeedScene(
  projection: RenderProjection,
  unavailableAssetIds: ReadonlySet<string> = new Set(),
  selectedActorId?: string,
): ProductionSeedScene {
  const fallbackActivations: Array<{
    requestedAssetId: ProductionSeedAssetId;
    fallbackAssetId: typeof MISSING_ASSET_FALLBACK_ID;
  }> = [];

  const resolve = (requestedAssetId: ProductionSeedAssetId): ProductionSeedAssetId => {
    if (!unavailableAssetIds.has(requestedAssetId) || requestedAssetId === MISSING_ASSET_FALLBACK_ID) {
      return requestedAssetId;
    }
    fallbackActivations.push({ requestedAssetId, fallbackAssetId: MISSING_ASSET_FALLBACK_ID });
    return MISSING_ASSET_FALLBACK_ID;
  };

  const playerCharacterId = selectedActorId ?? projection.actors[0]?.id;

  return deepFreeze({
    revision: projection.revision,
    manifestVersion: PRODUCTION_SEED_MANIFEST.version,
    camera: projection.camera,
    areas: projection.areas.map((area) => ({
      id: area.id,
      label: area.label,
      x: area.bounds.x,
      y: area.bounds.y,
      width: area.bounds.width,
      height: area.bounds.height,
      floorAssetId: resolve("nexus.seed.floor.industrial-mosaic.v1"),
      wallAssetId: resolve("nexus.seed.wall.pressure-room-shell.v2"),
    })),
    doors: projection.doors.map((door) => ({
      id: door.id,
      label: "Pressure door",
      x: door.x,
      y: door.y,
      assetId: resolve("nexus.seed.door.pressure-slab.v1"),
    })),
    actors: projection.actors.map((actor) => ({
      id: actor.id,
      label: actor.label,
      x: actor.x,
      y: actor.y,
      state: actor.semanticAnimation,
      facing: actor.facing,
      isSelected: actor.id === selectedActorId,
      presentationRole: actor.id === playerCharacterId ? "player-character" as const : "follower" as const,
      assetId: resolve("nexus.seed.actor.field-silhouette.v1"),
    })),
    interactables: projection.interactables.map((interactable) => ({
      id: interactable.id,
      label: interactable.label,
      x: interactable.x,
      y: interactable.y,
      assetId: resolve("nexus.seed.prop.relay-console.v1"),
    })),
    hazardSubstrates: projection.hazards.map((hazard) => ({
      id: hazard.id + "-substrate",
      label: hazard.label + " substrate",
      x: hazard.x,
      y: hazard.y,
      state: "service-channel" as const,
      assetId: resolve("nexus.seed.floor.industrial-mosaic.v1"),
    })),
    markers: [
      ...projection.interactables.map((interactable) => ({
        id: `${interactable.id}-marker`,
        label: `${interactable.label} available`,
        x: interactable.x,
        y: interactable.y,
        kind: "interactable" as const,
        glyph: "brackets" as const,
        active: true,
        assetId: resolve("nexus.seed.marker.interactable.v1"),
      })),
      ...projection.hazards.map((hazard) => ({
        id: `${hazard.id}-marker`,
        label: hazard.label,
        x: hazard.x,
        y: hazard.y,
        kind: "hazard" as const,
        glyph: "warning-triangle" as const,
        active: hazard.active,
        assetId: resolve("nexus.seed.marker.hazard.v1"),
      })),
      ...projection.objectives.map((objective) => ({
        id: `${objective.id}-marker`,
        label: objective.label,
        x: objective.x,
        y: objective.y,
        kind: "objective" as const,
        glyph: "diamond-target" as const,
        active: objective.active,
        assetId: resolve("nexus.seed.marker.objective.v1"),
      })),
    ],
    fallbackActivations,
  });
}
