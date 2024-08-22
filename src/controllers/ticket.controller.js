import ticketModel from '../models/ticket.model.js'
import cartModel from '../models/carts.model.js'
import { v4 as uuidv4 } from 'uuid'
import { mailerConfig } from '../config/app.config.js'

export const handlePurchase = async (req, res) => {
    try {
        const cid = req.params.cid
        const userEmail = req.session.user.email
        const cart = await cartModel.findById(cid).populate('products.product')

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        const totalAmount = cart.products.reduce((total, item) => {
            return total + (item.product.price * item.quantity)
        }, 0)

        const newTicket = new ticketModel({
            code: uuidv4(),
            purchase_datetime: new Date().toISOString(),
            amount: totalAmount,
            purchaser: userEmail
        })

        await newTicket.save()

        const transport = mailerConfig()

        let result = await transport.sendMail({
            from: process.env.MAILER_EMAIL,
            to: process.env.MAILER_EMAIL,
            subject: "Comprobante de compra",
            html: `<div>
                <h1>Orden # ${newTicket.code}</h1>
                <p>Total de compra $ ${newTicket.amount}.-</p>
                <p>Gracias por su compra</p>
                </div>`
        })

        cart.products = []
        await cart.save()

        res.render('checkout', { ticket: newTicket.toObject() })
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al realizar la compra', message: error.message })
    }
}
