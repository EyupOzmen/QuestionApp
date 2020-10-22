import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./components/Survey.css";

import question from "./data/question.json";
import MultiSingle from "./components/MultiSingle";
import MultiMulti from "./components/MultiMulti";

const App = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Container>
      <Row>
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
      </Row>
    </Container>
  );
};

export default App;
