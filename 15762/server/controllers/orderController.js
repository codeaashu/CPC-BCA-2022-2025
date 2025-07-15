
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, paymentId } = req.body;

        const order = new Order({
            user: userId,
            items,
            totalAmount,
            paymentId
        });

        await order.save();
        res.status(201).json({ msg: 'Order placed', order });
    } catch (err) {
        res.status(500).json({ msg: 'Order failed' });
    }
};
