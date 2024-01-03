const User = require("../Model/user.js");

exports.signup = async (req, res,User) => {
  console.log("Signup route hit");

  const { name, age, email, mobile_no, address, password} = req.body;

  try {
    console.log("Received name:", name);
    console.log("Received name:", email);
    console.log("Received name:", age);
    console.log("Received name:", address);
    console.log("Received name:", mobile_no);
    console.log("Received name:", password);

    // Create a new user in the database
    const newEmployee = await User.create({ name, age, email, mobile_no, address ,password});

    res.status(201).json({
      id: newEmployee.id,
      name: newEmployee.name,
      age: newEmployee.age,
      email: newEmployee.email,
      address: newEmployee.address,
      mobile_no: newEmployee.mobile_no,
      password:newEmployee.password,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res,User) => {
  const { password, email } = req.body;

  try {
    // Check if the user exists in the database
    const existingEmployee = await User.findOne({ where: { email, password } });

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
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
