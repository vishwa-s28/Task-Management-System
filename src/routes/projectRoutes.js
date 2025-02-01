const express = require("express");
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
