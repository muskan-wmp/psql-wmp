const express = require("express");
const bodyParser = require("body-parser");
const { connection } = require("./postgresql.js");

const app = express();
app.use(bodyParser.json());
const port = 8081;

// You need to await the connection function to get the userModel
const startServer = async () => {
  const { sequelize, userModel } = await connection(); // Change from Employee to userModel

  if (!userModel) {
    console.error('userModel is not defined. Server cannot start.');
    process.exit(1);
  }

  // Import userRoutes after obtaining the userModel
  const userRoutes = require("./routes/userRoutes")(userModel); // Change from Employee to userModel

  app.use("/user", userRoutes);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  process.on('SIGINT', async () => {
    await sequelize.close();
    process.exit();
  });
};

startServer();
