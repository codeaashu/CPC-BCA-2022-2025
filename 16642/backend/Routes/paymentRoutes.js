const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount, currency = "INR", receipt = "receipt_order_74394" } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt,
    };
    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify Razorpay payment
router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.status(200).json({ success: true, message: "Payment verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature, verification failed" });
  }
});

module.exports = router;
