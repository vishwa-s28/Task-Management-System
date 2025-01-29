const express = require("express");
const { checkAndSyncDatabase } = require("./models");
const authRoutes = require("./routes/authRoutes");
const { color } = require("console-log-colors");
const authenticate = require("./middlewares/authenticate");
const authorize = require("./middlewares/authorize");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.get("/", authenticate, authorize(["admin"]), (req, res) => res.send(`hello ${req.user.name}`));

(async () => {
  try {
    const db = await checkAndSyncDatabase();
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
