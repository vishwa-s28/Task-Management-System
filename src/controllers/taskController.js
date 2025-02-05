import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import { TASK_ERRORS, TASK_MESSAGES, PROJECT_ERRORS } from "../constants/errorMessages.js";

const { Task, User, Status, SubTask, Reminder, Project } = db;

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      UserId: req.user.id,
    });

    res.status(201).json({
      message: TASK_MESSAGES.CREATE_SUCCESS,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { rows: tasks, count: totalTasks } = await Task.findAndCountAll({
      distinct: true,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
        {
          model: Status,
          as: "status",
          attributes: ["name"],
        },
        {
          model: SubTask,
          as: "subtasks",
        },
        {
          model: Reminder,
          as: "reminders",
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      data: tasks,
      pagination: {
        totalTasks,
        totalPages,
        currentPage: page,
        tasksPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({
      where: { id: taskId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
        {
          model: Status,
          as: "status",
          attributes: ["name"],
        },
        {
          model: SubTask,
          as: "subtasks",
        },
        {
          model: Reminder,
          as: "reminders",
        },
      ],
    });

    if (!task) {
      throw new AppError(TASK_ERRORS.TASK_NOT_FOUND, 404);
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate, statusId } = req.body;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      throw new AppError(TASK_ERRORS.TASK_NOT_FOUND, 404);
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    if (statusId !== undefined) {
      task.StatusId = statusId;
    }

    await task.save();

    res.status(200).json({
      message: TASK_MESSAGES.UPDATE_SUCCESS,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      throw new AppError(TASK_ERRORS.TASK_NOT_FOUND, 404);
    }

    await task.destroy();

    res.status(200).json({
      message: TASK_MESSAGES.DELETE_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

const moveTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ProjectId } = req.body;

    const project = await Project.findByPk(ProjectId);
    if (!project) {
      throw new AppError(PROJECT_ERRORS.PROJECT_NOT_FOUND, 404);
    }

    const task = await Task.findByPk(id);
    if (!task) {
      throw new AppError(TASK_ERRORS.TASK_NOT_FOUND, 404);
    }

    task.ProjectId = ProjectId;
    await task.save();

    res.status(200).json({
      message: TASK_MESSAGES.MOVE_SUCCESS,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  moveTask,
};
