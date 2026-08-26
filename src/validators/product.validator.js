const productSchema = require("./product.schem");
const AppError = require("../errors/AppError");

const productValidator = (req, res, next) => {
    const { error } = productSchema.validate(req.body);

    if (error) {
        return next(new AppError(error.details[0].message, 400));
    }

    next();
};

module.exports = productValidator;