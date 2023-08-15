const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionData = new Schema({
    name: {
        type: String,
        unique:true,
        required: true
    },
    linkQues:{
        type:String,
        unique:true,
        required: true
    },
    Topic: {
        type: Array,
        required: true
    },
    Level:{
        type:String,
        required: true
    },
    sno: {
        type: Number,
        unique:true,
        required: true
    }
});

module.exports = mongoose.model('questionData', questionData);