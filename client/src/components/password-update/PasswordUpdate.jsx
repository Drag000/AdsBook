import { useForm } from '../../hooks/useForm';
import { useContext, useState } from 'react';
import { useUpdatePassword } from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function PasswordUpdate() {
    const updatePassword = useUpdatePassword();
    const navigate = useNavigate();
    const { profileId } = useParams();
    const [error, setError] = useState('');

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }

    const editPasswordHandler = async (values) => {
        if (values.newPassword != values.confirmNewPassword) {
            return setError('Password missmatch!');
        }

        try {
            await updatePassword(profileId, values);
            navigate(`/profile/${profileId}/details/`);
        } catch (err) {
            if (err && typeof err === 'object') {
                const errors = [];

                if (err.old_password) {
                    errors.push(`Old Password: ${err.old_password.join(' ')}`);
                }
                if (err.new_password) {
                    errors.push(`New Password: ${err.new_password.join(' ')}`);
                }

                if (err.non_field_errors) {
                    errors.push(err.non_field_errors.join(' '));
                }

                setError(errors);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }


        }
    };



    const {
        values,
        changeHandler,
        submitHandler,
        validated,
    } = useForm(initialValues, editPasswordHandler);

    return (
        <Form className="w-25 m-auto p-3 my-5 border" noValidate onSubmit={submitHandler} validated={validated}>
        
            <Form.Group className="mb-3">
                <Form.Label>Old Password*</Form.Label>
                <Form.Control
                    type="password"
                    name="oldPassword"
                    value={values.oldPassword}
                    onChange={changeHandler}
                    placeholder="Enter your old password"
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your old password.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>New Password* (at lest 8 characters)</Form.Label>
                <Form.Control
                    type="password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={changeHandler}
                    placeholder="Enter your new password"
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your new password.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password* (at lest 8 characters)</Form.Label>
                <Form.Control
                    type="password"
                    name="confirmNewPassword"
                    value={values.confirmNewPassword}
                    onChange={changeHandler}
                    placeholder="Enter your new password"
                    required
                // ['confirm-password']
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your new password.
                </Form.Control.Feedback>
            </Form.Group>

            <div style={{ fontSize: '13px' }}>* Required</div>

            <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                {error && error.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
            </div>

            <div className="d-grid">
                <Button type="submit" className="btn btn-primary" >
                    Update
                </Button>
            </div>
        </Form>
    );
}