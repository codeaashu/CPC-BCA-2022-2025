import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Order Placed",
  },
  date: {
  type: Date,
  required: true,
  default: Date.now, // <- cleaner and better querying support
},

}, {
  timestamps: true,
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
