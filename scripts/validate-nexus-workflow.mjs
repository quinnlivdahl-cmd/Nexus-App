import { resolve } from "node:path";
import { validateWorkflowInvariants } from "./nexus-workflow-invariants.mjs";

const root = resolve(import.meta.dirname, "..");
const failures = validateWorkflowInvariants(root);

if (failures.length > 0) {
  console.error("[validate-nexus-workflow] Failed");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("[validate-nexus-workflow] OK");
