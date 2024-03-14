import React, { useState} from 'react';
import '../Styles/QuestionTableStyle.css';
let baseUrl="https://coding-app-xwu4.onrender.com";
// let baseUrl="http://localhost:3001"
export default function QuestionTable(props) {

  const [buttonColor, setButtonColor] = useState(props.color);
  const [savedButtonColor,setsavedButtonColor]=useState(props.savedQuesColor);


  const updateUserDetails = async () => {
    const response = await fetch(`${baseUrl}/auth/getUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),quesNo:props.val.sno
      })
    });
    const json = await response.json();
    return json;
  };
  
  const updateUserDetailsSaved = async () => {
    const response = await fetch(`${baseUrl}/auth/savedQues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),quesNo:props.val.sno
      })
    });
    const json = await response.json();
    return json;
  };

  const toggleColor = async () => {
    let u=await updateUserDetails();
    console.log(u);
    setButtonColor((prevColor) => (prevColor === "red" ? "green" : "red"));
  };

  const toggleSavedButtonColor = async () => {
    let u=await updateUserDetailsSaved();
    console.log(u);
    setsavedButtonColor((prevColor) => (prevColor === "red" ? "green" : "red"));
  };

  return (
    <>
      <tr className='QuestionPageTable'>
        <td>{props.val.sno}</td>
        <td><a href={`${baseUrl}/question/${props.val.sno}`}>{props.val.name}</a></td>
        <td>
          {props.val.Topic.map((val, index) => {
            if (index === 0) {
              return val;
            }
            else {
              return " , " + val;
            }
          })}
        </td>
        <td>{props.val.Level}</td>
        <td>
          <button
            className="button-design"
            onClick={toggleColor}
            style={{ backgroundColor: buttonColor  }}
          ></button>
        </td>
        <td>
          <button className='button-design' onClick={toggleSavedButtonColor}
            style={{ backgroundColor: savedButtonColor }}></button>
        </td>
        <td><a href={props.val.linkQues}>Link</a></td>
      </tr>
    </>
  );
}
