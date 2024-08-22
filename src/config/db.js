import mongoose from 'mongoose'
import logger from './logger.js'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        logger.info("Connected to database")
    } catch (error) {
        logger.error("Failed to connect to database", error)
        throw error
    }
}

export default connectDB