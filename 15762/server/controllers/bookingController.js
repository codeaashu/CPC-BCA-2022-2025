const Booking = require('../models/Booking');
const Product = require('../models/Product');
const User = require('../models/User');

// Create new booking
exports.createBooking = async (req, res) => {
    try {
        // Accept both JSON and multipart/form-data
        const isMultipart = req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data');
        let data = req.body;
        if (isMultipart) {
            // Multer parses form-data, so req.body is fine
        }
        const {
            productId,
            address,
            phone,
            transactionId,
            name,
            email,
            startDate,
            endDate
        } = data;
        // For manual booking, only productId, address, phone, transactionId, and paymentScreenshot are required
        if (!productId || !address || !phone || !transactionId) {
            return res.status(400).json({ msg: 'All required fields must be provided' });
        }
        // Check if product exists and is available
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        if (!product.approved) {
            return res.status(400).json({ msg: 'Product is not available for booking' });
        }
        // Parse and validate dates
        let start = startDate ? new Date(startDate) : new Date();
        let end = endDate ? new Date(endDate) : new Date();
        if (start > end) {
            return res.status(400).json({ msg: 'End date must be after start date' });
        }
        // Check for overlapping bookings
        const overlapping = await Booking.findOne({
            product: productId,
            status: { $in: ['pending', 'confirmed', 'active'] },
            $or: [
                { startDate: { $lte: end }, endDate: { $gte: start } }
            ]
        });
        if (overlapping) {
            return res.status(400).json({ msg: 'Selected dates are not available for this product.' });
        }
        // Calculate total days and amount
        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        const totalAmount = totalDays * product.pricePerDay;
        // Handle payment screenshot
        let paymentScreenshotUrl = '';
        if (req.file && req.file.path) {
            paymentScreenshotUrl = req.file.path;
        }
        // Create booking
        const booking = await Booking.create({
            user: req.user ? req.user._id : null,
            product: productId,
            startDate: start,
            endDate: end,
            totalDays,
            totalAmount,
            address,
            phone,
            transactionId,
            paymentScreenshot: paymentScreenshotUrl,
            status: 'pending',
            paymentStatus: 'pending',
        });
        res.status(201).json({
            msg: 'Booking request submitted! We will verify your payment and contact you soon.',
            booking
        });
    } catch (err) {
        console.error('Create booking error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('product', 'title images pricePerDay category')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (err) {
        console.error('Get bookings error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get active rentals (admin only)
exports.getActiveRentals = async (req, res) => {
    try {
        const activeRentals = await Booking.find({
            status: { $in: ['confirmed', 'active'] },
            isActive: true
        })
            .populate('user', 'name email phone')
            .populate('product', 'title images pricePerDay category')
            .sort({ startDate: -1 });

        res.json(activeRentals);
    } catch (err) {
        console.error('Get active rentals error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('product', 'title images pricePerDay category description');

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        res.json(booking);
    } catch (err) {
        console.error('Get booking error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update booking status (admin only)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const bookingId = req.params.id;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Update booking
        booking.status = status || booking.status;
        if (adminNotes) {
            booking.adminNotes = adminNotes;
        }

        await booking.save();

        res.json({
            msg: 'Booking status updated successfully',
            booking
        });
    } catch (err) {
        console.error('Update booking error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Only allow cancellation if booking is not active
        if (booking.status === 'active') {
            return res.status(400).json({ msg: 'Cannot cancel active booking' });
        }

        booking.status = 'cancelled';
        booking.isActive = false;
        await booking.save();

        res.json({ msg: 'Booking cancelled successfully' });
    } catch (err) {
        console.error('Cancel booking error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get booking statistics
exports.getBookingStats = async (req, res) => {
    try {
        const total = await Booking.countDocuments();
        const pending = await Booking.countDocuments({ status: 'pending' });
        const confirmed = await Booking.countDocuments({ status: 'confirmed' });
        const active = await Booking.countDocuments({ status: 'active' });
        const completed = await Booking.countDocuments({ status: 'completed' });
        const cancelled = await Booking.countDocuments({ status: 'cancelled' });

        // Calculate total revenue
        const completedBookings = await Booking.find({ status: 'completed' });
        const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

        res.json({
            total,
            pending,
            confirmed,
            active,
            completed,
            cancelled,
            totalRevenue
        });
    } catch (err) {
        console.error('Get booking stats error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('product', 'title images pricePerDay')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (err) {
        console.error('Get user bookings error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// User requests cancellation (only for their own booking, only if pending)
exports.requestCancellation = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ msg: 'Booking not found' });
        if (!booking.user.equals(req.user._id)) return res.status(403).json({ msg: 'Not authorized' });
        if (booking.status !== 'pending') return res.status(400).json({ msg: 'Only pending bookings can be cancelled' });

        booking.status = 'cancellation_requested';
        if (req.body.customerNotes) booking.customerNotes = req.body.customerNotes;
        await booking.save();

        res.json({ msg: 'Cancellation requested', booking });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}; 