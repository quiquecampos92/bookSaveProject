const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})