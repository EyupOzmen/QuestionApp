import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./components/Survey.css";

import Survey from "./models/Survey";
import QuestionView from "./components/QuestionView";

import SurveyJSONData from "./data/question.json";
//import MultiSingle from "./components/MultiSingle";
//import MultiMulti from "./components/MultiMulti";
import WelcomeView from "./components/WelcomeView";
import FarewellView from "./components/FarewellView";

import {connect} from 'react-redux';

const App = ({options}) => {
 
  const [survey, setSurvey] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backButtonVisibled, setBackButtonVisibled] = useState(false);
  const [nextButtonVisibled, setNextButtonVisibled] = useState(true);
  const [viewType, setViewType] = useState(0);
  const [answerList,setAnswerList] = useState([]);


  useEffect(() => {
    let data = new Survey(SurveyJSONData);
    setSurvey(data);
    setAnswerList(options)
    // setSurvey(survey => ([...survey, ...data]));
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

  const backQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Bu düğme görünmeyecek.
      setBackButtonVisibled(false);
    }
  };

  const nextQuestion = () => {
    if (viewType === 1) {
      if (currentIndex < survey.Questions.length - 1) {
        setBackButtonVisibled(true);
        setCurrentIndex(currentIndex + 1);
        setViewType(1);
        setAnswerList(options);
       
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

  // const validate = () => {
  //   if(viewType === 1){

  //   }
  // }

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
            >
              İleri
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
    options:state
  }
}

export default connect(mapStateToProps)(App);

/*const fetchData = () => {
      let data = new Survey(question);
      console.log(data);
      //const data = JSON.parse(question);
      setSurvey(data);
      {survey && setCurrentQuestion(survey.Questions[0])}
    };
    // let data = new Survey(question);
    // setSurvey((state) => ({ ...state, survey: data }));
    fetchData();
    // setCurrentQuestion((state) => ({
    //   ...state,
    //   currentQuestion: survey.Questions[0],
    // }));*/

//The function you pass the hook cannot be an async function,
//useState hook is also asynchronous, and will not be reflected immediately.
// Effects are always executed after the render phase is completed even if you setState inside the one effect,
// another effect will read the updated state and take action on it only after the render phase.

{
  /* <Row>
        <Col>
          <img src={question.HeaderLogo} alt="Header Logo" />
        </Col>
      </Row>
      {selected === 0 ? (
        <Row>
          <Col>
            <MultiSingle
              
              survey={question.Questions[0].Question}
              optionsArr={question.Questions[0].Options}
            />
          </Col>
        </Row>
      ) : null}
      {selected === 1 ? (
        <Row>
          <Col>
            <MultiMulti
            
              survey={question.Questions[1].Question}
              optionsArr={question.Questions[1].Options}
            />
          </Col>
        </Row>
      ) : null}
      {selected === 2 ? (
        <Row>
          <Col>
            <MultiMulti
              
              survey={question.Questions[2].Question}
              optionsArr={question.Questions[2].Options}
            />
          </Col>
        </Row>
      ) : null}

      {selected === question.Questions.length ? (
        <p>Tebrikler</p>
      ) : (
        <Row>
          {selected === 0 ? null : (
            <Col>
              <Button
                onClick={() => setSelected(selected - 1)}
                variant="flat"
                size="md"
                type="submit"
                
              >
                Geri
              </Button>
            </Col>
          )}
          {selected === question.Questions.length - 1 ? (
               <Col>
               <Button
                 className="mb-3"
                 onClick={() => setSelected(selected+1)}
                 variant="flat"
                 size="md"
                 type="submit"
               >
                 Bitir
               </Button>
             </Col>

          ) : (
            <Col>
              <Button
                className="mb-3"
                onClick={() => setSelected(selected + 1)}
                variant="flat"
                size="md"
                type="submit"
              >
                İleri
              </Button>
            </Col>
          )}
          
        </Row>
      )}

      <Row>
        <Col>
          <img src={question.FooterLogo} alt="Footer Logo" />
        </Col>
      </Row> */
}
