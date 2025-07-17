const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount, // in paise (e.g., ₹100 = 10000)
      currency: currency || "INR",
      receipt: receipt || `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("❌ Error creating Razorpay order:", err);
    res.status(500).send("Server error while creating order");
  }
});

module.exports = router;
