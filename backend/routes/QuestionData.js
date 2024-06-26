const express = require('express')
const router = express.Router();
const ques=require("../models/QuestionSchema");


router.post('/createQuestions',(req,res)=>{
    // console.log(req.body.qTopic);
    let str=req.body.qTopic;
    let wordsArray = str.split(',').map(word => word.replace(/"/g, ''));
    const q={
        "sno":Number(req.body.sno),
        "linkQues":req.body.qlink,
        "Topic":wordsArray,
        "Level":req.body.qLevel,
        "name":req.body.name,
        "question":req.body.questionSet
    };
    res.json(q);
    const ques1=ques(q);
    ques1.save();
})


router.post('/sendQuestions',(req,res)=>{
    ques.find({}).exec().then((q)=>{
        res.json(q);
    })
    .catch((error)=>{
        console.log("Some Error Occurred");
    })
})

router.post('/sendParticularQuestion',(req,res)=>{
    ques.findOne({'sno':req.body.id}).then((data)=>{
        res.json(data);
    })
    .catch((error)=>{
        console.log("ID not found");
    })
})

module.exports = router;