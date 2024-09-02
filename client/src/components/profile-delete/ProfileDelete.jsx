import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { deleteProfile } from "../../api/auth-api"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';

export default function ProfileDelete() {
    const { userId, changeAuthState, onLogoutComplete } = useContext(AuthContext);
    const navigate = useNavigate();
    const profileDeleteHandler = async () => {

        try {
            await deleteProfile(userId);
            onLogoutComplete();
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }

    }

    const closeButtonHandler = () => navigate(`/profile/${userId}/details`);

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Body>
                    <p>Are you sure you want to delete your profile ? </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeButtonHandler}>Cancel</Button>
                    <Button variant="danger" onClick={profileDeleteHandler}>Delete</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}