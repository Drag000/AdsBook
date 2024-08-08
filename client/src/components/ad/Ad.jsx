import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

export default function Ad({
  _id,
  title,
  imageURL,
}) {
  return (
    <Card >
      <Container >
        <Row>
          <Col xs lg="3">
            <Card.Img src={imageURL} />
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
                      {title}
                    </Col>
                  </Row>
                </Container>
              </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button as={Link} to={`/ads/${_id}/details`} variant="primary">Details</Button>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}