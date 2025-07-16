import express from "express";
import {
  checkAuth,
  sellerLogin,
  sellerLogout,
} from "../controller/seller.controller.js";
import { authSeller } from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/login", sellerLogin);
router.get("/is-auth", authSeller, checkAuth);
router.get("/logout", authSeller, sellerLogout);

export default router;
