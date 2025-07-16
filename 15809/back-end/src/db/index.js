import mongoose from "mongoose";
import { MEGA_DB } from "../constants.js";

const connectDB = async ()=>{
    try {
         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${MEGA_DB}`)
         console.log(`\n MongoDB connected !! DB Host : ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB connection FAILED ",error);
        process.exit(1)
        
        
    }
}

export default connectDB;