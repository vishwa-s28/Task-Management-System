import express from "express";
import {
  shareTask,
  getSharedUsers,
} from "../controllers/shareTaskController.js";
import { SHARE_TASK_ENDPOINTS } from "../constants/endpoints.js";

const router = express.Router();

router.get(SHARE_TASK_ENDPOINTS.GET_SHARED_USERS, getSharedUsers);
router.post(SHARE_TASK_ENDPOINTS.SHARE_TASK, shareTask);

export default router;
