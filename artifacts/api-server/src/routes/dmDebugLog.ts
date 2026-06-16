import { existsSync } from "node:fs";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function findWorkspaceRoot(startDir: string): string {
  let current = path.resolve(startDir);

  while (true) {
    if (existsSync(path.join(current, "pnpm-workspace.yaml"))) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return path.resolve(startDir);
    }
    current = parent;
  }
}

const debugLogDir = path.join(findWorkspaceRoot(process.cwd()), ".codex-local", "dm-debug");

function dateStamp(date: Date): string {
  return date.toISOString().slice(0, 10);
}

router.post("/dm-debug-log", async (req, res) => {
  const now = new Date();
  const filePath = path.join(debugLogDir, `dm-debug-${dateStamp(now)}.jsonl`);

  const record = {
    loggedAt: now.toISOString(),
    source: "nexus-companion",
    ...req.body,
  };

  try {
    await mkdir(debugLogDir, { recursive: true });
    await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
    res.json({ ok: true, path: filePath });
  } catch (err) {
    logger.error({ err, filePath }, "Failed to write DM debug log");
    res.status(500).json({ ok: false, error: "Failed to write DM debug log" });
  }
});

export default router;
