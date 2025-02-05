import { Button, Col, Container, Row, Card, Image } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Ad({
  id,
  title,
  main_photo,
  price,
  location,
  condition,
}) {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Card className='mb-3'>
      <Container >
        <Row>
          <Col xs={6} md={4}>
            <Image src={main_photo} rounded alt="photo"
              style={{
                width: '100%',
                maxWidth: '400px',
                maxHeight: '255px',
                objectFit: 'contain',
                objectPosition: 'center',  
                borderRadius: '10px'
              }}
            />
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

              <div>
                <p>
                  <strong>Price:</strong> {price}
                </p>
                <p>
                  <strong>Location:</strong> {location}
                </p>
                <p>
                  <strong>Condition:</strong> {condition}
                </p>
              </div>

              <Card.Text>
                
              </Card.Text>

              {isAuthenticated
                ? <Button as={Link} to={`/ads/${id}/details`} variant="primary">Details</Button>
                : <Button as={Link} to={`/login`} variant="primary">Details</Button>
              }
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}