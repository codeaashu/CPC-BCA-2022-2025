// import mongoose from "mongoose";
// import { MEGA_DB } from "./constants";
// import express from 'express'
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env",
});

// ANOTHER APPROACH
connectDB()
    .then(() => {
        app.on("error", () => {
            console.log("ERROR", error);
            throw error;
        });

        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection FAILED !!! ", err);
    });

/* first Approach
const app = express();
(async()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${MEGA_DB}`)
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        });
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error('"Error : ',error);
        throw error;
    }
})()
*/
