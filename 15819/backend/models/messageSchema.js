import mongoose from "mongoose";
import validator from "validator";

// const announcementSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, "Announcement Title Is Required!"],
//         minLength: [5, "Title Must Contain At least 5 Characters!"]
//     },
//     content: {
//         type: String,
//         required: [true, "Announcement Content Is Required!"],
//         minLength: [10, "Content Must Contain At least 10 Characters!"]
//     },
//     type: {
//         type: String,
//         enum: ['General', 'Academic', 'Event', 'Emergency', 'Holiday'],
//         required: true
//     },
//     target: {
//         department: String,
//         semester: Number,
//         course: String
//     },
//     postedBy: {
//         userId: {
//             type: mongoose.Schema.ObjectId,
//             ref: 'User',
//             required: true
//         },
//         name: String,
//         role: String
//     },
//     attachments: [{
//         public_id: String,
//         url: String,
//         name: String
//     }],
//     importance: {
//         type: String,
//         enum: ['Low', 'Medium', 'High'],
//         default: 'Medium'
//     },
//     validUntil: {
//         type: Date
//     }
// }, {
//     timestamps: true
// });

// // Index for efficient queries
// announcementSchema.index({ type: 1, 'target.department': 1, 'target.semester': 1 });

// export const Announcement = mongoose.model("Announcement", announcementSchema);

const messageSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Full Name Is Required!"],
        minLength: [3, "Full Name Must Contain At least 3 Characters!"]
    },
    email: {
        type: String,
        required: [true, "Email Is Required!"],
        validate: [validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number Is Required!"],
        minLength: [10, "Phone Number Must Contain 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain 10 Digits!"]
    },
    enquiryReason: {
        type: String,
        required: [true, "Enquiry Reason Is Required!"],
        minLength: [10, "Enquiry Reason Must Contain At Least 10 Characters!"]
    }
}, {
    timestamps: true
});

export const Message = mongoose.model("Message", messageSchema);