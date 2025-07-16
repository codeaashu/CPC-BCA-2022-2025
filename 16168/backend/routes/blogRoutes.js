// Add search endpoint
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            // Return recent blogs if no search query
            const recentBlogs = await Blog.find({ status: 'published' })
                .select('_id title description slug category createdAt featuredImage author')
                .populate('category', 'name slug')
                .populate('author', 'name role')
                .sort({ createdAt: -1 })
                .limit(5);
            return res.json({ blogs: recentBlogs });
        }

        console.log('Searching for:', q);

        // First find matching categories
        const categories = await Category.find({
            name: { $regex: q, $options: 'i' }
        });
        const categoryIds = categories.map(cat => cat._id);

        // Search in blogs with category matches
        const blogs = await Blog.find({
            status: 'published',
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { category: { $in: categoryIds } }  // Match blogs in matching categories
            ]
        })
        .select('_id title description slug category createdAt featuredImage author')
        .populate('category', 'name slug')
        .populate('author', 'name role')
        .sort({ createdAt: -1 })
        .limit(10);

        console.log('Found blogs:', blogs.length);
        console.log('Matching categories:', categories.length);

        res.json({ 
            blogs: blogs,
            categories: categories
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error performing search' });
    }
});

// Add route for related blogs by category
router.get('/category/:slug/related', async (req, res) => {
    try {
        const { slug } = req.params;
        
        // First find the category
        const category = await Category.findOne({ slug });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find related blogs in the same category
        const relatedBlogs = await Blog.find({
            category: category._id,
            status: 'published'
        })
        .select('_id title description slug category createdAt featuredImage')
        .populate('category', 'name slug')
        .sort({ createdAt: -1 })
        .limit(3);

        res.json({ blogs: relatedBlogs });
    } catch (error) {
        console.error('Error fetching related blogs:', error);
        res.status(500).json({ message: 'Error fetching related blogs' });
    }
}); 