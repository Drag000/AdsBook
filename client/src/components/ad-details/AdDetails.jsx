import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import * as adsAPI from '../../api/ads-api'
import { AuthContext } from '../../contexts/AuthContext';
import AdComments from '../ad-comments/AdComments';
import { useGetProfileDetails } from '../../hooks/useAuth'

const initialPublisherValues = {
    id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
};

const initialAdValues = {
    id: "",
    title: "",
    location: "",
    condition: "",
    description: "",
    price: "",
    photo: "",
};

export default function AdDetails() {

    const { adId } = useParams();
    const { userId } = useContext(AuthContext);
    const [ad, setAd] = useState(initialAdValues);
    const [publisher, setPublisher] = useState(initialPublisherValues);
    const getProfileDetails = useGetProfileDetails()
    

    useEffect(() => {
        (async () => {
            const result = await adsAPI.getOneAd(adId);
 
            const result2 = await getProfileDetails(result.user)
            setAd(result);
            setPublisher(result2);
        })();
    }, [adId]);
    
    
    console.log('publisher', publisher)
    console.log('ad2', ad)

    const isOwner = userId === ad.user;

    return (
        <>
            <div className="card m-auto p-3 my-5 border" style={{ width: '38rem' }} >
                <div className="row justify-content-center" >
                    <div className="col-4">
                        <h5 className="card-title">{ad.title}</h5>
                    </div>
                </div>
                <img src={ad.photo} className="card-img-top" alt="..." />

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Row>
                            <Col xs lg="4">
                                Publisher :
                            </Col>
                            <Col>
                                {publisher.username} ({publisher.firstName} {publisher.lastName})

                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="4">
                                Email :
                            </Col>
                            <Col>
                                {publisher.email}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="4">
                                Phone number :
                            </Col>
                            <Col>
                                {/* {ad.user.phoneNumber} */}
                            </Col>
                        </Row>

                    </li>

                </ul>

                <div className="list-group list-group-flush">
                    <Container >
                        <Row>
                            <Col xs lg="4">
                                Condition :
                            </Col>
                            <Col>
                                {ad.condition}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="4">
                                Location :
                            </Col>
                            <Col>
                                {ad.location}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="4">
                                Price (lv.):
                            </Col>
                            <Col>
                                {ad.price}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="4">
                                Description :
                            </Col>
                            <Col>
                                {ad.description}
                            </Col>
                        </Row>
                    </Container>

                </div>

                {isOwner &&
                    <div className="row justify-content-center" >
                        <div className="col-3">
                            <Button as={Link} to={`/ads/${adId}/edit`} variant="info" >Edit</Button>
                        </div>
                        <div className="col-3">
                            <Button as={Link} to={`/ads/${adId}/delete`} variant="danger" >Delete</Button>
                        </div>
                    </div>
                }
            </div>
            <AdComments />
        </>
    );
}