import rateLimit from "express-rate-limit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ApiResponse } from "../utils/ApiResponse.js";

// Set up logging directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, "../../log");
!fs.existsSync(logDir) && fs.mkdirSync(logDir, { recursive: true });

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 5,
    keyGenerator: req => req.ip,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        // Log rate limit event with sync to ensure writing
        try {
            const now = new Date();
            const utcTime = now.toISOString();
            const localTime = now.toLocaleString();
            fs.appendFileSync(
                path.join(logDir, "rate-limit.log"),
                `[UTC: ${utcTime} | Local: ${localTime}] Too many login attempts from IP: ${req.ip}\n`
            );
            console.log("Rate limit event logged successfully");
        } catch (err) {
            console.error("Failed to log rate limit event:", err);
        }
        
        // Calculate remaining time dynamically
        const now = Date.now();
        const timeRemaining = Math.max(1, Math.ceil((req.rateLimit.resetTime - now) / 60000));
        
        return res.status(options.statusCode).json(
            new ApiResponse(
                options.statusCode,
                {
                    retryAfter: `${timeRemaining} minutes`,
                    resetTime: new Date(req.rateLimit.resetTime).toISOString()
                },
                `Too many login attempts. Please try again after ${timeRemaining} minute${timeRemaining !== 1 ? 's' : ''}.`
            )
        );
    },
});

export { loginLimiter };