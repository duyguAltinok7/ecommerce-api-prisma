const registerSchema = require("./register.schema");
const AppError = require("../errors/AppError");

const registerValidator = (req, res, next) => {

    const { error } = registerSchema.validate(req.body);

    if (error) {
        return next(
            new AppError(error.details[0].message, 400)
        );
    }

    next();
};

module.exports = registerValidator;