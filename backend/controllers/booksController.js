const booksRouter = require('express').Router()
const Book = require('../models/book')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// booksRouter.get('/', async (request, response) => {
//     const books = await Book.find().populate('user', { username: 1, name: 1 })
//     response.json(books)
// })

booksRouter.get('/', async (request, response) => {
    const token = getTokenFrom(request)
    if (!token) {
        return response.status(401).json({ error: 'Token requerido' })
    }

    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        return response.status(401).json({ error: 'Token inválido' })
    }

    const books = await Book.find({ user: decodedToken.id }).populate('user', { username: 1, name: 1 })
    response.json(books)
})


booksRouter.get('/:id', async (request, response) => {
    const bookId = request.params.id
    const book = await Book.findById(bookId)
    console.log(book);


    if (book) {
        response.json(book)
    } else {
        response.status(404).end()
    }
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
        user: user._id
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