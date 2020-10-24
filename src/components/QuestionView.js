import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Question = ({ question }) => {
  return (
    <div>
      <Row>
        <Col>
          <p>{question.Question}</p>
        </Col>
      </Row>

      {question.QuestionType === "MULTIMULTI" && (
        <div>
          {question.Options.map((item) => {
            return (
              <Row>
                <Col>
                  <Form.Check
                    type="checkbox"
                    name={`${question.ID}+${item.ID}` }
                    label={item.Text}
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
              <Row>
                <Col>
                  <Form.Check type="radio" name={question.ID} value={item.ID} label={item.Text} />
                </Col>
              </Row>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Question;
