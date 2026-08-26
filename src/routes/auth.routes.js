const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const registerValidator = require("../validators/register.validator");
const loginValidator = require("../validators/login.validator");

router.post("/register", registerValidator, controller.register);
router.post("/login", loginValidator, controller.login);

module.exports = router;