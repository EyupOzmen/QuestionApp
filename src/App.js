import React from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import MultiSingle from './components/MultiSingle'
import question from "./data/question.json";

const App = () => {
    return(
        <Container>
            <Row>
                <Col>
                <MultiSingle
                    header={question.HeaderLogo}
                    survey={question.Questions[0].Question}
                    optionsArr={question.Questions[0].Options}
                    footer={question.FooterLogo}
                />
                </Col>
            </Row>    
        </Container>
    )
}

export default App;