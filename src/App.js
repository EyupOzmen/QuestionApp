import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./components/Survey.css";

import Survey from "./models/Survey";
import QuestionView from "./components/QuestionView";

import SurveyJSONData from "./data/question.json";
import WelcomeView from "./components/WelcomeView";
import FarewellView from "./components/FarewellView";

import {store} from './store';
import {validateRequired} from './actions';
import { connect } from "react-redux";
import {validation} from './utils';

const App = ({ options,disableFlag }) => {
  const [surveyLength, setSurveyLength] = useState(0);
  const [survey, setSurvey] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backButtonVisibled, setBackButtonVisibled] = useState(false);
  const [nextButtonVisibled, setNextButtonVisibled] = useState(true);
  const [viewType, setViewType] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  

  useEffect(() => {
    let data = new Survey(SurveyJSONData);
    setSurvey(data);
    setSurveyLength(data.Questions.length);
    setAnswerList(options);
    
  }, []);

  useEffect(() => {
    if (survey.Questions) {
      console.log(survey);
      setCurrentQuestion(survey.Questions[currentIndex]);
    }
  }, [survey]);

  useEffect(() => {
    if (survey.Questions) {
      setCurrentQuestion(survey.Questions[currentIndex]);
    }
  }, [currentIndex]);

  //Controls back button
  const backQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Bu düğme görünmeyecek.
      setBackButtonVisibled(false);
    }
  };

  //Contorls next button
  const nextQuestion = () => {
    if (viewType === 1) {
      console.log(currentIndex);
      if (currentIndex < survey.Questions.length-1) {
        if (options.length !== 0) {
          if (currentQuestion.isRequired) {
            const nextAble = validation(options,currentIndex);
            store.dispatch(validateRequired(!nextAble));
            console.log(nextAble)
            if (nextAble) {
              setBackButtonVisibled(true);
              setCurrentIndex(currentIndex + 1);
              setViewType(1);
              setAnswerList(options);
            } else {
              store.dispatch(validateRequired(true))
            }
          }
        } else {
          store.dispatch(validateRequired(true))
          setBackButtonVisibled(true);
          setCurrentIndex(currentIndex + 1);
          setViewType(1);
          setAnswerList(options);
        }
      } else {
        // Uğurlama iletisini (FarewallView) göster.
        setViewType(2);
        setBackButtonVisibled(false);
        setNextButtonVisibled(false);
        setAnswerList(options);
      }
    } else {
      setViewType(1);
  
     
     
    }
  };

  console.log(answerList);



  return (
    <Container>
      <Row>
        <Col>
          <span>{currentIndex}</span>
          <img src={survey.HeaderLogo} alt="Header" />
        </Col>
      </Row>

      <Row>
        <Col>
          {viewType === 0 && <WelcomeView welcomeText={survey.WelcomeText} />}
          {viewType === 1 && (
            <QuestionView id={currentIndex} question={currentQuestion} />
          )}
          {viewType === 2 && (
            <FarewellView farewellText={survey.FareWellText} />
          )}
        </Col>
      </Row>
     
        <Row>
          <Col style={{marginTop:"1rem",display:"flex",alignItems:"center" ,justifyContent:"center"}} >
            {disableFlag ? <p style={{ color: "red" }}>The question is required!</p>:<p style={{color:"blue"}} >Sizi dinliyoruz.</p>}
          </Col>
        </Row>
     

      <Row>
        <Col>
          {backButtonVisibled && (
            <Button
              className="mb-3"
              onClick={backQuestion}
              variant="secondary"
              size="sm"
            >
              Geri
            </Button>
          )}
        </Col>

        <Col>
          {nextButtonVisibled && (
            <Button
              className="mb-3"
              aria-label="İleri"
              variant="secondary"
              size="sm"
              onClick={nextQuestion}
              disabled={disableFlag}
            >
              {surveyLength && surveyLength - 1 === currentIndex
                ? "Bitir"
                : "İleri"}
            </Button>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <img src={survey.FooterLogo} alt="Footer" />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    options: state.answers,
    disableFlag:state.disableRequired
  };
};

export default connect(mapStateToProps)(App);



//The function you pass the hook cannot be an async function,
//useState hook is also asynchronous, and will not be reflected immediately.
// Effects are always executed after the render phase is completed even if you setState inside the one effect,
// another effect will read the updated state and take action on it only after the render phase.

