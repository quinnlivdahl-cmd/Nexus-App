import type { SpatialRuntime } from "@workspace/spatial-runtime";
import { Application, Container, Graphics, Text } from "pixi.js";
import { useEffect, useRef } from "react";

export function SpatialCanvas({ runtime }: { runtime: SpatialRuntime }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let unsubscribe = () => {};
    let canvas: HTMLCanvasElement | null = null;
    const app = new Application();

    void app.init({
      resizeTo: host,
      background: "#071118",
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

      const draw = () => {
        for (const child of scene.removeChildren()) child.destroy();

        scene.addChild(
          new Graphics()
            .rect(36, 36, Math.max(220, app.screen.width - 72), Math.max(160, app.screen.height - 72))
            .fill({ color: 0x0d2028 })
            .stroke({ color: 0x36505a, width: 2 }),
        );

        const projection = runtime.getRenderProjection();
        for (const actor of projection.actors) {
          const marker = new Graphics()
            .circle(actor.x * 24 + 28, actor.y * 24 + 24, 11)
            .fill({ color: actor.semanticAnimation === "walk" ? 0xf0a63a : 0x6fd1c5 })
            .stroke({ color: 0xe8f5f2, width: 2 });
          marker.label = actor.id;
          scene.addChild(marker);
          scene.addChild(
            new Text({
              text: `${actor.label} · ${actor.semanticAnimation}`,
              style: { fill: 0xdce8e7, fontFamily: "monospace", fontSize: 13 },
              x: actor.x * 24 + 44,
              y: actor.y * 24 + 15,
            }),
          );
        }
      };

      draw();
      unsubscribe = runtime.subscribe(draw);
    });

    return () => {
      disposed = true;
      unsubscribe();
      if (canvas?.parentElement === host) host.removeChild(canvas);
      if (canvas) app.destroy();
    };
  }, [runtime]);

  return <div className="spatial-canvas" ref={hostRef} aria-hidden="true" />;
}
