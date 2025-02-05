import express from "express";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { PROJECTS_ENDPOINTS } from "../constants/endpoints.js";

const router = express.Router();

router.get(PROJECTS_ENDPOINTS.GET_PROJECTS, getProjects);
router.get(PROJECTS_ENDPOINTS.GET_PROJECT_BY_ID, getProjectById);
router.post(PROJECTS_ENDPOINTS.ADD_PROJECT, addProject);
router.put(PROJECTS_ENDPOINTS.UPDATE_PROJECT, updateProject);
router.delete(PROJECTS_ENDPOINTS.DELETE_PROJECT, deleteProject);

export default router;
