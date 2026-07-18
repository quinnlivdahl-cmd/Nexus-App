import {
  createSpatialRuntime,
  createTracerFixtureState,
  type ShellProjection,
  type SpatialRuntime,
} from "@workspace/spatial-runtime";
import { useEffect, useMemo, useState } from "react";
import { SpatialCanvas } from "./SpatialCanvas.js";

function useShellProjection(runtime: SpatialRuntime): ShellProjection {
  const [projection, setProjection] = useState(() => runtime.getShellProjection());
  useEffect(
    () => runtime.subscribe(() => setProjection(runtime.getShellProjection())),
    [runtime],
  );
  return projection;
}

export function App() {
  const runtime = useMemo(() => createSpatialRuntime(createTracerFixtureState()), []);
  const shell = useShellProjection(runtime);
  const developer = runtime.getDeveloperProjection();

  const issueMove = () => {
    runtime.dispatch({
      type: "actor.move",
      commandId: `ui-move-${shell.revision + 1}`,
      expectedRevision: shell.revision,
      actorId: shell.selectedActor.id,
      destination: { x: 10, y: 5 },
    });
  };

  return (
    <main>
      <header>
        <p className="eyebrow">Ticket #107 · local tracer fixture</p>
        <h1>{shell.locationLabel}</h1>
        <p>One engine-owned command, frame, snapshot, and projection seam.</p>
      </header>

      <section className="play-surface" aria-label="Spatial play surface">
        <SpatialCanvas runtime={runtime} />
        <aside className="controls" aria-label="Spatial runtime controls">
          <h2>Runtime controls</h2>
          <button type="button" onClick={issueMove}>Move east</button>
          <button type="button" onClick={() => runtime.step(750)}>Step 750 ms</button>
          <button type="button" onClick={() => runtime.checkpoint()}>Checkpoint</button>

          <dl aria-live="polite" aria-label="Player-critical spatial status">
            <div><dt>Selected actor</dt><dd>{shell.selectedActor.label}</dd></div>
            <div><dt>Position</dt><dd>{shell.selectedActor.x.toFixed(2)}, {shell.selectedActor.y.toFixed(2)}</dd></div>
            <div><dt>Facing</dt><dd>{shell.selectedActor.facing}</dd></div>
            <div><dt>Animation</dt><dd>{shell.selectedActor.semanticAnimation}</dd></div>
            <div><dt>Revision</dt><dd>{shell.revision}</dd></div>
            <div><dt>Save status</dt><dd>{shell.saveStatus}</dd></div>
          </dl>
        </aside>
      </section>

      <details>
        <summary>Developer Mode</summary>
        <pre>{JSON.stringify(developer, null, 2)}</pre>
      </details>
    </main>
  );
}
