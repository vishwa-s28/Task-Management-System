import express from "express";
import {
  getSubtasks,
  addSubtask,
} from "../controllers/subTaskController.js";

const router = express.Router();

router.get("/:taskId", getSubtasks);
router.post("/:taskId", addSubtask);

export default router;
