import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("./prototype.js", import.meta.url), "utf8");
const accepted = source.match(/const ACCEPTED = \{[^\n]+\};/)?.[0];
const depthScale = source.match(/function projectionDepthScale\(\) \{[\s\S]*?\n\}/)?.[0];
const projection = source.match(/function worldToScreen\(x, y\) \{[\s\S]*?\n\}/)?.[0];

if (!accepted || !depthScale || !projection) throw new Error("Could not load the accepted projection seam.");

const context = { innerWidth: 1000, innerHeight: 800, state: { camera: { x: 0, y: 0, zoom: 1 } }, Math };
vm.createContext(context);
vm.runInContext(`${accepted}\n${depthScale}\n${projection}\nthis.accepted = ACCEPTED; this.east = worldToScreen(100, 0); this.north = worldToScreen(0, -100);`, context);

const center = { x: 490, y: 408 };
const eastDelta = { x: context.east.x - center.x, y: context.east.y - center.y };
const northDelta = { x: context.north.x - center.x, y: context.north.y - center.y };
const epsilon = 0.001;
const aligned = eastDelta.x > 0 && Math.abs(eastDelta.y) < epsilon && Math.abs(northDelta.x) < epsilon && northDelta.y < 0;
const tightBaseline = context.accepted.speed === 190 && context.accepted.distance === 0.82 && context.accepted.softness === 3.2 && context.accepted.tiltDegrees === 10 && context.accepted.pullback === 1.70;
const featureSeams = ["findPath", "worldObjects", "switchControl", "repathFollowers", "capturePositions", "drawHumanoid"].every((name) => source.includes(name));

console.log(JSON.stringify({ accepted: context.accepted, eastDelta, northDelta, aligned, tightBaseline, featureSeams }, null, 2));
if (!aligned || !tightBaseline || !featureSeams) process.exitCode = 1;
