const loginSchema = require("./login.schema");
const AppError = require("../errors/AppError");

const loginValidator = (req, res, next) => {

    const { error } = loginSchema.validate(req.body);

    if (error) {
        return next(
            new AppError(error.details[0].message, 400)
        );
    }

    next();
};

module.exports = loginValidator;