const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserData = new Schema({
    userId: {
        type: String
    },
    problemsSolved:{
        type:Array
    },
    savedQues:{
        type:Array
    }
});

module.exports = mongoose.model('userdata', UserData);