require('dotenv').config()

let PORT = process.env.PORT ||3003
let URL = process.env.MONGODB_URL

if (process.env.NODE_ENV === 'test'){
	URL = process.env.TEST_MONGODB_URL
}

module.exports = {
	URL,
	PORT
}