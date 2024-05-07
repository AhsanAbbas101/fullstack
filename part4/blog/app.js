const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
logger.info('connecting to mongodb')
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB.')
    })
    .catch(error => {
        logger.error(`error connecting to MongoDB: ${error.message}`)
    })


app.use(cors())
app.use(express.json())

if (config.ENV !== 'test')
{
    app.use(middleware.requestLogger)
}

// controllers
app.use('/api/blogs',blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app