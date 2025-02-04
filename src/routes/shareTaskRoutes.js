import express from "express";
import {
  shareTask,
  getSharedUsers,
} from "../controllers/shareTaskController.js"; 

const router = express.Router();

router.get("/:taskId", getSharedUsers);
router.post("/:taskId", shareTask);

export default router;
