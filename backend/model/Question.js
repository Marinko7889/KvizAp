const mongoose = require('mongoose')

const Schema=mongoose.Schema;

const QuestionSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    question:{
        type: String,
        required: true
    },

    options:{
        type: Object,
        required:true
    },

    answer:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("Question",QuestionSchema);