import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Author is required'],
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Category is required'],
        ref: 'Category'
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        trim: true
    },
    blogContent: {
        type: String,
        required: [true, 'Blog content is required'],
        trim: true
    },
    featuredImage: {
        type: String,
        required: [true, 'Featured image is required'],
        trim: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Blog = mongoose.model('Blog', blogSchema, 'blogs');
export default Blog; 