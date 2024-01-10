const express = require("express");
const router = express.Router();
// const { userModel, departmentModel } = require("../Model/index.js");
const userController = require("../Controller/userController.js");
const deptController = require("../Controller/deptController.js")

  // Signup route
  router.post("/signup", (req, res) => userController.signup(req, res));
  router.get("/allUsersWithJoin", (req, res) => userController.allUsersWithJoin(req, res));
  // Login route
  router.post("/login", (req, res) => userController.login(req, res));

  router.get("/allusers",(req, res) => userController.allUsers(req, res));

  router.put("/update/:id", (req, res) => userController.updateUser(req, res));

  router.post("/addept", (req, res) => deptController.addeptinfo(req, res));

  router.delete("/delete/:id", (req, res) => userController.deleteUser(req, res));

module.exports = router
