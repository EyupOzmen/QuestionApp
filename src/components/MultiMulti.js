import React, { useState } from "react";
import "./Survey.css";
import Form from "react-bootstrap/Form";
import { Col, Container, Row, Button } from "react-bootstrap";


const MultiMulti = ({  survey, optionsArr }) => {
  const [checkboxes,setCheckboxes] = useState(optionsArr)

 

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(checkboxes)
    
    // let check = checkboxes;

    // check.map((box) => {
    //   return  box.isChecked=false;
    // });
    // setCheckboxes(check);
  };

  return (
    <Container>
      
      <Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col
              style={{
                color: "#03a9f4",
                marginTop: "1.2rem",
                fontWeight: "bold",
              }}
            >
              <label>{survey}</label>
            </Col>
          </Row>
          <br />

          {optionsArr.map((item) => {
            return (
              <Row key={item.ID} >
                <Col
                  style={{
                    background: "#03a9f4",
                    color: "white",
                    padding: "0.4rem",
                    marginBottom: "0.6rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    name={item.Text}
                    checked={checkboxes[item.Text]}
                    onChange={(e) => item.isChecked = !item.isChecked}
                    label={item.Text}
                  />
                </Col>
              </Row>
            );
          })}

          <style type="text/css">
            {`
    .btn-flat {
      background-color: #03a9f4;
      color: white;
      border-width:0.001rem;
    }
    .btn-flat:hover {
      color:#03a9f4 ;
      background-color:white;
      border-width:0.001rem;
      border-color:#03a9f4 ;
    }
    `}
          </style>

          <Row>
            <Col>
              <Button variant="flat" size="md" block type="submit">
                Cevapla
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>

     
    </Container>
  );
};

export default MultiMulti;
