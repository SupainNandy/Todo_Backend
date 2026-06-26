const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        
    }
}, { timestamps: true })

const taskModel = mongoose.model('task', taskSchema)

module.exports = taskModel