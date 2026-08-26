// repositories/order.repository.js
const prisma = require("../config/prisma");

const createOrder = async (tx, { userId, totalPrice, items }) => {
    return await tx.order.create({
        data: {
            userId,
            totalPrice,
            status: "PENDING",
            items: { create: items }
        },
        include: { items: true }
    });
};

const findOrdersByUserId = async (userId) => {
    return await prisma.order.findMany({
        where: { userId },
        include: { items: true },
        orderBy: { createdAt: "desc" }
    });
};

const findOrderById = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } }
    });
};

// Sadece sipariş hâlâ "PENDING" ise "PAID" yapar.
// count === 0 dönerse: sipariş yok ya da zaten PENDING değil.
const markAsPaidIfPending = async (orderId) => {
    return await prisma.order.updateMany({
        where: { id: orderId, status: "PENDING" },
        data: { status: "PAID" }
    });
};

module.exports = {
    createOrder,
    findOrdersByUserId,
    findOrderById,
    markAsPaidIfPending
};