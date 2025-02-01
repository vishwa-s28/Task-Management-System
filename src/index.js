const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const subTaskRoutes = require("./routes/subTaskRoutes");
const shareTaskRoutes = require("./routes/shareTaskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const { color } = require("console-log-colors");
const authenticate = require("./middlewares/authenticate");
const authorize = require("./middlewares/authorize");
const db = require("./sequelize-client");
const notFound = require("./middlewares/404");
const globalErrorHandler = require("./middlewares/globalErrorHandler ");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/task", authenticate, taskRoutes);
app.use("/projects", authenticate, authorize(["admin"]), projectRoutes);
app.use("/task/subtask", authenticate, authorize(["admin"]), subTaskRoutes);
app.use("/task/share", authenticate, shareTaskRoutes);
app.use(notFound);
app.use(globalErrorHandler);

(async () => {
  try {
    await db.sequelize.sync({ force: false }).then(() => {
      console.log("Database synced successfully");
    });
    app.listen(3000, () => {
      console.log(color.cyan("Server running on port 3000"));
    });
  } catch (error) {
    console.error(
      color.red("Error during initialization, server not started:", error)
    );
    process.exit(1);
  }
})();
