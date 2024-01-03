const express = require ("express");
const bodyParser = require("body-parser");
const { connection } = require ("./postgresql.js");

const app = express();
app.use(bodyParser.json());
const port = 8081;

// You need to await the connection function to get the User model
const startServer = async () => {
  const { sequelize, User } = await connection();

  if (!User) {
    console.error('User model is not defined. Server cannot start.');
    process.exit(1);
  }

  // Import userRoutes after obtaining the User model
  const userRoutes = require("./routes/userRoutes")(User);

  app.use("/user", userRoutes);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

//   process.on('SIGINT', async () => {
//     await sequelize.close();
//     process.exit();
//   });
};

startServer();
