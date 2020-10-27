import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

import Answer from "../models/Answer";

const QuestionView = ({ id, question }) => {
  const [answers, setAnswers] = useState([]);

  const checkAnswerRadio = (e) => {
    //console.log(e.target.value);
    //console.log(e.target.id);
    const {name, value, id } = e.target;
    let item = { ID:`${name}${value}`, Value: value, Text: id };
    let answer = new Answer(item);
    var list = [answer];
    setAnswers(list);
  };

  const checkAnswerBox = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
    let isChecked = e.target.checked;
    const {name, value, id } = e.target;
    let item = { ID: `${name}${value}`, Value: value, Text: id };
    let answer = new Answer(item);
    console.log(answer);
    console.log(isChecked);
    if(isChecked){
      let newArr = [...answers];
      newArr.push(answer);
      setAnswers(newArr);
    }else{
      let index = findIndex(answers,answer)
      console.log(index);
      let newArr = deleteItem(answers,answers[index]);
      console.log(newArr); 
      setAnswers(newArr);
    }
    
         
  };
  console.log(answers);

  const findIndex = (arr,item) => {
    for (let i = 0 ; i < arr.length ; i++){
      if(arr[i].ID === item.ID ){
        return i;
      }
    }
  }

  const deleteItem = (arr,item) => {
    let newArr = arr.filter( arrItem => arrItem !== item);

    return newArr;
  }

  return (
    <div id={id}>
      <Row>
        <Col>
          <p>{question.Question}</p>
        </Col>
      </Row>

      {question.QuestionType === "MULTIMULTI" && (
        <div>
          {question.Options.map((item) => {
            return (
              <Row>
                <Col>
                  <Form.Check
                    id={item.Text}
                    key={`${question.ID} ${item.ID}`}
                    type="checkbox"
                    name={question.ID}
                    label={item.Text}
                    onChange={checkAnswerBox}
                    value={item.ID}
                  />
                </Col>
              </Row>
            );
          })}
          {/* {console.log(question.ID)}
          {console.log("Checkbox")} */}
        </div>
      )}
      {question.QuestionType === "MULTISINGLE" && (
        <div>
          {question.Options.map((item) => {
            return (
              <Row>
                <Col>
                  <Form.Check
                    
                    type="radio"
                    id={item.Text}
                    key={`${question.ID} ${item.ID}`}
                    onChange={checkAnswerRadio}
                    name={question.ID}
                    value={item.ID}
                    label={item.Text}
                  />
                </Col>
              </Row>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionView;
