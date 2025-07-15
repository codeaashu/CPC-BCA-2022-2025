import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login first", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
});

export const isAdmin = catchAsyncErrors(async(req, res, next) => {
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler("Only Administrators Can Access This Resource!", 403));
    }
    next();
});

export const isTeacher = catchAsyncErrors(async(req, res, next) => {
    if (req.user.role !== "Teacher") {
        return next(new ErrorHandler("Only Teachers Can Access This Resource!", 403));
    }
    next();
});

export const isStudent = catchAsyncErrors(async(req, res, next) => {
    if (req.user.role !== "Student") {
        return next(new ErrorHandler("Only Students Can Access This Resource!", 403));
    }
    next();
});

export const isTeacherOrAdmin = catchAsyncErrors(async(req, res, next) => {
    if (!["Teacher", "Admin"].includes(req.user.role)) {
        return next(new ErrorHandler("Unauthorized Access!", 403));
    }
    next();
});