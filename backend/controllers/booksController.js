const booksRouter = require('express').Router()
const Book = require('../models/book')
const User = require('../models/user')
const { authMiddleware } = require('../utils/middleware') // Importa el middleware

// Aplica el middleware de autenticación a todas las rutas protegidas
booksRouter.use(authMiddleware)

// Obtener todos los libros del usuario autenticado
booksRouter.get('/', async (request, response) => {
    const userId = request.user.id // Usuario autenticado adjunto por authMiddleware
    const books = await Book.find({ user: userId })

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
        const { title, author, points, review, reading_Date, owner, read, price } = request.body;
        const userId = request.user.id;
        const user = await User.findById(userId);

        // Validación más detallada
        const missingFields = [];
        if (!title) missingFields.push('title');
        if (points === undefined) missingFields.push('points');
        if (read === undefined) missingFields.push('read');
        if (price === undefined) missingFields.push('price');

        if (missingFields.length > 0) {
            return response.status(400).json({
                error: 'Missing required fields',
                details: {
                    required: true,
                    message: `The following fields are required: ${missingFields.join(', ')}`,
                    fields: missingFields
                }
            });
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
        });

        const savedBook = await book.save();
        user.books = user.books.concat(savedBook._id);
        await user.save();

        response.status(201).json(savedBook);
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const details = {};
            for (const field in error.errors) {
                details[field] = error.errors[field].message;
            }
            return response.status(400).json({
                error: 'Validation failed',
                details
            });
        }

        response.status(500).json({
            error: 'Internal server error',
            details: {
                message: error.message || 'An unexpected error occurred'
            }
        });
    }
});


// Eliminar un libro
booksRouter.delete('/:id', async (request, response) => {
    try {
        const bookId = request.params.id;

        // Encuentra el libro para obtener el userId
        const book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).json({ message: "Libro no encontrado" });
        }

        // Elimina el libro de la base de datos
        await Book.findByIdAndDelete(bookId);

        // Elimina la referencia del libro en el usuario
        await User.updateOne(
            { _id: book.user },  // Busca el usuario dueño del libro
            { $pull: { books: bookId } } // Elimina el ID del libro en el array `books`
        );

        response.status(204).end();
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});


// Actualizar un libro
booksRouter.put('/:id', async (request, response) => {
    try {
        const bookId = request.params.id
        const body = request.body
        console.log('hasta aqui entra bien', body, bookId);
        const updatedBook = await Book.findByIdAndUpdate(bookId, body, { new: true })
        response.json(updatedBook)
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = booksRouter