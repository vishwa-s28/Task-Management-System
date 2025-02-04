import express from "express";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";
import subTaskRoutes from "./subTaskRoutes.js";
import shareTaskRoutes from "./shareTaskRoutes.js";
import projectRoutes from "./projectRoutes.js";
import statusRoutes from "./statusRoutes.js";
import filterTaskRoutes from "./filterTaskRoutes.js";
import bulkTaskRoutes from "./bulkTaskRoutes.js";
import authorize from "../middlewares/authorize.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/task", authenticate, taskRoutes);
router.use("/projects", authenticate, authorize(["admin"]), projectRoutes);
router.use("/task/subtask", authenticate, authorize(["admin"]), subTaskRoutes);
router.use("/status", authenticate, authorize(["admin"]), statusRoutes);
router.use("/task/share", authenticate, shareTaskRoutes);
router.use("/filter-task", authenticate, filterTaskRoutes);
router.use("/bulk-tasks", authenticate, authorize(["admin"]), bulkTaskRoutes);

export default router;
