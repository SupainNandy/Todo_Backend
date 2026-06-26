const express = require('express')
const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body

        const isUserValid = await userModel.findOne({ email })

        if (isUserValid) {
            return res.status(402).json({ message: "User Allready exist" })
        } else {
            const hasspass = await bcrypt.hash(password, 10)
            const user = await userModel.create({
                username,
                email,
                password: hasspass
            })
            res.status(200).json({ message: "User created successfuly", user })
        }
    } catch (err) {
        console.log(err);
        console.log("Signup error");
        res.status(500).json({ message: "Signup error" })


    }
})


userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not register" })
        } else {
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).json({message:"User password invalid"})
            }
           else{
             const token = jwt.sign({
                user_id: user._id,
                username: user.userName
            }, process.env.JWT_SKEY)

            res.status(200).json({ message: "User register successfuly", user, token })
           }
        }

    } catch (err) {
        console.log(err);
        console.log("Signin error");


    }
})

module.exports = userRouter