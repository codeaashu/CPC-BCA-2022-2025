import cloudinary from "../config/cloudinary.js"
import { handleError } from "../helpers/handleError.js"
import Blog from "../models/blog.model.js"
import { encode } from 'entities'
import Category from "../models/category.model.js"

export const addBlog = async (req, res, next) => {
    try {
        if (!req.body.data) {
            return next(handleError(400, 'Blog data is required'));
        }

        const data = JSON.parse(req.body.data);
        
        if (!data.author || !data.category || !data.title || !data.slug || !data.blogContent) {
            return next(handleError(400, 'All fields are required'));
        }

        let featuredImage = '';
        if (req.file) {
            try {
                const uploadResult = await cloudinary.uploader.upload(
                    req.file.path || req.file.buffer,
                    { 
                        folder: 'yt-mern-blog', 
                        resource_type: 'auto',
                        use_filename: true,
                        unique_filename: true
                    }
                );
                featuredImage = uploadResult.secure_url;
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return next(handleError(500, 'Error uploading image: ' + error.message));
            }
        } else {
            return next(handleError(400, 'Featured image is required'));
        }
        
        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: `${data.slug}-${Math.round(Math.random() * 100000)}`,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent),
        });

        await blog.save();

        res.status(200).json({
            success: true,
            message: 'Blog added successfully.',
            blog
        });

    } catch (error) {
        console.error('Error adding blog:', error);
        next(handleError(500, error.message));
    }
};

export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const data = JSON.parse(req.body.data)

        const blog = await Blog.findById(blogid)

        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)

        let featuredImage = blog.featuredImage

        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            featuredImage = uploadResult.secure_url
        }

        blog.featuredImage = featuredImage

        await blog.save()


        res.status(200).json({
            success: true,
            message: 'Blog updated successfully.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200).json({
            success: true,
            message: 'Blog Deleted successfully.',
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showAllBlog = async (req, res, next) => {
    try {
        const blog = await Blog.find()
            .populate('author', 'name avatar role')
            .populate('category', 'name slug')
            .select('title slug featuredImage category author createdAt blogContent')
            .sort({ createdAt: -1 })
            .lean()
            .exec();
            
        res.status(200).json({
            success: true,
            blog
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const getBlog = async (req, res, next) => {
    try {
        const { slug } = req.params
        const blog = await Blog.findOne({ slug }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getRelatedBlog = async (req, res, next) => {
    try {
        const { category, blog } = req.params

        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, 'Category data not found.')
        }
        const categoryId = categoryData._id
        const relatedBlog = await Blog.find({ category: categoryId, slug: { $ne: blog } }).lean().exec()
        res.status(200).json({
            relatedBlog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getBlogByCategory = async (req, res, next) => {
    try {
        const { category } = req.params

        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, 'Category data not found.')
        }
        const categoryId = categoryData._id
        const blog = await Blog.find({ category: categoryId }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog,
            categoryData
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const search = async (req, res, next) => {
    try {
        const { q } = req.query;

        const blog = await Blog.find({ 
            title: { $regex: q, $options: 'i' } 
        })
        .populate('author', 'name avatar role')
        .populate('category', 'name slug')
        .select('title slug featuredImage category author createdAt blogContent')
        .sort({ createdAt: -1 })
        .lean()
        .exec();

        res.status(200).json({
            blogs: blog
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const getAllBlogs = async (req, res, next) => {
    try {
        const user = req.user
        const blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        res.status(200).json({
            blog,
            
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
