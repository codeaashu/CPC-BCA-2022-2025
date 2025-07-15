import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const contactUs = catchAsyncErrors(async(req, res, next) => {
    const { fullname, email, phone, enquiryReason } = req.body;
    
    if (!fullname || !email || !phone || !enquiryReason) {
        return next(new ErrorHandler("Please Fill All Required Fields!", 400));
    }

    await Message.create({ 
        fullname, 
        email, 
        phone, 
        enquiryReason 
    });

    res.status(200).json({
        success: true,
        message: "Enquiry Submitted Successfully"
    });
});