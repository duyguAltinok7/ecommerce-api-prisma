//controller istek bana ulşatı http tarafındaki işlemi ben yöneteyim der 
//Service'i çağırmak ve Service'den gelen sonucu HTTP response olarak kullanıcıya göndermek.
// http yi bilir req.params req.body req.query res
const productService = require("../services/product.service");

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.updateProduct(id, req.body);
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.status(200).json({ success: true, message: "ürün pasife alındı" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};