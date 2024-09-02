import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';


export default function ProfileDetails() {
    const { userId, username, email, firstName, lastName, phoneNumber, profilePicture } = useContext(AuthContext);
    const { profileId } = useParams();

    const isOwner = userId == profileId;


    return (
        <Card className="card w-25 m-auto p-3 my-5 border">
            <Card.Img src={profilePicture} />
            <Card.Body>
                <div className="row justify-content-center" >
                    <div className="col-4">
                        <Card.Title>Profile</Card.Title>
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

                {isOwner &&
                    <div className="row justify-content-center" >
                        <div className="col-3">
                            <Button as={Link} to={`/profile/${userId}/edit`} variant="info">Edit</Button>
                        </div>
                        <div className="col-3">
                            <Button as={Link} to={`/profile/${userId}/delete`} variant="danger">Delete</Button>
                        </div>
                        <div className="col-3">
                            <Button as={Link} to={`/profile/${userId}/change-password`} variant="danger">Change Password</Button>
                        </div>
                    </div>
                }
            </Card.Body>
        </Card>
    );
}