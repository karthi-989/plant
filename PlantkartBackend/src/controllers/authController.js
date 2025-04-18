const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { username, password, confirmPassword, name, phoneNumber } = req.body;

    if (!username || !password || !confirmPassword || !name || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (username === "karthikmutyala999@gmail.com" && phoneNumber === "9553955273") {
     
      const existingAdmin = await User.findOne({
        $or: [{ username }, { phoneNumber }],
      });

      if (existingAdmin) {
        return res.status(409).json({
          message: "Admin username or phone number already exists.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({
        username,
        password: hashedPassword,
        name,
        phoneNumber,
        role: "admin", 
      });

      await newAdmin.save();
      return res
        .status(201)
        .json({ message: `Admin registered successfully: ${username}` });
    } else {
      
      const existingUser = await User.findOne({
        $or: [{ username }, { phoneNumber }],
      });

      if (existingUser) {
        return res.status(409).json({
          message:
            "Username or phone number already exists. Please choose another.",
        });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        name,
        phoneNumber,
        role: "viewer", 
      });

      await newUser.save();
      return res
        .status(201)
        .json({ message: `User registered successfully: ${username}` });
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;

   
    const user = await User.findOne({
      $or: [{ username }, { phoneNumber }],
    });
    if (!user) {
      return res.status(404).json({
        message: `User with username or phone number not found`,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    console.log("Logged in user:", username);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = {
  register,
  login,
};


