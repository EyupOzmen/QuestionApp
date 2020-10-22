import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

import question from "./data/question.json";
import MultiSingle from "./components/MultiSingle";
import MultiMulti from "./components/MultiMulti";

const App = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Container>
      <Row>
        <Col>
          <img src={question[0].HeaderLogo} alt="Header Logo" />
        </Col>
      </Row>
      {selected === 0 ? (
        <Row>
          <Col>
            <MultiSingle
              survey={question[0].Questions[0].Question}
              optionsArr={question[0].Questions[0].Options}
            />
          </Col>
        </Row>
      ) : null}
      {selected === 1 ? (
        <Row>
          <Col>
            <MultiMulti
              survey={question[1].Questions[0].Question}
              optionsArr={question[1].Questions[0].Options}
            />
          </Col>
        </Row>
      ) : null}

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
      {selected === question.length ? (
        <p>Tebrikler</p>
      ) : (
        <Row>
          <Col>
            <Button
              onClick={() => setSelected(selected + 1)}
              variant="flat"
              size="md"
              type="submit"
            >
              Geç
            </Button>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <img src={question[0].FooterLogo} alt="Footer Logo" />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
