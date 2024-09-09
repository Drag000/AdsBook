import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import { Button, Col, Container, Row, Card, Image } from 'react-bootstrap';


import * as adsAPI from '../../api/ads-api'
import { AuthContext } from '../../contexts/AuthContext';
import AdComments from '../ad-comments/AdComments';
import { useGetProfileDetails } from '../../hooks/useAuth'

export default function AdDetails() {

    const { adId } = useParams();
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [ad, setAd] = useState({});
    const [publisher, setPublisher] = useState({});
    const getProfileDetails = useGetProfileDetails()


    useEffect(() => {
        (async () => {
            const result = await adsAPI.getOneAd(adId);

            const result2 = await getProfileDetails(result.user)
            setAd(result);
            setPublisher(result2);
        })();
    }, [adId]);


    console.log('ad', ad)

    const isOwner = userId === ad.user;


    return (
        <>
            <Container className="border mt-4 mb-5">
                <Container className="mb-4">
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src={ad.main_photo} rounded alt="photo"
                                style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    maxHeight: '255px',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }}
                            />
                        </Col>
                        <Col>
                            <Card.Body>
                                <h4 >
                                    {ad.title}
                                </h4>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <Row className="mb-2">
                                            <Col xs={4}><strong>Publisher:</strong></Col>
                                            <Col>{publisher.username} ({publisher.firstName} {publisher.lastName})</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col xs={4}><strong>Email:</strong></Col>
                                            <Col>{publisher.email}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}><strong>Phone:</strong></Col>
                                            <Col>{/* {ad.user.phoneNumber} */}</Col>
                                        </Row>
                                    </li>
                                </ul>

                                <Container className="list-group-flush mt-3">
                                    <Row className="mb-2">
                                        <Col xs={4}><strong>Condition:</strong></Col>
                                        <Col>{ad.condition}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={4}><strong>Location:</strong></Col>
                                        <Col>{ad.location}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={4}><strong>Price (lv.):</strong></Col>
                                        <Col>{ad.price}</Col>
                                    </Row>

                                </Container>


                                <Row>
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Container>
                <Container >
                    <Row>
                        <Col xs={2}><strong>Description:</strong></Col>
                        <Col>{ad.description}</Col>
                    </Row>
                </Container>
                <Container >
                    <Row>
                        {isOwner && (
                            <Row className="justify-content-center mt-4">
                                <Col xs={2} className="text-center">
                                    <Button as={Link} to={`/ads/${adId}/edit`} variant="info" className="w-100 mb-2">
                                        Edit
                                    </Button>
                                </Col>
                                <Col xs={2} className="text-center">
                                    <Button as={Link} to={`/ads/${adId}/delete`} variant="danger" className="w-100">
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Row>
                </Container>
            </Container>



            <h5 className="row justify-content-center">Photos:</h5>
            {ad.photos && ad.photos.length > 0 && (
                <Container className="border mb-5">
                    <Row className="justify-content-center mt-4">
                        {ad.photos.map((photo) => (
                            <Col key={photo.pk} xs={6} md={4} className="mb-2">
                                <Image
                                    src={photo.photo_url}
                                    rounded
                                    fluid
                                    alt={`Photo ${photo.pk}`}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}

            <AdComments />
        </>
    );



}