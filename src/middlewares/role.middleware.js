const AppError = require("../errors/AppError");

const roleMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new AppError("bu işlem için admin yetkisi gerek", 403));
    }
    next();
};

module.exports = roleMiddleware;