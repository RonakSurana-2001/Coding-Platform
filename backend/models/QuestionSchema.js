const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionData = new Schema({
    name: {
        type: String
    },
    linkQues:{
        type:String
    },
    Topic: {
        type: Array
    },
    Level:{
        type:String
    },
    sno: {
        type: Number
    }
});

module.exports = mongoose.model('questionData', questionData);