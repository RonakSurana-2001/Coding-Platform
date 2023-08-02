import React, { useEffect, useState } from 'react';
import QuestionTable from '../Components/QuestionTable.js';

export default function SampleComponent() {
  const [problems, setProblems] = useState([]);
  const [userProb, setUserProb] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [getDifflevel,setDifflevel]=useState(null);

  const getAllQuestion = async () => {
    const response = await fetch("http://localhost:5000/app/sendQuestions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    return json;
  };

  const getUserDetails = async () => {
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
    return json;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsData, userDetailsData] = await Promise.all([
          getAllQuestion(),
          localStorage.getItem("isLogin") === "true" ? getUserDetails() : null
        ]);

        setProblems(questionsData);
        setUserProb(questionsData);

        if (userDetailsData) {
          setUserInfo(userDetailsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (getDifflevel != null) {
      const num = [];
      if (window.location.pathname === '/homePage') {
        for (let i = 0; i < problems.length; i++) {
          if (problems[i].Level == getDifflevel) {
            num.push(problems[i]);
          }
        }
      }
      setUserProb(num);
    }
  }, [getDifflevel, setUserProb])

  let func = (vale) => {
    setDifflevel(vale)
  }

  return (
    <>
      <div className='container-1'>
        <div className='container-2'>
          <div className='container-4'>Solved</div>
          <div className='container-4'>Unsolved</div>
          <div className='container-4' onClick={() => func("Easy")}>Easy</div>
          <div className='container-4' onClick={() => func("Medium")}>Medium</div>
          <div className='container-4' onClick={() => func("Hard")}>Hard</div>
        </div>
        <div className='container-3'>
          <input type="text" placeholder='Search For Question Name'></input>
        </div>
      </div>

      {userProb.length > 0 && (
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
              {userProb.map((indx, index) => {
                const isQuestionSolved = userInfo.length > 0 && userInfo[0].problemsSolved.includes("" + indx.sno);
                const color = isQuestionSolved ? "green" : "red";

                return <QuestionTable val={indx} key={index} color={color} />;
              })}
            </tbody>
          </table>
        </div >
      )
      }
    </>
  );
}
