const defineLabelModel = (sequelize, DataTypes) => {
  const Label = sequelize.define("Label", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    color: { type: DataTypes.STRING, defaultValue: "#3B82F6" },
    type: {
      type: DataTypes.ENUM("bug", "feature", "design", "qa", "research", "backend", "frontend"),
      allowNull: false,
      defaultValue: "feature",
    },
  });

  Label.associate = (models) => {
    Label.belongsToMany(models.Task, { through: "TaskLabels", as: "tasks", foreignKey: "LabelId" });
  };

  return Label;
};

export default defineLabelModel;