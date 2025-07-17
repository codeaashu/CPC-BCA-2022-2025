// backend/Models/TransactionModel.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  email: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
