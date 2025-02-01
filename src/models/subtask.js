module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      StatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, 
      }
    });

    Subtask.associate = (models) => {
      Subtask.belongsTo(models.Task, {
        foreignKey: 'TaskId',
        as: 'task',
      });
  
      Subtask.belongsTo(models.Status, {
        foreignKey: 'StatusId',
        as: 'status',
      });
  
      Subtask.hasMany(models.Reminder, {
        foreignKey: 'SubtaskId',
        as: 'reminders',
      });
    };
  
    return Subtask;
  };
  