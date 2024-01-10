const { Sequelize } = require("sequelize");
const defineUserModel = require("./user");
const defineDepartmentModel = require("./department");
const defineTaskModel = require("./task");

const sequelize = new Sequelize('student', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const userModel = defineUserModel(sequelize);
const departmentModel = defineDepartmentModel(sequelize);
const taskModel = defineTaskModel(sequelize);

// Define associations
userModel.hasOne(departmentModel, { foreignKey: 'deptId' });
departmentModel.belongsTo(userModel, { foreignKey: 'WmpId' });
userModel.hasMany(taskModel, { foreignKey: 'WmpId' });
taskModel.belongsTo(userModel, { foreignKey: 'WmpId' });

module.exports = {
  connection: sequelize,
  models: {
    userModel,
    departmentModel,
    taskModel,
  },
};
