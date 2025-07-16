import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
     try {
        if (!channelId) throw new ApiError(400, "Channel id is required");
        if (!isValidObjectId(channelId))
            throw new ApiError(404, "Channel id is not valid");
        const user = req.user?._id;
        if (!user) throw (401, "User Unauthorized");

        const isSubscribed = await Subscription.findOne({
            $and: [{ subscriber: user }, { channel: channelId }],
        });

        if (isSubscribed) {
            await Subscription.findByIdAndDelete(isSubscribed._id);
            return res
                .status(200)
                .json(new ApiResponse(200, {}, "Sucessfully Unsubscribed"));
        }
        if (!isSubscribed) {
            const subscriber = await Subscription.create({
                subscriber: user,
                channel: channelId,
            });
            return res
                .status(200)
                .json(
                    new ApiResponse(200, subscriber, "Sucessfully subscribed")
                );
        }
    } catch (error) {
        throw error;
    }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
     const { channelId } = req.params;
    try {
        if (!channelId) throw new ApiError(400, "Channel id is required");
        if (!isValidObjectId)
            throw new ApiError(404, "Channel id is not valid");

        const channelSubscribers = await Subscription.aggregate([
            {
                $match: {
                    channel: new mongoose.Types.ObjectId(channelId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscriber",
                    foreignField: "_id",
                    as: "subscriber",
                },
            },

            {
                $unwind: "$subscriber",
            },

            {
                $project: {
                    _id: 0,
                    subscriber: {
                        _id:1,
                        fullName: 1,
                        email: 1,
                        username: 1,
                        avatar: 1,
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$subscriber",
                },
            },
        ]);

        if (!channelSubscribers.length)
            throw new ApiError(404, "No subscribers found");
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    channelSubscribers,
                    "Successfully fetched subscriber details"
                )
            );
    } catch (error) {
        throw error;
    }
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
 
    const { subscriberId } = req.params;
    try {
        if (!subscriberId) throw new ApiError(400, "Subscriber Id is required");
        if (!isValidObjectId(subscriberId))
            throw new ApiError(404, "Subscriber id is not valid");

        const subscribedChannels = await Subscription.aggregate([
            {
                $match: {
                    subscriber: new mongoose.Types.ObjectId(subscriberId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "channel",
                    foreignField: "_id",
                    as: "channels",
                },
            },
            {
                $unwind: "$channels",
            },
            {
                $project: {
                    _id: 0,
                    channels: {
                        _id:1,
                        fullName: 1,
                        email: 1,
                        username: 1,
                        avatar: 1,
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$channels",
                },
            },
        ]);
        if (!subscribedChannels.length)
            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    [],
                    "Channel not found"
                )
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscribedChannels,
                    "Successfully fetched channels"
                )
            );
    } catch (error) {
        throw error;
    }
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
