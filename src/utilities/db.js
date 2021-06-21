import mongoose from 'mongoose'

const dbConnection = mongoose
	.createConnection(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})
	.catch((error) => console.log(error))

export default dbConnection
