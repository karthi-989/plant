const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./src/config/dbConnect");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const addressRoutes=require("./src/routes/addressRoutes")




dbConnect();
const app = express();

//middileware

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/address",addressRoutes)


// Start The Server
const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
