module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  
    return Task;
  };
  