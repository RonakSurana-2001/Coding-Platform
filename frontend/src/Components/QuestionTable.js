import React, { useState } from 'react';
import '../Styles/QuestionTableStyle.css';

export default function QuestionTable(props) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const toggleColor = () => {
    setIsButtonClicked((prevIsButtonClicked) => !prevIsButtonClicked);
  };

  console.log(props.color);

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
            style={{ backgroundColor: props.color }} // Use the color prop as the background color
          ></button>
        </td>
        <td>
          <button className='button-design'></button>
        </td>
      </tr>
    </>
  );
}
