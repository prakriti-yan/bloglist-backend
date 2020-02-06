require('dotenv').config()

let PORT = process.env.PORT
let URL = process.env.MONGODB_URL

module.exports = {
	URL,
	PORT
}