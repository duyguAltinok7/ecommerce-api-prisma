const prisma =require("../config/prisma");
const findByUserId=async(userId)=>{// belirli bir kullanıcının sepetini databaseden bulmak
    return prisma.cart.findUnique({// cart tablosunda benzersiz bir kayıt bul 
        where:{userId},
        include:{items:{include:{product:true}}},
    })
};

const createCart=async(userId)=>{// databasede yeni bir sepet oluşturmak
    return prisma.cart.create({
        data:{userId}})
};
const addItem=async(cartId,productId,quantity)=>{// sepete yeni bir ürün satırı eklemek
    return prisma.cartItem.create({
        data:{cartId,productId,quantity},
    });
};
const findItem=async(cartId,productId)=>{ // bu ürün bu sepette zaten var mı  yoksa null
    return prisma.cartItem.findFirst({
        where:{cartId,productId}
    })
}
const updateItemQuantity=async(itemId,quantity)=>{ // sepetteki mevcut ürünün miktarını değiştirmek
    return prisma.cartItem.update({
        where:{id:itemId},
        data:{quantity},
    })
}

const removeItem=async(itemId)=>{ // sepetten bir ürünü tamamen  silmek
    return prisma.cartItem.delete(
        {
            where:{id:itemId}
        }
    )
};
module.exports={
    findByUserId,
    createCart,
    addItem,
    findItem,
    updateItemQuantity,
    removeItem
}