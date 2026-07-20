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
