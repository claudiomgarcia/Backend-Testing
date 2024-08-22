import ProductManager from '../dao/managers/mongomanagers/mongoProductManager.js'
import CartManager from "../dao/managers/mongomanagers/mongoCartManager.js"
import { generateLink } from '../utils.js'
import productModel from '../models/products.model.js'

const productManager = new ProductManager()
const cartManager = new CartManager()

export const renderProductsPage = async (req, res) => {
    try {
        const { limit, sort, query, page } = req.query

        const readProducts = await productManager.getProducts(limit, page, sort, query)

        const { products, totalProducts, totalPages, currentPage } = readProducts

        if (page !== undefined && (isNaN(page) || page <= 0 || page > totalPages)) {
            return res.status(404).json({ error: 'Página inexistente.' })
        }

        const hasPrevPage = currentPage > 1
        const hasNextPage = currentPage < totalPages

        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push({
                pageNumber: i,
                isCurrent: i === currentPage,
                pageLink: generateLink('products', i, sort, limit, query)
            })
        }
        const cart = await cartManager.getCartById(req.session.user.cart)

        res.render('products', {
            readProducts: products,
            totalProducts,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? generateLink('products', currentPage - 1, sort, limit, query) : null,
            nextLink: hasNextPage ? generateLink('products', currentPage + 1, sort, limit, query) : null,
            ascLink: generateLink('products', 1, 'asc', limit, query),
            descLink: generateLink('products', 1, 'desc', limit, query),
            pages,
            cart,
            user: req.session.user,
            title: "Todos los productos"
        })
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los productos.', message: error.message })
    }
}

export const renderRealTimeProductsPage = (req, res) => {
    try {
        res.render('realTimeProducts', {
            title: "Productos en tiempo real",
            user: req.session.user,
        })
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los productos.', message: error.message })
    }
}

export const renderChatPage = (req, res) => {
    res.render('chat', {
        title: "Chat",
        user: req.session.user
    })
}

export const renderCartPage = async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cartManager.getCartById(cid)

        const productsWithStock = await Promise.all(cart.products.map(async item => {
            const product = await productModel.findById(item.product._id)
            return {
                ...item,
                inStock: product.stock >= item.quantity
            }
        }))

        cart.products = productsWithStock

        res.render('cart', {
            cart,
            title: "Detalle del Carrito"
        })
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el carrito.', message: error.message })
    }
}

export const renderLoginPage = (req, res) => {
    res.render('login', { title: "Ingresar" })
}

export const renderRegisterPage = (req, res) => {
    res.render('register', { title: "Registrarse" })
}

export const renderProfilePage = (req, res) => {
    res.render('profile', {
        user: req.session.user,
        title: "Mi Cuenta"
    })
}

export const renderForgotPassword = (req, res) => {
    res.render('forgot-password', {
        user: req.session.user,
        title: "Restaurar Contraseña"
    })
}
export const renderNotFoundPage = (req, res) => {
    res.render('404', { title: "Página no encontrada" })
}