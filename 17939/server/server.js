// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import { clerkMiddleware } from '@clerk/express';

// Route imports
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js'; // ✅ NEW ROUTE

// Initialize app
const app = express();

// ✅ Immediately invoke DB and Cloudinary connections inside an async function
const startServer = async () => {
  try {
    // Connect to DB and Cloudinary
    await connectDB();
    await connectCloudinary();

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(clerkMiddleware());

    // Routes
    app.get('/', (req, res) => res.send("API Working"));

    app.get("/debug-sentry", (req, res) => {
      throw new Error("My first Sentry error!");
    });

    app.post('/webhooks', clerkWebhooks);
    app.use('/api/company', companyRoutes);
    app.use('/api/jobs', jobRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/analytics', analyticsRoutes); // ✅ Mount analytics route here

    // Sentry error handler
    Sentry.setupExpressErrorHandler(app);

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

// ✅ Run the async setup
startServer();
