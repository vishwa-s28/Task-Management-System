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
    UserRoleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.UserRole, {
      foreignKey: "UserRoleId",
      as: "roleInfo",
    });
    User.hasMany(models.Task, {
      foreignKey: "CreatedBy",
      as: "createdTasks",
    });
    User.belongsToMany(models.Task, {
      through: "UserTasks",
      as: "sharedTasks",
      foreignKey: "UserId",
    });
    User.belongsToMany(models.Task, {
      through: "TaskAssignees",
      as: "assignedTasks",
      foreignKey: "UserId",
    });
    User.hasMany(models.Reminder, {
      foreignKey: "UserId",
      as: "reminders",
    });
    User.hasMany(models.Comment, {
      foreignKey: "UserId",
      as: "comments",
    });
  };

  return User;
};

export default defineUserModel;
