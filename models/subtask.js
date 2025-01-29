module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Subtask;
  };
  