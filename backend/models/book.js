const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

//no hace falta, está en app.js

//const url = process.env.MONGODB_URI
// mongoose.connect(url)
//     .then(result => {
//         console.log('connected to MongoDB to view books')
//     })
//     .catch(error => {
//         console.log('error connecting to MongoDB:', error.message)
//     })

let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: String,
        minlength: 2,
    },
    points: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 1
    },
    review: {
        type: String,
        required: true,
        minlength: 10
    },
    reading_Date: {
        type: String,
    },
    owner: {
        type: String,
    },
    read: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;