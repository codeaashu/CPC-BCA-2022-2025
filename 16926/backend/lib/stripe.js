import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
