const Product = require('../models/Product');

// Store connected clients for SSE
const connectedClients = new Set();

// Function to send updates to all connected clients
const sendUpdateToClients = (eventType, data) => {
    connectedClients.forEach(client => {
        client.res.write(`data: ${JSON.stringify({ type: eventType, data })}\n\n`);
    });
};

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        // Send real-time update
        sendUpdateToClients('product_created', newProduct);

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ msg: 'Product creation failed' });
    }
};

// Create new product with uploaded image
exports.uploadProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            pricePerDay,
            availableFrom,
            availableTo,
            termsAccepted
        } = req.body;

        // ✅ Validation
        if (!title || title.length < 3) return res.status(400).json({ msg: 'Title must be at least 3 characters' });
        if (!description || description.length < 10) return res.status(400).json({ msg: 'Description too short' });
        if (!category) return res.status(400).json({ msg: 'Category is required' });
        if (!pricePerDay || isNaN(pricePerDay) || Number(pricePerDay) <= 0) return res.status(400).json({ msg: 'Price must be a positive number' });
        if (!availableFrom) return res.status(400).json({ msg: 'Start date required' });
        if (!termsAccepted || termsAccepted === 'false') return res.status(400).json({ msg: 'Terms must be accepted' });

        // ✅ Extract Cloudinary URLs
        const images = req.files?.map(file => file.path); // cloudinary returns image.url in .path

        if (!images || images.length === 0) return res.status(400).json({ msg: 'At least one image is required' });

        const product = new Product({
            title,
            description,
            category,
            pricePerDay,
            availableFrom,
            availableTo: availableTo || null,
            termsAccepted: true,
            images, // Save Cloudinary URLs
            createdBy: req.user._id,
            approved: false
        });

        await product.save();

        // Send real-time update
        sendUpdateToClients('product_created', product);

        res.status(201).json({ msg: 'Product created successfully', product });


    } catch (err) {
        console.error('❌ Error uploading product:', err);
        res.status(500).json({ msg: 'Server error while uploading product' });
    }
};

// Get all products (admin only)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch products' });
    }
};

// Get all approved products (public)
exports.getApprovedProducts = async (req, res) => {
    try {
        const products = await Product.find({ approved: true }).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch products' });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: 'Product not found' });
    }
};

// Get products by Lender
exports.getProductsByLender = async (req, res) => {
    try {
        const products = await Product.find({ createdBy: req.params.id });
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching lender products' });
    }
};

// Get pending products
exports.getPendingProducts = async (req, res) => {
    try {
        const products = await Product.find({ approved: false });
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching pending products' });
    }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    try {
        // Support both JSON and multipart/form-data
        let updateData = {};
        let approved;
        if (req.body) {
            // Parse fields from req.body
            updateData.title = req.body.title;
            updateData.description = req.body.description;
            updateData.category = req.body.category;
            if (req.body.pricePerDay !== undefined) updateData.pricePerDay = Number(req.body.pricePerDay);
            if (req.body.availableFrom) updateData.availableFrom = req.body.availableFrom;
            if (req.body.availableTo) updateData.availableTo = req.body.availableTo;
            if (req.body.termsAccepted !== undefined) updateData.termsAccepted = req.body.termsAccepted === 'true' || req.body.termsAccepted === true;
            if (req.body.approved !== undefined) approved = req.body.approved === 'true' || req.body.approved === true;
        }
        // Handle images (if any uploaded)
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => file.path);
        }
        // If only status is being updated
        if (approved !== undefined) {
            updateData.approved = approved;
        }
        // Remove undefined fields
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        sendUpdateToClients('product_updated', product);
        res.json({ msg: 'Product updated successfully', product });
    } catch (err) {
        console.error('Update product error:', err);
        res.status(500).json({ msg: 'Update failed' });
    }
};

// Approve a product
exports.approveProduct = async (req, res) => {
    try {
        const { approved } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { approved: approved !== undefined ? approved : true },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Send real-time update
        sendUpdateToClients('product_status_changed', product);

        res.json({
            msg: approved ? 'Product approved' : 'Product unapproved',
            product
        });
    } catch (err) {
        console.error('Approval error:', err);
        res.status(500).json({ msg: 'Approval failed' });
    }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const { reason } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();

        // Send real-time update
        sendUpdateToClients('product_deleted', { id: req.params.id, reason });

        res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
        console.error('Delete product error:', err);
        res.status(500).json({ msg: 'Deletion failed' });
    }
};

// Get product statistics
exports.getProductStats = async (req, res) => {
    try {
        const total = await Product.countDocuments();
        const approved = await Product.countDocuments({ approved: true });
        const pending = await Product.countDocuments({ approved: false });

        // Get unique categories
        const categories = await Product.distinct('category');
        const categoryCount = categories.length;

        res.json({
            total,
            approved,
            pending,
            categories: categoryCount
        });
    } catch (err) {
        console.error('Get product stats error:', err);
        res.status(500).json({ msg: 'Failed to get statistics' });
    }
};

// Server-Sent Events endpoint for real-time updates
exports.productEvents = async (req, res) => {
    // Set headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    });

    // Send initial connection message
    res.write(`data: ${JSON.stringify({ type: 'connected', message: 'Connected to product events' })}\n\n`);

    // Add client to connected clients
    const client = { res, id: Date.now() };
    connectedClients.add(client);

    // Handle client disconnect
    req.on('close', () => {
        connectedClients.delete(client);
        console.log('Client disconnected from SSE');
    });

    // Keep connection alive
    const keepAlive = setInterval(() => {
        res.write(`data: ${JSON.stringify({ type: 'ping' })}\n\n`);
    }, 30000);

    // Clean up on disconnect
    req.on('close', () => {
        clearInterval(keepAlive);
    });
};

// Search products
exports.getSearchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ msg: 'Search query is required' });
        }

        const regex = new RegExp(q, 'i');
        const products = await Product.find({
            $or: [
                { title: regex },
                { description: regex }
            ],
            approved: true
        }).limit(10);

        res.json(products);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ msg: 'Search failed' });
    }
};