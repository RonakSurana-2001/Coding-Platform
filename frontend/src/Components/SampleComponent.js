import React, { useEffect, useState } from 'react';
import QuestionTable from '../Components/QuestionTable.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../Styles/TableStyle.css"
let baseUrl="https://coding-app-xwu4.onrender.com";
// let baseUrl = "http://localhost:3001";
export default function SampleComponent() {
  const [problems, setProblems] = useState([]);
  const [userProb, setUserProb] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [getDifflevel, setDifflevel] = useState(null);
  const [question, setQuestion] = useState("")
  // const [isSolved,setisSolved]=useState(null);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getAllQuestion = async () => {
    const response = await fetch(`${baseUrl}/app/sendQuestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    localStorage.setItem("Total", json.length);
    return json;
  };

  const getUserDetails = async () => {
    const response = await fetch(`${baseUrl}/auth/getUser`, {
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

  let [checkAdmin, setcheckAdmin] = useState(false);

  const getUserProfile = async () => {
    const response = await fetch(`${baseUrl}/auth/setUserDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usersId: localStorage.getItem("userId")
      })
    })
    let json = await response.json()
    console.log("Admin Detaiils ",checkAdmin)
    setcheckAdmin(json[0].isAdmin)
  }

  useEffect(() => {
    getUserProfile()
  }, [])

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
          if (problems[i].Level === getDifflevel) {
            num.push(problems[i]);
          }
        }
      }
      setUserProb(num);
    }
  }, [getDifflevel, setUserProb, problems])

  let func = (vale) => {
    setDifflevel(vale)
  }

  const [credentials, setCredentials] = useState({ qsno: "", qname: "", qlink: "", qTopic: "", qLevel: "" });
  const clearForm = () => {
    setCredentials({ qsno: "", qname: "", qlink: "", qTopic: "", qLevel: "" });
    setQuestion("");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/app/createQuestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sno: credentials.qsno,
          name: credentials.qname,
          qlink: credentials.qlink,
          qTopic: credentials.qTopic,
          qLevel: credentials.qLevel,
          questionSet: question
        })
      });
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      clearForm();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const onChangeProblemStatement = (e) => {
    setQuestion(e.target.innerText)
  }


  return (
    <>
      <div className='container-1'>
        <div className='container-2'>
          {checkAdmin == "true" && <div className='container-4' onClick={handleOpen}>Add Question</div>}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Question
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="qsno">S.No</label><br />
                  <input type="text" id="qsno" name="qsno" onChange={onChange} value={credentials.qsno} /><br />
                  <label htmlFor="qname">Question Name</label><br />
                  <input type="text" id="qname" name="qname" onChange={onChange} value={credentials.qname} /><br />
                  <label htmlFor="qlink">Question Link</label><br />
                  <input type="url" id="qlink" name="qlink" onChange={onChange} value={credentials.qlink} /><br />
                  <label htmlFor="qTopic">Question Topic(s)</label><br />
                  <input type="text" id="qTopic" name="qTopic" onChange={onChange} value={credentials.qTopic} /><br />
                  <label htmlFor="qLevel">Question Level</label><br />
                  <input type="text" id="qLevel" name="qLevel" onChange={onChange} value={credentials.qLevel} /><br />
                  <label htmlFor="pStatement">Problem Statement</label><br />
                  <div
                    className="pStatement"
                    contentEditable="true"
                    style={{
                      width: '100%',
                      height: '150px',
                      border: '1px solid black',
                      padding: '5px',
                      overflowY: 'auto'
                    }}
                    onInput={onChangeProblemStatement}
                  />
                  <button type="Submit">Add</button>
                  <button onClick={clearForm}>Clear</button>
                </form>
              </Typography>
            </Box>
          </Modal>
          <div className='container-4' onClick={() => func("Easy")}>Easy</div>
          <div className='container-4' onClick={() => func("Medium")}>Medium</div>
          <div className='container-4' onClick={() => func("Hard")}>Hard</div>
        </div>
        {/* <div className='container-3'>
          <input type="text" placeholder='Search For Question Name'></input>
        </div> */}
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
                <td style={{ textAlign: "center", borderRight: "2px solid black" }}>Origin</td>
              </tr>
            </thead>
            <tbody>
              {userProb.map((indx, index) => {
                const isQuestionSolved = userInfo.length > 0 && userInfo[0].problemsSolved.includes("" + indx.sno);
                const isQuestionSaved = userInfo.length > 0 && userInfo[0].savedQues.includes("" + indx.sno);
                const color = isQuestionSolved ? "green" : "red";
                const savedQuesColor = isQuestionSaved ? "green" : "red";
                // console.log(userInfo[0]);
                return <QuestionTable val={indx} key={index} color={color} savedQuesColor={savedQuesColor} />;
              })}
            </tbody>
          </table>
        </div >
      )
      }
    </>
  );
}
