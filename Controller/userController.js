const User = require("../Model/user.js");
const Crud = require("../Crud/crudOpeartion.js"); // Import the Crud class
const { userModel } = require("../Model/index.js");

const userCrud = new Crud(userModel); // Instantiate Crud class with User model

exports.signup = async (req, res) => {
  console.log("Signup route hit");

  const { name, age, email, mobile_no, address, password } = req.body;

  try {
    console.log("Received name:", name);
    console.log("Received email:", email);
    console.log("Received age:", age);
    console.log("Received address:", address);
    console.log("Received mobile_no:", mobile_no);
    console.log("Received password:", password);

    // Create a new user in the database using Crud class
    const newEmployee = await userCrud.create({
      name,
      age,
      email,
      mobile_no,
      address,
      password,
    });

    res.status(201).json({
      id: newEmployee.id,
      name: newEmployee.name,
      age: newEmployee.age,
      email: newEmployee.email,
      address: newEmployee.address,
      mobile_no: newEmployee.mobile_no,
      password: newEmployee.password,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database using Crud class
    const existingEmployee = await userCrud.findOne({ email, password });

    if (existingEmployee) {
      res.status(200).json({
        id: existingEmployee.id,
        email: existingEmployee.email,
        password: existingEmployee.password,
      });
      console.log("Logged in successfully");
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// userController.js

exports.allUsers = async (req, res) => {
  try {
    // Call the allUsers method on the userCrud instance
    const allUsers = await userCrud.allUsers();

    if (allUsers.length > 0) {
      res.json({ allUsers });
      console.log("All employees displayed");
    } else {
      res.json("No employees exist");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, age, email, mobile_no, address, password } = req.body;

  try {
    const updatedUser = await userCrud.update(id, {
      name,
      age,
      email,
      mobile_no,
      address,
      password,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const isDeleted = await userCrud.delete(id);

    if (isDeleted) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

