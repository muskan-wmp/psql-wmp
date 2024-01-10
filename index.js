const express = require("express");
const bodyParser = require("body-parser");
const { createDBConnection } = require("./db_connection/postgresql.js");
const { userModel, departmentModel, taskModel } = require("./Model/index.js");
const app = express();
app.use(bodyParser.json());

// Directly use the userModel in your routes
const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

app.listen(8081, async () => {
  console.log(`Server is running at http://localhost:8081`);
  await createDBConnection();
});
