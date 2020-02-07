const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

// initalise the database:
const initialBlogs = [
	{
		'title': 'first_blog',
		'author': 'Yan',
		'url': 'localhost:3006',
		'likes': 666
	},
	{
		'title': 'second blog',
		'author': 'Maja',
		'url': 'localhost:3006',
		'likes': 66
	},
	{
		'title': 'third blog',
		'author': 'Colin',
		'url': 'localhost:3006',
		'likes': 67
	},
	{
		'title': 'fourth blog',
		'author': 'David',
		'url': 'localhost:3006',
		'likes': 566
	}
]

beforeEach(async()=>{
	await Blog.deleteMany({})
	console.log('cleared')

	const blogObject = initialBlogs.map(blog=> new Blog(blog))
	const promiseArray = blogObject.map(blog=>blog.save())
	await Promise.all(promiseArray)
})

test('blog list can be fetched in Json format', async () =>{
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('content-type', /application\/json/)
	
	const response = await api.get('/api/blogs')
	expect(response.body.length).toBe(initialBlogs.length)
})

test('id identifier exist', async () =>{
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async()=>{
	const newBlog = {
		'title': 'new blog',
		'author': 'Lisa',
		'url': 'localhost:3006',
		'likes': 32
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('content-type', /application\/json/)
	const response = await api.get('/api/blogs')
	const title = response.body.map(n => n.title)

	expect(response.body.length).toBe(initialBlogs.length + 1)
	expect(title).toContain('new blog')
})

test('check adding a blog without likes', async()=>{
	const newBlog = {
		'title': 'newest blog',
		'author': 'Anna',
		'url': 'localhost:3006'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('content-type', /application\/json/)
	const response = await  api.get('/api/blogs')
	const added = response.body.find(blog=>blog.title === 'newest blog')

	expect(response.body.length).toBe(initialBlogs.length + 1)
	expect(added.likes).toBe(0)
})

test('check when title and url are missing when adding blog', async ()=>{
	const newBlog = {
		'author': 'Jenni',
		'likes': 98
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
})

afterAll(() => {
	mongoose.connection.close()
})