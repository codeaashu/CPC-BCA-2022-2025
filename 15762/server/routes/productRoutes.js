const express = require('express');
const router = express.Router();
const {
    uploadProduct,
    getAllProducts,
    getApprovedProducts,
    getProductById,
    getProductsByLender,
    getPendingProducts,
    updateProduct,
    approveProduct,
    deleteProduct,
    getProductStats,
    getSearchProducts,
    productEvents
} = require('../controllers/productController');

const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/search', getSearchProducts);
router.get('/approved', getApprovedProducts);    // GET /api/products/approved
router.get('/all', getAllProducts);              // GET /api/products/all (public)
router.get('/:id', getProductById);              // GET /api/products/:id

// Protected routes (require authentication)
router.post(
    '/',
    protect,
    upload.array('images', 5), // max 5 images per product
    uploadProduct
);

// Admin routes (require admin role)
router.get('/', protect, admin, getAllProducts);           // GET /api/products (all products)
router.get('/stats', protect, admin, getProductStats);     // GET /api/products/stats
router.get('/events', protect, admin, productEvents);      // GET /api/products/events (SSE)
router.get('/lender/:id', protect, admin, getProductsByLender);
router.get('/pending', protect, admin, getPendingProducts);
router.put('/:id', protect, admin, upload.array('images', 5), updateProduct);         // PUT /api/products/:id
router.put('/:id/approve', protect, admin, approveProduct); // PUT /api/products/:id/approve
router.put('/approve/:id', protect, admin, approveProduct); // PUT /api/products/approve/:id (backward compatibility)
router.delete('/:id', protect, admin, deleteProduct);      // DELETE /api/products/:id

module.exports = router;
