import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/mailer.js";

const { Task, User, SubTask } = db;

const createBulkTasks = async (req, res, next) => {
  try {
    const tasks = req.body.tasks;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      throw new AppError(
        "Invalid input. Provide a non-empty array of tasks.",
        400
      );
    }

    const createdTasks = [];
    for (const taskData of tasks) {
      const { title, description, dueDate, ProjectId } = taskData;

      if (!title || typeof title !== "string") {
        throw new AppError(`Invalid task title: ${title}`, 400);
      }

      const createdTask = await Task.create({
        title,
        description,
        dueDate,
        UserId: req.user.id,
        ProjectId,
      });
      createdTasks.push(createdTask);
    }

    res.status(201).json({
      message: `${createdTasks.length} tasks created successfully.`,
      data: createdTasks,
    });
  } catch (error) {
    next(error);
  }
};

const assignTasksToUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { taskIds } = req.body;

    if (!userId || !Array.isArray(taskIds) || taskIds.length === 0) {
      throw new AppError(
        "Invalid input. Provide a userId and a non-empty array of taskIds.",
        400
      );
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const tasks = await Task.findAll({ where: { id: taskIds } });

    if (tasks.length !== taskIds.length) {
      const foundTaskIds = tasks.map((task) => task.id);
      const missingTaskIds = taskIds.filter(
        (taskId) => !foundTaskIds.includes(taskId)
      );
      throw new AppError(
        `Tasks not found for IDs: ${missingTaskIds.join(", ")}`,
        404
      );
    }

    await user.addSharedTasks(tasks);

    for (const task of tasks) {
      const senderEmail = req.user.email;
      const taskName = task.title;
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Hello ${user.name},</h2>
          <p>This is a notification that the task <strong>"${taskName}"</strong> has been assigned to you  by <strong>${senderEmail}</strong>.</p>
          <p>Please log in to your account to view the task details and start working on it.</p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p><strong>Task Management Team</strong></p>
          <hr />
          <p style="font-size: 0.9em; color: #666;">
            Disclaimer: This email is intended solely for the recipient. If you are not the intended recipient, please notify the sender and delete this email.
          </p>
        </div>
      `;

      await sendEmail(
        user.email,
        `Task Assigned: ${taskName}`,
        emailHtml,
        true 
      );
    }

    res.status(200).json({
      message:
        "Tasks assigned to user successfully and email notifications sent.",
      assignedTasks: tasks.map((task) => ({ id: task.id, title: task.title })),
    });
  } catch (error) {
    next(error);
  }
};

const deleteBulkTask = async (req, res, next) => {
  try {
    const { taskIds } = req.body;

    if (!Array.isArray(taskIds) || taskIds.length === 0) {
      throw new AppError(
        "Invalid input. Provide a non-empty array of task IDs.",
        400
      );
    }

    await SubTask.destroy({
      where: { TaskId: taskIds },
    });

    const deletedTasks = await Task.destroy({ where: { id: taskIds } });

    if (deletedTasks === 0) {
      throw new AppError(
        "No tasks found to delete with the provided IDs.",
        404
      );
    }

    res.status(200).json({
      message: `${deletedTasks} tasks deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

export { createBulkTasks, assignTasksToUser, deleteBulkTask };

