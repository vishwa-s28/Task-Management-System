const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");

// Initialize Sequelize (without specifying a database yet)
const sequelize = new Sequelize({
  dialect: "postgres", // Use 'mysql' for MySQL
  host: config.development.host,
  username: config.development.username,
  password: config.development.password,
  logging: false,
});

// Function to check if the database exists, create it if not, and then sync models
async function checkAndSyncDatabase() {
  try {
    // First, check if we can authenticate the connection (this checks if the DB server is reachable)
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Check if the database exists (PostgreSQL approach)
    const dbExists = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname='${config.development.database}'`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // If the database doesn't exist, create it
    if (dbExists.length === 0) {
      console.log(
        `Database ${config.development.database} does not exist. Creating the database...`
      );
      await sequelize.query(`CREATE DATABASE ${config.development.database}`);
      console.log(
        `Database ${config.development.database} created successfully.`
      );
    }

    // Reconnect to the correct database (now that it exists or was created)
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

    // Import models after establishing the connection
    const db = {};
    db.User = require("./user")(sequelizeWithDb, DataTypes);
    db.Task = require("./task")(sequelizeWithDb, DataTypes);
    db.Subtask = require("./subtask")(sequelizeWithDb, DataTypes);
    db.Status = require("./status")(sequelizeWithDb, DataTypes);
    db.Reminder = require("./reminder")(sequelizeWithDb, DataTypes);

    // Set associations
    db.User.hasMany(db.Task);
    db.Task.belongsTo(db.User);

    db.Task.hasMany(db.Subtask);
    db.Subtask.belongsTo(db.Task);

    db.Status.hasMany(db.Task);
    db.Status.hasMany(db.Subtask);
    db.Task.belongsTo(db.Status);
    db.Subtask.belongsTo(db.Status);

    db.Task.hasMany(db.Reminder);
    db.Subtask.hasMany(db.Reminder);
    db.Reminder.belongsTo(db.Task);
    db.Reminder.belongsTo(db.Subtask);

    db.sequelize = sequelizeWithDb;
    db.Sequelize = Sequelize;

    // Sync the models to create tables (this will NOT create the database, only tables)
    await sequelizeWithDb.sync({ force: false }); // Set `force: true` to drop and recreate tables
    console.log("Database synced with models");

    return db; // Return the `db` object with models and Sequelize instance
  } catch (error) {
    console.error("Error checking or creating database:", error);
    throw error; // Throw the error to prevent starting the server if the DB setup fails
  }
}

// Export the checkAndSyncDatabase function so it can be called in app.js
module.exports = {
  checkAndSyncDatabase,
};
