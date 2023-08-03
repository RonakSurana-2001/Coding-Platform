const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserInfo = new Schema({
    useId: {
        type: String
    },
    userName:{
        type:String
    },
    userEmail:{
        type:String
    },
    userPhoto:{
        type:String
    }
});

module.exports = mongoose.model('userInfo', UserInfo);