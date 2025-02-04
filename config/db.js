import { Sequelize } from "sequelize";
import config from "./config.js";
import { color } from "console-log-colors";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.development.host,
  database: config.development.database,
  username: config.development.username,
  password: config.development.password,
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(color.cyan("✅ Database connected successfully"));
  } catch (error) {
    console.error(color.red("Unable to connect to the database:", error));
    process.exit(1);
  }
})();

export default sequelize;
