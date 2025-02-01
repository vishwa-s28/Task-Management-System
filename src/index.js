const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { color } = require("console-log-colors");
const authenticate = require("./middlewares/authenticate");
const authorize = require("./middlewares/authorize");
const db = require("./sequelize-client");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/task", authenticate, taskRoutes);

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
