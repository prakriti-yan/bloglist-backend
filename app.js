const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const morgan = require('morgan')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(()=>{
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app