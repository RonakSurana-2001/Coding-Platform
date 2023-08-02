import React, { useState,useEffect } from 'react';
import '../Styles/QuestionTableStyle.css';

export default function QuestionTable(props) {
  const [buttonColor, setButtonColor] = useState(props.color);
  const updateUserDetails = async () => {
    const response = await fetch("http://localhost:5000/auth/getUpdate", {
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

  // console.log(props.color);

  return (
    <>
      <tr className='QuestionPageTable'>
        <td>{props.val.sno}</td>
        <td><a href={props.val.linkQues}>{props.val.name}</a></td>
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
          <button className='button-design'></button>
        </td>
      </tr>
    </>
  );
}
