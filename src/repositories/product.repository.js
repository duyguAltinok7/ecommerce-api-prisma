// httpi bilmez req resten haberi bile olmaz 
const prisma = require("../config/prisma");

const findAllProducts = async () => {
    return await prisma.product.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" }
    });
};

const findProductById = async (id) => {
    return await prisma.product.findUnique({
        where: { id }
    });
};

const createProduct = async (data) => {
    return await prisma.product.create({ data });
};

const updateProduct = async (id, data) => {
    return await prisma.product.update({
        where: { id },
        data
    });
};

const deleteProduct = async (id) => {
    return await prisma.product.update({
        where: { id },
        data: { isActive: false }
    });
};

module.exports = {
    findAllProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct
};