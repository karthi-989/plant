const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "viewer"],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true, // This ensures phone number is unique
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
