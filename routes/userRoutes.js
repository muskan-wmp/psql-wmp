const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController.js");

module.exports = () => {
  // Signup route
  router.post("/signup", (req, res) => userController.signup(req, res));

  // Login route
  router.post("/login", (req, res) => userController.login(req, res));

  router.get("/allusers",(req, res) => userController.allUsers(req, res));

  router.put("/update/:id", (req, res) => userController.updateUser(req, res));

  router.delete("/delete/:id", (req, res) => userController.deleteUser(req, res));

  return router;
};
