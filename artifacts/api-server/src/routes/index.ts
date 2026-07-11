import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dmDebugLogRouter from "./dmDebugLog";
import sourceRetrievalRouter from "./sourceRetrieval";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dmDebugLogRouter);
router.use(sourceRetrievalRouter);

export default router;
