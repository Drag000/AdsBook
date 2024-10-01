import { useRegister } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const initialValues = { email: '', password: '', firstName: '', lastName: '', username: '', 'confirm-password': '' };

export default function Register() {
    const register = useRegister();
    const navigate = useNavigate();
    const [error, setError] = useState('');



    const registerHandler = async (values) => {
        if (values.password != values['confirm-password']) {
            return setError('Password missmatch!');
        }
        try {
            await register(values)
            navigate('/login');

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
                console.log('errors1', errors)
                setError(errors);

                // console.log('errors2', error.join('\r\n'))
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
    } = useForm(initialValues, registerHandler);


    return (
        <Form className="w-25 m-auto p-3 my-5 border" noValidate onSubmit={submitHandler} validated={validated}>
            <h3 className="w-25 m-auto">Sign Up</h3>

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={changeHandler}
                    placeholder="Enter username.."
                    required
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

            <Form.Group className="mb-3">
                <Form.Label>Password* (at lest 8 characters)</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={changeHandler}
                    placeholder="Enter your password.."
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your password.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password*</Form.Label>
                <Form.Control
                    type="password"
                    name="confirm-password"
                    value={values['confirm-password']}
                    onChange={changeHandler}
                    placeholder="Enter your password.."
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please confirm your password.
                </Form.Control.Feedback>
            </Form.Group>

            <div style={{ fontSize: '13px' }}>* Required</div>
            <br />

            <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                {error && error.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
            </div>

            <div className="d-grid">
                <Button type="submit" className="btn btn-primary" >
                    Sign Up
                </Button>
            </div>
        </Form>
    );
}