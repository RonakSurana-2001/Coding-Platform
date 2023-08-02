const express = require('express')
const router = express.Router();
const ques=require("../models/QuestionSchema");

const q={
    "name":"Two SUm",
    "linkQues":"https://leetcode.com/problems/two-sum",
    "Topic":["Array"],
    "Level":"Medium",
    "sno":"2"
};

router.post('/createQuestions',(req,res)=>{
    //const q=req.body;
    res.json(q);
    const ques1=ques(q);
    ques1.save();
    console.log(q);
})


router.post('/sendQuestions',(req,res)=>{
    ques.find({}).exec().then((q)=>{
        res.json(q);
    })
    .catch((error)=>{
        console.log("Some Error Occurred");
    })
})

module.exports = router;