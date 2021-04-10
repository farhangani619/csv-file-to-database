const express = require('express')
require('./db/mongoose')
const userRouter = require('./route/userRouter')
const fileUpload = require('./route/fileUpload')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(fileUpload)

app.listen(3000,()=>{
    console.log('server is up and running');
})