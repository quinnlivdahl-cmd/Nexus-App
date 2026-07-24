import type {
  AuthoredPosition,
  Bounds,
  CampaignLocationState,
  AuthoredPolygonGraph,
  LocationArea,
  LocationState,
  NavigationPolygon,
  Vector2,
} from "./types.js";
import { pointInPolygon, segmentIntersectsPolygon } from "./geometry.js";
import { validatePlayerCharacterCreation } from "./playerCharacterDraft.js";

export interface FixtureValidationResult {
  readonly ok: boolean;
  readonly issues: readonly string[];
}

function isFiniteVector(value: Vector2): boolean {
  return Number.isFinite(value.x) && Number.isFinite(value.y);
}

function polygonArea(vertices: readonly Vector2[]): number {
  let doubledArea = 0;
  for (let index = 0; index < vertices.length; index += 1) {
    const current = vertices[index]!;
    const next = vertices[(index + 1) % vertices.length]!;
    doubledArea += current.x * next.y - next.x * current.y;
  }
  return Math.abs(doubledArea) / 2;
}

function isAuthoredPolygonGraph(
  value: LocationState["navigation"],
): value is AuthoredPolygonGraph {
  return (
    !Array.isArray(value) &&
    (value as AuthoredPolygonGraph).authority === "authored-polygon-graph"
  );
}

function contains(bounds: Bounds, position: Vector2): boolean {
  return (
    position.x >= bounds.x &&
    position.x <= bounds.x + bounds.width &&
    position.y >= bounds.y &&
    position.y <= bounds.y + bounds.height
  );
}

function indexById<T extends { readonly id: string }>(
  values: readonly T[],
  kind: string,
  issues: string[],
) {
  const index = new Map<string, T>();
  for (const value of values) {
    if (!value.id) issues.push(`${kind} has an empty id.`);
    if (index.has(value.id))
      issues.push(`${kind} id ${value.id} is duplicated.`);
    index.set(value.id, value);
  }
  return index;
}

function validatePosition(
  value: {
    readonly id: string;
    readonly areaId: string;
    readonly position: Vector2;
  },
  areas: Map<string, LocationArea>,
  kind: string,
  issues: string[],
) {
  const area = areas.get(value.areaId);
  if (!area) {
    issues.push(`${kind} ${value.id} references missing area ${value.areaId}.`);
    return;
  }
  if (
    !isFiniteVector(value.position) ||
    !contains(area.bounds, value.position)
  ) {
    issues.push(`${kind} ${value.id} is outside area ${value.areaId}.`);
  }
}

export function validateLocationState(
  location: LocationState,
): FixtureValidationResult {
  const issues: string[] = [];
  const areas = indexById(location.areas, "Area", issues);
  const interactionPositions = indexById(
    location.interactionPositions,
    "Interaction position",
    issues,
  );

  if (location.areas.length < 1)
    issues.push("A Location requires at least one area.");
  const navigationPolygons: readonly NavigationPolygon[] =
    isAuthoredPolygonGraph(location.navigation)
      ? location.navigation.polygons
      : Array.isArray(location.navigation)
        ? location.navigation
        : [];
  if (navigationPolygons.length < 1)
    issues.push("A Location requires authored navigation geometry.");
  if (location.actors.length < 1)
    issues.push("A Location requires at least one actor.");

  for (const area of location.areas) {
    if (area.bounds.width <= 0 || area.bounds.height <= 0) {
      issues.push(`Area ${area.id} must have positive bounds.`);
    }
  }

  for (const join of location.joins) {
    if (!areas.has(join.fromAreaId) || !areas.has(join.toAreaId)) {
      issues.push(`Join ${join.id} references a missing area.`);
    }
    if (!isFiniteVector(join.position))
      issues.push(`Join ${join.id} has an invalid position.`);
  }

  for (const polygon of navigationPolygons) {
    if (!areas.has(polygon.areaId))
      issues.push(
        `Navigation polygon ${polygon.id} references a missing area.`,
      );
    if (
      polygon.vertices.length < 3 ||
      polygon.vertices.some((vertex) => !isFiniteVector(vertex))
    ) {
      issues.push(
        `Navigation polygon ${polygon.id} must contain at least three finite vertices.`,
      );
    }
  }

  const positionedEntities = [
    ...location.interactionPositions.map((value) => ({
      value,
      kind: "Interaction position",
    })),
    ...location.coverPositions.map((value) => ({
      value,
      kind: "Cover position",
    })),
    ...location.objects.map((value) => ({ value, kind: "Object" })),
    ...location.hazards.map((value) => ({ value, kind: "Hazard" })),
    ...location.objectives.map((value) => ({ value, kind: "Objective" })),
    ...location.actors.map((value) => ({ value, kind: "Actor" })),
  ];

  for (const { value, kind } of positionedEntities)
    validatePosition(value, areas, kind, issues);

  for (const object of location.objects) {
    const interaction = interactionPositions.get(object.interactionPositionId);
    if (!interaction)
      issues.push(
        `Object ${object.id} references missing interaction position ${object.interactionPositionId}.`,
      );
    else if (interaction.areaId !== object.areaId)
      issues.push(
        `Object ${object.id} and its Interaction Position must share an Area.`,
      );
  }

  const actors = indexById(location.actors, "Actor", issues);
  if (!actors.has(location.selectedActorId)) {
    issues.push(`Selected actor ${location.selectedActorId} does not exist.`);
  }
  if (!actors.has(location.camera.targetActorId)) {
    issues.push(
      `Camera target ${location.camera.targetActorId} does not exist.`,
    );
  }
  if (
    location.camera.tiltDegrees !== 10 ||
    location.camera.framingScale !== 0.82
  ) {
    issues.push(
      "Camera must retain the approved 10-degree tilt and 0.82 framing scale.",
    );
  }

  if (location.fixtureVersion === 2) {
    validateTraversalAuthority(location, areas, interactionPositions, issues);
  }

  return { ok: issues.length === 0, issues };
}

function validateTraversalAuthority(
  location: LocationState,
  areas: Map<string, LocationArea>,
  interactionPositions: Map<string, AuthoredPosition>,
  issues: string[],
) {
  const blueprint = location.blueprint;
  if (!blueprint) {
    issues.push("Fixture version 2 requires a Blueprint.");
  } else {
    if (!blueprint.id)
      issues.push("Fixture version 2 requires a Blueprint id.");
    const modules = indexById(blueprint.modules, "Blueprint module", issues);
    if (blueprint.modules.length !== location.areas.length)
      issues.push("Fixture version 2 requires one module for every Area.");
    for (const area of location.areas)
      if (!blueprint.modules.some((module) => module.areaId === area.id))
        issues.push(`Blueprint lacks module for Area ${area.id}.`);
    for (const module of modules.values())
      if (!areas.has(module.areaId))
        issues.push(`Blueprint module ${module.id} references a missing Area.`);
    if (blueprint.solids.length < location.areas.length)
      issues.push(
        "Fixture version 2 requires authored solid geometry for every Area.",
      );
    for (const area of location.areas) {
      if (!blueprint.solids.some((solid) => solid.areaId === area.id)) {
        issues.push(`Blueprint lacks solid geometry for Area ${area.id}.`);
      }
    }
    for (const solid of blueprint.solids) {
      const area = areas.get(solid.areaId);
      if (
        !area ||
        solid.vertices.length < 3 ||
        polygonArea(solid.vertices) <= 0 ||
        solid.vertices.some(
          (vertex) => !isFiniteVector(vertex) || !contains(area.bounds, vertex),
        )
      ) {
        issues.push(`Solid geometry ${solid.id} is invalid.`);
      }
    }
    const coverSides = indexById(
      blueprint.coverSides,
      "Authored cover side",
      issues,
    );
    if (blueprint.coverSides.length < location.coverPositions.length)
      issues.push("Fixture version 2 requires authored cover sides.");
    const directions = new Set([
      "north",
      "north-east",
      "east",
      "south-east",
      "south",
      "south-west",
      "west",
      "north-west",
    ]);
    for (const side of coverSides.values()) {
      if (
        !location.coverPositions.some(
          (cover) => cover.id === side.coverPositionId,
        )
      )
        issues.push(
          `Cover side ${side.id} references a missing Cover Position.`,
        );
      if (!directions.has(side.direction))
        issues.push(`Cover side ${side.id} has an invalid authored direction.`);
    }
  }
  if (location.joins.length < 2)
    issues.push(
      "Fixture version 2 requires authored joins between all three Areas.",
    );
  for (const join of location.joins) {
    const fromArea = areas.get(join.fromAreaId);
    const toArea = areas.get(join.toAreaId);
    if (
      fromArea &&
      toArea &&
      (!contains(fromArea.bounds, join.position) ||
        !contains(toArea.bounds, join.position))
    )
      issues.push(`Join ${join.id} is not a portal shared by both Areas.`);
  }
  if (
    location.interactionPositions.length < 1 ||
    location.coverPositions.length < 1 ||
    location.objects.length < 1 ||
    location.hazards.length < 1 ||
    location.objectives.length < 1
  ) {
    issues.push(
      "Fixture version 2 requires Interaction Positions, Cover Positions, objects, hazards, and objectives.",
    );
  }
  const playerCharacters = location.actors.filter(
    (actor) => actor.partyRole === "player-character",
  );
  const followers = location.actors.filter(
    (actor) => actor.partyRole === "follower",
  );
  if (
    location.actors.length !== 3 ||
    playerCharacters.length !== 1 ||
    followers.length !== 2
  )
    issues.push(
      "Fixture version 2 requires one Player Character and two followers.",
    );
  if (!isAuthoredPolygonGraph(location.navigation)) {
    issues.push(
      "Fixture version 2 requires authored polygon-graph navigation; prototype grids and TacMap paths are not authority.",
    );
    return;
  }
  const graph = location.navigation;
  const blockingSolids = (blueprint?.solids ?? []).filter(
    (solid) => solid.vertices.length >= 3,
  );
  const blockingSolidAt = (areaId: string, position: Vector2) =>
    blockingSolids.find(
      (solid) =>
        solid.areaId === areaId && pointInPolygon(position, solid.vertices),
    );
  const graphNodes = indexById(graph.nodes, "Navigation graph node", issues);
  if (graph.nodes.length < 3 || graph.edges.length < 2)
    issues.push("Authored polygon graph requires nodes and edges.");
  for (const area of location.areas)
    if (!graph.polygons.some((polygon) => polygon.areaId === area.id))
      issues.push(`Authored polygon graph lacks geometry for Area ${area.id}.`);
  for (const polygon of graph.polygons) {
    const area = areas.get(polygon.areaId);
    if (
      area &&
      polygon.vertices.some((vertex) => !contains(area.bounds, vertex))
    )
      issues.push(
        `Navigation polygon ${polygon.id} extends outside Area ${area.id}.`,
      );
  }
  for (const node of graph.nodes) {
    validatePosition(node, areas, "Navigation graph node", issues);
    if (
      !graph.polygons.some(
        (polygon) =>
          polygon.areaId === node.areaId &&
          pointInPolygon(node.position, polygon.vertices),
      )
    )
      issues.push(
        `Navigation graph node ${node.id} is outside authored polygon geometry.`,
      );
    const blockingSolid = blockingSolidAt(node.areaId, node.position);
    if (blockingSolid) {
      issues.push(
        `Navigation graph node ${node.id} is inside solid geometry ${blockingSolid.id}.`,
      );
    }
  }
  for (const edge of graph.edges) {
    if (
      !graphNodes.has(edge.fromNodeId) ||
      !graphNodes.has(edge.toNodeId) ||
      edge.fromNodeId === edge.toNodeId
    )
      issues.push(`Navigation graph edge ${edge.id} is invalid.`);
    const from = graphNodes.get(edge.fromNodeId);
    const to = graphNodes.get(edge.toNodeId);
    if (
      from &&
      to &&
      from.areaId !== to.areaId &&
      !location.joins.some(
        (join) =>
          ((join.fromAreaId === from.areaId && join.toAreaId === to.areaId) ||
            (join.fromAreaId === to.areaId && join.toAreaId === from.areaId)) &&
          join.position.x === from.position.x &&
          join.position.y === from.position.y &&
          join.position.x === to.position.x &&
          join.position.y === to.position.y,
      )
    )
      issues.push(
        `Navigation graph edge ${edge.id} crosses Areas without an authored Join portal.`,
      );
    if (
      from &&
      to &&
      blockingSolids.some(
        (solid) =>
          (solid.areaId === from.areaId || solid.areaId === to.areaId) &&
          segmentIntersectsPolygon(from.position, to.position, solid.vertices),
      )
    ) {
      issues.push(
        `Navigation graph edge ${edge.id} intersects solid geometry.`,
      );
    }
  }
  if (graph.nodes.length > 0) {
    const visited = new Set<string>();
    const pending = [graph.nodes[0]!.id];
    while (pending.length > 0) {
      const nodeId = pending.shift()!;
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);
      for (const edge of graph.edges) {
        if (edge.fromNodeId === nodeId && !visited.has(edge.toNodeId))
          pending.push(edge.toNodeId);
        if (edge.toNodeId === nodeId && !visited.has(edge.fromNodeId))
          pending.push(edge.fromNodeId);
      }
    }
    if (visited.size !== graph.nodes.length)
      issues.push("Authored polygon graph must be connected.");
  }
  for (const position of interactionPositions.values()) {
    if (!graph.nodes.some((node) => node.areaId === position.areaId))
      issues.push(
        `Navigation graph lacks a node in Interaction Position area ${position.areaId}.`,
      );
  }
  for (const join of location.joins) {
    const blockingSolid =
      blockingSolidAt(join.fromAreaId, join.position) ??
      blockingSolidAt(join.toAreaId, join.position);
    if (blockingSolid) {
      issues.push(
        `Join ${join.id} is inside solid geometry ${blockingSolid.id}.`,
      );
    }
  }
  for (const entity of [
    ...location.interactionPositions,
    ...location.coverPositions,
    ...location.objects,
    ...location.hazards,
    ...location.objectives,
    ...location.actors,
  ]) {
    if (
      !graph.polygons.some(
        (polygon) =>
          polygon.areaId === entity.areaId &&
          pointInPolygon(entity.position, polygon.vertices),
      )
    )
      issues.push(
        `${entity.id} is outside authored navigable polygon geometry.`,
      );
    const blockingSolid = blockingSolidAt(entity.areaId, entity.position);
    if (blockingSolid) {
      issues.push(`${entity.id} is inside solid geometry ${blockingSolid.id}.`);
    }
  }
}

export function validateCampaignLocationState(
  state: CampaignLocationState,
): FixtureValidationResult {
  const issues = [...validateLocationState(state.location).issues];
  if (state.activeLocationId !== state.location.id) {
    issues.push(
      "Campaign activeLocationId must reference the embedded Location.",
    );
  }
  if (
    !Number.isInteger(state.committedRevision) ||
    state.committedRevision < 0
  ) {
    issues.push("committedRevision must be a non-negative integer.");
  }
  if (
    !Number.isInteger(state.lastDurableRevision) ||
    state.lastDurableRevision < 0 ||
    state.lastDurableRevision > state.committedRevision
  ) {
    issues.push(
      "lastDurableRevision must be between zero and committedRevision.",
    );
  }
  if (!Number.isInteger(state.frame) || state.frame < 0)
    issues.push("frame must be a non-negative integer.");
  if (state.playerCharacterCreation) {
    issues.push(
      ...validatePlayerCharacterCreation(
        state.playerCharacterCreation,
        state.playerCharacterDraft,
      ).issues,
    );
  } else if (state.playerCharacterDraft) {
    issues.push(
      "A Player Character draft requires Character Creation configuration.",
    );
  }
  return { ok: issues.length === 0, issues };
}

const areas: readonly LocationArea[] = [
  {
    id: "entry-bay",
    label: "Entry Bay",
    bounds: { x: 0, y: 0, width: 12, height: 10 },
  },
  {
    id: "service-spine",
    label: "Service Spine",
    bounds: { x: 12, y: 2, width: 12, height: 6 },
  },
  {
    id: "relay-room",
    label: "Relay Room",
    bounds: { x: 24, y: 0, width: 12, height: 10 },
  },
];

function rectanglePolygon(id: string, area: LocationArea): NavigationPolygon {
  const { x, y, width, height } = area.bounds;
  return {
    id,
    areaId: area.id,
    vertices: [
      { x, y },
      { x: x + width, y },
      { x: x + width, y: y + height },
      { x, y: y + height },
    ],
  };
}

const interactionPositions: readonly AuthoredPosition[] = [
  { id: "relay-console-use", areaId: "relay-room", position: { x: 29, y: 5 } },
];

/**
 * Noncanonical deterministic fixture created for ticket #107. Its identifiers are
 * test-facing implementation data, not promoted Nexus source content.
 */
export function createTracerFixtureState(): CampaignLocationState {
  return {
    campaignId: "campaign-tracer-107",
    activeLocationId: "location-tracer-derelict",
    committedRevision: 0,
    lastDurableRevision: 0,
    frame: 0,
    location: {
      id: "location-tracer-derelict",
      fixtureVersion: 1,
      label: "Spatial Runtime Tracer",
      areas,
      joins: [
        {
          id: "entry-to-spine",
          fromAreaId: "entry-bay",
          toAreaId: "service-spine",
          position: { x: 12, y: 5 },
        },
        {
          id: "spine-to-relay",
          fromAreaId: "service-spine",
          toAreaId: "relay-room",
          position: { x: 24, y: 5 },
        },
      ],
      navigation: areas.map((area, index) =>
        rectanglePolygon(`nav-${index + 1}`, area),
      ),
      interactionPositions,
      coverPositions: [
        { id: "relay-cover", areaId: "relay-room", position: { x: 27, y: 7 } },
      ],
      objects: [
        {
          id: "relay-console",
          label: "Relay Console",
          areaId: "relay-room",
          position: { x: 30, y: 5 },
          interactionPositionId: "relay-console-use",
        },
      ],
      hazards: [
        {
          id: "live-conduit",
          label: "Live Conduit",
          areaId: "service-spine",
          position: { x: 18, y: 3 },
          active: true,
        },
      ],
      objectives: [
        {
          id: "reach-relay",
          label: "Reach the relay",
          areaId: "relay-room",
          position: { x: 32, y: 5 },
          status: "active",
        },
      ],
      actors: [
        {
          id: "field-lead",
          label: "Field Lead",
          areaId: "entry-bay",
          position: { x: 4, y: 5 },
          facing: "east",
          semanticAnimation: "idle",
          animationStartedAtFrame: 0,
          moveSpeedUnitsPerSecond: 8,
          moveTarget: null,
        },
      ],
      selectedActorId: "field-lead",
      camera: {
        mode: "follow-selected",
        targetActorId: "field-lead",
        tiltDegrees: 10,
        framingScale: 0.82,
      },
    },
  };
}

const traversalAreas: readonly LocationArea[] = [
  {
    id: "sealed-corridor",
    label: "Sealed Corridor",
    bounds: { x: 0, y: 0, width: 12, height: 10 },
  },
  {
    id: "open-cover-bay",
    label: "Open Cover Bay",
    bounds: { x: 12, y: 0, width: 12, height: 10 },
  },
  {
    id: "cluttered-side-area",
    label: "Cluttered Side Area",
    bounds: { x: 24, y: 0, width: 12, height: 10 },
  },
];

/**
 * The opaque room-shell art is part of the presentation contract, but Area
 * bounds continue to describe the full module extent. Navigation instead owns
 * the playable floor: the visible shell opening, clear of the selected actor's
 * full visible sprite footprint. Door throats are the sole intentional
 * exception at joins.
 */
export const ROOM_SHELL_VISIBLE_INNER_FACE_INSET = 0.72;
/** Non-authoritative selection-ring geometry, retained only for presentation. */
export const ACTOR_SELECTION_FOOTPRINT = Object.freeze({
  offsetY: 0.68,
  radiusX: 0.82,
  radiusY: 0.35,
});
/** Full drawActor sprite silhouette; this is the collision authority. */
export const ACTOR_VISUAL_COLLISION_FOOTPRINT = Object.freeze({
  width: 1.7,
  height: 2.75,
  bottomOffset: 1.18,
  horizontalClearance: 0.85,
  topClearance: 1.57,
  bottomClearance: 1.18,
});
export const TRAVERSAL_DOOR_THROAT = Object.freeze({
  visualHalfHeight: 2.175,
  top: 5 - 2.175 + ACTOR_VISUAL_COLLISION_FOOTPRINT.topClearance,
  bottom: 5 + 2.175 - ACTOR_VISUAL_COLLISION_FOOTPRINT.bottomClearance,
});

const traversalFloor = Object.freeze({
  left:
    ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
    ACTOR_VISUAL_COLLISION_FOOTPRINT.horizontalClearance,
  right:
    ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
    ACTOR_VISUAL_COLLISION_FOOTPRINT.horizontalClearance,
  top:
    ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
    ACTOR_VISUAL_COLLISION_FOOTPRINT.topClearance,
  bottom:
    ROOM_SHELL_VISIBLE_INNER_FACE_INSET +
    ACTOR_VISUAL_COLLISION_FOOTPRINT.bottomClearance,
});

function traversalPolygon(
  id: string,
  area: LocationArea,
  doorSides: readonly ("left" | "right")[],
): NavigationPolygon {
  const left = area.bounds.x + traversalFloor.left;
  const right = area.bounds.x + area.bounds.width - traversalFloor.right;
  const top = area.bounds.y + traversalFloor.top;
  const bottom = area.bounds.y + area.bounds.height - traversalFloor.bottom;
  const doorTop = area.bounds.y + TRAVERSAL_DOOR_THROAT.top;
  const doorBottom = area.bounds.y + TRAVERSAL_DOOR_THROAT.bottom;
  const hasLeftDoor = doorSides.includes("left");
  const hasRightDoor = doorSides.includes("right");
  const outerLeft = area.bounds.x;
  const outerRight = area.bounds.x + area.bounds.width;

  return {
    id,
    areaId: area.id,
    vertices: [
      { x: left, y: top },
      { x: right, y: top },
      ...(hasRightDoor
        ? [
            { x: right, y: doorTop },
            { x: outerRight, y: doorTop },
            { x: outerRight, y: doorBottom },
            { x: right, y: doorBottom },
          ]
        : []),
      { x: right, y: bottom },
      { x: left, y: bottom },
      ...(hasLeftDoor
        ? [
            { x: left, y: doorBottom },
            { x: outerLeft, y: doorBottom },
            { x: outerLeft, y: doorTop },
            { x: left, y: doorTop },
          ]
        : []),
    ],
  };
}

const traversalNavigation: AuthoredPolygonGraph = {
  authority: "authored-polygon-graph",
  polygons: [
    traversalPolygon("traversal-polygon-1", traversalAreas[0]!, ["right"]),
    traversalPolygon("traversal-polygon-2", traversalAreas[1]!, ["left", "right"]),
    traversalPolygon("traversal-polygon-3", traversalAreas[2]!, ["left"]),
  ],
  nodes: [
    {
      id: "corridor-start",
      areaId: "sealed-corridor",
      position: { x: 4, y: 5 },
    },
    {
      id: "corridor-door",
      areaId: "sealed-corridor",
      position: { x: 12, y: 5 },
    },
    { id: "cover-door", areaId: "open-cover-bay", position: { x: 12, y: 5 } },
    { id: "cover-center", areaId: "open-cover-bay", position: { x: 18, y: 5 } },
    { id: "side-door", areaId: "open-cover-bay", position: { x: 24, y: 5 } },
    {
      id: "side-entry",
      areaId: "cluttered-side-area",
      position: { x: 24, y: 5 },
    },
    {
      id: "relay-use",
      areaId: "cluttered-side-area",
      position: { x: 29, y: 5 },
    },
  ],
  edges: [
    {
      id: "corridor-to-door",
      fromNodeId: "corridor-start",
      toNodeId: "corridor-door",
    },
    { id: "first-door", fromNodeId: "corridor-door", toNodeId: "cover-door" },
    {
      id: "cover-crossing",
      fromNodeId: "cover-door",
      toNodeId: "cover-center",
    },
    { id: "cover-to-door", fromNodeId: "cover-center", toNodeId: "side-door" },
    { id: "second-door", fromNodeId: "side-door", toNodeId: "side-entry" },
    { id: "side-to-relay", fromNodeId: "side-entry", toNodeId: "relay-use" },
  ],
};

/** Noncanonical deterministic fixture for Issue #109 traversal coverage. */
export function createTraversalFixtureState(): CampaignLocationState {
  return {
    campaignId: "campaign-traversal-109",
    activeLocationId: "location-authored-three-area-derelict",
    committedRevision: 0,
    lastDurableRevision: 0,
    frame: 0,
    location: {
      id: "location-authored-three-area-derelict",
      fixtureVersion: 2,
      label: "Authored Three-Area Derelict",
      areas: traversalAreas,
      joins: [
        {
          id: "corridor-door-to-cover",
          fromAreaId: "sealed-corridor",
          toAreaId: "open-cover-bay",
          position: { x: 12, y: 5 },
        },
        {
          id: "cover-door-to-side",
          fromAreaId: "open-cover-bay",
          toAreaId: "cluttered-side-area",
          position: { x: 24, y: 5 },
        },
      ],
      blueprint: {
        id: "three-area-derelict-blueprint",
        modules: traversalAreas.map((area) => ({
          id: `${area.id}-module`,
          areaId: area.id,
        })),
        solids: [
          {
            id: "corridor-storage-obstacle",
            areaId: "sealed-corridor",
            vertices: [
              { x: 8, y: 1 },
              { x: 10, y: 1 },
              { x: 10, y: 3 },
              { x: 8, y: 3 },
            ],
          },
          {
            id: "cover-bay-low-barrier",
            areaId: "open-cover-bay",
            vertices: [
              { x: 16, y: 8 },
              { x: 20, y: 8 },
              { x: 20, y: 9.5 },
              { x: 16, y: 9.5 },
            ],
          },
          {
            id: "side-area-clutter-stack",
            areaId: "cluttered-side-area",
            vertices: [
              { x: 31, y: 1 },
              { x: 34, y: 1 },
              { x: 34, y: 3 },
              { x: 31, y: 3 },
            ],
          },
        ],
        coverSides: [
          {
            id: "open-cover-north-side",
            coverPositionId: "open-cover-north",
            direction: "north",
          },
          {
            id: "side-clutter-west-side",
            coverPositionId: "side-clutter-west",
            direction: "west",
          },
        ],
      },
      navigation: traversalNavigation,
      interactionPositions: [
        {
          id: "relay-console-use",
          areaId: "cluttered-side-area",
          position: { x: 29, y: 5 },
        },
      ],
      coverPositions: [
        {
          id: "open-cover-north",
          areaId: "open-cover-bay",
          position: { x: 18, y: 7 },
        },
        {
          id: "side-clutter-west",
          areaId: "cluttered-side-area",
          position: { x: 27, y: 3 },
        },
      ],
      objects: [
        {
          id: "relay-console",
          label: "Relay Console",
          areaId: "cluttered-side-area",
          position: { x: 30, y: 5 },
          interactionPositionId: "relay-console-use",
        },
      ],
      hazards: [
        {
          id: "exposed-cable",
          label: "Exposed Cable",
          areaId: "open-cover-bay",
          position: { x: 18, y: 3 },
          active: true,
        },
      ],
      objectives: [
        {
          id: "activate-relay",
          label: "Activate the relay",
          areaId: "cluttered-side-area",
          position: { x: 32, y: 5 },
          status: "active",
        },
      ],
      actors: [
        {
          id: "player-character",
          label: "Player Character",
          partyRole: "player-character",
          areaId: "sealed-corridor",
          position: { x: 4, y: 5 },
          facing: "east",
          semanticAnimation: "idle",
          animationStartedAtFrame: 0,
          moveSpeedUnitsPerSecond: 8,
          moveTarget: null,
          movement: null,
        },
        {
          id: "follower-one",
          label: "Follower One",
          partyRole: "follower",
          areaId: "sealed-corridor",
          position: { x: 2, y: 4 },
          facing: "east",
          semanticAnimation: "idle",
          animationStartedAtFrame: 0,
          moveSpeedUnitsPerSecond: 7,
          moveTarget: null,
          movement: null,
        },
        {
          id: "follower-two",
          label: "Follower Two",
          partyRole: "follower",
          areaId: "sealed-corridor",
          position: { x: 2, y: 6 },
          facing: "east",
          semanticAnimation: "idle",
          animationStartedAtFrame: 0,
          moveSpeedUnitsPerSecond: 6,
          moveTarget: null,
          movement: null,
        },
      ],
      selectedActorId: "player-character",
      camera: {
        mode: "follow-selected",
        targetActorId: "player-character",
        tiltDegrees: 10,
        framingScale: 0.82,
      },
    },
  };
}

/** Noncanonical deterministic fixture configuration for Issue #112. */
export function createPlayerDraftFixtureState(): CampaignLocationState {
  return {
    ...createTraversalFixtureState(),
    campaignId: "campaign-player-draft-112",
    playerCharacterCreation: {
      catalogId: "nexus.skill-tree.provisional",
      catalogVersion:
        "2026-07-16+48be6c31f0aa5d0f3353ce7faa96c2b2501e2236",
      level0AbilityAllowance: 1,
      startingLoadouts: [
        {
          id: "level-0-field-kit",
          label: "Field Kit",
          itemIds: ["fixture-item-field-tool", "fixture-item-sidearm"],
        },
      ],
    },
    playerCharacterDraft: null,
  };
}
