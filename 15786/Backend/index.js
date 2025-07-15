import express  from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 
import connectDB from "./configs/db.js";
import "dotenv/config";
import UserRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
const app= express();


await connectDB()
await connectCloudinary()

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

//API EndPoints
app.get("/",(req , res )=>{
    res.send("Hello from the backend");
});
app.use("/api/users", UserRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);



const PORT=process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
