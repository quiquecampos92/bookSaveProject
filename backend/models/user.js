const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // esto asegura la unicidad de username
    },
    name: String,
    lastName: String,
    passwordHash: String,
    bookOwners: [
        {
            type: String,
            default: [],
        }
    ],
    email: {
        type: String,
        unique: true,
        required: true,
        sparse: true // en caso de no ser obligatorio
    },
    role: {
        type: String,
        enum: ['guest', 'user', 'admin', 'superadmin'],
        default: 'user'
    },    
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
},
{ timestamps: true })

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //el password no debe enviarse jamás
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User