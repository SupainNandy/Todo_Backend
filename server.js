const app = require('./src/app')
const connectDB = require('../Backend/src/Database/db')
const env =require('dotenv').config()
const DB = require('../Backend/src/Database/db')


app.listen(4000,()=>{
    connectDB()
    console.log("express server start at 4000");
    
})