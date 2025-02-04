const defineReminderModel = (sequelize, DataTypes) => {
  const Reminder = sequelize.define("Reminder", {
    reminderTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Reminder.associate = (models) => {
    Reminder.belongsTo(models.Task, {
      foreignKey: "TaskId",
      as: "task",
    });

    Reminder.belongsTo(models.SubTask, {
      foreignKey: "SubtaskId",
      as: "subtask",
    });
  };

  return Reminder;
};

export default defineReminderModel;
