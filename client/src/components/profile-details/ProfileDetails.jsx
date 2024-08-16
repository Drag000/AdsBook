import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


export default function ProfileDetails() {
    const { username, email, firstName, lastName, phoneNumber, profilePicture } = useContext(AuthContext);


    return (
        <Card className="card w-25 m-auto p-3 my-5 border">
            <Card.Img src={profilePicture} />
            <Card.Body>
                <div className="row justify-content-center" >
                    <div className="col-4">
                        <Card.Title>My Profile</Card.Title>
                    </div>
                </div>

                <div className="list-group list-group-flush">
                    <Container >
                        <Row>
                            <Col xs lg="4">
                                Username :
                            </Col>
                            <Col>
                                {username}
                            </Col>
                        </Row><Row>
                            <Col xs lg="4">
                                First Name :
                            </Col>
                            <Col>
                                {firstName}
                            </Col>
                        </Row><Row>
                            <Col xs lg="4">
                                Last Name :
                            </Col>
                            <Col>
                                {lastName}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="4">
                                Email :
                            </Col>
                            <Col>
                                {email}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="4">
                                Phone number :
                            </Col>
                            <Col>
                                {phoneNumber}
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* <div className="row justify-content-center" >
                        <div className="col-3">
                            <Button to={"#"} variant="info" >Edit</Button>
                        </div>
                        <div className="col-3">
                            <Button to="#" onClick={adDeleteHandler} variant="danger" >Delete</Button>
                        </div>
                    </div> */}
            </Card.Body>
        </Card>
    );
}