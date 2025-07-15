const Enquiry = require('../models/Enquiry');
const Product = require('../models/Product');

// Create new enquiry
exports.createEnquiry = async (req, res) => {
    try {
        const { name, email, message, productId } = req.body;

        // Validate required fields
        if (!name || !email || !message || !productId) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Create enquiry
        const enquiry = await Enquiry.create({
            name,
            email,
            message,
            productId,
            productName: product.title
        });

        res.status(201).json({
            msg: 'Enquiry submitted successfully',
            enquiry
        });
    } catch (err) {
        console.error('Create enquiry error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all enquiries (admin only)
exports.getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .populate('productId', 'title images')
            .populate('respondedBy', 'name')
            .sort({ createdAt: -1 });

        res.json(enquiries);
    } catch (err) {
        console.error('Get enquiries error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get enquiry by ID
exports.getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id)
            .populate('productId', 'title images pricePerDay')
            .populate('respondedBy', 'name');

        if (!enquiry) {
            return res.status(404).json({ msg: 'Enquiry not found' });
        }

        res.json(enquiry);
    } catch (err) {
        console.error('Get enquiry error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update enquiry status and add admin response
exports.updateEnquiry = async (req, res) => {
    try {
        const { status, adminResponse } = req.body;
        const enquiryId = req.params.id;

        const enquiry = await Enquiry.findById(enquiryId);
        if (!enquiry) {
            return res.status(404).json({ msg: 'Enquiry not found' });
        }

        // Update enquiry
        enquiry.status = status || enquiry.status;
        if (adminResponse) {
            enquiry.adminResponse = adminResponse;
            enquiry.respondedBy = req.user.id;
            enquiry.respondedAt = new Date();
        }
        enquiry.isRead = true;

        await enquiry.save();

        res.json({
            msg: 'Enquiry updated successfully',
            enquiry
        });
    } catch (err) {
        console.error('Update enquiry error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Mark enquiry as read
exports.markAsRead = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ msg: 'Enquiry not found' });
        }

        enquiry.isRead = true;
        await enquiry.save();

        res.json({ msg: 'Enquiry marked as read' });
    } catch (err) {
        console.error('Mark as read error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete enquiry
exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ msg: 'Enquiry not found' });
        }

        await enquiry.remove();
        res.json({ msg: 'Enquiry deleted successfully' });
    } catch (err) {
        console.error('Delete enquiry error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get enquiry statistics
exports.getEnquiryStats = async (req, res) => {
    try {
        const total = await Enquiry.countDocuments();
        const pending = await Enquiry.countDocuments({ status: 'pending' });
        const inProgress = await Enquiry.countDocuments({ status: 'in-progress' });
        const resolved = await Enquiry.countDocuments({ status: 'resolved' });
        const unread = await Enquiry.countDocuments({ isRead: false });

        res.json({
            total,
            pending,
            inProgress,
            resolved,
            unread
        });
    } catch (err) {
        console.error('Get stats error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
}; 