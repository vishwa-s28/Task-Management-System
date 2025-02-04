import express from "express";
import * as taskController from "../controllers/taskController.js"; 
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.put("/:id/move", authorize(["admin"]), taskController.moveTask);

export default router;
