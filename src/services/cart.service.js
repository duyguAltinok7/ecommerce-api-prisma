const repository=require("../repositories/cart.repository");
const productRepository=require("../repositories/product.repository");
const AppError=require("../errors/AppError")
//boş bir sepet oluştur kullanıcınıın hiç sepeti yoksa
//sepeti getir yoksa oluşturacağız
const getOrCreateCart=async(userId)=>{
    let cart=await repository.findByUserId(userId); // bu kullanıcınnn sepetini bulr
    // sepet yoksa null döndürür
    if(!cart){ // sepeti oluştuuryoruz 
        cart=await repository.createCart(userId)
    }
    return cart;
};

// bu fonksiyonun amacı :sepete eklemek istediğimiz ürün gerçekten var mı stok yeterli mi
const validateProductForCart=async(productById,quantity)=>{
    const product=await repository.getProductById(productById);// bana bu ürünün bilgilerini getir
     // getProductById zaten bulunamazsa AppError(404) fırlatıyor, tekrar kontrol etmemize gerek yok

     if(product.stock<quantity){ // quantity kullancının istediği miktar
        throw new AppError("yetersiz stok",400)
     }
     return product
}
const addToCart=async(userId,productId,quantity)=>{
    //kullanıcının istediği ürünü gerçekten sepete ekle 
    // sepeti garenti edelim  sepete var mı yok mu 
    const cart=await getOrCreateCart(userId);
    // ürün var mıı ,stock yeterli mi 
    await validateProductForCart(productId,quantity);
    // ürün var mı ve stock yetrli mi 
    // ürün sepette zaten var mı 
    const existingItem=await repository.findItem(cart.id,productId); // bu ürün zaten kullanıcının sepetinde var mı

    if(existingItem){
        // varsa quantityyi toplayacaz 
        const newQuantity=existingItem.quantity+quantity;  //quantity arttırıyoruz 
        return repository.updateItemQuantity(existingItem.id,newQuantity); // databasedeki ürünün miktarını güncelliyoruz
    }
    //yoksa yeni satır oluştutracaz 
    return repository.addItem(cart.id,productId,quantity); // bu ürünü sepete yeni bir satır olarak ekle 
}
module.exports={
    getOrCreateCart,
    validateProductForCart,
    addToCart
}