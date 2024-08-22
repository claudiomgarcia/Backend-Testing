import productsRouter from "./products.router.js"
import cartsRouter from "./carts.router.js"
import viewsRouter from "./views.router.js"
import sessionsRouter from "./api/sessions.router.js"
import loggerRouter from "./logger.router.js"


export function initializeRoutes(app) {
    app.use('/api/products', productsRouter)
    app.use('/api/carts', cartsRouter)
    app.use('/api/sessions', sessionsRouter)
    app.use('/', loggerRouter)
    app.use('/', viewsRouter)
}