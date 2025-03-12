const logger = require('./logger')
const jwt = require('jsonwebtoken')

// Middleware para registrar solicitudes
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

// Middleware para manejar endpoints desconocidos
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Middleware para manejar errores
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

// Middleware para validar tokens JWT
const authMiddleware = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const token = authorization.replace('Bearer ', '')
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET) // Verifica el token
        request.user = decodedToken // Adjunta el usuario decodificado al objeto request
        next() // Continúa con la siguiente función
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: 'invalid token' })
        } else if (error.name === 'TokenExpiredError') {
            return response.status(401).json({ error: 'token expired' })
        }
        return response.status(401).json({ error: 'authentication failed' })
    }
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    authMiddleware // Exporta el nuevo middleware
}