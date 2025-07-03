const defineProjectUserModel = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define("ProjectUser", {
    role: {
      type: DataTypes.ENUM("owner", "member"),
      allowNull: false,
      defaultValue: "member",
    },
  });

  return ProjectUser;
};

export default defineProjectUserModel;