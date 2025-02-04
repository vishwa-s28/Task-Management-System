const db = require("../sequelize-client");
const { default: AppError } = require("../utils/appError");
const sendEmail = require("../utils/mailer");
const { Task, User } = db;

const shareTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userIds } = req.body; 

    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const users = await User.findAll({ where: { id: userIds } });
    if (!users.length) {
      throw new AppError("Users not found", 404);
    }

    await task.addSharedWith(users);

    const senderEmail = req.user.email; 
    const taskName = task.title;

    const emailPromises = users.map(async (user) => {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Hello ${user.name},</h2>
          <p>The task "<strong>${taskName}</strong>" has been shared with you by <strong>${senderEmail}</strong>.</p>
          <p>Please log in to your account to view the task details.</p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p><strong>Task Management Team</strong></p>
          <hr />
          <p style="font-size: 0.9em; color: #666;">
            Disclaimer: This email is intended solely for the recipient. If you are not the intended recipient, please notify the sender and delete this email.
          </p>
        </div>
      `;

      return sendEmail(user.email, `Task Shared: ${taskName}`, emailHtml, true);
    });

    await Promise.all(emailPromises);

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
