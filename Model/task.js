const { DataTypes } = require("sequelize");

const defineTaskModel = (sequelize) => {
  const taskModel = sequelize.define("Task", {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  taskModel.associate = (models) => {
    taskModel.belongsTo(models.userModel, { foreignKey: "WmpId" });
  };

  return taskModel;
};

module.exports = defineTaskModel;
