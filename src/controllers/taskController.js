const db = require("../sequelize-client");

const createTask = async (req, res) => {
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
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getAllTasks = async (req, res) => {
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
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

const getTaskById = async (req, res) => {
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
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).json({ message: "Error retrieving task", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { Task } = db;
    const { title, description, dueDate, statusId } = req.body;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
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
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { Task } = db;
    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task", error });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
