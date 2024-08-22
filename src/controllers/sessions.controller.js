import passport from 'passport'
import UserDTO from '../dto/user.dto.js'
import usersModel from '../models/users.model.js'
import crypto from 'crypto'
import { mailerConfig } from '../config/app.config.js'
import { createHash, isValidPassword } from '../utils.js'

export const register = (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Error al registrar el usuario: " + err })
        }
        if (!user) {
            return res.status(400).json({ status: "error", message: info.message })
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Error al iniciar sesión: " + err })
            }
            res.json({ status: "success", message: "Usuario registrado", redirectUrl: "/login" })
        })
    })(req, res, next)
}

export const login = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).json({ error: info.message })
        }
        req.logIn(user, err => {
            if (err) {
                return next(err)
            }
            try {
                req.session.user = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    cart: user.cart,
                    role: user.role
                }
                if (user.role === "admin") {
                    res.json({ redirectUrl: '/realtimeproducts' })
                } else {
                    res.json({ redirectUrl: '/products' })
                }

            } catch (err) {
                res.status(500).send('Error al iniciar sesión')
            }
        })
    })(req, res, next)
}

export const githubAuth = passport.authenticate("github", { scope: ["user:email"] })

export const githubCallback = (req, res) => {
    req.session.user = req.user
    res.redirect("/")
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.status(500).json({ error: 'Error al cerrar sesión' })
        res.redirect('/login')
    })
}

export const getCurrentSession = (req, res) => {
    const session = new UserDTO(req.session.user)

    if (!session) {
        return res.status(401).json({ error: 'Sesión no iniciada' })
    }

    return res.json(session)
}

export const sendToken = async (req, res) => {
    const email = req.body.email
    try {
        const user = await usersModel.findOne({ email })
        if (!user) {
            res.render('message', {
                title: "Error",
                messageTitle: "Usuario no encontrado"
            })
        } else {

            const token = crypto.randomBytes(20).toString('hex')
            user.resetPasswordToken = token
            user.resetPasswordExpires = Date.now() + 3600000

            await user.save()

            const resetUrl = `http://${req.headers.host}/reset-password/${token}`

            const transport = mailerConfig()

            let result = await transport.sendMail({
                from: process.env.MAILER_EMAIL,
                to: process.env.MAILER_EMAIL,
                subject: "Restaurar contraseña",
                html: `<div>
                    <h1>Hola, ${user.first_name}</h1>
                    <p>Hemos recibido una solicitud para restablecer  la contraseña de tu cuenta</p>
                    <p>Para restablecerla haz click en el enlace de abajo.</p>
                    <p>${resetUrl}</p>
                    </div>`
            })

            res.render('message', {
                title: "Restablecer contraseña ",
                messageTitle: "Mensaje enviado",
                message: 'Se envió un link para reestablecer tu contraseña a tu email.'
            })

        }
    } catch (error) {
        res.status(500).json({ message: 'Error sending the email', error: error })
    }
}

export const validateToken = async (req, res) => {
    const token = req.params.token
    try {
        const user = await usersModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            res.render('message', {
                title: "Error",
                messageTitle: "El token no es válido o ha expirado"
            })
        } else {

            res.render('reset-password', { token: req.params.token })

        }

    } catch (error) {
        res.status(500).json({ message: 'Error processing the request', error: error })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const user = await usersModel.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            res.render('message', {
                title: "Error",
                messageTitle: "El token no es válido o ha expirado"
            })
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).render('reset-password', { 
                token: req.params.token, 
                errorMessage: 'Los campos no coinciden.' 
            })
        }

        if (isValidPassword(user, req.body.password)) {
            return res.status(400).render('reset-password', { 
                token: req.params.token, 
                errorMessage: 'La nueva contraseña debe ser diferente a la anterior'
            })

        }


        user.password = createHash(req.body.password)
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        await user.save()

        res.render('message', {
            title: "Exito",
            message: "Contraseña modificada"
        })
    } catch (err) {
        res.status(500).json({ message: 'Error resetting the password', error: err })
    }
}