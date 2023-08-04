import {React,useEffect,useState} from 'react'
import QuestionTable from './QuestionTable';
import Footer from './Footer';
export default function SampleComponent2() {
  const [problems, setProblems] = useState([]);
  const [userProb, setUserProb] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

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
    // console.log(json);
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

  return (
    <>
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
                const isQuestionSaved=userInfo.length > 0 && userInfo[0].savedQues.includes(""+indx.sno);
                const isSolvedby=userInfo.length > 0 && userInfo[0].savedQues.includes("" + indx.sno)
                const color = isQuestionSolved ? "green" : "red";
                const savedQuesColor=isQuestionSaved ? "green" : "red";
                return isSolvedby && <QuestionTable val={indx} key={index} color={color} savedQuesColor={savedQuesColor}/>;
              })}
            </tbody>
          </table>
        </div >
      )
      }
    </>
  )
}
