import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pincode: { type: String, required: true },
  area: { type: String, required: true }, // street name
  city: { type: String, required: true },
  state: { type: String, required: true },
}, {
  timestamps: true,
});

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;
