import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import { PROJECT_ERRORS } from "../constants/errorMessages.js";

const getProjects = async (req, res, next) => {
  try {
    const { Project, Task, SubTask, User } = db;
    const projects = await Project.findAll({
      include: [
        {
          model: Task,
          as: 'tasks',
          include: [
            {
              model: SubTask,
              as: 'subtasks',
            },
          ],
        },
        {
          model: User,
          as: "members", // <-- This matches Project.belongsToMany(User, { as: 'members' })
          attributes: ["id", "name", "role", "UserRoleId"],
          through: {
            attributes: ["role"], // from ProjectUser table
          },
        }
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    next(new AppError(PROJECT_ERRORS.FETCH_ERROR, 500));
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { Project, Task, SubTask } = db;
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: Task,
          as: 'tasks',
          include: [
            {
              model: Subtask,
              as: 'subtasks',
            },
          ],
        },
      ],
    });

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
    const { Project, ProjectUser } = db;
    const { name } = req.body;

    if (!name) {
      throw new AppError(PROJECT_ERRORS.NAME_REQUIRED, 400);
    }

    const newProject = await Project.create({ name });
    await ProjectUser.create({
      ProjectId: newProject.id,
      UserId: req.user.id, 
      role: "owner",
    });
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
    const { Project, ProjectUser } = db;
    const projectId = req.params.id;
    const { name, userIds = [] } = req.body;

    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new AppError(PROJECT_ERRORS.PROJECT_NOT_FOUND, 404);
    }

    project.name = name || project.name;
    await project.save();

    if (userIds.length > 0) {
      const existing = await ProjectUser.findAll({
        where: {
          ProjectId: projectId,
          UserId: userIds,
        },
        attributes: ["UserId"],
      });

      const existingUserIds = existing.map((e) => e.UserId);
      const newUserIds = userIds.filter((id) => !existingUserIds.includes(id));

      const newMembers = newUserIds.map((userId) => ({
        ProjectId: projectId,
        UserId: userId,
      }));

      if (newMembers.length > 0) {
        await ProjectUser.bulkCreate(newMembers);
      }
    }

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
