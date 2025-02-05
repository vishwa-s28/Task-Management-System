import express from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import authRoutes from "../routes/authRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";
import projectRoutes from "../routes/projectRoutes.js";
import subTaskRoutes from "../routes/subTaskRoutes.js";
import statusRoutes from "../routes/statusRoutes.js";
import shareTaskRoutes from "../routes/shareTaskRoutes.js";
import filterTaskRoutes from "../routes/filterTaskRoutes.js";
import bulkTaskRoutes from "../routes/bulkTaskRoutes.js";
import ENDPOINTS from "../constants/endpoints.js";

const router = express.Router();

router.use(ENDPOINTS.AUTH, authRoutes);
router.use(ENDPOINTS.TASK, authenticate, taskRoutes);
router.use(ENDPOINTS.PROJECTS, authenticate, authorize(["admin"]), projectRoutes);
router.use(ENDPOINTS.SUBTASK, authenticate, authorize(["admin"]), subTaskRoutes);
router.use(ENDPOINTS.STATUS, authenticate, authorize(["admin"]), statusRoutes);
router.use(ENDPOINTS.SHARE_TASK, authenticate, shareTaskRoutes);
router.use(ENDPOINTS.FILTER_TASK, authenticate, filterTaskRoutes);
router.use(ENDPOINTS.BULK_TASKS, authenticate, authorize(["admin"]), bulkTaskRoutes);

export default router;
