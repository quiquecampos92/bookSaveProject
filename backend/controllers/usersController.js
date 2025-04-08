const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('books')

    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        response.json(user);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


usersRouter.post('/', async (request, response) => {
    const { username, email, name, lastName, password } = request.body;

    if (!username || !name || !lastName || !password) {
        return response.status(400).json({ error: 'All fields are required' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        name: name.trim(),
        lastName: lastName.trim(),
        passwordHash
    });
    
    try {
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json({ error: 'Failed to save user' });
    }
});


usersRouter.put('/:id', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = {
        username,
        name,
        passwordHash
    }
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true });
    response.json(updatedUser)
})

// Crear un nuevo owner
usersRouter.post('/:id/owners', async (req, res) => {
    const { id } = req.params;
    const { ownerName } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.bookOwners) {
        user.bookOwners = [];
    }

    if (!user.bookOwners.includes(ownerName)) {
        user.bookOwners.push(ownerName);
        await user.save();
    }

    res.json(user.bookOwners);
});

// Elimina un owner existente
usersRouter.delete('/:id/owners/:ownerName', async (req, res) => {
    const { id, ownerName } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.bookOwners = user.bookOwners.filter(owner => owner !== ownerName);
    await user.save();

    res.json(user.bookOwners);
});

module.exports = usersRouter