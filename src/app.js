//uygulamanın nasıl yapılandırılacağını belirle 

const express = require("express");
const app = express();

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

module.exports = app;