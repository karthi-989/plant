const Address = require("../models/address"); // Adjust the path as necessary

exports.addAddress = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user); // Debugging to ensure req.user is set

    const { name, phoneNumber, address, pincode, landmark } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !address || !pincode) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Create a new address with userId
    const newAddress = new Address({
      userId: req.user.id, // Add the userId from req.user
      name,
      phoneNumber,
      address,
      pincode,
      landmark,
    });

    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address saved successfully.", address: newAddress });
  } catch (error) {
    console.error("Error saving address:", error.message);
    res
      .status(500)
      .json({ message: "Error saving address.", error: error.message });
  }
};
// this is for git changes
exports.getAllAddresses = async (req, res) => {
  try {
    // Assuming `req.user.id` contains the authenticated user's ID
    const userId = req.user.id;

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

