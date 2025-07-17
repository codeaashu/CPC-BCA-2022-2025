const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "",         // replace with test key
  key_secret: "", // replace with test secret
});

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paisa
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order creation failed", error });
  }
});

module.exports = router;
