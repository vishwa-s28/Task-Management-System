const db = require("../sequelize-client");
const { default: AppError } = require("../utils/appError");

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const { Task } = db;
    const task = await Task.create({
      title,
      description,
      dueDate,
      UserId: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const { Task, User, Status, SubTask, Reminder } = db;
    const tasks = await Task.findAll({
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

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { Task, User, Status, SubTask, Reminder } = db;
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
      throw new AppError("Task not found", 404);
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { Task } = db;
    const { title, description, dueDate, statusId } = req.body;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    if (statusId !== undefined) {
      task.StatusId = statusId;
    }

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { Task } = db;
    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    await task.destroy();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const moveTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ProjectId } = req.body; 
    const { Task, Project } = db;

    const project = await Project.findByPk(ProjectId);
    if (!project) {
      throw new AppError("Project not found", 404);
    }

    const task = await Task.findByPk(id);
    if (!task) {
      throw new AppError("Task not found", 404);
    }

    task.ProjectId = ProjectId;
    await task.save();

    res.status(200).json({
      message: "Task moved successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  moveTask
};
