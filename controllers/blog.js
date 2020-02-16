const blogRouter= require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
	try{
		const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
		response.json(blogs.map(blog=>
			blog.toJSON()))
	}catch(exception){
		console.log(exception)
	}
})

blogRouter.get('/:id', async (request, response)=>{
	try{
		const blog = await Blog.findById(request.params.id)
		if (blog){
			response.json(blog.toJSON())
		}else{
			response.status(404).end()
		}
	}catch(exception){
		console.log(exception)
	}
})

blogRouter.delete('/:id', async(request, response)=>{
	try{
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}catch(exception){
		console.log(exception)
	}

})

blogRouter.put('/:id', async(request, response)=>{
	const body = request.body
	const blog ={
		'title': body.title,
		'author': body.author,
		'url': body.url,
		'likes': body.likes
	}
	try{
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		response.json(updatedBlog.toJSON())
	}catch(exception){
		console.log(exception)
	}
})

blogRouter.post('/', async (request, response) => {
	try{
		if (!request.body.likes){
			request.body.likes = 0
		}
		if ((!request.body.title) && (!request.body.url)){
			response.status(400).json({error: 
				'title and url can not be missing!'})
		}else{
			const body = request.body
			const user = await User.findById(body.user)
			console.log(user)
			const newBlog = new Blog({
				author: body.author,
				title: body.title,
				url: body.title,
				likes: body.likes,
				user: user._id
			})
			const savedBlog = await newBlog.save()
			user.blogs = user.blogs.concat(savedBlog)
			await user.save()
			response.json(savedBlog.toJSON())}
	}catch(exception){
		console.log(exception)
	}
})

module.exports = blogRouter