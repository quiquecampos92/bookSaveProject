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

    response.json(books.reverse())
})

// Obtener un libro específico
booksRouter.get('/:id', async (request, response) => {
    try {
        const bookId = request.params.id
        const book = await Book.findById(bookId)


        if (book) {
            response.json(book.reverse())
        } else {
            response.status(404).end()
        }
    } catch (error) {
        console.log(error)
        response.status(400).json({ error: 'something went wrong' })
    }
})

// Obtener un libro filtrado
booksRouter.get('/search/:searchTerm', async (request, response) => {
    const userId = request.user.id;
    const searchTerm = request.params.searchTerm;

    try {
        const books = await Book.find({
            user: userId,
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { review: { $regex: searchTerm, $options: "i" } },
                { owner: { $regex: searchTerm, $options: "i" } }
            ]
        }).populate('user', { username: 1, name: 1 });

        if (books.length > 0) {
            response.json(books);
        } else {
            response.status(404).json({ message: "No books found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});


// Crear un nuevo libro
booksRouter.post('/', async (request, response) => {
    try {


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
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Internal server error' })
    }
})

// Eliminar un libro
booksRouter.delete('/:id', async (request, response) => {
    try {
        const bookId = request.params.id
        await Book.findByIdAndDelete(bookId)
        response.status(204).end()
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Internal server error' })
    }
})

// Actualizar un libro
booksRouter.put('/:id', async (request, response) => {
    try {
        const bookId = request.params.id
        const body = request.body

        const updatedBook = await Book.findByIdAndUpdate(bookId, body, { new: true })
        response.json(updatedBook)
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = booksRouter