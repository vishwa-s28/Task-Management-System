import express from "express";
import {
  addPriority,
  getAllPriorities,
  updatePriority,
  deletePriority,
} from "../controllers/priorityController.js";
import { PRIORITY_ENDPOINTS } from "../constants/endpoints.js"; 

const router = express.Router();

router.get(PRIORITY_ENDPOINTS.GET_ALL, getAllPriorities);
router.post(PRIORITY_ENDPOINTS.ADD, addPriority);
router.put(PRIORITY_ENDPOINTS.UPDATE, updatePriority);
router.delete(PRIORITY_ENDPOINTS.DELETE, deletePriority);

export default router;
