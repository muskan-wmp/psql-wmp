// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController.js");

module.exports = (User) => {
  // Signup route
  router.post("/signup", (req, res) => userController.signup(req, res, User));

  // Login route
  router.post("/login", (req, res) => userController.login(req, res, User));

  return router;
};
