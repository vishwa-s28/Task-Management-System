import cron from "node-cron";
import sendEmail from "./mailer.js";
import db from "../sequelize-client.js";
import { Op } from "sequelize";
import { color } from "console-log-colors";

const { Task, User, Reminder } = db;

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
          const existingReminder = await Reminder.findOne({
            where: {
              TaskId: task.id,
              UserId: user.id,
              status: "Sent", 
            },
          });

          if (existingReminder) {
            console.log(
              color.yellow(
                `Skipping email for user "${user.name}" and task "${task.title}" because the reminder has already been sent.`
              )
            );
            continue; 
          }

          const htmlContent = `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #007BFF;">Hello ${user.name},</h2>
                <p>This is a reminder that the task <strong>"${task.title}"</strong> is due on:</p>
                <p style="font-size: 16px; color: #d9534f;"><strong>${new Date(task.dueDate).toLocaleString()}</strong></p>
                <p>Please ensure it is completed on time.</p>
                <br />
                <p>Best regards,</p>
                <p><strong>Task Management Team</strong></p>
              </div>
            `;

          const reminder = await Reminder.create({
            // status: "Pending", // Default status before email is sent
            TaskId: task.id,
            UserId: user.id,
          });

          try {
            await sendEmail(user.email, `Reminder: Task "${task.title}" is due soon`, htmlContent, true);

            await reminder.update({ status: "Sent" });

            console.log(
              color.magenta(
                `Reminder email sent and reminder status updated for user "${user.name}" and task "${task.title}".`
              )
            );
          } catch (emailError) {
            console.error(
              color.red(
                `Error sending email to user "${user.name}" for task "${task.title}": ${emailError.message}`
              )
            );
          }
        }
      } else {
        console.log(`No users assigned to task "${task.title}".`);
      }
    }
  } catch (error) {
    console.error("Error sending task reminder emails:", error.message);
  }
};

export { runTaskReminderJob };
