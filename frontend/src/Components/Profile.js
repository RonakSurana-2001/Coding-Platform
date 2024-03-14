import React, { useEffect, useMemo, useState } from 'react'
import '../Styles/ProfileStyle.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2'
let baseUrl="https://coding-app-xwu4.onrender.com";
// let baseUrl="http://localhost:3001"
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)


function Profile() {

    const [person, setPerson] = useState(null);
    const [isproblemSolved, setisproblemSolved] = useState(0);
    const [problemSolvedArray, setproblemSovedArray] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [topicNames, settopicNames] = useState([]);
    const [topicNamesSize, settopicNamesSize] = useState([]);

    console.warn = () => {};

    const getUserInfo = async () => {
        const response = await fetch(`${baseUrl}/auth/setUserDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usersId: localStorage.getItem("userId") })
        });
        const json = await response.json();
        setPerson(json);
    }

    useEffect(() => {
        getUserInfo();
    }, [])


    const dataQues = {
        labels:topicNamesSize,
        datasets:[
            {
                label:'Solved',
                data:topicNames,
                borderColor:'black',
                backgroundColor:'blue',
                borderWidth:1,
            }
        ]
    }
    


    const data = {
        labels: ['Solved', 'Unsolved'],
        datasets: [{
            label: 'Count',
            data: [isproblemSolved, localStorage.getItem("Total")-isproblemSolved],
            backgroundColor: ['green', 'red'],
            borderColor: ['green', 'red'],
            borderWidth:1,
        }]
    }

    const options = {

    }

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
        const problemsSolved = json[0]?.problemsSolved || [];
        setproblemSovedArray(problemsSolved);
        return problemsSolved.length;
    };

    useEffect(() => {
        const fetchData = async () => {
            const length = await getUserDetails();
            setisproblemSolved(length - 1);
        };
        fetchData();
    }, [])

    const getAllQuestion = async () => {
        const response = await fetch(`${baseUrl}/app/sendQuestions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        return json;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setUserInfo(await getAllQuestion());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    {/*Region For Problem Description Starts*/ }
    const questionTopic = useMemo(() => {
        const topicMap = new Map();
        if (problemSolvedArray != null) {
            for (let i = 0; i < problemSolvedArray.length; i++) {
                userInfo.forEach((val) => {
                    const arrayoftopics = val.Topic;
                    if ("" + val.sno === problemSolvedArray[i]) {
                        for (let j = 0; j < arrayoftopics.length; j++) {
                            if (!topicMap.has(arrayoftopics[j])) {
                                topicMap.set(arrayoftopics[j], 0);
                            }
                            topicMap.set(
                                arrayoftopics[j],
                                topicMap.get(arrayoftopics[j]) + 1
                            );
                        }
                    }
                });
            }
        }
        return topicMap;
    }, [problemSolvedArray, userInfo]);
    useEffect(() => {
        if (questionTopic.size !== 0) {
          const a = [];
          const b = [];
          questionTopic.forEach(function (key, value) {
            a.push(key);
            b.push(value);
          });
          settopicNames(a);
          settopicNamesSize(b);
        //   console.log(a);
        //   console.log(b);
        }
      }, [questionTopic]);

    {/*Region For Problem Description Ends*/ }

    return (
        <>
            <div className='profile-part'>
                <div className='part-1'>
                    <div className='part-10'>
                        {/* {console.log(person[0].userPhoto)} */}
                        <img src={(person != undefined && person[0]!=null)?person[0].userPhoto : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2FAshwinvalento%2Fcartoon-avatar&psig=AOvVaw2d_xIcHECCbJi9H00NwOsJ&ust=1691145551813000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDIn5qmwIADFQAAAAAdAAAAABAE"} alt="Profile Picture" />
                    </div>
                    <div className='part-11'>
                        <Bar data={dataQues} options={options}></Bar>
                    </div>
                </div>
                <div className='part-2'>
                    <div className='part-20'>
                        <div>{person != null ? person[0].userName : ""}</div>
                        <div>{person != null ? person[0].userEmail : ""}</div>
                    </div>
                    <div className='part-21'>
                        <Doughnut data={data} options={options} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile