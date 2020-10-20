import React from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import Survey from './components/Survey'

const App = () => {
    return(
        <Container>
            <Row>
                <Col><Survey/></Col>
            </Row>    
        </Container>
    )
}

export default App;