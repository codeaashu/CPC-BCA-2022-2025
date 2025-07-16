import { handleError } from "../helpers/handleError.js";
import User from "../user.model.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

export const getUser = async (req, res, next) => {
    try {
        const { userid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return next(handleError(400, 'Invalid user ID format'));
        }

        const user = await User.findOne({ _id: userid }).lean().exec();
 
        if (!user) {
            return next(handleError(404, 'User not found'));
        }

        res.status(200).json({
            success: true,
            message: 'User data found,',
            user
        });
    } catch (error) {
        return next(handleError(500, error.message));
    }
};

export const updateUser = async (req, res, next) => {
    try {
        console.log('Update user request params:', req.params);
        console.log('Update user request body:', req.body);
        
        let data;
        try {
            data = JSON.parse(req.body.data);
        } catch (error) {
            return next(handleError(400, 'Invalid request data format'));
        }

        const { userid } = req.params;

        if (!userid) {
            return next(handleError(400, 'User ID is required'));
        }

        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return next(handleError(400, 'Invalid user ID format'));
        }

        if (!data.name || !data.email) {
            return next(handleError(400, 'Name and email are required'));
        }

        const user = await User.findById(userid);
        if (!user) {
            return next(handleError(404, 'User not found'));
        }

        console.log('Found user:', user);

        user.name = data.name;
        user.email = data.email;
        user.bio = data.bio;

        if (data.password && data.password.length >= 8) {
            const hashedPassword = bcryptjs.hashSync(data.password);
            user.password = hashedPassword;
        }

        if (req.file) {
            try {
                // Upload an image
                const uploadResult = await cloudinary.uploader.upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                );
                user.avatar = uploadResult.secure_url;
            } catch (error) {
                return next(handleError(500, 'Error uploading image: ' + error.message));
            }
        }

        try {
            await user.save();
        } catch (error) {
            return next(handleError(500, 'Error saving user: ' + error.message));
        }

        const newUser = user.toObject({ getters: true });
        delete newUser.password; // Ensure password is not sent in response

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: newUser
        });

    } catch (error) {
        return next(handleError(500, error.message));
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, 'name email avatar createdAt').lean().exec();
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return next(handleError(500, error.message));
    }
};

