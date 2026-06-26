const mongoose = require('mongoose')


async function connectDB() {

try{
    await mongoose.connect(process.env.DB_URI)
    console.log("Database Connection Successuly");
    

}catch(err){
    console.log(err);
    console.log("Database connection error");
    
    
}
    
}

module.exports=connectDB