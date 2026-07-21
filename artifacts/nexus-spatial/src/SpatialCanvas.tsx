import {
  ACTOR_SELECTION_FOOTPRINT,
  ACTOR_VISUAL_COLLISION_FOOTPRINT,
  type SpatialRuntime,
} from "@workspace/spatial-runtime";
import { Application, Container, Graphics, NineSliceSprite, Sprite, Text, TilingSprite, type Texture } from "pixi.js";
import { useEffect, useRef } from "react";
import {
  MISSING_ASSET_FALLBACK_ID,
  buildProductionSeedScene,
  type ProductionSeedAssetId,
  type ProductionSeedScene,
} from "./presentationSeed.js";
import {
  PRODUCTION_SEED_RASTER_MANIFEST,
  type ProductionSeedRasterAssetId,
} from "./productionSeedRasterManifest.js";
import { loadProductionSeedTextures, textureFor } from "./productionSeedTextures.js";
import { deriveProductionSeedLayout } from "./productionSeedLayout.js";

const REFERENCE_ACTOR_ASSET = "nexus.seed.actor.field-silhouette.v1";
// The frame's visible metal border is roughly 95 native pixels. At this scale it
// reads as about 1.2 gameplay units at the default 24px/unit reference density.
const ROOM_SHELL_PRESENTATION_SCALE = 0.32;
const ROOM_SHELL_SLICE = { left: 210, top: 145, right: 210, bottom: 145 } as const;

interface SceneLayout {
  readonly unit: number;
  readonly left: number;
  readonly top: number;
}

function pixel(value: number): number {
  return Math.round(value);
}

function point(layout: SceneLayout, x: number, y: number) {
  return { x: pixel(layout.left + x * layout.unit), y: pixel(layout.top + y * layout.unit) };
}

function drawFallback(scene: Container, x: number, y: number, size: number, label: string) {
  const block = new Graphics()
    .rect(pixel(x - size / 2), pixel(y - size / 2), pixel(size), pixel(size))
    .fill({ color: 0x321637 })
    .stroke({ color: 0xe552d5, width: 3 });
  for (let offset = -size / 2 + 4; offset < size / 2; offset += 8) {
    block.moveTo(pixel(x + offset), pixel(y - size / 2)).lineTo(pixel(x + Math.min(size / 2, offset + size)), pixel(y + size / 2))
      .stroke({ color: 0x8d3c87, width: 2 });
  }
  scene.addChild(block);
  scene.addChild(new Text({
    text: "?",
    style: { fill: 0xffd7f8, fontFamily: "ui-monospace, monospace", fontSize: Math.max(15, pixel(size * 0.52)), fontWeight: "800" },
    anchor: 0.5,
    x: pixel(x),
    y: pixel(y),
  }));
  block.label = `Missing asset fallback for ${label}`;
}

function rasterTexture(
  textures: ReadonlyMap<string, Texture>,
  assetId: ProductionSeedAssetId,
  state: string,
): Texture | undefined {
  if (assetId === MISSING_ASSET_FALLBACK_ID) return undefined;
  const entries = PRODUCTION_SEED_RASTER_MANIFEST[assetId as ProductionSeedRasterAssetId];
  const entry = entries.find((candidate) => candidate.state === state) ?? entries[0];
  return entry ? textureFor(textures, entry) : undefined;
}

function addTiledRaster(
  scene: Container,
  texture: Texture,
  x: number,
  y: number,
  width: number,
  height: number,
  tileWidthPixels: number,
  tileHeightPixels: number,
  tint?: number,
) {
  const raster = new TilingSprite({
    texture,
    x: pixel(x),
    y: pixel(y),
    width: pixel(width),
    height: pixel(height),
    tileScale: { x: tileWidthPixels / texture.width, y: tileHeightPixels / texture.height },
    roundPixels: true,
    tint,
  });
  scene.addChild(raster);
  return raster;
}

function addRoomShell(
  scene: Container,
  texture: Texture,
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
) {
  const shell = new NineSliceSprite({
    texture,
    leftWidth: ROOM_SHELL_SLICE.left,
    topHeight: ROOM_SHELL_SLICE.top,
    rightWidth: ROOM_SHELL_SLICE.right,
    bottomHeight: ROOM_SHELL_SLICE.bottom,
    width: pixel(width / ROOM_SHELL_PRESENTATION_SCALE),
    height: pixel(height / ROOM_SHELL_PRESENTATION_SCALE),
    x: pixel(x),
    y: pixel(y),
    roundPixels: true,
  });
  shell.scale.set(ROOM_SHELL_PRESENTATION_SCALE);
  shell.label = label;
  scene.addChild(shell);
}

function drawArea(
  scene: Container,
  area: ProductionSeedScene["areas"][number],
  layout: SceneLayout,
  index: number,
  textures: ReadonlyMap<string, Texture>,
) {
  const { x, y } = point(layout, area.x, area.y);
  const width = pixel(area.width * layout.unit);
  const height = pixel(area.height * layout.unit);
  const floor = rasterTexture(textures, area.floorAssetId, index === 1 ? "worn-panel" : "default");
  const wall = rasterTexture(textures, area.wallAssetId, "default");
  const tilePixels = layout.unit * 12;

  if (floor) {
    addTiledRaster(scene, floor, x, y, width, height, tilePixels, tilePixels);
  } else {
    drawFallback(scene, x + width / 2, y + height / 2, Math.min(width, height) * 0.35, `${area.label} floor`);
  }

  if (wall) {
    addRoomShell(scene, wall, x, y, width, height, `${area.label} room shell`);
  } else {
    const border = new Graphics().rect(x, y, width, height).stroke({ color: 0xe552d5, width: 3 });
    border.label = `Missing asset fallback for ${area.label} wall`;
    scene.addChild(border);
  }

}

function drawHazardSubstrate(
  scene: Container,
  substrate: ProductionSeedScene["hazardSubstrates"][number],
  layout: SceneLayout,
  textures: ReadonlyMap<string, Texture>,
) {
  const { x, y } = point(layout, substrate.x, substrate.y);
  const width = layout.unit * 4;
  const height = layout.unit * 1.15;
  const texture = rasterTexture(textures, substrate.assetId, substrate.state);
  if (texture) {
    addTiledRaster(scene, texture, x - width / 2, y - height / 2, width, height, width, height);
  } else {
    drawFallback(scene, x, y, layout.unit * 0.9, substrate.label);
  }
}

function drawSprite(
  scene: Container,
  texture: Texture | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
  anchor: { readonly x: number; readonly y: number },
  label: string,
  tint?: number,
) {
  if (!texture) return drawFallback(scene, x, y, Math.max(width, height) * 0.8, label);
  const sprite = new Sprite({ texture, anchor, x: pixel(x), y: pixel(y), roundPixels: true });
  const scale = Math.min(width / texture.width, height / texture.height);
  sprite.scale.set(scale);
  if (tint !== undefined) sprite.tint = tint;
  sprite.label = label;
  scene.addChild(sprite);
}

function drawDoor(scene: Container, door: ProductionSeedScene["doors"][number], layout: SceneLayout, textures: ReadonlyMap<string, Texture>) {
  const { x, y } = point(layout, door.x, door.y);
  drawSprite(scene, rasterTexture(textures, door.assetId, "closed"), x, y, layout.unit * 1.55, layout.unit * 4.35, { x: 0.5, y: 0.5 }, door.label);
}

function drawActor(scene: Container, actor: ProductionSeedScene["actors"][number], layout: SceneLayout, textures: ReadonlyMap<string, Texture>) {
  const { x, y } = point(layout, actor.x, actor.y);
  const accent = actor.presentationRole === "player-character" ? 0x47d7db : 0xf0a233;
  if (actor.isSelected) {
    const selection = new Graphics()
      .ellipse(
        x,
        y + layout.unit * ACTOR_SELECTION_FOOTPRINT.offsetY,
        layout.unit * ACTOR_SELECTION_FOOTPRINT.radiusX,
        layout.unit * ACTOR_SELECTION_FOOTPRINT.radiusY,
      )
      .fill({ color: 0x061015, alpha: 0.55 })
      .stroke({ color: accent, width: 2 })
      .poly([
        x + layout.unit * 0.78, y + layout.unit * 0.48,
        x + layout.unit * 1.08, y + layout.unit * 0.68,
        x + layout.unit * 0.78, y + layout.unit * 0.88,
      ])
      .fill({ color: 0xb7eef0 });
    selection.label = `${actor.label} selected, facing ${actor.facing}`;
    scene.addChild(selection);
  }
  drawSprite(
    scene,
    rasterTexture(textures, actor.assetId, actor.state),
    x,
    y + layout.unit * ACTOR_VISUAL_COLLISION_FOOTPRINT.bottomOffset,
    layout.unit * ACTOR_VISUAL_COLLISION_FOOTPRINT.width,
    layout.unit * ACTOR_VISUAL_COLLISION_FOOTPRINT.height,
    { x: 0.5, y: 1 },
    `${actor.label}, ${actor.presentationRole}, ${actor.state}, facing ${actor.facing}`,
    actor.presentationRole === "player-character" ? undefined : accent,
  );
  scene.addChild(new Text({
    text: actor.presentationRole === "player-character" ? "PC" : "FOLLOW",
    style: { fill: accent, fontFamily: "ui-monospace, monospace", fontSize: Math.max(9, pixel(layout.unit * 0.26)), fontWeight: "800" },
    anchor: { x: 0.5, y: 1 },
    x,
    y: y - layout.unit * 0.38,
  }));
}

function drawInteractable(
  scene: Container,
  item: ProductionSeedScene["interactables"][number],
  layout: SceneLayout,
  textures: ReadonlyMap<string, Texture>,
  onPathToObject: (objectId: string) => void,
) {
  const { x, y } = point(layout, item.x, item.y);
  drawSprite(
    scene,
    rasterTexture(textures, item.assetId, "available"),
    x,
    y + layout.unit * 1.02,
    layout.unit * 2.65,
    layout.unit * 2.15,
    { x: 0.5, y: 1 },
    item.label,
  );
  const hitTarget = new Graphics()
    .rect(x - layout.unit * 1.4, y - layout.unit * 1.2, layout.unit * 2.8, layout.unit * 2.5)
    .fill({ color: 0xffffff, alpha: 0 });
  hitTarget.eventMode = "static";
  hitTarget.cursor = "pointer";
  hitTarget.label = `Path to ${item.label}`;
  hitTarget.on("pointertap", () => onPathToObject(item.id));
  scene.addChild(hitTarget);
}

function drawMarker(scene: Container, marker: ProductionSeedScene["markers"][number], layout: SceneLayout, textures: ReadonlyMap<string, Texture>) {
  const { x, y } = point(layout, marker.x, marker.y);
  const size = layout.unit * (marker.kind === "interactable" ? 2.65 : 1.35);
  const state = marker.kind === "interactable" ? "available" : marker.active ? "active" : marker.kind === "hazard" ? "inactive" : "complete";
  drawSprite(scene, rasterTexture(textures, marker.assetId, state), x, y, size, size, { x: 0.5, y: 0.5 }, `${marker.kind}: ${marker.label}`);
}

function drawScene(
  container: Container,
  seed: ProductionSeedScene,
  width: number,
  height: number,
  textures: ReadonlyMap<string, Texture>,
  desktopOverview: boolean,
  onPathToObject: (objectId: string) => void,
) {
  for (const child of container.removeChildren()) child.destroy();
  const layout: SceneLayout = deriveProductionSeedLayout(width, height, seed.areas, desktopOverview, seed.camera.framingScale);
  container.addChild(new Graphics().rect(0, 0, width, height).fill({ color: 0x05090b }));
  seed.areas.forEach((area, index) => drawArea(container, area, layout, index, textures));
  seed.hazardSubstrates.forEach((substrate) => drawHazardSubstrate(container, substrate, layout, textures));
  seed.doors.forEach((door) => drawDoor(container, door, layout, textures));
  seed.interactables.forEach((item) => drawInteractable(container, item, layout, textures, onPathToObject));
  seed.actors.forEach((actor) => drawActor(container, actor, layout, textures));
  seed.markers.forEach((marker) => drawMarker(container, marker, layout, textures));
}

export function SpatialCanvas({
  runtime,
  fallbackPreview,
  onRasterLoadFailure,
  selectedActorId,
  onPathToObject,
}: {
  runtime: SpatialRuntime;
  fallbackPreview: boolean;
  onRasterLoadFailure: (failedAssetIds: readonly string[]) => void;
  selectedActorId: string;
  onPathToObject: (objectId: string) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let initialized = false;
    let appDestroyed = false;
    let unsubscribe = () => {};
    let resizeObserver: ResizeObserver | null = null;
    let canvas: HTMLCanvasElement | null = null;
    const app = new Application();

    const destroyApp = () => {
      if (initialized && !appDestroyed) {
        appDestroyed = true;
        app.destroy();
      }
    };

    const initialize = async () => {
      await app.init({
        resizeTo: host,
        background: "#05090b",
        antialias: false,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });
      initialized = true;
      if (disposed) return destroyApp();

      canvas = app.canvas;
      host.appendChild(canvas);
      const loaded = await loadProductionSeedTextures();
      if (disposed) return destroyApp();

      onRasterLoadFailure(loaded.failedAssetIds);
      const unavailable = new Set<string>(loaded.failedAssetIds);
      if (fallbackPreview) unavailable.add(REFERENCE_ACTOR_ASSET);
      const scene = new Container();
      app.stage.addChild(scene);
      const draw = () => {
        drawScene(
          scene,
          buildProductionSeedScene(runtime.getRenderProjection(), unavailable, selectedActorId),
          app.screen.width,
          app.screen.height,
          loaded.textures,
          window.getComputedStyle(host).getPropertyValue("--desktop-overview").trim() === "1",
          onPathToObject,
        );
      };

      draw();
      unsubscribe = runtime.subscribe(draw);
      resizeObserver = new ResizeObserver(draw);
      resizeObserver.observe(host);
    };

    void initialize().catch(() => {
      if (!disposed) onRasterLoadFailure(Object.keys(PRODUCTION_SEED_RASTER_MANIFEST));
      if (canvas?.parentElement === host) host.removeChild(canvas);
      destroyApp();
    });

    return () => {
      disposed = true;
      unsubscribe();
      resizeObserver?.disconnect();
      if (canvas?.parentElement === host) host.removeChild(canvas);
      destroyApp();
    };
  }, [fallbackPreview, onPathToObject, onRasterLoadFailure, runtime, selectedActorId]);

  return <div className="spatial-canvas" ref={hostRef} aria-hidden="true" />;
}
