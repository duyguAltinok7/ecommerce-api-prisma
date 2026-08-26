const cartService=require("../services/cart.service");
// addtocartın amacı sepete ürün ekleme işlemini başlatmak 
//quantity kaç tane olduğu 
const addToCart=async(req,res,next)=>{
    try{
        const userId=req.user.id; // bu authMiddleware den geliyor
        const {productId,quantity}=req.body;
        const result=await cartService.addToCart(userId,Number(productId),Number(quantity));
        res.status(201).json(result);

    }catch(err){
        next(err)
    }
}
module.exports={addToCart}