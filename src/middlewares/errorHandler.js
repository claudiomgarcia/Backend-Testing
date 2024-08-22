import { EErrors } from "../services/errors/enum.js"

const errorHandler = (error, req, res, next) => {
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            logger.error(error.cause)
            res.status(400).json({ status: "error", error: error.name, message: error.message })
            break
        case EErrors.ROUTING_ERROR:
            res.status(404).json({ status: "error", error: error.name, message: error.message })
            break
        case EErrors.DATABASE_ERROR:
            res.status(500).json({ status: "error", error: error.name, message: error.message })
            break
        default:
            res.status(500).json({ status: "error", error: "Unhandled error", message: error.message })
    }
}

export default errorHandler