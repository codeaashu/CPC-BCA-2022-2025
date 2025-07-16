import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
} from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware, getCart)
    .post(authMiddleware, addToCart);

router.post('/clear', authMiddleware, clearCart);

router
    .route('/:id')
    .put(authMiddleware, updateCartItem)
    .delete(authMiddleware, deleteCartItem);

export default router;
