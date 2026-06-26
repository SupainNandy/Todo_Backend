const express = require('express')

const taskRouter = express.Router()
const taskModel = require('../model/task.model')

// addTask 
taskRouter.post('/addtask', async (req, res) => {
   try {
      const { title, description } = req.body

      if (!title || !description) {
         return res.status(400).json({ message: "All fields required" })
      }

      if (!req.user || !req.user.user_id) {
         return res.status(401).json({ message: "Unauthorized" })
      }

      const task = await taskModel.create({
         title,
         description,
         user: req.user.user_id
      })

      res.status(201).json({
         message: "Task created successfully",
         task
      })

   } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Add task error" })
   }
})



//Delete
taskRouter.delete('/delete/:id', async (req, res) => {
   try {
      const { id } = req.params

      if (!req.user || !req.user.user_id) {
         return res.status(401).json({ message: "Unauthorized" })
      }

      const task = await taskModel.findOneAndDelete({
         _id: id,
         user: req.user.user_id
      })

      if (!task) {
         return res.status(404).json({ message: "Task not found" })
      }

      res.status(200).json({
         message: "Task deleted successfully"
      })

   } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Delete task error" })
   }
})


//Update task
taskRouter.put('/update/:id', async (req, res) => {
   try {
      const { id } = req.params
      const { title, description } = req.body

      if (!req.user || !req.user.user_id) {
         return res.status(401).json({ message: "Unauthorized" })
      }

      const updateTask = await taskModel.findByIdAndUpdate(
         {_id:id},
         {title,description}

      )
      if(!updateTask){
         res.status(400).json({message:"Task not found"})
      }

      res.status(200).json({message:"Task update successfuly",updateTask})

   } catch (err) {
      console.log(err);
      console.log("Update error");


   }
})


//Get All element
taskRouter.get('/',async(req,res)=>{
   try{
      const user = await taskModel.find({user: req.user.user_id})
      if(!user){
         res.status(400).json({message:"user not avalable"})
      }else{
         res.status(200).json({message:"User fetch success",user})
      }
   }catch(err){
      console.log(err);
      console.log("Get element error");
      
      
   }
})



module.exports = taskRouter