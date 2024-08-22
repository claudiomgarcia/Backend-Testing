import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
    code: { type: String },
    purchase_datetime: { type: String },
    amount: { type: Number },
    purchaser: { type: String, required: true },
})

export default mongoose.model('ticket', ticketSchema)