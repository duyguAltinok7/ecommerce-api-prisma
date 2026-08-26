const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// herkes görebilir — login gerekmez
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);

// sadece admin — sırayı unutma: authMiddleware önce, roleMiddleware sonra
router.post("/", authMiddleware, roleMiddleware, controller.createProduct);
router.put("/:id", authMiddleware, roleMiddleware, controller.updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware, controller.deleteProduct);

module.exports = router;