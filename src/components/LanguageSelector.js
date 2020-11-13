import React,{useEffect} from "react";
import { Row, Col, Form } from "react-bootstrap";
import {store} from '../store';
import {connect} from 'react-redux';
import {fetchSurvey} from '../actions';

const LanguageSelector = () => {
  const languages = ["TÜRKÇE", "ENGLISH"];

  useEffect(() =>{
    console.log("Language Selector")
    store.dispatch(fetchSurvey("TÜRKÇE"))
  },[])

  const handleChange = (e) => {
    console.log(e.target.value)
    store.dispatch(fetchSurvey(e.target.value))
  }

  return (
    <div>
      {languages.map((item, index) => {
        return (
          <Row key={index}>
            <Col>
              <Form.Check
                key={item}
                id={item}
                defaultChecked={item === "TÜRKÇE"}
                type="radio"
                name="language"
                value={item}
                label={item}
                onChange={handleChange}
              />
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default connect(null,{fetchSurvey})(LanguageSelector);
