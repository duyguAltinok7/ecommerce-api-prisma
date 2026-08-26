const Joi =require("joi");
const productSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow(""),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    categoryId: Joi.number().integer().required(),
    image_url: Joi.string().allow("")
});
module.exports=productSchema

/*name → yazı olacak ve boş bırakılamayacak
description → yazı olacak, boş olabilir
price → sayı olacak, 0 veya daha büyük olacak
stock → sayı olacak, 0 veya daha büyük olacak
category → yazı olacak ve zorunlu
image_url → yazı olacak, boş olabilir */