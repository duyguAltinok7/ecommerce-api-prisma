const productRepository = require("../repositories/product.repository");
const AppError = require("../errors/AppError");

const getAllProducts = async () => {
    return await productRepository.findAllProducts();
};

const getProductById = async (id) => {
    const product = await productRepository.findProductById(id);
    if (!product) {
        throw new AppError("ürün bulunamadı", 404);
    }
    return product;
};

const createProduct = async (data) => {
    const { name, price, stock } = data;

    if (price <= 0) {
        throw new AppError("fiyat sıfır veya negatif olamaz", 400);
    }
    if (stock < 0) {
        throw new AppError("stok negatif olamaz", 400);
    }

    return await productRepository.createProduct({ name, price, stock });
};

const updateProduct = async (id, data) => {
    await getProductById(id); // yoksa burada 404 fırlar, update'e hiç gitmez
    return await productRepository.updateProduct(id, data);
};

const deleteProduct = async (id) => {
    await getProductById(id);
    return await productRepository.deleteProduct(id);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};