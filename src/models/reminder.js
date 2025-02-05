const defineReminderModel = (sequelize, DataTypes) => {
  const Reminder = sequelize.define("Reminder", {
    status: {
      type: DataTypes.ENUM("Pending", "Sent"),
      allowNull: false,
      defaultValue: "Pending",
    },
  });

  Reminder.associate = (models) => {
    Reminder.belongsTo(models.Task, {
      foreignKey: "TaskId",
      as: "task",
    });

    Reminder.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "user",
    });
  };

  return Reminder;
};

export default defineReminderModel;
