import cron from "node-cron";
import sendEmail from "./mailer.js";
import db from "../sequelize-client.js";
import { Op } from "sequelize";
import { color } from "console-log-colors";

const { Task, User } = db;

const runTaskReminderJob = async () => {
  try {
    const tasks = await Task.findAll({
      where: {
        dueDate: {
          [Op.between]: [
            new Date(),
            new Date(Date.now() + 24 * 60 * 60 * 1000),
          ], // Next 24 hours
        },
      },
      include: [
        {
          model: User,
          as: "sharedWith",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!tasks.length) {
      console.log("No tasks due in the next 24 hours.");
      return;
    }

    for (const task of tasks) {
      const sharedUsers = task.sharedWith;

      if (sharedUsers && sharedUsers.length > 0) {
        for (const user of sharedUsers) {
          const htmlContent = `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #007BFF;">Hello ${user.name},</h2>
                <p>This is a reminder that the task <strong>"${
                  task.title
                }"</strong> is due on:</p>
                <p style="font-size: 16px; color: #d9534f;"><strong>${new Date(
                  task.dueDate
                ).toLocaleString()}</strong></p>
                <p>Please ensure it is completed on time.</p>
                <br />
                <p>Best regards,</p>
                <p><strong>Task Management Team</strong></p>
              </div>
            `;

          await sendEmail(
            user.email,
            `Reminder: Task "${task.title}" is due soon`,
            htmlContent,
            true
          );
        }

        console.log(
          color.magenta(`Reminder emails sent for task "${task.title}".`)
        );
      } else {
        console.log(`No users assigned to task "${task.title}".`);
      }
    }
  } catch (error) {
    console.error("Error sending task reminder emails:", error.message);
  }
};

export { runTaskReminderJob };
