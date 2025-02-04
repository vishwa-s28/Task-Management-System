import express from "express";
import {
  addStatus,
  getAllStatus,
  updateStatus,
  deleteStatus,
} from "../controllers/statusController.js";

const router = express.Router();

router.get("/", getAllStatus);
router.post("/", addStatus);
router.put("/:statusId", updateStatus);
router.delete("/:statusId", deleteStatus);

export default router;
