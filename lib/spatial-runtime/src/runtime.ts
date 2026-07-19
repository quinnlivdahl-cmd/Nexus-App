import { encodeCampaignLocation } from "./codec.js";
import { validateCampaignLocationState } from "./fixture.js";
import { cloneValue, immutableCopy } from "./immutable.js";
import type {
  CampaignLocationState,
  CommandResult,
  DeveloperProjection,
  Facing,
  RenderActorProjection,
  RenderProjection,
  RuntimeEvent,
  ShellProjection,
  SpatialActor,
  SpatialCommand,
  SpatialRuntime,
  Vector2,
} from "./types.js";

function contains(
  bounds: { readonly x: number; readonly y: number; readonly width: number; readonly height: number },
  point: Vector2,
) {
  return (
    point.x >= bounds.x &&
    point.x <= bounds.x + bounds.width &&
    point.y >= bounds.y &&
    point.y <= bounds.y + bounds.height
  );
}

function facingForDelta(dx: number, dy: number, fallback: Facing): Facing {
  if (dx === 0 && dy === 0) return fallback;
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? "east" : "west";
  return dy >= 0 ? "south" : "north";
}

function renderActor(actor: SpatialActor): RenderActorProjection {
  return {
    id: actor.id,
    label: actor.label,
    x: actor.position.x,
    y: actor.position.y,
    facing: actor.facing,
    semanticAnimation: actor.semanticAnimation,
  };
}

export function createSpatialRuntime(initialState: CampaignLocationState): SpatialRuntime {
  const validation = validateCampaignLocationState(initialState);
  if (!validation.ok) {
    throw new Error(`Cannot create spatial runtime from invalid state: ${validation.issues.join(" ")}`);
  }

  let state = cloneValue(initialState);
  let sequence = 0;
  let lastEvent: RuntimeEvent | null = null;
  const listeners = new Set<(event: RuntimeEvent) => void>();

  function publish(event: RuntimeEvent) {
    lastEvent = immutableCopy(event) as RuntimeEvent;
    for (const listener of listeners) listener(lastEvent);
  }

  function event<T extends RuntimeEvent>(value: Omit<T, "sequence">): T {
    sequence += 1;
    return immutableCopy({ ...value, sequence }) as T;
  }

  function snapshot(): CampaignLocationState {
    return immutableCopy(state) as CampaignLocationState;
  }

  function reject(command: SpatialCommand, reason: string): CommandResult {
    const rejected = event<Extract<RuntimeEvent, { type: "command.rejected" }>>({
      type: "command.rejected",
      revision: state.committedRevision,
      commandId: command.commandId,
      reason,
    });
    publish(rejected);
    return immutableCopy({ accepted: false, event: rejected, snapshot: snapshot() }) as CommandResult;
  }

  function dispatch(command: SpatialCommand): CommandResult {
    if (command.expectedRevision !== state.committedRevision) {
      return reject(
        command,
        `Stale command expected revision ${command.expectedRevision}; current revision is ${state.committedRevision}.`,
      );
    }

    const actor = state.location.actors.find((candidate) => candidate.id === command.actorId);
    if (!actor) return reject(command, `Actor ${command.actorId} does not exist.`);

    let location = state.location;
    if (command.type === "actor.select") {
      location = {
        ...location,
        selectedActorId: actor.id,
        camera: { mode: "follow-selected", targetActorId: actor.id },
      };
    } else {
      const destinationArea = location.areas.find((area) => contains(area.bounds, command.destination));
      if (!destinationArea || !Number.isFinite(command.destination.x) || !Number.isFinite(command.destination.y)) {
        return reject(command, "Move destination is outside authored Location geometry.");
      }
      if (destinationArea.id !== actor.areaId) {
        return reject(command, "The tracer accepts movement only inside the actor's current authored Area.");
      }

      location = {
        ...location,
        selectedActorId: actor.id,
        camera: { mode: "follow-selected", targetActorId: actor.id },
        actors: location.actors.map((candidate) =>
          candidate.id === actor.id
            ? {
                ...candidate,
                facing: facingForDelta(
                  command.destination.x - candidate.position.x,
                  command.destination.y - candidate.position.y,
                  candidate.facing,
                ),
                semanticAnimation: "walk",
                animationStartedAtFrame: state.frame,
                moveTarget: cloneValue(command.destination),
              }
            : candidate,
        ),
      };
    }

    state = {
      ...state,
      committedRevision: state.committedRevision + 1,
      location,
    };

    const committed = event<Extract<RuntimeEvent, { type: "command.committed" }>>({
      type: "command.committed",
      revision: state.committedRevision,
      commandId: command.commandId,
      commandType: command.type,
    });
    publish(committed);
    return immutableCopy({ accepted: true, event: committed, snapshot: snapshot() }) as CommandResult;
  }

  function step(deltaMs: number): CampaignLocationState {
    if (!Number.isFinite(deltaMs) || deltaMs <= 0 || deltaMs > 1_000) {
      throw new Error("Frame deltaMs must be greater than zero and no more than 1000.");
    }

    const nextFrame = state.frame + 1;
    const actors = state.location.actors.map((actor): SpatialActor => {
      if (!actor.moveTarget) return actor;

      const dx = actor.moveTarget.x - actor.position.x;
      const dy = actor.moveTarget.y - actor.position.y;
      const distance = Math.hypot(dx, dy);
      const travel = actor.moveSpeedUnitsPerSecond * (deltaMs / 1_000);
      const arrived = distance <= travel;
      const scale = distance === 0 ? 0 : Math.min(1, travel / distance);
      const position = arrived
        ? cloneValue(actor.moveTarget)
        : { x: actor.position.x + dx * scale, y: actor.position.y + dy * scale };

      return {
        ...actor,
        position,
        facing: facingForDelta(dx, dy, actor.facing),
        semanticAnimation: arrived ? "idle" : "walk",
        animationStartedAtFrame:
          arrived && actor.semanticAnimation !== "idle" ? nextFrame : actor.animationStartedAtFrame,
        moveTarget: arrived ? null : actor.moveTarget,
      };
    });

    state = {
      ...state,
      frame: nextFrame,
      committedRevision: state.committedRevision + 1,
      location: { ...state.location, actors },
    };

    const committed = event<Extract<RuntimeEvent, { type: "frame.committed" }>>({
      type: "frame.committed",
      revision: state.committedRevision,
      frame: state.frame,
      deltaMs,
    });
    publish(committed);
    return snapshot();
  }

  function checkpoint(): string {
    state = { ...state, lastDurableRevision: state.committedRevision };
    const encoded = encodeCampaignLocation(state);
    const committed = event<Extract<RuntimeEvent, { type: "checkpoint.committed" }>>({
      type: "checkpoint.committed",
      revision: state.committedRevision,
      durableRevision: state.lastDurableRevision,
    });
    publish(committed);
    return encoded;
  }

  function getRenderProjection(): RenderProjection {
    return immutableCopy({
      revision: state.committedRevision,
      frame: state.frame,
      locationId: state.location.id,
      areas: state.location.areas.map((area) => ({
        id: area.id,
        label: area.label,
        bounds: cloneValue(area.bounds),
      })),
      doors: state.location.joins.map((join) => ({
        id: join.id,
        x: join.position.x,
        y: join.position.y,
      })),
      actors: state.location.actors.map(renderActor),
      interactables: state.location.objects.map((object) => ({
        id: object.id,
        label: object.label,
        x: object.position.x,
        y: object.position.y,
      })),
      hazards: state.location.hazards.map((hazard) => ({
        id: hazard.id,
        label: hazard.label,
        x: hazard.position.x,
        y: hazard.position.y,
        active: hazard.active,
      })),
      objectives: state.location.objectives.map((objective) => ({
        id: objective.id,
        label: objective.label,
        x: objective.position.x,
        y: objective.position.y,
        active: objective.status === "active",
      })),
    }) as RenderProjection;
  }

  function getShellProjection(): ShellProjection {
    const selected = state.location.actors.find((actor) => actor.id === state.location.selectedActorId);
    if (!selected) throw new Error("Validated runtime state lost its selected actor.");
    return immutableCopy({
      revision: state.committedRevision,
      durableRevision: state.lastDurableRevision,
      locationLabel: state.location.label,
      selectedActor: renderActor(selected),
      saveStatus:
        state.lastDurableRevision === state.committedRevision ? "durable" : "not-yet-durable",
    }) as ShellProjection;
  }

  function getDeveloperProjection(): DeveloperProjection {
    return immutableCopy({
      committedRevision: state.committedRevision,
      lastDurableRevision: state.lastDurableRevision,
      frame: state.frame,
      selectedActorId: state.location.selectedActorId,
      camera: state.location.camera,
      lastEvent,
    }) as DeveloperProjection;
  }

  return {
    dispatch,
    step,
    checkpoint,
    getSnapshot: snapshot,
    getRenderProjection,
    getShellProjection,
    getDeveloperProjection,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
