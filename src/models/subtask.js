const defineSubtaskModel = (sequelize, DataTypes) => {
  const Subtask = sequelize.define("Subtask", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    PriorityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  Subtask.associate = (models) => {
    Subtask.belongsTo(models.Task, {
      foreignKey: "TaskId",
      as: "task",
      onDelete: "CASCADE",
    });

    Subtask.belongsTo(models.Status, {
      foreignKey: "StatusId",
      as: "status",
    });

    Subtask.belongsTo(models.Priority, {
      foreignKey: "PriorityId",
      as: "priority",
    });
  };

  return Subtask;
};

export default defineSubtaskModel;
