import mongoose from "mongoose"

// Define user schema
const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  cartData:{type:Object,default:{}} // user cart record
}, {minimize:false})

const userModel = mongoose.models.user || mongoose.model("user" ,userSchema);
export default userModel;