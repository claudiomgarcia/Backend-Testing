import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, required: true, unique: true },
    age: Number,
    password: { type: String, required: true },
    cart:{ type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

export default mongoose.model('users', usersSchema)
