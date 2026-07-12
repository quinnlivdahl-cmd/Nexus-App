import { ACTOR_RADIUS, canOccupy, getAreaAt } from "./assembly.mjs";

const NEIGHBORS = [
  { x: 1, y: 0, cost: 1 },
  { x: -1, y: 0, cost: 1 },
  { x: 0, y: 1, cost: 1 },
  { x: 0, y: -1, cost: 1 },
  { x: 1, y: 1, cost: Math.SQRT2 },
  { x: -1, y: 1, cost: Math.SQRT2 },
  { x: 1, y: -1, cost: Math.SQRT2 },
  { x: -1, y: -1, cost: Math.SQRT2 },
];

function key(x, y) {
  return `${x},${y}`;
}

function lineIsWalkable(assembly, start, end, radius, sampleStep = 6) {
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  const samples = Math.max(1, Math.ceil(distance / sampleStep));
  for (let index = 1; index <= samples; index += 1) {
    const amount = index / samples;
    const point = {
      x: start.x + (end.x - start.x) * amount,
      y: start.y + (end.y - start.y) * amount,
    };
    if (!canOccupy(assembly, point, radius)) return false;
  }
  return true;
}

function simplifyPath(assembly, path, radius) {
  if (path.length <= 2) return path;
  const result = [path[0]];
  let anchor = 0;
  while (anchor < path.length - 1) {
    let candidate = path.length - 1;
    while (candidate > anchor + 1 && !lineIsWalkable(assembly, path[anchor], path[candidate], radius)) {
      candidate -= 1;
    }
    result.push(path[candidate]);
    anchor = candidate;
  }
  return result;
}

export function findPath(assembly, start, goal, options = {}) {
  const radius = options.radius ?? ACTOR_RADIUS;
  const step = options.step ?? 14;
  const padding = radius + 2;
  const origin = { x: assembly.bounds.minX + padding, y: assembly.bounds.minY + padding };
  const columns = Math.floor((assembly.bounds.maxX - assembly.bounds.minX - padding * 2) / step) + 1;
  const rows = Math.floor((assembly.bounds.maxY - assembly.bounds.minY - padding * 2) / step) + 1;
  const toWorld = (x, y) => ({ x: origin.x + x * step, y: origin.y + y * step });
  const toGrid = (point) => ({
    x: Math.max(0, Math.min(columns - 1, Math.round((point.x - origin.x) / step))),
    y: Math.max(0, Math.min(rows - 1, Math.round((point.y - origin.y) / step))),
  });

  function nearestWalkable(point) {
    const center = toGrid(point);
    for (let ring = 0; ring <= 8; ring += 1) {
      for (let y = center.y - ring; y <= center.y + ring; y += 1) {
        for (let x = center.x - ring; x <= center.x + ring; x += 1) {
          if (x < 0 || y < 0 || x >= columns || y >= rows) continue;
          if (ring > 0 && x !== center.x - ring && x !== center.x + ring && y !== center.y - ring && y !== center.y + ring) continue;
          if (canOccupy(assembly, toWorld(x, y), radius)) return { x, y };
        }
      }
    }
    return null;
  }

  if (!canOccupy(assembly, start, radius)) throw new Error(`Path start is not occupiable: ${start.x},${start.y}`);
  if (!canOccupy(assembly, goal, radius)) throw new Error(`Path goal is not occupiable: ${goal.x},${goal.y}`);
  const startGrid = nearestWalkable(start);
  const goalGrid = nearestWalkable(goal);
  if (!startGrid || !goalGrid) throw new Error("Could not anchor traversal to the navigation sampling grid.");

  const open = [{ ...startGrid, g: 0, f: 0 }];
  const best = new Map([[key(startGrid.x, startGrid.y), 0]]);
  const parent = new Map();
  let found = null;
  let expansions = 0;

  while (open.length && expansions < (options.maxNodes ?? 30000)) {
    let bestIndex = 0;
    for (let index = 1; index < open.length; index += 1) {
      if (open[index].f < open[bestIndex].f) bestIndex = index;
    }
    const current = open.splice(bestIndex, 1)[0];
    expansions += 1;
    if (current.x === goalGrid.x && current.y === goalGrid.y) {
      found = current;
      break;
    }

    for (const neighbor of NEIGHBORS) {
      const x = current.x + neighbor.x;
      const y = current.y + neighbor.y;
      if (x < 0 || y < 0 || x >= columns || y >= rows) continue;
      const world = toWorld(x, y);
      if (!canOccupy(assembly, world, radius)) continue;
      if (neighbor.x !== 0 && neighbor.y !== 0) {
        if (!canOccupy(assembly, toWorld(current.x + neighbor.x, current.y), radius)) continue;
        if (!canOccupy(assembly, toWorld(current.x, current.y + neighbor.y), radius)) continue;
      }
      const nextG = current.g + neighbor.cost * step;
      const nextKey = key(x, y);
      if (nextG >= (best.get(nextKey) ?? Number.POSITIVE_INFINITY)) continue;
      best.set(nextKey, nextG);
      parent.set(nextKey, key(current.x, current.y));
      const heuristic = Math.hypot(goalGrid.x - x, goalGrid.y - y) * step;
      open.push({ x, y, g: nextG, f: nextG + heuristic });
    }
  }

  if (!found) throw new Error(`No continuous actor-radius path found after ${expansions} navigation samples.`);
  const reversed = [];
  let cursor = key(found.x, found.y);
  while (cursor) {
    const [x, y] = cursor.split(",").map(Number);
    reversed.push(toWorld(x, y));
    cursor = parent.get(cursor);
  }
  reversed.reverse();
  const raw = [start, ...reversed, goal];
  const deduplicated = raw.filter(
    (point, index) => index === 0 || Math.hypot(point.x - raw[index - 1].x, point.y - raw[index - 1].y) > 0.5,
  );
  return simplifyPath(assembly, deduplicated, radius);
}

export function tracePath(assembly, path, options = {}) {
  const radius = options.radius ?? ACTOR_RADIUS;
  const sampleStep = options.sampleStep ?? 5;
  const visitedAreas = new Set();
  let distance = 0;
  for (let index = 0; index < path.length - 1; index += 1) {
    const start = path[index];
    const end = path[index + 1];
    const segmentDistance = Math.hypot(end.x - start.x, end.y - start.y);
    distance += segmentDistance;
    const samples = Math.max(1, Math.ceil(segmentDistance / sampleStep));
    for (let sampleIndex = 0; sampleIndex <= samples; sampleIndex += 1) {
      const amount = sampleIndex / samples;
      const point = { x: start.x + (end.x - start.x) * amount, y: start.y + (end.y - start.y) * amount };
      if (!canOccupy(assembly, point, radius)) {
        return { pass: false, distance, visitedAreas: [...visitedAreas], failurePoint: point };
      }
      const area = getAreaAt(assembly, point);
      if (area) visitedAreas.add(area.areaId);
    }
  }
  return { pass: true, distance, visitedAreas: [...visitedAreas], failurePoint: null };
}

export function buildReviewTraversal(assembly, blueprint = assembly.blueprint) {
  let current = { ...blueprint.actorStart };
  const segments = [];
  const fullPath = [current];
  for (const target of blueprint.reviewRoute) {
    const path = findPath(assembly, current, target, { radius: ACTOR_RADIUS });
    const trace = tracePath(assembly, path, { radius: ACTOR_RADIUS });
    if (!trace.pass) throw new Error(`Traversal to ${target.id} left navigable space.`);
    segments.push({ target, path, trace });
    fullPath.push(...path.slice(1));
    current = { x: target.x, y: target.y };
  }
  const trace = tracePath(assembly, fullPath, { radius: ACTOR_RADIUS });
  return { segments, path: fullPath, trace };
}

export function moveWithCollision(assembly, position, delta, radius = ACTOR_RADIUS) {
  let next = { ...position };
  const xCandidate = { x: next.x + delta.x, y: next.y };
  if (canOccupy(assembly, xCandidate, radius)) next = xCandidate;
  const yCandidate = { x: next.x, y: next.y + delta.y };
  if (canOccupy(assembly, yCandidate, radius)) next = yCandidate;
  return next;
}
