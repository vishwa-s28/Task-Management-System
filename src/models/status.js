module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define("Status", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Status.associate = (models) => {
    Status.hasMany(models.Task, {
      foreignKey: "StatusId",
      as: "tasks",
    });

    Status.hasMany(models.SubTask, {
      foreignKey: "StatusId",
      as: "subtasks",
    });
  };

  return Status;
};
