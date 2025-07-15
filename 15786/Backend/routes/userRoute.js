import express from "express";
import { register, login, logout, isAuth, forgotPassword, resetPassword, verifyOtp } from "../controllers/userController.js";
import { authUser } from "../middlewares/authUser.js";

const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/logout", authUser, logout);
UserRouter.get("/is-auth", authUser, isAuth);

UserRouter.post("/forgot-password", forgotPassword);
UserRouter.post("/verify-otp", verifyOtp);
UserRouter.post("/reset-password/:token", resetPassword);

export default UserRouter;
