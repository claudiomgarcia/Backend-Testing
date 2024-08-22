import CartManager from '../dao/managers/mongomanagers/mongoCartManager.js'

const cartManager = new CartManager()

export const getAllCarts = async () => {
    return await cartManager.getCarts()
}

export const getCartById = async (cid) => {
    return await cartManager.getCartById(cid)
}

export const createNewCart = async () => {
    return await cartManager.createCart()
}

export const addProductToCart = async (cid, pid) => {
    return await cartManager.addProductToCart(cid, pid)
}

export const removeProductFromCart = async (cid, pid) => {
    return await cartManager.deleteProductInCart(cid, pid)
}

export const updateCartProducts = async (cid, products) => {
    return await cartManager.updateCart(cid, products)
}

export const updateProductQuantity = async (cid, pid, quantity) => {
    return await cartManager.updateProductQuantity(cid, pid, quantity)
}

export const deleteAllCartProducts = async (cid) => {
    return await cartManager.deleteAllProducts(cid)
}
