import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dmDebugLogRouter from "./dmDebugLog";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dmDebugLogRouter);

export default router;
