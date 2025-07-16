import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.error("ERROR ❌", err);
  
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, null, err.message));
  }
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, null, message));
};