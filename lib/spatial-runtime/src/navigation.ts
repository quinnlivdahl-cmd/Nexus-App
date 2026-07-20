import type {
  AuthoredPolygonGraph,
  LocationState,
  NavigationGraphNode,
  Vector2,
} from "./types.js";

function distance(left: Vector2, right: Vector2): number {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function samePoint(left: Vector2, right: Vector2): boolean {
  return left.x === right.x && left.y === right.y;
}

/**
 * Read-only deterministic route planning over authored graph nodes and edges.
 * It deliberately receives no Campaign state and returns no mutation capability.
 */
export function planAuthoredPolygonGraphRoute(
  navigation: AuthoredPolygonGraph,
  start: Vector2,
  startAreaId: string,
  destination: Vector2,
  destinationAreaId: string,
): readonly Vector2[] | null {
  const nodes = new Map(navigation.nodes.map((node) => [node.id, node]));
  const startNodes = navigation.nodes.filter(
    (node) => node.areaId === startAreaId,
  );
  const destinationNodes = navigation.nodes.filter(
    (node) => node.areaId === destinationAreaId,
  );
  if (startNodes.length === 0 || destinationNodes.length === 0) return null;

  const adjacency = new Map<
    string,
    { readonly node: NavigationGraphNode; readonly weight: number }[]
  >();
  for (const node of navigation.nodes) adjacency.set(node.id, []);
  for (const edge of navigation.edges) {
    const from = nodes.get(edge.fromNodeId);
    const to = nodes.get(edge.toNodeId);
    if (!from || !to) return null;
    const weight = distance(from.position, to.position);
    adjacency.get(from.id)?.push({ node: to, weight });
    adjacency.get(to.id)?.push({ node: from, weight });
  }

  const source = "__route-source__";
  const target = "__route-target__";
  const queue = new Set<string>([
    source,
    ...navigation.nodes.map((node) => node.id),
    target,
  ]);
  const costs = new Map<string, number>([[source, 0]]);
  const previous = new Map<string, string>();
  const edgesFrom = (
    id: string,
  ): { readonly id: string; readonly weight: number }[] => {
    if (id === source)
      return startNodes.map((node) => ({
        id: node.id,
        weight: distance(start, node.position),
      }));
    if (id === target) return [];
    const graphEdges = (adjacency.get(id) ?? []).map(({ node, weight }) => ({
      id: node.id,
      weight,
    }));
    const node = nodes.get(id);
    if (
      node &&
      destinationNodes.some((candidate) => candidate.id === node.id)
    ) {
      graphEdges.push({
        id: target,
        weight: distance(node.position, destination),
      });
    }
    return graphEdges;
  };

  while (queue.size > 0) {
    const current = [...queue].sort((left, right) => {
      const difference =
        (costs.get(left) ?? Number.POSITIVE_INFINITY) -
        (costs.get(right) ?? Number.POSITIVE_INFINITY);
      return difference || left.localeCompare(right);
    })[0];
    if (!current || !Number.isFinite(costs.get(current))) break;
    queue.delete(current);
    if (current === target) break;
    for (const next of edgesFrom(current)) {
      if (!queue.has(next.id)) continue;
      const nextCost =
        (costs.get(current) ?? Number.POSITIVE_INFINITY) + next.weight;
      const previousCost = costs.get(next.id) ?? Number.POSITIVE_INFINITY;
      if (
        nextCost < previousCost ||
        (nextCost === previousCost &&
          current.localeCompare(previous.get(next.id) ?? "") < 0)
      ) {
        costs.set(next.id, nextCost);
        previous.set(next.id, current);
      }
    }
  }
  if (!costs.has(target)) return null;

  const ids: string[] = [];
  for (
    let current = target;
    current !== source;
    current = previous.get(current) ?? source
  ) {
    if (!previous.has(current)) return null;
    ids.unshift(current);
  }
  const points = [
    start,
    ...ids
      .filter((id) => id !== target)
      .map((id) => nodes.get(id)?.position)
      .filter((point): point is Vector2 => !!point),
    destination,
  ];
  return points.filter(
    (point, index) =>
      index === 0 || !samePoint(point, points[index - 1] ?? point),
  );
}

export function isAuthoredPolygonGraph(
  location: LocationState,
): location is LocationState & { readonly navigation: AuthoredPolygonGraph } {
  return (
    !Array.isArray(location.navigation) &&
    (location.navigation as AuthoredPolygonGraph).authority ===
      "authored-polygon-graph"
  );
}
