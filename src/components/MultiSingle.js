import React, { useState } from "react";
import "./Survey.css";
import Form from "react-bootstrap/Form";
import { Col, Container, Row, Button } from "react-bootstrap";

const MultiSingle = ({  survey, optionsArr}) => {
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
                  
                    type="radio"
                    value={item.Text}
                    checked={selected === item.Text}
                    onChange={handleChange}
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
              <Button variant="flat" size="md" block  type="submit">
                Cevapla
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>

     
    </Container>
  );
};

export default MultiSingle;

