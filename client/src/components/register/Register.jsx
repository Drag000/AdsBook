import { useRegister } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

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
            console.log('Register', values.email, values.password, values.firstName, values.lastName, values.username)
            await register(values.email, values.password, values.firstName, values.lastName, values.username)

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
    } = useForm(initialValues, registerHandler);


    return (
        <div>
            <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
                <h3 className="w-25 m-auto">Sign Up</h3>
                <div className="mb-3">
                    <label>Username*</label>
                    <input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your 'username'"
                    />
                </div>

                <div className="mb-3">
                    <label>Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="example@gmail.com"
                    />
                </div>
                <div className="mb-3">
                    <label>First name </label>
                    <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your 'First name'"
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your 'Last name'"
                    />
                </div>

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
                <div className="mb-3">
                    <label>Password* (at lest 8 characters)</label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password*</label>
                    <input
                        type="password"
                        name="confirm-password"
                        value={values['confirm-password']}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your password"
                    />
                </div>

                <div style={{ fontSize: '13px' }}>* Required</div>
                
                <div>
                    {error && (
                        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}> {error} </p>
                    )}
                </div>
                
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}