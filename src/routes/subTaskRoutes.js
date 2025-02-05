import express from "express";
import { getSubtasks, addSubtask } from "../controllers/subTaskController.js";
import { SUBTASK_ENDPOINTS } from "../constants/endpoints.js";

const router = express.Router();

router.get(SUBTASK_ENDPOINTS.GET_SUBTASKS, getSubtasks);
router.post(SUBTASK_ENDPOINTS.ADD_SUBTASK, addSubtask);

export default router;
