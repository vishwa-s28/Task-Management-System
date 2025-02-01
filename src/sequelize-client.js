require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const user = require("./models/user");
const task = require("./models/task");
const status = require("./models/status");
const subtask = require("./models/subtask");
const reminder = require("./models/reminder");
const project = require("./models/project");

const db = {
  sequelize: sequelize,
  User: user(sequelize, DataTypes),
  Task: task(sequelize, DataTypes),
  Status: status(sequelize, DataTypes),
  SubTask: subtask(sequelize, DataTypes),
  Reminder: reminder(sequelize, DataTypes),
  Project: project(sequelize, DataTypes),

  models: sequelize.models,
};

const checkAssociation = (model) => {
  return model.associate && typeof model.associate === "function";
};

Object.values(db).forEach((model) => {
  if (checkAssociation(model)) {
    model.associate(db);
  }
});

module.exports = db;
