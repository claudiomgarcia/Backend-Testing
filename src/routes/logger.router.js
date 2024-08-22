import { Router } from "express"

const loggerRouter = Router()

loggerRouter.get('/loggerTest', (req, res) => {
    req.logger.debug('This is a debug message')
    req.logger.http('This is an http message')
    req.logger.info('This is an info message')
    req.logger.warning('This is a warning message')
    req.logger.error('This is an error message')
    req.logger.fatal('This is a fatal message')

    res.send('Logger test completed. Check your console and log files.')
})

export default loggerRouter