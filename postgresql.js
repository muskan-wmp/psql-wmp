
const { Sequelize } = require("sequelize");
const { userModel } = require("./Model/user.js");

exports.connection = async () => {
  const sequelize = new Sequelize('student', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
  });

  let User = null;

  try {
    // Attempt to authenticate the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Create the User model using userModel function
    User = userModel(sequelize);

    // Sync the model with the database
    await sequelize.sync();
    console.log("Table created");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // Return the connection and User model
  return { sequelize, User };
};
