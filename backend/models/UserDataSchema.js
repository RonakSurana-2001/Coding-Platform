const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserData = new Schema({
    userId: {
        type: String,
    },
    problemsSolved: {
        type: Array
    }
});

module.exports = mongoose.model('UserData', UserData);