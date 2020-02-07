const blogRouter= require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	try{
		const blogs = await Blog.find({})
		response.json(blogs.map(blog=>
			blog.toJSON()))
	}catch(exception){
		console.log(exception)
	}
})

blogRouter.post('/', (request, response) => {
	try{
		if (!request.body.likes){
			request.body.likes = 0
		}
		const newBlog = new Blog(request.body)
		const result = newBlog.save()
		response.status(201).json(result)
	}catch(exception){
		console.log(exception)
	}
})

module.exports = blogRouter