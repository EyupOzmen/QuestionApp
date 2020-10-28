import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

import Answer from "../models/Answer";

import { store } from "../store";
import { sendAnswers } from "../actions";
import {validateRequired} from '../actions';
import { connect } from "react-redux";

import {findIndex,deleteItem} from '../utils';


const QuestionView = ({ id, question }) => {
  const [answers, setAnswers] = useState([]);

  const checkAnswerRadio = (e) => {
    store.dispatch(validateRequired(false))
    //console.log(e.target.value);
    //console.log(e.target.id);
    const { name, value, id } = e.target;
    let item = { ID: `${name}${value}`, Value: value, Text: id };
    let answer = new Answer(item);
    var list = [answer];
    setAnswers(list);
    if(list.length === 0){
      store.dispatch(validateRequired(true))
    }
    store.dispatch(sendAnswers(list));
  };

  const checkAnswerBox = (e) => {
    store.dispatch(validateRequired(false))
    console.log(e.target.value);
    console.log(e.target.id);
    let isChecked = e.target.checked;
    const { name, value, id } = e.target;
    let item = { ID: `${name}${value}`, Value: value, Text: id };
    let answer = new Answer(item);
    console.log(answer);
    console.log(isChecked);
    if (isChecked) {
      let newArr = [...answers];
      newArr.push(answer);
      setAnswers(newArr);
      store.dispatch(sendAnswers(newArr));
    } else {
      let index = findIndex(answers, answer);
      console.log(index);
      let newArr = deleteItem(answers, answers[index]);
      console.log(newArr);
      setAnswers(newArr);
      store.dispatch(sendAnswers(newArr));
    }
  };
  console.log(answers);

 

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
              <Row key={item.ID}>
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
              <Row key={item.ID}>
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    disableFlag:state.disableRequired
  };
};

export default connect(mapStateToProps) (QuestionView);
