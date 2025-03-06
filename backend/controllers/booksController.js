const booksRouter = require('express').Router()
const Book = require('../models/book')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


booksRouter.get('/', async (request, response) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token inválido' })
    }

    const userId = decodedToken.id
    const books = await Book.find({ user: userId }).populate('user', { username: 1, name: 1 })

    response.json(books)
})

booksRouter.get('/:id', async (request, response) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token inválido' })
    }

    const book = await Book.findById(request.params.id)

    if (!book) {
        return response.status(404).json({ error: 'Libro no encontrado' })
    }

    // Verifica que el usuario autenticado sea el dueño del libro
    if (book.user.toString() !== decodedToken.id) {
        return response.status(403).json({ error: 'No tienes permiso para ver este libro' })
    }

    response.json(book)
})


const getTokenFrom = request => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

booksRouter.post('/', async (request, response) => {
    const { title, author, points, review, reading_Date, owner, read, price, userId } = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!title || !points || !read || !price) {
        return response.status(400).json({ error: 'title, points, read and price are required' })
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

booksRouter.delete('/:id', async (request, response) => {
    const bookId = request.params.id

    await Book.findByIdAndDelete(bookId)
    response.status(204).end()

})

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

    const updatedBook = await Book.findByIdAndUpdate(request.params.id, book)
    response.json(updatedBook)
})

module.exports = booksRouter