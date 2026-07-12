// DISPOSABLE PROTOTYPE: one interaction/follower approach for playtest evidence, not production architecture.
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const TAU = Math.PI * 2;
const BASE_TILT_DEGREES = 10;
const BASE_HEIGHT_SCALE = 0.72;
const CHARACTER_RADIUS = 17;
const NAV_CELL = 28;
const WORLD_BOUNDS = { w: 1610, h: 830 };
const ACCEPTED = { speed: 190, distance: 0.82, softness: 3.2, tiltDegrees: 10, pullback: 1.70 };
const spawns = [
  { x: 125, y: 330 },
  { x: 77, y: 296 },
  { x: 77, y: 364 },
];

const makeCharacter = (id, label, color, accent, spawn, marker) => ({
  id, label, color, accent, marker, ...spawn, facing: "E", path: [], target: null,
  followState: "Settling", moving: false,
});

const state = {
  characters: [
    makeCharacter("a", "A · Cyan", "#63d9cb", "#d8fff8", spawns[0], "A"),
    makeCharacter("b", "B · Amber", "#e5a84f", "#fff0c7", spawns[1], "B"),
    makeCharacter("c", "C · Violet", "#a98ae8", "#efe5ff", spawns[2], "C"),
  ],
  controlledIndex: 0,
  camera: { ...spawns[0], zoom: 1 },
  keys: new Set(),
  tactical: false,
  occlusion: false,
  diagnostics: true,
  selectedObjectId: null,
  selectedAction: null,
  interactionPosition: null,
  autoPath: [],
  pathState: "Manual control",
  pathFailure: "",
  completedActions: new Set(),
  followerRepathTimer: 0,
  capturedPositions: [],
  capturePaused: false,
  area: "Docking spine",
  collision: false,
  lastTime: performance.now(),
  toastTimer: 0,
};

const floors = [
  { id: "corridor", x: 0, y: 250, w: 960, h: 160, color: "#263238" },
  { id: "bay", x: 900, y: 40, w: 700, h: 660, color: "#28363a" },
  { id: "side", x: 260, y: 450, w: 540, h: 370, color: "#202d31" },
  { id: "side-door", x: 520, y: 390, w: 105, h: 80, color: "#243438" },
];

const obstacles = [
  { id: "cover-a", x: 1070, y: 150, w: 150, h: 82, height: 32, kind: "cover" },
  { id: "cover-b", x: 1300, y: 365, w: 188, h: 70, height: 38, kind: "cover" },
  { id: "cover-c", x: 1050, y: 525, w: 105, h: 98, height: 28, kind: "cover" },
  { id: "bay-machine", x: 1465, y: 105, w: 72, h: 165, height: 62, kind: "machine" },
  { id: "corridor-debris", x: 690, y: 282, w: 78, h: 48, height: 19, kind: "debris" },
  { id: "side-shelves", x: 302, y: 500, w: 118, h: 88, height: 55, kind: "machine" },
  { id: "side-crates", x: 612, y: 478, w: 112, h: 145, height: 35, kind: "cover" },
  { id: "side-junk", x: 430, y: 674, w: 95, h: 70, height: 25, kind: "debris" },
  { id: "partition", x: 1245, y: 40, w: 28, h: 205, height: 80, kind: "wall" },
];

const walls = [
  [0,250,900,250], [0,410,520,410], [625,410,900,410], [0,250,0,410],
  [900,40,1600,40], [1600,40,1600,700], [1600,700,900,700],
  [900,40,900,250], [900,410,900,700],
  [260,450,520,450], [625,450,800,450], [260,450,260,820],
  [260,820,800,820], [800,820,800,450], [520,410,520,450], [625,410,625,450],
];

const worldObjects = [
  {
    id: "door-panel", name: "Pressure-door panel", x: 858, y: 330, radius: 34, kind: "panel",
    description: "A corridor-side control beside the real cargo-bay opening.",
    positions: [{ x: 808, y: 354 }],
    actions: [
      { id: "tag", label: "Tag for the crew", range: "immediate", result: "Door panel tagged for the crew." },
      { id: "cycle", label: "Cycle pressure door", range: "proximity", result: "Pressure door cycle simulated." },
    ],
  },
  {
    id: "cargo-terminal", name: "Cargo routing terminal", x: 1518, y: 610, radius: 38, kind: "terminal",
    description: "A damaged terminal beyond the cargo cover and machinery.",
    positions: [{ x: 1435, y: 635 }, { x: 1520, y: 650 }],
    actions: [
      { id: "ping", label: "Ping terminal", range: "immediate", result: "Terminal answers with a weak carrier tone." },
      { id: "read", label: "Read cargo manifest", range: "proximity", result: "Placeholder manifest recovered." },
    ],
  },
  {
    id: "transponder", name: "Stranded transponder", x: 700, y: 760, radius: 42, kind: "transponder",
    description: "A cyan signal source deep inside the cluttered workshop.",
    positions: [{ x: 620, y: 760 }, { x: 700, y: 690 }],
    actions: [
      { id: "mark", label: "Mark signal source", range: "immediate", result: "Signal source marked for everyone." },
      { id: "inspect", label: "Inspect handshake", range: "proximity", result: "Dead crew docking handshake logged." },
    ],
  },
  {
    id: "sealed-access", name: "Blocked-path test (diagnostic)", x: 1260, y: 120, radius: 34, kind: "sealed",
    description: "This red diagnostic deliberately uses an obstructed IP1. It is not a valid movement destination.",
    positions: [{ x: 1260, y: 145 }],
    actions: [
      { id: "scan", label: "Scan seal", range: "immediate", result: "The seal is mechanically jammed." },
      { id: "open", label: "Test unreachable IP1", range: "proximity", expectedFailure: true, result: "This should never execute." },
    ],
  },
];

const dust = Array.from({ length: 130 }, (_, index) => ({
  x: (index * 137.5) % 1580, y: (index * 83.3) % 800,
  size: 1 + (index % 3), alpha: 0.08 + (index % 5) * 0.025,
}));

const ui = Object.fromEntries([
  "areaBadge", "objectiveTitle", "objectiveText", "tacticalButton", "tacticalState", "captureButton",
  "captureState", "diagnosticToggle", "occlusion", "controlledReadout", "selectedReadout", "actionReadout",
  "facingReadout", "targetReadout", "positionReadout", "pathReadout", "pathStateReadout",
  "followerOneReadout", "followerTwoReadout", "captureReadout", "contextMenu", "contextTitle",
  "contextDescription", "contextActions", "closeContext", "pauseOverlay", "toast",
].map((id) => [id, document.querySelector(`#${id}`)]));

const controlled = () => state.characters[state.controlledIndex];
const selectedObject = () => worldObjects.find((object) => object.id === state.selectedObjectId) ?? null;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distanceBetween = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(innerWidth * ratio);
  canvas.height = Math.round(innerHeight * ratio);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function projectionDepthScale() {
  return Math.cos(ACCEPTED.tiltDegrees * Math.PI / 180);
}

function projectionExtrusionRatio() {
  return Math.sin(ACCEPTED.tiltDegrees * Math.PI / 180) / Math.sin(32 * Math.PI / 180);
}

function worldToScreen(x, y) {
  const dx = x - state.camera.x;
  const dy = y - state.camera.y;
  return {
    x: innerWidth * 0.49 + dx * state.camera.zoom,
    y: innerHeight * 0.51 + dy * projectionDepthScale() * state.camera.zoom,
  };
}

function screenToWorld(x, y) {
  return {
    x: state.camera.x + (x - innerWidth * 0.49) / state.camera.zoom,
    y: state.camera.y + (y - innerHeight * 0.51) / (state.camera.zoom * projectionDepthScale()),
  };
}

function contains(rect, x, y, pad = 0) {
  return x >= rect.x + pad && x <= rect.x + rect.w - pad && y >= rect.y + pad && y <= rect.y + rect.h - pad;
}

function insideWalkable(x, y) {
  const r = CHARACTER_RADIUS;
  const samples = [[0,0],[r,0],[-r,0],[0,r],[0,-r],[r*.7,r*.7],[r*.7,-r*.7],[-r*.7,r*.7],[-r*.7,-r*.7]];
  return samples.every(([ox, oy]) => floors.some((floor) => contains(floor, x + ox, y + oy)));
}

function intersectsObstacle(x, y) {
  return obstacles.some((obstacle) =>
    x > obstacle.x - CHARACTER_RADIUS && x < obstacle.x + obstacle.w + CHARACTER_RADIUS &&
    y > obstacle.y - CHARACTER_RADIUS && y < obstacle.y + obstacle.h + CHARACTER_RADIUS
  );
}

function validPosition(x, y) { return insideWalkable(x, y) && !intersectsObstacle(x, y); }

function facingFrom(dx, dy) {
  const directions = ["E", "SE", "S", "SW", "W", "NW", "N", "NE"];
  return directions[Math.round(Math.atan2(dy, dx) / (Math.PI / 4) + 8) % 8];
}

function facingVector(facing) {
  const vectors = { E:[1,0], SE:[.707,.707], S:[0,1], SW:[-.707,.707], W:[-1,0], NW:[-.707,-.707], N:[0,-1], NE:[.707,-.707] };
  const [x, y] = vectors[facing] ?? vectors.E;
  return { x, y };
}

function moveCharacter(character, dx, dy, distance, updateFacing = true) {
  const magnitude = Math.hypot(dx, dy);
  if (!magnitude) { character.moving = false; return false; }
  dx /= magnitude; dy /= magnitude;
  if (updateFacing) character.facing = facingFrom(dx, dy);
  const nextX = character.x + dx * distance;
  const nextY = character.y + dy * distance;
  let moved = false;
  if (validPosition(nextX, character.y)) { character.x = nextX; moved = true; }
  else if (character === controlled()) state.collision = true;
  if (validPosition(character.x, nextY)) { character.y = nextY; moved = true; }
  else if (character === controlled()) state.collision = true;
  character.moving = moved;
  return moved;
}

function gridNode(point, maxRadius = 3) {
  const baseX = Math.round((point.x - NAV_CELL / 2) / NAV_CELL);
  const baseY = Math.round((point.y - NAV_CELL / 2) / NAV_CELL);
  for (let radius = 0; radius <= maxRadius; radius += 1) {
    for (let y = baseY - radius; y <= baseY + radius; y += 1) {
      for (let x = baseX - radius; x <= baseX + radius; x += 1) {
        if (radius && x !== baseX - radius && x !== baseX + radius && y !== baseY - radius && y !== baseY + radius) continue;
        const px = x * NAV_CELL + NAV_CELL / 2;
        const py = y * NAV_CELL + NAV_CELL / 2;
        if (x >= 0 && y >= 0 && px <= WORLD_BOUNDS.w && py <= WORLD_BOUNDS.h && validPosition(px, py)) return { x, y, px, py };
      }
    }
  }
  return null;
}

function lineValid(a, b) {
  const distance = distanceBetween(a, b);
  const steps = Math.max(1, Math.ceil(distance / 11));
  for (let index = 1; index <= steps; index += 1) {
    const t = index / steps;
    if (!validPosition(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)) return false;
  }
  return true;
}

function findPath(start, goal) {
  if (!validPosition(goal.x, goal.y)) return { path: null, reason: "Authored Interaction Position is obstructed" };
  const startNode = gridNode(start, 4);
  const goalNode = gridNode(goal, 2);
  if (!startNode || !goalNode) return { path: null, reason: "No valid navigation cell near start or target" };
  const key = (node) => `${node.x},${node.y}`;
  const open = [startNode];
  const records = new Map([[key(startNode), { node: startNode, g: 0, f: 0, parent: null }]]);
  const closed = new Set();
  const directions = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  let found = null;

  while (open.length && closed.size < 5000) {
    open.sort((a, b) => records.get(key(a)).f - records.get(key(b)).f);
    const current = open.shift();
    const currentKey = key(current);
    if (closed.has(currentKey)) continue;
    if (current.x === goalNode.x && current.y === goalNode.y) { found = records.get(currentKey); break; }
    closed.add(currentKey);
    const currentRecord = records.get(currentKey);

    for (const [dx, dy] of directions) {
      const node = { x: current.x + dx, y: current.y + dy };
      node.px = node.x * NAV_CELL + NAV_CELL / 2;
      node.py = node.y * NAV_CELL + NAV_CELL / 2;
      const nodeKey = key(node);
      if (closed.has(nodeKey) || !validPosition(node.px, node.py)) continue;
      if (dx && dy) {
        const sideA = { x: current.px + dx * NAV_CELL, y: current.py };
        const sideB = { x: current.px, y: current.py + dy * NAV_CELL };
        if (!validPosition(sideA.x, sideA.y) || !validPosition(sideB.x, sideB.y)) continue;
      }
      const step = dx && dy ? Math.SQRT2 : 1;
      const g = currentRecord.g + step;
      const existing = records.get(nodeKey);
      if (existing && existing.g <= g) continue;
      const heuristic = Math.hypot(goalNode.x - node.x, goalNode.y - node.y);
      records.set(nodeKey, { node, g, f: g + heuristic, parent: currentRecord });
      open.push(node);
    }
  }

  if (!found) return { path: null, reason: "No route through current doors and obstacles" };
  const raw = [];
  for (let record = found; record; record = record.parent) raw.push({ x: record.node.px, y: record.node.py });
  raw.reverse();
  raw.push({ ...goal });
  const smoothed = [];
  let anchor = { x: start.x, y: start.y };
  let index = 1;
  while (index < raw.length) {
    let farthest = index;
    for (let probe = index + 1; probe < raw.length; probe += 1) {
      if (!lineValid(anchor, raw[probe])) break;
      farthest = probe;
    }
    smoothed.push(raw[farthest]);
    anchor = raw[farthest];
    index = farthest + 1;
  }
  return { path: smoothed, reason: "" };
}

function followPath(character, path, distance) {
  if (!path.length) { character.moving = false; return true; }
  const point = path[0];
  const dx = point.x - character.x;
  const dy = point.y - character.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining < 4) { path.shift(); return !path.length; }
  moveCharacter(character, dx, dy, Math.min(distance, remaining));
  return false;
}

function nearestValidPoint(point) {
  if (validPosition(point.x, point.y)) return point;
  for (let radius = 12; radius <= 96; radius += 12) {
    for (let angle = 0; angle < TAU; angle += Math.PI / 8) {
      const candidate = { x: point.x + Math.cos(angle) * radius, y: point.y + Math.sin(angle) * radius };
      if (validPosition(candidate.x, candidate.y)) return candidate;
    }
  }
  return null;
}

function cancelAutoPath(reason = "Manual control") {
  state.autoPath.length = 0;
  state.interactionPosition = null;
  state.pathState = reason;
  state.pathFailure = "";
}

function executeAction(action, object) {
  state.selectedAction = action;
  controlled().facing = facingFrom(object.x - controlled().x, object.y - controlled().y);
  if (action.range === "immediate") {
    cancelAutoPath("Immediate action complete");
    state.completedActions.add(`${object.id}:${action.id}`);
    showToast(action.result);
    return;
  }

  const attempts = object.positions.map((position) => ({ position, result: findPath(controlled(), position) }));
  const valid = attempts.filter((attempt) => attempt.result.path).sort((a, b) => a.result.path.length - b.result.path.length)[0];
  if (!valid) {
    state.autoPath.length = 0;
    state.interactionPosition = object.positions[0] ?? null;
    state.pathFailure = attempts[0]?.result.reason ?? "No authored Interaction Position";
    state.pathState = action.expectedFailure ? "EXPECTED FAILURE" : "FAILED";
    showToast(action.expectedFailure
      ? "Blocked-path diagnostic: IP1 is intentionally obstructed; no one teleports."
      : `Path failed: ${state.pathFailure}`, true);
    return;
  }
  state.interactionPosition = { ...valid.position };
  state.autoPath = valid.result.path;
  state.pathFailure = "";
  state.pathState = "Approaching Interaction Position";
  showToast(`Auto-pathing ${controlled().marker} to ${object.name}`);
}

function completeProximityAction() {
  const object = selectedObject();
  const action = state.selectedAction;
  if (!object || !action) return;
  controlled().facing = facingFrom(object.x - controlled().x, object.y - controlled().y);
  state.completedActions.add(`${object.id}:${action.id}`);
  state.pathState = "Arrived · facing target · action complete";
  showToast(action.result);
}

function followerSlots() {
  const leader = controlled();
  const forward = facingVector(leader.facing);
  const side = { x: -forward.y, y: forward.x };
  const followers = state.characters.filter((_, index) => index !== state.controlledIndex);
  return followers.map((character, index) => {
    const lateral = index === 0 ? -42 : 42;
    const desired = {
      x: leader.x - forward.x * 74 + side.x * lateral,
      y: leader.y - forward.y * 74 + side.y * lateral,
    };
    return { character, target: nearestValidPoint(desired) };
  });
}

function repathFollowers() {
  for (const { character, target } of followerSlots()) {
    character.target = target;
    if (!target) { character.path = []; character.followState = "No valid target"; continue; }
    if (distanceBetween(character, target) < 24) { character.path = []; character.followState = "Holding visible position"; continue; }
    const result = findPath(character, target);
    character.path = result.path ?? [];
    character.followState = result.path ? `Following · ${result.path.length} waypoint${result.path.length === 1 ? "" : "s"}` : `Held · ${result.reason}`;
  }
}

function switchControl(index) {
  if (index === state.controlledIndex || !state.characters[index]) return;
  cancelAutoPath("Control swapped");
  state.controlledIndex = index;
  state.followerRepathTimer = 0;
  state.characters.forEach((character) => { character.path = []; });
  showToast(`Direct control switched to ${controlled().label}`);
}

function areaFor(character) {
  if (character.x > 890) return { name: "Cargo transfer bay", distance: 1.18 };
  if (character.y > 425) return { name: "Signal workshop", distance: 1.02 };
  return { name: "Docking spine", distance: 0.88 };
}

function update(dt) {
  state.characters.forEach((character) => { character.moving = false; });
  if (!state.capturePaused) {
    let dx = (state.keys.has("d") ? 1 : 0) - (state.keys.has("a") ? 1 : 0);
    let dy = (state.keys.has("s") ? 1 : 0) - (state.keys.has("w") ? 1 : 0);
    const manual = Math.hypot(dx, dy) > 0;
    state.collision = false;
    if (manual) {
      if (state.autoPath.length) cancelAutoPath("Manual override cancelled auto-path");
      moveCharacter(controlled(), dx, dy, ACCEPTED.speed * dt);
    } else if (state.autoPath.length) {
      const arrived = followPath(controlled(), state.autoPath, ACCEPTED.speed * dt);
      if (arrived && state.selectedAction?.range === "proximity") completeProximityAction();
    }

    state.followerRepathTimer -= dt;
    if (state.followerRepathTimer <= 0) { repathFollowers(); state.followerRepathTimer = .28; }
    for (const character of state.characters.filter((_, index) => index !== state.controlledIndex)) {
      const gap = distanceBetween(character, controlled());
      const speed = gap > 240 ? 235 : 205;
      if (character.path.length) followPath(character, character.path, speed * dt);
    }
  }

  const area = areaFor(controlled());
  state.area = area.name;
  const targetZoom = 1.08 / (ACCEPTED.distance * area.distance * (state.tactical ? ACCEPTED.pullback : 1));
  state.camera.zoom += (targetZoom - state.camera.zoom) * (1 - Math.exp(-3.4 * dt));
  const followRate = 1 - Math.exp(-(25 / ACCEPTED.softness) * dt);
  const leadVector = controlled().moving ? facingVector(controlled().facing) : { x: 0, y: 0 };
  state.camera.x += (controlled().x + leadVector.x * 52 - state.camera.x) * followRate;
  state.camera.y += (controlled().y + leadVector.y * 52 - state.camera.y) * followRate;
  updateUI();
}

function polygon(points, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
}

function rectPoints(rect) {
  return [worldToScreen(rect.x,rect.y),worldToScreen(rect.x+rect.w,rect.y),worldToScreen(rect.x+rect.w,rect.y+rect.h),worldToScreen(rect.x,rect.y+rect.h)];
}

function drawFloor(floor) {
  polygon(rectPoints(floor), floor.color, "rgba(127,200,190,.13)");
  ctx.save(); ctx.strokeStyle = "rgba(152,206,198,.055)";
  for (let x = floor.x + 40; x < floor.x + floor.w; x += 80) {
    const a = worldToScreen(x,floor.y), b = worldToScreen(x,floor.y+floor.h);
    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
  }
  for (let y = floor.y + 40; y < floor.y + floor.h; y += 80) {
    const a = worldToScreen(floor.x,y), b = worldToScreen(floor.x+floor.w,y);
    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
  }
  ctx.restore();
}

function drawFloorDetails() {
  const markings = [
    {x:80,y:303,w:610,h:8,color:"rgba(237,170,71,.24)"}, {x:80,y:350,w:610,h:4,color:"rgba(237,170,71,.13)"},
    {x:975,y:310,w:520,h:12,color:"rgba(126,230,213,.1)"}, {x:1030,y:600,w:350,h:7,color:"rgba(237,170,71,.18)"},
  ];
  markings.forEach((marking) => polygon(rectPoints(marking), marking.color));
  for (const mote of dust) {
    if (!floors.some((floor) => contains(floor,mote.x,mote.y))) continue;
    const p = worldToScreen(mote.x,mote.y); ctx.fillStyle = `rgba(196,222,216,${mote.alpha})`; ctx.fillRect(p.x,p.y-8,mote.size,mote.size);
  }
  const labels = [[420,328,"DOCKING SPINE / C-04"],[1265,320,"CARGO TRANSFER BAY"],[520,625,"SIGNAL WORKSHOP"]];
  ctx.font = `${Math.max(8,9*state.camera.zoom)}px ui-monospace, monospace`; ctx.textAlign = "center"; ctx.fillStyle = "rgba(166,205,198,.24)";
  labels.forEach(([x,y,label]) => { const p=worldToScreen(x,y); ctx.fillText(label,p.x,p.y); });
}

function drawBox(obstacle) {
  const base = rectPoints(obstacle);
  const lift = obstacle.height * BASE_HEIGHT_SCALE * projectionExtrusionRatio() * state.camera.zoom;
  const top = base.map((point) => ({ x: point.x, y: point.y - lift }));
  const colors = obstacle.kind === "cover" ? ["#273337","#39494b","#20292d"] : obstacle.kind === "debris" ? ["#372f2a","#493a2e","#292421"] : ["#263239","#30434a","#1c282d"];
  polygon([base[1],base[2],top[2],top[1]],colors[2]); polygon([base[2],base[3],top[3],top[2]],colors[0]); polygon(top,colors[1],"rgba(180,225,216,.18)");
}

function pointSegmentDistance(point, a, b) {
  const vx=b.x-a.x, vy=b.y-a.y, denominator=vx*vx+vy*vy;
  const t=denominator?clamp(((point.x-a.x)*vx+(point.y-a.y)*vy)/denominator,0,1):0;
  return Math.hypot(point.x-(a.x+vx*t),point.y-(a.y+vy*t));
}

function drawWall(wall) {
  const [x1,y1,x2,y2]=wall, a=worldToScreen(x1,y1), b=worldToScreen(x2,y2);
  const lift=44*projectionExtrusionRatio()*state.camera.zoom;
  let alpha=1;
  if (state.occlusion && Math.max(y1,y2)>controlled().y && pointSegmentDistance(worldToScreen(controlled().x,controlled().y),a,b)<68) alpha=.16;
  ctx.save(); ctx.globalAlpha=alpha;
  polygon([a,b,{x:b.x,y:b.y-lift},{x:a.x,y:a.y-lift}],"#243238","rgba(151,202,194,.18)");
  ctx.restore();
}

function drawObject(object) {
  const p=worldToScreen(object.x,object.y), selected=object.id===state.selectedObjectId;
  const pulse=.55+Math.sin(performance.now()/280)*.18;
  ctx.save(); ctx.translate(p.x,p.y-12*state.camera.zoom);
  ctx.fillStyle=object.kind==="sealed"?"#3c2929":"#102128";
  ctx.strokeStyle=selected?`rgba(126,230,213,${pulse+.25})`:object.kind==="sealed"?"rgba(255,122,115,.4)":"rgba(126,230,213,.35)";
  ctx.lineWidth=selected?3:2; ctx.beginPath(); ctx.roundRect(-16,-18,32,30,4); ctx.fill(); ctx.stroke();
  ctx.fillStyle=object.kind==="sealed"?"#ff7a73":"#7ee6d5"; ctx.fillRect(-8,-10,16,7);
  if (selected) { ctx.beginPath(); ctx.ellipse(0,16,object.radius*.8,13,0,0,TAU); ctx.stroke(); }
  ctx.restore();
}

function drawHumanoid(character, index) {
  const p=worldToScreen(character.x,character.y), v=facingVector(character.facing);
  const screenAngle=Math.atan2(v.y*projectionDepthScale(),v.x);
  const z=state.camera.zoom, gait=character.moving?Math.sin(performance.now()/90+index*1.7):0;
  ctx.save(); ctx.translate(p.x,p.y);
  ctx.fillStyle="rgba(0,0,0,.38)"; ctx.beginPath(); ctx.ellipse(0,7*z,22*z,10*z,0,0,TAU); ctx.fill();
  if (index===state.controlledIndex) {
    ctx.strokeStyle="#eafffb"; ctx.lineWidth=2; ctx.setLineDash([5,4]); ctx.beginPath(); ctx.ellipse(0,3*z,28*z,16*z,0,0,TAU); ctx.stroke(); ctx.setLineDash([]);
  }
  ctx.rotate(screenAngle);
  ctx.strokeStyle=character.accent; ctx.lineCap="round"; ctx.lineWidth=5*z;
  ctx.beginPath(); ctx.moveTo(-5*z,-6*z); ctx.lineTo((-15+gait*3)*z,-7*z); ctx.moveTo(-5*z,6*z); ctx.lineTo((-15-gait*3)*z,7*z); ctx.stroke();
  ctx.lineWidth=4*z; ctx.beginPath(); ctx.moveTo(1*z,-7*z); ctx.lineTo((-2-gait*2)*z,-14*z); ctx.moveTo(1*z,7*z); ctx.lineTo((-2+gait*2)*z,14*z); ctx.stroke();
  ctx.fillStyle=character.color; ctx.strokeStyle=character.accent; ctx.lineWidth=1.5*z;
  ctx.beginPath(); ctx.roundRect(-8*z,-8*z,18*z,16*z,6*z); ctx.fill(); ctx.stroke();
  ctx.fillStyle=character.accent; ctx.beginPath(); ctx.arc(15*z,0,6.5*z,0,TAU); ctx.fill();
  ctx.fillStyle="#091015"; ctx.beginPath(); ctx.arc(18*z,-2*z,1.8*z,0,TAU); ctx.fill();
  ctx.restore();
  ctx.fillStyle=character.accent; ctx.font=`bold ${Math.max(9,10*z)}px ui-monospace, monospace`; ctx.textAlign="center"; ctx.fillText(character.marker,p.x,p.y-27*z);
}

function drawDiagnostics() {
  if (!state.diagnostics) return;
  for (const object of worldObjects) {
    object.positions.forEach((position,index) => {
      const p=worldToScreen(position.x,position.y), valid=validPosition(position.x,position.y);
      ctx.strokeStyle=valid?"rgba(126,230,213,.8)":"rgba(255,122,115,.9)"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(p.x,p.y,10,0,TAU); ctx.stroke();
      ctx.fillStyle=valid?"#7ee6d5":"#ff7a73"; ctx.font="9px ui-monospace, monospace";
      ctx.fillText(valid?`IP${index+1} · VALID`:`IP${index+1} · BLOCKED TEST`,p.x,p.y-13);
    });
  }
  const drawPath=(start,path,color) => {
    if (!path.length) return; ctx.strokeStyle=color; ctx.lineWidth=2; ctx.setLineDash([6,5]); ctx.beginPath();
    const first=worldToScreen(start.x,start.y); ctx.moveTo(first.x,first.y);
    path.forEach((point)=>{const p=worldToScreen(point.x,point.y);ctx.lineTo(p.x,p.y);}); ctx.stroke(); ctx.setLineDash([]);
  };
  drawPath(controlled(),state.autoPath,"rgba(244,182,95,.95)");
  state.characters.filter((_,index)=>index!==state.controlledIndex).forEach((character)=>{
    drawPath(character,character.path,"rgba(169,138,232,.6)");
    if(character.target){const p=worldToScreen(character.target.x,character.target.y);ctx.strokeStyle="rgba(169,138,232,.8)";ctx.beginPath();ctx.arc(p.x,p.y,8,0,TAU);ctx.stroke();}
  });
  state.capturedPositions.forEach((capture)=>{
    const p=worldToScreen(capture.x,capture.y);ctx.strokeStyle="#f4b65f";ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.x,p.y,25,0,TAU);ctx.stroke();
    ctx.fillStyle="#f4b65f";ctx.font="bold 11px ui-monospace, monospace";ctx.fillText(`CAP ${capture.marker}`,p.x,p.y+4);
  });
}

function render() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  const bg=ctx.createRadialGradient(innerWidth*.5,innerHeight*.5,50,innerWidth*.5,innerHeight*.5,innerWidth*.72);
  bg.addColorStop(0,"#111b20");bg.addColorStop(1,"#070b0e");ctx.fillStyle=bg;ctx.fillRect(0,0,innerWidth,innerHeight);
  floors.forEach(drawFloor); drawFloorDetails();
  const drawables=[
    ...obstacles.map((obstacle)=>({depth:obstacle.y+obstacle.h,draw:()=>drawBox(obstacle)})),
    ...walls.map((wall)=>({depth:Math.max(wall[1],wall[3]),draw:()=>drawWall(wall)})),
    ...worldObjects.map((object)=>({depth:object.y,draw:()=>drawObject(object)})),
    ...state.characters.map((character,index)=>({depth:character.y,draw:()=>drawHumanoid(character,index)})),
  ].sort((a,b)=>a.depth-b.depth);
  drawables.forEach((item)=>item.draw()); drawDiagnostics();
  ctx.fillStyle="rgba(4,8,10,.12)";ctx.fillRect(0,0,innerWidth,innerHeight);
}

function openContext(object) {
  cancelAutoPath("Object selected");
  state.selectedObjectId=object.id; state.selectedAction=null;
  controlled().facing=facingFrom(object.x-controlled().x,object.y-controlled().y);
  ui.contextTitle.textContent=object.name; ui.contextDescription.textContent=object.description; ui.contextActions.replaceChildren();
  object.actions.forEach((action)=>{
    const button=document.createElement("button");
    const label=document.createElement("span"); label.textContent=action.label;
    const range=document.createElement("small");
    range.textContent=action.range==="immediate"?"IMMEDIATE":action.expectedFailure?"EXPECTED FAILURE":"AUTO-APPROACH";
    button.append(label,range); button.addEventListener("click",()=>executeAction(action,object)); ui.contextActions.append(button);
  });
  ui.contextMenu.classList.remove("hidden"); showToast(`${object.name} selected`);
}

function closeContext() { ui.contextMenu.classList.add("hidden"); }

function updateUI() {
  ui.areaBadge.textContent=state.area;
  const object=selectedObject();
  const action=state.selectedAction;
  ui.controlledReadout.textContent=controlled().label;
  ui.selectedReadout.textContent=object?.name??"None";
  ui.actionReadout.textContent=action?`${action.label} · ${action.range}`:"None";
  ui.facingReadout.textContent=controlled().facing;
  ui.targetReadout.textContent=object?`${object.name} (${Math.round(object.x)}, ${Math.round(object.y)})`:"None";
  ui.positionReadout.textContent=state.interactionPosition?`(${Math.round(state.interactionPosition.x)}, ${Math.round(state.interactionPosition.y)})`:"None";
  ui.pathReadout.textContent=state.autoPath.length?`${state.autoPath.length} waypoint${state.autoPath.length===1?"":"s"}`:"Idle";
  ui.pathStateReadout.textContent=state.pathFailure?`${state.pathState}: ${state.pathFailure}`:state.pathState;
  const followers=state.characters.filter((_,index)=>index!==state.controlledIndex);
  const followerText=(character)=>character.target?`${character.marker} → (${Math.round(character.target.x)}, ${Math.round(character.target.y)}) · ${character.followState}`:`${character.marker} · ${character.followState}`;
  ui.followerOneReadout.textContent=followerText(followers[0]); ui.followerTwoReadout.textContent=followerText(followers[1]);
  ui.captureReadout.textContent=state.capturedPositions.length?state.capturedPositions.map((p)=>`${p.marker}(${Math.round(p.x)},${Math.round(p.y)})`).join(" · "):"None";
  ui.tacticalButton.classList.toggle("active",state.tactical); ui.tacticalState.textContent=state.tactical?"ON":"OFF";
  ui.captureButton.classList.toggle("active",state.capturePaused); ui.captureState.textContent=state.capturePaused?"PAUSED":"READY";
  ui.pauseOverlay.classList.toggle("hidden",!state.capturePaused);
  if (state.completedActions.size>=3) {
    ui.objectiveTitle.textContent="Capture Tactical Pressure positions";
    ui.objectiveText.textContent="Press P anywhere, confirm the markers match all three visible people, then resume and swap control.";
  } else if (object) {
    ui.objectiveTitle.textContent=`Compare actions on ${object.name}`;
    ui.objectiveText.textContent="Try the immediate action, then auto-approach. WASD should cancel a running path immediately.";
  } else {
    ui.objectiveTitle.textContent="Direct a crewmate, then select an object";
    ui.objectiveText.textContent="Click a person (or press 1–3), use WASD, then click an object. IP circles are diagnostics, not movement commands.";
  }
}

function setTactical(value) {
  state.tactical=value; showToast(value?"1.70× tactical pullback · viewing angle unchanged":"0.82× Free Movement framing restored");
}

function capturePositions() {
  if (state.capturePaused) { state.capturePaused=false; showToast("Free Movement resumed; captured markers retained"); return; }
  state.capturedPositions=state.characters.map((character)=>({marker:character.marker,x:character.x,y:character.y,facing:character.facing}));
  state.capturePaused=true; state.keys.clear(); showToast("Exact Tactical Pressure starting positions captured");
}

function resetPrototype() {
  state.characters.forEach((character,index)=>Object.assign(character,spawns[index],{facing:"E",path:[],target:null,followState:"Settling",moving:false}));
  state.controlledIndex=0; Object.assign(state.camera,spawns[0],{zoom:1}); state.keys.clear(); state.tactical=false;
  state.selectedObjectId=null;state.selectedAction=null;state.interactionPosition=null;state.autoPath=[];state.pathState="Manual control";state.pathFailure="";
  state.completedActions.clear();state.capturedPositions=[];state.capturePaused=false;state.followerRepathTimer=0;closeContext();showToast("Disposable prototype reset to accepted Tight baseline");
}

function showToast(message, failure=false) {
  clearTimeout(state.toastTimer);ui.toast.textContent=message;ui.toast.classList.toggle("failure",failure);ui.toast.classList.add("visible");
  state.toastTimer=setTimeout(()=>ui.toast.classList.remove("visible"),2200);
}

ui.tacticalButton.addEventListener("click",()=>setTactical(!state.tactical));
ui.captureButton.addEventListener("click",capturePositions);
ui.diagnosticToggle.addEventListener("change",()=>{state.diagnostics=ui.diagnosticToggle.checked;});
ui.occlusion.addEventListener("change",()=>{state.occlusion=ui.occlusion.checked;});
ui.closeContext.addEventListener("click",closeContext);
document.querySelector("#resetButton").addEventListener("click",resetPrototype);

window.addEventListener("keydown",(event)=>{
  const key=event.key.toLowerCase();
  if (["w","a","s","d"].includes(key)) {
    state.keys.add(key); event.preventDefault();
    if (!event.repeat && !state.capturePaused) {
      if (state.autoPath.length) cancelAutoPath("Manual override cancelled auto-path");
      const tapX=(key==="d"?1:0)-(key==="a"?1:0);
      const tapY=(key==="s"?1:0)-(key==="w"?1:0);
      moveCharacter(controlled(),tapX,tapY,ACCEPTED.speed/60);
    }
  }
  if (event.repeat) return;
  if (["1","2","3"].includes(key)) switchControl(Number(key)-1);
  if (key==="tab") { event.preventDefault(); switchControl((state.controlledIndex+1)%state.characters.length); }
  if (key==="t") setTactical(!state.tactical);
  if (key==="p") capturePositions();
  if (key==="g") { state.diagnostics=!state.diagnostics;ui.diagnosticToggle.checked=state.diagnostics;showToast(`Diagnostics ${state.diagnostics?"shown":"hidden"}`); }
  if (key==="r") resetPrototype();
  if (key==="escape") closeContext();
});
window.addEventListener("keyup",(event)=>state.keys.delete(event.key.toLowerCase()));
window.addEventListener("blur",()=>state.keys.clear());
window.addEventListener("resize",resize);

canvas.addEventListener("click",(event)=>{
  if (state.capturePaused) return;
  const world=screenToWorld(event.clientX,event.clientY);
  const clickedCharacter=state.characters.findIndex((character)=>distanceBetween(world,character)<CHARACTER_RADIUS+18);
  if(clickedCharacter>=0){
    state.selectedObjectId=null;state.selectedAction=null;closeContext();
    if(clickedCharacter===state.controlledIndex) showToast(`${controlled().label} already controlled · use WASD to move`);
    else switchControl(clickedCharacter);
    return;
  }
  const clickedSocket=worldObjects.find((candidate)=>candidate.positions.some((position)=>distanceBetween(world,position)<24));
  if(clickedSocket){
    openContext(clickedSocket);
    showToast("IP markers are diagnostics only — choose an action on the object");
    return;
  }
  const object=worldObjects.filter((candidate)=>distanceBetween(world,candidate)<candidate.radius+24).sort((a,b)=>distanceBetween(world,a)-distanceBetween(world,b))[0];
  if (object) openContext(object);
  else { state.selectedObjectId=null;state.selectedAction=null;closeContext(); }
});

function frame(now) {
  const dt=Math.min((now-state.lastTime)/1000,.05);state.lastTime=now;update(dt);render();requestAnimationFrame(frame);
}

resize();updateUI();requestAnimationFrame(frame);
