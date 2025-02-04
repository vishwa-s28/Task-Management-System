import express from "express";
import {
  createBulkTasks,
  assignTasksToUser,
  deleteBulkTask,
} from "../controllers/bulkTaskController.js";

const router = express.Router();

router.post("/create", createBulkTasks);
router.post("/assign/:userId", assignTasksToUser);
router.delete("/delete", deleteBulkTask);

export default router;
