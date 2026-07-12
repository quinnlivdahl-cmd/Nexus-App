import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("./prototype.js", import.meta.url), "utf8");
const noop = () => {};
const classList = { add: noop, remove: noop, toggle: noop };
const element = () => ({
  addEventListener: noop,
  append: noop,
  checked: false,
  classList,
  getContext: () => new Proxy({}, { get: (_, key) => key === "createRadialGradient" ? () => ({ addColorStop: noop }) : noop }),
  replaceChildren: noop,
  style: {},
  textContent: "",
  value: "",
});
const canvas = element();
const context = {
  console,
  document: { querySelector: (selector) => selector === "#game" ? canvas : element(), createElement: element },
  innerHeight: 900,
  innerWidth: 1440,
  performance: { now: () => 0 },
  requestAnimationFrame: noop,
  setTimeout: () => 0,
  clearTimeout: noop,
  window: { addEventListener: noop, devicePixelRatio: 1 },
};
vm.createContext(context);
vm.runInContext(source, context);

const scenarios = [
  { name: "C in cargo bay to pressure-panel IP1", start: { x: 1076, y: 405 }, goal: { x: 808, y: 354 } },
  { name: "spawn to pressure-panel IP1", start: { x: 125, y: 330 }, goal: { x: 808, y: 354 } },
  { name: "cargo bay to cargo-terminal IP1", start: { x: 1076, y: 405 }, goal: { x: 1435, y: 635 } },
  { name: "corridor to transponder IP1", start: { x: 568, y: 380 }, goal: { x: 620, y: 760 } },
];

const results = scenarios.map((scenario) => {
  context.testStart = scenario.start;
  context.testGoal = scenario.goal;
  vm.runInContext("this.testResult = findPath(testStart, testGoal)", context);
  return {
    name: scenario.name,
    pass: Array.isArray(context.testResult.path) && context.testResult.path.length > 0,
    reason: context.testResult.reason,
    waypoints: context.testResult.path?.length ?? 0,
  };
});

console.log(JSON.stringify(results, null, 2));
if (results.some((result) => !result.pass)) process.exitCode = 1;
