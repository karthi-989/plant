const Address = require("../models/address"); // Adjust the path as necessary
const mongoose = require("mongoose");

// Validation function for required fields
const validateAddressFields = (address) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    address: addr,
    city,
    state,
    country,
    pincode,
    email,
  } = address;
  if (
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !addr ||
    !city ||
    !state ||
    !country ||
    !pincode ||
    !email
  ) {
    return false;
  }
  return true;
};

exports.addAddress = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user); // Debugging to ensure req.user is set

    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      state,
      country,
      pincode,
      landmark,
      email,
    } = req.body;

    // Validate required fields
    if (!validateAddressFields(req.body)) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Create a new address with userId
    const newAddress = new Address({
      userId: req.user.id, // Add the userId from req.user
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      state,
      country,
      pincode,
      landmark,
      email,
    });

    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address saved successfully.", address: newAddress });
  } catch (error) {
    console.error("Error saving address:", error);
    res
      .status(500)
      .json({ message: "Error saving address.", error: error.message });
  }
};

exports.getAllAddresses = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID

    // Fetch addresses posted by the authenticated user
    const addresses = await Address.find({ userId }).populate(
      "userId",
      "username email"
    );
    res.status(200).json(addresses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving addresses.", error: error.message });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    const { id } = req.params; // Get the address ID from request params

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid address ID format." });
    }

    // Find the address with the given ID
    const address = await Address.findById(id).populate(
      "userId",
      "username email"
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error("Error retrieving address:", error);
    res
      .status(500)
      .json({ message: "Error retrieving address.", error: error.message });
  }
};

exports.editAddress = async (req, res) => {
  try {
    const { id } = req.params; // Get the address ID from request params
    const updatedData = req.body; // New address details from the request body

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid address ID format." });
    }

    // Validate required fields in updatedData
    if (!validateAddressFields(updatedData)) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Update the address with the given ID
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // Return the updated address
        runValidators: true, // Validate the data before updating
      }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found." });
    }

    res
      .status(200)
      .json({
        message: "Address updated successfully.",
        address: updatedAddress,
      });
  } catch (error) {
    console.error("Error updating address:", error);
    res
      .status(500)
      .json({ message: "Error updating address.", error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params; // Get the address ID from request params

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid address ID format." });
    }

    // Delete the address with the given ID
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found." });
    }

    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error("Error deleting address:", error);
    res
      .status(500)
      .json({ message: "Error deleting address.", error: error.message });
  }
};
