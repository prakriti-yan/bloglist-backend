const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async()=>{
	await Blog.deleteMany({})
	console.log('cleared')

	const blogObject = helper.initialBlogs.map(blog=> new Blog(blog))
	const promiseArray = blogObject.map(blog=>blog.save())
	await Promise.all(promiseArray)
})

test('blog list can be fetched in Json format', async () =>{
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('content-type', /application\/json/)
	
	const response = await api.get('/api/blogs')
	expect(response.body.length).toBe(helper.initialBlogs.length)
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

	expect(response.body.length).toBe(helper.initialBlogs.length + 1)
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

	expect(response.body.length).toBe(helper.initialBlogs.length + 1)
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

describe('when there is one user at db', ()=>{
	beforeEach(async()=>{
		await User.deleteMany({})
		const user = new User({username: 'root', password: 'sekret'})
		await user.save()
	})

	test('create a new username', async ()=>{
		const userAtstart = await helper.usersInDb()
		const newUser = {
			username: 'Yan',
			name: 'Yan Yan',
			password: 'hello'
		}

		await api.
			post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('content-type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(userAtstart.length + 1)
		
		const usernames = usersAtEnd.map(u=>u.username)
		expect(usernames).toContain(newUser.username)

	})

	test('creation fails when the username is taken', async ()=>{
		const userAtstart = helper.usersInDb
		const newUser = {
			username: 'root',
			name: 'superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(500)
			.expect('content-type', 'text/html; charset=utf-8')
		// console.log(result)
		// expect(result.body).toContain('`userame` to be unique')
		const usersAtEnd = helper.usersInDb
		expect(userAtstart.length).toBe(usersAtEnd.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})