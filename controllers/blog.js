const blogRouter= require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response, next) => {
	try{
		const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
		response.json(blogs.map(blog=>
			blog.toJSON()))
	}catch(exception){
		next(exception)
	}
})

blogRouter.get('/:id', async (request, response, next)=>{
	try{
		const blog = await Blog.findById(request.params.id)
		if (blog){
			response.json(blog.toJSON())
		}else{
			response.status(404).end()
		}
	}catch(exception){
		next(exception)
	}
})

blogRouter.delete('/:id', async(request, response, next)=>{
	const token = request.token
	const blog = await Blog.findById(request.params.id)
	try{
		const decodedToken = jwt.verify(token, process.env.SECRET)
		console.log('Blog user is', blog.user)
		console.log('Logged in user is ', decodedToken.id)
		if (!token || !decodedToken.id){
			return response.status(401).json({ error: 'token missing or invalid !'})
		}else if (blog.user.toString() !== decodedToken.id){
			return response.status(401).json({ error: 'Not the author for the blog, can not delete !'})
		}else{
			await Blog.findByIdAndRemove(request.params.id)
			response.status(204).end()}
	}catch(exception){
		next(exception)
	}

})

blogRouter.put('/:id', async(request, response, next)=>{
	const body = request.body
	const blog = {
		'title': body.title,
		'author': body.author,
		'url': body.url,
		'likes': body.likes
	}
	try{
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		response.json(updatedBlog.toJSON())
	}catch(exception){
		next(exception)
	}
})

blogRouter.post('/', async (request, response, next) => {
	const token = request.token

	try{
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id){
			return response.status(401).json({ error: 'token missing or invalid !'})
		}
		if (!request.body.likes){
			request.body.likes = 0
		}
		if ((!request.body.title) && (!request.body.url)){
			response.status(400).json({error: 
				'title and url can not be missing!'})
		}else{
			const body = request.body
			const user = await User.findById(decodedToken.id)
			const newBlog = new Blog(body)
			newBlog.user = user.id
			const savedBlog = await newBlog.save()
			user.blogs = user.blogs.concat(savedBlog)
			await user.save()
			response.json(savedBlog.toJSON())}
	}catch(exception){
		next(exception)
	}
})

module.exports = blogRouter