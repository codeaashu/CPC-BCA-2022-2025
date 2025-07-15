import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID not found in token." });
    }

    const newAddress = await Address.create({
      ...req.body,
      user: userId, // field must match schema!
    });

    res.status(201).json({ success: true, address: newAddress });
  } catch (error) {
    console.log("Add address error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const addresses = await Address.find({ user: userId });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
