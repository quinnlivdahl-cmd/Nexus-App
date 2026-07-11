import { Router, type IRouter } from "express";
import { retrieveSourceSlices } from "../lib/sourceRetrieval";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/source-retrieval", (req, res) => {
  try {
    const result = retrieveSourceSlices({
      query: typeof req.body?.query === "string" ? req.body.query : "",
      maxResults: req.body?.maxResults,
      maxChars: req.body?.maxChars,
    });

    res.json(result);
  } catch (err) {
    logger.error({ err }, "Failed to retrieve Nexus source slices");
    res.status(500).json({ error: "Failed to retrieve Nexus source slices" });
  }
});

export default router;
