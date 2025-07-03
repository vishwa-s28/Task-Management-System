import express from "express";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { PROJECTS_ENDPOINTS } from "../constants/endpoints.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get(PROJECTS_ENDPOINTS.GET_PROJECTS, getProjects);
router.get(PROJECTS_ENDPOINTS.GET_PROJECT_BY_ID, getProjectById);
router.post(PROJECTS_ENDPOINTS.ADD_PROJECT, authorize(["admin"]),  addProject);
router.put(PROJECTS_ENDPOINTS.UPDATE_PROJECT, authorize(["admin"]), updateProject);
router.delete(PROJECTS_ENDPOINTS.DELETE_PROJECT, authorize(["admin"]), deleteProject);

export default router;
