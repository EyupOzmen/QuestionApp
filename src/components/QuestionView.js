import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

import Answer from "../models/Answer";

import { store } from "../store";
import { sendAnswers, validateRequired } from "../actions";
import { connect } from "react-redux";

import { findIndex, deleteItem } from "../utils";

const QuestionView = ({ id, question, isRequired }) => {
  const [answers, setAnswers] = useState([]);

  const checkAnswerRadio = (e) => {
    console.log('a');
    store.dispatch(validateRequired(false));

    //Alınan değer ile yeni answer oluşturuldu.
    const { name, value, id } = e.target;
    let item = { ID: `${name}${value}`, Value: value, Text: id };
    let answer = new Answer(item);
    let list = [...answers, answer];
    setAnswers(list);
    //state ile sorguluyoruz.
    if (isRequired) {
      console.log('b');
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
    console.log('c');
  };

  const checkAnswerBox = (e) => {
    
    store.dispatch(validateRequired(false));

    //Alınan değerler ile cevap oluşturuldu.
    let isChecked = e.target.checked;
    const { name, value, id } = e.target;
    let item = { ID: `${name}${value}`, Value: value, Text: id };
    let answer = new Answer(item);

    //Check edip edilmeme durumuna göre cevaplar güncelleniyor.
    if (isChecked) {
      let newArr = [...answers];
      newArr = [...answers, answer];
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
        store.dispatch(sendAnswers(newArr));
      }
    } else {
      let index = findIndex(answers, answer);

      let newArr = deleteItem(answers, answers[index]);

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
        store.dispatch(sendAnswers(newArr));
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
