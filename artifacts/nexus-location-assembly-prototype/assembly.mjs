export const DISPOSABLE_WARNING =
  "DISPOSABLE PROTOTYPE — evidence for a Location assembly decision, not production code or a final schema.";

export const ACTOR_RADIUS = 17;

export const ACCEPTED_MOVEMENT_CAMERA_INPUTS = Object.freeze({
  tiltFromOverheadDegrees: 10,
  eastReadsRight: true,
  northReadsUp: true,
  movementSpeed: 190,
  normalFraming: 0.82,
  followSoftness: 3.2,
  tacticalPullback: 1.7,
  adaptiveAreaFraming: true,
  occlusionFade: "fallback-only",
});

const dockingCorridor = {
  id: "docking-corridor",
  name: "Docking Spine",
  areaId: "area-docking-spine",
  color: "#3d8aa5",
  cameraFactor: 0.88,
  focus: { x: 480, y: 80 },
  navRects: [{ id: "corridor-floor", x: 0, y: 0, w: 960, h: 160 }],
  obstacles: [
    {
      id: "corridor-debris",
      label: "Collapsed conduit",
      x: 690,
      y: 50,
      w: 78,
      h: 48,
      height: 19,
      role: "cover",
    },
  ],
  occluders: [
    { id: "north-wall", a: { x: 0, y: 0 }, b: { x: 900, y: 0 }, height: 58 },
    { id: "south-wall-west", a: { x: 0, y: 160 }, b: { x: 520, y: 160 }, height: 58 },
    { id: "south-wall-east", a: { x: 625, y: 160 }, b: { x: 900, y: 160 }, height: 58 },
    { id: "west-bulkhead", a: { x: 0, y: 0 }, b: { x: 0, y: 160 }, height: 58 },
  ],
  connections: [
    {
      id: "cargo-bulkhead",
      label: "Cargo bulkhead",
      type: "derelict.bulkhead.large",
      a: { x: 930, y: 0 },
      b: { x: 930, y: 160 },
      normal: { x: 1, y: 0 },
      clearance: 160,
    },
    {
      id: "workshop-door",
      label: "Workshop pressure door",
      type: "derelict.pressure-door.medium",
      a: { x: 520, y: 160 },
      b: { x: 625, y: 160 },
      normal: { x: 0, y: 1 },
      clearance: 105,
    },
  ],
  interactions: [
    {
      id: "pressure-door-panel",
      label: "Pressure-door panel",
      socket: { x: 858, y: 80 },
      positions: [{ id: "panel-approach", x: 808, y: 104 }],
    },
  ],
  coverPositions: [
    { id: "debris-north", obstacleId: "corridor-debris", x: 729, y: 28, arc: { centerDeg: 90, spanDeg: 100, range: 82 } },
    { id: "debris-south", obstacleId: "corridor-debris", x: 729, y: 120, arc: { centerDeg: 270, spanDeg: 100, range: 82 } },
    { id: "debris-west", obstacleId: "corridor-debris", x: 668, y: 74, arc: { centerDeg: 0, spanDeg: 100, range: 82 } },
    { id: "debris-east", obstacleId: "corridor-debris", x: 790, y: 74, arc: { centerDeg: 180, spanDeg: 100, range: 82 } },
  ],
};

const cargoBay = {
  id: "cargo-bay",
  name: "Cargo Transfer Bay",
  areaId: "area-cargo-transfer-bay",
  color: "#a96e36",
  cameraFactor: 1.18,
  focus: { x: 350, y: 330 },
  navRects: [{ id: "cargo-floor", x: 0, y: 0, w: 700, h: 660 }],
  obstacles: [
    { id: "cargo-cover-a", label: "Freight pallet A", x: 120, y: 110, w: 150, h: 82, height: 32, role: "cover" },
    { id: "cargo-cover-b", label: "Freight pallet B", x: 400, y: 325, w: 188, h: 70, height: 38, role: "cover" },
    { id: "cargo-cover-c", label: "Freight pallet C", x: 150, y: 485, w: 105, h: 98, height: 28, role: "cover" },
    { id: "bay-machine", label: "Cargo indexing rig", x: 565, y: 65, w: 72, h: 165, height: 62, role: "machine" },
    { id: "sealed-partition", label: "Sealed partition", x: 345, y: 0, w: 28, h: 205, height: 80, role: "occluder" },
  ],
  occluders: [
    { id: "north-wall", a: { x: 0, y: 0 }, b: { x: 700, y: 0 }, height: 72 },
    { id: "east-wall", a: { x: 700, y: 0 }, b: { x: 700, y: 660 }, height: 72 },
    { id: "south-wall", a: { x: 700, y: 660 }, b: { x: 0, y: 660 }, height: 72 },
    { id: "west-wall-north", a: { x: 0, y: 0 }, b: { x: 0, y: 210 }, height: 72 },
    { id: "west-wall-south", a: { x: 0, y: 370 }, b: { x: 0, y: 660 }, height: 72 },
  ],
  connections: [
    {
      id: "corridor-bulkhead",
      label: "Docking-spine bulkhead",
      type: "derelict.bulkhead.large",
      a: { x: 30, y: 370 },
      b: { x: 30, y: 210 },
      normal: { x: -1, y: 0 },
      clearance: 160,
    },
  ],
  interactions: [
    {
      id: "cargo-terminal",
      label: "Cargo registry terminal",
      socket: { x: 618, y: 570 },
      positions: [
        { id: "terminal-west", x: 535, y: 595 },
        { id: "terminal-south", x: 620, y: 610 },
      ],
    },
  ],
  coverPositions: [
    { id: "pallet-a-north", obstacleId: "cargo-cover-a", x: 195, y: 88, arc: { centerDeg: 90, spanDeg: 100, range: 92 } },
    { id: "pallet-a-south", obstacleId: "cargo-cover-a", x: 195, y: 214, arc: { centerDeg: 270, spanDeg: 100, range: 92 } },
    { id: "pallet-a-west", obstacleId: "cargo-cover-a", x: 98, y: 151, arc: { centerDeg: 0, spanDeg: 100, range: 92 } },
    { id: "pallet-a-east", obstacleId: "cargo-cover-a", x: 292, y: 151, arc: { centerDeg: 180, spanDeg: 100, range: 92 } },
    { id: "pallet-b-north", obstacleId: "cargo-cover-b", x: 494, y: 303, arc: { centerDeg: 90, spanDeg: 100, range: 102 } },
    { id: "pallet-b-south", obstacleId: "cargo-cover-b", x: 494, y: 417, arc: { centerDeg: 270, spanDeg: 100, range: 102 } },
    { id: "pallet-b-west", obstacleId: "cargo-cover-b", x: 378, y: 360, arc: { centerDeg: 0, spanDeg: 100, range: 102 } },
    { id: "pallet-b-east", obstacleId: "cargo-cover-b", x: 610, y: 360, arc: { centerDeg: 180, spanDeg: 100, range: 102 } },
    { id: "pallet-c-north", obstacleId: "cargo-cover-c", x: 202.5, y: 463, arc: { centerDeg: 90, spanDeg: 100, range: 86 } },
    { id: "pallet-c-south", obstacleId: "cargo-cover-c", x: 202.5, y: 605, arc: { centerDeg: 270, spanDeg: 100, range: 86 } },
    { id: "pallet-c-west", obstacleId: "cargo-cover-c", x: 128, y: 534, arc: { centerDeg: 0, spanDeg: 100, range: 86 } },
    { id: "pallet-c-east", obstacleId: "cargo-cover-c", x: 277, y: 534, arc: { centerDeg: 180, spanDeg: 100, range: 86 } },
  ],
};

const workshop = {
  id: "signal-workshop",
  name: "Signal Workshop",
  areaId: "area-signal-workshop",
  color: "#7f6bb3",
  cameraFactor: 1.02,
  focus: { x: 270, y: 185 },
  navRects: [
    { id: "workshop-floor", x: 0, y: 0, w: 540, h: 370 },
    { id: "door-bridge", x: 260, y: -60, w: 105, h: 80 },
  ],
  obstacles: [
    { id: "workshop-shelves", label: "Signal shelves", x: 42, y: 50, w: 118, h: 88, height: 55, role: "cover" },
    { id: "workshop-crates", label: "Parts crates", x: 352, y: 50, w: 112, h: 145, height: 35, role: "cover" },
    { id: "workshop-junk", label: "Cable nest", x: 170, y: 224, w: 95, h: 70, height: 25, role: "clutter" },
    { id: "transponder-bench-body", label: "Transponder workbench", x: 395, y: 287, w: 90, h: 46, height: 38, role: "machine" },
  ],
  occluders: [
    { id: "north-wall-west", a: { x: 0, y: 0 }, b: { x: 260, y: 0 }, height: 64 },
    { id: "north-wall-east", a: { x: 365, y: 0 }, b: { x: 540, y: 0 }, height: 64 },
    { id: "west-wall", a: { x: 0, y: 0 }, b: { x: 0, y: 370 }, height: 64 },
    { id: "south-wall", a: { x: 0, y: 370 }, b: { x: 540, y: 370 }, height: 64 },
    { id: "east-wall", a: { x: 540, y: 370 }, b: { x: 540, y: 0 }, height: 64 },
    { id: "door-west", a: { x: 260, y: -40 }, b: { x: 260, y: 0 }, height: 64 },
    { id: "door-east", a: { x: 365, y: -40 }, b: { x: 365, y: 0 }, height: 64 },
  ],
  connections: [
    {
      id: "corridor-door",
      label: "Docking-spine pressure door",
      type: "derelict.pressure-door.medium",
      a: { x: 365, y: -40 },
      b: { x: 260, y: -40 },
      normal: { x: 0, y: -1 },
      clearance: 105,
    },
  ],
  interactions: [
    {
      id: "transponder-bench",
      label: "Derelict transponder bench",
      socket: { x: 440, y: 310 },
      positions: [
        { id: "bench-west", x: 360, y: 310 },
        { id: "bench-north", x: 440, y: 240 },
      ],
    },
  ],
  coverPositions: [
    { id: "shelves-north", obstacleId: "workshop-shelves", x: 101, y: 28, arc: { centerDeg: 90, spanDeg: 100, range: 84 } },
    { id: "shelves-south", obstacleId: "workshop-shelves", x: 101, y: 160, arc: { centerDeg: 270, spanDeg: 100, range: 84 } },
    { id: "shelves-west", obstacleId: "workshop-shelves", x: 20, y: 94, arc: { centerDeg: 0, spanDeg: 100, range: 84 } },
    { id: "shelves-east", obstacleId: "workshop-shelves", x: 182, y: 94, arc: { centerDeg: 180, spanDeg: 100, range: 84 } },
    { id: "crates-north", obstacleId: "workshop-crates", x: 408, y: 28, arc: { centerDeg: 90, spanDeg: 100, range: 94 } },
    { id: "crates-south", obstacleId: "workshop-crates", x: 408, y: 217, arc: { centerDeg: 270, spanDeg: 100, range: 94 } },
    { id: "crates-west", obstacleId: "workshop-crates", x: 330, y: 122.5, arc: { centerDeg: 0, spanDeg: 100, range: 94 } },
    { id: "crates-east", obstacleId: "workshop-crates", x: 486, y: 122.5, arc: { centerDeg: 180, spanDeg: 100, range: 94 } },
  ],
};

export const MODULE_LIBRARY = Object.freeze({
  [dockingCorridor.id]: dockingCorridor,
  [cargoBay.id]: cargoBay,
  [workshop.id]: workshop,
});

export const VALID_BLUEPRINT = Object.freeze({
  id: "derelict-three-area-valid",
  name: "Representative derelict / valid assembly",
  expectedAreaCount: 3,
  placements: [
    { id: "corridor", moduleId: "docking-corridor", x: 0, y: 250, rotationDeg: 0 },
    { id: "cargo", moduleId: "cargo-bay", x: 900, y: 40, rotationDeg: 0 },
    { id: "workshop", moduleId: "signal-workshop", x: 260, y: 450, rotationDeg: 0 },
  ],
  joins: [
    {
      id: "corridor-to-cargo",
      from: { placementId: "corridor", connectionId: "cargo-bulkhead" },
      to: { placementId: "cargo", connectionId: "corridor-bulkhead" },
    },
    {
      id: "corridor-to-workshop",
      from: { placementId: "corridor", connectionId: "workshop-door" },
      to: { placementId: "workshop", connectionId: "corridor-door" },
    },
  ],
  actorStart: { x: 125, y: 330 },
  reviewRoute: [
    { id: "cargo-target", areaId: "area-cargo-transfer-bay", x: 1370, y: 610 },
    { id: "workshop-target", areaId: "area-signal-workshop", x: 620, y: 760 },
  ],
});

export const INVALID_BLUEPRINT = Object.freeze({
  ...VALID_BLUEPRINT,
  id: "derelict-three-area-invalid-offset",
  name: "Diagnostic / workshop seam offset 35 units",
  placements: VALID_BLUEPRINT.placements.map((placement) =>
    placement.id === "workshop" ? { ...placement, y: 485 } : { ...placement },
  ),
  actorStart: { x: 575, y: 350 },
  diagnosticExpectation: {
    code: "JOIN_SEAM_MISALIGNED",
    joinId: "corridor-to-workshop",
    reason: "The workshop placement is authored 35 units south of its declared pressure-door seam.",
  },
});

const EPSILON = 0.001;

export function rotatePoint(point, rotationDeg = 0) {
  const radians = (rotationDeg * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return {
    x: point.x * cosine - point.y * sine,
    y: point.x * sine + point.y * cosine,
  };
}

export function transformPoint(point, placement) {
  const rotated = rotatePoint(point, placement.rotationDeg ?? 0);
  return { x: rotated.x + placement.x, y: rotated.y + placement.y };
}

function transformRect(rect, placement) {
  const corners = [
    transformPoint({ x: rect.x, y: rect.y }, placement),
    transformPoint({ x: rect.x + rect.w, y: rect.y }, placement),
    transformPoint({ x: rect.x + rect.w, y: rect.y + rect.h }, placement),
    transformPoint({ x: rect.x, y: rect.y + rect.h }, placement),
  ];
  const xs = corners.map((point) => point.x);
  const ys = corners.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { ...rect, x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

export function pointInRect(point, rect, epsilon = EPSILON) {
  return (
    point.x >= rect.x - epsilon &&
    point.x <= rect.x + rect.w + epsilon &&
    point.y >= rect.y - epsilon &&
    point.y <= rect.y + rect.h + epsilon
  );
}

export function pointInFloorUnion(point, navRects) {
  return navRects.some((rect) => pointInRect(point, rect));
}

function circleIntersectsRect(point, radius, rect) {
  const nearestX = Math.max(rect.x, Math.min(point.x, rect.x + rect.w));
  const nearestY = Math.max(rect.y, Math.min(point.y, rect.y + rect.h));
  const dx = point.x - nearestX;
  const dy = point.y - nearestY;
  return dx * dx + dy * dy < radius * radius - EPSILON;
}

function circleInsideFloorUnion(point, radius, navRects) {
  if (!pointInFloorUnion(point, navRects)) return false;
  for (let index = 0; index < 24; index += 1) {
    const angle = (index / 24) * Math.PI * 2;
    const sample = {
      x: point.x + Math.cos(angle) * radius,
      y: point.y + Math.sin(angle) * radius,
    };
    if (!pointInFloorUnion(sample, navRects)) return false;
  }
  return true;
}

export function canOccupyRaw(point, radius, navRects, obstacles) {
  if (!circleInsideFloorUnion(point, radius, navRects)) return false;
  return !obstacles.some((obstacle) => circleIntersectsRect(point, radius, obstacle));
}

export function canOccupy(assembly, point, radius = ACTOR_RADIUS) {
  return canOccupyRaw(point, radius, assembly.navRects, assembly.obstacles);
}

function segmentAlignmentDistance(left, right) {
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const direct = Math.max(distance(left.a, right.a), distance(left.b, right.b));
  const reversed = Math.max(distance(left.a, right.b), distance(left.b, right.a));
  return Math.min(direct, reversed);
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y;
}

function mixPoint(a, b, amount) {
  return { x: a.x + (b.x - a.x) * amount, y: a.y + (b.y - a.y) * amount };
}

function distancePointToRect(point, rect) {
  const dx = Math.max(rect.x - point.x, 0, point.x - (rect.x + rect.w));
  const dy = Math.max(rect.y - point.y, 0, point.y - (rect.y + rect.h));
  return Math.hypot(dx, dy);
}

function boundsForRects(rects) {
  return {
    minX: Math.min(...rects.map((rect) => rect.x)),
    minY: Math.min(...rects.map((rect) => rect.y)),
    maxX: Math.max(...rects.map((rect) => rect.x + rect.w)),
    maxY: Math.max(...rects.map((rect) => rect.y + rect.h)),
  };
}

function validateModuleLibrary(moduleLibrary) {
  const problems = [];
  const modules = Object.values(moduleLibrary);
  const ids = new Set();
  for (const module of modules) {
    if (!module.id || ids.has(module.id)) problems.push(`Duplicate or missing module id: ${module.id ?? "<missing>"}.`);
    ids.add(module.id);
    if (!module.areaId) problems.push(`${module.id} has no Area identifier.`);
    if (!module.navRects?.length) problems.push(`${module.id} has no navigable floor geometry.`);
    for (const interaction of module.interactions ?? []) {
      if (!interaction.positions?.length) problems.push(`${module.id}:${interaction.id} has no Interaction Position.`);
    }
    for (const cover of module.coverPositions ?? []) {
      if (!module.obstacles.some((obstacle) => obstacle.id === cover.obstacleId)) {
        problems.push(`${module.id}:${cover.id} references missing obstacle ${cover.obstacleId}.`);
      }
      if (!(cover.arc?.spanDeg > 0 && cover.arc.spanDeg <= 360)) {
        problems.push(`${module.id}:${cover.id} has an invalid protected arc.`);
      }
    }
  }
  return problems;
}

function buildWorldModule(module, placement) {
  const placementFields = { placementId: placement.id, moduleId: module.id, areaId: module.areaId };
  const navRects = module.navRects.map((rect) => ({ ...transformRect(rect, placement), ...placementFields, sourceId: rect.id }));
  const obstacles = module.obstacles.map((rect) => ({ ...transformRect(rect, placement), ...placementFields, sourceId: rect.id }));
  const occluders = module.occluders.map((segment) => ({
    ...segment,
    ...placementFields,
    sourceId: segment.id,
    a: transformPoint(segment.a, placement),
    b: transformPoint(segment.b, placement),
  }));
  const connections = module.connections.map((connection) => ({
    ...connection,
    ...placementFields,
    sourceId: connection.id,
    key: `${placement.id}:${connection.id}`,
    a: transformPoint(connection.a, placement),
    b: transformPoint(connection.b, placement),
    normal: rotatePoint(connection.normal, placement.rotationDeg ?? 0),
  }));
  const interactions = module.interactions.map((interaction) => ({
    ...interaction,
    ...placementFields,
    sourceId: interaction.id,
    key: `${placement.id}:${interaction.id}`,
    socket: transformPoint(interaction.socket, placement),
    positions: interaction.positions.map((position) => ({
      ...transformPoint(position, placement),
      id: position.id,
      key: `${placement.id}:${interaction.id}:${position.id}`,
    })),
  }));
  const coverPositions = module.coverPositions.map((cover) => ({
    ...cover,
    ...placementFields,
    sourceId: cover.id,
    key: `${placement.id}:${cover.id}`,
    ...transformPoint(cover, placement),
    arc: { ...cover.arc, centerDeg: (cover.arc.centerDeg + (placement.rotationDeg ?? 0) + 360) % 360 },
  }));
  const focus = transformPoint(module.focus, placement);
  return {
    id: placement.id,
    moduleId: module.id,
    name: module.name,
    areaId: module.areaId,
    color: module.color,
    cameraFactor: module.cameraFactor,
    placement: { ...placement },
    focus,
    navRects,
    obstacles,
    occluders,
    connections,
    interactions,
    coverPositions,
  };
}

function addCheck(checks, ok, code, subject, message) {
  checks.push({ ok, code, subject, message });
}

function validateAssembly(assembly, moduleProblems, blueprintProblems) {
  const checks = [];
  addCheck(
    checks,
    moduleProblems.length === 0,
    "MODULE_DEFINITIONS_VALID",
    "module library",
    moduleProblems.length === 0
      ? `${assembly.modules.length} module definitions carry navigation, connection, interaction, occlusion, and cover metadata.`
      : moduleProblems.join(" "),
  );
  addCheck(
    checks,
    blueprintProblems.length === 0,
    "BLUEPRINT_PLACEMENTS_VALID",
    assembly.blueprint.id,
    blueprintProblems.length === 0
      ? `${assembly.modules.length} unique Blueprint placements resolved to known modules.`
      : blueprintProblems.join(" "),
  );

  const validJoinIds = new Set();
  for (const join of assembly.joins) {
    const resolved = Boolean(join.from && join.to);
    addCheck(
      checks,
      resolved,
      "JOIN_CONNECTIONS_RESOLVED",
      join.id,
      resolved ? `${join.from.key} joins ${join.to.key}.` : `A declared connection endpoint could not be resolved.`,
    );
    if (!resolved) continue;

    const compatible = join.from.type === join.to.type && Math.min(join.from.clearance, join.to.clearance) >= ACTOR_RADIUS * 2;
    addCheck(
      checks,
      compatible,
      "JOIN_TYPES_COMPATIBLE",
      join.id,
      compatible
        ? `${join.from.type} matches with ${Math.min(join.from.clearance, join.to.clearance)} units of authored clearance.`
        : `${join.from.type} / ${join.to.type} do not provide a compatible actor-width passage.`,
    );

    const normalsOppose = dot(join.from.normal, join.to.normal) < -0.99;
    addCheck(
      checks,
      normalsOppose,
      "JOIN_NORMALS_OPPOSED",
      join.id,
      normalsOppose ? `Connection normals face one another.` : `Connection normals do not face one another.`,
    );

    const seamOffset = segmentAlignmentDistance(join.from, join.to);
    join.seamOffset = seamOffset;
    const aligned = seamOffset <= 0.5;
    addCheck(
      checks,
      aligned,
      aligned ? "JOIN_SEAM_ALIGNED" : "JOIN_SEAM_MISALIGNED",
      join.id,
      aligned
        ? `Authored seam endpoints coincide within ${seamOffset.toFixed(2)} units.`
        : `Authored seam endpoints are offset by ${seamOffset.toFixed(2)} units; the Blueprint placement does not honor the join.`,
    );

    let continuous = false;
    join.navSamples = [];
    if (aligned) {
      const sampleAmounts = [0.25, 0.375, 0.5, 0.625, 0.75];
      continuous = sampleAmounts.every((amount) => {
        const center = mixPoint(join.from.a, join.from.b, amount);
        const sampleSet = [
          center,
          { x: center.x + join.from.normal.x * (ACTOR_RADIUS + 2), y: center.y + join.from.normal.y * (ACTOR_RADIUS + 2) },
          { x: center.x - join.from.normal.x * (ACTOR_RADIUS + 2), y: center.y - join.from.normal.y * (ACTOR_RADIUS + 2) },
        ];
        const pass = sampleSet.every((sample) => canOccupyRaw(sample, ACTOR_RADIUS, assembly.navRects, assembly.obstacles));
        join.navSamples.push({ center, pass });
        return pass;
      });
    }
    addCheck(
      checks,
      continuous,
      "JOIN_NAV_CONTINUOUS",
      join.id,
      continuous
        ? `Actor-radius samples pass on both sides of the joined seam with no invisible collision break.`
        : aligned
          ? `One or more actor-radius seam samples leave navigable floor or intersect collision.`
          : `Navigation continuity cannot pass until the authored seams align.`,
    );
    if (compatible && normalsOppose && aligned && continuous) validJoinIds.add(join.id);
  }

  const graph = new Map(assembly.modules.map((module) => [module.id, new Set()]));
  for (const join of assembly.joins) {
    if (!validJoinIds.has(join.id) || !join.from || !join.to) continue;
    graph.get(join.from.placementId)?.add(join.to.placementId);
    graph.get(join.to.placementId)?.add(join.from.placementId);
  }
  const start = assembly.modules[0]?.id;
  const visited = new Set(start ? [start] : []);
  const queue = start ? [start] : [];
  while (queue.length) {
    const current = queue.shift();
    for (const neighbor of graph.get(current) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  addCheck(
    checks,
    visited.size === assembly.modules.length && assembly.modules.length === assembly.blueprint.expectedAreaCount,
    "NAV_GRAPH_CONNECTED",
    assembly.blueprint.id,
    `${visited.size}/${assembly.modules.length} module placements are connected through validated joins; Blueprint expects ${assembly.blueprint.expectedAreaCount} Areas.`,
  );

  const invalidInteractionPositions = [];
  for (const interaction of assembly.interactions) {
    for (const position of interaction.positions) {
      if (!canOccupyRaw(position, ACTOR_RADIUS, assembly.navRects, assembly.obstacles)) invalidInteractionPositions.push(position.key);
    }
  }
  addCheck(
    checks,
    assembly.interactions.length > 0 && invalidInteractionPositions.length === 0,
    "INTERACTION_POSITIONS_NAVIGABLE",
    "interaction metadata",
    invalidInteractionPositions.length === 0
      ? `${assembly.interactions.length} sockets and ${assembly.interactionPositions.length} transformed Interaction Positions remain navigable.`
      : `Non-navigable Interaction Positions: ${invalidInteractionPositions.join(", ")}.`,
  );

  const invalidCoverPositions = [];
  for (const cover of assembly.coverPositions) {
    const obstacle = assembly.obstacles.find(
      (candidate) => candidate.placementId === cover.placementId && candidate.sourceId === cover.obstacleId,
    );
    const adjacent = obstacle ? distancePointToRect(cover, obstacle) <= 28 : false;
    const navigable = canOccupyRaw(cover, ACTOR_RADIUS, assembly.navRects, assembly.obstacles);
    if (!obstacle || !adjacent || !navigable || !(cover.arc.spanDeg > 0 && cover.arc.spanDeg <= 360)) {
      invalidCoverPositions.push(cover.key);
    }
  }
  addCheck(
    checks,
    assembly.coverPositions.length > 0 && invalidCoverPositions.length === 0,
    "COVER_POSITIONS_VALID",
    "cover metadata",
    invalidCoverPositions.length === 0
      ? `${assembly.coverPositions.length} transformed Cover Positions are navigable, adjacent to their authored obstacles, and retain protected arcs.`
      : `Invalid Cover Positions: ${invalidCoverPositions.join(", ")}.`,
  );

  const incompleteCoverObjects = [];
  for (const obstacle of assembly.obstacles.filter((candidate) => candidate.role === "cover")) {
    const positions = assembly.coverPositions.filter(
      (cover) => cover.placementId === obstacle.placementId && cover.obstacleId === obstacle.sourceId,
    );
    const sides = new Set();
    for (const position of positions) {
      if (position.y < obstacle.y) sides.add("north");
      if (position.y > obstacle.y + obstacle.h) sides.add("south");
      if (position.x < obstacle.x) sides.add("west");
      if (position.x > obstacle.x + obstacle.w) sides.add("east");
    }
    const missing = ["north", "south", "west", "east"].filter((side) => !sides.has(side));
    if (missing.length) incompleteCoverObjects.push(`${obstacle.placementId}:${obstacle.sourceId} missing ${missing.join("/")}`);
  }
  addCheck(
    checks,
    incompleteCoverObjects.length === 0,
    "COVER_OBJECT_ALL_SIDES_AUTHORED",
    "cover metadata",
    incompleteCoverObjects.length === 0
      ? `${assembly.obstacles.filter((candidate) => candidate.role === "cover").length} cover objects expose authored positions on all four navigable sides.`
      : `Incomplete cover objects: ${incompleteCoverObjects.join(", ")}.`,
  );

  addCheck(
    checks,
    assembly.occluders.length > 0,
    "OCCLUSION_GEOMETRY_PRESENT",
    "occlusion metadata",
    `${assembly.occluders.length} transformed occlusion segments remain separate from cover metadata.`,
  );

  return {
    pass: checks.every((check) => check.ok),
    checks,
    failures: checks.filter((check) => !check.ok),
  };
}

export function assembleLocation(blueprint, moduleLibrary = MODULE_LIBRARY) {
  const moduleProblems = validateModuleLibrary(moduleLibrary);
  const blueprintProblems = [];
  const placementIds = new Set();
  const modules = [];

  for (const placement of blueprint.placements ?? []) {
    if (placementIds.has(placement.id)) blueprintProblems.push(`Duplicate placement id ${placement.id}.`);
    placementIds.add(placement.id);
    if (![0, 90, 180, 270].includes(placement.rotationDeg ?? 0)) {
      blueprintProblems.push(`${placement.id} uses unsupported rotation ${placement.rotationDeg}.`);
    }
    const module = moduleLibrary[placement.moduleId];
    if (!module) {
      blueprintProblems.push(`${placement.id} references unknown module ${placement.moduleId}.`);
      continue;
    }
    modules.push(buildWorldModule(module, placement));
  }

  const navRects = modules.flatMap((module) => module.navRects);
  const obstacles = modules.flatMap((module) => module.obstacles);
  const occluders = modules.flatMap((module) => module.occluders);
  const connections = modules.flatMap((module) => module.connections);
  const interactions = modules.flatMap((module) => module.interactions);
  const interactionPositions = interactions.flatMap((interaction) =>
    interaction.positions.map((position) => ({ ...position, interactionKey: interaction.key, placementId: interaction.placementId })),
  );
  const coverPositions = modules.flatMap((module) => module.coverPositions);

  const connectionByKey = new Map(connections.map((connection) => [connection.key, connection]));
  const joins = (blueprint.joins ?? []).map((join) => ({
    ...join,
    from: connectionByKey.get(`${join.from.placementId}:${join.from.connectionId}`),
    to: connectionByKey.get(`${join.to.placementId}:${join.to.connectionId}`),
  }));

  const assembly = {
    blueprint,
    modules,
    navRects,
    obstacles,
    occluders,
    connections,
    interactions,
    interactionPositions,
    coverPositions,
    joins,
    bounds: navRects.length ? boundsForRects(navRects) : { minX: 0, minY: 0, maxX: 0, maxY: 0 },
  };
  assembly.validation = validateAssembly(assembly, moduleProblems, blueprintProblems);
  return assembly;
}

export function getAreaAt(assembly, point) {
  const candidates = assembly.modules.filter((module) => module.navRects.some((rect) => pointInRect(point, rect)));
  if (!candidates.length) return null;
  candidates.sort((left, right) => {
    const leftDistance = Math.hypot(point.x - left.focus.x, point.y - left.focus.y);
    const rightDistance = Math.hypot(point.x - right.focus.x, point.y - right.focus.y);
    return leftDistance - rightDistance;
  });
  return candidates[0];
}

export function lookupWorldMetadata(assembly, key) {
  return (
    assembly.interactions.find((item) => item.key === key) ??
    assembly.interactionPositions.find((item) => item.key === key) ??
    assembly.coverPositions.find((item) => item.key === key) ??
    assembly.occluders.find((item) => `${item.placementId}:${item.sourceId}` === key) ??
    assembly.connections.find((item) => item.key === key) ??
    null
  );
}
