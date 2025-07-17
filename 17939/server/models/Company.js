import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    image: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);


//companySchema.index({ email: 1 });

const Company = mongoose.model("Company", companySchema);

export default Company;
