import express from 'express';
import {
    createOrder,
    getOrders,
    getAllOrders,
    confirmPayment,
    getOrderById,
    updateOrder,
    updateAnyOrder
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js'

const orderRouter = express.Router();

orderRouter.get('/getall', getAllOrders);
orderRouter.put('/getall/:id', updateAnyOrder);

orderRouter.use(authMiddleware);
// Order routes
orderRouter.post('/', createOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/confirm', confirmPayment);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);

export default orderRouter;