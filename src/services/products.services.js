import ProductManager from '../dao/managers/mongomanagers/mongoProductManager.js'
import { generateLink } from '../utils.js'

const productManager = new ProductManager()

export const fetchProducts = async (limit, page, sort, query) => {
    const readProducts = await productManager.getProducts(limit, page, sort, query)

    const { products, totalProducts, totalPages, currentPage } = readProducts

    const hasPrevPage = currentPage > 1
    const hasNextPage = currentPage < totalPages

    return {
        products,
        totalPages,
        currentPage,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? generateLink('products', currentPage - 1, sort, limit, query) : null,
        nextLink: hasNextPage ? generateLink('products', currentPage + 1, sort, limit, query) : null
    }
}

export const fetchProductById = async (pid) => {
    return await productManager.getProductById(pid)
}

export const createProduct = async (productData) => {
    productData.status = true
    return await productManager.addProduct(productData)
}

export const modifyProduct = async (pid, fields) => {
    return await productManager.updateProduct(pid, fields)
}

export const removeProduct = async (pid) => {
    return await productManager.deleteProduct(pid)
}
