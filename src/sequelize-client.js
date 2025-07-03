import "dotenv/config";
import { DataTypes } from "sequelize";
import sequelize from "./config/db.js";

import user from "./models/user.js";
import task from "./models/task.js";
import status from "./models/status.js";
import priority from "./models/priority.js"; 
import subtask from "./models/subtask.js";
import reminder from "./models/reminder.js";
import project from "./models/project.js";
import comment from "./models/comment.js";
import label from "./models/label.js";
import userRole from "./models/userRole.js";
import projectUser from "./models/projectUser.js";

const db = {
  sequelize: sequelize,
  User: user(sequelize, DataTypes),
  Task: task(sequelize, DataTypes),
  Status: status(sequelize, DataTypes),
  Priority: priority(sequelize, DataTypes),
  SubTask: subtask(sequelize, DataTypes),
  Reminder: reminder(sequelize, DataTypes),
  Project: project(sequelize, DataTypes),
  Comment: comment(sequelize, DataTypes),
  Label: label(sequelize, DataTypes),
  UserRole: userRole(sequelize, DataTypes),
  ProjectUser : projectUser(sequelize, DataTypes),

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

export default db;
