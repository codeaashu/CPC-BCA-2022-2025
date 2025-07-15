import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id; // get it from the verified JWT
    const { cartItems } = req.body; //  only cartItems from client

    console.log(" Authenticated userId:", userId);

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
