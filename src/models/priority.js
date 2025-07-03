const defineStatusModel = (sequelize, DataTypes) => {
  const Priority = sequelize.define("Priority", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#3B82F6",
    },
  });

  Priority.associate = (models) => {
    Priority.hasMany(models.Task, {
      foreignKey: "PriorityId",
      as: "tasks",
    });

    Priority.hasMany(models.SubTask, {
      foreignKey: "PriorityId",
      as: "subtasks",
    });
  };

  return Priority;
};

export default defineStatusModel;
