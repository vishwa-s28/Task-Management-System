const defineProjectModel = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Project.associate = (models) => {
    Project.hasMany(models.Task, {
      foreignKey: "ProjectId",
      as: "tasks",
    });

    Project.belongsToMany(models.User, {
      through: models.ProjectUser,
      as: "members",
      foreignKey: "ProjectId"
    });

  };

  return Project;
};

export default defineProjectModel;
