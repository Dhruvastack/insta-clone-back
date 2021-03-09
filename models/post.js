const mongoose = require('mongoose')
const {Schema} = require('mongoose');
//const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        // required:true
    },
    //likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        text:String,
        
      //  postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
    }],
    postedBy:{
       type:Schema.Types.ObjectId,
       ref:'User'
    }
},{timestamps:true})


mongoose.model('User')
mongoose.model("Post",postSchema)