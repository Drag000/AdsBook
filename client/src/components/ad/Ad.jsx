import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import {Link} from 'react-router-dom';

export default function Ad() {
  return (
    <Card >
      <Container >
        <Row>
          <Col xs lg="3">
            <Card.Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5KVZ171f9ejHWPRxKOqjPQr7uROsVKEmidD1febV2sh9O_CNpbPFZSvcRLfbXGIwWrI&usqp=CAU" />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>
                <Container >
                  <Row>
                    <Col xs lg="3"> 
                    <Button variant="info">Uploaded by..</Button>{' '}
                    </Col>
                    <Col> 
                      Card Title
                    </Col>
                  </Row>
                </Container>
              </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button as={Link} to="/ads/:adId/details" variant="primary">Details</Button>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}