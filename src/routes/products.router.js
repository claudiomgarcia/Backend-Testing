import { Router } from 'express'
import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js'
import { isAuthenticated, checkRole } from '../middlewares/auth.js'

const productsRouter = Router()

productsRouter.get('/', isAuthenticated, getProducts)
productsRouter.get('/:pid', isAuthenticated, getProductById)
productsRouter.post('/', isAuthenticated, checkRole(['admin']), addProduct)
productsRouter.put('/:pid', isAuthenticated, checkRole(['admin']), updateProduct)
productsRouter.delete('/:pid', isAuthenticated, checkRole(['admin']), deleteProduct)


export default productsRouter