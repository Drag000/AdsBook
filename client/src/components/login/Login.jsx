import { useLogin } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';

const initialValues = { username: '', password: '' };

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();
    const { accessToken, userId } = useContext(AuthContext);
    const [error, setError] = useState('');

    const loginHandler = async ({ username, password }) => {
        try {
            await login(username, password)
            navigate('/');
        } catch (err) {
            if (err && typeof err === 'object') {
                const errors = [];

                if (err.username) {
                    errors.push(`Username: ${err.username.join(' ')}`);
                }
                if (err.password) {
                    errors.push(`Password: ${err.password.join(' ')}`);
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
    } = useForm(initialValues, loginHandler);



    return (
        <Form className="w-25 m-auto p-3 my-5 border" noValidate onSubmit={submitHandler} validated={validated}>
            <h3 className="w-25 m-auto">Log in</h3>

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={changeHandler}
                    placeholder="Enter username"
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your username.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={changeHandler}
                    placeholder="Enter password"
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your password.
                </Form.Control.Feedback>
            </Form.Group>

            {error && (
                <div style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
                    {error.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                </div>
            )}

            <div className="d-grid">
                <Button type="submit" className="btn btn-primary">
                    Log in
                </Button>
            </div>
        </Form>
    );
}