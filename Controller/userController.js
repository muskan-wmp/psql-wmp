const userModel = require("../Model/user.js")

exports.signup = async (req, res) => {
      console.log("Signup route hit"); // Add this line for debugging
      const { user, name } = req.body;
  
      try {
        console.log("Received user:", user); // Add this line for debugging
        console.log("Received name:", name); // Add this line for debugging
  
        // Create a new user in the database
        const newUser = await User.create({ user, name });
  
        res.status(201).json({
          id: newUser.id,
          user: newUser.user,
          name: newUser.name,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};
  
exports.login = async (req, res) => {
      const { user, name } = req.body;
  
      try {
        // Check if the user exists in the database
        const existingUser = await User.findOne({ where: { user, name } });
  
        if (existingUser) {
          res.status(200).json({
            id: existingUser.id,
            user: existingUser.user,
            name: existingUser.name,
          });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};