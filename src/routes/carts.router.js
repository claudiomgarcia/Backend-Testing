import { Router } from 'express'
import {
    getCarts,
    getCart,
    createCart,
    addProduct,
    deleteProduct,
    updateCart,
    updateProductQty,
    clearCart,
} from '../controllers/carts.controller.js'
import { isAuthenticated, checkRole } from '../middlewares/auth.js'
import { handlePurchase } from '../controllers/ticket.controller.js'

const cartsRouter = Router()

cartsRouter.get('/', getCarts)
cartsRouter.get('/:cid', getCart)
cartsRouter.post('/', createCart)
cartsRouter.post('/:cid/product/:pid', checkRole(['user']), addProduct)
cartsRouter.delete('/:cid/products/:pid', checkRole(['user']), deleteProduct)
cartsRouter.put('/:cid', updateCart)
cartsRouter.put('/:cid/products/:pid', updateProductQty)
cartsRouter.delete('/:cid', clearCart)
cartsRouter.post('/:cid/purchase', isAuthenticated, handlePurchase)

export default cartsRouter
