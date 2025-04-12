const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:[150,"the title should not exeed 150 chars"]
    },
    description:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        default: 0
    }
})

const Posts = mongoose.model("Posts",postSchema)
module.exports = Posts

