import mongoose from 'mongoose'
import chalk from 'chalk'

const dbConnection = async () => {
  try {
    console.log(chalk.yellow(`connecting to database...`))
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log(
      chalk.bold.greenBright(`database connected: ${conn.connection.host}`)
    )
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
export default dbConnection
