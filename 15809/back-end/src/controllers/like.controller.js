import mongoose, { isValidObjectId, mongo } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const user = req.user?._id;
    
    try {
        if (!videoId?.trim) throw new ApiError(400, "video Id required");

        if (!isValidObjectId(videoId))
            throw new ApiError(404, "video id is not valid");

        if (!user) throw new ApiError(401, "User Unauthorized");

        // let liked;

        const isLiked = await Like.findOne({
            $and: [{ video: videoId }, { likedBy: req.user?._id }],
        });

        if (isLiked) {
            await Like.findOneAndDelete(isLiked._id);
            return res
                .status(200)
                .json(new ApiResponse(200, {}, " sucessfully Unliked"));
        }
        if (!isLiked) {
            const liked = await Like.create({
                video: videoId,
                likedBy: req.user?._id,
            });
            return res
                .status(200)
                .json(new ApiResponse(200, liked, "sucessfully Liked "));
        }
    } catch (error) {
        throw error;
    }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    

    const { commentId } = req.params;
    const user = req.user?._id;
    let liked;
    try {
        if (!commentId) throw new ApiError(400, "comment id is required");
        if (!isValidObjectId(commentId))
            throw new ApiError(404, "comment id is not valid");
        if (!user) throw new ApiError(400, "User Id is required");

        const isLiked = await Like.findOne({
            $and: [{ comment: commentId }, { likedBy: user }],
        });

        if (isLiked) {
            await Like.findOneAndDelete({
                $and: [{ comment: commentId }, { likedBy: user }],
            });
            return res
                .status(200)
                .json(new ApiResponse(200, {}, "Comment Unliked sucessfully"));
        }
        if (!isLiked) {
            liked = await Like.create({
                comment: commentId,
                likedBy: user,
            });
            return res
                .status(200)
                .json(new ApiResponse(200, liked, "Comment Liked sucessfully"));
        }
    } catch (error) {
        throw error;
    }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
 
    const { tweetId } = req.params;
    const user = req.user?._id;
    let liked;

    try {
        if (!tweetId) throw new ApiError(400, "comment id is required");
        if (!isValidObjectId(tweetId))
            throw new ApiError(404, "tweet id is not valid");
        if (!user) throw new ApiError(400, "User Id is required");

        const isLiked = await Like.findOne({
            $and: [{ tweet: tweetId }, { likedBy: user }],
        });

        if (isLiked) {
            await Like.findOneAndDelete({
                $and: [{ tweet: tweetId }, { likedBy: user }],
            });
            return res
                .status(200)
                .json(new ApiResponse(200, {}, "Tweet Unliked sucessfully"));
        }
        if (!isLiked) {
            liked = await Like.create({
                tweet: tweetId,
                likedBy: user,
            });
            return res
                .status(200)
                .json(new ApiResponse(200, liked, "Tweet Liked sucessfully"));
        }
    } catch (error) {
        throw error;
    }
});

const getLikedVideos = asyncHandler(async (req, res) => {
     try {
        const likedVideos = await Like.aggregate([
            {
                $match: { likedBy: new mongoose.Types.ObjectId(req.user?._id) },
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "video",
                    foreignField: "_id",
                    as: "likedVideos",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "owner",
                                foreignField: "_id",
                                as: "owner",
                                pipeline: [
                                    {
                                        $project: {
                                            username: 1,
                                            fullName: 1,
                                            avatar: 1,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $addFields: {
                                owner: {
                                    $arrayElemAt: ["$owner.fullName", 0],
                                },
                                avatar: {
                                    $arrayElemAt: ["$owner.avatar", 0],
                                },
                                username: {
                                    $arrayElemAt: ["$owner.username", 0],
                                },
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$likedVideos",
            },
            {
                $replaceRoot: {
                    newRoot: "$likedVideos",
                },
            },
        ]);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    likedVideos,
                    "Fetched successfully liked videos"
                )
            );
    } catch (error) {
        throw error;
    }
});

const getLikedComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    try {
        if (!commentId) {
            throw new ApiError(400, "Comment ID is required");
        }

        if (!isValidObjectId(commentId)) {
            throw new ApiError(400, "Invalid comment ID format");
        }

        // const likedComment = await Like.aggregate([
        //     {
        //         $match:{
        //             comment: new mongoose.Types.ObjectId(commentId),
        //             likedBy: new mongoose.Types.ObjectId(req.user?._id)
        //         }
        //     },
        // ]);

        const likedComment = await Like.findOne({
            comment:commentId,
            likedBy:req.user?._id
        })
        
        return res
        .status(200)
        .json(new ApiResponse(200,likedComment,"Successfully fetched like comments"))
    } catch (error) {
        throw error
    }
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos,getLikedComment };
