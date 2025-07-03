const defineTaskModel = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    PriorityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: "CreatedBy",
      as: "creator",
    });

    Task.belongsTo(models.Project, {
      foreignKey: "ProjectId",
      as: "project",
    });

    Task.belongsTo(models.Status, {
      foreignKey: "StatusId",
      as: "status",
    });

    Task.belongsTo(models.Priority, {
      foreignKey: "PriorityId",
      as: "priority",
    });

    Task.hasMany(models.SubTask, {
      foreignKey: "TaskId",
      as: "subtasks",
      onDelete: "CASCADE",
    });

    Task.hasMany(models.Reminder, {
      foreignKey: "TaskId",
      as: "reminders",
    });

    Task.belongsToMany(models.User, {
      through: "UserTasks",
      as: "sharedWith",
      foreignKey: "TaskId",
    });

    Task.belongsToMany(models.User, {
      through: "TaskAssignees",
      as: "assignees",
      foreignKey: "TaskId"
    });

    Task.belongsToMany(models.Label, {
      through: "TaskLabels",
      as: "labels",
      foreignKey: "TaskId"
    });

    Task.hasMany(models.Comment, {
      foreignKey: "TaskId",
      as: "comments"
    });
  };

  return Task;
};

export default defineTaskModel;
