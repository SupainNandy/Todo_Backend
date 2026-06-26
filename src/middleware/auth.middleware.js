const jwt = require('jsonwebtoken')


async function authCheck(req,res,next) {
    const authtoken = req.headers.authorization

    if(!authtoken){
        return res.status(400).json({message:"Token is not Provided"})
    }try{
        const token = authtoken.split(' ')[1]
        const decode = jwt.verify(token,process.env.JWT_SKEY)

        req.user = decode
        next()

    }catch(err){
        console.log(err)
        console.log("auth middleware error")
    }

    
}

module.exports = authCheck