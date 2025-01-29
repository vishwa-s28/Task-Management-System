module.exports = (sequelize, DataTypes) => {
    const Reminder = sequelize.define('Reminder', {
      reminderTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    return Reminder;
  };
  