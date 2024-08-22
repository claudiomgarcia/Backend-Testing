import {
    getAllCarts,
    getCartById,
    createNewCart,
    addProductToCart,
    removeProductFromCart,
    updateCartProducts,
    updateProductQuantity,
    deleteAllCartProducts
} from '../services/carts.services.js'

export const getCarts = async (req, res) => {
    try {
        const carts = await getAllCarts()
        res.json(carts)
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los carritos', message: error.message })
    }
}

export const getCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await getCartById(cid)

        if (!cart) {
            return res.status(404).send({ error: `No se encontró ningún carrito con el id ${cid}.` })
        }

        res.json(cart)
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener el carrito', message: error.message })
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await createNewCart()
        res.status(201).json({ message: `Carrito creado con id: ${newCart._id}` })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al crear el carrito', message: error.message })
    }
}

export const addProduct = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        await addProductToCart(cid, pid)

        res.json({ message: `Se agregó el producto ${pid} al carrito ${cid}` })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito', message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        await removeProductFromCart(cid, pid)

        res.json({ message: `Se eliminó el producto ${pid} del carrito ${cid}` })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el producto', message: error.message })
    }
}

export const updateCart = async (req, res) => {
    const cid = req.params.cid
    const products = req.body.products

    try {
        const updatedCart = await updateCartProducts(cid, products)
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al actualizar', message: error.message })
    }
}

export const updateProductQty = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity, ...otherAttributes } = req.body

    if (Object.keys(otherAttributes).length > 0) {
        return res.status(400).send({ status: 'error', error: 'Solo se puede modificar la cantidad' })
    }

    if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).send({ status: 'error', error: 'Ingresar solo números positivos' })
    }

    try {
        await updateProductQuantity(cid, pid, quantity)
        res.send({ status: 'success', message: 'Cantidad actualizada' })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al actualizar', message: error.message })
    }
}

export const clearCart = async (req, res) => {
    try {
        const cid = req.params.cid

        await deleteAllCartProducts(cid)

        res.json({ status: 'success', message: `Se eliminaron todos los productos del carrito ${cid}` })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar los productos', message: error.message })
    }
}

export const checkout = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al finalizar la compra', message: error.message })
    }
}