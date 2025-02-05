import express from "express";
import {
  addStatus,
  getAllStatus,
  updateStatus,
  deleteStatus,
} from "../controllers/statusController.js";
import { STATUS_ENDPOINTS } from "../constants/endpoints.js"; 

const router = express.Router();

router.get(STATUS_ENDPOINTS.GET_ALL, getAllStatus);
router.post(STATUS_ENDPOINTS.ADD, addStatus);
router.put(STATUS_ENDPOINTS.UPDATE, updateStatus);
router.delete(STATUS_ENDPOINTS.DELETE, deleteStatus);

export default router;
