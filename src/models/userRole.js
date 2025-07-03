const defineUserRoleModel = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("UserRole", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  UserRole.associate = (models) => {
    UserRole.hasMany(models.User, { foreignKey: "UserRoleId", as: "users" });
  };

  return UserRole;
};

export default defineUserRoleModel;