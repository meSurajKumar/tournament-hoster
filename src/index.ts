import express from 'express'
const app : express.Express = express()
require('dotenv').config()
const port = process.env.PORT

require('./startup/middleware')(app)
require('./startup/db')()
require('./startup/router')(app)




app.listen(port,():void=>{console.log(`Listening to Port : ${port}`)})