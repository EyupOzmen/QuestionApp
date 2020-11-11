import React, { useState,useEffect} from "react";
import { Row, Col, Form } from "react-bootstrap";

import Answer from "../models/Answer";

import { store } from "../store";
import { sendAnswers, validateRequired } from "../actions";
import { connect } from "react-redux";

import { findIndex, deleteItem } from "../utils";

const QuestionView = ({ id, question, isRequired }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers([]);
  },[question])

  const checkAnswerRadio = (e) => {
    store.dispatch(validateRequired(false));

    //Alınan değer ile yeni answer oluşturuldu.
    const { name, value, id } = e.target;
    let item = {QuestionType:"MultiSingle", ID: `${name}`, Value: value, Text: id };
    let answer = new Answer(item);
    console.log(answer);
    let list = answer;
    //state ile sorguluyoruz.
    if (isRequired) {
      if (list.length === 0) {
        //Geçişi engeliyoruz cevap yoksa.
        store.dispatch(validateRequired(true));
      } else {
        //Cevabı gönderiyoruz.
        store.dispatch(sendAnswers(list));
      }
    } else {
      //Cevabı gönderiyoruz.
      store.dispatch(sendAnswers(list));
    }
  };

  const checkAnswerBox = (e) => {
    
    store.dispatch(validateRequired(false));

    //Alınan değerler ile cevap oluşturuldu.
    let isChecked = e.target.checked;
    const { name, value, id } = e.target;
    let item = {QuestionType:"MultiMulti", ID: `${name}`, Value: value, Text: id };
    let answer = new Answer(item);
    //Check edip edilmeme durumuna göre cevaplar güncelleniyor.
    if (isChecked) {
      let newArr =  [...answers, answer];
      setAnswers(newArr);

      if (isRequired) {
        if (newArr.length === 0) {
          //Geçişi engeliyoruz cevap yoksa.
          store.dispatch(validateRequired(true));
        } else {
          //Cevabı gönderiyoruz.
          store.dispatch(sendAnswers(newArr));
        }
      } else {
        //Cevabı gönderiyoruz.
        if(newArr.length !== 0){
          store.dispatch(sendAnswers(newArr));
        }
        
      }
    } else {
      let index = findIndex(answers, answer);
      console.log('Before Delete',answers)
      let newArr = deleteItem(answers, answers[index]);
      console.log('After Deleted',newArr)
    
      setAnswers(newArr); 
      if (isRequired) {
        if (newArr.length === 0) {
          //Geçişi engeliyoruz cevap yoksa.
          store.dispatch(validateRequired(true));
          
        } else {
          //Cevabı gönderiyoruz.
          console.log('After Deleted',newArr)
          store.dispatch(sendAnswers(newArr));
      
        }
      } else {
        //Cevabı gönderiyoruz.
        if(newArr.length !== 0){
          console.log('After Deleted',newArr)
          store.dispatch(sendAnswers(newArr));
      
        }
      }
    }
  };

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
                <Col style={{ width: "60px", marginBottom: "5px" }}>
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
  return {
    isRequired: state.isQRequired,
  };
};

export default connect(mapStateToProps, {
  validateRequired,
  sendAnswers,
})(QuestionView);
