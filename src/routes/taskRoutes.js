import express from "express";
import * as taskController from "../controllers/taskController.js";
import authorize from "../middlewares/authorize.js";
import { TASK_ENDPOINTS } from "../constants/endpoints.js";

const router = express.Router();

router.post(TASK_ENDPOINTS.CREATE, taskController.createTask);
router.get(TASK_ENDPOINTS.GET_ALL, taskController.getAllTasks);
router.get(TASK_ENDPOINTS.GET_BY_ID, taskController.getTaskById);
router.put(TASK_ENDPOINTS.UPDATE, taskController.updateTask);
router.delete(TASK_ENDPOINTS.DELETE, taskController.deleteTask);
router.put(TASK_ENDPOINTS.MOVE, authorize(["admin"]), taskController.moveTask);

export default router;
