require('dotenv').config()
const express = require('express')
const db = require('./db')
const UserController = require('./app/route/Auth')
const PostController = require('./app/route/Post')

const app = express()

app.use(express.json()) //middle ware stuff, add a json parser to parse json request

app.use('/users', UserController) //middle ware stuff, if url has /users route them to UserController
app.use('/posts',PostController)  //middle ware stuff, if url has /users route them to PostController

app.use(async (req,res) => {
    res.status(404).json({message:"Url doesn't exist"})  // if it passes all the above valid routes(which means user entered an invalid url) we pass error message
})

db()
app.listen(process.env.PORT_NUMBER)