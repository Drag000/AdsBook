import { useContext } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { useParams } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

import { AuthContext } from '../../contexts/AuthContext';
import { useCreateComment, useGetAllComments, useDeleteComment } from '../../hooks/useComments';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const initialCommentsValues = {
    text: '',
};

export default function AdComments() {
    const { adId } = useParams();
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [comments, refetchComments] = useGetAllComments(adId);
    const createComment = useCreateComment();
    const deleteComment = useDeleteComment();

    const createCommentHandler = async ({ text }) => {
        try {
            await createComment(adId, text);
            console.log('CCCCCcc')
            await refetchComments();

        } catch (err) {
            console.log(err.message);
        }
    };

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialCommentsValues, createCommentHandler, true);

    const deleteCommentHandler = async (commentId) => {
        try {
            await deleteComment(commentId);
            refetchComments();

        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="card m-auto p-3 my-5 border" style={{ width: '48rem' }}>
            <div>
                <h4 className="row justify-content-center">Comments:</h4>
                <ul style={{ listStyleType: 'none' }}>
                    {comments.length > 0
                        ? comments.map(comment => (
                            <li key={comment.id}>
                                {comment.username}: {comment.text}

                                {(userId === comment.user) &&
                                    <CloseButton onClick={() => deleteCommentHandler(comment.id)} />
                                }
                            </li>
                        ))
                        : <span className="row justify-content-center" style={{fontStyle: 'italic'}}>No comments..</span>
                    }
                </ul>
            </div>

            {isAuthenticated && (
                <form className="pb-0 my-5 mb-0 mt-1" onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Row>
                            <Col xs={9}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your comment.."
                                    name="text"
                                    value={values.text}
                                    onChange={changeHandler}
                                />
                            </Col>
                            <Col>
                                <button type="submit" className="btn btn-primary"> Add comment </button>
                            </Col>
                        </Row>
                    </div>

                </form>
            )}
        </div>
    );
}