const express = require('express')
const router = express.Router();
const UserData = require('../models/UserDataSchema')

router.post('/getUser',(req,res)=>{
    const usersId= req.body.userId;
    // console.log(usersId);
    UserData.find({userId:usersId}).exec().then((users) => {
        // console.log(users);
        if (users.length == 0) {
            let usersData={
                userId:usersId,
                problemsSolved:["0"]
            }
            const user = UserData(usersData);
            user.save();
            res.json(usersData);
        }
        else {
            console.log("Already Exists");
            res.json(users);
        }
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})
module.exports=router;