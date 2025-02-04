const express = require("express");
const { color } = require("console-log-colors");
const db = require("./sequelize-client");
const notFound = require("./middlewares/404");
const globalErrorHandler = require("./middlewares/globalErrorHandler ");
const generalRoutes = require("./routes/index");
const { runTaskReminderJob } = require("./utils/taskReminder");
// const cron = require("node-cron");

const app = express();
app.use(express.json());

app.use("/", generalRoutes);
app.use(notFound);
app.use(globalErrorHandler);

(async () => {
  try {
    await db.sequelize.sync({ force: false }).then(() => {
      console.log("Database synced successfully");
    });

    app.listen(3000, async () => {
      console.log(color.cyan("Server running on port 3000"));
      console.log(color.green("⏰ Scheduling task reminder job..."));
      console.log(color.blue("🔄 Running task reminder job immediately..."));
      await runTaskReminderJob();

      // cron.schedule("* * * * *", async () => {
      //   try {
      //     const currentTime = new Date().toLocaleString();
      //     console.log(currentTime)
      //     console.log(color.yellow(`Scheduled task reminder job running at ${currentTime}...`));
      //     await runTaskReminderJob();
      //   } catch (err) {
      //     console.error(color.red(`Error running task reminder job: ${err.message}`));
      //   }
      // })
    });
  } catch (error) {
    console.error(
      color.red("Error during initialization, server not started:", error)
    );
    process.exit(1);
  }
})();
