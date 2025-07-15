import express from "express";
import { contactUs } from "../controller/messageController.js";

const router = express.Router();

router.post("/contact", contactUs);

export default router;