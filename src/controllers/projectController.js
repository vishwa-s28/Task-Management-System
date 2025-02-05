import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import { PROJECT_ERRORS } from "../constants/errorMessages.js";

const getProjects = async (req, res, next) => {
  try {
    const { Project } = db;
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    next(new AppError(PROJECT_ERRORS.FETCH_ERROR, 500));
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { Project } = db;
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new AppError(PROJECT_ERRORS.PROJECT_NOT_FOUND, 404);
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const addProject = async (req, res, next) => {
  try {
    const { Project } = db;
    const { name } = req.body;

    if (!name) {
      throw new AppError(PROJECT_ERRORS.NAME_REQUIRED, 400);
    }

    const newProject = await Project.create({ name });
    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { Project } = db;
    const projectId = req.params.id;
    const { name } = req.body;

    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new AppError(PROJECT_ERRORS.PROJECT_NOT_FOUND, 404);
    }

    project.name = name || project.name;
    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    next(new AppError(PROJECT_ERRORS.UPDATE_ERROR, 500));
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { Project } = db;
    const projectId = req.params.id;

    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new AppError(PROJECT_ERRORS.PROJECT_NOT_FOUND, 404);
    }

    await project.destroy();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
