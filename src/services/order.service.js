const prisma = require("../config/prisma");
const cartRepository = require("../repositories/cart.repository");
const productRepository = require("../repositories/product.repository");
const orderRepository = require("../repositories/order.repository");
const AppError = require("../errors/AppError");

const checkout = async (userId) => {
    const cart = await cartRepository.findByUserId(userId);

    if (!cart || cart.items.length === 0) {
        throw new AppError("sepet boş", 400);
    }

    const order = await prisma.$transaction(async (tx) => {
        let totalPrice = 0;
        const orderItemsData = [];

        for (const item of cart.items) {
            const product = await productRepository.findByIdForUpdate(tx, item.productId);

            if (!product || !product.isActive) {
                throw new AppError(`${item.productId} artık satışta değil`, 400);
            }

            if (product.stock < item.quantity) {
                throw new AppError(`${product.name} için yeterli stok yok`, 400);
            }

            await productRepository.decreaseStock(tx, product.id, item.quantity);

            totalPrice += Number(product.price) * item.quantity;

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                unitPrice: product.price
            });
        }

        const newOrder = await orderRepository.createOrder(tx, {
            userId,
            totalPrice,
            items: orderItemsData
        });

        await cartRepository.clearCartItems(tx, cart.id);

        return newOrder;
    });

    return order;
};

const getMyOrders = async (userId) => {
    return await orderRepository.findOrdersByUserId(userId);
};

const getOrderById = async (userId, orderId) => {
    const order = await orderRepository.findOrderById(orderId);

    if (!order) {
        throw new AppError("sipariş bulunamadı", 404);
    }

    if (order.userId !== userId) {
        throw new AppError("bu siparişe erişim yetkin yok", 403);
    }

    return order;
};

const confirmPayment = async (userId, orderId) => {
    const order = await orderRepository.findOrderById(orderId);

    if (!order) {
        throw new AppError("sipariş bulunamadı", 404);
    }

    if (order.userId !== userId) {
        throw new AppError("bu siparişe erişim yetkin yok", 403);
    }

    const result = await orderRepository.markAsPaidIfPending(orderId);

    if (result.count === 0) {
        throw new AppError(`sipariş zaten ${order.status} durumunda`, 400);
    }

    return await orderRepository.findOrderById(orderId);
};

module.exports = { checkout, getMyOrders, getOrderById, confirmPayment };