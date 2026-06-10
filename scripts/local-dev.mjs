import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const corepack = "corepack";

const targets = new Map([
  [
    "api",
    {
      label: "api",
      args: ["pnpm", "--filter", "@workspace/api-server", "run", "dev"],
      env: {
        PORT: process.env.NEXUS_API_PORT ?? "5000",
        NODE_ENV: "development",
      },
    },
  ],
  [
    "app",
    {
      label: "app",
      args: ["pnpm", "--filter", "@workspace/nexus-companion", "run", "dev"],
      env: {
        PORT: process.env.NEXUS_COMPANION_PORT ?? "5173",
        BASE_PATH: process.env.BASE_PATH ?? "/",
        NODE_ENV: "development",
      },
    },
  ],
]);

const requested = process.argv.slice(2);
const selected =
  requested.length > 0
    ? requested.map((name) => {
        const target = targets.get(name);
        if (!target) {
          console.error(`Unknown local dev target: ${name}`);
          console.error(`Known targets: ${[...targets.keys()].join(", ")}`);
          process.exit(1);
        }
        return target;
      })
    : [...targets.values()];

let shuttingDown = false;
const children = [];

function childEnv(extraEnv) {
  const env = {
    ...process.env,
    ...extraEnv,
  };

  if (isWindows) {
    const pathValue = env.Path ?? env.PATH ?? env.path;
    delete env.Path;
    delete env.PATH;
    delete env.path;
    if (pathValue) {
      env.Path = pathValue;
    }
  }

  return env;
}

function start(target) {
  console.log(`[local-dev] starting ${target.label}: corepack ${target.args.join(" ")}`);
  const command = isWindows ? "cmd.exe" : corepack;
  const args = isWindows
    ? ["/d", "/s", "/c", ["corepack", ...target.args].join(" ")]
    : target.args;

  const child = spawn(command, args, {
    stdio: "inherit",
    env: childEnv(target.env),
  });

  child.on("error", (err) => {
    if (err.code === "ENOENT") {
      console.error("[local-dev] Corepack was not found. Install pnpm or use a Node.js build that includes Corepack, then retry.");
    } else {
      console.error(`[local-dev] failed to start ${target.label}:`, err);
    }
    stopAll(1);
  });

  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    const exitCode = code ?? (signal ? 1 : 0);
    console.log(`[local-dev] ${target.label} exited with ${signal ?? exitCode}`);
    stopAll(exitCode);
  });

  children.push(child);
}

function stopAll(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  setTimeout(() => process.exit(exitCode), 100);
}

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

for (const target of selected) {
  start(target);
}

if (selected.length === 2) {
  console.log("[local-dev] API: http://127.0.0.1:5000/api/healthz");
  console.log("[local-dev] App: http://127.0.0.1:5173");
}
