import express from "express";
import {
  filterTaskByStatus,
  filterTaskByDueDate,
  filterTasksAssignedToUser,
  filterTasksBySharedStatus,
} from "../controllers/filterTaskController.js";

const router = express.Router();

router.get("/status", filterTaskByStatus);
router.get("/dueDate", filterTaskByDueDate); 
router.get("/assignee", filterTasksAssignedToUser);
router.get("/shared", filterTasksBySharedStatus);

export default router;
