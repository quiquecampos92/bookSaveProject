const booksRouter = require('express').Router()
const Book = require('../models/book')
const User = require('../models/user')
const { authMiddleware } = require('../utils/middleware') // Importa el middleware

// Aplica el middleware de autenticación a todas las rutas protegidas
booksRouter.use(authMiddleware)

// Obtener todos los libros del usuario autenticado
booksRouter.get('/', async (request, response) => {
    const userId = request.user.id // Usuario autenticado adjunto por authMiddleware
    const books = await Book.find({ user: userId }).populate('user', { username: 1, name: 1 })

    response.json(books)
})

// Obtener un libro específico
booksRouter.get('/:id', async (request, response) => {
    const bookId = request.params.id
    const book = await Book.findById(bookId)


    if (book) {
        response.json(book)
    } else {
        response.status(404).end()
    }
})

// Crear un nuevo libro
booksRouter.post('/', async (request, response) => {
    const { title, author, points, review, reading_Date, owner, read, price } = request.body
    const userId = request.user.id // Usuario autenticado adjunto por authMiddleware
    const user = await User.findById(userId)

    if (!title || !points || read === undefined || price === undefined) {
        return response.status(400).json({ error: 'title, points, read and price are required' });
    }

    const book = new Book({
        title,
        author,
        points,
        review,
        reading_Date,
        owner,
        read,
        price,
        user: userId
    })

    const savedBook = await book.save()
    user.books = user.books.concat(savedBook._id)
    await user.save()

    response.status(201).json(savedBook)
})

// Eliminar un libro
booksRouter.delete('/:id', async (request, response) => {
    const bookId = request.params.id
    await Book.findByIdAndDelete(bookId)
    response.status(204).end()
})

// Actualizar un libro
booksRouter.put('/:id', async (request, response) => {
    const body = request.body

    const book = {
        title: body.title,
        author: body.author,
        points: body.points,
        review: body.review,
        reading_Date: body.reading_Date,
        owner: body.owner,
        read: body.read,
        price: body.price
    }

    const updatedBook = await Book.findByIdAndUpdate(request.params.id, book, { new: true })
    response.json(updatedBook)
})

module.exports = booksRouter