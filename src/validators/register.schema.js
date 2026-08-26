const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    full_name: Joi.string()
        .trim()
        .required()
});

module.exports = registerSchema;
/*email zorunlu
email formatı doğru olmalı
password zorunlu
password en az 6 karakter
full_name zorunlu */


