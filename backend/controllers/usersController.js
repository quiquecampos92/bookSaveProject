const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('books')

    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)

    if (!user) {
        return response.status(404).json({ error: 'User not found' });
    }

    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save(user)

    response.status(201).json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = {
        username,
        name,
        passwordHash
    }

    const updatedUser = await User.findByIdAndUpdate(request.params.id, user)
    response.json(updatedUser)
})

module.exports = usersRouter