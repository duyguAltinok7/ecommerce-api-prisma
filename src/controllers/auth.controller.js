const services = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        const { email, password, full_name } = req.body;
        const userData = { email, password, full_name };
        const regist = await services.register(userData);
        res.status(201).json({ success: true, data: regist });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = { email, password };
        const token = await services.login(userData);
        res.status(200).json({ success: true, token });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login };