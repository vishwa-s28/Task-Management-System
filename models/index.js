const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");
const { color } = require("console-log-colors");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.development.host,
  username: config.development.username,
  password: config.development.password,
  logging: false,
});

let db = {};

async function checkAndSyncDatabase() {
  try {
    await sequelize.authenticate();
    console.log(color.cyan("✅ Database connected successfully"));

    const sequelizeWithDb = new Sequelize(
      config.development.database,
      config.development.username,
      config.development.password,
      {
        dialect: "postgres",
        host: config.development.host,
        logging: false,
      }
    );

    db.User = require("./user")(sequelizeWithDb, DataTypes);
    db.Task = require("./task")(sequelizeWithDb, DataTypes);
    db.Subtask = require("./subtask")(sequelizeWithDb, DataTypes);
    db.Status = require("./status")(sequelizeWithDb, DataTypes);
    db.Reminder = require("./reminder")(sequelizeWithDb, DataTypes);

    db.sequelize = sequelizeWithDb;
    db.Sequelize = Sequelize;

    await sequelizeWithDb.sync({ force: false });
    console.log(color.cyan("Database synced with models"));

    return db;
  } catch (error) {
    console.error("Error checking or creating database:", error);
    throw error;
  }
}

module.exports = db;
module.exports.checkAndSyncDatabase = checkAndSyncDatabase;
