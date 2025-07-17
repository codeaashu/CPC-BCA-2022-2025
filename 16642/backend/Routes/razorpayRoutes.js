const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config();
const PaymentModel = require("../Models/PaymentModel");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount, currency = "INR", receipt = `rcpt_${Date.now()}` } = req.body;
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).send("Server error while creating order");
  }
});

// Verify payment
router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    currency = "INR",
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  try {
    const payment = new PaymentModel({
      amount: amount,
      currency: currency,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      verified: isValid,
    });

    await payment.save();

    if (isValid) {
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature. Payment failed" });
    }
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all payments
router.get("/all-payments", async (req, res) => {
  try {
    const allPayments = await PaymentModel.find().sort({ createdAt: -1 });
    res.json(allPayments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).send("Server error fetching payments");
  }
});


module.exports = router;
