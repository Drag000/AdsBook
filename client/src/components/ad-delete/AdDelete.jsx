import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import * as adsAPI from '../../api/ads-api'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from 'react';

export default function AdDelete() {
    const navigate = useNavigate();
    const { adId } = useParams();
    const [error, setError] = useState('');

    const adDeleteHandler = async () => {

        try {
            await adsAPI.removeAd(adId);

            navigate('/');
        } catch (err) {
            console.log(err)
            if (err && typeof err === 'object') {
                const errors = [];

                if (err.non_field_errors) {
                    errors.push(err.non_field_errors.join(' '));
                }

                setError(errors);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }

    }

    const closeButtonHandler = () => navigate('/ads/myads')


    return (

        <div
            className="modal show my-5"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Body>
                    <p>Are you sure you want to delete this ad ? </p>
                </Modal.Body>

                <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                    {error && error.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                </div>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeButtonHandler}>Cancel</Button>
                    <Button variant="danger" onClick={adDeleteHandler}>Delete</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>

    );
}
