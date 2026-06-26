const app = require('./src/app')
const connectDB = require('./src/Database')
const env =require('dotenv').config()



app.listen(4000,()=>{
    connectDB()
    console.log("express server start at 4000");
    
})