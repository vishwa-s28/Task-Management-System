const db = require("../sequelize-client");
const { default: AppError } = require("../utils/appError");

const shareTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userIds } = req.body; // Array of user IDs to share with
    const { Task, User } = db;

    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const users = await User.findAll({ where: { id: userIds } });
    if (!users.length) {
      throw new AppError("Users not found", 404);
    }

    await task.addSharedWith(users);

    res.status(200).json({
      message: "Task shared successfully",
      sharedWith: users.map((user) => ({ id: user.id, name: user.name })),
    });
  } catch (error) {
    next(error);
  }
};

const getSharedUsers = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { Task } = db;

    const task = await Task.findByPk(taskId, {
      include: [
        {
          model: db.User,
          as: "sharedWith",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    res.status(200).json({
      taskId: task.id,
      sharedWith: task.sharedWith,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  shareTask,
  getSharedUsers,
};
