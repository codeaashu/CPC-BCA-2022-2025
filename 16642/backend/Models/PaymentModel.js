const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  verified: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
