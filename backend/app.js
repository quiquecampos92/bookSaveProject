const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/loginController')
const usersRouter = require('./controllers/usersController')
const booksRouter = require('./controllers/booksController')

const app = express()

//Conecta la base de datos
mongoose.connect(config.MONGODB_URI)
    //informa por consola
    .then(() => {
        logger.info('Connected to MongoDB in Database')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB: ', error.message)
    })

app.use(cors())//para evitar problemas con el frontend
app.use(express.static('dist'))//para integrar el frontend con el backend
app.use(express.json())//para trabajar con archivos json
app.use(middleware.requestLogger)//informa de los datos de las solicitudes

//rutas específicas para el CRUD de cada cosa
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/books', booksRouter)

app.use(middleware.unknownEndpoint)//si la ruta no existe
app.use(middleware.errorHandler)//manejador de errores varios

module.exports = app
