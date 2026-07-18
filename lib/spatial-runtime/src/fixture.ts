import type {
  AuthoredPosition,
  Bounds,
  CampaignLocationState,
  LocationArea,
  LocationState,
  NavigationPolygon,
  Vector2,
} from "./types.js";

export interface FixtureValidationResult {
  readonly ok: boolean;
  readonly issues: readonly string[];
}

function isFiniteVector(value: Vector2): boolean {
  return Number.isFinite(value.x) && Number.isFinite(value.y);
}

function contains(bounds: Bounds, position: Vector2): boolean {
  return (
    position.x >= bounds.x &&
    position.x <= bounds.x + bounds.width &&
    position.y >= bounds.y &&
    position.y <= bounds.y + bounds.height
  );
}

function indexById<T extends { readonly id: string }>(values: readonly T[], kind: string, issues: string[]) {
  const index = new Map<string, T>();
  for (const value of values) {
    if (!value.id) issues.push(`${kind} has an empty id.`);
    if (index.has(value.id)) issues.push(`${kind} id ${value.id} is duplicated.`);
    index.set(value.id, value);
  }
  return index;
}

function validatePosition(
  value: { readonly id: string; readonly areaId: string; readonly position: Vector2 },
  areas: Map<string, LocationArea>,
  kind: string,
  issues: string[],
) {
  const area = areas.get(value.areaId);
  if (!area) {
    issues.push(`${kind} ${value.id} references missing area ${value.areaId}.`);
    return;
  }
  if (!isFiniteVector(value.position) || !contains(area.bounds, value.position)) {
    issues.push(`${kind} ${value.id} is outside area ${value.areaId}.`);
  }
}

export function validateLocationState(location: LocationState): FixtureValidationResult {
  const issues: string[] = [];
  const areas = indexById(location.areas, "Area", issues);
  const interactionPositions = indexById(location.interactionPositions, "Interaction position", issues);

  if (location.areas.length < 1) issues.push("A Location requires at least one area.");
  if (location.navigation.length < 1) issues.push("A Location requires authored navigation geometry.");
  if (location.actors.length < 1) issues.push("A Location requires at least one actor.");

  for (const area of location.areas) {
    if (area.bounds.width <= 0 || area.bounds.height <= 0) {
      issues.push(`Area ${area.id} must have positive bounds.`);
    }
  }

  for (const join of location.joins) {
    if (!areas.has(join.fromAreaId) || !areas.has(join.toAreaId)) {
      issues.push(`Join ${join.id} references a missing area.`);
    }
    if (!isFiniteVector(join.position)) issues.push(`Join ${join.id} has an invalid position.`);
  }

  for (const polygon of location.navigation) {
    if (!areas.has(polygon.areaId)) issues.push(`Navigation polygon ${polygon.id} references a missing area.`);
    if (polygon.vertices.length < 3 || polygon.vertices.some((vertex) => !isFiniteVector(vertex))) {
      issues.push(`Navigation polygon ${polygon.id} must contain at least three finite vertices.`);
    }
  }

  const positionedEntities = [
    ...location.interactionPositions.map((value) => ({ value, kind: "Interaction position" })),
    ...location.coverPositions.map((value) => ({ value, kind: "Cover position" })),
    ...location.objects.map((value) => ({ value, kind: "Object" })),
    ...location.hazards.map((value) => ({ value, kind: "Hazard" })),
    ...location.objectives.map((value) => ({ value, kind: "Objective" })),
    ...location.actors.map((value) => ({ value, kind: "Actor" })),
  ];

  for (const { value, kind } of positionedEntities) validatePosition(value, areas, kind, issues);

  for (const object of location.objects) {
    const interaction = interactionPositions.get(object.interactionPositionId);
    if (!interaction) issues.push(`Object ${object.id} references missing interaction position ${object.interactionPositionId}.`);
  }

  const actors = indexById(location.actors, "Actor", issues);
  if (!actors.has(location.selectedActorId)) {
    issues.push(`Selected actor ${location.selectedActorId} does not exist.`);
  }
  if (!actors.has(location.camera.targetActorId)) {
    issues.push(`Camera target ${location.camera.targetActorId} does not exist.`);
  }

  return { ok: issues.length === 0, issues };
}

export function validateCampaignLocationState(state: CampaignLocationState): FixtureValidationResult {
  const issues = [...validateLocationState(state.location).issues];
  if (state.activeLocationId !== state.location.id) {
    issues.push("Campaign activeLocationId must reference the embedded Location.");
  }
  if (!Number.isInteger(state.committedRevision) || state.committedRevision < 0) {
    issues.push("committedRevision must be a non-negative integer.");
  }
  if (
    !Number.isInteger(state.lastDurableRevision) ||
    state.lastDurableRevision < 0 ||
    state.lastDurableRevision > state.committedRevision
  ) {
    issues.push("lastDurableRevision must be between zero and committedRevision.");
  }
  if (!Number.isInteger(state.frame) || state.frame < 0) issues.push("frame must be a non-negative integer.");
  return { ok: issues.length === 0, issues };
}

const areas: readonly LocationArea[] = [
  { id: "entry-bay", label: "Entry Bay", bounds: { x: 0, y: 0, width: 12, height: 10 } },
  { id: "service-spine", label: "Service Spine", bounds: { x: 12, y: 2, width: 12, height: 6 } },
  { id: "relay-room", label: "Relay Room", bounds: { x: 24, y: 0, width: 12, height: 10 } },
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
        { id: "entry-to-spine", fromAreaId: "entry-bay", toAreaId: "service-spine", position: { x: 12, y: 5 } },
        { id: "spine-to-relay", fromAreaId: "service-spine", toAreaId: "relay-room", position: { x: 24, y: 5 } },
      ],
      navigation: areas.map((area, index) => rectanglePolygon(`nav-${index + 1}`, area)),
      interactionPositions,
      coverPositions: [{ id: "relay-cover", areaId: "relay-room", position: { x: 27, y: 7 } }],
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
        { id: "live-conduit", label: "Live Conduit", areaId: "service-spine", position: { x: 18, y: 3 }, active: true },
      ],
      objectives: [
        { id: "reach-relay", label: "Reach the relay", areaId: "relay-room", position: { x: 32, y: 5 }, status: "active" },
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
      camera: { mode: "follow-selected", targetActorId: "field-lead" },
    },
  };
}
