import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { useUpdatePassword, useUpdateProfile } from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";


export default function ProfileEdit() {
    const { userId, username, email, firstName, lastName, changeAuthState, accessToken, isAuthenticated } = useContext(AuthContext);
    const updateProfile = useUpdateProfile();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const currentValues = {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
    };

    const editProfileHandler = async (values) => {
        try {
            const result = await updateProfile(userId, values);

            changeAuthState(result)

            navigate(`/profile/${userId}/details`);
        } catch (err) {
            console.log(err)
            if (err && typeof err === 'object') {
                const errors = [];

                if (err.username) {
                    errors.push(`Username: ${err.username.join(' ')}`);
                }
                if (err.password) {
                    errors.push(`Password: ${err.password.join(' ')}`);
                }

                if (err.email) {
                    errors.push(`Email: ${err.email.join(' ')}`);
                }

                if (err.non_field_errors) {
                    errors.push(err.non_field_errors.join(' '));
                }

                setError(errors);
                console.log('error', error)
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
    } = useForm(currentValues, editProfileHandler);


    return (
        <Form className="w-25 m-auto p-3 my-5 border" noValidate onSubmit={submitHandler} validated={validated}>
            <h3 className="w-25 m-auto">Profile</h3>
            
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={changeHandler}
                    placeholder="Enter username.."
                    required
                    disabled
                    readOnly
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your username.
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={changeHandler}
                    placeholder="Enter your email 'example@gmail.com'.."
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your email.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={changeHandler}
                    placeholder="Enter your First Name.."
                />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={changeHandler}
                    placeholder="Enter your Last Name.."
                />
            </Form.Group>

            {/* <div className="mb-3">
            <label>Phone</label>
            <input
                type="tel"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={changeHandler}
                className="form-control"
                placeholder="Please enter your phone number '+359XXXXXXXXX'"
            />
        </div> */}


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