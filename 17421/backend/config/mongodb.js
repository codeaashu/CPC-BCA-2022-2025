import mongoose from "mongoose";



const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/appointments`);
    mongoose.connection.on("error", (err) => {
        console.log("MongoDB connection failed", err);
    });
}

export default connectDB;