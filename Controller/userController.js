const User = require("../Model/user.js");
const Crud = require("../Crud/crudOperation.js"); // Import the Crud class
const { userModel } = require("../Model/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCrud = new Crud(userModel); // Instantiate Crud class with User model
const SECRET_KEY ='Password12$';
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
    const hashed_password = await bcrypt.hash(password, 10)
    // Create a new user in the database using Crud class
    const newEmployee = await userCrud.create({
      name,
      age,
      email,
      mobile_no,
      address,
      password:hashed_password,
    });

    res.status(201).json({
      message:"user Created Successfully",
      id: newEmployee.id,
      name: newEmployee.name,
      age: newEmployee.age,
      email: newEmployee.email,
      address: newEmployee.address,
      mobile_no: newEmployee.mobile_no,
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
      // Generate a token with user information
      const token = jwt.sign(
        {
          userId: existingEmployee.id,
          email: existingEmployee.email,
        },
        'SECRET_KEY', // Replace with your own secret key
        { expiresIn: '1h' } // Optional: set the expiration time for the token
      );
      res.status(200).json({
        id: existingEmployee.id,
        token:token,
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
      res.json("No employee exist");
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
    res.json("Employee details updated")
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

