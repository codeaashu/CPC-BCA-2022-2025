import express from "express";
import { updateCart } from "../controller/cart.controller.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();
router.post("/update", authUser, updateCart);
export default router;
