const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: "UserId",
      as: "tasks",
    });
    User.belongsToMany(models.Task, {
      through: "UserTasks",
      as: "sharedTasks",
      foreignKey: "UserId",
    });
    User.hasMany(models.Reminder, {
      foreignKey: "UserId",
      as: "reminders",
    });
  };

  return User;
};

export default defineUserModel;
