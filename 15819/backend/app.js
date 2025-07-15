import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";

const app = express();
config({ path: "./config/config.env" });

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders:["Content-Type","Authorization"],
    exposedHeaders:["Content-Type","Authorization"]
}));

app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

export default app;