import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  
    const { content } = req.body;

    try {
        if (!content) throw new ApiError(400, "Content is required");
        const createContent = await Tweet.create({
            content,
            owner: req.user?._id,
        });
        if (!createContent) throw new ApiError(400, "Content not created");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    createContent,
                    "Content created successfully"
                )
            );
    } catch (error) {
        throw error;
    }
});

const getUserTweets = asyncHandler(async (req, res) => {
    
    const { userId } = req.params;
    // const userId = req.user?._id;
    try {
        if (!isValidObjectId(userId))
            throw new ApiError(404, "user id is not valid");
        const tweets = await Tweet.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId),
                },
            },
        ]);
        return res
            .status(200)
            .json(new ApiResponse(200, tweets, "Successfully got user tweet"));
    } catch (error) {
        throw error;
    }
});

const updateTweet = asyncHandler(async (req, res) => {
    
    const { tweetId } = req.params;
    const { content } = req.body;

    try {
        if (!isValidObjectId(tweetId))
            throw new ApiError(404, "Tweet id is Invalid");

        const updatedTweet = await Tweet.findByIdAndUpdate(
            tweetId,
            {
                $set: {
                    content,
                },
            },
            {
                new: true,
            }
        );

        return res
            .status(200)
            .json(
                new ApiResponse(200, updatedTweet, "Tweet successfully updated")
            );
    } catch (error) {
        throw error;
    }
});

const deleteTweet = asyncHandler(async (req, res) => {
    
    const { tweetId } = req.params;
    try {
        if (!isValidObjectId) new ApiError(404, "Tweet id is unvalid");
        await Tweet.findByIdAndDelete(tweetId);

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Tweet successfully deleted"));
    } catch (error) {
        throw error;
    }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
