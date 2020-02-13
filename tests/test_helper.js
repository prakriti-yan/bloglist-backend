const Blog = require('../models/blog')
const User = require('../models/user')

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

// const initialUsers = [
// 	{
// 		'username': 'Hive',
// 	},
// 	{

// 	}
// ]

const nonExistingID = async () => {
	const blog = new Blog ({ title: 'non existing one', url: 'non exisitng one'})
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () =>{
	const blogs = await Blog.find({})
	return blogs.map(blog=>blog.toJSON())
}

const usersInDb = async () =>{
	const users = await User.find({})
	return users.map(user=>user.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingID,
	blogsInDb,
	usersInDb
}