import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

import * as adsAPI from '../../api/ads-api'
import { AuthContext } from '../../contexts/AuthContext';
import { useCreateComment, useGetAllComments } from '../../hooks/useComments';

const initialValues = {
    text: '',
};

export default function AdDetails() {
    const navigate = useNavigate();
    const { adId } = useParams();
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [ad, setAd] = useState({});
    const [comments, setComments, refetchComments] = useGetAllComments(adId);
    const createComment = useCreateComment();

    useEffect(() => {
        (async () => {
            const result = await adsAPI.getOneAd(adId);

            setAd(result);
        })();
    }, [adId]);


    const isOwner = userId === ad._ownerId;

    const createCommentHandler = async ({ text }) => {
        try {
            await createComment(adId, text);
            refetchComments();
        } catch (err) {
            console.log(err.message);
        }
    };

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, createCommentHandler);
    
    const adDeleteHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete ${ad.title} ad?`)
        
        if (!isConfirmed) {
            return;
        };
        
        try {
            await adsAPI.removeAd(adId);
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
        
    }
  
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

            {isOwner &&
                <div className="card-body">
                    <Link to={`/ads/${adId}/edit`} className="card-link">Edit</Link>
                    <Link to="#" onClick={adDeleteHandler} className="card-link">Delete</Link>
                </div>
            }

            <div>
                <h3>Comments:</h3>
                <ul>
                    {comments.length > 0
                        ? comments.map(comment => (
                            <li key={comment._id}>
                                {comment.author.email}: {comment.text}
                            </li>
                        ))
                        : <h3>No Comments</h3>
                    }
                </ul>
            </div>

            {isAuthenticated && (
                <form className="w-auto m-auto p-3 my-5 border" onSubmit={submitHandler}>
                    <h5>Add Comment:</h5>
                    <div className="mb-3">
                        <label>Comment</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your comment.."
                            name="text"
                            value={values.text}
                            onChange={changeHandler}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Create comment
                    </button>
                </form>
            )}
        </div>
    );
}