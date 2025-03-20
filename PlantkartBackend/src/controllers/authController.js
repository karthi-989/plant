const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { username, password, confirmPassword, name, phoneNumber } = req.body;

    // Validate inputs
    if (!username || !password || !confirmPassword || !name || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if it's an admin user (using predefined username and phone number)
    if (username === "karthikmutyala999@gmail.com" && phoneNumber === "9553955273") {
      // Admin user has predefined username and phone number
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
        role: "admin", // Admin role is assigned automatically
      });

      await newAdmin.save();
      return res
        .status(201)
        .json({ message: `Admin registered successfully: ${username}` });
    } else {
      // For non-admin users, check if username or phone number already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { phoneNumber }],
      });

      if (existingUser) {
        return res.status(409).json({
          message:
            "Username or phone number already exists. Please choose another.",
        });
      }

      // Hash password and create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        name,
        phoneNumber,
        role: "viewer", // Default role for users
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

    // Find the user by username or phone number
    const user = await User.findOne({
      $or: [{ username }, { phoneNumber }],
    });
    if (!user) {
      return res.status(404).json({
        message: `User with username or phone number not found`,
      });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log the username for debugging
    console.log("Logged in user:", username);

    // Generate a token after successful authentication
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
const reg = async(res,req)=>{
  try{
    const{name,username,password}=req.body
    if(!name||!username||!password){
      return res.status(400).json("allfields are requires")
    }
     const hashedPassword= await bcrypt.hash(password, 10);
     const user = new User({
      name,
      username,
     })
     await user.save()
     return res.status(201).json({message: "user created succesfully"})

  }
  catch(err){
    console.error("Error during registration:", err);
    res.status(500).json({message:"something happend",error:errormessage})
  }


};
const log=async (req,res)=>{
  try{
      const{username,passwod}=req.body
      const user=await User.findOne({username})
      if(!user){
        return res.status(400).json({message:"user not found"})
      }
      const isMatch=await bcrypt.compare(passwod,user.password)
      if(!isMatch){
        return res.status(400).json({message:"invalid password"})
      }
      const token=jwt.sign(
        {user_id:user._id},
        process.env.SECRET_KEY,
        {expiresIn:"1h"}
      )
      return res.status(200).json({
         message:"login Succesfull",
         token,
         user:user.name

      })
  }
  catch(err){
    console.error("Error during login:", err);
    res.status(500).json
  }

}

module.exports = {
  register,
  login,
};


