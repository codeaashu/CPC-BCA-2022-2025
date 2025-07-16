import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const healthcheck = asyncHandler(async (req, res) => {
     try {
        return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "healthy")
        )
    } catch (error) {
        return res
        .status(404)
        .json(
            new ApiResponse(404, {}, "Unhealthy")
        )
        
    }
})

export {
    healthcheck
    }
    