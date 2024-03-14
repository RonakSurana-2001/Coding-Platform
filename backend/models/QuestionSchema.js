const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionDataSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    linkQues: {
        type: String,
        required: true
    },
    Topic: {
        type: Array,
        required: true
    },
    Level: {
        type: String,
        required: true
    },
    sno: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('questionData', questionDataSchema);
