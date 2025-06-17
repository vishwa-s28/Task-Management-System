import express from "express";
import helmet from "helmet";
import { color } from "console-log-colors";
import db from "./sequelize-client.js";
import notFound from "./middlewares/404.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import generalRoutes from "./routes/index.js";
import { runTaskReminderJob } from "./utils/taskReminder.js";
import inputSanitization from "./middlewares/inputSanitization.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import compression from "compression";
import cors from "cors";
const app = express();

// Helps mitigate XSS attacks by setting a Content-Security-Policy header.
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(inputSanitization);
app.use(rateLimiter);
app.use("/", compression(), generalRoutes);
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
    });
  } catch (error) {
    console.error(
      color.red("Error during initialization, server not started:", error)
    );
    process.exit(1);
  }
})();

// cron.schedule("0 9 * * *", async () => {
//   try {
//     const currentTime = new Date().toLocaleString();
//     console.log(currentTime);
//     console.log(
//       color.yellow(`Scheduled task reminder job running at ${currentTime}...`)
//     );
//     await runTaskReminderJob();
//   } catch (err) {
//     console.error(color.red(`Error running task reminder job: ${err.message}`));
//   }
// });
