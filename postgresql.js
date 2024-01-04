// postgresql.js
const { Sequelize } = require("sequelize");
const User = require("./Model/user.js");

exports.connection = async () => {
  const sequelize = new Sequelize('student', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
  });
  try {
    // Attempt to authenticate the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Create the User model directly
    const userModel = User(sequelize);

    // Sync the model with the database
    await sequelize.sync(); //drop the existing table and recreate it.
    console.log("Table created");
    
    // Return the connection and User model
    return { sequelize, userModel };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Rethrow the error to signal the failure
  }
};