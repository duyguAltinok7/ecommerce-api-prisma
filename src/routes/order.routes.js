const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.post("/checkout", orderController.checkout);
router.get("/", orderController.getMyOrders);
router.get("/:id", orderController.getOrderById);
router.post("/:id/confirm-payment", orderController.confirmPayment);

module.exports = router;

