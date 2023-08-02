const express = require('express')
const router = express.Router();
const UserData = require('../models/UserDataSchema')

router.post('/getUser', (req, res) => {
    const usersId = req.body.userId;
    // console.log(usersId);
    UserData.find({ userId: usersId }).exec().then((users) => {
        // console.log(users);
        if (users.length == 0) {
            let usersData = {
                userId: usersId,
                problemsSolved: ["0"]
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


module.exports = router;