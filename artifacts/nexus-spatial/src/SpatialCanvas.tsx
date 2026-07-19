import type { SpatialRuntime } from "@workspace/spatial-runtime";
import { Application, Container, Graphics, Text } from "pixi.js";
import { useEffect, useRef } from "react";
import {
  MISSING_ASSET_FALLBACK_ID,
  buildProductionSeedScene,
  type ProductionSeedScene,
} from "./presentationSeed.js";

const REFERENCE_ACTOR_ASSET = "nexus.seed.actor.field-silhouette.v1";

interface SceneLayout {
  readonly unit: number;
  readonly left: number;
  readonly top: number;
}

function sceneLayout(width: number, height: number): SceneLayout {
  const unit = Math.max(16, Math.min(28, (width - 64) / 36, (height - 92) / 10));
  return {
    unit,
    left: Math.round((width - unit * 36) / 2),
    top: Math.round((height - unit * 10) / 2) + 10,
  };
}

function point(layout: SceneLayout, x: number, y: number) {
  return { x: layout.left + x * layout.unit, y: layout.top + y * layout.unit };
}

function drawFallback(scene: Container, x: number, y: number, size: number, label: string) {
  const block = new Graphics()
    .rect(x - size / 2, y - size / 2, size, size)
    .fill({ color: 0x321637 })
    .stroke({ color: 0xe552d5, width: 3 });
  for (let offset = -size / 2 + 4; offset < size / 2; offset += 8) {
    block.moveTo(x + offset, y - size / 2).lineTo(x + Math.min(size / 2, offset + size), y + size / 2)
      .stroke({ color: 0x8d3c87, width: 2 });
  }
  scene.addChild(block);
  scene.addChild(new Text({
    text: "?",
    style: { fill: 0xffd7f8, fontFamily: "ui-monospace, monospace", fontSize: Math.max(15, size * 0.52), fontWeight: "800" },
    anchor: 0.5,
    x,
    y,
  }));
  block.label = `Missing asset fallback for ${label}`;
}

function drawArea(scene: Container, area: ProductionSeedScene["areas"][number], layout: SceneLayout, index: number) {
  const { x, y } = point(layout, area.x, area.y);
  const width = area.width * layout.unit;
  const height = area.height * layout.unit;
  const floor = new Graphics()
    .rect(x, y, width, height)
    .fill({ color: index % 2 === 0 ? 0x151d20 : 0x192226 });

  const panel = layout.unit * 2;
  for (let px = x + 4; px < x + width - 4; px += panel) {
    for (let py = y + 4; py < y + height - 4; py += panel) {
      floor.rect(px, py, Math.min(panel - 6, x + width - px - 4), Math.min(panel - 6, y + height - py - 4))
        .fill({ color: ((px + py) / panel) % 2 < 1 ? 0x1f292d : 0x222c30 })
        .stroke({ color: 0x303b3f, width: 1 });
    }
  }

  floor.rect(x, y, width, height)
    .stroke({ color: 0x05090b, width: 12 })
    .rect(x + 5, y + 5, width - 10, height - 10)
    .stroke({ color: 0x697174, width: 2 });

  const trenchY = y + height * (index === 1 ? 0.72 : 0.84);
  floor.rect(x + 14, trenchY, Math.max(28, width - 28), Math.max(6, layout.unit * 0.28))
    .fill({ color: 0x070d10 })
    .stroke({ color: 0x3c4649, width: 1 });
  for (let stripeX = x + 20; stripeX < x + width - 18; stripeX += 16) {
    floor.rect(stripeX, trenchY + 2, 8, Math.max(2, layout.unit * 0.12)).fill({ color: 0x9d501f });
  }
  floor.label = `${area.label} technical mosaic floor and pressure wall`;
  scene.addChild(floor);
  scene.addChild(new Text({
    text: area.label.toUpperCase(),
    style: { fill: 0x788387, fontFamily: "ui-monospace, monospace", fontSize: Math.max(10, layout.unit * 0.46), fontWeight: "700", letterSpacing: 1.5 },
    x: x + 15,
    y: y + 14,
  }));
}

function drawDoor(scene: Container, door: ProductionSeedScene["doors"][number], layout: SceneLayout) {
  const { x, y } = point(layout, door.x, door.y);
  if (door.assetId === MISSING_ASSET_FALLBACK_ID) return drawFallback(scene, x, y, layout.unit * 1.4, door.label);
  const width = Math.max(12, layout.unit * 0.55);
  const height = layout.unit * 2.2;
  const slab = new Graphics()
    .roundRect(x - width / 2, y - height / 2, width, height, 2)
    .fill({ color: 0x293338 })
    .stroke({ color: 0x05090b, width: 5 })
    .rect(x - width / 2 + 3, y - height / 2 + 7, width - 6, 6)
    .fill({ color: 0xd46a24 })
    .rect(x - width / 2 + 3, y + height / 2 - 13, width - 6, 6)
    .fill({ color: 0xd46a24 });
  slab.label = door.label;
  scene.addChild(slab);
}

function drawActor(scene: Container, actor: ProductionSeedScene["actors"][number], layout: SceneLayout) {
  const { x, y } = point(layout, actor.x, actor.y);
  if (actor.assetId === MISSING_ASSET_FALLBACK_ID) return drawFallback(scene, x, y, layout.unit * 1.5, actor.label);
  const unit = layout.unit;
  const silhouette = new Graphics()
    .ellipse(x + unit * 0.08, y + unit * 0.28, unit * 0.55, unit * 0.28)
    .fill({ color: 0x05090b, alpha: 0.72 })
    .poly([
      x, y - unit * 0.62,
      x + unit * 0.32, y - unit * 0.28,
      x + unit * 0.26, y + unit * 0.38,
      x, y + unit * 0.62,
      x - unit * 0.26, y + unit * 0.38,
      x - unit * 0.32, y - unit * 0.28,
    ])
    .fill({ color: 0x173039 })
    .stroke({ color: 0xb7eef0, width: 2 })
    .rect(x - unit * 0.18, y - unit * 0.38, unit * 0.36, unit * 0.27)
    .fill({ color: 0x47d7db })
    .rect(x - unit * 0.11, y - unit * 0.31, unit * 0.22, unit * 0.06)
    .fill({ color: 0x061015 });
  silhouette.label = `${actor.label} ${actor.state} silhouette`;
  scene.addChild(silhouette);
}

function drawInteractable(scene: Container, item: ProductionSeedScene["interactables"][number], layout: SceneLayout) {
  const { x, y } = point(layout, item.x, item.y);
  if (item.assetId === MISSING_ASSET_FALLBACK_ID) return drawFallback(scene, x, y, layout.unit * 1.7, item.label);
  const unit = layout.unit;
  const console = new Graphics()
    .roundRect(x - unit * 0.62, y - unit * 0.58, unit * 1.24, unit * 1.16, 3)
    .fill({ color: 0x222c30 })
    .stroke({ color: 0x05090b, width: 4 })
    .rect(x - unit * 0.42, y - unit * 0.38, unit * 0.56, unit * 0.34)
    .fill({ color: 0x0b242a })
    .stroke({ color: 0x47d7db, width: 2 })
    .rect(x - unit * 0.34, y - unit * 0.28, unit * 0.35, 3)
    .fill({ color: 0xb7eef0 })
    .rect(x - unit * 0.34, y - unit * 0.18, unit * 0.25, 3)
    .fill({ color: 0x47d7db })
    .rect(x + unit * 0.26, y - unit * 0.32, unit * 0.13, unit * 0.13)
    .fill({ color: 0xd46a24 })
    .rect(x + unit * 0.26, y - unit * 0.1, unit * 0.13, unit * 0.13)
    .fill({ color: 0x697174 });
  console.label = item.label;
  scene.addChild(console);
}

function drawMarker(scene: Container, marker: ProductionSeedScene["markers"][number], layout: SceneLayout) {
  const { x, y } = point(layout, marker.x, marker.y);
  const size = layout.unit * (marker.kind === "interactable" ? 1.8 : 0.95);
  if (marker.assetId === MISSING_ASSET_FALLBACK_ID) return drawFallback(scene, x, y, size, marker.label);
  const graphic = new Graphics();
  let overlay: Text | null = null;
  if (marker.kind === "interactable") {
    const half = size / 2;
    const corner = size * 0.25;
    graphic.moveTo(x - half, y - half + corner).lineTo(x - half, y - half).lineTo(x - half + corner, y - half)
      .moveTo(x + half - corner, y - half).lineTo(x + half, y - half).lineTo(x + half, y - half + corner)
      .moveTo(x + half, y + half - corner).lineTo(x + half, y + half).lineTo(x + half - corner, y + half)
      .moveTo(x - half + corner, y + half).lineTo(x - half, y + half).lineTo(x - half, y + half - corner)
      .stroke({ color: 0x47d7db, width: 4 });
  } else if (marker.kind === "hazard") {
    graphic.poly([x, y - size * 0.55, x + size * 0.55, y + size * 0.45, x - size * 0.55, y + size * 0.45])
      .fill({ color: 0x26180c })
      .stroke({ color: 0xf0a233, width: 3 });
    overlay = new Text({ text: "!", style: { fill: 0xffd38a, fontFamily: "ui-monospace, monospace", fontSize: size * 0.62, fontWeight: "900" }, anchor: 0.5, x, y: y + 2 });
  } else {
    graphic.poly([x, y - size * 0.6, x + size * 0.6, y, x, y + size * 0.6, x - size * 0.6, y])
      .fill({ color: 0x13282d, alpha: 0.88 })
      .stroke({ color: 0xe8e2bd, width: 3 })
      .circle(x, y, size * 0.15)
      .fill({ color: 0x47d7db });
  }
  graphic.label = `${marker.kind}: ${marker.label}`;
  scene.addChild(graphic);
  if (overlay) scene.addChild(overlay);
}

function drawScene(container: Container, seed: ProductionSeedScene, width: number, height: number) {
  for (const child of container.removeChildren()) child.destroy();
  const layout = sceneLayout(width, height);
  container.addChild(new Graphics().rect(0, 0, width, height).fill({ color: 0x05090b }));
  seed.areas.forEach((area, index) => drawArea(container, area, layout, index));
  seed.doors.forEach((door) => drawDoor(container, door, layout));
  seed.interactables.forEach((item) => drawInteractable(container, item, layout));
  seed.actors.forEach((actor) => drawActor(container, actor, layout));
  seed.markers.forEach((marker) => drawMarker(container, marker, layout));
}

export function SpatialCanvas({
  runtime,
  fallbackPreview,
}: {
  runtime: SpatialRuntime;
  fallbackPreview: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let unsubscribe = () => {};
    let resizeObserver: ResizeObserver | null = null;
    let canvas: HTMLCanvasElement | null = null;
    const app = new Application();

    void app.init({
      resizeTo: host,
      background: "#05090b",
      antialias: false,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    }).then(() => {
      if (disposed) {
        app.destroy();
        return;
      }

      canvas = app.canvas;
      host.appendChild(canvas);
      const scene = new Container();
      app.stage.addChild(scene);
      const unavailable = fallbackPreview ? new Set([REFERENCE_ACTOR_ASSET]) : new Set<string>();
      const draw = () => drawScene(
        scene,
        buildProductionSeedScene(runtime.getRenderProjection(), unavailable),
        app.screen.width,
        app.screen.height,
      );

      draw();
      unsubscribe = runtime.subscribe(draw);
      resizeObserver = new ResizeObserver(draw);
      resizeObserver.observe(host);
    });

    return () => {
      disposed = true;
      unsubscribe();
      resizeObserver?.disconnect();
      if (canvas?.parentElement === host) host.removeChild(canvas);
      if (canvas) app.destroy();
    };
  }, [fallbackPreview, runtime]);

  return <div className="spatial-canvas" ref={hostRef} aria-hidden="true" />;
}
