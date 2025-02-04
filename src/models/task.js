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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "user",
    });

    Task.hasMany(models.SubTask, {
      foreignKey: "TaskId",
      as: "subtasks",
      onDelete: "CASCADE",
    });

    Task.belongsTo(models.Status, {
      foreignKey: "StatusId",
      as: "status",
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

    Task.belongsTo(models.Project, {
      foreignKey: "ProjectId",
      as: "project",
    });
  };

  return Task;
};

export default defineTaskModel;
