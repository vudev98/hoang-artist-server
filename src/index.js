import express from 'express'
import authRoute from './routes/auth.js'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import chalk from 'chalk'
import dbConnection from './utilities/db.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(morgan('dev'))
dotenv.config({ path: 'src/utilities/config.env' })
app.use('/onadmin', authRoute)

//db connecting
dbConnection()

app.listen(PORT, () => {
  console.log(chalk.blue.bold(`app running on port ${PORT}`))
})
