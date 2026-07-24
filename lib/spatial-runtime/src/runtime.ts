import { encodeCampaignLocation } from "./codec.js";
import { validateCampaignLocationState } from "./fixture.js";
import { cloneValue, immutableCopy } from "./immutable.js";
import {
  pointInPolygon,
  segmentIntersectsPolygon,
  segmentStaysInPolygon,
} from "./geometry.js";
import {
  isAuthoredPolygonGraph,
  planAuthoredPolygonGraphRoute,
} from "./navigation.js";
import {
  projectPlayerCharacterDraft,
  validatePlayerCharacterCreation,
} from "./playerCharacterDraft.js";
import type {
  CampaignLocationState,
  CommandResult,
  DeveloperProjection,
  Direction,
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
  bounds: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  },
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
  const horizontal = dx > 0 ? "east" : "west";
  const vertical = dy > 0 ? "south" : "north";
  if (Math.abs(dx) < 0.000001) return vertical;
  if (Math.abs(dy) < 0.000001) return horizontal;
  return `${vertical}-${horizontal}` as Facing;
}

function directionVector(direction: Direction): Vector2 {
  const vectors: Readonly<Record<Direction, Vector2>> = {
    north: { x: 0, y: -1 },
    "north-east": { x: 1, y: -1 },
    east: { x: 1, y: 0 },
    "south-east": { x: 1, y: 1 },
    south: { x: 0, y: 1 },
    "south-west": { x: -1, y: 1 },
    west: { x: -1, y: 0 },
    "north-west": { x: -1, y: -1 },
  };
  const value = vectors[direction];
  const length = Math.hypot(value.x, value.y);
  return { x: value.x / length, y: value.y / length };
}

function normalizedVector(from: Vector2, to: Vector2): Vector2 | null {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  return length === 0 ? null : { x: dx / length, y: dy / length };
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

export function createSpatialRuntime(
  initialState: CampaignLocationState,
): SpatialRuntime {
  const validation = validateCampaignLocationState(initialState);
  if (!validation.ok)
    throw new Error(
      `Cannot create spatial runtime from invalid state: ${validation.issues.join(" ")}`,
    );
  let state = cloneValue(initialState);
  let sequence = 0;
  let lastEvent: RuntimeEvent | null = null;
  const listeners = new Set<(event: RuntimeEvent) => void>();
  const snapshot = () => immutableCopy(state) as CampaignLocationState;
  const event = <T extends RuntimeEvent>(value: Omit<T, "sequence">): T =>
    immutableCopy({ ...value, sequence: ++sequence }) as T;
  const publish = (value: RuntimeEvent) => {
    lastEvent = immutableCopy(value) as RuntimeEvent;
    for (const listener of listeners) listener(lastEvent);
  };
  const reject = (command: SpatialCommand, reason: string): CommandResult => {
    const rejected = event<Extract<RuntimeEvent, { type: "command.rejected" }>>(
      {
        type: "command.rejected",
        revision: state.committedRevision,
        commandId: command.commandId,
        reason,
      },
    );
    publish(rejected);
    return immutableCopy({
      accepted: false,
      event: rejected,
      snapshot: snapshot(),
    }) as CommandResult;
  };
  const areaFor = (position: Vector2, fallback: string) =>
    state.location.areas.find(
      (area) => contains(area.bounds, position) && area.id !== fallback,
    )?.id ??
    state.location.areas.find((area) => contains(area.bounds, position))?.id ??
    fallback;
  const blockingSolidAt = (position: Vector2, areaId: string) =>
    state.location.blueprint?.solids.find(
      (solid) =>
        solid.areaId === areaId && pointInPolygon(position, solid.vertices),
    );
  const pathIntersectsSolid = (path: readonly Vector2[]) => {
    const solids = state.location.blueprint?.solids ?? [];
    for (let index = 1; index < path.length; index += 1) {
      if (
        solids.some((solid) =>
          segmentIntersectsPolygon(
            path[index - 1]!,
            path[index]!,
            solid.vertices,
          ),
        )
      ) {
        return true;
      }
    }
    return false;
  };
  const pathStaysInNavigableGeometry = (path: readonly Vector2[]) => {
    const navigation = state.location.navigation;
    if (!("authority" in navigation)) return true;
    return path.every(
      (point, index) =>
        index === 0 ||
        navigation.polygons.some((polygon) =>
          segmentStaysInPolygon(path[index - 1]!, point, polygon.vertices),
        ),
    );
  };
  const startMovement = (
    actor: SpatialActor,
    destination: Vector2,
    destinationAreaId: string,
    interactionTargetId: string | null,
  ): SpatialActor | null => {
    let path: readonly Vector2[];
    if (isAuthoredPolygonGraph(state.location)) {
      const directPath = [actor.position, destination] as const;
      const sharesNavigablePolygon = state.location.navigation.polygons.some(
        (polygon) =>
          polygon.areaId === actor.areaId &&
          polygon.areaId === destinationAreaId &&
          segmentStaysInPolygon(
            actor.position,
            destination,
            polygon.vertices,
          ),
      );
      path =
        sharesNavigablePolygon && !pathIntersectsSolid(directPath)
          ? directPath
          : (planAuthoredPolygonGraphRoute(
              state.location.navigation,
              actor.position,
              actor.areaId,
              destination,
              destinationAreaId,
            ) ?? []);
      if (path.length < 2) return null;
    } else {
      if (actor.areaId !== destinationAreaId) return null;
      path = [actor.position, destination];
    }
    if (pathIntersectsSolid(path) || !pathStaysInNavigableGeometry(path))
      return null;
    const remaining = path.slice(1);
    return {
      ...actor,
      facing: facingForDelta(
        remaining[0]!.x - actor.position.x,
        remaining[0]!.y - actor.position.y,
        actor.facing,
      ),
      semanticAnimation: "walk",
      animationStartedAtFrame: state.frame,
      moveTarget: cloneValue(remaining[0]!),
      movement: { path: cloneValue(remaining), interactionTargetId },
    };
  };
  const finalApproach = (
    actor: SpatialActor,
    movingActor: SpatialActor,
    destination: Vector2,
  ): Vector2 => {
    const path = movingActor.movement?.path ?? [];
    const previous = path.length > 1 ? path[path.length - 2]! : actor.position;
    return (
      normalizedVector(previous, destination) ??
      normalizedVector(actor.position, destination) ?? { x: 1, y: 0 }
    );
  };
  const followerDestination = (
    leaderDestination: Vector2,
    approach: Vector2,
    index: number,
  ): Vector2 => {
    const perpendicular = { x: -approach.y, y: approach.x };
    const side = index === 0 ? -1 : 1;
    return {
      x: leaderDestination.x - approach.x * 2 + perpendicular.x * side,
      y: leaderDestination.y - approach.y * 2 + perpendicular.y * side,
    };
  };
  const holdAtCommittedPosition = (actor: SpatialActor): SpatialActor => ({
    ...actor,
    semanticAnimation: "idle",
    animationStartedAtFrame:
      actor.semanticAnimation === "idle"
        ? actor.animationStartedAtFrame
        : state.frame,
    moveTarget: null,
    movement: null,
  });

  function dispatch(command: SpatialCommand): CommandResult {
    if (command.expectedRevision !== state.committedRevision)
      return reject(
        command,
        `Stale command expected revision ${command.expectedRevision}; current revision is ${state.committedRevision}.`,
      );
    if (
      state.campaignPhase === "draft-only" &&
      command.type !== "player-character.create-draft"
    )
      return reject(
        command,
        "Spatial play is unavailable while the campaign remains draft-only.",
      );
    let location = state.location;
    if (command.type === "player-character.create-draft") {
      const config = state.playerCharacterCreation;
      if (!config)
        return reject(
          command,
          "Campaign does not expose Character Creation configuration.",
        );
      const validation = validatePlayerCharacterCreation(config, command.draft);
      if (!validation.ok)
        return reject(command, validation.issues.join(" "));
      state = {
        ...state,
        committedRevision: state.committedRevision + 1,
        playerCharacterDraft: cloneValue(command.draft),
      };
    } else {
      const actor = state.location.actors.find(
        (candidate) => candidate.id === command.actorId,
      );
      if (!actor)
        return reject(command, `Actor ${command.actorId} does not exist.`);
      if (command.type === "actor.select") {
      location = {
        ...location,
        selectedActorId: actor.id,
        camera: { ...location.camera, targetActorId: actor.id },
      };
      } else {
      let destination: Vector2;
      let destinationAreaId: string;
      let interactionTargetId: string | null = null;
      if (command.type === "actor.move") {
        destination = command.destination;
        const area = location.areas.find((candidate) =>
          contains(candidate.bounds, destination),
        );
        if (
          !area ||
          !Number.isFinite(destination.x) ||
          !Number.isFinite(destination.y)
        )
          return reject(
            command,
            "Move destination is outside authored Location geometry.",
          );
        destinationAreaId = area.id;
      } else if (command.type === "actor.move-direction") {
        if (!Number.isFinite(command.distance) || command.distance <= 0)
          return reject(
            command,
            "Movement distance must be a positive finite number.",
          );
        const vector = directionVector(command.direction);
        destination = {
          x: actor.position.x + vector.x * command.distance,
          y: actor.position.y + vector.y * command.distance,
        };
        const area = location.areas.find((candidate) =>
          contains(candidate.bounds, destination),
        );
        if (!area)
          return reject(
            command,
            "Movement direction leaves authored Location geometry.",
          );
        destinationAreaId = area.id;
      } else {
        const object = location.objects.find(
          (candidate) => candidate.id === command.objectId,
        );
        if (!object)
          return reject(command, `Object ${command.objectId} does not exist.`);
        const interaction = location.interactionPositions.find(
          (candidate) => candidate.id === object.interactionPositionId,
        );
        if (!interaction)
          return reject(
            command,
            `Object ${object.id} has no authored Interaction Position.`,
          );
        destination = interaction.position;
        destinationAreaId = interaction.areaId;
        interactionTargetId = object.id;
      }
      if (
        isAuthoredPolygonGraph(location) &&
        !location.navigation.polygons.some(
          (polygon) =>
            polygon.areaId === destinationAreaId &&
            pointInPolygon(destination, polygon.vertices),
        )
      ) {
        return reject(
          command,
          "Move destination is outside authored navigable polygon geometry.",
        );
      }
      const blockingSolid = blockingSolidAt(destination, destinationAreaId);
      if (blockingSolid) {
        return reject(
          command,
          `Move destination is inside authored solid geometry ${blockingSolid.id}.`,
        );
      }
      if (
        !isAuthoredPolygonGraph(location) &&
        actor.areaId !== destinationAreaId
      ) {
        return reject(
          command,
          "The tracer accepts movement only inside the actor's current authored Area.",
        );
      }
      const movingActor = startMovement(
        actor,
        destination,
        destinationAreaId,
        interactionTargetId,
      );
      if (!movingActor)
        return reject(
          command,
          "No authored polygon-graph route reaches that destination from the actor's committed position.",
        );
      const actors = location.actors.map((candidate) =>
        candidate.id === actor.id ? movingActor : candidate,
      );
      if (
        actor.partyRole === "player-character" &&
        isAuthoredPolygonGraph(location)
      ) {
        const approach = finalApproach(actor, movingActor, destination);
        let followerIndex = 0;
        for (const follower of location.actors.filter(
          (candidate) => candidate.partyRole === "follower",
        )) {
          const targetIndex = actors.findIndex(
            (candidate) => candidate.id === follower.id,
          );
          const target = followerDestination(
            destination,
            approach,
            followerIndex++,
          );
          const followerArea = location.areas.find((candidate) =>
            contains(candidate.bounds, target),
          );
          if (
            !followerArea ||
            blockingSolidAt(target, followerArea.id) ||
            !location.navigation.polygons.some(
              (polygon) =>
                polygon.areaId === followerArea.id &&
                pointInPolygon(target, polygon.vertices),
            )
          ) {
            actors[targetIndex] = holdAtCommittedPosition(follower);
            continue;
          }
          const started = startMovement(
            follower,
            target,
            followerArea.id,
            null,
          );
          if (!started) {
            actors[targetIndex] = holdAtCommittedPosition(follower);
            continue;
          }
          actors[targetIndex] = started;
        }
      }
      location = {
        ...location,
        selectedActorId: actor.id,
        camera: { ...location.camera, targetActorId: actor.id },
        actors,
      };
      }
      state = {
        ...state,
        committedRevision: state.committedRevision + 1,
        location,
      };
    }
    const committed = event<
      Extract<RuntimeEvent, { type: "command.committed" }>
    >({
      type: "command.committed",
      revision: state.committedRevision,
      commandId: command.commandId,
      commandType: command.type,
    });
    publish(committed);
    return immutableCopy({
      accepted: true,
      event: committed,
      snapshot: snapshot(),
    }) as CommandResult;
  }

  function advanceActor(
    actor: SpatialActor,
    deltaMs: number,
    nextFrame: number,
  ): SpatialActor {
    if (!actor.moveTarget || !actor.movement) return actor;
    let position = actor.position;
    let remainingTravel = actor.moveSpeedUnitsPerSecond * (deltaMs / 1_000);
    let path = [...actor.movement.path];
    let facing = actor.facing;
    while (path[0] && remainingTravel > 0) {
      const target = path[0];
      const dx = target.x - position.x;
      const dy = target.y - position.y;
      const distance = Math.hypot(dx, dy);
      facing = facingForDelta(dx, dy, facing);
      if (distance > remainingTravel) {
        position = {
          x: position.x + (dx * remainingTravel) / distance,
          y: position.y + (dy * remainingTravel) / distance,
        };
        remainingTravel = 0;
        break;
      }
      position = cloneValue(target);
      remainingTravel -= distance;
      path.shift();
    }
    const arrived = path.length === 0;
    if (arrived && actor.movement.interactionTargetId) {
      const target = state.location.objects.find(
        (object) => object.id === actor.movement?.interactionTargetId,
      );
      if (target)
        facing = facingForDelta(
          target.position.x - position.x,
          target.position.y - position.y,
          facing,
        );
    }
    return {
      ...actor,
      position,
      areaId: areaFor(position, actor.areaId),
      facing,
      semanticAnimation: arrived ? "idle" : "walk",
      animationStartedAtFrame:
        arrived && actor.semanticAnimation !== "idle"
          ? nextFrame
          : actor.animationStartedAtFrame,
      moveTarget: arrived ? null : cloneValue(path[0]!),
      movement: arrived ? null : { ...actor.movement, path: cloneValue(path) },
    };
  }

  function step(deltaMs: number): CampaignLocationState {
    if (state.campaignPhase === "draft-only")
      throw new Error(
        "Spatial frames cannot advance while the campaign remains draft-only.",
      );
    if (!Number.isFinite(deltaMs) || deltaMs <= 0 || deltaMs > 1_000)
      throw new Error(
        "Frame deltaMs must be greater than zero and no more than 1000.",
      );
    const nextFrame = state.frame + 1;
    const actors = state.location.actors.map((actor) =>
      advanceActor(actor, deltaMs, nextFrame),
    );
    state = {
      ...state,
      frame: nextFrame,
      committedRevision: state.committedRevision + 1,
      location: { ...state.location, actors },
    };
    const committed = event<Extract<RuntimeEvent, { type: "frame.committed" }>>(
      {
        type: "frame.committed",
        revision: state.committedRevision,
        frame: state.frame,
        deltaMs,
      },
    );
    publish(committed);
    return snapshot();
  }

  const checkpoint = () => {
    state = { ...state, lastDurableRevision: state.committedRevision };
    const encoded = encodeCampaignLocation(state);
    const committed = event<
      Extract<RuntimeEvent, { type: "checkpoint.committed" }>
    >({
      type: "checkpoint.committed",
      revision: state.committedRevision,
      durableRevision: state.lastDurableRevision,
    });
    publish(committed);
    return encoded;
  };
  const getRenderProjection = (): RenderProjection =>
    immutableCopy({
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
      camera: state.location.camera,
    }) as RenderProjection;
  const getShellProjection = (): ShellProjection => {
    const selected = state.location.actors.find(
      (actor) => actor.id === state.location.selectedActorId,
    );
    if (!selected)
      throw new Error("Validated runtime state lost its selected actor.");
    return immutableCopy({
      revision: state.committedRevision,
      durableRevision: state.lastDurableRevision,
      locationLabel: state.location.label,
      selectedActor: renderActor(selected),
      actors: state.location.actors.map(renderActor),
      camera: state.location.camera,
      saveStatus:
        state.lastDurableRevision === state.committedRevision
          ? "durable"
          : "not-yet-durable",
      campaignPhase: state.campaignPhase ?? "active",
      playerCharacterCreation: state.playerCharacterCreation ?? null,
      playerCharacterDraft: state.playerCharacterCreation
        ? projectPlayerCharacterDraft(
            state.playerCharacterCreation,
            state.playerCharacterDraft,
          )
        : null,
    }) as ShellProjection;
  };
  const getDeveloperProjection = (): DeveloperProjection =>
    immutableCopy({
      committedRevision: state.committedRevision,
      lastDurableRevision: state.lastDurableRevision,
      frame: state.frame,
      selectedActorId: state.location.selectedActorId,
      camera: state.location.camera,
      lastEvent,
      playerCharacterDraft: state.playerCharacterDraft ?? null,
    }) as DeveloperProjection;
  return {
    dispatch,
    step,
    checkpoint,
    hasActiveMovement: () =>
      state.campaignPhase !== "draft-only" &&
      state.location.actors.some((actor) => actor.moveTarget !== null),
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
