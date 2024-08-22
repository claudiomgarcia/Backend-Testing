import express from 'express'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { __dirname } from './utils.js'
import socketProducts from './listener/socketProducts.js'
import socketChat from './listener/socketChat.js'
import connectDB from './config/db.js'
import { appConfig, passportConfig, sessionConfig, swaggerOptions } from './config/app.config.js'
import { initializeRoutes } from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import { addLogger } from './config/logger.js'
import logger from './config/logger.js'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const swaggerSpec = swaggerOptions()

const startServer = async () => {
    try {
        app.use(addLogger)
        appConfig(app)
        await connectDB()
        sessionConfig(app)
        passportConfig(app)

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

        initializeRoutes(app)

        app.use(errorHandler)

        const httpServer = app.listen(PORT, logger.info(`Server running on: http://localhost:${PORT}`))

        if (process.env.NODE_ENV === 'production') {
            logger.info('Server running in Production')
        } else {
            logger.info('Server running in Development')
        }

    const socketServer = new Server(httpServer)
    socketProducts(socketServer)
    socketChat(socketServer)
} catch (error) {
    logger.error('Failed to connect to the database', error)
    process.exit(1)
}
}

startServer()