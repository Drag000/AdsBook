import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";
import * as adsAPI from '../../api/ads-api'



export default function AdDetails() {
    const { adId } = useParams();
    const [ad, setAd] = useState({});

    useEffect(() => {
        (async () => {
            const result = await adsAPI.getOneAd(adId);

            setAd(result);
        })();
    }, []);


    return (
            <div className="card w-25 m-auto p-3 my-5 border" >
                <h5 className="card-title">{ad.title}</h5>
                <img src={ad.imageURL} className="card-img-top" alt="..." />
               
                <div className="list-group list-group-flush">
                    <Container >
                        <Row>
                            <Col xs lg="3">
                                Condition
                            </Col>
                            <Col>
                                {ad.condition}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="3">
                                Location
                            </Col>
                            <Col>
                                {ad.location}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="3">
                                Price
                            </Col>
                            <Col>
                                {ad.price}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="3">
                                Description
                            </Col>
                            <Col>
                                {ad.description}
                            </Col>
                        </Row>
                    </Container>


                    {/* <li className="list-group-item">A third item</li> */}
                </div>
                <div className="card-body">
                    <Link to="#" className="card-link">Edit</Link>
                    <Link to="#" className="card-link">Delete</Link>
                </div>
            </div>
    );
}