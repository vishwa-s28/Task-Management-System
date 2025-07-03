const defineCommentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: { type: DataTypes.TEXT, allowNull: false },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Task, { foreignKey: "TaskId", as: "task" });
    Comment.belongsTo(models.User, { foreignKey: "UserId", as: "user" });
  };

  return Comment;
};

export default defineCommentModel;
