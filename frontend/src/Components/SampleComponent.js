import { React, useEffect, useState } from 'react'
import QuestionTable from '../Components/QuestionTable.js'
export default function SampleComponent() {

  const [problems, setProblems] = useState([]);

  const [userProb, setuserProb] = useState([]);

  const [userInfo,setUserInfo]=useState([]);

  const getAllQuestion = async () => {
    const response = await fetch("http://localhost:5000/app/sendQuestions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    setProblems(json);
    setuserProb(json);
  };


  const getUserDetails=async()=>{
    const response = await fetch("http://localhost:5000/auth/getUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    });
    const json = await response.json();
    setUserInfo(json);
  }

  window.onload = () => {
    getAllQuestion();
    if(localStorage.getItem("isLogin")==='true')
    {
        getUserDetails();
    }
  };

  const getEasy = (level1) => {
    const num = [];
    if (window.location.pathname === '/homePage') {
      for (let i = 0; i < problems.length; i++) {
        if (problems[i].Level == level1) {
          num.push(problems[i]);
        }
      }
    }
    setuserProb(num);
  }
  return (
    <>
      <div className='container-1'>
        <div className='container-2'>
          <div className='container-4'>Solved</div>
          <div className='container-4'>Unsolved</div>
          <div className='container-4' onClick={() => getEasy("Easy")}>Easy</div>
          <div className='container-4' onClick={() => getEasy("Medium")}>Medium</div>
          <div className='container-4' onClick={() => getEasy("Hard")}>Hard</div>
        </div>
        <div className='container-3'>
          <input type="text" placeholder='Search For Question Name'></input>
        </div>
      </div>
      <div className='QuestionPageContainer'>
        <table style={{ border: "2px solid black", textAlign: "center", borderCollapse: "collapse" }}>
          <thead>
            <tr className='QuestionPageTable' style={{ background: "pink", textAlign: "center" }}>
              <td style={{ textAlign: "center", borderRight: "2px solid black" }}>S.No</td>
              <td style={{ textAlign: "center", borderRight: "2px solid black" }}>Question Name</td>
              <td style={{ textAlign: "center", borderRight: "2px solid black" }}>Topic</td>
              <td style={{ textAlign: "center", borderRight: "2px solid black" }}>Level</td>
              <td style={{ textAlign: "center", borderRight: "2px solid black" }} >Mark Done</td>
              <td style={{ textAlign: "center", borderRight: "2px solid black" }}>Save</td>
            </tr>
          </thead>
          <tbody>
            {
              userProb.map((indx, index) => {
                  return <QuestionTable val={indx} key={index} userInfo={userInfo}/>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
