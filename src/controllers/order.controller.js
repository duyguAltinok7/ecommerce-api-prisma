// controllers/order.controller.js
const orderService = require("../services/order.service");

const checkout = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const order = await orderService.checkout(userId);
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await orderService.getMyOrders(userId);
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const order = await orderService.getOrderById(userId, id);
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

const confirmPayment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const order = await orderService.confirmPayment(userId, id);
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

module.exports = { checkout, getMyOrders, getOrderById, confirmPayment };
