const mongoose = require('mongoose');

const notesSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.ObjectId
    }
    ,title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model('notes',notesSchema)