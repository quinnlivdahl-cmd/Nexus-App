import type { Vector2 } from "./types.js";

const EPSILON = 0.000001;

function cross(origin: Vector2, left: Vector2, right: Vector2): number {
  return (
    (left.x - origin.x) * (right.y - origin.y) -
    (left.y - origin.y) * (right.x - origin.x)
  );
}

function onSegment(point: Vector2, start: Vector2, end: Vector2): boolean {
  return (
    Math.abs(cross(start, end, point)) < EPSILON &&
    point.x >= Math.min(start.x, end.x) - EPSILON &&
    point.x <= Math.max(start.x, end.x) + EPSILON &&
    point.y >= Math.min(start.y, end.y) - EPSILON &&
    point.y <= Math.max(start.y, end.y) + EPSILON
  );
}

export function pointInPolygon(
  point: Vector2,
  vertices: readonly Vector2[],
): boolean {
  let inside = false;
  for (
    let index = 0, previous = vertices.length - 1;
    index < vertices.length;
    previous = index++
  ) {
    const current = vertices[index]!;
    const prior = vertices[previous]!;
    if (onSegment(point, current, prior)) return true;
    if (
      current.y > point.y !== prior.y > point.y &&
      point.x <
        ((prior.x - current.x) * (point.y - current.y)) /
          (prior.y - current.y) +
          current.x
    ) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * True when every point of a segment is inside (or on the boundary of) a
 * simple authored polygon. Concave polygons need this stronger check: two
 * legal endpoints alone do not make the straight line between them legal.
 */
export function segmentStaysInPolygon(
  start: Vector2,
  end: Vector2,
  vertices: readonly Vector2[],
): boolean {
  if (!pointInPolygon(start, vertices) || !pointInPolygon(end, vertices))
    return false;

  const delta = { x: end.x - start.x, y: end.y - start.y };
  const lengthSquared = delta.x * delta.x + delta.y * delta.y;
  if (lengthSquared < EPSILON * EPSILON) return true;

  const crossings = [0, 1];
  for (let index = 0; index < vertices.length; index += 1) {
    const edgeStart = vertices[index]!;
    const edgeEnd = vertices[(index + 1) % vertices.length]!;
    const edgeDelta = {
      x: edgeEnd.x - edgeStart.x,
      y: edgeEnd.y - edgeStart.y,
    };
    const offset = { x: edgeStart.x - start.x, y: edgeStart.y - start.y };
    const denominator = delta.x * edgeDelta.y - delta.y * edgeDelta.x;
    if (Math.abs(denominator) >= EPSILON) {
      const segmentT =
        (offset.x * edgeDelta.y - offset.y * edgeDelta.x) / denominator;
      const edgeT = (offset.x * delta.y - offset.y * delta.x) / denominator;
      if (
        segmentT >= -EPSILON &&
        segmentT <= 1 + EPSILON &&
        edgeT >= -EPSILON &&
        edgeT <= 1 + EPSILON
      )
        crossings.push(Math.min(1, Math.max(0, segmentT)));
      continue;
    }
    if (Math.abs(offset.x * delta.y - offset.y * delta.x) >= EPSILON)
      continue;
    for (const endpoint of [edgeStart, edgeEnd]) {
      const projected =
        ((endpoint.x - start.x) * delta.x + (endpoint.y - start.y) * delta.y) /
        lengthSquared;
      if (projected >= -EPSILON && projected <= 1 + EPSILON)
        crossings.push(Math.min(1, Math.max(0, projected)));
    }
  }

  crossings.sort((left, right) => left - right);
  const uniqueCrossings = crossings.filter(
    (value, index) => index === 0 || value - crossings[index - 1]! > EPSILON,
  );
  for (let index = 1; index < uniqueCrossings.length; index += 1) {
    const midpoint = (uniqueCrossings[index - 1]! + uniqueCrossings[index]!) / 2;
    if (
      !pointInPolygon(
        { x: start.x + delta.x * midpoint, y: start.y + delta.y * midpoint },
        vertices,
      )
    )
      return false;
  }
  return true;
}

function segmentsIntersect(
  firstStart: Vector2,
  firstEnd: Vector2,
  secondStart: Vector2,
  secondEnd: Vector2,
): boolean {
  const firstSide = cross(firstStart, firstEnd, secondStart);
  const secondSide = cross(firstStart, firstEnd, secondEnd);
  const thirdSide = cross(secondStart, secondEnd, firstStart);
  const fourthSide = cross(secondStart, secondEnd, firstEnd);
  if (
    ((firstSide > EPSILON && secondSide < -EPSILON) ||
      (firstSide < -EPSILON && secondSide > EPSILON)) &&
    ((thirdSide > EPSILON && fourthSide < -EPSILON) ||
      (thirdSide < -EPSILON && fourthSide > EPSILON))
  ) {
    return true;
  }
  return (
    (Math.abs(firstSide) < EPSILON &&
      onSegment(secondStart, firstStart, firstEnd)) ||
    (Math.abs(secondSide) < EPSILON &&
      onSegment(secondEnd, firstStart, firstEnd)) ||
    (Math.abs(thirdSide) < EPSILON &&
      onSegment(firstStart, secondStart, secondEnd)) ||
    (Math.abs(fourthSide) < EPSILON &&
      onSegment(firstEnd, secondStart, secondEnd))
  );
}

export function segmentIntersectsPolygon(
  start: Vector2,
  end: Vector2,
  vertices: readonly Vector2[],
): boolean {
  if (pointInPolygon(start, vertices) || pointInPolygon(end, vertices)) {
    return true;
  }
  for (let index = 0; index < vertices.length; index += 1) {
    if (
      segmentsIntersect(
        start,
        end,
        vertices[index]!,
        vertices[(index + 1) % vertices.length]!,
      )
    ) {
      return true;
    }
  }
  return false;
}
