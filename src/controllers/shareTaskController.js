import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/mailer.js";
import { TASK_ERRORS } from "../constants/errorMessages.js"; 

const { Task, User } = db;

const shareTask = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const { userIds } = req.body;

    // Validate input
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      throw new AppError(TASK_ERRORS.INVALID_ASSIGN_INPUT, 400);
    }

    // Fetch task
    const task = await Task.findByPk(task_id);
    if (!task) {
      throw new AppError(TASK_ERRORS.TASKS_NOT_FOUND.replace("{taskIds}", task_id), 404);
    }

    // Fetch users
    const users = await User.findAll({ where: { id: userIds } });
    if (users.length === 0) {
      throw new AppError(TASK_ERRORS.USER_NOT_FOUND, 404);
    }

    // Share task with users
    await task.addSharedWith(users);

    // Send emails to users
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
          <hr style="border: none; border-top: 1px solid #ddd;" />
        </div>
      `;
      return sendEmail(user.email, `Task Shared: ${taskName}`, emailHtml, true);
    });

    await Promise.all(emailPromises);

    // Respond with success message
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
    const { task_id } = req.params;

    // Fetch task along with shared users
    const task = await Task.findByPk(task_id, {
      include: [
        {
          model: db.User,
          as: "sharedWith",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!task) {
      throw new AppError(TASK_ERRORS.TASKS_NOT_FOUND.replace("{taskIds}", task_id), 404);
    }

    // Respond with shared user data
    res.status(200).json({
      taskId: task.id,
      sharedWith: task.sharedWith,
    });
  } catch (error) {
    next(error);
  }
};

export { shareTask, getSharedUsers };
