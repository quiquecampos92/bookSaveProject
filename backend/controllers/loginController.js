const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
    try {
        const { username, password } = request.body

        const user = await User.findOne({ username })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(
            userForToken,
            process.env.SECRET,
            { expiresIn: 3600 }
        )

        response.status(200).send({
            token,
            username: user.username,
            name: user.name,
            lastName: user.lastName,
            id: user._id
        })
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = loginRouter
