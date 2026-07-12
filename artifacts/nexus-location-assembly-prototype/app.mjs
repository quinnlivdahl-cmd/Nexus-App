import {
  ACCEPTED_MOVEMENT_CAMERA_INPUTS,
  ACTOR_RADIUS,
  INVALID_BLUEPRINT,
  VALID_BLUEPRINT,
  assembleLocation,
  getAreaAt,
} from "./assembly.mjs";
import { buildReviewTraversal, moveWithCollision, tracePath } from "./navigation.mjs";

const canvas = document.querySelector("#worldCanvas");
const context = canvas.getContext("2d");
const elements = {
  validButton: document.querySelector("#validBlueprintButton"),
  invalidButton: document.querySelector("#invalidBlueprintButton"),
  traversalButton: document.querySelector("#traversalButton"),
  resetButton: document.querySelector("#resetButton"),
  validationBadge: document.querySelector("#validationBadge"),
  activeBlueprintName: document.querySelector("#activeBlueprintName"),
  assemblySummary: document.querySelector("#assemblySummary"),
  validationResults: document.querySelector("#validationResults"),
  validationCount: document.querySelector("#validationCount"),
  moduleList: document.querySelector("#moduleList"),
  moduleCount: document.querySelector("#moduleCount"),
  liveState: document.querySelector("#liveState"),
  activeAreaLabel: document.querySelector("#activeAreaLabel"),
  visitedAreas: document.querySelector("#visitedAreas"),
  canvasStatus: document.querySelector("#canvasStatus"),
  sceneCaption: document.querySelector("#sceneCaption"),
  layerLegend: document.querySelector("#layerLegend"),
  fadeControl: document.querySelector("#fadeControl"),
  fadeControlLabel: document.querySelector(".fade-control"),
};

const blueprintCases = {
  valid: VALID_BLUEPRINT,
  invalid: INVALID_BLUEPRINT,
};

const state = {
  caseId: "valid",
  assembly: assembleLocation(VALID_BLUEPRINT),
  actor: { ...VALID_BLUEPRINT.actorStart },
  direction: { x: 1, y: 0 },
  camera: { x: VALID_BLUEPRINT.actorStart.x, y: VALID_BLUEPRINT.actorStart.y, zoom: 1 },
  tactical: false,
  keys: new Set(),
  visitedAreas: new Set(["area-docking-spine"]),
  inspectionMode: "scene",
  fadeOcclusion: false,
  route: null,
  traversal: null,
  lastFrame: performance.now(),
  lastDomUpdate: 0,
};

const INSPECTION_LEGENDS = {
  scene: {
    title: "Scene only",
    copy: "Recognizable test-art dressing is shown without technical markup. Walk the derelict and judge whether it reads as one place.",
    keys: [["#c59652", "bulkheads + doors"], ["#7b8b86", "ship fixtures"]],
  },
  assembly: {
    title: "Modules + joined seams",
    copy: "Dashed boundaries identify placed modules. Green seam bars are aligned joins; red and amber bars expose a mismatch.",
    keys: [["#68dfa7", "valid seam"], ["#ff706c", "invalid seam"]],
  },
  navigation: {
    title: "Navigable space",
    copy: "Blue-green tint is the transformed floor union used by actor-radius collision across all three Areas.",
    keys: [["#62d7e8", "walkable floor"]],
  },
  interactions: {
    title: "Interactions",
    copy: "Diamonds are interaction sockets. Rings are authored Interaction Positions; dashed lines show their fixture relationship.",
    keys: [["#70d9ff", "socket"], ["#bdefff", "position"]],
  },
  occlusion: {
    title: "Occlusion geometry",
    copy: "Red lines expose authored foreground-occlusion segments separately from physical props and Cover Positions.",
    keys: [["#ee6f74", "occluder"]],
  },
  cover: {
    title: "Cover metadata",
    copy: "Every cover object exposes authored positions on all four navigable sides. Each amber wedge points back toward the object providing protection.",
    keys: [["#f5b95e", "cover + arc"]],
  },
  path: {
    title: "Traversal route",
    copy: "The dashed cyan route is the deterministic browser-smoke path through Docking Spine, Cargo Bay, and Workshop.",
    keys: [["#62d7e8", "guided route"]],
  },
};

const tiltCosine = Math.cos((ACCEPTED_MOVEMENT_CAMERA_INPUTS.tiltFromOverheadDegrees * Math.PI) / 180);

function hexToRgba(hex, alpha) {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function project(point) {
  return {
    x: canvas.clientWidth / 2 + (point.x - state.camera.x) * state.camera.zoom,
    y: canvas.clientHeight / 2 + (point.y - state.camera.y) * tiltCosine * state.camera.zoom,
  };
}

function drawWorldRect(rect, options = {}) {
  const topLeft = project({ x: rect.x, y: rect.y });
  const bottomRight = project({ x: rect.x + rect.w, y: rect.y + rect.h });
  const width = bottomRight.x - topLeft.x;
  const height = bottomRight.y - topLeft.y;
  if (options.fill) {
    context.fillStyle = options.fill;
    context.fillRect(topLeft.x, topLeft.y, width, height);
  }
  if (options.stroke) {
    context.strokeStyle = options.stroke;
    context.lineWidth = options.lineWidth ?? 1;
    context.setLineDash(options.dash ?? []);
    context.strokeRect(topLeft.x, topLeft.y, width, height);
    context.setLineDash([]);
  }
}

function drawWorldLine(a, b, options = {}) {
  const start = project(a);
  const end = project(b);
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.strokeStyle = options.stroke ?? "#ffffff";
  context.lineWidth = options.lineWidth ?? 1;
  context.globalAlpha = options.alpha ?? 1;
  context.setLineDash(options.dash ?? []);
  context.stroke();
  context.setLineDash([]);
  context.globalAlpha = 1;
}

function drawWorldCircle(point, radius, options = {}) {
  const screen = project(point);
  context.beginPath();
  context.ellipse(
    screen.x,
    screen.y,
    radius * state.camera.zoom,
    radius * state.camera.zoom * tiltCosine,
    0,
    0,
    Math.PI * 2,
  );
  if (options.fill) {
    context.fillStyle = options.fill;
    context.fill();
  }
  if (options.stroke) {
    context.strokeStyle = options.stroke;
    context.lineWidth = options.lineWidth ?? 1;
    context.stroke();
  }
}

function drawLabel(point, text, options = {}) {
  const screen = project(point);
  context.font = options.font ?? "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textBaseline = "middle";
  context.textAlign = options.align ?? "center";
  const metrics = context.measureText(text);
  const padding = 4;
  const x = options.align === "left" ? screen.x : screen.x - metrics.width / 2 - padding;
  context.fillStyle = options.background ?? "rgba(4, 11, 14, 0.82)";
  context.fillRect(x - (options.align === "left" ? padding : 0), screen.y - 8, metrics.width + padding * 2, 16);
  context.fillStyle = options.color ?? "#d9e7eb";
  context.fillText(text, screen.x, screen.y);
}

function drawDiamond(point, radius, fill, stroke) {
  const screen = project(point);
  context.beginPath();
  context.moveTo(screen.x, screen.y - radius);
  context.lineTo(screen.x + radius, screen.y);
  context.lineTo(screen.x, screen.y + radius);
  context.lineTo(screen.x - radius, screen.y);
  context.closePath();
  context.fillStyle = fill;
  context.fill();
  context.strokeStyle = stroke;
  context.lineWidth = 1.5;
  context.stroke();
}

function drawPlainText(point, text, options = {}) {
  const screen = project(point);
  context.save();
  context.font = options.font ?? "700 12px ui-sans-serif, system-ui, sans-serif";
  context.textBaseline = options.baseline ?? "middle";
  context.textAlign = options.align ?? "center";
  context.fillStyle = options.color ?? "#dbe2df";
  context.globalAlpha = options.alpha ?? 1;
  context.fillText(text, screen.x, screen.y);
  context.restore();
}

function drawDerelictFloor(module) {
  for (const rect of module.navRects) {
    drawWorldRect(rect, {
      fill: hexToRgba(module.color, 0.12),
      stroke: "rgba(153, 166, 160, 0.34)",
      lineWidth: 1.5,
    });
    for (let x = rect.x + 72; x < rect.x + rect.w; x += 92) {
      drawWorldLine({ x, y: rect.y }, { x, y: rect.y + rect.h }, {
        stroke: "rgba(134, 150, 145, 0.11)",
        lineWidth: 1,
      });
    }
    for (let y = rect.y + 64; y < rect.y + rect.h; y += 80) {
      drawWorldLine({ x: rect.x, y }, { x: rect.x + rect.w, y }, {
        stroke: "rgba(134, 150, 145, 0.09)",
        lineWidth: 1,
      });
    }
  }

  const labelSize = Math.max(12, Math.min(22, 17 * state.camera.zoom));
  drawPlainText({ x: module.focus.x, y: module.focus.y - 4 }, module.name.toUpperCase(), {
    font: `800 ${labelSize}px ui-sans-serif, system-ui, sans-serif`,
    color: "#c8d0cc",
    alpha: 0.36,
  });
  drawPlainText({ x: module.focus.x, y: module.focus.y + 20 }, "DERELICT DECK", {
    font: "700 8px ui-monospace, SFMono-Regular, monospace",
    color: module.color,
    alpha: 0.56,
  });
}

function drawDerelictWall(occluder) {
  const midpoint = { x: (occluder.a.x + occluder.b.x) / 2, y: (occluder.a.y + occluder.b.y) / 2 };
  const distance = Math.hypot(midpoint.x - state.actor.x, midpoint.y - state.actor.y);
  const inFront = midpoint.y > state.actor.y;
  const alpha = state.fadeOcclusion && inFront && distance < 110 ? 0.2 : 1;
  drawWorldLine(
    { x: occluder.a.x + 3, y: occluder.a.y + 5 },
    { x: occluder.b.x + 3, y: occluder.b.y + 5 },
    { stroke: "rgba(0, 0, 0, 0.66)", lineWidth: 15, alpha: alpha * 0.72 },
  );
  drawWorldLine(occluder.a, occluder.b, { stroke: "#252f2f", lineWidth: 13, alpha });
  drawWorldLine(occluder.a, occluder.b, { stroke: "#6d7974", lineWidth: 3, alpha: alpha * 0.86 });
}

function drawPressureDoor(connection) {
  drawWorldLine(connection.a, connection.b, { stroke: "#171d1d", lineWidth: 17 });
  drawWorldLine(connection.a, connection.b, { stroke: "#b8863f", lineWidth: 10, alpha: 0.9 });
  drawWorldLine(connection.a, connection.b, { stroke: "#293434", lineWidth: 5 });
  const midpoint = { x: (connection.a.x + connection.b.x) / 2, y: (connection.a.y + connection.b.y) / 2 };
  drawPlainText(midpoint, connection.type.includes("bulkhead.large") ? "CARGO BULKHEAD" : "PRESSURE DOOR", {
    font: "800 8px ui-monospace, SFMono-Regular, monospace",
    color: "#f1c97d",
  });
}

function drawProp(obstacle) {
  const fills = {
    cover: ["#574b37", "#a98a58"],
    machine: ["#263b3e", "#71aab1"],
    occluder: ["#343137", "#756f7a"],
    clutter: ["#40382e", "#82705a"],
  };
  const [fill, stroke] = fills[obstacle.role] ?? fills.clutter;
  drawWorldRect({ x: obstacle.x + 5, y: obstacle.y + 7, w: obstacle.w, h: obstacle.h }, {
    fill: "rgba(0, 0, 0, 0.42)",
  });
  drawWorldRect(obstacle, { fill, stroke, lineWidth: 2 });

  if (obstacle.sourceId.includes("cargo-cover") || obstacle.sourceId.includes("crates")) {
    const count = Math.max(2, Math.round(obstacle.w / 55));
    for (let index = 1; index < count; index += 1) {
      const x = obstacle.x + (obstacle.w * index) / count;
      drawWorldLine({ x, y: obstacle.y + 5 }, { x, y: obstacle.y + obstacle.h - 5 }, {
        stroke: "rgba(224, 189, 125, 0.42)",
        lineWidth: 2,
      });
    }
    drawWorldLine(
      { x: obstacle.x + 7, y: obstacle.y + obstacle.h * 0.32 },
      { x: obstacle.x + obstacle.w - 7, y: obstacle.y + obstacle.h * 0.32 },
      { stroke: "rgba(27, 23, 18, 0.7)", lineWidth: 4 },
    );
  } else if (obstacle.sourceId.includes("machine")) {
    for (let y = obstacle.y + 24; y < obstacle.y + obstacle.h - 10; y += 36) {
      drawWorldRect({ x: obstacle.x + 12, y, w: obstacle.w - 24, h: 18 }, {
        fill: "#162426",
        stroke: "#557f83",
      });
      drawWorldCircle({ x: obstacle.x + obstacle.w - 18, y: y + 9 }, 3, { fill: "#e1a44b" });
    }
  } else if (obstacle.sourceId.includes("shelves")) {
    for (let y = obstacle.y + 22; y < obstacle.y + obstacle.h; y += 24) {
      drawWorldLine({ x: obstacle.x + 5, y }, { x: obstacle.x + obstacle.w - 5, y }, {
        stroke: "#bd9c67",
        lineWidth: 3,
      });
    }
  } else if (obstacle.sourceId.includes("junk")) {
    for (let index = 0; index < 6; index += 1) {
      const x = obstacle.x + 14 + ((index * 31) % Math.max(18, obstacle.w - 28));
      const y = obstacle.y + 14 + ((index * 19) % Math.max(18, obstacle.h - 28));
      drawWorldCircle({ x, y }, 8 + (index % 3) * 2, { stroke: index % 2 ? "#a06748" : "#597979", lineWidth: 2 });
    }
  } else if (obstacle.sourceId.includes("debris")) {
    for (let index = 0; index < 4; index += 1) {
      drawWorldLine(
        { x: obstacle.x + 8, y: obstacle.y + 9 + index * 10 },
        { x: obstacle.x + obstacle.w - 8, y: obstacle.y + 14 + index * 8 },
        { stroke: index % 2 ? "#9f7146" : "#5d7778", lineWidth: 4 },
      );
    }
  } else if (obstacle.sourceId.includes("partition")) {
    for (let y = obstacle.y + 20; y < obstacle.y + obstacle.h; y += 34) {
      drawWorldLine({ x: obstacle.x + 3, y }, { x: obstacle.x + obstacle.w - 3, y }, {
        stroke: "#918b91",
        lineWidth: 2,
      });
    }
  }

  drawPlainText({ x: obstacle.x + obstacle.w / 2, y: obstacle.y + obstacle.h / 2 }, obstacle.label.toUpperCase(), {
    font: "800 8px ui-monospace, SFMono-Regular, monospace",
    color: "#e0d2b8",
    alpha: 0.78,
  });
}

function drawInteractionFixture(interaction) {
  const fixture = {
    x: interaction.socket.x - (interaction.sourceId === "transponder-bench" ? 42 : 24),
    y: interaction.socket.y - 15,
    w: interaction.sourceId === "transponder-bench" ? 84 : 48,
    h: 30,
  };
  drawWorldRect(fixture, { fill: "#233638", stroke: "#78979a", lineWidth: 2 });
  drawWorldRect({ x: fixture.x + 8, y: fixture.y + 6, w: fixture.w - 16, h: 10 }, {
    fill: "#153238",
    stroke: "#4bb3c3",
  });
  drawWorldCircle({ x: fixture.x + fixture.w - 9, y: fixture.y + fixture.h - 7 }, 2.5, { fill: "#e9b457" });
  drawPlainText({ x: fixture.x + fixture.w / 2, y: fixture.y - 9 }, interaction.label.toUpperCase(), {
    font: "800 7px ui-monospace, SFMono-Regular, monospace",
    color: "#aac8c9",
  });
}

function drawCoverArc(cover) {
  const startAngle = cover.arc.centerDeg - cover.arc.spanDeg / 2;
  const points = [{ x: cover.x, y: cover.y }];
  for (let index = 0; index <= 18; index += 1) {
    const degrees = startAngle + (cover.arc.spanDeg * index) / 18;
    const radians = (degrees * Math.PI) / 180;
    points.push({
      x: cover.x + Math.cos(radians) * cover.arc.range,
      y: cover.y + Math.sin(radians) * cover.arc.range,
    });
  }
  context.beginPath();
  points.forEach((point, index) => {
    const screen = project(point);
    if (index === 0) context.moveTo(screen.x, screen.y);
    else context.lineTo(screen.x, screen.y);
  });
  context.closePath();
  context.fillStyle = "rgba(245, 185, 94, 0.12)";
  context.fill();
  context.strokeStyle = "rgba(245, 185, 94, 0.72)";
  context.lineWidth = 1.25;
  context.stroke();
  drawWorldCircle(cover, 7, { fill: "#f5b95e", stroke: "#241709", lineWidth: 2 });
  const side = cover.sourceId.split("-").at(-1).toUpperCase();
  drawLabel({ x: cover.x, y: cover.y + 18 }, `COVER ${side}`, { color: "#ffd99e" });
}

function renderWorld() {
  const backdrop = context.createRadialGradient(
    canvas.clientWidth * 0.5,
    canvas.clientHeight * 0.42,
    20,
    canvas.clientWidth * 0.5,
    canvas.clientHeight * 0.5,
    Math.max(canvas.clientWidth, canvas.clientHeight) * 0.72,
  );
  backdrop.addColorStop(0, "#172221");
  backdrop.addColorStop(1, "#070b0c");
  context.fillStyle = backdrop;
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  for (const module of state.assembly.modules) drawDerelictFloor(module);

  if (state.inspectionMode === "navigation") {
    for (const module of state.assembly.modules) {
      for (const rect of module.navRects) {
        drawWorldRect(rect, { fill: hexToRgba(module.color, 0.24), stroke: "#62d7e8", lineWidth: 2 });
      }
    }
  }

  for (const obstacle of state.assembly.obstacles) drawProp(obstacle);
  for (const occluder of state.assembly.occluders) drawDerelictWall(occluder);

  const renderedDoors = new Set();
  for (const connection of state.assembly.connections) {
    const points = [connection.a, connection.b]
      .map((point) => `${Math.round(point.x)},${Math.round(point.y)}`)
      .sort();
    const key = points.join("|");
    if (renderedDoors.has(key)) continue;
    renderedDoors.add(key);
    drawPressureDoor(connection);
  }

  for (const interaction of state.assembly.interactions) drawInteractionFixture(interaction);

  if (state.inspectionMode === "path" && state.route?.path?.length) {
    for (let index = 0; index < state.route.path.length - 1; index += 1) {
      drawWorldLine(state.route.path[index], state.route.path[index + 1], {
        stroke: "rgba(98, 215, 232, 0.88)",
        lineWidth: 3,
        dash: [7, 5],
      });
    }
  }

  if (state.inspectionMode === "assembly") {
    for (const module of state.assembly.modules) {
      for (const rect of module.navRects) {
        drawWorldRect(rect, { stroke: module.color, lineWidth: 2, dash: [9, 5] });
      }
      drawLabel(module.focus, `${module.id} · ${module.moduleId}`, { color: "#f0fbff" });
    }
    for (const connection of state.assembly.connections) {
      drawWorldLine(connection.a, connection.b, { stroke: "#67dcec", lineWidth: 3 });
      drawWorldCircle(connection.a, 5, { fill: "#67dcec" });
      drawWorldCircle(connection.b, 5, { fill: "#67dcec" });
      const midpoint = { x: (connection.a.x + connection.b.x) / 2, y: (connection.a.y + connection.b.y) / 2 };
      drawLabel(midpoint, connection.key, { color: "#a8f4ff" });
    }
    for (const join of state.assembly.joins) {
      if (!join.from || !join.to) continue;
      const aligned = join.seamOffset <= 0.5;
      drawWorldLine(join.from.a, join.from.b, { stroke: aligned ? "#6ee7a8" : "#ff706c", lineWidth: 7, alpha: 0.72 });
      if (!aligned) {
        drawWorldLine(join.to.a, join.to.b, { stroke: "#f5b95e", lineWidth: 7, alpha: 0.72, dash: [6, 4] });
      }
      for (const sample of join.navSamples ?? []) {
        drawWorldCircle(sample.center, 3.5, { fill: sample.pass ? "#6ee7a8" : "#ff706c" });
      }
    }
  }

  if (state.inspectionMode === "occlusion") {
    for (const occluder of state.assembly.occluders) {
      drawWorldLine(occluder.a, occluder.b, {
        stroke: "#ee6f74",
        lineWidth: Math.max(3, Math.min(6, occluder.height / 16)),
        alpha: 0.9,
      });
      const midpoint = { x: (occluder.a.x + occluder.b.x) / 2, y: (occluder.a.y + occluder.b.y) / 2 };
      drawLabel(midpoint, `${occluder.placementId}:${occluder.sourceId}`, { color: "#ffc1c3" });
    }
  }

  if (state.inspectionMode === "interactions") {
    for (const interaction of state.assembly.interactions) {
      drawDiamond(interaction.socket, 8, "#70d9ff", "#071014");
      drawLabel({ x: interaction.socket.x, y: interaction.socket.y - 19 }, interaction.key, { color: "#a8ebff" });
      for (const position of interaction.positions) {
        drawWorldLine(interaction.socket, position, { stroke: "rgba(112, 217, 255, 0.45)", lineWidth: 1, dash: [4, 4] });
        drawWorldCircle(position, 8, { fill: "rgba(112, 217, 255, 0.16)", stroke: "#70d9ff", lineWidth: 2 });
        drawLabel({ x: position.x, y: position.y + 18 }, position.id, { color: "#bdefff" });
      }
    }
  }

  if (state.inspectionMode === "cover") {
    for (const cover of state.assembly.coverPositions) drawCoverArc(cover);
  }

  const actorScreen = project(state.actor);
  context.beginPath();
  context.ellipse(
    actorScreen.x + 5,
    actorScreen.y + 8,
    ACTOR_RADIUS * state.camera.zoom * 0.9,
    ACTOR_RADIUS * state.camera.zoom * tiltCosine * 0.55,
    0,
    0,
    Math.PI * 2,
  );
  context.fillStyle = "rgba(0, 0, 0, 0.42)";
  context.fill();
  drawWorldCircle(state.actor, ACTOR_RADIUS, { fill: "#e9f4f7", stroke: "#061014", lineWidth: 3 });
  drawWorldLine(
    state.actor,
    { x: state.actor.x + state.direction.x * 28, y: state.actor.y + state.direction.y * 28 },
    { stroke: "#071014", lineWidth: 3 },
  );
  drawLabel({ x: state.actor.x, y: state.actor.y - 30 }, "CAPTAIN", { color: "#ffffff", background: "rgba(6, 12, 13, 0.72)" });
}

function renderValidation() {
  const { validation } = state.assembly;
  elements.validationBadge.textContent = validation.pass ? "VALIDATION PASS" : "EXPECTED VALIDATION FAIL";
  elements.validationBadge.className = `status-badge ${validation.pass ? "pass" : "fail"}`;
  elements.activeBlueprintName.textContent = state.assembly.blueprint.name;
  elements.assemblySummary.textContent = `${state.assembly.modules.length} modules · ${state.assembly.joins.length} joins · ${state.assembly.interactionPositions.length} Interaction Positions · ${state.assembly.coverPositions.length} Cover Positions`;
  elements.validationCount.textContent = `${validation.checks.filter((check) => check.ok).length}/${validation.checks.length} pass`;
  elements.validationResults.replaceChildren();
  const ordered = [...validation.checks].sort((left, right) => Number(left.ok) - Number(right.ok));
  for (const result of ordered) {
    const item = document.createElement("div");
    item.className = `validation-item ${result.ok ? "pass" : "fail"}`;
    const icon = document.createElement("span");
    icon.className = "validation-icon";
    icon.textContent = result.ok ? "✓" : "×";
    const copy = document.createElement("div");
    copy.className = "validation-copy";
    const title = document.createElement("strong");
    title.textContent = `${result.code} · ${result.subject}`;
    const message = document.createElement("small");
    message.textContent = result.message;
    copy.append(title, message);
    item.append(icon, copy);
    elements.validationResults.append(item);
  }
}

function renderModules() {
  elements.moduleCount.textContent = String(state.assembly.modules.length);
  elements.moduleList.replaceChildren();
  for (const module of state.assembly.modules) {
    const card = document.createElement("div");
    card.className = "module-card";
    const swatch = document.createElement("span");
    swatch.className = "module-swatch";
    swatch.style.background = module.color;
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = module.name;
    const id = document.createElement("small");
    id.textContent = `${module.id}:${module.moduleId}`;
    copy.append(title, id);
    const transform = document.createElement("span");
    transform.className = "module-transform";
    transform.textContent = `T(${module.placement.x}, ${module.placement.y}) R${module.placement.rotationDeg}°`;
    card.append(swatch, copy, transform);
    elements.moduleList.append(card);
  }
}

function renderLiveState() {
  const area = getAreaAt(state.assembly, state.actor);
  if (area) state.visitedAreas.add(area.areaId);
  elements.activeAreaLabel.textContent = area?.name ?? "Outside navigation";
  elements.sceneCaption.textContent = area?.name ?? "Between authored Areas";
  const values = [
    ["Actor", `${state.actor.x.toFixed(1)}, ${state.actor.y.toFixed(1)}`],
    ["Area", area?.areaId ?? "none"],
    ["Camera", state.tactical ? "1.70× tactical" : "0.82× adaptive"],
    ["Zoom", state.camera.zoom.toFixed(3)],
    ["Movement", `${ACCEPTED_MOVEMENT_CAMERA_INPUTS.movementSpeed} u/s`],
    ["Projection", `${ACCEPTED_MOVEMENT_CAMERA_INPUTS.tiltFromOverheadDegrees}° from overhead`],
  ];
  elements.liveState.replaceChildren();
  for (const [label, value] of values) {
    const term = document.createElement("dt");
    term.textContent = label;
    const detail = document.createElement("dd");
    detail.textContent = value;
    elements.liveState.append(term, detail);
  }

  elements.visitedAreas.replaceChildren();
  for (const module of state.assembly.modules) {
    const badge = document.createElement("span");
    badge.textContent = module.name;
    if (state.visitedAreas.has(module.areaId)) badge.classList.add("visited");
    elements.visitedAreas.append(badge);
  }
}

function selectInspectionMode(mode) {
  if (!INSPECTION_LEGENDS[mode]) return;
  state.inspectionMode = mode;
  for (const button of document.querySelectorAll("[data-layer]")) {
    button.classList.toggle("active", button.dataset.layer === mode);
    button.setAttribute("aria-pressed", button.dataset.layer === mode ? "true" : "false");
  }
  const legend = INSPECTION_LEGENDS[mode];
  const keyMarkup = legend.keys
    .map(
      ([color, label]) =>
        `<span class="legend-key"><i class="legend-swatch" style="--swatch:${color}"></i>${label}</span>`,
    )
    .join("");
  elements.layerLegend.innerHTML = `<strong>${legend.title}</strong>${legend.copy}<div>${keyMarkup}</div>`;
  elements.fadeControlLabel.classList.toggle("visible", mode === "occlusion");
}

function selectBlueprint(caseId) {
  if (state.traversal) return;
  state.caseId = caseId;
  const blueprint = blueprintCases[caseId];
  state.assembly = assembleLocation(blueprint);
  state.actor = { ...blueprint.actorStart };
  state.camera = { x: state.actor.x, y: state.actor.y, zoom: 1 };
  state.direction = { x: 1, y: 0 };
  state.tactical = false;
  state.route = null;
  state.visitedAreas = new Set(["area-docking-spine"]);
  elements.validButton.classList.toggle("active", caseId === "valid");
  elements.invalidButton.classList.toggle("active", caseId === "invalid");
  elements.traversalButton.disabled = !state.assembly.validation.pass;
  elements.canvasStatus.textContent = state.assembly.validation.pass
    ? "Ready · valid assembly"
    : "Expected fail · inspect red/orange seam";
  elements.canvasStatus.style.color = state.assembly.validation.pass ? "var(--green)" : "var(--red)";
  if (caseId === "invalid") selectInspectionMode("assembly");
  renderValidation();
  renderModules();
  renderLiveState();
}

function resetActor() {
  if (state.traversal) return;
  state.actor = { ...state.assembly.blueprint.actorStart };
  state.camera.x = state.actor.x;
  state.camera.y = state.actor.y;
  state.route = null;
  state.visitedAreas = new Set(["area-docking-spine"]);
  elements.canvasStatus.textContent = state.assembly.validation.pass ? "Ready · valid assembly" : "Expected fail · inspect red/orange seam";
}

function finishTraversal(result) {
  const resolve = state.traversal?.resolve;
  state.traversal = null;
  elements.traversalButton.disabled = !state.assembly.validation.pass;
  elements.resetButton.disabled = false;
  elements.validButton.disabled = false;
  elements.invalidButton.disabled = false;
  elements.canvasStatus.textContent = result.pass ? "Traversal complete · all 3 Areas visited" : "Traversal failed";
  elements.canvasStatus.style.color = result.pass ? "var(--green)" : "var(--red)";
  resolve?.(result);
}

function runGuidedTraversal(options = {}) {
  if (!state.assembly.validation.pass) {
    return Promise.resolve({ pass: false, reason: "Active Blueprint is invalid." });
  }
  if (state.traversal) return state.traversal.promise;
  resetActor();
  state.route = buildReviewTraversal(state.assembly);
  const trace = tracePath(state.assembly, state.route.path, { radius: ACTOR_RADIUS });
  if (options.instant) {
    state.actor = { ...state.route.path[state.route.path.length - 1] };
    state.visitedAreas = new Set(trace.visitedAreas);
    renderLiveState();
    elements.canvasStatus.textContent = "Traversal complete · all 3 Areas visited";
    return Promise.resolve({ ...trace, areaCount: state.visitedAreas.size });
  }

  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  state.traversal = { path: state.route.path, index: 1, resolve: resolvePromise, promise };
  elements.traversalButton.disabled = true;
  elements.resetButton.disabled = true;
  elements.validButton.disabled = true;
  elements.invalidButton.disabled = true;
  elements.canvasStatus.textContent = "Guided traversal · 190 u/s";
  return promise;
}

function updateTraversal(deltaSeconds) {
  if (!state.traversal) return;
  let remainingDistance = ACCEPTED_MOVEMENT_CAMERA_INPUTS.movementSpeed * deltaSeconds;
  while (state.traversal && remainingDistance > 0) {
    const target = state.traversal.path[state.traversal.index];
    if (!target) {
      const visited = [...state.visitedAreas];
      finishTraversal({
        pass: visited.length === state.assembly.modules.length,
        visitedAreas: visited,
        areaCount: visited.length,
        distance: state.route.trace.distance,
      });
      return;
    }
    const dx = target.x - state.actor.x;
    const dy = target.y - state.actor.y;
    const distance = Math.hypot(dx, dy);
    if (distance <= remainingDistance) {
      state.actor = { ...target };
      state.traversal.index += 1;
      remainingDistance -= distance;
    } else {
      state.direction = { x: dx / distance, y: dy / distance };
      state.actor = {
        x: state.actor.x + state.direction.x * remainingDistance,
        y: state.actor.y + state.direction.y * remainingDistance,
      };
      remainingDistance = 0;
    }
    const area = getAreaAt(state.assembly, state.actor);
    if (area) state.visitedAreas.add(area.areaId);
  }
}

function updateManualMovement(deltaSeconds) {
  if (state.traversal) return;
  let x = Number(state.keys.has("KeyD")) - Number(state.keys.has("KeyA"));
  let y = Number(state.keys.has("KeyS")) - Number(state.keys.has("KeyW"));
  if (x === 0 && y === 0) return;
  const magnitude = Math.hypot(x, y);
  x /= magnitude;
  y /= magnitude;
  state.direction = { x, y };
  const distance = ACCEPTED_MOVEMENT_CAMERA_INPUTS.movementSpeed * deltaSeconds;
  state.actor = moveWithCollision(state.assembly, state.actor, { x: x * distance, y: y * distance }, ACTOR_RADIUS);
  const area = getAreaAt(state.assembly, state.actor);
  if (area) state.visitedAreas.add(area.areaId);
}

function updateCamera(deltaSeconds) {
  const area = getAreaAt(state.assembly, state.actor);
  const areaFactor = area?.cameraFactor ?? 1;
  const tacticalFactor = state.tactical ? ACCEPTED_MOVEMENT_CAMERA_INPUTS.tacticalPullback : 1;
  const targetZoom = 1.08 / (ACCEPTED_MOVEMENT_CAMERA_INPUTS.normalFraming * areaFactor * tacticalFactor);
  const lead = state.traversal || state.keys.size ? 52 : 0;
  const target = {
    x: state.actor.x + state.direction.x * lead,
    y: state.actor.y + state.direction.y * lead,
  };
  const amount = 1 - Math.exp(-ACCEPTED_MOVEMENT_CAMERA_INPUTS.followSoftness * deltaSeconds);
  state.camera.x += (target.x - state.camera.x) * amount;
  state.camera.y += (target.y - state.camera.y) * amount;
  state.camera.zoom += (targetZoom - state.camera.zoom) * amount;
}

function resizeCanvas() {
  const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(canvas.clientWidth));
  const height = Math.max(1, Math.floor(canvas.clientHeight));
  const targetWidth = Math.floor(width * deviceScale);
  const targetHeight = Math.floor(height * deviceScale);
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }
  context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
}

function frame(timestamp) {
  const deltaSeconds = Math.min(0.05, Math.max(0, (timestamp - state.lastFrame) / 1000));
  state.lastFrame = timestamp;
  resizeCanvas();
  updateManualMovement(deltaSeconds);
  updateTraversal(deltaSeconds);
  updateCamera(deltaSeconds);
  renderWorld();
  if (timestamp - state.lastDomUpdate > 100) {
    renderLiveState();
    state.lastDomUpdate = timestamp;
  }
  requestAnimationFrame(frame);
}

elements.validButton.addEventListener("click", () => selectBlueprint("valid"));
elements.invalidButton.addEventListener("click", () => selectBlueprint("invalid"));
elements.resetButton.addEventListener("click", resetActor);
elements.traversalButton.addEventListener("click", () => runGuidedTraversal());

for (const button of document.querySelectorAll("[data-layer]")) {
  button.addEventListener("click", () => selectInspectionMode(button.dataset.layer));
}

elements.fadeControl.addEventListener("change", () => {
  state.fadeOcclusion = elements.fadeControl.checked;
});

window.addEventListener("keydown", (event) => {
  if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) {
    event.preventDefault();
    state.keys.add(event.code);
  }
  if (event.code === "KeyT" && !event.repeat) {
    event.preventDefault();
    state.tactical = !state.tactical;
  }
});

window.addEventListener("keyup", (event) => {
  state.keys.delete(event.code);
});

window.addEventListener("blur", () => state.keys.clear());

window.__nexusLocationAssemblyPrototype = {
  selectBlueprint,
  selectInspectionMode,
  resetActor,
  runGuidedTraversal,
  getSnapshot() {
    const area = getAreaAt(state.assembly, state.actor);
    return {
      caseId: state.caseId,
      blueprintId: state.assembly.blueprint.id,
      validationPass: state.assembly.validation.pass,
      validationFailures: state.assembly.validation.failures.map((failure) => ({ ...failure })),
      actor: { ...state.actor },
      areaId: area?.areaId ?? null,
      visitedAreas: [...state.visitedAreas],
      tactical: state.tactical,
      inspectionMode: state.inspectionMode,
      modules: state.assembly.modules.map((module) => ({ id: module.id, moduleId: module.moduleId, areaId: module.areaId })),
      joins: state.assembly.joins.map((join) => ({ id: join.id, seamOffset: join.seamOffset })),
    };
  },
};

selectInspectionMode("scene");
selectBlueprint("valid");
requestAnimationFrame(frame);
