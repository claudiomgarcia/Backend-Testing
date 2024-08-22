import { Router } from 'express'
import {
    register,
    login,
    githubAuth,
    githubCallback,
    logout,
    getCurrentSession,
    sendToken,
    resetPassword

} from '../../controllers/sessions.controller.js'

const sessionsRouter = Router()

sessionsRouter.post('/register', register)
sessionsRouter.post('/login', login)
sessionsRouter.get("/github", githubAuth)
sessionsRouter.get("/githubcallback", githubCallback)
sessionsRouter.post('/logout', logout)
sessionsRouter.get('/current', getCurrentSession)
sessionsRouter.post('/forgot-password', sendToken)
sessionsRouter.post('/reset-password/:token', resetPassword)

export default sessionsRouter
