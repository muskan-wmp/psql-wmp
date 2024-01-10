const { DataTypes } = require("sequelize");

const defineDepartmentModel = (sequelize) => {
  const departmentModel = sequelize.define("Department", {
    deptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    depname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  departmentModel.associate = (models) => {
    departmentModel.hasMany(models.taskModel);
  };

  return departmentModel;
};

module.exports = defineDepartmentModel;
