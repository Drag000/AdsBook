import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Ad({
  id,
  title,
}) {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Card >
      <Container >
        <Row>
          <Col xs lg="3">
            {/* <Card.Img src={photo} /> */}
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>
                <Container >
                  <Row>
                    <Col xs lg="3">
                      {/* <Button variant="info">Uploaded by: {user.username} </Button>{' '} */}
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
              {isAuthenticated
                ?<Button as={Link} to={`/ads/${id}/details`} variant="primary">Details</Button>
                :<Button as={Link} to={`/login`} variant="primary">Details</Button>
              }
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}