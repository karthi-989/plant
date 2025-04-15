const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./src/config/dbConnect");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const addressRoutes=require("./src/routes/addressRoutes")
const cartRoutes=require("./src/routes/cartRoutes")



dbConnect();
const app = express();

//middileware
// app.use(
//   cors({
//     origin: "https://plant-kart-frontend.onrender.com", // Replace with your actual deployed frontend URL
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart",cartRoutes)


// Start The Server
const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
