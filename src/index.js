const express = require('express')
const app = express()
const authRoute = require('./routes/auth')
require('dotenv').config()
const morgan = require('morgan')
const chalk = require('chalk')
import dbConnection from './utilities/db.js'

const PORT = process.env.PORT || 4000
app.use(morgan('dev'))
app.use('/admin', authRoute)

//db connecting
dbConnection(() => {
	console.log(chalk.orange(`connecting to database...`))
})

// route
app.use('/', (req, res) => {
	res.send('send msg')
})

app.listen(PORT, () => {
	console.log(`app running on port 4000`)
})
