import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Exclude password from default queries
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },

    // Optional: Add seller-specific fields
    storeName: {
      type: String,
      required: function () {
        return this.role === "seller";
      },
      trim: true,
    },

    sellerVerified: {
      type: Boolean,
      default: false,
    },

    // Buyer-specific fields
    cartItems: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// ✅ Fix for Next.js hot-reload model overwrite issue
const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
