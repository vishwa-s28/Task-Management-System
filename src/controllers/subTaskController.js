import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import { SUBTASK_ERRORS, SUBTASK_MESSAGES, TASK_ERRORS } from "../constants/errorMessages.js";

const addSubtask = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const { title } = req.body;
    const { SubTask, Task } = db;

    const task = await Task.findByPk(task_id);
    if (!task) {
      throw new AppError(TASK_ERRORS.TASK_NOT_FOUND, 404);
    }

    if (!title) {
      throw new AppError(SUBTASK_ERRORS.TITLE_REQUIRED, 400);
    }

    const subtask = await SubTask.create({
      TaskId: task_id,
      title,
    });

    res.status(201).json({
      message: SUBTASK_MESSAGES.ADD_SUCCESS,
      subtask,
    });
  } catch (error) {
    next(error);
  }
};

const getSubtasks = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const { SubTask, Task, Status } = db;

    const task = await Task.findByPk(task_id);
    if (!task) {
      throw new AppError(TASK_ERRORS.TASK_NOT_FOUND, 404);
    }

    const subtasks = await SubTask.findAll({
      where: { TaskId: task_id },
      include: [
        {
          model: Status,
          as: "status",
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json({
      message: SUBTASK_MESSAGES.FETCH_SUCCESS,
      task,
      subtasks,
    });
  } catch (error) {
    next(error);
  }
};

export { addSubtask, getSubtasks };
