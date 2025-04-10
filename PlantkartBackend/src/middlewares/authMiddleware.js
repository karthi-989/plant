const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided. Authorization denied." });
    }

    try {
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      const user = await User.findById(decoded.id).select("name username role");

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      
      req.user = {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      };

      console.log("Authenticated user:", req.user);
      next(); 
    } catch (err) {
      console.error("Token validation error:", err);
      return res.status(400).json({ message: "Token is not valid." });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token provided. Authorization denied." });
  }
};

module.exports = verifyToken;
