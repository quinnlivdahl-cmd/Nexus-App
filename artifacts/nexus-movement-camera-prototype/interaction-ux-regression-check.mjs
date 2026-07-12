import { readFile } from "node:fs/promises";

const [html, source] = await Promise.all([
  readFile(new URL("./index.html", import.meta.url), "utf8"),
  readFile(new URL("./prototype.js", import.meta.url), "utf8"),
]);

const checks = {
  directControlExplained: /click (?:a )?person/i.test(html) && /WASD/i.test(html),
  ipMarkersExplained: /IP (?:circles|markers) are diagnostics/i.test(html + source),
  blockedCaseIsExpected: /expectedFailure:\s*true/.test(source) && /EXPECTED FAILURE/.test(source),
  personClickSwitchesControl: /clickedCharacter/.test(source) && /switchControl\(/.test(source),
};

console.log(JSON.stringify(checks, null, 2));
if (Object.values(checks).some((value) => !value)) process.exitCode = 1;
