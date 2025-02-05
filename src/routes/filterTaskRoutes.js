import express from "express";
import {
  filterTaskByStatus,
  filterTaskByDueDate,
  filterTasksAssignedToUser,
  filterTasksBySharedStatus,
} from "../controllers/filterTaskController.js";
import { FILTER_TASK_ENDPOINTS } from "../constants/endpoints.js";

const router = express.Router();

router.get(FILTER_TASK_ENDPOINTS.STATUS, filterTaskByStatus);
router.get(FILTER_TASK_ENDPOINTS.DUE_DATE, filterTaskByDueDate);
router.get(FILTER_TASK_ENDPOINTS.ASSIGNEE, filterTasksAssignedToUser);
router.get(FILTER_TASK_ENDPOINTS.SHARED, filterTasksBySharedStatus);

export default router;
