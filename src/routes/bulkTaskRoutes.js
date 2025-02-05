import express from "express";
import {
  createBulkTasks,
  assignTasksToUser,
  deleteBulkTask,
} from "../controllers/bulkTaskController.js";
import { BULK_TASKS_ENDPOINTS } from "../constants/endpoints.js";

const router = express.Router();

router.post(BULK_TASKS_ENDPOINTS.CREATE, createBulkTasks);
router.post(BULK_TASKS_ENDPOINTS.ASSIGN, assignTasksToUser);
router.delete(BULK_TASKS_ENDPOINTS.DELETE, deleteBulkTask);

export default router;
