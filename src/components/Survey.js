import React, { useState } from "react";
import question from "../data/question.json";
import "./Survey.css";
import Form from "react-bootstrap/Form";
import { Col, Container, Row,Button } from "react-bootstrap";

const Survey = () => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(`Tuttuğunuz takım: ${selected}`);
    setSelected(null);
  };

  return (

    
    <Container>
      <Row>
        <Col>
          <img className="survey-header"  src={question.HeaderLogo} alt="Header Logo" />
        </Col>
      </Row>

      <Row>
        <Form onSubmit={handleSubmit} >
          
            <Row>
             <Col style={{marginTop:'1.2rem',fontWeight:'bold'}} >
             <label>{question.Questions[0].Question}</label>
             </Col>
            </Row>
            <br />
            <Row>
              <Col>
              <Form.Check
                style={{background:"black",color:'white',padding:'0.2rem',marginBottom:'0.5rem'}}
                type="radio"
                value={question.Questions[0].Options[0].Text}
                checked={selected === question.Questions[0].Options[0].Text}
                onChange={handleChange}
                label={question.Questions[0].Options[0].Text}
              />
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Check
                style={{background:"black",color:'white',padding:'0.2rem',marginBottom:'0.5rem'}}
                type="radio"
                value={question.Questions[0].Options[1].Text}
                checked={selected === question.Questions[0].Options[1].Text}
                onChange={handleChange}
                label={question.Questions[0].Options[1].Text}
              />
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Check
                style={{background:"black",color:'white',padding:'0.2rem',marginBottom:'0.5rem'}}
                type="radio"
                value={question.Questions[0].Options[2].Text}
                checked={selected === question.Questions[0].Options[2].Text}
                onChange={handleChange}
                label={question.Questions[0].Options[2].Text}
              />
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Check
                 style={{background:"black",color:'white',padding:'0.2rem',marginBottom:'0.5rem'}}
                type="radio"
                value={question.Questions[0].Options[3].Text}
                checked={selected === question.Questions[0].Options[3].Text}
                onChange={handleChange}
                label={question.Questions[0].Options[3].Text}
              />
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 3, offset:6 }}>
            <Button className="btn" type="submit">
              Cevapla
            </Button>
            </Col>
            </Row>
          
            
          
        </Form>
      </Row >

      <Row>
        <Col>
          <img className="survey-footer" src={question.FooterLogo} alt="Header Logo" />
        </Col>
      </Row>
    </Container>
  );
};

export default Survey;

 //   <div className="survey-container">
    //     <div className="survey-header">
    //       <img src={question.HeaderLogo} alt="Header Logo" />
    //     </div>
    //     <br/>
    //     <div className="survey-question">

    //     <form onSubmit={handleSubmit}>
    //     <h3>{question.Questions[0].Question}</h3>

    //     <ul>
    //       <li>
    //         <label>
    //           <input
    //             type="radio"
    //             value={question.Questions[0].Options[0].Text}
    //             checked={selected === question.Questions[0].Options[0].Text}
    //             onChange={handleChange}
    //           />
    //           <span>{question.Questions[0].Options[0].Text}</span>
    //         </label>
    //       </li>

    //       <li>
    //         <label>
    //           <input
    //             type="radio"
    //             value={question.Questions[0].Options[1].Text}
    //             checked={selected === question.Questions[0].Options[1].Text}
    //             onChange={handleChange}
    //           />
    //           <span>{question.Questions[0].Options[1].Text}</span>
    //         </label>
    //       </li>

    //       <li>
    //         <label>
    //           <input
    //             type="radio"
    //             value={question.Questions[0].Options[2].Text}
    //             checked={selected === question.Questions[0].Options[2].Text }
    //             onChange={handleChange}
    //           />
    //           <span>{question.Questions[0].Options[2].Text}</span>
    //         </label>
    //       </li>

    //       <li>
    //         <label>
    //           <input
    //             type="radio"
    //             value={question.Questions[0].Options[3].Text}
    //             checked={selected === question.Questions[0].Options[3].Text }
    //             onChange={handleChange}
    //           />
    //           <span>{question.Questions[0].Options[3].Text}</span>
    //         </label>
    //       </li>
    //     </ul>
    //     <div className="survey-button" >
    //     <button type="submit">Cevapla</button>
    //     </div>
    //   </form>
    //     </div>
    //     <br/>
    //     <div className="survey-footer">
    //       <img src={question.FooterLogo} alt="Header Logo" />
    //     </div>
    //   </div>
