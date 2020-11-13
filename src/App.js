import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./components/Survey.css";

import Survey from "./models/Survey";
import QuestionView from "./components/QuestionView";


import WelcomeView from "./components/WelcomeView";
import FarewellView from "./components/FarewellView";


import { store } from "./store";
import { fetchSurvey,validateRequired, isQuestionRequired } from "./actions";
import { connect } from "react-redux";
//import { validation } from "./utils";

const App = ({question, options, disableFlag }) => {
  //survey uzunluğu
  const [surveyLength, setSurveyLength] = useState(0);
  //tüm anket
  const [survey, setSurvey] = useState({});
  //mevcut soru
  const [currentQuestion, setCurrentQuestion] = useState({});
  //mevcut index
  const [currentIndex, setCurrentIndex] = useState(0);
  //geri tuşunun görünürlüğü
  const [backButtonVisibled, setBackButtonVisibled] = useState(false);
  //ileri tuşunun görünürlüğü
  const [nextButtonVisibled, setNextButtonVisibled] = useState(true);
  //Ekranda görütülenecek ekran
  const [viewType, setViewType] = useState(0);
  //Cevap listesi
  const [answerList, setAnswerList] = useState([]);
  //Tıklanma sayacı
  //const [counter, setCounter] = useState(0);
  //Giriş ekranı
  //const [entrance, setEntrance] = useState(false);
  //Güncel cevap
  //const [currentAnswer, setCurrentAnswer] = useState([]);

  //Dataları dışarıdan topluyoruz.
   /*2*/
  useEffect(()=>{
    const fetch = async () => {
    console.log("Ignite")
    await store.dispatch(fetchSurvey("TÜRKÇE"))
    setSurvey(question)
    }
    fetch()
  },[])

  useEffect(() => {
    console.log('Survey Length',question)
    if(question){
    setSurvey(question);
    //setSurveyLength(question.Questions.length)
    //setCurrentQuestion(question.Questions[0])
    console.log('Data',survey)
    }
    
  }, [question]);

  //Option değiştiğinde cevap listesi oluşturuyoruz.
  useEffect(() => {
    /*DİKKAT*/
    // setEntrance(false);
    setAnswerList([options]);
  }, [options]);


  //Index değiştiğinde ilgili soruyu current soruya geçiyorum.
  /*1*/
  useEffect(() => {
    if (survey.Questions) {
      setSurveyLength(question.Questions.length)
      setCurrentQuestion(question.Questions[0])
      console.log("current",currentQuestion.isRequired);
      setCurrentQuestion(survey.Questions[currentIndex]);
    }
  }, [isQuestionRequired, currentIndex,survey,setBackButtonVisibled,setCurrentIndex]);

   /*3*/
  useEffect(() => {
    if (survey.Questions) {
      setCurrentQuestion(survey.Questions[currentIndex]);
    }
    console.log('Required',currentQuestion.isRequired,currentIndex,viewType)
    if (currentIndex < surveyLength && viewType === 1) {
      if (currentQuestion.isRequired) {
        store.dispatch(isQuestionRequired(true));
       
      } else {
        store.dispatch(isQuestionRequired(false));
       
      }
    } else {
      store.dispatch(validateRequired(false));
    }
  },[currentQuestion]);



  // useEffect(() => {
  //   console.log('required');
  //   console.log(currentQuestion)
  //   if(currentQuestion.isRequired){
  //     store.dispatch(isQuestionRequired(true))
  //   }else{
  //     store.dispatch(isQuestionRequired(false))
  //   }
  // },[])

  //Controls back button
  const backQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Bu düğme görünmeyecek.
      setBackButtonVisibled(false);
    }
  };

  //Controls next button
  const nextQuestion = () => {
    if (viewType === 1) {
      if (currentIndex < surveyLength - 1) {
        //İleri tuşuna basılması ile mevcut sorunun gerekli olup olmadığı sorgulanıyor.
        if (currentQuestion.isRequired) {
          store.dispatch(validateRequired(true));
        } else {
          store.dispatch(validateRequired(false));
        }
        setBackButtonVisibled(true);
        setCurrentIndex(prev => prev + 1);
      } else {
        setViewType(2);
        setBackButtonVisibled(false);
        setNextButtonVisibled(false);
      }
    } else {
      setViewType(1);
    }
  };
 

  return (
    <Container className="App">
      <Row>
        <Col>
          <img className="Header_Logo" src={survey.HeaderLogo} alt="Header" />
        </Col>
      </Row>

      <Row className="App__question">
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
        <Col
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {disableFlag ? (
            <p style={{ color: "red" }}>Bu soru zorunludur!</p>
          ) : (
            <p style={{ color: "blue" }}>Sizi dinliyoruz.</p>
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
          <img className="Footer_Logo" src={survey.FooterLogo} alt="Footer" />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log(state.question);
  return {
    question:state.question,
    options:state.answers,
    disableFlag: state.disableRequired,
  };
};

export default connect(mapStateToProps, {
  fetchSurvey,
  validateRequired,
  isQuestionRequired,
})(App);

//The function you pass the hook cannot be an async function,
//useState hook is also asynchronous, and will not be reflected immediately.
// Effects are always executed after the render phase is completed even if you setState inside the one effect,
// another effect will read the updated state and take action on it only after the render phase.

// console.log('Next');
//     setCounter(counter + 1);
//     if (viewType === 1) {
//       console.log(currentIndex);
//       console.log( survey.Questions.length)
//       if (currentIndex < surveyLength - 1) {
//         if (options.length !== 0) {
//           if (currentQuestion.isRequired) {
//             console.log('f');
//             const nextAble = validation(options, currentIndex);
//             console.log(nextAble);
//             if (nextAble) {
//               console.log('a')
//               setBackButtonVisibled(true);
//               setCurrentIndex(currentIndex + 1);
//               setViewType(1);
//               setAnswerList(options);
//             } else {
//               console.log('b')
//               store.dispatch(validateRequired(true));
//             }
//           }
//         } else {
//           console.log('c')
//           store.dispatch(validateRequired(true));
//           setBackButtonVisibled(true);
//           setCurrentIndex(currentIndex + 1);
//           setViewType(1);
//           setAnswerList(options.answers);
//         }
//       } else {
//         console.log('d')
//         // Uğurlama iletisini (FarewallView) göster.
//         setViewType(2);
//         setBackButtonVisibled(false);
//         setNextButtonVisibled(false);
//         setAnswerList(options.answers);
//       }
//     } else {
//       console.log('e')
//       setViewType(1);
//     }

//İlk soru zorunlu ise uygulanacak.
// useEffect(() => {
//   setEntrance(false);
//   console.log("Enter validate");
//   console.log(options);
//   console.log(counter);
//   const entranceValidate = () => {
//     if (counter === 1 && options.length === 0) {
//       setEntrance(true);
//       console.log(entrance);
//     }
//     // } else if (currentIndex === surveyLength-1 && options.length !== 4) {
//     //   setEntrance(true);
//     //   console.log(entrance);}
//      else {
//       console.log(entrance);
//       setEntrance(false);
//     }
//   };

//   entranceValidate();
// }, [counter]);
// console.log(entrance);
