const express = require('express')
const router = express.Router();
const UserData = require('../models/UserDataSchema')
const UserInfo=require('../models/UserInformationSchema')


router.post('/getUser', (req, res) => {
    const usersId = req.body.userId;
    // console.log(usersId);
    UserData.find({ userId: usersId }).exec().then((users) => {
        // console.log(users);
        if (users.length == 0) {
            let usersData = {
                userId: usersId,
                problemsSolved: ["0"],
                savedQues: ["0"]
            }
            const user = UserData(usersData);
            user.save();
            res.json(usersData);
        }
        else {
            // console.log("Already Exists");
            res.json(users);
        }
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})


router.post('/getUpdate', (req, res) => {
    const usersId = req.body.userId;
    // console.log(usersId);
    const questionNo = "" + req.body.quesNo;
    let temp = [];
    UserData.find({ userId: usersId }).exec().then((users) => {
        temp = users[0].problemsSolved;
        const index = temp.indexOf(questionNo);
        if (index > "-1") { // only splice array when item is found
            temp.splice(index, 1); // 2nd parameter means remove one item only
            UserData.findOneAndUpdate({ userId: usersId }, { problemsSolved: temp }).exec().then((users) => {
                if (users.length != 0) {
                    res.json("Deleted");
                }
            })
                .catch((error) => {
                    console.log("Some Error encountered");
                });
        }
        else {
            temp = users[0].problemsSolved;
            temp.push(questionNo);
            UserData.findOneAndUpdate({ userId: usersId }, { problemsSolved: temp }).exec().then((users) => {
                if (users.length != 0) {
                    res.json("Added");
                }
            })
                .catch((error) => {
                    console.log("Some Error encountered");
                });
        }
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

router.post('/savedQues', (req, res) => {
    const usersId = req.body.userId;
    // console.log(usersId);
    const questionNo = "" + req.body.quesNo;
    let temp = [];
    UserData.find({ userId: usersId }).exec().then((users) => {
        temp = users[0].savedQues;
        const index = temp.indexOf(questionNo);
        if (index > "-1") { // only splice array when item is found
            temp.splice(index, 1); // 2nd parameter means remove one item only
            UserData.findOneAndUpdate({ userId: usersId }, { savedQues: temp }).exec().then((users) => {
                if (users.length != 0) {
                    res.json("Deleted");
                }
            })
                .catch((error) => {
                    console.log("Some Error encountered");
                });
        }
        else {
            temp = users[0].savedQues;
            temp.push(questionNo);
            UserData.findOneAndUpdate({ userId: usersId }, { savedQues: temp }).exec().then((users) => {
                if (users.length != 0) {
                    res.json("Saved");
                }
            })
                .catch((error) => {
                    console.log("Some Error encountered");
                });
        }
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

router.post('/setUserDetails', (req, res) => {
    // console.log(req.body.emailUser,req.body.usersId);
    UserInfo.find({ useId: req.body.usersId }).exec().then((users) => {
        if(users.length==0){
            console.log(req.body.usersId);
            const data={
                useId:req.body.usersId,
                userName:req.body.userName,
                userEmail:req.body.emailUser,
                userPhoto:req.body.userPhoto
            };
            const userI=UserInfo(data);
            userI.save();
            // console.log(userI);
            res.json(data);
        }
        else{
            res.json(users);
        }
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

module.exports = router;