const { connection } = require("../Model");

exports.createDBConnection = async () => {
  try {
    
    // Attempt to authenticate the connection
    await connection.authenticate();
    console.log('Connection has been established successfully.');

    // Sync the models with the database
    await connection.sync(); // drop the existing tables and recreate them --> sync({force: true})
    console.log("Tables created");

    // Return the connection and User model
    return { sequelize: connection, userModel: connection, departmentModel:connection};
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Rethrow the error to signal the failure
  }
};
