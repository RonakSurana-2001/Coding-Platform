import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/QuestionDetails.css'
var cors = require('cors')

let baseUrl="https://coding-app-xwu4.onrender.com";
// let baseUrl="http://localhost:3001"

function QuestionDetail() {
    const { id } = useParams();

    const [language, setLanguage] = useState("Language")


    const [status, setStatus] = useState("Compile")
    const [he_id, sethe_id] = useState("")
    const [output, setOutput] = useState("");

    const [input,setInput]=useState("")
    const [code,setCode]=useState("")

    const inputProvided=()=>{
        const textarea = document.querySelector(".input-textarea");
        if (textarea) {
            setInput(textarea.value);
        }    
    }

    const codeWritten=()=>{
        const textarea = document.querySelector(".right-container-21");
        if (textarea) {
            setCode(textarea.value);
        }    
    }

    const sendRequest = async () => {
        const url = 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/';
        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "client-secret":process.env.REACT_APP_CLIENT_SECRET,
                "client-id": process.env.REACT_APP_CLIENT_ID
            },
            body: JSON.stringify({
                lang: language,
                source: code,
                input: input
            }),    
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            sethe_id(result.he_id)
            console.log(result)
            await sendOutput()
        } catch (error) {
            console.error(error)
        }

    }

    const sendOutput = async () => {
        const url = `https://api.hackerearth.com/v4/partner/code-evaluation/submissions/${he_id}`;
        const options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "client-secret":process.env.REACT_APP_CLIENT_SECRET,
                "client-id":  process.env.REACT_APP_CLIENT_ID
            }
        };
        try {
            const response = await fetch(url, options);
            const result1 = await response.json();
            if(result1){
                if(result1.result.run_status.output){
                    setOutput(result1.result.run_status.output)
                    putOutput()
                }
            }
        } catch (error) {
        }
    }

    const putOutput = async () => {
        await fetch(`${output}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            setOutput(text);
        })
        .catch(error => {
        });
    };

    const [question,sendQuestion]=useState("Question Here");

    const fetchQuestion=async()=>{
        const response=await fetch(`${baseUrl}/app/sendParticularQuestion`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify({id})
        })
        const json=await response.json();
        sendQuestion(json);
    }

    useEffect(()=>{
        fetchQuestion()
    },[])

    return (
        <>
            <div className='mainContainer'>
                <div className='leftSide'>
                    <div className='leftSide-container'>
                        <div className='leftSide-container-1'>
                            {question.name}
                        </div>
                        <div className='leftSide-container-2'>
                            {question.question}
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='right-container-1'>
                        <div className="dropdown">
                            <div className='right-container-11'>{language}</div>
                            <div className="dropdown-content">
                                <div onClick={() => setLanguage('C')}>C</div>
                                <div onClick={() => setLanguage('CPP14')}>CPP</div>
                                <div onClick={() => setLanguage('PYTHON')}>Python</div>
                            </div>
                        </div>
                    </div>
                    <div className='right-container-2'>
                        <textarea className='right-container-21' onChange={codeWritten}/>
                    </div>
                    <div className='right-container-3'>
                        <div className='right-container-31'>
                            <div className='right-container-311'>Input</div>
                            <div className='right-container-312'>
                                <textarea className='input-textarea' onChange={inputProvided}/>
                            </div>
                        </div>
                        <div className='right-container-31'>
                            <div className='right-container-311' onClick={() => sendRequest()} style={{ backgroundColor: '#ADD8E6', width: '100px', borderRadius: '5px', height: '20px', cursor: 'pointer', border: '2px solid black' }}>{status}</div>
                            <div className='right-container-312'>
                                <textarea className='input-textarea' value={output} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionDetail