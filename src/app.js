const express = require('express')

const cors = require('cors')
const { model } = require('mongoose')

const app = express()

app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('../src/routes/auth')

app.use('/api/user',userRouter)

const taskRouter=require("../src/routes/task")
const authCheck = require('./middleware/auth.middleware')
app.use('/api/task',authCheck,taskRouter)

module.exports = app