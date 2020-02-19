const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
	if(error.name === 'CastError' && error.kind === 'ObjectId'){
		return response.status(400).send({ error: 'The format of the id is not correct!'})
	} else if (error.name === 'ValidationError'){
		return response.status(400).json({error: error.message})
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'Invalid token'})
	}
	logger.error(error.message)
	next(error)
}

const unknownEndpoint = (request, response)=>{
	response.status(404).send({error: 'Unknown EndPoint!'})
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')){
		const token =  authorization.substring(7)
		request.token = token
	}
	next()
}

module.exports = {
	errorHandler,
	unknownEndpoint,
	tokenExtractor
}