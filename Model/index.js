const { Sequelize } = require("sequelize");
const defineUserModel = require("./user");

const sequelize = new Sequelize('student', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const userModel = defineUserModel(sequelize);

module.exports = {
  connection: sequelize,
  userModel,
};