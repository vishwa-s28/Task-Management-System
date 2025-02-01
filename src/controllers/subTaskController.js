const db = require("../sequelize-client");

const addSubtask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title } = req.body;
    const { SubTask, Task } = db;

    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const subtask = await SubTask.create({
      TaskId: taskId,
      title,
    });

    res.status(201).json({
      message: "Subtask created successfully",
      subtask,
    });
  } catch (error) {
    next(error);
  }
};

const getSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { SubTask, Task, Status } = db;

    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const subtasks = await SubTask.findAll({
      where: { TaskId: taskId },
      include: [
        {
          model: Status,
          as: "status",
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json({
      task,
      subtasks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSubtask,
  getSubtasks,
};
