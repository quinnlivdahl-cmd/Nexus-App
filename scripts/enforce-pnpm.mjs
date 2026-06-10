import { rmSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");

for (const lockFile of ["package-lock.json", "yarn.lock"]) {
  rmSync(resolve(repoRoot, lockFile), { force: true });
}

const userAgent = process.env.npm_config_user_agent ?? "";

if (!userAgent.startsWith("pnpm/")) {
  console.error("Use pnpm instead");
  process.exit(1);
}
