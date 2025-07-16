
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRoute from './routes/Auth.route.js';
import UserRoute from './routes/User.route.js';
import CategoryRoute from './routes/Category.route.js';
import BlogRoute from './routes/Blog.route.js';
import CommentRoute from './routes/Comment.route.js'; 
import BlogLikeRoute from './routes/Bloglike.route.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Route setup  
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/blog', BlogRoute);
app.use('/api/comment', CommentRoute); 
app.use('/api/blog-like', BlogLikeRoute);

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONN, { dbName: 'yt-mern-blog' })
    .then(() => console.log('Database connected.'))
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process on failure
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
});
