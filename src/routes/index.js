const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");
const subTaskRoutes = require("./subTaskRoutes");
const shareTaskRoutes = require("./shareTaskRoutes");
const projectRoutes = require("./projectRoutes");
const statusRoutes = require("./statusRoutes");
const filterTaskRoutes = require("./filterTaskRoutes");
const bulkTaskRoutes = require("./bulkTaskRoutes");
const authorize = require("../middlewares/authorize");
const authenticate = require("../middlewares/authenticate");

router.use("/auth", authRoutes);
router.use("/task", authenticate, taskRoutes);
router.use("/projects", authenticate, authorize(["admin"]), projectRoutes);
router.use("/task/subtask", authenticate, authorize(["admin"]), subTaskRoutes);
router.use("/status", authenticate, authorize(["admin"]), statusRoutes);
router.use("/task/share", authenticate, shareTaskRoutes);
router.use("/filter-task", authenticate, filterTaskRoutes);
router.use("/bulk-tasks", authenticate, authorize(["admin"]), bulkTaskRoutes);;

module.exports = router;
